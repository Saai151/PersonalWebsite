import { useTabStore } from '@/stores/tabStore';
import InternshipsView from './InternshipsView';
import ProjectsView from './ProjectsView';
import BlogView from './BlogView';

export default function TabContent() {
  const activeTab = useTabStore((s) => s.activeTab);

  switch (activeTab) {
    case 'internships':
      return <InternshipsView />;
    case 'projects':
      return <ProjectsView />;
    case 'blog':
      return <BlogView />;
    default:
      return null;
  }
}
