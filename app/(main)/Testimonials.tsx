'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface TestimonialProps {
  quote: string
  author: string
  city: string
  country: string
  flag: string
  index: number
}

const Testimonial = ({ quote, author, city, country, flag, index }: TestimonialProps) => {
  // 不同的头像风格数组
  const styles = [
    'adventurer', 'avataaars', 'bottts', 'micah', 'personas', 'pixel-art', 'lorelei'
  ];
  
  // 基于索引选择不同的风格，让头像更加多样化
  const avatarStyle = styles[index % styles.length];
  
  // 使用最新的DiceBear API URL格式
  const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${encodeURIComponent(author)}`;
  
  // 静态头像备用URL，当DiceBear API不可用时使用
  const fallbackAvatarUrl = `/avatars/avatar_${(index % 8) + 1}.png`;
  
  return (
    <motion.blockquote 
      className="bg-zinc-50 dark:bg-zinc-800/70 p-4 rounded-lg shadow-sm break-inside-avoid mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
    >
      <p className="text-zinc-800 dark:text-zinc-200">&ldquo;{quote}&rdquo;</p>
      <footer className="mt-2 flex items-center">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 bg-zinc-100 dark:bg-zinc-700">
          <Image
            src={avatarUrl}
            alt={`${author}'s avatar`} 
            className="w-full h-full object-cover"
            width={32}
            height={32}
            unoptimized={true}
            onError={(e) => {
              // 当API加载失败时使用本地静态头像
              const target = e.target as HTMLImageElement;
              target.onerror = null; // 防止无限循环
              target.src = fallbackAvatarUrl;
            }}
          />
        </div>
        <div className="ml-2">
          <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {author}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {flag} {city}, {country}
          </p>
        </div>
      </footer>
    </motion.blockquote>
  )
}

export function Testimonials() {
  const testimonials = [
    {
      quote: "The tarot card meanings guide finally helped me understand the deeper symbolism. My readings are so much more accurate now.",
      author: "Emily J.",
      city: "San Diego",
      country: "USA",
      flag: "🇺🇸"
    },
    {
      quote: "Their authentic tarot deck guide saved me from buying a cheap imitation. The quality difference is remarkable.",
      author: "Daniel K.",
      city: "London",
      country: "UK",
      flag: "🇬🇧"
    },
    {
      quote: "The card care tips have preserved my vintage tarot deck perfectly. It still looks brand new after years of use.",
      author: "Leon M.",
      city: "Berlin",
      country: "Germany",
      flag: "🇩🇪"
    },
    {
      quote: "As a spiritual counselor, their tarot reading guides helped me provide deeper insights to clients. Life-changing.",
      author: "Sophia R.",
      city: "Toronto",
      country: "Canada",
      flag: "🇨🇦"
    },
    {
      quote: "Found rare oracle cards that aren't available in Sweden. The spiritual energy in these cards is incredible.",
      author: "Anna L.",
      city: "Stockholm",
      country: "Sweden",
      flag: "🇸🇪"
    },
    {
      quote: "Their authenticity guide helped me avoid counterfeit tarot decks. Honest, spiritual guidance you can trust.",
      author: "Maximilian P.",
      city: "Vienna",
      country: "Austria",
      flag: "🇦🇹"
    },
    {
      quote: "The Celtic Cross spread tutorial was perfect for my skill level. Finally mastering complex readings.",
      author: "Takashi Y.",
      city: "Tokyo",
      country: "Japan",
      flag: "🇯🇵"
    },
    {
      quote: "Tarot symbolism made simple — now I understand archetypes and spiritual meanings like never before.",
      author: "Claire D.",
      city: "Paris",
      country: "France",
      flag: "🇫🇷"
    },
    {
      quote: "Their spiritual journey guide opened new dimensions in my practice. Found my true calling as a reader.",
      author: "Marco V.",
      city: "Rome",
      country: "Italy",
      flag: "🇮🇹"
    },
    {
      quote: "The intuitive reading techniques transformed my connection with the cards. No more second-guessing!",
      author: "Isabella C.",
      city: "Barcelona",
      country: "Spain",
      flag: "🇪🇸"
    },
    {
      quote: "Beginner's tarot course was perfect for starting my spiritual journey. Now doing daily readings confidently.",
      author: "Thomas W.",
      city: "Sydney",
      country: "Australia",
      flag: "🇦🇺"
    },
    {
      quote: "Card cleansing rituals have kept my deck's energy pure and vibrant. The spiritual connection is stronger.",
      author: "Laura B.",
      city: "Amsterdam",
      country: "Netherlands",
      flag: "🇳🇱"
    },
    {
      quote: "Meditation techniques before readings cut my confusion in half. Spiritual clarity improved dramatically.",
      author: "Michael O.",
      city: "Dublin",
      country: "Ireland",
      flag: "🇮🇪"
    },
    {
      quote: "Sacred space setup guides helped me create a powerful reading environment at home. Pure magic.",
      author: "Pavel K.",
      city: "Prague",
      country: "Czech Republic",
      flag: "🇨🇿"
    },
    {
      quote: "Reading etiquette tips made my first professional session amazing. Clients felt truly heard and guided.",
      author: "Nina S.",
      city: "Oslo",
      country: "Norway",
      flag: "🇳🇴"
    },
    {
      quote: "Oracle card recommendations were perfect for my healing practice. Quality lasted through countless sessions.",
      author: "Maria F.",
      city: "Mexico City",
      country: "Mexico",
      flag: "🇲🇽"
    },
    {
      quote: "Psychic protection techniques saved my energy during difficult readings. Three years of clear practice.",
      author: "David L.",
      city: "Seoul",
      country: "South Korea",
      flag: "🇰🇷"
    },
    {
      quote: "Teaching tarot to beginners became easier with their guides. My workshops are now engaging and enlightening.",
      author: "Emma H.",
      city: "Wellington",
      country: "New Zealand",
      flag: "🇳🇿"
    },
    {
      quote: "Authentic vs printed deck guide helped me make informed spiritual purchases. No regrets anymore.",
      author: "Raj P.",
      city: "Singapore",
      country: "Singapore",
      flag: "🇸🇬"
    },
    {
      quote: "Crystal pairing recommendations keep my tarot practice energized. Extended my spiritual connection significantly.",
      author: "Andre M.",
      city: "Rio de Janeiro",
      country: "Brazil",
      flag: "🇧🇷"
    }
  ]
  
  return (
    <section className="bg-white dark:bg-zinc-900 py-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="text-center px-4">
        <motion.h2 
          className="text-3xl font-bold text-zinc-900 dark:text-zinc-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Trusted by spiritual seekers worldwide
        </motion.h2>
        <motion.p 
          className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Here&apos;s what tarot practitioners and spiritual seekers say about TarotDeck Online:
        </motion.p>
      </div>

      <div className="mt-10 max-w-7xl mx-auto px-4">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-0">
          {testimonials.map((testimonial, index) => (
            <Testimonial 
              key={`testimonial-${index}`}
              quote={testimonial.quote}
              author={testimonial.author}
              city={testimonial.city}
              country={testimonial.country}
              flag={testimonial.flag}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 