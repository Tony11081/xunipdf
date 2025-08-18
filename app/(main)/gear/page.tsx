import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Container } from '~/components/ui/Container'
import { Newsletter } from '~/app/(main)/Newsletter'

// 装备等级组件
function GearLevel({ level, color = 'green' }) {
  const colorClasses = {
    green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  };
  
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${colorClasses[color]}`}>
      {level}
    </span>
  );
}

// 装备指南卡片
function GearCard({ title, description, category, priceRange, durability, icon, readTime, isRecommended = false }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex gap-2">
          {isRecommended && <GearLevel level="RECOMMENDED" color="purple" />}
          <GearLevel level={durability} color={durability === 'High' ? 'green' : durability === 'Medium' ? 'blue' : 'amber'} />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
          <span className="mr-4">⏱️ {readTime}</span>
          <span className="mr-4">💰 {priceRange}</span>
          <span>📂 {category}</span>
        </div>
        <Link 
          href={`/gear/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm"
        >
          Compare →
        </Link>
      </div>
    </div>
  );
}

// 装备护理提示卡片
function CareTip({ icon, title, tip, equipment }) {
  return (
    <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
      <div className="flex items-start">
        <div className="text-2xl mr-3">{icon}</div>
        <div>
          <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">{title}</h4>
          <p className="text-sm text-teal-800 dark:text-teal-200 mb-2">{tip}</p>
          <span className="inline-block text-xs font-medium px-2 py-1 rounded-full bg-teal-200 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200">
            {equipment}
          </span>
        </div>
      </div>
    </div>
  );
}

// 尺寸指南卡片
function SizingGuide({ brand, description, keyTips, fitType, popularSizes }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100">{brand}</h4>
        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-200 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400">
          {fitType} FIT
        </span>
      </div>
      
      <p className="text-blue-800 dark:text-blue-200 mb-4">{description}</p>
      
      <div className="space-y-3">
        <div>
          <span className="font-semibold text-blue-900 dark:text-blue-100">Key Tips: </span>
          <span className="text-blue-700 dark:text-blue-300">{keyTips}</span>
        </div>
        <div>
          <span className="font-semibold text-blue-900 dark:text-blue-100">Popular Sizes: </span>
          <span className="text-blue-700 dark:text-blue-300">{popularSizes}</span>
        </div>
      </div>
    </div>
  );
}

