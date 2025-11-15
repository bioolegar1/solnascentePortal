import { createClient } from '@supabase/supabase-js';
import { SupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { verifySession, SESSION_COOKIE } from '@/lib/adminSession';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

export function getSupabaseServerClient(): SupabaseClient | null {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey);
}

export async function requireAdmin(_client: SupabaseClient): Promise<{ ok: boolean; status: number; message: string }> {
  try {
    // Custom admin session via cookie
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    const payload = verifySession(token);
    if (payload?.role === 'admin') return { ok: true, status: 200, message: 'Autorizado' };
    return { ok: false, status: 401, message: 'Não autorizado' };
  } catch {
    return { ok: false, status: 500, message: 'Erro ao verificar permissões' };
  }
}