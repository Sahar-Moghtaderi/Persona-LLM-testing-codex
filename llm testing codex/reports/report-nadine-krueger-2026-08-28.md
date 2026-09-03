# Testreport: Nadine Krüger — 2026-08-28

## Zusammenfassung
- **Getestete Journey:** Exception-Fall analysieren und abschließen
- **URL:** http://localhost:5173 (lokaler Dev-Server, MaKo Exception Assistant)
- **Datum:** 2026-08-28
- **Persona:** Nadine Krüger (38, Sachbearbeiterin Marktkommunikation, Verteilnetzbetreiber, mittlere technische Affinität)
- **Ergebnis:** ⚠️ Mit Problemen
- **Dauer:** 0m 18s
- **Playwright-Aktionen:** 15
- **Hinweis zur Methodik:** Dieser Lauf wurde über ein Playwright-Skript (`run-nadine-journey.mjs <Fallnummer>`) ausgeführt statt interaktiv über Claude Code + Playwright MCP, da für diese Demo kein Zugriff auf einen `claude`-Prozess bestand. Auswahl, Klicks und Auswertung folgen exakt den Schritten der Journey-Datei; die fachliche Bewertung (Persona-Reaktion, Screenshots, Befunde) wurde danach anhand der aufgezeichneten Screenshots vorgenommen. Getestet wurde mit drei verschiedenen Fällen (Fall 1, Fall 2 und Fall 3 — zwei REMADV-Fälle und ein UTILMD-Fall), um den zentralen Befund gegenzuprüfen — die Screenshots im Hauptteil dieses Reports stammen aus dem Lauf mit Fall 2, der Zusatzlauf mit Fall 3 ist am Ende dokumentiert.

## Gesamteindruck aus Sicht der Persona
> Als Nadine bin ich positiv überrascht, wie schnell ich von der Fallliste zu einer vollständigen, fachlich fundierten Erklärung komme — die Quelle mit Seiten-/PDF-Index anzugeben, gibt mir genau die Absicherung, die ich brauche, um der KI zu vertrauen. Der Prüfpfad zeigt mir auf einen Blick, an welchem Schritt es hakt, ohne dass ich mich durch alle 27 Prüfschritte klicken muss. Was mich aber wirklich verunsichert: Direkt unter der Analyse, im prominentesten Kasten mit dem Sparkle-Icon "KI Erklärung", sehe ich rohen, unformatierten Text mit sichtbaren Platzhaltern wie "Konkreter Prüfschritt 1" und "Fehlende Information 1". Beim ersten Fall dachte ich, das Tool wäre kaputt — erst als ich weiter runterscrolle, finde ich unter "Details zum aktuellen Fehlerpunkt" dieselbe Erklärung sauber und vollständig aufbereitet. Für eine Kollegin, die unter Zeitdruck zehn Fälle am Tag abarbeitet, ist dieser erste Eindruck ein Vertrauensbruch, auch wenn die eigentliche Information am Ende da ist.

## Gefundene Probleme

### Problem 1: "KI Erklärung"-Kachel zeigt rohen Template-Text statt formatierter Erklärung
- **Schweregrad:** Kritisch
- **Schritt:** Schritt 5
- **Erwartet:** Die Kachel "KI Erklärung" (oberer Bereich, mit Sparkle-Icon, direkt nach der Analyse als "Verfügbar" markiert) zeigt eine lesbare, fachlich formulierte Erklärung — analog zur sauber aufbereiteten Version weiter unten.
- **Tatsächlich:** Reproduzierbar bei **allen drei** getesteten Fällen (Fall 1, Fall 2, Fall 3 — inkl. eines UTILMD-Falls mit komplett anderem EBD-Baum E_0622/Fehlercode A06) zeigt dieselbe Kachel unformatierten Rohtext: Bei Fall 1 sogar teilweise als rohes JSON-Objekt inkl. escaped `\n`-Zeichen und unaufgelöster Markdown-Syntax (`## Was ist passiert?`); bei Fall 2 und Fall 3 als Fließtext mit sichtbar unausgefüllten Platzhaltern wie "Konkreter Prüfschritt 1", "Konkreter Prüfschritt 2", "Fehlende Information 1", "Fehlende Information 2" sowie einer wörtlich mitgerenderten Prompt-Anweisung ("Kurze, konkrete Beschreibung des Vorgangs. Nenne relevante Referenzen oder Rechnungsnummern aus der originalen EDI-Nachricht."). Weiter unten, im Abschnitt "Details zum aktuellen Fehlerpunkt", erscheint inhaltlich dieselbe Erklärung sauber strukturiert (Business Meaning, Business Impact, Mögliche Ursachen, Manuelle Prüfungen, Manuelle Schritte, Produkt Guidance) und vollständig ausformuliert. Die 3/3-Reproduktion über zwei unterschiedliche Nachrichtentypen (REMADV, UTILMD) hinweg deutet auf ein systemisches Rendering-Problem hin, nicht auf einen fallspezifischen Ausreißer.
- **Reaktion der Persona:** Irritiert bis alarmiert. Nadine würde die KI-Kachel für ein zentrales, beworbenes Feature halten (Sparkle-Icon, "Verfügbar"-Status) und beim Anblick von rohem JSON bzw. Platzhaltertext annehmen, das Tool sei fehlerhaft oder ihr Fall nicht sauber verarbeitet worden — obwohl die korrekte Antwort bereits auf derselben Seite existiert. Bei hohem Fallaufkommen besteht das Risiko, dass sie das Tool vorzeitig für unzuverlässig hält.
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-5-ki-erklaerung.png)

