# Test Report: Nadine Krüger — 2026-08-28 (Run 2)

## Summary
- **Journey tested:** Analyse and close an exception case (`nadine-krueger-journey.md`)
- **URL:** http://localhost:5173
- **Date:** 2026-08-28
- **Persona:** Nadine Krüger, 38, Clerk for Market Communication / Invoice Verification (`nadine-krueger-persona.md`)
- **Result:** ⚠️ Passed with issues
- **Duration:** 7m 43s (10:17:31 – 10:25:14)
- **Playwright actions:** 57 (3 of them failed — see Issue 1)
- **Viewport:** 1920 × 1080 (per persona)

### Deviation from the journey
The journey names „Case 1: First negative REMADV for the grid usage invoice" as the test case. At the start of the test this case was already marked **„Geprüft" (reviewed)** from earlier test runs, as were Case 2 and Case 3. The only open case was **„Case 4: BEW Netze – MMM Strom / Reverse Charge missing" (NB-REMADV-2026-1003)** — also a rejected REMADV case. The journey was therefore run with Case 4; the journey goal (select an open REMADV case, analyse it, understand it, close it) is unchanged.

---

## Overall impression from the persona's perspective

I opened the application with no introduction and genuinely got from an open case to an analysis result in under a minute — that's the big plus. The decision path in particular surprised me positively: I did **not** have to scroll through 27 steps; the failure point (Z40) was right there, marked in red. And being able to look up code Z40 afterwards in „EBD-Wissen" and cross-check it gives me confidence — that's exactly what I've always missed with the PDF handbook.

What really bothers me though: when I finally clicked „Als geprüft markieren" (mark as reviewed), the case **disappeared from my list without a word** and the top of the screen still said „Status: Offen" (open). I had to switch the filter just to confirm it had worked at all. When my name is on the case at the end of the day, I can't afford that — in case of doubt I would have processed the case a second time.

On top of that: the „Fachliche Ansicht" (business view) is completely useless to me — it just lists the abbreviations UNB, BGM, NAD, MOA underneath each other, the same text twice, without a single plain-language word. And in the result text I read things like „Der ENER:GY-**Mock** stellt Rechnung … bereit" and „Pruefpunkte fuer die Sachbearbeitung" without umlauts — that looks unfinished and makes me doubt whether the information is real. But what unsettled me most was seeing „Prüfergebnis: ja" in one place and „Prüfergebnis: nein" in another for the same case.

**Would I use the tool again?** Yes — it is considerably faster than the PDF. But I would cross-check every result in „EBD-Wissen" and be unsure with every closure whether the case is really done.

---

## Issues found

### Issue 1: No feedback on closing — case disappears, status stays „Offen"
- **Severity:** Critical
- **Step:** Step 8
- **Expected:** A clear confirmation that the case is closed; the status visibly changes to „reviewed".
- **Actual:** After clicking „Als geprüft markieren" **no confirmation and no toast** appeared. The status tile at the top still read **„Offen"**. The case vanished from the „Offene Fälle" list, which was then empty with the note „Mit ‚Aktualisieren' werden Fälle geladen." Only after manually switching the filter to „Geprüfte Fälle" was it visible that Case 4 had landed there with the suffix „· Geprüft". (The button is correctly disabled afterwards — but that is the only indication, and it is barely noticeable in the dark header.)
- **Particularly striking:** The app **does** support toast messages — the empty-field edge case produced a clean „Bitte zuerst eine EDIFACT-Nachricht einfügen." The mechanism just isn't used for the single most important confirmation.
- **Persona's reaction:** Unsettled. „Is the case closed now, or did I delete it? It still says ‚Offen' up there." She would search for the case again and possibly process it twice — exactly the pain point „uncertainty about whether I closed the case correctly".
- **Screenshots:** ![](../screenshots/nadine-krueger-schritt-8-abschluss-lauf2.png) · ![](../screenshots/nadine-krueger-schritt-8b-geprueft-liste-lauf2.png)

### Issue 2: Contradictory check result („ja" vs. „nein") for the same case
- **Severity:** Critical
- **Step:** Step 4 / Step 6
- **Expected:** A consistent statement of how the check turned out.
- **Actual:** For the same check step 0 / code Z40, two opposing values appear on one screen:
  - „Gefundene EBD Einträge": **Prüfergebnis: ja** (check result: yes)
  - Decision-path node: „Ergebnis: **nein**" and „Details zum aktuellen Fehlerpunkt": **Prüfergebnis: nein**

  Cross-checking in „EBD-Wissen" also shows **„Prüfergebnis: ja"** for Z40 — so the discrepancy originates in the decision-path rendering.
