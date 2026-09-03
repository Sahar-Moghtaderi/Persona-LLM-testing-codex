# Setup Guide — Running This Project on a New Machine

This is a step-by-step guide for getting this project running from a completely
clean machine (nothing pre-installed). The rest of the project's docs
(`README.md`, `AGENTS.md`) are in German and explain *how the testing workflow
works*; this guide only covers *getting it installed and running for the first
time*, in English.

Follow the steps in order — several of them fix problems that otherwise only
show up later, confusingly, in the middle of a test run.

## What you'll need before starting

- **Node.js** (LTS version) — almost certainly not installed yet on a fresh machine.
- **An OpenAI account** with either a ChatGPT Plus/Pro/Team/Business plan, or an OpenAI API key. This is what Codex uses to actually run.
- The project files themselves (however you received them — zip file, USB drive, shared drive, git clone, etc.).
- **Do not copy the `node_modules/` folder** if you received it along with the project — it contains OS-specific binaries and will not work if the new machine is a different OS (or sometimes even a different machine on the same OS). Delete it if present and reinstall fresh in Step 3.

---

## Step 1 — Install Node.js

Download the **LTS** version from https://nodejs.org and run the installer with default options.

Verify it worked by opening a new terminal and running:

```bash
node --version
npm --version
```

Both should print a version number. If either command is "not recognized" / "not found", close and reopen the terminal (PATH changes need a fresh terminal window), or restart the machine.

## Step 2 — Get the project onto the machine

Copy/extract the project folder anywhere you like. There's nothing special about its location. If you copied a `node_modules/` folder along with it, delete that folder now — it gets reinstalled correctly in the next step.

Open a terminal **inside the project folder** (the one containing `package.json`, `AGENTS.md`, `README.md`) for every command below.

## Step 3 — Install project dependencies

```bash
npm install
npm run setup
```

The first command installs the project's own dependencies. The second (`npm run setup`) downloads the Chromium browser binary that Playwright needs — it's a real browser download, so it can take a minute or two depending on your connection.

## Step 4 — Install the Codex CLI

```bash
npm install -g @openai/codex
```

Verify it worked:

```bash
codex --version
```

This should print something like `codex-cli 0.153.0` and the command should just work from any folder.

**Important gotcha:** if your colleague's machine already has the **ChatGPT desktop app** or a **"Codex" desktop app** installed, it comes with its own bundled `codex` command that looks identical but is a *different build* — it does **not** read this project's `.codex/config.toml`, so the Playwright browser tool this whole project depends on will silently be missing (no error — it just won't be there). Symptoms: `codex` runs fine and answers questions, but when asked to test anything, it has no browser tools at all.

If `codex --version` reports something *without* a plain version number like above (e.g. it mentions "alpha" or is clearly tied to a desktop app install path), or `npm install -g @openai/codex` didn't change what `codex --version` prints, run:

```bash
where codex        # Windows
which codex         # macOS/Linux
```

and make sure it points into your **npm global folder** (something like `...\npm\codex.cmd` or `.../npm/codex` — wherever `npm install -g` installs global packages on that machine), not into an app install directory like `...\OpenAI\Codex\...` or `...\WindowsApps\...`.

## Step 5 — Sign in to Codex

```bash
codex login
```

This opens a browser to sign in with your ChatGPT account. If the machine has no browser access (a remote/headless server), use `codex login --device-auth` instead, or `codex login --with-api-key` to authenticate with an OpenAI API key piped via stdin.

Check it worked:

```bash
codex login status
```

## Step 6 — First run: trust this folder

The very first time Codex runs *inside this specific project folder*, it will ask whether to trust it. **Say yes / confirm.** This is what makes Codex actually load `.codex/config.toml` and start the Playwright browser tool — without this confirmation, that file (and the browser tool) is silently ignored, with no error message anywhere.

```bash
codex
```

Just let it start up, confirm the trust prompt if one appears, then you can exit (Ctrl+C or type `exit`) — you don't need to do anything else in this session.

If you don't get a trust prompt and browser tools still seem to be missing later, see **Troubleshooting** below — there's a known fallback for this.

## Step 7 — Set up your target app's URL and credentials

Create a new file named `.env` in the project root (same folder as `package.json`). It's read directly by the agent when it needs a URL or login, so plain, clearly-labeled lines are enough — for example:

```
URL=https://your-app-under-test.example.com
LOGIN_EMAIL=testuser@example.com
LOGIN_PASSWORD=your-test-password
```

Adjust the values for whatever application you're actually testing. This file is intentionally left out of version control (see `.gitignore`) since it holds real credentials — never share it or commit it.

## Step 8 — Run your first test

Two ways to run it:

**A) Interactive (recommended for a first try)** — you'll see and approve each browser action as it happens:

```bash
codex
```

Then type something like:

> Führe einen Test durch mit Persona katrin-vogel und Journey katrin-vogel

(or `nadine-krueger` instead of `katrin-vogel` — both are existing example personas/journeys already in the `personas/` and `journeys/` folders. `nadine-krueger`'s journey targets `http://localhost:5173`, so it only works if that app is actually running locally; `katrin-vogel`'s journey targets a real public URL and needs no local server.)

**B) Non-interactive, fully automated** (no approval prompts) — useful for scripting, but it also means nothing stops the agent to ask permission mid-run, so only use this once you trust what it's going to do:

```bash
codex exec --skip-git-repo-check --approve-for-me "Führe einen Test durch mit Persona katrin-vogel und Journey katrin-vogel"
```

(`--skip-git-repo-check` is only needed because this project folder isn't a git repository; `--approve-for-me` auto-approves tool actions instead of asking, while still keeping the sandbox restricted to this project's own folder.)

## Step 9 — Check the results

- **`reports/`** — the written test report (Markdown for persona/UX tests, HTML for testplan/functional tests).
- **`screenshots/`** — every screenshot taken during the run.

---

## Troubleshooting

**`codex` / `node` / `npm`: command not found**
Node.js isn't installed, or you need to open a *new* terminal window after installing it.

**Codex runs and answers, but has no browser/Playwright tools at all**
The folder was never "trusted" (Step 6), or `codex` is resolving to a desktop-app-bundled build instead of the real CLI (see the gotcha in Step 4). As a fallback if trust genuinely won't stick on this machine (this can happen on some platforms/installs), add this same block to the **global** `~/.codex/config.toml` (create the file if it doesn't exist) instead of relying on the project-local one:

```toml
[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest"]
```

**Error: `MCP tool call requires approval, but approval policy is never`**
This happens only with `codex exec` (non-interactive mode). Add `--approve-for-me` (see Step 8B), or just use plain interactive `codex` (Step 8A) and approve the action when asked.

**Something about this not being a git repository**
Only matters for `codex exec`; add `--skip-git-repo-check`. Plain interactive `codex` doesn't care either way.

**Screenshots aren't being saved**
Make sure the `screenshots/` folder exists in the project root.

**Playwright / browser fails to launch at all**
Re-run `npm run setup` — it re-downloads the Chromium binary Playwright needs.
