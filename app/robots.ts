import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kkgool.com'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/blog/',
          '/guides/',
          '/gear/',
          '/buying/',
          '/training/',
          '/tactics/',
          '/travel/',
          '/about/',
          '/contact/',
          '/search/',
          '/categories/',
          '/guestbook/'
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/studio/',
          '/_next/',
          '/cdn-cgi/',
          '/blocked/',
          '/confirm/',
          '/newsletters/',
          '*.json',
          '/*?*', // 阻止带查询参数的URL被索引
        ],
        crawlDelay: 1, // 1秒延迟，对搜索引擎友好
      },
      // 对Googlebot更宽松的规则
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/blog/',
          '/guides/',
          '/gear/',
          '/buying/',
          '/training/',
          '/tactics/',
          '/travel/',
          '/about/',
          '/contact/',
          '/search/',
          '/categories/',
          '/guestbook/'
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/studio/',
          '/blocked/',
          '/confirm/',
          '/newsletters/'
        ]
      },
      // 对Bingbot的规则
      {
        userAgent: 'Bingbot',
        allow: [
          '/',
          '/blog/',
          '/guides/',
          '/gear/',
          '/buying/',
          '/training/',
          '/tactics/',
          '/travel/',
          '/about/',
          '/contact/',
          '/search/',
          '/categories/'
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/studio/',
          '/blocked/',
          '/confirm/',
          '/newsletters/'
        ]
      }
    ],
    sitemap: [
      `${baseUrl}/sitemap-index.xml`,
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/image-sitemap.xml`,
      `${baseUrl}/news-sitemap.xml`
    ],
    host: baseUrl
  }
} 