-- Run this once in Supabase SQL Editor.
-- It creates the cloud table used by the portfolio admin system.

create table if not exists public.works (
  id text primary key,
  title text not null default '',
  category text not null default '',
  sort_order integer not null default 0,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.works enable row level security;

drop policy if exists "Public can read works" on public.works;
create policy "Public can read works"
on public.works
for select
using (true);

drop policy if exists "Authenticated users can insert works" on public.works;
create policy "Authenticated users can insert works"
on public.works
for insert
to authenticated
with check (true);

drop policy if exists "Authenticated users can update works" on public.works;
create policy "Authenticated users can update works"
on public.works
for update
to authenticated
using (true)
with check (true);

drop policy if exists "Authenticated users can delete works" on public.works;
create policy "Authenticated users can delete works"
on public.works
for delete
to authenticated
using (true);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_works_updated_at on public.works;
create trigger set_works_updated_at
before update on public.works
for each row
execute function public.set_updated_at();

-- Public asset bucket for portfolio images and videos.
insert into storage.buckets (id, name, public)
values ('portfolio-assets', 'portfolio-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Public can read portfolio assets" on storage.objects;
create policy "Public can read portfolio assets"
on storage.objects
for select
using (bucket_id = 'portfolio-assets');

drop policy if exists "Authenticated users can upload portfolio assets" on storage.objects;
create policy "Authenticated users can upload portfolio assets"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'portfolio-assets');

drop policy if exists "Authenticated users can update portfolio assets" on storage.objects;
create policy "Authenticated users can update portfolio assets"
on storage.objects
for update
to authenticated
using (bucket_id = 'portfolio-assets')
with check (bucket_id = 'portfolio-assets');

drop policy if exists "Authenticated users can delete portfolio assets" on storage.objects;
create policy "Authenticated users can delete portfolio assets"
on storage.objects
for delete
to authenticated
using (bucket_id = 'portfolio-assets');
