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
  metadataBase: new URL('https://kkgool.cc'),
  title: {
    default: 'Kkgool — Sports Apparel & Fan Culture Guides',
    template: '%s | Kkgool'
  },
  description:
    'Clear, honest guides on jerseys, sizing, care, training basics and fan travel. No counterfeit links. AdSense friendly.',
  keywords: [
    'sports jerseys','sizing guide','kit care','fan travel','tactics explained',
    'training basics','injury prevention'
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
    siteName: 'Kkgool',
    url: 'https://kkgool.cc',
    title: 'Kkgool — Sports Apparel & Fan Culture Guides',
    description:
      'Choose better gear, care for it longer, and enjoy the game more.',
    images: [{ url: '/og/cover.png', width: 1200, height: 630, alt: 'Kkgool' }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kkgool_cc',
    creator: '@kkgool_cc',
    title: 'Kkgool — Sports Apparel & Fan Culture Guides',
    description:
      'How-to guides for jerseys & gear. No hype, no counterfeits.',
    images: ['/og/cover.png']
  },
  alternates: { 
    canonical: 'https://kkgool.cc',
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