- **Additionally confusing:** The node asks „Fehlt die Reverse-Charge-Anwendung oder ist sie unzulässig?" (Is the reverse-charge application missing or invalid?) and answers „Ergebnis: nein" — with a red ×. If nothing is missing, why is it an error? A clerk cannot resolve that logic.
- **Persona's reaction:** Loss of trust. „So which value is right? If the tool contradicts itself on a simple yes/no, I can't rely on it."
- **Screenshots:** ![](../screenshots/nadine-krueger-schritt-6-pruefpfad-lauf2.png) · ![](../screenshots/nadine-krueger-ebd-wissen-z40-lauf2.png)

### Issue 3: „Fachliche Ansicht" is not a business view but a raw segment list
- **Severity:** Critical
- **Step:** Step 4
- **Expected:** Per the journey, „error code, affected role, check step and an understandable short description" — i.e. a translation of the message into everyday language.
- **Actual:** The section lists 18 EDIFACT segment abbreviations underneath each other (`UNA:`, `UNB`, `UNH`, `BGM`, `DTM`, `RFF`, `NAD`, `NAD`, `CUX`, `DOC`, `MOA`, `MOA`, `DTM`, `AJT`, `UNS`, `MOA`, `UNT`, `UNZ`) — each one **twice** (blue badge + identical text next to it), with no plain-language label. Expanding an entry only reveals the raw line, e.g. `AJT+Z40+GS_002`. Not a single plain-language word in the entire section.
- **Persona's reaction:** „What am I supposed to do with this? I know EDIFACT from daily work, but not the syntax. Why doesn't it say ‚invoice number', ‚sender', ‚amount'?" She skips the section and relies exclusively on the AI explanation — which removes her ability to cross-check against the message itself.
- **Screenshots:** ![](../screenshots/nadine-krueger-schritt-4-fachliche-ansicht-lauf2.png) · ![](../screenshots/nadine-krueger-schritt-4-segment-ajt-lauf2.png)

### Issue 4: „Manuelle Schritte" are addressed to the system, not to the clerk
- **Severity:** Medium
- **Step:** Step 7
- **Expected:** A numbered set of instructions Nadine can act on directly.
- **Actual:** The three steps are written from the assistant system's point of view and refer to Nadine in the third person:
  1. „If the supplier is not to be classified as a reseller, hand the case over for business clarification without changes."
  2. „If **the user** explicitly confirms the classification, **propose** retrieving and storing the USt-1-TH certificate for approval."
  3. „After successful storage, read the certificate status … again."

  Nadine *is* the user — so step 2 tells someone else what to propose to her. Throughout, it is missing **where** she does something (which system, which transaction) and **to whom** she hands over.
- **Persona's reaction:** „That sounds sensible, but what do *I* do now, concretely? Where do I look up the tax master data — in SAP? And to whom do I hand over for business clarification?" She cannot act immediately — the journey's core goal is only partly met.
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-6-pruefpfad-lauf2.png)

### Issue 5: Developer language in the result text („Mock", „Action ID", „taxProfileId")
- **Severity:** Medium
- **Step:** Step 5 / Step 7
- **Expected:** Professional language appropriate to a production review process.
- **Actual:** Under „Produkt Guidance" it says „Der ENER:GY-**Mock** stellt Rechnung, Prozesskennung … bereit" and „Der Nachweisabruf wird … **simuliert**". In the AI explanation: „kann der USt-1-TH-Nachweis **im Mock** abgerufen und hinterlegt werden". In EBD-Wissen additionally „Action ID: retrieve_reseller_certificate", „taxProfileId".
- **Persona's reaction:** „Mock? Simulated? Is this a dummy or my real case?" Precisely the point at which she wonders whether she can rely on the statement when her name is on the case.
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-6-pruefpfad-lauf2.png)

### Issue 6: Rendering errors in the AI explanation (markdown and missing umlauts)
- **Severity:** Medium
- **Step:** Step 5
- **Expected:** Cleanly formatted, correctly spelled German text.
- **Actual:** Two errors in the same block:
  - Raw markdown bleeds through: „… kann der USt-1-TH-Nachweis im Mock abgerufen und hinterlegt werden.**## Fehlende Informationen**" — the heading is not rendered and sticks to the end of a bullet point.
  - Heading without umlauts: „**Pruefpunkte fuer** die Sachbearbeitung" (umlauts render correctly in the surrounding text). Likewise in the context field: „Wiederverkaeufer-Stammdatensatz", „zu klaeren".
