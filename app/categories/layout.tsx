'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import CategorySidebar from '../components/layout/CategorySidebar'

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  // ইউআরএল চেঞ্জ হলে সাইডবার ক্লোজ করুন (মোবাইলের জন্য)
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false)
    }
  }, [pathname])

  // কাস্টম ইভেন্ট লিসেনার
  useEffect(() => {
    // গ্লোবাল ফাংশন তৈরি করুন
    const toggleSidebar = () => {
      setIsSidebarOpen(prev => !prev)
    }

    // ইভেন্ট লিসেনার
    window.addEventListener('toggleCategorySidebar', toggleSidebar)
    
    // ক্লিনআপ
    return () => {
      window.removeEventListener('toggleCategorySidebar', toggleSidebar)
    }
  }, [])

  return (
    <div className="container-custom py-8">
      <div className="flex gap-8">
        <CategorySidebar
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>
    </div>
  )
}