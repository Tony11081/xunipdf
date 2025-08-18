import { type MetadataRoute } from 'next'
import { url } from '~/lib'
import { redis } from '~/lib/redis'
import { getAllLatestBlogPostSlugs } from '~/sanity/queries'

const CACHE_KEY = 'sitemap:cache'
const CACHE_TTL = 3600 // 1小时缓存

async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  // 主要静态路由 - 高优先级
  const mainRoutes = [
    {
      url: url('/').href,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: url('/gear').href,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: url('/guides').href,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: url('/training').href,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: url('/tactics').href,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: url('/buying').href,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: url('/travel').href,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ] satisfies MetadataRoute.Sitemap

  // 博客和内容路由
  const contentRoutes = [
    {
      url: url('/blog').href,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
  ] satisfies MetadataRoute.Sitemap

  // 其他页面路由 - 中等优先级
  const secondaryRoutes = [
    {
      url: url('/about').href,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: url('/contact').href,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: url('/search').href,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    {
      url: url('/guestbook').href,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.4,
    },
  ] satisfies MetadataRoute.Sitemap

  // 分类页面路由
  const categoryRoutes = [
    'gear', 'buying', 'training', 'tactics', 'travel'
  ].map(category => ({
    url: url(`/categories/${category}`).href,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  })) satisfies MetadataRoute.Sitemap

  try {
    // 获取所有博客文章
    const blogSlugs = await getAllLatestBlogPostSlugs()

    // 博客文章路由
    const blogRoutes = blogSlugs.map((slug) => ({
      url: url(`/blog/${slug}`).href,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })) satisfies MetadataRoute.Sitemap

    // 指南页面路由（模拟数据 - 实际应从CMS获取）
    const guideRoutes = [
      'soccer-cleat-buying-guide-2024',
      'how-to-spot-fake-jerseys',
      'jersey-care-washing-guide',
      'running-shoe-sizing-guide',
      'injury-prevention-weekend-warriors',
      'understanding-football-formations'
    ].map(slug => ({
      url: url(`/guides/${slug}`).href,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })) satisfies MetadataRoute.Sitemap

    // 合并所有路由
    return [
      ...mainRoutes,
      ...contentRoutes, 
      ...categoryRoutes,
      ...blogRoutes,
      ...guideRoutes,
      ...secondaryRoutes
    ]
  } catch (error) {
    console.error('[Sitemap] Failed to fetch content:', error)
    return [...mainRoutes, ...contentRoutes, ...secondaryRoutes]
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // 尝试从缓存获取
    const cached = await redis.get(CACHE_KEY)
    if (cached && typeof cached === 'string') {
      try {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed)) {
          return parsed as MetadataRoute.Sitemap
        }
      } catch (e) {
        console.error('[Sitemap] Failed to parse cache:', e)
      }
    }
    
    // 生成新的sitemap
    const routes = await generateSitemap()
    
    // 存入缓存
    await redis.setex(CACHE_KEY, CACHE_TTL, JSON.stringify(routes))
    
    return routes
  } catch (error) {
    console.error('[Sitemap] Generation failed:', error)
    // 发生错误时返回静态路由
    return [
      {
        url: url('/').href,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      }
    ]
  }
}

// 使用边缘运行时以获得更好的性能
export const runtime = 'edge'

// 每小时重新验证一次
export const revalidate = 3600