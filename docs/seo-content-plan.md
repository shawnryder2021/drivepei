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
| Research before purchase | `/guides` and ten article pages | Buying, vehicle choice, financing and trade knowledge |
| Specific VIN or model | `/vehicles/[slug]` | Live vehicle details and inquiry |

## Published in the first expansion

- What to ask when viewing a high-kilometre used car in PEI.
- How to read a vehicle history report and service records.
- What to bring to a used-car test drive.
- How to compare two written vehicle-financing offers.

Future guides should come from real shopper questions and first-hand team observations. Candidates include comparing a compact SUV with a sedan for an Island commute and selling a vehicle with an outstanding loan in PEI. Review overlap with existing guides before publishing.

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

The canonical domain is `https://drivepei.ca`. The sitemap contains canonical static pages, guides and current active vehicle URLs with approved listing images. Google Search Console and Bing Webmaster Tools both have the sitemap submitted as of 26 September 2026. Check their processing results and sample URLs after the next crawl. A sitemap helps discovery but does not guarantee indexing.
