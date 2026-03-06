'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Image from 'next/image'

export default function FooterBottom() {
  const { t } = useLanguage()

  return (
    <div className="border-t border-gray-200 pt-8 mt-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* সাপোর্ট সেকশন */}
        <div>
          <h3 className="font-semibold text-lg mb-3">{t('footer.support')}</h3>
          <p className="text-2xl font-bold text-primary mb-4">+880678045555</p>
          <div>
            <h4 className="font-medium mb-2">{t('footer.download')}</h4>
            <div className="flex space-x-3">
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition">
                Google Play
              </button>
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition">
                App Store
              </button>
            </div>
          </div>
        </div>

        {/* ভেরিফিকেশন */}
        <div className="flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">{t('footer.verified')}</p>
            <div className="bg-gray-100 px-6 py-3 rounded-lg">
              <span className="font-semibold">SSL.commerz</span>
            </div>
          </div>
        </div>

        {/* পেমেন্ট */}
        <div>
          <h3 className="font-semibold text-lg mb-3">{t('footer.payments')}</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-100 px-3 py-1 rounded">Visa</span>
            <span className="bg-gray-100 px-3 py-1 rounded">Mastercard</span>
            <span className="bg-gray-100 px-3 py-1 rounded">bKash</span>
            <span className="bg-gray-100 px-3 py-1 rounded">Nagad</span>
            <span className="bg-gray-100 px-3 py-1 rounded">Rocket</span>
          </div>
        </div>
      </div>

      {/* কপিরাইট */}
      <div className="text-center text-gray-500 text-sm mt-8 pt-4 border-t border-gray-200">
        © {new Date().getFullYear()} Ecomly. All rights reserved.
      </div>
    </div>
  )
}