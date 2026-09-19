export interface ProjectItem {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
  published?: boolean;
  coverTags: string[];
  tags: string[];
}

export function listOverviewTags(item: ProjectItem): string[] {
  return [...item.coverTags, ...item.tags];
}

const projectItems: ProjectItem[] = [
  {
    id: 'terraces',
    title: 'Terraces',
    image: '/assets/img/projects/terraces.png',
    subtitle:
      'An AI-native career progression platform that scans resumes, suggests role-specific edits, aligns portfolio projects, and generates interview-prep plans.',
    description:
      'Terraces is a 0-to-1 career agent that captures target roles, tailors application materials, scores them like an ATS, and keeps portfolio work and interview-prep plans in sync. The product lives in a TypeScript monorepo spanning a TanStack Start web app, product API, browser extension, and Expo mobile client on shared Supabase auth.',
    coverTags: ['TanStack Start', 'PostgreSQL', 'AI SDK'],
    tags: ['TypeScript', 'Cloudflare', 'Firecrawl', 'Biome'],
    demoUrl: 'https://www.terraces.ai/',
    published: true,
  },
  {
    id: 'architype',
    title: 'Architype',
    image: '/assets/img/projects/architype.png',
    subtitle:
      'A collaborative system design workspace for building architecture diagrams, using AI agents to create or revise designs, and generating downloadable technical specs.',
    description:
      'Architype is a shared canvas for system design. Teams sketch architecture diagrams together, then use AI agents to draft or revise those designs and export downloadable technical specs from the same workspace.',
    coverTags: ['Next.js', 'React Flow', 'Supabase'],
    tags: ['TypeScript', 'OpenRouter', 'Biome'],
    demoUrl: 'https://architype.xosnos.com',
    repoUrl: 'https://github.com/xosnos/architype',
    published: true,
  },
  {
    id: 'unavsa-mail-merge',
    title: 'UNAVSA Mail Merge',
    image: '/assets/img/projects/unavsa-mail-merge.png',
    subtitle:
      'A Google Workspace add-on for personalized email campaigns and engagement analytics, built with CardService, Google Apps Script, Gmail, and Google Sheets.',
    description:
      'UNAVSA Mail Merge turns Google Sheets into a campaign source of truth. Staff send personalized Gmail messages from a CardService add-on, then track engagement without leaving Google Workspace.',
    coverTags: ['Google Apps Script', 'Gmail API', 'Google Sheets'],
    tags: ['JavaScript'],
    repoUrl: 'https://github.com/xosnos/mail-merge',
    published: true,
  },
  {
    id: 'uvsa-midwest',
    title: 'UVSA-Midwest App',
    image: '/assets/img/projects/uvsamidwest.png',
    subtitle:
      'Coordinates flagship events and keeps constituents up to date with personalized information year-round and conference-specific details during flagship events.',
    description:
      'The official UVSA-Midwest app serves 31 universities with event registration, live coordination, and personalized updates. It shipped 0 → 1 in React Native and Expo to streamline registrations for more than 1,500 constituents.',
    coverTags: ['React Native', 'Expo', 'Firebase'],
    tags: [],
    demoUrl: 'https://app.uvsamidwest.org',
    published: true,
  },
  {
    id: 'almond-travel',
    title: 'Almond Travel',
    image: '/assets/img/projects/almond-travel.png',
    subtitle:
      'Bundles flights, hotels, and attractions into a seamless experience for tourists and immigrants traveling to America.',
    description:
      'Almond Travel helps visitors plan a U.S. trip in one place. It combines flights, hotels, and attractions into a single itinerary so tourists and immigrants can move from research to booking without bouncing across sites.',
    coverTags: ['React', 'Next.js', 'Firebase'],
    tags: ['TypeScript', 'Redux', 'Tailwind CSS'],
    demoUrl: 'https://almond-travel.xosnos.com/',
    repoUrl: 'https://github.com/xosnos/almond-travel',
    published: true,
  },
  {
    id: 'jammming',
    title: 'jammming',
    image: '/assets/img/projects/jammming.png',
    subtitle:
      'A front-end app for building playlists quickly and sending them straight to your Spotify account.',
    description:
      'jammming is a React client for the Spotify API. Search tracks, assemble a playlist in the browser, and push it to your Spotify account without leaving the app.',
    coverTags: ['React', 'Spotify API'],
    tags: ['TypeScript', 'Vite'],
    demoUrl: 'https://jammming.xosnos.com/',
    repoUrl: 'https://github.com/xosnos/jammming',
    published: true,
  },
];

export function listPublishedProjects(): ProjectItem[] {
  return projectItems.filter((item) => item.published);
}

export { projectItems };
