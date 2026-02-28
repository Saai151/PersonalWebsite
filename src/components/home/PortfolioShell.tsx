import { useTabStore } from '@/stores/tabStore';
import HomeView from './HomeView';
import TabBar from './TabBar';
import TabContent from './TabContent';

export default function PortfolioShell() {
  const hasTabs = useTabStore((s) => s.tabs.length > 0);

  if (!hasTabs) {
    return <HomeView />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <TabBar />
      <div className="flex-1 overflow-y-auto">
        <TabContent />
      </div>
    </div>
  );
}
