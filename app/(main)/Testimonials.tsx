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
      quote: "I finally managed to buy from a Chinese shop without using Google Translate 10 times.",
      author: "Emily J.",
      city: "San Diego",
      country: "USA",
      flag: "🇺🇸"
    },
    {
      quote: "Weidian was a black box to me — now it feels as easy as Amazon.",
      author: "Daniel K.",
      city: "London",
      country: "UK",
      flag: "🇬🇧"
    },
    {
      quote: "Your guide helped me get sneakers from China shipped to Berlin. Worked flawlessly.",
      author: "Leon M.",
      city: "Berlin",
      country: "Germany",
      flag: "🇩🇪"
    },
    {
      quote: "I've ordered 20+ items from Taobao thanks to this platform. Customer service was super helpful.",
      author: "Sophia R.",
      city: "Toronto",
      country: "Canada",
      flag: "🇨🇦"
    },
    {
      quote: "Found some amazing Korean skincare products that aren't sold in Europe. All arrived perfectly.",
      author: "Anna L.",
      city: "Stockholm",
      country: "Sweden",
      flag: "🇸🇪"
    },
    {
      quote: "The shipping guide saved me so much money compared to using an expensive agent service.",
      author: "Maximilian P.",
      city: "Vienna",
      country: "Austria",
      flag: "🇦🇹"
    },
    {
      quote: "Love how the guide breaks down Xiaohongshu — I found limited edition collectibles at great prices.",
      author: "Takashi Y.",
      city: "Tokyo",
      country: "Japan",
      flag: "🇯🇵"
    },
    {
      quote: "Got vintage tea sets from China that would cost 4x more in boutiques here in Paris.",
      author: "Claire D.",
      city: "Paris",
      country: "France",
      flag: "🇫🇷"
    },
    {
      quote: "The platform's translation tools helped me communicate with sellers easily.",
      author: "Marco V.",
      city: "Rome",
      country: "Italy",
      flag: "🇮🇹"
    },
    {
      quote: "As a fashion designer, accessing Chinese fabric markets has been a game changer for my business.",
      author: "Isabella C.",
      city: "Barcelona",
      country: "Spain",
      flag: "🇪🇸"
    },
    {
      quote: "The payment guide made international transactions so much easier than I expected.",
      author: "Thomas W.",
      city: "Sydney",
      country: "Australia",
      flag: "🇦🇺"
    },
    {
      quote: "I've furnished my entire new apartment with items from China. Saved at least 60% on costs.",
      author: "Laura B.",
      city: "Amsterdam",
      country: "Netherlands",
      flag: "🇳🇱"
    },
    {
      quote: "Found authentic Asian ingredients that are impossible to find locally. The guide was spot on.",
      author: "Michael O.",
      city: "Dublin",
      country: "Ireland",
      flag: "🇮🇪"
    },
    {
      quote: "Navigating Chinese electronics markets was a nightmare before — now it's my go-to method.",
      author: "Pavel K.",
      city: "Prague",
      country: "Czech Republic",
      flag: "🇨🇿"
    },
    {
      quote: "Their shipping calculator saved me from unexpected customs fees. Everything was clear upfront.",
      author: "Nina S.",
      city: "Oslo",
      country: "Norway",
      flag: "🇳🇴"
    },
    {
      quote: "Found unique handcrafted jewelry pieces that get compliments every time I wear them.",
      author: "Maria F.",
      city: "Mexico City",
      country: "Mexico",
      flag: "🇲🇽"
    },
    {
      quote: "Getting gaming equipment from China has cut my costs by 40%. Delivery was faster than expected.",
      author: "David L.",
      city: "Seoul",
      country: "South Korea",
      flag: "🇰🇷"
    },
    {
      quote: "Perfect for sourcing materials for my small business. Customer support responded same day.",
      author: "Emma H.",
      city: "Wellington",
      country: "New Zealand",
      flag: "🇳🇿"
    },
    {
      quote: "The platform helped me navigate Chinese New Year closures and plan my orders strategically.",
      author: "Raj P.",
      city: "Singapore",
      country: "Singapore",
      flag: "🇸🇬"
    },
    {
      quote: "I collect rare vinyl records and found shops on Taobao with incredible selection thanks to the guides.",
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
          Loved by 10,000+ users worldwide
        </motion.h2>
        <motion.p 
          className="mt-2 text-zinc-600 dark:text-zinc-400 text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Here&apos;s what our users say about using ShopChina:
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