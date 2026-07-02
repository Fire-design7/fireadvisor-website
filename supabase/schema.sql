-- Fire Advisor — inquiries table
-- Run this once in the Supabase SQL editor (project > SQL Editor > New query).

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  inquiry_type text not null,
  building_type text not null,
  service_slug text,
  message text,
  locale text not null default 'bg',
  status text not null default 'new' -- new | contacted | won | lost
);

alter table public.inquiries enable row level security;

-- No public read/write policies are defined on purpose: all access happens
-- through the server-side API route using the Supabase service role key,
-- which bypasses RLS. This keeps the table fully private from the browser.
