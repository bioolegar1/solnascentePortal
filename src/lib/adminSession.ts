import crypto from 'crypto';

const SESSION_COOKIE = 'sn_admin_token';

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || 'local-dev-session-secret';
}

export function signSession(payload: { role: string; username?: string; timestamp?: number }) {
  const secret = getSecret();
  const json = JSON.stringify(payload);
  const sig = crypto.createHmac('sha256', secret).update(json).digest('hex');
  return Buffer.from(JSON.stringify({ p: payload, s: sig })).toString('base64');
}

export function verifySession(token: string | undefined): { role: string; username?: string; timestamp?: number } | null {
  if (!token) return null;
  try {
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString());
    const { p, s } = decoded || {};
    const secret = getSecret();
    const expected = crypto.createHmac('sha256', secret).update(JSON.stringify(p)).digest('hex');
    if (expected !== s) return null;
    return p;
  } catch {
    return null;
  }
}

export { SESSION_COOKIE };