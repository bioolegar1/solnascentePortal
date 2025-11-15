import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { SupabaseClient } from '@supabase/supabase-js';

export function getSupabaseComponentClient(): SupabaseClient | null {
  try {
    return createClientComponentClient();
  } catch {
    return null;
  }
}