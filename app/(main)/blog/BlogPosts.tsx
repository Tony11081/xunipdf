import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import { redis } from '~/lib/redis'
import { getLatestBlogPosts, getTotalBlogPosts } from '~/sanity/queries'
import { type Post } from '~/sanity/schemas/post'

import { BlogPostCard } from './BlogPostCard'

interface BlogPostsProps {
  posts: Post[]
}

export async function getPostsWithPagination(page: number, pageSize: number) {
  const posts = await getLatestBlogPosts({ 
    limit: pageSize, 
    offset: (page - 1) * pageSize,
    forDisplay: true 
  }) || []
  
  const total = await getTotalBlogPosts()
  return { posts, total }
}

export async function BlogPosts({ posts }: BlogPostsProps) {
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
    <>
      {posts.map((post, idx) => (
        <BlogPostCard post={post} views={views[idx] ?? 0} key={post._id} />
      ))}
    </>
  )
}

// Export the getPostsWithPagination function
BlogPosts.getPostsWithPagination = getPostsWithPagination
