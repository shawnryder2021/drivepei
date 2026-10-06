export const VIEWING_LOCATION = {
  street: '190 Sherwood Rd',
  city: 'Charlottetown',
  province: 'PE',
  postalCode: 'C1E 0E5',
} as const;

export const VIEWING_ADDRESS = `${VIEWING_LOCATION.street}, ${VIEWING_LOCATION.city}, ${VIEWING_LOCATION.province} ${VIEWING_LOCATION.postalCode}`;
export const VIEWING_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(VIEWING_ADDRESS)}`;
