# Test Report: Nadine Krüger — 2026-08-28 (Case 3)

## Summary
- **Journey tested:** Analyse and close an exception case (`nadine-krueger-journey.md`), with step 2 deviating to use **Case 3** instead of Case 1
- **URL:** http://localhost:5173
- **Date:** 2026-08-28
- **Persona:** Nadine Krüger, 38, Clerk for Market Communication / Invoice Verification (`nadine-krueger-persona.md`)
- **Test case:** Case 3: Rejection of a supply-start registration due to a registration already in progress (NB-UTILMD-2026-1001, UTILMD, error code A06, EBD E_0622)
- **Result:** ⚠️ Passed with issues
- **Duration:** 5m 33s (10:47:39 – 10:53:12)
- **Playwright actions:** 34 (1 of them failed — see Issue 5)
- **Viewport:** 1920 × 1080 (per persona)

### Starting conditions
Case 3 was available as an **open** case at the start of the test and was the only open case in the list, so it could be selected directly as requested.

### Comparison with the previous run
This run surfaces partly **different** findings than the run with Case 4 (REMADV) — several issues suspected there to be fundamental turn out to be specific to the case or message type. The differences are summarised under „Corrections and refinements" at the end.

---

## Overall impression from the persona's perspective

This case felt considerably better to me than the last one. This time the decision path actually shows me a *route*: lead time checked ✓, market location checked ✓, and then it fails at step 70 ✗ — I could explain that to a colleague without opening the handbook. And the „Fachliche Ansicht" was finally what its name promises: „MP-ID Absender", „MaBiS-Zählpunkt", „Status der Antwort". There I know what I'm looking at. The source reference was complete too this time — page 72, PDF index 71 — so I can cross-check.

What really annoyed me: at exactly the point that is supposed to tell me what *I* have to check, it said „Konkreter Prüfschritt 1" and „Konkreter Prüfschritt 2". And below that „Fehlende Information 1", „Fehlende Information 2". That isn't text, those are blanks. If I'm supposed to rely on an explanation like that while my name is on the case, it is simply unusable.

And then the thing that worries me most: I started an analysis and, because the phone rang and I wanted to look something up quickly, clicked on a different case in between. Afterwards the top said Case 1 and the bottom still showed the decision path from Case 3. **Two different cases on one screen, with no warning at all.** That is exactly how I make the kind of mistake I have to answer for. I'm interrupted constantly — this will definitely happen to me again.

Closing the case was then the same as last time: clicked, case gone, no confirmation, and it still says „Analysiert" at the top.

**Would I use the tool again?** For the analysis, yes — the decision path is genuinely good. But after every case switch I would suspiciously check whether the right case is still shown at the bottom.

---

## Issues found

### Issue 1: Switching cases during a running analysis produces mixed case data
- **Severity:** Critical
- **Step:** Edge case (journey: „What happens if another case is clicked during a running analysis?")
- **Expected:** Either the switch is blocked, the running analysis is cancelled, or all areas move to the new case together.
- **Actual:** After clicking „Analysieren" (Case 3) and immediately clicking Case 1, a **persistent mixed state** results:
  - EDIFACT Input: **Case 1** (`REMADV-2026-1001`, `AJT+A09+E_0406`)
  - KI Erklärung: **Case 1** (code A09, „Rechnungsnummer wurde bereits verwendet")
  - Prüfpfad (decision path): **still Case 3** („Vollständiger Prüfpfad für **E_0622**", check steps 15/18/70, code **A06**, „ruhende Marktlokation")

  Even after waiting 20 seconds the state did **not** resolve. There was no error message, no notice, no loading state.
- **Scoped down:** Switching cases **without** a running analysis (Case 1 → Case 2) updates the decision path correctly and completely (E_0407, check steps 19–26). The fault therefore occurs specifically when switching **during** a running analysis.
- **Persona's reaction:** The most dangerous finding for this persona. Per the persona description she works „several cases in a row between other tasks (phone, email) – is frequently interrupted". She would read the explanation for Case 1 and treat the decision path from Case 3 as belonging to it — deriving an incorrect business decision without noticing anything.
- **Screenshots:** ![](../screenshots/nadine-krueger-fall3-edgecase-fallwechsel-lauf2.png) · ![](../screenshots/nadine-krueger-fall3-edgecase-fallwechsel-danach-lauf2.png) · ![](../screenshots/nadine-krueger-fall3-edgecase-fallwechsel-fall2-lauf2.png)

### Issue 2: Placeholder text instead of content in the AI explanation
- **Severity:** Critical
- **Step:** Step 5
- **Expected:** Concrete, case-specific check points Nadine can work through.
- **Actual:** In the „KI Erklärung" panel, two headings contain nothing but unfilled template placeholders:
  - „Prüfpunkte fuer die Sachbearbeitung": **„Konkreter Prüfschritt 1"**, **„Konkreter Prüfschritt 2"**
  - „Fehlende Informationen": **„Fehlende Information 1"**, **„Fehlende Information 2"**
- **Spread:** Reproduced on **Case 3, Case 1 and Case 2**. On Case 4 (previous run) these sections contained real content. The defect therefore affects the majority of cases but is not universal.
- **Persona's reaction:** „This is the section that's supposed to tell me what to check — and it contains placeholders." Precisely her goal („to have concrete, actionable next steps at the end of every case") is missed here. Saving grace: the „Manuelle Prüfungen" block in the decision-path panel does contain the real content — but she has to find it first.
- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-5-ki-erklaerung-lauf2.png)

