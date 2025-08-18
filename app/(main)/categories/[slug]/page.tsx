import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import Balancer from 'react-wrap-balancer'
import Image from 'next/image'

import { SocialLink } from '~/components/links/SocialLink'
import { Container } from '~/components/ui/Container'
import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import { redis } from '~/lib/redis'
import { client } from '~/sanity/lib/client'
import { getPostsByCategory } from '~/sanity/queries'
import { groq } from 'next-sanity'

import { BlogPostCard } from '../../blog/BlogPostCard'

// Category information configuration, can be extended to add more categories
const categoryConfig: Record<string, {
  title: string;
  description: string;
  image?: string;
}> = {
  'guides': {
    title: 'Shopping Guides',
    description: 'Detailed shopping tutorials and guides to help you easily shop on Chinese e-commerce platforms',
    image: '/images/categories/guides-banner.jpg'
  },
  'stores': {
    title: 'Recommended Stores',
    description: 'Selected quality Chinese e-commerce stores offering reliable products and services',
    image: '/images/categories/stores-banner.jpg'
  },
  'tips': {
    title: 'Practical Tips',
    description: 'Useful advice and tips for shopping on Chinese e-commerce platforms',
    image: '/images/categories/tips-banner.jpg'
  },
  'reviews': {
    title: 'Product Reviews',
    description: 'Detailed reviews and recommendations of popular products',
    image: '/images/categories/reviews-banner.jpg'
  }
};

// Function to get category info by slug
async function getCategoryInfo(slug: string) {
  // Try to get category information from Sanity
  try {
    const category = await client.fetch(
      groq`*[_type == "category" && slug.current == $slug][0] {
        title,
        description
      }`,
      { slug }
    )
    
    if (category) {
      return {
        title: category.title,
        description: category.description || categoryConfig[slug]?.description || `Articles about ${category.title}`,
        image: categoryConfig[slug]?.image
      }
    }
  } catch (error) {
    console.error('Error fetching category info:', error)
  }
  
  // Fallback to predefined config or generic title
  return categoryConfig[slug] || {
    title: slug.charAt(0).toUpperCase() + slug.slice(1),
    description: `Articles and content about ${slug}`
  }
}

// Function to get posts by category slug
async function getPostsByCategorySlug(slug: string, limit: number = 50) {
  try {
    // 获取分类信息，用于匹配标题
    const categoryInfo = await getCategoryInfo(slug)
    
    // Use GROQ to query posts by category title
    const posts = await client.fetch(
      groq`*[_type == "post" && !(_id in path("drafts.**")) 
      && publishedAt <= "${new Date().toISOString()}"
      && defined(slug.current)
      && $categoryTitle in categories[]->title
      ] | order(publishedAt desc)[0...${limit}] {
        _id,
        title,
        "slug": slug.current,
        "categories": categories[]->title,
        description,
        publishedAt,
        readingTime,
        mainImage {
          _ref,
          asset->{
            url,
            "lqip": metadata.lqip,
            "dominant": metadata.palette.dominant
          }
        }
      }`,
      { categoryTitle: categoryInfo.title }
    )
    
    return posts
  } catch (error) {
    console.error('Error fetching posts by category slug:', error)
    return null
  }
}

export const generateMetadata = async ({ params }: { params: { slug: string } }): Promise<Metadata> => {
  const categorySlug = decodeURIComponent(params.slug || '').trim()
  const categoryInfo = await getCategoryInfo(categorySlug)
  
  return {
    title: `${categoryInfo.title} - ShopChina`,
    description: categoryInfo.description,
    openGraph: {
      title: `${categoryInfo.title} - ShopChina`,
      description: categoryInfo.description,
    },
    twitter: {
      title: `${categoryInfo.title} - ShopChina`,
      description: categoryInfo.description,
    },
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  try {
    const categorySlug = decodeURIComponent(params.slug || '').trim()
    
    if (!categorySlug) {
      return notFound()
    }
    
    // Get category information
    const categoryInfo = await getCategoryInfo(categorySlug)
    
    // Get posts for this category using the slug
    const posts = await getPostsByCategorySlug(categorySlug, 50)
    
    // If there are no articles, show empty state
    if (!posts || posts.length === 0) {
      return (
        <Container className="mt-16 sm:mt-24">
          <header className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              {categoryInfo.title}
            </h1>
            <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
              <Balancer>{categoryInfo.description}</Balancer>
            </p>
          </header>
          <div className="mt-16 text-center">
            <h2 className="text-xl font-medium text-zinc-600 dark:text-zinc-400">
              No articles yet
            </h2>
            <p className="mt-4 text-zinc-500 dark:text-zinc-500">
              We're working hard to create more content. Please check back later.
            </p>
          </div>
        </Container>
      )
    }

    // Get article view counts
    const postIdKeys = posts.map(({ _id }) => kvKeys.postViews(_id))
    let views: number[] = []
    
    if (env.VERCEL_ENV === 'development') {
      views = posts.map(() => Math.floor(Math.random() * 1000))
    } else {
      if (postIdKeys.length > 0) {
        views = await redis.mget<number[]>(...postIdKeys)
      }
    }

    return (
      <Container className="mt-16 sm:mt-24">
        <header className="max-w-4xl">
          {categoryInfo.image && (
            <div className="relative mb-8 h-48 w-full overflow-hidden rounded-xl md:h-64">
              <Image 
                src={categoryInfo.image}
                alt={categoryInfo.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-zinc-900/30 dark:bg-zinc-900/50"></div>
            </div>
          )}
          
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            {categoryInfo.title}
          </h1>
          
          <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
            <Balancer>{categoryInfo.description}</Balancer>
          </p>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              {posts.length} articles
            </span>
            <SocialLink href="/feed.xml" platform="rss" />
          </div>
        </header>
        
        <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-16 lg:grid-cols-2 lg:gap-8">
          {posts.map((post, idx) => (
            <BlogPostCard post={post} views={views[idx] ?? 0} key={post._id} />
          ))}
        </div>
      </Container>
    )
  } catch (error) {
    console.error('Error in category page:', error)
    return notFound()
  }
}

export const revalidate = 60 