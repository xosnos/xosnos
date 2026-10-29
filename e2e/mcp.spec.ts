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

test('MCP initialize, list tools, call a tool, and read a resource over HTTP', async ({
  request,
}) => {
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

  const protocolHeaders = { ...headers, 'mcp-protocol-version': '2025-06-18' };
  const list = await request.post('/api/mcp', {
    headers: protocolHeaders,
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

  const call = await request.post('/api/mcp', {
    headers: protocolHeaders,
    data: {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: { name: 'get_profile', arguments: {} },
    },
  });
  expect(call.status()).toBe(200);
  const profile = parse(await call.text()).result;
  expect(profile.isError).not.toBe(true);
  expect(profile.content[0].type).toBe('text');
  expect(JSON.parse(profile.content[0].text)).toMatchObject({
    name: 'Steven Nguyen',
    contact: { email: 'steven@xosnos.com' },
  });

  const read = await request.post('/api/mcp', {
    headers: protocolHeaders,
    data: {
      jsonrpc: '2.0',
      id: 4,
      method: 'resources/read',
      params: { uri: 'profile://full' },
    },
  });
  expect(read.status()).toBe(200);
  const resource = parse(await read.text()).result;
  expect(resource.contents).toEqual([
    {
      uri: 'profile://full',
      mimeType: 'text/markdown',
      text: expect.stringContaining('Steven Nguyen'),
    },
  ]);
  expect(resource.contents[0].text).toContain('## Experience');
});
