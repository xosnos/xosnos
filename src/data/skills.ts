export interface SkillBadge {
  alt: string;
  src: string;
}

export interface SkillCategory {
  title: string;
  badges: SkillBadge[];
}

const badge = (alt: string, src: string): SkillBadge => ({ alt, src });

export const domainKnowledge = [
  'Agentic Engineering',
  'Full-Stack Development',
  'DevOps & Infrastructure',
  'Distributed Systems',
  'Cybersecurity',
] as const;

/** Curated tools shown at the top of the skills section and used in summaries. */
export const featuredSkills = [
  'Python',
  'TypeScript/JavaScript',
  'React',
  'Next.js',
  'React Native',
  'FastAPI',
  'PostgreSQL',
  'Vercel',
  'GitHub Actions',
] as const;

export const skillCategories: SkillCategory[] = [
  {
    title: '⌨️ Coding Languages',
    badges: [
      badge(
        'Python',
        'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54',
      ),
      badge(
        'TypeScript',
        'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white',
      ),
      badge(
        'JavaScript',
        'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E',
      ),
      badge(
        'HTML5',
        'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white',
      ),
      badge(
        'CSS3',
        'https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white',
      ),
      badge(
        'Java',
        'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white',
      ),
      badge(
        'C++',
        'https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white',
      ),
      badge(
        'C',
        'https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white',
      ),
      badge(
        'Go',
        'https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white',
      ),
      badge(
        'Swift',
        'https://img.shields.io/badge/swift-F54A2A?style=for-the-badge&logo=swift&logoColor=white',
      ),
      badge(
        'Shell Script',
        'https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white',
      ),
    ],
  },
  {
    title: '🖥️ Frontend',
    badges: [
      badge(
        'React',
        'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
      ),
      badge(
        'React Native',
        'https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB',
      ),
      badge(
        'Next.js',
        'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white',
      ),
      badge(
        'Tanstack',
        'https://img.shields.io/badge/Tanstack-000000?style=for-the-badge&logo=tanstack&logoColor=white',
      ),
      badge(
        'Shadcn',
        'https://img.shields.io/badge/Shadcn-000000?style=for-the-badge&logo=shadcnui&logoColor=white',
      ),
      badge(
        'TailwindCSS',
        'https://img.shields.io/badge/tailwindcss-%3338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white',
      ),
      badge(
        'Redux',
        'https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white',
      ),
      badge(
        'JQuery',
        'https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white',
      ),
    ],
  },
  {
    title: '⚙️ Backend',
    badges: [
      badge(
        'FastAPI',
        'https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white',
      ),
      badge(
        'Express.js',
        'https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB',
      ),
      badge(
        'Node.js',
        'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white',
      ),
      badge(
        'Flask',
        'https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white',
      ),
      badge(
        'Django',
        'https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white',
      ),
      badge(
        'Spring Boot',
        'https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white',
      ),
    ],
  },
  {
    title: '💽 Databases',
    badges: [
      badge(
        'Postgres',
        'https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white',
      ),
      badge(
        'Supabase',
        'https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white',
      ),
      badge(
        'Firebase',
        'https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase',
      ),
      badge(
        'Redis',
        'https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white',
      ),
      badge(
        'MySQL',
        'https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white',
      ),
      badge(
        'SQLite',
        'https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white',
      ),
      badge(
        'MongoDB',
        'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white',
      ),
    ],
  },
  {
    title: '☁️ Cloud Infrastructure',
    badges: [
      badge(
        'Vercel',
        'https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white',
      ),
      badge(
        'Railway',
        'https://img.shields.io/badge/railway-%234285F4.svg?style=for-the-badge&logo=railway&logoColor=white',
      ),
      badge(
        'Cloudflare',
        'https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white',
      ),
      badge(
        'Netlify',
        'https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7',
      ),
      badge(
        'Google Cloud',
        'https://img.shields.io/badge/Google%20Cloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white',
      ),
      badge(
        'AWS',
        'https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white',
      ),
    ],
  },
  {
    title: '💻 DevOps',
    badges: [
      badge(
        'GitHub Actions',
        'https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white',
      ),
      badge(
        'Docker',
        'https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white',
      ),
      badge(
        'Kubernetes',
        'https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white',
      ),
      badge(
        'Jenkins',
        'https://img.shields.io/badge/jenkins-%232C5263.svg?style=for-the-badge&logo=jenkins&logoColor=white',
      ),
      badge(
        'Terraform',
        'https://img.shields.io/badge/terraform-%235835CC.svg?style=for-the-badge&logo=terraform&logoColor=white',
      ),
      badge(
        'Bamboo',
        'https://img.shields.io/badge/Bamboo-0052CC?style=for-the-badge&logo=bamboo&logoColor=white',
      ),
    ],
  },
  {
    title: '🛠️ Tools',
    badges: [
      badge(
        'Uv',
        'https://img.shields.io/badge/uv-DE5FE9?style=for-the-badge&logo=uv&logoColor=white',
      ),
      badge(
        'Bun',
        'https://img.shields.io/badge/Bun-000000?style=for-the-badge&logo=bun&logoColor=white',
      ),
      badge(
        'pnpm',
        'https://img.shields.io/badge/pnpm-%23FFD500.svg?style=for-the-badge&logo=pnpm&logoColor=black',
      ),
      badge(
        'Yarn',
        'https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white',
      ),
      badge(
        'Biome',
        'https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white',
      ),
      badge(
        'Ruff',
        'https://img.shields.io/badge/Ruff-D7FF64?style=for-the-badge&logo=ruff&logoColor=black',
      ),
      badge(
        'Ty',
        'https://img.shields.io/badge/ty-DE5FE9?style=for-the-badge&logo=ty&logoColor=white',
      ),
      badge(
        'Prettier',
        'https://img.shields.io/badge/prettier-%23F7B93E.svg?style=for-the-badge&logo=prettier&logoColor=black',
      ),
      badge(
        'Vite',
        'https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white',
      ),
      badge(
        'Vitest',
        'https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white',
      ),
      badge(
        'Pytest',
        'https://img.shields.io/badge/Pytest-0A9EDC?style=for-the-badge&logo=pytest&logoColor=white',
      ),
    ],
  },
  {
    title: '🤖 AI / Editors',
    badges: [
      badge(
        'Cursor',
        'https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white',
      ),
      badge(
        'Claude',
        'https://img.shields.io/badge/Claude-D97757?style=for-the-badge&logo=claude&logoColor=white',
      ),
      badge(
        'Zed',
        'https://img.shields.io/badge/Zed-000000?style=for-the-badge&logo=zedindustries&logoColor=white',
      ),
      badge(
        'ChatGPT',
        'https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white',
      ),
      badge(
        'Gemini',
        'https://img.shields.io/badge/Gemini-8E75B2?style=for-the-badge&logo=google-gemini&logoColor=white',
      ),
      badge(
        'Ollama',
        'https://img.shields.io/badge/Ollama-000000?style=for-the-badge&logo=ollama&logoColor=white',
      ),
      badge(
        'Xcode',
        'https://img.shields.io/badge/Xcode-147EFB?style=for-the-badge&logo=xcode&logoColor=white',
      ),
      badge(
        'Perplexity',
        'https://img.shields.io/badge/Perplexity-1FB8CD?style=for-the-badge&logo=perplexity&logoColor=white',
      ),
      badge(
        'Replit',
        'https://img.shields.io/badge/Replit-F26207?style=for-the-badge&logo=replit&logoColor=white',
      ),
    ],
  },
  {
    title: '📋 Organization',
    badges: [
      badge(
        'Linear',
        'https://img.shields.io/badge/Linear-5E6AD2?style=for-the-badge&logo=linear&logoColor=white',
      ),
      badge(
        'Notion',
        'https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white',
      ),
      badge(
        'Excalidraw',
        'https://img.shields.io/badge/Excalidraw-6965DB?style=for-the-badge&logo=excalidraw&logoColor=white',
      ),
      badge(
        'Jira',
        'https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white',
      ),
      badge(
        'Confluence',
        'https://img.shields.io/badge/confluence-%23172BF4.svg?style=for-the-badge&logo=confluence&logoColor=white',
      ),
      badge(
        'Miro',
        'https://img.shields.io/badge/Miro-050038?style=for-the-badge&logo=miro&logoColor=white',
      ),
    ],
  },
];

export function listSkillCategories(): SkillCategory[] {
  return skillCategories;
}

export function listFeaturedSkills(): readonly string[] {
  return featuredSkills;
}
