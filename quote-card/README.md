# BookSkim — Quote Card Builder

A polished creative tool that turns a book quote into a beautiful **1080×1080** shareable
PNG. Built with Next.js (App Router) + React + TypeScript + Tailwind v4, it lives in this
subfolder of the `bookskim-site` repo and deploys **separately to Vercel** while the
marketing `index.html` stays on GitHub Pages.

## Local development

```bash
cd quote-card
npm install
npm run dev
# open http://localhost:3000/tools/quote-card
```

Launch prefilled (this is how the BookSkim Android app opens it):

```
/tools/quote-card?quote=It%20is%20our%20choices…&book=Harry%20Potter&author=J.K.%20Rowling
```

## Deploy to Vercel

1. New Vercel project → import the `bookskim-site` repo.
2. **Set "Root Directory" to `quote-card`.** Framework auto-detects as Next.js.
3. Deploy. The tool is served at `https://<your-domain>/tools/quote-card`.
4. Update the two `Quote Cards` links in the repo-root `index.html` to your final Vercel
   URL (search for `bookskim-quote-card.vercel.app`).

Pure client-side app — no env vars, no server functions.

## How it works

- `lib/renderCard.ts` — one pure canvas painter used by **both** the live preview
  (`components/QuoteCanvas.tsx`) and the PNG export (`lib/exportPng.ts`), so what you see is
  exactly what downloads.
- `lib/gradients.ts` — 20 curated named gradients. `lib/fonts.ts` — 10 `next/font/google`
  families (self-hosted; `document.fonts.ready` is awaited before drawing).
- `lib/autoStyle.ts` — curated "recipes" (not blind randomization) that pair gradient + font
  + size + alignment + contrast-safe color so every Auto Style click looks designed.
- `lib/storage.ts` — persists the last settings to `localStorage` (custom images excluded).
