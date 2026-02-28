export type TabType = 'internships' | 'projects' | 'blog';

export type Tab =
  | { type: 'internships' }
  | { type: 'projects' }
  | { type: 'blog' };

export const TAB_LABELS: Record<TabType, string> = {
  internships: 'Internships',
  projects: 'Projects',
  blog: 'Blog',
};

export const ALL_TAB_TYPES: TabType[] = ['internships', 'projects', 'blog'];

export function createTab(type: TabType): Tab {
  return { type };
}

export function isTabOpen(tabs: Tab[], type: TabType): boolean {
  return tabs.some((tab) => tab.type === type);
}

export function getUnopenedTabTypes(tabs: Tab[]): TabType[] {
  return ALL_TAB_TYPES.filter((type) => !isTabOpen(tabs, type));
}
