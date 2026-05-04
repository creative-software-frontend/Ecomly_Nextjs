'use client'

import { useState, useEffect } from 'react'
import { X, Mail, Smartphone, Lock, Eye, EyeOff, ArrowLeft, CheckCircle2, User, ChevronRight } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

type AuthView = 'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD' | 'OTP' | 'RESET_PASSWORD' | 'SUCCESS'
type AuthMethod = 'MOBILE' | 'EMAIL'

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { login } = useAuth()
  const [view, setView] = useState<AuthView>('LOGIN')
  const [authMethod, setAuthMethod] = useState<AuthMethod>('MOBILE')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  // Form states
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  useEffect(() => {
    if (!isOpen) {
      // Reset state when closing
      setTimeout(() => {
        setView('LOGIN')
        setAuthMethod('MOBILE')
        setMobileNumber('')
        setEmail('')
        setPassword('')
        setName('')
        setOtp(['', '', '', '', '', ''])
      }, 300)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1]
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      if (view === 'LOGIN' || view === 'REGISTER') {
        // Simulate real user data
        login({
          id: '1',
          name: name || 'Demo User',
          email: email || 'user@example.com',
          phone: mobileNumber || '01234567890',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
        })
        onClose()
      } else if (view === 'FORGOT_PASSWORD') {
        setView('OTP')
      } else if (view === 'OTP') {
        setView('RESET_PASSWORD')
      } else if (view === 'RESET_PASSWORD') {
        setView('SUCCESS')
      }
    }, 1500)
  }

  const renderHeader = () => {
    switch (view) {
      case 'LOGIN': return { title: 'Welcome Back', sub: 'Login to your account to continue' }
      case 'REGISTER': return { title: 'Create Account', sub: 'Join our community today' }
      case 'FORGOT_PASSWORD': return { title: 'Forgot Password?', sub: 'Enter your mobile number to receive an OTP' }
      case 'OTP': return { title: 'Verify OTP', sub: `Sent to ${authMethod === 'MOBILE' ? mobileNumber : email}` }
      case 'RESET_PASSWORD': return { title: 'New Password', sub: 'Create a strong password for your account' }
      case 'SUCCESS': return { title: 'All Set!', sub: 'Your password has been reset successfully' }
      default: return { title: 'Welcome', sub: '' }
    }
  }

  const { title, sub } = renderHeader()

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-300 h-full max-h-[600px] sm:h-auto">
        
        {/* Left Side: Illustration (Desktop Only) */}
        <div className="hidden md:flex md:w-5/12 bg-primary/10 flex-col justify-center p-12 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 rounded-full bg-primary blur-3xl"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 rounded-full bg-blue-500 blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-8 rotate-3">
              <CheckCircle2 size={32} className="text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
              Premium Shopping Experience
            </h2>
            <p className="text-gray-600 mb-8">
              Join thousands of happy customers and get access to exclusive deals and faster checkout.
            </p>
            <div className="space-y-4">
              {['Secure Payments', 'Fast Delivery', '24/7 Support'].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm font-medium text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="flex-1 p-6 sm:p-10 relative flex flex-col overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-20"
          >
            <X size={20} className="text-gray-400" />
          </button>

          {/* Back Button */}
          {view !== 'LOGIN' && view !== 'SUCCESS' && (
            <button
              onClick={() => setView(view === 'OTP' ? 'FORGOT_PASSWORD' : 'LOGIN')}
              className="absolute top-4 left-4 p-2 hover:bg-gray-100 rounded-full transition-colors flex items-center gap-2 text-sm font-medium text-gray-500"
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <div className="max-w-md mx-auto w-full pt-4">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-500 text-sm sm:text-base">{sub}</p>
            </div>

            {/* Auth Method Tabs (Only on Login) */}
            {view === 'LOGIN' && (
              <div className="flex p-1 bg-gray-100 rounded-xl mb-8">
                <button
                  onClick={() => setAuthMethod('MOBILE')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${authMethod === 'MOBILE' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Smartphone size={16} />
                  Mobile
                </button>
                <button
                  onClick={() => setAuthMethod('EMAIL')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${authMethod === 'EMAIL' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Mail size={16} />
                  Email
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {view === 'SUCCESS' ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 animate-bounce">
                    <CheckCircle2 size={40} />
                  </div>
                  <button
                    onClick={() => setView('LOGIN')}
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <>
                  {/* Name Input (Register Only) */}
                  {view === 'REGISTER' && (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>
                  )}

                  {/* Mobile/Email Input */}
                  {(view === 'LOGIN' || view === 'REGISTER' || view === 'FORGOT_PASSWORD') && (
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700 ml-1">
                        {authMethod === 'MOBILE' ? 'Mobile Number' : 'Email Address'}
                      </label>
                      <div className="relative group">
                        {authMethod === 'MOBILE' ? (
                          <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                        ) : (
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                        )}
                        <input
                          type={authMethod === 'MOBILE' ? 'tel' : 'email'}
                          required
                          value={authMethod === 'MOBILE' ? mobileNumber : email}
                          onChange={(e) => {
                            const val = e.target.value
                            if (authMethod === 'MOBILE') {
                              // Only allow numbers and max 11 chars
                              const numericVal = val.replace(/[^0-9]/g, '').slice(0, 11)
                              setMobileNumber(numericVal)
                            } else {
                              setEmail(val)
                            }
                          }}
                          maxLength={authMethod === 'MOBILE' ? 11 : undefined}
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                          placeholder={authMethod === 'MOBILE' ? '01XXXXXXXXX' : 'name@example.com'}
                        />
                      </div>
                    </div>
                  )}

                  {/* Password Input (Login / Register / Reset) */}
                  {(view === 'LOGIN' || view === 'REGISTER' || view === 'RESET_PASSWORD') && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                          <label className="text-sm font-semibold text-gray-700">
                            {view === 'RESET_PASSWORD' ? 'New Password' : 'Password'}
                          </label>
                          {view === 'LOGIN' && (
                            <button 
                              type="button"
                              onClick={() => {
                                setView('FORGOT_PASSWORD')
                                setAuthMethod('MOBILE')
                              }}
                              className="text-xs font-bold text-primary hover:underline"
                            >
                              Forgot Password?
                            </button>
                          )}
                        </div>
                        <div className="relative group">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                            placeholder="••••••••"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </div>

                      {view === 'RESET_PASSWORD' && (
                        <div className="space-y-2">
                          <label className="text-sm font-semibold text-gray-700 ml-1">Confirm New Password</label>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                              type={showPassword ? 'text' : 'password'}
                              required
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* OTP Input */}
                  {view === 'OTP' && (
                    <div className="flex justify-between gap-2 py-4">
                      {otp.map((digit, idx) => (
                        <input
                          key={idx}
                          id={`otp-${idx}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(idx, e.target.value)}
                          className="w-full h-12 sm:h-14 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                        />
                      ))}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        {view === 'LOGIN' ? 'Login Now' : view === 'REGISTER' ? 'Create Account' : 'Continue'}
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Switch between Login / Register */}
                  {view === 'LOGIN' && (
                    <p className="text-center text-sm text-gray-500 mt-6">
                      Don't have an account?{' '}
                      <button 
                        type="button"
                        onClick={() => setView('REGISTER')}
                        className="text-primary font-bold hover:underline"
                      >
                        Sign Up Free
                      </button>
                    </p>
                  )}
                  {view === 'REGISTER' && (
                    <p className="text-center text-sm text-gray-500 mt-6">
                      Already have an account?{' '}
                      <button 
                        type="button"
                        onClick={() => setView('LOGIN')}
                        className="text-primary font-bold hover:underline"
                      >
                        Login Here
                      </button>
                    </p>
                  )}

                  {/* Footer Terms */}
                  <p className="text-[11px] text-gray-400 text-center leading-relaxed mt-4">
                    By continuing, you agree to our{' '}
                    <a href="/terms" className="text-gray-600 font-medium hover:underline">Terms of Service</a> and{' '}
                    <a href="/privacy" className="text-gray-600 font-medium hover:underline">Privacy Policy</a>
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
