'use server';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { isAdmin, deliverLead } from '@/lib/leads';
import { getFeedVehicles } from '@/lib/inventory';
import { query } from '@/lib/store';
async function authorized() {
  const h = await headers();
  if (!isAdmin(new Request('http://localhost', { headers: h })))
    throw new Error('Unauthorized');
}
export async function retryLead(formData: FormData) {
  await authorized();
  const id = String(formData.get('id') || '');
  if (!/^[0-9a-f-]{36}$/.test(id)) throw new Error('Invalid lead');
  await deliverLead(id);
  revalidatePath('/admin');
}
export async function featureVehicle(formData: FormData) {
  await authorized();
  const vin = String(formData.get('vin') || '');
  if (!/^[A-HJ-NPR-Z0-9]{17}$/.test(vin)) throw new Error('Invalid VIN');
  await query(`update vehicles set featured=not featured where vin=$1`, [vin]);
  revalidatePath('/admin');
  revalidatePath('/');
}
export async function syncNow() {
  await authorized();
  const vehicles = await getFeedVehicles(false);
  const currentCount = await query<{ count: string }>(
    `select count(*)::text as count from vehicles where status='active'`,
  );
  if (
    Number(currentCount.rows[0].count) >= 6 &&
    vehicles.length < Number(currentCount.rows[0].count) * 0.5
  )
    throw new Error('Feed count fell by more than half');
  if (!vehicles.length) throw new Error('Feed is empty');
  const run = await query<{ id: string }>(
    `insert into sync_runs(status) values('running') returning id`,
  );
  try {
    for (const v of vehicles) {
      await query(
        `insert into vehicles(vin,stock,year,make,model,trim,price,kilometres,body,drivetrain,transmission,fuel,colour,image,source_url,status,synced_at,updated_at)
values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'active',now(),now()) on conflict(vin) do update set stock=excluded.stock,year=excluded.year,make=excluded.make,model=excluded.model,trim=excluded.trim,price=excluded.price,kilometres=excluded.kilometres,body=excluded.body,drivetrain=excluded.drivetrain,transmission=excluded.transmission,fuel=excluded.fuel,colour=excluded.colour,image=excluded.image,source_url=excluded.source_url,status='active',synced_at=now(),updated_at=now()`,
        [
          v.vin,
          v.stock,
          v.year,
          v.make,
          v.model,
          v.trim,
          v.price,
          v.kilometres,
          v.body,
          v.drivetrain,
          v.transmission,
          v.fuel,
          v.colour,
          v.image,
          v.sourceUrl,
        ],
      );
    }
    const deactivated = await query(
      `update vehicles set status='inactive',updated_at=now() where status='active' and not (vin=any($1::text[]))`,
      [vehicles.map((v) => v.vin)],
    );
    await query(
      `update sync_runs set status='success',finished_at=now(),imported_count=$2,deactivated_count=$3 where id=$1`,
      [run.rows[0].id, vehicles.length, deactivated.rowCount || 0],
    );
  } catch (e) {
    await query(
      `update sync_runs set status='failed',finished_at=now(),error=$2 where id=$1`,
      [run.rows[0].id, e instanceof Error ? e.message : 'unknown'],
    );
    throw e;
  }
  revalidatePath('/');
  revalidatePath('/used');
  revalidatePath('/admin');
}
