'use client'

import { GraduationCap, PlayCircle, BookOpen, Users, ArrowRight, Star } from 'lucide-react'
import Link from 'next/link'

export default function UniversityPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#1a1c1e] text-white py-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/20 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-bold mb-8">
            <GraduationCap size={18} />
            Ecomly Academy
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight max-w-4xl">Master the Art of <span className="text-primary">eCommerce</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed">
            Learn how to build, scale, and manage your online business with Ecomly University's expert-led courses and resources.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
              Explore Courses
            </button>
            <button className="bg-white/10 text-white border border-white/20 px-10 py-4 rounded-2xl font-black text-lg hover:bg-white/20 transition-all backdrop-blur-md">
              Watch Demo
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              title: 'Getting Started',
              lessons: 12,
              duration: '4h 30m',
              level: 'Beginner',
              image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80'
            },
            {
              title: 'Advanced Marketing',
              lessons: 8,
              duration: '6h 15m',
              level: 'Intermediate',
              image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
            },
            {
              title: 'Supply Chain Mastery',
              lessons: 15,
              duration: '8h 45m',
              level: 'Advanced',
              image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80'
            }
          ].map((course, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl transition-all duration-500">
              <div className="h-48 relative overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                <PlayCircle className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-black text-primary px-3 py-1 bg-primary/10 rounded-full">{course.level}</span>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">4.9</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 group-hover:text-primary transition-colors">{course.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-500 border-t border-gray-50 pt-6">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} />
                    <span>{course.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>2.4k Students</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="#" className="inline-flex items-center gap-3 text-lg font-black text-gray-900 hover:text-primary transition-colors group">
            View All Academy Resources <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
