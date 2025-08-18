import Link from 'next/link'
import React from 'react'

import { CursorClickIcon, UsersIcon } from '~/assets'
import { PeekabooLink } from '~/components/links/PeekabooLink'
import { Container } from '~/components/ui/Container'
import { kvKeys } from '~/config/kv'
import { navigationItems } from '~/config/nav'
import { env } from '~/env.mjs'
import { prettifyNumber } from '~/lib/math'
import { redis } from '~/lib/redis'

function NavLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      className="transition hover:text-lime-500 dark:hover:text-lime-400"
    >
      {children}
    </Link>
  )
}

function Links() {
  // 页脚的导航链接，包括顶部导航栏中的链接以及About和Contact
  const footerLinks = [
    ...navigationItems,
    { href: '/about', text: 'About' },
    { href: '/contact', text: 'Contact' },
  ]
  
  return (
    <nav className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
      {footerLinks.map(({ href, text }) => (
        <NavLink key={href} href={href}>
          {text}
        </NavLink>
      ))}
    </nav>
  )
}

async function TotalPageViews() {
  let views: number
  if (env.VERCEL_ENV === 'production') {
    views = await redis.incr(kvKeys.totalPageViews)
  } else {
    views = 345678
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <UsersIcon className="h-4 w-4" />
      <span title={`${Intl.NumberFormat('en-US').format(views)} views`}>
        Total Views&nbsp;
        <span className="font-medium">{prettifyNumber(views, true)}</span>
      </span>
    </span>
  )
}

type VisitorGeolocation = {
  country: string
  city?: string
  flag: string
}
async function LastVisitorInfo() {
  let lastVisitor: VisitorGeolocation | undefined = undefined
  if (env.VERCEL_ENV === 'production') {
    const [lv, cv] = await redis.mget<VisitorGeolocation[]>(
      kvKeys.lastVisitor,
      kvKeys.currentVisitor
    )
    lastVisitor = lv
    await redis.set(kvKeys.lastVisitor, cv)
  }

  if (!lastVisitor) {
    lastVisitor = {
      country: 'US',
      flag: '🇺🇸',
    }
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <CursorClickIcon className="h-4 w-4" />
      <span>
        Recent visitor from&nbsp;
        {[lastVisitor.city, lastVisitor.country].filter(Boolean).join(', ')}
      </span>
      <span className="font-medium">{lastVisitor.flag}</span>
    </span>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="text-sm text-zinc-500/80 dark:text-zinc-400/80">
                <p>&copy; 2024-{new Date().getFullYear()} Kkgool. All rights reserved. 
                  <PeekabooLink href="/terms">Terms</PeekabooLink> · 
                  <PeekabooLink href="/privacy">Privacy</PeekabooLink>
                </p>
                <p className="mt-1 text-xs">Kkgool provides honest, practical guides for sports gear, training, and fan culture — no hype, just clear advice.</p>
                <div className="mt-2 flex items-center text-sm">
                  <a 
                    href="https://wa.me/8613462248923" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-lime-600 hover:text-lime-700 dark:text-lime-500 dark:hover:text-lime-400"
                  >
                    <span>💬</span>
                    <span>Contact Support</span>
                  </a>
                </div>
              </div>
              <Links />
            </div>
          </Container.Inner>
          <Container.Inner className="mt-6">
            <div className="flex flex-col items-center justify-start gap-2 sm:flex-row">
              <React.Suspense>
                <TotalPageViews />
              </React.Suspense>
              <React.Suspense>
                <LastVisitorInfo />
              </React.Suspense>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
