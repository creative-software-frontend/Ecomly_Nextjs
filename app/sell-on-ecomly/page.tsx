'use client'

import { ChevronRight, Store, DollarSign, Zap, Globe, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function SellPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-primary text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-6xl font-black mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">Become an Ecomly Seller</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-10 leading-relaxed">
            Reach millions of customers across the country. Start your business journey with Ecomly today.
          </p>
          <button className="bg-white text-primary px-10 py-4 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all shadow-xl">
            Start Selling Now
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Low Commission',
              desc: 'We offer the most competitive commission rates in the market to help you grow.',
              icon: DollarSign,
              color: 'bg-green-100 text-green-600'
            },
            {
              title: 'Fast Payments',
              desc: 'Get your payments directly into your bank account within 7 days of delivery.',
              icon: Zap,
              color: 'bg-blue-100 text-blue-600'
            },
            {
              title: 'Pan-Bangladesh Reach',
              desc: 'Sell to customers in every corner of Bangladesh with our logistics network.',
              icon: Globe,
              color: 'bg-purple-100 text-purple-600'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className={`p-4 rounded-2xl inline-block mb-6 ${item.color}`}>
                <item.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-white rounded-3xl border border-gray-100 shadow-sm p-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-gray-900 mb-4">Ready to start?</h2>
            <p className="text-gray-500 text-lg mb-0">Join 10,000+ vendors who are growing their business with Ecomly.</p>
          </div>
          <Link href="/contact-us" className="bg-primary text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary-dark transition-all">
            Contact Sales <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}
