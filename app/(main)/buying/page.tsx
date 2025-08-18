import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Container } from '~/components/ui/Container'
import { Newsletter } from '~/app/(main)/Newsletter'

// Trust level component
function TrustLevel({ level, color = 'green' }) {
  const colorClasses = {
    green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
  };
  
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${colorClasses[color]}`}>
      {level}
    </span>
  );
}

// Buying guide card
function BuyingGuide({ title, description, category, difficulty, trustLevel, icon, readTime, isEssential = false }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex gap-2">
          {isEssential && <TrustLevel level="ESSENTIAL" color="red" />}
          <TrustLevel level={trustLevel} color={trustLevel === 'High' ? 'green' : trustLevel === 'Medium' ? 'blue' : 'amber'} />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
          <span className="mr-4">⏱️ {readTime}</span>
          <span className="mr-4">📂 {category}</span>
          <span>🔒 {difficulty}</span>
        </div>
        <Link 
          href={`/buying/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm"
        >
          Read Guide →
        </Link>
      </div>
    </div>
  );
}

// Red flag warning card
function RedFlag({ icon, title, warning, severity }) {
  const severityColors = {
    'High': 'border-red-500 dark:border-red-400 bg-red-50 dark:bg-red-900/20',
    'Medium': 'border-amber-500 dark:border-amber-400 bg-amber-50 dark:bg-amber-900/20',
    'Low': 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
  };
  
  return (
    <div className={`p-4 rounded-lg border-2 ${severityColors[severity]}`}>
      <div className="flex items-start">
        <div className="text-2xl mr-3">{icon}</div>
        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{title}</h4>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{warning}</p>
          <span className={`inline-block mt-2 text-xs font-bold px-2 py-1 rounded-full ${
            severity === 'High' ? 'bg-red-200 dark:bg-red-900/40 text-red-800 dark:text-red-200' :
            severity === 'Medium' ? 'bg-amber-200 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200' :
            'bg-blue-200 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200'
          }`}>
            {severity.toUpperCase()} RISK
          </span>
        </div>
      </div>
    </div>
  );
}