- **Persona's reaction:** „This looks like it isn't finished." It undermines the credibility of a text she is supposed to base an invoicing decision on.
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-5-ki-erklaerung-lauf2.png)

### Issue 7: Two different AI explanations in two places — no source on the more prominent one
- **Severity:** Medium
- **Step:** Step 5
- **Expected:** One explanation, with the visible source (page / PDF index) right next to it.
- **Actual:** There are two substantively different explanations:
  - Panel **„KI Erklärung"** (GY:PT-generated): „Was ist passiert?" / „Fachliche Bedeutung" / „Warum wurde abgelehnt?" / „Pruefpunkte…" — **with no source reference at all**, only the phrase „Laut Wissensbasis-Eintrag Z40".
  - Block **„Details zum aktuellen Fehlerpunkt"** inside the decision-path panel: „Business Meaning" / „Business Impact" / „Mögliche Ursachen" / „Manuelle Prüfungen" / „Manuelle Schritte" / „Produkt Guidance" — **with** a source reference.

  So the content the journey expects (business meaning, business impact, possible causes, manual checks, manual steps) is **not** in the „KI Erklärung" section but in the decision-path panel further down.
- **Persona's reaction:** „So which of the two explanations applies? And where does the first one get that from?" Extra effort, because she has to read both to be sure.
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-5-ki-erklaerung-lauf2.png)

### Issue 8: Incomplete source reference — „PDF Index -"
- **Severity:** Medium
- **Step:** Step 5
- **Expected:** A complete reference so it can be cross-checked in the EBD handbook.
- **Actual:** In all three display locations it reads „Quelle: **Seite 704 / PDF Index -**" — the PDF index is missing. By comparison, other entries in „EBD-Wissen" provide complete references such as „Seite 81 / PDF Index 80". The gap is therefore in the Z40 data, not in the display. An empty value is also rendered as a hyphen, which looks like an error.
- **Persona's reaction:** „I can find page 704 — but why is there a dash? Is something missing?" She can cross-check, but with residual doubt.
- **Screenshot:** ![](../screenshots/nadine-krueger-ebd-wissen-z40-lauf2.png)

### Issue 9: „Als geprüft markieren" button overlaps the „Erkannte Nachricht" section header
- **Severity:** Medium
- **Step:** Step 4 / Step 8
- **Expected:** A closing button that is clearly recognisable as such and not in the way.
- **Actual:** The button sits in the middle of the dark header of the „Erkannte Nachricht" section and **blocks its click area**: attempting to expand the section via its header failed reproducibly (Playwright: „subtree intercepts pointer events"); only a click on the text at the far left worked. Visually, grey text on a dark background makes the button look permanently **disabled** — even when it is active.
- **Persona's reaction:** „Why won't this section open?" and later „The button looks greyed out, can I even press it?" The most important closing button in the application is the least recognisable one.
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-4-erkannte-nachricht-lauf2.png)

### Issue 10: EDIFACT field pre-filled at startup with no corresponding case
- **Severity:** Low
- **Step:** Step 1
- **Expected:** An empty analysis area until a case is selected (as the journey also describes).
- **Actual:** Immediately after loading, the „Eingegangene EDIFACT-Nachricht" field already contains a sample message (`UNH+1+APERAK:D:96A:UN'BGM+ZZZ+4711'ERC+A01:…`) that belongs to **none** of the four cases. No case is selected, status „Bereit".
- **Persona's reaction:** „Is that already a case? From whom?" Brief confusion; in the worse case she analyses the sample message instead of her case.
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-1-uebersicht-lauf2.png)

### Issue 11: No jump from the analysis result into the EBD-Wissen search
- **Severity:** Low
- **Step:** Step 5
- **Expected:** One click from the found code Z40 to the knowledge base entry.
- **Actual:** Neither the „Code Z40" badge nor the source reference is a link. To cross-check, Nadine must switch to „EBD-Wissen" on the left and type „Z40" by hand. The search itself works well (1 hit, complete entry).
- **Persona's reaction:** Conflicts with her pain point „too many clicks between inbox and next step" — it works, but it is manual labour.
- **Screenshot:** ![](../screenshots/nadine-krueger-ebd-wissen-z40-lauf2.png)

