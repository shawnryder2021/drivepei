'use client';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { captureAttribution, firstLandingPage, trackEvent, trafficSource } from '@/lib/analytics';
const labels: Record<string, string> = {
  vehicle: 'Ask about this vehicle',
  car_finder: 'Tell us what you want',
  trade: 'Tell us about your vehicle',
  finance: 'Ask about financing',
  contact: 'Send us a message',
  inventory_alert: 'Get inventory alerts',
  test_drive: 'Request a test drive',
};
const fields: Record<
  string,
  { name: string; label: string; placeholder?: string; type?: 'date' | 'time'; required?: boolean; halfWidth?: boolean }[]
> = {
  vehicle: [
    {
      name: 'message',
      label: 'What would you like to know?',
      placeholder: 'Availability, viewing time, or a question',
    },
  ],
  car_finder: [
    {
      name: 'desiredVehicle',
      label: 'What vehicle are you looking for?',
      placeholder: 'Make, model, body style, or features',
    },
    {
      name: 'budget',
      label: 'Budget or payment target',
      placeholder: 'Optional',
    },
    { name: 'message', label: 'Anything else?', placeholder: 'Optional' },
  ],
  trade: [
    {
      name: 'tradeVehicle',
      label: 'Year, make and model',
      placeholder: 'e.g. 2019 Honda Civic',
    },
    {
      name: 'tradeMileage',
      label: 'Approximate kilometres',
      placeholder: 'Optional',
    },
    {
      name: 'message',
      label: 'Anything we should know?',
      placeholder: 'Condition, loan balance, or questions',
    },
  ],
  finance: [
    {
      name: 'message',
      label: 'How can we help?',
      placeholder: 'Optional. Please do not enter financial details here.',
    },
  ],
  contact: [
    { name: 'message', label: 'Your message', placeholder: 'How can we help?' },
  ],
  inventory_alert: [
    {
      name: 'desiredVehicle',
      label: 'What should we watch for?',
      placeholder: 'Make, model, price range',
    },
    { name: 'message', label: 'More details', placeholder: 'Optional' },
  ],
  test_drive: [
    { name: 'preferredDate', label: 'Preferred date', type: 'date', required: true, halfWidth: true },
    { name: 'preferredTime', label: 'Preferred time (Atlantic)', type: 'time', required: true, halfWidth: true },
  ],
};
export function LeadForm({
  kind,
  vehicleVin,
  vehicleName,
  heading,
  vehicleOptions = [],
}: {
  kind:
    | 'vehicle'
    | 'car_finder'
    | 'trade'
    | 'finance'
    | 'contact'
    | 'inventory_alert'
    | 'test_drive';
  vehicleVin?: string;
  vehicleName?: string;
  heading?: string;
  vehicleOptions?: { vin: string; label: string; name: string }[];
}) {
  const [status, setStatus] = useState<
    'idle' | 'sending' | 'success' | 'error'
  >('idle');
  const [error, setError] = useState('');
  const [utm, setUtm] = useState<Record<string, string>>({});
  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    setUtm(captureAttribution());
    const parts = new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Halifax', year: 'numeric', month: '2-digit', day: '2-digit',
    }).formatToParts(new Date());
    const part = (type: string) => parts.find((item) => item.type === type)?.value || '';
    setMinDate(`${part('year')}-${part('month')}-${part('day')}`);
  }, []);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    const form = new FormData(e.currentTarget);
    const details: Record<string, string> = {};
    for (const f of fields[kind])
      if (f.name !== 'message')
        details[f.name] = String(form.get(f.name) || '').slice(0, 500);
    if (vehicleName) details.vehicleName = vehicleName;
    const selected = kind === 'test_drive'
      ? vehicleOptions.find((option) => option.vin === form.get('vehicleVin'))
      : undefined;
    if (selected) {
      details.vehicleName = selected.name;
      details.desiredVehicle = selected.label;
    } else if (kind === 'test_drive') {
      details.desiredVehicle = String(form.get('desiredVehicle') || '').slice(0, 500);
    }
    const requestVin = selected?.vin || vehicleVin;
    const payload = {
      kind,
      name: form.get('name'),
      email: form.get('email'),
      phone: form.get('phone'),
      message: String(form.get('message') || ''),
      vehicleVin: requestVin,
      details,
      consent: form.get('consent') === 'on',
      honeypot: form.get('website'),
      utm,
      landingPage: firstLandingPage(),
      turnstileToken: String(form.get('cf-turnstile-response') || ''),
    };
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Could not submit');
      setStatus('success');
      if (data.id) {
        trackEvent('generate_lead', {
          lead_type: kind,
          traffic_source: trafficSource(utm.utm_source),
          page_path: location.pathname,
          vehicle_vin: requestVin || undefined,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Please try again.');
      setStatus('error');
    }
  }
  if (status === 'success')
    return (
      <div className="form-success" role="status">
        <CheckCircle2 size={42} />
        <h3>Thanks, we’ve got your {kind === 'test_drive' ? 'test drive request' : 'request'}.</h3>
        <p>{kind === 'test_drive'
          ? 'Our team will confirm the vehicle and appointment time with you.'
          : 'Our team will follow up using the contact details you provided.'}</p>
      </div>
    );
  return (
    <form className="lead-form" onSubmit={submit}>
      <span className="eyebrow">LET’S CONNECT</span>
      <h3>{heading || labels[kind]}</h3>
      <p>{kind === 'test_drive'
        ? 'Choose a vehicle and a time that works for you. We’ll confirm both before your visit.'
        : 'Share a few details and we’ll be in touch.'}</p>
      <div className="form-grid">
        <label>
          Full name{' '}
          <input name="name" autoComplete="name" required minLength={2} />
        </label>
        <label>
          Email address{' '}
          <input name="email" type="email" autoComplete="email" required />
        </label>
        <label>
          Phone number{' '}
          <input name="phone" type="tel" autoComplete="tel" required />
        </label>
        {kind === 'test_drive' && (
          <label className="span-2">
            Vehicle you’d like to drive
            {vehicleOptions.length ? (
              <select name="vehicleVin" required defaultValue="">
                <option value="" disabled>Choose a current vehicle</option>
                {vehicleOptions.map((option) => (
                  <option key={option.vin} value={option.vin}>{option.label}</option>
                ))}
              </select>
            ) : (
              <input name="desiredVehicle" placeholder="Make, model or type of vehicle" required />
            )}
          </label>
        )}
        {fields[kind].map((f) => (
          <label key={f.name} className={f.halfWidth ? undefined : 'span-2'}>
            {f.label}
            {f.name === 'message' ? (
              <textarea name={f.name} placeholder={f.placeholder} rows={3} />
            ) : (
              <input
                name={f.name}
                type={f.type || 'text'}
                placeholder={f.placeholder}
                min={f.type === 'date' ? minDate : undefined}
                required={f.required || ['desiredVehicle', 'tradeVehicle'].includes(f.name)}
              />
            )}
          </label>
        ))}
      </div>
      <div className="hidden-field" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
        <>
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
          />
          <div
            className="cf-turnstile"
            data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
          />
        </>
      )}
      <label className="consent">
        <input name="consent" type="checkbox" required />
        <span>
          I agree that DrivePEI may contact me about this request by phone,
          email or text. I understand I can withdraw consent at any time.
        </span>
      </label>
      {status === 'error' && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button
        className="button button-dark"
        type="submit"
        disabled={status === 'sending'}
      >
        {status === 'sending' ? 'Sending…' : kind === 'test_drive' ? 'Request my test drive' : 'Send my request'}{' '}
        <ArrowRight size={17} />
      </button>
      <small>
        We only use your information to respond to your request. Do not include
        SIN, income or other sensitive credit information here.
      </small>
    </form>
  );
}
