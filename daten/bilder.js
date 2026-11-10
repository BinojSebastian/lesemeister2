/* =====================================================================
   LESE-MEISTER TIERE – BILDER FÜR DIE TIER-TEXTE
   =====================================================================
   Eigene Zeichnungen (SVG) im flachen Stil von Lernkarten – keine
   kopierten Bilder. In daten/tier-texte.js wird ein Bild über seinen
   Namen eingesetzt, z. B. bild: "Tukan". Groß-/Kleinschreibung ist egal.

   Vorhandene Bilder (alle Namen zeigt die App unter ⚙️ › Bibliothek › Texte):
   Wolf, Rudel, Heulen, Wolfsnase, Welpen, Wolf und Hund · Elefant, Elefant trinkt,
   Schlammbad, Herde, Elefantenkind · Chamäleon, Farben, Augen, Zunge, Winzling ·
   Tiger, Streifen, Tigerjagd, Tiger schwimmt, Tigerkinder · Panda, Panda frisst,
   Pandapfote, Panda klettert, Pandababy · Schneeaffe, Heiße Quelle, Affengruppe,
   Baumrinde, Affe fischt · Känguru, Sprung, Beutel, Schatten, Boxen · Kiwi,
   Kiwi am Tag, Kiwi sucht, Kiwi-Ei · Tukan, Schnabel, Früchte, Hüpfen, Baumhöhle,
   Wärme · Faultier, Faultier frisst, Grünes Fell, Faultier schwimmt,
   Faultier am Boden · Biber, Biberzähne, Damm, Biberburg, Biber schwimmt,
   Biberfamilie · Eisbär, Eisbärfell, Eisloch, Eisbär schwimmt, Schneehöhle,
   Schmelzendes Eis

   Wer ein neues Bild braucht, kann statt eines Namens auch ein Emoji
   eintragen, z. B. bild: "🐘".
   ===================================================================== */
window.LESE_MEISTER = window.LESE_MEISTER || {};   // diese Zeile nicht ändern

