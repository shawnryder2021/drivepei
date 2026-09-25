import { query } from '@/lib/store';
import { retryLead, featureVehicle, syncNow } from './actions';
export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'DrivePEI Admin',
  robots: { index: false, follow: false },
};
type Lead = {
  id: string;
  created_at: string;
  kind: string;
  name: string;
  email: string;
  phone: string;
  vehicle_vin: string | null;
  delivery_status: string;
  delivery_attempts: number;
};
type Sync = {
  id: string;
  started_at: string;
  status: string;
  imported_count: number;
  deactivated_count: number;
  error: string | null;
};
type Vehicle = {
  vin: string;
  year: number;
  make: string;
  model: string;
  featured: boolean;
  status: string;
};
export default async function Admin() {
  if (!process.env.DATABASE_URL)
    return (
      <main className="container admin-shell">
        <h1>Admin setup needed</h1>
        <p className="admin-warning">
          Set DATABASE_URL and run db/001_init.sql to enable lead storage,
          inventory sync and the admin dashboard.
        </p>
      </main>
    );
  const [leadRows, syncRows, vehicleRows] = await Promise.all([
    query<Lead>(
      `select id,created_at::text,kind,name,email,phone,vehicle_vin,delivery_status,delivery_attempts from leads order by created_at desc limit 50`,
    ),
    query<Sync>(
      `select id,started_at::text,status,imported_count,deactivated_count,error from sync_runs order by started_at desc limit 15`,
    ),
    query<Vehicle>(
      `select vin,year,make,model,featured,status from vehicles order by featured desc,updated_at desc limit 100`,
    ),
  ]);
  return (
    <main className="container admin-shell">
      <span className="eyebrow">OPERATIONS</span>
      <h1>DrivePEI admin</h1>
      <p>Review leads, webhook delivery, current inventory and sync history.</p>
      <div className="admin-actions">
        <form action={syncNow}>
          <button type="submit">Sync inventory now</button>
        </form>
      </div>
      <section>
        <h2>Recent leads</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Type</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>VIN</th>
                <th>Delivery</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leadRows.rows.map((x) => (
                <tr key={x.id}>
                  <td>{new Date(x.created_at).toLocaleString('en-CA')}</td>
                  <td>{x.kind}</td>
                  <td>{x.name}</td>
                  <td>{x.email}</td>
                  <td>{x.phone}</td>
                  <td>{x.vehicle_vin || '—'}</td>
                  <td className={`admin-status-${x.delivery_status}`}>
                    {x.delivery_status} ({x.delivery_attempts})
                  </td>
                  <td>
                    {x.delivery_status !== 'delivered' && (
                      <form action={retryLead}>
                        <input type="hidden" name="id" value={x.id} />
                        <button type="submit">Retry</button>
                      </form>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2>Inventory</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>VIN</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicleRows.rows.map((x) => (
                <tr key={x.vin}>
                  <td>
                    {x.year} {x.make} {x.model}
                  </td>
                  <td>{x.vin}</td>
                  <td>{x.status}</td>
                  <td>{x.featured ? 'Yes' : 'No'}</td>
                  <td>
                    <form action={featureVehicle}>
                      <input type="hidden" name="vin" value={x.vin} />
                      <button type="submit">
                        {x.featured ? 'Unfeature' : 'Feature'}
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2>Sync runs</h2>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Started</th>
                <th>Status</th>
                <th>Imported</th>
                <th>Deactivated</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {syncRows.rows.map((x) => (
                <tr key={x.id}>
                  <td>{new Date(x.started_at).toLocaleString('en-CA')}</td>
                  <td>{x.status}</td>
                  <td>{x.imported_count}</td>
                  <td>{x.deactivated_count}</td>
                  <td>{x.error || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
