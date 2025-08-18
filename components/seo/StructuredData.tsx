import Script from 'next/script'
import { SEOTools } from '~/lib/seo-tools'

interface StructuredDataProps {
  type: 'WebSite' | 'Article' | 'Product' | 'Organization' | 'BreadcrumbList'
  data: any
}

export function StructuredData({ type, data }: StructuredDataProps) {
  let structuredData

  if (type === 'BreadcrumbList') {
    structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: data.items.map((item: any, index: number) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    }
  } else {
    structuredData = SEOTools.generateStructuredData(type, data)
  }

  return (
    <Script
      id={`structured-data-${type.toLowerCase()}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

// 预设的结构化数据组件
export function WebSiteStructuredData({ 
  name = 'Kkgool',
  url = 'https://kkgool.com',
  description = 'Expert sports gear reviews and guides'
}: {
  name?: string
  url?: string
  description?: string
}) {
  return (
    <StructuredData
      type="WebSite"
      data={{ name, url, description }}
    />
  )
}

export function ArticleStructuredData({
  title,
  description,
  image,
  url,
  publishedAt,
  updatedAt,
  baseUrl = 'https://kkgool.com'
}: {
  title: string
  description: string
  image: string
  url: string
  publishedAt: string
  updatedAt?: string
  baseUrl?: string
}) {
  return (
    <StructuredData
      type="Article"
      data={{ title, description, image, url, publishedAt, updatedAt, baseUrl }}
    />
  )
}

export function ProductStructuredData({
  name,
  description,
  images,
  brand,
  category,
  price,
  currency = 'USD',
  url,
  rating
}: {
  name: string
  description: string
  images: string[]
  brand: string
  category: string
  price?: number
  currency?: string
  url: string
  rating?: { average: number; count: number }
}) {
  return (
    <StructuredData
      type="Product"
      data={{ name, description, images, brand, category, price, currency, url, rating }}
    />
  )
}

export function OrganizationStructuredData({
  name = 'Kkgool',
  url = 'https://kkgool.com',
  description = 'Your trusted source for sports equipment reviews and buying guides',
  socialMedia = []
}: {
  name?: string
  url?: string
  description?: string
  socialMedia?: string[]
}) {
  return (
    <StructuredData
      type="Organization"
      data={{ name, url, description, socialMedia }}
    />
  )
}

export function BreadcrumbStructuredData({
  items
}: {
  items: Array<{ name: string; url: string }>
}) {
  return (
    <StructuredData
      type="BreadcrumbList"
      data={{ items }}
    />
  )
}