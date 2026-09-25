create extension if not exists pgcrypto;
create table if not exists vehicles (
  vin text primary key, stock text, year integer not null, make text not null, model text not null,
  trim text not null default '', price numeric(12,2) not null, kilometres integer not null default 0,
  body text not null default '', drivetrain text not null default '', transmission text not null default '',
  fuel text not null default '', colour text not null default '', image text not null default '',
  source_url text not null default '', status text not null default 'active', featured boolean not null default false,
  description text, synced_at timestamptz, updated_at timestamptz not null default now()
);
create index if not exists vehicles_active_idx on vehicles(status, make, price);
create table if not exists sync_runs (
  id uuid primary key default gen_random_uuid(), started_at timestamptz not null default now(),
  finished_at timestamptz, status text not null, imported_count integer not null default 0,
  deactivated_count integer not null default 0, error text
);
create table if not exists leads (
  id uuid primary key default gen_random_uuid(), created_at timestamptz not null default now(),
  kind text not null, name text not null, email text not null, phone text not null,
  message text not null default '', vehicle_vin text, details jsonb not null default '{}'::jsonb,
  consent boolean not null, utm jsonb not null default '{}'::jsonb,
  landing_page text, ip_hash text, delivery_status text not null default 'pending',
  delivery_attempts integer not null default 0, last_delivery_at timestamptz, last_delivery_error text
);
create index if not exists leads_created_idx on leads(created_at desc);
create index if not exists leads_delivery_idx on leads(delivery_status, created_at);
create index if not exists leads_ip_rate_idx on leads(ip_hash, created_at);
