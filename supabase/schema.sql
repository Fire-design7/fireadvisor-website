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

-- Since the form accepts phone-only inquiries, the API stores an empty string
-- in `email` (and `building_type`) when they're not given, so no migration is
-- required. Optional, if you'd rather have NULLs and the ad attribution in
-- the table too (the API would then need to send these columns):
--   alter table public.inquiries alter column email drop not null;
--   alter table public.inquiries alter column building_type drop not null;
--   alter table public.inquiries add column if not exists utm jsonb;
--   alter table public.inquiries add column if not exists source_page text;

-- No public read/write policies are defined on purpose: all access happens
-- through the server-side API route using the Supabase service role key,
-- which bypasses RLS. This keeps the table fully private from the browser.
