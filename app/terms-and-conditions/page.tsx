'use client'

import { ChevronRight, FileText } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Terms and Conditions</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-50 bg-primary/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                <FileText size={32} />
              </div>
              <h1 className="text-3xl font-black text-gray-900">Terms & Conditions</h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Please read these terms and conditions carefully before using our service.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Privacy Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                Your use of the website is also subject to our Privacy Policy. Please review our Privacy Policy, which also governs the website and informs users of our data collection practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Modifications</h2>
              <p className="text-gray-600 leading-relaxed">
                Ecomly reserves the right to change these conditions from time to time as it sees fit and your continued use of the site will signify your acceptance of any adjustment to these terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
