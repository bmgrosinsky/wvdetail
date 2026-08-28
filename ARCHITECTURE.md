# WV Detail Website — Architecture

## What this is

Production marketing site for **WV Detail**, an auto detailing business in Jackson, Michigan.
Goal: explain services, show pricing, build trust, rank locally, and convert visitors into quote
requests. Intentionally simple — no database, no auth, no CMS, no scheduling, no payments,
free-tier services only.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16, App Router, React 19 |
| Language | TypeScript (strict, no `any`) |
| Styling | Tailwind CSS v4 (no `tailwind.config` — `@theme inline` in `app/globals.css`) |
| Font | Inter via `next/font` |
| Icons | lucide-react only |
| Validation | zod (`lib/forms/schema.ts`) |
| Forms | Web3Forms free tier |
| Spam protection | Cloudflare Turnstile + honeypot + minimum submit time |
| Analytics | GA4 (renders only when `NEXT_PUBLIC_GA_ID` is set) |
| Hosting | Vercel |

All routes prerender fully static except `/quote`, which reads a `?service=` query param to
pre-fill the form and so opts into per-request rendering. `npm run build`, `eslint`, and
`tsc --noEmit` are all clean.

## Directory layout

```
wvdetail/
  app/                    # one folder per route; all server components
    page.tsx              # homepage
    layout.tsx            # Inter, metadataBase, LocalBusiness JSON-LD, GA, skip link
    globals.css            # design tokens (@theme inline), focus/motion rules
    sitemap.ts robots.ts not-found.tsx
    services/{,interior-detailing,exterior-detailing,complete-detailing}/page.tsx
    gallery/ reviews/ about/ faq/ quote/ contact/ privacy/
    service-area/{,jackson-mi}/page.tsx
  components/
    ui/         Container, Section (dark/surface/light tones), Button/ButtonLink, SectionHeading
    layout/     Header, MobileNav*, Footer, MobileActionBar, Logo
    marketing/  Hero, TrustStrip, ServiceCard, PricingCard, FAQAccordion*, CTASection
    home/       FeaturedServices, HowItWorks, BeforeAfterPlaceholder, WhyWvDetail,
                PricingPreview, ReviewsSection, ServiceAreaSection, FaqPreview
    services/   ServicePageHeader, ServiceDetail, VehicleSizeGuide, AddonList, PricingNote
    gallery/    GalleryGrid*, BeforeAfterComparison*, GalleryEmptyState
    reviews/    ReviewCard, ReviewGrid
    forms/      QuoteForm*, ContactForm*, ContactActions, FormField, TurnstileWidget*
    seo/        JsonLd, LocalBusinessJsonLd, BreadcrumbJsonLd, FaqJsonLd
    analytics/  GoogleAnalytics
  data/         # single source of truth for all business content — edit here, never in pages
    business.ts services.ts addons.ts faqs.ts reviews.ts gallery.ts serviceAreas.ts navigation.ts
  lib/
    todo.ts     isTodo()/resolved() — the TODO-gating helpers (see below)
    cn.ts
    forms/      schema.ts (zod), submit.ts (submitQuote/submitContactMessage)
    seo/        config.ts (siteUrl, absoluteUrl), jsonLd.ts (typed builders)
    analytics/  events.ts (typed event names), gtag.ts (no-op when GA unset)
  types/index.ts
  proxy.ts      # sends X-Robots-Tag: noindex on the *.vercel.app alias
```
`*` = client component. Client JS is limited to: mobile nav, FAQ accordion, gallery filter/slider,
forms, Turnstile.

## Design system

CSS vars in `globals.css`, exposed as `bg-wv-*` / `text-wv-*` utilities:
near-black `#0a0b0c`, surface `#131518` / `#1b1e22`, borders `#292d33`/`#3a3f47`,
text `#f5f6f7` / muted `#a3a9b3` / subtle `#7c828c`, off-white light section `#f4f4f2` (ink `#14161a`),
accent red `#d21f27` (hover `#b81a21`, soft `#f05a60` for small marks on dark where solid red fails contrast).
Red is reserved for CTAs and accents. The hero uses a masked line-grid (`.wv-hero-grid`) instead
of stock photography. Global `:focus-visible` outline; `prefers-reduced-motion` disables animation.

## The TODO-gating pattern

Unverified business facts in `data/business.ts` are strings starting with `"TODO:"` —
phone, email, Facebook URL, Google profile/reviews URL, hours. `lib/todo.ts` (`isTodo`/`resolved`)
gates every consumer: call/text buttons, footer contact rows, hours, Facebook links, the Google
reviews CTA, and the corresponding JSON-LD fields all render nothing until the value is filled
in, then appear automatically everywhere they're used. The goal is to never ship a fabricated
phone number, rating, or review. The same rule applies to `data/reviews.ts` and `data/gallery.ts`,
which ship empty until there's real content, and to operational FAQs in `data/faqs.ts` (hours,
payment, mobile-vs-shop service), which are marked `todo: true` and excluded from render until
verified.

## Services & pricing

All service and add-on content lives in `data/services.ts` / `data/addons.ts` — never hardcoded
in pages. Vehicle classes are Car / Mid-size / Large, with oversize vehicles routed to "Contact
us for pricing." Bundle savings on `/services/complete-detailing` are computed from the component
service prices rather than written down separately, so they can't drift out of sync.

## Forms

`QuoteForm` (UI) is decoupled from `submitQuote()` in `lib/forms/submit.ts` so the delivery
mechanism can be swapped later without touching the UI. Submission is a Web3Forms POST guarded
by a Turnstile token, a honeypot field, and a minimum-submit-time check. With no env keys set,
Turnstile simply doesn't render and submission fails gracefully to an error state — nothing
throws.

## Environment variables (`.env.example`)

| Var | Purpose | When absent |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | canonical/OG/sitemap base | falls back to `https://wvdetail.com` |
| `NEXT_PUBLIC_GA_ID` | GA4 | analytics fully disabled |
| `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` | form delivery (public-safe key) | submit shows error state |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | spam protection | Turnstile skipped |

## Conventions for future work

- Edit content in `data/` only; pages read from it.
- Keep components server-side unless interaction demands client.
- Don't add paid services, databases, auth, scheduling, or a CMS without a clear reason.
- Don't fabricate business facts, reviews, or ratings — extend the TODO-gating pattern instead.
