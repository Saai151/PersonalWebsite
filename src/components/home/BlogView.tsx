import { PenLine } from 'lucide-react';

export default function BlogView() {
  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
      <PenLine className="w-10 h-10 text-white/20 mb-4" />
      <h2 className="text-3xl font-bold mb-2">Blog</h2>
      <p className="text-white/40">No posts yet. Check back soon.</p>
    </div>
  );
}
