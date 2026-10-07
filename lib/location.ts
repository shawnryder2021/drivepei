export const VIEWING_LOCATION = {
  street: '190 Sherwood Road',
  city: 'Charlottetown',
  province: 'PE',
  postalCode: 'C1E 0E4',
} as const;

export const SELLING_DEALER = {
  name: "Brown's Volkswagen",
  url: 'https://www.brownsvw.ca/',
  phone: '902-892-5381',
  phoneHref: 'tel:+19028925381',
} as const;

export const VIEWING_ADDRESS = `${VIEWING_LOCATION.street}, ${VIEWING_LOCATION.city}, ${VIEWING_LOCATION.province} ${VIEWING_LOCATION.postalCode}`;
export const VIEWING_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(VIEWING_ADDRESS)}`;
