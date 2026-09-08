# User Journey: P/5-Fachanwenderin nutzt GY:PT in vier Praxissituationen

## Metadaten
- **Persona:** Samira Fuchs – operative Fachanwenderin im Rechnungswesen / Buchhaltung
- **Produktkontext:** P/5
- **Journey-Typ:** Szenariobasierte Test-Journey für den formativen Usability- und Konzepttest
- **Ziel der Journey:** Die Nutzerin erhält in unterschiedlichen P/5-Arbeitssituationen passende Unterstützung durch GY:PT, ohne die technische Quellen- oder Capability-Struktur verstehen zu müssen.
- **Zentraler Testfokus:** Welchen Einstieg wählt die Nutzerin bei jeder Aufgabe spontan und ohne Erklärung – freie Frage, Task Entry Point oder gezielte Steuerung über `+`?
- **Startpunkt jeder Aufgabe:** Neutraler GY:PT-Startscreen / neuer Chat
- **Datum:** 2026-09-08

> **Hinweis:** Die vier Aufgaben bilden keine chronologisch zusammenhängende Arbeitsgeschichte. Sie sind vier typische Testsituationen mit unterschiedlichem Unterstützungsbedarf. Vor jeder Aufgabe wird ein neuer Chat gestartet, damit die Wahl des Einstiegs erneut unbeeinflusst beobachtet werden kann.

---

## Testprinzipien

- Der Nutzerin werden **keine Funktionen vorab erklärt**.
- Sie entscheidet selbst, ob sie direkt fragt, einen Task nutzt oder über `+` gezielt Wissen auswählt.
- Es gibt **keinen vorgegebenen richtigen Einstieg**.
- GY:PT soll relevante Wissensräume nach Absenden der Anfrage automatisch bestimmen und gegebenenfalls kombinieren.
- `Verwendetes Wissen` wird erst nach der Antwort gezeigt und dient der Transparenz, nicht der Kontrolle des Routings durch die Nutzerin.
- Die wichtigste Beobachtung je Aufgabe ist die **erste selbstgewählte Handlung** und die Begründung dahinter.

## Verfügbare Einstiege im Konzept

1. **Freie Frage / Prompt First** – die Nutzerin beschreibt direkt ihr fachliches Anliegen.
2. **Task Entry Point** – die Nutzerin wählt eine angebotene Aufgabe, wenn sie zusätzliche Orientierung erwartet.
3. **`+` / Source Control** – die Nutzerin greift gezielt ein, wenn sie bewusst bestimmtes Wissen verwenden möchte.

---

# Journey durch die vier Testaufgaben

## Aufgabe 1: Eingangsrechnung in P/5 finden

### Situation
> Du möchtest eine eingegangene Rechnung in P/5 bearbeiten und weißt nicht mehr genau, wo du sie findest. Nutze GY:PT, um herauszufinden, wie du vorgehen musst.

### Unterstützungsbedarf
Eine normale, konkrete **P/5-Produktfrage**. Die Nutzerin kennt ihr fachliches Ziel, aber nicht mehr den richtigen Weg im Produkt.

### Einstieg – Hypothese, nicht Vorgabe
**Wahrscheinlichster Einstieg:** freie Frage / Prompt First.

Beispiel für ein natürliches Vorgehen:
> „Wo finde ich eingegangene Rechnungen in P/5?“

Tasks oder `+` sind verfügbar, sollten für diesen einfachen Fall aber nicht notwendig sein.

### Erwartetes Systemverhalten
`Startscreen → freie Frage → Automatic Routing → P/5 → Antwort → Verwendetes Wissen: P/5`

Die Antwort verweist auf die **„Übersicht Eingangsrechnungen“ (CE9I)** und erklärt, dass dort über die zentrale Suche beispielsweise nach Verarbeitungsstatus, Kreditor, Belegdatum, Fälligkeit oder Rechnungsbetrag gefiltert werden kann.

