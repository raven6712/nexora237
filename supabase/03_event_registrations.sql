-- === EVENT REGISTRATIONS =========================================
create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  phone text,
  registered_at timestamptz not null default now(),
  status text not null default 'confirmed',
  unique (event_id, user_id) -- section 23 : empêche les doublons
);

alter table public.event_registrations enable row level security;

create policy "Users can view their own registrations"
  on public.event_registrations for select
  using (auth.uid() = user_id);

create policy "Users can register themselves"
  on public.event_registrations for insert
  with check (auth.uid() = user_id);

create policy "Users can cancel their own registration"
  on public.event_registrations for delete
  using (auth.uid() = user_id);

create index if not exists event_registrations_user_idx
  on public.event_registrations (user_id);
