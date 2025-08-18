import { type Post } from '~/sanity/schemas/post'
import { url } from '~/lib'

interface JsonLdProps {
  type: 'Article' | 'BreadcrumbList'
  data: Post | string[]
}

export function JsonLd({ type, data }: JsonLdProps) {
  const jsonLd = generateJsonLd(type, data)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

function generateJsonLd(type: string, data: any) {
  switch (type) {
    case 'Article':
      return generateArticleJsonLd(data as Post)
    case 'BreadcrumbList':
      return generateBreadcrumbJsonLd(data as string[])
    default:
      return {}
  }
}

function generateArticleJsonLd(post: Post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.mainImage?.asset?.url,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'Kkgool Team',
      url: url('/about').href
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kkgool',
      logo: {
        '@type': 'ImageObject',
        url: url('/logo.png').href
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url(`/blog/${post.slug}`).href
    },
    keywords: post.categories?.join(','),
    articleSection: post.categories?.[0],
    wordCount: post.readingTime
  }
}

function generateBreadcrumbJsonLd(items: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item,
      item: url(index === 0 ? '/' : `/${items.slice(0, index + 1).join('/')}`).href
    }))
  }
} 