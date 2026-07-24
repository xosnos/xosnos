import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { domainKnowledge, skillCategories } from '../src/data/skills';

const README_PATH = join(process.cwd(), 'README.md');

const MARKERS = {
  domainKnowledge: 'domain-knowledge',
  badges: 'badges',
} as const;

function renderDomainKnowledge(): string {
  return domainKnowledge.map((item) => `- ${item}`).join('\n');
}

function renderBadges(): string {
  return skillCategories
    .map((category) => {
      const badgeLines = category.badges
        .map((item) => `![${item.alt}](${item.src})`)
        .join('\n');
      return `### ${category.title}\n\n${badgeLines}`;
    })
    .join('\n\n');
}

function replaceBlock(content: string, marker: string, block: string): string {
  const begin = `<!-- skills:${marker}:begin -->`;
  const end = `<!-- skills:${marker}:end -->`;
  const pattern = new RegExp(`${begin}[\\s\\S]*?${end}`, 'm');

  if (!pattern.test(content)) {
    throw new Error(`Missing README markers: ${begin} ... ${end}`);
  }

  return content.replace(pattern, `${begin}\n${block}\n${end}`);
}

function syncReadmeSkills(): { changed: boolean; content: string } {
  const current = readFileSync(README_PATH, 'utf8');
  let next = replaceBlock(current, MARKERS.domainKnowledge, renderDomainKnowledge());
  next = replaceBlock(next, MARKERS.badges, renderBadges());

  return { changed: next !== current, content: next };
}

const checkOnly = process.argv.includes('--check');
const { changed, content } = syncReadmeSkills();

if (checkOnly) {
  if (changed) {
    console.error(
      'README.md skills section is out of sync with src/data/skills.ts. Run: bun run sync:readme-skills',
    );
    process.exit(1);
  }
  console.log('README.md skills section is in sync.');
  process.exit(0);
}

if (changed) {
  writeFileSync(README_PATH, content, 'utf8');
  console.log('Updated README.md skills section from src/data/skills.ts.');
} else {
  console.log('README.md skills section is already in sync.');
}
