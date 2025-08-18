export const navigationItems = [
  { href: '/', text: 'Home' },
  { 
    text: 'Equipment', 
    subItems: [
      { href: '/gear', text: 'Gear Guide' },
      { href: '/buying', text: 'Buying Guides' }
    ]
  },
  { 
    text: 'Performance', 
    subItems: [
      { href: '/training', text: 'Training & Health' },
      { href: '/tactics', text: 'Tactics Made Simple' }
    ]
  },
  { href: '/travel', text: 'Fan Travel' },
  { href: '/guides', text: 'All Guides' }
]

// Category navigation configuration
export const categoryItems = [
  { href: '/categories/gear', text: 'Sports Gear' },
  { href: '/categories/buying', text: 'Buying Guides' },
  { href: '/categories/training', text: 'Training & Health' },
  { href: '/categories/tactics', text: 'Tactics' },
  { href: '/categories/travel', text: 'Fan Travel' },
]

// Navigation item type definition
export interface NavigationItem {
  href?: string
  text: string
  subItems?: Array<{ href: string; text: string }>
}
