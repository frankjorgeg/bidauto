import { createClient as createSupabaseClient } from "@supabase/supabase-js"

/**
 * Admin Supabase client that bypasses Row Level Security (RLS).
 * Use this ONLY in server-side code (server actions, API routes)
 * when the operation needs to bypass RLS policies.
 * 
 * Requires SUPABASE_SERVICE_ROLE_KEY in .env.local
 */
export function createAdminClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    if (!serviceRoleKey) {
        throw new Error(
            "SUPABASE_SERVICE_ROLE_KEY is not set. Add it to .env.local"
        )
    }

    return createSupabaseClient(supabaseUrl, serviceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    })
}
