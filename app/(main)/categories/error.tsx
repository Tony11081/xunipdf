'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { Container } from '~/components/ui/Container'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Category page error:', error)
  }, [error])

  return (
    <Container className="flex flex-col items-center justify-center py-24">
      <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100 mb-4">
        Something went wrong
      </h2>
      <p className="text-zinc-600 dark:text-zinc-400 mb-8 text-center max-w-md">
        There was a problem loading the category page. This might be due to a network issue or the category doesn't exist.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          Return to home
        </Link>
      </div>
    </Container>
  )
} 