# User Journey: Fachanwender benötigt Unterstützung mit GY:PT

## Metadaten
- **Persona:** Fachanwender in P5 
- **Ziel der Journey:** Der Nutzer erhält während seiner Arbeit mit P5 schnell passende Unterstützung, ohne die technische Quellen- oder Capability-Struktur von GY:PT verstehen zu müssen, und kann die erhaltene Information anschließend für seine eigentliche Aufgabe nutzen.
- **Startseite:** GY:PT – neutraler Startscreen / neuer Chat
- **Datum:** 2026-08-31
- **Erstellt von:** [Name ergänzen]

## Vorbedingungen
Was muss gegeben sein, bevor die Journey startet?
- [ ] Nutzer arbeitet mit P5 und hat einen konkreten Informations- oder Unterstützungsbedarf
- [ ] Nutzer hat Zugriff auf GY:PT
- [ ] Für den Nutzer relevante Wissensräume sind über Organisation und Berechtigungen grundsätzlich verfügbar
- [ ] P5-Produktwissen kann automatisch berücksichtigt werden
- [ ] Weitere Wissensräume wie Regulatorik oder eigene Wissensquellen sind verfügbar, sofern sie für den jeweiligen Fall relevant sind
- [ ] Der Nutzer muss vor Beginn keine technische Quelle oder Capability auswählen

## Schritte der Journey

### Schritt 1: Unterstützungsbedarf entsteht
- **Aktion:** Während der Arbeit in P5 entsteht eine Frage, ein Fehler oder ein zusätzlicher Informationsbedarf.
- **Erwartetes Ergebnis:** Der Nutzer erkennt, dass er Unterstützung benötigt und entscheidet sich, GY:PT zu verwenden.
- **Worauf achten:** Welche Art von Bedarf entsteht? Produktfrage, interne Arbeitsanweisung, Fehleranalyse oder fachübergreifende Frage? Weiß der Nutzer bereits, wo die Information liegen könnte?

### Schritt 2: GY:PT öffnen und orientieren
- **Aktion:** Der Nutzer öffnet GY:PT bzw. startet einen neuen Chat.
- **Erwartetes Ergebnis:** Ein neutraler Startscreen ist sichtbar. Der freie Prompt ist der primäre Einstieg; optionale Task Entry Points und das dezente `+` sind verfügbar.
- **Worauf achten:** Versteht der Nutzer, dass er direkt fragen kann? Wirken Tasks oder `+` wie notwendige Konfiguration? Welche Möglichkeiten nimmt er spontan wahr?

### Schritt 3: Anliegen an GY:PT vermitteln
- **Aktion:** Der Nutzer formuliert sein fachliches Anliegen in natürlicher Sprache. Bei Bedarf kann er alternativ einen Task nutzen oder über `+` eine eigene Wissensquelle gezielt auswählen.
- **Erwartetes Ergebnis:** Der Nutzer kann sein Ziel ausdrücken, ohne technische Begriffe wie RAG, Retriever, Datenbankmodus oder Function Calling kennen zu müssen.
- **Worauf achten:** Fragt der Nutzer direkt? Nutzt er Task Guidance? Möchte er eine Quelle gezielt steuern? Muss er überlegen, welche technische Funktion für sein Anliegen zuständig ist?

### Schritt 4: GY:PT bestimmt relevantes Wissen
- **Aktion:** GY:PT verarbeitet die Anfrage und ordnet automatisch die relevanten Wissensräume zu.
- **Erwartetes Ergebnis:** Für eine normale Produktfrage wird beispielsweise P5 berücksichtigt; bei fachübergreifenden Fragen können mehrere Wissensräume wie P5 und Regulatorik kombiniert werden. Bei organisationsspezifischen Fragen kann eine eigene Wissensquelle berücksichtigt werden.
- **Worauf achten:** Muss der Nutzer Routing-Regeln kennen oder bestätigen? Entspricht das Verhalten dem Mental Model „Ich beschreibe mein Ziel – GY:PT kümmert sich um die Zuordnung“?

