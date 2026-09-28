<p align="center"><img src="docs/readme-hero.svg" alt="Project overview" width="100%"></p>

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
