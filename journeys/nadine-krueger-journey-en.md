# User Journey: Analyze and Close an Exception Case

## Metadata
- **Persona:** Nadine Krüger (nadine-krueger-persona-en.md)
- **Journey Goal:** Select a rejected REMADV case from the case list, have it analyzed by the AI, understand the explanation and the check trail, and close the case as reviewed
- **Starting Page:** http://localhost:5173
- **Date:** 2026-08-28
- **Created by:** Sahar

## Preconditions
- [ ] Local dev server is running on http://localhost:5173 (frontend) and http://localhost:8000 (API)
- [ ] At least one imported/simulated case is present in the "Open Cases" list (e.g. "Case 1: First negative REMADV for network usage invoice")
- [ ] No login required

## Journey Steps

### Step 1: Open the overview
- **Action:** Navigate to http://localhost:5173
- **Expected Result:** The "MaKo Exception Assistant" page loads; the case list ("Imported Cases") and the empty analysis area are visible
- **What to watch for:** Is it clear at a glance what the tool is for and where to start?

### Step 2: Select an open case
- **Action:** Click "Case 1: First negative REMADV for network usage invoice" in the "Open Cases" list
- **Expected Result:** The case's EDIFACT message loads into the "Received EDIFACT Message" field
- **What to watch for:** Is it clear the case was loaded successfully? Is there visual confirmation (highlight, active state)?

### Step 3: Analyze the case
- **Action:** Click "Analyze"
- **Expected Result:** Status changes to "Checking" and then to a result status; "EBD Entries", "AI Explanation", and "Last Analysis" get populated
- **What to watch for:** How long does the analysis take? Is there a loading indicator so Nadine knows something is happening (important since she switches between tasks)?

### Step 4: Review the analysis result (EBD match & business view)
- **Action:** Read the "EBD Entries Found" and "Business View" sections
- **Expected Result:** Error code, affected role, check step, and an understandable short description are visible
- **What to watch for:** Are jargon terms (e.g. "Cluster: header-level rejection") understandable for a caseworker without an EDI background, or would this need a tooltip/explanation?

### Step 5: Read the AI explanation
- **Action:** Read the "AI Explanation" section in full (business meaning, business impact, possible causes, manual checks, manual steps)
- **Expected Result:** Nadine understands why the invoice was rejected and which causes are plausible
- **What to watch for:** Does the explanation feel trustworthy? Is the source (page/PDF index) visible in case she wants to cross-check?

### Step 6: Follow the check trail (decision tree)
- **Action:** Scroll through the "Check Trail (Decision Tree)" section down to the flagged failure point
- **Expected Result:** The exact check step where the check failed is visually highlighted (e.g. an × marker)
- **What to watch for:** Does Nadine really have to read all ~27 steps to find the failure point, or does the eye go straight there? Is the result legend (✓/×/○) self-explanatory?

### Step 7: Evaluate the manual steps
- **Action:** Read the "Manual Steps" list at the end of the AI explanation
- **Expected Result:** A numbered, concrete action plan is present
- **What to watch for:** Could Nadine act on this directly, or are the steps too abstract/generic?

### Step 8: Mark the case as reviewed (close-out)
- **Action:** Click "Mark as Reviewed"
- **Expected Result:** The case visibly switches to "reviewed" status; confirmation is recognizable
- **What to watch for:** Is it unambiguous that the case is now closed? Does it correctly disappear from "Open Cases" / appear under "Reviewed Cases"?

## Test Cases / Edge Cases
- What happens if "Analyze" is clicked with no case selected or an empty EDIFACT field?
- What happens for a case where no EBD entry is found (0 matches)?
- Does manually pasting a custom EDIFACT message (instead of picking a simulated case) work just as reliably?
- What happens if a different case is clicked while an analysis is still running?

## Success Criteria
The journey is considered successful if:
- [ ] Nadine gets from the case list to a complete analysis result without any introduction
- [ ] She could restate the rejection cause in her own words
- [ ] She could name at least one concrete next step from the AI explanation
- [ ] The close-out ("Mark as Reviewed") is clearly and unambiguously recognizable
- [ ] No critical errors or incomprehensible error messages occurred
