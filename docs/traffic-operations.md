# DrivePEI organic traffic operations — first 90 days

DrivePEI publishes all active vehicles in the used-inventory feed, including Volkswagen, while keeping the site brand independent. This plan uses real vehicle photos and verified listing details. Staff observations about condition or equipment should appear only after a person who saw the vehicle confirms them. Do not present a payment estimate as a financing offer.

## Weekly production rhythm

| Day | Work | Output |
| --- | --- | --- |
| Monday | Check live inventory and the previous week's search and lead reports | Choose two active, photo-approved vehicles; note stock changes and questions shoppers asked |
| Tuesday | Publish one vehicle photo post to DrivePEI Facebook and a corresponding Instagram photo post/story | Link to that vehicle's DrivePEI page with channel-specific UTM tags |
| Thursday | Publish the second vehicle photo post | Use a different body style, price range or buyer need when possible |
| Friday | Review Search Console, Bing and Activepieces | Record the scorecard below and one improvement for the next week |

A DrivePEI task heartbeat is scheduled for Fridays at 9:00 a.m. Atlantic time through the day-90 review. It will check the available reports and flag actionable changes. GA4 and qualified-lead reporting still depend on the measurement IDs and Activepieces outcome data being available.

Publish two substantive guides per month. The next four guide topics are already in `lib/guides.ts`: high-kilometre vehicles, history reports, test drives and comparing finance offers. Add direct staff observations, original photos or anonymized shopper questions only after they are supplied and approved. Revise source links and facts before a quarterly refresh. Share a relevant guide with a local organization only when it genuinely serves that organization's audience and its communication rules allow it.

## First two social drafts — verify availability before posting

These captions use only the feed fields. The approved photos are on the linked vehicle pages. No condition, inspection, warranty or approval claim is implied. Posts have **not** been published.

**Post 1: 2022 Kia Forte EX IVT — Facebook**

> Looking for a used sedan on PEI? This 2022 Kia Forte EX IVT is currently listed at $15,901 with 124,207 km. See its photos, VIN and details, then ask us to confirm availability before making a trip. https://drivepei.ca/vehicles/2022-kia-forte-3kpf34ad6ne445481?utm_source=facebook&utm_medium=organic_social&utm_campaign=vehicle_spotlight&utm_content=kia_forte_2022
>
> Asking price excludes applicable taxes and fees. Details and availability can change.

**Post 2: 2018 Kia Sportage EX Tech AWD — Facebook**

> Comparing used SUVs on PEI? This 2018 Kia Sportage EX Tech AWD is currently listed at $15,945 with 99,496 km. Review the vehicle details and photos, and ask us about the features that matter to your drive. https://drivepei.ca/vehicles/2018-kia-sportage-kndpncac1j7405464?utm_source=facebook&utm_medium=organic_social&utm_campaign=vehicle_spotlight&utm_content=kia_sportage_2018
>
> Asking price excludes applicable taxes and fees. Details and availability can change.

For Instagram, use the same approved image and concise caption, and attach the corresponding vehicle URL to a Story link sticker with `utm_source=instagram`. Do not describe the caption URL as clickable. Check the live VDP and feed on publication day; replace a vehicle if it has sold or its price changed. Use an approved photo angle for each VIN; do not repost an image that shows franchise signage or the source dealership's branding.

## Staff vehicle-note intake

For each priority VIN, collect:

- The observer's name and date of inspection.
- Factual, first-hand condition observations, including known issues and work completed; avoid unsupported adjectives such as “perfect.”
- Equipment confirmed on that exact VIN, with a source such as a physical check or window sticker.
- One practical use note based on a real viewing or test drive.
- Approved image files or photo angles and confirmation they contain no franchise branding.

The site currently shows practical questions tailored to body style, kilometres and drivetrain on every vehicle page. Add staff-confirmed notes through the existing optional `description` field when the admin database is provisioned, or a reviewed VIN-specific content file in a later site update. Until then, the site does not claim a vehicle's condition or unverified equipment.

## Tracking setup after IDs are supplied

The site already has a GTM injection hook controlled by `NEXT_PUBLIC_GTM_ID`. Set that environment variable in Netlify and publish the container. In GTM, add the GA4 Google tag with the DrivePEI measurement ID; configure a Custom Event trigger for `generate_lead` and send the same GA4 event. The site pushes that event only after `/api/leads` returns success. Map `lead_type`, `traffic_source`, `page_path` and public `vehicle_vin` from the data layer. Mark `generate_lead` as a key event in GA4. Do not pass names, email addresses, phone numbers, message text, click IDs or financial information to GA4.

The site also pushes `credit_application_click` when someone opens the secure application or its external fallback link. Measure it separately. The cross-origin Dealertrack form cannot tell DrivePEI that an application was completed; do not report a click as an approved or completed application. Existing UTM values continue to be sent to Activepieces with leads.

## Weekly scorecard

Record one row per week. Use Search Console and Bing for query and indexing data; use GA4 once configured for vehicle-page visits and successful site events; use Activepieces for the lead outcome. A lead is **qualified** when a human reviewer confirms contact information and a plausible vehicle, budget or trade request. Never export full personal details into an analytics sheet.

| Week ending | Non-brand organic clicks | Indexed pages / issues | Vehicle-page visits | Successful vehicle leads | Alert requests | Qualified leads | Source of qualified leads | Action for next week |
| --- | ---: | --- | ---: | ---: | ---: | ---: | --- | --- |
| Baseline | pending | pending | pending GA4 | pending | pending | pending | pending | Establish baseline after tracking is live |

At day 30, treat the first month as the baseline. At day 90, compare non-brand clicks, vehicle-page visits, inventory-alert requests and qualified leads against that baseline. Investigate pages with impressions but few clicks, and pages with visits but few useful next steps. Avoid promising a fixed traffic target before baseline data exists.

## Search verification status, 26 September 2026

- Google Search Console: `https://drivepei.ca/` property verified with the permanent HTML meta tag. `https://drivepei.ca/sitemap.xml` submitted and resubmitted after the current release and HTTPS certificate were live. Google still showed “Couldn't fetch” immediately afterward while the public XML and robots file returned HTTP 200 and parsed; recheck after its next crawl before changing the sitemap.
- Bing Webmaster Tools: `https://drivepei.ca/` verified with the permanent `msvalidate.01` meta tag. `https://drivepei.ca/sitemap.xml` submitted successfully; Bing's first crawl succeeded. The sitemap updates from the live inventory feed, so discovered URL and image counts change as vehicles arrive and sell.
- DrivePEI Facebook and Instagram accounts do not exist yet. The first two post drafts above are ready for brand-account publication once those accounts are created. No post has been sent from a personal or franchise account.
- The production-configured Activepieces webhook returned HTTP 200 with a lead ID for one synthetic, clearly labeled contact-form test on 26 September 2026. That confirms delivery acknowledgment; the flow's storage step should also be checked in Activepieces.
- Standalone Google Business Profile: not part of this plan because DrivePEI has no separate staffed customer-facing location or permanent DrivePEI signage.
