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
      quote: "The design templates finally helped me create professional presentations. My client meetings are so much more impactful now.",
      author: "Emily J.",
      city: "San Diego",
      country: "USA",
      flag: "🇺🇸"
    },
    {
      quote: "Their premium template collection saved me from using low-quality freebies. The quality difference is remarkable.",
      author: "Daniel K.",
      city: "London",
      country: "UK",
      flag: "🇬🇧"
    },
    {
      quote: "The file organization tips have kept my digital assets perfectly organized. Still easy to find after years of projects.",
      author: "Leon M.",
      city: "Berlin",
      country: "Germany",
      flag: "🇩🇪"
    },
    {
      quote: "As a freelance designer, their resource library helped me deliver better projects to clients. Game-changer.",
      author: "Sophia R.",
      city: "Toronto",
      country: "Canada",
      flag: "🇨🇦"
    },
    {
      quote: "Found premium graphics that aren't available elsewhere in Sweden. The creative assets are incredible.",
      author: "Anna L.",
      city: "Stockholm",
      country: "Sweden",
      flag: "🇸🇪"
    },
    {
      quote: "Their licensing guide helped me avoid copyright issues. Clear, professional guidance you can trust.",
      author: "Maximilian P.",
      city: "Vienna",
      country: "Austria",
      flag: "🇦🇹"
    },
    {
      quote: "The branding template pack was perfect for my startup. Finally have professional marketing materials.",
      author: "Takashi Y.",
      city: "Tokyo",
      country: "Japan",
      flag: "🇯🇵"
    },
    {
      quote: "Digital asset management made simple — now I organize projects and resources like never before.",
      author: "Claire D.",
      city: "Paris",
      country: "France",
      flag: "🇫🇷"
    },
    {
      quote: "Their business template collection opened new opportunities for my agency. Found my creative edge.",
      author: "Marco V.",
      city: "Rome",
      country: "Italy",
      flag: "🇮🇹"
    },
    {
      quote: "The design workflow tutorials transformed my creative process. No more second-guessing!",
      author: "Isabella C.",
      city: "Barcelona",
      country: "Spain",
      flag: "🇪🇸"
    },
    {
      quote: "Beginner's design course was perfect for starting my creative journey. Now creating content confidently.",
      author: "Thomas W.",
      city: "Sydney",
      country: "Australia",
      flag: "🇦🇺"
    },
    {
      quote: "File management systems have kept my projects organized and efficient. The workflow is so much smoother.",
      author: "Laura B.",
      city: "Amsterdam",
      country: "Netherlands",
      flag: "🇳🇱"
    },
    {
      quote: "Design best practices reduced my revision cycles dramatically. Client satisfaction improved significantly.",
      author: "Michael O.",
      city: "Dublin",
      country: "Ireland",
      flag: "🇮🇪"
    },
    {
      quote: "Workspace setup guides helped me create an efficient home office. Pure productivity boost.",
      author: "Pavel K.",
      city: "Prague",
      country: "Czech Republic",
      flag: "🇨🇿"
    },
    {
      quote: "Client presentation tips made my first pitch amazing. Clients were impressed and engaged throughout.",
      author: "Nina S.",
      city: "Oslo",
      country: "Norway",
      flag: "🇳🇴"
    },
    {
      quote: "Marketing template recommendations were perfect for my small business. Quality lasted through countless campaigns.",
      author: "Maria F.",
      city: "Mexico City",
      country: "Mexico",
      flag: "🇲🇽"
    },
    {
      quote: "Brand protection guidelines saved me from costly mistakes. Three years of successful projects.",
      author: "David L.",
      city: "Seoul",
      country: "South Korea",
      flag: "🇰🇷"
    },
    {
      quote: "Teaching design became easier with their educational resources. My students are now creating amazing work.",
      author: "Emma H.",
      city: "Wellington",
      country: "New Zealand",
      flag: "🇳🇿"
    },
    {
      quote: "Premium vs free resource guide helped me make informed creative investments. No regrets anymore.",
      author: "Raj P.",
      city: "Singapore",
      country: "Singapore",
      flag: "🇸🇬"
    },
    {
      quote: "Software integration tips keep my creative workflow seamless. Extended my productivity significantly.",
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
          Trusted by creators worldwide
        </motion.h2>
        <motion.p 
          className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Here&apos;s what designers, entrepreneurs and creators say about our platform:
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