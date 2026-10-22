import { mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { badgeSlug, skillCategories } from '../src/data/skills';

const BADGES_DIR = join(process.cwd(), 'public/assets/img/badges');

async function fetchBadge(alt: string, src: string): Promise<string> {
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`${alt}: ${src} returned ${response.status}`);
  }
  const svg = await response.text();
  if (!svg.trimStart().startsWith('<svg') || /<script|\son[a-z]+\s*=/i.test(svg)) {
    throw new Error(`${alt}: ${src} did not return a plain SVG`);
  }
  return svg;
}

async function syncSkillBadges(): Promise<void> {
  mkdirSync(BADGES_DIR, { recursive: true });
  const badges = skillCategories.flatMap((category) => category.badges);
  const svgs = await Promise.all(badges.map((badge) => fetchBadge(badge.alt, badge.src)));

  const expected = new Set<string>();
  badges.forEach((badge, index) => {
    const file = `${badgeSlug(badge.alt)}.svg`;
    expected.add(file);
    writeFileSync(join(BADGES_DIR, file), svgs[index], 'utf8');
  });

  for (const file of readdirSync(BADGES_DIR)) {
    if (!expected.has(file)) rmSync(join(BADGES_DIR, file));
  }

  console.log(`Wrote ${badges.length} badges to public/assets/img/badges.`);
}

await syncSkillBadges();
