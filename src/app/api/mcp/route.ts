import { createMcpHandler } from 'mcp-handler';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { buildProfileMarkdown } from '@/lib/ai-context';
import { logger } from '@/lib/logger';
import {
  getProfile,
  getProject,
  getSkills,
  listExperience,
  listProjects,
  requestResumeInfo,
} from '@/lib/mcp/tools';
import rateLimit from '@/lib/rate-limit';
import { getClientIp } from '@/lib/request-guard';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// request-guard's origin allowlist is intentionally not applied: MCP clients
// send no Origin header. The endpoint is read-only public data, so the
// per-IP limiter is the only gate.
const limiter = rateLimit({ interval: 60 * 1000, uniqueTokenPerInterval: 500 });

const readOnly = { readOnlyHint: true, openWorldHint: false } as const;

const mcpHandler = createMcpHandler(
  (server) => {
    server.registerTool(
      'get_profile',
      {
        title: 'Get profile',
        description: "Steven Nguyen's summary, location, roles, bio, and contact links.",
        inputSchema: z.object({}),
        annotations: readOnly,
      },
      async () => getProfile(),
    );
    server.registerTool(
      'list_projects',
      {
        title: 'List projects',
        description: 'Published portfolio projects with ids, summaries, and links.',
        inputSchema: z.object({}),
        annotations: readOnly,
      },
      async () => listProjects(),
    );
    server.registerTool(
      'get_project',
      {
        title: 'Get project',
        description: 'Full details for one published project, by id from list_projects.',
        inputSchema: z.object({ id: z.string().min(1).max(100) }),
        annotations: readOnly,
      },
      async ({ id }) => getProject(id),
    );
    server.registerTool(
      'list_experience',
      {
        title: 'List experience',
        description: 'Work, volunteer, and project experience, newest first.',
        inputSchema: z.object({}),
        annotations: readOnly,
      },
      async () => listExperience(),
    );
    server.registerTool(
      'get_skills',
      {
        title: 'Get skills',
        description: 'Featured skills, domain knowledge, and skills grouped by category.',
        inputSchema: z.object({}),
        annotations: readOnly,
      },
      async () => getSkills(),
    );
    server.registerTool(
      'request_resume_info',
      {
        title: 'Request resume info',
        description:
          'Explains how to get the resume. It never sends email or returns the PDF.',
        inputSchema: z.object({}),
        annotations: readOnly,
      },
      async () => requestResumeInfo(),
    );

    server.registerResource(
      'profile',
      'profile://full',
      {
        title: 'Full profile',
        description:
          'The complete portfolio profile as Markdown, same as /llms-full.txt.',
        mimeType: 'text/markdown',
      },
      async (uri) => ({
        contents: [
          { uri: uri.href, mimeType: 'text/markdown', text: buildProfileMarkdown() },
        ],
      }),
    );
  },
  { serverInfo: { name: 'xosnos-portfolio', version: '1.0.0' } },
);

async function handle(request: NextRequest) {
  const ip = getClientIp(request);
  try {
    await limiter.check(30, ip);
  } catch {
    logger.info('mcp.rate_limited', { route: '/api/mcp', status: 429 });
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }

  try {
    return await mcpHandler(request);
  } catch (err) {
    logger.error('mcp.request_failed', { route: '/api/mcp', error: err });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export { handle as GET, handle as POST, handle as DELETE };
