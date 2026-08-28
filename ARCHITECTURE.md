# WV Detail Website — Architecture & Current Setup

_Last updated: 2026-08-27. V1 build complete; **not yet deployed**._

## What this is

Production marketing site for **WV Detail**, an auto detailing business in Jackson, Michigan.
Goal: explain services, show pricing, build trust, rank locally, convert visitors into quote
requests. Intentionally simple — no database, no auth, no CMS, no scheduling, no payments,
free-tier services only. Source brief: `C:\Users\Admin\Desktop\wvdetail.txt`.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.3.3, App Router, React 19 |
| Language | TypeScript (strict, no `any`) |
| Styling | Tailwind CSS v4 (no `tailwind.config` — `@theme inline` in `app/globals.css`) |
| Font | Inter via `next/font` |
| Icons | lucide-react only (v1 — no brand icons; Facebook links use `ExternalLink`) |
| Validation | zod (`lib/forms/schema.ts`) |
| Forms | Web3Forms free tier (`https://api.web3forms.com/submit`) |
| Spam | Cloudflare Turnstile + honeypot + 3s minimum submit time |
| Analytics | GA4 (renders only when `NEXT_PUBLIC_GA_ID` set) |
| Hosting | **Vercel** (target; brief said Cloudflare Pages, user chose Vercel) |

All 17 routes prerender **fully static** (`npm run build` is clean; lint and `tsc --noEmit` clean).

## Directory layout

```
wvdetail/
  app/                    # one folder per route; all server components
    page.tsx              # homepage
    layout.tsx            # Inter, metadataBase, LocalBusiness JSON-LD, GA, skip link
    globals.css           # design tokens (@theme inline), focus/motion rules
    sitemap.ts robots.ts not-found.tsx
    services/{,interior-detailing,exterior-detailing,complete-detailing}/page.tsx
    gallery/ reviews/ about/ faq/ quote/ contact/ privacy/
    service-area/{,jackson-mi}/page.tsx
  components/
    ui/         Container, Section (dark/surface/light tones), Button/ButtonLink, SectionHeading
    layout/     Header, MobileNav*, Footer, MobileActionBar, Logo
    marketing/  Hero, TrustStrip, ServiceCard, PricingCard, FAQAccordion*, CTASection
    home/       FeaturedServices, BeforeAfterPlaceholder, WhyWvDetail, PricingPreview,
                ReviewsSection, ServiceAreaSection, FaqPreview
    services/   ServicePageHeader, ServiceDetail, VehicleSizeGuide, AddonList, PricingNote
    gallery/    GalleryGrid*, BeforeAfterComparison*, GalleryEmptyState
    reviews/    ReviewCard, ReviewGrid
    forms/      QuoteForm*, ContactForm*, ContactActions, FormField, TurnstileWidget*
    seo/        JsonLd, LocalBusinessJsonLd, BreadcrumbJsonLd, FaqJsonLd
    analytics/  GoogleAnalytics
  data/         # single source of truth for ALL business content — edit here, never in pages
    business.ts services.ts addons.ts faqs.ts reviews.ts gallery.ts serviceAreas.ts navigation.ts
  lib/
    todo.ts     isTodo()/resolved() — the TODO-gating helpers (see below)
    cn.ts
    forms/      schema.ts (zod), submit.ts (submitQuote/submitContactMessage)
    seo/        config.ts (siteUrl, absoluteUrl), jsonLd.ts (typed builders)
    analytics/  events.ts (typed event names), gtag.ts (no-op when GA unset)
  types/index.ts
```
`*` = client component. Client JS is limited to: mobile nav, FAQ accordion, gallery filter/slider, forms, Turnstile.

## Design system

CSS vars in `globals.css`, exposed as `bg-wv-*` / `text-wv-*` utilities:
near-black `#0a0b0c`, surface `#131518` / `#1b1e22`, borders `#292d33`/`#3a3f47`,
text `#f5f6f7` / muted `#a3a9b3` / subtle `#7c828c`, off-white light section `#f4f4f2` (ink `#14161a`),
accent red `#d21f27` (hover `#b81a21`, soft `#f05a60` for small marks on dark where solid red fails contrast).
Red = CTAs/accents only. Hero uses a masked line-grid (`.wv-hero-grid`) — **no imagery, no stock photos**.
Global `:focus-visible` outline; `prefers-reduced-motion` kills all animation. Tagline: "Drive Cleaner. Feel Better."

