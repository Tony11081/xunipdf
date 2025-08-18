import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { get } from '@vercel/edge-config'
import { getIP } from '~/lib/ip'
import { redis } from '~/lib/redis'
import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import countries from '~/lib/countries.json'
import { getAuth } from '@clerk/nextjs/server'
import { SeoMiddleware } from './middleware/seo'

export const config = {
  matcher: ['/((?!_next|studio|.*\\..*).*)'],
}

// 规范化URL
function normalizeURL(url: string) {
  return url
    .toLowerCase()
    .replace(/\/$/, '') // 移除尾部斜杠
    .replace(/([^:]\/)\/+/g, '$1') // 移除重复斜杠
}

// 扩展公开路径列表
const PUBLIC_PATHS = [
  '/', 
  '/sitemap.xml', 
  '/robots.txt', 
  '/favicon.ico',
  '/blog',
  '/guides',
  '/stores',
  '/how-to-buy',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/categories',
  // 动态路由前缀
  '/blog/',
  '/guides/',
  '/stores/',
  '/categories/',
  // API路径
  '/api/public',
  '/api/blog',
  '/api/guides',
  '/api/stores'
]

export async function middleware(request: NextRequest) {
  const { nextUrl } = request
  const normalizedPath = normalizeURL(nextUrl.pathname)
  const isApi = normalizedPath.startsWith('/api/')
  
  // 增强爬虫检测
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || ''
  const isBot = /googlebot|bingbot|baiduspider|yandex|sogou/i.test(userAgent)
  
  // 首先应用SEO中间件
  if (!isApi) {
    const seoResponse = await SeoMiddleware(request)
    if (seoResponse.status !== 200) {
      return seoResponse
    }
  }
  
  // 放行搜索引擎爬虫
  if (isBot) {
    const response = NextResponse.next()
    // 为爬虫添加特殊响应头
    response.headers.set('X-Robots-Tag', 'index,follow,max-snippet:-1,max-image-preview:large')
    response.headers.set('Cache-Control', 'public, max-age=3600, stale-while-revalidate=86400')
    return response
  }
  
  // 检查是否为公开路径
  const isPublicPath = PUBLIC_PATHS.some(path => 
    normalizedPath === path || 
    normalizedPath.startsWith(path) ||
    /^\/(?:blog|guides|stores|categories)\/[\w-]+$/.test(normalizedPath)
  )
  
  if (isPublicPath) {
    return handlePublicRoute(request)
  }
  
  // API鉴权检查
  if (isApi && !normalizedPath.startsWith('/api/public')) {
    const authResult = await handleAuthCheck(request)
    if (authResult) return authResult
  }
  
  return NextResponse.next()
}

// 处理公开路由的中间件逻辑（IP阻止和地理信息收集）
async function handlePublicRoute(req: NextRequest) {
  const { geo, nextUrl } = req
  const isApi = nextUrl.pathname.startsWith('/api/')

  if (process.env.EDGE_CONFIG) {
    const blockedIPs = await get<string[]>('blocked_ips')
    const ip = getIP(req)

    if (blockedIPs?.includes(ip)) {
      if (isApi) {
        return NextResponse.json(
          { error: 'You have been blocked.' },
          { status: 403 }
        )
      }

      nextUrl.pathname = '/blocked'
      return NextResponse.rewrite(nextUrl)
    }

    if (nextUrl.pathname === '/blocked') {
      nextUrl.pathname = '/'
      return NextResponse.redirect(nextUrl)
    }
  }

  if (geo && !isApi && env.VERCEL_ENV === 'production') {
    const country = geo.country
    const city = geo.city

    const countryInfo = countries.find((x) => x.cca2 === country)
    if (countryInfo) {
      const flag = countryInfo.flag
      await redis.set(kvKeys.currentVisitor, { country, city, flag })
    }
  }

  return NextResponse.next()
}

// 处理需要身份验证的API
async function handleAuthCheck(req: NextRequest) {
  const userAgent = req.headers.get('user-agent') || ''
  const isBot = userAgent.toLowerCase().includes('googlebot') || 
                userAgent.toLowerCase().includes('bingbot')

  // 对于爬虫的API请求，如果是公开数据相关的，则放行
  if (isBot && (
    req.nextUrl.pathname.startsWith('/api/blog') ||
    req.nextUrl.pathname.startsWith('/api/guides') ||
    req.nextUrl.pathname.startsWith('/api/stores')
  )) {
    return null
  }

  // 检查是否有认证相关的cookie或header
  const { userId } = getAuth(req)
  
  if (!userId) {
    // 仅对评论和留言板API进行严格鉴权
    const pathname = req.nextUrl.pathname
    if (pathname.startsWith('/api/comments') || pathname === '/api/guestbook') {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }
  }
  
  return null // 通过验证或不需要验证
}
