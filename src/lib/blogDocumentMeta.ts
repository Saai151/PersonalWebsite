import type { BlogPost } from '@/data/blogPosts';

const SITE_TITLE = 'Saai Arora - Portfolio';
const SITE_DESCRIPTION =
  'Software engineer & builder. Essays and projects by Saai Arora.';

function ensureMeta(
  selector: string,
  create: () => HTMLElement
): HTMLElement {
  const existing = document.head.querySelector(selector);
  if (existing) return existing as HTMLElement;
  const el = create();
  document.head.appendChild(el);
  return el;
}

function setMetaName(name: string, content: string) {
  const el = ensureMeta(
    `meta[name="${name}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute('name', name);
      return m;
    }
  );
  el.setAttribute('content', content);
}

function setMetaProperty(property: string, content: string) {
  const el = ensureMeta(
    `meta[property="${property}"]`,
    () => {
      const m = document.createElement('meta');
      m.setAttribute('property', property);
      return m;
    }
  );
  el.setAttribute('content', content);
}

function setLinkRel(rel: string, href: string) {
  const el = ensureMeta(
    `link[rel="${rel}"]`,
    () => {
      const l = document.createElement('link');
      l.setAttribute('rel', rel);
      return l;
    }
  );
  el.setAttribute('href', href);
}

/**
 * Updates title + Open Graph / Twitter meta for a blog post.
 * Many crawlers only read the initial HTML; for rich previews everywhere you’d
 * need SSR or prerender. This still helps in-app, some bots, and “Copy link”.
 */
export function applyBlogPostMeta(post: BlogPost, pageUrl: string) {
  const title = `${post.title} | ${SITE_TITLE}`;
  const description = post.excerpt;

  document.title = title;

  setMetaName('description', description);

  setMetaProperty('og:type', 'article');
  setMetaProperty('og:title', post.title);
  setMetaProperty('og:description', description);
  setMetaProperty('og:url', pageUrl);

  setMetaName('twitter:card', 'summary');
  setMetaName('twitter:title', post.title);
  setMetaName('twitter:description', description);

  setLinkRel('canonical', pageUrl);
}

export function resetBlogDocumentMeta(siteUrl: string) {
  document.title = SITE_TITLE;
  setMetaName('description', SITE_DESCRIPTION);
  setMetaProperty('og:type', 'website');
  setMetaProperty('og:title', SITE_TITLE);
  setMetaProperty('og:description', SITE_DESCRIPTION);
  setMetaProperty('og:url', siteUrl);
  setMetaName('twitter:card', 'summary');
  setMetaName('twitter:title', SITE_TITLE);
  setMetaName('twitter:description', SITE_DESCRIPTION);
  setLinkRel('canonical', siteUrl);
}

export { SITE_TITLE, SITE_DESCRIPTION };
