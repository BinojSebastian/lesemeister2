# Lese-Meister Tiere (Version 2)

Lese-Lernspiel für die 2. Klasse im Dschungel-Layout. Papagei Kiko begleitet durch drei Spiele:

- **Sichtwörter** – häufige Wörter auf einen Blick lesen
- **Silben** – Wörter in Sprechsilben lesen (blau und rot wie in der Silbenfibel)
- **Tiere** – 12 Sachtexte über Tiere aus aller Welt, je etwa 200–240 Wörter, mit Lesequiz

Für jede Runde und jede richtige Quiz-Antwort gibt es Feuer 🔥 für den Heißluftballon. Der Ballon
fliegt in 15 Stationen einmal um die Welt. In jedem Land gibt es einen Stempel in den Reisepass.

Die App ist eine einzelne Seite (`index.html`) ohne Server, ohne Anmeldung und ohne Werbung.
Alle Fortschritte bleiben auf dem Gerät.

## Hochladen in ein neues GitHub-Repo

1. Auf github.com ein neues, leeres Repo anlegen (z. B. `lesemeister-tiere`, öffentlich).
2. Die ZIP-Datei entpacken.
3. Im Repo **Add file › Upload files** wählen und den **Inhalt** des entpackten Ordners hineinziehen
   (also `index.html`, `icon-180.png`, die Ordner `daten` und `werkzeug` und die übrigen Dateien –
   nicht den Ordner selbst). **Commit changes**.
4. **Settings › Pages**: Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)`, **Save**.
5. Nach ein bis zwei Minuten läuft die App unter `https://<benutzer>.github.io/<repo-name>/`.

Am iPad: Adresse in Safari öffnen, **Teilen › Zum Home-Bildschirm**. Das Symbol ist Kiko.
Die alte Weltall-App bleibt unberührt; beide Apps speichern ihre Daten getrennt.

## Dateien

| Datei | Inhalt |
|---|---|
| `index.html` | die App (Layout, Spiele, Weltreise, Einstellungen) |
| `daten/sichtwoerter.js` | Wortlisten für das Sichtwörter-Spiel |
| `daten/silben.js` | Wortlisten für das Silben-Spiel |
| `daten/tier-texte.js` | die 12 Kapitel mit Lesequiz |
| `daten/silben-texte.js` | geprüfte Silben für jedes Wort der Kapitel |
| `daten/bilder.js` | eigene Zeichnungen zu den Kapiteln |
| `daten/stimmen.json`, `daten/stimme-eva.bin` | vorab aufgenommene Stimme „Eva“ |
| `LERNINHALTE.md` | Regeln, Schwierigkeit und alle Quellen der Fakten |
| `werkzeug/` | Hilfsskripte (Silben prüfen, Stimme aufnehmen) |

## Inhalte ändern

- **Wörter**: in `daten/sichtwoerter.js` und `daten/silben.js` einfach in die Listen schreiben.
- **Texte**: in `daten/tier-texte.js`. Der Aufbau ist oben in der Datei erklärt.
  Jedes neue Wort braucht einen Eintrag in `daten/silben-texte.js`. Fehlende Wörter zeigt die App
  unter ⚙️ › Bibliothek › Texte an; `node werkzeug/silben-pruefen.js` listet sie ebenfalls.
- **Fakten**: nur Belegtes aufnehmen und die Quelle in `LERNINHALTE.md` eintragen.
- **Stimme**: Nach Änderungen an Wörtern oder Texten `werkzeug/stimmen-aufnehmen.py` laufen lassen
  (Anleitung oben in der Datei). Wörter ohne Aufnahme liest solange die Stimme des Geräts.

## Silben

Die Silben folgen der Schulfibel „ABC der Tiere – Die Silbenfibel“ (E-sel, O-ma, hi-nein, Rü-cken,
Fens-ter). Unter ⚙️ › Lesetexte gibt es den Schalter **Einzelne Selbstlaute abtrennen**:
an = wie in der Fibel (E-sel, a-ber), aus = Esel, aber in einer Farbe.

## Lizenz der Stimme

Siehe `STIMMEN-LIZENZ.txt`.
