import Link from 'next/link'
import Balancer from 'react-wrap-balancer'
import { Container } from '~/components/ui/Container'
import { Newsletter } from '~/app/(main)/Newsletter'

// Training level component
function TrainingLevel({ level, color = 'green' }) {
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

// Training article card component
function TrainingCard({ title, description, duration, level, category, icon, isPopular = false }) {
  return (
    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-6 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:shadow-md transition-all">
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{icon}</div>
        <div className="flex gap-2">
          {isPopular && <TrainingLevel level="POPULAR" color="red" />}
          <TrainingLevel level={level} color={level === 'Beginner' ? 'green' : level === 'Intermediate' ? 'blue' : 'amber'} />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{title}</h3>
      <p className="text-zinc-600 dark:text-zinc-400 mb-4">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400">
          <span className="mr-4">⏱️ {duration}</span>
          <span>📂 {category}</span>
        </div>
        <Link 
          href={`/training/${title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
          className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 font-medium text-sm"
        >
          Read Guide →
        </Link>
      </div>
    </div>
  );
}

// Quick tip card
function QuickTip({ icon, title, tip }) {
  return (
    <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg border border-teal-200 dark:border-teal-800">
      <div className="flex items-start">
        <div className="text-2xl mr-3">{icon}</div>
        <div>
          <h4 className="font-semibold text-teal-900 dark:text-teal-100 mb-1">{title}</h4>
          <p className="text-sm text-teal-800 dark:text-teal-200">{tip}</p>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const trainingGuides = [
    {
      title: "Complete 5K Training Plan",
      description: "8-week progressive plan from couch to 5K finish line. Includes rest days, cross-training, and nutrition tips.",
      duration: "8 weeks",
      level: "Beginner",
      category: "Running",
      icon: "🏃‍♂️",
      isPopular: true
    },
    {
      title: "Injury Prevention for Weekend Warriors",
      description: "Evidence-based warm-up routines, stretching protocols, and recovery strategies for recreational athletes.",
      duration: "15 min read",
      level: "Beginner",
      category: "Injury Prevention",
      icon: "🏥"
    },
    {
      title: "Home Gym Setup on a Budget",
      description: "Essential equipment guide and space-efficient workouts. No expensive machines needed.",
      duration: "12 min read",
      level: "Beginner",
      category: "Strength",
      icon: "🏋️‍♀️"
    },
    {
      title: "Football Fitness: Match-Ready Conditioning",
      description: "Sport-specific drills, agility ladders, and cardio intervals used by semi-pro teams.",
      duration: "6 weeks",
      level: "Intermediate",
      category: "Sport-Specific",
      icon: "⚽",
      isPopular: true
    },
    {
      title: "Post-Workout Recovery Essentials",
      description: "Stretching routines, nutrition timing, sleep optimization, and active recovery methods.",
      duration: "10 min read",
      level: "Beginner",
      category: "Recovery",
      icon: "😴"
    },
    {
      title: "Marathon Training Blueprint",
      description: "16-week structured plan with mileage progression, tapering, and race day strategy.",
      duration: "16 weeks",
      level: "Advanced",
      category: "Running",
      icon: "🏃‍♀️"
    },
    {
      title: "Basketball Skills & Conditioning",
      description: "Court movement drills, shooting practice routines, and position-specific fitness.",
      duration: "8 weeks",
      level: "Intermediate",
      category: "Sport-Specific",
      icon: "🏀"
    },
    {
      title: "Swimming Technique Fundamentals",
      description: "Stroke correction, breathing patterns, and pool workout progressions for all levels.",
      duration: "4 weeks",
      level: "Beginner",
      category: "Swimming",
      icon: "🏊‍♂️"
    }
  ];

  const quickTips = [
    {
      icon: "💧",
      title: "Hydration Timing",
      tip: "Drink 500ml water 2 hours before exercise, 200ml every 15-20 minutes during activity."
    },
    {
      icon: "🔥",
      title: "Warm-up Rule",
      tip: "Always warm up for 5-10 minutes. Start with light cardio, then dynamic stretching."
    },
    {
      icon: "😪",
      title: "Rest Day Importance",
      tip: "Schedule 1-2 full rest days per week. Your muscles grow during recovery, not training."
    },
    {
      icon: "🍎",
      title: "Pre-Workout Fuel",
      tip: "Eat complex carbs 2-3 hours before training. Banana 30 minutes before is ideal."
    }
  ];

  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          Training & Health
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Science-backed training plans, injury prevention strategies, and health tips for athletes at every level — from weekend warriors to competitive players.</Balancer>
        </p>
      </header>

      {/* Quick tips section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6">Quick Health Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickTips.map((tip, index) => (
            <QuickTip key={index} icon={tip.icon} title={tip.title} tip={tip.tip} />
          ))}
        </div>
      </div>

      {/* Popular training programs */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-2">Popular Training Programs</h2>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">Most requested guides by our community</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainingGuides.filter(guide => guide.isPopular).map((guide, index) => (
            <TrainingCard
              key={index}
              title={guide.title}
              description={guide.description}
              duration={guide.duration}
              level={guide.level}
              category={guide.category}
              icon={guide.icon}
              isPopular={guide.isPopular}
            />
          ))}
        </div>
      </div>

      {/* All training guides */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-8">All Training Guides</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainingGuides.map((guide, index) => (
            <TrainingCard
              key={index}
              title={guide.title}
              description={guide.description}
              duration={guide.duration}
              level={guide.level}
              category={guide.category}
              icon={guide.icon}
              isPopular={guide.isPopular}
            />
          ))}
        </div>
      </div>

      {/* Related health resources */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700">
        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-6">Related Health Resources</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link 
            href="/gear" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">👟</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Training Gear</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Equipment recommendations</div>
            </div>
          </Link>
          
          <Link 
            href="/buying" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">🛡️</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Authentic Supplements</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Verified nutrition products</div>
            </div>
          </Link>

          <Link 
            href="/contact" 
            className="flex items-center p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
          >
            <span className="text-2xl mr-3">💬</span>
            <div>
              <div className="font-medium text-zinc-800 dark:text-zinc-200">Ask a Trainer</div>
              <div className="text-sm text-zinc-500 dark:text-zinc-400">Get personalized advice</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Newsletter subscription */}
      <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-700 text-center">
        <h3 className="text-xl font-semibold text-zinc-800 dark:text-zinc-200 mb-4">Get New Training Plans Weekly</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
          Join 15,000+ athletes getting our latest training guides, nutrition tips, and injury prevention advice.
        </p>
        <div className="max-w-md mx-auto">
          <Newsletter />
        </div>
        <p className="text-xs text-zinc-400 mt-4 italic">
          Free guides • Evidence-based advice • Unsubscribe anytime
        </p>
      </div>
    </Container>
  );
}