### Issue 12: Unexplained abbreviations and identifiers
- **Severity:** Low
- **Step:** Step 1 / Step 4
- **Expected:** Tooltips or spelled-out terms for occasional users.
- **Actual:** With no explanation whatsoever: „ENER:GY Eingang" (sidebar title), „GY:PT" (chat function), „Rolle LF", „EBD E_0801", „Cluster: Ablehnung", „Codeliste GS_002", „Prüfschritt 0". No tooltip, no glossary. „Hilfe" at the top right is plain text with no click function.
- **Persona's reaction:** „LF is Lieferant, that I know. But what is a cluster? And what does GY:PT mean?" Inferable, but exactly the pain point named in the persona.
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-1-uebersicht-lauf2.png)

### Issue 13: Loading indicator too subtle for interrupted work
- **Severity:** Low
- **Step:** Step 3
- **Expected:** Clearly visible feedback that the analysis is running.
- **Actual:** During the analysis (~15 s) only the status tile switches to „Prüft" and a small spinner appears in the button. The three result tiles stay at „0", „-", „-", and the rest of the screen does not change.
- **Persona's reaction:** Per the persona she is constantly interrupted (phone, email). On returning it is not immediately clear whether it is still computing or the result is already there — especially since the status then jumps back to „Offen" (see Issue 1).
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-3-ladeanzeige-lauf2.png)

### Issue 14: Error message appears far away from the button that triggered it
- **Severity:** Low
- **Step:** Edge case „empty EDIFACT field"
- **Expected:** Feedback near the action.
- **Actual:** The (substantively very good) toast „Bitte zuerst eine EDIFACT-Nachricht einfügen." appears at the **bottom left**, while the „Analysieren" button is at the **top right** — the maximum screen diagonal at 1920 × 1080.
- **Persona's reaction:** She looks at the button, sees nothing happen there, and only notices the message with a delay.
- **Screenshot:** ![](../screenshots/nadine-krueger-edgecase-leeres-feld-lauf2.png)

### Issue 15: Hover and selected states in the case list are indistinguishable
- **Severity:** Low
- **Step:** Step 2
- **Expected:** The selected case stands out unambiguously.
- **Actual:** A case under the mouse pointer and the actually selected case are rendered in identical orange. Verified: after moving the pointer away, only the selected case remained orange.
- **Persona's reaction:** Low impact, but it could lead to selecting the wrong case when several are listed.
- **Screenshot:** ![](../screenshots/nadine-krueger-schritt-8c-auswahlzustand-lauf2.png)

---

## Steps performed

| Step | Description | Status | Note |
|------|-------------|--------|------|
| 1 | Open the overview (http://localhost:5173) | ⚠️ | Page loads fast, purpose is recognisable. But: EDIFACT field already pre-filled with an unrelated sample message (Issue 10); only 1 open case instead of the expected Case 1. Only console message: 404 on `favicon.ico` (not user-visible). |
| 2 | Select an open case (Case 4 instead of Case 1) | ✅ | REMADV + original INVOIC + context are loaded, status → „Offen", case highlighted in orange. Clear confirmation. |
| 3 | Analyse the case | ⚠️ | Analysis completes in about 15 s, status „Prüft" with spinner. Result is complete. But: status then jumps back to **„Offen"** instead of a result status; loading indicator very subtle (Issue 13). |
| 4 | Review EBD hits & business view | ❌ | „Gefundene EBD Einträge" provides everything needed (code Z40, EBD E_0801, role LF, check step, cluster, source). The **„Fachliche Ansicht" is unusable** (Issue 3); „Erkannte Nachricht" could not be opened via its header (Issue 9); check result contradictory (Issue 2). |
| 5 | Read the AI explanation | ⚠️ | Substantively understandable and in everyday language. But: two competing explanations (Issue 7), no source on the more prominent panel, markdown and umlaut errors (Issue 6), „mock" language (Issue 5). |
| 6 | Follow the decision path | ✅ | **The strongest element of the test.** Only Start → check step 0 with a red ×, failure point immediately graspable, no scrolling through 27 steps needed. The ✓/×/○ legend is spelled out and self-explanatory. Caveat: the legend explains ✓ and ○, which do not appear in the tree at all; „Ergebnis: nein" contradicts the EBD hit (Issue 2). |
| 7 | Evaluate the manual steps | ⚠️ | A numbered list is present and professionally plausible — but written from the system's perspective and with no target system or contact named (Issue 4). |
| 8 | Mark the case as reviewed | ❌ | The function works technically (the case appears under „Geprüfte Fälle" with „· Geprüft"), but **with no feedback whatsoever** and with the status display still incorrectly showing „Offen" (Issue 1). |

### Edge cases tested

| Edge case | Result | Note |
|-----------|--------|------|
| „Analysieren" with an empty EDIFACT field | ✅ | Clear German error message „Bitte zuerst eine EDIFACT-Nachricht einfügen.", no analysis started. Only the position is unfortunate (Issue 14). |
| Cross-checking the source via „EBD-Wissen" | ✅ | Searching for error code „Z40" returns exactly 1 hit with identical content (1300 entries in total; filters for role/status/search mode available). This also confirms Issue 2 and Issue 8. |
| Case with no EBD hit (0 results) | ➖ | Not tested — the pre-filled sample message (APERAK/A01) would have overwritten the case state; no dedicated test case available. |
| Pasting a custom EDIFACT message manually | ➖ | Not tested. |
| Clicking another case while an analysis is running | ➖ | Not tested — only one open case was available. |

---

## Success criteria

| Criterion | Met? | Note |
|-----------|------|------|
| Nadine gets from the case list to a complete analysis result without any introduction | ✅ | In 3 clicks and under 1 minute (including analysis time). |
| She could restate the rejection reason in her own words | ✅ | „The invoice was rejected because the reverse-charge procedure is missing or incorrectly applied on the shortfall-quantity invoice between resellers." — follows directly from „Business Meaning". |
| She could name at least one concrete next step | ⚠️ | From „Manuelle Prüfungen" yes („check the tax profiles of grid operator and supplier for electricity and the service period"). From „Manuelle Schritte" only partly — they are addressed to the system (Issue 4). |
| The closure is unambiguous and beyond doubt | ❌ | Clearly missed: no confirmation, status stays „Offen", case disappears without comment (Issue 1). |
| No critical errors or incomprehensible error messages | ⚠️ | No crashes, no cryptic error messages, only a harmless 404 on `favicon.ico` in the console. But: contradictory business data (Issue 2) and rendering errors (Issue 6) are substantively critical. |

