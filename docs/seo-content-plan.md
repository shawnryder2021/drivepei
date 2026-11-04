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
| Used cars Summerside | `/used-cars-summerside-pei` | Online shopping and viewing-planning entry point; no Summerside storefront claim |
| Used trucks PEI | `/used-trucks-pei` | Live pickup inventory and vehicle-specific work/towing questions |
| Used Tiguan PEI | `/used-volkswagen-tiguan-pei` | Live Tiguan-only results and model/trim comparison |
| Used Atlas PEI | `/used-volkswagen-atlas-pei` | Live Atlas and Atlas Cross Sport results with distinct model guidance |
| Used Volkswagen, Honda, Kia, Nissan PEI | `/used-volkswagen-pei`, `/used-honda-pei`, `/used-kia-pei`, `/used-nissan-pei` | Current make filters with distinct buying guidance |
| Research before purchase | `/guides` and 24 article pages | Buying, vehicle choice, financing and trade knowledge |
| Specific VIN or model | `/vehicles/[slug]` | Live vehicle details and inquiry |

Each active VIN page now has a 300-plus-word editorial baseline assembled from feed facts (year, make, model, trim, price, kilometres, body and drivetrain) and a three-question PEI FAQ about availability, inspection and winter suitability. This applies to future feed arrivals through the shared vehicle-page template. The text explicitly asks shoppers to verify condition, equipment and paperwork; it does not claim an unverified inspection or included feature. The length is a DrivePEI editorial requirement, not a Google ranking threshold. Add team-confirmed observations and genuine photos to priority VINs so pages offer more than shared buying advice.

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

The guide hub groups these topics by buying, vehicle choice, financing and trade-in. Each of its topic sections links to relevant live inventory. All 24 article pages also carry two descriptive inventory links inside the article, placed after the section where that comparison is useful. The destinations include canonical category pages and filtered `/used` views; the filter values must continue to work even when the live feed has no matches. The mapping in `lib/guide-shopping-links.ts` and its coverage test must be updated when a guide is added. The SUV, AWD, Honda and budget inventory pages link back to matching guides. The sitemap reads `lib/guides.ts`, so new guide URLs appear automatically; these link changes create no new sitemap URLs.

## October 2026 additions and next ideas

The 4 October Google Search Console seven-day view contains 60 impressions and no clicks, with available data from 25-29 September. Queries include used Subaru searches, used cars in PEI and Charlottetown, used-car finance rates and trade value. The homepage has 44 of the 60 reported impressions; the Charlottetown page has five. These are early topic signals, not proof that any new page will rank or convert.

Published in this update:

- `/guides/used-subaru-buying-checklist-pei` answers make-specific research intent with model-fit, service, tire, history and inspection questions. It links to a live Subaru-filtered inventory view, which can honestly show no matches. A Subaru inventory landing page was deferred because only one Subaru was active in the 4 October feed; a near-empty make page would add little value.
- `/guides/used-car-financing-rates-pei` answers rate questions with a clearly hypothetical calculation and a checklist for comparing real written quotes. It does not advertise a current rate or imply approval. The finance page and related financing guides now link to it.

The next 4 October expansion followed the active feed: 3 pickups, 11 Tiguans, and 9 Atlas or Atlas Cross Sport vehicles. The truck, Tiguan and Atlas-family landing pages scope the inventory itself, so resetting client-side filters cannot show unrelated stock. They display the latest feed timestamp and matching count; if stock sells out, visitors still have a Car Finder path. The Summerside page helps western PEI shoppers plan an appointment and expressly says DrivePEI has no separate Summerside storefront.

Three distinct buyer questions now have dedicated guides: PEI registration and ownership transfer, winter tire choices and studded-tire dates, and dealer versus Kijiji private-sale comparisons. The articles link to the PEI government and the federal Office of Consumer Affairs for rules and buyer checks. Existing inventory and guide pages link into these topics. Review legal and seasonal details against official sources at each substantive refresh.

Next content briefs, ordered by shopper usefulness and evidence needed:

