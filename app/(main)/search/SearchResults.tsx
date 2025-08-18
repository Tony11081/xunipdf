'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { clsxm } from '@zolplay/utils'

// Mock data for demonstration - in a real app, this would come from a database/API
const allContent = [
  {
    id: 1,
    title: "Soccer Cleat Buying Guide 2024",
    description: "Complete guide to choosing the right boots for your playing style and surface.",
    href: "/guides/soccer-cleat-buying-guide-2024",
    category: "Gear Guide",
    type: "guide",
    tags: ["soccer", "cleats", "boots", "buying guide"]
  },
  {
    id: 2,
    title: "How to Spot Fake Jerseys",
    description: "Learn to identify authentic vs replica jerseys and avoid counterfeit gear.",
    href: "/guides/how-to-spot-fake-jerseys",
    category: "Buying Guide",
    type: "guide",
    tags: ["jerseys", "authentic", "fake", "counterfeit"]
  },
  {
    id: 3,
    title: "Gear Guide",
    description: "Expert reviews and recommendations for sports equipment and gear.",
    href: "/gear",
    category: "Main Section",
    type: "page",
    tags: ["gear", "equipment", "reviews"]
  },
  {
    id: 4,
    title: "Training & Health",
    description: "Fitness routines, injury prevention, and health tips for athletes.",
    href: "/training",
    category: "Main Section", 
    type: "page",
    tags: ["training", "fitness", "health", "injury prevention"]
  },
  {
    id: 5,
    title: "Fan Travel",
    description: "Travel guides and tips for sports fans attending games and events.",
    href: "/travel",
    category: "Main Section",
    type: "page", 
    tags: ["travel", "fans", "games", "events"]
  }
]

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  // Simple search function - in production, this would be much more sophisticated
  const searchContent = (query: string) => {
    if (!query.trim()) return []
    
    const lowercaseQuery = query.toLowerCase()
    return allContent.filter(item => 
      item.title.toLowerCase().includes(lowercaseQuery) ||
      item.description.toLowerCase().includes(lowercaseQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      item.category.toLowerCase().includes(lowercaseQuery)
    )
  }

  const results = searchContent(query)

  if (!query.trim()) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Enter a search term to find content
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-6">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {results.length > 0 ? (
            <>Found {results.length} result{results.length !== 1 ? 's' : ''} for <span className="font-medium">"{query}"</span></>
          ) : (
            <>No results found for <span className="font-medium">"{query}"</span></>
          )}
        </p>
      </div>

      {results.length > 0 ? (
        <div className="space-y-6">
          {results.map((result) => (
            <div
              key={result.id}
              className="bg-white dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 hover:shadow-md transition-shadow"
            >
              <Link href={result.href} className="block group">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors">
                      {result.title}
                    </h2>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                      {result.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-2">
                      <span className={clsxm(
                        "px-2 py-1 text-xs rounded-full",
                        result.type === 'guide' 
                          ? "bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300"
                          : "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      )}>
                        {result.category}
                      </span>
                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                        {result.type === 'guide' ? 'Guide' : 'Page'}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <svg className="w-5 h-5 text-zinc-400 group-hover:text-lime-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
          <div className="text-zinc-400 dark:text-zinc-500 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21L16.5 16.5M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
            No results found
          </h3>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            Try adjusting your search terms or browse our main sections:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/gear" className="px-4 py-2 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors">
              Gear Guide
            </Link>
            <Link href="/training" className="px-4 py-2 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors">
              Training & Health
            </Link>
            <Link href="/guides" className="px-4 py-2 bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-zinc-600 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-600 transition-colors">
              All Guides
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}