export interface EducationItem {
  id: string;
  level: string;
  name: string;
  shortName: string;
  image: string;
  degree?: string;
  status?: string;
  courses?: string[];
  activities?: string[];
  awards?: string[];
}

export const educationItems: EducationItem[] = [
  {
    id: 'umich',
    level: 'Undergraduate',
    name: 'University of Michigan',
    shortName: 'University of Michigan',
    image: '/assets/img/schools/umich-logo.png',
    degree: 'Bachelor of Science in Engineering (BSE) in Computer Science',
    status: 'Graduated',
    courses: [
      'EECS 481: Software Engineering',
      'EECS 497: Human-Centered Software Design and Development',
      'EECS 441: Mobile App Development for Entrepreneurs',
      'EECS 493: User Interface Development',
      'EECS 482: Operating Systems',
      'EECS 485: Web Systems',
      'EECS 388: Computer Security',
      'EECS 281: Data Structures & Algorithms',
    ],
    activities: [
      'EECS Course Grader',
      'UVSA-Midwest',
      'Vietnamese Student Association',
      'HackBlue',
      'Michigan Hackers',
    ],
    awards: ['HAIL Scholarship', 'University Honors', "Dean's List"],
  },
  {
    id: 'ekhs',
    level: 'High School',
    name: 'East Kentwood High School',
    shortName: 'East Kentwood',
    image: '/assets/img/schools/ekhs-logo.png',
    courses: ['AP Computer Science', 'AP Statistics', 'AP Calculus BC'],
    activities: [
      'National Honor Society',
      'National Art Honors Society',
      'Symphony Orchestra',
      'Junior Varsity Tennis',
      'Tutoring (Math & Science)',
    ],
    awards: [
      'National Qualifier & State Champion in C++ Programming in 2018',
      'AP Scholar with Distinction',
      'Bosch and Society of Automotive Engineers Scholarship',
      'Chuck Karston Memorial Award',
    ],
  },
];

export function listEducationItems(): EducationItem[] {
  return educationItems.filter((item) => item.id !== 'stay-tuned');
}
