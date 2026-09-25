'use client';
import { useEffect, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { VehicleCard } from './VehicleCard';
import { calculatePayment } from './PaymentEstimator';
import type { Vehicle } from '@/lib/vehicle';
export function InventoryExplorer({
  vehicles,
  initialBody = '',
  initialDrive = '',
  initialMake = '',
}: {
  vehicles: Vehicle[];
  initialBody?: string;
  initialDrive?: string;
  initialMake?: string;
}) {
  const [q, setQ] = useState(''),
    [make, setMake] = useState(initialMake),
    [model, setModel] = useState(''),
    [body, setBody] = useState(initialBody),
    [drive, setDrive] = useState(initialDrive),
    [maxPrice, setMaxPrice] = useState(''),
    [maxKm, setMaxKm] = useState(''),
    [minYear, setMinYear] = useState(''),
    [maxPayment, setMaxPayment] = useState(''),
    [apr, setApr] = useState(''),
    [term, setTerm] = useState('60'),
    [sort, setSort] = useState('featured');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setQ(params.get('q') || '');
    if (params.has('payment'))
      document
        .querySelector('.payment-filter')
        ?.scrollIntoView({ block: 'nearest' });
  }, []);
  const makes = [...new Set(vehicles.map((v) => v.make))].sort();
  const bodies = [
    ...new Set(vehicles.map((v) => v.body).filter(Boolean)),
  ].sort();
  const models = [
    ...new Set(
      vehicles
        .filter((v) => !make || v.make === make)
        .map((v) => v.model)
        .filter(Boolean),
    ),
  ].sort();
  const filtered = useMemo(
    () =>
      vehicles
        .filter((v) => {
          const text = `${v.year} ${v.make} ${v.model} ${v.trim}`.toLowerCase();
          const estimated =
            apr !== ''
              ? (calculatePayment(v.price, Number(apr), Number(term)) * 12) / 26
              : Infinity;
          return (
            (!q || text.includes(q.toLowerCase())) &&
            (!make || v.make === make) &&
            (!model || v.model === model) &&
            (!body || v.body.toLowerCase().includes(body.toLowerCase())) &&
            (!drive || /all|four|4|awd/i.test(v.drivetrain)) &&
            (!maxPrice || v.price <= Number(maxPrice)) &&
            (!maxKm || v.kilometres <= Number(maxKm)) &&
            (!minYear || v.year >= Number(minYear)) &&
            (!maxPayment || estimated <= Number(maxPayment))
          );
        })
        .sort((a, b) =>
          sort === 'price-low'
            ? a.price - b.price
            : sort === 'price-high'
              ? b.price - a.price
              : sort === 'year'
                ? b.year - a.year
                : sort === 'km'
                  ? a.kilometres - b.kilometres
                  : Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
        ),
    [
      vehicles,
      q,
      make,
      model,
      body,
      drive,
      maxPrice,
      maxKm,
      minYear,
      maxPayment,
      apr,
      term,
      sort,
    ],
  );
  function reset() {
    setQ('');
    setMake('');
    setModel('');
    setBody('');
    setDrive('');
    setMaxPrice('');
    setMaxKm('');
    setMinYear('');
    setMaxPayment('');
    setApr('');
  }
  return (
    <div className="inventory-layout">
      <aside className="filters">
        <div className="filters-heading">
          <SlidersHorizontal size={18} />
          <strong>Filter your drive</strong>
          <button type="button" onClick={reset}>
            Clear all <X size={13} />
          </button>
        </div>
        <label className="search-field">
          <span>Search</span>
          <div>
            <Search size={17} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Make, model, keyword"
            />
          </div>
        </label>
        <label>
          Make
          <select
            value={make}
            onChange={(e) => {
              setMake(e.target.value);
              setModel('');
            }}
          >
            <option value="">All makes</option>
            {makes.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Model
          <select value={model} onChange={(e) => setModel(e.target.value)}>
            <option value="">All models</option>
            {models.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Body style
          <select value={body} onChange={(e) => setBody(e.target.value)}>
            <option value="">All body styles</option>
            {bodies.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Max price
          <select
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          >
            <option value="">Any price</option>
            {[15000, 20000, 25000, 30000, 35000, 40000, 50000].map((x) => (
              <option key={x} value={x}>
                ${x.toLocaleString()}
              </option>
            ))}
          </select>
        </label>
        <label>
          Max kilometres
          <select value={maxKm} onChange={(e) => setMaxKm(e.target.value)}>
            <option value="">Any mileage</option>
            {[50000, 75000, 100000, 125000, 150000, 200000].map((x) => (
              <option key={x} value={x}>
                {x.toLocaleString()} km
              </option>
            ))}
          </select>
        </label>
        <label>
          Minimum year
          <select value={minYear} onChange={(e) => setMinYear(e.target.value)}>
            <option value="">Any year</option>
            {Array.from({ length: 12 }, (_, i) => 2026 - i).map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label className="check-row">
          <input
            type="checkbox"
            checked={Boolean(drive)}
            onChange={(e) => setDrive(e.target.checked ? 'awd' : '')}
          />{' '}
          AWD / 4WD only
        </label>
        <div className="payment-filter">
          <strong>Shop by payment</strong>
          <p>Use a rate you choose to see an estimate.</p>
          <label>
            Maximum biweekly payment
            <input
              type="number"
              min="0"
              placeholder="$ per 2 weeks"
              value={maxPayment}
              onChange={(e) => setMaxPayment(e.target.value)}
            />
          </label>
          <label>
            Annual rate (%)
            <input
              type="number"
              min="0"
              max="40"
              step="0.1"
              placeholder="Enter your rate"
              value={apr}
              onChange={(e) => setApr(e.target.value)}
            />
          </label>
          <label>
            Term
            <select value={term} onChange={(e) => setTerm(e.target.value)}>
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
              <option value="72">72 months</option>
              <option value="84">84 months</option>
            </select>
          </label>
          <small>
            Vehicle price before taxes and fees; actual financing depends on
            approval.
          </small>
        </div>
      </aside>
      <div className="inventory-results" id="inventory-results">
        <div className="results-toolbar">
          <div>
            <span className="eyebrow">THE CURRENT LINEUP</span>
            <h2>
              {filtered.length} used vehicle{filtered.length === 1 ? '' : 's'}
            </h2>
          </div>
          <label>
            Sort by{' '}
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="year">Newest year</option>
              <option value="km">Lowest kilometres</option>
            </select>
          </label>
        </div>
        {filtered.length ? (
          <div className="vehicle-grid">
            {filtered.map((v) => (
              <VehicleCard key={v.vin} vehicle={v} />
            ))}
          </div>
        ) : (
          <div className="empty-results">
            <h3>No exact matches right now.</h3>
            <p>Try a wider search or tell us what you’re looking for.</p>
            <a className="button button-dark" href="/car-finder">
              Use Car Finder →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
