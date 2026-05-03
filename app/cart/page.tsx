'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Trash2, Plus, Minus, MapPin, PlusCircle, Check, ChevronRight, X, ArrowLeft, Printer } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'
import { Button } from '@/components/ui/button'

interface Address {
  id: string
  name: string
  phone: string
  address: string
  deliveryCharge: number
  isDefault: boolean
}

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

type CartView = 'CART' | 'CHECKOUT_SUMMARY' | 'ORDER_DETAILS'

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart()
  
  // View State
  const [currentView, setCurrentView] = useState<CartView>('CART')
  const [orderId, setOrderId] = useState('')
  const [orderDate, setOrderDate] = useState('')
  
  // Address States
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses)
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(mockAddresses[0])
  const [showAddressList, setShowAddressList] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)
  
  // Form State
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newAddress, setNewAddress] = useState('')
  const [newDeliveryCharge, setNewDeliveryCharge] = useState('60')
  const [setAsDefault, setSetAsDefault] = useState(false)

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault()
    const newAddr: Address = {
      id: Date.now().toString(),
      name: newName,
      phone: newPhone,
      address: newAddress,
      deliveryCharge: parseInt(newDeliveryCharge) || 0,
      isDefault: setAsDefault
    }
    
    let updatedAddresses = [...addresses]
    if (setAsDefault) {
      updatedAddresses = updatedAddresses.map(a => ({ ...a, isDefault: false }))
    }
    updatedAddresses.push(newAddr)
    
    setAddresses(updatedAddresses)
    if (setAsDefault) setSelectedAddress(newAddr)
    setShowAddForm(false)
    
    // Reset form
    setNewName('')
    setNewPhone('')
    setNewAddress('')
    setNewDeliveryCharge('60')
    setAsDefault(false)
  }

  const handlePlaceOrder = () => {
    const id = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    setOrderId(id)
    setOrderDate(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }))
    setCurrentView('ORDER_DETAILS')
    // In a real app, you'd clear the cart here after a delay or on success
  }

  const handlePrint = () => {
    window.print()
  }

  if (items.length === 0 && currentView === 'CART') {
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
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const deliveryCharge = selectedAddress?.deliveryCharge || 0
  const discount = items.length > 2 ? 200 : 0 // Demo discount
  const grandTotal = totalPrice + deliveryCharge - discount

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm p-4 flex gap-4 animate-in fade-in slide-in-from-left-4 duration-300">
                <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-lg font-bold text-primary mb-2">৳{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="h-8 w-8 p-0">
                      <Minus size={14} />
                    </Button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-8 w-8 p-0">
                      <Plus size={14} />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="ml-auto text-red-500 hover:text-red-600 hover:bg-red-50">
                      <Trash2 size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                  <MapPin size={20} className="text-primary" /> Delivery Address
                </h2>
                <button onClick={() => setShowAddressList(true)} className="text-xs font-bold text-primary hover:underline">Change</button>
              </div>
              {selectedAddress ? (
                <div className="p-4 border-2 border-primary/10 bg-primary/5 rounded-xl cursor-pointer hover:border-primary/20 transition-all group" onClick={() => setShowAddressList(true)}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-900">{selectedAddress.name}</span>
                    <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{selectedAddress.isDefault ? 'Default' : 'Selected'}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{selectedAddress.phone}</p>
                  <p className="text-sm text-gray-500 line-clamp-2">{selectedAddress.address}</p>
                  <div className="mt-2 text-xs font-bold text-green-600 bg-green-50 inline-block px-2 py-1 rounded">Delivery: ৳{selectedAddress.deliveryCharge}</div>
                </div>
              ) : (
                <button onClick={() => setShowAddForm(true)} className="w-full py-8 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-primary hover:text-primary transition-all">
                  <PlusCircle size={24} /> <span className="font-medium">Add Delivery Address</span>
                </button>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600"><span>Subtotal ({items.length} items)</span><span>৳{totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between text-gray-600"><span>Delivery Charge</span><span>৳{deliveryCharge.toLocaleString()}</span></div>
                {discount > 0 && <div className="flex justify-between text-green-600 font-medium"><span>Discount</span><span>-৳{discount.toLocaleString()}</span></div>}
                <div className="border-t pt-3 flex justify-between font-bold text-lg"><span>Total</span><span className="text-primary">৳{grandTotal.toLocaleString()}</span></div>
              </div>
              <Link 
                href="/checkout"
                className={`w-full bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 mb-4 flex items-center justify-center ${!selectedAddress ? 'opacity-50 pointer-events-none' : ''}`}
              >
                Proceed to Checkout
              </Link>
              <button onClick={clearCart} className="w-full text-gray-400 py-2 text-sm font-medium hover:text-red-500 transition-colors">Clear Shopping Cart</button>
            </div>
          </div>
        </div>
      </div>
      {renderModals()}
    </div>
  )

  function renderModals() {
    return (
      <>
        {/* Address List Modal */}
        {showAddressList && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Select Address</h3>
                <button onClick={() => setShowAddressList(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} className="text-gray-400" /></button>
              </div>
              <div className="p-6 max-h-[400px] overflow-y-auto space-y-4">
                {addresses.map((addr) => (
                  <div key={addr.id} onClick={() => { setSelectedAddress(addr); setShowAddressList(false); }} className={`p-4 border-2 rounded-2xl cursor-pointer transition-all ${selectedAddress?.id === addr.id ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-primary/30'}`}>
                    <div className="flex justify-between items-center mb-2"><span className="font-bold text-gray-900">{addr.name}</span>{selectedAddress?.id === addr.id && <Check size={18} className="text-primary" />}</div>
                    <p className="text-sm text-gray-600">{addr.phone}</p>
                    <p className="text-sm text-gray-500 mt-1">{addr.address}</p>
                  </div>
                ))}
                <button onClick={() => { setShowAddressList(false); setShowAddForm(true); }} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center gap-2 text-primary font-bold hover:bg-primary/5 transition-all">
                  <Plus size={20} /> Add New Address
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Address Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="p-6 border-b flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-900">Add New Address</h3>
                <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} className="text-gray-400" /></button>
              </div>
              <form onSubmit={handleAddAddress} className="p-6 space-y-4">
                <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Full Name</label><input type="text" required value={newName} onChange={(e) => setNewName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="John Doe" /></div>
                <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Phone Number</label><input type="tel" required value={newPhone} onChange={(e) => setNewPhone(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="01XXXXXXXXX" /></div>
                <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Full Address</label><textarea required rows={3} value={newAddress} onChange={(e) => setNewAddress(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" placeholder="Street address, city, area" /></div>
                <div className="space-y-2"><label className="text-sm font-semibold text-gray-700">Delivery Charge (৳)</label><input type="number" required value={newDeliveryCharge} onChange={(e) => setNewDeliveryCharge(e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" placeholder="60" /></div>
                <div className="flex items-center gap-2 py-2"><input type="checkbox" id="default" checked={setAsDefault} onChange={(e) => setSetAsDefault(e.target.checked)} className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary" /><label htmlFor="default" className="text-sm font-medium text-gray-600 cursor-pointer">Set as default address</label></div>
                <div className="flex gap-3 pt-2"><button type="button" onClick={() => setShowAddForm(false)} className="flex-1 py-3.5 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-all">Cancel</button><button type="submit" className="flex-1 bg-primary text-white py-3.5 rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">Save Address</button></div>
              </form>
            </div>
          </div>
        )}
      </>
    )
  }
}