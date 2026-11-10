"""Nimmt alle Wörter des Lese-Meisters mit freien KI-Stimmen auf und bündelt sie zu Stimmenpaketen.

Ergebnis im Ordner daten/ der App:
  stimmen.json          Liste der Stimmen und wo jedes Wort im Paket liegt (Wort → Position, Länge)
  stimme-<id>.bin       alle Aufnahmen einer Stimme hintereinander (MP3)

Aufruf (Python 3, dazu: pip install "sherpa-onnx<2" numpy, und ffmpeg):
  python3 werkzeug/stimmen-aufnehmen.py --app . --modelle <Ordner mit den Stimmen> [--whisper <Ordner>]

Die Stimmen gibt es als fertige Pakete bei sherpa-onnx (GitHub, Release „tts-models“):
  vits-piper-de_DE-eva_k-x_low.tar.bz2
Mit --whisper (Release „asr-models“: sherpa-onnx-whisper-small.tar.bz2) prüft das Skript jede Aufnahme
mit Spracherkennung, nimmt ein undeutliches Wort bis zu dreimal auf und behält die beste Fassung.
Bereits aufgenommene Wörter liegen im Zwischenspeicher (--cache) oder im vorhandenen Paket
(daten/stimme-<id>.bin) und werden nicht neu erzeugt (mit --alles-neu doch).

Prüfen und gezielt neu aufnehmen (braucht --whisper):
  --pruefen           hört alle Aufnahmen im vorhandenen Paket ab, ändert nichts und schreibt die
                      unsicheren Wörter nach <cache>/unsicher.json
  --neu WÖRTER        nimmt diese Wörter (mit Komma getrennt, oder „unsicher“ = Liste aus
                      unsicher.json) neu auf: bis zu --versuche Fassungen in leicht verschiedenem Tempo,
                      jede dreimal mit Spracherkennung in verschiedenen Sätzen geprüft. Behalten wird
                      die deutlichste Fassung – die alte nur, wenn keine neue besser ist.
Zahlen gelten auch als richtig erkannt, wenn die Spracherkennung sie als Wort schreibt (600 = sechshundert).

Warum ein Trägersatz? Die Stimmen sprechen ein einzelnes Wort oft verschluckt und viel zu kurz
(„Hund.“ dauert nur 0,24 s). Im Satz klingen sie sauber. Deshalb spricht die Stimme
„Das nächste Wort, bitte: Hund.“ und das Skript schneidet „Hund“ heraus. Wo der Trägersatz
endet, findet es, indem es den allein gesprochenen Trägersatz im ganzen Satz wiederfindet (DTW).
"""
import argparse, difflib, hashlib, json, os, re, subprocess, sys, time
import numpy as np

