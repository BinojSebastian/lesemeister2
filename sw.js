// Service Worker des Lese-Meisters (Tiere) – damit die App auf dem iPad auch ohne Internet startet.
//
// Was im Speicher des Geräts liegt:
//   index.html, icon-180.png und alle Dateien im Ordner daten/ (Wörter, Texte, Silben, Bilder,
//   stimmen.json und die Stimme stimme-eva.bin).
//
// Wie er arbeitet:
//   - App und Daten: zuerst aus dem Internet (so kommen Änderungen auf GitHub wie bisher nach
//     1–2 Minuten an). Antwortet das Netz nicht innerhalb von 4 Sekunden oder gar nicht, kommt
//     die gespeicherte Fassung.
//   - Stimme (4 MB): aus dem Speicher. Eine neue Aufnahme hat in stimmen.json eine neue
//     Versionsnummer und wird dann einmal neu geladen; die alte wird gelöscht.
//
// Die Weltall-App unter derselben Adresse (github.io) bleibt unberührt: Dieser Service Worker
// gilt nur für den Ordner der Tier-App und löscht nur seine eigenen Speicher.
'use strict';

const PREFIX = 'lese-meister-tiere-';
const CACHE = PREFIX + 'v1';
const NETZ_WARTEZEIT = 4000;   // ms – danach die gespeicherte Fassung zeigen
const APP_DATEIEN = [
    'index.html',
    'icon-180.png',
    'daten/sichtwoerter.js',
    'daten/silben.js',
    'daten/tier-texte.js',
    'daten/silben-texte.js',
    'daten/bilder.js',
    'daten/stimmen.json'
];
const STIMME_RE = /^daten\/stimme-[^/]+\.bin$/;

function adresse(pfad) { return new URL(pfad, self.registration.scope).href; }
// Hintergrundarbeit anmelden (manche Browser erlauben das nur, solange die Antwort noch läuft)
function nebenbei(event, arbeit) {
    try { event.waitUntil(arbeit); } catch (e) { /* Arbeit läuft trotzdem weiter */ }
}

// Antworten mit Umleitung (z. B. …/lesemeister2 → …/lesemeister2/) mag Safari bei Seitenaufrufen nicht
function ohneUmleitung(res) {
    if (!res || !res.redirected) return res;
    return res.blob().then(body => new Response(body, { status: res.status, statusText: res.statusText, headers: res.headers }));
}

// Eine Datei frisch aus dem Netz holen und speichern
async function holeUndSpeichere(cache, pfad) {
    const res = await fetch(adresse(pfad), { cache: 'no-cache' });
    if (res.ok) await cache.put(adresse(pfad), await ohneUmleitung(res.clone()));
    return res;
}

// Stimmenpakete passend zu stimmen.json speichern (genau die Adresse, die die App abruft:
// daten/<datei>?v=<version>) und ältere Fassungen derselben Datei löschen
async function stimmenSpeichern(cache, manifestAntwort) {
    if (!manifestAntwort || !manifestAntwort.ok) return;
    let manifest;
    try { manifest = await manifestAntwort.json(); } catch (e) { return; }
    const stimmen = manifest && Array.isArray(manifest.stimmen) ? manifest.stimmen : [];
    for (const stimme of stimmen) {
        if (!stimme || typeof stimme.datei !== 'string') continue;
        const url = adresse('daten/' + encodeURIComponent(stimme.datei) + '?v=' + encodeURIComponent(stimme.version || ''));
        try {
            if (!(await cache.match(url))) {
                const res = await fetch(url);
                if (!res.ok) continue;
                await cache.put(url, res);
            }
            await alteFassungenLoeschen(cache, url);
        } catch (e) { /* offline – beim nächsten Mal */ }
    }
}
async function alteFassungenLoeschen(cache, url) {
    const neu = new URL(url);
    for (const req of await cache.keys()) {
        const alt = new URL(req.url);
        if (alt.pathname === neu.pathname && alt.search !== neu.search) await cache.delete(req);
    }
}

self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE);
        // Einzeln laden: Fehlt eine Datei, sollen die anderen trotzdem gespeichert werden
        await Promise.all(APP_DATEIEN.map(pfad => holeUndSpeichere(cache, pfad).catch(() => null)));
        await stimmenSpeichern(cache, await cache.match(adresse('daten/stimmen.json')));
        await self.skipWaiting();
    })());
});

self.addEventListener('activate', event => {
    event.waitUntil((async () => {
        // nur eigene, ältere Speicher löschen (nie die der Weltall-App)
        for (const name of await caches.keys()) {
            if (name.startsWith(PREFIX) && name !== CACHE) await caches.delete(name);
        }
        await self.clients.claim();
    })());
});

// Zuerst das Netz (mit Zeitlimit), sonst die gespeicherte Fassung
async function netzZuerst(event, pfad) {
    const cache = await caches.open(CACHE);
    const schluessel = adresse(pfad);
    const netz = fetch(schluessel, { cache: 'no-cache' })
        .then(async res => {
            if (res && res.ok) {
                const sauber = await ohneUmleitung(res);
                await cache.put(schluessel, sauber.clone());
                // Neue stimmen.json → passende Stimme gleich mit speichern (im Hintergrund)
                if (pfad === 'daten/stimmen.json') nebenbei(event, stimmenSpeichern(cache, sauber.clone()));
                return sauber;
            }
            return res;
        })
        .catch(() => null);
    nebenbei(event, netz);
    let res = await Promise.race([netz, new Promise(r => setTimeout(r, NETZ_WARTEZEIT, null))]);
    if (res && res.ok) return res;
    const gespeichert = await cache.match(schluessel);
    if (gespeichert) return gespeichert;
    res = res || await netz;
    return res || new Response('Offline – diese Datei ist noch nicht gespeichert.', {
        status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' }
    });
}

// Stimme: aus dem Speicher; fehlt sie dort, einmal laden und speichern
async function stimmeAusSpeicher(event) {
    const cache = await caches.open(CACHE);
    const url = event.request.url;
    const gespeichert = await cache.match(url);
    if (gespeichert) return gespeichert;
    try {
        const res = await fetch(url);
        if (res.ok) {
            nebenbei(event, cache.put(url, res.clone()).then(() => alteFassungenLoeschen(cache, url)).catch(() => {}));
        }
        return res;
    } catch (e) {
        return new Response('', { status: 503 });
    }
}

self.addEventListener('fetch', event => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    const scope = new URL(self.registration.scope);
    if (url.origin !== scope.origin || !url.pathname.startsWith(scope.pathname)) return;
    const pfad = decodeURIComponent(url.pathname.slice(scope.pathname.length));

    if (STIMME_RE.test(pfad)) {
        event.respondWith(stimmeAusSpeicher(event));
    } else if (req.mode === 'navigate' || pfad === '' || pfad === 'index.html') {
        event.respondWith(netzZuerst(event, 'index.html'));
    } else if (pfad === 'icon-180.png' || pfad.startsWith('daten/')) {
        event.respondWith(netzZuerst(event, pfad));
    }
});