**Journey verdict:** 2 of 5 success criteria fully met, 2 partially, 1 missed.

---

## Recommendations

**Immediately (blocks Nadine's core task):**
1. **Add closing feedback:** On clicking „Als geprüft markieren", show a toast („Case NB-REMADV-2026-1003 has been marked as reviewed") and switch the status tile to „Geprüft". The toast mechanism already exists — it simply isn't used here.
2. **Maintain the status tile correctly:** It must not still read „Offen" after the analysis and after closing. Introduce result statuses (e.g. „Analysed" / „Reviewed").
3. **Resolve the check-result contradiction:** The value in the decision-path node („nein") must match the EBD master record („ja"). As long as both appear side by side, the entire analysis loses credibility.

**Short term:**
4. **Make the „Fachliche Ansicht" actually business-oriented:** Translate segment abbreviations into plain language (`BGM` → „message header / invoice number", `MOA+9` → „invoice amount EUR 1,403.61", `AJT+Z40` → „rejection reason Z40"). Without translation the section is worthless to the target audience and should rather be called „Message structure (technical)".
5. **Rewrite „Manuelle Schritte" for the actual reader:** Direct address, naming the target system and the contact — e.g. „1. In SAP IS-U, check the supplier's tax profile for electricity in the service period …", „3. If no reseller classification exists: hand the case over to the tax department."
6. **Remove developer language:** Strip „Mock", „simuliert", „Action ID", „taxProfileId" from all user-visible text or move them into a technical area.
7. **Fix the rendering errors:** Render markdown in the AI text correctly (`## Fehlende Informationen` as a heading) and correct the umlauts in „Pruefpunkte fuer die Sachbearbeitung".
8. **Detach the closing button from the section header:** Place it as a standalone, high-contrast button (e.g. next to „Analysieren" in the status tile) so it neither blocks the click area of „Erkannte Nachricht" nor looks disabled.

**Medium term:**
9. **Merge the two AI explanations** or label them clearly (e.g. „AI summary" vs. „EBD master data") and show the source reference on the upper panel as well.
10. **Backfill the PDF index for Z40** and omit the line for empty values rather than rendering „-".
11. **Make the Z40 code badge a link** so a click opens the matching EBD-Wissen entry directly — saving Nadine the module switch and the typing.
12. **Add tooltips for domain terms:** „Cluster", „Prüfschritt", „Rolle LF", „EBD", „GY:PT", „ENER:GY". The existing „Hilfe" at the top right currently has no function.
13. **Remove the sample message at startup** or label it clearly as „Example".
14. **Move the toast position** closer to the area that triggered it (top right instead of bottom left).

---

## Note on the test environment
After this run **all four cases** are marked „Geprüft". For further test runs the case statuses must be reset, otherwise no open case remains available.
