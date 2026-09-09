# Testreport: Samira Fuchs - 2026-09-08 (Lauf 2)

## Zusammenfassung
- **Getestete Journey:** user-journey-gypt-p5
- **URL:** https://break-smart-59600761.figma.site
- **Datum:** 2026-09-08
- **Persona:** Samira Fuchs
- **Ergebnis:** ✅ Bestanden
- **Dauer:** 9m 39s
- **Playwright-/Browser-Aktionen:** 64 (interaktive Testdurchführung) + 21 (Absicherungs-Skript für Screenshots) = 85

> **Hinweis zur Durchführung:** Dieser Lauf wurde in Claude Code über das integrierte Browser-Tool ausgeführt (kein Playwright-MCP in diesem Modus, siehe `CLAUDE.md`). Da dieses Tool Screenshots nicht direkt auf die Festplatte schreibt, wurden die im Report verlinkten Screenshots im Anschluss an die interaktive, persona-geleitete Durchführung 1:1 über ein kleines Begleitskript (`run-samira-gypt-p5-journey.mjs`, analog zu `run-nadine-journey.mjs`) reproduziert und gespeichert. Die dabei erzeugten Antworten wurden gegen die live beobachteten Antworten geprüft und stimmen überein. Dies ist bereits der zweite Durchlauf dieser Persona/Journey-Kombination am selben Tag (erster Lauf: `report-samira-fuchs-gypt-p5-2026-09-08.md`); die URL und das Prototyp-Passwort wurden für diesen Lauf direkt vom Auftraggeber im Chat bereitgestellt, nicht aus `.env` gelesen.

## Gesamteindruck aus Sicht der Persona
> Samira orientiert sich auch in diesem zweiten Durchlauf sofort am freien Prompt-Feld und startet alle Aufgaben ohne Umweg über Tasks oder Quellenauswahl – außer dort, wo ein Task-Einstieg fachlich naheliegt. Für die einfache Produktfrage und die fachübergreifende XRechnungs-Frage vertraut sie der automatischen Wissensauswahl vollständig; bei den internen Kommunikationsvorgaben beschreibt sie ihren Bedarf bewusst im Prompt, weil sie es aus ihrem Buchhaltungsalltag gewohnt ist, Kontext explizit mitzugeben, statt sich auf Automatik zu verlassen. Der Task "Fehlermeldung analysieren" wird von ihr sofort als passender Einstieg für den ERIF-Fehler erkannt und positiv bewertet. Etwas irritiert reagiert Samira darauf, dass sich der Detailbereich unter "Verwendetes Wissen" ("1 Quellen ansehen", Chevron) beim Anklicken nicht sichtbar öffnet – als revisionssicher denkende Buchhalterin hätte sie hier gerne nachvollzogen, welches konkrete Dokument die Antwort stützt. In der Gesamtschau bestätigt dieser Lauf das Bild aus dem ersten Durchlauf: Das Konzept funktioniert für Samira gut, mit denselben leichten Abzügen bei der Konkretheit interner Antworten und der offenen P/5-Dokumentationslücke zu XRechnung.

## Gefundene Probleme

### Problem 1: Interne Vorgaben bleiben recht allgemein
- **Schweregrad:** Gering
- **Schritt:** Aufgabe 2
- **Erwartet:** Samira erwartet bei internen Kommunikationsvorgaben möglichst konkrete Handlungsschritte, Textbausteine oder einen klaren Verweis auf die relevante interne Arbeitsanweisung.
- **Tatsächlich:** GY:PT routet korrekt auf "Eigene Wissensquellen" und liefert eine plausible Antwort, bleibt aber bei Begründung, Änderung und weiteren Kundenschritten auf einer allgemeinen Ebene.
- **Reaktion der Persona:** Samira könnte mit der Antwort starten, würde für eine revisionssichere, einheitliche Kundenkommunikation aber noch gezielt nach konkreten Formulierungen oder der zugrunde liegenden Arbeitsanweisung fragen.
- **Screenshot:** ![](../screenshots/samira-fuchs-gypt-p5-aufgabe-2-antwort-lauf2.png)

