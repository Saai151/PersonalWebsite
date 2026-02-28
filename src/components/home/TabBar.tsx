import { useMemo } from 'react';
import { X, Plus } from 'lucide-react';
import { useTabStore } from '@/stores/tabStore';
import { TAB_LABELS, getUnopenedTabTypes } from '@/domain/tabs';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

export default function TabBar() {
  const tabs = useTabStore((s) => s.tabs);
  const activeTab = useTabStore((s) => s.activeTab);
  const setActiveTab = useTabStore((s) => s.setActiveTab);
  const closeTab = useTabStore((s) => s.closeTab);
  const openTab = useTabStore((s) => s.openTab);
  const unopened = useMemo(() => getUnopenedTabTypes(tabs), [tabs]);

  return (
    <div className="flex items-center border-b border-white/10 bg-black">
      {tabs.map((tab) => (
        <button
          key={tab.type}
          onClick={() => setActiveTab(tab.type)}
          className={cn(
            'group relative flex items-center gap-2 px-4 py-2.5 text-sm transition-colors border-r border-white/10',
            activeTab === tab.type
              ? 'bg-white/10 text-white'
              : 'text-white/50 hover:text-white hover:bg-white/5'
          )}
        >
          <span>{TAB_LABELS[tab.type]}</span>
          <button
            aria-label={`Close ${TAB_LABELS[tab.type]} tab`}
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.type);
            }}
            className="ml-1 rounded p-0.5 opacity-40 group-hover:opacity-100 hover:bg-white/20 transition-opacity"
          >
            <X className="w-3 h-3" />
          </button>
          {activeTab === tab.type && (
            <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />
          )}
        </button>
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