# tempo: Sprechtempo (1 = natürlich, kleiner = langsamer). Einzelwörter etwas langsamer, damit
# Leseanfänger die Laute gut hören (das iPad hat bisher mit 0.8 vorgelesen).
# Ausgewählt nach einem Vergleich mit Spracherkennung (schwierige Wörter wie Helm, Wald, halb, rollt,
# Strohhalm): Eva spricht ausgeschnittene Einzelwörter am deutlichsten. Dii, Kerstin und Ramona
# verschlucken oft das l; Thorsten klingt im Satz natürlich, beginnt ausgeschnittene Wörter aber oft
# mit einem b-artigen Laut.
STIMMEN = {
    "thorsten": dict(name="Thorsten", ordner="vits-piper-de_DE-thorsten-high", datei="de_DE-thorsten-high.onnx",
                     tempo={"wort": 0.85, "satz": 0.95}),
    "eva":      dict(name="Eva",      ordner="vits-piper-de_DE-eva_k-x_low",   datei="de_DE-eva_k-x_low.onnx",
                     tempo={"wort": 0.85, "satz": 0.95}),
    # ausprobiert, aber weniger deutlich:
    "dii":      dict(name="Dii",      ordner="vits-piper-de_DE-dii-high",      datei="de_DE-dii-high.onnx",
                     tempo={"wort": 0.85, "satz": 0.95}),
    "kerstin":  dict(name="Kerstin",  ordner="vits-piper-de_DE-kerstin-low",   datei="de_DE-kerstin-low.onnx",
                     tempo={"wort": 0.85, "satz": 0.9}),
}
# Der Trägersatz endet bewusst auf einem neutralen Vokal (Schwa): Bei „… heißt:“ blieb oft das t von
# „heißt“ am Wort hängen, nach „… also:“ begannen viele Wörter mit einem b-artigen Laut.
TRAEGER = "Das nächste Wort, bitte:"
# Nur für die Prüfung mit Spracherkennung. Whisper hört dieselbe Aufnahme je nach Satz davor etwas
# anders – darum wird beim gezielten Neuaufnehmen in allen drei Sätzen geprüft und gemittelt.
VORSPAENNE = ["Ich zeige dir jetzt das Wort", "Lies bitte dieses Wort", "Jetzt kommt das Wort"]
VORSPANN = VORSPAENNE[0]
SICHER = 0.75     # ab dieser Note gilt eine Aufnahme als deutlich
VERFAHREN = "traeger-bitte-1"   # ändert sich das Verfahren, wird alles neu aufgenommen

# Wörter, die die Stimmen sonst falsch aussprechen würden: Wort → was die Stimme stattdessen liest
AUSSPRACHE = {
    "100.000": "hunderttausend",
    "1.800": "eintausendachthundert",
    "2021": "zweitausendeinundzwanzig",
    "2007": "zweitausendsieben",
    "Auuu": "Auuuh",
    "Brrr": "Brr",
    "Psst": "Pst",
    "Kiwi": "Kiewie",
    "Kiwis": "Kiewies",
    # Nov 2026: Eva verschluckte das g in „Känguru“ (Whisper hörte „Könnuru“); so klingt es wie „Käng-gu-ru“
    "Känguru": "Käng-guru",
    "Kängurus": "Käng-gurus",
    "Kängurubaby": "Käng-guru-baby",
    "Riesenkänguru": "Riesenkäng-guru",
    # … und „Robben“ klang oft wie „Roben“
    "Robben": "Rob-ben",
}
# Wörter, die groß und klein verschieden klingen (der Weg / weg): getrennt aufnehmen
HOMOGRAPHE = {"weg", "sucht"}


# Zahlen als Wort (die Spracherkennung schreibt 600 oft als „sechshundert“)
EINER = ["null", "eins", "zwei", "drei", "vier", "fünf", "sechs", "sieben", "acht", "neun", "zehn", "elf", "zwölf",
         "dreizehn", "vierzehn", "fünfzehn", "sechzehn", "siebzehn", "achtzehn", "neunzehn"]
ZEHNER = ["", "", "zwanzig", "dreißig", "vierzig", "fünfzig", "sechzig", "siebzig", "achtzig", "neunzig"]


def _unter100(n, ende=True):
    if n < 20:
        return "ein" if (n == 1 and not ende) else EINER[n]
    z, e = divmod(n, 10)
    return ZEHNER[z] if e == 0 else ("ein" if e == 1 else EINER[e]) + "und" + ZEHNER[z]


def _unter1000(n, ende=True, ein=False):
    h, r = divmod(n, 100)
    s = (("ein" if ein else "") + "hundert" if h == 1 else EINER[h] + "hundert") if h else ""
    return s + (_unter100(r, ende) if r else "")


