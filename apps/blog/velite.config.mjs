import { defineConfig, s } from 'velite'

export default defineConfig({
  root: 'src/content', 
  collections: {
    posts: {
      name: 'Post',
      pattern: 'posts/**/*.mdx',
      schema: s
        .object({
          title: s.string().max(99),
          slug: s.path().transform((path) => path.split('/')[2]),
          category: s.path().transform((path) => path.split('/')[1]),
          date: s.isodate(),
          cover: s.image().optional(),
          metadata: s.metadata(),
          excerpt: s.excerpt(),
          content: s.mdx(),
          tags: s.array(s.string()).default([]),
        })
        .transform(data => ({ ...data, permalink: `/blog/${data.slug}` }))
    },
  }
})