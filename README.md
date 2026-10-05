# DrivePEI

An independent, mobile-first PEI used-vehicle site. The public site contains **no dealership franchise branding** and lists **all active vehicles in the used-inventory feed**, including Volkswagen.

## Features

- Live public used-inventory spreadsheet feed, normalized on the server and filtered to active stock; checked-in last-known snapshot keeps the site usable if the sheet is briefly unavailable.
- Search and filters for make, body, price, kilometres, year, AWD/4WD, and an optional payment target using a shopper-supplied rate and term.
- Vehicle pages with curated source photo galleries, VIN-specific shopping questions, details, payment exploration, inquiry form, similar vehicles, and fallback for unavailable stock.
- Secure Dealertrack credit application iframe with an external-link fallback.
- Car Finder, sell/trade, finance question, and contact forms.
- Activepieces webhook delivery with an ADF 1.0 XML copy of every lead. PostgreSQL storage and admin retry are available later when a database is provisioned.
- Inventory sync, inactive vehicle handling, featured vehicle controls, sync logs, a live image-aware XML sitemap, robots.txt, structured vehicle and article data, GTM hook, and UTM capture.
- PEI buying-guide hub, 21 practical articles and distinct live inventory pages for SUVs, AWD/4WD, trucks, Tiguans, Atlas-family SUVs, vehicles under $25,000, Charlottetown, Summerside, Volkswagen, Honda, Kia and Nissan.
- Google and Bing site-verification tags, a direct GA4 tag (G-1MDL2W3N31), successful-lead and credit-application click events in GA4 and the optional GTM data layer, and a 90-day traffic operations guide.

## Run locally

Requires Node 22 or newer.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Fill `.env.local` with real values. Do not commit the file. The site and lead forms work without a database when `LEAD_WEBHOOK_URL` is configured. A form reports success only after Activepieces returns a successful HTTP response. Configure the Activepieces flow to save every inbound lead before downstream notifications.

## Required production setup

1. Set `LEAD_WEBHOOK_URL`, `NEXT_PUBLIC_CREDIT_IFRAME_URL`, and `NEXT_PUBLIC_SITE_URL` in Netlify environment variables. `LEAD_WEBHOOK_BEARER_TOKEN` is optional if the webhook requires it.
2. The published DrivePEI Activepieces flow stores `adf_xml` in project Storage using `lead.id` as the key. If adding notifications or CRM updates, use this stored XML or the same webhook field. The website treats only an HTTP 2xx webhook response as success. See `docs/adf-leads.md` for the field mapping.
3. The GA4 tag is already in the shared page head. If adding `NEXT_PUBLIC_GTM_ID` for other tags, do not configure a second GA4 Google tag or duplicate GA4 lead events in GTM. Set `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` together to enable Cloudflare Turnstile on forms. Google and Bing verification tags are included in the site header.
4. In Netlify, import this repository as a Next.js site. Build command: `npm run build`; publish directory: `.next`. The included `netlify.toml` supplies these values.
5. Optional later: create PostgreSQL, run `db/001_init.sql`, and set `DATABASE_URL`, `ADMIN_TOKEN`, and `SYNC_TOKEN`. Then import inventory via `/admin` or `POST /api/admin/sync`. Add the GitHub Actions secrets `DRIVEPEI_SITE_URL` and `DRIVEPEI_SYNC_TOKEN` to schedule hourly imports. Until then, the site reads the live sheet directly.

## Data flow

The site reads the public `Used Inventory` sheet produced by the existing daily Apps Script. Its live `syncInventory` trigger runs between 6 and 7 a.m. Atlantic; on 2 October 2026 the trigger showed a successful 6:31 a.m. run and 0% error rate. The script scans Brown's used search pages and vehicle detail pages. An independent same-day audit found all 43 structured-data used VINs in the 43 active feed rows and matched each vehicle's live asking price and kilometres to the feed. The server ignores inactive rows, and Next.js refreshes the feed every 15 minutes. The homepage spotlights and featured vehicles use only a successful, consistently dated live-sheet read: yesterday's sync is accepted before 9 a.m. Atlantic, and today's sync is required afterward. If that check fails, the homepage shows its scenic hero and a Car Finder prompt instead of an unverified vehicle. Inventory and vehicle pages show the source update date, and warn when it is more than one PEI calendar day old or unknown. The checked-in snapshot keeps those browsing pages usable if the sheet is briefly unavailable; the dated warning also applies to that fallback. Check Apps Script's **Triggers** and **Executions** views if the date falls behind. `lib/photo-policy.json` lists approved, brand-neutral photo angles for current VINs. Validated listing photos use the source CDN's 1200 × 900 version on vehicle pages; cards use 800 × 600 and thumbnails use 380 × 285. Vehicles without genuine photos show a sharp vector placeholder rather than the source's generic 480 × 640 missing-photo image. Review new VINs before adding approved angles to the policy. The optional PostgreSQL importer upserts by VIN, preserves `featured` and `description` overrides, and deactivates missing units only after a successful feed read.

Shoppers can save up to three vehicles for side-by-side comparison at `/compare`. Picks remain only in that browser's local storage; vehicles that leave the active feed are flagged as unavailable. This feature sends no shopper data to the server.

Forms accept contact details and context only. The full credit application is handled within Dealertrack; sensitive credit details are not collected by DrivePEI. With no database, each lead is sent as a JSON `drivepei.lead.created` event directly to Activepieces, containing both the structured `lead` and an ADF 1.0 XML string in `adf_xml`. The published Activepieces flow writes that XML to project Storage. A webhook failure returns an error to the shopper. With PostgreSQL configured later, leads are stored first; failed delivery is visible in `/admin` for retry.

## Verification

```sh
npm run build
npm run typecheck
npm test
```

Before launch, confirm the Dealertrack iframe allows embedding on the final domain, submit a controlled test lead and confirm Activepieces stored it, and verify GA4 and Search Console. The Activepieces storage and notification flow must be active before customer traffic is sent to the site.

## Search content and sitemap

The editorial map and publishing checklist are in `docs/seo-content-plan.md`; the weekly publishing and measurement process is in `docs/traffic-operations.md`. The current photo review is in `docs/inventory-image-audit.md`. The sitemap is generated at `/sitemap.xml` and listed in `/robots.txt`; set `NEXT_PUBLIC_SITE_URL` to the final canonical domain before deployment. New guide pages must be added to `lib/guides.ts`; the sitemap includes them automatically. Add other new routes to `app/sitemap.ts`.

## Design assets

`public/images/drivepei-logo.png` is the supplied DrivePEI logo; the palette is documented in `docs/brand.md`. When the latest feed passes the homepage freshness check, the hero rotates through up to six distinct models with active VINs and approved 1200 × 900 inventory photos. It favors a mix of truck, Tiguan, Atlas-family, sedan and other models when they are in stock. Visitors can choose a model or pause rotation; reduced-motion preferences start it paused. Each slide links to its current vehicle page. When the daily inventory sheet removes a model, it drops out after the site's next 15-minute refresh. If the feed is delayed or unavailable, the original scenic image appears. `public/images/pei-coastal-drive.webp` and `public/images/pei-next-drive.webp` are original AI-generated editorial images for DrivePEI. They are illustrative; vehicle listing photos come from the inventory source.

# Deployment note

The FreshStartPEI page currently references the same Dealertrack URL supplied for this build. That URL returned HTTP 404 during validation on 25 September 2026, so the finance page should be given a working `NEXT_PUBLIC_CREDIT_IFRAME_URL` before launch.
