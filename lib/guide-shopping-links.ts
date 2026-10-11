// In-article paths from each guide to relevant live inventory. Query links use
// the filters on /used; category pages keep their own canonical URLs.
export type GuideShoppingLinks = {
  afterSection: number;
  intro: string;
  links: [{ label: string; href: string }, { label: string; href: string }];
};

export const guideShoppingLinks: Record<string, GuideShoppingLinks> = {
  'buying-a-used-car-in-pei': {
    afterSection: 1,
    intro: 'Use the checklist against real prices and VINs in',
    links: [
      { label: 'current cars under $25,000', href: '/used-cars-under-25000-pei' },
      { label: 'Charlottetown used inventory', href: '/used-cars-charlottetown' },
    ],
  },
  'used-suv-buying-guide-pei': {
    afterSection: 1,
    intro: 'Bring your cargo and tire questions to',
    links: [
      { label: 'the used SUV selection', href: '/used-suvs-pei' },
      { label: 'current Tiguan listings', href: '/used-volkswagen-tiguan-pei' },
    ],
  },
  'awd-vs-fwd-pei': {
    afterSection: 2,
    intro: 'Compare drivetrain and tire details on',
    links: [
      { label: 'current AWD and 4WD vehicles', href: '/used-awd-pei' },
      { label: 'Subaru inventory matches', href: '/used?make=Subaru' },
    ],
  },
  'understanding-used-car-payments': {
    afterSection: 1,
    intro: 'Try your own rate and term with',
    links: [
      { label: 'the inventory payment filter', href: '/used?payment=1' },
      { label: 'used vehicles under $25,000', href: '/used-cars-under-25000-pei' },
    ],
  },
  'financing-a-used-car-with-credit-challenges': {
    afterSection: 2,
    intro: 'Once you have a comfortable ceiling, compare prices in',
    links: [
      { label: 'the under-$25,000 inventory', href: '/used-cars-under-25000-pei' },
      { label: 'the payment-planning filter', href: '/used?payment=1' },
    ],
  },
  'trade-in-equity-explained': {
    afterSection: 1,
    intro: 'After calculating usable equity, compare the next purchase against',
    links: [
      { label: 'current lower-priced vehicles', href: '/used-cars-under-25000-pei' },
      { label: 'the full used inventory', href: '/used' },
    ],
  },
  'high-kilometre-used-car-pei': {
    afterSection: 1,
    intro: 'Compare age, price and odometer readings in',
    links: [
      { label: 'the under-$25,000 selection', href: '/used-cars-under-25000-pei' },
      { label: 'vehicles filtered to 100,000 km or less', href: '/used?maxKm=100000' },
    ],
  },
  'read-a-vehicle-history-report': {
    afterSection: 1,
    intro: 'Choose a specific VIN to ask about from',
    links: [
      { label: 'current used SUVs', href: '/used-suvs-pei' },
      { label: 'vehicles under $25,000', href: '/used-cars-under-25000-pei' },
    ],
  },
  'used-car-test-drive-checklist-pei': {
    afterSection: 1,
    intro: 'Put this route and checklist to use with',
    links: [
      { label: 'Charlottetown used listings', href: '/used-cars-charlottetown' },
      { label: 'the Summerside shopper selection', href: '/used-cars-summerside-pei' },
    ],
  },
  'compare-used-car-financing-offers': {
    afterSection: 1,
    intro: 'Anchor the two written offers to real asking prices using',
    links: [
      { label: 'the payment-planning inventory', href: '/used?payment=1' },
      { label: 'current cars under $25,000', href: '/used-cars-under-25000-pei' },
    ],
  },
  'used-volkswagen-checklist-pei': {
    afterSection: 0,
    intro: 'Check the year, trim and VIN on',
    links: [
      { label: 'current used Volkswagens', href: '/used-volkswagen-pei' },
      { label: 'the Tiguan selection', href: '/used-volkswagen-tiguan-pei' },
    ],
  },
  'questions-to-ask-about-used-car-listing-pei': {
    afterSection: 0,
    intro: 'Copy a stock number or VIN from',
    links: [
      { label: 'Charlottetown listings', href: '/used-cars-charlottetown' },
      { label: 'the under-$25,000 selection', href: '/used-cars-under-25000-pei' },
    ],
  },
  'used-sedan-vs-compact-suv-pei': {
    afterSection: 0,
    intro: 'Build a two-vehicle shortlist from',
    links: [
      { label: 'current sedan-filtered listings', href: '/used?body=Sedan' },
      { label: 'used SUVs in PEI', href: '/used-suvs-pei' },
    ],
  },
  'used-car-winter-readiness-pei': {
    afterSection: 1,
    intro: 'Check the actual tires and drivetrain on',
    links: [
      { label: 'current AWD and 4WD vehicles', href: '/used-awd-pei' },
      { label: 'used trucks in PEI', href: '/used-trucks-pei' },
    ],
  },
  'pei-mvi-vs-prepurchase-inspection': {
    afterSection: 1,
    intro: 'Ask about inspection records on a specific vehicle in',
    links: [
      { label: 'Charlottetown used inventory', href: '/used-cars-charlottetown' },
      { label: 'the current SUV selection', href: '/used-suvs-pei' },
    ],
  },
  'buying-a-used-hybrid-in-pei': {
    afterSection: 1,
    intro: 'See whether there is a matching hybrid in',
    links: [
      { label: 'hybrid-filtered inventory', href: '/used?q=Hybrid' },
      { label: 'the broader SUV selection', href: '/used-suvs-pei' },
    ],
  },
  'used-subaru-buying-checklist-pei': {
    afterSection: 0,
    intro: 'Apply these checks to',
    links: [
      { label: 'current Subaru matches', href: '/used?make=Subaru' },
      { label: 'other AWD and 4WD vehicles', href: '/used-awd-pei' },
    ],
  },
  'used-car-financing-rates-pei': {
    afterSection: 1,
    intro: 'Compare your rate assumptions with prices in',
    links: [
      { label: 'the payment-planning inventory', href: '/used?payment=1' },
      { label: 'the under-$25,000 category', href: '/used-cars-under-25000-pei' },
    ],
  },
  'pei-used-car-registration-transfer': {
    afterSection: 1,
    intro: 'Use this paperwork checklist before viewing a vehicle in',
    links: [
      { label: 'Charlottetown inventory', href: '/used-cars-charlottetown' },
      { label: 'the Summerside shopper selection', href: '/used-cars-summerside-pei' },
    ],
  },
  'winter-tires-pei-used-car': {
    afterSection: 1,
    intro: 'Ask which tires come with each vehicle in',
    links: [
      { label: 'the AWD and 4WD selection', href: '/used-awd-pei' },
      { label: 'current used trucks', href: '/used-trucks-pei' },
    ],
  },
  'dealer-vs-kijiji-used-car-pei': {
    afterSection: 1,
    intro: 'Compare a real dealer listing and its written details in',
    links: [
      { label: 'Charlottetown used inventory', href: '/used-cars-charlottetown' },
      { label: 'the under-$25,000 selection', href: '/used-cars-under-25000-pei' },
    ],
  },
};
