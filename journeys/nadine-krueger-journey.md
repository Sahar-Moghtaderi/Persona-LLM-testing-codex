# User Journey: Exception-Fall analysieren und abschließen

## Metadaten
- **Persona:** Nadine Krüger (nadine-krueger-persona.md)
- **Ziel der Journey:** Einen abgelehnten REMADV-Fall aus der Fallliste auswählen, per KI analysieren lassen, die Erklärung und den Prüfpfad verstehen und den Fall als geprüft abschließen
- **Startseite:** http://localhost:5173
- **Datum:** 2026-08-28
- **Erstellt von:** Sahar

## Vorbedingungen
- [ ] Lokaler Dev-Server läuft auf http://localhost:5173 (Frontend) und http://localhost:8000 (API)
- [ ] Mindestens ein importierter/simulierter Fall ist in der Liste "Offene Fälle" vorhanden (z. B. "Fall 1: Erste negative REMADV zur Netznutzungsrechnung")
- [ ] Kein Login nötig

## Schritte der Journey

### Schritt 1: Übersicht aufrufen
- **Aktion:** Navigiere zu http://localhost:5173
- **Erwartetes Ergebnis:** Die Seite "MaKo Exception Assistant" lädt, die Fallliste ("Importierte Fälle") und der leere Analysebereich sind sichtbar
- **Worauf achten:** Ist auf den ersten Blick erkennbar, wofür das Tool da ist und wo man anfängt?

### Schritt 2: Einen offenen Fall auswählen
- **Aktion:** Klicke in der Liste "Offene Fälle" auf "Fall 1: Erste negative REMADV zur Netznutzungsrechnung"
- **Erwartetes Ergebnis:** Die EDIFACT-Nachricht des Falls wird in das Feld "Eingegangene EDIFACT-Nachricht" geladen
- **Worauf achten:** Ist erkennbar, dass der Fall erfolgreich geladen wurde? Gibt es eine visuelle Bestätigung (Hervorhebung, aktiver Zustand)?

### Schritt 3: Fall analysieren
- **Aktion:** Klicke auf "Analysieren"
- **Erwartetes Ergebnis:** Status wechselt zu "Prüft" und nach Abschluss zu einem Ergebnis-Status; "EBD Einträge", "KI Erklärung" und "Letzte Analyse" werden befüllt
- **Worauf achten:** Wie lange dauert die Analyse? Gibt es eine Ladeanzeige, damit Nadine weiß, dass etwas passiert (wichtig, da sie zwischen Aufgaben wechselt)?

### Schritt 4: Analyseergebnis prüfen (EBD-Treffer & Fachliche Ansicht)
- **Aktion:** Lies den Abschnitt "Gefundene EBD Einträge" und "Fachliche Ansicht"
- **Erwartetes Ergebnis:** Fehlercode, betroffene Rolle, Prüfschritt und eine verständliche Kurzbeschreibung sind sichtbar
- **Worauf achten:** Sind Fachbegriffe (z. B. "Cluster: Ablehnung auf Kopfebene") für eine Sachbearbeiterin ohne EDI-Hintergrund verständlich, oder bräuchte es eine Erklärung/Tooltip?

### Schritt 5: KI-Erklärung lesen
- **Aktion:** Lies den Abschnitt "KI Erklärung" vollständig (Business Meaning, Business Impact, Mögliche Ursachen, Manuelle Prüfungen, Manuelle Schritte)
- **Erwartetes Ergebnis:** Nadine versteht, warum die Rechnung abgelehnt wurde und welche Ursachen infrage kommen
- **Worauf achten:** Wirkt die Erklärung vertrauenswürdig? Ist die Quelle (Seite/PDF-Index) sichtbar, falls sie gegenprüfen möchte?

### Schritt 6: Prüfpfad (Entscheidungsbaum) nachvollziehen
- **Aktion:** Scrolle durch den Abschnitt "Prüfpfad (Entscheidungsbaum)" bis zum markierten Fehlerpunkt
- **Erwartetes Ergebnis:** Der genaue Prüfschritt, an dem die Prüfung fehlgeschlagen ist, ist optisch klar hervorgehoben (z. B. ×-Symbol)
- **Worauf achten:** Muss Nadine wirklich alle ~27 Schritte lesen, um den Fehlerpunkt zu finden, oder springt das Auge direkt dorthin? Ist die Ergebnis-Legende (✓/×/○) selbsterklärend?

### Schritt 7: Manuelle Schritte bewerten
- **Aktion:** Lies die Liste "Manuelle Schritte" am Ende der KI-Erklärung
- **Erwartetes Ergebnis:** Eine nummerierte, konkrete Handlungsanleitung ist vorhanden
- **Worauf achten:** Könnte Nadine direkt danach handeln, oder sind die Schritte zu abstrakt/generisch?

### Schritt 8: Fall als geprüft markieren (Abschluss)
- **Aktion:** Klicke auf "Als geprüft markieren"
- **Erwartetes Ergebnis:** Der Fall wechselt sichtbar in den Status "geprüft", eine Bestätigung ist erkennbar
- **Worauf achten:** Ist eindeutig, dass der Fall jetzt abgeschlossen ist? Verschwindet er korrekt aus "Offene Fälle" bzw. taucht er unter "Geprüfte Fälle" auf?

## Testfälle / Edge Cases
- Was passiert, wenn "Analysieren" ohne ausgewählten Fall oder mit leerem EDIFACT-Feld geklickt wird?
- Was passiert bei einem Fall, zu dem kein EBD-Eintrag gefunden wird (0 Treffer)?
- Funktioniert das manuelle Einfügen einer eigenen EDIFACT-Nachricht (statt einen simulierten Fall zu wählen) genauso zuverlässig?
- Was passiert, wenn während einer laufenden Analyse ein anderer Fall angeklickt wird?

## Erfolgskriterien
Die Journey gilt als erfolgreich, wenn:
- [ ] Nadine ohne Einführung von der Fallliste zu einem vollständigen Analyseergebnis gelangt
- [ ] Sie die Ablehnungsursache in eigenen Worten wiedergeben könnte
- [ ] Sie mindestens einen konkreten nächsten Schritt aus der KI-Erklärung benennen könnte
- [ ] Der Abschluss ("Als geprüft markieren") eindeutig und ohne Zweifel erkennbar ist
- [ ] Keine kritischen Fehler oder unverständlichen Fehlermeldungen aufgetreten sind
