import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { blogPostPath, getPostBySlug } from '@/data/blogPosts';
import { pathToTab, type TabType } from '@/domain/tabs';
import { useTabStore } from '@/stores/tabStore';
import HomeView from './HomeView';
import TabBar from './TabBar';
import TabContent from './TabContent';

export default function PortfolioShell() {
  const tabs = useTabStore((s) => s.tabs);
  const activeTab = useTabStore((s) => s.activeTab);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const pathTab = pathToTab(location.pathname);

  const showChrome =
    location.pathname !== '/' &&
    (pathTab !== null || tabs.length > 0);

  const effectiveActiveTab: TabType | null = pathTab ?? activeTab;

  const legacyPost = searchParams.get('post');
  if (location.pathname === '/blog' && legacyPost && getPostBySlug(legacyPost)) {
    return (
      <Navigate to={blogPostPath(legacyPost)} replace />
    );
  }
  if (location.pathname === '/' && legacyPost && getPostBySlug(legacyPost)) {
    return (
      <Navigate to={blogPostPath(legacyPost)} replace />
    );
  }

  const navigateToBlogList = () => navigate('/blog');

  if (!showChrome) {
    return <HomeView />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <TabBar
        activeTabEffective={effectiveActiveTab}
        onNavigateToBlogList={navigateToBlogList}
      />
      <div className="flex-1 overflow-y-auto">
        <TabContent activeTabEffective={effectiveActiveTab} />
      </div>
    </div>
  );
}
