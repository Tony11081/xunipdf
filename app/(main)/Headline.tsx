'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Balancer from 'react-wrap-balancer'

export function Headline() {
  return (
    <div className="text-center py-16">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 100,
          duration: 0.3,
        }}
      >
        TarotDeck Online helps you discover spiritual wisdom,<br className="sm:hidden" />
        without the confusion or the mystique.
      </motion.h1>
      
      <motion.p 
        className="text-zinc-500 dark:text-zinc-500 text-sm mt-2"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 85,
          duration: 0.3,
          delay: 0.05,
        }}
      >
        Premium tarot resources, card meanings, spiritual guidance & oracle wisdom — accessible and authentic.
      </motion.p>
      
      <motion.p
        className="mt-6 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 85,
          duration: 0.3,
          delay: 0.1,
        }}
      >
        <Balancer>
          Clear, authentic guidance for tarot readings, card meanings, spiritual practices, and divine wisdom without the pretense.
        </Balancer>
      </motion.p>
      <motion.div
        className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          damping: 50,
          stiffness: 90,
          duration: 0.35,
          delay: 0.25,
        }}
      >
        <Link
          href="/readings"
          className="px-6 py-3 text-white bg-zinc-900 rounded-md text-lg font-medium hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
        >
          🔮 Tarot Readings
        </Link>
        <Link
          href="/meanings"
          className="px-6 py-3 border border-zinc-300 text-zinc-800 rounded-md text-lg font-medium hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-100 dark:hover:border-zinc-500"
        >
          ✨ Card Meanings
        </Link>
        <Link
          href="/guides"
          className="px-6 py-3 border border-lime-500 text-lime-700 rounded-md text-lg font-medium hover:bg-lime-50 dark:border-lime-600 dark:text-lime-400 dark:hover:border-lime-500"
        >
          🌙 Spiritual Guides
        </Link>
      </motion.div>
    </div>
  )
}
