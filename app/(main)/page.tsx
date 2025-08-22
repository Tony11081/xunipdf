import React from 'react'
import Link from 'next/link'

import { BlogPosts } from '~/app/(main)/blog/BlogPosts'
import { Newsletter } from '~/app/(main)/Newsletter'
import { Container } from '~/components/ui/Container'
import { Button } from '~/components/ui/Button'
import { getLatestBlogPosts } from '~/sanity/queries'

export default async function HomePage() {
  const posts = await getLatestBlogPosts({ limit: 3, forDisplay: true }) || []

  return (
    <>
      {/* Hero Section */}
      <div className="bg-white dark:bg-zinc-900 pb-16 pt-16">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl">
              Digital Tarot
              <span className="text-lime-600 dark:text-lime-400"> Resources</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Discover premium digital tarot resources, card meanings, and spiritual guidance tools. 
              Instant access, lifetime wisdom.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button href="/store">
                Browse Store
              </Button>
              <Button href="/about" variant="secondary">
                Learn More
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Features Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Why Choose TarotDeck Online?
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Premium tarot resources designed to enhance your spiritual journey and practice.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-900/20">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Instant Access
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Get immediate access to your tarot resources. No waiting, no delays.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-900/20">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Secure & Reliable
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Secure access with reliable resources that provide lasting spiritual guidance.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime-100 dark:bg-lime-900/20">
                <span className="text-2xl">🔮</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Spiritual Guidance
              </h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Comprehensive tarot wisdom accessible to seekers worldwide.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-zinc-900 py-16">
        <Container>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">1000+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Tarot Resources</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">50k+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Spiritual Seekers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">99.9%</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">24/7</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Support</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              Featured Resources
            </h2>
            <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Hand-picked tarot resources from our premium spiritual collection.
            </p>
          </div>
          <div className="mt-12 text-center">
            <Button href="/store">
              View All Resources
            </Button>
          </div>
        </Container>
      </section>

      {/* Blog and Newsletter Section */}
      {posts.length > 0 && (
        <Container className="mt-24 md:mt-28">
          <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
            <div className="flex flex-col gap-6 pt-6">
              <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                <span className="mr-2 text-xl">📰</span>
                <span>Latest Posts</span>
              </h2>
              <BlogPosts posts={posts} />
            </div>
            <aside className="space-y-10 lg:sticky lg:top-8 lg:h-fit lg:pl-16 xl:pl-20">
              <Newsletter />
              <div className="rounded-xl border border-zinc-100 p-6 dark:border-zinc-700/40">
                <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="mr-2 text-xl">🛍️</span>
                  <span>Start Shopping</span>
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Browse our collection of premium digital resources and templates.
                </p>
                <div className="mt-6">
                  <Link
                    href="/store"
                    className="text-sm font-medium text-lime-600 transition hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300"
                  >
                    Visit Store →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      )}
    </>
  )
}

export const revalidate = 60
