import { Suspense } from 'react'
import { Container } from '~/components/ui/Container'
import SearchResults from './SearchResults'

export default function SearchPage() {
  return (
    <Container className="mt-16 sm:mt-32">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-4xl">
          Search Results
        </h1>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          Find guides, gear reviews, and sports content
        </p>
        
        <div className="mt-8">
          <Suspense fallback={<div className="text-center py-8">Searching...</div>}>
            <SearchResults />
          </Suspense>
        </div>
      </div>
    </Container>
  )
}