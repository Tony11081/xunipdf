import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BlogPostPage } from '~/app/(main)/blog/BlogPostPage'
import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import { url } from '~/lib'
import { redis } from '~/lib/redis'
import { getBlogPost } from '~/sanity/queries'
import { JsonLd } from '~/components/seo/JsonLd'
import { Hreflang } from '~/components/seo/Hreflang'

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string }
}) => {
  try {
    const post = await getBlogPost(params.slug)
    if (!post) {
      notFound()
    }

    const { title, description, excerpt, keywords, mainImage } = post
    const metaDescription = excerpt || description
    const imageUrl = mainImage?.asset?.url || '/og_zh.png'

    return {
      title,
      description: metaDescription,
      keywords: keywords?.join(', '),
      openGraph: {
        title,
        description: metaDescription,
        images: [
          {
            url: imageUrl,
          },
        ],
        type: 'article',
      },
      twitter: {
        images: [
          {
            url: imageUrl,
          },
        ],
        title,
        description: metaDescription,
        card: 'summary_large_image',
        site: '@shopchina',
        creator: '@shopchina',
      },
    } satisfies Metadata
  } catch (error) {
    console.error('Error generating metadata for blog post:', error)
    notFound()
  }
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string }
}) {
  try {
    const post = await getBlogPost(params.slug)
    if (!post) {
      notFound()
    }

    let views: number = 0
    try {
      if (env.VERCEL_ENV === 'production') {
        views = await redis.incr(kvKeys.postViews(post._id))
      } else {
        views = 30578
      }
    } catch (error) {
      console.error('Error fetching views:', error)
      views = 0
    }

    let reactions: number[] = []
    try {
      if (env.VERCEL_ENV === 'production') {
        const res = await fetch(url(`/api/reactions?id=${post._id}`), {
          next: {
            tags: [`reactions:${post._id}`],
          },
        })
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data)) {
            reactions = data
          }
        }
      } else {
        reactions = Array.from({ length: 4 }, () =>
          Math.floor(Math.random() * 50000)
        )
      }
    } catch (error) {
      console.error('Error fetching reactions:', error)
    }

    let relatedViews: number[] = []
    try {
      if (post.related && post.related.length > 0) {
        if (env.VERCEL_ENV === 'development') {
          relatedViews = post.related.map(() => Math.floor(Math.random() * 1000))
        } else {
          const postIdKeys = post.related.map(({ _id }) => kvKeys.postViews(_id))
          if (postIdKeys.length > 0) {
            relatedViews = await redis.mget<number[]>(...postIdKeys) || []
          }
        }
      }
    } catch (error) {
      console.error('Error fetching related views:', error)
    }

    // 生成面包屑路径
    const breadcrumbs = ['博客', post.categories?.[0] || '文章', post.title]

    return (
      <>
        <BlogPostPage
          post={post}
          views={views}
          relatedViews={relatedViews}
          reactions={reactions.length > 0 ? reactions : undefined}
        />
        
        {/* 结构化数据 */}
        <JsonLd type="Article" data={post} />
        <JsonLd type="BreadcrumbList" data={breadcrumbs} />
        
        {/* 多语言支持 */}
        <Hreflang 
          path={`/blog/${post.slug}`}
          languages={{
            // 未来添加其他语言版本
            // 'en': `/en/blog/${post.slug}`,
            // 'zh-TW': `/zh-tw/blog/${post.slug}`
          }}
        />
      </>
    )
  } catch (error) {
    console.error('Error rendering blog post:', error)
    notFound()
  }
}

export const revalidate = 60
