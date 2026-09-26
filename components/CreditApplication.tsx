'use client';
import { useState } from 'react';
import { ArrowUpRight, LockKeyhole } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function CreditApplication({ url }: { url: string }) {
  const [open, setOpen] = useState(false);
  function reveal() {
    if (!open) {
      trackEvent('credit_application_click', { application_provider: 'dealertrack', entry_point: 'embedded' });
      setOpen(true);
    }
  }
  return <>
    {open ? <div className="iframe-wrap"><iframe src={url} title="Secure Dealertrack credit application" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div> :
      <div className="application-unavailable application-ready">
        <LockKeyhole size={29} aria-hidden="true" />
        <h3>Continue to the secure application.</h3>
        <p>The application is provided by Dealertrack. DrivePEI does not collect the financial details you enter there.</p>
        <button type="button" className="button button-lime" onClick={reveal}>Open credit application <ArrowUpRight size={17}/></button>
      </div>}
    <p className="iframe-fallback">If the application does not appear,{' '}
      <a href={url} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('credit_application_click', { application_provider: 'dealertrack', entry_point: 'external_link' })}>open it in a new tab <ArrowUpRight size={14}/></a>.
    </p>
  </>;
}
