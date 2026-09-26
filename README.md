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
- PEI buying-guide hub, twelve practical articles and distinct inventory landing pages for SUVs, AWD/4WD, vehicles under $25,000, Charlottetown, Volkswagen, Honda, Kia and Nissan.
- Google and Bing site-verification tags, successful-lead and credit-application click events in the GTM data layer, and a 90-day traffic operations guide.

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
2. Configure the Activepieces flow to save each inbound lead, including its `adf_xml` field, and send notifications or CRM updates. The website treats only an HTTP 2xx response as success. Use the `lead.id` value to deduplicate retries. See `docs/adf-leads.md` for the field mapping.
3. Add `NEXT_PUBLIC_GTM_ID` after creating the GTM container and configure the GA4 events described in `docs/traffic-operations.md`. Set `TURNSTILE_SECRET_KEY` and `NEXT_PUBLIC_TURNSTILE_SITE_KEY` together to enable Cloudflare Turnstile on forms. Google and Bing verification tags are included in the site header.
4. In Netlify, import this repository as a Next.js site. Build command: `npm run build`; publish directory: `.next`. The included `netlify.toml` supplies these values.
5. Optional later: create PostgreSQL, run `db/001_init.sql`, and set `DATABASE_URL`, `ADMIN_TOKEN`, and `SYNC_TOKEN`. Then import inventory via `/admin` or `POST /api/admin/sync`. Add the GitHub Actions secrets `DRIVEPEI_SITE_URL` and `DRIVEPEI_SYNC_TOKEN` to schedule hourly imports. Until then, the site reads the live sheet directly.

## Data flow

The site reads the public `Used Inventory` sheet produced by the existing daily Apps Script. The server ignores inactive rows. Inventory data is refreshed every 15 minutes in the Next.js cache. `lib/photo-policy.json` lists approved, brand-neutral photo angles for current VINs. Validated listing photos use the source CDN's 1200 × 900 version on vehicle pages; cards use 800 × 600 and thumbnails use 380 × 285. Vehicles without genuine photos show a sharp vector placeholder rather than the source's generic 480 × 640 missing-photo image. Review new VINs before adding approved angles to the policy. The optional PostgreSQL importer upserts by VIN, preserves `featured` and `description` overrides, and deactivates missing units only after a successful feed read.

Forms accept contact details and context only. The full credit application is handled within Dealertrack; sensitive credit details are not collected by DrivePEI. With no database, each lead is sent as a JSON `drivepei.lead.created` event directly to Activepieces, containing both the structured `lead` and an ADF 1.0 XML string in `adf_xml`. Activepieces must store it. A webhook failure returns an error to the shopper. With PostgreSQL configured later, leads are stored first; failed delivery is visible in `/admin` for retry.

## Verification

```sh
npm run build
npm run typecheck
npm test
```

Before launch, confirm the Dealertrack iframe allows embedding on the final domain, submit a controlled test lead and confirm Activepieces stored it, and verify the GTM/GA4 and Search Console setup. The Activepieces storage and notification flow must be active before customer traffic is sent to the site.

## Search content and sitemap

The editorial map and publishing checklist are in `docs/seo-content-plan.md`; the weekly publishing and measurement process is in `docs/traffic-operations.md`. The current photo review is in `docs/inventory-image-audit.md`. The sitemap is generated at `/sitemap.xml` and listed in `/robots.txt`; set `NEXT_PUBLIC_SITE_URL` to the final canonical domain before deployment. New guide pages must be added to `lib/guides.ts`; the sitemap includes them automatically. Add other new routes to `app/sitemap.ts`.

## Design assets

`public/images/drivepei-logo.png` is the supplied DrivePEI logo; the palette is documented in `docs/brand.md`. `public/images/pei-coastal-drive.webp` and `public/images/pei-next-drive.webp` are original AI-generated editorial images for DrivePEI. They are illustrative; vehicle listing photos come from the inventory source.

# Deployment note

The FreshStartPEI page currently references the same Dealertrack URL supplied for this build. That URL returned HTTP 404 during validation on 25 September 2026, so the finance page should be given a working `NEXT_PUBLIC_CREDIT_IFRAME_URL` before launch.
