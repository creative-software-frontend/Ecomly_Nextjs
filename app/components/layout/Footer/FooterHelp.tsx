'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Link from 'next/link'

export default function FooterHelp() {
  const { t } = useLanguage()

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4 text-gray-900">HELP</h3>
      <ul className="space-y-2">
        <li>
          <Link href="/contact-us" className="text-gray-500 hover:text-green-600 transition-colors">
            {t('footer.contact')}
          </Link>
        </li>
        <li>
          <Link href="/faq" className="text-gray-500 hover:text-green-600 transition-colors">
            {t('footer.faq')}
          </Link>
        </li>
        <li>
          <Link href="/how-to-buy" className="text-gray-500 hover:text-green-600 transition-colors">
            {t('footer.howToBuy')}
          </Link>
        </li>
        <li>
          <Link href="/sell-on-ecomly" className="text-gray-500 hover:text-green-600 transition-colors">
            {t('footer.sell')}
          </Link>
        </li>
        <li>
          <Link href="/ecomly-university" className="text-gray-500 hover:text-green-600 transition-colors">
            {t('footer.university')}
          </Link>
        </li>
      </ul>
    </div>
  )
}