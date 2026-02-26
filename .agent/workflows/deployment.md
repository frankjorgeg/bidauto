---
description: How to deploy the BidAutoDirect application online using Vercel
---

# Deployment Guide

Follow these steps to deploy your application to Vercel and connect it to your Supabase database.

## 1. Create a GitHub Repository

1.  Go to [GitHub](https://github.com/new) and create a new **public** or **private** repository.
2.  Do **NOT** initialize it with a README, license, or .gitignore (since you already have them locally).

## 2. Link Local Code to GitHub

Copy the URL of your new repository and run these commands in your terminal:

```bash
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
git branch -M main
git push -u origin main
```

## 3. Connect to Vercel

1.  Log in to [Vercel](https://vercel.com).
2.  Click **"Add New..."** and then **"Project"**.
3.  Import your GitHub repository.

## 3. Configure Environment Variables

During the setup on Vercel, go to the **Environment Variables** section and add the following keys from your `.env.local`:

| Key | Value |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://mapqjmscmzrbrhpqzikr.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_NUtHAnm5tYzhYKhpqxj8zA_UlmrKcqr` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` (Copy full key) |

## 4. Deploy

Click **"Deploy"**. Vercel will build your Next.js app and provide you with a production URL!

## 5. (Optional) Custom Domain

If you have a domain (e.g., `bidautodirect.com`), you can add it in the **Settings > Domains** section of your Vercel project.

## 6. Update Supabase Auth Redirects (Important)

In your [Supabase Dashboard](https://supabase.com/dashboard/project/mapqjmscmzrbrhpqzikr/auth/url-configuration):
1.  Add your new Vercel URL (e.g., `https://bidauto-ten.vercel.app`) to the **Additional Redirect URLs**.
2.  Update the **Site URL** if you want this to be your primary production URL.