### Worauf im Test achten?
- Beginnt die Nutzerin selbstverständlich mit einer freien Frage?
- Sucht sie vor der Eingabe nach einer notwendigen Auswahl oder Konfiguration?
- Werden Tasks oder `+` als Pflichtschritt interpretiert?
- Wie schnell erkennt sie, dass sie ihr fachliches Anliegen direkt formulieren kann?
- Wie interpretiert sie nach der Antwort `Verwendetes Wissen: P/5`?

### Zentrale Beobachtung
**Welchen Einstieg nimmt sie spontan, obwohl für diese Aufgabe keine zusätzliche Steuerung erforderlich ist?**

---

## Aufgabe 2: Interne Vorgaben zur Kundenkommunikation finden

### Situation
> Du hast eine Rechnung korrigiert und möchtest den Kunden über die Rechnungsänderung informieren. Für die Kommunikation mit Kunden gibt es bei euch interne Vorgaben. Nutze GY:PT, um herauszufinden, wie du vorgehen sollst.

### Unterstützungsbedarf
Die benötigte Information ist **organisationsspezifisch** und liegt in den **Internen Wissensquellen**. P/5-Produktwissen allein reicht für die Antwort nicht aus.

### Einstieg – bewusst offen lassen
Für diese Aufgabe gibt es mehrere plausible mentale Modelle:

- **Freie Frage:** Die Nutzerin erwartet, dass GY:PT internes Wissen automatisch berücksichtigt.
- **Prompt mit Kontext:** Sie formuliert ausdrücklich, dass sie die internen Vorgaben benötigt.
- **`+` / Source Control:** Sie sucht selbst nach einer Möglichkeit, `Interne Wissensquellen` gezielt auszuwählen.

Keiner dieser Wege ist vorab als richtig definiert.

### Erwartetes Systemverhalten
**Weg A – Automatic Routing**  
`Startscreen → freie Frage → GY:PT erkennt organisationsspezifischen Wissensbedarf → Interne Wissensquellen → Antwort`

**Weg B – gezielte Steuerung**  
`Startscreen → + → Interne Wissensquellen → Frage → Antwort`

Beide Wege führen zum gleichen fachlichen Ergebnis.

### Worauf im Test achten?
- Erwartet die Nutzerin automatisch Zugriff auf interne Informationen?
- Erwähnt sie „interne Vorgaben“ oder eine Wissensquelle ausdrücklich im Prompt?
- Sucht sie aktiv nach einer Möglichkeit zur Quellensteuerung?
- Wird `+` selbstständig entdeckt und verstanden?
- Entsteht tatsächlich ein Kontrollbedürfnis oder wäre die zusätzliche Auswahl eher Aufwand?
- Wirkt die Situation für P/5-Anwender glaubwürdig oder künstlich?

### Zentrale Beobachtung
**Wie verhält sich die Nutzerin, wenn sie weiß, dass die Antwort aus organisationsspezifischem Wissen kommen muss, aber nicht vorgegeben bekommt, wie dieses Wissen erreicht wird?**

---

## Aufgabe 3: Fehlercode ERIF verstehen und lösen

### Situation
> Beim Anlegen von Stammdaten für eine Abrechnung in P/5 erscheint der Fehlercode ERIF. Du weißt nicht, was der Fehler bedeutet und wie du weiter vorgehen sollst. Nutze GY:PT, um das Problem zu lösen.

### Unterstützungsbedarf
Die Nutzerin befindet sich in einer **Problemsituation** und benötigt Diagnose- bzw. Fehlerhilfe. Für genau diesen Bedarf gibt es zusätzlich den Task Entry Point **„Fehlermeldung analysieren“**.

### Einstieg – bewusst offen lassen
Zwei gleichwertige Wege sollen beobachtet werden:

**A – Task Guidance**  
`Startscreen → Fehlermeldung analysieren → GY:PT fragt nach Fehler → ERIF eingeben → Antwort`

**B – direkte Frage**  
`Startscreen → „Was bedeutet ERIF?“ bzw. Problembeschreibung → Antwort`

