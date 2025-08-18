export const seo = {
  title: 'Kkgool | Smart Guides for Sports Apparel & Fan Culture',
  description:
    'Kkgool helps fans choose, care and enjoy sports gear—no hype, just clear guides. Authorized buying tips, sizing, care, training & travel.',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://kkgool.cc'
      : 'http://localhost:3000'
  ),
} as const