### Problem 2: Ergebnis-Abschnitte sind nach der Analyse nicht automatisch aufgeklappt
- **Schweregrad:** Gering
- **Schritt:** Schritt 4–5
- **Erwartet:** Nach erfolgreicher Analyse sind die zentralen Ergebnis-Abschnitte ("Fachliche Ansicht", "KI Erklärung") direkt sichtbar, ohne zusätzlichen Klick.
- **Tatsächlich:** "Erkannte Nachricht", "Fachliche Ansicht" und "KI Erklärung" bleiben nach der Analyse eingeklappt (Akkordeon) und mussten für diesen Test manuell geöffnet werden. Nur "Gefundene EBD Einträge" und "Prüfpfad" waren bereits offen.
- **Reaktion der Persona:** Leicht verunsichert — Nadine könnte den Eindruck bekommen, die Analyse habe außer dem EBD-Treffer nichts weiter ergeben, und die KI-Erklärung übersehen, wenn sie den Klick auf die eingeklappte Kachel nicht von selbst macht.
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-3-analyse-ergebnis.png)

## Durchgeführte Schritte

| Schritt | Beschreibung | Status | Anmerkung |
|---------|-------------|--------|-----------|
| 1 | Übersicht aufrufen | ✅ | Zweck des Tools ("MaKo Exception Assistant") und Einstiegspunkt (Fallliste links) sofort erkennbar |
| 2 | Offenen Fall auswählen (Fall 2) | ✅ | Klick auf Fallkarte markiert diese sichtbar (orange); EDIFACT-Feld wird korrekt befüllt |
| 3 | Fall analysieren | ✅ | Analyse lief in wenigen Sekunden durch, Status wechselt sichtbar auf "Analysiert" |
| 4 | EBD-Treffer & Fachliche Ansicht prüfen | ⚠️ | Inhalte korrekt (Code A09, EBD E_0407, Rolle LF), Abschnitt war aber zunächst eingeklappt (Problem 2) |
| 5 | KI-Erklärung lesen | ❌ | Obere Kachel zeigt rohen Platzhalter-/Template-Text (Problem 1); vollständige Erklärung erst weiter unten |
| 6 | Prüfpfad (Entscheidungsbaum) nachvollziehen | ✅ | Fehlerhafter Prüfschritt 26 optisch klar rot hervorgehoben, Legende (✓/×/○) selbsterklärend |
| 7 | Manuelle Schritte bewerten | ✅ | 5 konkrete, nummerierte Schritte im unteren Abschnitt — direkt umsetzbar |
| 8 | Fall als geprüft markieren | ✅ | Klick erfolgreich, Seite bestätigt Statuswechsel zu "geprüft" |

## Erfolgskriterien

