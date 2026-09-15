-- === EVENTS ===================================================
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text not null,
  image_url text,
  date date not null,
  start_time time,
  end_time time,
  location text not null,
  category text not null,
  registration_required boolean not null default true,
  registration_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.events enable row level security;

-- Anyone (including anonymous visitors) can read events — it's a public page.
create policy "Events are publicly readable"
  on public.events for select
  using (true);

-- No insert/update/delete policy for anon/authenticated: only the service
-- role (used from a future admin dashboard, section 42) can write events.

create index if not exists events_date_idx on public.events (date);
