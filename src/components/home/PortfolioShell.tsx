import { useSearchParams } from 'react-router-dom';
import { getPostBySlug } from '@/data/blogPosts';
import { isTabOpen, type TabType } from '@/domain/tabs';
import { useTabStore } from '@/stores/tabStore';
import HomeView from './HomeView';
import TabBar from './TabBar';
import TabContent from './TabContent';

export default function PortfolioShell() {
  const tabs = useTabStore((s) => s.tabs);
  const activeTab = useTabStore((s) => s.activeTab);
  const [searchParams, setSearchParams] = useSearchParams();

  const postSlug = searchParams.get('post');
  const urlWantsBlog = Boolean(postSlug && getPostBySlug(postSlug));

  const augmentBlogTab = urlWantsBlog && !isTabOpen(tabs, 'blog');
  const showChrome = tabs.length > 0 || urlWantsBlog;
  const effectiveActiveTab: TabType | null =
    activeTab ?? (urlWantsBlog ? 'blog' : null);

  const clearPostFromUrl = () => {
    setSearchParams(
      (prev) => {
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
        augmentBlogTab={augmentBlogTab}
        activeTabEffective={effectiveActiveTab}
        onClearDeepLinkedPost={clearPostFromUrl}
      />
      <div className="flex-1 overflow-y-auto">
        <TabContent activeTabEffective={effectiveActiveTab} />
      </div>
    </div>
  );
}
