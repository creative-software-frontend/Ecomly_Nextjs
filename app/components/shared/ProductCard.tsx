'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'

interface ProductCardProps {
  id: string
  name: string
  price: number
  oldPrice?: number
  image: string
  rating: number
  reviewCount: number
  discount?: number
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  oldPrice, 
  image, 
  rating, 
  reviewCount,
  discount 
}: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { t } = useLanguage()

  // ডিসকাউন্ট ক্যালকুলেট
  const discountPercentage = oldPrice 
    ? Math.round(((oldPrice - price) / oldPrice) * 100) 
    : discount

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ইমেজ সেকশন */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* ব্যাজ */}
        {discountPercentage && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
            -{discountPercentage}%
          </span>
        )}
        
        {/* উইশলিস্ট বাটন */}
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors"
        >
          <Heart 
            size={18} 
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>

        {/* কুইক ভিউ - হোভারে দেখাবে */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link href={`/product/${id}`}>
            <button className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Eye size={20} />
            </button>
          </Link>
          <button className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* কন্টেন্ট সেকশন */}
      <div className="p-4">
        {/* রেটিং */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={16} 
                className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({reviewCount})</span>
        </div>

        {/* প্রোডাক্ট নাম */}
        <Link href={`/product/${id}`}>
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-primary transition-colors">
            {name}
          </h3>
        </Link>

        {/* প্রাইস */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">৳{price.toLocaleString()}</span>
          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">৳{oldPrice.toLocaleString()}</span>
          )}
        </div>

        {/* অ্যাড টু কার্ট বাটন */}
        <button className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
          <ShoppingCart size={18} />
          {t('products.addToCart')}
        </button>
      </div>
    </div>
  )
}