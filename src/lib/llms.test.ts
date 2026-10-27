import { describe, expect, test } from 'bun:test';
import { listPublishedProjects } from '@/data/projects';
import { buildLlmsFullTxt, buildLlmsTxt } from './llms';

describe('buildLlmsTxt', () => {
  const llmsTxt = buildLlmsTxt();

  test('follows the llmstxt.org format', () => {
    expect(llmsTxt.startsWith('# Steven Nguyen\n\n> ')).toBe(true);
  });

  test('links every published project to its demo or repo', () => {
    for (const project of listPublishedProjects()) {
      expect(llmsTxt).toContain(
        `[${project.title}](${project.demoUrl ?? project.repoUrl})`,
      );
    }
  });

  test('advertises the full profile and contact channels without exposing the resume PDF', () => {
    expect(llmsTxt).toContain('https://www.xosnos.com/llms-full.txt');
    expect(llmsTxt).toContain('mailto:steven@xosnos.com');
    expect(llmsTxt).toContain('https://github.com/xosnos/');
    expect(llmsTxt).toContain('https://www.linkedin.com/in/xosnos/');
    expect(llmsTxt).not.toMatch(/\.pdf/i);
  });
});

describe('buildLlmsFullTxt', () => {
  test('inlines the full profile under the same H1', () => {
    const full = buildLlmsFullTxt();
    expect(full.startsWith('# Steven Nguyen\n\n> ')).toBe(true);
    expect(full).toContain('## Experience');
    expect(full).toContain('## Education');
  });
});
