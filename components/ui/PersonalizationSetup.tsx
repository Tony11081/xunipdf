'use client'

import { clsxm } from '@zolplay/utils'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PersonalizationService, 
  BehaviorTracker,
  interestOptions, 
  type UserInterests 
} from '~/lib/personalization'

interface PersonalizationSetupProps {
  isOpen: boolean
  onClose: () => void
  onComplete?: (interests: UserInterests) => void
}

export function PersonalizationSetup({ isOpen, onClose, onComplete }: PersonalizationSetupProps) {
  const [currentStep, setCurrentStep] = React.useState(0)
  const [interests, setInterests] = React.useState<UserInterests>(() => 
    PersonalizationService.getUserInterests()
  )

  const steps = [
    {
      title: 'What sports are you interested in?',
      description: 'Select the sports you participate in or want to learn about',
      key: 'sports' as keyof UserInterests,
      options: interestOptions.sports,
      multiSelect: true
    },
    {
      title: 'What equipment interests you most?',
      description: 'Choose the types of gear you want to see reviews and guides for',
      key: 'equipment' as keyof UserInterests,
      options: interestOptions.equipment,
      multiSelect: true
    },
    {
      title: 'What\'s your experience level?',
      description: 'This helps us recommend content at the right difficulty level',
      key: 'experience' as keyof UserInterests,
      options: ['Beginner', 'Intermediate', 'Advanced', 'Professional'],
      multiSelect: false
    },
    {
      title: 'What are your main goals?',
      description: 'Select what you\'re trying to achieve with sports and fitness',
      key: 'goals' as keyof UserInterests,
      options: interestOptions.goals,
      multiSelect: true
    },
    {
      title: 'What content do you prefer?',
      description: 'Choose the types of content you find most valuable',
      key: 'preferredContent' as keyof UserInterests,
      options: interestOptions.contentTypes,
      multiSelect: true
    }
  ]

  const currentStepData = steps[currentStep]

  const handleOptionToggle = (option: string) => {
    const key = currentStepData.key
    
    if (currentStepData.multiSelect) {
      const currentValues = Array.isArray(interests[key]) ? interests[key] as string[] : []
      const newValues = currentValues.includes(option)
        ? currentValues.filter(v => v !== option)
        : [...currentValues, option]
      
      setInterests(prev => ({ ...prev, [key]: newValues }))
    } else {
      setInterests(prev => ({ ...prev, [key]: option.toLowerCase() }))
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    PersonalizationService.saveUserInterests(interests)
    onComplete?.(interests)
    onClose()
  }

  const isStepValid = () => {
    const key = currentStepData.key
    const value = interests[key]
    
    if (currentStepData.multiSelect) {
      return Array.isArray(value) && value.length > 0
    } else {
      return Boolean(value)
    }
  }

  const getCurrentValues = (): string[] => {
    const key = currentStepData.key
    const value = interests[key]
    
    if (currentStepData.multiSelect) {
      return Array.isArray(value) ? value : []
    } else {
      return value ? [value as string] : []
    }
  }

  const topCategories = BehaviorTracker.getTopCategories(3)

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-2xl shadow-xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    Personalize Your Experience
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    Step {currentStep + 1} of {steps.length}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Progress bar */}
              <div className="mt-4 bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                <motion.div
                  className="bg-lime-600 dark:bg-lime-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6 overflow-y-auto max-h-[60vh]">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                  {currentStepData.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                  {currentStepData.description}
                </p>

                {/* Smart suggestions based on behavior */}
                {currentStep === 0 && topCategories.length > 0 && (
                  <div className="mb-4 p-3 bg-lime-50 dark:bg-lime-900/20 rounded-lg">
                    <p className="text-sm font-medium text-lime-800 dark:text-lime-200 mb-2">
                      Based on your browsing, you might like:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {topCategories.map(category => (
                        <button
                          key={category}
                          onClick={() => handleOptionToggle(category)}
                          className="px-3 py-1 bg-lime-100 dark:bg-lime-800 text-lime-700 dark:text-lime-300 rounded-full text-sm hover:bg-lime-200 dark:hover:bg-lime-700 transition-colors"
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentStepData.options.map((option) => {
                    const isSelected = getCurrentValues().includes(option) || 
                      getCurrentValues().includes(option.toLowerCase())
                    
                    return (
                      <button
                        key={option}
                        onClick={() => handleOptionToggle(option)}
                        className={clsxm(
                          'p-4 rounded-lg border-2 transition-all text-left',
                          'hover:border-lime-300 dark:hover:border-lime-600',
                          isSelected
                            ? 'border-lime-500 dark:border-lime-400 bg-lime-50 dark:bg-lime-900/20 text-lime-700 dark:text-lime-300'
                            : 'border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option}</span>
                          {isSelected && (
                            <svg className="w-5 h-5 text-lime-600 dark:text-lime-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={clsxm(
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  currentStep === 0
                    ? 'text-zinc-400 dark:text-zinc-600 cursor-not-allowed'
                    : 'text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100'
                )}
              >
                Back
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-zinc-600 dark:text-zinc-300 hover:text-zinc-800 dark:hover:text-zinc-100 transition-colors"
                >
                  Skip for now
                </button>
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={clsxm(
                    'px-6 py-2 rounded-lg font-medium transition-colors',
                    isStepValid()
                      ? 'bg-lime-600 hover:bg-lime-700 text-white'
                      : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
                  )}
                >
                  {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}