# User Journey: Erster Login bei dev.wilken.ai

## Metadaten
- **Persona:** Katrin Vogel (katrin-vogel-persona.md)
- **Ziel der Journey:** Sich zum ersten Mal erfolgreich bei dev.wilken.ai anmelden — Fokus liegt bewusst auf dem Zugangsprozess, da die eigentliche Anwendung ohne gültige Zugangsdaten nicht einsehbar ist (siehe Persona-Datei, Hinweis oben)
- **Startseite:** https://dev.wilken.ai/
- **Datum:** 2026-08-28
- **Erstellt von:** Sahar (auf Basis einer zweifach gegengeprüften Recherche — siehe Vorbedingungen)

## Vorbedingungen
- [ ] **Kein Login vorhanden.** Diese Journey wurde ohne echte Zugangsdaten recherchiert. Schritte 1–6 sind vollständig beobachtet und getestbar. Schritte 7–8 sind **nicht beobachtet** und benötigen ein echtes Test-Konto.
- [ ] `dev.wilken.ai` leitet ausnahmslos zu `https://iam.latest.dev-wanyplace.de` weiter (FusionAuth, hinter einem Azure-„Easy Auth"-artigen Gateway) — das ist erwartetes Verhalten, kein Fehler
- [ ] Falls echte Zugangsdaten vorhanden sind: direkt im Prompt an Claude angeben, niemals in eine Datei schreiben lassen

## Schritte der Journey

### Schritt 1: Startseite aufrufen
- **Aktion:** Navigiere zu https://dev.wilken.ai/
- **Erwartetes Ergebnis:** Sofortige Weiterleitung zu einer FusionAuth-Login-Seite auf `iam.latest.dev-wanyplace.de` — keine Wilken-eigene Startseite lädt
- **Worauf achten:** Wirkt der Sprung auf eine komplett andere Domain vertrauenswürdig? Ist für Katrin erkennbar, dass das noch zur richtigen Firma gehört?

### Schritt 2: Login-Formular betrachten
- **Aktion:** Schau dir das Formular an (Feldbezeichnungen, Reihenfolge, Buttons)
- **Erwartetes Ergebnis:** E-Mail/Login-Feld, Passwort-Feld, Checkbox „Angemeldet bleiben" (mit Warnhinweis zu öffentlichen Rechnern), Button „Absenden", Link „Passwort vergessen?"
- **Worauf achten:** Ist sofort klar, was hier von Katrin erwartet wird? Gibt es irgendeinen Hinweis auf die Firma/App, bei der sie sich eigentlich anmeldet?

### Schritt 3: Sprache prüfen und ggf. wechseln
- **Aktion:** Beobachte die Formularsprache; nutze den DE/EN-Umschalter unten links, falls vorhanden
- **Erwartetes Ergebnis:** Formular wechselt korrekt zwischen „Anmelden/E-Mail/Passwort/Absenden" und „Login/Login/Password/Submit"
- **Worauf achten:** Ist nachvollziehbar, wonach sich die Sprache richtet (Browser-Locale? Zufall?), oder wirkt es unvorhersehbar? (Bei unserer Recherche zeigten zwei unabhängige Durchläufe unterschiedliche Standardsprachen — noch nicht abschließend geklärt.)

### Schritt 4: Zweite Login-Option bewerten
- **Aktion:** Betrachte den Button „Login with GY" (unterhalb des „Oder"-Trenners)
- **Erwartetes Ergebnis:** Sollte erkennbar machen, wofür diese Option da ist und wann man sie statt des normalen Formulars nutzen soll
- **Worauf achten:** Kann Katrin ohne Vorwissen entscheiden, welche der beiden Optionen für sie gilt? (Bei der Recherche gab es dazu keinerlei Erklärung, Tooltip oder Label — nur ein generisches OIDC-Icon plus ein violettes „GY"-Logo.)

### Schritt 5: „Passwort vergessen?" ausprobieren (ohne abzusenden)
- **Aktion:** Klicke auf „Passwort vergessen?", schau dir das Formular an — **nicht absenden**, da kein echtes Konto vorhanden ist
- **Erwartetes Ergebnis:** Formular mit einem Login-Feld, Submit-Button, Link „Zurück zum Login"
- **Worauf achten:** Erklärt die Seite, was nach dem Absenden passiert? Reicht die Information, damit Katrin sich sicher fühlt, es zu versuchen?

### Schritt 6: Ohne Zugangsdaten den Rand des Zugangs testen
- **Aktion:** Prüfe, ob es einen sichtbaren Weg für neue Nutzer gibt (Registrierung, Demo, Gast-Zugang) — auf der Login- und der Passwort-vergessen-Seite
- **Erwartetes Ergebnis:** Erwartungsgemäß: keiner vorhanden (B2B-System, Zugang wird vermutlich von der IT der Kundenfirma vergeben)
- **Worauf achten:** Wäre für eine komplett neue Nutzerin ohne vorherige Einweisung klar, dass sie sich an ihre IT-Abteilung wenden muss?

### Schritt 7: Login mit echten Zugangsdaten *(nicht beobachtet — benötigt echtes Konto)*
- **Aktion:** E-Mail/Passwort eingeben (oder „Login with GY", falls das der vorgesehene Weg ist) und absenden
- **Erwartetes Ergebnis:** Weiterleitung zurück zu `dev.wilken.ai/.auth/login/FusionAuth/callback` und danach in die eigentliche Anwendung
- **Worauf achten:** *Dieser Schritt konnte in der Recherche nicht durchgeführt werden — hier beginnt der eigentlich unbekannte Teil der Anwendung.*

### Schritt 8: Erste Ansicht nach dem Login *(nicht beobachtet — benötigt echtes Konto)*
- **Aktion:** Beobachte, was nach erfolgreichem Login als Erstes angezeigt wird
- **Erwartetes Ergebnis:** Unbekannt — sobald dieser Schritt beobachtet wurde, sollte die Persona-Datei um echte In-App-Ziele ergänzt werden
- **Worauf achten:** Alles — das ist der Punkt, ab dem eine echte, produktspezifische Persona erst geschrieben werden kann

## Testfälle / Edge Cases
- Was passiert bei falschem Passwort? (Fehlermeldung verständlich?)
- Was passiert, wenn „Angemeldet bleiben" angehakt wird — wie lange bleibt die Session aktiv?
- Funktioniert der Browser-„Zurück"-Button während der Weiterleitung zwischen den beiden Domains?

## Erfolgskriterien
Die Journey (Schritte 1–6) gilt als erfolgreich, wenn:
- [ ] Katrin ohne Verwirrung erkennt, dass die fremde Domain trotzdem zum richtigen Login gehört
- [ ] Sie eine begründete Entscheidung zwischen den zwei Login-Optionen treffen könnte
- [ ] Die Sprachumschaltung nachvollziehbar funktioniert
- [ ] Sie wüsste, was sie bei einem vergessenen Passwort als Nächstes tun müsste
- [ ] Keine kritischen Fehler auf den getesteten Seiten auftreten

Schritte 7–8 gelten erst als abgeschlossen, sobald ein echter Testlauf mit gültigen Zugangsdaten stattgefunden hat.
