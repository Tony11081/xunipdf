import Balancer from 'react-wrap-balancer'
import { Container } from '~/components/ui/Container'

export default function Page() {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          🛒 How to Buy from Chinese Stores (Even If You Don't Speak Chinese)
        </h1>
        <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Buying from platforms like Weidian, Taobao, or CNFANS can feel overwhelming at first — but with the right tools and guidance, it's surprisingly easy.</Balancer>
        </p>
        <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>Here's our simple 5-step guide to get started.</Balancer>
        </p>
      </header>

      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                ✅ Step-by-Step Buying Process
              </h2>
              
              <div className="mt-6">
                <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  1. Find a product
                </h3>
                <ul className="mt-2 list-disc pl-5 text-lg text-zinc-600 dark:text-zinc-400">
                  <li>Use spreadsheets like Best CNFANS Finds 2025</li>
                  <li>Browse categories on our site: Accessories, Shoes, Tech</li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  2. Copy the product/store link
                </h3>
                <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                  Example: a Weidian product page or Taobao store
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  3. Paste into a shopping agent
                </h3>
                <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                  Recommended: Superbuy or Cssbuy
                </p>
                <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-400">
                  These agents handle Chinese payments, warehousing, and international shipping
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  4. Choose your size and specs
                </h3>
                <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                  Ask the agent if you're unsure; most provide customer service
                </p>
              </div>

              <div className="mt-4">
                <h3 className="text-xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                  5. Pay and wait for delivery
                </h3>
                <p className="mt-2 text-lg text-zinc-600 dark:text-zinc-400">
                  Once shipped, you'll get tracking and status updates
                </p>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100">
                💬 Need Help? Contact Us on WhatsApp
              </h2>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                We know some steps can be confusing — that's why we offer 1-on-1 personal help for international buyers.
              </p>
              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                📱 <a href="https://wa.me/8613462248923" className="text-teal-500 hover:text-teal-600">Click here to chat with us on WhatsApp</a>
              </p>
              <div className="mt-4">
                <p className="text-lg text-zinc-600 dark:text-zinc-400">We can:</p>
                <ul className="mt-2 list-disc pl-5 text-lg text-zinc-600 dark:text-zinc-400">
                  <li>Help you verify product links</li>
                  <li>Recommend trusted shopping agents</li>
                  <li>Assist with sizing and shipping</li>
                  <li>Answer in English, fast and friendly</li>
                </ul>
                <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
                  You don't need to speak Chinese — we're here to guide you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
} 