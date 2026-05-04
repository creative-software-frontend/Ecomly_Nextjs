import { getCategories, getCategoryProducts } from '@/app/lib/products'
import ProductCard from '@/app/components/shared/ProductCard'
import Link from 'next/link'
import { ChevronRight, Tag, PackageOpen, LayoutGrid } from 'lucide-react'
import {
  ShoppingBag, Gem, Footprints, Sparkles, Shirt,
  Glasses, Baby, Watch, Smartphone
} from 'lucide-react'

// ─── Static category definitions ──────────────────────────────────────────────
const staticCategories = [
  { id: 'bags',       name: 'Bags',        icon: ShoppingBag },
  { id: 'jewelry',    name: 'Jewelry',     icon: Gem         },
  { id: 'shoes',      name: 'Shoes',       icon: Footprints  },
  { id: 'beauty',     name: 'Beauty',      icon: Sparkles    },
  { id: 'mens-wear',  name: 'Mens Wear',   icon: Shirt       },
  { id: 'women-wear', name: 'Women Wear',  icon: Shirt       },
  { id: 'eyewear',    name: 'Eyewear',     icon: Glasses     },
  { id: 'baby-items', name: 'Baby Items',  icon: Baby        },
  { id: 'watches',    name: 'Watches',     icon: Watch       },
  { id: 'gadgets',    name: 'Gadgets',     icon: Smartphone  },
]

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const cat = staticCategories.find(c => c.id === slug)
  const name = cat?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  return {
    title: `${name} | Ecomly`,
    description: `Browse ${name} products on Ecomly.`,
  }
}

export default async function CategorySlugPage({ params }: Props) {
  const { slug } = await params

  // Resolve display name & icon from static list
  const staticCat = staticCategories.find(c => c.id === slug)
  const categoryName = staticCat?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  const Icon = staticCat?.icon ?? LayoutGrid

  // Try to find a matching numeric ID from the API by name similarity
  const apiCategories = await getCategories()
  const keyword = categoryName.toLowerCase().split(' ')[0]
  const matchedApiCat = apiCategories.find(c =>
    c.name.toLowerCase().includes(keyword) ||
    keyword.includes(c.name.toLowerCase().split(' ')[0])
  )

  const products = matchedApiCat ? await getCategoryProducts(matchedApiCat.id) : []

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/categories" className="hover:text-green-600 transition-colors">Categories</Link>
          <ChevronRight size={14} />
          <span className="text-gray-800 font-medium">{categoryName}</span>
        </div>

        <div className="flex gap-6 items-start">

          {/* ── Left Sidebar ── */}
          <aside className="w-60 flex-shrink-0 hidden md:block">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden sticky top-24">
              <div className="px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-500 flex items-center gap-2">
                <Tag size={16} className="text-white" />
                <h2 className="font-bold text-white text-base">Categories</h2>
              </div>
              <nav className="p-2 max-h-[72vh] overflow-y-auto">
                {staticCategories.map(cat => {
                  const isActive = cat.id === slug
                  const CatIcon = cat.icon
                  return (
                    <Link
                      key={cat.id}
                      href={`/categories/${cat.id}`}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group ${
                        isActive
                          ? 'bg-green-50 text-green-600'
                          : 'text-gray-700 hover:bg-green-50 hover:text-green-600'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <CatIcon
                          size={15}
                          className={isActive ? 'text-green-600' : 'text-gray-400 group-hover:text-green-600'}
                        />
                        <span className={`text-sm truncate ${isActive ? 'font-semibold' : 'font-medium'}`}>
                          {cat.name}
                        </span>
                      </div>
                      <ChevronRight
                        size={13}
                        className={`flex-shrink-0 ${isActive ? 'text-green-500' : 'text-gray-300 group-hover:text-green-500'}`}
                      />
                    </Link>
                  )
                })}
              </nav>
            </div>
          </aside>

          {/* ── Right Content ── */}
          <main className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <Icon size={24} className="text-green-600" />
              <h1 className="text-2xl font-bold text-gray-900">{categoryName}</h1>
            </div>
            <p className="text-gray-500 text-sm mb-6">
              {products.length} {products.length === 1 ? 'product' : 'products'} found
            </p>

            {products.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
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
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                <PackageOpen size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-6">
                  We couldn&apos;t find any products in this category.
                </p>
                <Link
                  href="/categories"
                  className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  Browse All Categories
                </Link>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  )
}