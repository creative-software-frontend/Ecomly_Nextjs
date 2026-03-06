'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube } from 'lucide-react'
import Link from 'next/link'

export default function FooterContact() {
  const { t } = useLanguage()

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-4">{t('footer.contact')}</h3>
        <ul className="space-y-3">
          <li className="flex items-start space-x-3">
            <MapPin size={20} className="text-gray-500 mt-1 flex-shrink-0" />
            <span className="text-gray-600">House #4, Rd No. 2(A), Dhanmondi, Dhaka 1209</span>
          </li>
          <li className="flex items-center space-x-3">
            <Phone size={20} className="text-gray-500" />
            <span className="text-gray-600">+880670145555</span>
          </li>
          <li className="flex items-center space-x-3">
            <Mail size={20} className="text-gray-500" />
            <span className="text-gray-600">info@packly.com</span>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-lg mb-3">Follow us on</h3>
        <div className="flex space-x-4">
          <Link href="https://facebook.com" className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
            <Facebook size={20} />
          </Link>
          <Link href="https://instagram.com" className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
            <Instagram size={20} />
          </Link>
          <Link href="https://youtube.com" className="bg-gray-100 p-2 rounded-full hover:bg-primary hover:text-white transition">
            <Youtube size={20} />
          </Link>
        </div>
      </div>
    </div>
  )
}