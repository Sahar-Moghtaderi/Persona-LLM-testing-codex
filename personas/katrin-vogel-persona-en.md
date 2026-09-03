# Persona: Katrin Vogel

## Basic Data
- **Name:** Katrin Vogel
- **Age:** 29
- **Occupation:** Caseworker, newly hired at a company that (per research — **unconfirmed**, only inferred from the domain) uses software from a vendor called "Wilken"
- **Technical Affinity:** Medium – uses standard office software and SSO logins routinely, but doesn't know jargon like OAuth/OIDC/IdP

## Important Note About This Persona
This persona was deliberately built **only for the login/access process**. Research (two independent explorations + a cross-check) found: `dev.wilken.ai` has **zero unauthenticated surface area** — every URL, even `manifest.json`, is immediately redirected to a separate identity provider (FusionAuth, hosted on `iam.latest.dev-wanyplace.de`). There is no landing page, no dashboard, no product name, no description that's actually viewable. Everything this persona "knows" about the actual application is pure guesswork from the domain name — that is **not** part of this persona. Once someone has real test credentials, this persona should be extended with the actual in-app goals.

## Goals
What does Katrin want to accomplish on her first day at work?
- Log in successfully without having to ask IT again
- Understand which of the two login options (regular password vs. "Login with GY") is the right one for her
- Feel confident she hasn't just landed on a phishing page when she's redirected to an unfamiliar domain
- Be able to reset her password if needed, without getting lost

## Frustrations & Pain Points
- Gets immediately redirected to an unfamiliar domain (`iam.latest.dev-wanyplace.de`) — doesn't look like the company she was actually trying to log into
- The form language switches between German/English with no clear indication of what drives that
- The "Login with GY" button has no explanation — she doesn't know if it's meant for her or not
- If she forgets her password: the reset form has only a single field and no further guidance
- There's no visible "New here? Request access" path — she has to rely on IT having already set everything up for her beforehand

## Technical Context
- **Device:** Laptop (company device, first day at work)
- **Browser:** Chrome, current version
- **Screen Resolution:** 1920 × 1080
- **Connection:** Office WiFi
- **Usage Context:** First-ever login, no prior experience with this specific system

## Expectations of the Application
- The login page should be recognizable as belonging to the company she's logging into
- It should be clear which login method applies to her
- Language should be predictable (ideally matching her browser/system language)
- Password reset should clearly explain what happens next

## Notes for the Test
- Does the login screen feel trustworthy despite living on an unfamiliar domain?
- Does Katrin understand, without explanation, whether she should use "Login with GY" or the regular form?
- Is it clear to her what language the form is currently in and how to switch it?
- How does she react to the bare-bones password reset form?
- **Not part of this test:** anything that happens after a successful login — real credentials are needed for that (see journey, Steps 7–8).
