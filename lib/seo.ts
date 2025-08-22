export const seo = {
  title: 'TarotDeck Online | Digital Tarot Resources & Spiritual Guidance',
  description:
    'TarotDeck Online provides premium digital tarot resources, card meanings, and spiritual guidance tools for modern seekers and practitioners.',
  url: new URL(
    process.env.NODE_ENV === 'production'
      ? 'https://tarotdeck.online'
      : 'http://localhost:3000'
  ),
} as const
