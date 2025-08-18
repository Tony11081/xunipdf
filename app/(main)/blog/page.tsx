import Balancer from 'react-wrap-balancer'

import { SocialLink } from '~/components/links/SocialLink'
import { Container } from '~/components/ui/Container'
import { Pagination } from '~/components/ui/Pagination'

import { BlogPosts } from './BlogPosts'

const description =
  '🌍 Discover how to buy from Chinese platforms like Taobao, Weidian, Xiaohongshu – even if you don\'t speak Chinese. 🛠️ SEO guides, e-commerce tips, and step-by-step tutorials updated weekly.'
export const metadata = {
  title: 'ShopChina Blog - Chinese E-Commerce Tips, SEO Insights & Shopping Guides',
  description,
  openGraph: {
    title: 'ShopChina Blog - Chinese E-Commerce Tips, SEO Insights & Shopping Guides',
    description,
  },
  twitter: {
    title: 'ShopChina Blog - Chinese E-Commerce Tips, SEO Insights & Shopping Guides',
    description,
    card: 'summary_large_image',
  },
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const page = Number(searchParams.page) || 1
  const pageSize = 12
  const { posts, total } = await BlogPosts.getPostsWithPagination(page, pageSize)
  const totalPages = Math.ceil(total / pageSize)

  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Blog
        </h1>
        <h2 className="mt-2 text-lg font-medium tracking-tight text-zinc-600 dark:text-zinc-400">
          Chinese E-Commerce Tips, SEO Insights & Shopping Guides
        </h2>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
        <p className="flex items-center">
          <SocialLink href="/feed.xml" platform="rss" />
        </p>
      </header>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-8">
        <BlogPosts posts={posts} />
      </div>
      <div className="mt-12 flex justify-center">
        <Pagination currentPage={page} totalPages={totalPages} />
      </div>
    </Container>
  )
}

export const revalidate = 60
