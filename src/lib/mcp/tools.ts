import { aboutContent } from '@/data/about';
import { contactContent } from '@/data/contact';
import { listPublishedExperiences } from '@/data/experience';
import { footerContent } from '@/data/footer';
import { heroContent } from '@/data/hero';
import { listPublishedProjects } from '@/data/projects';
import { domainKnowledge, featuredSkills, listSkillCategories } from '@/data/skills';
import { SITE_URL } from '@/lib/metadata';

export interface ToolResult {
  [key: string]: unknown;
  content: { type: 'text'; text: string }[];
  isError?: boolean;
}

const json = (value: unknown): ToolResult => ({
  content: [{ type: 'text', text: JSON.stringify(value, null, 2) }],
});

const toolError = (message: string): ToolResult => ({
  content: [{ type: 'text', text: message }],
  isError: true,
});

export const getProfile = (): ToolResult =>
  json({
    name: heroContent.name,
    roles: heroContent.roles,
    tagline: heroContent.tagline.replace(/\*\*/g, ''),
    location: aboutContent.location,
    bio: aboutContent.bio.map((paragraph) => paragraph.text),
    contact: {
      email: contactContent.email,
      responseTime: contactContent.responseTime,
    },
    links: {
      website: SITE_URL,
      ...Object.fromEntries(
        footerContent.socialLinks.map((link) => [link.label, link.href]),
      ),
    },
  });

export const listProjects = (): ToolResult =>
  json(
    listPublishedProjects().map(({ id, title, subtitle, demoUrl, repoUrl, tags }) => ({
      id,
      title,
      subtitle,
      demoUrl,
      repoUrl,
      tags,
    })),
  );

export const getProject = (id: string): ToolResult => {
  const project = listPublishedProjects().find((p) => p.id === id);
  if (!project) {
    const ids = listPublishedProjects().map((p) => p.id);
    return toolError(`Unknown project "${id}". Available ids: ${ids.join(', ')}`);
  }
  const { image: _image, published: _published, ...rest } = project;
  return json(rest);
};

export const listExperience = (): ToolResult =>
  json(
    listPublishedExperiences().map(
      ({ logo: _logo, published: _published, ...rest }) => rest,
    ),
  );

export const getSkills = (): ToolResult =>
  json({
    featured: featuredSkills,
    domainKnowledge,
    categories: listSkillCategories().map((category) => ({
      title: category.title,
      skills: category.badges.map((badge) => badge.alt),
    })),
  });

export const requestResumeInfo = (): ToolResult => ({
  content: [
    {
      type: 'text',
      text: `Steven's resume is not available through this server. It is shared through a gated flow on the site: open ${SITE_URL}, choose "${heroContent.secondaryCtaLabel}", and enter an email address to receive a signed download link. You can also email ${contactContent.email} (typical response time: ${contactContent.responseTime}).`,
    },
  ],
});
