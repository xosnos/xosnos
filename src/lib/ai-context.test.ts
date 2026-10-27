import { describe, expect, test } from 'bun:test';
import { listPublishedExperiences } from '@/data/experience';
import { listPublishedProjects, projectItems } from '@/data/projects';
import { buildProfileMarkdown, buildSystemInstruction } from './ai-context';

describe('buildProfileMarkdown', () => {
  const profile = buildProfileMarkdown();

  test('includes every published project title and experience role', () => {
    for (const project of listPublishedProjects()) {
      expect(profile).toContain(project.title);
    }
    for (const exp of listPublishedExperiences()) {
      expect(profile).toContain(exp.role);
    }
  });

  test('excludes unpublished projects', () => {
    const unpublishedTitles = projectItems
      .filter((item) => !item.published)
      .map((item) => item.title);
    for (const title of unpublishedTitles) {
      expect(profile).not.toContain(title);
    }
  });

  test('uses Markdown headings for each section', () => {
    for (const heading of [
      '## About',
      '## Skills',
      '## Projects',
      '## Experience',
      '## Education',
      '## Contact',
    ]) {
      expect(profile).toContain(heading);
    }
  });
});

describe('buildSystemInstruction', () => {
  test('wraps the shared profile body with persona and scope rules', () => {
    const instruction = buildSystemInstruction();
    expect(instruction).toContain(buildProfileMarkdown());
    expect(instruction.indexOf('PERSONA:')).toBeLessThan(instruction.indexOf('## About'));
    expect(instruction).toContain('You are the AI assistant');
  });
});
