import { heroContent } from '@/data/hero';
import { aboutContent } from '@/data/about';
import { contactContent } from '@/data/contact';
import { listPublishedExperiences } from '@/data/experience';
import { listPublishedProjects } from '@/data/projects';
import { educationItems } from '@/data/education';

const formatBio = () =>
  aboutContent.bio
    .map((p) => p.text.replace(/\*\*/g, ''))
    .join(' ');

const formatExperiences = () =>
  listPublishedExperiences()
    .map((exp) => {
      const range = `${exp.startDate} – ${exp.endDate ?? 'Present'}`;
      const highlights = (exp.highlights ?? []).map((h) => `  • ${h}`).join('\n');
      return [
        `- ${exp.role} at ${exp.organization} (${range})`,
        exp.location ? `  Location: ${exp.location}` : null,
        exp.description ? `  ${exp.description}` : null,
        highlights || null,
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

const formatProjects = () =>
  listPublishedProjects()
    .map((p) => {
      const tags = p.tags?.length ? ` [${p.tags.join(', ')}]` : '';
      const links = [p.demoUrl ? `demo: ${p.demoUrl}` : null, p.repoUrl ? `repo: ${p.repoUrl}` : null]
        .filter(Boolean)
        .join(' | ');
      return `- ${p.title}${tags}: ${p.description}${links ? `\n  ${links}` : ''}`;
    })
    .join('\n');

const formatEducation = () =>
  educationItems
    .map((edu) => {
      const courses = edu.courses?.length ? `\n  Courses: ${edu.courses.join('; ')}` : '';
      const activities = edu.activities?.length ? `\n  Activities: ${edu.activities.join('; ')}` : '';
      const awards = edu.awards?.length ? `\n  Awards: ${edu.awards.join('; ')}` : '';
      return `- ${edu.name}${courses}${activities}${awards}`;
    })
    .join('\n');

export const buildSystemInstruction = (): string => {
  return `You are the AI assistant for Steven Nguyen's portfolio website (xosnos.com). Your role is to help visitors learn about Steven's professional background, projects, skills, and experiences.

PERSONA:
- Warm, professional, and conversational. Speak about Steven in the third person.
- Be concise: aim for 2–4 sentences per reply unless the user asks for depth.
- Use plain text. Avoid markdown headings or long bulleted lists; prefer flowing prose.
- If you don't know something, say so honestly and suggest the visitor reach out at ${contactContent.email}.

SCOPE:
- Only answer questions related to Steven: his work, projects, skills, education, interests, and how to get in touch.
- For unrelated topics (general coding help, news, opinions, etc.), politely steer the conversation back: "I'm here to help you learn about Steven — happy to share more about his work or projects!"
- Never invent jobs, dates, employers, awards, or technologies that aren't listed below.

ABOUT STEVEN:
${heroContent.name} — ${heroContent.role}. Based in ${aboutContent.location}.
${formatBio()}
Top languages: ${aboutContent.topLanguages}.
Fun fact: ${aboutContent.funFact}.

EXPERIENCE:
${formatExperiences()}

PROJECTS:
${formatProjects()}

EDUCATION:
${formatEducation()}

CONTACT:
- Email: ${contactContent.email}
- Typical response time: ${contactContent.responseTime}

Remember: be helpful, accurate, and brief. When in doubt, point visitors to the relevant section of the site or to Steven's email.`;
};
