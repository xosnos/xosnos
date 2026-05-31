export interface Badge {
  src: string;
  alt: string;
}

export interface SkillCategory {
  title: string;
  badges: Badge[];
}

/**
 * Fetches the README from GitHub and parses skill badges
 */
export async function fetchSkillsFromReadme(): Promise<SkillCategory[]> {
  const README_URL = 'https://raw.githubusercontent.com/xosnos/xosnos/refs/heads/main/README.md';

  try {
    const response = await fetch(README_URL, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch README: ${response.statusText}`);
    }

    const markdown = await response.text();
    return parseSkillsFromMarkdown(markdown);
  } catch (error) {
    console.error('Error fetching skills from README:', error);
    throw error;
  }
}

/**
 * Parses markdown content to extract skill categories and badges
 */
function parseSkillsFromMarkdown(markdown: string): SkillCategory[] {
  const categories: SkillCategory[] = [];

  // Split by headers (###) to find skill sections
  const sections = markdown.split(/^###\s+/m);

  // Map of section title patterns to portfolio titles
  // Keys are patterns that should match the README header
  const categoryMap: Array<{ pattern: string | RegExp; title: string }> = [
    { pattern: /⌨️\s*Languages/i, title: '⌨️ Languages' },
    { pattern: /🖥️\s*Frontend/i, title: '🖥️ Frontend' },
    { pattern: /⚙️\s*Backend/i, title: '⚙️ Backend' },
    { pattern: /💽\s*Databases/i, title: '💽 Databases' },
    { pattern: /🤖\s*Hosting/i, title: '🤖 Hosting' },
    { pattern: /🛠️\s*Tools/i, title: '🛠️ Tools' },
    { pattern: /💻\s*DevOps/i, title: '💻 DevOps, Cloud, & Infrastructure' },
    { pattern: /🎨\s*Design/i, title: '🎨 Design' },
    { pattern: /🛠️\s*Organization/i, title: '🛠️ Organization' },
  ];

  for (const section of sections) {
    const lines = section.split('\n');
    const headerLine = lines[0]?.trim();

    if (!headerLine) continue;

    // Check if this is a skill category we want to include
    let categoryTitle: string | undefined;
    for (const { pattern, title } of categoryMap) {
      const regex = typeof pattern === 'string' ? new RegExp(`^${pattern}$`, 'i') : pattern;
      if (regex.test(headerLine)) {
        categoryTitle = title;
        break;
      }
    }

    if (!categoryTitle) continue;

    // Extract badges from this section
    // Stop at the next section (starts with ###) or end of section
    const badges: Badge[] = [];
    const badgeRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];

      // Stop if we hit another header
      if (line.trim().startsWith('###')) break;

      // Extract badges from this line
      // Reset regex lastIndex to avoid issues with global regex
      badgeRegex.lastIndex = 0;
      let match;
      while ((match = badgeRegex.exec(line)) !== null) {
        const alt = match[1] || '';
        const src = match[2];

        // Only include shields.io badges (for-the-badge style)
        if (src.includes('shields.io') || src.includes('for-the-badge')) {
          badges.push({ src, alt });
        }
      }
    }

    if (badges.length > 0) {
      categories.push({
        title: categoryTitle,
        badges,
      });
    }
  }

  // Ensure consistent ordering
  const orderedCategories: SkillCategory[] = [];
  const order = [
    '⌨️ Languages',
    '🖥️ Frontend',
    '⚙️ Backend',
    '💽 Databases',
    '🤖 Hosting',
    '🛠️ Tools',
    '💻 DevOps, Cloud, & Infrastructure',
    '🎨 Design',
    '🛠️ Organization',
  ];

  for (const title of order) {
    const category = categories.find(c => c.title === title);
    if (category) {
      orderedCategories.push(category);
    }
  }

  // Add any remaining categories not in the order list
  for (const category of categories) {
    if (!orderedCategories.find(c => c.title === category.title)) {
      orderedCategories.push(category);
    }
  }

  return orderedCategories;
}

