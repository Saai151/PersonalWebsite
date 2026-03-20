import {
  Navigate,
  useLocation,
  useSearchParams,
} from 'react-router-dom';
import { getPostBySlug } from '@/data/blogPosts';
import { pathToTab, type TabType } from '@/domain/tabs';
import { useTabStore } from '@/stores/tabStore';
import HomeView from './HomeView';
import TabBar from './TabBar';
import TabContent from './TabContent';

export default function PortfolioShell() {
  const tabs = useTabStore((s) => s.tabs);
  const activeTab = useTabStore((s) => s.activeTab);

  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const pathTab = pathToTab(location.pathname);

  const showChrome =
    location.pathname !== '/' &&
    (pathTab !== null || tabs.length > 0);

  const effectiveActiveTab: TabType | null = pathTab ?? activeTab;

  const legacyPost = searchParams.get('post');
  if (location.pathname === '/' && legacyPost && getPostBySlug(legacyPost)) {
    return (
      <Navigate
        to={`/blog?post=${encodeURIComponent(legacyPost)}`}
        replace
      />
    );
  }

  const clearPostFromUrl = () => {
    setSearchParams(
      (prev: URLSearchParams) => {
        const next = new URLSearchParams(prev);
        next.delete('post');
        return next;
      },
      { replace: true }
    );
  };

  if (!showChrome) {
    return <HomeView />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <TabBar
        activeTabEffective={effectiveActiveTab}
        onClearDeepLinkedPost={clearPostFromUrl}
      />
      <div className="flex-1 overflow-y-auto">
        <TabContent activeTabEffective={effectiveActiveTab} />
      </div>
    </div>
  );
}
