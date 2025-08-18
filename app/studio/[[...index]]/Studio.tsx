'use client'

/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under your studio path is handled by this file using Next.js' catch-all routes:
 * https://nextjs.org/docs/routing/dynamic-routes#catch-all-routes
 *
 * You can learn more about the next-sanity package here:
 * https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import { useEffect, useState } from 'react'

import config from '~/sanity.config'

// 错误提示组件
function SanityConfigError() {
  const [missingVars, setMissingVars] = useState<string[]>([])

  useEffect(() => {
    const missing = []
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) missing.push('NEXT_PUBLIC_SANITY_PROJECT_ID')
    if (!process.env.NEXT_PUBLIC_SANITY_DATASET) missing.push('NEXT_PUBLIC_SANITY_DATASET')
    setMissingVars(missing)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-red-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Sanity Studio Configuration Error</h1>
        <div className="mb-6 text-gray-600">
          <p className="mb-4">
            The following environment variables are missing or undefined:
          </p>
          <ul className="list-disc pl-6 mb-4 text-red-600 font-mono">
            {missingVars.map(varName => (
              <li key={varName}>{varName}</li>
            ))}
          </ul>
          <p className="text-sm text-gray-600 mb-2">
            These variables are required for Sanity Studio to function properly.
          </p>
          <p className="text-sm text-gray-600">
            Please add them to your <span className="font-mono bg-gray-100 px-1 py-0.5 rounded">.env</span> file or deployment environment variables.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-4">
          <h3 className="font-medium text-gray-700 mb-2">How to fix:</h3>
          <ol className="list-decimal pl-6 text-sm text-gray-600 space-y-2">
            <li>Create or update your <span className="font-mono">.env</span> file with the missing variables</li>
            <li>Make sure the values are correct and match your Sanity project settings</li>
            <li>Restart your development server or redeploy</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default function Studio() {
  // 使用客户端检测，确保环境变量在运行时存在
  const [isConfigComplete, setIsConfigComplete] = useState<boolean | null>(null)
  const [debugInfo, setDebugInfo] = useState<string>('')

  useEffect(() => {
    // 直接检查process.env中的变量，而不是通过env.ts导入
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    
    // 调试信息
    setDebugInfo(
      `PROJECT_ID: ${projectId ? '已设置' : '未设置'}, DATASET: ${dataset ? '已设置' : '未设置'}`
    )
    
    // 检查配置是否完整
    setIsConfigComplete(!!projectId && !!dataset)
  }, [])

  // 仅在客户端渲染后显示内容
  if (isConfigComplete === null) {
    return <div className="w-full h-screen flex items-center justify-center">Loading...</div>
  }

  // 配置不完整时显示错误信息
  if (!isConfigComplete) {
    return (
      <>
        <SanityConfigError />
        {/* 添加调试信息 */}
        <div className="fixed bottom-2 right-2 bg-yellow-100 p-2 text-xs rounded">
          {debugInfo}
        </div>
      </>
    )
  }

  // 配置完整时渲染Sanity Studio
  return <NextStudio config={config} />
}
