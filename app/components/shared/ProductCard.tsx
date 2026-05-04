'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '@/app/context/LanguageContext'
import { useCart } from '@/app/context/CartContext'

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
  const [imageError, setImageError] = useState(false)
  const { t } = useLanguage()
  const { addToCart } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart({ id, name, price, image })
  }

  // Calculate discount percentage
  const discountPercentage = oldPrice 
    ? Math.round(((oldPrice - price) / oldPrice) * 100) 
    : discount

  return (
    <div 
      className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative h-64 w-full overflow-hidden bg-gray-100 flex-shrink-0">
        <Image
          src={imageError ? '/placeholder.jpg' : image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImageError(true)}
        />
        
        {/* Badge */}
        {discountPercentage && (
          <span className="absolute top-3 left-3 bg-secondary text-white text-sm font-bold px-3 py-1 rounded-full z-10">
            -{discountPercentage}%
          </span>
        )}
        
        {/* Wishlist Button */}
        <button 
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors z-10"
        >
          <Heart 
            size={18} 
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>

        {/* Quick View - Show on hover */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-3 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link href={`/products/${id}`}>
            <button className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors">
              <Eye size={20} />
            </button>
          </Link>
          <button 
            onClick={handleAddToCart}
            className="bg-white p-3 rounded-full hover:bg-primary hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          {/* Rating */}
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

          {/* Product Name */}
          <Link href={`/products/${id}`}>
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 hover:text-primary transition-colors min-h-[40px]">
              {name}
            </h3>
          </Link>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">৳{price.toLocaleString()}</span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">৳{oldPrice.toLocaleString()}</span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button 
          onClick={handleAddToCart}
          className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center gap-2 mt-auto"
        >
          <ShoppingCart size={18} />
          {t('products.addToCart')}
        </button>
      </div>
    </div>
  )
}