(function () {
    'use strict';
    var W = 320, H = 180;

    // ---------- Hilfen ----------
    function svg(w, h, body) {
        return '<svg viewBox="0 0 ' + w + ' ' + h + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + body + '</svg>';
    }
    function grad(id, top, bottom) {
        return '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
            '<stop offset="0" stop-color="' + top + '"/><stop offset="1" stop-color="' + bottom + '"/></linearGradient></defs>' +
            '<rect width="' + W + '" height="' + H + '" fill="url(#' + id + ')"/>';
    }
    // Ein Blatt: Spitze zeigt nach rechts, gedreht um den Stiel
    function leaf(x, y, len, rot, color) {
        var w = len * 0.28;
        return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ')">' +
            '<path d="M0 0 C' + len * 0.3 + ' ' + (-w) + ' ' + len * 0.8 + ' ' + (-w) + ' ' + len + ' 0 C' + len * 0.8 + ' ' + w + ' ' + len * 0.3 + ' ' + w + ' 0 0 Z" fill="' + color + '"/>' +
            '<path d="M0 0 L' + len * 0.92 + ' 0" stroke="rgba(0,0,0,0.18)" stroke-width="1"/></g>';
    }
    function leaves(list) { return list.map(function (l) { return leaf(l[0], l[1], l[2], l[3], l[4]); }).join(''); }
    // Hintergrund: heller Himmel, ferner Wald, Blätter in den Ecken
    function dschungel(id, night) {
        var out = night ? grad(id, '#1b2a4a', '#27466b') : grad(id, '#c9ecf4', '#eaf6d8');
        var far = night ? '#1f4a3c' : '#9fd49a', mid = night ? '#173a2f' : '#6fbb72';
        out += '<path d="M0 150 C40 118 80 132 120 120 C170 104 210 134 250 118 C280 106 305 124 320 116 L320 180 L0 180 Z" fill="' + far + '"/>';
        out += '<path d="M0 166 C50 146 90 162 140 150 C190 138 240 164 320 144 L320 180 L0 180 Z" fill="' + mid + '"/>';
        return out;
    }
    function ecken(night) {
        var a = night ? '#12402f' : '#2e8b57', b = night ? '#0e3326' : '#1f6b45', c = night ? '#185a3f' : '#49a86b';
        return leaves([
            [0, 4, 62, 28, b], [0, 0, 70, 8, a], [10, 0, 52, 52, c],
            [320, 6, 60, 152, b], [320, 0, 72, 172, a], [308, 0, 50, 128, c]
        ]);
    }
    function ast(x1, y1, x2, y2, dick) {
        return '<path d="M' + x1 + ' ' + y1 + ' L' + x2 + ' ' + y2 + '" stroke="#7a4f2a" stroke-width="' + (dick || 9) + '" stroke-linecap="round"/>' +
            '<path d="M' + x1 + ' ' + (y1 - 2) + ' L' + x2 + ' ' + (y2 - 2) + '" stroke="#96673a" stroke-width="' + (dick || 9) / 3 + '" stroke-linecap="round"/>';
    }
    function frucht(x, y, r, farbe) {
        return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + (farbe || '#e74c3c') + '"/>' +
            '<circle cx="' + (x - r * 0.3) + '" cy="' + (y - r * 0.3) + '" r="' + r * 0.28 + '" fill="rgba(255,255,255,0.55)"/>';
    }

    // ---------- Der Riesentukan ----------
    // Schwarzer Körper, weiße Kehle, oranger Schnabel mit schwarzem Fleck an der Spitze,
    // orange Haut um das Auge, roter Fleck unter dem Schwanz. (x, y) = Mitte des Körpers.
    function tukan(id, x, y, s, flip, extra) {
        return '<g transform="translate(' + x + ' ' + y + ') scale(' + (flip ? -s : s) + ' ' + s + ')">' +
            '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="1" y2="0">' +
            '<stop offset="0" stop-color="#ffc93c"/><stop offset="0.55" stop-color="#f7941d"/><stop offset="1" stop-color="#e8641b"/></linearGradient></defs>' +
            '<path d="M-14 16 L-40 52 L-28 54 L-4 30 Z" fill="#1c1c1c"/>' +                 // Schwanz
            '<ellipse cx="-10" cy="27" rx="7" ry="5" fill="#d63031"/>' +                      // roter Fleck
            '<path d="M-2 34 L-2 44 M6 34 L6 44" stroke="#7f8c8d" stroke-width="3" stroke-linecap="round"/>' +
            '<ellipse cx="0" cy="4" rx="21" ry="31" transform="rotate(-18)" fill="#1c1c1c"/>' + // Körper
            '<path d="M-16 -6 C-30 6 -30 26 -18 34 C-12 22 -10 6 -16 -6 Z" fill="#2d2d2d"/>' +  // Flügel
            '<circle cx="9" cy="-28" r="15" fill="#1c1c1c"/>' +                                // Kopf
            '<ellipse cx="13" cy="-12" rx="12" ry="14" fill="#ffffff"/>' +                     // Kehle
            '<path d="M21 -40 C42 -50 68 -42 76 -22 C62 -27 42 -23 21 -22 Z" fill="url(#' + id + ')"/>' + // Schnabel
            '<path d="M24 -30 C44 -32 62 -30 75 -23" stroke="rgba(0,0,0,0.28)" stroke-width="1.2" fill="none"/>' +
            '<path d="M66 -35 C72 -32 76 -27 76 -22 C72 -24 67 -25 62 -25.5 Z" fill="#1c1c1c"/>' + // Fleck an der Spitze
            '<path d="M19.5 -41 L23 -41 L23 -21.5 L19.5 -21.5 Z" fill="#1c1c1c"/>' +
            '<circle cx="13" cy="-32" r="6.5" fill="#f39c12"/>' +                              // Haut um das Auge
            '<circle cx="13" cy="-32" r="3.2" fill="#3b5bdb"/><circle cx="13" cy="-32" r="2" fill="#111"/>' +
            '<circle cx="13.8" cy="-32.8" r="0.7" fill="#fff"/>' +
            (extra || '') + '</g>';
    }

    // ---------- Szenen (320 × 180) ----------
    var S = {};

    S['Tukan'] = function (id) {
        return dschungel(id + 'h') + ast(40, 138, 290, 126) +
            leaves([[250, 126, 40, -40, '#2e8b57'], [262, 124, 34, 20, '#49a86b'], [70, 136, 36, 200, '#2e8b57']]) +
            tukan(id + 't', 150, 92, 1.25) + ecken();
    };

    // Schnabel im Querschnitt: außen eine dünne Schicht aus Horn, innen ein Gerüst mit vielen Hohlräumen
    S['Schnabel'] = function (id) {
        var out = grad(id + 'h', '#fff6dc', '#ffe9b8');
        out += '<defs><linearGradient id="' + id + 's" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffc93c"/><stop offset="1" stop-color="#e8641b"/></linearGradient>' +
            '<clipPath id="' + id + 'c"><path d="M40 52 C120 22 240 40 286 112 C230 96 130 112 40 118 Z"/></clipPath></defs>';
        out += '<path d="M40 52 C120 22 240 40 286 112 C230 96 130 112 40 118 Z" fill="#fffaf0"/>';
        out += '<g clip-path="url(#' + id + 'c)" fill="none" stroke="#e6c79a" stroke-width="2">';
        for (var r = 0; r < 5; r++) {
            for (var c = 0; c < 15; c++) {
                out += '<circle cx="' + (48 + c * 17 + (r % 2 ? 8 : 0)) + '" cy="' + (46 + r * 16) + '" r="7.5"/>';
            }
        }
        out += '</g>';
        out += '<path d="M40 52 C120 22 240 40 286 112 C230 96 130 112 40 118 Z" fill="none" stroke="url(#' + id + 's)" stroke-width="7" stroke-linejoin="round"/>';
        out += '<path d="M262 82 C274 90 282 100 286 112 C276 109 268 107 258 105 Z" fill="#1c1c1c"/>';
        out += '<path d="M36 50 L44 50 L44 120 L36 120 Z" fill="#1c1c1c"/>';
        // Lupe
        out += '<circle cx="150" cy="78" r="30" fill="rgba(255,255,255,0.35)" stroke="#5d6d7e" stroke-width="4"/>' +
            '<path d="M171 100 L196 128" stroke="#5d6d7e" stroke-width="7" stroke-linecap="round"/>';
        return out;
    };

    S['Früchte'] = function (id) {
        return dschungel(id + 'h') + ast(20, 150, 170, 140) + ast(190, 96, 316, 84, 5) +
            leaves([[230, 92, 38, -50, '#2e8b57'], [270, 88, 34, -120, '#49a86b'], [300, 86, 30, 60, '#2e8b57']]) +
            frucht(262, 104, 9) + frucht(282, 100, 8, '#f39c12') + frucht(246, 108, 7, '#8e44ad') +
            tukan(id + 't', 96, 100, 1.15, false, frucht(79, -22, 6)) + ecken();
    };

    S['Hüpfen'] = function (id) {
        return dschungel(id + 'h') + ast(10, 150, 130, 144) + ast(190, 118, 316, 108) +
            '<path d="M70 96 C120 30 180 30 226 62" fill="none" stroke="#f7941d" stroke-width="3.5" stroke-dasharray="3 9" stroke-linecap="round"/>' +
            '<path d="M218 50 L229 64 L211 66 Z" fill="#f7941d"/>' +
            tukan(id + 'a', 52, 108, 0.8) + tukan(id + 'b', 236, 76, 0.8) + ecken();
    };

    // Schlafender Tukan: Schnabel auf dem Rücken, Schwanz über den Kopf geklappt → eine Kugel aus Federn
    S['Baumhöhle'] = function (id) {
        var out = dschungel(id + 'h', true);
        out += '<circle cx="268" cy="36" r="16" fill="#f6e7a1"/><circle cx="262" cy="32" r="14" fill="#1f3558"/>';
        out += '<g fill="#fff" opacity="0.8"><circle cx="36" cy="26" r="1.3"/><circle cx="70" cy="50" r="1"/><circle cx="228" cy="70" r="1.2"/><circle cx="296" cy="88" r="1"/><circle cx="40" cy="96" r="1.1"/></g>';
        out += '<rect x="96" y="0" width="128" height="180" fill="#6b4423"/>';
        out += '<path d="M112 0 L112 180 M140 0 L138 180 M196 0 L198 180" stroke="#553519" stroke-width="3"/>';
        out += '<ellipse cx="160" cy="98" rx="46" ry="52" fill="#2b1a0c"/>';
        out += '<ellipse cx="160" cy="112" rx="30" ry="29" fill="#1c1c1c"/>';                              // Federkugel
        out += '<path d="M134 100 C146 74 176 74 188 98 C174 90 150 90 134 100 Z" fill="#2d2d2d"/>';       // Schwanz über dem Kopf
        out += '<path d="M138 104 C150 100 170 100 182 106 C170 110 150 110 138 104 Z" fill="#f7941d"/>';  // Schnabel auf dem Rücken
        out += '<path d="M176 105 C179 105 181 105.5 182 106 C179 107 177 107.5 174 108 Z" fill="#1c1c1c"/>';
        out += '<ellipse cx="146" cy="120" rx="6" ry="5" fill="#ffffff"/>';
        out += '<text x="206" y="62" font-size="15" fill="#dfe9ff" font-family="Verdana, sans-serif" font-weight="bold">z</text>' +
            '<text x="216" y="48" font-size="19" fill="#dfe9ff" font-family="Verdana, sans-serif" font-weight="bold">z</text>';
        return out + ecken(true);
    };

    S['Wärme'] = function (id) {
        var out = grad(id + 'h', '#ffe7a8', '#ffd0a0');
        out += '<circle cx="54" cy="44" r="24" fill="#ffb300"/>';
        out += '<g stroke="#ffb300" stroke-width="4" stroke-linecap="round"><path d="M54 8 L54 14"/><path d="M18 44 L24 44"/><path d="M84 44 L90 44"/><path d="M28 18 L33 23"/><path d="M80 18 L75 23"/><path d="M28 70 L33 65"/><path d="M80 70 L75 65"/><path d="M54 74 L54 80"/></g>';
        out += ast(60, 158, 300, 150);
        out += tukan(id + 't', 150, 110, 1.2);
        // Wärme steigt vom Schnabel auf
        out += '<g fill="none" stroke="#e74c3c" stroke-width="3.5" stroke-linecap="round" opacity="0.85">' +
            '<path d="M196 56 C190 48 202 42 196 34 C190 26 202 20 196 12"/>' +
            '<path d="M218 58 C212 50 224 44 218 36 C212 28 224 22 218 14"/>' +
            '<path d="M240 68 C234 60 246 54 240 46 C234 38 246 32 240 24"/></g>';
        return out;
    };


    // =====================================================================
    // VERSION 2: TIERE DER WELTREISE
    // =====================================================================
    function T(x, y, s, flip, inner) { return '<g transform="translate(' + x + ' ' + y + ') scale(' + (flip ? -s : s) + ' ' + s + ')">' + inner + '</g>'; }
    function sterne() { return '<g fill="#fff" opacity="0.85"><circle cx="30" cy="22" r="1.3"/><circle cx="80" cy="44" r="1"/><circle cx="130" cy="16" r="1.2"/><circle cx="196" cy="34" r="1"/><circle cx="238" cy="60" r="1.1"/><circle cx="300" cy="70" r="1"/><circle cx="56" cy="76" r="1"/></g>'; }
    function mond(x, y) { return '<circle cx="' + x + '" cy="' + y + '" r="17" fill="#f6e7a1"/><circle cx="' + (x - 5) + '" cy="' + (y - 4) + '" r="3" fill="#e6d48a"/><circle cx="' + (x + 6) + '" cy="' + (y + 5) + '" r="2" fill="#e6d48a"/>'; }
    function baum(x, y, h, krone, stamm) {
        return '<rect x="' + (x - 5) + '" y="' + (y - h) + '" width="10" height="' + h + '" fill="' + (stamm || '#7a4f2a') + '"/>' +
            '<circle cx="' + x + '" cy="' + (y - h - 8) + '" r="26" fill="' + (krone || '#2e8b57') + '"/><circle cx="' + (x - 18) + '" cy="' + (y - h + 6) + '" r="17" fill="' + (krone || '#2e8b57') + '"/><circle cx="' + (x + 18) + '" cy="' + (y - h + 4) + '" r="18" fill="' + (krone || '#2e8b57') + '"/>';
    }
    function tanne(x, y, h, farbe) {
        var f = farbe || '#2f6f4f';
        return '<rect x="' + (x - 3) + '" y="' + (y - 10) + '" width="6" height="10" fill="#6b4423"/>' +
            '<path d="M' + x + ' ' + (y - h) + ' L' + (x + h * 0.32) + ' ' + (y - 8) + ' L' + (x - h * 0.32) + ' ' + (y - 8) + ' Z" fill="' + f + '"/>';
    }
    var BG = {
        wald: function (id) {
            return grad(id, '#cfeaf5', '#e4f3d6') + tanne(40, 150, 90, '#3f8a63') + tanne(86, 146, 70, '#57a67b') + tanne(250, 148, 84, '#3f8a63') + tanne(292, 150, 100, '#2f6f4f') +
                '<path d="M0 142 C70 130 150 150 220 138 C260 132 300 142 320 136 L320 180 L0 180 Z" fill="#7fbf7a"/><path d="M0 160 C90 150 200 168 320 154 L320 180 L0 180 Z" fill="#5aa862"/>';
        },
        nachtwald: function (id) {
            return grad(id, '#18244a', '#2b4470') + sterne() + tanne(40, 150, 90, '#143528') + tanne(292, 150, 100, '#0f2b20') + tanne(250, 148, 70, '#173d2e') +
                '<path d="M0 146 C70 126 150 150 220 134 C260 128 300 142 320 136 L320 180 L0 180 Z" fill="#1d4a39"/><path d="M0 164 C90 152 200 170 320 156 L320 180 L0 180 Z" fill="#153a2c"/>';
        },
        savanne: function (id) {
            return grad(id, '#fde9a9', '#fbd58a') + '<circle cx="270" cy="38" r="20" fill="#ffb300" opacity="0.9"/>' +
                '<rect x="48" y="78" width="6" height="56" fill="#6b4423"/><path d="M18 80 C30 60 76 58 88 80 Z" fill="#5d8f3a"/><path d="M30 70 C44 56 62 56 74 70 Z" fill="#74a84a"/>' +
                '<path d="M0 132 C80 122 200 138 320 126 L320 180 L0 180 Z" fill="#e3c468"/><path d="M0 156 C100 146 220 164 320 152 L320 180 L0 180 Z" fill="#d1ad4e"/>';
        },
        schnee: function (id) {
            return grad(id, '#bfdff2', '#eaf6fc') + tanne(36, 136, 70, '#3f7f6a') + tanne(288, 132, 86, '#356f5c') +
                '<path d="M20 96 L36 70 L52 96 Z M270 92 L288 62 L306 92 Z" fill="#fff" opacity="0.85"/>' +
                '<path d="M0 132 C80 116 160 140 240 124 C280 118 300 128 320 124 L320 180 L0 180 Z" fill="#f4fafd"/><path d="M0 158 C100 146 220 166 320 152 L320 180 L0 180 Z" fill="#ffffff"/>';
        },
        bambus: function (id) {
            var out = grad(id, '#d9f0d0', '#eef8e2') + '<path d="M0 60 L60 20 L120 62 L190 14 L260 58 L320 24 L320 180 L0 180 Z" fill="#c2e2c4" opacity="0.8"/>';
            [18, 46, 262, 290, 308].forEach(function (x, i) {
                out += '<rect x="' + x + '" y="0" width="8" height="180" rx="3" fill="' + (i % 2 ? '#6fae52' : '#89c266') + '"/>';
                for (var y = 24; y < 180; y += 36) out += '<rect x="' + (x - 1) + '" y="' + (y + i * 5) + '" width="10" height="2.5" fill="#4f8a3a"/>';
                out += leaf(x + 6, 40 + i * 14, 26, i % 2 ? 150 : 30, '#5aa24a');
            });
            return out + '<path d="M0 156 C100 146 220 164 320 152 L320 180 L0 180 Z" fill="#9fd08f"/>';
        },
        outback: function (id) {
            return grad(id, '#bfe4f7', '#fbe3c0') + '<circle cx="52" cy="36" r="18" fill="#ffb300"/>' +
                '<path d="M180 118 L210 92 L300 92 L320 108 L320 130 L170 130 Z" fill="#c9673a"/>' +
                '<path d="M0 128 C90 118 210 136 320 124 L320 180 L0 180 Z" fill="#d98a52"/><path d="M0 156 C100 148 220 164 320 152 L320 180 L0 180 Z" fill="#c8733e"/>' +
                '<path d="M24 150 l4 -12 l3 12 l4 -14 l3 14 Z M276 162 l4 -12 l3 12 l4 -14 l3 14 Z" fill="#8aa04a"/>';
        },
        eis: function (id) {
            return grad(id, '#c5e5f6', '#eef8fd') + '<path d="M0 104 L320 104 L320 180 L0 180 Z" fill="#5fa8cf"/>' +
                '<path d="M210 104 L236 70 L262 104 Z M250 104 L282 56 L314 104 Z" fill="#fff"/><path d="M282 56 L296 78 L282 84 Z" fill="#d6ecf7"/>' +
                '<path d="M-10 132 L40 118 L250 118 L300 134 L260 150 L20 150 Z" fill="#ffffff"/><path d="M20 150 L260 150 L250 158 L30 158 Z" fill="#cfe6f3"/>';
        },
        wasser: function (id) {
            return grad(id, '#cfeaf5', '#e4f3d6') + tanne(30, 96, 60, '#3f8a63') + tanne(64, 98, 44, '#57a67b') + tanne(286, 96, 66, '#2f6f4f') +
                '<path d="M0 94 C80 86 220 98 320 88 L320 110 L0 110 Z" fill="#7fbf7a"/><rect x="0" y="106" width="320" height="74" fill="#5fa8cf"/>' +
                '<g stroke="#fff" stroke-width="1.6" opacity="0.55" fill="none"><path d="M20 126 q8 -4 16 0 t16 0"/><path d="M230 164 q8 -4 16 0 t16 0"/><path d="M120 172 q8 -4 16 0 t16 0"/></g>';
        }
    };

    // ---------- Wolf ----------
    function wolf(x, y, s, flip, o) {
        o = o || {};
        var m = o.c || '#8d9299', d = o.d || '#666c74', l = o.l || '#e3e5e8';
        var kopf = '<g transform="translate(24 -9) rotate(' + (o.heul ? -50 : (o.schnupper ? 34 : 0)) + ')">' +
            '<path d="M-6 -10 L10 -12 L30 -2 L30 3 L12 8 L-6 8 Z" fill="' + m + '"/><path d="M10 2 L30 0 L30 3 L12 8 Z" fill="' + l + '"/>' +
            '<path d="M-4 -10 L-1 -24 L7 -11 Z" fill="' + d + '"/><path d="M4 -11 L9 -22 L13 -11 Z" fill="' + m + '"/>' +
            '<circle cx="11" cy="-4" r="2.1" fill="#f1c40f"/><circle cx="11" cy="-4" r="1" fill="#111"/><circle cx="30" cy="0" r="2.6" fill="#111"/></g>';
        return T(x, y, s, flip,
            '<path d="M-28 -8 C-48 -6 -54 14 -46 24 C-44 10 -36 4 -26 4 Z" fill="' + d + '"/>' +
            '<rect x="-26" y="6" width="7" height="25" rx="3" fill="' + d + '"/><rect x="13" y="6" width="7" height="25" rx="3" fill="' + d + '"/>' +
            '<ellipse cx="0" cy="0" rx="31" ry="14" fill="' + m + '"/><ellipse cx="2" cy="7" rx="22" ry="6" fill="' + l + '"/>' +
            '<rect x="-18" y="6" width="7" height="27" rx="3" fill="' + m + '"/><rect x="20" y="6" width="7" height="27" rx="3" fill="' + m + '"/>' +
            '<path d="M12 -12 L28 -17 L30 2 L16 10 Z" fill="' + m + '"/>' + kopf);
    }
    S['Wolf'] = function (id) { return BG.wald(id) + wolf(160, 110, 1.35); };
    S['Rudel'] = function (id) { return BG.wald(id) + wolf(90, 104, 0.8, true, { c: '#7d838a' }) + wolf(232, 108, 0.95) + wolf(150, 132, 1.05) + wolf(64, 148, 0.5, false, { c: '#a6abb1' }) + wolf(262, 150, 0.5, true, { c: '#a6abb1' }); };
    S['Heulen'] = function (id) { return BG.nachtwald(id) + mond(250, 40) + '<path d="M96 180 C110 132 210 128 228 180 Z" fill="#102a20"/>' + wolf(158, 112, 1.2, false, { heul: true, c: '#9aa0a8' }) +
        '<g fill="none" stroke="#dfe9ff" stroke-width="2.5" stroke-linecap="round" opacity="0.8"><path d="M214 52 q8 -8 0 -16"/><path d="M224 58 q14 -14 0 -28"/></g>'; };
    S['Wolfsnase'] = function (id) { return BG.wald(id) + wolf(118, 118, 1.2, false, { schnupper: true }) +
        '<g fill="#5a4630" opacity="0.7"><ellipse cx="206" cy="150" rx="4" ry="5"/><ellipse cx="232" cy="144" rx="4" ry="5"/><ellipse cx="258" cy="150" rx="4" ry="5"/><ellipse cx="284" cy="144" rx="4" ry="5"/></g>' +
        '<g fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity="0.8"><path d="M196 128 q6 -8 12 0 t12 0"/><path d="M200 116 q6 -8 12 0 t12 0"/></g>'; };
    S['Welpen'] = function (id) { return BG.wald(id) + '<path d="M70 170 C70 70 250 70 250 170 Z" fill="#6b5a45"/><path d="M96 170 C96 96 224 96 224 170 Z" fill="#2f2419"/>' +
        wolf(128, 146, 0.5, false, { c: '#7a6f66', d: '#5d544c' }) + wolf(170, 150, 0.52, true, { c: '#857a70', d: '#5d544c' }) + wolf(200, 148, 0.46, false, { c: '#6f655c', d: '#544c45' }); };
    S['Wolf und Hund'] = function (id) { return grad(id + 'h', '#fff6dc', '#ffe9b8') + '<path d="M0 150 L320 150 L320 180 L0 180 Z" fill="#e8d39a"/>' + wolf(100, 110, 1.15) +
        wolf(232, 126, 0.62, true, { c: '#b9772f', d: '#8c5a22', l: '#f3dfc0' }) + '<path d="M168 100 L190 100 M182 92 L190 100 L182 108" stroke="#7a4f2a" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'; };

    // ---------- Elefant ----------
    function elefant(x, y, s, flip, o) {
        o = o || {};
        var m = o.c || '#9aa3ab', d = o.d || '#7c868f';
        var ruessel = o.hoch
            ? '<path d="M46 -8 C62 -10 66 -30 58 -44 C56 -50 64 -52 66 -46 C76 -26 68 2 44 6 Z" fill="' + m + '"/>'
            : '<path d="M46 -8 C60 0 60 22 54 36 C52 42 44 41 46 35 C50 22 46 10 38 4 Z" fill="' + m + '"/>';
        return T(x, y, s, flip,
            '<rect x="-30" y="14" width="13" height="30" rx="5" fill="' + d + '"/><rect x="10" y="14" width="13" height="30" rx="5" fill="' + d + '"/>' +
            '<path d="M-40 -8 C-49 0 -49 14 -46 22" stroke="' + d + '" stroke-width="3" fill="none" stroke-linecap="round"/>' +
            '<ellipse cx="-4" cy="0" rx="38" ry="26" fill="' + m + '"/>' +
            '<rect x="-20" y="14" width="13" height="32" rx="5" fill="' + m + '"/><rect x="20" y="14" width="13" height="32" rx="5" fill="' + m + '"/>' +
            '<circle cx="36" cy="-12" r="20" fill="' + m + '"/>' + ruessel +
            (o.kalb ? '' : '<path d="M40 2 C46 10 54 12 61 8" stroke="#fff8e7" stroke-width="5" fill="none" stroke-linecap="round"/>') +
            '<path d="M24 -32 C4 -38 0 -8 12 8 C22 12 30 2 30 -10 Z" fill="' + d + '"/>' +
            '<circle cx="43" cy="-17" r="2.2" fill="#222"/>');
    }
    S['Elefant'] = function (id) { return BG.savanne(id) + elefant(162, 100, 1.25); };
    S['Elefant trinkt'] = function (id) { return BG.savanne(id) + '<ellipse cx="236" cy="158" rx="80" ry="14" fill="#5fa8cf"/>' + elefant(130, 102, 1.15, false, { hoch: true }) +
        '<g fill="#5fa8cf"><circle cx="212" cy="40" r="4"/><circle cx="224" cy="52" r="3"/><circle cx="204" cy="56" r="3"/><circle cx="232" cy="38" r="2.5"/><circle cx="218" cy="28" r="2.5"/></g>'; };
    S['Schlammbad'] = function (id) { return BG.savanne(id) + '<ellipse cx="160" cy="156" rx="120" ry="18" fill="#8a6a45"/>' + elefant(160, 104, 1.2, false, { c: '#a08a70', d: '#84705a' }) +
        '<g fill="#8a6a45"><circle cx="96" cy="120" r="5"/><circle cx="238" cy="112" r="4"/><circle cx="84" cy="140" r="3.5"/><circle cx="250" cy="136" r="4.5"/></g><ellipse cx="160" cy="160" rx="96" ry="10" fill="#7a5c3b"/>'; };
    S['Herde'] = function (id) { return BG.savanne(id) + elefant(96, 100, 0.85, false, { c: '#8f98a0' }) + elefant(214, 102, 1.0) + elefant(150, 132, 0.5, false, { kalb: true, c: '#a8b0b7' }); };
    S['Elefantenkind'] = function (id) { return BG.savanne(id) + elefant(118, 98, 1.1) + elefant(226, 132, 0.52, false, { kalb: true, c: '#a8b0b7' }); };

    // ---------- Chamäleon ----------
    function chamaeleon(x, y, s, flip, o) {
        o = o || {};
        var m = o.c || '#4caf50', d = o.d || '#2e7d32', t = o.t || '#ffc93c';
        return T(x, y, s, flip,
            '<path d="M-30 4 C-52 4 -58 28 -42 34 C-30 38 -24 24 -34 20 C-40 18 -42 26 -38 28" fill="none" stroke="' + m + '" stroke-width="8" stroke-linecap="round"/>' +
            '<path d="M-14 12 L-18 26 M-18 26 l-5 4 M-18 26 l5 4 M18 12 L22 26 M22 26 l-5 4 M22 26 l5 4" stroke="' + d + '" stroke-width="4.5" stroke-linecap="round" fill="none"/>' +
            '<path d="M-34 6 C-30 -22 20 -26 34 -6 C40 2 34 14 20 16 L-20 16 C-30 16 -36 12 -34 6 Z" fill="' + m + '"/>' +
            '<path d="M22 -14 C30 -34 52 -24 56 -6 C60 6 48 14 34 12 C24 10 18 -2 22 -14 Z" fill="' + m + '"/>' +
            '<path d="M26 -16 C32 -32 48 -26 52 -12" fill="none" stroke="' + d + '" stroke-width="3"/>' +
            '<g fill="' + t + '"><circle cx="-16" cy="-6" r="3"/><circle cx="-2" cy="-10" r="3.4"/><circle cx="12" cy="-6" r="3"/><circle cx="-8" cy="6" r="2.6"/><circle cx="6" cy="6" r="2.6"/></g>' +
            '<circle cx="40" cy="-6" r="8" fill="' + d + '"/><circle cx="' + (o.blick === 'hinten' ? 37 : 43) + '" cy="-6" r="3.4" fill="#fff"/><circle cx="' + (o.blick === 'hinten' ? 36 : 44) + '" cy="-6" r="1.8" fill="#111"/>' +
            '<path d="M48 6 L57 4" stroke="' + d + '" stroke-width="2" stroke-linecap="round"/>' + (o.extra || ''));
    }
    S['Chamäleon'] = function (id) { return dschungel(id + 'h') + ast(30, 146, 290, 136) + chamaeleon(158, 108, 1.4) + ecken(); };
    S['Farben'] = function (id) { return dschungel(id + 'h') + ast(10, 78, 150, 74, 6) + ast(170, 150, 316, 144, 6) + ast(20, 158, 150, 160, 6) +
        chamaeleon(84, 56, 0.72, false, { c: '#5d4037', d: '#3e2723', t: '#8d6e63' }) + chamaeleon(240, 124, 0.8, true, { c: '#e53935', d: '#b71c1c', t: '#29b6f6' }) + chamaeleon(84, 138, 0.72) + ecken(); };
    S['Augen'] = function (id) {
        return grad(id + 'h', '#dff1d6', '#c7e6bd') + '<path d="M40 180 C40 60 280 60 280 180 Z" fill="#4caf50"/><path d="M96 78 C130 40 190 40 224 78" fill="none" stroke="#2e7d32" stroke-width="8"/>' +
            '<circle cx="110" cy="112" r="34" fill="#2e7d32"/><circle cx="210" cy="112" r="34" fill="#2e7d32"/>' +
            '<circle cx="96" cy="100" r="14" fill="#fff"/><circle cx="92" cy="96" r="7" fill="#111"/><circle cx="226" cy="124" r="14" fill="#fff"/><circle cx="231" cy="129" r="7" fill="#111"/>' +
            '<path d="M70 70 L52 50 M52 50 l12 2 M52 50 l2 12" stroke="#e8641b" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M252 150 L272 168 M272 168 l-12 -2 M272 168 l-2 -12" stroke="#e8641b" stroke-width="4" fill="none" stroke-linecap="round"/>';
    };
    S['Zunge'] = function (id) { return dschungel(id + 'h') + ast(10, 150, 170, 142) +
        '<path d="M150 106 C190 96 230 92 268 84" stroke="#ec407a" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="270" cy="84" r="7" fill="#ec407a"/>' +
        '<g transform="translate(276 78)"><ellipse cx="0" cy="0" rx="6" ry="4" fill="#333"/><ellipse cx="-3" cy="-6" rx="6" ry="3" fill="#cfe8ff" opacity="0.9"/><ellipse cx="4" cy="-6" rx="6" ry="3" fill="#cfe8ff" opacity="0.9"/></g>' +
        chamaeleon(96, 112, 1.15) + ecken(); };
    S['Winzling'] = function (id) { return grad(id + 'h', '#fff6dc', '#ffe9b8') +
        '<path d="M120 180 L120 96 C120 50 200 50 200 96 L200 180 Z" fill="#f2c9a0"/><path d="M134 92 C134 64 186 64 186 92 C186 104 134 104 134 92 Z" fill="#fbe3cf"/>' +
        chamaeleon(160, 72, 0.36, false, { c: '#8d6e63', d: '#5d4037', t: '#bcaaa4' }); };

    // ---------- Tiger ----------
    function tiger(x, y, s, flip, o) {
        o = o || {};
        var m = '#f39c2b', d = '#1c1c1c', l = '#fff3e0';
        var str = '';
        [-22, -12, -2, 8, 18].forEach(function (sx) { str += '<path d="M' + sx + ' -13 l3 9 l-3 8" stroke="' + d + '" stroke-width="3" fill="none" stroke-linecap="round"/>'; });
        return T(x, y, s, flip,
            '<path d="M-30 -4 C-50 -6 -56 -26 -44 -34" stroke="' + m + '" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-47 -20 l6 -2 M-50 -28 l6 0" stroke="' + d + '" stroke-width="3" stroke-linecap="round"/>' +
            '<rect x="-26" y="6" width="9" height="' + (o.duck ? 12 : 24) + '" rx="4" fill="#d9831f"/><rect x="14" y="6" width="9" height="' + (o.duck ? 12 : 24) + '" rx="4" fill="#d9831f"/>' +
            '<ellipse cx="0" cy="0" rx="33" ry="15" fill="' + m + '"/><ellipse cx="2" cy="8" rx="24" ry="6" fill="' + l + '"/>' + str +
            '<rect x="-17" y="6" width="9" height="' + (o.duck ? 14 : 26) + '" rx="4" fill="' + m + '"/><rect x="22" y="6" width="9" height="' + (o.duck ? 14 : 26) + '" rx="4" fill="' + m + '"/>' +
            '<circle cx="36" cy="-10" r="17" fill="' + m + '"/><circle cx="24" cy="-24" r="6" fill="' + m + '"/><circle cx="46" cy="-25" r="6" fill="' + m + '"/><circle cx="24" cy="-24" r="2.6" fill="' + d + '"/><circle cx="46" cy="-25" r="2.6" fill="' + d + '"/>' +
            '<ellipse cx="42" cy="-2" rx="9" ry="7" fill="' + l + '"/><path d="M30 -24 l2 7 M36 -27 l0 8 M42 -25 l-2 7 M21 -12 l7 2 M21 -5 l7 -1" stroke="' + d + '" stroke-width="2.4" stroke-linecap="round"/>' +
            '<circle cx="32" cy="-12" r="2.2" fill="#111"/><circle cx="44" cy="-13" r="2.2" fill="#111"/><path d="M39 -5 l6 0 l-3 4 Z" fill="#c2185b"/>');
    }
    S['Tiger'] = function (id) { return dschungel(id + 'h') + '<path d="M0 150 L320 150 L320 180 L0 180 Z" fill="#5aa862"/>' + tiger(158, 118, 1.3) + ecken(); };
    S['Streifen'] = function (id) { return BG.bambus(id) + tiger(96, 122, 0.95, false) + tiger(226, 126, 0.95, true); };
    S['Tigerjagd'] = function (id) { return dschungel(id + 'h', true) + mond(266, 36) + '<path d="M0 150 L320 150 L320 180 L0 180 Z" fill="#173a2f"/>' + tiger(150, 136, 1.2, false, { duck: true }) +
        '<g fill="#1f5a44">' + [20, 60, 100, 220, 260, 300].map(function (gx) { return '<path d="M' + gx + ' 180 l6 -34 l5 34 l6 -40 l5 40 Z"/>'; }).join('') + '</g>'; };
    S['Tiger schwimmt'] = function (id) { return BG.wasser(id) + T(160, 128, 1.4, false,
        '<circle cx="0" cy="-10" r="17" fill="#f39c2b"/><circle cx="-12" cy="-24" r="6" fill="#f39c2b"/><circle cx="10" cy="-25" r="6" fill="#f39c2b"/><ellipse cx="6" cy="-2" rx="9" ry="7" fill="#fff3e0"/>' +
        '<path d="M-6 -24 l2 7 M0 -27 l0 8 M6 -25 l-2 7" stroke="#1c1c1c" stroke-width="2.4" stroke-linecap="round"/><circle cx="-4" cy="-12" r="2.2" fill="#111"/><circle cx="8" cy="-13" r="2.2" fill="#111"/><path d="M3 -5 l6 0 l-3 4 Z" fill="#c2185b"/>' +
        '<ellipse cx="-34" cy="2" rx="22" ry="6" fill="#f39c2b"/><path d="M-44 -2 l2 6 M-34 -3 l2 7 M-24 -2 l2 6" stroke="#1c1c1c" stroke-width="2.4" stroke-linecap="round"/>') +
        '<rect x="0" y="130" width="320" height="50" fill="#5fa8cf" opacity="0.92"/><g stroke="#fff" stroke-width="2" fill="none" opacity="0.7"><path d="M96 132 q10 -5 20 0 t20 0"/><path d="M176 134 q10 -5 20 0 t20 0"/></g>'; };
    S['Tigerkinder'] = function (id) { return dschungel(id + 'h') + '<path d="M0 150 L320 150 L320 180 L0 180 Z" fill="#5aa862"/>' + tiger(120, 114, 1.1) + tiger(222, 146, 0.5, true) + tiger(266, 150, 0.45, true) + ecken(); };

    // ---------- Großer Panda (sitzend, von vorn) ----------
    function panda(x, y, s, flip, o) {
        o = o || {};
        return T(x, y, s, flip,
            '<ellipse cx="-22" cy="30" rx="13" ry="10" fill="#1c1c1c"/><ellipse cx="22" cy="30" rx="13" ry="10" fill="#1c1c1c"/>' +
            '<ellipse cx="0" cy="10" rx="30" ry="28" fill="#ffffff"/><path d="M-30 4 C-30 -12 30 -12 30 4 C20 -2 -20 -2 -30 4 Z" fill="#1c1c1c"/>' +
            '<path d="M-28 0 C-42 8 -40 24 -26 24 C-20 16 -20 8 -28 0 Z" fill="#1c1c1c"/><path d="M28 0 C42 8 ' + (o.bambus ? '30 30 14 22' : '40 24 26 24') + ' C20 16 20 8 28 0 Z" fill="#1c1c1c"/>' +
            '<circle cx="-19" cy="-40" r="9" fill="#1c1c1c"/><circle cx="19" cy="-40" r="9" fill="#1c1c1c"/><circle cx="0" cy="-22" r="24" fill="#ffffff"/>' +
            '<ellipse cx="-9" cy="-24" rx="6" ry="8" transform="rotate(20 -9 -24)" fill="#1c1c1c"/><ellipse cx="9" cy="-24" rx="6" ry="8" transform="rotate(-20 9 -24)" fill="#1c1c1c"/>' +
            '<circle cx="-8" cy="-25" r="2" fill="#fff"/><circle cx="8" cy="-25" r="2" fill="#fff"/><ellipse cx="0" cy="-14" rx="4" ry="3" fill="#1c1c1c"/><path d="M0 -11 L0 -7 M-4 -6 q4 3 8 0" stroke="#1c1c1c" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
            (o.bambus ? '<rect x="12" y="-30" width="5" height="60" rx="2" transform="rotate(24 14 0)" fill="#6fae52"/><path d="M26 -22 l14 -8 l-4 12 Z" fill="#5aa24a"/>' : ''));
    }
    S['Panda'] = function (id) { return BG.bambus(id) + panda(160, 104, 1.3); };
    S['Panda frisst'] = function (id) { return BG.bambus(id) + panda(150, 106, 1.3, false, { bambus: true }) + '<g fill="#6fae52"><rect x="216" y="150" width="34" height="5" rx="2"/><rect x="226" y="158" width="30" height="5" rx="2"/><rect x="206" y="160" width="16" height="5" rx="2"/></g>'; };
    S['Pandapfote'] = function (id) {
        return grad(id + 'h', '#e8f5e3', '#d5ecd0') + '<rect x="150" y="0" width="16" height="180" rx="6" fill="#6fae52"/><rect x="148" y="60" width="20" height="4" fill="#4f8a3a"/><rect x="148" y="130" width="20" height="4" fill="#4f8a3a"/>' +
            '<ellipse cx="170" cy="104" rx="56" ry="44" fill="#1c1c1c"/>' +
            [[124, 58], [146, 46], [172, 42], [198, 46], [220, 60]].map(function (p) { return '<ellipse cx="' + p[0] + '" cy="' + p[1] + '" rx="11" ry="14" fill="#1c1c1c"/>'; }).join('') +
            '<ellipse cx="112" cy="110" rx="12" ry="20" transform="rotate(-30 112 110)" fill="#3a3a3a"/>' +
            '<path d="M84 128 L60 146 M60 146 l14 0 M60 146 l2 -13" stroke="#e8641b" stroke-width="4" fill="none" stroke-linecap="round"/>' +
            '<ellipse cx="172" cy="112" rx="26" ry="18" fill="#5a4a4a"/>';
    };
    S['Panda klettert'] = function (id) { return BG.bambus(id) + '<rect x="146" y="0" width="28" height="180" fill="#7a4f2a"/><path d="M174 70 L260 54" stroke="#7a4f2a" stroke-width="14" stroke-linecap="round"/>' + panda(196, 66, 0.9); };
    S['Pandababy'] = function (id) {
        return grad(id + 'h', '#fff6dc', '#ffe9b8') + panda(96, 102, 1.05) +
            '<ellipse cx="226" cy="132" rx="20" ry="11" fill="#f6b6c1"/><circle cx="244" cy="126" r="8" fill="#f6b6c1"/><path d="M208 136 l-8 4 M218 142 l-2 7 M232 142 l2 7" stroke="#f6b6c1" stroke-width="4" stroke-linecap="round"/>' +
            '<rect x="200" y="56" width="56" height="34" rx="3" fill="#6b3e1e"/><g stroke="#8a5530" stroke-width="1.5"><path d="M214 56 v34 M228 56 v34 M242 56 v34 M200 73 h56"/></g>' +
            '<path d="M228 96 L228 114 M228 114 l-6 -7 M228 114 l6 -7" stroke="#7a4f2a" stroke-width="3" fill="none" stroke-linecap="round"/>';
    };

    // ---------- Schneeaffe (Japanmakak, sitzend) ----------
    function affe(x, y, s, flip, o) {
        o = o || {};
        var m = o.c || '#b8ab9a', d = '#9a8d7c';
        return T(x, y, s, flip,
            (o.nurKopf ? '' : '<ellipse cx="0" cy="18" rx="24" ry="24" fill="' + m + '"/><ellipse cx="-16" cy="38" rx="11" ry="7" fill="' + d + '"/><ellipse cx="16" cy="38" rx="11" ry="7" fill="' + d + '"/><path d="M-20 8 C-30 18 -28 30 -18 32 M20 8 C30 18 28 30 18 32" stroke="' + d + '" stroke-width="8" fill="none" stroke-linecap="round"/>') +
            (o.nurKopf ? '<ellipse cx="0" cy="12" rx="22" ry="14" fill="' + m + '"/>' : '') +
            '<circle cx="0" cy="-14" r="21" fill="' + m + '"/><circle cx="-20" cy="-14" r="5" fill="#e8a3a0"/><circle cx="20" cy="-14" r="5" fill="#e8a3a0"/>' +
            '<path d="M-12 -22 C-12 -30 12 -30 12 -22 C14 -10 10 2 0 2 C-10 2 -14 -10 -12 -22 Z" fill="#e57373"/>' +
            '<circle cx="-5" cy="-17" r="2" fill="#222"/><circle cx="5" cy="-17" r="2" fill="#222"/><path d="M-2 -10 l4 0 M-4 -4 q4 3 8 0" stroke="#8e2f2f" stroke-width="1.5" fill="none" stroke-linecap="round"/>');
    }
    function flocken() { var o = '<g fill="#fff">'; for (var i = 0; i < 26; i++) o += '<circle cx="' + ((i * 53) % 320) + '" cy="' + ((i * 37) % 120) + '" r="' + (1.4 + (i % 3) * 0.6) + '"/>'; return o + '</g>'; }
    S['Schneeaffe'] = function (id) { return BG.schnee(id) + affe(160, 98, 1.5) + flocken(); };
    S['Heiße Quelle'] = function (id) { return BG.schnee(id) + '<ellipse cx="160" cy="146" rx="130" ry="30" fill="#8d8f96"/><ellipse cx="160" cy="146" rx="116" ry="22" fill="#62b0c9"/>' +
        affe(104, 126, 0.95, false, { nurKopf: true }) + affe(170, 122, 1.1, false, { nurKopf: true }) + affe(230, 128, 0.85, true, { nurKopf: true, c: '#c7bcad' }) +
        '<ellipse cx="160" cy="152" rx="112" ry="14" fill="#62b0c9"/>' +
        '<g fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.8"><path d="M70 100 q-6 -8 0 -16 t0 -16"/><path d="M136 84 q-6 -8 0 -16 t0 -16"/><path d="M204 88 q-6 -8 0 -16 t0 -16"/><path d="M256 102 q-6 -8 0 -16 t0 -16"/></g>' + flocken(); };
    S['Affengruppe'] = function (id) { return BG.schnee(id) + affe(86, 106, 0.95) + affe(160, 96, 1.2) + affe(236, 108, 0.95, true, { c: '#c7bcad' }) + affe(200, 138, 0.5, false, { c: '#cfc5b6' }); };
    S['Baumrinde'] = function (id) { return BG.schnee(id) + '<rect x="196" y="0" width="34" height="150" fill="#7a5a3c"/><path d="M204 60 l10 0 l-2 26 l-8 0 Z" fill="#e9d3b0"/><path d="M0 0 L0 0"/>' + affe(150, 108, 1.2) + flocken(); };
    S['Affe fischt'] = function (id) { return BG.schnee(id) + '<path d="M0 132 C80 124 220 138 320 128 L320 180 L0 180 Z" fill="#5fa8cf"/>' + affe(110, 96, 1.15) +
        '<g transform="translate(206 150)"><ellipse cx="0" cy="0" rx="20" ry="8" fill="#c98a4a"/><path d="M-18 0 l-12 -8 l0 16 Z" fill="#c98a4a"/><circle cx="10" cy="-2" r="1.6" fill="#111"/><circle cx="-2" cy="-1" r="1.2" fill="#8a5a2a"/><circle cx="-8" cy="2" r="1.2" fill="#8a5a2a"/></g>' + flocken(); };

    // ---------- Rotes Riesenkänguru ----------
    function kaenguru(x, y, s, flip, o) {
        o = o || {};
        var m = o.c || '#c0703c', d = o.d || '#9c5527', l = '#f3dcc2';
        return T(x, y, s, flip,
            '<path d="M-14 22 C-40 24 -58 34 -66 ' + (o.sprung ? 20 : 44) + '" stroke="' + m + '" stroke-width="11" fill="none" stroke-linecap="round"/>' +
            '<ellipse cx="0" cy="8" rx="22" ry="30" transform="rotate(24)" fill="' + m + '"/><ellipse cx="10" cy="12" rx="11" ry="20" transform="rotate(24 10 12)" fill="' + l + '"/>' +
            (o.sprung
                ? '<path d="M-6 26 C-22 36 -34 44 -46 44" stroke="' + d + '" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M-46 44 L-66 52" stroke="' + d + '" stroke-width="7" stroke-linecap="round"/>'
                : '<path d="M-6 24 C-20 26 -22 38 -8 44" stroke="' + d + '" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M-10 46 L22 46" stroke="' + d + '" stroke-width="7" stroke-linecap="round"/>') +
            '<path d="M18 -8 C26 -4 30 2 30 8 M30 8 l5 2" stroke="' + d + '" stroke-width="5" fill="none" stroke-linecap="round"/>' +
            '<path d="M14 -22 C16 -36 24 -42 30 -44" stroke="' + m + '" stroke-width="12" fill="none" stroke-linecap="round"/>' +
            '<ellipse cx="38" cy="-46" rx="13" ry="9" transform="rotate(14 38 -46)" fill="' + m + '"/><path d="M28 -52 L22 -72 L34 -56 Z" fill="' + d + '"/><path d="M34 -54 L32 -74 L42 -56 Z" fill="' + m + '"/>' +
            '<circle cx="40" cy="-48" r="1.8" fill="#111"/><circle cx="50" cy="-43" r="2" fill="#111"/>' +
            (o.joey ? '<circle cx="18" cy="14" r="7" fill="' + d + '"/><path d="M14 9 L11 0 L18 8 Z M20 8 L22 -1 L24 9 Z" fill="' + d + '"/><circle cx="20" cy="13" r="1.2" fill="#111"/><path d="M8 20 C14 26 24 26 28 18" stroke="' + d + '" stroke-width="2.5" fill="none"/>' : ''));
    }
    S['Känguru'] = function (id) { return BG.outback(id) + kaenguru(160, 104, 1.2); };
    S['Sprung'] = function (id) { return BG.outback(id) + '<path d="M40 150 C100 40 220 40 280 150" fill="none" stroke="#fff" stroke-width="3.5" stroke-dasharray="3 9" stroke-linecap="round" opacity="0.9"/>' + kaenguru(166, 62, 0.95, false, { sprung: true }); };
    S['Beutel'] = function (id) { return BG.outback(id) + kaenguru(160, 100, 1.35, false, { joey: true, c: '#a98a78', d: '#8a6c5c' }); };
    S['Schatten'] = function (id) { return BG.outback(id) + baum(236, 150, 70, '#6f9a4a') + '<ellipse cx="200" cy="158" rx="100" ry="12" fill="rgba(0,0,0,0.18)"/>' + kaenguru(150, 118, 0.85, true) + kaenguru(96, 124, 0.7, false, { c: '#a98a78', d: '#8a6c5c' }); };
    S['Boxen'] = function (id) { return BG.outback(id) + kaenguru(112, 102, 1.05) + kaenguru(208, 102, 1.05, true, { c: '#b5673a' }) + '<g fill="#fff" stroke="#e8641b" stroke-width="2"><path d="M160 40 l4 10 l10 2 l-8 6 l2 10 l-8 -6 l-8 6 l2 -10 l-8 -6 l10 -2 Z"/></g>'; };

    // ---------- Kiwi ----------
    function kiwi(x, y, s, flip, o) {
        o = o || {};
        var m = '#8a6a4a', d = '#6b4f35';
        return T(x, y, s, flip,
            '<path d="M-6 22 L-8 40 M-8 40 l-7 3 M-8 40 l6 4 M10 22 L12 40 M12 40 l-6 4 M12 40 l7 3" stroke="#a88c6a" stroke-width="4" fill="none" stroke-linecap="round"/>' +
            '<ellipse cx="0" cy="4" rx="30" ry="24" fill="' + m + '"/>' +
            '<g stroke="' + d + '" stroke-width="2" stroke-linecap="round">' + [[-18, -4], [-8, 6], [4, -6], [-14, 12], [8, 10], [-2, 16], [14, 0]].map(function (p) { return '<path d="M' + p[0] + ' ' + p[1] + ' l-5 7"/>'; }).join('') + '</g>' +
            '<circle cx="26" cy="-14" r="12" fill="' + m + '"/>' +
            (o.unten ? '<path d="M34 -8 L58 34" stroke="#e8d7b8" stroke-width="4" stroke-linecap="round"/>' : '<path d="M36 -12 C52 -8 66 -2 78 8" stroke="#e8d7b8" stroke-width="4" fill="none" stroke-linecap="round"/>') +
            '<circle cx="29" cy="-17" r="1.8" fill="#111"/>');
    }
    S['Kiwi'] = function (id) { return BG.nachtwald(id) + mond(60, 40) + kiwi(150, 112, 1.3) + leaves([[30, 170, 44, -30, '#1f5a44'], [290, 172, 44, 210, '#1f5a44']]); };
    S['Kiwi am Tag'] = function (id) { return BG.wald(id) + kiwi(150, 112, 1.4); };
    S['Kiwi sucht'] = function (id) { return BG.nachtwald(id) + '<path d="M0 150 L320 150 L320 180 L0 180 Z" fill="#3a2a1c"/>' + kiwi(130, 106, 1.25, false, { unten: true }) +
        '<path d="M214 162 q6 -8 12 0 t12 0 t12 0" stroke="#f48fb1" stroke-width="5" fill="none" stroke-linecap="round"/>'; };
    S['Kiwi-Ei'] = function (id) { return grad(id + 'h', '#fff6dc', '#ffe9b8') + '<path d="M0 150 L320 150 L320 180 L0 180 Z" fill="#e8d39a"/>' + kiwi(108, 104, 1.15) +
        '<ellipse cx="236" cy="118" rx="30" ry="40" fill="#f7f3e6" stroke="#d9cfb4" stroke-width="2"/><ellipse cx="226" cy="102" rx="8" ry="12" fill="#fff" opacity="0.8"/>'; };

    // ---------- Faultier (hängt am Ast) ----------
    function faultier(x, y, s, flip, o) {
        o = o || {};
        var m = o.c || '#a1887f', d = o.d || '#7d665d';
        return T(x, y, s, flip,
            '<path d="M-26 0 L-30 -34 M-12 0 L-14 -34 M12 0 L14 -34 M26 0 L30 -34" stroke="' + d + '" stroke-width="9" stroke-linecap="round"/>' +
            '<g stroke="#3e2f2a" stroke-width="2.4" fill="none" stroke-linecap="round"><path d="M-34 -36 q4 -8 8 0 M-18 -36 q4 -8 8 0 M10 -36 q4 -8 8 0 M26 -36 q4 -8 8 0"/></g>' +
            '<ellipse cx="0" cy="6" rx="34" ry="18" fill="' + m + '"/>' +
            '<circle cx="40" cy="8" r="16" fill="#d7c4b3"/><path d="M35 5 l-8 6 M45 5 l8 6" stroke="#4e3b33" stroke-width="5" stroke-linecap="round"/>' +
            '<circle cx="34" cy="6" r="1.8" fill="#111"/><circle cx="46" cy="6" r="1.8" fill="#111"/><ellipse cx="40" cy="13" rx="3" ry="2.2" fill="#4e3b33"/><path d="M35 18 q5 4 10 0" stroke="#4e3b33" stroke-width="1.6" fill="none" stroke-linecap="round"/>' + (o.extra || ''));
    }
    S['Faultier'] = function (id) { return dschungel(id + 'h') + ast(20, 52, 300, 46) + faultier(156, 96, 1.3) + ecken(); };
    S['Faultier frisst'] = function (id) { return dschungel(id + 'h') + ast(20, 52, 300, 46) + faultier(140, 96, 1.25, false, { extra: leaf(52, 16, 26, 20, '#49a86b') }) + leaves([[250, 50, 40, 60, '#2e8b57'], [270, 50, 36, 110, '#49a86b']]) + ecken(); };
    S['Grünes Fell'] = function (id) { return dschungel(id + 'h') + ast(20, 52, 300, 46) + faultier(156, 96, 1.3, false, { c: '#93977a', d: '#74785f' }) +
        '<g fill="#6fae52" opacity="0.85"><circle cx="130" cy="96" r="5"/><circle cx="150" cy="110" r="4"/><circle cx="170" cy="98" r="5"/><circle cx="118" cy="108" r="3.5"/><circle cx="186" cy="110" r="4"/></g>' + ecken(); };
    S['Faultier schwimmt'] = function (id) { return dschungel(id + 'h') + '<rect x="0" y="112" width="320" height="68" fill="#5fa8cf"/>' +
        T(170, 112, 1.5, false, '<circle cx="0" cy="-6" r="16" fill="#d7c4b3"/><path d="M-5 -9 l-8 6 M5 -9 l8 6" stroke="#4e3b33" stroke-width="5" stroke-linecap="round"/><circle cx="-6" cy="-8" r="1.8" fill="#111"/><circle cx="6" cy="-8" r="1.8" fill="#111"/><ellipse cx="0" cy="-1" rx="3" ry="2.2" fill="#4e3b33"/><ellipse cx="-34" cy="2" rx="24" ry="8" fill="#a1887f"/><path d="M18 2 L40 -4" stroke="#7d665d" stroke-width="8" stroke-linecap="round"/>') +
        '<rect x="0" y="118" width="320" height="62" fill="#5fa8cf" opacity="0.9"/><g stroke="#fff" stroke-width="2" fill="none" opacity="0.7"><path d="M90 122 q10 -5 20 0 t20 0"/><path d="M200 124 q10 -5 20 0 t20 0"/></g>' + ecken(); };
    S['Faultier am Boden'] = function (id) { return dschungel(id + 'h') + '<rect x="210" y="0" width="34" height="180" fill="#6b4423"/><path d="M0 152 L320 152 L320 180 L0 180 Z" fill="#5aa862"/>' +
        T(140, 138, 1.2, false, '<ellipse cx="0" cy="0" rx="32" ry="16" fill="#a1887f"/><path d="M-22 8 L-34 16 M22 8 L30 18 M-8 10 L-10 20" stroke="#7d665d" stroke-width="8" stroke-linecap="round"/><circle cx="36" cy="-8" r="15" fill="#d7c4b3"/><path d="M32 -11 l-8 6 M40 -11 l8 6" stroke="#4e3b33" stroke-width="5" stroke-linecap="round"/><circle cx="31" cy="-10" r="1.7" fill="#111"/><circle cx="41" cy="-10" r="1.7" fill="#111"/><ellipse cx="36" cy="-3" rx="3" ry="2" fill="#4e3b33"/>') + ecken(); };

    // ---------- Biber ----------
    function biber(x, y, s, flip, o) {
        o = o || {};
        var m = o.c || '#8a5a36', d = '#6b4426';
        return T(x, y, s, flip,
            '<ellipse cx="-44" cy="16" rx="20" ry="8" transform="rotate(-10 -44 16)" fill="#4a3a30"/><g stroke="#6a574a" stroke-width="1.2"><path d="M-58 14 l26 -4 M-56 20 l26 -4 M-50 10 l4 12 M-42 9 l4 12"/></g>' +
            '<ellipse cx="0" cy="6" rx="32" ry="20" fill="' + m + '"/><ellipse cx="6" cy="14" rx="20" ry="10" fill="#b98659"/>' +
            '<ellipse cx="-14" cy="26" rx="10" ry="5" fill="' + d + '"/><ellipse cx="16" cy="26" rx="9" ry="5" fill="' + d + '"/>' +
            '<circle cx="30" cy="-8" r="17" fill="' + m + '"/><circle cx="20" cy="-23" r="5" fill="' + d + '"/><circle cx="38" cy="-24" r="5" fill="' + d + '"/>' +
            '<ellipse cx="40" cy="-2" rx="9" ry="7" fill="#b98659"/><ellipse cx="44" cy="-6" rx="4" ry="3" fill="#2b1d14"/>' +
            '<rect x="38" y="2" width="4" height="7" fill="#f7941d"/><rect x="42.5" y="2" width="4" height="7" fill="#f7941d"/>' +
            '<circle cx="30" cy="-12" r="2" fill="#111"/>');
    }
    S['Biber'] = function (id) { return BG.wasser(id) + '<path d="M0 132 C80 122 200 122 320 136 L320 180 L0 180 Z" fill="#7fbf7a"/>' + biber(160, 118, 1.3); };
    S['Biberzähne'] = function (id) { return BG.wald(id) + '<rect x="196" y="0" width="36" height="96" fill="#7a4f2a"/><rect x="196" y="126" width="36" height="54" fill="#7a4f2a"/><path d="M196 96 L214 112 L232 96 Z M196 126 L214 112 L232 126 Z" fill="#e9d3b0"/>' +
        '<g fill="#e9d3b0"><rect x="176" y="150" width="8" height="3" transform="rotate(20 176 150)"/><rect x="240" y="156" width="8" height="3" transform="rotate(-30 240 156)"/><rect x="186" y="164" width="8" height="3"/></g>' + biber(120, 122, 1.35); };
    S['Damm'] = function (id) {
        var out = BG.wasser(id) + '<rect x="0" y="106" width="150" height="74" fill="#4e97bf"/><rect x="170" y="134" width="150" height="46" fill="#6fb6d8"/>';
        for (var i = 0; i < 16; i++) out += '<rect x="' + (128 + (i * 7) % 40) + '" y="' + (98 + i * 5) + '" width="' + (44 + (i * 11) % 22) + '" height="5" rx="2" transform="rotate(' + ((i * 37) % 30 - 15) + ' 160 ' + (100 + i * 5) + ')" fill="' + (i % 2 ? '#8a5a36' : '#a9764a') + '"/>';
        return out + biber(92, 96, 0.6);
    };
    S['Biberburg'] = function (id) {
        var out = BG.wasser(id) + '<path d="M90 110 C110 40 210 40 230 110 Z" fill="#8a5a36"/>';
        for (var i = 0; i < 14; i++) out += '<rect x="' + (104 + (i * 29) % 100) + '" y="' + (62 + (i * 17) % 44) + '" width="30" height="4" rx="2" transform="rotate(' + ((i * 41) % 50 - 25) + ' 160 90)" fill="#a9764a"/>';
        out += '<ellipse cx="160" cy="96" rx="34" ry="18" fill="#3a2718"/>' + biber(160, 96, 0.42) +
            '<path d="M160 114 C160 150 200 160 250 150" fill="none" stroke="#3a2718" stroke-width="16" stroke-linecap="round"/>' +
            '<path d="M276 150 L256 150 M256 150 l8 -6 M256 150 l8 6" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round"/>';
        return out;
    };
    S['Biber schwimmt'] = function (id) { return BG.wasser(id) + T(170, 132, 1.3, false,
        '<ellipse cx="-58" cy="2" rx="20" ry="6" fill="#4a3a30"/><ellipse cx="-14" cy="0" rx="34" ry="10" fill="#8a5a36"/><circle cx="24" cy="-6" r="14" fill="#8a5a36"/><circle cx="16" cy="-18" r="4" fill="#6b4426"/><ellipse cx="34" cy="-3" rx="6" ry="4.5" fill="#2b1d14"/><circle cx="24" cy="-9" r="1.8" fill="#111"/>') +
        '<rect x="0" y="134" width="320" height="46" fill="#5fa8cf" opacity="0.93"/><path d="M60 134 L120 126 M60 138 L112 146" stroke="#fff" stroke-width="2" opacity="0.7"/>'; };
    S['Biberfamilie'] = function (id) { return BG.wasser(id) + '<path d="M0 132 C80 122 200 122 320 136 L320 180 L0 180 Z" fill="#7fbf7a"/>' + biber(100, 116, 1.0) + biber(226, 118, 1.0, true, { c: '#7a4e2e' }) + biber(150, 148, 0.5) + biber(190, 150, 0.46, true); };

    // ---------- Eisbär ----------
    function eisbaer(x, y, s, flip, o) {
        o = o || {};
        var m = o.c || '#fdfbf3', d = '#e6e0cf';
        return T(x, y, s, flip,
            '<rect x="-30" y="10" width="13" height="26" rx="6" fill="' + d + '"/><rect x="12" y="10" width="13" height="26" rx="6" fill="' + d + '"/>' +
            '<ellipse cx="-2" cy="0" rx="40" ry="22" fill="' + m + '" stroke="' + d + '" stroke-width="1.5"/>' +
            '<rect x="-20" y="10" width="14" height="28" rx="6" fill="' + m + '" stroke="' + d + '" stroke-width="1.5"/><rect x="22" y="10" width="14" height="28" rx="6" fill="' + m + '" stroke="' + d + '" stroke-width="1.5"/>' +
            '<path d="M26 -16 C40 -26 58 -20 68 -8 C72 -2 68 4 60 4 C48 6 34 4 26 -4 Z" fill="' + m + '" stroke="' + d + '" stroke-width="1.5"/>' +
            '<circle cx="38" cy="-22" r="5" fill="' + m + '" stroke="' + d + '" stroke-width="1.5"/><circle cx="50" cy="-11" r="2" fill="#111"/><ellipse cx="67" cy="-4" rx="3.6" ry="3" fill="#111"/>');
    }
    S['Eisbär'] = function (id) { return BG.eis(id) + eisbaer(150, 98, 1.25); };
    S['Eisbärfell'] = function (id) {
        var out = grad(id + 'h', '#dff1fb', '#eef8fd') + '<rect x="0" y="120" width="320" height="26" fill="#f6c9a8"/><rect x="0" y="100" width="320" height="22" fill="#1c1c1c"/>';
        for (var i = 0; i < 22; i++) out += '<path d="M' + (8 + i * 14.5) + ' 100 L' + (2 + i * 14.5 + (i % 3) * 3) + ' 22" stroke="#fff" stroke-width="6" stroke-linecap="round"/><path d="M' + (8 + i * 14.5) + ' 98 L' + (2.5 + i * 14.5 + (i % 3) * 3) + ' 26" stroke="#cfe6f3" stroke-width="1.6"/>';
        return out + '<rect x="0" y="146" width="320" height="34" fill="#f1a7a0"/>' +
            '<g font-family="Verdana, sans-serif" font-size="12" font-weight="bold"><text x="10" y="116" fill="#fff">Haut</text><text x="10" y="138" fill="#7a4f2a">Fett</text></g>';
    };
    S['Eisloch'] = function (id) { return BG.eis(id) + '<ellipse cx="226" cy="136" rx="34" ry="9" fill="#3d86ad"/>' +
        '<g transform="translate(226 132)"><ellipse cx="0" cy="0" rx="13" ry="11" fill="#7d8790"/><circle cx="-4" cy="-3" r="1.6" fill="#111"/><circle cx="4" cy="-3" r="1.6" fill="#111"/><ellipse cx="0" cy="2" rx="2.4" ry="1.6" fill="#111"/></g><ellipse cx="226" cy="142" rx="30" ry="6" fill="#3d86ad"/>' + eisbaer(104, 100, 1.05); };
    S['Eisbär schwimmt'] = function (id) { return grad(id + 'h', '#c5e5f6', '#eef8fd') + '<path d="M230 70 L262 30 L294 70 Z" fill="#fff"/><rect x="0" y="70" width="320" height="110" fill="#5fa8cf"/>' +
        T(150, 84, 1.3, false, '<ellipse cx="-20" cy="6" rx="38" ry="12" fill="#fdfbf3"/><path d="M12 -8 C26 -16 42 -12 52 -2 C56 4 52 8 44 8 C32 10 20 8 12 2 Z" fill="#fdfbf3"/><circle cx="22" cy="-13" r="4.5" fill="#fdfbf3"/><circle cx="34" cy="-4" r="1.8" fill="#111"/><ellipse cx="51" cy="2" rx="3.2" ry="2.6" fill="#111"/><path d="M0 12 L14 30 M-10 14 L0 32" stroke="#fdfbf3" stroke-width="9" stroke-linecap="round"/>') +
        '<rect x="0" y="92" width="320" height="88" fill="#5fa8cf" opacity="0.72"/><g stroke="#fff" stroke-width="2" fill="none" opacity="0.7"><path d="M60 92 q10 -5 20 0 t20 0"/><path d="M220 94 q10 -5 20 0 t20 0"/></g>'; };
    S['Schneehöhle'] = function (id) { return BG.schnee(id) + '<path d="M40 180 C40 60 280 60 280 180 Z" fill="#ffffff" stroke="#d6ecf7" stroke-width="3"/><path d="M76 180 C76 96 244 96 244 180 Z" fill="#cfe2ee"/>' +
        eisbaer(150, 142, 0.85) + eisbaer(206, 160, 0.34, true) + eisbaer(118, 162, 0.32); };
    S['Schmelzendes Eis'] = function (id) { return grad(id + 'h', '#ffe7b0', '#fdf3d6') + '<circle cx="58" cy="40" r="22" fill="#ffb300"/><rect x="0" y="100" width="320" height="80" fill="#5fa8cf"/>' +
        '<path d="M96 126 L128 114 L214 114 L240 128 L214 140 L120 140 Z" fill="#fff"/><path d="M20 150 l24 -6 l26 6 l-22 8 Z M256 156 l20 -6 l24 6 l-20 8 Z M270 112 l16 -4 l18 4 l-16 6 Z" fill="#fff"/>' + eisbaer(160, 92, 0.85); };

    // ---------- Öffentliche Schnittstelle ----------
    var counter = 0;
    function find(name) {
        var key = String(name || '').trim().toLowerCase();
        var hit = Object.keys(S).find(function (k) { return k.toLowerCase() === key; });
        return hit || null;
    }
    LESE_MEISTER.bilder = {
        // Breites Bild (320 × 180) für die Lese-Seiten
        szene: function (name) {
            var key = find(name);
            return key ? svg(W, H, S[key]('b' + (++counter))) : null;
        },
        // Quadratisches Bild (Kapitel-Liste, Pass): Ausschnitt aus der Mitte der Szene
        rund: function (name) {
            var key = find(name);
            if (!key) return null;
            return '<svg viewBox="70 0 180 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' + S[key]('r' + (++counter)) + '</svg>';
        },
        namen: function () { return Object.keys(S); }
    };
})();