### Problem 2: P/5-Ablauf für XRechnung nicht konkret verfügbar
- **Schweregrad:** Gering
- **Schritt:** Aufgabe 4
- **Erwartet:** Samira erwartet neben den regulatorischen Anforderungen auch konkrete P/5-Bedienschritte zur Erstellung einer XRechnung.
- **Tatsächlich:** GY:PT kombiniert P/5 und Regulatorik korrekt, benennt aber offen, dass die verfügbaren P/5-Unterlagen keine eindeutige Schritt-für-Schritt-Anleitung enthalten.
- **Reaktion der Persona:** Samira schätzt die ehrliche Lückenbenennung, müsste für die operative Umsetzung aber zusätzliche Dokumentation oder Support heranziehen.
- **Screenshot:** ![](../screenshots/samira-fuchs-gypt-p5-aufgabe-4-antwort-lauf2.png)

### Problem 3: Quellenverweise unter "Verwendetes Wissen" lassen sich nicht aufrufen
- **Schweregrad:** Gering
- **Schritt:** Aufgabe 2 (auch bei Aufgabe 1 und 4 beobachtet)
- **Erwartet:** Samira erwartet, dass sie über "X Quellen ansehen" bzw. den Chevron neben "Verwendetes Wissen" das konkrete Quelldokument einsehen kann, um die Antwort im Zweifel zu belegen.
- **Tatsächlich:** Ein Klick auf "1 Quellen ansehen" (Aufgabe 2) sowie auf die "Verwendetes Wissen"-Zeile selbst (Aufgabe 1) löst im aktuellen Prototypstand keine sichtbare Reaktion aus; es öffnet sich keine Detailansicht.
- **Reaktion der Persona:** Für Samira, der Nachvollziehbarkeit und Revisionssicherheit wichtig sind, ist das ein kleiner Vertrauensdämpfer – sie sieht zwar, *dass* und *wie viele* Quellen verwendet wurden, aber nicht *welche* konkret.
- **Screenshot:** ![](../screenshots/samira-fuchs-gypt-p5-aufgabe-2-antwort-lauf2.png)

## Durchgeführte Schritte

| Schritt | Beschreibung | Status | Anmerkung |
|---------|-------------|--------|-----------|
| Aufgabe 1 | Eingangsrechnung in P/5 finden; freie Frage "Wo finde ich eingegangene Rechnungen in P/5?" | ✅ | Antwort nennt "Übersicht Eingangsrechnungen (CE9I)" und die Filter Verarbeitungsstatus, Kreditor, Belegdatum, Fälligkeit, Rechnungsbetrag |
| Aufgabe 2 | Interne Vorgaben zur Kundenkommunikation; freie Frage mit explizitem Kontext ("interne Vorgaben", "Kundenkommunikation") | ✅ | Automatisches Routing auf "Eigene Wissensquellen"; Antwort brauchbar, aber allgemein; Quellen-Detail nicht aufrufbar |
| Aufgabe 3 | Fehlercode ERIF; Einstieg über Task "Fehlermeldung analysieren", danach Eingabe "ERIF" | ✅ | Task fragt gezielt nach Fehlercode/-text; Antwort erklärt ERIF, zulässige Funktionen O, C, R, W, Korrekturhinweis und Diagnosehandbuch-Verweis |
| Aufgabe 4 | XRechnung für öffentlichen Auftraggeber; freie fachübergreifende Frage | ✅ | Automatisches Routing kombiniert P/5 und Regulatorik; P/5-Dokumentationslücke wird offen benannt |

## Beobachtungsschema

