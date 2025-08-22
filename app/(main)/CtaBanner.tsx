'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export function CtaBanner() {
  return (
    <section className="bg-white dark:bg-zinc-900 py-12 text-center border-t border-zinc-200 dark:border-zinc-800">
      <motion.h2 
        className="text-3xl font-semibold text-zinc-900 dark:text-zinc-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Ready to elevate your projects?
      </motion.h2>
      
      <motion.p 
        className="text-zinc-600 dark:text-zinc-400 mt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        Get premium digital resources for professional results, creative freedom, and instant success.
      </motion.p>

      <motion.div 
        className="mt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Link 
          href="/store" 
          className="inline-block bg-zinc-900 text-white px-6 py-3 rounded-md font-medium hover:opacity-90 dark:bg-zinc-100 dark:text-zinc-900"
        >
          🛍️ Explore Store
        </Link>
      </motion.div>
    </section>
  )
} 