import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '~/components/ui/Container'
import { Button } from '~/components/ui/Button'

// Mock data for store products
const storeData = {
  name: 'Premium Digital Resources Store',
  description: 'High-quality digital templates, graphics, and creative assets for professionals',
  categories: [
    { 
      id: 'templates', 
      name: 'Templates', 
      count: 150, 
      icon: '📄',
      description: 'Professional presentation, business, and design templates',
      href: '/store/templates'
    },
    { 
      id: 'graphics', 
      name: 'Graphics', 
      count: 200, 
      icon: '🎨',
      description: 'Icons, illustrations, and visual assets',
      href: '/store/graphics'
    },
    { 
      id: 'tools', 
      name: 'Tools', 
      count: 50, 
      icon: '🔧',
      description: 'Design tools, software, and productivity resources',
      href: '/store/tools'
    },
    { 
      id: 'guides', 
      name: 'Guides', 
      count: 75, 
      icon: '📚',
      description: 'Step-by-step tutorials and comprehensive guides',
      href: '/store/guides'
    }
  ],
  featured: [
    {
      id: '1',
      title: 'Business Presentation Bundle',
      description: 'Complete set of professional presentation templates for business use',
      price: 49.99,
      currency: 'USD',
      originalPrice: 99.99,
      image: '/products/business-templates.jpg',
      category: 'templates',
      tags: ['Business', 'Presentations', 'Professional'],
      rating: 4.9,
      downloads: 1234
    },
    {
      id: '2',
      title: 'Design Elements Pack',
      description: 'Comprehensive collection of UI elements, icons, and graphics',
      price: 29.99,
      currency: 'USD',
      image: '/products/design-elements.jpg',
      category: 'graphics',
      tags: ['UI', 'Icons', 'Graphics'],
      rating: 4.8,
      downloads: 856
    },
    {
      id: '3',
      title: 'Marketing Guide Collection',
      description: 'Complete digital marketing strategies and implementation guides',
      price: 39.99,
      currency: 'USD',
      image: '/products/marketing-guides.jpg',
      category: 'guides',
      tags: ['Marketing', 'Strategy', 'Business'],
      rating: 5.0,
      downloads: 567
    }
  ]
}

export const metadata: Metadata = {
  title: 'Digital Resources Store | Premium Templates & Assets',
  description: 'Browse our collection of premium digital templates, graphics, tools, and guides. Instant download with commercial license included.',
  openGraph: {
    title: 'Digital Resources Store | Premium Templates & Assets',
    description: 'Browse our collection of premium digital templates, graphics, tools, and guides. Instant download with commercial license included.',
    type: 'website',
  },
}

export default function StorePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-lime-500 to-green-600 text-white py-16">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Premium Digital Resources
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-lime-100">
              Professional templates, graphics, and tools for creators and businesses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="#categories" 
                className="bg-white text-lime-600 hover:bg-lime-50"
              >
                Browse Categories
              </Button>
              <Button 
                href="#featured" 
                variant="secondary"
                className="border-white text-white hover:bg-white hover:text-lime-600"
              >
                View Featured
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Stats Section */}
      <section className="py-12 bg-zinc-50 dark:bg-zinc-800">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">500+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Digital Resources</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">10k+</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">99.9%</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-lime-600 dark:text-lime-400">24/7</div>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Support</div>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Find exactly what you need from our organized collection of premium digital resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {storeData.categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group p-6 bg-white dark:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-700 hover:border-lime-300 dark:hover:border-lime-600 transition-colors duration-200 hover:shadow-lg"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    {category.description}
                  </p>
                  <div className="text-lime-600 dark:text-lime-400 font-medium">
                    {category.count} items
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section id="featured" className="py-16 bg-zinc-50 dark:bg-zinc-800">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Hand-picked premium resources from our top-selling collection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {storeData.featured.map((product) => (
              <div 
                key={product.id}
                className="bg-white dark:bg-zinc-900 rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-zinc-700 hover:shadow-lg transition-shadow duration-200"
              >
                <div className="aspect-video bg-gradient-to-br from-lime-100 to-green-100 dark:from-lime-900 dark:to-green-900 flex items-center justify-center">
                  <span className="text-4xl">📦</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs bg-lime-100 dark:bg-lime-900 text-lime-600 dark:text-lime-400 px-2 py-1 rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-zinc-500">
                      <span>⭐</span>
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-zinc-500 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                    <Button>
                      View Details
                    </Button>
                  </div>
                  <div className="mt-3 text-xs text-zinc-500">
                    {product.downloads} downloads
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button href="/store/all">
              View All Products
            </Button>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">
              Why Choose Our Resources?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Instant Download
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Get immediate access to your purchases. No waiting, no delays.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Commercial License
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Use our resources for personal and commercial projects with clear licensing.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-lime-100 dark:bg-lime-900 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Premium Quality
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                All resources are professionally designed and thoroughly tested.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-lime-500 to-green-600 text-white">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-lime-100">
              Join thousands of professionals who trust our premium digital resources
            </p>
            <Button 
              href="/store/all" 
              className="bg-white text-lime-600 hover:bg-lime-50"
            >
              Browse All Products
            </Button>
          </div>
        </Container>
      </section>
    </div>
  )
}

export const revalidate = 300 // Revalidate every 5 minutes