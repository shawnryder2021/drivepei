# Used inventory image audit — 26 September 2026

The public used-inventory feed contained 43 active vehicles, including 30 Volkswagens. Every vehicle is included in DrivePEI's inventory and sitemap.

The feed's `mb` image URLs are only 380 × 285 pixels. For VINs with genuine photos, DrivePEI serves the source CDN's matching `cba` version at 1200 × 900 pixels on vehicle detail pages. Inventory cards use the 800 × 600 `s8` version; gallery thumbnails use `mb` to avoid downloading full-size images for small buttons.

Photo angles 4–7 were checked for every active VIN by content type and dimensions, then visually reviewed for franchise signage. The resulting `lib/photo-policy.json` approves 125 high-resolution angles for 32 VINs. Two rear photos of VIN `3VW2T7BU5RM018560` were excluded because a dealership plate is visible. One portrait-format angle was excluded because it would crop poorly in the landscape gallery.

Eleven VINs have no genuine photo in the source feed: `3VV4B7AX9RM042212`, `3VVGX7B24RM015484`, `WVWFB7CD4RW225592`, `1V2FE2CA9MC228125`, `3VV2B7AX1MM039773`, `3VV8B7AX6PM032641`, `3CZRU6H30LM103296`, `3VWG57AU2KM013937`, `3VV4B7AX8PM122758`, `3VV4B7AX3RM142564`, and `3VV8B7AXXNM162502`. Their URLs return the image provider's identical 480 × 640 placeholder. DrivePEI shows its own vector “photos coming soon” panel on those listings. Add real, approved photos when available; do not present a generic graphic as a photo of the vehicle.

All 43 vehicle detail routes were checked locally. Each returned HTTP 200 and displayed either an approved full-size gallery or the honest no-photo panel. New feed VINs appear in inventory automatically but need photo review before their images are added to `lib/photo-policy.json`.
