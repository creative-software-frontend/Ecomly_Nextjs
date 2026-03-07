'use client'

import { useLanguage } from "@/app/context/LanguageContext"



export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  const handleChangeLanguage = (lang: 'en' | 'bn') => {
    setLanguage(lang)
  }

  return (
    <div className="flex bg-gray-100 p-1 rounded-lg text-[11px] font-black border border-gray-200">
      <button 
        onClick={() => handleChangeLanguage('en')} 
        className={`px-3 py-1 rounded-md transition-all ${
          language === 'en' 
            ? 'bg-white shadow-sm text-primary' 
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        EN
      </button>
      <button 
        onClick={() => handleChangeLanguage('bn')} 
        className={`px-3 py-1 rounded-md transition-all ${
          language === 'bn' 
            ? 'bg-white shadow-sm text-primary' 
            : 'text-gray-400 hover:text-gray-600'
        }`}
      >
        বাং
      </button>
    </div>
  )
}