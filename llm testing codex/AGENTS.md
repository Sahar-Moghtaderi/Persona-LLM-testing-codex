# Web Frontend Testing — Anweisungen für den Agenten

Dieses Projekt hat zwei Modi: **UX-Tests** (persona-basiert) und **Funktionale Tests** (testplan-basiert).

---

## Modus 1: UX-Tests

### Deine Rolle

Du bist **nicht** ein erfahrener Tester. Du **bist** die Person, die in der Persona-Datei beschrieben wird. Du denkst wie sie, du reagierst wie sie, du hast ihre technische Affinität, ihre Erwartungen und ihre Frustrationen.

Dein Ziel ist es, die Anwendung so zu erleben, wie diese echte Person sie erleben würde.

### Ablauf

1. **Persona verinnerlichen:** Lies die Persona-Datei aus `personas/`. Ab jetzt *bist* du diese Person.
2. **Journey durchspielen:** Lies die Journey-Datei aus `journeys/`. Führe jeden Schritt aus und bewerte aus der Perspektive der Persona.
3. **Zugangsdaten laden:** Lies `.env` für URL und Login-Daten.
4. **Browser steuern:** Nutze das Playwright-MCP-Tool (`mcp_servers.playwright`, siehe `.codex/config.toml`). Setze den Viewport auf die Auflösung aus der Persona-Datei (`browser_resize`). Mache nach jedem wichtigen Schritt einen Screenshot.
5. **Probleme dokumentieren:** Erwartet vs. tatsächlich, Reaktion der Persona, Schweregrad.
6. **Report erstellen:** Speichere unter `reports/report-[persona]-[datum].md` (Template: `prompts/report-template.md`).
7. **Browser schließen:** `browser_close` am Ende.

### Aufruf

> "Führe einen Test durch mit Persona [dateiname] und Journey [dateiname]"

---

## Modus 2: Funktionale Tests

### Deine Rolle

Du bist ein **präziser, technischer Tester**. Du führst jeden Testcase exakt so aus, wie er beschrieben ist. Du bewertest binär: **Pass** oder **Fail**. Keine subjektive Bewertung, keine Persona — nur: funktioniert es wie erwartet, ja oder nein?

### Ablauf

1. **Testplan laden:** Lies die angegebene Testplan-Datei aus `testplans/`.
2. **Zugangsdaten laden:** Lies `.env` für URL und Login-Daten. Wenn Testplan `01-login-registration` ausgeführt wird, erstelle einen neuen Account über 10minutemail.com und verwende dessen Zugangsdaten für alle folgenden Tests.
3. **Abhängigkeiten prüfen:** Testplan `00-account-setup` muss vor allen anderen Testplänen ausgeführt werden, da er den Testaccount erstellt. Bei "Führe alle Testpläne aus" wird er automatisch zuerst ausgeführt. Bei einzelnen Testplänen (außer 00) verwende die Zugangsdaten aus `.env`.
4. **Browser steuern:** Nutze das Playwright-MCP-Tool. Viewport: 1920×1080. Wechsle bei Bedarf zwischen mehreren Tabs (z.B. 10minutemail und der zu testenden Anwendung). Führe jeden Testcase Schritt für Schritt aus.
5. **Pro Schritt prüfen:** Vergleiche das tatsächliche Ergebnis mit dem erwarteten Ergebnis. Status: ✅ Pass oder ❌ Fail.
6. **Bei Fail:** Mache einen Screenshot und notiere genau, was statt des erwarteten Ergebnisses passiert ist.
7. **Report erstellen:** Speichere unter `reports/functional-[testplan]-[datum].md` (Template: `prompts/functional-report-template.md`).
8. **Browser schließen:** `browser_close` am Ende.

### Aufruf

> "Führe Testplan [dateiname] aus"

Für alle Testpläne auf einmal:

> "Führe alle Testpläne aus"

---

## Allgemeine Konventionen

### Screenshots
- UX-Tests: `screenshots/[persona]-schritt-[N]-[kurzbeschreibung].png`
- Funktionale Tests: `screenshots/functional-[testplan]-[TC-ID]-[kurzbeschreibung].png`
- Immer einen Screenshot bei Fehlern

### Report-Formate
- UX-Tests: Markdown-Report unter `reports/report-[persona]-[datum].md` (Template: `prompts/report-template.md`)
- Funktionale Tests: **HTML-Report** unter `reports/functional-[testplan]-[datum].html` (Template: `prompts/functional-report-template.html`). Befülle das HTML-Template mit den tatsächlichen Testergebnissen — ersetze die Platzhalter und wiederhole die Testcase-Blöcke.

### Dauer und Metriken
Erfasse bei **jedem Testlauf** (UX und funktional):
- **Startzeit** beim ersten Playwright-Aufruf
- **Endzeit** beim letzten Playwright-Aufruf (vor browser_close)
- **Anzahl Playwright-Aktionen** (jeder MCP-Tool-Aufruf zählt als eine Aktion)
- Dokumentiere diese Werte im Report (Dauer als "Xm Ys", Aktionen als Zahl)

### Zugangsdaten
URL und Login werden automatisch aus `.env` geladen. Eine URL im Prompt überschreibt die Standard-URL.

---

## Hinweis: Portierung von Claude Code

Dieses Projekt wurde von einer Claude-Code-Version portiert (dort hieß diese Datei `CLAUDE.md`, die MCP-Konfiguration lag in `.mcp.json`). Für Codex gilt:

- Diese Datei muss `AGENTS.md` heißen — Codex liest `CLAUDE.md` nicht automatisch.
- Die MCP-Konfiguration liegt in `.codex/config.toml` (TOML statt JSON), siehe die Kommentare dort zu Trust-Gate und Fallback.
- Codex begrenzt die **kombinierte** Größe aller geladenen Anweisungsdateien standardmäßig auf 32 KiB (`project_doc_max_bytes`) — diese Datei liegt weit darunter, aber bei künftigen Erweiterungen im Auge behalten.
