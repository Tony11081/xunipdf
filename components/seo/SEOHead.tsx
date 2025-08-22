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
  title: 'TarotDeck Online - Premium Digital Tarot Resources',
  description: 'Discover premium digital tarot resources, card meanings, and spiritual guidance tools for modern seekers and practitioners.',
  keywords: ['tarot cards', 'digital readings', 'card meanings', 'spiritual guidance', 'oracle cards'],
  image: '/og_zh.png',
  type: 'website' as const,
  author: 'TarotDeck Online Team'
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
    title: 'Premium Digital Tarot Resources & Readings',
    description: 'Discover your spiritual path with premium digital tarot resources, card meanings, and guidance tools for modern practitioners.',
    keywords: ['tarot resources', 'digital readings', 'card meanings', 'spiritual guidance'],
    url: '/',
  }),

  readings: (): Metadata => generateSEOMetadata({
    title: 'Tarot Readings & Interpretations',
    description: 'Comprehensive tarot reading guides and card interpretations. Learn to read tarot cards with expert guidance and spiritual wisdom.',
    keywords: ['tarot readings', 'card interpretations', 'tarot guidance', 'spiritual readings'],
    url: '/readings',
    section: 'Readings',
  }),

  spreads: (): Metadata => generateSEOMetadata({
    title: 'Tarot Spreads & Layouts',
    description: 'Discover powerful tarot spreads for every situation. From simple three-card spreads to complex Celtic Cross layouts.',
    keywords: ['tarot spreads', 'card layouts', 'tarot patterns', 'divination spreads'],
    url: '/spreads',
    section: 'Spreads',
  }),

  meanings: (): Metadata => generateSEOMetadata({
    title: 'Tarot Card Meanings & Symbolism',
    description: 'Deep dive into tarot card meanings, symbolism, and spiritual significance. Master the language of the cards.',
    keywords: ['tarot meanings', 'card symbolism', 'tarot interpretation', 'spiritual symbolism'],
    url: '/meanings',
    section: 'Meanings',
  }),

  guides: (): Metadata => generateSEOMetadata({
    title: 'Tarot Learning Guides',
    description: 'Comprehensive guides for learning tarot reading, from beginner basics to advanced techniques and spiritual practices.',
    keywords: ['tarot guides', 'learning tarot', 'tarot tutorials', 'spiritual guidance'],
    url: '/guides',
    section: 'Guides',
  }),

  resources: (): Metadata => generateSEOMetadata({
    title: 'Digital Tarot Resources',
    description: 'Premium digital tarot resources, printable cards, and spiritual tools for modern practitioners and seekers.',
    keywords: ['tarot resources', 'digital cards', 'spiritual tools', 'tarot downloads'],
    url: '/resources',
    section: 'Resources',
  }),
}