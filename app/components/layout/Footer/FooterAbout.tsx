'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Link from 'next/link'

export default function FooterAbout() {
  const { t } = useLanguage()

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-gray-900">{t('footer.about')}</h3>
      <ul className="space-y-2">
        <li>
          <Link href="/about-us" className="text-gray-500 hover:text-green-600 transition-colors">
            {t('footer.about')}
          </Link>
        </li>
        <li>
          <Link href="/terms-and-conditions" className="text-gray-500 hover:text-green-600 transition-colors">
            {t('footer.terms')}
          </Link>
        </li>
        <li>
          <Link href="/refund-and-return-policy" className="text-gray-500 hover:text-green-600 transition-colors">
            {t('footer.refund')}
          </Link>
        </li>
        <li>
          <Link href="/privacy-policy" className="text-gray-500 hover:text-green-600 transition-colors">
            {t('footer.privacy')}
          </Link>
        </li>
      </ul>
    </div>
  )
}