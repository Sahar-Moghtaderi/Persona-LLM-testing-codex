# Testreport: Katrin Vogel — 2026-08-28

## Zusammenfassung
- **Getestete Journey:** Erster Login bei dev.wilken.ai (`journeys/katrin-vogel-journey.md`)
- **URL:** https://dev.wilken.ai/ → leitet weiter auf https://iam.latest.dev-wanyplace.de
- **Datum:** 2026-08-28
- **Persona:** Katrin Vogel, 29, Sachbearbeiterin, erster Arbeitstag, mittlere technische Affinität
- **Ergebnis:** ⚠️ Mit Problemen
- **Dauer:** 2m 52s (14:45:26 – 14:48:18)
- **Playwright-Aktionen:** 27
- **Getesteter Umfang:** Schritte 1–6. Schritte 7–8 **nicht ausgeführt** (keine gültigen Zugangsdaten vorhanden — siehe Journey, Vorbedingungen).
- **Einschränkung auf Wunsch:** Das „Passwort vergessen?"-Formular wurde **nur betrachtet, nicht abgesendet**.

## Gesamteindruck aus Sicht der Persona

Ich tippe die Adresse ein, die mir die IT aufgeschrieben hat — `dev.wilken.ai` — und lande eine Sekunde später auf `iam.latest.dev-wanyplace.de`, auf einer knallvioletten Seite mit einem Logo, auf dem „GY" steht. Das Wort „Wilken" sehe ich nirgends. Unten rechts steht „Powered by FusionAuth", noch ein dritter Name, den ich nicht kenne. An meinem ersten Arbeitstag, an dem mir alle gesagt haben „pass auf Phishing auf", ist das genau der Moment, in dem ich lieber nochmal jemanden frage, statt mein Passwort einzutippen.

Das Formular selbst ist schlicht und eigentlich verständlich — zwei Felder, ein Knopf. Aber darunter stehen zwei Login-Wege nebeneinander („Absenden" und „Login with GY"), ohne ein einziges Wort dazu, welcher für mich gilt. Ich habe eine E-Mail-Adresse und ein Passwort von der IT bekommen, also nehme ich das obere — aber sicher bin ich mir nicht, und wenn das falsch ist, habe ich vielleicht schon einen Fehlversuch verbraucht.

Verwirrend war auch die Sprache: Das Formular war auf Deutsch, aber in der Auswahl darunter stand „English". Ich habe auf „Deutsch" geklickt und es passierte sichtbar nichts — weil es ja schon deutsch war. Für einen Moment dachte ich, die Seite reagiert nicht.

Positiv: Die „Passwort vergessen"-Seite war besser, als ich befürchtet hatte — sie erklärt in einem Satz, was ich tun soll, und der Weg zurück zum Login ist da. Insgesamt würde ich mich hier vermutlich einloggen können, aber ich hätte vorher einmal bei der IT angerufen. Und genau das wollte ich eigentlich vermeiden.

## Gefundene Probleme

