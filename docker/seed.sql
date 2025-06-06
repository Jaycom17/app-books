create extension if not exists "uuid-ossp";

-- Crear tabla books
create table if not exists books (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  author text not null,
  year int,
  category text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Activar RLS
alter table books enable row level security;

-- Políticas RLS
create policy "Users can view their own books"
  on books
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their own books"
  on books
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own books"
  on books
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their own books"
  on books
  for delete
  using (auth.uid() = user_id);