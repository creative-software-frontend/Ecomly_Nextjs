import Link from 'next/link'
import {
  ShoppingBag, Gem, Footprints, Sparkles, Shirt,
  Glasses, Baby, Watch, Smartphone
} from 'lucide-react'

export const metadata = {
  title: 'Categories | Ecomly',
  description: 'Browse all product categories on Ecomly.',
}

const categories = [
  { id: 'bags',        name: 'Bags',        icon: ShoppingBag },
  { id: 'jewelry',     name: 'Jewelry',     icon: Gem         },
  { id: 'shoes',       name: 'Shoes',       icon: Footprints  },
  { id: 'beauty',      name: 'Beauty',      icon: Sparkles    },
  { id: 'mens-wear',   name: 'Mens Wear',   icon: Shirt       },
  { id: 'women-wear',  name: 'Women Wear',  icon: Shirt       },
  { id: 'eyewear',     name: 'Eyewear',     icon: Glasses     },
  { id: 'baby-items',  name: 'Baby Items',  icon: Baby        },
  { id: 'watches',     name: 'Watches',     icon: Watch       },
  { id: 'gadgets',     name: 'Gadgets',     icon: Smartphone  },
]

export default function CategoriesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-10">

        {/* Header */}
        <h1 className="text-3xl font-bold text-green-600 mb-1">Categories</h1>
        <p className="text-gray-500 text-sm mb-8">
          Find the perfect product for your needs
        </p>

        {/* Category icon cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {categories.map(cat => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="group flex flex-col items-center py-7 px-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {/* Icon circle */}
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:shadow-md group-hover:bg-green-100 transition-all duration-200">
                  <Icon
                    size={36}
                    strokeWidth={1.4}
                    className="text-gray-500 group-hover:text-green-600 transition-colors duration-200"
                  />
                </div>

                {/* Category name */}
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-green-600 text-center transition-colors duration-200">
                  {cat.name}
                </span>
              </Link>
            )
          })}
        </div>

      </div>
    </div>
  )
}