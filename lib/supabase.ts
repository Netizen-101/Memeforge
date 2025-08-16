import { createClientComponentClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// For Client Components (browser)
export const createClient = () => createClientComponentClient();

// For Server Components / Route Handlers
export const createServer = () => createServerComponentClient({ cookies });

