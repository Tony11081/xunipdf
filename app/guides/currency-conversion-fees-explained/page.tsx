import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Currency Conversion Fees Explained - ShopChina.net',
  description: 'A comprehensive guide about currency conversion fees when shopping on Chinese e-commerce platforms.',
}

export default function CurrencyGuide() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Currency Conversion Fees Explained</h1>
      
      <div className="prose max-w-none">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
          <p className="text-lg">
            This guide is currently under development. Stay tuned!
          </p>
          
          <p className="mt-4">
            We are working hard to create a detailed guide to help you better navigate Chinese e-commerce platforms.
          </p>
          
          <p className="mt-4">
            The guide will include step-by-step instructions, screenshots, and tips to ensure a smooth shopping experience even if you don't understand Chinese.
          </p>
          
          <p className="mt-4">
            Please check back later or subscribe to our newsletter to be notified when the guide is published.
          </p>
        </div>
      </div>
    </div>
  )
} 