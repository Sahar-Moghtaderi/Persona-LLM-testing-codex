# Web Frontend Testing mit Codex CLI

Automatisiertes UI-Testing mit KI-gestützter Analyse. Codex navigiert durch deine Anwendung, führt User Journeys durch und dokumentiert alle gefundenen Probleme mit Screenshots.

*(Portiert von einer Claude-Code-Version dieses Projekts — siehe „Hinweis: Portierung von Claude Code" am Ende von `AGENTS.md`.)*

---

## Einmaliges Setup

### 1. Node.js installieren (falls noch nicht vorhanden)
Lade Node.js von https://nodejs.org herunter und installiere es (LTS-Version empfohlen).

### 2. Abhängigkeiten installieren
Öffne ein Terminal in diesem Ordner und führe aus:
```bash
npm install
npm run setup
```

### 3. Codex CLI installieren (falls noch nicht vorhanden)
```bash
npm install -g @openai/codex
```

### 4. Diesen Ordner als vertrauenswürdig einstufen
Beim ersten Start von `codex` in diesem Ordner fragt Codex, ob der Ordner vertrauenswürdig ist — **bestätigen**. Ohne diese Bestätigung wird `.codex/config.toml` (und damit der Playwright-MCP-Server) stillschweigend ignoriert, ohne Fehlermeldung. Details dazu stehen als Kommentar direkt in `.codex/config.toml`.

---

## Workflow: Test ausführen

### Schritt 1: Persona anlegen
- Öffne den Ordner `personas/`
- Kopiere `template-persona.md` und benenne die Kopie nach der Persona, z.B. `max-mustermann.md`
- Fülle alle Felder aus

### Schritt 2: User Journey anlegen
- Öffne den Ordner `journeys/`
- Kopiere `template-journey.md` und benenne die Kopie passend, z.B. `login-und-dashboard.md`
- Beschreibe jeden Schritt so präzise wie möglich

### Schritt 3: Codex starten
Öffne ein Terminal in diesem Ordner und starte Codex:
```bash
codex
```

### Schritt 4: Test starten
Sage Codex zum Beispiel:
> "Führe einen Test durch mit Persona max-mustermann und Journey login-und-dashboard"

oder

> "Teste https://meine-app.de mit der Persona max-mustermann und Journey login-und-dashboard"

Codex liest dann automatisch deine Dateien, öffnet den Browser, führt die Journey durch und erstellt einen Report.

### Schritt 5: Ergebnisse ansehen
- **Reports:** Im Ordner `reports/` findest du den Markdown-Report
- **Screenshots:** Im Ordner `screenshots/` findest du alle gemachten Screenshots

---

## Ordnerstruktur

```
web-frontend-testing/
├── personas/              # Deine Persona-Beschreibungen
│   └── template-persona.md
├── journeys/              # Deine User Journeys
│   └── template-journey.md
├── reports/               # Automatisch erstellte Testreports
├── screenshots/           # Automatisch gemachte Screenshots
├── testplans/             # Funktionale Testpläne (Pass/Fail)
├── AGENTS.md              # Anweisungen für Codex (nicht ändern)
├── prompts/               # Templates (Report-Format etc.)
├── .codex/config.toml     # Playwright-Konfiguration (nicht ändern)
└── README.md              # Diese Datei
```

---

## Warum Playwright (und nicht Chrome MCP)?

Wir verwenden den Playwright-MCP-Server, weil er Seitenelemente technisch identifiziert statt per Screenshot-Erkennung. Das macht Klicks zuverlässiger und Tests reproduzierbar, da jeder Lauf mit einem sauberen Browser ohne alte Cookies startet.

---

## Tipps für gute User Journeys

- **Sei konkret:** Statt "gehe zu den Einstellungen" schreibe "klicke auf das Zahnrad-Icon oben rechts"
- **Erwartungen definieren:** Was soll nach jedem Schritt auf dem Bildschirm zu sehen sein?
- **Testdaten angeben:** Wenn Login nötig ist, gib Testnutzer-Daten an
- **Edge Cases:** Beschreibe auch, was bei falschen Eingaben passieren soll

---

## Fehlerbehebung

**Codex kann den Browser nicht starten / findet Playwright nicht:**
→ Führe `npm install` und `npm run setup` erneut aus

**Der Playwright-MCP-Server taucht nicht auf (`codex mcp list` zeigt ihn nicht):**
→ Hast du den Ordner beim ersten Start als vertrauenswürdig bestätigt? Ohne das wird `.codex/config.toml` komplett ignoriert.
→ Falls das Vertrauen bestätigt ist und der Server trotzdem fehlt: manche Codex-Oberflächen lesen projekt-lokale `.codex/config.toml`-Dateien nicht zuverlässig (bekanntes Verhalten auf manchen Plattformen). Als Fallback denselben `[mcp_servers.playwright]`-Block aus `.codex/config.toml` in die globale `~/.codex/config.toml` einfügen.

**Screenshots werden nicht gespeichert:**
→ Stelle sicher, dass der `screenshots/` Ordner existiert
