# Deployment & Setup Guide - BidAutoDirect

Follow these steps to deploy the BidAutoDirect platform and configure the Supabase environment.

## 1. Supabase Setup

1. **Create a Project**: Go to [Supabase](https://supabase.com) and create a new project.
2. **Database Schema**:
   - Navigate to the **SQL Editor** in your Supabase dashboard.
   - Copy the contents of `supabase/schema.sql` and run it.
   - Copy the contents of `supabase/seed.sql` and run it to populate vehicles.
3. **Authentication**:
   - Go to **Authentication > Providers** and ensure Email is enabled.
   - (Optional) Disable email confirmation for testing convenience.

## 2. Environment Variables

Create a `.env.local` file in the root of your project (or add them to Vercel):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## 3. Vercel Deployment

1. **Push to GitHub**: Push your local repository to a new GitHub repo.
2. **Import to Vercel**:
   - Connect your GitHub account and import the project.
   - Add the environment variables mentioned above.
   - Click **Deploy**.

## 4. Custom Domain

1. In the Vercel dashboard, go to **Settings > Domains**.
2. Add `bidautodirect.com`.
3. Follow the DNS instructions provided by Vercel.

## 5. Admin Access

To grant a user admin privileges:
- Manually update the `role` column in the `profiles` table to `'admin'` for the desired user ID in the Supabase dashboard.