| Aufgabe | Erste Handlung | Einstieg | Begründung / Zitat | Irritationen | Interpretation |
|---|---|---|---|---|---|
| 1 | Sofortige direkte Eingabe ins Prompt-Feld, kein Blick auf Tasks oder `+` | Prompt | "Das ist eine reine Ablage-Frage zu P/5 – dafür brauche ich keine Vorauswahl." | Keine | Prompt First funktioniert für einfache P/5-Fragen sofort und ohne Zögern |
| 2 | Direkte Eingabe, diesmal mit explizitem Kontext "interne Vorgaben"/"Kundenkommunikation" | Prompt mit Kontext | "Wenn ich weiß, dass es dafür Vorgaben gibt, schreibe ich das gleich mit rein, dann muss GY:PT nicht raten." | Quellen-Detail ("1 Quellen ansehen") reagiert nicht; Antwort bleibt allgemein | Automatic Routing zu eigenen Wissensquellen passt zum Mental Model, Tiefe der Transparenz überzeugt aber nicht ganz |
| 3 | Klick auf "Fehlermeldung analysieren" auf dem Startbildschirm | Task | "Ein Fehlercode ist ein klarer Diagnosefall, dafür gibt es ja extra einen Task – den nehme ich." | Keine | Task Entry Point liefert bei Diagnosebedarf klar erkennbaren Mehrwert |
| 4 | Direkte Eingabe ohne manuelle Quellenwahl | Prompt | "P/5 und die Anforderungen gehören zusammen; GY:PT soll das selbst kombinieren." | P/5-Schrittfolge fehlt wegen Dokumentationslücke | Multi-Source-Routing ist verständlich und vertrauensbildend, auch im zweiten Durchlauf konsistent |

## Erfolgskriterien

| Kriterium | Erfüllt? | Anmerkung |
|-----------|----------|-----------|
| Die Nutzerin kann ihr fachliches Anliegen ohne Wissen über technische Quellen oder Capabilities beginnen | ✅ | Alle vier Aufgaben wurden ohne technische Routing-Begriffe gestartet |
| Prompt First funktioniert als verständlicher und niedrigschwelliger Default | ✅ | Aufgaben 1, 2 und 4 wurden natürlich über freie Frage gelöst |
| Tasks liefern nur dann zusätzliche Orientierung, wenn sie tatsächlich benötigt wird | ✅ | Der ERIF-Task passte zur Problemsituation und half bei der strukturierten Eingabe |
| `+` wird als optionale Kontrolle verstanden und nicht wie notwendige Konfiguration | ✅ | Samira musste `+`/"Wissensquelle auswählen" in keiner Aufgabe nutzen |
| Organisationsspezifisches Wissen wird automatisch berücksichtigt oder gezielt steuerbar | ✅ | Aufgabe 2 routete zuverlässig auf "Eigene Wissensquellen" |
| GY:PT kann mehrere relevante Wissensräume automatisch kombinieren | ✅ | Aufgabe 4 zeigte "P/5" und "Regulatorik" gemeinsam |
| `Verwendetes Wissen` ist verständlich und schafft Nachvollziehbarkeit | ⚠️ | Die Badges (P/5, Regulatorik, Eigene Wissensquellen) sind verständlich; die Drill-down-Links ("Quellen ansehen") reagieren im Prototyp aber nicht – volle Nachvollziehbarkeit bis zum Einzeldokument ist noch nicht möglich |
| Die Nutzerin findet in allen vier Situationen einen nachvollziehbaren Einstieg | ✅ | Unterschiedliche Einstiege (Prompt, Prompt mit Kontext, Task) passten jeweils zur Situation |

## Empfehlungen
- Interne Wissensantworten sollten, sofern vorhanden, konkretere Prozessschritte, Textbausteine oder Dokumentverweise anzeigen statt nur die Art der benötigten Information zu umschreiben.
- Bei bekannten Dokumentationslücken wie XRechnung sollte GY:PT aktiv vorschlagen, welche P/5-Unterlage oder welcher Supportweg für die fehlende Schrittfolge benötigt wird.
- Die Detailanzeige unter "Verwendetes Wissen" ("X Quellen ansehen", Chevron, "Wissensbasis ändern") sollte im fertigen Produkt tatsächlich reagieren und die einzelnen Quellen auflisten – für revisionssicher arbeitende Nutzerinnen wie Samira ist dieser Nachweis wichtig, nicht nur die Zahl der Quellen.
- Der Task "Fehlermeldung analysieren" sollte in der Startansicht erhalten bleiben; er liefert bei Diagnosefällen weiterhin erkennbaren Zusatznutzen.
