'use client'


import { useLanguage } from '@/app/context/LanguageContext'
import { Globe, ChevronDown } from 'lucide-react'

export default function LanguageToggle() {
  const { language, toggleLanguage, t } = useLanguage()

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center space-x-1 text-gray-700 hover:text-primary transition"
    >
      <Globe size={20} />
      <span className="font-medium">{t('nav.lang')}</span>
      <ChevronDown size={16} />
    </button>
  )
}