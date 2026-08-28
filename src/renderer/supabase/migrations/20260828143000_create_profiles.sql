-- Create a dedicated profiles table (not auth.users metadata).
-- Each row is keyed to auth.users and is only readable/writable by that user.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  display_name text,
  phone text,
  location text,
  website text,
  bio text,
  investor_type text not null default 'individual',
  risk_tolerance text not null default 'moderate',
  preferred_markets text not null default 'us-equities',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint profiles_investor_type_check
    check (investor_type in ('individual', 'professional', 'institution', 'student')),
  constraint profiles_risk_tolerance_check
    check (risk_tolerance in ('conservative', 'moderate', 'aggressive')),
  constraint profiles_preferred_markets_check
    check (preferred_markets in ('us-equities', 'international', 'crypto', 'mixed'))
);

comment on table public.profiles is 'User profile details stored separately from auth metadata.';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id)
  values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

alter table public.profiles enable row level security;

create policy "Users can select their own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles
  for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

grant select, insert, update on table public.profiles to authenticated;
