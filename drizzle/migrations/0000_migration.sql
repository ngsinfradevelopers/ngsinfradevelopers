create type public.app_role as enum ('admin', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "own roles readable" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create table public.site_content (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);
grant select on public.site_content to anon, authenticated;
grant insert, update on public.site_content to authenticated;
grant all on public.site_content to service_role;
alter table public.site_content enable row level security;
create policy "public read content" on public.site_content for select to anon, authenticated using (true);
create policy "admin insert content" on public.site_content for insert to authenticated with check (public.has_role(auth.uid(), 'admin'));
create policy "admin update content" on public.site_content for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  mobile text not null check (char_length(mobile) between 10 and 15),
  email text check (email is null or char_length(email) <= 255),
  plot_size text check (plot_size is null or char_length(plot_size) <= 100),
  message text check (message is null or char_length(message) <= 2000),
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz not null default now()
);
grant insert on public.enquiries to anon, authenticated;
grant select, update, delete on public.enquiries to authenticated;
grant all on public.enquiries to service_role;
alter table public.enquiries enable row level security;
create policy "anyone can submit" on public.enquiries for insert to anon, authenticated with check (status = 'new');
create policy "admin read enquiries" on public.enquiries for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admin update enquiries" on public.enquiries for update to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "admin delete enquiries" on public.enquiries for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "admin read media" on storage.objects for select to authenticated using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "admin upload media" on storage.objects for insert to authenticated with check (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "admin update media" on storage.objects for update to authenticated using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));
create policy "admin delete media" on storage.objects for delete to authenticated using (bucket_id = 'site-media' and public.has_role(auth.uid(), 'admin'));