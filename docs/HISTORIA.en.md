# Project history, decisions, and traceability

**English** · [Español](HISTORIA.md)

[Back to README](../README.md) · Baseline: September 2, 2026, America/Bogota.

## Scope of this account

This history combines repository commits, exported Make configuration, observed tests, and decisions approved by the project owner. The initial files were imported from an earlier project: the first commit does not establish when every component was originally created. Events without evidence are not reconstructed as facts.

## Code timeline

| Date | Commit | Milestone |
| --- | --- | --- |
| 2026-08-14 | [`d307c97`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/d307c97) | Separate repository established: React/Vite, cart, Three.js, Tiendanube adapter, and membership/n8n flow |
| 2026-08-26 | [`f170cb1`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/f170cb1) | Commercial redesign and transition toward a WhatsApp order flow |
| 2026-08-26 | [`551b877`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/551b877) | Organization of redesign assets |
| 2026-08-27 | [`b2a803a`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/b2a803a) | Hero iteration with a 3D product and editorial animation; a historical milestone, not a description of the current runtime |
| 2026-08-28 | [`76cc81f`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/76cc81f) | Visual identity and shopping experience refinements |
| 2026-08-28 | [`69616ae`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/69616ae) | Editorial visual assets |
| 2026-08-31 | [`a67eafe`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/a67eafe) | Experience form, API, Turnstile, e-book, Meta consent, legal pages, response headers, and disabled legacy routes |
| 2026-09-01 | [`273369c`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/273369c) | Visual refinements and private Make token sent through `x-make-apikey` |
| 2026-09-02 | [`5a517de`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/5a517de) | Clickable hero product and PDF download response |
| 2026-09-02 | [`7899c2f`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/7899c2f) | Mobile typography, overflow, and decorative button-arrow adjustments |
| 2026-09-02 | [`1879076`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/1879076) | Standardized cuarentamas brand naming |
| 2026-09-02 | [`addb865`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/addb865) | Empty commit to trigger deployment after correcting the Vercel repository connection |
| 2026-09-02 | [`a068b60`](https://github.com/diegofrancoe/cuarentamas-commerce/commit/a068b60) | Stable email logo and cross-origin resource permission limited to `/email/` |

Components, images, and video removed from the earlier design remain recoverable through Git. This documentation does not add obsolete assets back into production.

## Changes outside Git

| When | System | Change and evidence |
| --- | --- | --- |
| September 1 | Drive / Make | Native Sheets document created; continuity notes recorded the pending migration from Excel |
| September 2 | Make | Two Excel modules replaced with Sheets; experience mappings and internal/customer emails configured through Outlook |
| September 2 | Email | Copy, compact buttons, neutral typography, and branding iterated; approved internal notification preserved |
| September 2 | GoDaddy / Microsoft 365 | Both CNAME records published and domain DKIM enabled |
| September 2 | Vercel | Linked repository and Root Directory corrected; updated site deployed |
| September 2, 19:14:51 | Make | Successful manual execution using a real public-form test submission: 5 operations |
| September 2, 19:27:26 | Make | Replay with corrected logo: 5 operations; Sheets reported row 9; both emails received |
| After that test | Make | Scenario activated; `Active` status checked again during documentation |
| Acceptance | Brand owner | Confirmed that branding looked correct and both download/product buttons worked |

## Solution decisions

### 1. A Tiendanube-integrated cart, followed by a business-led shift to WhatsApp

The first website was built with a cart connected to Tiendanube. It included OAuth authorization, product queries, and draft-order creation through `draft_orders`. The code requested a checkout URL; it did not implement a payment processor itself.

The site was subsequently redesigned, and the sales journey was adapted to continue through WhatsApp. The project owner confirmed the business rationale: reduce the investment required and simplify daily operations and direct customer support. A solution suited to the business at that stage was prioritized over maintaining an active external checkout. No unmeasured savings or platform-pricing comparisons are claimed.

The trade-off is an assisted-sales model: the website prepares the order, while payment, confirmation, and dispatch require human handling outside the site. This evolution demonstrates an architecture decision driven by business constraints, not just a visual change.

Tiendanube was removed from the visible journey. `api/tiendanube-checkout.js` and local routes remain behind `ENABLE_TIENDANUBE_CHECKOUT` and `ENABLE_TIENDANUBE_ADMIN_ROUTES`, both disabled by default. This repository does not establish that a historical payment was completed or that all external credentials were revoked. Reactivation requires a separate scope, credentials, and testing—not simply enabling the flags.

### 2. Experiences and Make replace membership/n8n

The initial commit included `MembresiaPage.jsx`, `/api/membresia-contacto`, and n8n webhook configuration. The current version provides `/comparte-tu-experiencia` and `/api/experiencia`; the membership API was removed. `src/config/siteConfig.js` and `VITE_ENABLE_MEMBRESIA` are remnants without an active public route. Their presence is not treated as evidence of a working membership feature.

### 3. Sheets stores records; Vercel delivers the e-book

The spreadsheet is a Drive document. No separate Drive module was added to the scenario, and the PDF does not use a Drive sharing link. Hosting the public download on Vercel avoids depending on shared-file viewing permissions. In exchange, the PDF is not restricted to people who submit the form.

### 4. Email design evolves through human approval

The owner approved a message thanking customers for contributing to the community, the Ritual 40+ gift, and a product CTA. Buttons and the logo were reduced in size, with neutral body text. Final dimensions and both HTML templates are versioned under [automation/emails — ES](automation/emails/README.md). The PDF was not added as an attachment.

### 5. Repository and production are brought back into alignment

The Vercel project was linked to `diegofrancoe/portfolio` with Root Directory `projects/cuarentamas`, while the current code lived in `diegofrancoe/cuarentamas-commerce`. This repository was connected and Root Directory cleared. `addb865` triggered a new deployment. That mismatch explains why updating the source alone had not corrected the public links.

### 6. Email-logo compatibility without opening every resource

After deployment, the logo still failed in Outlook. Its response used CORP `same-site`; the correction introduced `/email/logo-40plus.jpg` with `cross-origin` limited to that folder. The cause was diagnosed from response headers and observed behavior, not from exhaustive network captures across every email client. The final result was observed in Outlook and approved by the user.

## Was it in main? Was it merged?

Before the original documentation delivery, both remote branches pointed to the same full commit:

```text
origin/main                      a068b6069bd3d1fe194588dca5f0292ef55627bf
origin/codex/cuarentamas-work     a068b6069bd3d1fe194588dca5f0292ef55627bf
```

The changes were incorporated through a **fast-forward update**: they were in `main`, but there was no PR or separate merge commit. The repository PR query returned no results, and the history contained no merge commits. Local `main` still pointed to `d307c97` at that time; it was a stale local reference, not GitHub's state.

Documentation preserves that history without rewriting commits or inventing earlier PRs. The documentation commits and remote references establish subsequent publication; use `git log` and `git ls-remote --heads origin` for the state after this baseline.

## Lessons and next steps

A scenario's visual layout does not guarantee its execution order. The exported blueprint showed emails before record creation, a configuration-row search rather than deduplication, and delivery states that were not updated. These were recorded as technical debt without changing the approved scenario during the documentation task. [Verification backlog — ES](VERIFICACION.md).

The value of this case study lies in connecting systems and resolving real operational friction with human validation, while respecting evidence boundaries: no unsupported payment history, business metrics, delivery guarantees, or AI capabilities are claimed.
