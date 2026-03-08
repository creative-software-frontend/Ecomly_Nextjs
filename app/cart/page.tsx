import Link from 'next/link'
import { ShoppingCart, Trash2 } from 'lucide-react'

export default function CartPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added any items yet</p>
          <Link 
            href="/products" 
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}