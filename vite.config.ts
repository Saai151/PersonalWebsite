import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { blogPosts } from './src/data/blogPosts.ts'

function blogMetaPlugin(): Plugin {
  const meta = JSON.stringify(
    blogPosts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
    }))
  )
  return {
    name: 'blog-meta',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.split('?')[0] === '/blog-meta.json') {
          res.setHeader('Content-Type', 'application/json')
          res.end(meta)
          return
        }
        next()
      })
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'blog-meta.json',
        source: meta,
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), blogMetaPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
