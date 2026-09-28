<p align="center"><img src="src/assets/brand/logo-40plus.jpg" alt="40+" width="230"></p>

<h1 align="center">40+ — E-commerce & Automation</h1>
<p align="center"><strong>Commerce experience · WhatsApp-assisted sales · Ritual 40+ · automated customer communication</strong></p>
<p align="center"><a href="https://cuarentamas.com/"><strong>Live website</strong></a> · <a href="https://www.diegofrancoe.com/proyectos/40-plus"><strong>Case study</strong></a></p>

40+ is a responsive commerce experience for a Colombian collagen brand. Customers discover the product and prepare an order that continues through WhatsApp, while the Ritual 40+ journey securely captures submissions, delivers an e-book and sends customer information internally for follow-up.

| E-commerce | WhatsApp | Ritual 40+ | Automation |
|---|---|---|---|
| Product + cart experience | Assisted purchase handoff | Secure form + e-book | Make + email + Sheets |

### Tech stack
![React](https://img.shields.io/badge/React-20232A?logo=react) ![Vite](https://img.shields.io/badge/Vite-20232A?logo=vite) ![Tailwind](https://img.shields.io/badge/Tailwind-20232A?logo=tailwindcss) ![Make](https://img.shields.io/badge/Make-20232A?logo=make) ![Vercel](https://img.shields.io/badge/Vercel-20232A?logo=vercel)

### Architecture
~~~mermaid
flowchart LR
 U[Customer] --> W[React + Vite]
 W --> WA[WhatsApp purchase]
 W --> F[Ritual 40+]
 F --> API[Validation + Turnstile]
 API --> M[Make]
 M --> E[Customer email + e-book]
 M --> I[Internal notification]
 M --> S[Sheets / Drive]
 W -. optional .-> PAY[Payments]
 S -. optional .-> CRM[CRM]
~~~

<details><summary><strong>Run locally & repository structure</strong></summary>

~~~bash
npm ci
cp .env.example .env
npm run dev
~~~

~~~text
src/        UI, product experience and cart
api/        Secure experience endpoint
server/     Validation
public/     E-book and email assets
docs/       Architecture + sanitized automation docs
~~~
</details>

The current purchase flow continues through WhatsApp. Payments and CRM are optional integrations, not current production features.

<p align="center"><strong>Production:</strong> https://cuarentamas.com/</p>
