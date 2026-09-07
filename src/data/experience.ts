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
    role: 'Software Development Engineer II 🪴',
    type: 'work',
    location: 'Pleasanton, CA, United States',
    startDate: '2024-05',
    endDate: '2025-03',
    description:
      'Platform engineering with CI/CD, multi-region delivery, and service rollout safety.',
    highlights: [
      'Architected scalable CI/CD pipelines using Jenkins and Kubernetes, significantly enhancing deployment efficiency.',
      'Enabled automated rollouts of microservices across multiple regional data centers, streamlining operations.',
      'Collaborated with cross-functional teams to ensure seamless integration and deployment processes at Workday.',
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
      'Proactively identified and patched over 15 critical security vulnerabilities (CVEs) in third-party libraries.',
      'Designed and implemented evaluation and analytics dashboards for streamlined vulnerability management.',
      'Strengthened backend infrastructure security, enhancing overall system resilience.',
      'Contributed to Workday’s commitment to providing secure and reliable software solutions.',
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
      'Modernized an internal CLI validator tool by migrating from shell script to Python, enhancing maintainability.',
      'Improved system performance through the implementation of caching processes, significantly reducing program runtime.',
      'Conducted thorough testing on bare-metal servers with varying configurations to identify errors and mismatches.',
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
      'Directed cross-functional coordination across 10 conference teams, ensuring timely project execution.',
      'Facilitated all-staff calls and executive meetings to align stakeholders on deliverables and risks.',
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
      'Managed end-to-end conference registration operations, ensuring efficient workflows and achieving full capacity.',
      'Led a successful platform migration initiative through collaboration with IT and thorough internal testing.',
      'Coordinated with cross-functional teams to align project timelines and deliverables for seamless pre-conference execution.',
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
      'Maintained the registration platform for conference, ensuring smooth operations.',
      'Developed email drafts and FAQs to assist attendees with registration queries.',
      'Managed check-in processes for conference opening, workshops, and gala dinner.',
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
    startDate: '2024-05',
    endDate: '2025-04',
    description:
      'Strategic technology oversight, board governance, and developer mentorship across three teams.',
    highlights: [
      'Provided strategic oversight on technology and accessibility initiatives as a Board member.',
      'Mentored three teams to align technical projects with organizational goals.',
      'Supervised the development of a cross-platform application for streamlined event registrations.',
      'Established a centralized GitHub organization to enhance code management processes.',
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
    description: 'Shipped a 0 → 1 cross-platform React Native mobile application.',
    highlights: [
      'Shipped a 0 → 1 cross-platform React Native application for the non-profit organization, improving event registrations for over 1500 constituents.',
      'Enhanced user experience and engagement across 31 universities through streamlined processes.',
      'Collaborated with diverse teams to ensure effective implementation and user satisfaction.',
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
      'Developed and maintained conference website pages in collaboration with various committees.',
      'Served as a key liaison across teams to ensure timely updates for website content.',
      'Enhanced information architecture and UI components to improve user experience.',
      'Automated workshop registration processes, significantly reducing manual workload.',
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
      'Mentored over 20 students in technical interview preparation, focusing on algorithmic problem-solving.',
      'Provided constructive feedback to enhance coding skills and communication abilities.',
      'Fostered a supportive learning environment, guiding students to achieve optimized solutions.',
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
      "Deployed HackBlue's website using HTML, CSS, JavaScript, and GitHub pages to enhance online presence.",
      'Developed engaging weekly lesson plans for over 50 middle school students to introduce coding concepts.',
      'Enhanced learning experiences through interactive coding activities and projects, fostering student engagement.',
    ],
    published: true,
  },
];

export function listPublishedExperiences(): ExperienceItem[] {
  return experiences
    .filter((exp) => exp.published !== false)
    .sort((a, b) => yearMonthSortValue(b.startDate) - yearMonthSortValue(a.startDate));
}
