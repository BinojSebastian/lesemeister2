/* =====================================================================
   LESE-MEISTER TIERE – TIER-TEXTE
   =====================================================================
   Sachtexte über Tiere aus aller Welt im Stil von Erstlese-Sachbüchern.
   Ben, Lina und der Papagei Kiko reisen im Heißluftballon mit: Sie
   kommentieren in Sprechblasen und stellen am Ende das Lesequiz.

   WICHTIG: Alles, was im Text, im Bildtext, im „Hast du gewusst …?“-Kasten
   und im Lesequiz steht, ist wahr und belegt. Die Quellen stehen in
   LERNINHALTE.md. Die Sprechblasen sind nur Ausrufe und Fragen der
   Figuren – sie enthalten keine neuen Behauptungen über Tiere.

   So ist ein Kapitel aufgebaut:

   {
       id: "tukan",                 ← Kennung. Nie mehr ändern, sonst gehen die Sterne ⭐ verloren.
       titel: "Der Tukan",
       land: "Brasilien",           ← hier macht der Ballon Halt
       bild: "Tukan",               ← Bild in der Kapitel-Liste (Name aus daten/bilder.js oder ein Emoji)
       seiten: [
           {
               ueberschrift: "…",
               bild: "Tukan",
               bildtext: "…",
               text: [ "Zeile nach Sinnschritten", "", "neuer Absatz" ],
               hastDuGewusst: [ "… dass …?", "…" ],      ← darf fehlen
               sprechblase: { wer: "Kiko", text: "…" }  ← Ben, Lina oder Kiko (darf fehlen)
           }
       ],
       lesequiz: [
           // Die ERSTE Antwort ist immer die richtige. Die App mischt die Antworten.
           { frage: "…?", antworten: ["richtig", "falsch", "falsch"] }
       ]
   },

   Wichtig:
   - Im Text keine geraden Anführungszeichen " benutzen, sondern „ und “.
   - Keinen Bindestrich - im Text benutzen: Er bedeutet in dieser App „Silbengrenze“.
   - Jedes Wort der Texte braucht einen Eintrag in daten/silben-texte.js.
     Fehlt einer, zeigt die App das unter ⚙️ › Bibliothek › Texte an.
   - Ein Kapitel hat etwa 200–250 Wörter (ungefähr 5–7 Minuten Lesezeit).
   ===================================================================== */
window.LESE_MEISTER = window.LESE_MEISTER || {};   // diese Zeile nicht ändern

