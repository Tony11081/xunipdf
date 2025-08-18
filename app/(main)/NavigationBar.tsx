'use client'

import { Popover, type PopoverProps, Transition } from '@headlessui/react'
import { clsxm } from '@zolplay/utils'
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { navigationItems, type NavigationItem } from '~/config/nav'

function NavItem({ item }: { item: NavigationItem }) {
  const pathname = usePathname()
  const isActive = item.href ? pathname === item.href : 
    item.subItems?.some(subItem => pathname === subItem.href)

  // Simple navigation item
  if (item.href && !item.subItems) {
    return (
      <li>
        <Link
          href={item.href}
          className={clsxm(
            'relative block whitespace-nowrap px-3 py-2 transition',
            isActive
              ? 'text-lime-600 dark:text-lime-400'
              : 'hover:text-lime-600 dark:hover:text-lime-400'
          )}
        >
          {item.text}
          {isActive && (
            <motion.span
              className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-lime-700/0 via-lime-700/70 to-lime-700/0 dark:from-lime-400/0 dark:via-lime-400/40 dark:to-lime-400/0"
              layoutId="active-nav-item"
            />
          )}
        </Link>
      </li>
    )
  }

  // Dropdown navigation item
  return (
    <li className="relative group">
      <button
        className={clsxm(
          'relative flex items-center whitespace-nowrap px-3 py-2 transition',
          isActive
            ? 'text-lime-600 dark:text-lime-400'
            : 'hover:text-lime-600 dark:hover:text-lime-400'
        )}
      >
        {item.text}
        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {isActive && (
          <motion.span
            className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-lime-700/0 via-lime-700/70 to-lime-700/0 dark:from-lime-400/0 dark:via-lime-400/40 dark:to-lime-400/0"
            layoutId="active-nav-item"
          />
        )}
      </button>
      
      {/* Dropdown menu */}
      <div className="absolute left-0 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-lg ring-1 ring-zinc-900/5 dark:ring-zinc-100/10 py-2 min-w-48">
          {item.subItems?.map((subItem) => {
            const subIsActive = pathname === subItem.href
            return (
              <Link
                key={subItem.href}
                href={subItem.href}
                className={clsxm(
                  'block px-4 py-2 text-sm transition-colors',
                  subIsActive
                    ? 'text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-900/20'
                    : 'text-zinc-700 dark:text-zinc-300 hover:text-lime-600 dark:hover:text-lime-400 hover:bg-zinc-50 dark:hover:bg-zinc-700/50'
                )}
              >
                {subItem.text}
              </Link>
            )
          })}
        </div>
      </div>
    </li>
  )
}

function Desktop({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const radius = useMotionValue(0)
  const handleMouseMove = React.useCallback(
    ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const bounds = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - bounds.left)
      mouseY.set(clientY - bounds.top)
      radius.set(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) / 2.5)
    },
    [mouseX, mouseY, radius]
  )
  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color) 0%, transparent 65%)`

  return (
    <nav
      onMouseMove={handleMouseMove}
      className={clsxm(
        'group relative cursor-pointer',
        'rounded-full bg-gradient-to-b from-zinc-50/70 to-white/90',
        'shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md',
        'dark:from-zinc-900/70 dark:to-zinc-800/90 dark:ring-zinc-100/10',
        '[--spotlight-color:rgb(236_252_203_/_0.6)] dark:[--spotlight-color:rgb(217_249_157_/_0.07)]',
        className
      )}
      {...props}
    >
      {/* Spotlight overlay */}
      <motion.div
        className="absolute -inset-px rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
        aria-hidden="true"
      />

      <ul className="flex bg-transparent px-3 text-sm font-medium text-zinc-800 dark:text-zinc-200 ">
        {navigationItems.map((item) => (
          <NavItem key={item.href || item.text} item={item} />
        ))}
      </ul>
    </nav>
  )
}

function MobileNavItem({ item }: { item: NavigationItem }) {
  if (item.href && !item.subItems) {
    return (
      <li>
        <Popover.Button as={Link} href={item.href} className="block py-2">
          {item.text}
        </Popover.Button>
      </li>
    )
  }

  return (
    <li>
      <div className="py-2">
        <div className="font-medium text-zinc-900 dark:text-zinc-100 mb-2">{item.text}</div>
        <div className="pl-4 space-y-1">
          {item.subItems?.map((subItem) => (
            <Popover.Button key={subItem.href} as={Link} href={subItem.href} className="block py-1 text-sm text-zinc-600 dark:text-zinc-400">
              {subItem.text}
            </Popover.Button>
          ))}
        </div>
      </div>
    </li>
  )
}

function Mobile(props: PopoverProps<'div'>) {
  return (
    <Popover {...props}>
      <Popover.Button className="group flex items-center rounded-full bg-gradient-to-b from-zinc-50/20 to-white/80 px-4 py-2 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur-md focus:outline-none focus-visible:ring-2 dark:from-zinc-900/30 dark:to-zinc-800/80 dark:text-zinc-200 dark:ring-white/10 dark:hover:ring-white/20 dark:focus-visible:ring-yellow-500/80">
        Menu
        {/* Chevron */}
        <svg
          viewBox="0 0 8 6"
          aria-hidden="true"
          className="ml-3 h-auto w-2 stroke-zinc-500 group-hover:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
        >
          <path
            d="M1.75 1.75 4 4.25l2.25-2.5"
            fill="none"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Popover.Button>
      <Transition.Root>
        <Transition.Child
          as={React.Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Popover.Overlay className="fixed inset-0 z-50 bg-zinc-800/40 backdrop-blur dark:bg-black/80" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-150 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="fixed inset-x-4 top-8 z-50 origin-top rounded-3xl bg-gradient-to-b from-zinc-100/75 to-white p-8 ring-1 ring-zinc-900/5 dark:from-zinc-900/50 dark:to-zinc-900 dark:ring-zinc-800"
          >
            <div className="flex flex-row-reverse items-center justify-between">
              <Popover.Button aria-label="Close menu" className="-m-1 p-1">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-6 w-6 text-zinc-500 dark:text-zinc-400"
                >
                  <path
                    d="m17.25 6.75-10.5 10.5M6.75 6.75l10.5 10.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Popover.Button>
              <h2 className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                Site Navigation
              </h2>
            </div>
            <nav className="mt-6">
              <ul className="-my-2 divide-y divide-zinc-500/20 text-base text-zinc-800 dark:divide-zinc-100/5 dark:text-zinc-300">
                {navigationItems.map((item) => (
                  <MobileNavItem key={item.href || item.text} item={item} />
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-zinc-500/20 dark:border-zinc-100/5">
                <a
                  href="https://wa.me/8613462248923"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-lime-600 dark:text-lime-400"
                  onClick={() => {
                    const button = document.querySelector('[aria-label="Close menu"]') as HTMLButtonElement
                    if (button) button.click()
                  }}
                >
                  <span>💬</span> 
                  <span>Contact Support (WhatsApp)</span>
                </a>
              </div>
            </nav>
          </Popover.Panel>
        </Transition.Child>
      </Transition.Root>
    </Popover>
  )
}

export const NavigationBar = {
  Desktop,
  Mobile,
} as const
