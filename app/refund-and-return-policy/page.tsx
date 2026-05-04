'use client'

import { ChevronRight, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function RefundPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Refund and Return Policy</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-50 bg-primary/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                <RefreshCw size={32} />
              </div>
              <h1 className="text-3xl font-black text-gray-900">Refund & Return</h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              We want you to be completely satisfied with your purchase. If you are not satisfied, you may return the item within 30 days.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Return Eligibility</h2>
              <p className="text-gray-600 leading-relaxed">
                To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You'll also need the receipt or proof of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Process for Returns</h2>
              <p className="text-gray-600 leading-relaxed">
                To start a return, you can contact us at returns@ecomly.com. If your return is accepted, we'll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Refunds</h2>
              <p className="text-gray-600 leading-relaxed">
                We will notify you once we've received and inspected your return, and let you know if the refund was approved or not. If approved, you'll be automatically refunded on your original payment method. Please remember it can take some time for your bank or credit card company to process and post the refund too.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
