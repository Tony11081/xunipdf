import { getLatestBlogPosts } from '~/sanity/queries'
import { redis } from '~/lib/redis'
import { url } from '~/lib'

const CACHE_KEY = 'image-sitemap:cache'
const CACHE_TTL = 3600 // 1小时缓存

export async function GET() {
  try {
    // 尝试从缓存获取
    const cached = await redis.get(CACHE_KEY)
    if (cached && typeof cached === 'string') {
      return new Response(cached, {
        headers: {
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600'
        }
      })
    }

    // 获取所有带图片的博客文章
    const posts = await getLatestBlogPosts({ 
      limit: 1000,
      forDisplay: false 
    })

    // 生成图片站点地图
    const xml = generateImageSitemap(posts || [])

    // 存入缓存
    await redis.setex(CACHE_KEY, CACHE_TTL, xml)

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    })
  } catch (error) {
    console.error('[Image Sitemap] Generation failed:', error)
    return new Response('Error generating image sitemap', { status: 500 })
  }
}

function generateImageSitemap(posts: any[]) {
  // 博客文章图片
  const blogImages = posts
    .filter(post => post.mainImage?.asset?.url)
    .map(post => {
      const loc = url(`/blog/${post.slug}`).href
      const imageUrl = post.mainImage.asset.url
      
      return `
        <url>
          <loc>${loc}</loc>
          <image:image>
            <image:loc>${imageUrl}</image:loc>
            <image:title>${escapeXml(post.title)}</image:title>
            <image:caption>${escapeXml(post.description || '')}</image:caption>
          </image:image>
        </url>
      `
    })
    .join('')

  // 静态图片（OG图片、头像等）
  const staticImages = [
    {
      loc: url('/').href,
      imageUrl: url('/og_zh.png').href,
      title: 'Kkgool - Expert Sports Gear Reviews & Guides',
      caption: 'Your trusted source for sports equipment reviews and buying guides'
    },
    {
      loc: url('/gear').href,
      imageUrl: url('/og_zh.png').href,
      title: 'Sports Gear Reviews & Recommendations',
      caption: 'In-depth reviews of sports equipment and gear'
    },
    {
      loc: url('/guides').href,
      imageUrl: url('/og_zh.png').href,
      title: 'Sports & Training Guides',
      caption: 'Comprehensive guides for sports and training'
    }
  ].map(item => `
    <url>
      <loc>${item.loc}</loc>
      <image:image>
        <image:loc>${item.imageUrl}</image:loc>
        <image:title>${escapeXml(item.title)}</image:title>
        <image:caption>${escapeXml(item.caption)}</image:caption>
      </image:image>
    </url>
  `).join('')

  const urlset = blogImages + staticImages

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
      ${urlset}
    </urlset>`
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

// 每小时重新验证一次
export const revalidate = 3600 