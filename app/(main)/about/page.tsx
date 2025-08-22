import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

import { Container } from '~/components/ui/Container'

export default function Page() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          About
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Learn about our mission to provide premium digital resources and creative assets for professionals</Balancer>
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 创始人介绍 */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              About Our Platform
            </h2>
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                <div className="w-full h-full flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                  {/* Logo placeholder */}
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                  Our platform was born from a simple need: too many low-quality resources, not enough premium options for professionals.
                </p>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                  We're creators and professionals who wanted to build something different — high-quality, practical resources that actually deliver results.
                </p>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  From templates to tools, we provide premium digital assets that help you create professional work efficiently.
                </p>
              </div>
            </div>
          </div>

          {/* 公司使命 */}
          <div className="md:col-span-3 mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Why Choose Us?
            </h2>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg mb-8">
              <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-4">
                Our mission is simple:
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-l-4 border-lime-500 pl-4 py-2 mb-6">
                Help you create professional, high-quality work with premium digital resources — without the complexity.
              </p>
            </div>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
              We do this by providing clear, honest guides that help you:
            </p>
            
            <ul className="space-y-3 list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              <li>Access premium templates from verified designers</li>
              <li>Download assets in multiple formats for flexibility</li>
              <li>Use commercial licenses for business projects</li>
              <li>Get instant access with lifetime downloads</li>
              <li>Navigate creative projects with professional tools</li>
            </ul>
          </div>

          {/* 品牌定位 */}
          <div className="md:col-span-3 mt-8 bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              No Complexity. Just Quality.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              Our platform is built by creators, for creators. We believe in premium quality, clear licensing, and helping you achieve professional results.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link 
                href="/templates" 
                className="text-center px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
              >
                📄 Explore Templates
              </Link>
              <Link 
                href="/store" 
                className="text-center px-6 py-3 border border-zinc-300 text-zinc-700 rounded-lg hover:border-zinc-400 dark:text-zinc-300 dark:border-zinc-600 dark:hover:border-zinc-500 transition-colors"
              >
                🛍️ Browse Store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
