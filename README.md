# ESG Chatbot

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## ESGEN: AI-generated ESG Reports (Project Overview)

ESGEN is an ESG ecosystem for Hong Kong, deployed at `esgen.io`, that lets companies generate an AI‑assisted ESG report in ~30 minutes at very low cost, then routes the output to a human ESG consultant for verification and improvement planning.

- Mission: standardize and reduce ESG reporting cost and time.
- Flow: Intake → AI draft → Human verification → Export → Ongoing improvements.
- Benefits: fulfillment of EU‑style disclosure, stronger brand, green loan readiness.

### Key user journeys
- Generate report: guided Q&A → AI creates a structured ESG report (Markdown/HTML/PDF later).
- Verify: ESG consultant validates facts/assumptions and adjusts the ESG score.
- Improve: subscriber workspace to track actions and upload evidence over time.
- Marketplace: ESG vendors (e.g., solar) offer solutions mapped to gaps.
- Benchmark DB: build a dataset of company scores to set transparent standards.

### Current repo state
- Next.js 15 App Router, React 19 RC, Tailwind/Sass styles.
- Chat UI posts to `NEXT_PUBLIC_AI_ENDPOINT` (stub by default). No provider code committed yet.
- Static content under `public/api/<lang>/*.json` used for page rendering.

### Environments (required)
Add these to `.env` locally and Netlify UI → Environment variables:

```
NEXT_PUBLIC_SITE_ENDPOINT=https://your-site.example
NEXT_PUBLIC_AI_ENDPOINT=/api/ai
# For data JSON during dev/preview
NEXT_PUBLIC_DEV_API_ENDPOINT_SUFFIXE=/content
# Preview-only bypass for host verification route
# ALLOW_ALL_HOSTS=true
```

### Netlify deployment
- This repo includes `netlify.toml` with sensible defaults (Node 20, Next plugin).
- UI build settings (if you fill them):

```
Base directory:   /
Build command:    npm run build
Publish directory: .next
```

### Domain
- Planned production domain: `esgen.io` (map to the Netlify site after a successful deploy).

### Near-term roadmap
- Minimal `/api/ai` route with provider fallback and strict schemas.
- Report generator endpoint `/api/report/generate` returning Markdown + sections.
- Intake UI: company → frameworks → data → preview/export.
- Human verification workflow (lightweight status + contact assignment).
- Export: Markdown/HTML first; PDF later.

---

## Getting Started

First, run the development server:

```bash
npm run dev
```

## Environment

Create `.env` with at least:

```
NEXT_PUBLIC_DEV_LOCAL_API_ENDPOINT=
NEXT_PUBLIC_DEV_PREV_API_ENDPOINT=
NEXT_PUBLIC_DEV_API_ENDPOINT_SUFFIXE=/api
NEXT_PUBLIC_SITE_ENDPOINT=https://your-site.example
NEXT_PUBLIC_AI_ENDPOINT=https://your-ai-endpoint.example
# For preview deploys to bypass /api/verify host check
# ALLOW_ALL_HOSTS=true
```

## Launcher Script

```bash
./public/launcher/index.js
```

## Netlify

1) Add env vars in Netlify UI (Site settings → Environment):

Required:
```
NEXT_PUBLIC_SITE_ENDPOINT=https://<your-netlify-domain>
NEXT_PUBLIC_AI_ENDPOINT=https://<your-ai-endpoint>
```

Optional (defaults exist):
```
NEXT_PUBLIC_DEV_API_ENDPOINT_SUFFIXE=/api
NEXT_PUBLIC_DEV_PREV_API_ENDPOINT=
NEXT_PUBLIC_DEV_LOCAL_API_ENDPOINT=
```

Preview-only:
```
ALLOW_ALL_HOSTS=true
```

2) Ensure build settings:
```
Base directory:   /
Build command:    npm run build
Publish directory: .next
```

3) Embed launcher:
```html
<script id="ddp-chatbot-loader" src="https://<your-netlify-domain>/launcher/index.js" data-endpoint="https://<your-netlify-domain>"></script>
```
