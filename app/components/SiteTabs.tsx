'use client'

import { useState } from 'react'
import ProductCard from './shared/ProductCard'

interface SiteData {
  site: string
  products: any[]
}

export default function SiteTabs({ sitesData }: { sitesData: SiteData[] }) {
  const [activeSite, setActiveSite] = useState(sitesData[0]?.site || '')

  const activeProducts = sitesData.find(s => s.site === activeSite)?.products || []

  return (
    <div>
      {/* প্রোডাক্ট গ্রিড - ট্যাব ছাড়া শুধু প্রোডাক্ট */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeProducts.slice(0, 8).map((product: any) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.priceCents / 100}
            oldPrice={product.priceCents / 100 * 1.2}
            image={product.image}
            rating={product.rating.stars}
            reviewCount={product.rating.count} // এটা যোগ করুন
          />
        ))}
      </div>

      {/* আরও দেখুন বাটন */}
      <div className="text-center mt-8">
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700">
          আরও পণ্য দেখুন
        </button>
      </div>
    </div>
  )
}