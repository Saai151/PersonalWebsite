import type { TabType } from '@/domain/tabs';
import InternshipsView from './InternshipsView';
import ProjectsView from './ProjectsView';
import BlogView from './BlogView';

type TabContentProps = {
  activeTabEffective: TabType | null;
};

export default function TabContent({ activeTabEffective }: TabContentProps) {
  switch (activeTabEffective) {
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
