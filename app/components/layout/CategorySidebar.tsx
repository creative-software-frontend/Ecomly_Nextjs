'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  ShoppingBag, 
  Gem, 
  Footprints, 
  Sparkles, 
  Shirt, 
  Glasses,
  Baby,
  Watch,
  Smartphone,
  ChevronRight,
  X
} from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

const categories = [
  { name: 'Bags', icon: ShoppingBag, href: '/categories/bags' },
  { name: 'Jewelry', icon: Gem, href: '/categories/jewelry' },
  { name: 'Shoes', icon: Footprints, href: '/categories/shoes' },
  { name: 'Beauty', icon: Sparkles, href: '/categories/beauty' },
  { name: 'Mens Wear', icon: Shirt, href: '/categories/mens-wear' },
  { name: 'Women Wear', icon: Shirt, href: '/categories/women-wear' },
  { name: 'Eyewear', icon: Glasses, href: '/categories/eyewear' },
  { name: 'Baby Items', icon: Baby, href: '/categories/baby-items' },
  { name: 'Watches', icon: Watch, href: '/categories/watches' },
  { name: 'Gadgets', icon: Smartphone, href: '/categories/gadgets' },
]

interface CategorySidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CategorySidebar({ isOpen, onClose }: CategorySidebarProps) {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <>
      {/* ওভারলে */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* সাইডবার */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50
        transition-transform duration-300 ease-in-out
        lg:static lg:shadow-sm
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-4">
          {/* হেডার */}
          <div className="flex items-center justify-between mb-4 lg:hidden">
            <h2 className="font-bold text-lg text-gray-800">{t('nav.categories')}</h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          {/* ক্যাটাগরি লিস্ট */}
          <nav className="space-y-1">
            {categories.map((category) => {
              const Icon = category.icon
              const isActive = pathname === category.href
              
              return (
                <Link
                  key={category.name}
                  href={category.href}
                  onClick={onClose}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} className={isActive ? 'text-blue-600' : 'text-gray-500'} />
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <ChevronRight size={16} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                </Link>
              )
            })}
          </nav>
        </div>
      </aside>
    </>
  )
}