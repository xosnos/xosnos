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
      'Terraces is your AI-Native career agent. Capture roles, tailor your materials with local-first AI, score them like an ATS, and keep your portfolio & analytics in sync—without leaving one workspace.',
    tags: ['Next.js', 'Supabase', 'AI', 'Tailwind'],
    demoUrl: 'https://www.terraces.ai/',
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
