import { NextResponse } from 'next/server';
import { isAdmin, deliverLead } from '@/lib/leads';
import { query } from '@/lib/store';
export const runtime = 'nodejs';
export async function POST(req: Request) {
  if (!isAdmin(req)) return new NextResponse('Unauthorized', { status: 401 });
  if (!process.env.LEAD_WEBHOOK_URL)
    return new NextResponse('Webhook unavailable', { status: 503 });
  const { id } = await req.json();
  if (typeof id !== 'string' || !/^[0-9a-f-]{36}$/.test(id))
    return new NextResponse('Invalid ID', { status: 400 });
  const result = await query(
    `select id from leads where id=$1 and delivery_status <> 'delivered'`,
    [id],
  );
  if (!result.rows.length)
    return new NextResponse('Not found', { status: 404 });
  return NextResponse.json({ ok: await deliverLead(id) });
}
