# Testreport: Alexander Reuter - 2026-09-09

## Zusammenfassung
- **Getestete Journey:** user-journey-gypt-p5
- **URL:** https://break-smart-59600761.figma.site
- **Datum:** 2026-09-09
- **Persona:** Alexander Reuter
- **Ergebnis:** ✅ Bestanden
- **Dauer:** 2m 13s (reine Testdurchführung ab erfolgreichem Login)
- **Playwright-/Browser-Aktionen:** 40 (interaktive Testdurchführung) + 21 (Absicherungs-Skript für Screenshots) = 61

> **Hinweis zur Durchführung:** Wie beim vorherigen Samira-Fuchs-Lauf wurde dieser Test in Claude Code über das integrierte Browser-Tool ausgeführt und die Screenshots zusätzlich per Begleitskript (`run-alexander-gypt-p5-journey.mjs`) gesichert, da das interaktive Tool keine Dateien direkt auf die Festplatte schreibt. **Zusätzliche Beobachtung in diesem Lauf:** Der Passwortschutz des Figma-Prototyps hat das zuerst korrekt eingegebene Passwort mehrfach als ungültig zurückgewiesen (auch nach vollständigem Neuladen der Seite und Byte-für-Byte-Verifikation des Feldinhalts per JavaScript) und erst nach einer längeren Wartezeit wieder funktioniert – ein Indiz für ein serverseitiges Rate-Limit/temporäres Lockout nach mehreren fehlgeschlagenen Versuchen (u. a. aus dem vorherigen Lauf). Das ist keine Auffälligkeit an GY:PT selbst, sondern am Figma-Sites-Passwortschutz des Prototyp-Hostings – für künftige Läufe: nach 1–2 Fehlversuchen nicht sofort erneut probieren, sondern einige Minuten warten.

## Gesamteindruck aus Sicht der Persona
> Alexander bewegt sich zielstrebig durch alle vier Situationen und nutzt fast durchgängig den freien Prompt – für ihn als erfahrenen Abteilungsleiter mit Prozessverantwortung ist das der naheliegendste Weg, ohne sich vorher mit Quellen oder Tasks zu beschäftigen. Bei der Fehlermeldung ERIF erkennt er den Task "Fehlermeldung analysieren" sofort als effizienteren Einstieg, weil er eine strukturierte Diagnose einer freien Formulierung vorzieht. Fachlich überzeugt ihn, dass GY:PT bei der XRechnung automatisch P/5- und Regulatorik-Wissen kombiniert – das entspricht seinem Anspruch, dass Digitalisierungs- und Compliance-Themen zusammengedacht werden. Kritisch sieht er weiterhin, dass die Antwort zu internen Kommunikationsvorgaben zu wenig konkret ist, um daraus eine einheitliche Team-Vorgabe abzuleiten, und dass die P/5-Dokumentation für XRechnung selbst eine bekannte Lücke aufweist – aus Sicht eines Abteilungsleiters, der Planungssicherheit und Compliance braucht, sind das die Stellen, an denen er nachhaken müsste, bevor er sich vollständig auf die Antwort verlässt.

## Gefundene Probleme

### Problem 1: Interne Kommunikationsvorgaben bleiben für die Team-Steuerung zu allgemein
- **Schweregrad:** Gering
- **Schritt:** Aufgabe 2
- **Erwartet:** Alexander erwartet konkrete Vorgaben, Formulierungsbausteine oder zumindest einen eindeutigen Verweis auf die zugrunde liegende interne Arbeitsanweisung, damit er die Kundenkommunikation im Team einheitlich und nachvollziehbar anweisen kann.
- **Tatsächlich:** GY:PT routet korrekt auf "Eigene Wissensquellen" und liefert eine plausible, aber allgemein gehaltene Antwort (Grund, Änderung und weitere Schritte sollen erklärt werden; Verweis auf "eure interne Arbeitsanweisung").
- **Reaktion der Persona:** Alexander würde die Antwort als brauchbaren ersten Anhaltspunkt werten, für eine verbindliche Team-Vorgabe aber gezielt nach der konkreten Arbeitsanweisung oder Formulierungshilfen nachfragen.
- **Screenshot:** ![](../screenshots/alexander-reuter-gypt-p5-aufgabe-2-antwort-2026-09-09.png)

### Problem 2: P/5-Bedienschritte für XRechnung fehlen weiterhin
- **Schweregrad:** Mittel
- **Schritt:** Aufgabe 4
- **Erwartet:** Alexander erwartet neben den regulatorischen Eckpunkten auch eine belastbare Aussage, wie der XRechnungs-Prozess konkret in P/5 umgesetzt wird.
- **Tatsächlich:** GY:PT kombiniert P/5 und Regulatorik korrekt und benennt die regulatorischen Anforderungen (EN 16931, ggf. Leitweg-ID, Pflichtangaben), weist aber offen darauf hin, dass die verfügbaren P/5-Unterlagen keine eindeutige Schritt-für-Schritt-Anleitung enthalten.
- **Reaktion der Persona:** Alexander schätzt die transparente Lückenbenennung, bekommt daraus aber keine ausreichende Planungssicherheit für die operative Umsetzung oder die Kommunikation an sein Team.
- **Screenshot:** ![](../screenshots/alexander-reuter-gypt-p5-aufgabe-4-antwort-2026-09-09.png)

