<p align="center"><a href="https://cuarentamas.com/"><img src="docs/readme-hero.svg" alt="Project overview" width="100%"></a></p>

40+ combines a responsive commerce experience with WhatsApp-assisted purchasing and automated customer communication. The Ritual 40+ flow validates customer submissions, delivers the e-book and sends information internally for follow-up. Payment providers and a custom CRM remain optional integrations rather than current production features.

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
