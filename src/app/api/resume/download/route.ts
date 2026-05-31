import { NextResponse, NextRequest } from 'next/server';
import { google } from 'googleapis';
import { verifyToken } from '@/lib/resume-token';

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive.readonly',
    ],
  });
}

async function logToSheet(email: string, name: string | undefined, ip: string) {
  const auth = getAuth();
  const sheets = google.sheets({ version: 'v4', auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID!,
    range: 'Downloads!A:D',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[email, name || '', new Date().toISOString(), ip]],
    },
  });
}

async function getResumeFromDrive(): Promise<ArrayBuffer> {
  const auth = getAuth();
  const drive = google.drive({ version: 'v3', auth });

  const res = await drive.files.get(
    { fileId: process.env.GOOGLE_RESUME_FILE_ID!, alt: 'media' },
    { responseType: 'arraybuffer' },
  );

  const buf = Buffer.from(res.data as ArrayBuffer);
  return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: 'Invalid or expired link' }, { status: 403 });
  }

  try {
    const [, pdfBody] = await Promise.all([
      logToSheet(payload.email, payload.name, payload.ip),
      getResumeFromDrive(),
    ]);

    return new NextResponse(pdfBody, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Steven_Nguyen_Resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Error serving resume:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}
