import { describe, expect, test } from 'bun:test';
import { listPublishedProjects, projectItems } from '@/data/projects';
import {
  getProfile,
  getProject,
  getSkills,
  listExperience,
  listProjects,
  requestResumeInfo,
} from './tools';

const text = (result: { content: { text: string }[] }) => result.content[0].text;

describe('mcp tools', () => {
  test('list_projects returns only published projects', () => {
    const ids = (JSON.parse(text(listProjects())) as { id: string }[]).map((p) => p.id);
    expect(ids).toEqual(listPublishedProjects().map((p) => p.id));
    for (const p of projectItems.filter((item) => item.published === false)) {
      expect(ids).not.toContain(p.id);
    }
  });

  test('get_project never returns an unpublished project', () => {
    for (const p of projectItems.filter((item) => item.published === false)) {
      expect(getProject(p.id).isError).toBe(true);
    }
  });

  test('get_project returns details for a published id', () => {
    const [first] = listPublishedProjects();
    const result = getProject(first.id);
    expect(result.isError).toBeUndefined();
    expect(JSON.parse(text(result)).title).toBe(first.title);
  });

  test('get_project with an unknown id returns an MCP error', () => {
    const result = getProject('does-not-exist');
    expect(result.isError).toBe(true);
    expect(text(result)).toContain('Unknown project');
  });

  test('profile, experience, and skills return JSON data', () => {
    expect(JSON.parse(text(getProfile())).name).toBe('Steven Nguyen');
    expect(JSON.parse(text(listExperience())).length).toBeGreaterThan(0);
    expect(JSON.parse(text(getSkills())).categories.length).toBeGreaterThan(0);
  });

  test('request_resume_info explains the gate without a PDF link', () => {
    const body = text(requestResumeInfo());
    expect(body).toContain('https://www.xosnos.com');
    expect(body).not.toMatch(/\.pdf|resume\/download/i);
  });
});
