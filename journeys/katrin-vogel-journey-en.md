# User Journey: First Login at dev.wilken.ai

## Metadata
- **Persona:** Katrin Vogel (katrin-vogel-persona-en.md)
- **Journey Goal:** Successfully log into dev.wilken.ai for the first time — deliberately focused on the access process, since the actual application isn't viewable without valid credentials (see persona file, note above)
- **Starting Page:** https://dev.wilken.ai/
- **Date:** 2026-08-28
- **Created by:** Sahar (based on a cross-checked, two-angle research pass — see preconditions)

## Preconditions
- [ ] **No login available.** This journey was researched without real credentials. Steps 1–6 are fully observed and testable. Steps 7–8 are **not observed** and require a real test account.
- [ ] `dev.wilken.ai` redirects without exception to `https://iam.latest.dev-wanyplace.de` (FusionAuth, behind an Azure "Easy Auth"-style gateway) — this is expected behavior, not a bug
- [ ] If real credentials exist: give them directly in the prompt to Claude, never have them written into a file

## Journey Steps

### Step 1: Open the starting page
- **Action:** Navigate to https://dev.wilken.ai/
- **Expected Result:** Immediate redirect to a FusionAuth login page on `iam.latest.dev-wanyplace.de` — no Wilken-owned landing page loads
- **What to watch for:** Does the jump to a completely different domain feel trustworthy? Is it recognizable to Katrin that this still belongs to the right company?

### Step 2: Look at the login form
- **Action:** Look at the form (field labels, order, buttons)
- **Expected Result:** Email/login field, password field, "Angemeldet bleiben" ["Keep me signed in"] checkbox (with a public-computer warning), "Absenden" ["Submit"] button, "Passwort vergessen?" ["Forgot your password?"] link
- **What to watch for:** Is it immediately clear what's expected of Katrin here? Is there any hint of the company/app she's actually logging into?

### Step 3: Check the language and switch it if needed
- **Action:** Observe the form's language; use the DE/EN switcher in the bottom-left, if present
- **Expected Result:** Form correctly toggles between "Anmelden/E-Mail/Passwort/Absenden" and "Login/Login/Password/Submit"
- **What to watch for:** Is it clear what determines the language (browser locale? something else?), or does it feel unpredictable? (In our research, two independent runs showed different default languages — not yet fully resolved.)

### Step 4: Evaluate the second login option
- **Action:** Look at the "Login with GY" button (below the "Oder"/"Or" divider)
- **Expected Result:** Should make clear what this option is for and when to use it instead of the regular form
- **What to watch for:** Can Katrin, with no prior knowledge, decide which of the two options applies to her? (In our research there was no explanation, tooltip, or label at all — just a generic OIDC icon plus a purple "GY" logo.)

### Step 5: Try "Forgot your password?" (without submitting)
- **Action:** Click "Passwort vergessen?" ["Forgot your password?"], look at the form — **do not submit**, since there is no real account
- **Expected Result:** Form with a login field, a submit button, a "Return to login" link
- **What to watch for:** Does the page explain what happens after submitting? Is there enough information for Katrin to feel confident trying it?

### Step 6: Probe the edge of access without credentials
- **Action:** Check whether there's any visible path for new users (sign-up, demo, guest access) on both the login and forgot-password pages
- **Expected Result:** As expected: none present (B2B system, access presumably provisioned by the client company's IT department)
- **What to watch for:** Would it be clear to a completely new user, with no prior briefing, that she needs to contact her IT department?

### Step 7: Log in with real credentials *(not observed — requires a real account)*
- **Action:** Enter email/password (or "Login with GY", if that's the intended path) and submit
- **Expected Result:** Redirect back to `dev.wilken.ai/.auth/login/FusionAuth/callback` and then into the actual application
- **What to watch for:** *This step could not be performed during research — this is where the actually-unknown part of the application begins.*

### Step 8: First view after login *(not observed — requires a real account)*
- **Action:** Observe what's shown first after a successful login
- **Expected Result:** Unknown — once this step has been observed, the persona file should be extended with real in-app goals
- **What to watch for:** Everything — this is the point from which a real, product-specific persona can finally be written

## Test Cases / Edge Cases
- What happens with a wrong password? (Is the error message understandable?)
- What happens if "Keep me signed in" is checked — how long does the session stay active?
- Does the browser's "Back" button work correctly during the redirect between the two domains?

## Success Criteria
The journey (Steps 1–6) is considered successful if:
- [ ] Katrin recognizes, without confusion, that the unfamiliar domain still belongs to the correct login
- [ ] She could make an informed decision between the two login options
- [ ] The language switch works in a way she can follow
- [ ] She would know what to do next if she forgot her password
- [ ] No critical errors occur on the tested pages

Steps 7–8 are only considered complete once a real test run with valid credentials has taken place.
