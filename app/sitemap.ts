import { type MetadataRoute } from 'next'
import { url } from '~/lib'
import { redis } from '~/lib/redis'
import { getAllLatestBlogPostSlugs } from '~/sanity/queries'

const CACHE_KEY = 'sitemap:cache'
const CACHE_TTL = 3600 // 1小时缓存

async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  // 静态路由
  const staticRoutes = [
    {
      url: url('/').href,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: url('/blog').href,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: url('/about').href,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: url('/contact').href,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ] satisfies MetadataRoute.Sitemap

  try {
    // 获取所有博客文章
    const blogSlugs = await getAllLatestBlogPostSlugs()

    // 博客文章路由
    const blogRoutes = blogSlugs.map((slug) => ({
      url: url(`/blog/${slug}`).href,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    // 合并所有路由
    return [...staticRoutes, ...blogRoutes]
  } catch (error) {
    console.error('[Sitemap] Failed to fetch blog posts:', error)
    return staticRoutes
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
