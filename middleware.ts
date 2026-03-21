import { next } from '@vercel/edge';

type BlogMetaEntry = {
  slug: string;
  title: string;
  excerpt: string;
};

function escapeHtmlAttr(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

function escapeTitleText(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
}

export const config = {
  matcher: '/blog/:path*',
};

export default async function middleware(request: Request) {
  const url = new URL(request.url);
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] !== 'blog' || parts.length < 2) {
    return next();
  }

  const slug = decodeURIComponent(parts[1] ?? '');
  if (!slug) {
    return next();
  }

  const metaRes = await fetch(new URL('/blog-meta.json', request.url));
  if (!metaRes.ok) {
    return next();
  }

  let entries: BlogMetaEntry[];
  try {
    entries = (await metaRes.json()) as BlogMetaEntry[];
  } catch {
    return next();
  }

  const post = entries.find((p) => p.slug === slug);
  if (!post) {
    return next();
  }

  const indexRes = await fetch(new URL('/', request.url));
  if (!indexRes.ok) {
    return next();
  }

  let html = await indexRes.text();

  const pageUrl = `${url.origin}${url.pathname}`;
  const description = escapeHtmlAttr(post.excerpt.replace(/\s+/g, ' ').trim());
  const ogTitle = escapeHtmlAttr(post.title);
  const titleText = escapeTitleText(post.title);

  html = html.replace(
    '<title>Saai Arora - Portfolio</title>',
    `<title>${titleText} | Saai Arora - Portfolio</title>`
  );
  html = html.replace(
    '<meta name="description" content="Software engineer &amp; builder. Essays and projects by Saai Arora." />',
    `<meta name="description" content="${description}" />`
  );
  html = html.replace(
    '<meta property="og:type" content="website" />',
    '<meta property="og:type" content="article" />'
  );
  html = html.replace(
    '<meta property="og:title" content="Saai Arora - Portfolio" />',
    `<meta property="og:title" content="${ogTitle}" />`
  );
  html = html.replace(
    '<meta property="og:description" content="Software engineer &amp; builder. Essays and projects by Saai Arora." />',
    `<meta property="og:description" content="${description}" />`
  );
  html = html.replace(
    '<meta name="twitter:title" content="Saai Arora - Portfolio" />',
    `<meta name="twitter:title" content="${ogTitle}" />`
  );
  html = html.replace(
    '<meta name="twitter:description" content="Software engineer &amp; builder. Essays and projects by Saai Arora." />',
    `<meta name="twitter:description" content="${description}" />`
  );

  const extraHead = `    <meta property="og:url" content="${escapeHtmlAttr(pageUrl)}" />
    <link rel="canonical" href="${escapeHtmlAttr(pageUrl)}" />
`;

  html = html.replace(
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:card" content="summary" />
${extraHead}`
  );

  const headers = new Headers(indexRes.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');

  return new Response(html, {
    status: 200,
    headers,
  });
}