### Schritt 5: Antwort erhalten und verstehen
- **Aktion:** Der Nutzer liest die Antwort von GY:PT.
- **Erwartetes Ergebnis:** Die Antwort unterstützt das konkrete fachliche Ziel und ist so formuliert, dass der Nutzer damit weiterarbeiten kann.
- **Worauf achten:** Ist die Antwort verständlich und relevant? Werden unnötige technische Details vermieden? Liefert eine Task-basierte Interaktion tatsächlich zusätzliche Guidance?

### Schritt 6: Verwendetes Wissen nachvollziehen
- **Aktion:** Der Nutzer sieht nach der Antwort den Bereich „Verwendetes Wissen“ und kann bei Bedarf Quellen öffnen.
- **Erwartetes Ergebnis:** GY:PT macht transparent, welche Wissensräume tatsächlich für die Antwort verwendet wurden, z. B. `P5`, `Interne Kundenkommunikation` oder `P5 · Regulatorik`.
- **Worauf achten:** Wird „Verwendetes Wissen“ wahrgenommen und verstanden? Ist bei Multi-Source klar, dass mehrere Wissensräume gemeinsam verwendet wurden? Unterstützt die Transparenz das Vertrauen, ohne dem Nutzer die Verantwortung für die Routing-Kontrolle zu übertragen?

### Schritt 7: Ergebnis auf die Arbeit anwenden
- **Aktion:** Der Nutzer verwendet die erhaltene Information für seine eigentliche Aufgabe in P5 bzw. setzt seine Arbeit fort.
- **Erwartetes Ergebnis:** Der ursprüngliche Unterstützungsbedarf ist ausreichend geklärt; bei weiterem Bedarf kann der Nutzer im bestehenden Chat nachfragen oder einen neuen Chat starten.
- **Worauf achten:** Kann der Nutzer die Antwort praktisch nutzen? Entstehen weitere Fragen? Fehlt an irgendeiner Stelle Kontrolle, Guidance oder Kontext?

## Testfälle / Edge Cases
Was soll zusätzlich getestet werden?
- Was passiert, wenn der Nutzer eine sehr einfache Produktfrage stellt und keine zusätzliche Steuerung benötigt?
- Was passiert, wenn die benötigte Information nur in einer eigens angelegten organisationsspezifischen Wissensquelle liegt?
- Was passiert, wenn der Nutzer eine konkrete eigene Wissensquelle kennt: nennt er sie im Prompt oder sucht er nach gezielter Source Control?
- Was passiert, wenn der Nutzer nicht weiß, wie er ein Problem formulieren soll und Task Guidance nutzen könnte?
- Was passiert bei einer fachübergreifenden Anfrage, für die mehrere Wissensräume relevant sind?
- Versteht der Nutzer nach der Antwort, welche Wissensräume verwendet wurden?
- Wirken optionale Mechanismen wie Tasks oder `+` versehentlich wie notwendige Schritte?
- Wie verhält sich ein GY:PT-Neuling im Vergleich zu einem erfahrenen GY:PT-Nutzer?

## Erfolgskriterien
Die Journey gilt als erfolgreich, wenn:
- [ ] Der Nutzer kann sein fachliches Anliegen ohne technische Quellen- oder Capability-Kenntnisse starten
- [ ] Prompt First funktioniert als verständlicher Default
- [ ] Optionale Tasks unterstützen nur dann, wenn zusätzliche Guidance benötigt wird, und erzeugen keine Pflichtklassifikation
- [ ] Eigene Wissensquellen können bei Bedarf berücksichtigt bzw. gezielt gesteuert werden, ohne den Standardfall zu belasten
- [ ] GY:PT kann relevante Wissensräume automatisch bestimmen und bei Bedarf kombinieren
- [ ] „Verwendetes Wissen“ ist verständlich und unterstützt die Nachvollziehbarkeit der Antwort
- [ ] Der Nutzer kann die erhaltene Information für seine eigentliche Arbeit verwenden
- [ ] Keine kritische Interaktion zwingt den Nutzer dazu, die technische Architektur von GY:PT zu verstehen
