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
      icon: '🛡️',
      title: 'Authorized Buying',
      description: 'Know where to buy legit gear and how to verify it. No counterfeit links—ever.'
    },
    {
      icon: '📏',
      title: 'Sizing Without Guesswork',
      description: 'US/EU/UK/Asia conversions and real fit notes for different body types.'
    },
    {
      icon: '✂️',
      title: 'Care & Longevity',
      description: 'Wash, dry and store kits so numbers don\'t peel and colors don\'t fade.'
    },
    {
      icon: '✈️',
      title: 'Fan Travel Basics',
      description: 'Visa, tickets, packing lists and matchday etiquette for away days.'
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
          From confusion to clarity — in minutes.
        </motion.h2>
        <motion.p 
          className="mt-4 max-w-xl mx-auto text-zinc-600 dark:text-zinc-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          We cut through the noise and give you practical, honest advice on sports gear — from choosing authentic jerseys to training safely and traveling to matches.
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
                <span className="block text-4xl mb-2">🛒</span>
                <span className="block">Screenshot of guide interface</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 