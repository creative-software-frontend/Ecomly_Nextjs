'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import Link from 'next/link'

export default function FooterAbout() {
  const { t } = useLanguage()

  return (
    <div>
      <h3 className="font-semibold text-lg mb-4">{t('footer.about')}</h3>
      <ul className="space-y-2">
        <li>
          <Link href="/about" className="text-gray-600 hover:text-primary transition">
            {t('footer.about')}
          </Link>
        </li>
        <li>
          <Link href="/terms" className="text-gray-600 hover:text-primary transition">
            {t('footer.terms')}
          </Link>
        </li>
        <li>
          <Link href="/refund" className="text-gray-600 hover:text-primary transition">
            {t('footer.refund')}
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="text-gray-600 hover:text-primary transition">
            {t('footer.privacy')}
          </Link>
        </li>
      </ul>
    </div>
  )
}