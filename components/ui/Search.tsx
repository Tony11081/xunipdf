'use client'

import { clsxm } from '@zolplay/utils'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'

interface SearchResult {
  title: string
  description: string
  href: string
  category: string
}

interface SearchProps {
  className?: string
  placeholder?: string
  onSearch?: (query: string) => void
  results?: SearchResult[]
  showResults?: boolean
}

export function Search({
  className,
  placeholder = "Search...",
  onSearch,
  results = [],
  showResults = false
}: SearchProps) {
  const [query, setQuery] = React.useState('')
  const [isOpen, setIsOpen] = React.useState(false)
  const searchRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const router = useRouter()

  // Close search results when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard shortcuts
  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setIsOpen(true)
      }
      
      if (event.key === 'Escape') {
        setIsOpen(false)
        inputRef.current?.blur()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleInputChange = (value: string) => {
    setQuery(value)
    setIsOpen(value.length > 0)
    onSearch?.(value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  const filteredResults = results.filter(result =>
    result.title.toLowerCase().includes(query.toLowerCase()) ||
    result.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5)

  return (
    <div ref={searchRef} className={clsxm('relative', className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-zinc-500 dark:text-zinc-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21L16.5 16.5M19 10.5a8.5 8.5 0 11-17 0 8.5 8.5 0 0117 0z"
              />
            </svg>
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => query.length > 0 && setIsOpen(true)}
            className={clsxm(
              'block w-full pl-10 pr-20 py-3 text-sm',
              'bg-white dark:bg-zinc-800',
              'border border-zinc-300 dark:border-zinc-600',
              'rounded-lg',
              'text-zinc-900 dark:text-zinc-100',
              'placeholder-zinc-500 dark:placeholder-zinc-400',
              'focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400',
              'focus:border-transparent',
              'transition-colors'
            )}
            placeholder={placeholder}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 border border-zinc-300 dark:border-zinc-600 rounded">
              ⌘K
            </kbd>
          </div>
        </div>
      </form>

      <AnimatePresence>
        {isOpen && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg max-h-96 overflow-y-auto"
          >
            {filteredResults.length > 0 ? (
              <div className="py-2">
                {filteredResults.map((result, index) => (
                  <Link
                    key={index}
                    href={result.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                          {result.title}
                        </p>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                          {result.description}
                        </p>
                      </div>
                      <span className="ml-2 px-2 py-1 text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 rounded">
                        {result.category}
                      </span>
                    </div>
                  </Link>
                ))}
                {query.length > 2 && (
                  <div className="border-t border-zinc-200 dark:border-zinc-700 mt-2 pt-2">
                    <button
                      onClick={handleSubmit}
                      className="w-full px-4 py-2 text-left text-sm text-lime-600 dark:text-lime-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/50"
                    >
                      See all results for "{query}"
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  No results found for "{query}"
                </p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                  Try a different search term
                </p>
              </div>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}