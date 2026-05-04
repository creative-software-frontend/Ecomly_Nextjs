'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, MapPin, Check, ArrowLeft, ChevronRight, ShieldCheck, CreditCard } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'
import { useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'

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
        
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-500">Please review your order details before placing order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">
            {/* Delivery Details */}
            <Card className="border-none shadow-sm">
              <CardHeader className="border-b border-gray-50 pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <MapPin className="text-primary" size={20}/> Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="p-5 bg-primary/5 rounded-2xl border-2 border-primary/10 group cursor-pointer hover:border-primary/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-bold text-gray-900 text-lg">{selectedAddress?.name}</p>
                    <div className="flex items-center gap-2">
                      <span className="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded-full font-bold uppercase">Selected</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium">{selectedAddress?.phone}</p>
                  <p className="text-sm text-gray-500 mt-2 leading-relaxed">{selectedAddress?.address}</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="border-none shadow-sm">
              <CardHeader className="border-b border-gray-50 pb-4">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <ShoppingCart className="text-primary" size={20}/> Review Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-gray-50">
                  {items.map((item) => (
                    <div key={item.id} className="py-5 flex justify-between items-center group">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                          <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <p className="font-bold text-gray-900 group-hover:text-primary transition-colors">{item.name}</p>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-tight mt-1">Quantity: {item.quantity}</p>
                          <p className="text-sm text-primary font-bold mt-2 sm:hidden">৳{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <p className="font-black text-gray-900 text-lg">৳{(item.price * item.quantity).toLocaleString()}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase">৳{item.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card className="border-none shadow-xl sticky top-24 overflow-visible">
              <CardHeader className="border-b border-gray-50 pb-4">
                <CardTitle className="text-xl font-black text-gray-900 flex items-center gap-2">
                  <CreditCard size={20} className="text-primary" /> Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Subtotal</span>
                    <span className="text-gray-900 font-bold">৳{totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Delivery Charge</span>
                    <span className="text-gray-900 font-bold">৳{deliveryCharge.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold bg-green-50/50 p-3 rounded-xl border border-green-100">
                      <span>Instant Discount</span>
                      <span>-৳{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                    <span className="text-gray-400 font-bold uppercase text-[10px] tracking-widest pb-1">Grand Total</span>
                    <span className="text-3xl font-black text-primary">৳{grandTotal.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-primary text-white py-4 rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2 group relative overflow-hidden"
                  >
                    <span className="relative z-10">Place Order Now</span>
                    <Check size={20} className="group-hover:scale-125 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </button>
                  
                  <div className="flex items-center justify-center gap-2 text-gray-400">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Secure Checkout</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