### Issue 3: No feedback on closing — status does not update (reproduced)
- **Severity:** Critical
- **Step:** Step 8
- **Expected:** Clear confirmation; the status tile switches to „Geprüft".
- **Actual:** As in the previous run: **no toast, no confirmation**. The case disappeared from „Offene Fälle" (empty list with „Mit ‚Aktualisieren' werden Fälle geladen."). The status tile remained on **„Analysiert"**. Only switching the filter revealed Case 3 under „Geprüfte Fälle" with „· Geprüft".
- **Refinement over the previous run:** The status **„Geprüft" does exist and is displayed correctly** — it appeared when the already-reviewed Case 1 was loaded afterwards. The tile therefore reflects the case status but is **not refreshed after clicking „Als geprüft markieren"**. This is a missing refresh, not a missing status.
- **Persona's reaction:** „I clicked, the case is gone, and it still says ‚Analysiert' up there. Is it closed now?" Still the biggest breach of trust in the whole flow.
- **Screenshots:** ![](../screenshots/nadine-krueger-fall3-schritt-8-abschluss-lauf2.png) · ![](../screenshots/nadine-krueger-fall3-schritt-8b-geprueft-liste-lauf2.png)

### Issue 4: Contradictory check result („ja" vs. „nein") — reproduced
- **Severity:** Critical
- **Step:** Step 4 / Step 6
- **Expected:** A consistent statement.
- **Actual:** For the same check step 70 / code A06:
  - „Gefundene EBD Einträge": „Prüfschritt: 70 · **Prüfergebnis: ja**"
  - Decision-path node: „**Ergebnis: nein**"; „Details zum aktuellen Fehlerpunkt": „**Prüfergebnis: nein**"
- **Significance:** Since this contradiction appears identically on Case 4 (REMADV/Z40) **and** Case 3 (UTILMD/A06), it is **systematic** and not case-specific.
- **Additionally confusing:** The node asks „Liegt für diese Marktlokation bereits eine gerade in Arbeit befindliche und noch nicht beantwortete Anmeldung vor?" (Is there already a registration in progress and not yet answered for this market location?) and answers „Ergebnis: **nein**" — with a red ×. Professionally the exact opposite is true: there *is* another registration, and that is the reason for rejection. The displayed answer contradicts the tool's own error text „Andere Anmeldung in Bearbeitung".
- **Persona's reaction:** „It says ‚no', but the error says precisely that another registration is running. So which is it?" She can no longer use the decision path as evidence.
- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-6-pruefpfad-lauf2.png)

### Issue 5: „Als geprüft markieren" button blocks the section header — reproduced
- **Severity:** Medium
- **Step:** Step 4
- **Expected:** The „Erkannte Nachricht" section can be expanded via its header.
- **Actual:** Identical to the previous run: clicking the header failed reproducibly (Playwright: „subtree intercepts pointer events") because the button sits on top of it. Only a click on the text at the far left worked. Grey text on a dark background still makes the button look disabled even though it is active.
- **Persona's reaction:** „Why won't this open?" — and later, uncertainty about whether the button is clickable at all.
- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-4-ebd-treffer-lauf2.png)

