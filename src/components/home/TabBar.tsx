import { useMemo } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { X, Plus } from 'lucide-react';
import { useTabStore } from '@/stores/tabStore';
import {
  TAB_LABELS,
  TAB_PATHS,
  getUnopenedTabTypesForPath,
  isTabOpen,
  pathToTab,
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
  activeTabEffective: TabType | null;
  onClearDeepLinkedPost: () => void;
};

export default function TabBar({
  activeTabEffective,
  onClearDeepLinkedPost,
}: TabBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const postSlug = searchParams.get('post');

  const pathTab = pathToTab(location.pathname);
  const tabs = useTabStore((s) => s.tabs);
  const closeTab = useTabStore((s) => s.closeTab);
  const openTab = useTabStore((s) => s.openTab);

  const tabTypesToShow = useMemo(() => {
    const types = tabs.map((t) => t.type);
    if (pathTab && !types.includes(pathTab)) types.push(pathTab);
    return types;
  }, [tabs, pathTab]);

  const unopened = useMemo(
    () => getUnopenedTabTypesForPath(tabs, pathTab),
    [tabs, pathTab]
  );

  const isVirtualTab = (type: TabType) =>
    pathTab === type && !isTabOpen(tabs, type);

  const handleSelectTab = (type: TabType) => {
    openTab(type);
    navigate(TAB_PATHS[type]);
  };

  const handleCloseTab = (type: TabType) => {
    if (isVirtualTab(type)) {
      if (type === 'blog' && postSlug) {
        onClearDeepLinkedPost();
        return;
      }
      navigate('/');
      return;
    }
    closeTab(type);
    const { tabs: nextTabs, activeTab: nextActive } = useTabStore.getState();
    if (nextTabs.length === 0) {
      navigate('/');
    } else if (nextActive) {
      navigate(TAB_PATHS[nextActive]);
    }
  };

  const openSectionFromMenu = (type: TabType) => {
    if (pathTab && !isTabOpen(tabs, pathTab)) openTab(pathTab);
    openTab(type);
    navigate(TAB_PATHS[type]);
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
                onClick={() => openSectionFromMenu(type)}
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
