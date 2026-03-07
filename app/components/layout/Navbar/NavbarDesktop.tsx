'use client'

import Link from 'next/link'
import { ShoppingCart, User } from 'lucide-react'
import LanguageToggle from './LanguageToggle'
import SearchBar from './SearchBar'
import { useLanguage } from '@/app/context/LanguageContext'
import Logo from '../../shared/Logo'

export default function NavbarDesktop() {
  const { t } = useLanguage()

  return (
    <>
      {/* মেইন ন্যাভবার */}
      <div className="flex items-center justify-between py-3">
        <Logo showText={false}/>

        <div className="flex-1 max-w-2xl mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-6">
          <LanguageToggle />

          <div className="flex items-center space-x-3">
            <Link href="/login" className="text-gray-700 hover:text-primary font-medium">
              {t('nav.login')}
            </Link>
            <span className="text-gray-300">|</span>
            <Link href="/signup" className="text-gray-700 hover:text-primary font-medium">
              {t('nav.signup')}
            </Link>
          </div>

          <Link href="/cart" className="relative">
            <ShoppingCart size={24} className="text-gray-700 hover:text-primary transition" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* ক্যাটাগরি মেনু */}
      <div className="flex items-center justify-between py-2 border-t border-gray-100">
        <div className="flex items-center space-x-8">
          <Link href="/categories" className="text-gray-700 hover:text-primary font-medium">
            {t('nav.categories')}
          </Link>
          <Link href="/products" className="text-gray-700 hover:text-primary font-medium">
            {t('nav.products')}
          </Link>
          <Link href="/shops" className="text-gray-700 hover:text-primary font-medium">
            {t('nav.shops')}
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/track-order" className="text-sm text-gray-600 hover:text-primary">
            {t('nav.track')}
          </Link>
          <Link href="/help" className="text-sm text-gray-600 hover:text-primary">
            {t('nav.help')}
          </Link>
          <Link href="/sell" className="text-sm text-gray-600 hover:text-primary">
            {t('nav.sell')}
          </Link>
        </div>
      </div>
    </>
  )
}