### Issue 6: Error symbol covers the result text in the decision path
- **Severity:** Medium
- **Step:** Step 6
- **Expected:** Symbol and text are both fully legible.
- **Actual:** In the red error node (check step 70) the red × badge sits **on top of** the line „Ergebnis: nein" — only „Ergeb…: nein" remains readable with the symbol in the middle. On the green ✓ nodes the badge sits cleanly below the box; the overlap occurs only on the error node.
- **Persona's reaction:** The information on the single most important node — the only one with an error — is partly obscured.
- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-6-pruefpfad-lauf2.png)

### Issue 7: „Vollständiger Prüfpfad" (complete decision path) is not complete
- **Severity:** Medium
- **Step:** Step 6
- **Expected:** Either all check steps, or an honest label.
- **Actual:** The heading reads „**Vollständiger** Prüfpfad für E_0622 - Ablehnung", but only steps **15, 18 and 70** are shown. The gaps (1–14, 16–17, 19–69) go unexplained. The legend also lists „○ Nicht geprüft (nach Fehler)" — a symbol that does not appear in the tree at all.
- **Assessment:** For Nadine's way of working the abbreviation is **right** (she does not have to read 27+ steps) — only the label misleads. Better: „Durchlaufener Prüfpfad" (path taken) or „Relevante Prüfschritte" (relevant check steps).
- **Persona's reaction:** „If this is complete — where are steps 16 and 17? Did I miss something?"
- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-6-pruefpfad-lauf2.png)

### Issue 8: „Letzte Analyse: Jetzt" (last analysis: now) even without an analysis having run
- **Severity:** Medium
- **Step:** Step 2
- **Expected:** An honest timestamp of when the displayed result was produced.
- **Actual:** Merely **selecting** Case 3 — before any click on „Analysieren" — already populated all results (status „Analysiert", 1 EBD hit, full decision path) and the tile reported „Letzte Analyse: **Jetzt** — Erfolgreich durchgeführt". The result came from an earlier run. The same effect occurred when loading Case 1 and Case 2.
- **Persona's reaction:** „Jetzt" (now) suggests a fresh, same-day result. Nadine needs to be able to tell whether she is looking at a stored result from yesterday or a fresh analysis — precisely because master data can change in the meantime.
- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-2-fall-ausgewaehlt-lauf2.png)

### Issue 9: Starting an analysis visibly discards all existing results
- **Severity:** Low
- **Step:** Step 3
- **Expected:** The previous result stays visible until the new one is ready.
- **Actual:** Clicking „Analysieren" immediately clears every display — EBD entries back to „0", KI Erklärung „-", Letzte Analyse „Noch nicht durchgeführt", decision path empty — and they stay that way for the full analysis duration (~18 s). The case highlight in the list is also lost.
- **Persona's reaction:** If she clicks „Analysieren" by accident while only wanting to re-read something, her result is gone for 18 seconds. Combined with the subtle loading indicator, this looks like a failure.
- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-3-ladeanzeige-lauf2.png)

### Issue 10: EDIFACT syntax inside a business check question
- **Severity:** Low
- **Step:** Step 6
- **Expected:** Check questions in everyday language.
- **Actual:** Check step 18 reads: „Handelt es sich bei der ‚ruhenden Marktlokation' **(SG5 LOC+Z22)** im System des Empfängers um eine verbrauchende Marktlokation?" The segment reference sits uncommented in running text. Similarly in the AI explanation: „Fehlercode A06 gemäß **E_0622_STEP-70**".
- **Persona's reaction:** „I understand ‚dormant market location'. But SG5 LOC+Z22 means nothing to me — am I supposed to know that?" The question stays answerable but feels needlessly technical.
- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-6-pruefpfad-lauf2.png)

### Issue 11: Developer language in the result text — reproduced
- **Severity:** Low
- **Step:** Step 7
- **Expected:** Professional language appropriate to a production case.
- **Actual:** Under „Produkt Guidance": „Der ENER:GY-**Mock** soll aktuelle Lieferantenzuordnung … bereitstellen", „Nach der **simulierten** Bereinigung wird die aktuelle Anmeldung nur auf **ready_for_reprocessing** gesetzt."
- **Persona's reaction:** As in the previous run: „Mock? Simulated? And what is ready_for_reprocessing?" The English system identifier is new here and even more out of place.
- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-6-pruefpfad-lauf2.png)

