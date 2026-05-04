'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { User, LogOut, Package, Settings, ChevronDown } from 'lucide-react'
import LoginModal from '../../auth/LoginModal'
import { useAuth } from '@/app/context/AuthContext'

interface AuthButtonProps {
  className?: string
  onClick?: () => void
}

export default function AuthButton({ className = '', onClick }: AuthButtonProps) {
  const { isLoggedIn, user, logout } = useAuth()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleButtonClick = () => {
    if (isLoggedIn) {
      setIsMenuOpen(!isMenuOpen)
    } else {
      setIsModalOpen(true)
      if (onClick) onClick()
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  if (isLoggedIn && user) {
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={handleButtonClick}
          className={`flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 transition-all border ${className}`}
        >
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <User size={18} className="text-primary" />
            )}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-gray-900 leading-tight truncate max-w-[80px]">
              {user.name}
            </p>
            <p className="text-[10px] text-gray-500 leading-tight">My Account</p>
          </div>
          <ChevronDown size={14} className={`text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="px-4 py-3 border-b border-gray-50 mb-1">
              <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
            
            <Link 
              href="/profile" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <User size={18} />
              Profile Settings
            </Link>
            
            <Link 
              href="/order-history" 
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
            >
              <Package size={18} />
              Order History
            </Link>

            <div className="border-t border-gray-50 mt-1 pt-1">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={`bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors ${className}`}
      >
        Login / Sign Up
      </button>

      {isModalOpen && <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </>
  )
}

