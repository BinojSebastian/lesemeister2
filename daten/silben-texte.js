/* =====================================================================
   LESE-MEISTER TIERE – SILBEN FÜR DIE LESETEXTE
   =====================================================================
   Hier steht JEDES Wort aus daten/tier-texte.js mit seinen Sprechsilben.
   Die App färbt die Silben abwechselnd blau und rot – genau so, wie sie
   hier getrennt sind. Es wird nichts mehr automatisch geraten.

   Regeln wie in der Schulfibel „ABC der Tiere – Die Silbenfibel“:
   - Sprechsilben, nicht Wortbausteine:      hi-nein, da-raus, wo-raus
   - Ein einzelner Selbstlaut ist eine Silbe: E-sel, O-ma, a-ber, ü-ber
   - ck, ch, sch bleiben zusammen:           Rü-cken, Zu-cker, Fi-sche
   - st wird getrennt:                       Fens-ter, meis-tens, Äs-ten
   - Doppelte Mitlaute werden getrennt:      Mut-ter, dün-nen, Grup-pen
   - Zusammengesetzte Wörter an der Fuge:    Baum-höh-le, Wär-me-bild-ka-me-ra

   Wörter mit nur einer Silbe stehen ohne Bindestrich in der zweiten Liste.
   Groß- und Kleinschreibung ist egal. Jede Wortform braucht einen Eintrag
   (Tu-kan und Tu-ka-ne).

   Prüfen, ob ein Wort fehlt:  node werkzeug/silben-pruefen.js
   Die App zeigt fehlende Wörter auch unter ⚙️ › Bibliothek › Texte.
   ===================================================================== */
window.LESE_MEISTER = window.LESE_MEISTER || {};   // diese Zeile nicht ändern

