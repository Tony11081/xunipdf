import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Container } from '~/components/ui/Container'
import { Newsletter } from '~/app/(main)/Newsletter'

// Tactical complexity component
function TacticLevel({ level, color = 'green' }) {
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

// Tactical article card
function TacticCard({ title, description, sport, level, category, icon, readTime, isPopular = false }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex gap-2">
          {isPopular && <TacticLevel level="TRENDING" color="red" />}
          <TacticLevel level={level} color={level === 'Basic' ? 'green' : level === 'Intermediate' ? 'blue' : 'amber'} />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
          <span className="mr-4">⏱️ {readTime}</span>
          <span className="mr-4">🏆 {sport}</span>
          <span>📂 {category}</span>
        </div>
        <Link 
          href={`/tactics/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm"
        >
          Learn →
        </Link>
      </div>
    </div>
  );
}

// Core tactical concept card
function ConceptCard({ icon, title, explanation, examples }) {
  return (
    <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 p-6 rounded-lg border border-teal-200 dark:border-teal-800">
      <div className="flex items-center mb-3">
        <div className="text-3xl mr-3">{icon}</div>
        <h4 className="text-lg font-bold text-teal-900 dark:text-teal-100">{title}</h4>
      </div>
      <p className="text-teal-800 dark:text-teal-200 mb-3">{explanation}</p>
      <div className="text-sm">
        <span className="font-medium text-teal-900 dark:text-teal-100">Examples: </span>
        <span className="text-teal-700 dark:text-teal-300">{examples}</span>
      </div>
    </div>
  );
}

// Formation diagram component
function FormationDiagram({ formation, description, advantages, disadvantages }) {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg border border-green-200 dark:border-green-800">
      <div className="text-center mb-4">
        <h4 className="text-2xl font-bold text-green-900 dark:text-green-100">{formation}</h4>
        <p className="text-green-700 dark:text-green-300 mt-1">{description}</p>
      </div>
      
      {/* Simplified football field diagram */}
      <div className="bg-green-200 dark:bg-green-800 p-4 rounded-lg mb-4 text-center">
        <div className="text-4xl mb-2">⚽</div>
        <div className="text-sm text-green-800 dark:text-green-200 font-mono">
          {formation === '4-3-3' && (
            <>
              <div>🔴 🔴 🔴</div>
              <div className="my-2">🔵 🔵 🔵</div>
              <div>🟡 🟡 🟡 🟡</div>
            </>
          )}
          {formation === '4-4-2' && (
            <>
              <div>🔴 🔴</div>
              <div className="my-2">🔵 🔵 🔵 🔵</div>
              <div>🟡 🟡 🟡 🟡</div>
            </>
          )}
          {formation === '3-5-2' && (
            <>
              <div>🔴 🔴</div>
              <div className="my-2">🔵 🔵 🔵 🔵 🔵</div>
              <div>🟡 🟡 🟡</div>
            </>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Advantages:</h5>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            {advantages.map((advantage, index) => (
              <li key={index}>• {advantage}</li>
            ))}
          </ul>
        </div>
        <div>
          <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">⚠️ Weaknesses:</h5>
          <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
            {disadvantages.map((disadvantage, index) => (
              <li key={index}>• {disadvantage}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const tacticGuides = [
    {
      title: "Understanding Pressing Systems",
      description: "High press vs low block: when to press, how to coordinate team movement, and reading opposition triggers.",
      sport: "Football",
      level: "Basic",
      category: "Defensive",
      icon: "🔄",
      readTime: "8 min",
      isPopular: true
    },
    {
      title: "Transition Play Masterclass",
      description: "Fast breaks, counter-attacks, and switching between defensive and attacking phases effectively.",
      sport: "Football",
      level: "Intermediate",
      category: "Transition",
      icon: "⚡",
      readTime: "12 min",
      isPopular: true
    },
    {
      title: "Basketball Pick and Roll Fundamentals",
      description: "Screen setting, roll timing, and reading defensive reactions in basketball's most common play.",
      sport: "Basketball",
      level: "Basic",
      category: "Offensive",
      icon: "🏀",
      readTime: "6 min"
    },
    {
      title: "Zone Defense in Football",
      description: "Space-oriented defending: marking zones vs players, covering passing lanes, and team communication.",
      sport: "Football",
      level: "Intermediate",
      category: "Defensive",
      icon: "🛡️",
      readTime: "10 min"
    },
    {
      title: "American Football Play Action Concepts",
      description: "Selling the fake, timing routes, and exploiting linebacker movement with play action passes.",
      sport: "Am. Football",
      level: "Advanced",
      category: "Offensive",
      icon: "🏈",
      readTime: "15 min"
    },
    {
      title: "Hockey Power Play Strategies",
      description: "Man advantage positioning, puck movement patterns, and creating shooting opportunities.",
      sport: "Hockey",
      level: "Intermediate",
      category: "Special Teams",
      icon: "🏒",
      readTime: "9 min"
    },
    {
      title: "Tennis Court Positioning",
      description: "Singles tactics: when to come to net, baseline positioning, and exploiting court geometry.",
      sport: "Tennis",
      level: "Basic",
      category: "Positioning",
      icon: "🎾",
      readTime: "7 min"
    },
    {
      title: "Set Piece Mastery in Football",
      description: "Free kicks, corners, and throw-ins: planned movements, decoy runs, and defensive organization.",
      sport: "Football",
      level: "Advanced",
      category: "Set Pieces",
      icon: "⚽",
      readTime: "14 min"
    }
  ];

  const coreConcepts = [
    {
      icon: "🔄",
      title: "Pressing",
      explanation: "Coordinated team effort to win the ball back quickly by putting pressure on opponents.",
      examples: "Liverpool's gegenpressing, Man City's high press"
    },
    {
      icon: "⚡",
      title: "Transition",
      explanation: "The moment a team switches from defending to attacking (or vice versa). Speed is crucial.",
      examples: "Counter-attacks, fast breaks, quick throw-ins"
    },
    {
      icon: "📐",
      title: "Shape",
      explanation: "How players position themselves relative to each other to maintain team structure.",
      examples: "Compact defensive block, triangular passing options"
    },
    {
      icon: "💨",
      title: "Tempo",
      explanation: "The speed at which a team plays - can be varied tactically to control the game.",
      examples: "Barcelona's tiki-taka, Leicester's quick counters"
    }
  ];

  const formations = [
    {
      formation: '4-3-3',
      description: 'Balanced formation with wingers providing width',
      advantages: [
        'Strong attacking width with wingers',
        'Good midfield control with 3 players',
        'Flexible - can become 4-5-1 defensively'
      ],
      disadvantages: [
        'Can be exposed in central midfield',
        'Wingers must track back defensively',
        'Requires energetic wide players'
      ]
    },
    {
      formation: '4-4-2',
      description: 'Classic formation with two strikers',
      advantages: [
        'Simple and well-balanced structure',
        'Good defensive stability',
        'Clear partnerships (striker duo, central midfield)'
      ],
      disadvantages: [
        'Can be outnumbered in midfield',
        'Less flexibility than modern systems',
        'Wide midfielders have huge responsibility'
      ]
    },
    {
      formation: '3-5-2',
      description: 'Wing-backs provide width, three center-backs',
      advantages: [
        'Numerical advantage in midfield (5 vs 4)',
        'Wing-backs create overloads',
        'Strong central defensive coverage'
      ],
      disadvantages: [
        'Vulnerable to wingers in wide areas',
        'Requires very fit wing-backs',
        'Can be exposed on counter-attacks'
      ]
    }
  ];

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Tactics Made Simple
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Complex tactical concepts explained in plain English. From pressing systems to set pieces, understand what you're watching without the jargon.</Balancer>
        </p>
      </header>

      {/* Core concepts */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Core Tactical Concepts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coreConcepts.map((concept, index) => (
            <ConceptCard
              key={index}
              icon={concept.icon}
              title={concept.title}
              explanation={concept.explanation}
              examples={concept.examples}
            />
          ))}
        </div>
      </div>

      {/* Formation analysis */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Popular Football Formations</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Understanding the strengths and weaknesses of common tactical setups</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {formations.map((formation, index) => (
            <FormationDiagram
              key={index}
              formation={formation.formation}
              description={formation.description}
              advantages={formation.advantages}
              disadvantages={formation.disadvantages}
            />
          ))}
        </div>
      </div>

      {/* Trending tactical guides */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Trending Tactical Guides</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Most popular tactical explanations this month</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tacticGuides.filter(guide => guide.isPopular).map((guide, index) => (
            <TacticCard
              key={index}
              title={guide.title}
              description={guide.description}
              sport={guide.sport}
              level={guide.level}
              category={guide.category}
              icon={guide.icon}
              readTime={guide.readTime}
              isPopular={guide.isPopular}
            />
          ))}
        </div>
      </div>

      {/* All tactical guides */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">All Tactical Guides</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tacticGuides.map((guide, index) => (
            <TacticCard
              key={index}
              title={guide.title}
              description={guide.description}
              sport={guide.sport}
              level={guide.level}
              category={guide.category}
              icon={guide.icon}
              readTime={guide.readTime}
              isPopular={guide.isPopular}
            />
          ))}
        </div>
      </div>

      {/* Tactical terminology preview */}
      <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4">Quick Tactical Glossary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="text-sm">
            <span className="font-semibold text-blue-900 dark:text-blue-100">False 9:</span>
            <span className="text-blue-700 dark:text-blue-300 ml-2">Striker who drops deep to create space</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-900 dark:text-blue-100">Overload:</span>
            <span className="text-blue-700 dark:text-blue-300 ml-2">Creating numerical superiority in one area</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-900 dark:text-blue-100">Low Block:</span>
            <span className="text-blue-700 dark:text-blue-300 ml-2">Deep defensive line near own penalty box</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-900 dark:text-blue-100">Inverted FB:</span>
            <span className="text-blue-700 dark:text-blue-300 ml-2">Full-back who cuts inside to midfield</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-900 dark:text-blue-100">Parking Bus:</span>
            <span className="text-blue-700 dark:text-blue-300 ml-2">Extremely defensive setup with all players behind ball</span>
          </div>
          <div className="text-sm">
            <span className="font-semibold text-blue-900 dark:text-blue-100">Tiki-taka:</span>
            <span className="text-blue-700 dark:text-blue-300 ml-2">Short passing style to maintain possession</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <Link 
            href="/tactics/glossary"
            className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors"
          >
            View Full Glossary →
          </Link>
        </div>
      </div>

      {/* Related resources */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-6">Related Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/training" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">🏃‍♂️</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Fitness Training</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Physical preparation for tactical demands</div>
            </div>
          </Link>
          
          <Link 
            href="/travel" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">✈️</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Match Travel</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Watch tactics live at stadiums</div>
            </div>
          </Link>

          <Link 
            href="/guides" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">📚</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">All Guides</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Complete tactical library</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Newsletter subscription */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700 text-center">
        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Master Tactics Weekly</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Get tactical breakdowns of recent matches, formation analysis, and strategic insights delivered weekly.
        </p>
        <div className="max-w-md mx-auto">
          <Newsletter />
        </div>
        <p className="text-xs text-zinc-400 mt-4 italic">
          Real match analysis • Formation guides • Tactical trends
        </p>
      </div>
    </Container>
  );
}