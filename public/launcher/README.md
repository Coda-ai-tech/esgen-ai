# Chatbot Launcher CDN

## Install Terser

```bash
npm install terser -g
```

## Compile

```bash
terser index.js --mangle --toplevel --mangle-props keep_quoted --output ./dist/index.min.js
```

## Install Chatbot Script

```bash
<!-- DDP ESG CHATBOT -->
<script src="[CHATBOT HOST]/launcher/dist/index.min.js?api=[API KEY]"></script>
<!-- END DDP ESG CHATBOT -->
```

API KEY will managed by Next.js API (/api/verify/route.ts)
