import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

/**
 * Supabase client for server components and route handlers.
 *
 * Identity belongs to TAKATAK Auth (Google sign-in + Twilio OTP) in takatak-v1.
 * CUBARESORT reads that session; it does not implement its own login, does not
 * store passwords and does not issue OTPs.
 *
 * Next.js 16: cookies() is async-only, so this function is async too.
 */
export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null; // foundation mode: no auth configured yet

  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          for (const { name, value, options } of list) cookieStore.set(name, value, options);
        } catch {
          // Called from a Server Component, where cookies are read-only.
          // Session refresh happens in middleware or a route handler instead.
        }
      },
    },
  });
}

/** The signed-in TAKATAK user, or null when not signed in or not configured. */
export async function getTakatakUser() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  const { data, error } = await supabase.auth.getUser();
  return error ? null : data.user;
}
