export interface NavItem {
  section: string;
  label: string;
}

export const navItems: NavItem[] = [
  { section: 'projects', label: 'Projects' },
  { section: 'experience', label: 'Experience' },
  { section: 'skills', label: 'Skills' },
  { section: 'education', label: 'Education' },
  { section: 'about', label: 'About' },
  { section: 'contact', label: 'Contact' },
];
