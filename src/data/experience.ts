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
    location: 'San Jose, CA',
    startDate: '2025-4',
    description: 'Building an AI-native career agent from 0 → 1.',
    highlights: [],
    published: false,
  },
  {
    id: 'workday-sde-2',
    organization: 'Workday',
    role: 'Software Development Engineer II 🪴',
    type: 'work',
    location: 'Pleasanton, CA, United States',
    startDate: '2024-5',
    endDate: '2025-3',
    description: 'Platform engineering with CI/CD, multi-region delivery, and service rollout safety.',
    highlights: [
      'Architected scalable CI/CD pipelines utilizing Jenkins, Docker, and Kubernetes, enhancing deployment efficiency.',
      'Enabled automated rollouts of microservices across multiple regional data centers, streamlining operations.',
      'Collaborated with cross-functional teams to ensure seamless integration and deployment processes.',
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
    startDate: '2023-2',
    endDate: '2024-4',
    description: 'Security and reliability engineering across backend services and dependency stack.',
    highlights: [
      'Proactively identified and patched over 15 critical security vulnerabilities (CVEs) in third-party libraries.',
      'Designed observability and evaluation dashboards using Grafana, Prometheus, and SQL for streamlined vulnerability management.',
      'Strengthened backend infrastructure security, enhancing overall system resilience.',
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
    startDate: '2022-5',
    endDate: '2022-8',
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
    id: 'uvsa-midwest-chair',
    organization: 'UVSA-Midwest',
    role: 'Chairperson',
    type: 'volunteer',
    startDate: '2025-4',
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
    startDate: '2024-5',
    endDate: '2025-4',
    description: 'Strategic technology oversight and team mentorship.',
    highlights: [
      'Provided strategic oversight on technology and accessibility initiatives as a Board member.',
      'Mentored 3 teams to align technical projects with organizational goals.',
      'Supervised the continued development of a cross-platform application that streamlined event registrations.',
      'Established a centralized GitHub organization to improve code management and ownership processes.',
    ],
    link: 'https://www.uvsamidwest.org',
    published: false,
  },
  {
    id: 'uvsa-midwest-cochair',
    organization: 'UVSA-Midwest',
    role: 'Technology Co-Chair',
    type: 'volunteer',
    startDate: '2023-2',
    endDate: '2024-4',
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
    startDate: '2024-9',
    endDate: '2025-8',
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
    startDate: '2022-5',
    endDate: '2024-8',
    description: 'Mentoring students in algorithmic problem-solving and interview preparation.',
    highlights: [
      'Mentored over 20 students in technical interview preparation, emphasizing algorithmic problem-solving.',
      'Provided constructive feedback to enhance students\u2019 coding skills and communication abilities.',
      'Fostered a supportive learning environment to help students achieve optimized solutions.',
    ],
    link: 'https://www.codepath.org',
    published: false,
  },
];

export function listPublishedExperiences(): ExperienceItem[] {
  return experiences
    .filter((exp) => exp.published !== false)
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() -
        new Date(a.startDate).getTime(),
    );
}

