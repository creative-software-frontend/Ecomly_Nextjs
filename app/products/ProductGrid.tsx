'use client'

import ProductCard from "../components/shared/ProductCard"
import { useState } from 'react'

interface ProductGridProps {
  initialProducts: any[]
}

// Client component for product grid with load more functionality
export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [displayedProducts, setDisplayedProducts] = useState(initialProducts.slice(0, 8))
  const [showMore, setShowMore] = useState(false)

  const handleLoadMore = () => {
   if (showMore) {
     // Show less - go back to 8 products
     setDisplayedProducts(initialProducts.slice(0, 8))
     setShowMore(false)
   } else {
     // Show more - display all products
     console.log('Loading more products. Total products:', initialProducts.length)
     console.log('First few product images:', initialProducts.slice(8, 12).map((p: any) => ({
       id: p.id,
       name: p.name,
       image: p.image
     })))
     setDisplayedProducts(initialProducts)
     setShowMore(true)
   }
  }

 return (
    <>
     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
       {displayedProducts.map((product: any) => (
         <ProductCard
           key={product.id}
           id={product.id}
           name={product.name}
           price={product.price}
           oldPrice={product.oldPrice}
           image={product.image}
           rating={product.rating.stars}
           reviewCount={product.rating.count}
         />
       ))}
     </div>

     {/* Load More button */}
     <div className="text-center mt-8">
       <button 
        onClick={handleLoadMore}
         className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
       >
         {showMore ? 'Show Less' : 'Load More Products'}
       </button>
     </div>
    </>
  )
}
