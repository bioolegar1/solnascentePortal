import { NextResponse } from 'next/server';
// import { cookies } from 'next/headers'; // Unused import
import crypto from 'crypto';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';
import { signSession, SESSION_COOKIE } from '@/lib/adminSession';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    if (!username || !password) return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 400 });
    const inputUsername = String(username).trim();
    const inputPassword = String(password).trim();
    const admin = getSupabaseAdmin();

    const salt = process.env.ADMIN_PASSWORD_SALT || 'local-dev-salt';
    const hash = crypto.createHash('sha256').update(`${String(salt).trim()}:${inputPassword}`).digest('hex');

    let account: { id: string; username: string; password_hash: string; active: boolean } | null = null;
    if (admin) {
      const { data, error } = await admin
        .from('admin_accounts')
        .select('id,username,password_hash,active')
        .eq('username', inputUsername)
        .single();
      if (!error && data) {
        account = data as { id: string; username: string; password_hash: string; active: boolean };
      }
    }
    if (!account) {
      const envUser = (process.env.ADMIN_DEFAULT_USERNAME || '').trim();
      const envPass = (process.env.ADMIN_DEFAULT_PASSWORD || '').trim();
      const envSalt = (process.env.ADMIN_PASSWORD_SALT || 'local-dev-salt').trim();
      const envHash = envPass ? crypto.createHash('sha256').update(`${envSalt}:${envPass}`).digest('hex') : '';
      if (inputUsername !== envUser || hash !== envHash) {
        return NextResponse.json({ error: 'Credenciais inválidas' }, { status: 401 });
      }
    } else {
      if (!account.active) return NextResponse.json({ error: 'Conta inválida' }, { status: 401 });
      if (account.password_hash !== hash) return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 });
    }

    const token = signSession({ username: account?.username || inputUsername, role: 'admin', timestamp: Date.now() });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, { httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8 });
    return res;
  } catch {
    return NextResponse.json({ error: 'Erro no login' }, { status: 500 });
  }
}