import Balancer from 'react-wrap-balancer'
import { Container } from '~/components/ui/Container'
import Link from 'next/link'

// 商店数据模拟
const mockStores = [
  {
    id: 1,
    name: "Urban Fit",
    platform: "Weidian",
    imageUrl: "/images/stores/store-placeholder-1.jpg",
    tags: ["Activewear", "Accessories"],
    comingSoon: true,
  },
  {
    id: 2,
    name: "Tech Zone",
    platform: "Taobao",
    imageUrl: "/images/stores/store-placeholder-2.jpg",
    tags: ["Electronics", "Gadgets"],
    comingSoon: true,
  },
  {
    id: 3,
    name: "Sneaker House",
    platform: "CNFANS",
    imageUrl: "/images/stores/store-placeholder-3.jpg",
    tags: ["Shoes", "Streetwear"],
    comingSoon: true,
  },
  {
    id: 4,
    name: "Home Style",
    platform: "DHGate",
    imageUrl: "/images/stores/store-placeholder-4.jpg",
    tags: ["Home Decor", "Lifestyle"],
    comingSoon: true,
  },
];

export default function Page() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Featured Stores
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Carefully selected top Chinese shopping platforms, all verified and supporting international shipping</Balancer>
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-6xl flex-col space-y-16">
            {/* 商店卡片区域 */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-8">
                Featured Stores Coming Soon
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockStores.map((store) => (
                  <div 
                    key={store.id} 
                    className="bg-white dark:bg-zinc-800/90 rounded-xl shadow-md overflow-hidden border border-zinc-200 dark:border-zinc-700/40 hover:shadow-lg transition-all"
                  >
                    <div className="h-48 bg-zinc-200 dark:bg-zinc-700 relative">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-zinc-500 dark:text-zinc-400 text-sm">
                          Store image coming soon
                        </span>
                      </div>
                      {store.comingSoon && (
                        <div className="absolute top-3 right-3 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          Coming Soon
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
                            {store.name}
                          </h3>
                          <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            {store.platform}
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {store.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="text-xs bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button 
                        disabled
                        className="mt-4 w-full bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400 py-2 rounded-lg font-medium text-sm cursor-not-allowed"
                      >
                        Browse Store Soon
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 通知订阅 */}
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700/40">
              <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-3">
                Get Store Launch Notifications
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Enter your email to receive notifications when our featured stores go live.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* 商店合作 */}
            <div className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-6 border border-zinc-200 dark:border-zinc-700/40">
              <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-3">
                Are You a Store Owner?
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Partner with us to showcase your store on ShopChina and reach global buyers.
              </p>
              <Link 
                href="/contact" 
                className="inline-block bg-zinc-800 dark:bg-zinc-200 hover:bg-zinc-900 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Partner With Us
              </Link>
            </div>
            
            {/* 相关页面链接 */}
            <div className="pt-6">
              <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 mb-4">
                Related Pages
              </h3>
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/how-to-buy" 
                  className="text-teal-500 hover:text-teal-600 flex items-center"
                >
                  <span className="mr-2">👉</span>
                  <span>How to Buy from China</span>
                </Link>
                <Link 
                  href="/guides" 
                  className="text-teal-500 hover:text-teal-600 flex items-center"
                >
                  <span className="mr-2">👉</span>
                  <span>Best CNFANS Finds 2025</span>
                </Link>
                <Link 
                  href="/guides" 
                  className="text-teal-500 hover:text-teal-600 flex items-center"
                >
                  <span className="mr-2">👉</span>
                  <span>Shopping Agent Guide</span>
                </Link>
              </div>
            </div>

            {/* SEO 文本 */}
            <div className="border-t border-zinc-200 dark:border-zinc-700/40 pt-6 text-sm text-zinc-500 dark:text-zinc-400">
              <p className="mb-2">
                ShopChina is building a curated list of featured stores across Chinese platforms like DHGate, Weidian, and Xiaohongshu. You'll soon find trusted suppliers for categories like activewear, sneakers, lifestyle, and more — all with English-friendly tools and links.
              </p>
              <p>
                Our goal is to provide international buyers with the most direct and secure shopping experience. Whether you're looking for high-quality replica products, unique designs, or affordable everyday items, you'll find suitable stores here. All stores are verified by our team to ensure your shopping experience is safe and reliable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
} 