-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- PROFILES TABLE (Extends Auth)
create table profiles (
  id uuid references auth.users(id) on delete cascade not null primary key,
  role text not null default 'user' check (role in ('user', 'admin')),
  full_name text,
  email text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone" 
on profiles for select using (true);

create policy "Users can insert their own profile" 
on profiles for insert with check (auth.uid() = id);

create policy "Users can update own profile" 
on profiles for update using (auth.uid() = id);

-- Trigger to handle new user signup automatically
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- CONVERSATIONS TABLE
create table conversations (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references profiles(id) on delete cascade not null,
  status text not null default 'open' check (status in ('open', 'closed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Conversations
alter table conversations enable row level security;

create policy "Users can view their own conversations" 
on conversations for select using (auth.uid() = user_id);

create policy "Admins can view all conversations" 
on conversations for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

create policy "Users can create conversations" 
on conversations for insert with check (auth.uid() = user_id);

create policy "Admins can update conversations (close tickets)" 
on conversations for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- MESSAGES TABLE
create table messages (
  id uuid default uuid_generate_v4() primary key,
  conversation_id uuid references conversations(id) on delete cascade not null,
  sender_id uuid references profiles(id) on delete cascade not null,
  content text not null,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Messages
alter table messages enable row level security;

create policy "Users can view messages in their conversations" 
on messages for select using (
  exists (
    select 1 from conversations 
    where id = messages.conversation_id 
    and (user_id = auth.uid() or exists (select 1 from profiles where id = auth.uid() and role = 'admin'))
  )
);

create policy "Users can insert messages to their conversations" 
on messages for insert with check (
  exists (
    select 1 from conversations 
    where id = conversation_id 
    and (user_id = auth.uid() or exists (select 1 from profiles where id = auth.uid() and role = 'admin'))
  )
);
