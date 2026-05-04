'use client'

import { ChevronRight, HelpCircle, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const FAQS = [
  {
    q: 'How do I track my order?',
    a: 'You can track your order by clicking on the "Track Order" link in the navigation bar and entering your order ID and email address.'
  },
  {
    q: 'What is the return policy?',
    a: 'We offer a 30-day return policy for most items. Items must be in their original condition and packaging. Please visit our Refund and Return Policy page for more details.'
  },
  {
    q: 'How long does shipping take?',
    a: 'Standard delivery usually takes 3-5 business days. Express delivery is available for some regions and takes 1-2 business days.'
  },
  {
    q: 'Do you offer international shipping?',
    a: 'Currently, we only ship within Bangladesh. We are working on expanding our services to international locations soon.'
  },
  {
    q: 'Can I change my shipping address after placing an order?',
    a: 'If your order hasn\'t been shipped yet, we might be able to update the address. Please contact our support team immediately at support@ecomly.com.'
  }
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Frequently Asked Questions</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-50 bg-primary/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                <HelpCircle size={32} />
              </div>
              <h1 className="text-3xl font-black text-gray-900">FAQ</h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Find answers to common questions about shopping on Ecomly.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-bold text-gray-900">{faq.q}</span>
                  <ChevronDown size={20} className={`text-gray-400 transition-transform ${openIndex === idx ? 'rotate-180' : ''}`} />
                </button>
                {openIndex === idx && (
                  <div className="px-6 py-4 bg-gray-50/50 text-gray-600 text-sm leading-relaxed border-t border-gray-100 animate-in fade-in slide-in-from-top-1">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
