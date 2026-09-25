import 'server-only';
import { z } from 'zod';
import { createHash, timingSafeEqual } from 'node:crypto';
import { query } from './store';

export const leadSchema = z.object({
  kind: z.enum([
    'vehicle',
    'car_finder',
    'trade',
    'finance',
    'contact',
    'inventory_alert',
  ]),
  name: z.string().trim().min(2).max(120),
  email: z.email().max(255),
  phone: z
    .string()
    .trim()
    .min(7)
    .max(32)
    .regex(/^[+\d().\s-]+$/),
  message: z.string().trim().max(3000).default(''),
  vehicleVin: z.string().trim().max(17).optional(),
  details: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
    .default({}),
  consent: z.literal(true),
  utm: z.record(z.string(), z.string().max(200)).default({}),
  landingPage: z.string().max(500).optional(),
  honeypot: z.string().max(200).optional(),
  turnstileToken: z.string().optional(),
});
export type LeadInput = z.infer<typeof leadSchema>;
export function isAdmin(req: Request, scope: 'admin' | 'sync' = 'admin') {
  const secret =
    scope === 'sync'
      ? process.env.SYNC_TOKEN || process.env.ADMIN_TOKEN
      : process.env.ADMIN_TOKEN;
  if (!secret) return false;
  const header = req.headers.get('authorization') || '';
  let supplied = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (header.startsWith('Basic ')) {
    try {
      supplied = Buffer.from(header.slice(6), 'base64')
        .toString('utf8')
        .split(':')
        .slice(1)
        .join(':');
    } catch {
      /* bad auth */
    }
  }
  const a = Buffer.from(secret),
    b = Buffer.from(supplied);
  return a.length === b.length && timingSafeEqual(a, b);
}
export async function verifyTurnstile(token: string | undefined, ip: string) {
  if (!process.env.TURNSTILE_SECRET_KEY) return true;
  if (!token) return false;
  const body = new URLSearchParams({
    secret: process.env.TURNSTILE_SECRET_KEY,
    response: token,
    remoteip: ip,
  });
  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    { method: 'POST', body },
  );
  if (!response.ok) return false;
  return Boolean(((await response.json()) as { success?: boolean }).success);
}
export async function saveLead(lead: LeadInput, ip: string) {
  const ipHash = createHash('sha256')
    .update(`${process.env.ADMIN_TOKEN || 'drivepei'}:${ip}`)
    .digest('hex');
  const count = await query<{ count: string }>(
    `select count(*)::text as count from leads where ip_hash=$1 and created_at > now()-interval '1 hour'`,
    [ipHash],
  );
  if (Number(count.rows[0].count) >= 6) throw new Error('RATE_LIMIT');
  const result = await query<{ id: string }>(
    `insert into leads
    (kind,name,email,phone,message,vehicle_vin,details,consent,utm,landing_page,ip_hash)
    values ($1,$2,$3,$4,$5,$6,$7,true,$8,$9,$10) returning id`,
    [
      lead.kind,
      lead.name,
      lead.email,
      lead.phone,
      lead.message,
      lead.vehicleVin || null,
      JSON.stringify(lead.details),
      JSON.stringify(lead.utm),
      lead.landingPage || null,
      ipHash,
    ],
  );
  return result.rows[0].id;
}
export async function deliverLead(id: string) {
  if (!process.env.LEAD_WEBHOOK_URL) return false;
  const result = await query(
    `select id,created_at,kind,name,email,phone,message,vehicle_vin,details,consent,utm,landing_page from leads where id=$1`,
    [id],
  );
  const lead = result.rows[0];
  if (!lead) throw new Error('Lead not found');
  let status = 'delivered',
    error = '';
  try {
    const response = await fetch(process.env.LEAD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.LEAD_WEBHOOK_BEARER_TOKEN
          ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_BEARER_TOKEN}` }
          : {}),
      },
      body: JSON.stringify({ event: 'drivepei.lead.created', lead }),
      signal: AbortSignal.timeout(10000),
      cache: 'no-store',
    });
    if (!response.ok) throw new Error(`Webhook HTTP ${response.status}`);
  } catch (e) {
    status = 'failed';
    error = e instanceof Error ? e.message.slice(0, 500) : 'Webhook failed';
  }
  await query(
    `update leads set delivery_status=$2, delivery_attempts=delivery_attempts+1, last_delivery_at=now(), last_delivery_error=$3 where id=$1`,
    [id, status, error || null],
  );
  return status === 'delivered';
}

// Direct delivery is used until DrivePEI has its own database. Activepieces owns storage.
const recentRequests = new Map<string, { count: number; until: number }>();
export async function deliverDirect(lead: LeadInput, ip: string) {
  if (!process.env.LEAD_WEBHOOK_URL) throw new Error('WEBHOOK_UNAVAILABLE');
  const key = createHash('sha256').update(ip).digest('hex');
  const now = Date.now();
  const previous = recentRequests.get(key);
  if (previous && previous.until > now && previous.count >= 6)
    throw new Error('RATE_LIMIT');
  recentRequests.set(key, {
    count: previous && previous.until > now ? previous.count + 1 : 1,
    until: previous && previous.until > now ? previous.until : now + 3600000,
  });
  const id = crypto.randomUUID();
  const response = await fetch(process.env.LEAD_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': id,
      ...(process.env.LEAD_WEBHOOK_BEARER_TOKEN
        ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_BEARER_TOKEN}` }
        : {}),
    },
    body: JSON.stringify({
      event: 'drivepei.lead.created',
      lead: {
        id,
        created_at: new Date().toISOString(),
        kind: lead.kind,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        vehicle_vin: lead.vehicleVin || null,
        details: lead.details,
        consent: lead.consent,
        utm: lead.utm,
        landing_page: lead.landingPage || null,
      },
    }),
    signal: AbortSignal.timeout(12000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`WEBHOOK_HTTP_${response.status}`);
  return id;
}
