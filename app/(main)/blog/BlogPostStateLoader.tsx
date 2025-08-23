'use client'

import React from 'react'
import { useQuery } from 'react-query'

import { addComment, blogPostState } from '~/app/(main)/blog/blog-post.state'
import { type PostIDLessCommentDto } from '~/db/dto/comment.dto'
import { type Post } from '~/sanity/schemas/post'

export function BlogPostStateLoader({ post }: { post: Post }) {
  const { data: comments } = useQuery(
    ['comments', post._id],
    async () => {
      try {
        const res = await fetch(`/api/comments/${post._id}`)
        if (!res.ok) {
          console.error(`Failed to fetch comments: ${res.status}`)
          return []
        }
        const data = await res.json()
        // 确保返回的是数组
        return Array.isArray(data) ? data : []
      } catch (error) {
        console.error('Error fetching comments:', error)
        return []
      }
    },
    { 
      initialData: [],
      retry: false, // 避免重复请求失败
      refetchOnWindowFocus: false
    }
  )

  React.useEffect(() => {
    blogPostState.postId = post._id
  }, [post._id])
  React.useEffect(() => {
    // only append new comments
    if (Array.isArray(comments)) {
      comments.forEach((comment) => {
        if (blogPostState.comments.find((c) => c.id === comment.id)) return
        addComment(comment)
      })
    }
  }, [comments])

  return null
}
