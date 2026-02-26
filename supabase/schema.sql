-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create custom types
create type user_role as enum ('user', 'admin');
create type vehicle_status as enum ('BIDDING', 'BUYED');

-- Create profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  role user_role default 'user' not null,
  full_name text,
  must_change_password boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_login timestamp with time zone
);

-- Create vehicles table
create table vehicles (
  id uuid default uuid_generate_v4() primary key,
  status vehicle_status default 'BIDDING' not null,
  year integer not null,
  make text not null,
  model text not null,
  trim text,
  vin text unique not null,
  mileage integer not null,
  title_status text not null,
  damage_type text,
  condition_notes text,
  engine text,
  transmission text,
  drivetrain text,
  fuel_type text,
  keys boolean default true,
  running_condition text,
  auction_house text not null,
  lot_number text not null,
  auction_date timestamp with time zone,
  location text not null,
  current_bid numeric(12,2) default 0,
  buy_now_price numeric(12,2),
  final_price numeric(12,2),
  est_repair_cost numeric(12,2),
  est_market_value numeric(12,2),
  shipping_estimate numeric(12,2),
  images text[] default '{}',
  video_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security)
alter table profiles enable row level security;
alter table vehicles enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Vehicles policies
create policy "Vehicles are viewable by everyone." on vehicles
  for select using (true);

create policy "Only admins can modify vehicles." on vehicles
  for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role = 'admin'
    )
  );

-- Function to handle new user signup
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'user');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Updated at trigger function
create function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_vehicles_updated_at
    before update on vehicles
    for each row execute procedure update_updated_at_column();
