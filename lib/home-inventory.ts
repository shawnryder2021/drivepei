import type { Vehicle } from './vehicle';

export function pickHomepageHero(vehicles: Vehicle[], choice?: string) {
  const preferredVin = choice === 'kia' ? '3KPF34AD6NE445481' : '4S4BSDGC7K3267790';
  const preferredVins = [
    preferredVin,
    ...['4S4BSDGC7K3267790', '3KPF34AD6NE445481', '3VVLX7B27NM070424']
      .filter((vin) => vin !== preferredVin),
  ];
  const eligible = vehicles.filter((vehicle) => vehicle.status === 'active' && vehicle.image);
  return preferredVins
    .map((vin) => eligible.find((vehicle) => vehicle.vin === vin))
    .find(Boolean)
    || eligible.find((vehicle) => vehicle.make.toLowerCase() !== 'volkswagen')
    || eligible[0];
}
