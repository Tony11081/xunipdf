import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Container } from '~/components/ui/Container'
import { Newsletter } from '~/app/(main)/Newsletter'

// 分类常量
const CATEGORIES = {
  PLATFORM: 'Platform Guides',
  SHIPPING: 'Shipping & Payment',
  SAFETY: 'Safety & Scams',
  TOOLS: 'Tools & Dashboards'
};

// 徽章组件
function Badge({ children, color = 'green' }) {
  const colorClasses = {
    green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  };
  
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${colorClasses[color]}`}>
      {children}
    </span>
  );
}

// 分类标签组件
function CategoryTag({ category }) {
  const categoryConfig = {
    [CATEGORIES.PLATFORM]: { icon: '🛍️', color: 'blue' },
    [CATEGORIES.SHIPPING]: { icon: '🌍', color: 'green' },
    [CATEGORIES.SAFETY]: { icon: '🔍', color: 'red' },
    [CATEGORIES.TOOLS]: { icon: '🛠', color: 'amber' },
  };
  
  const { icon, color } = categoryConfig[category];
  
  return (
    <Badge color={color}>
      <span className="flex items-center gap-1">
        <span>{icon}</span>
        <span>{category}</span>
      </span>
    </Badge>
  );
}

export default function Page() {
  // 指南列表 - 现在包含更多元数据
  const guides = [
    {
      title: "How to Buy from Weidian (in English)",
      description: "Step-by-step walkthrough for creating an account, adding items, and checking out from Weidian.",
      slug: "how-to-buy-from-weidian",
      category: CATEGORIES.PLATFORM,
      icon: "🛍️",
      isNew: true,
      isEditorsPick: true,
      audience: "Perfect for first-time buyers new to Chinese platforms.",
      lastUpdated: "May 2025",
    },
    {
      title: "Shipping Weidian Products Internationally",
      description: "Tips and tools for forwarding agents, shipping costs, and delivery timeframes.",
      slug: "shipping-weidian-products-internationally",
      category: CATEGORIES.SHIPPING,
      icon: "✈️",
      audience: "Perfect for first-time users confused about delivery timelines.",
      lastUpdated: "April 2025",
    },
    {
      title: "Buying on Taobao with a Foreign Card",
      description: "Payment tips and common pitfalls for non-Chinese buyers.",
      slug: "buying-on-taobao-with-foreign-card",
      category: CATEGORIES.PLATFORM,
      icon: "💳",
      isNew: true, 
      audience: "Helps you avoid common payment errors with overseas cards.",
      lastUpdated: "May 2025",
    },
    {
      title: "Finding Trending Products on Xiaohongshu",
      description: "How to discover and buy popular items from China's top social commerce platform.",
      slug: "trending-products-on-xiaohongshu",
      category: CATEGORIES.PLATFORM,
      icon: "🔍",
      audience: "Ideal for trend-hunters looking to find viral products before they go global.",
      lastUpdated: "March 2025",
    },
    {
      title: "Avoiding Scams & Counterfeit Products",
      description: "Red flags to watch for and how to verify seller reputation when shopping on Chinese platforms.",
      slug: "avoiding-scams-counterfeit-products",
      category: CATEGORIES.SAFETY,
      icon: "🚨",
      audience: "Essential reading for anyone concerned about product authenticity.",
      lastUpdated: "April 2025",
    },
    {
      title: "Currency Conversion & Fees Explained",
      description: "Understanding the true cost of international purchases from Chinese platforms.",
      slug: "currency-conversion-fees-explained",
      category: CATEGORIES.SHIPPING,
      icon: "💱",
      audience: "Helps budget-conscious shoppers avoid hidden fees.",
      lastUpdated: "February 2025",
    },
  ];
  
  // 获取所有唯一分类
  const uniqueCategories = [...new Set(guides.map(guide => guide.category))];
  
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Guides
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Step-by-step guides to help you shop from Weidian, Taobao, Xiaohongshu, and more — no Chinese required.</Balancer>
        </p>
      </header>
      
      {/* 搜索框 */}
      <div className="mt-10 max-w-3xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-zinc-500 dark:text-zinc-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input 
            type="search" 
            className="block w-full p-4 pl-10 text-sm text-zinc-900 border border-zinc-300 rounded-lg bg-zinc-50 focus:ring-teal-500 focus:border-teal-500 dark:bg-zinc-800 dark:border-zinc-700 dark:placeholder-zinc-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500" 
            placeholder="Search guides..." 
          />
        </div>
      </div>
      
      {/* 分类导航 */}
      <div className="mt-8 flex flex-wrap gap-3 max-w-3xl">
        {uniqueCategories.map((category) => (
          <button 
            key={category} 
            className="inline-flex items-center px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
          >
            {category === CATEGORIES.PLATFORM && '🛍️'}
            {category === CATEGORIES.SHIPPING && '🌍'}
            {category === CATEGORIES.SAFETY && '🔍'}
            {category === CATEGORIES.TOOLS && '🛠️'}
            <span className="ml-1">{category}</span>
          </button>
        ))}
      </div>
      
      {/* 编辑推荐 */}
      {guides.filter(guide => guide.isEditorsPick).map((guide) => (
        <div key={guide.slug} className="mt-10 p-6 bg-gradient-to-r from-teal-50 to-zinc-50 dark:from-teal-900/20 dark:to-zinc-800/50 rounded-xl border border-zinc-200/80 dark:border-zinc-700/80 max-w-3xl">
          <div className="flex items-start">
            <div className="text-3xl mr-4">{guide.icon}</div>
            <div>
              <div className="flex items-center gap-2">
                <Badge color="amber">📌 EDITOR'S PICK</Badge>
                {guide.isNew && <Badge color="green">NEW</Badge>}
              </div>
              <Link href={`/guides/${guide.slug}`} className="block mt-2">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">{guide.title}</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-1">{guide.description}</p>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm mt-3 italic">{guide.audience}</p>
                <div className="mt-3 flex items-center">
                  <CategoryTag category={guide.category} />
                  <span className="ml-3 text-xs text-zinc-500 dark:text-zinc-400">Updated {guide.lastUpdated}</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
      
      <div className="mt-12 sm:mt-16">
        <div className="flex max-w-3xl flex-col space-y-16">
          {/* 指南列表 */}
          <ul className="space-y-6 mt-6 text-left max-w-3xl">
            {guides.filter(guide => !guide.isEditorsPick).map((guide) => (
              <li key={guide.slug} className="bg-zinc-50 dark:bg-zinc-800/50 p-5 rounded-lg transition-all hover:shadow-md border border-zinc-200/80 dark:border-zinc-700/80">
                <Link href={`/guides/${guide.slug}`} className="block">
                  <div className="flex items-start">
                    <div className="text-3xl mr-4">{guide.icon}</div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{guide.title}</h3>
                        {guide.isNew && <Badge color="green">NEW</Badge>}
                      </div>
                      <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">{guide.description}</p>
                      <p className="text-zinc-600 dark:text-zinc-300 text-xs mt-2 italic">{guide.audience}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <CategoryTag category={guide.category} />
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">Updated {guide.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          
          {/* 订阅通知 */}
          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-700/40 text-center">
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Get notified when new guides go live</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
              We're adding new guides every week. Subscribe to be the first to know.
            </p>
            <div className="max-w-md mx-auto">
              <Newsletter />
            </div>
          </div>
          
          {/* 相关资源 */}
          <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-700/40">
            <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Related Resources</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li>
                <Link 
                  href="/how-to-buy" 
                  className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
                >
                  <span className="text-2xl mr-3">🛒</span>
                  <span className="text-zinc-800 dark:text-zinc-200">How to Buy from China</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/stores" 
                  className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
                >
                  <span className="text-2xl mr-3">🏪</span>
                  <span className="text-zinc-800 dark:text-zinc-200">Featured Stores</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
                >
                  <span className="text-2xl mr-3">📝</span>
                  <span className="text-zinc-800 dark:text-zinc-200">Blog</span>
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
                >
                  <span className="text-2xl mr-3">📞</span>
                  <span className="text-zinc-800 dark:text-zinc-200">Contact Us</span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 轻提示 */}
          <p className="text-sm text-zinc-400 mt-8 italic text-center">
            More guides coming soon — we're adding new ones weekly.
          </p>
        </div>
      </div>
    </Container>
  )
} 