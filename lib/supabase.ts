import { createBrowserClient, createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// For client components (browser)
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

// For server components / route handlers
export const createServer = () => {
  const cookieStore = cookies();

  // Note: Next.js server cookies are read-only in Server Components.
  // Passing only "get" is fine for most use-cases during build; we cast to any to satisfy types.
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name: string) => cookieStore.get(name)?.value,
      },
    } as any
  );
};
