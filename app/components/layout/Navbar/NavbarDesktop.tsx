'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import LanguageToggle from './LanguageToggle'
import AuthButton from './AuthButton'
import SearchBar from './SearchBar'
import { useLanguage} from '@/app/context/LanguageContext'
import { useCart } from '@/app/context/CartContext'
import Logo from '../../shared/Logo'

export default function NavbarDesktop() {
  const { t } = useLanguage()
  const { totalItems } = useCart()

 return (
    <>
      {/* Main Navbar */}
      <div className="flex items-center justify-between py-3">
        <Logo showText={false} />

        <div className="flex-1 max-w-2xl mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
         <LanguageToggle />
         <AuthButton />
         <Link href="/cart" className="relative">
           <ShoppingCart size={24} className="text-gray-700 hover:text-green-600 transition" />
           {totalItems > 0 && (
             <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
               {totalItems}
             </span>
           )}
         </Link>
       </div>
      </div>

      {/* Category Menu */}
      <div className="flex items-center justify-between py-2 bg-primary-50 rounded-lg px-4">
        <div className="flex items-center space-x-4">
          <Link href="/products" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
            {t('nav.products')}
          </Link>
          <Link href="/shops" className="text-gray-700 hover:text-green-600 font-medium transition-colors">
            {t('nav.shops')}
          </Link>
          <Link href="/categories" className="text-gray-700 hover:text-green-600 font-medium flex items-center gap-1 transition-colors">
           Categories
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/track-order" className="text-sm text-gray-600 hover:text-green-600 font-medium transition-colors">
            {t('nav.track')}
          </Link>
          <Link href="/help" className="text-sm text-gray-600 hover:text-green-600 font-medium transition-colors">
            {t('nav.help')}
          </Link>
          <Link href="/sell" className="text-sm bg-green-600 text-white px-4 py-1.5 rounded-full hover:bg-green-700 transition font-medium">
            {t('nav.sell')}
          </Link>
        </div>
      </div>
    </>
  )
}
