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
          <Balancer>Learn about TarotDeck Online's mission to provide authentic tarot guidance and spiritual wisdom</Balancer>
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* 创始人介绍 */}
          <div className="md:col-span-3">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              About TarotDeck Online
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
                  TarotDeck Online was born from a simple mission: too much mystique, not enough authentic guidance in spiritual practice.
                </p>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                  We're spiritual practitioners who wanted to create something different — honest, practical guidance for tarot that actually empowers.
                </p>
                <p className="text-lg text-zinc-600 dark:text-zinc-400">
                  From card authenticity to reading techniques, we cut through spiritual confusion to give you the wisdom you actually need.
                </p>
              </div>
            </div>
          </div>

          {/* 公司使命 */}
          <div className="md:col-span-3 mt-12">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              Why TarotDeck Online?
            </h2>
            <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg mb-8">
              <p className="text-lg font-medium text-zinc-800 dark:text-zinc-200 mb-4">
                Our mission is simple:
              </p>
              <p className="text-xl font-bold text-zinc-900 dark:text-zinc-100 border-l-4 border-lime-500 pl-4 py-2 mb-6">
                Help you develop authentic spiritual practice and connect with tarot wisdom — without the mystical pretense.
              </p>
            </div>
            
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
              We do this by providing clear, honest guides that help you:
            </p>
            
            <ul className="space-y-3 list-disc pl-6 text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              <li>Choose authentic tarot decks from trusted sources</li>
              <li>Understand card meanings and spiritual symbolism</li>
              <li>Care for your cards to maintain their energy</li>
              <li>Read intuitively and develop psychic abilities</li>
              <li>Navigate spiritual growth and daily practice</li>
            </ul>
          </div>

          {/* 品牌定位 */}
          <div className="md:col-span-3 mt-8 bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-6">
              No Mystique. Just Mastery.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              TarotDeck Online is built by spiritual practitioners, for spiritual seekers. We believe in authentic guidance, honest wisdom, and helping you connect with divine insight.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link 
                href="/readings" 
                className="text-center px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600 transition-colors"
              >
                🔮 Explore Reading Guides
              </Link>
              <Link 
                href="/meanings" 
                className="text-center px-6 py-3 border border-zinc-300 text-zinc-700 rounded-lg hover:border-zinc-400 dark:text-zinc-300 dark:border-zinc-600 dark:hover:border-zinc-500 transition-colors"
              >
                ✨ Learn Card Meanings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
