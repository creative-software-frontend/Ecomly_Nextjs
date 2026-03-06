'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart, User, Globe } from 'lucide-react'
import SearchBar from './SearchBar'
import { useLanguage } from '@/app/context/LanguageContext'

export default function NavbarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t, toggleLanguage, language } = useLanguage()

  return (
    <>
      <div className="flex items-center justify-between py-3">
        <Link href="/" className="text-2xl font-bold text-primary">
          Ecomly
        </Link>

        <div className="flex items-center space-x-4">
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
            <Link href="/categories" className="text-gray-700">{t('nav.categories')}</Link>
            <Link href="/products" className="text-gray-700">{t('nav.products')}</Link>
            <Link href="/shops" className="text-gray-700">{t('nav.shops')}</Link>
            
            <div className="border-t border-gray-100 my-2"></div>
            
            <Link href="/track-order" className="text-gray-600">{t('nav.track')}</Link>
            <Link href="/help" className="text-gray-600">{t('nav.help')}</Link>
            <Link href="/sell" className="text-gray-600">{t('nav.sell')}</Link>
            
            <div className="border-t border-gray-100 my-2"></div>
            
            <div className="flex items-center justify-between">
              <button onClick={toggleLanguage} className="flex items-center space-x-2">
                <Globe size={20} />
                <span>{t('nav.lang.full')}</span>
              </button>
              <div className="flex items-center space-x-3">
                <Link href="/login" className="text-primary">{t('nav.login')}</Link>
                <span>|</span>
                <Link href="/signup" className="text-primary">{t('nav.signup')}</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}