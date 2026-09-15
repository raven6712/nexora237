import { createBrowserClient } from "@supabase/ssr";

// Used only inside Client Components (auth forms, registration modal, etc.).
// Never import this into a Server Component or Route Handler.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
