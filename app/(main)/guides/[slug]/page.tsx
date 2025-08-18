'use client'

import Link from 'next/link'
import { Container } from '~/components/ui/Container'

export default function GuideDetailPage({ params }: { params: { slug: string } }) {
  const slug = params?.slug || ''
  
  // 这只是一个临时页面，实际上您应该从Sanity获取指南内容
  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <Link
            href="/guides"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            aria-label="返回指南列表"
          >
            <svg 
              className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </Link>
          
          <article>
            <header className="flex flex-col">
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {decodeURIComponent(slug).split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </h1>
              <div className="mt-6 flex flex-col text-sm text-zinc-600 dark:text-zinc-400">
                <span>该指南正在编写中，敬请期待！</span>
              </div>
            </header>
            
            <div className="mt-8 prose dark:prose-invert">
              <p>
                我们正在努力编写这篇详细的指南，以帮助您更好地使用中国电商平台。
              </p>
              <p>
                该指南将包含详细的步骤说明、截图和提示，确保即使您不懂中文也能顺利购物。
              </p>
              <p>
                请稍后再来查看，或者订阅我们的通讯以在指南发布时获得通知。
              </p>
              
              <div className="my-12 border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
                <Link 
                  href="/guides"
                  className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
                >
                  返回指南列表
                </Link>
              </div>
            </div>
          </article>
        </div>
      </div>
    </Container>
  )
} 