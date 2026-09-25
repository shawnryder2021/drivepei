import { NextResponse } from 'next/server';
import {
  leadSchema,
  saveLead,
  deliverLead,
  deliverDirect,
  verifyTurnstile,
} from '@/lib/leads';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin');
    if (origin && new URL(origin).host !== req.headers.get('host'))
      return NextResponse.json({ error: 'Invalid origin' }, { status: 403 });
    const body = await req.json();
    const parsed = leadSchema.safeParse(body);
    if (!parsed.success)
      return NextResponse.json(
        { error: 'Please check the form fields and consent.' },
        { status: 400 },
      );
    if (parsed.data.honeypot) return NextResponse.json({ ok: true });
    const ip =
      req.headers.get('x-nf-client-connection-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0] ||
      'unknown';
    if (!(await verifyTurnstile(parsed.data.turnstileToken, ip)))
      return NextResponse.json(
        { error: 'Please complete the verification.' },
        { status: 400 },
      );
    if (!process.env.DATABASE_URL) {
      const id = await deliverDirect(parsed.data, ip);
      return NextResponse.json({ ok: true, id });
    }
    const id = await saveLead(parsed.data, ip);
    await deliverLead(id);
    return NextResponse.json({ ok: true, id });
  } catch (error) {
    if (error instanceof Error && error.message === 'RATE_LIMIT')
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 },
      );
    console.error(
      'Lead submission failed',
      error instanceof Error ? error.message : 'unknown',
    );
    return NextResponse.json(
      { error: 'We could not send your request. Please try again.' },
      { status: 502 },
    );
  }
}
