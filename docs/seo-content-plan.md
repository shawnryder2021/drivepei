# DrivePEI search content plan

## Site intent

Help PEI shoppers compare real off-make used inventory and make informed buying, financing and trade decisions. Keep listing pages tied to the live feed; keep guides useful when a specific vehicle sells. Do not imply a make, model, price, rate, approval or location is available unless the current source confirms it.

## Current page map

| Search intent | Page | Role |
| --- | --- | --- |
| Used cars PEI | `/used` | Main live inventory hub |
| Used SUVs PEI | `/used-suvs-pei` | SUV inventory plus size and capability guidance |
| Used AWD PEI | `/used-awd-pei` | AWD/4WD inventory plus ownership guidance |
| Used cars Charlottetown | `/used-cars-charlottetown` | Local inventory entry point |
| Used Honda, Kia, Nissan PEI | `/used-honda-pei`, `/used-kia-pei`, `/used-nissan-pei` | Current make filters with distinct buying guidance |
| Research before purchase | `/guides` and six article pages | Buying, vehicle choice, financing and trade knowledge |
| Specific VIN or model | `/vehicles/[slug]` | Live vehicle details and inquiry |

## Next articles to produce from actual shopper questions

1. What to ask when viewing a high-kilometre used car in PEI.
2. How to read a vehicle history report and service records.
3. Compact SUV versus sedan for an Island commute.
4. How to compare two written vehicle-financing offers.
5. What to bring to a used-car test drive.
6. Selling a car with an outstanding loan in PEI.

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

Set `NEXT_PUBLIC_SITE_URL=https://drivepei.ca` (or the final canonical domain) in Netlify and redeploy. Check `https://drivepei.ca/robots.txt` and `https://drivepei.ca/sitemap.xml` in a browser. The sitemap contains canonical static pages, guides and current active vehicle URLs. Verify the domain property in Google Search Console, open **Sitemaps**, and submit `https://drivepei.ca/sitemap.xml`. Inspect any processing errors and sample URLs afterward. A sitemap helps discovery but does not guarantee indexing.
