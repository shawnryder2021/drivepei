'use client';
import { useState } from 'react';
import { Download, Link as LinkIcon, Printer } from 'lucide-react';

export function ResourceActions({ slug }: { slug: string }) {
  const [status, setStatus] = useState('');
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/resources/${slug}`);
      setStatus('Link copied. Share it with someone shopping for a vehicle.');
    } catch {
      setStatus('Copy the page address from your browser to share this resource.');
    }
  }
  return <div className="resource-actions">
    <a className="button button-lime" href={`/resources/${slug}.pdf`} download><Download size={17}/> Download PDF</a>
    <button className="button button-resource" type="button" onClick={() => window.print()}><Printer size={17}/> Print this page</button>
    <button className="button button-resource" type="button" onClick={copyLink}><LinkIcon size={17}/> Copy page link</button>
    <p role="status" className="resource-action-status">{status}</p>
  </div>;
}