LESE_MEISTER.silbenAusnahmen = [
    // ---- mehrere Silben (585 Wörter) ----
    "A-bend", "a-ber", "ab-stam-men", "ach-ten", "Ach-tung", "Af-fe", "Af-fen", "A-fri-ka-ni-sche", "Al-gen",
    "Al-le", "al-lein", "al-lem", "al-ler", "al-les", "Al-les-fres-ser", "al-so", "an-de-re", "An-de-ren",
    "an-de-rer", "an-de-res", "an-ders", "an-der-thalb", "An-fang", "An-gel", "Ark-tis", "Ar-men", "Ar-mer",
    "Ar-ten", "A-si-en", "Äs-te", "Äs-ten", "At-men", "auf-tau-chen", "Au-ge", "Au-gen", "aus-ge-wach-sen",
    "au-ßen", "Aus-tra-li-en", "Au-to", "Au-tos",
    "Ba-by", "ba-den", "Bam-bus", "Ba-na-nen", "Bä-ren", "Bauch-weh", "bau-en", "Bäu-me", "Bau-meis-ter",
    "Bäu-men", "Baum-höh-le", "Baum-höh-len", "Baum-rin-de", "Bee-ren", "bei-de", "Bei-ne", "Bei-spiel",
    "be-kom-men", "be-kommt", "be-o-bach-tet", "Ber-gen", "be-rich-tet", "be-son-ders", "Beu-te", "Beu-tel",
    "Beu-tel-tier", "be-we-gen", "be-wegt", "Bi-ber", "Bi-ber-burg", "Bi-ber-damm", "Bi-ber-el-tern",
    "Bi-ber-fa-mi-li-e", "Bi-bers", "Blät-ter", "Blät-tern", "blei-be", "blei-ben", "Blu-men", "Bo-den",
    "bo-xe", "bo-xen", "Bra-si-li-en", "brau-che", "brau-chen", "brei-te", "brü-ten", "brü-tet", "Bul-le",
    "Bul-len", "bun-te", "bun-ten", "Bü-schen",
    "Cha-mä-le-on", "Cha-mä-le-ons", "Chi-na",
    "Da-bei", "dach-te", "Da-ckel", "Da-für", "da-mit", "da-rauf", "da-raus", "Da-rin", "Da-rum",
    "da-run-ter", "dau-ert", "Dau-men", "da-von", "Da-zu", "dei-ne", "Deutsch-land", "dich-te", "dich-tes",
    "di-cke", "di-ckes", "dre-hen", "drei-mal", "dun-kel", "dün-nen", "durch-sich-tig",
    "Ech-sen", "Ei-dech-se", "Ei-dech-sen", "Ei-er", "ei-ge-nes", "ei-gent-lich", "ei-ne", "ei-nem",
    "ei-nen", "ei-ner", "Ein-gang", "ein-ge-packt", "ein-mal", "Eis-bär", "Eis-bä-ren", "Ei-sen", "Eis-loch",
    "E-le-fant", "E-le-fan-ten", "E-le-fan-ten-kind", "E-le-fan-ten-kü-he", "El-tern", "ent-deckt",
    "ent-steht", "Er-de", "er-ken-nen", "er-kennt", "ers-ten", "et-was", "ex-tra",
    "Fa-mi-li-e", "fan-gen", "Far-be", "Far-ben", "fär-ben", "Faul-tier", "Faul-tie-re", "Fe-dern",
    "Fein-de", "fei-ne", "fin-den", "fin-det", "Fin-ger", "Fin-ger-ab-druck", "Fin-gern", "Fin-ger-nä-gel",
    "Fin-ger-spit-ze", "Fi-sche", "Fi-schen", "fla-chen", "fla-cher", "flie-gen", "Flü-gel", "Flüs-se",
    "For-scher", "fres-sen", "Früch-te", "Frü-her", "Früh-ling", "Früh-stück", "füh-len", "füh-ren",
    "fünf-tes", "Fuß-ball", "Fü-ßen", "Fut-ter",
    "gan-ze", "gan-zen", "Ge-biet", "ge-bo-gen", "Ge-bo-ren", "Ge-burt", "Ge-fahr", "ge-fähr-lich",
    "ge-fal-len", "ge-filmt", "ge-fres-sen", "ge-gen", "Ge-heim-gang", "ge-hen", "ge-hö-ren", "ge-hört",
    "gelb-braun", "ge-mes-sen", "ge-nannt", "Ge-schäft", "ge-schützt", "Ge-schwis-ter", "Ge-sicht",
    "ge-streift", "ge-tarnt", "ge-trun-ken", "Gi-raf-fe", "Gleich-ge-wicht", "grei-fen", "gro-ße", "gro-ßen",
    "gro-ßer", "grö-ßer", "gro-ßes", "größ-te", "größ-ten", "Grup-pe", "Grup-pen", "Gum-mi-bär-chen",
    "gu-te", "gu-tem", "Gu-ten", "gu-ter",
    "Haa-re", "ha-be", "ha-ben", "hal-ben", "Hälf-te", "Hal-lo", "hal-ten", "Hän-den", "Hand-ge-lenk",
    "har-ter", "Hat-schi", "Hau-se", "hei-ße", "hei-ßen", "hel-fen", "he-ran", "he-raus", "Her-de",
    "heu-len", "Heu-te", "Hil-fe", "hi-nein", "hin-ten", "Hin-ter-bei-ne", "Hin-ter-pfo-ten", "Hir-sche",
    "Hit-ze", "hö-her", "Höh-le", "Ho-nig", "hö-ren", "Hüh-ner-ei-er", "Hun-de", "hun-dert", "hüp-fen",
    "I-gitt", "ih-re", "ih-ren", "ih-rer", "Im-mer", "In-di-en", "in-nen", "In-sekt", "In-sek-ten", "In-sel",
    "ja-gen", "Jah-re", "Jah-ren", "Ja-pan", "Ja-pan-ma-kak", "je-de", "je-dem", "Je-der", "Je-des",
    "Jun-ge", "jun-gen",
    "kal-ten", "kämp-fen", "Ka-na-da", "Kän-gu-ru", "Kän-gu-ru-ba-by", "Kän-gu-rus", "Kat-ze", "Kat-zen",
    "Keh-le", "kei-ne", "kei-nem", "Ke-ni-a", "Ki-ko", "Ki-lo", "Ki-lo-me-ter", "Kin-der", "Ki-wi", "Ki-wis",
    "kle-ben", "kleb-rig", "klei-ne", "klei-nen", "klei-ner", "kleins-te", "Klet-tern", "klet-tert",
    "Kno-chen", "kom-me", "kom-men", "kön-nen", "kopf-ü-ber", "Kör-per", "kräch-zen", "Kral-len", "Ku-gel",
    "Ku-geln", "Kü-he", "Küh-len", "Kü-ken", "ku-sche-lig",
    "lan-ge", "lan-gen", "lan-ger", "län-ger", "lang-sam", "längs-te", "lau-fen", "Lau-ne", "Lau-te",
    "le-be", "le-ben", "leb-ten", "le-gen", "leich-ter", "Lei-se", "lie-ber", "Lieb-lings-bäu-me",
    "liebs-ten", "lie-gen", "Li-na", "Li-ter",
    "ma-chen", "Ma-da-gas-kar", "man-che", "manch-mal", "Männ-chen", "Mäu-se", "meis-ten", "meis-tens",
    "Men-schen", "Me-ter", "min-des-tens", "mi-nus", "Mi-nu-te", "Mi-nu-ten", "mit-ei-nan-der",
    "mit-ge-bracht", "Mit-tag", "Mit-tel-a-me-ri-ka", "mö-gen", "Mo-na-te", "Mo-na-ten", "Mo-tor", "Mot-ten",
    "mun-ter", "Mus-keln", "müs-sen", "muss-te", "Mus-ter", "Mut-ter",
    "Nach-richt", "Na-ge-tier", "Na-se", "Na-sen-lö-cher", "Neu-see-land", "nie-mand", "Nord-a-me-ri-ka",
    "Nor-den", "Nord-os-ten", "Nord-pol", "Nüs-se",
    "O-ber-lip-pe", "o-der", "öff-nen", "oh-ne", "Oh-ren", "o-ran-ge",
    "pad-deln", "pad-delt", "Pan-da", "Pan-da-ba-by", "Pan-das", "Pa-pa-gei", "pas-sen", "Pe-ru",
    "Pflan-zen", "Pin-sel", "prak-tisch",
    "Quel-len",
    "Raub-tie-re", "Re-gen-wald", "Re-he", "Re-vier", "rich-tig", "Rich-tung", "rie-che", "rie-chen",
    "Rie-se", "Rie-sen-kän-gu-ru", "Rie-sen-schna-bel", "Rie-sen-tu-kan", "rie-sig", "rie-si-gen",
    "rie-si-ges", "Rin-de", "Rob-be", "Rob-ben", "ro-sa", "Ro-te", "ro-ten", "ro-tes", "röt-li-ches",
    "Rü-cken", "Rück-wärts", "Ru-del", "Ru-der", "ru-fen", "Ru-he", "ru-hen", "Rüs-sel",
    "sa-gen", "Säu-ge-tier", "Sa-van-ne", "Schä-fer-hund", "Schat-ten", "schau-en", "schla-fe", "schla-fen",
    "Schlan-gen", "schlei-chen", "schlüp-fen", "Schna-bel", "Schnee-af-fe", "Schnee-af-fen", "Schnee-höh-le",
    "schnel-le", "Schnor-chel", "Scho-ko-la-de", "schüt-zen", "schwan-ken", "schwar-ze", "schwar-zen",
    "schwe-re", "Schwim-men", "Schwim-mer", "Schwimm-häu-te", "Se-hen", "sei-ne", "sei-nem", "sei-nen",
    "Se-kun-de", "sel-ten", "sit-zen", "So-gar", "Son-ne", "spit-ze", "spre-chen", "Sprin-gen", "sprin-ten",
    "stam-men", "star-ke", "ste-cken", "ste-hen", "stei-gen", "stel-len", "Stim-me", "Strei-fen", "Stun-de",
    "Stun-den", "stun-den-lang", "su-chen", "Süd-a-me-ri-ka", "Sü-den", "Süd-pol",
    "Ta-fel", "Ta-gen", "Tar-nung", "Tast-haa-re", "Tat-zen", "Tau-send", "Tie-re", "Ti-ger", "Ti-ge-rin",
    "Ti-ger-kin-der", "tre-ten", "trin-ken", "tro-cken", "Tu-kan", "Tu-ka-ne",
    "ü-ber", "ü-ber-all", "un-ge-fähr", "Un-glaub-lich", "un-ten", "un-ter",
    "Va-ter", "ver-daut", "ver-las-sen", "ver-schie-de-ne", "Ver-spro-chen", "ver-wandt", "vie-le", "Vo-gel",
    "Vö-gel", "Vor-der-bei-nen", "Vor-der-pfo-ten", "Vor-her", "vor-ne", "Vor-sicht",
    "wach-sen", "Wäl-der", "Wäl-dern", "Wär-me", "Wär-me-bild-ka-me-ra", "wär-men", "wär-mer", "War-ten",
    "war-tet", "Wa-rum", "Was-ser", "wech-seln", "weg-flie-gen", "Weib-chen", "wei-ches", "wei-tem",
    "wei-ter", "wei-tes", "Wel-che", "Wel-pen", "we-nig", "we-ni-ge", "wer-den", "Werk-zeu-ge", "wie-der",
    "wie-gen", "wil-de", "wil-den", "Wild-schwei-ne", "Win-ter", "Win-zig", "win-zi-ge", "Winz-ling",
    "Wo-che", "Wo-chen", "woh-nen", "Wöl-fe", "Wolfs-fa-mi-li-e", "Wolfs-vä-ter", "wo-raus", "Wo-zu",
    "wur-de", "Wür-mer", "wü-tend",
    "Zäh-ne", "Zäh-nen", "Zan-ge", "Ze-bra", "Ze-hen", "Zen-ti-me-ter", "zie-hen", "zu-frie-ren",
    "zu-gleich", "Zu-hau-se", "Zun-ge", "zu-rück", "zu-sam-men", "Zwei-gen", "zweit-größ-te", "Zwi-schen",

    // ---- eine Silbe (304 Wörter) ----
    "ab", "Ach", "acht", "als", "alt", "am", "an", "Arm", "Ast", "auch", "auf", "aus", "Auuu",
    "Bad", "Bär", "Bauch", "Baum", "baut", "bei", "Beim", "Bein", "Ben", "bin", "bis", "Blatt", "blau",
    "bleibt", "blind", "Blut", "braucht", "Brrr", "bunt", "Burg",
    "da", "Dach", "Damm", "dann", "das", "dass", "dem", "den", "denn", "der", "des", "dicht", "Dick", "die",
    "doch", "dort", "dreht", "drei", "Du", "dünn", "durch",
    "echt", "Ei", "ein", "Eis", "er", "erst", "es", "euch",
    "fährt", "fällt", "fast", "Fell", "fest", "Fett", "feucht", "Fisch", "Fleisch", "fliegt", "fließt",
    "Fluss", "folgt", "fort", "friert", "frisst", "Frosch", "früh", "fühlt", "führt", "fünf", "für",
    "gab", "ganz", "gar", "geht", "gibt", "gilt", "gräbt", "Grad", "Gramm", "Gras", "groß", "Grün", "Guck",
    "gut",
    "Hals", "hält", "hängt", "hart", "hat", "Haus", "Haut", "heiß", "Herr", "Hier", "hilft", "Hirsch",
    "hoch", "hohl", "Holz", "Horn", "Hund", "Hüpf", "hüpft",
    "ich", "ihm", "ihn", "ihr", "im", "in", "ist",
    "ja", "Jagd", "Jahr",
    "kalt", "kann", "kaum", "kein", "klappt", "klatscht", "klein", "klingt", "kommt", "Kopf", "Kraft",
    "kratzt", "kriecht", "kühl", "kühlt", "kurz",
    "Land", "lang", "lässt", "läuft", "laut", "lebt", "legt", "leicht", "liegt", "Loch", "los", "Luft",
    "macht", "Mal", "malt", "Man", "Maul", "Maus", "Meer", "mehr", "mein", "Mensch", "Milch", "mit", "Mond",
    "na", "nach", "Nacht", "nachts", "nackt", "nagt", "nah", "nicht", "nie", "noch", "nur",
    "oft",
    "paar", "packt", "passt", "pflückt", "Platz", "psst",
    "quak",
    "raus", "Reh", "rein", "riecht", "Ruf", "ruft", "rund",
    "satt", "saugt", "schafft", "Schal", "schaut", "Schicht", "schießt", "Schläfst", "schläft", "Schlamm",
    "schleicht", "Schlürf", "schmilzt", "schnauft", "Schnee", "schneit", "Schnell", "Schon", "schön",
    "Schutz", "schützt", "Schwamm", "Schwanz", "schwarz", "schwer", "schwimmt", "Schwupp", "sechs", "sehr",
    "sein", "Selbst", "sich", "sie", "sieht", "sind", "sinkt", "sitzt", "so", "soll", "sonst", "spielt",
    "springt", "Sprung", "Spur", "Stadt", "Stand", "stark", "statt", "staut", "steckt", "steht", "Stein",
    "still", "streng", "stützt", "sucht", "süß",
    "Tag", "taub", "Taucht", "Teich", "tief", "Tier", "Toll", "tot", "trägt", "trinkt", "tun",
    "um", "und", "uns",
    "viel", "vier", "Vom", "von", "vor", "vorn",
    "wach", "wächst", "Wald", "wann", "War", "warm", "wärmt", "was", "weg", "weich", "weiß", "weit", "Welt",
    "Wenn", "wer", "wie", "wiegt", "will", "Wind", "wir", "wird", "Wo", "wohnt", "Wolf",
    "Zahl", "Zahn", "zehn", "zeigt", "zu", "zum", "zur", "zwei", "zwölf"
];
