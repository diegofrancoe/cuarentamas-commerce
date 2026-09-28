<p align="center"><img src="src/assets/brand/logo-40plus.jpg" alt="40+" width="260"></p>

# 40+ — E-commerce & Automation

**E-commerce · WhatsApp-assisted sales · secure lead capture · automated communication**

[Live website](https://cuarentamas.com/) · [Product](https://cuarentamas.com/producto/colageno-hidrolizado-40) · [Ritual 40+](https://cuarentamas.com/comparte-tu-experiencia) · [Case study](https://www.diegofrancoe.com/proyectos/40-plus)

40+ is a responsive commerce experience for a Colombian collagen brand. Customers discover the product and prepare an order that continues through WhatsApp, while the Ritual 40+ journey securely captures customer submissions, delivers an e-book automatically and sends the information internally for follow-up.

## Highlights

- Responsive brand and product experience.
- Product page, cart, quantities and WhatsApp order handoff.
- Ritual 40+ form with server validation and Cloudflare Turnstile.
- Make automation for internal notification and customer communication.
- Automatic Ritual 40+ e-book delivery.
- Google Sheets / Drive record flow.
- SEO, consent-aware analytics and Vercel deployment.
- Architecture open to optional payment-provider, CRM and additional automation integrations.

## Architecture

~~~mermaid
flowchart LR
 U[Customer] --> W[React + Vite]
 W --> WA[WhatsApp purchase]
 W --> F[Ritual 40+ form]
 F --> API[Server validation]
 API --> T[Turnstile]
 T --> M[Make]
 M --> E[Customer email + e-book]
 M --> I[Internal notification]
 M --> S[Sheets / Drive]
 W -. optional .-> PAY[Payment providers]
 S -. optional .-> CRM[Custom CRM]
~~~

## Stack

React 19 · React Router · Vite · JavaScript · CSS / Tailwind CSS · Node.js · Express · Vercel Functions · Make · Google Sheets / Drive · Microsoft 365 · Cloudflare Turnstile

## Run locally

~~~bash
npm ci
cp .env.example .env
npm run dev
~~~

Private webhook URLs, credentials and customer data are not stored in the repository.

## Project structure

~~~text
src/        UI, product experience and cart
api/        Secure experience endpoint
server/     Local backend and validation
public/     E-book and public email assets
docs/       Architecture and sanitized automation documentation
~~~

The current website does not process online payments and does not include a full CRM. Purchases continue through WhatsApp; payments and CRM are optional integrations.

**Production:** https://cuarentamas.com/

Built by **Diego Franco**.
