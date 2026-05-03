'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, MapPin, Check, ArrowLeft, ChevronRight } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'
import { useRouter } from 'next/navigation'

interface Address {
  id: string
  name: string
  phone: string
  address: string
  deliveryCharge: number
  isDefault: boolean
}

// In a real app, this would come from a database or shared state
const mockAddresses: Address[] = [
  {
    id: '1',
    name: 'John Doe',
    phone: '01712345678',
    address: '123 Main St, Dhaka, Bangladesh',
    deliveryCharge: 60,
    isDefault: true
  }
]

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
  const router = useRouter()
  const [selectedAddress] = useState<Address>(mockAddresses[0])

  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart')
    }
  }, [items, router])

  if (items.length === 0) return null

  const deliveryCharge = selectedAddress?.deliveryCharge || 0
  const discount = items.length > 2 ? 200 : 0
  const grandTotal = totalPrice + deliveryCharge - discount

  const handlePlaceOrder = () => {
    // Navigate to success page
    router.push('/order-success')
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <Link href="/cart" className="flex items-center gap-2 text-gray-600 hover:text-primary font-bold mb-8 transition-colors w-fit">
          <ArrowLeft size={20} /> Back to Cart
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">Checkout Summary</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Details */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
                <MapPin className="text-primary" size={20}/> Delivery Address
              </h2>
              <div className="p-5 bg-primary/5 rounded-2xl border-2 border-primary/10">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-bold text-gray-900 text-lg">{selectedAddress?.name}</p>
                  <span className="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded-full font-bold uppercase">Selected</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">{selectedAddress?.phone}</p>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{selectedAddress?.address}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900">
                <ShoppingCart className="text-primary" size={20}/> Items in Order
              </h2>
              <div className="divide-y divide-gray-50">
                {items.map((item) => (
                  <div key={item.id} className="py-4 flex justify-between items-center group">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                        <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                      </div>
                      <div className="flex flex-col justify-center">
                        <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{item.name}</p>
                        <p className="text-sm text-gray-500 font-medium">Quantity: {item.quantity}</p>
                        <p className="text-xs text-primary font-bold mt-1 sm:hidden">৳{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                    <p className="font-black text-gray-900 hidden sm:block">৳{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-50">Payment Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Subtotal</span>
                  <span className="text-gray-900 font-bold">৳{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Delivery Charge</span>
                  <span className="text-gray-900 font-bold">৳{deliveryCharge.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600 font-bold bg-green-50 p-3 rounded-xl">
                    <span>Discount</span>
                    <span>-৳{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="pt-4 border-t-2 border-gray-50 flex justify-between text-2xl font-black text-gray-900">
                  <span>Total</span>
                  <span className="text-primary">৳{grandTotal.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="space-y-3">
                <button 
                  onClick={handlePlaceOrder}
                  className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  Place Order <Check size={20} className="group-hover:scale-125 transition-transform" />
                </button>
                <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">Safe & Secure Checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