// 预算指南卡片
function BudgetGuide({ level, description, priceRange, recommendations, duration }) {
  const levelColors = {
    'Beginner': 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800',
    'Intermediate': 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800',
    'Professional': 'from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 border-purple-200 dark:border-purple-800'
  };
  
  return (
    <div className={`bg-gradient-to-br ${levelColors[level]} p-6 rounded-lg border`}>
      <h4 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 mb-2">{level} Level</h4>
      <p className="text-zinc-700 dark:text-zinc-300 mb-4">{description}</p>
      
      <div className="space-y-3">
        <div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Budget Range: </span>
          <span className="text-zinc-700 dark:text-zinc-300">{priceRange}</span>
        </div>
        <div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Focus On: </span>
          <span className="text-zinc-700 dark:text-zinc-300">{recommendations}</span>
        </div>
        <div>
          <span className="font-semibold text-zinc-900 dark:text-zinc-100">Lifespan: </span>
          <span className="text-zinc-700 dark:text-zinc-300">{duration}</span>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const gearGuides = [
    {
      title: "Football Boot Buying Guide 2024",
      description: "Complete guide to choosing the right boots: firm ground vs soft ground, stud patterns, and brand comparisons.",
      category: "Footwear",
      priceRange: "$60-300",
      durability: "High",
      icon: "⚽",
      readTime: "15 min",
      isRecommended: true
    },
    {
      title: "Running Shoe Technology Explained",
      description: "Understanding cushioning systems, heel drops, and stability features. Nike Air vs Adidas Boost comparison.",
      category: "Footwear",
      priceRange: "$80-200",
      durability: "Medium",
      icon: "👟",
      readTime: "12 min",
      isRecommended: true
    },
    {
      title: "Jersey Fabric Guide: Authentic vs Replica",
      description: "Material differences, breathability, durability, and care instructions for different jersey types.",
      category: "Apparel",
      priceRange: "$25-150",
      durability: "High",
      icon: "👕",
      readTime: "8 min"
    },
    {
      title: "Basketball Shoe Performance Breakdown",
      description: "Court vs street shoes, ankle support levels, traction patterns, and cushioning for different playing styles.",
      category: "Footwear",
      priceRange: "$70-180",
      durability: "Medium",
      icon: "🏀",
      readTime: "14 min"
    },
    {
      title: "Training Equipment for Home Gyms",
      description: "Space-efficient equipment selection, resistance bands, dumbbells, and multi-purpose gear recommendations.",
      category: "Equipment",
      priceRange: "$100-500",
      durability: "High",
      icon: "🏋️‍♂️",
      readTime: "18 min"
    },
    {
      title: "Goalkeeper Gloves Buying Guide",
      description: "Palm materials, finger protection, wrist support, and care instructions for different weather conditions.",
      category: "Specialized",
      priceRange: "$30-120",
      durability: "Low",
      icon: "🧤",
      readTime: "10 min"
    },
    {
      title: "Tennis Racket Selection Guide",
      description: "Head size, weight distribution, string tension, and grip size for different skill levels and playing styles.",
      category: "Equipment",
      priceRange: "$50-250",
      durability: "High",
      icon: "🎾",
      readTime: "13 min"
    },
    {
      title: "Compression Wear Benefits & Selection",
      description: "Medical benefits, material technologies, sizing considerations, and when to use compression clothing.",
      category: "Apparel",
      priceRange: "$20-80",
      durability: "Medium",
      icon: "🩱",
      readTime: "9 min"
    }
  ];

  const careTips = [
    {
      icon: "👟",
      title: "Sneaker Care",
      tip: "Use shoe trees after each wear. Rotate between 2-3 pairs to extend lifespan. Clean with soft brush and mild soap.",
      equipment: "Footwear"
    },
    {
      icon: "👕",
      title: "Jersey Washing",
      tip: "Turn inside out, cold water, gentle cycle. Air dry only - never use heat. Pre-treat stains immediately.",
      equipment: "Apparel"
    },
    {
      icon: "⚽",
      title: "Boot Maintenance",
      tip: "Clean studs after each use. Store in ventilated area. Use leather conditioner monthly for leather boots.",
      equipment: "Footwear"
    },
    {
      icon: "🧤",
      title: "Glove Storage",
      tip: "Never store wet gloves. Use glove wash or mild soap. Store flat with fingers spread to maintain shape.",
      equipment: "Specialized"
    },
    {
      icon: "🏋️‍♂️",
      title: "Equipment Storage",
      tip: "Wipe down after use. Store in dry environment. Regular maintenance checks for wear and safety.",
      equipment: "Equipment"
    },
    {
      icon: "🎾",
      title: "Racket Care",
      tip: "Store in protective case. Re-string regularly based on usage. Check grip wear and replace when needed.",
      equipment: "Equipment"
    }
  ];

  const sizingGuides = [
    {
      brand: "Nike",
      description: "Generally runs small, especially in basketball shoes. Consider half-size up for most models.",
      keyTips: "Try on in evening when feet are slightly swollen",
      fitType: "Narrow",
      popularSizes: "US 9-11 (Men), US 7-9 (Women)"
    },
    {
      brand: "Adidas",
      description: "Usually true to size with wider toe box. Three Stripes models tend to run slightly large.",
      keyTips: "Check specific model reviews for fit variations",
      fitType: "Regular",
      popularSizes: "US 8.5-10.5 (Men), US 6.5-8.5 (Women)"
    },
    {
      brand: "Puma",
      description: "Varies by model but generally true to size. Suede models may run slightly small.",
      keyTips: "Consider purpose: lifestyle vs performance sizing differs",
      fitType: "Regular",
      popularSizes: "US 8-10 (Men), US 6-8 (Women)"
    }
  ];

  const budgetGuides = [
    {
      level: "Beginner",
      description: "Starting out in sports - focus on essential items with good value for money.",
      priceRange: "$200-400 total",
      recommendations: "Quality footwear, basic apparel, safety gear if needed",
      duration: "1-2 years with proper care"
    },
    {
      level: "Intermediate", 
      description: "Regular participation - upgrade to performance-oriented gear with better materials.",
      priceRange: "$400-800 total",
      recommendations: "Specialized equipment, moisture-wicking apparel, multiple pairs of shoes",
      duration: "2-3 years with rotation"
    },
    {
      level: "Professional",
      description: "Serious athletes and competitors - top-tier gear with latest technology.",
      priceRange: "$800+ per season",
      recommendations: "Multiple specialized items, latest innovations, backup equipment",
      duration: "1 year or less due to heavy usage"
    }
  ];

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Gear Guide
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Expert reviews and recommendations for sports equipment. From football boots to tennis rackets - understand fabric technologies, sizing, durability, and proper care to make informed purchases.</Balancer>
        </p>
      </header>

      {/* 装备护理贴士 */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Essential Care Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {careTips.map((tip, index) => (
            <CareTip
              key={index}
              icon={tip.icon}
              title={tip.title}
              tip={tip.tip}
              equipment={tip.equipment}
            />
          ))}
        </div>
      </div>

      {/* 尺寸指南 */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Brand Sizing Guides</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Understanding how different brands fit to avoid returns and ensure comfort</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sizingGuides.map((guide, index) => (
            <SizingGuide
              key={index}
              brand={guide.brand}
              description={guide.description}
              keyTips={guide.keyTips}
              fitType={guide.fitType}
              popularSizes={guide.popularSizes}
            />
          ))}
        </div>
      </div>

      {/* 预算指南 */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Budget Planning Guide</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">How much to spend based on your involvement level and goals</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {budgetGuides.map((guide, index) => (
            <BudgetGuide
              key={index}
              level={guide.level}
              description={guide.description}
              priceRange={guide.priceRange}
              recommendations={guide.recommendations}
              duration={guide.duration}
            />
          ))}
        </div>
      </div>

      {/* 推荐装备指南 */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Recommended Gear Guides</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Most popular and essential equipment guides for sports enthusiasts</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gearGuides.filter(guide => guide.isRecommended).map((guide, index) => (
            <GearCard
              key={index}
              title={guide.title}
              description={guide.description}
              category={guide.category}
              priceRange={guide.priceRange}
              durability={guide.durability}
              icon={guide.icon}
              readTime={guide.readTime}
              isRecommended={guide.isRecommended}
            />
          ))}
        </div>
      </div>

      {/* 全部装备指南 */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">Complete Gear Library</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gearGuides.map((guide, index) => (
            <GearCard
              key={index}
              title={guide.title}
              description={guide.description}
              category={guide.category}
              priceRange={guide.priceRange}
              durability={guide.durability}
              icon={guide.icon}
              readTime={guide.readTime}
              isRecommended={guide.isRecommended}
            />
          ))}
        </div>
      </div>

      {/* 购买清单工具 */}
      <div className="mt-16 p-8 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
        <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4">Smart Shopping Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">🔍 Research Phase</h4>
            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
              <li>• Read reviews from verified purchasers</li>
              <li>• Compare prices across multiple retailers</li>
              <li>• Check return policies and warranty terms</li>
              <li>• Identify your specific needs and use cases</li>
              <li>• Set a realistic budget including accessories</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">🛒 Purchase Phase</h4>
            <ul className="space-y-2 text-sm text-amber-700 dark:text-amber-300">
              <li>• Buy from authorized dealers only</li>
              <li>• Check sizing charts carefully</li>
              <li>• Consider seasonal sales and clearances</li>
              <li>• Keep receipts and warranty information</li>
              <li>• Factor in care products and accessories</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong>Money-Saving Tip:</strong> Buy end-of-season gear for significant discounts, but verify the model year if latest technology is important for your performance.
          </p>
        </div>
      </div>

      {/* 相关资源 */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-6">Related Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/buying" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">🛡️</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Authentication Guide</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Avoid counterfeits and scams</div>
            </div>
          </Link>
          
          <Link 
            href="/training" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">🏃‍♂️</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Training Programs</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Get the most from your gear</div>
            </div>
          </Link>

          <Link 
            href="/contact" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">❓</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Gear Questions</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Get personalized recommendations</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 订阅区域 */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700 text-center">
        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Gear Updates & Reviews</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Get notified about new gear releases, comprehensive reviews, and seasonal equipment recommendations.
        </p>
        <div className="max-w-md mx-auto">
          <Newsletter />
        </div>
        <p className="text-xs text-zinc-400 mt-4 italic">
          New product alerts • In-depth reviews • Seasonal gear guides • Sale notifications
        </p>
      </div>
    </Container>
  );
}