1. **What an all-in used-car quote includes in PEI.** Show a worked quote with selling price, applicable taxes, disclosed fees, trade allowance, down payment and amount financed. Verify current PEI rules with official sources and use an approved, anonymized real example before publication. Link from `/finance`, `/trade` and the existing payment guide.
2. **How to prepare for a trade-in appraisal in Charlottetown.** Explain the documents, condition notes, keys, tires and loan-payout information that make an appraisal useful. Add the team's actual appraisal process before publishing; link from `/trade` and the equity guide.
3. **Improve the Summerside appointment flow.** Use real appointment and availability procedures supplied by the team to make the Summerside page more useful. Avoid near-identical town pages.
4. **Model comparisons from vehicles the team has inspected.** Build a specific comparison only after two or more relevant VINs, verified equipment, original photos and first-hand observations are available. Until then, the live filters and current VIN pages answer model searches more honestly.

At the next Search Console review, prioritize pages gaining impressions without clicks. Check the query, snippet, page title and whether the page answers the intent before adding a new URL. Avoid targeting “Subaru dealer” searches with dealership claims; DrivePEI is a multi-make used-vehicle site.

Future guides should come from real shopper questions and first-hand team observations. A possible next topic is selling a vehicle with an outstanding loan in PEI. Review overlap with existing guides before publishing.

Publish a new piece only when it answers a distinct question with specific examples or verified local detail. Add first-hand observations, original photos or comparisons from the team where available. Avoid near-duplicate city or make pages. Review provincial and federal source links and finance guidance at least quarterly, and update article `updated` dates only when the content changes.

## November 3 expansion and priorities

The latest reviewed search data (October 22–28) showed 91 Google impressions and no clicks; the registration guide accounted for 74 impressions. This is a discovery signal, not evidence of traffic growth. The November 3 live inventory contained nine Tiguans, seven Atlas-family SUVs and two pickups, supporting useful research content linked to those categories.

Published three distinct guides, bringing the library to 24:

- `/guides/pei-used-car-bill-of-sale-checklist`: purchase-record details and the distinction between a receipt and ownership-transfer paperwork, sourced to PEI government guidance.
- `/guides/used-truck-inspection-checklist-pei`: practical cab, bed, underbody, load and inspection questions, linked to current truck and AWD inventory.
- `/guides/used-tiguan-vs-atlas-pei`: a comparison checklist for actual used SUVs, separating Atlas and Atlas Cross Sport and asking buyers to confirm exact equipment. This is not a firsthand vehicle review.

Each guide has contextual inventory links, related guides, sources, unique metadata, a canonical URL, Article and breadcrumb markup, and an automatic sitemap entry. Existing relevant guides and category pages link into the new material. The homepage now selects the three newest published guides by date rather than array position.

Next work, in priority order:

1. **Improve priority VIN pages with original evidence.** Ask staff for approved photographs and three useful observations per vehicle: condition, confirmed equipment and practical fit. Start with photographed Tiguans, Atlas-family SUVs and pickups. Keep observations attached to the exact VIN and remove availability claims when it leaves stock.
2. **Upgrade the SUV checklist with a real comparison.** Photograph cargo space and seating in two available vehicles and add staff-confirmed measurements and observations. Retain the evergreen guide URL; distinguish model years and trims.
3. **Publish the appraisal-process and all-in-quote briefs above.** Use the team's actual process and an approved anonymized quote, verifying applicable rules before publication. These should answer questions existing finance pages do not already cover.
4. **Earn relevant local referral links.** Offer the registration and bill-of-sale guides to PEI newcomer organizations, driving schools and community publishers when useful to their readers. Prepare individual outreach drafts for approval; no outreach or social publication is authorized by this document alone.
5. **Improve snippets using query evidence.** Review registration-guide queries and page-level click-through rate after recrawl. Match title and opening answer to actual intent; do not repeatedly rewrite titles based on a handful of impressions.

Weekly measurement: Google non-brand clicks and impressions by guide/category, guide-to-inventory visits, vehicle-page visits, successful lead events by source, and qualified outcomes where available. Compare rolling 28-day periods and annotate publication dates. Do not label credit-link clicks as applications. Qualified outcomes and alert-specific baseline counts remain unverified; aggregate them only when the reporting source is available. Avoid claiming ranking gains from new URLs alone.

The submitted sitemap updates automatically. Verify that these URLs appear and return HTTP 200; repeated sitemap submissions are unnecessary. Avoid near-identical town/model pages and prioritize improvements to pages already attracting relevant impressions.

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
