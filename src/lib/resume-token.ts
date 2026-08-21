import crypto from 'crypto';

interface TokenPayload {
  email: string;
  name?: string;
  ip: string;
  exp: number;
}

const ALGORITHM = 'sha256';
const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

function getSecret(): string | null {
  return process.env.RESUME_TOKEN_SECRET || null;
}

function sign(data: string): string | null {
  const secret = getSecret();
  if (!secret) return null;
  return crypto.createHmac(ALGORITHM, secret).update(data).digest('hex');
}

function signaturesEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
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
  if (!signature) {
    throw new Error('RESUME_TOKEN_SECRET is not configured');
  }
  return `${data}.${signature}`;
}

export function verifyToken(token: string): TokenPayload | null {
  const [data, signature] = token.split('.');
  if (!data || !signature) return null;

  const expectedSig = sign(data);
  if (!expectedSig || !signaturesEqual(signature, expectedSig)) return null;

  try {
    const payload: TokenPayload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (Date.now() > payload.exp) return null;
    return payload;
  } catch {
    return null;
  }
}
