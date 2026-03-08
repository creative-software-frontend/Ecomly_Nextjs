import { notFound } from 'next/navigation'
import Image from 'next/image'
import { Star, ShoppingCart, Heart, Truck, RotateCcw, Shield } from 'lucide-react'
import Link from 'next/link'
import { getAllSitesProducts } from '@/app/lib/products'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const sitesData = await getAllSitesProducts()
  const allProducts = sitesData.flatMap(site => site.products)
  const product = allProducts.find((p: any) => p.id === params.id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-8">
        {/* ব্রেডক্রম্ব */}
        <div className="text-sm text-gray-500 mb-6">
          Home / Products / {product.category || 'Product'} / {product.name}
        </div>

        {/* প্রোডাক্ট ডিটেইল */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* ইমেজ */}
            <div className="relative h-96 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>

            {/* ইনফো */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(product.rating?.stars || 0) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating?.count || 0} reviews)</span>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ৳{(product.priceCents / 100).toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-gray-600 mb-8">{product.description || 'No description available'}</p>

              <div className="flex gap-4 mb-8">
                <button className="flex-1 bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:border-primary-600 transition">
                  <Heart size={20} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 py-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="mx-auto mb-2 text-primary-600" size={24} />
                  <p className="text-sm font-medium">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto mb-2 text-primary-600" size={24} />
                  <p className="text-sm font-medium">7 Days Return</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 text-primary-600" size={24} />
                  <p className="text-sm font-medium">1 Year Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}