## The TODO-gating pattern (important)

Unverified business facts in `data/business.ts` are strings starting with `"TODO:"` —
phone, email, Facebook URL, Google profile/reviews URL, hours. `lib/todo.ts` (`isTodo`/`resolved`)
gates every consumer: call/text buttons, footer contact rows, hours, Facebook links,
Google reviews CTA, and the corresponding JSON-LD fields all **render nothing** until the
value is filled in — then appear automatically everywhere. Never fabricate these facts.
Same rule: `data/reviews.ts` and `data/gallery.ts` ship **empty** (real reviews/photos only);
pages render professional empty states. Operational FAQs (hours, payment, weather, mobile
service) are `todo: true` in `faqs.ts` and excluded from render.

## Services & pricing (all in `data/services.ts` / `addons.ts` — never hardcoded in pages)

Vehicle classes: Car / Mid-size / Large; oversize → "Contact us for pricing".
Interior Refresh 75/90/110 · Deep Interior 150/175/200 · Exterior 75/90/105 ·
Exterior + Decon 125/145/165 · Complete 140/165/195 · Deep Complete 225/255/285 (flagship,
"Best for a full reset"). Add-ons: Engine Bay $60, Pet Hair $40+, Stain $50–100+, Odor $50–60+,
Undercarriage quote-based. `conditionDisclaimer` string lives in services.ts and is reused
near all pricing and the quote form. Bundle savings on /services/complete-detailing are
computed from component prices at build.

## Forms

`QuoteForm` (UI) is deliberately decoupled from `submitQuote()` in `lib/forms/submit.ts`
so the delivery mechanism can be swapped later without touching UI. Submission → Web3Forms
POST with Turnstile token, honeypot, min-submit-time. With no env keys set (current state):
Turnstile skips rendering, submit fails gracefully to the error state, nothing throws.
Success/error copy is fixed per the brief; no response-time promises. Never expose API
responses/keys in the UI.

## Environment variables (`.env.example`)

| Var | Purpose | When absent |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical/OG/sitemap base | falls back to `https://wvdetail.com` |
| `NEXT_PUBLIC_GA_ID` | GA4 | analytics fully disabled |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | form delivery (public-safe key) | submit shows error state |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | spam protection | Turnstile skipped |

## Current status & remaining launch tasks

Done: all 14 public routes + 404, sitemap/robots, JSON-LD (LocalBusiness/Breadcrumb/FAQ),
metadata + canonicals everywhere, GA wiring, accessibility fundamentals, clean production build.
Local git repo initialized with one commit (identity: brienmg@gmail.com). Dev server config:
`Website/.claude/launch.json` → name `wvdetail`, port 3000.

**Not done yet:**
1. **Deploy to Vercel** — team `team_0PPSRMNUqBJFEHeDNSHk2UNu` ("brien g's projects", hobby).
   No GitHub CLI on this machine; options: (a) install `gh`, create repo, push, link via
   Vercel git integration (preferred — auto-deploys), or (b) direct file upload via the
   Vercel MCP `deploy_to_vercel` tool (a full source dump for this exists from a prior
   attempt). Two deploy attempts were interrupted before launch.
2. Fill `data/business.ts` TODOs (phone, email, Facebook, Google URLs, hours) — verified values only.
3. Create Web3Forms key + Turnstile site key; set the 4 env vars in Vercel.
4. Point `wvdetail.com` (or final domain) at Vercel; set `NEXT_PUBLIC_SITE_URL`.
5. Post-launch ops: Search Console verify + submit sitemap; confirm GA events; test a real
   form submission end-to-end.
6. Content when available: real before/after photos → `data/gallery.ts`; real reviews →
   `data/reviews.ts`; owner blurb on /about (marked TODO comment).

## Conventions for future work

- Edit content in `data/` only; pages read from it.
- Keep components server-side unless interaction demands client.
- Don't add paid services, databases, auth, scheduling, or CMS without explicit approval.
- Don't fabricate business facts, reviews, or ratings — extend the TODO-gating pattern instead.
- Sibling folder `Website/crm` is a separate unrelated app — never touch it from this project.
