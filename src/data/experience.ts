import { yearMonthSortValue } from '@/lib/dates';

export type ExperienceType = 'work' | 'volunteer' | 'project';

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  type: ExperienceType;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  highlights?: string[];
  link?: string;
  logo?: string;
  published?: boolean;
}

const experiences: ExperienceItem[] = [
  // ── Work ──
  {
    id: 'terraces-cofounder',
    organization: 'Terraces',
    role: 'Co-Founder',
    type: 'work',
    location: 'San Francisco Bay Area',
    startDate: '2025-04',
    description: 'Building an AI-native career agent from 0 → 1.',
    highlights: [
      'Shipped a 0-to-1 AI-native career agent that captures roles, tailors application materials, scores like an ATS, and generates interview-prep plans.',
      'Built a TypeScript monorepo spanning web (TanStack Start), product API, browser extension, and Expo mobile on shared Supabase auth.',
      'Designed passwordless authentication with cookie sessions on web and independent refresh-token lineages for extension and mobile clients.',
      'Stood up local, preview, and production environment tiers with Terraform-managed Supabase Auth so the team can move from 0 → 1 without freezing the stack.',
    ],
    link: 'https://www.terraces.ai/',
    published: true,
  },
  {
    id: 'workday-sde-2',
    organization: 'Workday',
    role: 'Software Engineer II',
    type: 'work',
    location: 'Pleasanton, CA, United States',
    startDate: '2023-02',
    endDate: '2025-03',
    description:
      'Security tooling, backend reliability, and multi-region delivery across AWS environments.',
    highlights: [
      'Designed React and TypeScript security tooling for cross-project library search and pre-merge dependency analysis.',
      'Patched 15+ critical CVEs in Java and Spring Boot services by migrating deprecated APIs and automating regression tests.',
      'Engineered Jenkins CI/CD pipelines with Docker and Kubernetes across AWS, reducing average deployment time by 40% for 3 microservices across 7 regions.',
      'Maintained Grafana and Prometheus dashboards backed by SQL queries to show rollout health, test results, and vulnerability signals.',
      'Worked cross-functionally with platform, security, DevOps, and application teams in an Agile/Scrum environment.',
    ],
    link: 'https://www.workday.com',
    published: true,
  },
  {
    id: 'workday-intern',
    organization: 'Workday',
    role: 'Software Engineer Intern',
    type: 'work',
    location: 'Pleasanton, CA, United States (Hybrid)',
    startDate: '2022-05',
    endDate: '2022-08',
    description: 'Internal tooling and performance improvements for platform validation.',
    highlights: [
      'Rebuilt a legacy Bash validator as a Python CLI, standardizing configuration checks across 20+ bare-metal servers.',
      'Optimized configuration checks with Redis in-memory caching, reducing average execution time by 35% across server environments.',
    ],
    link: 'https://www.workday.com',
    published: true,
  },
  // ── Volunteer / Leadership ──
  {
    id: 'uvsa-midwest-chair',
    organization: 'UVSA-Midwest',
    role: 'Chairperson',
    type: 'volunteer',
    startDate: '2025-04',
    description: 'Leading a 501(c)(3) non-profit serving 31 universities.',
    highlights: [
      'Led the Board of Directors for a 501(c)(3) non-profit, driving strategic initiatives and productive decision-making.',
      'Translated high-level organizational goals into actionable roadmaps, ensuring effective implementation.',
      'Managed compliance with federal, state, and local regulations, overseeing tax-exempt filings and corporate contracts.',
    ],
    link: 'https://www.uvsamidwest.org',
    published: false,
  },
  {
    id: 'uvsa-midwest-director',
    organization: 'UVSA-Midwest',
    role: 'Director of Technology',
    type: 'volunteer',
    location: 'Remote',
    startDate: '2022-10',
    endDate: '2026-05',
    description:
      'Led technology for a 501(c)(3) non-profit serving 1,500+ members across 31 universities.',
    highlights: [
      'Shipped a 0-to-1 full-stack React Native application with JavaScript and cloud NoSQL, replacing paid tools and reducing platform costs by 80%.',
      'Built GitHub Actions and Expo Application Services pipelines for automated tests, multi-environment builds, deployments, and over-the-air updates.',
      'Managed three agile development teams building event registration, operations, and member-management features for flagship conferences.',
      'Wrote reusable AI agent skills and integrated Model Context Protocol servers to codify workflows and accelerate developer onboarding.',
      'Organized feedback sessions and office hours to turn recurring user issues into prioritized bug fixes.',
    ],
    link: 'https://www.uvsamidwest.org',
    published: true,
  },
  {
    id: 'uvsa-midwest-cochair',
    organization: 'UVSA-Midwest',
    role: 'Technology Co-Chair',
    type: 'volunteer',
    startDate: '2023-02',
    endDate: '2024-04',
    description: 'Shipped a 0 → 1 cross-platform mobile application.',
    highlights: [
      'Shipped a 0 → 1 cross-platform React Native application, improving event registrations for over 1,500 constituents.',
      'Enhanced user experience and engagement across 31 universities through streamlined processes.',
      'Collaborated with diverse teams to ensure effective implementation and user satisfaction.',
    ],
    link: 'https://www.uvsamidwest.org',
    published: false,
  },
  {
    id: 'unavsa-director',
    organization: 'UNAVSA',
    role: 'Registration Director',
    type: 'volunteer',
    startDate: '2024-09',
    endDate: '2025-08',
    description: 'End-to-end conference registration operations and platform migration.',
    highlights: [
      'Managed end-to-end conference registration operations, ensuring efficient workflows and achieving full capacity.',
      'Led a successful platform migration initiative through collaboration with IT and thorough internal testing.',
      'Coordinated with cross-functional teams to align project timelines and deliverables for seamless pre-conference execution.',
    ],
    published: false,
  },
  {
    id: 'codepath-mentor',
    organization: 'CodePath',
    role: 'Technical Interview Prep Mentor',
    type: 'volunteer',
    startDate: '2022-05',
    endDate: '2024-08',
    description:
      'Mentoring students in algorithmic problem-solving and interview preparation.',
    highlights: [
      'Mentored over 20 students in technical interview preparation, emphasizing algorithmic problem-solving.',
      'Provided constructive feedback to enhance students\u2019 coding skills and communication abilities.',
      'Fostered a supportive learning environment to help students achieve optimized solutions.',
    ],
    link: 'https://www.codepath.org',
    published: true,
  },
];

export function listPublishedExperiences(): ExperienceItem[] {
  return experiences
    .filter((exp) => exp.published !== false)
    .sort((a, b) => yearMonthSortValue(b.startDate) - yearMonthSortValue(a.startDate));
}
