# DrivePEI ADF leads

Every successful form submission sends the existing JSON event to Activepieces. The event now has two sibling fields:

- `lead`: the structured contact and form data already used by the flow.
- `adf_xml`: one complete UTF-8 ADF 1.0 XML document, beginning with the XML declaration and ADF processing instruction.

The published DrivePEI Activepieces flow writes `adf_xml` to project Storage with `lead.id` as its key. The full JSON event is also visible in the flow run. If a CRM needs an ADF email, have Activepieces send **only the `adf_xml` string** as the plain email body, or as an `application/xml` MIME part. Do not wrap XML in HTML or prepend notes to its body. The webhook itself remains JSON so existing routing steps continue to work.

The mapping follows the user-supplied ADF 1.0 specification and the structure of vehicle, trade, car-finder and finance lead emails reviewed in the owner's Gmail. The reference emails contain vendor-specific tags that are outside the attached standard; those are intentionally represented in standard `<comments>` instead of copied into DrivePEI XML.

| DrivePEI data | ADF location |
| --- | --- |
| Lead UUID and creation time | `prospect/id` with `source="DrivePEI"`; `prospect/requestdate` |
| Exact active inventory match | `vehicle` year, make, model, VIN, stock, trim, body style, transmission, odometer in km and asking price in CAD |
| Trade vehicle | `vehicle interest="trade-in"` with parsed year, make, model and optional kilometres |
| General inquiry or incomplete vehicle request | `vehicle` with explicit `Not specified` values for required year, make and model; requested vehicle text in comments |
| Shopper contact and message | `customer/contact` and `customer/comments` |
| Form type, requested details and attribution | `customer/comments`; provider `service` holds the form type |
| Site identity | `vendor/vendorname` and provider name are `DrivePEI` |

`ADF_VENDOR_EMAIL` is optional. Set it only after a real DrivePEI mailbox exists. The customer contact always contains the email and phone supplied by the shopper. The XML does not contain a credit application or sensitive financial details from Dealertrack.

The ADF document is generated on the server after form validation. Its XML text and attributes are escaped, and the timestamp uses an ISO 8601 UTC offset. The existing `LEAD_WEBHOOK_URL` and optional bearer token continue to control delivery.
