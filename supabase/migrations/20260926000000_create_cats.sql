create table public.cats (
  id text primary key,
  name text not null,
  breed text not null,
  age text not null,
  gender text not null check (gender in ('Female', 'Male')),
  location text not null,
  image text not null,
  description text not null,
  traits text[] not null default '{}',
  featured boolean not null default false,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.cats enable row level security;

create policy "Anyone can view available cats"
  on public.cats
  for select
  to anon, authenticated
  using (available);