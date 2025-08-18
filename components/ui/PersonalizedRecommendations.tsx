'use client'

import { clsxm } from '@zolplay/utils'
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion'
import { 
  PersonalizationService, 
  BehaviorTracker,
  type ContentItem, 
  type UserInterests 
} from '~/lib/personalization'
import { SparkleIcon } from '~/assets'

interface PersonalizedRecommendationsProps {
  className?: string
  limit?: number
  showTitle?: boolean
  variant?: 'default' | 'compact' | 'grid'
}

// Mock content data - in a real app, this would come from your CMS/database
const mockContent: ContentItem[] = [
  {
    id: '1',
    title: 'Best Soccer Cleats for Beginners 2024',
    description: 'Complete guide to choosing your first pair of soccer cleats with expert recommendations.',
    href: '/guides/soccer-cleats-beginners',
    category: 'Gear Guide',
    tags: ['soccer', 'cleats', 'beginner', 'footwear'],
    difficulty: 'beginner',
    contentType: 'guide',
    popularity: 0.8,
    lastUpdated: '2024-08-15'
  },
  {
    id: '2',
    title: 'Running Form Analysis: Prevent Injuries',
    description: 'Learn proper running technique to improve performance and avoid common injuries.',
    href: '/guides/running-form-analysis',
    category: 'Training',
    tags: ['running', 'technique', 'injury prevention', 'form'],
    difficulty: 'intermediate',
    contentType: 'tutorial',
    popularity: 0.7,
    lastUpdated: '2024-08-10'
  },
  {
    id: '3',
    title: 'Nike vs Adidas: Soccer Boot Comparison',
    description: 'Detailed comparison of the latest soccer boots from Nike and Adidas.',
    href: '/reviews/nike-vs-adidas-soccer-boots',
    category: 'Product Review',
    tags: ['soccer', 'nike', 'adidas', 'comparison', 'boots'],
    difficulty: 'intermediate',
    contentType: 'review',
    popularity: 0.9,
    lastUpdated: '2024-08-12'
  },
  {
    id: '4',
    title: 'Home Gym Setup on a Budget',
    description: 'Build an effective home gym without breaking the bank with these smart equipment choices.',
    href: '/guides/budget-home-gym-setup',
    category: 'Equipment Guide',
    tags: ['gym', 'fitness', 'budget', 'home workout', 'equipment'],
    difficulty: 'beginner',
    contentType: 'guide',
    popularity: 0.6,
    lastUpdated: '2024-08-08'
  },
  {
    id: '5',
    title: 'Basketball Shooting Technique Drills',
    description: 'Professional shooting drills to improve your basketball accuracy and consistency.',
    href: '/training/basketball-shooting-drills',
    category: 'Training',
    tags: ['basketball', 'shooting', 'drills', 'technique', 'practice'],
    difficulty: 'advanced',
    contentType: 'tutorial',
    popularity: 0.5,
    lastUpdated: '2024-08-05'
  },
  {
    id: '6',
    title: 'Recovery Tools: Foam Rollers vs Massage Guns',
    description: 'Compare different recovery tools to find what works best for your routine.',
    href: '/reviews/recovery-tools-comparison',
    category: 'Recovery',
    tags: ['recovery', 'foam roller', 'massage gun', 'muscle recovery'],
    difficulty: 'intermediate',
    contentType: 'review',
    popularity: 0.4,
    lastUpdated: '2024-08-01'
  }
]

export function PersonalizedRecommendations({ 
  className, 
  limit = 6, 
  showTitle = true,
  variant = 'default'
}: PersonalizedRecommendationsProps) {
  const [interests, setInterests] = React.useState<UserInterests | null>(null)
  const [recommendations, setRecommendations] = React.useState<ContentItem[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    // Load user interests and generate recommendations
    const loadRecommendations = () => {
      setIsLoading(true)
      
      try {
        const userInterests = PersonalizationService.getUserInterests()
        setInterests(userInterests)
        
        // Get personalized recommendations
        const personalizedContent = PersonalizationService.getRecommendations(
          mockContent, 
          userInterests, 
          limit
        )
        
        setRecommendations(personalizedContent)
      } catch (error) {
        console.error('Failed to load recommendations:', error)
        // Fallback to popular content
        setRecommendations(
          mockContent
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, limit)
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadRecommendations()
  }, [limit])

  const handleContentClick = (content: ContentItem) => {
    // Track user interaction for better future recommendations
    BehaviorTracker.trackContentView(content.id, content.category)
  }

  if (isLoading) {
    return (
      <div className={clsxm('space-y-4', className)}>
        {showTitle && (
          <div className="h-8 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />
        )}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="bg-zinc-100 dark:bg-zinc-800 rounded-lg h-32 animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className={clsxm('text-center py-8', className)}>
        <p className="text-zinc-600 dark:text-zinc-400">
          No personalized recommendations available yet. Browse our content to get started!
        </p>
      </div>
    )
  }

  const hasInterests = interests && (
    interests.sports.length > 0 || 
    interests.equipment.length > 0 || 
    interests.goals.length > 0
  )

  return (
    <div className={clsxm('space-y-6', className)}>
      {showTitle && (
        <div className="flex items-center gap-2">
          <SparkleIcon className="w-5 h-5 text-lime-600 dark:text-lime-400" />
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {hasInterests ? 'Recommended for You' : 'Popular Content'}
          </h2>
          {hasInterests && (
            <span className="text-xs bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 px-2 py-1 rounded-full">
              Personalized
            </span>
          )}
        </div>
      )}

      <div className={clsxm(
        'grid gap-4',
        variant === 'compact' && 'space-y-3',
        variant === 'grid' && 'sm:grid-cols-2 lg:grid-cols-3',
        variant === 'default' && 'sm:grid-cols-2'
      )}>
        {recommendations.map((content, index) => (
          <motion.div
            key={content.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={clsxm(
              'group relative',
              variant === 'compact' && 'flex gap-3',
              variant !== 'compact' && 'bg-white dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 hover:shadow-md transition-all'
            )}
          >
            <Link 
              href={content.href}
              onClick={() => handleContentClick(content)}
              className="block"
            >
              {variant === 'compact' ? (
                <>
                  <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-700 rounded-lg flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors line-clamp-2">
                      {content.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 line-clamp-1">
                      {content.category}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start justify-between mb-3">
                    <span className={clsxm(
                      'px-2 py-1 text-xs rounded-full',
                      content.contentType === 'guide' && 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
                      content.contentType === 'review' && 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
                      content.contentType === 'tutorial' && 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
                      content.contentType === 'news' && 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300'
                    )}>
                      {content.category}
                    </span>
                    <span className={clsxm(
                      'px-2 py-1 text-xs rounded-full',
                      content.difficulty === 'beginner' && 'bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400',
                      content.difficulty === 'intermediate' && 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
                      content.difficulty === 'advanced' && 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                    )}>
                      {content.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-lime-600 dark:group-hover:text-lime-400 transition-colors mb-2 line-clamp-2">
                    {content.title}
                  </h3>
                  
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
                    {content.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Updated {new Date(content.lastUpdated).toLocaleDateString()}</span>
                    <div className="flex items-center gap-1">
                      <span>★</span>
                      <span>{Math.round(content.popularity * 5 * 10) / 10}</span>
                    </div>
                  </div>
                </>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {hasInterests && (
        <div className="text-center">
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Recommendations based on your interests in {interests?.sports.slice(0, 2).join(', ')}
            {interests?.sports.length > 2 && ` and ${interests.sports.length - 2} more`}
          </p>
        </div>
      )}
    </div>
  )
}