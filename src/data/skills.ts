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
  'Full-Stack Web Development',
  'Mobile App Development',
  'DevOps & Infrastructure',
  'Distributed Systems',
  'Cybersecurity',
] as const;

/** Curated tools shown on the site. The full badge list stays on the GitHub README. */
export const featuredSkills = [
  'TypeScript',
  'Python',
  'Java',
  'React',
  'Next.js',
  'React Native',
  'Node.js',
  'Supabase',
  'PostgreSQL',
  'Docker',
  'Kubernetes',
  'AWS',
] as const;

export const skillCategories: SkillCategory[] = [
  {
    title: '⌨️ Languages',
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
        'Java',
        'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white',
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
        'C++',
        'https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white',
      ),
      badge(
        'C',
        'https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white',
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
        'Shell Script',
        'https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white',
      ),
      badge(
        'Markdown',
        'https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white',
      ),
      badge(
        'LaTeX',
        'https://img.shields.io/badge/latex-%23008080.svg?style=for-the-badge&logo=latex&logoColor=white',
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
        'Next JS',
        'https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white',
      ),
      badge(
        'Redux',
        'https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white',
      ),
      badge(
        'jQuery',
        'https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white',
      ),
      badge(
        'Bootstrap',
        'https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white',
      ),
      badge(
        'React Router',
        'https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white',
      ),
      badge(
        'SASS',
        'https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white',
      ),
      badge(
        'Vue.js',
        'https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D',
      ),
      badge(
        'TailwindCSS',
        'https://img.shields.io/badge/tailwindcss-%3338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white',
      ),
    ],
  },
  {
    title: '⚙️ Backend',
    badges: [
      badge(
        'Supabase',
        'https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white',
      ),
      badge(
        'Firebase',
        'https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase',
      ),
      badge(
        'NodeJS',
        'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white',
      ),
      badge(
        'Express.js',
        'https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB',
      ),
      badge(
        'Django',
        'https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white',
      ),
      badge(
        'Flask',
        'https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white',
      ),
      badge(
        'Spring',
        'https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white',
      ),
    ],
  },
  {
    title: '💽 Databases',
    badges: [
      badge(
        'SQLite',
        'https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white',
      ),
      badge(
        'Postgres',
        'https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white',
      ),
      badge(
        'MySQL',
        'https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white',
      ),
      badge(
        'MongoDB',
        'https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white',
      ),
    ],
  },
  {
    title: '🤖 Hosting',
    badges: [
      badge(
        'Vercel',
        'https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white',
      ),
      badge(
        'Netlify',
        'https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7',
      ),
      badge(
        'DigitalOcean',
        'https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=for-the-badge&logo=digitalOcean&logoColor=white',
      ),
      badge(
        'Glitch',
        'https://img.shields.io/badge/glitch-%233333FF.svg?style=for-the-badge&logo=glitch&logoColor=white',
      ),
      badge(
        'Cloudflare',
        'https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white',
      ),
    ],
  },
  {
    title: '🛠️ Tools',
    badges: [
      badge(
        'NPM',
        'https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white',
      ),
      badge(
        'Yarn',
        'https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white',
      ),
      badge(
        'Gradle',
        'https://img.shields.io/badge/Gradle-02303A.svg?style=for-the-badge&logo=Gradle&logoColor=white',
      ),
      badge(
        'Biome',
        'https://img.shields.io/badge/Biome-60A5FA?style=for-the-badge&logo=biome&logoColor=white',
      ),
      badge(
        'Postman',
        'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white',
      ),
    ],
  },
  {
    title: '💻 DevOps, Cloud, & Infrastructure',
    badges: [
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
        'Google Cloud',
        'https://img.shields.io/badge/Google%20Cloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white',
      ),
      badge(
        'AWS',
        'https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white',
      ),
      badge(
        'Nginx',
        'https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white',
      ),
    ],
  },
  {
    title: '🎨 Design',
    badges: [
      badge(
        'Figma',
        'https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white',
      ),
      badge(
        'Canva',
        'https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white',
      ),
      badge(
        'Adobe Audition',
        'https://img.shields.io/badge/Adobe%20Audition-9999FF.svg?style=for-the-badge&logo=Adobe%20Audition&logoColor=white',
      ),
      badge(
        'Adobe Premiere Pro',
        'https://img.shields.io/badge/Adobe%20Premiere%20Pro-9999FF.svg?style=for-the-badge&logo=Adobe%20Premiere%20Pro&logoColor=white',
      ),
      badge(
        'Adobe Lightroom',
        'https://img.shields.io/badge/Adobe%20Lightroom-31A8FF.svg?style=for-the-badge&logo=Adobe%20Lightroom&logoColor=white',
      ),
      badge(
        'Adobe Photoshop',
        'https://img.shields.io/badge/adobephotoshop-%2331A8FF.svg?style=for-the-badge&logo=adobephotoshop&logoColor=white',
      ),
      badge(
        'Adobe XD',
        'https://img.shields.io/badge/Adobe%20XD-470137?style=for-the-badge&logo=Adobe%20XD&logoColor=#FF61F6',
      ),
    ],
  },
  {
    title: '🛠️ Organization',
    badges: [
      badge(
        'Notion',
        'https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white',
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
        'Trello',
        'https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white',
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
