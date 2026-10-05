import { describe, expect, test } from 'bun:test';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { parseYearMonth, yearMonthSortValue } from '@/lib/dates';
import { educationItems, listEducationItems } from './education';
import { listPublishedExperiences } from './experience';
import { listOverviewTags, listPublishedProjects, projectItems } from './projects';
import { featuredSkills, listSkillCategories } from './skills';

const publicFileExists = (path: string) =>
  existsSync(join(process.cwd(), 'public', path.replace(/^\//, '')));

function duplicates(values: string[]): string[] {
  return values.filter((value, index) => values.indexOf(value) !== index);
}

describe('projects', () => {
  test('have unique ids', () => {
    expect(duplicates(projectItems.map((item) => item.id))).toEqual([]);
  });

  test('listPublishedProjects excludes unpublished items', () => {
    const published = listPublishedProjects();
    expect(published.length).toBeGreaterThan(0);
    expect(published.every((item) => item.published === true)).toBe(true);
    expect(published).toEqual(projectItems.filter((item) => item.published));
  });

  test('listOverviewTags puts cover tags before the remaining tags', () => {
    const item = {
      ...projectItems[0],
      coverTags: ['Next.js', 'PostgreSQL'],
      tags: ['TypeScript'],
    };
    expect(listOverviewTags(item)).toEqual(['Next.js', 'PostgreSQL', 'TypeScript']);
  });

  test('published projects link to images in public/ and use https URLs', () => {
    for (const item of listPublishedProjects()) {
      expect(publicFileExists(item.image), `${item.id} image ${item.image}`).toBe(true);
      for (const url of [item.demoUrl, item.repoUrl].filter(Boolean)) {
        expect(url, `${item.id} link`).toStartWith('https://');
      }
    }
  });
});

describe('experience', () => {
  const experiences = listPublishedExperiences();

  test('have unique ids', () => {
    expect(duplicates(experiences.map((exp) => exp.id))).toEqual([]);
  });

  test('use valid YYYY-MM dates that end after they start', () => {
    for (const exp of experiences) {
      expect(parseYearMonth(exp.startDate), `${exp.id} startDate`).not.toBeNull();
      if (exp.endDate === undefined) continue;
      expect(parseYearMonth(exp.endDate), `${exp.id} endDate`).not.toBeNull();
      expect(yearMonthSortValue(exp.endDate)).toBeGreaterThanOrEqual(
        yearMonthSortValue(exp.startDate),
      );
    }
  });

  test('are sorted newest first', () => {
    const starts = experiences.map((exp) => yearMonthSortValue(exp.startDate));
    expect(starts).toEqual([...starts].sort((a, b) => b - a));
  });

  test('logos exist in public/', () => {
    for (const exp of experiences) {
      if (exp.logo) expect(publicFileExists(exp.logo), `${exp.id} logo`).toBe(true);
    }
  });
});

describe('education', () => {
  test('listEducationItems hides the stay-tuned placeholder', () => {
    const items = listEducationItems();
    expect(items.some((item) => item.id === 'stay-tuned')).toBe(false);
    expect(items).toEqual(educationItems.filter((item) => item.id !== 'stay-tuned'));
  });

  test('images exist in public/', () => {
    for (const item of listEducationItems()) {
      expect(publicFileExists(item.image), `${item.id} image`).toBe(true);
    }
  });
});

describe('skills', () => {
  const badges = listSkillCategories().flatMap((category) => category.badges);

  test('every category has badges with shields.io images', () => {
    for (const category of listSkillCategories()) {
      expect(category.badges.length, category.title).toBeGreaterThan(0);
    }
    for (const badge of badges) {
      expect(badge.src, badge.alt).toStartWith('https://img.shields.io/');
    }
  });

  test('badge names are unique', () => {
    expect(duplicates(badges.map((badge) => badge.alt))).toEqual([]);
  });

  test('featured skills are unique', () => {
    expect(duplicates([...featuredSkills])).toEqual([]);
  });
});