### Problem 1: Kein einziger sichtbarer Hinweis auf die Firma/Anwendung — wirkt wie Phishing
- **Schweregrad:** Kritisch
- **Schritt:** Schritt 1 und 2
- **Erwartet:** Die Login-Seite ist erkennbar der Anwendung zugeordnet, die Katrin aufgerufen hat (Name, Logo oder wenigstens ein Hinweis „Anmeldung für …").
- **Tatsächlich:** Nach dem Aufruf von `dev.wilken.ai` erscheint die Domain `iam.latest.dev-wanyplace.de` mit einem „GY"-Logo. Eine Prüfung des Seitenquelltextes ergab: Das Wort „Wilken" kommt auf der gesamten Seite **genau einmal** vor — versteckt im URL-Parameter `redirect_uri` eines Links. Als sichtbarer Text taucht es **nirgends** auf. Zusätzlich steht unten rechts „Powered by FusionAuth" — ein dritter, unbekannter Name.
- **Reaktion der Persona:** Misstrauisch bis alarmiert. Katrin bricht ab und fragt die IT, ob die Seite echt ist — genau der Anruf, den sie vermeiden wollte. Im schlechteren Fall gewöhnt sie sich an, Zugangsdaten auf fremd aussehenden Domains einzugeben.
- **Screenshot:** ![](../screenshots/katrin-vogel-schritt-1-login-fremde-domain.png)

### Problem 2: Sprachauswahl zeigt „English", das Formular ist aber Deutsch
- **Schweregrad:** Mittel
- **Schritt:** Schritt 3
- **Erwartet:** Die Sprachauswahl zeigt die Sprache an, in der das Formular tatsächlich dargestellt wird.
- **Tatsächlich:** Beim ersten Laden ist das gesamte Formular deutsch („Anmelden / E-Mail / Passwort / Absenden"), die Sprachauswahl steht aber auf **„English"** (`select.value = "en"`, ebenso `<html lang="en">`). Klickt man auf „Deutsch", ändert sich sichtbar nichts — es war ja schon deutsch. Erst eine bewusste Auswahl bringt Anzeige und Inhalt in Einklang: „English" schaltet dann korrekt auf Englisch um, „Deutsch" zurück.
- **Reaktion der Persona:** Kurze Irritation, dann der Eindruck, die Seite reagiere nicht auf ihren Klick. Sie klickt eventuell mehrfach.
- **Screenshot:** ![](../screenshots/katrin-vogel-schritt-3-sprache-englisch.png)

### Problem 3: Deutsche und englische Fassung fordern Unterschiedliches
- **Schweregrad:** Mittel
- **Schritt:** Schritt 3
- **Erwartet:** Beide Sprachfassungen benennen dasselbe Feld gleich.
- **Tatsächlich:** Auf Deutsch heißt das erste Feld **„E-Mail"**, auf Englisch **„Login"** (Überschrift dort ebenfalls „Login", also „Login / Login / Password"). Die deutsche Fassung sagt also klar „gib deine E-Mail-Adresse ein", die englische lässt offen, ob Benutzername oder E-Mail erwartet wird. Der Button „Login with GY" bleibt in beiden Sprachen unübersetzt englisch.
- **Reaktion der Persona:** Wenn sie versehentlich in der englischen Fassung landet, weiß sie nicht, ob sie ihre E-Mail-Adresse oder einen Benutzernamen eintragen soll — und probiert im Zweifel beides aus.

### Problem 4: „Login with GY" ohne jede Erklärung
- **Schweregrad:** Mittel
- **Schritt:** Schritt 4
- **Erwartet:** Erkennbar, wofür die zweite Login-Option da ist und wer sie nutzen soll.
- **Tatsächlich:** Der Button trägt nur die Beschriftung „Login with GY". Eine Prüfung ergab: **kein** `title`, **kein** `aria-label`, **kein** `aria-describedby`, kein Tooltip, kein erklärender Text. Nichts unterscheidet für Katrin die beiden Wege außer der Beschriftung.
- **Reaktion der Persona:** Sie rät. Wählt sie falsch, deutet sie das Ergebnis womöglich als „mein Passwort stimmt nicht" und startet einen unnötigen Passwort-Reset.

### Problem 5: „Angemeldet bleiben" ist standardmäßig aktiviert
- **Schweregrad:** Mittel
- **Schritt:** Schritt 2
- **Erwartet:** Eine Option, die die Sitzung dauerhaft offen hält, ist standardmäßig **aus** — besonders, da der Hinweistext selbst vor der Nutzung auf fremden Geräten warnt.
- **Tatsächlich:** Die Checkbox „Angemeldet bleiben" ist beim Laden **bereits angehakt**. Der zugehörige Hinweis erscheint erst beim Überfahren des Info-Symbols und lautet: *„Aktivieren Sie diese Option, um während der konfigurierten Dauer bei FusionAuth angemeldet zu bleiben. Wählen Sie dies nicht auf einem öffentlichen oder gemeinsam genutzten Gerät."* Die Warnung widerspricht damit der Voreinstellung — und nennt zudem „FusionAuth" statt der Anwendung, bei der Katrin sich anmeldet.
- **Reaktion der Persona:** Sie bemerkt den Haken vermutlich gar nicht. Falls doch, verunsichert sie die Warnung zusätzlich.

### Problem 6: Kein Weg für neue Nutzer, kein Support-Kontakt, kein Impressum
- **Schweregrad:** Gering (erwartungsgemäß für ein B2B-System, aber unbegleitet)
- **Schritt:** Schritt 6
- **Erwartet:** Erwartungsgemäß keine Selbstregistrierung — aber ein Hinweis, an wen man sich ohne Zugang wendet.
- **Tatsächlich:** Auf der Login-Seite existieren insgesamt **drei** klickbare Elemente: „Absenden", „Passwort vergessen?", „Login with GY". Auf der Passwort-vergessen-Seite **zwei**: „Absenden", „Zurück zur Anmeldung kehren". Keine Registrierung, kein „Neu hier?", kein Support-/IT-Kontakt, kein Impressum und kein Datenschutzlink.
- **Reaktion der Persona:** Ohne vorherige Einweisung hätte sie keinen Anhaltspunkt, was zu tun ist — sie müsste raten, dass die IT zuständig ist.

### Problem 7: Sprachlich unsaubere Beschriftungen und falscher Alternativtext
- **Schweregrad:** Gering
- **Schritt:** Schritt 4 und 5
- **Erwartet:** Korrekte deutsche Beschriftungen; Bild-Alternativtexte, die das Bild beschreiben.
- **Tatsächlich:** Der Rücksprunglink heißt **„Zurück zur Anmeldung kehren"** (doppelt gemoppelt; korrekt wäre „Zurück zur Anmeldung" oder „Zur Anmeldung zurückkehren"). Der Browser-Tab der deutschen Passwort-vergessen-Seite trägt den englischen Titel **„Forgot Password"**. Das Logo im „Login with GY"-Button hat den Alternativtext **„OpenID Connect Logo"**, zeigt tatsächlich aber die Datei `GY_gyiolet.svg` — Screenreader-Nutzende hören also etwas anderes, als dort steht.
- **Reaktion der Persona:** Fällt Katrin kaum auf, verstärkt aber den unfertigen Gesamteindruck.

## Positiv aufgefallen

- Die **Passwort-vergessen-Seite ist besser als in der Vorab-Recherche angenommen**: Sie enthält einen erklärenden Satz („Geben Sie Ihre E-Mail-Adresse in das untenstehende Formular ein, um Ihr Passwort zurückzusetzen."), ein klar als Pflichtfeld markiertes Feld („E-Mail \*") und einen Rücksprunglink. Die Journey erwartete hier ein kommentarloses Ein-Feld-Formular.
- Der **Rücksprung zum Login funktioniert** und die zuvor gewählte Sprache bleibt dabei erhalten.
- Der **Browser-Zurück-Button funktioniert** sauber über beide Domains hinweg (Login → Passwort vergessen → Login), ohne Fehlerseite oder Weiterleitungsschleife.
- Das Formular ist **kurz und übersichtlich** — nur zwei Felder, keine überflüssigen Angaben.

## Durchgeführte Schritte

| Schritt | Beschreibung | Status | Anmerkung |
|---------|-------------|--------|-----------|
| 1 | Startseite https://dev.wilken.ai/ aufrufen | ✅ | Weiterleitung auf `iam.latest.dev-wanyplace.de` erfolgt wie erwartet — aber ohne erkennbaren Bezug zur Firma (Problem 1) |
| 2 | Login-Formular betrachten | ✅ | Alle erwarteten Elemente vorhanden; „Angemeldet bleiben" jedoch vorangehakt (Problem 5) |
| 3 | Sprache prüfen und wechseln | ⚠️ | Umschaltung funktioniert, Ausgangszustand ist aber inkonsistent (Problem 2) und die Fassungen weichen inhaltlich ab (Problem 3) |
| 4 | Zweite Login-Option „Login with GY" bewerten | ⚠️ | Vorhanden, aber ohne jede Erklärung (Problem 4) |
| 5 | „Passwort vergessen?" ansehen (ohne abzusenden) | ✅ | Formular geöffnet und dokumentiert, **nicht abgesendet**. Besser als erwartet (siehe „Positiv aufgefallen") |
| 6 | Weg für neue Nutzer suchen | ✅ | Wie erwartet keiner vorhanden — aber auch kein Ersatzhinweis (Problem 6) |
| 7 | Login mit echten Zugangsdaten | ⬜ | **Nicht ausgeführt** — keine gültigen Zugangsdaten vorhanden |
| 8 | Erste Ansicht nach dem Login | ⬜ | **Nicht ausgeführt** — setzt Schritt 7 voraus |

## Edge Cases

| Edge Case | Status | Ergebnis |
|-----------|--------|----------|
| Browser-„Zurück" während der Weiterleitung zwischen den Domains | ✅ getestet | Funktioniert fehlerfrei über beide Domains; Sprachwahl bleibt erhalten |
| Verhalten bei falschem Passwort | ⬜ nicht getestet | Nicht ausgeführt — es wurden bewusst keine Anmeldedaten an das Login-Formular gesendet |
| Sitzungsdauer bei „Angemeldet bleiben" | ⬜ nicht getestet | Setzt einen erfolgreichen Login voraus (Schritt 7) |

## Erfolgskriterien

| Kriterium | Erfüllt? | Anmerkung |
|-----------|----------|-----------|
| Katrin erkennt ohne Verwirrung, dass die fremde Domain zum richtigen Login gehört | ❌ | Kein sichtbarer Bezug zur Firma oder Anwendung — der zentrale Vertrauensbruch der Journey |
| Sie könnte eine begründete Entscheidung zwischen den zwei Login-Optionen treffen | ❌ | Keinerlei Erklärung zu „Login with GY" vorhanden |
| Die Sprachumschaltung funktioniert nachvollziehbar | ⚠️ | Umschaltung funktioniert technisch, Ausgangszustand und Feldbezeichnungen sind aber widersprüchlich |
| Sie wüsste, was bei vergessenem Passwort als Nächstes zu tun ist | ⚠️ | Die Seite erklärt, was einzugeben ist — aber nicht, was danach passiert (kommt eine E-Mail? wann? was, wenn die Adresse unbekannt ist?) |
| Keine kritischen Fehler auf den getesteten Seiten | ✅ | Keine technischen Fehler, keine Fehlerseiten, keine gebrochenen Links |

## Empfehlungen

1. **Firmenbezug sichtbar machen (höchste Priorität).** Auf der Login-Seite den Namen der Anwendung bzw. „Wilken" als sichtbaren Text oder Logo einblenden — z. B. eine Zeile „Anmeldung für \<Anwendungsname\>". Ohne das ist die Seite von einer Phishing-Seite nicht zu unterscheiden.
2. **Die beiden Login-Wege beschriften.** Kurze Zeilen wie „Mit Ihrem \<Firma\>-Konto anmelden" über dem Formular und „Mit Ihrem GY-Konto anmelden — für Mitarbeitende von …" über dem Button. Ein Satz je Option genügt.
3. **Standardsprache und Sprachauswahl synchronisieren.** Der Auswahlwert (und `<html lang>`) muss die tatsächlich gerenderte Sprache abbilden; idealerweise wird die Browsersprache ausgewertet und der Auswahlwert entsprechend vorbelegt.
4. **Feldbezeichnungen zwischen den Sprachen angleichen.** Wenn eine E-Mail-Adresse erwartet wird, sollte das englische Feld „Email" heißen, nicht „Login". „Login with GY" ins Deutsche übersetzen.
5. **„Angemeldet bleiben" standardmäßig deaktivieren.** Die Voreinstellung widerspricht der eigenen Warnung im Tooltip. Zusätzlich im Hinweistext den Anwendungsnamen statt „FusionAuth" verwenden.
6. **Hinweis für Nutzer ohne Zugang ergänzen.** Eine Zeile wie „Noch keinen Zugang? Bitte wenden Sie sich an Ihre IT-Abteilung." unter dem Formular — plus Impressum/Datenschutz, sofern für die Zielgruppe erforderlich.
7. **Passwort-Reset um die Folgeinformation ergänzen.** Ein Satz dazu, was nach dem Absenden passiert („Sie erhalten innerhalb weniger Minuten eine E-Mail mit einem Link…") nimmt die Unsicherheit vor dem Klick.
8. **Kleinigkeiten korrigieren.** „Zurück zur Anmeldung kehren" → „Zurück zur Anmeldung"; Tab-Titel der deutschen Seite übersetzen; Alternativtext des GY-Logos von „OpenID Connect Logo" auf „GY Logo" ändern.

## Offene Punkte für den nächsten Testlauf

- Schritte 7–8 der Journey sind weiterhin **unbeobachtet**. Sobald gültige Testzugangsdaten vorliegen (laut Journey direkt im Prompt zu übergeben, nicht in einer Datei), sollte die Persona `katrin-vogel-persona.md` um echte In-App-Ziele erweitert und die Journey erneut ab Schritt 7 gefahren werden.
- Der Edge Case „Fehlermeldung bei falschem Passwort" wurde bewusst ausgelassen und kann bei ausdrücklicher Freigabe nachgeholt werden.
