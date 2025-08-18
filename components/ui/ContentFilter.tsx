'use client'

import { clsxm } from '@zolplay/utils'
import React from 'react'
import { FilterHorizontalIcon } from '~/assets'

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface ContentFilterProps {
  className?: string
  title?: string
  options: FilterOption[]
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
  multiSelect?: boolean
  showCounts?: boolean
  showClearAll?: boolean
}

export function ContentFilter({
  className,
  title = 'Filter',
  options,
  selectedValues,
  onSelectionChange,
  multiSelect = true,
  showCounts = true,
  showClearAll = true
}: ContentFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleOptionClick = (value: string) => {
    if (multiSelect) {
      const newValues = selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
      onSelectionChange(newValues)
    } else {
      onSelectionChange(selectedValues.includes(value) ? [] : [value])
    }
  }

  const handleClearAll = () => {
    onSelectionChange([])
  }

  const selectedCount = selectedValues.length
  const hasSelections = selectedCount > 0

  return (
    <div className={clsxm('relative', className)}>
      {/* Filter Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={clsxm(
          'flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors',
          'text-sm font-medium',
          hasSelections
            ? 'bg-lime-50 dark:bg-lime-900/20 border-lime-200 dark:border-lime-800 text-lime-700 dark:text-lime-300'
            : 'bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700/50'
        )}
      >
        <FilterHorizontalIcon className="w-4 h-4" />
        <span>{title}</span>
        {hasSelections && (
          <span className="bg-lime-600 dark:bg-lime-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
            {selectedCount}
          </span>
        )}
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

      {/* Filter Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg z-50">
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {title}
              </span>
              {showClearAll && hasSelections && (
                <button
                  onClick={handleClearAll}
                  className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-lime-600 dark:hover:text-lime-400 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {options.map((option) => {
                const isSelected = selectedValues.includes(option.value)
                return (
                  <label
                    key={option.value}
                    className={clsxm(
                      'flex items-center gap-3 p-2 rounded cursor-pointer transition-colors',
                      'hover:bg-zinc-50 dark:hover:bg-zinc-700/50',
                      isSelected && 'bg-lime-50 dark:bg-lime-900/20'
                    )}
                  >
                    <input
                      type={multiSelect ? 'checkbox' : 'radio'}
                      name={multiSelect ? undefined : 'filter-option'}
                      checked={isSelected}
                      onChange={() => handleOptionClick(option.value)}
                      className="w-4 h-4 text-lime-600 bg-white border-zinc-300 rounded focus:ring-lime-500 dark:focus:ring-lime-600 dark:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
                    />
                    <span className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">
                      {option.label}
                    </span>
                    {showCounts && option.count !== undefined && (
                      <span className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-2 py-1 rounded">
                        {option.count}
                      </span>
                    )}
                  </label>
                )
              })}
            </div>

            {options.length === 0 && (
              <div className="text-center py-6 text-sm text-zinc-500 dark:text-zinc-400">
                No filter options available
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

// Quick filter chips component
interface QuickFiltersProps {
  className?: string
  filters: Array<{
    label: string
    value: string
    isActive: boolean
    onClick: () => void
  }>
}

export function QuickFilters({ className, filters }: QuickFiltersProps) {
  return (
    <div className={clsxm('flex flex-wrap gap-2', className)}>
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={filter.onClick}
          className={clsxm(
            'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
            filter.isActive
              ? 'bg-lime-600 text-white'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
          )}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}