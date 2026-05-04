import { getCategoryProducts } from '@/app/lib/products'
import ProductCard from '@/app/components/shared/ProductCard'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface CategoryPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params
  const categoryId = parseInt(resolvedParams.id)

  // Fetch products for this category
  const products = await getCategoryProducts(categoryId)

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight size={16} />
          <Link href="/categories" className="hover:text-primary">
            Categories
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 font-medium">Category #{categoryId}</span>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Category Products
        </h1>
        <p className="text-gray-600 mb-8">
          Showing {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((product) => (
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
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              We couldn&apos;t find any products in this category.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Browse All Categories
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
