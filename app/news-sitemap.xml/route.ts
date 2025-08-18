import { getLatestBlogPosts } from '~/sanity/queries'
import { redis } from '~/lib/redis'
import { url } from '~/lib'

const CACHE_KEY = 'news-sitemap:cache'
const CACHE_TTL = 1800 // 30分钟缓存，新闻内容更新频繁

export async function GET() {
  try {
    // 尝试从缓存获取
    const cached = await redis.get(CACHE_KEY)
    if (cached && typeof cached === 'string') {
      return new Response(cached, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=1800'
        }
      })
    }

    // 获取最近的博客文章（Google News 建议只包含最近48小时的内容）
    const posts = await getLatestBlogPosts({ 
      limit: 100,
      forDisplay: false 
    })

    // 过滤最近48小时的内容
    const recentPosts = posts?.filter(post => {
      const publishDate = new Date(post.publishedAt || post._createdAt)
      const now = new Date()
      const hoursAgo = 48
      const cutoff = new Date(now.getTime() - (hoursAgo * 60 * 60 * 1000))
      return publishDate >= cutoff
    }) || []

    // 生成新闻站点地图
    const xml = generateNewsSitemap(recentPosts)

    // 存入缓存
    await redis.setex(CACHE_KEY, CACHE_TTL, xml)

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=1800'
      }
    })
  } catch (error) {
    console.error('[News Sitemap] Generation failed:', error)
    return new Response('Error generating news sitemap', { status: 500 })
  }
}

function generateNewsSitemap(posts: any[]) {
  const urlset = posts
    .map(post => {
      const loc = url(`/blog/${post.slug}`).href
      const publishDate = new Date(post.publishedAt || post._createdAt)
      const formattedDate = publishDate.toISOString()
      
      // 确定文章类型
      const newsType = post.categories?.[0]?.title || 'Sports'
      
      return `
        <url>
          <loc>${loc}</loc>
          <news:news>
            <news:publication>
              <news:name>Kkgool</news:name>
              <news:language>en</news:language>
            </news:publication>
            <news:publication_date>${formattedDate}</news:publication_date>
            <news:title>${escapeXml(post.title)}</news:title>
            <news:keywords>${escapeXml(generateKeywords(post))}</news:keywords>
            <news:stock_tickers></news:stock_tickers>
          </news:news>
          <lastmod>${formattedDate}</lastmod>
          <changefreq>hourly</changefreq>
          <priority>0.9</priority>
        </url>
      `
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${urlset}
    </urlset>`
}

function generateKeywords(post: any): string {
  const keywords = []
  
  // 从分类中提取关键词
  if (post.categories) {
    keywords.push(...post.categories.map((cat: any) => cat.title))
  }
  
  // 从标签中提取关键词
  if (post.tags) {
    keywords.push(...post.tags)
  }
  
  // 添加默认的体育相关关键词
  keywords.push('sports', 'gear', 'equipment', 'review', 'guide')
  
  // 去重并限制在10个关键词内
  const uniqueKeywords = [...new Set(keywords)].slice(0, 10)
  
  return uniqueKeywords.join(', ')
}

function escapeXml(unsafe: string) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case '\'': return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}

// 使用边缘运行时以获得更好的性能
export const runtime = 'edge'

// 每30分钟重新验证一次
export const revalidate = 1800