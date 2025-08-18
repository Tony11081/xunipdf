import React from 'react'

import { BlogPosts } from '~/app/(main)/blog/BlogPosts'
import { CtaBanner } from '~/app/(main)/CtaBanner'
import { FeatureIntro } from '~/app/(main)/FeatureIntro'
import { Headline } from '~/app/(main)/Headline'
import { Newsletter } from '~/app/(main)/Newsletter'
import { StatsCounter } from '~/app/(main)/StatsCounter'
import { Testimonials } from '~/app/(main)/Testimonials'
import { Container } from '~/components/ui/Container'
import { getLatestBlogPosts, getSettings } from '~/sanity/queries'

export default async function BlogHomePage() {
  const settings = await getSettings()
  const posts = await getLatestBlogPosts({ limit: 5, forDisplay: true }) || []

  return (
    <>
      <div className="bg-white dark:bg-zinc-900 pb-10">
        <Container className="">
          <Headline />
        </Container>
      </div>

      {/* Trusted by section */}
      <section className="bg-white dark:bg-zinc-900 py-12">
        <div className="text-center">
          <p className="text-sm text-zinc-500 uppercase tracking-wider mb-4 dark:text-zinc-400">
            Trusted by sports fans, coaches, and athletes worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-6 grayscale opacity-70">
            <div className="flex items-center justify-center h-6">
              <span className="text-xl">⚽ Football</span>
            </div>
            <div className="flex items-center justify-center h-6">
              <span className="text-xl">🏀 Basketball</span>
            </div>
            <div className="flex items-center justify-center h-6">
              <span className="text-xl">🏃‍♂️ Running</span>
            </div>
            <div className="flex items-center justify-center h-6">
              <span className="text-xl">🎾 Tennis</span>
            </div>
            <div className="flex items-center justify-center h-6">
              <span className="text-xl">🏈 American Football</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats section */}
      <section className="border-t border-zinc-200 bg-white py-12 dark:bg-zinc-900 dark:border-zinc-800">
        <StatsCounter />
      </section>

      {/* Feature Intro section */}
      <FeatureIntro />

      {/* Testimonials section */}
      <Testimonials />

      {/* Blog and Newsletter section */}
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-6 pt-6">
            <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              <span className="mr-2 text-xl">📚</span>
              <span>Sports Guides</span>
            </h2>
            <BlogPosts posts={posts} />
          </div>
          <aside className="space-y-10 lg:sticky lg:top-8 lg:h-fit lg:pl-16 xl:pl-20">
            <Newsletter />
            {settings?.resume && 
              <div className="rounded-xl border border-zinc-100 p-6 dark:border-zinc-700/40">
                <h2 className="flex items-center text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="mr-2 text-xl">⭐</span>
                  <span>Featured Gear</span>
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  Our top-rated gear reviews and buying guides for sports enthusiasts.
                </p>
                <div className="mt-6">
                  <a
                    href="/gear"
                    className="text-sm font-medium text-lime-600 transition hover:text-lime-700 dark:text-lime-400 dark:hover:text-lime-300"
                  >
                    Browse All Gear →
                  </a>
                </div>
              </div>
            }
          </aside>
        </div>
      </Container>

      {/* CTA Banner section */}
      <CtaBanner />
    </>
  )
}

export const revalidate = 60