LESE_MEISTER.tierTexte = [

    // ---------------------------------------------------------------- Deutschland
    {
        id: "wolf",
        titel: "Der Wolf",
        land: "Deutschland",
        bild: "Wolf",
        seiten: [
            {
                ueberschrift: "Der Wolf ist zurück",
                bild: "Wolf",
                bildtext: "Ein Wolf ist ungefähr so groß wie ein Schäferhund.",
                text: [
                    "In Deutschland leben wieder Wölfe.",
                    "Die meisten leben im Nordosten.",
                    "Am liebsten wohnen sie im Wald.",
                    "Wölfe gibt es auch in Asien",
                    "und in Nordamerika.",
                    "",
                    "Ein Wolf ist ungefähr so groß",
                    "wie ein Schäferhund.",
                    "Er hat spitze Ohren",
                    "und einen langen Schwanz."
                ],
                sprechblase: { wer: "Ben", text: "Ein Wolf! Ganz in echt!" }
            },
            {
                ueberschrift: "Eine große Familie",
                bild: "Rudel",
                bildtext: "Ein Rudel ist eine Wolfsfamilie.",
                text: [
                    "Wölfe leben in einem Rudel.",
                    "Das Rudel ist eine Familie.",
                    "Dazu gehören Mutter, Vater",
                    "und ihre Kinder.",
                    "Oft sind es ungefähr acht Wölfe.",
                    "",
                    "Die großen Geschwister",
                    "helfen bei den Kleinen.",
                    "Mit zwei Jahren ziehen",
                    "die jungen Wölfe fort.",
                    "Sie suchen ein eigenes Revier."
                ],
                sprechblase: { wer: "Lina", text: "Wie bei uns zu Hause!" }
            },
            {
                ueberschrift: "Warum heulen Wölfe?",
                bild: "Heulen",
                bildtext: "Mit dem Heulen ruft der Wolf sein Rudel.",
                text: [
                    "Wölfe heulen nicht den Mond an.",
                    "Sie rufen damit ihr Rudel.",
                    "So finden sie sich wieder.",
                    "",
                    "Mit dem Heulen sagen sie auch:",
                    "Hier wohnen wir!",
                    "Wölfe erkennen sich",
                    "an der Stimme."
                ],
                sprechblase: { wer: "Kiko", text: "Auuu! War das gut?" }
            },
            {
                ueberschrift: "Eine Nase für alles",
                bild: "Wolfsnase",
                bildtext: "Der Wolf folgt einer Spur.",
                text: [
                    "Der Wolf riecht sehr gut.",
                    "Bei gutem Wind riecht er ein Reh,",
                    "das zwei Kilometer weit weg ist.",
                    "Auch hören kann er sehr gut.",
                    "",
                    "Wölfe jagen vor allem nachts.",
                    "Sie fressen vor allem",
                    "Rehe und Hirsche.",
                    "In einer Nacht laufen sie",
                    "oft mehr als 20 Kilometer."
                ]
            },
            {
                ueberschrift: "Die Welpen",
                bild: "Welpen",
                bildtext: "Die Welpen liegen in einer Höhle.",
                text: [
                    "Im Frühling kommen",
                    "die Welpen zur Welt.",
                    "Meistens sind es vier bis sechs.",
                    "Sie liegen in einer Höhle.",
                    "",
                    "Am Anfang sind sie",
                    "blind und taub.",
                    "Nach ungefähr zwei Wochen",
                    "öffnen sie die Augen.",
                    "Mit einem Jahr",
                    "sind sie ausgewachsen."
                ],
                sprechblase: { wer: "Lina", text: "Sind die süß!" }
            },
            {
                ueberschrift: "Vom Wolf zum Hund",
                bild: "Wolf und Hund",
                bildtext: "Alle Hunde stammen vom Wolf ab.",
                hastDuGewusst: [
                    "… dass alle Hunde",
                    "vom Wolf abstammen?",
                    "Das gilt für große Hunde",
                    "und auch für ganz kleine.",
                    "Der Wolf ist also",
                    "mit jedem Hund verwandt."
                ],
                sprechblase: { wer: "Ben", text: "Sogar mit einem Dackel?" }
            }
        ],
        lesequiz: [
            { frage: "Wer gehört zu einem Rudel?", antworten: ["Mutter, Vater und ihre Kinder", "nur Wolfsväter", "Wölfe und Rehe"] },
            { frage: "Warum heulen Wölfe?", antworten: ["Sie rufen ihr Rudel.", "Sie haben Bauchweh.", "Sie mögen den Mond."] },
            { frage: "Wie sind die Welpen am Anfang?", antworten: ["blind und taub", "groß und stark", "bunt gestreift"] },
            { frage: ["Ich lebe im Rudel", "und rieche sehr gut.", "Wer bin ich?"], antworten: ["der Wolf", "das Reh", "der Hirsch"] }
        ]
    },

    // ---------------------------------------------------------------- Kenia
    {
        id: "elefant",
        titel: "Der Elefant",
        land: "Kenia",
        bild: "Elefant",
        seiten: [
            {
                ueberschrift: "Der Riese der Savanne",
                bild: "Elefant",
                bildtext: "Der Afrikanische Elefant lebt in der Savanne.",
                text: [
                    "Der Afrikanische Elefant",
                    "ist das größte Tier an Land.",
                    "Ein Bulle wird",
                    "fast vier Meter hoch.",
                    "Nur die Giraffe ist höher.",
                    "Er wiegt so viel",
                    "wie sechs kleine Autos.",
                    "",
                    "Elefanten leben in der Savanne.",
                    "Das ist ein weites Land",
                    "mit viel Gras."
                ],
                sprechblase: { wer: "Lina", text: "Ist der riesig!" }
            },
            {
                ueberschrift: "Ein Rüssel kann fast alles",
                bild: "Elefant trinkt",
                bildtext: "Mit dem Rüssel saugt der Elefant Wasser auf.",
                text: [
                    "Der Rüssel ist Nase",
                    "und Oberlippe zugleich.",
                    "Im Rüssel sind keine Knochen,",
                    "aber starke Muskeln.",
                    "",
                    "Mit dem Rüssel kann der Elefant",
                    "riechen, greifen und trinken.",
                    "Er trägt damit sogar",
                    "schwere Äste.",
                    "Beim Schwimmen ist der Rüssel",
                    "sein Schnorchel."
                ],
                sprechblase: { wer: "Ben", text: "So einen Rüssel will ich auch!" }
            },
            {
                ueberschrift: "Ohren zum Kühlen",
                bild: "Schlammbad",
                bildtext: "Der Schlamm schützt die Haut.",
                text: [
                    "Die Ohren sind",
                    "bis zu zwei Meter lang.",
                    "Sie kühlen den Elefanten.",
                    "In den Ohren kühlt das Blut ab.",
                    "Dann fließt es zurück",
                    "in den Körper.",
                    "",
                    "Auch ein Bad im Schlamm hilft.",
                    "Der Schlamm schützt die Haut",
                    "vor Sonne und Hitze."
                ],
                sprechblase: { wer: "Kiko", text: "Ein Bad im Schlamm? Igitt!" }
            },
            {
                ueberschrift: "Immer zusammen",
                bild: "Herde",
                bildtext: "Die Kühe und ihre Jungen leben in einer Herde.",
                text: [
                    "Die Elefantenkühe",
                    "und ihre Jungen",
                    "leben in einer Herde.",
                    "Oft sind es ungefähr zehn Tiere.",
                    "Die Bullen leben meistens allein.",
                    "",
                    "Elefanten fressen Gras,",
                    "Blätter und Früchte.",
                    "An einem Tag frisst ein Elefant",
                    "bis zu 150 Kilo.",
                    "Dazu trinkt er",
                    "sehr viel Wasser."
                ]
            },
            {
                ueberschrift: "Das Elefantenkind",
                bild: "Elefantenkind",
                bildtext: "Das Junge bleibt nah bei der Mutter.",
                text: [
                    "Ein Elefantenkind wächst",
                    "fast zwei Jahre",
                    "im Bauch der Mutter.",
                    "Bei der Geburt wiegt es",
                    "ungefähr 100 Kilo.",
                    "",
                    "Schon nach einer halben Stunde",
                    "kann es stehen.",
                    "Die Mutter gibt ihm",
                    "ungefähr ein Jahr lang Milch."
                ],
                sprechblase: { wer: "Ben", text: "Hallo, kleiner Elefant!" }
            },
            {
                ueberschrift: "Schnell getrunken",
                bild: "Elefant trinkt",
                bildtext: "Elefanten trinken sehr viel Wasser.",
                hastDuGewusst: [
                    "… dass ein Elefant",
                    "sehr schnell trinkt?",
                    "In einer Sekunde saugt er",
                    "bis zu drei Liter Wasser",
                    "in seinen Rüssel.",
                    "Das haben Forscher gemessen."
                ],
                sprechblase: { wer: "Lina", text: "Schlürf!" }
            }
        ],
        lesequiz: [
            { frage: "Was ist der Rüssel?", antworten: ["Nase und Oberlippe", "ein langer Zahn", "ein Arm"] },
            { frage: "Wozu sind die großen Ohren gut?", antworten: ["Sie kühlen den Elefanten.", "Damit fliegt er.", "Sie halten ihn warm."] },
            { frage: "Wie viel wiegt ein Elefantenkind bei der Geburt?", antworten: ["ungefähr 100 Kilo", "ungefähr 1 Kilo", "ungefähr 10 Kilo"] },
            { frage: "Wer lebt meistens allein?", antworten: ["die Bullen", "die Kühe", "die Jungen"] }
        ]
    },

    // ---------------------------------------------------------------- Madagaskar
    {
        id: "chamaeleon",
        titel: "Das Chamäleon",
        land: "Madagaskar",
        bild: "Chamäleon",
        seiten: [
            {
                ueberschrift: "Echsen auf den Bäumen",
                bild: "Chamäleon",
                bildtext: "Das Chamäleon hält sich am Ast fest.",
                text: [
                    "Chamäleons sind Echsen.",
                    "Ungefähr die Hälfte aller Arten",
                    "lebt auf der Insel Madagaskar.",
                    "Die meisten wohnen",
                    "auf Bäumen und Büschen.",
                    "",
                    "Mit den Füßen halten sie sich fest",
                    "wie mit einer Zange.",
                    "Auch der Schwanz kann greifen.",
                    "Beim Klettern schwanken sie",
                    "wie ein Blatt im Wind."
                ],
                sprechblase: { wer: "Lina", text: "Wo ist es denn? Ach, da!" }
            },
            {
                ueberschrift: "Bunt wie die Laune",
                bild: "Farben",
                bildtext: "Chamäleons können ihre Farbe wechseln.",
                text: [
                    "Ein Chamäleon kann",
                    "seine Farbe wechseln.",
                    "Die Farbe zeigt,",
                    "wie es sich fühlt.",
                    "Ist es wütend, wird es dunkel.",
                    "Will es gefallen,",
                    "zeigt es bunte Farben.",
                    "",
                    "So sprechen Chamäleons",
                    "miteinander.",
                    "Mit Tarnung hat das",
                    "nur wenig zu tun."
                ]
            },
            {
                ueberschrift: "Augen wie Kugeln",
                bild: "Augen",
                bildtext: "Jedes Auge schaut in eine andere Richtung.",
                text: [
                    "Jedes Auge bewegt sich",
                    "ganz für sich allein.",
                    "Ein Auge kann nach vorn schauen",
                    "und das andere nach hinten.",
                    "",
                    "So sieht das Chamäleon fast alles,",
                    "ohne den Kopf zu drehen.",
                    "Es entdeckt Feinde früh",
                    "und findet leichter Futter."
                ],
                sprechblase: { wer: "Ben", text: "Das will ich auch können!" }
            },
            {
                ueberschrift: "Die schnelle Zunge",
                bild: "Zunge",
                bildtext: "Die Zunge schießt aus dem Maul.",
                text: [
                    "Ein Chamäleon frisst Insekten.",
                    "Es wartet ganz still.",
                    "Dann schießt die Zunge heraus.",
                    "Sie ist klebrig",
                    "und länger als der ganze Körper.",
                    "",
                    "Das Insekt bleibt kleben.",
                    "Schwupp, ist es im Maul!"
                ],
                sprechblase: { wer: "Kiko", text: "Hilfe! Ich bin kein Insekt!" }
            },
            {
                ueberschrift: "Groß und klein",
                bild: "Chamäleon",
                bildtext: "Es gibt große und kleine Chamäleons.",
                text: [
                    "Es gibt mehr als 200 Arten.",
                    "Die größten werden",
                    "fast 70 Zentimeter lang.",
                    "",
                    "Die meisten Chamäleons",
                    "legen Eier.",
                    "Bei Gefahr stellen sie sich tot.",
                    "Dann bewegen sie sich nicht.",
                    "Ihre Feinde sind",
                    "Schlangen und Vögel."
                ]
            },
            {
                ueberschrift: "Ein Winzling",
                bild: "Winzling",
                bildtext: "Das kleinste Chamäleon passt auf eine Fingerspitze.",
                hastDuGewusst: [
                    "… dass das kleinste Chamäleon",
                    "auf eine Fingerspitze passt?",
                    "Es ist nur ungefähr",
                    "zwei Zentimeter lang.",
                    "Es lebt auf Madagaskar."
                ],
                sprechblase: { wer: "Lina", text: "So klein! Vorsicht, Ben!" }
            }
        ],
        lesequiz: [
            { frage: "Wo lebt ungefähr die Hälfte aller Arten?", antworten: ["auf Madagaskar", "in Deutschland", "am Südpol"] },
            { frage: "Was zeigt die Farbe?", antworten: ["wie sich das Chamäleon fühlt", "wie alt es ist", "was es gefressen hat"] },
            { frage: "Was frisst ein Chamäleon?", antworten: ["Insekten", "Gras", "Fische"] },
            { frage: "Wie ist die Zunge?", antworten: ["klebrig und sehr lang", "kurz und trocken", "hart wie Stein"] }
        ]
    },

    // ---------------------------------------------------------------- Indien
    {
        id: "tiger",
        titel: "Der Tiger",
        land: "Indien",
        bild: "Tiger",
        seiten: [
            {
                ueberschrift: "Die größte Katze der Welt",
                bild: "Tiger",
                bildtext: "Der Tiger ist die größte Katze der Welt.",
                text: [
                    "Der Tiger ist",
                    "die größte Katze der Welt.",
                    "Mit Schwanz wird er",
                    "ungefähr drei Meter lang.",
                    "Ein Tiger kann",
                    "mehr als 200 Kilo wiegen.",
                    "Die Weibchen sind etwas kleiner.",
                    "",
                    "Die meisten wilden Tiger",
                    "leben in Indien.",
                    "Früher lebten Tiger",
                    "fast überall in Asien."
                ],
                sprechblase: { wer: "Ben", text: "Leise, Kiko! Nicht krächzen!" }
            },
            {
                ueberschrift: "Streifen wie ein Fingerabdruck",
                bild: "Streifen",
                bildtext: "Jeder Tiger hat ein anderes Muster.",
                text: [
                    "Das Fell ist gelbbraun",
                    "mit schwarzen Streifen.",
                    "Jeder Tiger hat",
                    "ein anderes Muster.",
                    "Kein Tiger sieht aus",
                    "wie ein anderer.",
                    "",
                    "Sogar die Haut",
                    "unter dem Fell",
                    "ist gestreift."
                ]
            },
            {
                ueberschrift: "Allein auf der Jagd",
                bild: "Tigerjagd",
                bildtext: "Der Tiger schleicht sich an.",
                text: [
                    "Tiger leben allein.",
                    "Nur die Mutter bleibt",
                    "bei ihren Jungen.",
                    "",
                    "Tiger jagen meistens nachts.",
                    "Sie schleichen sich leise an.",
                    "Dabei achten sie auf den Wind.",
                    "Die Beute soll sie nicht riechen.",
                    "Dann sprinten sie los.",
                    "Sie fressen Hirsche",
                    "und Wildschweine.",
                    "An einem Tag frisst ein Tiger",
                    "sechs bis acht Kilo Fleisch."
                ],
                sprechblase: { wer: "Kiko", text: "Ich bin ganz still. Versprochen!" }
            },
            {
                ueberschrift: "Eine Katze im Wasser",
                bild: "Tiger schwimmt",
                bildtext: "Tiger sind gute Schwimmer.",
                text: [
                    "Tiger sind gute Schwimmer.",
                    "Sie schwimmen sogar",
                    "durch breite Flüsse.",
                    "",
                    "Auf Bäume klettern sie selten.",
                    "Dafür sind sie",
                    "zu groß und zu schwer.",
                    "Aus dem Stand springt ein Tiger",
                    "fünf Meter weit."
                ],
                sprechblase: { wer: "Lina", text: "Fünf Meter! So weit!" }
            },
            {
                ueberschrift: "Die Tigerkinder",
                bild: "Tigerkinder",
                bildtext: "Die Jungen bleiben lange bei der Mutter.",
                text: [
                    "Eine Tigerin bekommt",
                    "meistens zwei oder drei Junge.",
                    "Mit sechs Monaten",
                    "fressen sie Fleisch.",
                    "",
                    "Selbst jagen können sie erst",
                    "mit ungefähr anderthalb Jahren.",
                    "Sie bleiben lange",
                    "bei der Mutter."
                ]
            },
            {
                ueberschrift: "Tiger brauchen Schutz",
                bild: "Tiger",
                bildtext: "Es gibt nur noch wenige wilde Tiger.",
                hastDuGewusst: [
                    "… dass es nur noch",
                    "wenige wilde Tiger gibt?",
                    "Vor 100 Jahren lebten",
                    "noch 100.000 Tiger.",
                    "Heute sind es nur noch",
                    "ein paar Tausend.",
                    "Darum werden Tiger geschützt."
                ],
                sprechblase: { wer: "Ben", text: "Wir passen auf euch auf!" }
            }
        ],
        lesequiz: [
            { frage: "Wo leben die meisten wilden Tiger?", antworten: ["in Indien", "in Kanada", "in Australien"] },
            { frage: "Was ist bei jedem Tiger anders?", antworten: ["das Muster der Streifen", "die Zahl der Beine", "die Farbe der Nase"] },
            { frage: "Wie leben Tiger?", antworten: ["allein", "im Rudel", "in einer Herde"] },
            { frage: ["Ich bin die größte Katze", "und habe schwarze Streifen.", "Wer bin ich?"], antworten: ["der Tiger", "der Wolf", "das Zebra"] }
        ]
    },

    // ---------------------------------------------------------------- China
    {
        id: "panda",
        titel: "Der Große Panda",
        land: "China",
        bild: "Panda",
        seiten: [
            {
                ueberschrift: "Der Bär aus den Bergen",
                bild: "Panda",
                bildtext: "Der Große Panda lebt in Wäldern aus Bambus.",
                text: [
                    "Der Große Panda",
                    "lebt nur in China.",
                    "Dort wohnt er in den Bergen.",
                    "In den Wäldern",
                    "wächst viel Bambus.",
                    "",
                    "Es ist dort kühl und feucht.",
                    "Sein dickes Fell",
                    "hält den Panda warm.",
                    "Ein Panda wiegt",
                    "70 bis 160 Kilo."
                ],
                sprechblase: { wer: "Lina", text: "Der sieht aber kuschelig aus!" }
            },
            {
                ueberschrift: "Bambus, Bambus, Bambus",
                bild: "Panda frisst",
                bildtext: "Der Panda frisst fast nur Bambus.",
                text: [
                    "Der Panda frisst",
                    "fast nur Bambus.",
                    "Bambus gibt aber",
                    "nur wenig Kraft.",
                    "Darum frisst der Panda",
                    "fast den ganzen Tag.",
                    "",
                    "An einem Tag schafft er",
                    "ungefähr 20 Kilo Bambus.",
                    "Manchmal frisst er auch",
                    "Gras oder Früchte."
                ],
                sprechblase: { wer: "Kiko", text: "Und wann spielt er?" }
            },
            {
                ueberschrift: "Ein Daumen extra",
                bild: "Pandapfote",
                bildtext: "Mit dem Daumen hält der Panda den Bambus fest.",
                text: [
                    "An den Vorderpfoten",
                    "hat der Panda fünf Finger",
                    "und noch einen Daumen dazu.",
                    "",
                    "Der Daumen ist eigentlich",
                    "ein Knochen vom Handgelenk.",
                    "Damit hält der Panda",
                    "den Bambus fest."
                ]
            },
            {
                ueberschrift: "Klettern und schwimmen",
                bild: "Panda klettert",
                bildtext: "Pandas können gut klettern.",
                text: [
                    "Pandas können gut klettern.",
                    "Auch schwimmen",
                    "können sie gut.",
                    "",
                    "Ein Panda lebt meistens allein.",
                    "Anderen Pandas",
                    "geht er aus dem Weg.",
                    "Er ist vor allem",
                    "am Abend und in der Nacht wach.",
                    "Pandas machen",
                    "viele verschiedene Laute."
                ]
            },
            {
                ueberschrift: "Winzig klein",
                bild: "Pandababy",
                bildtext: "Ein Pandababy wiegt so viel wie eine Tafel Schokolade.",
                text: [
                    "Ein Pandababy ist",
                    "bei der Geburt",
                    "rosa, nackt und blind.",
                    "Es wiegt nur 100 Gramm.",
                    "Das ist so viel",
                    "wie eine Tafel Schokolade.",
                    "",
                    "Nach einem Jahr wiegt es",
                    "schon ungefähr 45 Kilo.",
                    "Das Junge bleibt mindestens",
                    "anderthalb Jahre bei der Mutter."
                ],
                sprechblase: { wer: "Ben", text: "So klein? Unglaublich!" }
            },
            {
                ueberschrift: "Pandas brauchen Schutz",
                bild: "Panda",
                bildtext: "Menschen schützen die Wälder der Pandas.",
                hastDuGewusst: [
                    "… dass es nur noch",
                    "ungefähr 1.800 wilde Pandas gibt?",
                    "Menschen schützen ihre Wälder.",
                    "Darum werden es",
                    "langsam wieder mehr."
                ],
                sprechblase: { wer: "Lina", text: "Das ist eine gute Nachricht!" }
            }
        ],
        lesequiz: [
            { frage: "Was frisst der Panda fast nur?", antworten: ["Bambus", "Fisch", "Honig"] },
            { frage: "Wie viel wiegt ein Pandababy bei der Geburt?", antworten: ["100 Gramm", "10 Kilo", "100 Kilo"] },
            { frage: "Wozu braucht der Panda den Daumen?", antworten: ["Er hält den Bambus fest.", "Er kratzt sich damit.", "Er malt damit."] },
            { frage: "Wo lebt der Große Panda?", antworten: ["nur in China", "in Brasilien", "in Kenia"] }
        ]
    },

    // ---------------------------------------------------------------- Japan
    {
        id: "schneeaffe",
        titel: "Der Schneeaffe",
        land: "Japan",
        bild: "Schneeaffe",
        seiten: [
            {
                ueberschrift: "Affen im Schnee",
                bild: "Schneeaffe",
                bildtext: "Der Schneeaffe hat ein rotes Gesicht.",
                text: [
                    "Der Japanmakak lebt in Japan.",
                    "Er wird auch",
                    "Schneeaffe genannt.",
                    "Man erkennt ihn",
                    "an seinem roten Gesicht.",
                    "",
                    "Kein anderer Affe",
                    "lebt so weit im Norden.",
                    "Er wohnt in den Wäldern.",
                    "Im Winter liegt dort viel Schnee.",
                    "Es wird bis zu",
                    "minus 20 Grad kalt."
                ],
                sprechblase: { wer: "Ben", text: "Brrr, ist das kalt hier!" }
            },
            {
                ueberschrift: "Ein Bad im heißen Wasser",
                bild: "Heiße Quelle",
                bildtext: "Die Schneeaffen wärmen sich im heißen Wasser.",
                text: [
                    "In Japan gibt es heiße Quellen.",
                    "Das Wasser kommt",
                    "warm aus der Erde.",
                    "Tief in der Erde ist es heiß.",
                    "Das wärmt das Wasser.",
                    "",
                    "Wenn es friert und schneit,",
                    "steigen manche Schneeaffen hinein.",
                    "Dort sitzen sie",
                    "oft stundenlang.",
                    "So bleiben sie schön warm."
                ],
                sprechblase: { wer: "Kiko", text: "Platz da! Ich will auch rein!" }
            },
            {
                ueberschrift: "Viele Affen, eine Gruppe",
                bild: "Affengruppe",
                bildtext: "Schneeaffen leben in Gruppen.",
                text: [
                    "Schneeaffen leben in Gruppen.",
                    "Manchmal sind es",
                    "mehr als 20 Tiere.",
                    "Die Weibchen führen",
                    "die Gruppe an.",
                    "Sie bleiben immer",
                    "in ihrer Gruppe.",
                    "",
                    "Die Männchen ziehen",
                    "von Gruppe zu Gruppe."
                ]
            },
            {
                ueberschrift: "Dick eingepackt",
                bild: "Schneeaffe",
                bildtext: "Das dichte Fell hält den Affen warm.",
                text: [
                    "Ein Schneeaffe wiegt",
                    "ungefähr zehn Kilo.",
                    "Sein Schwanz ist kurz.",
                    "Er wird 80 bis 95",
                    "Zentimeter groß.",
                    "",
                    "Sein Fell ist sehr dicht.",
                    "Es hält ihn",
                    "im kalten Winter warm."
                ],
                sprechblase: { wer: "Lina", text: "Ich will auch so ein Fell!" }
            },
            {
                ueberschrift: "Was fressen Schneeaffen?",
                bild: "Baumrinde",
                bildtext: "Im Winter fressen Schneeaffen oft Baumrinde.",
                text: [
                    "Schneeaffen fressen Pflanzen,",
                    "Früchte, Nüsse und Insekten.",
                    "Sie sind Allesfresser.",
                    "",
                    "Im Winter finden sie",
                    "davon nur wenig.",
                    "Dann fressen sie",
                    "oft Baumrinde.",
                    "Davon werden sie",
                    "aber nicht richtig satt."
                ]
            },
            {
                ueberschrift: "Affen beim Fischen",
                bild: "Affe fischt",
                bildtext: "Manche Schneeaffen fangen Fische.",
                hastDuGewusst: [
                    "… dass Schneeaffen",
                    "Fische fangen?",
                    "Im Winter gehen manche an Flüsse,",
                    "die nicht zufrieren.",
                    "Dort fangen sie Fische",
                    "mit den Händen.",
                    "Das haben Forscher",
                    "im Jahr 2021 berichtet."
                ],
                sprechblase: { wer: "Ben", text: "Ganz ohne Angel!" }
            }
        ],
        lesequiz: [
            { frage: "Wo lebt der Schneeaffe?", antworten: ["in Japan", "in Peru", "in Kenia"] },
            { frage: "Was machen manche Schneeaffen, wenn es friert?", antworten: ["Sie baden in heißen Quellen.", "Sie fliegen in den Süden.", "Sie bauen ein Haus."] },
            { frage: "Wer führt die Gruppe an?", antworten: ["die Weibchen", "die Männchen", "die Kinder"] },
            { frage: "Was fressen sie im Winter oft?", antworten: ["Baumrinde", "Eis", "Bananen"] }
        ]
    },

    // ---------------------------------------------------------------- Australien
    {
        id: "kaenguru",
        titel: "Das Känguru",
        land: "Australien",
        bild: "Känguru",
        seiten: [
            {
                ueberschrift: "Das größte Beuteltier",
                bild: "Känguru",
                bildtext: "Das Rote Riesenkänguru lebt in Australien.",
                text: [
                    "Das Rote Riesenkänguru",
                    "lebt in Australien.",
                    "Es ist das größte",
                    "Beuteltier der Welt.",
                    "",
                    "Die Männchen sind",
                    "viel größer als die Weibchen.",
                    "Sie haben rötliches Fell.",
                    "Kängurus leben dort,",
                    "wo es heiß und trocken ist."
                ],
                sprechblase: { wer: "Lina", text: "Hallo, Känguru!" }
            },
            {
                ueberschrift: "Weit und hoch",
                bild: "Sprung",
                bildtext: "Ein Känguru springt mehr als acht Meter weit.",
                text: [
                    "Ein Känguru läuft nicht.",
                    "Es hüpft.",
                    "Dafür hat es",
                    "sehr starke Hinterbeine.",
                    "Mit einem Sprung kommt es",
                    "mehr als acht Meter weit.",
                    "Es springt auch höher,",
                    "als ein Mensch groß ist.",
                    "",
                    "Rückwärts gehen",
                    "kann es nicht."
                ],
                sprechblase: { wer: "Ben", text: "Hüpf, hüpf! Ich komme nicht mit!" }
            },
            {
                ueberschrift: "Ein Schwanz wie ein Bein",
                bild: "Känguru",
                bildtext: "Der Schwanz stützt das Känguru.",
                text: [
                    "Der Schwanz ist",
                    "lang und stark.",
                    "Beim Springen hält er",
                    "das Känguru im Gleichgewicht.",
                    "",
                    "Beim Stehen stützt sich",
                    "das Känguru darauf.",
                    "Dann ist der Schwanz",
                    "wie ein fünftes Bein."
                ]
            },
            {
                ueberschrift: "Das Baby im Beutel",
                bild: "Beutel",
                bildtext: "Das Junge schaut aus dem Beutel.",
                text: [
                    "Nur die Weibchen",
                    "haben einen Beutel.",
                    "Ein Kängurubaby ist",
                    "bei der Geburt so klein",
                    "wie ein Gummibärchen.",
                    "Im Beutel wächst es heran.",
                    "",
                    "Nach ungefähr einem halben Jahr",
                    "kommt es zum ersten Mal heraus.",
                    "Mit acht Monaten ist es",
                    "zu groß für den Beutel."
                ],
                sprechblase: { wer: "Lina", text: "Guck mal, da schaut es raus!" }
            },
            {
                ueberschrift: "Ruhe am Tag",
                bild: "Schatten",
                bildtext: "Am Tag ruhen Kängurus im Schatten.",
                text: [
                    "Am Tag ist es sehr heiß.",
                    "Dann suchen Kängurus Schatten.",
                    "Erst am Abend",
                    "und in der Nacht",
                    "werden sie munter.",
                    "Sie fressen vor allem Gras.",
                    "Auch Blätter und Rinde",
                    "fressen sie.",
                    "",
                    "Männchen kämpfen manchmal.",
                    "Sie boxen und treten."
                ],
                sprechblase: { wer: "Kiko", text: "Ich boxe lieber nicht mit!" }
            },
            {
                ueberschrift: "Ganz schön schnell",
                bild: "Sprung",
                bildtext: "Kängurus können sehr schnell hüpfen.",
                hastDuGewusst: [
                    "… dass ein Känguru",
                    "sehr schnell sein kann?",
                    "Es schafft mehr als",
                    "50 Kilometer in einer Stunde.",
                    "So schnell fährt",
                    "ein Auto in der Stadt."
                ]
            }
        ],
        lesequiz: [
            { frage: "Wie bewegt sich ein Känguru?", antworten: ["Es hüpft.", "Es kriecht.", "Es fliegt."] },
            { frage: "Wie groß ist ein Kängurubaby bei der Geburt?", antworten: ["wie ein Gummibärchen", "wie eine Katze", "wie ein Fußball"] },
            { frage: "Wer hat einen Beutel?", antworten: ["nur die Weibchen", "nur die Männchen", "alle Kängurus"] },
            { frage: "Was machen Kängurus am heißen Tag?", antworten: ["Sie suchen Schatten.", "Sie springen den ganzen Tag.", "Sie baden im Meer."] }
        ]
    },

    // ---------------------------------------------------------------- Neuseeland
    {
        id: "kiwi",
        titel: "Der Kiwi",
        land: "Neuseeland",
        bild: "Kiwi",
        seiten: [
            {
                ueberschrift: "Ein Vogel, der nicht fliegt",
                bild: "Kiwi am Tag",
                bildtext: "Der Kiwi hat einen langen Schnabel.",
                text: [
                    "Der Kiwi lebt",
                    "nur in Neuseeland.",
                    "Er ist ein Vogel.",
                    "Fliegen kann er aber nicht.",
                    "",
                    "Seine Flügel sind nur",
                    "fünf Zentimeter lang.",
                    "Man sieht sie kaum.",
                    "Sie stecken unter den Federn.",
                    "Die Weibchen sind größer",
                    "als die Männchen."
                ],
                sprechblase: { wer: "Kiko", text: "Nicht fliegen? Du Armer!" }
            },
            {
                ueberschrift: "Federn wie Fell",
                bild: "Kiwi am Tag",
                bildtext: "Die Federn sind weich wie Fell.",
                text: [
                    "Die Federn fühlen sich an",
                    "wie weiches Fell.",
                    "",
                    "Früher gab es in Neuseeland",
                    "keine Raubtiere am Boden.",
                    "Der Kiwi musste",
                    "nicht wegfliegen."
                ]
            },
            {
                ueberschrift: "Die Nase am Schnabel",
                bild: "Kiwi sucht",
                bildtext: "Der Kiwi sucht Würmer in der Erde.",
                text: [
                    "Der Schnabel ist",
                    "lang und dünn.",
                    "Ganz vorne sitzen",
                    "die Nasenlöcher.",
                    "Das gibt es",
                    "bei keinem anderen Vogel.",
                    "",
                    "Der Kiwi riecht sehr gut.",
                    "Er steckt den Schnabel",
                    "in die Erde",
                    "und findet so Würmer.",
                    "Dabei schnauft er laut."
                ],
                sprechblase: { wer: "Ben", text: "Hatschi! Erde in der Nase!" }
            },
            {
                ueberschrift: "Wach in der Nacht",
                bild: "Kiwi",
                bildtext: "In der Nacht sucht der Kiwi Futter.",
                text: [
                    "Am Tag schläft der Kiwi.",
                    "In der Nacht sucht er Futter.",
                    "Er frisst Würmer,",
                    "Insekten und Beeren.",
                    "",
                    "Sehen kann er nicht gut.",
                    "Seine Augen sind sehr klein.",
                    "Dafür hat er feine Tasthaare",
                    "am Schnabel."
                ]
            },
            {
                ueberschrift: "Ein riesiges Ei",
                bild: "Kiwi-Ei",
                bildtext: "Das Ei des Kiwis ist sehr groß.",
                text: [
                    "Das Ei des Kiwis",
                    "ist sehr groß.",
                    "Es wiegt bis zu 450 Gramm.",
                    "Das ist ungefähr so viel",
                    "wie acht Hühnereier.",
                    "Vorher frisst das Weibchen",
                    "dreimal so viel wie sonst.",
                    "",
                    "Meistens brütet das Männchen.",
                    "Es sitzt mehr als zwei Monate",
                    "auf dem Ei."
                ],
                sprechblase: { wer: "Lina", text: "So ein großes Ei!" }
            },
            {
                ueberschrift: "Der Kiwi braucht Schutz",
                bild: "Kiwi",
                bildtext: "Der Kiwi wird streng geschützt.",
                hastDuGewusst: [
                    "… dass Hunde und Katzen",
                    "für den Kiwi gefährlich sind?",
                    "Menschen haben sie",
                    "nach Neuseeland mitgebracht.",
                    "Darum wird der Kiwi",
                    "streng geschützt."
                ]
            }
        ],
        lesequiz: [
            { frage: "Wo sitzen die Nasenlöcher des Kiwis?", antworten: ["vorne am Schnabel", "an den Füßen", "am Schwanz"] },
            { frage: "Wann sucht der Kiwi Futter?", antworten: ["in der Nacht", "am Mittag", "nie"] },
            { frage: "Wer brütet meistens?", antworten: ["das Männchen", "das Weibchen", "niemand"] },
            { frage: ["Ich bin ein Vogel", "und kann nicht fliegen.", "Ich lebe in Neuseeland.", "Wer bin ich?"], antworten: ["der Kiwi", "der Tukan", "der Papagei"] }
        ]
    },

    // ---------------------------------------------------------------- Brasilien
    {
        id: "tukan",
        titel: "Der Tukan",
        land: "Brasilien",
        bild: "Tukan",
        seiten: [
            {
                ueberschrift: "Ein Vogel mit Riesenschnabel",
                bild: "Tukan",
                bildtext: "Der Riesentukan hat einen bunten Schnabel.",
                text: [
                    "Der Riesentukan lebt in Südamerika,",
                    "zum Beispiel in Brasilien.",
                    "Er ist der größte Tukan.",
                    "",
                    "Sein Körper ist schwarz.",
                    "Die Kehle ist weiß.",
                    "Am meisten fällt sein Schnabel auf.",
                    "Er ist orange",
                    "und fast 20 Zentimeter lang."
                ],
                sprechblase: { wer: "Kiko", text: "Mein Schnabel ist kleiner. Na und?" }
            },
            {
                ueberschrift: "Leicht wie ein Schwamm",
                bild: "Schnabel",
                bildtext: "Innen ist der Schnabel fast hohl.",
                text: [
                    "Der Schnabel sieht schwer aus.",
                    "Er ist aber ganz leicht.",
                    "Innen ist er fast hohl.",
                    "Dort sieht er aus",
                    "wie ein harter Schwamm.",
                    "",
                    "Außen ist der Schnabel aus Horn.",
                    "Daraus sind auch",
                    "deine Fingernägel."
                ],
                sprechblase: { wer: "Ben", text: "So groß und doch so leicht!" }
            },
            {
                ueberschrift: "Was frisst der Tukan?",
                bild: "Früchte",
                bildtext: "Mit dem Schnabel pflückt der Tukan Früchte.",
                text: [
                    "Der Tukan frisst vor allem Früchte.",
                    "Mit dem langen Schnabel",
                    "kommt er auch an Früchte",
                    "auf ganz dünnen Ästen.",
                    "",
                    "Manchmal frisst er auch",
                    "Insekten, Eidechsen",
                    "oder die Eier anderer Vögel.",
                    "",
                    "Seine Zunge ist lang und dünn.",
                    "Vorne sieht sie aus wie ein Pinsel."
                ],
                sprechblase: { wer: "Lina", text: "Eine Zunge wie ein Pinsel!" }
            },
            {
                ueberschrift: "Hüpfen statt fliegen",
                bild: "Hüpfen",
                bildtext: "Der Tukan hüpft von Ast zu Ast.",
                text: [
                    "Der Tukan kann nicht gut fliegen.",
                    "Meistens hüpft er",
                    "von Ast zu Ast.",
                    "",
                    "Tukane suchen ihr Futter",
                    "oft in kleinen Gruppen.",
                    "",
                    "Ihr Ruf ist tief und laut.",
                    "Er klingt fast wie ein Frosch."
                ],
                sprechblase: { wer: "Kiko", text: "Quak? Das will ich hören!" }
            },
            {
                ueberschrift: "Gute Nacht im Baum",
                bild: "Baumhöhle",
                bildtext: "Tukane schlafen in Baumhöhlen.",
                text: [
                    "Zum Schlafen sucht sich der Tukan",
                    "eine Höhle in einem Baum.",
                    "Er legt den Schnabel auf den Rücken",
                    "und klappt den Schwanz über den Kopf.",
                    "Dann sieht er aus",
                    "wie eine Kugel aus Federn.",
                    "",
                    "Auch die Eier liegen in einer Baumhöhle.",
                    "Das Weibchen legt zwei bis vier Eier.",
                    "Mutter und Vater brüten beide.",
                    "Nach ungefähr 18 Tagen",
                    "schlüpfen die Küken."
                ],
                sprechblase: { wer: "Lina", text: "Psst, der Tukan schläft!" }
            },
            {
                ueberschrift: "Ein Schnabel gegen die Hitze",
                bild: "Wärme",
                bildtext: "Über den Schnabel gibt der Tukan Wärme ab.",
                hastDuGewusst: [
                    "… dass der Schnabel den Tukan kühlt?",
                    "Ist dem Vogel zu warm,",
                    "fließt mehr Blut in den Schnabel.",
                    "Dort geht die Wärme in die Luft.",
                    "Forscher haben das",
                    "mit einer Wärmebildkamera gefilmt."
                ],
                sprechblase: { wer: "Ben", text: "Das ist ja praktisch!" }
            }
        ],
        lesequiz: [
            { frage: "Woraus ist der Schnabel außen?", antworten: ["aus Horn", "aus Holz", "aus Stein"] },
            { frage: "Was frisst der Tukan vor allem?", antworten: ["Früchte", "Gras", "Fische"] },
            { frage: "Wie viele Eier legt das Weibchen?", antworten: ["zwei bis vier", "zehn bis zwölf", "mehr als hundert"] },
            { frage: ["Ich schlafe in einer Baumhöhle", "und habe einen riesigen Schnabel.", "Wer bin ich?"], antworten: ["der Tukan", "der Frosch", "die Eidechse"] }
        ]
    },

    // ---------------------------------------------------------------- Peru
    {
        id: "faultier",
        titel: "Das Faultier",
        land: "Peru",
        bild: "Faultier",
        seiten: [
            {
                ueberschrift: "Kopfüber im Regenwald",
                bild: "Faultier",
                bildtext: "Das Faultier hängt kopfüber am Ast.",
                text: [
                    "Das Faultier lebt im Regenwald",
                    "von Mittelamerika",
                    "und Südamerika.",
                    "",
                    "Fast immer hängt es",
                    "kopfüber an einem Ast.",
                    "So frisst es.",
                    "So schläft es.",
                    "Seine langen Krallen",
                    "halten es fest.",
                    "Sie sind gebogen",
                    "und bis zu zehn Zentimeter lang."
                ],
                sprechblase: { wer: "Ben", text: "Hallo? Schläfst du?" }
            },
            {
                ueberschrift: "Langsam, langsam",
                bild: "Faultier",
                bildtext: "Kein anderes Säugetier ist so langsam.",
                text: [
                    "Kein anderes Säugetier",
                    "ist so langsam.",
                    "In einer Minute kommt es",
                    "nur ungefähr zwei Meter weit.",
                    "Für 100 Meter braucht es",
                    "fast eine Stunde.",
                    "",
                    "Es gibt Faultiere",
                    "mit zwei Fingern",
                    "und Faultiere mit drei Fingern."
                ]
            },
            {
                ueberschrift: "Blätter zum Frühstück",
                bild: "Faultier frisst",
                bildtext: "Das Faultier frisst vor allem Blätter.",
                text: [
                    "Das Faultier frisst",
                    "vor allem Blätter.",
                    "Es hat ein paar Lieblingsbäume.",
                    "Bis ein Blatt verdaut ist,",
                    "dauert es mindestens",
                    "eine Woche.",
                    "",
                    "Ungefähr einmal in der Woche",
                    "klettert das Faultier",
                    "nach unten.",
                    "Am Boden macht es",
                    "sein Geschäft."
                ],
                sprechblase: { wer: "Kiko", text: "Nur einmal in der Woche?" }
            },
            {
                ueberschrift: "Grün im Fell",
                bild: "Grünes Fell",
                bildtext: "Algen färben das Fell ein wenig grün.",
                text: [
                    "Im Fell wachsen",
                    "winzige Algen.",
                    "Sie färben das Fell",
                    "ein wenig grün.",
                    "So ist das Faultier",
                    "gut getarnt.",
                    "Zwischen den Blättern",
                    "sieht man es kaum.",
                    "",
                    "Im Fell wohnen",
                    "auch kleine Motten."
                ]
            },
            {
                ueberschrift: "Schlafen und schwimmen",
                bild: "Faultier schwimmt",
                bildtext: "Faultiere können gut schwimmen.",
                text: [
                    "Früher dachte man:",
                    "Faultiere schlafen",
                    "fast den ganzen Tag.",
                    "Forscher haben",
                    "wilde Faultiere beobachtet.",
                    "Sie schlafen nur",
                    "acht bis zehn Stunden am Tag.",
                    "",
                    "Faultiere können",
                    "gut schwimmen.",
                    "Dabei paddeln sie",
                    "mit den Armen."
                ],
                sprechblase: { wer: "Lina", text: "Es schwimmt ja! Toll!" }
            },
            {
                ueberschrift: "Ein Kopf, der sich weit dreht",
                bild: "Faultier",
                bildtext: "Das Faultier kann den Kopf sehr weit drehen.",
                hastDuGewusst: [
                    "… dass ein Faultier",
                    "seinen Kopf",
                    "sehr weit drehen kann?",
                    "Viel weiter als du!",
                    "Dafür hat es",
                    "extra Knochen im Hals."
                ]
            }
        ],
        lesequiz: [
            { frage: "Wie hängt das Faultier am Ast?", antworten: ["kopfüber", "auf einem Bein", "gar nicht"] },
            { frage: "Was wächst im Fell?", antworten: ["winzige Algen", "Blumen", "kleine Bäume"] },
            { frage: "Wie oft klettert es nach unten?", antworten: ["ungefähr einmal in der Woche", "jede Stunde", "nie"] },
            { frage: "Was frisst es vor allem?", antworten: ["Blätter", "Fische", "Nüsse"] }
        ]
    },

    // ---------------------------------------------------------------- Kanada
    {
        id: "biber",
        titel: "Der Biber",
        land: "Kanada",
        bild: "Biber",
        seiten: [
            {
                ueberschrift: "Der Baumeister am Wasser",
                bild: "Biber",
                bildtext: "Der Biber hat einen flachen Schwanz.",
                text: [
                    "Biber leben am Wasser.",
                    "Es gibt sie in Kanada",
                    "und auch in Deutschland.",
                    "",
                    "Der Biber ist ein Nagetier,",
                    "so wie die Maus.",
                    "Aber er ist viel größer.",
                    "Er ist das zweitgrößte",
                    "Nagetier der Welt.",
                    "Ein Biber wird",
                    "bis zu 30 Kilo schwer."
                ],
                sprechblase: { wer: "Lina", text: "Guten Tag, Herr Biber!" }
            },
            {
                ueberschrift: "Zähne wie Werkzeuge",
                bild: "Biberzähne",
                bildtext: "Mit den Zähnen nagt der Biber Holz.",
                text: [
                    "Die Zähne des Bibers",
                    "sind orange.",
                    "Darin steckt Eisen.",
                    "Das macht sie besonders hart.",
                    "",
                    "Damit nagt der Biber Holz.",
                    "Er fällt sogar",
                    "dicke Bäume."
                ],
                sprechblase: { wer: "Ben", text: "Achtung, Baum fällt!" }
            },
            {
                ueberschrift: "Ein Damm im Fluss",
                bild: "Damm",
                bildtext: "Der Damm staut das Wasser.",
                text: [
                    "Der Biber baut einen Damm.",
                    "Der Damm staut das Wasser.",
                    "So entsteht ein Teich.",
                    "Ein Damm kann bis zu",
                    "100 Meter lang werden.",
                    "",
                    "Viele andere Tiere",
                    "finden dort ein Zuhause."
                ]
            },
            {
                ueberschrift: "Die Biberburg",
                bild: "Biberburg",
                bildtext: "Der Eingang der Burg liegt unter Wasser.",
                text: [
                    "Der Biber wohnt in einer Burg.",
                    "Sie ist aus Ästen,",
                    "Zweigen und Schlamm.",
                    "Der Eingang liegt",
                    "unter Wasser.",
                    "So kommen Feinde",
                    "nicht hinein.",
                    "",
                    "Innen ist es trocken.",
                    "Dort schläft",
                    "die Biberfamilie."
                ],
                sprechblase: { wer: "Lina", text: "Eine Burg mit Geheimgang!" }
            },
            {
                ueberschrift: "Im Wasser zu Hause",
                bild: "Biber schwimmt",
                bildtext: "Der Schwanz ist Motor und Ruder zugleich.",
                text: [
                    "Der Biber schwimmt sehr gut.",
                    "An den Hinterpfoten",
                    "hat er Schwimmhäute.",
                    "Sein flacher Schwanz",
                    "ist Motor und Ruder zugleich.",
                    "",
                    "Unter Wasser hält er",
                    "bis zu 15 Minuten",
                    "die Luft an.",
                    "Sein dichtes Fell",
                    "lässt kein Wasser durch."
                ],
                sprechblase: { wer: "Kiko", text: "Ich bleibe lieber trocken!" }
            },
            {
                ueberschrift: "Familie Biber",
                bild: "Biberfamilie",
                bildtext: "Die Jungen bleiben zwei Jahre bei den Eltern.",
                text: [
                    "Biber fressen nur Pflanzen.",
                    "Im Winter fressen sie",
                    "vor allem Rinde.",
                    "",
                    "Bibereltern bleiben",
                    "ein Leben lang zusammen.",
                    "Die Jungen wohnen",
                    "zwei Jahre bei den Eltern.",
                    "Meistens bekommen sie",
                    "zwei oder drei Junge."
                ],
                hastDuGewusst: [
                    "… dass der längste Biberdamm",
                    "850 Meter lang ist?",
                    "Er steht in Kanada.",
                    "Er wurde 2007 entdeckt."
                ]
            }
        ],
        lesequiz: [
            { frage: "Welche Farbe haben die Zähne des Bibers?", antworten: ["orange", "blau", "grün"] },
            { frage: "Wo liegt der Eingang der Burg?", antworten: ["unter Wasser", "auf dem Dach", "im Baum"] },
            { frage: "Was macht der Damm?", antworten: ["Er staut das Wasser.", "Er macht Wind.", "Er wärmt das Wasser."] },
            { frage: "Was fressen Biber?", antworten: ["nur Pflanzen", "Fische", "Mäuse"] }
        ]
    },

    // ---------------------------------------------------------------- Grönland
    {
        id: "eisbaer",
        titel: "Der Eisbär",
        land: "Grönland",
        bild: "Eisbär",
        seiten: [
            {
                ueberschrift: "Der Bär vom Nordpol",
                bild: "Eisbär",
                bildtext: "Der Eisbär lebt auf dem Eis.",
                text: [
                    "Der Eisbär lebt in der Arktis.",
                    "Das ist das Gebiet",
                    "rund um den Nordpol.",
                    "Dort gibt es",
                    "viel Eis und Schnee.",
                    "",
                    "Der Eisbär gehört zu den",
                    "größten Bären der Welt.",
                    "Ein Männchen wiegt",
                    "400 bis 600 Kilo."
                ],
                sprechblase: { wer: "Ben", text: "Hallo, großer Bär!" }
            },
            {
                ueberschrift: "Warm eingepackt",
                bild: "Eisbärfell",
                bildtext: "Unter dem Fell ist die Haut schwarz.",
                text: [
                    "Das Fell sieht weiß aus.",
                    "Die Haare sind aber",
                    "durchsichtig und innen hohl.",
                    "Die Haut darunter ist schwarz.",
                    "",
                    "Unter der Haut liegt",
                    "eine dicke Schicht Fett.",
                    "Sie ist bis zu",
                    "zehn Zentimeter dick.",
                    "So friert der Eisbär nicht."
                ],
                sprechblase: { wer: "Kiko", text: "Ich brauche einen Schal!" }
            },
            {
                ueberschrift: "Warten am Eisloch",
                bild: "Eisloch",
                bildtext: "Der Eisbär wartet auf eine Robbe.",
                text: [
                    "Eisbären fressen",
                    "vor allem Robben.",
                    "Robben müssen",
                    "zum Atmen auftauchen.",
                    "",
                    "Der Eisbär wartet",
                    "an einem Loch im Eis.",
                    "Manchmal wartet er stundenlang.",
                    "Taucht eine Robbe auf,",
                    "packt er zu.",
                    "Eine Robbe riecht er",
                    "schon von weitem."
                ]
            },
            {
                ueberschrift: "Große Tatzen",
                bild: "Eisbär schwimmt",
                bildtext: "Der Eisbär ist ein guter Schwimmer.",
                text: [
                    "Die Tatzen sind bis zu",
                    "30 Zentimeter groß.",
                    "Damit sinkt der Eisbär",
                    "im Schnee nicht ein.",
                    "",
                    "Zwischen den Zehen",
                    "hat er Schwimmhäute.",
                    "Er ist ein guter Schwimmer.",
                    "Beim Schwimmen paddelt er",
                    "mit den Vorderbeinen."
                ],
                sprechblase: { wer: "Lina", text: "Wie schnell er schwimmt!" }
            },
            {
                ueberschrift: "Geboren im Schnee",
                bild: "Schneehöhle",
                bildtext: "Die Jungen kommen in einer Schneehöhle zur Welt.",
                text: [
                    "Im Winter gräbt die Mutter",
                    "eine Höhle in den Schnee.",
                    "Dort kommen",
                    "die Jungen zur Welt.",
                    "Meistens sind es zwei.",
                    "",
                    "Sie sind blind und taub",
                    "und leichter als ein Kilo.",
                    "Im Frühling verlassen sie",
                    "die Höhle."
                ]
            },
            {
                ueberschrift: "Das Eis schmilzt",
                bild: "Schmelzendes Eis",
                bildtext: "Eisbären brauchen das Eis für die Jagd.",
                hastDuGewusst: [
                    "… dass das Eis",
                    "in der Arktis schmilzt?",
                    "Die Erde wird wärmer.",
                    "Eisbären brauchen das Eis",
                    "für die Jagd.",
                    "Ohne Eis finden sie",
                    "zu wenig Futter."
                ],
                sprechblase: { wer: "Ben", text: "Wir müssen das Eis schützen!" }
            }
        ],
        lesequiz: [
            { frage: "Welche Farbe hat die Haut des Eisbären?", antworten: ["schwarz", "weiß", "rosa"] },
            { frage: "Was fressen Eisbären vor allem?", antworten: ["Robben", "Gras", "Bambus"] },
            { frage: "Wo kommen die Jungen zur Welt?", antworten: ["in einer Höhle im Schnee", "auf einem Baum", "im Wasser"] },
            { frage: "Wozu sind die großen Tatzen gut?", antworten: ["Der Eisbär sinkt im Schnee nicht ein.", "Er kann damit fliegen.", "Er klatscht damit."] }
        ]
    },

    // Neue Kapitel hier einfügen

];
