'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface FeatureDetailProps {
  icon: string
  title: string
  description: string
  index: number
}

const FeatureDetail = ({ icon, title, description, index }: FeatureDetailProps) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-zinc-50 dark:bg-zinc-800/70 p-4 rounded-lg shadow-sm"
    >
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between cursor-pointer"
      >
        <span className="font-medium text-zinc-900 dark:text-zinc-100">
          {icon} {title}
        </span>
        <span className="text-zinc-500 dark:text-zinc-400">
          {isOpen ? '−' : '+'}
        </span>
      </div>
      
      {isOpen && (
        <motion.p 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-sm mt-2 text-zinc-600 dark:text-zinc-400"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}

export function FeatureIntro() {
  const features = [
    {
      icon: '💼',
      title: 'Premium Quality Resources',
      description: 'Access high-quality digital templates and assets. Carefully curated and professionally designed.'
    },
    {
      icon: '🚀',
      title: 'Instant Download',
      description: 'Get immediate access to your purchases with secure, unlimited downloads and lifetime access.'
    },
    {
      icon: '🎨',
      title: 'Multiple Formats',
      description: 'Compatible files in various formats - PSD, AI, PNG, PDF, and more for maximum flexibility.'
    },
    {
      icon: '📊',
      title: 'Commercial License',
      description: 'Use our resources for personal and commercial projects with clear licensing terms.'
    }
  ]
  
  return (
    <section className="bg-white dark:bg-zinc-900 py-16">
      <div className="text-center px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-semibold text-zinc-900 dark:text-zinc-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          From idea to reality — in minutes.
        </motion.h2>
        <motion.p 
          className="mt-4 max-w-xl mx-auto text-zinc-600 dark:text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          We provide high-quality digital resources and templates for your creative projects — from business presentations to design assets and everything in between.
        </motion.p>
      </div>

      <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
        <div className="space-y-4">
          {features.map((feature, index) => (
            <FeatureDetail 
              key={`feature-${index}`}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-xl overflow-hidden shadow-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center"
        >
          <div className="relative w-full h-full min-h-[300px] bg-zinc-200 dark:bg-zinc-700 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-zinc-500 dark:text-zinc-400 text-center">
                <span className="block text-4xl mb-2">📁</span>
                <span className="block">Resource preview interface</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 