| Kriterium | Erfüllt? | Anmerkung |
|-----------|----------|-----------|
| Nadine gelangt ohne Einführung von der Fallliste zu einem vollständigen Analyseergebnis | ✅ | Zwei Klicks (Fall wählen, Analysieren) genügen |
| Sie könnte die Ablehnungsursache in eigenen Worten wiedergeben | ✅ | Über den unteren "Details"-Abschnitt sehr gut möglich |
| Sie könnte mindestens einen konkreten nächsten Schritt benennen | ✅ | "Manuelle Schritte" sind nummeriert und konkret |
| Der Abschluss ("Als geprüft markieren") ist eindeutig erkennbar | ✅ | Klick funktioniert, Status ändert sich nachweislich |
| Keine kritischen Fehler oder unverständlichen Ausgaben | ❌ | Rohtext/Platzhalter in der KI-Erklärung-Kachel (Problem 1) |

## Zusatzlauf: Fall 3 (UTILMD, andere Fehlerart)

Um Problem 1 gegenzuprüfen, wurde dieselbe Journey zusätzlich mit **Fall 3: Ablehnung einer Lieferbeginn-Anmeldung wegen laufender Anmeldung** (NB-UTILMD-2026-1001) durchgeführt — bewusst ein UTILMD-Fall mit anderem EBD-Baum (E_0622, Fehlercode A06 „Andere Anmeldung in Bearbeitung“, Prüfschritt 70 statt 26), um auszuschließen, dass Problem 1 nur bei REMADV/A09 auftritt.

| Prüfpunkt | Ergebnis |
|---|---|
| Fall auswählen & analysieren | ✅ Funktioniert wie bei Fall 1/2, Analyse in ~5s durch |
| Prüfpfad passt sich korrekt an anderen EBD-Baum an | ✅ Zeigt korrekt Schritte 15 → 18 → 70 (statt 1…26) mit demselben ✓/✓/× -Muster |
| "Fachliche Ansicht" | ✅ Positiv: bei diesem UTILMD-Fall mit echten Feldnamen beschriftet (z. B. "MP-ID Absender", "Vorgangs-Identifikation") statt nur Rohcodes wie bei den REMADV-Fällen — deutet auf unterschiedlichen Reifegrad der Parser je Nachrichtentyp hin, nicht direkt Teil von Problem 1 |
| Problem 1 ("KI Erklärung"-Kachel zeigt Platzhalter/Rohtext) | ❌ Reproduziert 1:1 — dieselben Platzhalter "Konkreter Prüfschritt 1/2", "Fehlende Information 1/2" |
| "Als geprüft markieren" | ✅ Funktioniert wie erwartet |

**Fazit Zusatzlauf:** Problem 1 ist damit auf 3 von 3 getesteten Fällen und zwei verschiedenen Nachrichtentypen reproduziert — hohe Wahrscheinlichkeit, dass die Ursache in einer gemeinsamen Rendering-Komponente der "KI Erklärung"-Kachel liegt und nicht in einzelnen Falldaten.

- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-5-ki-erklaerung.png)

## Empfehlungen
- **Priorität 1 — Rendering der "KI Erklärung"-Kachel fixen:** Vermutlich wird an dieser Stelle die rohe LLM-Antwort (teils sogar unparster JSON-String) direkt ausgegeben, statt sie wie im Abschnitt "Details zum aktuellen Fehlerpunkt" zu parsen/formatieren. Da beide Stellen offenbar dieselbe zugrunde liegende Information zeigen sollen, könnte auch geprüft werden, ob die obere Kachel überhaupt einen eigenständigen Zweck erfüllt oder redundant ist.
- **Platzhalter-Leaks vermeiden:** Prompt-Anweisungen ("Kurze, konkrete Beschreibung...") und unausgefüllte Platzhalter ("Konkreter Prüfschritt 1") dürfen nie im UI landen — deutet auf ein Prompt-Template hin, das nicht zuverlässig durch echte Inhalte ersetzt wird.
- **Ergebnis-Abschnitte nach Analyse automatisch aufklappen:** Mindestens "KI Erklärung" sollte direkt sichtbar sein, da es laut UI das zentrale Feature ist.
- **Fachliche Ansicht bei REMADV nachziehen:** Feldbeschriftung wie bei UTILMD (Fall 3) einführen, damit Sachbearbeiter nicht nur Rohcodes wie "UNA", "UNB" sehen.
- **Erledigt:** Gegenprüfung mit einem dritten, strukturell anderen Fall (Fall 3, UTILMD) wurde durchgeführt — Problem 1 bestätigt sich als systemisch. Optional könnte Fall 4 (BEW Netze / Reverse Charge) für eine vierte Datenpunkt-Absicherung ergänzt werden.