### Erwartetes Systemverhalten
GY:PT berücksichtigt automatisch **P/5-Wissen**.

Die vorbereitete Antwort erklärt:
- ERIF bedeutet, dass eine ungültige Funktion eingegeben wurde.
- Zulässig sind `O`, `C`, `R` oder `W`.
- Die verwendete Funktion sollte geprüft und gegebenenfalls korrigiert werden.

Danach: `Verwendetes Wissen: P/5`.

### Worauf im Test achten?
- Wird der Task Entry Point überhaupt wahrgenommen?
- Entscheidet sich die Nutzerin spontan für den Task oder formuliert sie direkt eine Frage?
- Falls sie den Task nutzt: Welchen Mehrwert erwartet sie davon?
- Falls sie direkt fragt: Hätte der Task ihr zusätzliche Orientierung gegeben?
- Wird der Task als hilfreiche Guidance oder als zusätzliche Klassifikationsentscheidung erlebt?
- Entsteht der Eindruck, man müsse für eine Fehlermeldung zwingend erst den Task auswählen?

### Zentrale Beobachtung
**Hat ein Task Entry Point bei einer konkreten Problemsituation einen erkennbaren Nutzen gegenüber dem direkten Prompt?**

---

## Aufgabe 4: XRechnung für öffentlichen Auftraggeber erstellen

### Situation
> Du möchtest mit P/5 eine XRechnung an einen öffentlichen Auftraggeber erstellen und bist dir unsicher, welche Anforderungen dabei gelten. Nutze GY:PT, um herauszufinden, was du beachten musst.

### Unterstützungsbedarf
Die Frage ist **fachübergreifend**. Für eine hilfreiche Antwort sind sowohl **P/5-Produktwissen** als auch **Regulatorik** relevant.

### Einstieg – Hypothese, nicht Vorgabe
**Wahrscheinlicher Einstieg:** freie Frage / Prompt First.

Offen zu beobachten ist jedoch, ob die Nutzerin vor der Frage selbst versucht:
- P/5 auszuwählen,
- Regulatorik auszuwählen,
- mehrere Quellen zu kombinieren,
- oder vollständig auf Automatic Routing vertraut.

### Erwartetes Systemverhalten
`Startscreen → freie Frage → Automatic Routing → P/5 + Regulatorik → Antwort → Verwendetes Wissen: P/5 · Regulatorik`

Es ist **keine Vorauswahl** und keine Routing-Bestätigung notwendig. GY:PT kombiniert die relevanten Wissensräume selbstständig.

### Worauf im Test achten?
- Erkennt die Nutzerin die Frage als fachübergreifend?
- Erwartet sie, dass GY:PT mehrere Wissensbereiche automatisch kombiniert?
- Möchte sie vor der Anfrage selbst Quellen auswählen?
- Wird `Verwendetes Wissen: P/5 · Regulatorik` wahrgenommen und verstanden?
- Unterstützt die Transparenz das Vertrauen in die Antwort?
- Entsteht das Gefühl, die Nutzerin müsse selbst prüfen, ob GY:PT die „richtigen“ Quellen ausgewählt hat?

### Zentrale Beobachtung
**Vertraut die Nutzerin bei einer komplexeren Frage auf die automatische Zuordnung oder versucht sie, das Routing selbst vorzubereiten?**

---

# Vergleich der spontanen Einstiege

> Die folgende Einordnung ist eine **Research-Hypothese**, kein Soll-Verhalten. Im Test wird die tatsächlich gewählte erste Handlung dokumentiert.

| Aufgabe | Informationsbedarf | Möglicher natürlicher Einstieg | Besonders beobachten |
|---|---|---|---|
| 1 · Eingangsrechnung | P/5-Produktwissen | Freie Frage | Wird überhaupt nach Konfiguration gesucht? |
| 2 · Interne Vorgaben | Organisationsspezifisches Wissen | Offen: freie Frage, Kontext im Prompt oder `+` | Entsteht echter Bedarf nach Source Control? |
| 3 · ERIF | Fehler / Diagnose | Offen: Task oder freie Frage | Schafft der Task echte Guidance? |
| 4 · XRechnung | P/5 + Regulatorik | Freie Frage | Wird Automatic Multi-Source Routing erwartet? |

