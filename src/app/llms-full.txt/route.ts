import { buildLlmsFullTxt } from '@/lib/llms';

// Static text generated from src/data — regenerate only when the data changes.
export const dynamic = 'force-static';

export async function GET() {
  return new Response(buildLlmsFullTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
