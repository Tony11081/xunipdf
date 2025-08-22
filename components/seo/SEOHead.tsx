import { Metadata } from 'next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  section?: string
  tags?: string[]
}

const defaultSEO = {
  title: 'Premium Digital Resources & Templates Marketplace',
  description: 'Discover premium digital resources, templates, and creative assets for your projects. Instant download, commercial license included.',
  keywords: ['digital templates', 'design resources', 'creative assets', 'business templates', 'graphics download'],
  image: '/og_zh.png',
  type: 'website' as const,
  author: 'Digital Resources Team'
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = []
}: SEOProps = {}): Metadata {
  const seoTitle = title 
    ? `${title} | ${defaultSEO.title.split(' - ')[0]}`
    : defaultSEO.title

  const seoDescription = description || defaultSEO.description
  const seoImage = image || defaultSEO.image
  const seoKeywords = [...defaultSEO.keywords, ...keywords, ...tags].join(', ')
  const seoAuthor = author || defaultSEO.author

  // Construct full URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tarotdeck.online'
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl
  const fullImageUrl = seoImage.startsWith('http') ? seoImage : `${baseUrl}${seoImage}`

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    authors: [{ name: seoAuthor }],
    creator: seoAuthor,
    publisher: defaultSEO.title.split(' - ')[0],
    
    // Open Graph
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: fullUrl,
      siteName: defaultSEO.title.split(' - ')[0],
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: seoTitle,
        }
      ],
      locale: 'en_US',
      type: type === 'product' ? 'website' : type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
      ...(section && { section }),
      ...(tags.length > 0 && { tags }),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [fullImageUrl],
      creator: '@tarotdeck_online',
      site: '@tarotdeck_online',
    },

    // Additional metadata
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Icons
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/android-chrome-192x192.png',
    },

    // Manifest
    manifest: '/site.webmanifest',

    // Verification
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },

    // Alternate languages
    alternates: {
      canonical: fullUrl,
      languages: {
        'en-US': fullUrl,
        'x-default': fullUrl,
      },
    },

    // Category for articles
    ...(type === 'article' && section && { category: section }),
  }

  return metadata
}

// Pre-defined metadata for common pages
export const seoPresets = {
  home: (): Metadata => generateSEOMetadata({
    title: 'Premium Digital Resources & Templates',
    description: 'Discover premium digital templates, graphics, and creative resources for your business and personal projects.',
    keywords: ['digital templates', 'design resources', 'creative assets', 'business templates'],
    url: '/',
  }),

  templates: (): Metadata => generateSEOMetadata({
    title: 'Premium Templates & Design Assets',
    description: 'Professional templates for presentations, branding, and marketing. Download instantly with commercial license included.',
    keywords: ['premium templates', 'design templates', 'business templates', 'presentation templates'],
    url: '/templates',
    section: 'Templates',
  }),

  graphics: (): Metadata => generateSEOMetadata({
    title: 'Graphics & Creative Assets',
    description: 'High-quality graphics, icons, and creative assets for your projects. Multiple formats available for maximum flexibility.',
    keywords: ['graphics download', 'creative assets', 'design graphics', 'digital graphics'],
    url: '/graphics',
    section: 'Graphics',
  }),

  tools: (): Metadata => generateSEOMetadata({
    title: 'Design Tools & Resources',
    description: 'Essential design tools, software recommendations, and workflow optimization resources for creators and professionals.',
    keywords: ['design tools', 'creative software', 'design workflow', 'productivity tools'],
    url: '/tools',
    section: 'Tools',
  }),

  guides: (): Metadata => generateSEOMetadata({
    title: 'Design & Business Guides',
    description: 'Comprehensive guides for design, business, and creative projects. From beginner basics to advanced techniques.',
    keywords: ['design guides', 'business guides', 'creative tutorials', 'professional guidance'],
    url: '/guides',
    section: 'Guides',
  }),

  resources: (): Metadata => generateSEOMetadata({
    title: 'Digital Resources & Assets',
    description: 'Premium digital resources, downloadable assets, and creative tools for modern professionals and creators.',
    keywords: ['digital resources', 'downloadable assets', 'creative tools', 'digital downloads'],
    url: '/resources',
    section: 'Resources',
  }),
}