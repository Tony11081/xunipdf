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
    default: 'Premium Digital Resources & Templates Marketplace',
    template: '%s | Digital Resources Hub'
  },
  description:
    'Premium digital templates, graphics, and creative assets for professionals and businesses. Instant download with commercial license.',
  keywords: [
    'digital templates','design resources','creative assets','business templates','graphics download',
    'presentation templates','design tools'
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
    siteName: 'Digital Resources Hub',
    url: 'https://tarotdeck.online',
    title: 'Premium Digital Resources & Templates Marketplace',
    description:
      'Discover premium digital templates, graphics, and creative assets for your professional projects.',
    images: [{ url: '/og/cover.png', width: 1200, height: 630, alt: 'Digital Resources Hub' }]
  },
  twitter: {
    card: 'summary_large_image',
    site: '@tarotdeck_online',
    creator: '@tarotdeck_online',
    title: 'Premium Digital Resources & Templates Marketplace',
    description:
      'Premium digital templates, graphics, and creative assets for professionals.',
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
