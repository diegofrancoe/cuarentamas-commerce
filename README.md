<p align="center"><a href="https://cuarentamas.com/"><img src="docs/readme-hero.svg" alt="40+ commerce platform overview" width="100%"></a></p>

40+ is a responsive commerce experience built around a real customer journey: product discovery, WhatsApp-assisted purchasing and automated post-interaction communication. The platform combines a React frontend with secure form processing and external automation so customer-facing flows remain simple while operational follow-up happens behind the scenes.

A key part of the project is the **Ritual 40+** flow. Customer submissions are validated before entering the automation layer, where the system can deliver digital content, notify the business and store structured lead information for follow-up.

### Core stack
![React](https://img.shields.io/badge/React-252824?style=flat-square&logo=react&logoColor=74CDA7) ![Vite](https://img.shields.io/badge/Vite-252824?style=flat-square&logo=vite&logoColor=74CDA7) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-252824?style=flat-square&logo=tailwindcss&logoColor=74CDA7) ![Express](https://img.shields.io/badge/Express-252824?style=flat-square&logo=express&logoColor=74CDA7) ![Make](https://img.shields.io/badge/Make-252824?style=flat-square&logo=make&logoColor=74CDA7) ![Vercel](https://img.shields.io/badge/Vercel-252824?style=flat-square&logo=vercel&logoColor=74CDA7)

### What this project demonstrates

- Product-focused React frontend and responsive commerce UX
- WhatsApp-assisted conversion flow
- Server-side validation before automation
- Automated e-book delivery and internal notifications
- Separation between public UI, validation logic and external workflows
- Architecture designed to support future payment and CRM integrations

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

The current production journey keeps purchasing intentionally lightweight by moving high-intent customers directly into WhatsApp. In parallel, the Ritual flow uses a protected validation boundary before data reaches Make, reducing the amount of trust placed on browser-side submissions.

The architecture is modular enough to introduce direct payments or a dedicated CRM later without changing the customer-facing experience.

### Technical highlights

**Frontend.** React and Vite power the customer experience, product content and responsive interaction layer. Routing and UI state stay on the client, while sensitive processing is kept outside the browser.

**Validation boundary.** Public form submissions pass through server-side validation and bot protection before triggering automation. This prevents external workflow credentials and internal endpoints from being exposed in frontend code.

**Automation.** Make orchestrates delivery of the e-book, internal notifications and structured storage. The automation layer remains decoupled from the UI so operational workflows can evolve independently.

**Commerce extensibility.** Payment providers and a custom CRM are treated as optional integration points rather than features falsely represented as already active in production.

<details><summary><strong>Run locally & repository structure</strong></summary>

~~~bash
npm ci
cp .env.example .env
npm run dev
~~~

~~~text
src/        UI, product experience and cart
api/        Secure experience endpoint
server/     Validation and server-side processing
public/     E-book and customer-facing assets
docs/       Architecture and sanitized automation documentation
~~~
</details>

The current purchase flow continues through WhatsApp. Payments and CRM are optional integrations, not current production features.

<p align="center"><strong>Production:</strong> https://cuarentamas.com/</p>
