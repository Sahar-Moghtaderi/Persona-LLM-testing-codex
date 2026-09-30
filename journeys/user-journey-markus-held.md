# User Journey: GY:PT für technischen Betrieb und Administration

## Metadaten
- **Persona:** Markus Held
- **Ziel der Journey:** Beobachten, wie ein technischer Experte GY:PT für Schnittstellenprobleme, Update-Vorbereitung und Berechtigungsfragen nutzt und welchen Einstieg sowie welche Quellen er wählt.
- **Startseite:** GY:PT-Testsystem (URL vor dem Test ergänzen)
- **Datum:** 2026-09-30
- **Erstellt von:** Projektteam GY:PT

## Vorbedingungen
- [ ] Markus ist im GY:PT-Testsystem angemeldet und startet auf der vereinbarten Startseite.
- [ ] Freie Texteingabe, Quellenauswahl und Tasks sind sichtbar und funktionsfähig.
- [ ] Eine fachlich geprüfte Schnittstellenstörung mit anonymisierten technischen Angaben ist hinterlegt.
- [ ] Aktuelle Plattform- und Update-Dokumentation ist als Quelle verfügbar.
- [ ] Ein realistisches Rollen-, Berechtigungs- und Mandantenmodell ist für den Test beschrieben.
- [ ] Veraltete und aktuelle Dokumentstände sind eindeutig gekennzeichnet.
- [ ] Das System wird vor jeder Aufgabe in denselben Ausgangszustand zurückgesetzt.

## Schritte der Journey

### Schritt 1: GY:PT aufrufen und orientieren
- **Aktion:** Öffne das GY:PT-Testsystem. Bearbeite die folgenden Situationen so, wie du es in deinem Arbeitsalltag tun würdest. Es gibt keinen vorgegebenen Lösungsweg.
- **Erwartetes Ergebnis:** Die Startseite lädt vollständig. Freie Texteingabe, Quellenauswahl und Tasks sind erkennbar und zugänglich.
- **Worauf achten:** Erste Einschätzung der angebotenen Einstiege, Suche nach technischer Dokumentation, Erwartungen an Präzision, Aktualität und Nachvollziehbarkeit.

### Schritt 2: Schnittstellenstörung eingrenzen
- **Aktion:** Nach einer Aktualisierung werden Daten aus einem angebundenen System nicht mehr an P/5 übertragen. Im Team ist noch unklar, ob die Ursache bei der Schnittstelle, der Konfiguration oder einer technischen Voraussetzung liegt. Lege die ersten Prüfschritte fest.
- **Erwartetes Ergebnis:** Markus erhält eine technisch nachvollziehbare Struktur für die Diagnose und erkennt, welche zusätzlichen Angaben benötigt werden.
- **Worauf achten:** Detailtiefe der Eingabe, Nennung von Versionen und Logs, Quellenauswahl, Umgang mit Rückfragen und Reaktion auf oberflächliche Empfehlungen.

### Schritt 3: P/5-Aktualisierung vorbereiten
- **Aktion:** Für das kommende Wartungsfenster ist eine Aktualisierung von P/5 geplant. Du möchtest vorab prüfen, welche technischen Voraussetzungen, unterstützten Plattformversionen und Abhängigkeiten berücksichtigt werden müssen.
- **Erwartetes Ergebnis:** Markus findet aktuelle, nachvollziehbare Informationen und kann die notwendigen Vorprüfungen für das Wartungsfenster benennen.
- **Worauf achten:** Prüfung von Quelle, Version und Veröffentlichungsdatum, bewusste Einschränkung des Suchraums, Vertrauen in die Antwort und Bedarf nach Originaldokumenten.

### Schritt 4: Zugriffsrechte prüfen
- **Aktion:** Mitarbeitende einer neu angebundenen Einrichtung sollen P/5 verwenden. Nach der Einrichtung können einige Personen Bereiche sehen, die für ihre Aufgaben nicht erforderlich sind, während andere benötigte Funktionen fehlen. Kläre, was bei Rollen, Berechtigungen und organisatorischer Zuordnung geprüft werden muss.
- **Erwartetes Ergebnis:** Markus kann eine sichere Prüfreihenfolge formulieren und erkennt, welche Änderungen nicht ohne weitere Prüfung vorgenommen werden sollten.
- **Worauf achten:** Sicherheitsbewusstsein, Umgang mit personenbezogenen oder vertraulichen Angaben, Nachfrage nach Rollen- und Mandantenkontext sowie Grenzen automatischer Empfehlungen.

### Schritt 5: Vorgehen reflektieren
- **Aktion:** Beschreibe, warum du bei den Aufgaben jeweils diesen Einstieg und diese Quellen gewählt hast.
- **Erwartetes Ergebnis:** Markus kann den Nutzen und die Grenzen von freier Eingabe, Quellenauswahl und Tasks für technische Fragestellungen differenzieren.
- **Worauf achten:** Anforderungen an Belegbarkeit, Reproduzierbarkeit und Aktualität sowie Akzeptanz geführter Tasks bei komplexen Diagnosen.

## Testfälle / Edge Cases
- Was passiert, wenn eine technische Versionsangabe fehlt?
- Erkennt Markus eine veraltete oder nicht passende Dokumentationsquelle?
- Hinterfragt er eine technisch plausible, aber unbelegte Antwort?
- Wechselt er bei einer zu allgemeinen Antwort zu einer gezielten Quelle oder einem anderen Einstieg?
- Vermeidet er die Eingabe vertraulicher Produktionsdaten?
- Erkennt er, wann ein Supportfall eröffnet oder eine Änderung kontrolliert getestet werden muss?

## Erfolgskriterien
Die Journey gilt als erfolgreich, wenn:
- [ ] Markus kann mindestens zwei Aufgaben ohne Moderationshilfe strukturieren.
- [ ] Er kann Quellenstand, Produktbezug und technische Voraussetzungen nachvollziehen.
- [ ] Er erkennt fehlende Diagnoseinformationen und formuliert gezielte Rückfragen.
- [ ] Er leitet sichere nächste Schritte ab, ohne ungeprüfte Änderungen am Produktivsystem vorzunehmen.
- [ ] Der gewählte Einstieg und spätere Wechsel lassen sich eindeutig dokumentieren.
- [ ] Keine kritische Prototypgrenze verhindert die Bewertung des Einstiegsverhaltens.

