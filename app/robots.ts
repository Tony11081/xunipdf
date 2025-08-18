import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: [
        '/',
        '/blog',
        '/guides',
        '/gear',
        '/buying',
        '/training',
        '/tactics',
        '/travel',
        '/about',
        '/contact'
      ],
      disallow: [
        '/api/',
        '/admin/',
        '/studio/',
        '/_next/',
        '/cdn-cgi/',
      ],
    },
    sitemap: 'https://kkgool.cc/sitemap.xml',
  }
} 