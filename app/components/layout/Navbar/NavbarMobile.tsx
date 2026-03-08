'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'
import SearchBar from './SearchBar'
import LanguageToggle from './LanguageToggle'
import { useLanguage } from '@/app/context/LanguageContext'

export default function NavbarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  const handleCategoriesClick = () => {
    setIsMenuOpen(false)
    if (typeof window !== 'undefined') {
      const event = new Event('toggleCategorySidebar')
      window.dispatchEvent(event)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          Ecomly
        </Link>

        <div className="flex items-center space-x-4">
          <LanguageToggle />
          
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="pb-3">
        <SearchBar />
      </div>

      {isMenuOpen && (
        <div className="py-4 border-t border-gray-100">
          <div className="flex flex-col space-y-4">
            <button 
              onClick={handleCategoriesClick}
              className="flex items-center gap-2 text-gray-700 font-medium text-left"
            >
              <Menu size={18} />
              {t('nav.categories')}
            </button>
            
            <Link href="/products" className="text-gray-700" onClick={() => setIsMenuOpen(false)}>
              {t('nav.products')}
            </Link>
            <Link href="/shops" className="text-gray-700" onClick={() => setIsMenuOpen(false)}>
              {t('nav.shops')}
            </Link>
            
            <div className="border-t border-gray-100 my-2"></div>
            
            <div className="flex items-center gap-3 py-2">
              <Link 
                href="/login" 
                className="flex-1 bg-primary-600 text-white text-center py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.login')}
              </Link>
              <Link 
                href="/register" 
                className="flex-1 border border-primary-600 text-primary-600 text-center py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('nav.signup')}
              </Link>
            </div>
            
            <Link href="/track-order" className="text-gray-600" onClick={() => setIsMenuOpen(false)}>
              {t('nav.track')}
            </Link>
            <Link href="/help" className="text-gray-600" onClick={() => setIsMenuOpen(false)}>
              {t('nav.help')}
            </Link>
            <Link href="/sell" className="text-gray-600" onClick={() => setIsMenuOpen(false)}>
              {t('nav.sell')}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}