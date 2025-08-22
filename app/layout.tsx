import './globals.css'
import './clerk.css'
import './prism.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata, Viewport } from 'next'
import Script from 'next/script'

import { ThemeProvider } from '~/app/(main)/ThemeProvider'
import { url } from '~/lib'
import { zhCN } from '~/lib/clerkLocalizations'
import { sansFont, displayFont } from '~/lib/font'
import { seo } from '~/lib/seo'
import { CookieConsent } from '~/components/CookieConsent'

export const metadata: Metadata = {
  metadataBase: new URL('https://tarotdeck.online'),
  title: {
    default: 'TarotDeck Online — Digital Tarot Resources & Readings',
    template: '%s | TarotDeck Online'
  },
  description:
    'Premium digital tarot resources, card meanings, and spiritual guidance tools for modern seekers.',
  keywords: [
    'tarot cards','digital readings','card meanings','spiritual guidance','oracle cards',
    'tarot spreads','divination tools'
  ],
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'TarotDeck Online',
    url: 'https://tarotdeck.online',
    title: 'TarotDeck Online — Digital Tarot Resources & Readings',
    description:
      'Discover your path with premium digital tarot resources and spiritual guidance tools.',
    images: [{ url: '/og/cover.png', width: 1200, height: 630, alt: 'TarotDeck Online' }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tarotdeck_online',
    creator: '@tarotdeck_online',
    title: 'TarotDeck Online — Digital Tarot Resources & Readings',
    description:
      'Premium digital tarot resources and spiritual guidance tools.',
    images: ['/og/cover.png']
  },
  alternates: { 
    canonical: 'https://tarotdeck.online',
    types: {
      'application/rss+xml': [{ url: 'rss', title: 'RSS Feed' }],
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#000212' },
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={zhCN}>
      <html
        lang="en"
        className={`${sansFont.variable} ${displayFont.variable} m-0 h-full p-0 font-sans antialiased`}
        suppressHydrationWarning
      >
        <head>
          <Script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2357915943973678"
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        </head>
        <body className="flex h-full flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <CookieConsent />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
