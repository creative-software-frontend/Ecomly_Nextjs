'use client'

import { ChevronRight, Info } from 'lucide-react'
import Link from 'next/link'

export default function AboutUsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">About Us</span>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-8 md:p-12 border-b border-gray-50 bg-primary/5">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
                <Info size={32} />
              </div>
              <h1 className="text-3xl font-black text-gray-900">About Ecomly</h1>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to Ecomly, your number one source for all things. We're dedicated to giving you the very best of products, with a focus on dependability, customer service and uniqueness.
            </p>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2024, Ecomly has come a long way from its beginnings in a home office. When we first started out, our passion for helping other parents be more eco-friendly drove us to do intense research, and gave us the impetus to turn hard work and inspiration into to a booming online store. We now serve customers all over the country, and are thrilled to be a part of the quirky, eco-friendly, fair trade wing of the industry.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
