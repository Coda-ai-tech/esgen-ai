# ESG Chatbot

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
