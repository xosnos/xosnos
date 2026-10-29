import { expect, test } from '@playwright/test';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json, text/event-stream',
};

// Streamable HTTP replies are JSON or a single SSE event; normalize both.
const parse = (body: string) => {
  const data = body
    .split('\n')
    .find((line) => line.startsWith('data:'))
    ?.slice(5);
  return JSON.parse(data ?? body);
};

test('MCP initialize then tools/list over HTTP', async ({ request }) => {
  const init = await request.post('/api/mcp', {
    headers,
    data: {
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-06-18',
        capabilities: {},
        clientInfo: { name: 'e2e', version: '0.0.0' },
      },
    },
  });
  expect(init.status()).toBe(200);
  expect(parse(await init.text()).result.serverInfo.name).toBe('xosnos-portfolio');

  const list = await request.post('/api/mcp', {
    headers: { ...headers, 'mcp-protocol-version': '2025-06-18' },
    data: { jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} },
  });
  expect(list.status()).toBe(200);
  const names = (parse(await list.text()).result.tools as { name: string }[]).map(
    (t) => t.name,
  );
  expect(names).toEqual(
    expect.arrayContaining([
      'get_profile',
      'list_projects',
      'get_project',
      'request_resume_info',
    ]),
  );
});
