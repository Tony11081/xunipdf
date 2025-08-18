'use client'

// User interest categories
export interface UserInterests {
  sports: string[]
  equipment: string[]
  experience: 'beginner' | 'intermediate' | 'advanced' | 'professional'
  goals: string[]
  preferredContent: string[]
}

export interface ContentItem {
  id: string
  title: string
  description: string
  href: string
  category: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  contentType: 'guide' | 'review' | 'tutorial' | 'news'
  popularity: number
  lastUpdated: string
}

// Default interests for new users
export const defaultInterests: UserInterests = {
  sports: [],
  equipment: [],
  experience: 'beginner',
  goals: [],
  preferredContent: ['guides', 'reviews']
}

// Available interest options
export const interestOptions = {
  sports: [
    'Soccer/Football',
    'Basketball', 
    'Tennis',
    'Running',
    'Swimming',
    'Cycling',
    'Gym/Fitness',
    'Baseball',
    'Golf',
    'Martial Arts'
  ],
  equipment: [
    'Footwear',
    'Apparel',
    'Protective Gear',
    'Training Equipment',
    'Accessories',
    'Recovery Tools',
    'Nutrition',
    'Technology/Wearables'
  ],
  goals: [
    'Improve Performance',
    'Injury Prevention',
    'Weight Loss',
    'Muscle Building',
    'Endurance Training',
    'Skill Development',
    'Competition Prep',
    'General Fitness'
  ],
  contentTypes: [
    'Product Reviews',
    'Training Guides',
    'Buying Guides',
    'How-to Tutorials',
    'News & Updates',
    'Expert Tips'
  ]
}

// Personalization service
export class PersonalizationService {
  private static STORAGE_KEY = 'user_interests'
  
  static getUserInterests(): UserInterests {
    if (typeof window === 'undefined') return defaultInterests
    
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? { ...defaultInterests, ...JSON.parse(stored) } : defaultInterests
    } catch {
      return defaultInterests
    }
  }

  static saveUserInterests(interests: UserInterests): void {
    if (typeof window === 'undefined') return
    
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(interests))
    } catch (error) {
      console.error('Failed to save user interests:', error)
    }
  }

  static calculateContentScore(content: ContentItem, interests: UserInterests): number {
    let score = 0

    // Base popularity score (0-20)
    score += Math.min(content.popularity * 20, 20)

    // Sports interest match (0-25)
    const sportsMatch = interests.sports.some(sport => 
      content.tags.some(tag => tag.toLowerCase().includes(sport.toLowerCase().split('/')[0]))
    )
    if (sportsMatch) score += 25

    // Equipment interest match (0-20)
    const equipmentMatch = interests.equipment.some(equipment =>
      content.tags.some(tag => tag.toLowerCase().includes(equipment.toLowerCase()))
    )
    if (equipmentMatch) score += 20

    // Experience level match (0-15)
    if (content.difficulty === interests.experience) {
      score += 15
    } else if (
      (interests.experience === 'beginner' && content.difficulty === 'intermediate') ||
      (interests.experience === 'intermediate' && content.difficulty === 'beginner') ||
      (interests.experience === 'intermediate' && content.difficulty === 'advanced') ||
      (interests.experience === 'advanced' && content.difficulty === 'intermediate')
    ) {
      score += 8
    }

    // Content type preference (0-10)
    const contentTypeMatch = interests.preferredContent.some(type =>
      content.contentType.toLowerCase().includes(type.toLowerCase()) ||
      content.category.toLowerCase().includes(type.toLowerCase())
    )
    if (contentTypeMatch) score += 10

    // Goals alignment (0-10)
    const goalsMatch = interests.goals.some(goal =>
      content.tags.some(tag => tag.toLowerCase().includes(goal.toLowerCase())) ||
      content.description.toLowerCase().includes(goal.toLowerCase())
    )
    if (goalsMatch) score += 10

    return Math.min(score, 100)
  }

  static getRecommendations(
    allContent: ContentItem[], 
    interests: UserInterests, 
    limit: number = 6
  ): ContentItem[] {
    return allContent
      .map(content => ({
        content,
        score: this.calculateContentScore(content, interests)
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(item => item.content)
  }

  static getPersonalizedCategories(interests: UserInterests): string[] {
    const categories = new Set<string>()
    
    // Add categories based on sports interests
    interests.sports.forEach(sport => {
      categories.add(sport.split('/')[0])
    })
    
    // Add equipment categories
    interests.equipment.forEach(equipment => {
      categories.add(equipment)
    })
    
    return Array.from(categories)
  }
}

// Track user behavior for better recommendations
export class BehaviorTracker {
  private static BEHAVIOR_KEY = 'user_behavior'
  
  static trackContentView(contentId: string, category: string): void {
    if (typeof window === 'undefined') return
    
    try {
      const behavior = this.getBehavior()
      const today = new Date().toISOString().split('T')[0]
      
      if (!behavior.views[today]) {
        behavior.views[today] = []
      }
      
      behavior.views[today].push({ contentId, category, timestamp: Date.now() })
      behavior.categories[category] = (behavior.categories[category] || 0) + 1
      
      // Keep only last 30 days
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      
      Object.keys(behavior.views).forEach(date => {
        if (new Date(date) < thirtyDaysAgo) {
          delete behavior.views[date]
        }
      })
      
      localStorage.setItem(this.BEHAVIOR_KEY, JSON.stringify(behavior))
    } catch (error) {
      console.error('Failed to track behavior:', error)
    }
  }
  
  static getBehavior(): {
    views: Record<string, Array<{ contentId: string; category: string; timestamp: number }>>
    categories: Record<string, number>
  } {
    if (typeof window === 'undefined') {
      return { views: {}, categories: {} }
    }
    
    try {
      const stored = localStorage.getItem(this.BEHAVIOR_KEY)
      return stored ? JSON.parse(stored) : { views: {}, categories: {} }
    } catch {
      return { views: {}, categories: {} }
    }
  }
  
  static getTopCategories(limit: number = 5): string[] {
    const behavior = this.getBehavior()
    return Object.entries(behavior.categories)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([category]) => category)
  }
}