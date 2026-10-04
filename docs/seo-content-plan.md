# DrivePEI search content plan

## Site intent

Help PEI shoppers compare real used inventory across makes and make informed buying, financing and trade decisions. Keep listing pages tied to the live feed; keep guides useful when a specific vehicle sells. Do not imply a make, model, price, rate, approval or location is available unless the current source confirms it.

## Current page map

| Search intent | Page | Role |
| --- | --- | --- |
| Used cars PEI | `/used` | Main live inventory hub |
| Used cars under $25,000 PEI | `/used-cars-under-25000-pei` | Live budget inventory with an alert path when nothing matches |
| Used SUVs PEI | `/used-suvs-pei` | SUV inventory plus size and capability guidance |
| Used AWD PEI | `/used-awd-pei` | AWD/4WD inventory plus ownership guidance |
| Used cars Charlottetown | `/used-cars-charlottetown` | Local inventory entry point |
| Used Volkswagen, Honda, Kia, Nissan PEI | `/used-volkswagen-pei`, `/used-honda-pei`, `/used-kia-pei`, `/used-nissan-pei` | Current make filters with distinct buying guidance |
| Research before purchase | `/guides` and eighteen article pages | Buying, vehicle choice, financing and trade knowledge |
| Specific VIN or model | `/vehicles/[slug]` | Live vehicle details and inquiry |

## Published in the first expansion

- What to ask when viewing a high-kilometre used car in PEI.
- How to read a vehicle history report and service records.
- What to bring to a used-car test drive.
- How to compare two written vehicle-financing offers.

## Added buying-guide clusters in September 2026

- Choosing between a used sedan and compact SUV with a worked fuel-use comparison.
- Checking a used vehicle for PEI winter, with tire, visibility and underbody questions.
- Understanding the difference between PEI’s annual MVI and a separate pre-purchase inspection.
- Comparing a used hybrid with a gasoline alternative using model-year fuel ratings and vehicle-specific condition checks.

The guide hub groups these topics by buying, vehicle choice, financing and trade-in. Each new article links to relevant live inventory or a useful next step, and the SUV, AWD, Honda and budget inventory pages link back to the matching guide. The sitemap reads `lib/guides.ts`, so new guide URLs appear automatically.

## October 2026 additions and next ideas

The 4 October Google Search Console seven-day view contains 60 impressions and no clicks, with available data from 25-29 September. Queries include used Subaru searches, used cars in PEI and Charlottetown, used-car finance rates and trade value. The homepage has 44 of the 60 reported impressions; the Charlottetown page has five. These are early topic signals, not proof that any new page will rank or convert.

Published in this update:

- `/guides/used-subaru-buying-checklist-pei` answers make-specific research intent with model-fit, service, tire, history and inspection questions. It links to a live Subaru-filtered inventory view, which can honestly show no matches. A Subaru inventory landing page was deferred because only one Subaru was active in the 4 October feed; a near-empty make page would add little value.
- `/guides/used-car-financing-rates-pei` answers rate questions with a clearly hypothetical calculation and a checklist for comparing real written quotes. It does not advertise a current rate or imply approval. The finance page and related financing guides now link to it.

Next content briefs, ordered by shopper usefulness and evidence needed:

1. **What an all-in used-car quote includes in PEI.** Show a worked quote with selling price, applicable taxes, disclosed fees, trade allowance, down payment and amount financed. Verify current PEI rules with official sources and use an approved, anonymized real example before publication. Link from `/finance`, `/trade` and the existing payment guide.
2. **How to prepare for a trade-in appraisal in Charlottetown.** Explain the documents, condition notes, keys, tires and loan-payout information that make an appraisal useful. Add the team's actual appraisal process before publishing; link from `/trade` and the equity guide.
3. **How to plan a used-car viewing when travelling across PEI.** Use real appointment and availability procedures supplied by the team. Improve the existing Charlottetown page and relevant vehicle pages instead of creating near-identical town pages.
4. **Model comparisons from vehicles the team has inspected.** Build a specific comparison only after two or more relevant VINs, verified equipment, original photos and first-hand observations are available. Until then, the live filters and current VIN pages answer model searches more honestly.

At the next Search Console review, prioritize pages gaining impressions without clicks. Check the query, snippet, page title and whether the page answers the intent before adding a new URL. Avoid targeting “Subaru dealer” searches with dealership claims; DrivePEI is a multi-make used-vehicle site.

Future guides should come from real shopper questions and first-hand team observations. A possible next topic is selling a vehicle with an outstanding loan in PEI. Review overlap with existing guides before publishing.

Publish a new piece only when it answers a distinct question with specific examples or verified local detail. Add first-hand observations, original photos or comparisons from the team where available. Avoid near-duplicate city or make pages. Review provincial and federal source links and finance guidance at least quarterly, and update article `updated` dates only when the content changes.

## Publishing checklist

- One clear H1, descriptive title and meta description, self-referencing canonical.
- Accurate facts and current links to official primary sources where rules or lending guidance are discussed.
- Contextual links to useful inventory, a relevant guide and one appropriate inquiry path.
- `Article` and breadcrumb JSON-LD on guides; only mark up content visible on the page.
- Confirm mobile layout, accessibility of links/headings, no franchise branding and no invented offers.
- Add new routes to `app/sitemap.ts`; verify absolute URLs under the production domain.
- Watch Search Console indexing, queries, clicks and engagement; improve pages that answer an incomplete shopper question rather than repeating keywords.

## Sitemap submission after domain launch

The canonical domain is `https://drivepei.ca`. The sitemap contains canonical static pages, guides and current active vehicle URLs with approved listing images. The guide hub's `lastModified` follows the newest published guide update, and new article URLs appear automatically from `lib/guides.ts`. Google Search Console and Bing Webmaster Tools both have the sitemap submitted as of 26 September 2026. Check their processing results and sample URLs after the next crawl. A sitemap helps discovery but does not guarantee indexing.
