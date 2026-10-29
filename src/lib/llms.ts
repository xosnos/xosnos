import { aboutContent } from '@/data/about';
import { contactContent } from '@/data/contact';
import { footerContent } from '@/data/footer';
import { heroContent } from '@/data/hero';
import { listPublishedProjects } from '@/data/projects';
import { buildProfileMarkdown } from '@/lib/ai-context';

import { SITE_URL } from '@/lib/metadata';

const summary = () => {
  const tagline = heroContent.tagline.replace(/\*\*/g, '');
  return `${heroContent.roles.join(', ')} based in ${aboutContent.location}. ${tagline} Currently building Terraces, an AI-native career progression platform.`;
};

/**
 * /llms.txt — a curated Markdown index following https://llmstxt.org:
 * an H1, a blockquote summary, then sections of links.
 * Only includes data already public on the site.
 */
export const buildLlmsTxt = (): string => {
  const social = (label: string) =>
    footerContent.socialLinks.find((link) => link.label === label)?.href;

  const github = social('GitHub');
  const linkedin = social('LinkedIn');

  const projects = listPublishedProjects()
    .map((p) => {
      const href = p.demoUrl ?? p.repoUrl ?? `${SITE_URL}/#projects`;
      return `- [${p.title}](${href}): ${p.subtitle}`;
    })
    .join('\n');

  return `# Steven Nguyen

> ${summary()}

## Profile

- [Full profile (Markdown)](${SITE_URL}/llms-full.txt): Complete background — about, skills, projects, experience, education, and contact — as one Markdown document.
- [MCP server](${SITE_URL}/api/mcp): Public read-only Model Context Protocol endpoint (Streamable HTTP) for profile, projects, experience, and skills.
- [About](${SITE_URL}/#about): The story behind the work.
- [Experience](${SITE_URL}/#experience): Roles across startups, enterprise, and non-profits.

## Projects

${projects}

## Contact

- [Email](mailto:${contactContent.email}): ${contactContent.invitation} Typical response time: ${contactContent.responseTime}.
${github ? `- [GitHub](${github}): Code and open-source work.\n` : ''}${linkedin ? `- [LinkedIn](${linkedin}): Professional profile.\n` : ''}
Resume: served through the gated flow on the site (the "View resume" action) or by email request — there is no direct PDF link.
`;
};

/**
 * /llms-full.txt — the llms.txt index with the full profile content inlined.
 */
export const buildLlmsFullTxt = (): string => `# Steven Nguyen

> ${summary()}

${buildProfileMarkdown()}
`;
