export interface ProjectItem {
  id: string;
  title: string;
  image: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
  published?: boolean;
  tags?: string[];
}

const projectItems: ProjectItem[] = [
  {
    id: 'terraces',
    title: 'Terraces',
    image: '/assets/img/projects/terraces.png',
    description:
      'An AI-native career progression platform that scans resumes, suggests role-specific edits, aligns portfolio projects, and generates interview-prep plans.',
    tags: ['TypeScript', 'TanStack Start', 'Python', 'FastAPI', 'PostgreSQL', 'AI'],
    demoUrl: 'https://www.terraces.ai/',
    published: true,
  },
  {
    id: 'architype',
    title: 'Architype',
    image: '/assets/img/projects/architype.svg',
    description:
      'A collaborative system design workspace for building architecture diagrams, using AI agents to create or revise designs, and generating downloadable technical specs.',
    tags: ['TypeScript', 'Next.js', 'React Flow', 'Supabase', 'OpenRouter'],
    demoUrl: 'https://architype.xosnos.com',
    repoUrl: 'https://github.com/xosnos/architype',
    published: true,
  },
  {
    id: 'unavsa-mail-merge',
    title: 'UNAVSA Mail Merge',
    image: '/assets/img/projects/unavsa-mail-merge.svg',
    description:
      'A Google Workspace add-on for personalized email campaigns and engagement analytics, built with CardService, Google Apps Script, Gmail, and Google Sheets.',
    tags: ['JavaScript', 'Google Apps Script', 'Gmail API', 'Google Sheets'],
    repoUrl: 'https://github.com/xosnos/mail-merge',
    published: true,
  },
  {
    id: 'uvsa-midwest',
    title: 'UVSA-Midwest App',
    image: '/assets/img/projects/uvsamidwest.png',
    description:
      "UVSA-Midwest's official app helps to coordinate flagship events and keeps constituents up-to-date with personalized information during the year and conference-specific information for flagship events.",
    tags: ['React Native', 'Expo', 'Firebase'],
    demoUrl: 'https://app.uvsamidwest.org',
    published: true,
  },
  {
    id: 'almond-travel',
    title: 'Almond Travel',
    image: '/assets/img/projects/almond-travel.png',
    description:
      'Almond Travel is a website that makes traveling to America easier for tourists and immigrants. Bundles flights, hotels, and attractions into a seamless experience.',
    tags: ['React', 'API Integration', 'UX Design'],
    demoUrl: 'https://almond-travel.xosnos.com/',
    repoUrl: 'https://github.com/xosnos/almond-travel',
    published: true,
  },
  {
    id: 'jammming',
    title: 'jammming',
    image: '/assets/img/projects/jammming.png',
    description:
      'jammming is a front-end application to create super duper fast playlists and send them directly to your Spotify account.',
    tags: ['React', 'Spotify API'],
    demoUrl: 'https://jammming.xosnos.com/',
    repoUrl: 'https://github.com/xosnos/jammming',
    published: true,
  },
];

export function listPublishedProjects(): ProjectItem[] {
  return projectItems.filter((item) => item.published);
}

export { projectItems };
