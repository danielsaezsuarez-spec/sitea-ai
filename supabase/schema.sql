-- Esquema mínimo recomendado para Sitea.ai
-- Ejecutar en Supabase SQL Editor cuando se cree el proyecto real.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  email text,
  plan text not null default 'Base' check (plan in ('Base', 'Pro', 'Premium')),
  credits integer not null default 50,
  publish_plan text not null default 'none' check (publish_plan in ('none', 'publica', 'publica_plus')),
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  prompt text not null,
  html_content text,
  zip_url text,
  thumbnail text,
  site_data jsonb,
  status text not null default 'borrador' check (status in ('borrador', 'publicado')),
  published_url text,
  custom_domain text,
  domain_status text check (domain_status in ('pending', 'connected', 'error')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_user_id_updated_at_idx on public.projects(user_id, updated_at desc);

alter table public.profiles enable row level security;
alter table public.projects enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);
create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);

create policy "projects_select_own" on public.projects for select using (auth.uid() = user_id);
create policy "projects_insert_own" on public.projects for insert with check (auth.uid() = user_id);
create policy "projects_update_own" on public.projects for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "projects_delete_own" on public.projects for delete using (auth.uid() = user_id);
