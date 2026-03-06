'use client'

import { useEffect, useState } from 'react'
import NavbarMobile from './layout/Navbar/NavbarMobile'
import NavbarDesktop from './layout/Navbar/NavbarDesktop'


export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container-custom">
        {isMobile ? <NavbarMobile /> : <NavbarDesktop />}
      </div>
    </nav>
  )
}