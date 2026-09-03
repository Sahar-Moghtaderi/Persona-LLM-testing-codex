# Persona: Katrin Vogel

## Basisdaten
- **Name:** Katrin Vogel
- **Alter:** 29
- **Beruf:** Sachbearbeiterin, neu eingestellt bei einem Unternehmen, das (laut Recherche **nicht bestätigt**, nur aus der Domain vermutet) Software des Anbieters „Wilken" einsetzt
- **Technische Affinität:** Mittel – nutzt Standard-Bürosoftware und SSO-Logins routiniert, kennt aber keine Fachbegriffe wie OAuth/OIDC/IdP

## Wichtiger Hinweis zu dieser Persona
Diese Persona wurde bewusst **nur für den Login-/Zugangsprozess** erstellt. Eine Recherche (zwei unabhängige Erkundungen + Gegenprüfung) hat ergeben: `dev.wilken.ai` hat **keinerlei unauthentifizierten Bereich** — jede URL, selbst `manifest.json`, wird sofort zu einem separaten Identity-Provider (FusionAuth, gehostet auf `iam.latest.dev-wanyplace.de`) weitergeleitet. Es gibt keine Startseite, kein Dashboard, keinen Produktnamen, keine Beschreibung, die einsehbar wäre. Alles, was diese Persona über die eigentliche Anwendung "weiß", ist reine Vermutung aus dem Domainnamen — **nicht** Teil dieser Persona. Sobald jemand echte Testzugangsdaten hat, sollte diese Persona um die tatsächlichen In-App-Ziele erweitert werden.

## Ziele
Was will Katrin an ihrem ersten Arbeitstag erreichen?
- Sich erfolgreich einloggen, ohne IT nochmal fragen zu müssen
- Verstehen, welche der beiden Login-Optionen (normales Passwort vs. „Login with GY") für sie die richtige ist
- Sicher sein, dass sie nicht gerade auf einer Phishing-Seite gelandet ist, als sie auf eine fremde Domain umgeleitet wird
- Falls nötig, ihr Passwort zurücksetzen können, ohne sich zu verirren

## Frustrationen & Pain Points
- Wird sofort auf eine fremde Domain (`iam.latest.dev-wanyplace.de`) umgeleitet — sieht nicht wie die Firma aus, bei der sie sich eigentlich anmelden wollte
- Die Formularsprache wechselt zwischen Deutsch/Englisch, ohne dass klar ist, wonach sich das richtet
- Der Button „Login with GY" hat keine Erklärung — sie weiß nicht, ob das für sie gedacht ist oder nicht
- Falls sie ihr Passwort vergisst: das Reset-Formular hat nur ein einziges Feld und keine weitere Anleitung
- Es gibt keinen sichtbaren „Neu hier? Zugang beantragen"-Weg — sie muss sich darauf verlassen, dass IT ihr vorher schon alles eingerichtet hat

## Technischer Kontext
- **Gerät:** Laptop (Firmengerät, erster Arbeitstag)
- **Browser:** Chrome, aktuelle Version
- **Bildschirmauflösung:** 1920 × 1080
- **Verbindung:** Büro-WLAN
- **Nutzungskontext:** Erster Login überhaupt, keine Vorerfahrung mit diesem konkreten System

## Erwartungen an die Anwendung
- Die Login-Seite sollte erkennbar zur Firma gehören, bei der sie sich anmelden will
- Es sollte klar sein, welche Login-Methode für sie gilt
- Sprache sollte vorhersagbar sein (idealerweise an ihre Browser-/Systemsprache angepasst)
- Passwort-Reset sollte verständlich erklären, was als Nächstes passiert

## Anmerkungen für den Test
- Wirkt der Login-Screen vertrauenswürdig, obwohl er auf einer fremden Domain liegt?
- Versteht Katrin ohne Erklärung, ob sie „Login with GY" oder das normale Formular nutzen soll?
- Ist ihr klar, in welcher Sprache das Formular gerade ist und wie sie es wechselt?
- Wie reagiert sie auf das knappe Passwort-Reset-Formular?
- **Nicht Teil dieses Tests:** alles, was nach einem erfolgreichen Login passiert — dafür fehlen echte Zugangsdaten (siehe Journey, Schritt 7–8).
