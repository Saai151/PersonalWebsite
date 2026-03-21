import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  blogPosts,
  blogPostPath,
  getPostBySlug,
  type BlogPost,
} from '@/data/blogPosts';
import {
  applyBlogPostMeta,
  resetBlogDocumentMeta,
} from '@/lib/blogDocumentMeta';

const LEGACY_POST_PARAM = 'post';

function PostArticle({ post, onBack }: { post: BlogPost; onBack: () => void }) {
  return (
    <article className="max-w-2xl mx-auto px-6 md:px-10 py-8 md:py-10">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        All posts
      </button>

      <header className="mb-10">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
          {post.title}
        </h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/45">
          <time dateTime={post.dateSort}>{post.date}</time>
          <span className="text-white/25">·</span>
          <span>Saai Arora</span>
          {post.sourceUrl && (
            <>
              <span className="text-white/25">·</span>
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-white/55 hover:text-white transition-colors"
              >
                Originally on X
                <ExternalLink className="w-3 h-3 opacity-70" aria-hidden />
              </a>
            </>
          )}
        </div>
      </header>

      <div className="space-y-5 text-white/75 text-[15px] md:text-base leading-[1.75]">
        {post.paragraphs.map((p, i) => {
          const isShort = p.length < 90 && !p.includes('.');
          return (
            <p
              key={i}
              className={
                isShort
                  ? 'font-medium text-white/90 tracking-wide'
                  : undefined
              }
            >
              {p}
            </p>
          );
        })}
      </div>
    </article>
  );
}

export default function BlogView() {
  const navigate = useNavigate();
  const { slug: pathSlug } = useParams();
  const [searchParams] = useSearchParams();
  const legacySlug = searchParams.get(LEGACY_POST_PARAM);

  const slugFromUrl = pathSlug ?? legacySlug ?? undefined;

  const activePost = useMemo(
    () => (slugFromUrl ? getPostBySlug(slugFromUrl) : undefined),
    [slugFromUrl]
  );

  useEffect(() => {
    const origin = window.location.origin;
    if (activePost) {
      const pageUrl = `${origin}${window.location.pathname}${window.location.search}`;
      applyBlogPostMeta(activePost, pageUrl);
      return () => {
        resetBlogDocumentMeta(`${origin}/blog`);
      };
    }
    resetBlogDocumentMeta(`${origin}/blog`);
  }, [activePost]);

  if (slugFromUrl && !activePost) {
    return <Navigate to="/blog" replace />;
  }

  const openPost = (slug: string) => {
    navigate(blogPostPath(slug));
  };

  const closePost = () => {
    navigate('/blog');
  };

  if (activePost) {
    return <PostArticle post={activePost} onBack={closePost} />;
  }

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto pb-16">
      <header className="mb-10">
        <h2 className="text-3xl font-bold text-white tracking-tight">Blog</h2>
        <p className="mt-2 text-white/45 text-sm max-w-xl leading-relaxed">
          Essays and threads, collected here. Some first appeared on{' '}
          <a
            href="https://x.com/SaaiArora"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white underline-offset-4 hover:underline"
          >
            X
          </a>
          .
        </p>
      </header>

      <ul className="space-y-4">
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <button
              type="button"
              onClick={() => openPost(post.slug)}
              className="w-full text-left rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              <Card className="bg-white/5 border-white/10 hover:border-white/25 transition-colors cursor-pointer h-full">
                <CardHeader className="pb-2 pt-5 px-5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold text-white leading-snug pr-2">
                      {post.title}
                    </h3>
                    <time
                      dateTime={post.dateSort}
                      className="text-white/35 text-xs shrink-0 tabular-nums pt-1"
                    >
                      {post.date}
                    </time>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-5 pb-5">
                  <p className="text-white/60 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
