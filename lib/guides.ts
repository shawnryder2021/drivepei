export type GuideSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};
export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: 'Buying' | 'Vehicle choice' | 'Financing' | 'Trade-in';
  lead: string;
  published: string;
  updated: string;
  readMinutes: number;
  sections: GuideSection[];
  relatedPaths: { label: string; href: string }[];
  sources?: { label: string; href: string }[];
};
const date = '2026-09-25';
export const guides: Guide[] = [
  {
    slug: 'buying-a-used-car-in-pei',
    title: 'How to buy a used car in PEI: a practical checklist',
    description: 'A PEI used-car checklist covering budget, vehicle history, inspection, test drive, financing and ownership paperwork.',
    category: 'Buying',
    lead: 'A good used-car search starts before the test drive. Use this checklist to compare vehicles on total cost, condition and fit for Island driving.',
    published: date, updated: date, readMinutes: 3,
    sections: [
      { heading: 'Start with the whole budget', paragraphs: ['Set a comfortable amount for the vehicle, then leave room for sales tax, registration, insurance, fuel, maintenance and possible repairs. If you plan to finance, compare the total amount paid over the loan with the payment amount. A lower payment can come from a longer term and cost more overall.', 'Decide which features are essential. For many Island drivers, that means enough room for daily passengers and gear, a reasonable commute fuel cost and tires suited to the season. An expensive feature that you rarely use can narrow the vehicles available within your budget.'] },
      { heading: 'Compare the listing with the actual vehicle', bullets: ['Confirm the year, trim, kilometres, VIN, price and included equipment.', 'Ask for service records and a vehicle history report when available; check for past damage, claims and ownership changes.', 'Look at tire condition, brake feel, lights, windows, climate controls, warning lights and visible rust.', 'Ask what inspection, reconditioning or warranty coverage comes with the sale, and get promises in writing.'] },
      { heading: 'Take a useful test drive', paragraphs: ['Drive on a route similar to your daily use: town streets, a higher-speed road and rougher pavement where safe. Try parking, acceleration, braking and turning. Listen for unusual sounds and check whether the seating position and visibility work for you.', 'A pre-purchase inspection by an independent mechanic can add useful information, particularly for an older or higher-kilometre vehicle. Ask before committing, and review any findings alongside the price.'] },
      { heading: 'Check paperwork before you sign', paragraphs: ['Confirm the written sale price, fees, financing terms and any trade allowance. If financing is involved, review the rate, term, amount financed and total cost of borrowing. Do not rely on a verbal payment quote alone.', 'PEI’s ownership-transfer guidance lists the signed vehicle permit, bill of sale, motor vehicle inspection form and proof of insurance for the buyer’s transfer. It says the buyer must transfer registration within seven days. Confirm the current requirements with Access PEI for your transaction.'] },
      { heading: 'Choose the next step', paragraphs: ['Shortlist two or three vehicles and compare them side by side. If none fit, tell us your budget, preferred body style and must-have features so we can watch for a suitable arrival. Inventory changes, and a focused request is more useful than settling for the first close match.'] },
    ],
    relatedPaths: [{ label: 'Shop all used vehicles', href: '/used' }, { label: 'Tell us what you need', href: '/car-finder' }],
    sources: [{ label: 'PEI vehicle registration ownership transfers', href: 'https://www.princeedwardisland.ca/en/information/transportation-and-infrastructure/vehicle-registration-ownership-transfers' }, { label: 'FCAC: financing a car', href: 'https://www.canada.ca/en/financial-consumer-agency/services/loans/financing-car.html' }],
  },
  {
    slug: 'used-suv-buying-guide-pei',
    title: 'Choosing a used SUV in PEI: space, cost and capability',
    description: 'Compare compact and larger used SUVs for PEI life, including cargo space, drivetrain, tires, fuel costs and test-drive checks.',
    category: 'Vehicle choice',
    lead: 'An SUV can work well for family trips, gear and changing weather, but the best size and drivetrain depend on how you actually drive.',
    published: date, updated: date, readMinutes: 2,
    sections: [
      { heading: 'Measure the space you need', paragraphs: ['Bring the things that are hard to judge from photos: a child seat, stroller, hockey bag, dog crate or the gear you carry most. Check rear-seat access, cargo-floor height and room behind the seats with passengers aboard. A larger SUV may add space but also bring higher purchase, fuel and tire costs.'] },
      { heading: 'Choose drivetrain for your routes', paragraphs: ['Front-wheel drive can suit many paved-road commutes. All-wheel drive may help with traction when surfaces are slippery, especially on rural routes and unplowed driveways. AWD does not shorten stopping distance; tire condition and careful driving remain important. Compare the actual tires fitted to each vehicle, not only the drivetrain badge.'] },
      { heading: 'Compare ownership costs', bullets: ['Compare price and kilometres against similarly equipped vehicles, not just the model name.', 'Check tire sizes and replacement cost; larger wheels can change the running budget.', 'Review service history, recalls and any remaining warranty terms.', 'Ask what comes with the vehicle: second tire set, keys, mats and cargo accessories.'] },
      { heading: 'Test the practical details', paragraphs: ['Check visibility from the driver’s seat, the height of the cargo opening and how easily the rear seats fold. On the road, notice ride comfort, noise and braking. If you regularly drive outside Charlottetown, include a stretch of highway in the test drive.', 'Our SUV inventory changes. Use the current listings below to compare actual vehicles, then ask about any feature that is not confirmed in the listing.'] },
    ],
    relatedPaths: [{ label: 'Browse used SUVs in PEI', href: '/used-suvs-pei' }, { label: 'Compare AWD vehicles', href: '/used-awd-pei' }],
  },
  {
    slug: 'awd-vs-fwd-pei',
    title: 'AWD vs. FWD for PEI driving: what matters most?',
    description: 'A plain-language PEI guide to comparing all-wheel drive and front-wheel drive in a used vehicle, with tire and budget considerations.',
    category: 'Vehicle choice',
    lead: 'AWD is a useful feature for some Island drivers, but it is only one part of a winter-ready vehicle. Start with your roads, tires and budget.',
    published: date, updated: date, readMinutes: 2,
    sections: [
      { heading: 'What each system does', paragraphs: ['Front-wheel drive sends power to the front wheels. All-wheel drive can send power to more than one axle when the system calls for it. The behaviour varies by model, so check the specific vehicle and its owner’s manual rather than assuming every AWD badge works the same way.'] },
      { heading: 'Where AWD may help', paragraphs: ['Extra traction can help a vehicle get moving on loose or slippery surfaces. That can matter if your regular route includes a steep driveway, rural roads or frequent early-morning trips before roads are cleared. AWD does not replace appropriate tires or careful speed choices, and it does not guarantee better braking on ice.'] },
      { heading: 'Where FWD can make sense', paragraphs: ['If most of your driving is on maintained roads, a front-wheel-drive vehicle with suitable tires may meet your needs. It may also offer a wider selection at your price point. Compare the specific vehicles available rather than choosing by drivetrain alone.'] },
      { heading: 'Check the vehicle, not just the badge', bullets: ['Inspect tire type, tread condition and whether all four tires match the vehicle’s requirements.', 'Review maintenance records and ask whether drivetrain components have been serviced as recommended.', 'Price insurance, fuel and tires along with the purchase price.', 'Test drive on ordinary roads and ask how the vehicle behaves in the conditions you face.'] },
      { heading: 'A simple decision rule', paragraphs: ['Write down the conditions you drive through most often and the features you will use every week. Choose the vehicle that fits those needs and the full ownership budget. When in doubt, compare an AWD and FWD option in person and discuss tire choices before deciding.'] },
    ],
    relatedPaths: [{ label: 'Shop current AWD and 4WD', href: '/used-awd-pei' }, { label: 'Shop all used vehicles', href: '/used' }],
  },
  {
    slug: 'understanding-used-car-payments',
    title: 'Used-car payments in PEI: look beyond the biweekly number',
    description: 'Understand how price, down payment, interest rate and loan term affect a used-car payment and total borrowing cost in PEI.',
    category: 'Financing',
    lead: 'A payment only tells part of the story. Compare the vehicle price, amount financed, rate, term and total paid before you choose a loan.',
    published: date, updated: date, readMinutes: 2,
    sections: [
      { heading: 'What changes the payment?', paragraphs: ['The vehicle price, taxes and fees, down payment, trade equity, interest rate and loan length all affect your payment. Two offers with the same biweekly payment can have very different total costs if their loan terms differ.', 'Use the payment filter on our inventory page as a planning tool: enter an annual rate you want to model and a term. The estimate uses the vehicle price before taxes and fees, so it is not a financing offer or an approval.'] },
      { heading: 'Compare the total cost', paragraphs: ['Ask for the amount financed, annual percentage rate, payment schedule, term and total cost of borrowing in writing. If a longer term makes a vehicle appear affordable, check how much more interest you would pay. The Financial Consumer Agency of Canada warns that long terms can raise total cost and keep borrowers in negative equity longer.'] },
      { heading: 'Leave room in the monthly budget', bullets: ['Get an insurance quote for the specific vehicle.', 'Estimate fuel or charging, maintenance and tire costs.', 'Keep a repair buffer, especially for older vehicles.', 'Check whether optional products or warranties are included in the amount financed.'] },
      { heading: 'Before you apply', paragraphs: ['Know your preferred vehicle or price range, your realistic payment ceiling and the down payment you can use. Compare a few term lengths, and ask questions about anything unclear in the offer. Approval, rate and terms depend on the lender and your circumstances.', 'If you want to discuss options, send a financing inquiry. A team member can explain the next step without promising a rate or approval before a lender reviews an application.'] },
    ],
    relatedPaths: [{ label: 'Explore financing', href: '/finance' }, { label: 'Shop by payment', href: '/used?payment=1' }],
    sources: [{ label: 'FCAC: financing a car', href: 'https://www.canada.ca/en/financial-consumer-agency/services/loans/financing-car.html' }, { label: 'FCAC: financial risks when buying a car', href: 'https://www.canada.ca/en/financial-consumer-agency/services/loans/financing-car/risks.html' }],
  },
  {
    slug: 'financing-a-used-car-with-credit-challenges',
    title: 'Financing a used car with credit challenges in PEI',
    description: 'Practical steps for PEI drivers exploring used-car financing after credit setbacks, without promises of approval or a specific rate.',
    category: 'Financing',
    lead: 'A past credit setback does not define what you need from your next vehicle. A clear budget and complete information make the financing conversation more useful.',
    published: date, updated: date, readMinutes: 2,
    sections: [
      { heading: 'Start with a payment you can sustain', paragraphs: ['Work backward from your real household budget. Include insurance, fuel, maintenance and room for unexpected expenses. Decide on a payment ceiling before choosing a vehicle so the shopping process stays grounded in what you can manage.'] },
      { heading: 'Have the facts ready', bullets: ['Your current income and employment details.', 'Your housing and regular monthly expenses.', 'Any down payment or trade-in you plan to use.', 'The vehicle or price range you want to explore.'] },
      { heading: 'Ask to see the full terms', paragraphs: ['A lender may evaluate credit history, income, existing obligations, the vehicle and other factors. The result can vary, so avoid assuming an advertised payment or rate applies to you. Review the amount financed, rate, term, fees and total cost before signing.', 'A longer loan may reduce the regular payment while increasing total interest and the time you owe more than the vehicle is worth. Compare options and ask what changes if you choose a less expensive vehicle or a larger down payment.'] },
      { heading: 'Take the next step at your pace', paragraphs: ['Our financing page explains the current inquiry process. If a secure credit application is available there, use that dedicated form for sensitive financial details. General contact forms are for a conversation about your needs and should not include a social insurance number or banking information. Financing remains subject to lender approval.'] },
    ],
    relatedPaths: [{ label: 'Explore financing', href: '/finance' }, { label: 'Find a vehicle', href: '/used' }],
    sources: [{ label: 'FCAC: car financing options', href: 'https://www.canada.ca/en/financial-consumer-agency/services/loans/financing-car/financing-options.html' }, { label: 'FCAC: financial risks when buying a car', href: 'https://www.canada.ca/en/financial-consumer-agency/services/loans/financing-car/risks.html' }],
  },
  {
    slug: 'trade-in-equity-explained',
    title: 'Trading in a car in PEI: understand your equity first',
    description: 'Learn how to compare a PEI trade-in offer with your loan payout and what positive or negative equity means for your next vehicle.',
    category: 'Trade-in',
    lead: 'Before using your current vehicle toward the next one, compare its trade value with what you still owe. That difference can change your next loan.',
    published: date, updated: date, readMinutes: 2,
    sections: [
      { heading: 'Find your current loan payout', paragraphs: ['Ask your lender for a current payout amount, including the date through which it is valid. A regular account balance may not be the final payout figure. If you own the vehicle outright, you can skip this step.'] },
      { heading: 'Compare payout with trade value', paragraphs: ['If the trade allowance is higher than the payout, the difference is positive equity that may help with the next purchase. If the payout is higher, the difference is negative equity. For example, a $16,000 payout against a $13,000 trade allowance leaves a $3,000 shortfall before any other costs.', 'Rolling that shortfall into a new loan can increase the amount financed and interest paid. The Financial Consumer Agency of Canada recommends understanding this risk before trading.'] },
      { heading: 'Get a useful appraisal', bullets: ['Share the year, make, model, trim, kilometres and VIN.', 'Describe condition honestly, including damage, warning lights and tire wear.', 'Gather service history, keys and information on accessories.', 'Ask for the written trade allowance and the complete price of the next vehicle separately.'] },
      { heading: 'Compare the whole deal', paragraphs: ['Look at the next vehicle’s price, any trade allowance, loan payout, taxes and fees, amount financed and total borrowing cost together. A high trade number alone does not tell you whether the overall deal fits your budget. If you want an appraisal, send the vehicle details and we can begin the conversation.'] },
    ],
    relatedPaths: [{ label: 'Start a trade-in inquiry', href: '/trade' }, { label: 'Browse current inventory', href: '/used' }],
    sources: [{ label: 'FCAC: financial risks when buying a car', href: 'https://www.canada.ca/en/financial-consumer-agency/services/loans/financing-car/risks.html' }],
  },
  {
    slug: 'high-kilometre-used-car-pei',
    title: 'Buying a high-kilometre used car in PEI: what to check',
    description: 'A practical PEI checklist for evaluating higher-kilometre used cars, including service records, inspection, test drive and ownership costs.',
    category: 'Buying',
    lead: 'Kilometres are one clue about a used vehicle, not a verdict. Condition, maintenance and the way you will use the car deserve a closer look.',
    published: '2026-09-26', updated: '2026-09-26', readMinutes: 4,
    sections: [
      { heading: 'Compare age, kilometres and maintenance together', paragraphs: ['A high odometer reading can reflect long highway trips, frequent short trips or a mix of both. The number alone does not show how the vehicle was maintained. Compare the kilometres with the vehicle’s age, service records, condition and asking price. A newer high-kilometre vehicle and an older low-kilometre vehicle can present different costs and risks.', 'Ask for dated maintenance records and check whether major services recommended for that model have been completed. An oil-change history is useful, but also look for records for brakes, tires, fluids and repairs. Gaps are a reason to ask questions rather than assume work was done.'] },
      { heading: 'Inspect the systems you will rely on', paragraphs: ['Look at tires, brakes, steering feel, suspension noise, fluid leaks, warning lights and visible corrosion. On PEI, ask about the current motor vehicle inspection and request the report when available. A provincial inspection checks safety items; it does not replace an independent pre-purchase inspection focused on the vehicle’s overall mechanical condition.'], bullets: ['Check the tire date, tread and whether all four tires match the vehicle’s needs.', 'Test every seat belt, light, window, climate control and feature you expect to use.', 'Compare the VIN on the vehicle with its paperwork and any history report.', 'Ask a mechanic to explain which findings need immediate work and which can be planned.'] },
      { heading: 'Make the test drive count', paragraphs: ['Drive long enough for the vehicle to reach normal operating temperature. Try gentle and firm braking in a safe place, turning at low speed, parking and a stretch of highway if that reflects your normal route. Pay attention to vibrations, pulling, unexpected noises and how the transmission behaves. Do not diagnose a problem from a sound alone; write it down for a qualified mechanic to assess.', 'The federal Office of Consumer Affairs recommends checking vehicle history, recalls, an independent inspection and a test drive before buying a used vehicle.'] },
      { heading: 'Budget for the next year, not only purchase day', paragraphs: ['Ask what maintenance is coming due and get estimates for any visible wear. Insurance, tires and repairs can change the true affordability of a low asking price. If financing, consider whether the loan term makes sense for the vehicle’s age and your expected ownership period.', 'A useful comparison is the amount you would spend over the first year: purchase costs plus expected maintenance, insurance and fuel. The cheapest listing may not be the least expensive vehicle to own.'] },
      { heading: 'When to walk away or ask for more detail', paragraphs: ['If the seller cannot answer important questions, the paperwork does not match, or an inspection finds costs beyond your budget, keep looking. If the vehicle passes your checks, document any agreed repairs or included coverage in the written sale terms. Use the current DrivePEI listings as a starting point and ask about the exact vehicle you are considering.'] },
    ],
    relatedPaths: [{ label: 'Shop current used vehicles', href: '/used' }, { label: 'PEI buying checklist', href: '/guides/buying-a-used-car-in-pei' }],
    sources: [{ label: 'Government of Canada: buying or leasing a vehicle', href: 'https://ised-isde.canada.ca/site/office-consumer-affairs/en/buying-and-leasing-big-ticket-items/buying-or-leasing-vehicle' }, { label: 'PEI motor vehicle inspections', href: 'https://www.princeedwardisland.ca/en/information/transportation-and-infrastructure/motor-vehicle-inspections-mvi' }],
  },
  {
    slug: 'read-a-vehicle-history-report',
    title: 'How to read a used-car history report in PEI',
    description: 'Learn what to compare in a vehicle history report: VIN, registration, damage, service, odometer, recalls and liens.',
    category: 'Buying',
    lead: 'A history report helps you ask better questions. Read it alongside service records, the vehicle itself and an inspection; no single report tells the whole story.',
    published: '2026-09-26', updated: '2026-09-26', readMinutes: 4,
    sections: [
      { heading: 'Start by matching the VIN', paragraphs: ['Check that the 17-character VIN on the report matches the vehicle and sale paperwork. Then confirm the year, make, model and trim. If anything differs, stop and resolve it before relying on the report. The report is only useful if it describes the vehicle you are actually buying.'] },
      { heading: 'Read the timeline, not just a summary badge', paragraphs: ['Look at registration locations and dates, reported odometer readings, service entries and damage events in order. A steady progression of recorded kilometres can be reassuring, while a large gap simply tells you to ask for more records. A damage entry calls for details about what happened, what was repaired and whether documentation is available; it does not automatically settle the purchase decision.', 'Compare service entries with invoices or the maintenance booklet. Some work may be absent from a report because the repairer did not provide data to that report provider. A blank history should not be described as proof that the car has never been damaged.'] },
      { heading: 'Check recalls and liens separately', paragraphs: ['Use Transport Canada’s recall information and ask whether outstanding safety work has been completed for the vehicle. Also find out whether a lien search is included in the particular report you received. CARFAX Canada distinguishes between its history-only report and its history-plus-lien-check product. The federal consumer agency advises checking for liens before buying a used car.', 'If the vehicle has an outstanding loan, ask how the payout and lien discharge will be handled in writing. Do not assume a history report alone has resolved that question.'] },
      { heading: 'Pair the report with a physical inspection', paragraphs: ['Bring any concerning entries to a qualified independent mechanic. Ask the mechanic to inspect the areas tied to reported repairs as well as ordinary wear items. PEI’s motor vehicle inspection is a safety assessment with defined items; an independent pre-purchase assessment can address your broader questions about condition and likely maintenance.', 'For example, if a report shows front-end damage, ask for repair documentation and have the relevant structure, alignment and parts inspected. This is an illustrative question to ask, not a diagnosis of any listed vehicle.'] },
      { heading: 'Questions to send before viewing', bullets: ['May I see the full report and its issue date?', 'Are service invoices or inspection reports available?', 'Was any reported damage repaired, and can I see the records?', 'Does this report include a current lien check?', 'Are there open recalls or upcoming maintenance items?'] },
    ],
    relatedPaths: [{ label: 'Shop used vehicles', href: '/used' }, { label: 'Ask us to find a vehicle', href: '/car-finder' }],
    sources: [{ label: 'Government of Canada: buying a used vehicle', href: 'https://ised-isde.canada.ca/site/office-consumer-affairs/en/buying-and-leasing-big-ticket-items/buying-or-leasing-vehicle' }, { label: 'FCAC: risks associated with car liens', href: 'https://www.canada.ca/en/financial-consumer-agency/services/loans/financing-car/risks-car-liens.html' }, { label: 'Transport Canada vehicle recalls', href: 'https://tc.canada.ca/en/road-transportation/defects-recalls-vehicles-tires-child-car-seats' }, { label: 'CARFAX Canada report types', href: 'https://support.carfax.ca/en/support/solutions/articles/17000107576' }],
  },
  {
    slug: 'used-car-test-drive-checklist-pei',
    title: 'A useful used-car test drive on PEI: what to bring and try',
    description: 'Plan a used-car test drive in PEI with a route, checklist and questions about fit, condition, inspection and paperwork.',
    category: 'Buying',
    lead: 'A short loop around the block may not tell you whether a vehicle fits your daily routine. Plan a route and bring the things you will actually carry.',
    published: '2026-09-26', updated: '2026-09-26', readMinutes: 4,
    sections: [
      { heading: 'Before you leave home', paragraphs: ['Book a viewing and confirm the vehicle is still available. Bring your driver’s licence, a written shortlist of must-have features, a phone to note questions and any gear that affects the fit: a child seat, stroller, mobility aid, sports bag or dog crate. If another regular driver will use the vehicle, ask whether they can try the seating and controls too.', 'Ask whether the vehicle can be driven on a route with town streets and a higher-speed road. The route should reflect how you will use it and follow the seller’s instructions. Do not test hazardous conditions or put anyone at risk to evaluate traction.'] },
      { heading: 'Do a walkaround before starting', paragraphs: ['Look for differences in tire wear, visible rust, glass damage and body-panel alignment. Check lights, windows, mirrors, seat belts and the controls you care about. Note any warning lights at startup and ask when the vehicle was last inspected. These are observations to discuss, not a substitute for a mechanic’s assessment.', 'Try loading the cargo area and adjusting the seats. A vehicle can look spacious in photos but be awkward for your particular gear or passengers.'] },
      { heading: 'Drive the routes that matter to you', paragraphs: ['On a safe route, notice steering response, ride comfort, brake feel, visibility, noise and how the transmission changes gears. Include a few turns, parking and, if appropriate, a higher-speed stretch. Pay attention after the vehicle warms up as well as at the beginning. If you hear or feel something unusual, describe it plainly and ask a qualified technician to investigate.', 'For an SUV or AWD vehicle, compare the cabin, tires and driving position with a front-wheel-drive alternative if both are on your shortlist. The badge alone cannot tell you whether the vehicle is the best fit.'] },
      { heading: 'After the drive', bullets: ['Write down what you liked, what felt awkward and every unanswered question.', 'Compare the VIN, kilometres, price and equipment with the listing.', 'Ask for the history and service information available for that specific vehicle.', 'Arrange an independent pre-purchase inspection if you need more confidence about condition.', 'Review written sale and financing terms before deciding.'] },
      { heading: 'A simple way to compare two vehicles', paragraphs: ['Score each on fit for your passengers and gear, comfort on your normal route, visible condition, total cost and any inspection findings. Do the comparison soon after both drives while the details are fresh. The federal Office of Consumer Affairs recommends a test drive and independent inspection as part of used-vehicle research.'] },
    ],
    relatedPaths: [{ label: 'Browse current inventory', href: '/used' }, { label: 'Used SUV buying guide', href: '/guides/used-suv-buying-guide-pei' }],
    sources: [{ label: 'Government of Canada: buying a used vehicle', href: 'https://ised-isde.canada.ca/site/office-consumer-affairs/en/buying-and-leasing-big-ticket-items/buying-or-leasing-vehicle' }, { label: 'PEI motor vehicle inspections', href: 'https://www.princeedwardisland.ca/en/information/transportation-and-infrastructure/motor-vehicle-inspections-mvi' }],
  },
  {
    slug: 'compare-used-car-financing-offers',
    title: 'How to compare two used-car financing offers in PEI',
    description: 'Compare used-car loan offers by amount financed, annual rate, term, total cost and optional products instead of payment alone.',
    category: 'Financing',
    lead: 'Two loan offers can have similar payments but very different total costs. Put the written numbers side by side before deciding.',
    published: '2026-09-26', updated: '2026-09-26', readMinutes: 4,
    sections: [
      { heading: 'Make sure the vehicle deal is the same', paragraphs: ['Start with the same vehicle price, taxes and fees, trade allowance and down payment. If one offer includes optional products and the other does not, separate those amounts first. Otherwise you are comparing two different purchases rather than two ways to finance the same one.', 'Write down the amount financed for each offer. This is the principal on which borrowing costs are based. Ask for a breakdown if the number is higher than you expected.'] },
      { heading: 'Put the borrowing terms in one table', bullets: ['Amount financed and any down payment or trade equity.', 'Annual percentage rate and whether the rate can change.', 'Term in months and payment frequency.', 'Total of all payments and total cost of borrowing.', 'Fees, optional products and any conditions about early repayment.'] },
      { heading: 'Why payment alone can mislead', paragraphs: ['For an illustration, imagine the same $20,000 amount financed at a hypothetical 8% annual rate. A 48-month term has a higher regular payment than a 72-month term, but fewer months of interest. The exact payments depend on the loan calculation and contract, so use the written disclosure or a calculator for real offers. The point is to compare the total paid, not choose by the smallest periodic number.', 'The Financial Consumer Agency of Canada warns that longer terms can increase total interest and extend the period of negative equity. That matters if you may need to sell or trade the vehicle before the loan is paid off.'] },
      { heading: 'Ask about what is optional', paragraphs: ['Extended warranties, protection plans and other add-ons can change the amount financed. Ask what each product costs, whether it is optional, what it covers and whether you can review the terms before agreeing. Compare the financing offer both with and without optional products so the underlying loan remains clear.', 'If the offers are from different lenders, check each lender’s written terms instead of assuming the same rules apply. Keep copies of the documents you review.'] },
      { heading: 'Choose a loan that fits the vehicle and your budget', paragraphs: ['Leave room for insurance, fuel, tires and maintenance after the loan payment. A shorter term may lower borrowing cost but only helps if its payment is comfortable. If neither offer works, consider a lower-priced vehicle, different down payment or more time to save. Approval and actual terms depend on the lender’s review.', 'DrivePEI’s payment filter is only an estimate based on a shopper-entered rate and vehicle price before taxes and fees. Request written financing terms for an actual decision.'] },
    ],
    relatedPaths: [{ label: 'Explore financing', href: '/finance' }, { label: 'Shop by payment estimate', href: '/used?payment=1' }],
    sources: [{ label: 'FCAC: financing a car', href: 'https://www.canada.ca/en/financial-consumer-agency/services/loans/financing-car.html' }, { label: 'FCAC: financial risks when buying a car', href: 'https://www.canada.ca/en/financial-consumer-agency/services/loans/financing-car/risks.html' }],
  },
];
export const guideBySlug = (slug: string) => guides.find((guide) => guide.slug === slug);
