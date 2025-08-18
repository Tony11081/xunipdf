'use client'

// SEO和索引工具
export class SEOTools {
  private static readonly SEARCH_CONSOLE_API = 'https://www.googleapis.com/webmasters/v3'
  private static readonly PING_ENDPOINTS = {
    google: 'https://www.google.com/ping?sitemap=',
    bing: 'https://www.bing.com/ping?sitemap=',
    yandex: 'https://webmaster.yandex.com/ping?sitemap='
  }

  // 提交网站地图到搜索引擎
  static async submitSitemap(sitemapUrl: string): Promise<{
    google: boolean
    bing: boolean
    yandex: boolean
  }> {
    const results = { google: false, bing: false, yandex: false }

    try {
      // 并行提交到各个搜索引擎
      const submissions = await Promise.allSettled([
        this.pingSearchEngine('google', sitemapUrl),
        this.pingSearchEngine('bing', sitemapUrl),
        this.pingSearchEngine('yandex', sitemapUrl)
      ])

      submissions.forEach((result, index) => {
        const engines = ['google', 'bing', 'yandex'] as const
        if (result.status === 'fulfilled') {
          results[engines[index]] = result.value
        }
      })

      console.log('Sitemap submission results:', results)
      return results
    } catch (error) {
      console.error('Failed to submit sitemap:', error)
      return results
    }
  }

  // 向单个搜索引擎提交网站地图
  private static async pingSearchEngine(
    engine: 'google' | 'bing' | 'yandex',
    sitemapUrl: string
  ): Promise<boolean> {
    try {
      const pingUrl = this.PING_ENDPOINTS[engine] + encodeURIComponent(sitemapUrl)
      const response = await fetch(pingUrl, {
        method: 'GET',
        headers: {
          'User-Agent': 'Kkgool Sports Platform SEO Bot'
        }
      })

      return response.ok
    } catch (error) {
      console.error(`Failed to ping ${engine}:`, error)
      return false
    }
  }

  // 请求快速收录（需要Search Console API访问权限）
  static async requestIndexing(urls: string[]): Promise<boolean> {
    try {
      // 这里需要实际的Search Console API密钥
      // 在生产环境中，应该通过服务器端API路由来处理
      console.log('Requesting indexing for URLs:', urls)
      
      // 模拟API调用
      return new Promise(resolve => {
        setTimeout(() => resolve(true), 1000)
      })
    } catch (error) {
      console.error('Failed to request indexing:', error)
      return false
    }
  }

  // 生成结构化数据
  static generateStructuredData(type: 'WebSite' | 'Article' | 'Product' | 'Organization', data: any) {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type
    }

    switch (type) {
      case 'WebSite':
        return {
          ...baseData,
          name: data.name || 'Kkgool',
          url: data.url || 'https://kkgool.com',
          description: data.description || 'Expert sports gear reviews and guides',
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${data.url || 'https://kkgool.com'}/search?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
          }
        }

      case 'Article':
        return {
          ...baseData,
          headline: data.title,
          description: data.description,
          image: data.image,
          author: {
            '@type': 'Organization',
            name: 'Kkgool Team'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Kkgool',
            logo: {
              '@type': 'ImageObject',
              url: `${data.baseUrl || 'https://kkgool.com'}/og_zh.png`
            }
          },
          datePublished: data.publishedAt,
          dateModified: data.updatedAt || data.publishedAt,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': data.url
          }
        }

      case 'Product':
        return {
          ...baseData,
          name: data.name,
          description: data.description,
          image: data.images,
          brand: {
            '@type': 'Brand',
            name: data.brand
          },
          category: data.category,
          offers: {
            '@type': 'Offer',
            price: data.price,
            priceCurrency: data.currency || 'USD',
            availability: 'https://schema.org/InStock',
            url: data.url
          },
          aggregateRating: data.rating ? {
            '@type': 'AggregateRating',
            ratingValue: data.rating.average,
            reviewCount: data.rating.count
          } : undefined
        }

      case 'Organization':
        return {
          ...baseData,
          name: data.name || 'Kkgool',
          url: data.url || 'https://kkgool.com',
          description: data.description || 'Your trusted source for sports equipment reviews and buying guides',
          logo: `${data.url || 'https://kkgool.com'}/og_zh.png`,
          sameAs: data.socialMedia || [],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: ['en', 'zh']
          }
        }

      default:
        return baseData
    }
  }

  // 检查页面SEO分数
  static analyzePage(pageData: {
    title?: string
    description?: string
    headings?: string[]
    content?: string
    images?: Array<{ alt?: string; src: string }>
    links?: Array<{ href: string; text: string }>
  }) {
    const issues: string[] = []
    const recommendations: string[] = []
    let score = 100

    // 检查标题
    if (!pageData.title) {
      issues.push('Missing page title')
      score -= 15
    } else if (pageData.title.length > 60) {
      recommendations.push('Title is too long (over 60 characters)')
      score -= 5
    } else if (pageData.title.length < 30) {
      recommendations.push('Title is too short (under 30 characters)')
      score -= 3
    }

    // 检查描述
    if (!pageData.description) {
      issues.push('Missing meta description')
      score -= 10
    } else if (pageData.description.length > 160) {
      recommendations.push('Meta description is too long (over 160 characters)')
      score -= 5
    } else if (pageData.description.length < 120) {
      recommendations.push('Meta description is too short (under 120 characters)')
      score -= 3
    }

    // 检查标题层次
    if (!pageData.headings || pageData.headings.length === 0) {
      issues.push('No headings found')
      score -= 10
    }

    // 检查图片alt文本
    if (pageData.images) {
      const imagesWithoutAlt = pageData.images.filter(img => !img.alt || img.alt.trim() === '')
      if (imagesWithoutAlt.length > 0) {
        issues.push(`${imagesWithoutAlt.length} images missing alt text`)
        score -= Math.min(imagesWithoutAlt.length * 2, 10)
      }
    }

    // 检查内容长度
    if (pageData.content && pageData.content.length < 300) {
      recommendations.push('Content is quite short, consider adding more valuable information')
      score -= 5
    }

    return {
      score: Math.max(score, 0),
      issues,
      recommendations,
      grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F'
    }
  }

  // 自动提交最新内容
  static async autoSubmitNewContent(baseUrl: string) {
    try {
      const sitemaps = [
        `${baseUrl}/sitemap.xml`,
        `${baseUrl}/news-sitemap.xml`,
        `${baseUrl}/image-sitemap.xml`
      ]

      const results = await Promise.all(
        sitemaps.map(sitemap => this.submitSitemap(sitemap))
      )

      console.log('Auto-submission completed:', results)
      return results
    } catch (error) {
      console.error('Auto-submission failed:', error)
      return []
    }
  }
}

// React Hook for SEO tools
export function useSEOTools() {
  const submitSitemap = async (sitemapUrl: string) => {
    return SEOTools.submitSitemap(sitemapUrl)
  }

  const requestIndexing = async (urls: string[]) => {
    return SEOTools.requestIndexing(urls)
  }

  const analyzePage = (pageData: Parameters<typeof SEOTools.analyzePage>[0]) => {
    return SEOTools.analyzePage(pageData)
  }

  return {
    submitSitemap,
    requestIndexing,
    analyzePage,
    generateStructuredData: SEOTools.generateStructuredData
  }
}