---

# Beobachtungsschema pro Aufgabe

Für jede Aufgabe kurz dokumentieren:

- **Erste Handlung:** Was macht die Nutzerin unmittelbar nach dem Lesen der Aufgabe?
- **Gewählter Einstieg:** Prompt / Task / `+` / anderer Weg
- **Begründung:** Was sagt sie laut über ihre Entscheidung?
- **Orientierung:** Zögert oder sucht sie nach einer notwendigen Einstellung?
- **Optionalität:** Versteht sie Tasks und `+` als Hilfe oder als Pflicht?
- **Routing-Erwartung:** Welches Wissen erwartet sie automatisch von GY:PT?
- **Transparenz:** Wie interpretiert sie `Verwendetes Wissen`?
- **Ergebnis:** Kann sie mit der Antwort in ihrer Arbeit weiterkommen?

## Einfaches Protokoll

| Aufgabe | Erste Handlung | Einstieg | Begründung / Zitat | Irritationen | Interpretation |
|---|---|---|---|---|---|
| 1 |  |  |  |  |  |
| 2 |  |  |  |  |  |
| 3 |  |  |  |  |  |
| 4 |  |  |  |  |  |

---

# Übergreifende Erfolgskriterien

Die Test-Journey ist erfolgreich, wenn sich zeigt, dass:

- [ ] die Nutzerin ihr fachliches Anliegen ohne Wissen über technische Quellen oder Capabilities beginnen kann,
- [ ] Prompt First als verständlicher und niedrigschwelliger Default funktioniert,
- [ ] Tasks nur dann zusätzliche Orientierung liefern, wenn sie tatsächlich benötigt wird,
- [ ] `+` als optionale Kontrolle verstanden wird und nicht wie eine notwendige Konfiguration wirkt,
- [ ] organisationsspezifisches Wissen automatisch berücksichtigt oder bei bewusstem Bedarf gezielt gesteuert werden kann,
- [ ] GY:PT mehrere relevante Wissensräume automatisch kombinieren kann,
- [ ] `Verwendetes Wissen` verständlich ist und Nachvollziehbarkeit schafft, ohne die Routing-Verantwortung auf die Nutzerin zu übertragen,
- [ ] die Nutzerin in allen vier Situationen zu einem für sie nachvollziehbaren Einstieg findet.

---

# Auswertung über alle vier Aufgaben

Nach dem Test sollten die vier Einstiegsentscheidungen gemeinsam betrachtet werden. Besonders relevant sind Muster wie:

- **Immer direkte Frage:** Spricht für ein starkes Prompt-First-Mental-Model; Tasks und Source Control müssen ihren Zusatznutzen klar rechtfertigen.
- **Task nur bei Aufgabe 3:** Hinweis darauf, dass Task Entry Points vor allem bei unklaren Problemsituationen Guidance liefern.
- **`+` nur bei Aufgabe 2:** Hinweis darauf, dass Source Control vor allem bei bewusst bekanntem oder organisationsspezifischem Wissen relevant ist.
- **Quellenauswahl auch bei Aufgabe 1 oder 4:** Prüfen, ob das Konzept unbeabsichtigt den Eindruck erzeugt, Wissen müsse vor jeder Anfrage konfiguriert werden.
- **Keine Wahrnehmung von Tasks oder `+`, aber alle Aufgaben lösbar:** Prüfen, ob die optionalen Mechanismen tatsächlich notwendig sind oder nur für bestimmte Nutzergruppen einen Mehrwert bieten.

Die Auswertung soll nicht danach erfolgen, ob die Nutzerin den vermeintlich „richtigen“ Weg gewählt hat, sondern danach, **ob ihr selbstgewählter Weg verständlich, effizient und mit ihrem Mental Model vereinbar ist**.
