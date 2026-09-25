import 'server-only';
import { Pool, type QueryResultRow } from 'pg';
let pool: Pool | undefined;
function database() {
  if (!process.env.DATABASE_URL)
    throw new Error('DATABASE_URL is not configured');
  pool ??= new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 4,
    ssl: process.env.DATABASE_URL.includes('localhost')
      ? false
      : { rejectUnauthorized: false },
  });
  return pool;
}
export function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  values: unknown[] = [],
) {
  return database().query<T>(sql, values);
}
