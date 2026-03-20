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

/** URL path for each section (matches tab labels in the address bar). */
export const TAB_PATHS: Record<TabType, string> = {
  internships: '/internships',
  projects: '/projects',
  blog: '/blog',
};

export function pathToTab(pathname: string): TabType | null {
  const entry = (Object.entries(TAB_PATHS) as [TabType, string][]).find(
    ([, path]) => path === pathname
  );
  return entry?.[0] ?? null;
}

export function createTab(type: TabType): Tab {
  return { type };
}

export function isTabOpen(tabs: Tab[], type: TabType): boolean {
  return tabs.some((tab) => tab.type === type);
}

export function getUnopenedTabTypes(tabs: Tab[]): TabType[] {
  return ALL_TAB_TYPES.filter((type) => !isTabOpen(tabs, type));
}

/** Treat the current path tab as "open" so it is excluded from the + menu. */
export function getUnopenedTabTypesForPath(
  tabs: Tab[],
  pathTab: TabType | null
): TabType[] {
  const open = new Set<TabType>(tabs.map((t) => t.type));
  if (pathTab) open.add(pathTab);
  return ALL_TAB_TYPES.filter((type) => !open.has(type));
}