## Durchgeführte Schritte

| Schritt | Beschreibung | Status | Anmerkung |
|---------|-------------|--------|-----------|
| Aufgabe 1 | Eingangsrechnung in P/5 finden; freie Frage "Wo finde ich eingegangene Rechnungen in P/5?" | ✅ | Antwort nennt "Übersicht Eingangsrechnungen (CE9I)" und die Filter Verarbeitungsstatus, Kreditor, Belegdatum, Fälligkeit, Rechnungsbetrag |
| Aufgabe 2 | Interne Vorgaben zur Kundenkommunikation; freie Frage mit explizitem Kontext ("interne Vorgaben", "Kundenkommunikation") | ✅ | Automatisches Routing auf "Eigene Wissensquellen"; Antwort plausibel, aber allgemein |
| Aufgabe 3 | Fehlercode ERIF; Einstieg über Task "Fehlermeldung analysieren", danach Eingabe "ERIF" | ✅ | Task fragt gezielt nach Fehlercode/-text; Antwort erklärt ERIF, zulässige Funktionen O, C, R, W, Korrekturhinweis und Diagnosehandbuch-Verweis |
| Aufgabe 4 | XRechnung für öffentlichen Auftraggeber; freie fachübergreifende Frage | ✅ | Automatisches Routing kombiniert P/5 und Regulatorik; P/5-Dokumentationslücke wird offen benannt |

## Beobachtungsschema

| Aufgabe | Erste Handlung | Einstieg | Begründung / Zitat | Irritationen | Interpretation |
|---|---|---|---|---|---|
| 1 | Direkte Eingabe in den Prompt | Prompt | "Das ist eine Produktfrage, die sollte GY:PT direkt beantworten können, dafür brauche ich keine Vorauswahl." | Keine | Prompt First funktioniert für einfache P/5-Fragen sofort |
| 2 | Direkte Eingabe mit explizitem Verweis auf interne Vorgaben | Prompt mit Kontext | "Wenn dafür interne Standards gelten, nenne ich das gleich in der Frage, dann muss GY:PT nicht raten." | Antwort bleibt für eine verbindliche Team-Vorgabe nicht konkret genug | Automatisches Routing passt zum Mental Model, Detailtiefe reicht für Führungszwecke aber nicht ganz |
| 3 | Klick auf "Fehlermeldung analysieren" | Task | "Bei einem Fehlercode ist eine geführte Diagnose effizienter als freies Formulieren." | Keine | Task Entry Point liefert bei Störungen erkennbaren Mehrwert |
| 4 | Direkte Eingabe ohne manuelle Quellenwahl | Prompt | "P/5 und die regulatorischen Anforderungen muss das System selbst zusammenführen können." | P/5-Umsetzung bleibt offen | Multi-Source-Routing stärkt Vertrauen, ersetzt aber keine fehlende P/5-Dokumentation |

## Erfolgskriterien

| Kriterium | Erfüllt? | Anmerkung |
|-----------|----------|-----------|
| Die Nutzerin kann ihr fachliches Anliegen ohne Wissen über technische Quellen oder Capabilities beginnen | ✅ | Alexander konnte alle vier Aufgaben ohne technische Routing-Begriffe starten |
| Prompt First funktioniert als verständlicher und niedrigschwelliger Default | ✅ | Aufgaben 1, 2 und 4 wurden direkt über freie Eingabe bearbeitet |
| Tasks liefern nur dann zusätzliche Orientierung, wenn sie tatsächlich benötigt wird | ✅ | Der Fehleranalyse-Task passte gezielt zur ERIF-Situation |
| `+` wird als optionale Kontrolle verstanden und nicht wie notwendige Konfiguration | ✅ | Keine Aufgabe erforderte manuelle Quellenwahl über `+` |
| Organisationsspezifisches Wissen wird automatisch berücksichtigt oder gezielt steuerbar | ✅ | Aufgabe 2 routete zuverlässig auf "Eigene Wissensquellen" |
| GY:PT kann mehrere relevante Wissensräume automatisch kombinieren | ✅ | Aufgabe 4 zeigte "P/5" und "Regulatorik" gemeinsam |
| `Verwendetes Wissen` ist verständlich und schafft Nachvollziehbarkeit | ✅ | Die Badges waren für Alexander fachlich plausibel und einordbar |
| Die Nutzerin findet in allen vier Situationen einen nachvollziehbaren Einstieg | ✅ | Prompt, Prompt mit Kontext und Task passten jeweils zur Situation |

## Empfehlungen
- Antworten aus internen Wissensquellen sollten konkretere Prozessverweise, Rollen oder Kommunikationsbausteine enthalten, damit Führungskräfte wie Alexander daraus verbindliche Team-Vorgaben ableiten können.
- Bei bekannten Dokumentationslücken wie XRechnung sollte GY:PT aktiv benennen, welche P/5-Unterlage oder welcher Supportweg für die fehlende Schrittfolge zu klären ist, statt es bei der reinen Lückenbenennung zu belassen.
- Für den Passwortschutz des Prototyp-Hostings (Figma Sites) sollte bei künftigen Testläufen eine kurze Wartezeit zwischen Fehlversuchen eingeplant werden, um ein falsches "Bug in GY:PT"-Signal durch ein reines Hosting-Rate-Limit zu vermeiden.