### Issue 12: EDIFACT field pre-filled at startup — reproduced
- **Severity:** Low
- **Step:** Step 1
- **Actual:** Again the APERAK sample message (`UNH+1+APERAK:D:96A:UN'BGM+ZZZ+4711'ERC+A01…`) sits in the input field right after loading, unrelated to any of the cases.
- **Screenshot:** ![](../screenshots/nadine-krueger-fall3-schritt-1-uebersicht-lauf2.png)

---

## Positive findings

These points worked **better** on Case 3 than in the previous run and should serve as the reference:

| Element | Observation |
|---------|-------------|
| **Fachliche Ansicht** | Fully translated for UTILMD: „Nutzdaten-Kopfsegment" (UNB), „Nachrichten-Kopfsegment" (UNH), „Beginn der Nachricht" (BGM), „MP-ID Absender/Empfänger" (NAD), „Vorgang" (IDE), „Status der Antwort" (STS), „MaBiS-Zählpunkt" (LOC) — including group headings. Exactly what Nadine needs. |
| **Decision path** | 4 nodes with a traceable route (Start → 15 ✓ → 18 ✓ → 70 ×). The legend fits here because ✓ and × actually occur. Failure point graspable without scrolling. |
| **Source reference** | „Quelle: Seite 72 / **PDF Index 71**" — complete. Confirms that the empty index on Case 4 was a data gap on Z40, not a display fault. |
| **Manuelle Schritte** | 6 steps, imperative and addressed directly to the clerk („korrigiere…", „Entferne…", „Setze…", „übergib…"). Considerably more actionable than on Case 4. The target system is still not named. |
| **Case switching (without analysis)** | Switching Case 1 → Case 2 updates all areas correctly and consistently. |

---

## Steps performed

| Step | Description | Status | Note |
|------|-------------|--------|------|
| 1 | Open the overview | ⚠️ | Loads fast, Case 3 visible as the only open case. EDIFACT field again pre-filled with the sample message (Issue 12). Console: only the 404 on `favicon.ico`. |
| 2 | Select Case 3 | ⚠️ | UTILMD + original UTILMD + context are loaded, case highlighted in orange. But: a complete analysis result from an earlier run appears immediately, reported as „Letzte Analyse: Jetzt" (Issue 8). |
| 3 | Analyse the case | ⚠️ | Analysis runs ~18 s, status „Prüft" with spinner, then correctly **„Analysiert"**. But: all displays are cleared during the analysis (Issue 9). |
| 4 | Review EBD hits & business view | ⚠️ | EBD hit complete and readable (code A06, EBD E_0622, role NB, check step 70, cluster, **complete source**). Fachliche Ansicht genuinely business-oriented this time ✅. But: „Erkannte Nachricht" not expandable via its header (Issue 5); check result contradictory (Issue 4). |
| 5 | Read the AI explanation | ❌ | „Was ist passiert?", „Fachliche Bedeutung" and „Warum wurde abgelehnt?" are good and understandable. But both action-oriented sections contain pure **placeholder text** (Issue 2). |
| 6 | Follow the decision path | ✅ | Clearly structured path, failure point immediately recognisable, legend appropriate. Caveats: × symbol covers text (Issue 6), misleading „Vollständiger Prüfpfad" heading (Issue 7), contradictory result (Issue 4). |
| 7 | Evaluate the manual steps | ✅ | 6 imperative steps addressed directly to the clerk — considerably better than on Case 4. Target system remains open; „Produkt Guidance" contains developer language (Issue 11). |
| 8 | Mark the case as reviewed | ❌ | Technically successful (Case 3 appears under „Geprüfte Fälle" with „· Geprüft"), but with no feedback; status tile stays on „Analysiert" (Issue 3). |

### Edge cases tested

