import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { getAllSitesProducts } from '@/app/lib/products'
import { Product } from '@/app/types/product'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Load product data from all sites
  const sitesData = await getAllSitesProducts()
  const allProducts = sitesData.flatMap(site => site.products)
  
  // 2. Find product by ID from URL params
  const resolvedParams = await params
  const product = allProducts.find((p: Product) => p.id === resolvedParams.id)
  
  // 3. Show 404 if product not found
  if (!product) {
    notFound()
  }

  // 4. Display product details
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          Home / Products / {product.name}
        </div>

        {/* Product Detail Card */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(product.rating?.stars || 0) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating?.count || 0} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through">
                      ৳{product.oldPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-8">
                {product.description || 'No description available'}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex-1 bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="p-3 border border-gray-200 rounded-lg hover:border-primary-600 transition">
                  <Heart size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
