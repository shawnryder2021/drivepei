'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { money, slugFor, type Vehicle } from '@/lib/vehicle';

export function HomeHeroCarousel({ vehicles }: { vehicles: Vehicle[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [pointerInside, setPointerInside] = useState(false);
  const [focusInside, setFocusInside] = useState(false);

  useEffect(() => {
    if (vehicles.length) setIndex((current) => current % vehicles.length);
  }, [vehicles.length]);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) setPlaying(false);
    const onChange = () => { if (preference.matches) setPlaying(false); };
    preference.addEventListener('change', onChange);
    return () => preference.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    if (!playing || pointerInside || focusInside || vehicles.length < 2) return;
    const timer = window.setInterval(() => {
      if (document.visibilityState === 'visible') {
        setIndex((current) => (current + 1) % vehicles.length);
      }
    }, 7000);
    return () => window.clearInterval(timer);
  }, [playing, pointerInside, focusInside, vehicles.length]);

  if (!vehicles.length) return null;
  const vehicle = vehicles[index % vehicles.length];
  const move = (direction: number) => setIndex((current) =>
    (current + direction + vehicles.length) % vehicles.length
  );

  return (
    <div
      className="home-hero-carousel"
      aria-label="Current used vehicles"
      onMouseEnter={() => setPointerInside(true)}
      onMouseLeave={() => setPointerInside(false)}
      onFocusCapture={() => setFocusInside(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusInside(false);
      }}
    >
      <Link
        className="hero-vehicle"
        href={`/vehicles/${slugFor(vehicle)}`}
        aria-label={`View the ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
      >
        <span className="hero-vehicle-photo">
          <img
            key={vehicle.vin}
            src={vehicle.image}
            alt={`Actual ${vehicle.year} ${vehicle.make} ${vehicle.model} from current DrivePEI used inventory`}
            width="1200"
            height="900"
            fetchPriority={index === 0 ? 'high' : 'auto'}
          />
          <span className="hero-vehicle-tag">FROM CURRENT INVENTORY</span>
        </span>
        <span className="hero-vehicle-info">
          <span>
            <strong>{vehicle.year} {vehicle.make} {vehicle.model}</strong>
            <small>See photos and vehicle details</small>
          </span>
          <b>{money(vehicle.price)} <ArrowUpRight size={18} /></b>
        </span>
      </Link>
      {vehicles.length > 1 && (
        <div className="hero-carousel-controls">
          <button type="button" className="hero-carousel-arrow" onClick={() => move(-1)} aria-label="Previous vehicle"><ArrowLeft size={19} /></button>
          <div className="hero-carousel-models" aria-label="Choose a vehicle model">
            {vehicles.map((option, optionIndex) => (
              <button
                type="button"
                key={option.vin}
                className={`hero-carousel-model${optionIndex === index ? ' is-active' : ''}`}
                aria-label={`Show ${option.year} ${option.make} ${option.model}`}
                aria-current={optionIndex === index ? 'true' : undefined}
                onClick={() => setIndex(optionIndex)}
              >{option.model}</button>
            ))}
          </div>
          <button type="button" className="hero-carousel-arrow" onClick={() => move(1)} aria-label="Next vehicle"><ArrowRight size={19} /></button>
          <button type="button" className="hero-carousel-play" onClick={() => setPlaying((value) => !value)} aria-label={playing ? 'Pause vehicle rotation' : 'Play vehicle rotation'}>
            {playing ? <Pause size={17} /> : <Play size={17} />}
          </button>
        </div>
      )}
    </div>
  );
}
