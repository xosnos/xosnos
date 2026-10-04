import { yearMonthSortValue } from '@/lib/dates';

export type ExperienceType = 'work' | 'volunteer' | 'project';

export const experienceContent = {
  sectionLabel: 'Career',
  sectionTitle: 'Experience',
  sectionDescription:
    "I've worked in corporate, non-profit, and startup settings, from enterprise platforms at Workday to community organizations to a product I'm building from scratch.",
};

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
    role: 'Technical Co-Founder',
    type: 'work',
    location: 'San Francisco Bay Area',
    startDate: '2025-04',
    description: 'Building an AI-native career growth agent from scratch.',
    highlights: [
      'Architected a career platform that captures roles, tailors application materials, scores them like an ATS, and generates interview-prep plans.',
      'Building a TypeScript monorepo with a web app (TanStack Start), a browser extension, and an Expo mobile client on a shared backend.',
      'Designed workflows with Firecrawl and AI SDK to automate job description scraping, company research, and personalized application materials.',
      'Stood up local, preview, and production environments on Terraform-managed Supabase to streamline development.',
    ],
    link: 'https://www.terraces.ai/',
    published: true,
  },
  {
    id: 'workday-sde-2',
    organization: 'Workday',
    role: 'Software Development Engineer II 🪴',
    type: 'work',
    location: 'Pleasanton, CA, United States',
    startDate: '2024-05',
    endDate: '2025-03',
    description:
      'Platform engineering with CI/CD, multi-region delivery, and service rollout safety.',
    highlights: [
      'Engineered scalable Jenkins CI/CD pipelines with Docker and Kubernetes on AWS, improving deployment efficiency.',
      'Automated microservice rollouts across multiple regional data centers.',
      'Worked with cross-functional teams on integration and deployment.',
    ],
    link: 'https://www.workday.com',
    published: true,
  },
  {
    id: 'workday-sde-1',
    organization: 'Workday',
    role: 'Software Development Engineer I 🌿',
    type: 'work',
    location: 'Pleasanton, CA, United States',
    startDate: '2023-02',
    endDate: '2024-04',
    description:
      'Security and reliability engineering across backend services and dependency stack.',
    highlights: [
      'Identified and patched more than 15 critical security vulnerabilities (CVEs) in third-party libraries.',
      'Designed and built evaluation and analytics dashboards for managing vulnerabilities.',
      'Strengthened backend infrastructure security and system resilience.',
    ],
    link: 'https://www.workday.com',
    published: true,
  },
  {
    id: 'workday-intern',
    organization: 'Workday',
    role: 'Software Development Engineer Intern 🌱',
    type: 'work',
    location: 'Pleasanton, CA, United States (Hybrid)',
    startDate: '2022-05',
    endDate: '2023-01',
    description: 'Internal tooling and performance improvements for platform validation.',
    highlights: [
      'Migrated an internal CLI validator tool from shell script to Python, which made it easier to maintain.',
      'Added caching, which reduced program runtime.',
      'Tested on bare-metal servers with varying configurations to find errors and mismatches.',
    ],
    link: 'https://www.workday.com',
    published: true,
  },
  // ── Volunteer / Leadership ──
  {
    id: 'unavsa-assoc-director',
    organization: 'UNAVSA',
    role: 'Associate Director',
    type: 'volunteer',
    startDate: '2025-09',
    endDate: '2026-08',
    description:
      'Cross-functional conference leadership, executive stakeholder alignment, and staff recruitment.',
    highlights: [
      'Coordinated work across 10 conference teams to keep projects on schedule.',
      'Ran all-staff calls and executive meetings to align stakeholders on deliverables and risks.',
      'Oversaw the recruitment pipeline for conference staff, focusing on interview design and candidate selection.',
    ],
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
      'Managed end-to-end conference registration, which reached full capacity.',
      'Led a platform migration with IT, backed by internal testing.',
      'Coordinated with cross-functional teams on timelines and deliverables ahead of the conference.',
    ],
    published: false,
  },
  {
    id: 'unavsa-staff',
    organization: 'UNAVSA',
    role: 'Registration Staff',
    type: 'volunteer',
    startDate: '2023-09',
    endDate: '2024-08',
    description:
      'Conference registration platform maintenance, attendee support, and on-site check-in.',
    highlights: [
      'Maintained the conference registration platform.',
      'Wrote email drafts and FAQs to help attendees with registration questions.',
      'Managed check-in for the conference opening, workshops, and gala dinner.',
    ],
    published: false,
  },
  {
    id: 'uvsa-midwest-chair',
    organization: 'UVSA-Midwest',
    role: 'Chairperson',
    type: 'volunteer',
    startDate: '2025-04',
    endDate: '2026-06',
    description: 'Leading a 501(c)(3) non-profit serving 31 universities.',
    highlights: [
      'Led the Board of Directors of a 501(c)(3) non-profit and its strategic initiatives.',
      'Translated high-level organizational goals into actionable roadmaps and oversaw their implementation.',
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
    startDate: '2024-05',
    endDate: '2025-04',
    description:
      'Strategic technology oversight, board governance, and developer mentorship across three teams.',
    highlights: [
      'Provided strategic oversight on technology and accessibility initiatives as a Board member.',
      'Mentored three teams to align technical projects with organizational goals.',
      'Supervised the development of a cross-platform application for event registration.',
      'Established a centralized GitHub organization for code management.',
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
    description: 'Shipped a 0-to-1 cross-platform React Native mobile application.',
    highlights: [
      'Shipped a 0-to-1 cross-platform React Native application for the non-profit, improving event registration for more than 1,500 constituents.',
      'Improved user experience and engagement across 31 universities by streamlining processes.',
      'Worked with different teams on implementation and user satisfaction.',
    ],
    link: 'https://www.uvsamidwest.org',
    published: false,
  },
  {
    id: 'uvsa-midwest-webdev',
    organization: 'UVSA-Midwest',
    role: 'Web Development Staff',
    type: 'volunteer',
    startDate: '2022-10',
    endDate: '2023-03',
    description:
      'Conference website development, UI component enhancements, and registration automation.',
    highlights: [
      'Developed and maintained conference website pages with various committees.',
      'Acted as liaison between teams so website content was updated on time.',
      'Improved the information architecture and UI components for a better user experience.',
      'Automated workshop registration, cutting manual workload.',
    ],
    link: 'https://www.uvsamidwest.org',
    published: false,
  },
  {
    id: 'codepath-mentor',
    organization: 'CodePath',
    role: 'Technical Interview Prep Mentor',
    type: 'volunteer',
    location: 'Remote',
    startDate: '2022-05',
    endDate: '2024-08',
    description:
      'Mentoring students in algorithmic problem-solving and interview preparation.',
    highlights: [
      'Mentored more than 20 students in technical interview preparation, focusing on algorithmic problem-solving.',
      "Gave feedback to improve students' coding and communication skills.",
      'Created a supportive environment and guided students toward optimized solutions.',
    ],
    link: 'https://www.codepath.org',
    published: true,
  },
  {
    id: 'hackblue-dev',
    organization: 'HackBlue',
    role: 'Curriculum & Web Developer',
    type: 'volunteer',
    location: 'Hybrid',
    startDate: '2020-01',
    endDate: '2022-05',
    description: 'Web development and STEM coding curriculum for middle school students.',
    highlights: [
      "Deployed HackBlue's website with HTML, CSS, JavaScript, and GitHub Pages to build its online presence.",
      'Wrote weekly lesson plans introducing coding concepts to more than 50 middle school students.',
      'Added interactive coding activities and projects to keep students engaged.',
    ],
    link: 'https://hackblue.github.io/',
    published: true,
  },
];

export function listPublishedExperiences(): ExperienceItem[] {
  return experiences
    .filter((exp) => exp.published !== false)
    .sort((a, b) => yearMonthSortValue(b.startDate) - yearMonthSortValue(a.startDate));
}
