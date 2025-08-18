'use client'

import { clsxm } from '@zolplay/utils'
import React from 'react'
import { motion } from 'framer-motion'

interface RatingSystemProps {
  rating: number
  onRatingChange?: (rating: number) => void
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  totalRatings?: number
  className?: string
}

interface StarProps {
  filled: boolean
  half?: boolean
  size: 'sm' | 'md' | 'lg'
  interactive?: boolean
  onClick?: () => void
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

function Star({ filled, half, size, interactive, onClick, onMouseEnter, onMouseLeave }: StarProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5', 
    lg: 'w-6 h-6'
  }

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={!interactive}
      className={clsxm(
        sizeClasses[size],
        interactive && 'hover:scale-110 transition-transform cursor-pointer',
        !interactive && 'cursor-default'
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className={clsxm(
          'transition-colors',
          filled 
            ? 'text-yellow-400 fill-current'
            : 'text-zinc-300 dark:text-zinc-600'
        )}
      >
        {half ? (
          <defs>
            <linearGradient id={`half-${Math.random()}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="rgb(212 212 216)" />
            </linearGradient>
          </defs>
        ) : null}
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={half ? `url(#half-${Math.random()})` : filled ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={filled ? 0 : 1}
        />
      </svg>
    </button>
  )
}

export function RatingSystem({
  rating,
  onRatingChange,
  readOnly = false,
  size = 'md',
  showNumber = true,
  totalRatings,
  className
}: RatingSystemProps) {
  const [hoverRating, setHoverRating] = React.useState(0)
  const [isHovering, setIsHovering] = React.useState(false)

  const displayRating = isHovering ? hoverRating : rating
  const isInteractive = !readOnly && onRatingChange

  const handleStarClick = (starIndex: number) => {
    if (isInteractive) {
      onRatingChange(starIndex + 1)
    }
  }

  const handleStarHover = (starIndex: number) => {
    if (isInteractive) {
      setHoverRating(starIndex + 1)
      setIsHovering(true)
    }
  }

  const handleMouseLeave = () => {
    if (isInteractive) {
      setIsHovering(false)
      setHoverRating(0)
    }
  }

  return (
    <div className={clsxm('flex items-center gap-2', className)}>
      <div 
        className="flex items-center gap-1"
        onMouseLeave={handleMouseLeave}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const starValue = index + 1
          const isFilled = displayRating >= starValue
          const isHalf = displayRating >= starValue - 0.5 && displayRating < starValue

          return (
            <motion.div
              key={index}
              whileHover={isInteractive ? { scale: 1.1 } : {}}
              whileTap={isInteractive ? { scale: 0.95 } : {}}
            >
              <Star
                filled={isFilled}
                half={isHalf && !isInteractive}
                size={size}
                interactive={isInteractive}
                onClick={() => handleStarClick(index)}
                onMouseEnter={() => handleStarHover(index)}
              />
            </motion.div>
          )
        })}
      </div>

      {showNumber && (
        <div className="flex items-center gap-1 text-sm">
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            {rating.toFixed(1)}
          </span>
          {totalRatings !== undefined && (
            <span className="text-zinc-500 dark:text-zinc-400">
              ({totalRatings.toLocaleString()})
            </span>
          )}
        </div>
      )}
    </div>
  )
}

// Rating distribution component
interface RatingDistributionProps {
  ratings: Record<number, number> // { 5: 150, 4: 80, 3: 30, 2: 10, 1: 5 }
  totalRatings: number
  className?: string
}

export function RatingDistribution({ ratings, totalRatings, className }: RatingDistributionProps) {
  return (
    <div className={clsxm('space-y-2', className)}>
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = ratings[stars] || 0
        const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0

        return (
          <div key={stars} className="flex items-center gap-3">
            <div className="flex items-center gap-1 w-12">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">{stars}</span>
              <svg className="w-3 h-3 text-yellow-400 fill-current">
                <path d="M6 1l1.5 3L10 4.5 8 6.5l.5 3.5L6 8.5 3.5 10 4 6.5 2 4.5l2.5-.5L6 1z" />
              </svg>
            </div>
            
            <div className="flex-1 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
              <motion.div
                className="bg-yellow-400 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5, delay: (5 - stars) * 0.1 }}
              />
            </div>
            
            <span className="text-sm text-zinc-500 dark:text-zinc-400 w-8 text-right">
              {count}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// Quick rating summary
interface RatingSummaryProps {
  averageRating: number
  totalRatings: number
  ratings: Record<number, number>
  className?: string
}

export function RatingSummary({ averageRating, totalRatings, ratings, className }: RatingSummaryProps) {
  return (
    <div className={clsxm('bg-white dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700', className)}>
      <div className="text-center mb-4">
        <div className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-1">
          {averageRating.toFixed(1)}
        </div>
        <RatingSystem 
          rating={averageRating} 
          readOnly 
          size="lg" 
          showNumber={false}
          className="justify-center mb-2"
        />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Based on {totalRatings.toLocaleString()} review{totalRatings !== 1 ? 's' : ''}
        </p>
      </div>
      
      <RatingDistribution 
        ratings={ratings}
        totalRatings={totalRatings}
      />
    </div>
  )
}