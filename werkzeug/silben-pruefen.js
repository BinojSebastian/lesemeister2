// Prüft, ob jedes Wort aus daten/tier-texte.js einen Eintrag in daten/silben-texte.js hat.
// Aufruf:  node werkzeug/silben-pruefen.js        (im Ordner der App)
const fs = require('fs');
global.window = {};
global.LESE_MEISTER = window.LESE_MEISTER = {};
['daten/tier-texte.js', 'daten/silben-texte.js'].forEach(f => eval(fs.readFileSync(f, 'utf8').replace('window.LESE_MEISTER = window.LESE_MEISTER || {};', '')));
const known = new Set(LESE_MEISTER.silbenAusnahmen.map(w => w.replace(/-/g, '').toLowerCase()));
const words = new Set();
const add = s => (String(s).match(/[A-Za-zÄÖÜäöüß]+/g) || []).forEach(w => words.add(w));
const walk = (o, key) => {
    if (typeof o === 'string') { if (!['id', 'bild', 'wer', 'land'].includes(key)) add(o); }
    else if (Array.isArray(o)) o.forEach(x => walk(x, key));
    else if (o && typeof o === 'object') Object.entries(o).forEach(([k, v]) => walk(v, k));
};
walk(LESE_MEISTER.tierTexte);
const missing = [...words].filter(w => !known.has(w.toLowerCase())).sort((a, b) => a.localeCompare(b, 'de'));
console.log(words.size + ' verschiedene Wörter, ' + missing.length + ' ohne geprüfte Silben' + (missing.length ? ':\n' + missing.join(' ') : '.'));
process.exit(missing.length ? 1 : 0);
