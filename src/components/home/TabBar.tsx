import { useMemo } from 'react';
import { X, Plus } from 'lucide-react';
import { useTabStore } from '@/stores/tabStore';
import {
  TAB_LABELS,
  getUnopenedTabTypes,
  isTabOpen,
  type TabType,
} from '@/domain/tabs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

type TabBarProps = {
  /** Blog tab driven only by `?post=` until user opens it in the store */
  augmentBlogTab: boolean;
  activeTabEffective: TabType | null;
  onClearDeepLinkedPost: () => void;
};

export default function TabBar({
  augmentBlogTab,
  activeTabEffective,
  onClearDeepLinkedPost,
}: TabBarProps) {
  const tabs = useTabStore((s) => s.tabs);
  const closeTab = useTabStore((s) => s.closeTab);
  const openTab = useTabStore((s) => s.openTab);
  const unopened = useMemo(() => getUnopenedTabTypes(tabs), [tabs]);

  const tabTypesToShow = useMemo(() => {
    const types = tabs.map((t) => t.type);
    if (augmentBlogTab && !types.includes('blog')) types.push('blog');
    return types;
  }, [tabs, augmentBlogTab]);

  const handleSelectTab = (type: TabType) => {
    openTab(type);
  };

  const handleCloseTab = (type: TabType) => {
    if (type === 'blog' && augmentBlogTab && !isTabOpen(tabs, 'blog')) {
      onClearDeepLinkedPost();
      return;
    }
    closeTab(type);
  };

  return (
    <div className="flex items-center border-b border-white/10 bg-black">
      {tabTypesToShow.map((type) => (
        <div
          key={type}
          role="presentation"
          className={cn(
            'group relative flex items-center border-r border-white/10 text-sm transition-colors',
            activeTabEffective === type
              ? 'bg-white/10 text-white'
              : 'text-white/50'
          )}
        >
          <button
            type="button"
            onClick={() => handleSelectTab(type)}
            className={cn(
              'flex-1 px-4 py-2.5 text-left hover:text-white transition-colors',
              activeTabEffective !== type && 'hover:bg-white/5'
            )}
          >
            {TAB_LABELS[type]}
          </button>
          <button
            type="button"
            aria-label={`Close ${TAB_LABELS[type]} tab`}
            onClick={() => handleCloseTab(type)}
            className="mr-2 rounded p-1 opacity-40 group-hover:opacity-100 hover:bg-white/20 hover:opacity-100 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
          {activeTabEffective === type && (
            <span className="absolute bottom-0 left-0 right-0 h-px bg-white pointer-events-none" />
          )}
        </div>
      ))}

      {unopened.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 ml-1 text-white/40 hover:text-white hover:bg-white/5"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="bg-neutral-900 border-white/10"
          >
            {unopened.map((type) => (
              <DropdownMenuItem
                key={type}
                onClick={() => openTab(type)}
                className="text-white/80 hover:text-white focus:text-white focus:bg-white/10 cursor-pointer"
              >
                {TAB_LABELS[type]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
