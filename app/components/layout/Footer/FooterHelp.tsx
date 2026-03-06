'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Link from 'next/link'

export default function FooterHelp() {
  const { t } = useLanguage()

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">HELP</h3>
      <ul className="space-y-2">
        <li>
          <Link href="/contact" className="text-gray-600 hover:text-primary transition">
            {t('footer.contact')}
          </Link>
        </li>
        <li>
          <Link href="/faq" className="text-gray-600 hover:text-primary transition">
            {t('footer.faq')}
          </Link>
        </li>
        <li>
          <Link href="/how-to-buy" className="text-gray-600 hover:text-primary transition">
            {t('footer.howToBuy')}
          </Link>
        </li>
        <li>
          <Link href="/sell" className="text-gray-600 hover:text-primary transition">
            {t('footer.sell')}
          </Link>
        </li>
        <li>
          <Link href="/university" className="text-gray-600 hover:text-primary transition">
            {t('footer.university')}
          </Link>
        </li>
      </ul>
    </div>
  )
}