'use client'

import { clsxm } from '@zolplay/utils'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser } from '@clerk/nextjs'
import { RatingSystem } from './RatingSystem'

interface Comment {
  id: string
  author: {
    id: string
    name: string
    avatar?: string
    isVerified?: boolean
  }
  content: string
  rating?: number
  createdAt: string
  updatedAt?: string
  likes: number
  isLiked: boolean
  replies?: Comment[]
  isEditing?: boolean
}

interface CommentSystemProps {
  contentId: string
  comments: Comment[]
  allowRating?: boolean
  allowReplies?: boolean
  maxDepth?: number
  className?: string
  onCommentSubmit?: (content: string, rating?: number, parentId?: string) => void
  onCommentUpdate?: (commentId: string, content: string) => void
  onCommentDelete?: (commentId: string) => void
  onCommentLike?: (commentId: string) => void
}

interface CommentFormProps {
  onSubmit: (content: string, rating?: number) => void
  onCancel?: () => void
  allowRating?: boolean
  placeholder?: string
  submitText?: string
  initialContent?: string
  initialRating?: number
}

function CommentForm({
  onSubmit,
  onCancel,
  allowRating,
  placeholder = "Share your thoughts...",
  submitText = "Post Comment",
  initialContent = "",
  initialRating = 0
}: CommentFormProps) {
  const [content, setContent] = React.useState(initialContent)
  const [rating, setRating] = React.useState(initialRating)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const { user } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(content.trim(), allowRating ? rating : undefined)
      setContent("")
      setRating(0)
    } catch (error) {
      console.error('Failed to submit comment:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Sign in to join the conversation
        </p>
        <button className="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-lg transition-colors">
          Sign In
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {allowRating && (
        <div>
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Rate this content
          </label>
          <RatingSystem
            rating={rating}
            onRatingChange={setRating}
            showNumber={false}
          />
        </div>
      )}
      
      <div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={clsxm(
            'w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg',
            'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100',
            'placeholder-zinc-500 dark:placeholder-zinc-400',
            'focus:ring-2 focus:ring-lime-500 dark:focus:ring-lime-400 focus:border-transparent',
            'resize-none'
          )}
        />
      </div>
      
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className={clsxm(
            'px-4 py-2 rounded-lg font-medium transition-colors',
            content.trim() && !isSubmitting
              ? 'bg-lime-600 hover:bg-lime-700 text-white'
              : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
          )}
        >
          {isSubmitting ? 'Posting...' : submitText}
        </button>
      </div>
    </form>
  )
}

interface CommentItemProps {
  comment: Comment
  depth?: number
  maxDepth?: number
  allowReplies?: boolean
  onReply?: (parentId: string, content: string, rating?: number) => void
  onUpdate?: (commentId: string, content: string) => void
  onDelete?: (commentId: string) => void
  onLike?: (commentId: string) => void
}

function CommentItem({
  comment,
  depth = 0,
  maxDepth = 3,
  allowReplies = true,
  onReply,
  onUpdate,
  onDelete,
  onLike
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = React.useState(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const { user } = useUser()

  const isOwner = user?.id === comment.author.id
  const canReply = allowReplies && depth < maxDepth

  const handleReply = (content: string, rating?: number) => {
    onReply?.(comment.id, content, rating)
    setShowReplyForm(false)
  }

  const handleUpdate = (content: string) => {
    onUpdate?.(comment.id, content)
    setIsEditing(false)
  }

  const timeAgo = React.useMemo(() => {
    const now = new Date()
    const commentDate = new Date(comment.createdAt)
    const diffInMinutes = Math.floor((now.getTime() - commentDate.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }, [comment.createdAt])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsxm(
        'space-y-3',
        depth > 0 && 'ml-8 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700'
      )}
    >
      <div className="bg-white dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-700 rounded-full flex items-center justify-center">
              {comment.author.avatar ? (
                <img 
                  src={comment.author.avatar} 
                  alt={comment.author.name}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  {comment.author.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-zinc-900 dark:text-zinc-100">
                  {comment.author.name}
                </span>
                {comment.author.isVerified && (
                  <svg className="w-4 h-4 text-lime-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                <span>{timeAgo}</span>
                {comment.updatedAt && comment.updatedAt !== comment.createdAt && (
                  <span>• edited</span>
                )}
              </div>
            </div>
          </div>
          
          {comment.rating && (
            <RatingSystem
              rating={comment.rating}
              readOnly
              size="sm"
              showNumber={false}
            />
          )}
        </div>

        {/* Comment Content */}
        {isEditing ? (
          <CommentForm
            onSubmit={handleUpdate}
            onCancel={() => setIsEditing(false)}
            placeholder="Edit your comment..."
            submitText="Update"
            initialContent={comment.content}
          />
        ) : (
          <div className="mb-3">
            <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">
              {comment.content}
            </p>
          </div>
        )}

        {/* Comment Actions */}
        {!isEditing && (
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => onLike?.(comment.id)}
              className={clsxm(
                'flex items-center gap-1 transition-colors',
                comment.isLiked
                  ? 'text-lime-600 dark:text-lime-400'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
              )}
            >
              <svg className="w-4 h-4" fill={comment.isLiked ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {comment.likes > 0 && <span>{comment.likes}</span>}
            </button>
            
            {canReply && (
              <button
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                Reply
              </button>
            )}
            
            {isOwner && (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete?.(comment.id)}
                  className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Reply Form */}
      <AnimatePresence>
        {showReplyForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="ml-8"
          >
            <CommentForm
              onSubmit={handleReply}
              onCancel={() => setShowReplyForm(false)}
              placeholder="Write a reply..."
              submitText="Reply"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              maxDepth={maxDepth}
              allowReplies={allowReplies}
              onReply={onReply}
              onUpdate={onUpdate}
              onDelete={onDelete}
              onLike={onLike}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export function CommentSystem({
  contentId,
  comments,
  allowRating = false,
  allowReplies = true,
  maxDepth = 3,
  className,
  onCommentSubmit,
  onCommentUpdate,
  onCommentDelete,
  onCommentLike
}: CommentSystemProps) {
  const [sortBy, setSortBy] = React.useState<'newest' | 'oldest' | 'likes'>('newest')

  const sortedComments = React.useMemo(() => {
    const sorted = [...comments]
    switch (sortBy) {
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      case 'likes':
        return sorted.sort((a, b) => b.likes - a.likes)
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }
  }, [comments, sortBy])

  const handleCommentSubmit = (content: string, rating?: number) => {
    onCommentSubmit?.(content, rating)
  }

  const handleReply = (parentId: string, content: string, rating?: number) => {
    onCommentSubmit?.(content, rating, parentId)
  }

  return (
    <div className={clsxm('space-y-6', className)}>
      {/* Comment Form */}
      <div>
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
          Join the Discussion
        </h3>
        <CommentForm
          onSubmit={handleCommentSubmit}
          allowRating={allowRating}
        />
      </div>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Comments ({comments.length})
            </h3>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-1 text-sm border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="likes">Most Liked</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {sortedComments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                maxDepth={maxDepth}
                allowReplies={allowReplies}
                onReply={handleReply}
                onUpdate={onCommentUpdate}
                onDelete={onCommentDelete}
                onLike={onCommentLike}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-8 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg">
          <p className="text-zinc-600 dark:text-zinc-400">
            No comments yet. Be the first to share your thoughts!
          </p>
        </div>
      )}
    </div>
  )
}