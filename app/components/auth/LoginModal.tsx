'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mobileNumber, setMobileNumber] = useState('')

  // Don't render if not open
  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('📱 Mobile number submitted:', mobileNumber)
    // TODO: Implement OTP sending logic here
    alert(`OTP will be sent to: ${mobileNumber}`)
  }

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close only if clicking directly on overlay (not modal content)
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    /* Overlay */
    <div 
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Content */}
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full relative animate-in fade-in zoom-in duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Modal Body */}
        <div className="p-6">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome
            </h2>
            <p className="text-gray-600 text-sm">
              Login or Sign Up to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Mobile Number Input */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter mobile number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                pattern="[0-9]{11}"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter your 11-digit mobile number (e.g., 01XXXXXXXXX)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Send OTP
            </button>

          </form>

          {/* Terms */}
          <p className="mt-4 text-xs text-gray-500 text-center">
            By continuing, you agree to our{' '}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>

      </div>
    </div>
  )
}
