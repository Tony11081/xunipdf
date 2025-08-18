'use client'

import { clsxm } from '@zolplay/utils'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation, supportedLanguages, type SupportedLanguage } from '~/lib/i18n'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'dropdown' | 'inline' | 'modal'
  showFlags?: boolean
  showLabels?: boolean
}

export function LanguageSwitcher({ 
  className, 
  variant = 'dropdown',
  showFlags = true,
  showLabels = true 
}: LanguageSwitcherProps) {
  const { currentLanguage, changeLanguage, availableLanguages } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageChange = (language: SupportedLanguage) => {
    changeLanguage(language)
    setIsOpen(false)
  }

  const currentLangData = availableLanguages[currentLanguage]

  if (variant === 'inline') {
    return (
      <div className={clsxm('flex flex-wrap gap-2', className)}>
        {Object.entries(availableLanguages).map(([code, lang]) => (
          <button
            key={code}
            onClick={() => handleLanguageChange(code as SupportedLanguage)}
            className={clsxm(
              'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              currentLanguage === code
                ? 'bg-lime-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            )}
          >
            {showFlags && <span className="text-lg">{lang.flag}</span>}
            {showLabels && <span>{lang.nativeName}</span>}
          </button>
        ))}
      </div>
    )
  }

  if (variant === 'modal') {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className={clsxm(
            'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium',
            'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700',
            'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50',
            'transition-colors',
            className
          )}
        >
          {showFlags && <span className="text-lg">{currentLangData.flag}</span>}
          {showLabels && <span>{currentLangData.nativeName}</span>}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-sm bg-white dark:bg-zinc-900 rounded-2xl shadow-xl"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                    Choose Language
                  </h3>
                  
                  <div className="space-y-2">
                    {Object.entries(availableLanguages).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => handleLanguageChange(code as SupportedLanguage)}
                        className={clsxm(
                          'w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors',
                          currentLanguage === code
                            ? 'bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300'
                            : 'hover:bg-zinc-50 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        )}
                      >
                        <span className="text-2xl">{lang.flag}</span>
                        <div>
                          <div className="font-medium">{lang.nativeName}</div>
                          <div className="text-sm text-zinc-500 dark:text-zinc-400">
                            {lang.name}
                          </div>
                        </div>
                        {currentLanguage === code && (
                          <svg className="w-5 h-5 text-lime-600 dark:text-lime-400 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </>
    )
  }

  // Default dropdown variant
  return (
    <div ref={dropdownRef} className={clsxm('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsxm(
          'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium',
          'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700',
          'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50',
          'transition-colors'
        )}
      >
        {showFlags && <span className="text-lg">{currentLangData.flag}</span>}
        {showLabels && <span>{currentLangData.nativeName}</span>}
        <svg
          className={clsxm(
            'w-4 h-4 transition-transform',
            isOpen && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50"
          >
            <div className="py-2">
              {Object.entries(availableLanguages).map(([code, lang]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as SupportedLanguage)}
                  className={clsxm(
                    'w-full flex items-center gap-3 px-4 py-3 text-left transition-colors',
                    currentLanguage === code
                      ? 'bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300'
                      : 'hover:bg-zinc-50 dark:hover:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300'
                  )}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{lang.nativeName}</div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {lang.name}
                    </div>
                  </div>
                  {currentLanguage === code && (
                    <svg className="w-4 h-4 text-lime-600 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-zinc-200 dark:border-zinc-700 px-4 py-3">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Can't find your language? We're working on adding more!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Compact language switcher for mobile or limited space
export function CompactLanguageSwitcher({ className }: { className?: string }) {
  const { currentLanguage, changeLanguage, availableLanguages } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className={clsxm('relative', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-lg hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors"
      >
        {availableLanguages[currentLanguage].flag}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-full right-0 mt-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 min-w-32"
            >
              <div className="py-2">
                {Object.entries(availableLanguages).map(([code, lang]) => (
                  <button
                    key={code}
                    onClick={() => {
                      changeLanguage(code as SupportedLanguage)
                      setIsOpen(false)
                    }}
                    className={clsxm(
                      'w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                      currentLanguage === code
                        ? 'bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300'
                        : 'hover:bg-zinc-50 dark:hover:bg-zinc-700/50 text-zinc-700 dark:text-zinc-300'
                    )}
                  >
                    <span>{lang.flag}</span>
                    <span className="font-medium">{lang.code.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}