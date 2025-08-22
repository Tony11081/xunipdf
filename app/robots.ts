import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tarotdeck.online'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/blog/',
          '/store/',
          '/projects/',
          '/about/',
          '/contact/',
          '/guestbook/',
          '/ama/',
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
          '/(auth)/',
          '/sign-in/',
          '/sign-up/',
          '/*/shop',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: [
          '/',
          '/blog/',
          '/store/',
          '/projects/',
          '/about/',
          '/contact/',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/studio/',
          '/guestbook/',
          '/ama/',
          '/newsletters/',
        ],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}