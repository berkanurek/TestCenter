import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
}
if (!supabaseKey) {
  throw new Error(
    "Missing environment variable: NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
  );
}

// createBrowserClient stores the session in cookies (instead of localStorage)
// so that Next.js middleware can read the session from the request headers and
// enforce auth-protected routes server-side.
export const supabaseBrowser = createBrowserClient(supabaseUrl, supabaseKey);
