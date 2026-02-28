import { create } from 'zustand';
import { type Tab, type TabType, createTab, isTabOpen } from '@/domain/tabs';

interface TabState {
  tabs: Tab[];
  activeTab: TabType | null;
  openTab: (type: TabType) => void;
  closeTab: (type: TabType) => void;
  setActiveTab: (type: TabType) => void;
}

export const useTabStore = create<TabState>((set, get) => ({
  tabs: [],
  activeTab: null,

  openTab: (type) => {
    const { tabs } = get();
    if (isTabOpen(tabs, type)) {
      set({ activeTab: type });
      return;
    }
    set({ tabs: [...tabs, createTab(type)], activeTab: type });
  },

  closeTab: (type) => {
    const { tabs, activeTab } = get();
    const newTabs = tabs.filter((t) => t.type !== type);

    if (activeTab === type) {
      const closedIndex = tabs.findIndex((t) => t.type === type);
      const nextTab =
        newTabs[Math.min(closedIndex, newTabs.length - 1)] ?? null;
      set({ tabs: newTabs, activeTab: nextTab?.type ?? null });
    } else {
      set({ tabs: newTabs });
    }
  },

  setActiveTab: (type) => {
    const { tabs } = get();
    if (isTabOpen(tabs, type)) {
      set({ activeTab: type });
    }
  },
}));
