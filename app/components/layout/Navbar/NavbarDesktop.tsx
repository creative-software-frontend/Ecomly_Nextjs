import Link from 'next/link'
import { ShoppingCart, Menu } from 'lucide-react'
import LanguageToggle from './LanguageToggle'
import SearchBar from './SearchBar'
import { useLanguage } from '@/app/context/LanguageContext'
import Logo from '../../shared/Logo'

export default function NavbarDesktop() {
  const { t } = useLanguage()

  const handleCategoriesClick = () => {
    // সরাসরি ইভেন্ট ডিসপ্যাচ
    if (typeof window !== 'undefined') {
      const event = new Event('toggleCategorySidebar')
      window.dispatchEvent(event)
      
      // ডিবাগ জন্য কনসোল
      console.log('Toggle event dispatched')
    }
  }

  return (
    <>
      {/* মেইন ন্যাভবার */}
      <div className="flex items-center justify-between py-3">
        <Logo showText={true} textClassName="text-primary-800" />
        
        <div className="flex-1 max-w-2xl mx-8">
          <SearchBar />
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          
          <div className="flex items-center gap-2 border-r border-gray-200 pr-4 mr-2">
            <Link 
              href="/login" 
              className="text-gray-700 hover:text-primary-700 font-medium text-sm"
            >
              {t('nav.login')}
            </Link>
            <span className="text-gray-300">|</span>
            <Link 
              href="/register" 
              className="text-gray-700 hover:text-primary-700 font-medium text-sm"
            >
              {t('nav.signup')}
            </Link>
          </div>
          
          <Link href="/cart" className="relative">
            <ShoppingCart size={24} className="text-gray-700 hover:text-primary-700 transition" />
            <span className="absolute -top-2 -right-2 bg-secondary-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              0
            </span>
          </Link>
        </div>
      </div>

      {/* ক্যাটাগরি মেনু */}
      <div className="flex items-center justify-between py-2 bg-primary-50 rounded-lg px-4">
        <div className="flex items-center space-x-8">
          <button 
            onClick={handleCategoriesClick}
            className="flex items-center gap-2 text-gray-700 hover:text-primary-700 font-medium cursor-pointer"
          >
            <Menu size={18} />
            {t('nav.categories')}
          </button>
          <Link href="/products" className="text-gray-700 hover:text-primary-700 font-medium">
            {t('nav.products')}
          </Link>
          <Link href="/shops" className="text-gray-700 hover:text-primary-700 font-medium">
            {t('nav.shops')}
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/track-order" className="text-sm text-gray-600 hover:text-secondary-600 font-medium">
            {t('nav.track')}
          </Link>
          <Link href="/help" className="text-sm text-gray-600 hover:text-secondary-600 font-medium">
            {t('nav.help')}
          </Link>
          <Link href="/sell" className="text-sm bg-secondary-600 text-white px-4 py-1.5 rounded-full hover:bg-secondary-700 transition font-medium">
            {t('nav.sell')}
          </Link>
        </div>
      </div>
    </>
  )
}