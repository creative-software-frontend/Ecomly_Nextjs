'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
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
import { useCategorySidebar } from '@/app/context/CategorySidebarContext'

const categories = [
  { id: 'bags', name: 'Bags', icon: ShoppingBag, href: '/categories/bags' },
  { id: 'jewelry', name: 'Jewelry', icon: Gem, href: '/categories/jewelry' },
  { id: 'shoes', name: 'Shoes', icon: Footprints, href: '/categories/shoes' },
  { id: 'beauty', name: 'Beauty', icon: Sparkles, href: '/categories/beauty' },
  { id: 'mens-wear', name: 'Mens Wear', icon: Shirt, href: '/categories/mens-wear' },
  { id: 'women-wear', name: 'Women Wear', icon: Shirt, href: '/categories/women-wear' },
  { id: 'eyewear', name: 'Eyewear', icon: Glasses, href: '/categories/eyewear' },
  { id: 'baby-items', name: 'Baby Items', icon: Baby, href: '/categories/baby-items' },
  { id: 'watches', name: 'Watches', icon: Watch, href: '/categories/watches' },
  { id: 'gadgets', name: 'Gadgets', icon: Smartphone, href: '/categories/gadgets' },
]

export default function CategorySidebar() {
  const pathname = usePathname()
  const { isOpen, closeSidebar } = useCategorySidebar()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Hide sidebar on checkout flow pages
  const hideSidebarRoutes = ['/cart', '/checkout', '/order-success']
  if (hideSidebarRoutes.includes(pathname)) return null

  // On mobile, show overlay sidebar (controlled by isOpen)
  if (isMobile) {
    if (!isOpen) return null
    
    return (
      <>
        {/* Overlay */}
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeSidebar}
        />
        
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 h-full w-72 bg-white shadow-xl z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-lg">Categories</h2>
              <button 
                onClick={closeSidebar}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>
            
            <nav className="space-y-1">
              {categories.map((category) => {
                const Icon = category.icon
                const isActive = pathname === category.href
                
                return (
                  <Link
                    key={category.id}
                    href={category.href}
                    onClick={closeSidebar}
                    className={`
                      flex items-center justify-between px-3 py-2.5 rounded-lg transition-all
                      ${isActive 
                        ? 'bg-green-50 text-green-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={18} className={isActive ? 'text-green-600' : 'text-gray-500'} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <ChevronRight size={16} className={isActive ? 'text-green-600' : 'text-gray-400'} />
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>
      </>
    )
  }

  // On desktop, always show fixed sidebar
  return (
    <aside className="fixed top-20 left-4 bottom-4 w-72 bg-white border rounded-lg shadow-xl z-30 overflow-hidden">
      <div className="h-full">
        <div className="p-4 border-b">
          <h2 className="font-bold text-lg">Categories</h2>
        </div>
        
        {/* Category List */}
        <nav className="space-y-1 p-2">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = pathname === category.href
            
            return (
              <Link
                key={category.id}
                href={category.href}
                className={`
                  flex items-center justify-between px-3 py-2.5 rounded-lg transition-all
                  ${isActive 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? 'text-green-600' : 'text-gray-500'} />
                  <span className="font-medium">{category.name}</span>
                </div>
                <ChevronRight size={16} className={isActive ? 'text-green-600' : 'text-gray-400'} />
              </Link>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}