import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Container } from '~/components/ui/Container'
import { Newsletter } from '~/app/(main)/Newsletter'

// Travel type component
function TravelType({ type, color = 'green' }) {
  const colorClasses = {
    green: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    red: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  };
  
  return (
    <span className={`text-xs font-medium px-2 py-1 rounded-full inline-block ${colorClasses[color]}`}>
      {type}
    </span>
  );
}

// Travel guide card
function TravelGuide({ title, description, destination, travelType, difficulty, icon, readTime, isFeatured = false }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex gap-2">
          {isFeatured && <TravelType type="FEATURED" color="purple" />}
          <TravelType type={difficulty} color={difficulty === 'Easy' ? 'green' : difficulty === 'Moderate' ? 'blue' : 'red'} />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
          <span className="mr-4">⏱️ {readTime}</span>
          <span className="mr-4">📍 {destination}</span>
          <span>🎫 {travelType}</span>
        </div>
        <Link 
          href={`/travel/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm"
        >
          Plan Trip →
        </Link>
      </div>
    </div>
  );
}

// Quick travel tip card
function TravelTip({ icon, title, tip, category }) {
  const categoryColors = {
    'Money': 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20',
    'Safety': 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
    'Culture': 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20',
    'Logistics': 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20'
  };
  
  return (
    <div className={`p-4 rounded-lg border ${categoryColors[category]}`}>
      <div className="flex items-start">
        <div className="text-2xl mr-3">{icon}</div>
        <div>
          <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">{title}</h4>
          <p className="text-sm text-zinc-700 dark:text-zinc-300">{tip}</p>
          <span className="inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}

// Popular destination card
function DestinationCard({ city, country, flag, description, bestMatches, avgCost, peakSeason, highlights }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-3">{flag}</span>
        <div>
          <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100">{city}</h4>
          <p className="text-blue-700 dark:text-blue-300">{country}</p>
        </div>
      </div>
      
      <p className="text-blue-800 dark:text-blue-200 mb-4">{description}</p>
      
      <div className="space-y-3">
        <div>
          <span className="font-semibold text-blue-900 dark:text-blue-100">Best For: </span>
          <span className="text-blue-700 dark:text-blue-300">{bestMatches}</span>
        </div>
        <div>
          <span className="font-semibold text-blue-900 dark:text-blue-100">Daily Budget: </span>
          <span className="text-blue-700 dark:text-blue-300">{avgCost}</span>
        </div>
        <div>
          <span className="font-semibold text-blue-900 dark:text-blue-100">Peak Season: </span>
          <span className="text-blue-700 dark:text-blue-300">{peakSeason}</span>
        </div>
        <div>
          <span className="font-semibold text-blue-900 dark:text-blue-100">Must-Do: </span>
          <span className="text-blue-700 dark:text-blue-300">{highlights}</span>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const travelGuides = [
    {
      title: "Champions League Away Days Guide",
      description: "Complete planning guide: tickets, travel, accommodation, and matchday experience for European away games.",
      destination: "Europe",
      travelType: "Football",
      difficulty: "Moderate",
      icon: "🏆",
      readTime: "15 min",
      isFeatured: true
    },
    {
      title: "Premier League Weekend Experience",
      description: "Stadium tours, pubs, transport, and where to stay for the ultimate English football weekend.",
      destination: "England",
      travelType: "Football",
      difficulty: "Easy",
      icon: "⚽",
      readTime: "12 min",
      isFeatured: true
    },
    {
      title: "NBA Finals Travel Planning",
      description: "Arena guides, playoff atmosphere, and city recommendations for the ultimate basketball experience.",
      destination: "USA",
      travelType: "Basketball",
      difficulty: "Moderate",
      icon: "🏀",
      readTime: "11 min"
    },
    {
      title: "World Cup Survival Guide",
      description: "Visa requirements, accommodation booking, local transport, and cultural preparation for football's biggest tournament.",
      destination: "Qatar/USA",
      travelType: "Football",
      difficulty: "Advanced",
      icon: "🌍",
      readTime: "20 min"
    },
    {
      title: "Olympic Games Travel Tips",
      description: "Navigating Olympic cities, event selection, ticket strategies, and making the most of the Olympic experience.",
      destination: "Paris/LA",
      travelType: "Multi-Sport",
      difficulty: "Advanced",
      icon: "🥇",
      readTime: "18 min"
    },
    {
      title: "Super Bowl Experience Guide",
      description: "Game week activities, tailgating culture, ticket options, and experiencing America's biggest sports party.",
      destination: "USA",
      travelType: "Am. Football",
      difficulty: "Moderate",
      icon: "🏈",
      readTime: "14 min"
    },
    {
      title: "European Football Stadium Tours",
      description: "Self-guided tours of iconic stadiums across Europe, even on non-match days. Includes transport and timings.",
      destination: "Europe",
      travelType: "Football",
      difficulty: "Easy",
      icon: "🏟️",
      readTime: "10 min"
    },
    {
      title: "Tennis Grand Slam Travel",
      description: "Wimbledon, US Open, French Open, and Australian Open: tickets, dress codes, and tournament etiquette.",
      destination: "Global",
      travelType: "Tennis",
      difficulty: "Moderate",
      icon: "🎾",
      readTime: "16 min"
    }
  ];

  const travelTips = [
    {
      icon: "💰",
      title: "Budget Smart",
      tip: "Book flights 6-8 weeks ahead. Consider alternative airports and midweek games for savings.",
      category: "Money"
    },
    {
      icon: "🎫",
      title: "Ticket Security",
      tip: "Only buy from official sources or verified resellers. Screenshot tickets and save offline copies.",
      category: "Safety"
    },
    {
      icon: "🍺",
      title: "Local Pub Culture",
      tip: "Arrive 2 hours early at local pubs near stadiums. Ask locals about traditions and chants.",
      category: "Culture"
    },
    {
      icon: "🚇",
      title: "Transport Planning",
      tip: "Download city transport apps. Expect delays after games - plan buffer time for connections.",
      category: "Logistics"
    },
    {
      icon: "🏨",
      title: "Accommodation Timing",
      tip: "Book immediately after fixtures are confirmed. Stay near transport links, not necessarily the stadium.",
      category: "Logistics"
    },
    {
      icon: "👕",
      title: "What to Wear",
      tip: "Research dress codes. Some venues ban away colors. Layer clothing for weather changes.",
      category: "Culture"
    }
  ];

  const destinations = [
    {
      city: "London",
      country: "England",
      flag: "🇬🇧",
      description: "Home to world-class football with multiple Premier League stadiums and incredible fan culture.",
      bestMatches: "Premier League, FA Cup",
      avgCost: "£120-180/day",
      peakSeason: "Aug-May",
      highlights: "Wembley tours, traditional pubs, multiple matches per weekend"
    },
    {
      city: "Barcelona",
      country: "Spain", 
      flag: "🇪🇸",
      description: "Incredible football heritage with Camp Nou and beautiful city culture perfect for sports tourism.",
      bestMatches: "La Liga, Champions League",
      avgCost: "€80-120/day",
      peakSeason: "Sep-May",
      highlights: "Camp Nou Experience, Las Ramblas, beach and football combo"
    },
    {
      city: "Munich",
      country: "Germany",
      flag: "🇩🇪",
      description: "Bayern Munich's home with incredible beer culture and one of Europe's best football atmospheres.",
      bestMatches: "Bundesliga, Champions League",
      avgCost: "€90-140/day",
      peakSeason: "Sep-May",
      highlights: "Allianz Arena tours, Oktoberfest (Sep), Bavarian football traditions"
    }
  ];

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Fan Travel
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Complete travel guides for sports fans: from Champions League away days to Grand Slam tennis. Visa tips, ticket strategies, cultural insights, and matchday experiences.</Balancer>
        </p>
      </header>

      {/* Essential fan travel tips */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Essential Fan Travel Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {travelTips.map((tip, index) => (
            <TravelTip
              key={index}
              icon={tip.icon}
              title={tip.title}
              tip={tip.tip}
              category={tip.category}
            />
          ))}
        </div>
      </div>

      {/* Top sports destinations */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Top Sports Destinations</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Best cities for sports fans, with practical details and local insights</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <DestinationCard
              key={index}
              city={destination.city}
              country={destination.country}
              flag={destination.flag}
              description={destination.description}
              bestMatches={destination.bestMatches}
              avgCost={destination.avgCost}
              peakSeason={destination.peakSeason}
              highlights={destination.highlights}
            />
          ))}
        </div>
      </div>

      {/* Featured travel guides */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Featured Travel Guides</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Comprehensive guides for major sporting events and experiences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travelGuides.filter(guide => guide.isFeatured).map((guide, index) => (
            <TravelGuide
              key={index}
              title={guide.title}
              description={guide.description}
              destination={guide.destination}
              travelType={guide.travelType}
              difficulty={guide.difficulty}
              icon={guide.icon}
              readTime={guide.readTime}
              isFeatured={guide.isFeatured}
            />
          ))}
        </div>
      </div>

      {/* All travel guides */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">All Travel Guides</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {travelGuides.map((guide, index) => (
            <TravelGuide
              key={index}
              title={guide.title}
              description={guide.description}
              destination={guide.destination}
              travelType={guide.travelType}
              difficulty={guide.difficulty}
              icon={guide.icon}
              readTime={guide.readTime}
              isFeatured={guide.isFeatured}
            />
          ))}
        </div>
      </div>

      {/* Travel planning tools */}
      <div className="mt-16 p-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-green-200 dark:border-green-800">
        <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-4">Fan Travel Planning Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">📅 3-6 Months Before</h4>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li>• Check fixture dates and visa requirements</li>
              <li>• Set up travel alerts for flight price drops</li>
              <li>• Join official fan clubs for ticket priority</li>
              <li>• Research local derby dates and cultural events</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">🎫 1-2 Months Before</h4>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li>• Purchase tickets from verified sources only</li>
              <li>• Book accommodation near transport links</li>
              <li>• Download offline maps and transport apps</li>
              <li>• Check stadium bag policies and restrictions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">✈️ 2 Weeks Before</h4>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li>• Print backup copies of all tickets</li>
              <li>• Research pre-match pub recommendations</li>
              <li>• Check weather forecasts and pack accordingly</li>
              <li>• Notify bank of international travel</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">🏟️ Match Day</h4>
            <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
              <li>• Arrive at stadium area 2-3 hours early</li>
              <li>• Keep phone charged with offline ticket copies</li>
              <li>• Follow local fan etiquette and chants</li>
              <li>• Plan post-match transport with extra time</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related resources */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-6">Related Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/tactics" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">🧠</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Tactical Knowledge</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Understand what you're watching</div>
            </div>
          </Link>
          
          <Link 
            href="/buying" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">🛡️</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Authentic Merchandise</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Avoid fake jerseys and gear</div>
            </div>
          </Link>

          <Link 
            href="/contact" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">💬</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Travel Questions</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Get personalized travel advice</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Newsletter subscription */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700 text-center">
        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Get Travel Alerts</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Be first to know about fixture releases, ticket sales, and travel deals for major sporting events.
        </p>
        <div className="max-w-md mx-auto">
          <Newsletter />
        </div>
        <p className="text-xs text-zinc-400 mt-4 italic">
          Fixture alerts • Ticket sale notifications • Travel deals • Fan meetups
        </p>
      </div>
    </Container>
  );
}