'use client'

import { ChevronRight, ShoppingBag, Search, CreditCard, Truck, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function HowToBuyPage() {
  const steps = [
    {
      title: 'Find Your Product',
      desc: 'Use the search bar or browse through our categories to find the items you want.',
      icon: Search,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'Add to Cart',
      desc: 'Click on "Add to Cart" to collect your desired items for checkout.',
      icon: ShoppingBag,
      color: 'bg-primary/10 text-primary'
    },
    {
      title: 'Proceed to Checkout',
      desc: 'Review your items, choose a delivery address, and proceed to payment.',
      icon: CreditCard,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Wait for Delivery',
      desc: 'Our logistics team will deliver your package to your doorstep within 3-5 days.',
      icon: Truck,
      color: 'bg-orange-50 text-orange-600'
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">How to buy</span>
        </div>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-black text-gray-900 mb-4">How to shop on Ecomly</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Shopping on Ecomly is easy and secure. Follow these simple steps to get your favorite items delivered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex items-start gap-6 group hover:border-primary/30 transition-colors">
              <div className={`p-4 rounded-2xl flex-shrink-0 transition-transform group-hover:scale-110 duration-300 ${step.color}`}>
                <step.icon size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-black text-primary uppercase tracking-widest">Step {idx + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-primary text-white p-10 rounded-[3rem] shadow-2xl shadow-primary/30 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-black mb-4">Everything you need</h2>
            <div className="space-y-4">
              {[
                'Secure online payment methods',
                'Cash on delivery available',
                '7-day easy return policy',
                'Dedicated customer support'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-white/60" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <Link href="/products" className="bg-white text-primary px-8 py-4 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center gap-2">
            Shop Now <ShoppingBag size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}
