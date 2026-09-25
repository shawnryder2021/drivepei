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
];
export const guideBySlug = (slug: string) => guides.find((guide) => guide.slug === slug);
