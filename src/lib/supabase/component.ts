import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
export function getSupabaseComponentClient(): ReturnType<typeof createClientComponentClient> | null {
  try {
    return createClientComponentClient();
  } catch {
    return null;
  }
}