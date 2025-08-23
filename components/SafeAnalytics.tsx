'use client'

import { Analytics } from '@vercel/analytics/react'
import { useEffect, useState } from 'react'

export function SafeAnalytics() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // 只在客户端渲染，并且在生产环境中启用
  if (!isClient || process.env.NODE_ENV !== 'production') {
    return null
  }

  try {
    return <Analytics />
  } catch (error) {
    console.error('Analytics failed to load:', error)
    return null
  }
}