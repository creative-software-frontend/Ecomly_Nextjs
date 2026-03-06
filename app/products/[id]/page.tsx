import Image from 'next/image'
import { Star, Heart, ShoppingCart, Truck, RotateCcw, Shield } from 'lucide-react'
import { getSiteProducts } from '@/app/lib/products'
import ProductCard from '@/app/components/shared/ProductCard'


export default async function ProductPage({ params }: { params: { id: string } }) {
  const products = await getSiteProducts('Ecomly')
  const product = products.find((p: any) => p.id === params.id)
  
  if (!product) return <div>Product not found</div>

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-8">
        {/* ব্রেডক্রম্ব */}
        <div className="text-sm text-gray-500 mb-6">
          Home / Products / {product.category} / {product.name}
        </div>

        {/* প্রোডাক্ট মেইন সেকশন */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* ইমেজ গ্যালারি */}
            <div>
              <div className="relative h-96 w-full bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* প্রোডাক্ট ডিটেইল */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* রেটিং */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={18} 
                      className={i < Math.floor(product.rating.stars) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">{product.rating.count} reviews</span>
              </div>

              {/* প্রাইস */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ৳{(product.priceCents / 100).toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ৳{(product.priceCents / 100 * 1.2).toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -20%
                  </span>
                </div>
              </div>

              {/* বিবরণ */}
              <p className="text-gray-600 mb-8">{product.description}</p>

              {/* অ্যাকশন বাটন */}
              <div className="flex gap-4 mb-8">
                <button className="flex-1 bg-primary text-white py-4 rounded-lg font-semibold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="flex-1 border-2 border-primary text-primary py-4 rounded-lg font-semibold hover:bg-primary hover:text-white transition-colors">
                  Buy Now
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors">
                  <Heart size={20} />
                </button>
              </div>

              {/* ফিচার */}
              <div className="grid grid-cols-3 gap-4 py-6 border-t border-b border-gray-200">
                <div className="text-center">
                  <Truck className="mx-auto mb-2 text-primary" size={24} />
                  <p className="text-sm font-medium">Free Shipping</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="mx-auto mb-2 text-primary" size={24} />
                  <p className="text-sm font-medium">7 Days Return</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 text-primary" size={24} />
                  <p className="text-sm font-medium">1 Year Warranty</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* রিলেটেড প্রোডাক্ট */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map((p: any) => (
              <ProductCard
                key={p.id}
                id={p.id}
                name={p.name}
                price={p.priceCents / 100}
                oldPrice={p.priceCents / 100 * 1.2}
                image={p.image}
                rating={p.rating.stars}
                reviewCount={p.rating.count}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}