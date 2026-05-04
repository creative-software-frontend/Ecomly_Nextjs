'use client'

import { ChevronRight, Shield } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Privacy Policy</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-50 bg-primary/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                <Shield size={32} />
              </div>
              <h1 className="text-3xl font-black text-gray-900">Privacy Policy</h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Your privacy is important to us. It is Ecomly's policy to respect your privacy regarding any information we may collect from you across our website.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-600 leading-relaxed">
                We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're collecting it and how it will be used.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">2. Use of Information</h2>
              <p className="text-gray-600 leading-relaxed">
                We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we'll protect within commercially acceptable means to prevent loss and theft, as well as unauthorized access, disclosure, copying, use or modification.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">3. Cookies</h2>
              <p className="text-gray-600 leading-relaxed">
                We use cookies to help improve your experience of our website. This cookie policy is part of Ecomly's privacy policy, and covers the use of cookies between your device and our site.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
