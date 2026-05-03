'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'
import SearchBar from './SearchBar'
import LanguageToggle from './LanguageToggle'
import AuthButton from './AuthButton'
import CategoryToggleButton from './CategoryToggleButton'
import Logo from '../../shared/Logo'
import NotificationDropdown from './NotificationDropdown'
import { useLanguage } from '@/app/context/LanguageContext'
import { useCart } from '@/app/context/CartContext'

export default function NavbarMobile() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()
  const { totalItems } = useCart()

  return (
    <>
      <div className="flex items-center justify-between py-3">
        <Logo showText={false} imageClassName="h-[45px] w-[160px]" />

        <div className="flex items-center space-x-2">
          <LanguageToggle />
          <NotificationDropdown />
          <Link href="/cart" className="relative">
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
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
            <CategoryToggleButton />
            <Link href="/products" className="text-gray-700 hover:text-green-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              {t('nav.products')}
            </Link>
            <Link href="/shops" className="text-gray-700 hover:text-green-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              {t('nav.shops')}
            </Link>

            <div className="border-t border-gray-100 my-2"></div>
            <AuthButton onClick={() => setIsMenuOpen(false)} />
            <Link href="/track-order" className="text-gray-600 hover:text-green-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              {t('nav.track')}
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-green-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              {t('nav.help')}
            </Link>
            <Link href="/sell" className="text-gray-600 hover:text-green-600 transition-colors" onClick={() => setIsMenuOpen(false)}>
              {t('nav.sell')}
            </Link>
          </div>
        </div>
      )}
    </>
  )
}