| Edge case | Result | Note |
|-----------|--------|------|
| **Case switch during a running analysis** | ❌ | Persistent mixed state of two cases, with no warning (Issue 1). |
| Case switch without a running analysis | ✅ | All areas switch correctly and consistently (Case 1 → Case 2, decision path E_0407 with 6 nodes). |
| Analysis with an empty EDIFACT field | ➖ | Not retested in this run — passed in the previous run (clear message „Bitte zuerst eine EDIFACT-Nachricht einfügen."). |
| Case with no EBD hit (0 results) | ➖ | Not tested, no suitable test case available. |
| Pasting a custom EDIFACT message manually | ➖ | Not tested. |

---

## Success criteria

| Criterion | Met? | Note |
|-----------|------|------|
| Nadine gets from the case list to a complete analysis result without any introduction | ✅ | 2 clicks, result after ~18 s. |
| She could restate the rejection reason in her own words | ✅ | „The supply-start registration was rejected because another registration is already being processed for the same market location." — clear from „Business Meaning" and the decision path. |
| She could name at least one concrete next step | ✅ | From „Manuelle Prüfungen": „Identify all open and recently completed supply-start registrations for the market location and compare transaction reference, process instance ID, supplier and requested supply start." Met — although **not** via the section intended for it in the AI explanation (Issue 2). |
| The closure is unambiguous and beyond doubt | ❌ | Clearly missed (Issue 3). |
| No critical errors or incomprehensible error messages | ❌ | No crashes, but: mixed case data with no warning (Issue 1), placeholder text (Issue 2) and contradictory check results (Issue 4). |

**Journey verdict:** 3 of 5 success criteria met, 2 missed.

---

## Recommendations

**Immediately:**
1. **Make case switching safe during a running analysis:** Either block the switch while the analysis runs, cancel the running analysis, or reset all panels together. Under no circumstances may data from two cases be displayed at once. Additionally: label every result panel with the case identifier (e.g. „Prüfpfad — NB-UTILMD-2026-1001") so a mismatch is immediately obvious.
2. **Eliminate placeholder text:** „Konkreter Prüfschritt 1/2" and „Fehlende Information 1/2" must not ship. If no content is available, omit the section rather than showing dummy text.
3. **Add closing feedback and refresh the status:** A toast on clicking „Als geprüft markieren" and a reload of the case status. The „Geprüft" status already exists — it simply isn't refreshed.
4. **Resolve the check-result contradiction:** Systematic across all cases: the EBD hit says „ja", the decision path says „nein". On Case 3 the display additionally contradicts the business reality (the other registration *does* exist).

**Short term:**
5. **Extend segment translation to REMADV:** The „Fachliche Ansicht" works exemplarily for UTILMD but shows only raw abbreviations for REMADV. Apply the existing translation logic to the remaining message types (and add `UNA:`).
6. **Correct the decision-path heading:** „Vollständiger Prüfpfad" → „Durchlaufener Prüfpfad" or „Relevante Prüfschritte". Show only the symbols that actually occur in the legend.
7. **Fix the overlap on the error node:** The × badge must not cover the „Ergebnis: …" line — position it below the box, as on the green nodes.
8. **Detach the closing button from the section header** (see Issue 5) and give it proper contrast.
9. **Make the timestamp honest:** „Letzte Analyse: Jetzt" only for an analysis actually run in this session; otherwise show the stored timestamp (e.g. „28.08.2026, 10:12") and mark stored results as such.

**Medium term:**
10. **Keep results visible during the analysis** and overlay them with a „updating…" state instead of clearing them.
11. **Remove developer language:** „Mock", „simuliert", „ready_for_reprocessing".
12. **Name the target system in the manual steps** (where exactly is the technical status corrected?).
13. **Move segment references such as „SG5 LOC+Z22"** out of check questions into a tooltip or a technical detail line.
14. **Add tooltips for domain terms** — for this case especially „Ablehnung auf Kopfebene" (seen on Case 2), „Cluster", „Rolle NB", „MaBiS-Zählpunkt".

---

## Corrections and refinements versus the Case 4 run

This run corrects three findings from `report-nadine-krueger-2026-08-28-lauf2.md` (English: `report-nadine-krueger-2026-08-28-lauf2-en.md`):

| Earlier finding | Refinement after this run |
|-----------------|---------------------------|
| „Fachliche Ansicht is not a business view" (Critical) | Applies **only to REMADV**. For UTILMD it is fully translated and good. It is a gap in the segment translation for REMADV, not a general feature deficiency. |
| „The status tile has no result status" | Incorrect. The statuses „Analysiert" and „Geprüft" both exist and display correctly. The problem is solely the **missing refresh** after clicking „Als geprüft markieren". |
| „Incomplete source reference (PDF Index -)" | Affects **only the Z40 record**. Case 3 provides „Seite 72 / PDF Index 71" in full. A data-maintenance matter, not a display fault. |

Confirmed unchanged (systematic across both message types): missing closing feedback, check-result contradiction, button overlap, „mock" language, pre-filled EDIFACT field.

---

## Note on the test environment
After this run **all four cases** are marked „Geprüft" again. Case 3 additionally received an extra analysis from the edge-case test. For further test runs the case statuses must be reset.
