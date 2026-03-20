import { create } from 'zustand';
import type { TabType } from '@/domain/tabs';
import {
  initialTabSnapshot,
  openTabState,
  closeTabState,
  setActiveTabState,
  type TabSnapshot,
} from '@/domain/tabLogic';

interface TabState extends TabSnapshot {
  openTab: (type: TabType) => void;
  closeTab: (type: TabType) => void;
  setActiveTab: (type: TabType) => void;
}

export const useTabStore = create<TabState>((set, get) => ({
  ...initialTabSnapshot,

  openTab: (type) => set(() => openTabState(get(), type)),

  closeTab: (type) => set(() => closeTabState(get(), type)),

  setActiveTab: (type) => set(() => setActiveTabState(get(), type)),
}));
