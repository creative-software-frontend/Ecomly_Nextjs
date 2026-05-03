'use client'

import { useState, useRef, useEffect } from 'react'
import { Bell, Check, ExternalLink, Info, AlertCircle, ShoppingBag } from 'lucide-react'
import Link from 'next/link'

const mockNotifications = [
  {
    id: 1,
    title: 'Order Delivered',
    message: 'Your order #12345 has been successfully delivered.',
    time: '2 mins ago',
    type: 'success',
    read: false,
    icon: <Check size={16} />,
    color: 'bg-green-100 text-green-600'
  },
  {
    id: 2,
    title: 'Flash Sale Alert',
    message: 'Up to 50% off on electronics. Shop now!',
    time: '1 hour ago',
    type: 'info',
    read: false,
    icon: <ShoppingBag size={16} />,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    id: 3,
    title: 'Account Security',
    message: 'New login detected from a new device.',
    time: '3 hours ago',
    type: 'warning',
    read: true,
    icon: <AlertCircle size={16} />,
    color: 'bg-amber-100 text-amber-600'
  }
]

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [notifications, setNotifications] = useState(mockNotifications)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-700 hover:text-primary transition-colors rounded-full hover:bg-gray-100"
      >
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[60] animate-in fade-in zoom-in duration-200 origin-top-right">
          {/* Header */}
          <div className="p-4 border-b border-gray-50 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-gray-900">Notifications</h3>
              <p className="text-xs text-gray-500">You have {unreadCount} unread messages</p>
            </div>
            <button 
              onClick={markAllAsRead}
              className="text-xs text-primary hover:underline font-medium"
            >
              Mark all as read
            </button>
          </div>

          {/* List */}
          <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div 
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50 last:border-0 flex gap-3 ${!notification.read ? 'bg-primary/5' : ''}`}
                >
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${notification.color}`}>
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-semibold text-gray-900 truncate">{notification.title}</h4>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2">{notification.time}</span>
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 self-center"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell size={24} className="text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm font-medium">No new notifications</p>
                <p className="text-gray-400 text-xs mt-1">We'll notify you when something happens.</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-50 text-center">
            <Link 
              href="/notifications" 
              className="text-sm font-semibold text-gray-700 hover:text-primary flex items-center justify-center gap-1.5 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              View all notifications
              <ExternalLink size={14} />
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