// Official retailer card
function OfficialRetailer({ name, description, sports, verificationTips, website, reliability }) {
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold text-green-900 dark:text-green-100">{name}</h4>
        <div className="flex items-center">
          <span className="text-green-600 dark:text-green-400 mr-2">✅</span>
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-200 dark:bg-green-900/30 text-green-800 dark:text-green-400">
            {reliability}% AUTHENTIC
          </span>
        </div>
      </div>
      
      <p className="text-green-800 dark:text-green-200 mb-3">{description}</p>
      
      <div className="space-y-2 mb-4">
        <div>
          <span className="font-semibold text-green-900 dark:text-green-100">Specializes in: </span>
          <span className="text-green-700 dark:text-green-300">{sports}</span>
        </div>
        <div>
          <span className="font-semibold text-green-900 dark:text-green-100">Verification: </span>
          <span className="text-green-700 dark:text-green-300">{verificationTips}</span>
        </div>
        <div>
          <span className="font-semibold text-green-900 dark:text-green-100">Website: </span>
          <span className="text-green-700 dark:text-green-300 font-mono text-sm">{website}</span>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const buyingGuides = [
    {
      title: "How to Spot Fake Football Jerseys",
      description: "Complete authentication guide: stitching, tags, holograms, and fabric quality checks for authentic football shirts.",
      category: "Authentication",
      difficulty: "Beginner",
      trustLevel: "High",
      icon: "🛡️",
      readTime: "12 min",
      isEssential: true
    },
    {
      title: "Official vs Replica Jersey Guide",
      description: "Understanding the difference between authentic match-worn shirts and fan replicas. Price, quality, and features compared.",
      category: "Product Types",
      difficulty: "Beginner",
      trustLevel: "High",
      icon: "👕",
      readTime: "8 min",
      isEssential: true
    },
    {
      title: "Sneaker Authentication Masterclass",
      description: "Advanced techniques for verifying authentic Jordan, Nike, and Adidas sneakers. Includes box checks and verification apps.",
      category: "Authentication",
      difficulty: "Advanced",
      trustLevel: "High",
      icon: "👟",
      readTime: "18 min"
    },
    {
      title: "Safe Online Shopping for Sports Gear",
      description: "Identifying legitimate retailers, secure payment methods, and red flags to avoid when shopping for sports equipment online.",
      category: "Online Safety",
      difficulty: "Beginner",
      trustLevel: "High",
      icon: "🔒",
      readTime: "10 min"
    },
    {
      title: "Vintage Sports Memorabilia Buying",
      description: "Authentication methods for vintage jerseys, signed items, and collectibles. Includes certificate verification and provenance checks.",
      category: "Collectibles",
      difficulty: "Advanced",
      trustLevel: "Medium",
      icon: "📜",
      readTime: "15 min"
    },
    {
      title: "International Shipping & Customs Guide",
      description: "Navigating import duties, customs declarations, and shipping insurance for international sports equipment purchases.",
      category: "Logistics",
      difficulty: "Intermediate",
      trustLevel: "Medium",
      icon: "📦",
      readTime: "14 min"
    },
    {
      title: "Return Policies & Warranty Protection",
      description: "Understanding return windows, warranty coverage, and chargeback protections when buying expensive sports gear.",
      category: "Consumer Rights",
      difficulty: "Intermediate",
      trustLevel: "High",
      icon: "↩️",
      readTime: "11 min"
    },
    {
      title: "Sizing Guides Across Major Brands",
      description: "Comprehensive sizing charts for Nike, Adidas, Puma, and other major sports brands. Includes conversion tables.",
      category: "Sizing",
      difficulty: "Beginner",
      trustLevel: "High",
      icon: "📏",
      readTime: "9 min"
    }
  ];

  const redFlags = [
    {
      icon: "💸",
      title: "Too Good to Be True Prices",
      warning: "Authentic jerseys rarely sell below 70% of retail price. Be extremely cautious of deep discounts on new releases.",
      severity: "High"
    },
    {
      icon: "📱",
      title: "No Contact Information",
      warning: "Legitimate sellers provide phone numbers, physical addresses, and customer service. Avoid sites with only email contact.",
      severity: "High"
    },
    {
      icon: "🔍",
      title: "Blurry Product Photos",
      warning: "Authentic retailers use high-quality product images. Pixelated or stock photos often indicate counterfeit goods.",
      severity: "Medium"
    },
    {
      icon: "💳",
      title: "Unusual Payment Methods",
      warning: "Be wary of sellers requesting wire transfers, cryptocurrency, or gift cards. Stick to credit cards and PayPal.",
      severity: "High"
    },
    {
      icon: "📍",
      title: "Vague Shipping Information",
      warning: "Legitimate sellers provide clear shipping times, tracking, and return policies. Avoid vague 'ships from overseas' claims.",
      severity: "Medium"
    },
    {
      icon: "⭐",
      title: "Fake Reviews",
      warning: "Check review dates and patterns. Be suspicious of many 5-star reviews posted on the same dates with similar language.",
      severity: "Low"
    }
  ];

  const officialRetailers = [
    {
      name: "Nike Official Store",
      description: "Direct from Nike with full authenticity guarantee and comprehensive return policies.",
      sports: "Football, Basketball, Running, Training",
      verificationTips: "Check URL ends in .nike.com, official Nike apps, authorized physical stores",
      website: "nike.com",
      reliability: 100
    },
    {
      name: "Adidas Official Store", 
      description: "Authentic Adidas products with newest releases and exclusive collaborations.",
      sports: "Football, Soccer, Tennis, Originals",
      verificationTips: "Verify .adidas.com domain, three-stripe logo positioning, official mobile app",
      website: "adidas.com",
      reliability: 100
    },
    {
      name: "Fanatics",
      description: "Official licensed sports merchandise for NFL, NBA, MLB, NHL, and international leagues.",
      sports: "All major leagues and teams",
      verificationTips: "Look for official league partnerships, licensed product tags, team authentication",
      website: "fanatics.com",
      reliability: 95
    }
  ];

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Buying Guides (Authorized Only)
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Protect yourself from counterfeit sports gear. Learn to identify authentic products, find official retailers, and avoid common scams when buying jerseys, sneakers, and equipment.</Balancer>
        </p>
      </header>

      {/* Red flag identification */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">🚨 Red Flags to Avoid</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">Warning signs that indicate potential counterfeits or fraudulent sellers</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {redFlags.map((flag, index) => (
            <RedFlag
              key={index}
              icon={flag.icon}
              title={flag.title}
              warning={flag.warning}
              severity={flag.severity}
            />
          ))}
        </div>
      </div>

      {/* Verified official retailers */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">✅ Verified Official Retailers</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Trusted sources for authentic sports merchandise with genuine manufacturer warranties</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {officialRetailers.map((retailer, index) => (
            <OfficialRetailer
              key={index}
              name={retailer.name}
              description={retailer.description}
              sports={retailer.sports}
              verificationTips={retailer.verificationTips}
              website={retailer.website}
              reliability={retailer.reliability}
            />
          ))}
        </div>
      </div>

      {/* Essential buying guides */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Essential Buying Guides</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Critical knowledge every sports fan needs before making purchases</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {buyingGuides.filter(guide => guide.isEssential).map((guide, index) => (
            <BuyingGuide
              key={index}
              title={guide.title}
              description={guide.description}
              category={guide.category}
              difficulty={guide.difficulty}
              trustLevel={guide.trustLevel}
              icon={guide.icon}
              readTime={guide.readTime}
              isEssential={guide.isEssential}
            />
          ))}
        </div>
      </div>

      {/* Complete buying guide library */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">Complete Buying Guide Library</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {buyingGuides.map((guide, index) => (
            <BuyingGuide
              key={index}
              title={guide.title}
              description={guide.description}
              category={guide.category}
              difficulty={guide.difficulty}
              trustLevel={guide.trustLevel}
              icon={guide.icon}
              readTime={guide.readTime}
              isEssential={guide.isEssential}
            />
          ))}
        </div>
      </div>

      {/* Quick authentication checklist */}
      <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">Quick Authentication Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">🔍 Before You Buy</h4>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>✓ Verify seller is officially authorized</li>
              <li>✓ Check product photos for quality details</li>
              <li>✓ Read return policy and warranty terms</li>
              <li>✓ Compare prices across multiple sources</li>
              <li>✓ Look for official licensing marks</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">📦 When Item Arrives</h4>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>✓ Inspect packaging and official tags</li>
              <li>✓ Check stitching quality and alignment</li>
              <li>✓ Verify holographic security features</li>
              <li>✓ Test fabric quality and fit</li>
              <li>✓ Compare with official product images</li>
            </ul>
          </div>
        </div>
        <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Pro Tip:</strong> When in doubt, don't buy. It's better to pay full price from an official source than risk getting stuck with expensive counterfeits.
          </p>
        </div>
      </div>

      {/* Consumer protection resources */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-6">Consumer Protection Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <span className="text-2xl mr-3">🏦</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Chargeback Protection</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Credit card dispute process</div>
            </div>
          </div>
          
          <div className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700">
            <span className="text-2xl mr-3">⚖️</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Consumer Rights</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Know your legal protections</div>
            </div>
          </div>

          <Link 
            href="/contact" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">🆘</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Report Counterfeits</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Help protect other buyers</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Newsletter subscription */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700 text-center">
        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Stay Protected</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Get alerts about new scams, authentic product releases, and verified retailer promotions.
        </p>
        <div className="max-w-md mx-auto">
          <Newsletter />
        </div>
        <p className="text-xs text-zinc-400 mt-4 italic">
          Scam alerts • Authentic product releases • Verified deals • Consumer protection tips
        </p>
      </div>
    </Container>
  );
}