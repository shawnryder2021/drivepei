import type { Vehicle } from './vehicle';

type Section = { heading: string; paragraphs: string[] };
type Question = { question: string; answer: string };

const currency = (value: number) => new Intl.NumberFormat('en-CA', {
  style: 'currency', currency: 'CAD', maximumFractionDigits: 0,
}).format(value);
const digits = (value: number) => new Intl.NumberFormat('en-CA').format(value);
const nameFor = (vehicle: Vehicle) => `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

function bodyAdvice(body: string) {
  const style = body.toLowerCase();
  if (style.includes('truck')) return {
    fit: 'For a truck, measure the bed and confirm payload, towing capacity and hitch equipment for this exact configuration before relying on it for work or a trailer. Check access to the rear seats and whether the truck fits your usual parking space.',
    visit: 'If hauling matters, bring the dimensions and weight of what you carry. Ask about past towing or commercial use, inspect the bed and underbody, and have a qualified person check any equipment you plan to depend on.',
  };
  if (style.includes('suv') || style.includes('crossover')) return {
    fit: 'For an SUV, try the rear seats, cargo opening and sight lines with the passengers and gear you usually carry. A stroller, child seat, pet crate or sports bag can reveal more about fit than an exterior photo or a body-style label.',
    visit: 'At a viewing, fold and raise the seats, check the cargo floor and try the doors in a normal parking space. Test the climate controls and visibility from the driver’s seat before deciding whether its size works for your daily route.',
  };
  if (style.includes('minivan') || style.includes('van')) return {
    fit: 'For a minivan, check access to every seating row and the space left for luggage when people are aboard. Bring any child seats, mobility aids, stroller or bulky gear that needs to fit; do not assume a seating layout from the model name alone.',
    visit: 'At a viewing, open every door, move the seats through their full range and try loading the items you carry most often. Verify that all occupants can reach their seats comfortably and that the cargo area works with those seats in use.',
  };
  if (style.includes('sedan') || style.includes('coupe') || style.includes('hatch')) return {
    fit: 'For a car, try the driving position, rear-seat access, trunk or hatch opening and sight lines before judging it by exterior size. A compact footprint may suit town parking, while your own passengers and luggage decide whether the cabin works.',
    visit: 'At a viewing, bring the bag, stroller or other item that must fit regularly. Check entry and exit for every driver, the usable cargo opening, and visibility while parking and turning on the roads you actually use.',
  };
  return {
    fit: 'Use the listed body style as a starting point, then test the space with your passengers and everyday gear. Seating comfort, cargo access and visibility can vary between trims and model years, even when two listings have a similar name.',
    visit: 'At a viewing, try the doors, seats, storage and driver controls yourself. Bring the items that must fit, and take time to check parking visibility and comfort before comparing this vehicle with another one.',
  };
}

function drivetrainAdvice(drivetrain: string) {
  const key = drivetrain.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (key === 'allwheeldrive' || key === 'fourwheeldrive') return {
    label: key === 'allwheeldrive' ? 'all-wheel drive' : 'four-wheel drive',
    detail: 'The feed lists driven wheels at both ends, which may help the vehicle get moving on some slippery surfaces. It does not replace suitable tires or reduce the distance needed to stop on ice. Confirm the drivetrain on the vehicle, ask how it has been maintained, and inspect the tires fitted to all four corners.',
  };
  if (key === 'frontwheeldrive' || key === 'rearwheeldrive') return {
    label: key === 'frontwheeldrive' ? 'front-wheel drive' : 'rear-wheel drive',
    detail: 'The listed driven axle is only one part of winter suitability. For PEI roads, check the actual tires, tread condition and how the car feels on a safe, ordinary test drive. Ask which tires and wheels are included in the sale instead of assuming a seasonal set comes with it.',
  };
  return {
    label: 'a drivetrain that should be confirmed',
    detail: 'The feed does not establish a clear drivetrain description for this vehicle. Ask the team to confirm the exact configuration from the vehicle and its records. Whatever drives the wheels, inspect the tires and plan for the routes and weather you normally encounter on PEI.',
  };
}

export function vehicleContent(vehicle: Vehicle): { sections: Section[]; faq: Question[] } {
  const name = nameFor(vehicle);
  const trim = vehicle.trim ? ` The feed calls this trim “${vehicle.trim}”; confirm any feature that matters to you on this VIN, since a trim name does not prove every option is present.` : ' The feed does not specify a trim, so ask for a feature list and verify equipment on this VIN before comparing it with another listing.';
  const colour = vehicle.colour ? ` The recorded exterior colour is ${vehicle.colour}.` : '';
  const transmission = vehicle.transmission ? ` The listing identifies a ${vehicle.transmission.toLowerCase()} transmission.` : ' Transmission details should be confirmed before a visit.';
  const fuel = vehicle.fuel ? ` Its listed fuel type is ${vehicle.fuel.toLowerCase()}.` : ' Ask which fuel type this vehicle uses.';
  const body = bodyAdvice(vehicle.body);
  const drive = drivetrainAdvice(vehicle.drivetrain);
  const age = Math.max(1, new Date().getFullYear() - vehicle.year);
  const kmContext = age >= 8
    ? 'At this age, maintenance records and a close condition check deserve as much attention as the odometer reading.'
    : 'Compare the odometer reading with the model year, service records and physical condition rather than judging the kilometres alone.';

  return {
    sections: [
      {
        heading: `What this ${name} listing tells you`,
        paragraphs: [
          `This used ${name} is listed for ${currency(vehicle.price)} with ${digits(vehicle.kilometres)} km. The current DrivePEI inventory feed places it in the ${vehicle.body || 'used vehicle'} category.${colour}${transmission}${fuel}${trim} The VIN on this page identifies the exact vehicle being offered, which is more reliable for comparison than a model name by itself. Price, kilometres and availability can change as inventory is updated, so confirm the current details before travelling to see it.`,
        ],
      },
      {
        heading: 'Does it fit your PEI routine?',
        paragraphs: [
          `${body.fit} ${body.visit} A short, safe test drive on a PEI route like your own can reveal comfort or visibility issues that a specification list will not answer.`,
        ],
      },
      {
        heading: 'Drivetrain, tires and seasonal use',
        paragraphs: [
          `This listing records ${drive.label}. ${drive.detail} The tire type, condition and size on this specific vehicle matter more than assumptions based on its make or model. Check whether any second set of tires is actually included, and budget for replacements if they may be needed soon.`,
        ],
      },
      {
        heading: 'Condition, inspection and paperwork',
        paragraphs: [
          `The odometer currently shows ${digits(vehicle.kilometres)} km in the feed. ${kmContext} Ask what service records, vehicle-history information and reconditioning details are available for this VIN. A history report can raise useful questions, but it may not show every repair. An independent pre-purchase inspection can help you assess the present mechanical condition instead of relying only on the advertisement or photographs.`,
        ],
      },
      {
        heading: 'Plan the next step',
        paragraphs: [
          `If this ${vehicle.make} ${vehicle.model} is on your shortlist, send the VIN with your questions so the team can answer about the right vehicle. Ask about availability, the equipment you need, tire condition, inspection status and records before making a trip. At the viewing, compare what you see with this page and take notes while the details are fresh.`,
        ],
      },
    ],
    faq: [
      {
        question: `Is this ${name} still available in PEI?`,
        answer: `The listing comes from a regularly refreshed used-inventory feed, but a vehicle can be sold between updates. Send an availability request for VIN ${vehicle.vin}, then confirm it can be viewed at the address shown on this page. DrivePEI does not operate a separate storefront.`,
      },
      {
        question: `What should I ask about the PEI inspection for this ${vehicle.model}?`,
        answer: `Ask for the current MVI information and any available inspection or reconditioning records for this exact VIN. An MVI is different from an independent pre-purchase inspection, which can address broader condition and maintenance questions.`,
      },
      {
        question: `How can I judge this ${vehicle.model} for Island winters?`,
        answer: `The feed lists ${drive.label}. Check the tires actually fitted, their condition, and whether another set is included. Confirm the drivetrain on the vehicle and ask about maintenance; no drivetrain substitutes for suitable tires and careful driving.`,
      },
    ],
  };
}
