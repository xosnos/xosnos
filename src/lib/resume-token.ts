import crypto from 'crypto';

interface TokenPayload {
  email: string;
  name?: string;
  ip: string;
  exp: number;
}

const ALGORITHM = 'sha256';
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret() {
  return process.env.RESUME_TOKEN_SECRET!;
}

function sign(data: string): string {
  return crypto.createHmac(ALGORITHM, getSecret()).update(data).digest('hex');
}

export function createToken(email: string, name: string | undefined, ip: string): string {
  const payload: TokenPayload = {
    email,
    name,
    ip,
    exp: Date.now() + TOKEN_EXPIRY_MS,
  };

  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(data);
  return `${data}.${signature}`;
}

export function verifyToken(token: string): TokenPayload | null {
  const [data, signature] = token.split('.');
  if (!data || !signature) return null;

  const expectedSig = sign(data);
  if (signature !== expectedSig) return null;

  try {
    const payload: TokenPayload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
