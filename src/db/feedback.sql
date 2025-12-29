-- Create Feedback Table
create table feedback (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Internal feedback (RLS)
alter table feedback enable row level security;

-- Allow anyone to insert feedback (even anon)
create policy "Anyone can insert feedback" 
on feedback for insert with check (true);

-- Only admins can read feedback
create policy "Admins can view feedback" 
on feedback for select using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
