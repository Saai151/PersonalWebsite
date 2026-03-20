import type { Tab, TabType } from '@/domain/tabs';
import { createTab, isTabOpen } from '@/domain/tabs';

export interface TabSnapshot {
  tabs: Tab[];
  activeTab: TabType | null;
}

export const initialTabSnapshot: TabSnapshot = {
  tabs: [],
  activeTab: null,
};

export function openTabState(snapshot: TabSnapshot, type: TabType): TabSnapshot {
  if (isTabOpen(snapshot.tabs, type)) {
    return { ...snapshot, activeTab: type };
  }
  return {
    tabs: [...snapshot.tabs, createTab(type)],
    activeTab: type,
  };
}

export function closeTabState(snapshot: TabSnapshot, type: TabType): TabSnapshot {
  const { tabs, activeTab } = snapshot;
  const newTabs = tabs.filter((t) => t.type !== type);

  if (activeTab === type) {
    const closedIndex = tabs.findIndex((t) => t.type === type);
    const nextTab =
      newTabs[Math.min(closedIndex, newTabs.length - 1)] ?? null;
    return { tabs: newTabs, activeTab: nextTab?.type ?? null };
  }
  return { tabs: newTabs, activeTab };
}

export function setActiveTabState(snapshot: TabSnapshot, type: TabType): TabSnapshot {
  if (!isTabOpen(snapshot.tabs, type)) return snapshot;
  return { ...snapshot, activeTab: type };
}
