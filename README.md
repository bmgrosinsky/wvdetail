# WV Detail

Marketing site for [WV Detail](https://wvdetail.com), an auto detailing business in Jackson,
Michigan. Interior, exterior, and complete detailing services with published per-vehicle-size
pricing, a quote request flow, and local SEO built in from the ground up.

Live at **[wvdetail.com](https://wvdetail.com)**.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · Zod · Web3Forms ·
Cloudflare Turnstile · GA4 · deployed on Vercel.

See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for the full breakdown: directory layout, design
system, the data-driven content pattern, and how unverified business facts (phone, hours, etc.)
are kept out of the UI until they're confirmed.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the values you have; the site runs fine without any of them
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build
npm run lint     # ESLint
```

## Content

All business copy, pricing, service areas, and FAQs live in `data/`, not in the page files —
see `ARCHITECTURE.md` for why.