def zahlwoerter(text):
    """„600“ → {"sechshundert"}, „1.800“ → {"tausendachthundert", "eintausendachthundert", "achtzehnhundert"}"""
    roh = text.replace(".", "")
    if not roh.isdigit() or not 0 < int(roh) < 1000000:
        return set()
    n, out = int(roh), set()
    for ein in (False, True):
        t, r = divmod(n, 1000)
        s = ((("ein" if ein else "") + "tausend") if t == 1 else _unter1000(t, False, ein) + "tausend") if t else ""
        out.add(s + (_unter1000(r, True, ein) if r else ""))
    if 1100 <= n < 2000 and n % 100 == 0:
        out.add(_unter100(n // 100, False) + "hundert")
    return out


def schluessel(wort):
    """So sucht die App ein Wort im Paket: klein geschrieben, außer bei HOMOGRAPHE."""
    return wort if wort.lower() in HOMOGRAPHE else wort.lower()


def lade_tts(modelle, sid):
    import sherpa_onnx
    s = STIMMEN[sid]
    o = os.path.join(modelle, s["ordner"])
    cfg = sherpa_onnx.OfflineTtsConfig(
        model=sherpa_onnx.OfflineTtsModelConfig(
            vits=sherpa_onnx.OfflineTtsVitsModelConfig(
                model=os.path.join(o, s["datei"]), tokens=os.path.join(o, "tokens.txt"),
                data_dir=os.path.join(o, "espeak-ng-data"), noise_scale=0.667, noise_scale_w=0.5),
            num_threads=max(1, os.cpu_count() or 1), provider="cpu"),
        max_num_sentences=1)
    return sherpa_onnx.OfflineTts(cfg)


# ---------- Wort aus dem Trägersatz schneiden ----------
def logmel(x, rate, hop=0.01, win=0.025, n_mels=40):
    h, w = int(rate * hop), int(rate * win)
    nfft = 1
    while nfft < w:
        nfft *= 2
    if len(x) < w:
        x = np.pad(x, (0, w - len(x)))
    k = 1 + (len(x) - w) // h
    idx = np.arange(w)[None, :] + h * np.arange(k)[:, None]
    spec = np.abs(np.fft.rfft(x[idx] * np.hanning(w), nfft)) ** 2
    mel = lambda f: 2595 * np.log10(1 + f / 700)
    imel = lambda m: 700 * (10 ** (m / 2595) - 1)
    pts = imel(np.linspace(mel(60), mel(min(7600, rate / 2)), n_mels + 2))
    bins = np.floor((nfft + 1) * pts / rate).astype(int)
    fb = np.zeros((n_mels, nfft // 2 + 1))
    for i in range(n_mels):
        a, b, c = bins[i], bins[i + 1], bins[i + 2]
        if b > a:
            fb[i, a:b] = (np.arange(a, b) - a) / (b - a)
        if c > b:
            fb[i, b:c] = (c - np.arange(b, c)) / (c - b)
    return np.log(spec @ fb.T + 1e-8), np.sqrt((x[idx] ** 2).mean(1))


def traeger_ende(carrier, full, rate):
    """Frame (10 ms), an dem der Trägersatz im ganzen Satz endet – DTW mit offenem Ende."""
    A, ea = logmel(carrier, rate)
    B, eb = logmel(full, rate)
    laut = np.where(ea > ea.max() * 0.02)[0]
    A = A[: laut[-1] + 1]                       # Stille nach dem Trägersatz nicht mitzählen
    n, m = len(A), len(B)
    d = np.sqrt(((A[:, None, :] - B[None, :, :]) ** 2).sum(-1))
    D = np.full((n + 1, m + 1), np.inf)
    D[0, 0] = 0
    for i in range(1, n + 1):
        prev, cur, di = D[i - 1], D[i], d[i - 1]
        diag_up = np.minimum(prev[:-1], prev[1:]) + di   # Schritte von oben/links-oben
        for j in range(1, m + 1):
            cur[j] = min(diag_up[j - 1], cur[j - 1] + di[j - 1])
    kosten = D[n, 1:] / (n + np.arange(1, m + 1))
    return int(np.argmin(kosten)), eb


def schneide_wort(carrier, full, rate, art="laengste"):
    """art = "laengste": in der längsten Pause schneiden; "erste": in der ersten Pause direkt nach
    dem Trägersatz (hilft, wenn das Wort selbst eine lange Pause hat, z. B. Klett-band)."""
    je, e = traeger_ende(carrier, full, rate)
    if je >= len(e) - 5:
        return None
    # Am besten in der Sprechpause nach dem Doppelpunkt schneiden: Pause (≥ 40 ms Stille) kurz vor
    # oder nach dem gefundenen Ende suchen. Gibt es keine, am leisesten Punkt danach schneiden.
    still = e < max(e.max() * 0.02, 1e-4)
    a, b = max(1, je - 15), min(len(e) - 1, je + 25)
    pausen, i = [], a
    while i < b:
        if still[i]:
            j = i
            while j < len(e) and still[j]:
                j += 1
            if j - i >= 4 and j < len(e):
                pausen.append((j - i, i, j))
            i = j
        else:
            i += 1
    if art == "erste":
        pausen = [p for p in pausen if p[1] <= je + 8][:1]
    if pausen:
        _, i, j = max(pausen)
        k = max(i, j - 6)                        # bis 60 ms vor dem Wort
    else:
        weite = 8 if art == "erste" else 20      # leisester Punkt kurz danach
        k = je + int(np.argmin(e[je: je + weite]))
    return full[k * int(rate * 0.01):]


def zuschneiden(x, rate):
    """Stille am Anfang und Ende abschneiden (mit Rand, damit leise Anlaute wie h bleiben), Lautstärke angleichen."""
    if len(x) == 0:
        return x
    n = int(rate * 0.01)
    huelle = np.convolve(np.abs(x), np.ones(n) / n, mode="same")
    laut = np.where(huelle > max(0.004, huelle.max() * 0.015))[0]
    if len(laut):
        x = x[max(0, laut[0] - int(rate * 0.06)): min(len(x), laut[-1] + int(rate * 0.12))]
    x = x * (0.89 / (np.max(np.abs(x)) or 1.0))  # Spitze bei etwa -1 dB
    rampe = min(len(x) // 4, n)                  # weiche Ränder gegen Knackser
    if rampe > 0:
        x[:rampe] *= np.linspace(0, 1, rampe)
        x[-rampe:] *= np.linspace(1, 0, rampe)
    return np.concatenate([np.zeros(int(rate * 0.03)), x, np.zeros(int(rate * 0.09))]).astype(np.float32)


def als_mp3(x, rate, kbps):
    pcm = (np.clip(x, -1, 1) * 32767).astype("<i2").tobytes()
    return subprocess.run(
        ["ffmpeg", "-loglevel", "error", "-f", "s16le", "-ar", str(rate), "-ac", "1", "-i", "pipe:0",
         "-codec:a", "libmp3lame", "-b:a", f"{kbps}k", "-ac", "1", "-write_xing", "0", "-id3v2_version", "0",
         "-f", "mp3", "pipe:1"],
        input=pcm, capture_output=True, check=True).stdout


def als_16k(mp3):
    roh = subprocess.run(["ffmpeg", "-loglevel", "error", "-i", "pipe:0", "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                         input=mp3, capture_output=True, check=True).stdout
    return np.frombuffer(roh, dtype=np.float32)


# ---------- Prüfen mit Spracherkennung ----------
class Pruefer:
    """Whisper hört Vorspann + Aufnahme und schreibt auf, was es danach verstanden hat."""
    def __init__(self, ordner, tts, tempo, kontexte=1):
        import sherpa_onnx
        self.rec = sherpa_onnx.OfflineRecognizer.from_whisper(
            encoder=os.path.join(ordner, "small-encoder.int8.onnx"),
            decoder=os.path.join(ordner, "small-decoder.int8.onnx"),
            tokens=os.path.join(ordner, "small-tokens.txt"), language="de",
            num_threads=max(1, os.cpu_count() or 1))
        # eigener Vorspann: nach „bitte“ hörte Whisper oft „bittere …“ und zerlegte das Wort falsch
        self.vorspaenne = []
        for satz in VORSPAENNE[:max(1, kontexte)]:
            a = tts.generate(satz, sid=0, speed=tempo)
            self.vorspaenne.append(als_16k(als_mp3(np.array(a.samples, np.float32), a.sample_rate, 32)))
        self.vorspann = self.vorspaenne[0]

    @staticmethod
    def norm(t):
        t = t.lower().replace("ß", "ss")
        return " ".join(re.sub(r"[^a-zäöü0-9 ]+", " ", t).split())

    @staticmethod
    def erwartet(woerter):
        """alle Schreibweisen, die als richtig gelten (bei Zahlen auch das Zahlwort)"""
        alle = set(woerter)
        for w in woerter:
            alle |= zahlwoerter(w)
        return alle

    def hoere(self, vorspann, mp3):
        z, zz = np.zeros(4000, np.float32), np.zeros(8000, np.float32)
        s = self.rec.create_stream()
        s.accept_waveform(16000, np.concatenate([zz, vorspann, z, als_16k(mp3), zz]))
        self.rec.decode_stream(s)
        text = s.result.text
        if "wort" in text.lower():               # alles nach dem Vorspann ist das Wort
            text = re.split("wort", text, flags=re.I)[-1]
        return text.strip(" \"'„“.,!:?")

    @staticmethod
    def laut(t):
        """Lautschlüssel ähnlich wie in der App (phoneticKey), dazu ä = e und ck = k: Gleich Klingendes
        zählt gleich (Whisper schreibt „Höle“ für Höhle, „Kenguru“ für Känguru). Doppelte Mitlaute
        bleiben stehen – sie zeigen den kurzen Selbstlaut (Robben ≠ Roben)."""
        t = t.lower().replace("ß", "ss").replace("ph", "f").replace("th", "t").replace("v", "f").replace("y", "i")
        t = re.sub(r"[^a-zäöü]", "", t).replace("ä", "e").replace("ck", "k").replace("ie", "i")
        t = re.sub(r"([aeiouäöü])h(?![aeiouäöü])", r"\1", t).replace("dt", "t")
        return re.sub(r"d$", "t", re.sub(r"b$", "p", re.sub(r"g$", "k", t)))

    def vergleiche(self, woerter, gehoert):
        g = self.norm(gehoert).replace(" ", "")
        gl = self.laut(gehoert)
        beste = 0.0
        for w in self.erwartet(woerter):
            beste = max(beste, difflib.SequenceMatcher(None, self.norm(w).replace(" ", ""), g).ratio())
            if gl and not any(c.isdigit() for c in w):
                beste = max(beste, difflib.SequenceMatcher(None, self.laut(w), gl).ratio())
        return beste

    def note(self, woerter, mp3, kontexte=1, abbruch=None):
        """Mittlere Note über die ersten `kontexte` Vorspänne. abbruch: hört auf, sobald klar ist,
        dass die Note diesen Wert nicht mehr erreichen kann (spart Zeit)."""
        noten, gehoert = [], []
        k = min(kontexte, len(self.vorspaenne))
        for i in range(k):
            h = self.hoere(self.vorspaenne[i], mp3)
            noten.append(self.vergleiche(woerter, h))
            gehoert.append(h)
            if abbruch is not None and (sum(noten) + (k - len(noten))) / k < abbruch:
                break
        return sum(noten) / k, " | ".join(gehoert)   # abgebrochene Sätze zählen mit 0


def nimm_auf(tts, traeger_audio, pruefer, w, eingabe, tempi, versuche, kontexte, kbps, ziel):
    """Lässt das Wort bis zu `versuche`-mal im Trägersatz sprechen (Tempo reihum aus `tempi`), schneidet
    es auf zwei Arten heraus und gibt die beste Fassung zurück: (note, mp3, gehoert) oder None."""
    beste = None
    for versuch in range(versuche):
        tempo = tempi[versuch % len(tempi)]
        if tempo not in traeger_audio:
            c = tts.generate(TRAEGER, sid=0, speed=tempo)
            traeger_audio[tempo] = np.array(c.samples, np.float32)
        s = tts.generate(f"{TRAEGER} {eingabe}.", sid=0, speed=tempo)
        voll = np.array(s.samples, np.float32)
        gesehen = set()
        for schnitt in (("laengste", "erste") if pruefer else ("laengste",)):
            stueck = schneide_wort(traeger_audio[tempo], voll, s.sample_rate, schnitt)
            if stueck is None or len(stueck) < s.sample_rate * 0.12 or len(stueck) in gesehen:
                continue
            gesehen.add(len(stueck))
            kandidat = als_mp3(zuschneiden(stueck.copy(), s.sample_rate), s.sample_rate, kbps)
            if pruefer:
                note, gehoert = pruefer.note({w, eingabe}, kandidat, kontexte, abbruch=beste[0] if beste else None)
            else:
                note, gehoert = 1.0, ""
            if beste is None or note > beste[0]:
                beste = (note, kandidat, gehoert)
            if note >= ziel:
                break
        if beste and beste[0] >= ziel:
            break
    return beste


def lade_paket(ziel, sid):
    """Aufnahmen aus dem vorhandenen Paket: {Schlüssel: MP3}"""
    try:
        with open(os.path.join(ziel, "stimmen.json"), encoding="utf-8") as f:
            manifest = json.load(f)
        st = next(v for v in manifest["stimmen"] if v["id"] == sid)
        with open(os.path.join(ziel, st["datei"]), "rb") as f:
            roh = f.read()
        return {k: roh[p:p + n] for k, (p, n) in st["eintraege"].items() if p + n <= len(roh)}
    except Exception:
        return {}


def main():
    hier = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser()
    ap.add_argument("--app", default=os.path.join(hier, ".."))
    ap.add_argument("--modelle", required=True)
    ap.add_argument("--whisper", default="", help="Ordner mit sherpa-onnx-whisper-small (optional, zum Prüfen)")
    ap.add_argument("--stimmen", default="eva")
    ap.add_argument("--kbps", type=int, default=32)
    ap.add_argument("--cache", default=os.path.join(hier, ".cache"))
    ap.add_argument("--pruefen", action="store_true", help="vorhandene Aufnahmen prüfen, nichts ändern")
    ap.add_argument("--neu", default="", help="diese Wörter neu aufnehmen (Komma-Liste oder „unsicher“)")
    ap.add_argument("--versuche", type=int, default=6, help="Fassungen pro Wort bei --neu")
    ap.add_argument("--alles-neu", action="store_true", help="vorhandenes Paket nicht wiederverwenden")
    a = ap.parse_args()
    if (a.pruefen or a.neu) and not a.whisper:
        ap.error("--pruefen und --neu brauchen --whisper")

    roh = subprocess.run(["node", os.path.join(hier, "woerter-sammeln.js"), a.app],
                         capture_output=True, check=True, text=True).stdout
    daten = json.loads(roh)

    # Pro Schlüssel eine Aufnahme. Bei Groß/klein-Paaren die kleingeschriebene Form vorlesen lassen.
    auftraege = {}
    for w in daten["woerter"]:
        k = schluessel(w)
        if k not in auftraege or (w == w.lower() and auftraege[k] != auftraege[k].lower()):
            auftraege[k] = w
    saetze = {s.lower(): s for s in daten["saetze"]}

    ziel = os.path.join(a.app, "daten")
    os.makedirs(a.cache, exist_ok=True)
    pfad_unsicher = os.path.join(a.cache, "unsicher.json")
    manifest = {"erstellt": time.strftime("%Y-%m-%d"), "probe": daten["saetze"][0], "stimmen": []}
    bericht, neu_bericht = {}, {}
    for sid in [x.strip() for x in a.stimmen.split(",") if x.strip()]:
        tts = pruefer = None
        traeger_audio = {}
        tempo = STIMMEN[sid]["tempo"]
        cache = os.path.join(a.cache, sid)
        os.makedirs(cache, exist_ok=True)
        paket = {} if a.alles_neu else lade_paket(ziel, sid)
        teile, eintraege, pos, neu, t0, unsicher = [], {}, 0, 0, time.time(), []
        alles = [(k, w, "wort") for k, w in sorted(auftraege.items())] + [(k, s, "satz") for k, s in saetze.items()]

        def bereit(kontexte):
            nonlocal tts, pruefer
            if tts is None:
                tts = lade_tts(a.modelle, sid)
            if a.whisper and (pruefer is None or len(pruefer.vorspaenne) < kontexte):
                pruefer = Pruefer(a.whisper, tts, tempo["satz"], kontexte)

        # ---- nur prüfen: erst in einem Satz, nicht ganz Sicheres noch in zwei weiteren ----
        if a.pruefen:
            bereit(len(VORSPAENNE))
            fehlt, geprueft = [], 0
            for i, (k, w, art) in enumerate(alles):
                if art != "wort":
                    continue
                if k not in paket:
                    fehlt.append(w)
                    continue
                eingabe = AUSSPRACHE.get(w, w)
                geprueft += 1
                note, gehoert = pruefer.note({w, eingabe}, paket[k], 1)
                if note < 1:
                    note, gehoert = pruefer.note({w, eingabe}, paket[k], len(VORSPAENNE))
                if note < SICHER:
                    unsicher.append((round(note, 2), w, gehoert))
                if i % 100 == 0:
                    print(f"  … {i}/{len(alles)} geprüft, {len(unsicher)} unsicher", flush=True)
            bericht[sid] = sorted(unsicher)
            print(f"{sid}: {geprueft} Aufnahmen geprüft · {len(unsicher)} unsicher"
                  + (f" · {len(fehlt)} ohne Aufnahme: {', '.join(fehlt)}" if fehlt else ""), flush=True)
            for note, w, gehoert in sorted(unsicher):
                print(f"   {note:.2f}  {w}  → {gehoert}")
            continue

        # ---- Wörter, die neu aufgenommen werden sollen ----
        if a.neu.strip().lower() == "unsicher":
            with open(pfad_unsicher, encoding="utf-8") as f:
                gewuenscht = [w for _, w, _ in json.load(f).get(sid, [])]
        else:
            gewuenscht = [x.strip() for x in a.neu.split(",") if x.strip()]
        neu_aufnehmen = {schluessel(w) for w in gewuenscht} | {w.lower() for w in gewuenscht}
        unbekannt = [w for w in gewuenscht if schluessel(w) not in auftraege and w.lower() not in auftraege]
        if unbekannt:
            print("  ! nicht in der App:", ", ".join(unbekannt), flush=True)

        for k, w, art in alles:
            eingabe = AUSSPRACHE.get(w, w)
            h = hashlib.sha1(f"{VERFAHREN}|{eingabe}|{tempo[art]}|{a.kbps}|{bool(a.whisper)}".encode()).hexdigest()[:16]
            pfad = os.path.join(cache, h + ".mp3")
            if art == "wort" and k in neu_aufnehmen:
                # Gezielt neu: mehrere Fassungen, jede in drei Sätzen geprüft; die alte zählt mit
                bereit(len(VORSPAENNE))
                kontexte = len(VORSPAENNE)
                t = tempo["wort"]
                beste = nimm_auf(tts, traeger_audio, pruefer, w, eingabe, [t, round(t - 0.05, 2), round(t + 0.05, 2)],
                                 a.versuche, kontexte, a.kbps, ziel=1.0)
                alt = paket.get(k)
                alt_note, alt_gehoert = pruefer.note({w, eingabe}, alt, kontexte) if alt else (None, "")
                if beste is None and alt is None:
                    print(f"  ! nicht aufgenommen: {w!r}", flush=True)
                    continue
                if beste is not None and (alt is None or beste[0] >= alt_note):
                    note, mp3, gehoert, behalten = beste[0], beste[1], beste[2], "neu"
                else:
                    note, mp3, gehoert, behalten = alt_note, alt, alt_gehoert, "alt"
                neu_bericht.setdefault(sid, []).append({
                    "wort": w, "alt": None if alt_note is None else round(alt_note, 2),
                    "neu": None if beste is None else round(beste[0], 2), "behalten": behalten, "gehoert": gehoert})
                print(f"  {w}: alt {alt_note if alt_note is None else round(alt_note, 2)} → neu "
                      f"{None if beste is None else round(beste[0], 2)} · behalten: {behalten} · „{gehoert}“", flush=True)
                if note < SICHER:
                    unsicher.append((round(note, 2), w, gehoert))
                with open(pfad, "wb") as f:
                    f.write(mp3)
                neu += 1
            elif os.path.exists(pfad):
                with open(pfad, "rb") as f:
                    mp3 = f.read()
            elif k in paket:
                mp3 = paket[k]               # schon im Paket – nicht neu aufnehmen
            else:
                bereit(1)
                if art == "satz":
                    s = tts.generate(eingabe, sid=0, speed=tempo["satz"])
                    mp3 = als_mp3(zuschneiden(np.array(s.samples, np.float32), s.sample_rate), s.sample_rate, a.kbps)
                else:
                    beste = nimm_auf(tts, traeger_audio, pruefer, w, eingabe, [tempo["wort"]],
                                     3 if pruefer else 1, 1, a.kbps, ziel=SICHER)
                    if beste is None:
                        print(f"  ! nicht aufgenommen: {w!r}", flush=True)
                        continue
                    mp3 = beste[1]
                    if pruefer and beste[0] < SICHER:
                        unsicher.append((round(beste[0], 2), w, beste[2]))
                with open(pfad, "wb") as f:
                    f.write(mp3)
                neu += 1
            eintraege[k] = [pos, len(mp3)]
            teile.append(mp3)
            pos += len(mp3)
        paket_neu = b"".join(teile)
        datei = f"stimme-{sid}.bin"
        with open(os.path.join(ziel, datei), "wb") as f:
            f.write(paket_neu)
        manifest["stimmen"].append({
            "id": sid, "name": STIMMEN[sid]["name"], "datei": datei,
            "version": hashlib.sha1(paket_neu).hexdigest()[:10], "eintraege": eintraege})
        bericht[sid] = sorted(unsicher)
        print(f"{sid}: {len(eintraege)} Aufnahmen ({neu} neu) · {len(paket_neu) / 1e6:.2f} MB · {time.time() - t0:.0f} s"
              + (f" · {len(unsicher)} unsicher" if a.whisper else ""), flush=True)

    if a.whisper:
        with open(pfad_unsicher, "w", encoding="utf-8") as f:
            json.dump(bericht, f, ensure_ascii=False, indent=1)
    if neu_bericht:
        with open(os.path.join(a.cache, "neu-aufgenommen.json"), "w", encoding="utf-8") as f:
            json.dump(neu_bericht, f, ensure_ascii=False, indent=1)
    if a.pruefen:
        print("geprüft, nichts geändert. Liste:", pfad_unsicher)
        return
    with open(os.path.join(ziel, "stimmen.json"), "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, separators=(",", ":"))
    print("fertig:", os.path.join(ziel, "stimmen.json"))


if __name__ == "__main__":
    main()
