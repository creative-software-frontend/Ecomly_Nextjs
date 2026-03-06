'use client'

import { useState } from 'react'
import { Search, Camera } from 'lucide-react'
import { useLanguage } from '@/app/context/LanguageContext'

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('')
  const { t } = useLanguage()

  const handleImageSearch = () => {
    alert(t('search.image'))
  }

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={t('search.placeholder')}
        className="w-full border-2 border-gray-200 rounded-lg py-2.5 pl-4 pr-20 focus:border-primary outline-none"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
        <button 
          onClick={handleImageSearch}
          className="p-1.5 hover:bg-gray-100 rounded-lg transition"
          title={t('search.image')}
        >
          <Camera size={20} className="text-gray-500" />
        </button>
        <button className="p-1.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition">
          <Search size={20} />
        </button>
      </div>
    </div>
  )
}