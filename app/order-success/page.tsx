'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Printer, ShoppingBag, ArrowLeft, ChevronRight, ShoppingCart, MapPin, Pencil, MessageSquare, PhoneCall, Mail, PackageCheck, CreditCard, Tag } from 'lucide-react'
import { useCart } from '@/app/context/CartContext'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

export default function OrderSuccessPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [orderId, setOrderId] = useState('')
  const [orderDate, setOrderDate] = useState('')

  const selectedAddress = {
    name: 'Bagus Fikri',
    phone: '+(22)-789-907',
    address: '2118 Thornridge Cir. Syracuse, Connecticut 35624 United State',
    isDefault: true,
    deliveryCharge: 60
  }

  useEffect(() => {
    setOrderId('12567') // Match image
    setOrderDate(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }))
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const deliveryCharge = 60
  const discount = items.length > 2 ? 200 : 0
  const grandTotal = totalPrice + deliveryCharge - discount

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-12 font-sans">
      {/* SCREEN VIEW - Matches Image 1 */}
      <div className="container-custom py-8 print:hidden">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button onClick={() => window.history.back()} className="p-2 hover:bg-gray-100 rounded-full bg-white shadow-sm border border-gray-100">
              <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">Order-{orderId}</h1>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                  <Check size={12} /> Paid
                </span>
                <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                  Unfulfilled
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Order date {orderDate} • Order from <span className="font-bold border-b border-gray-400">Bagus Fikri</span> • Purchased via <span className="font-bold">online store</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 text-xs font-bold text-gray-600">
              <button className="underline hover:text-primary transition-colors">Report</button>
              <button className="underline hover:text-primary transition-colors">Duplicate</button>
              <button className="underline hover:text-primary transition-colors">Share Order</button>
            </div>
            <div className="flex gap-2">
              <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50"><ChevronRight className="rotate-180" size={16} /></button>
              <button className="p-1.5 border border-gray-200 rounded hover:bg-gray-50"><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Status Card */}
            <Card className="border-none shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-50 flex justify-between items-center text-xs bg-gray-50/50">
                <p className="text-gray-500 italic">Return to <span className="font-bold">Fikri Store</span> 🇺🇸 US, United State</p>
                <p className="text-gray-500">Estimated arrived at <span className="font-bold">1st to 3rd of February</span></p>
              </div>
              <CardContent className="p-8">
                <div className="relative flex justify-between">
                  <div className="flex flex-col items-center gap-2 flex-1">
                    <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center relative z-10 bg-white">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                    </div>
                    <span className="text-xs font-bold text-gray-900">Review order</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-2 h-2 rounded-full bg-gray-200 mt-1 relative z-10 group-hover:bg-primary transition-colors"></div>
                    <span className="text-xs text-gray-400">Preparing order</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-2 h-2 rounded-full bg-gray-200 mt-1 relative z-10 group-hover:bg-primary transition-colors"></div>
                    <span className="text-xs text-gray-400">Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 flex-1 group">
                    <div className="w-2 h-2 rounded-full bg-gray-200 mt-1 relative z-10 group-hover:bg-primary transition-colors"></div>
                    <span className="text-xs text-gray-400">Delivered</span>
                  </div>
                  {/* Progress Line */}
                  <div className="absolute top-[7px] left-[12.5%] right-[12.5%] h-[2px] bg-gray-100 z-0">
                    <div className="h-full bg-primary w-0"></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-between items-center">
              <button className="text-xs font-bold underline text-gray-900 hover:text-red-600 transition-colors">Cancel Order</button>
              <button
                onClick={handlePrint}
                className="bg-primary text-white px-6 py-2.5 rounded-lg font-bold text-xs flex items-center gap-2 hover:opacity-90 transition-all shadow-lg shadow-primary/20"
              >
                <Printer size={18} />
                Invoice
              </button>
            </div>

            {/* Products List */}
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row justify-between items-center border-b border-gray-50 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <PackageCheck className="text-primary" size={20} /> Products
                </CardTitle>
                <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
                  Unfulfilled
                </span>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center group">
                      <div className="flex gap-4">
                        <div className="w-20 h-20 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden relative">
                          <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">{item.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">SKU: Mac-1000</p>
                          <p className="text-[10px] text-gray-400 font-medium">Grey • Quantity {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-bold text-gray-900">৳{item.price.toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-4 border-t border-gray-50">
                  <button className="text-[10px] font-bold underline text-gray-900 hover:text-primary transition-colors">Reserved Item</button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row justify-between items-center border-b border-gray-50 pb-4">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="text-primary" size={20} /> Payment Details
                </CardTitle>
                <span className="text-[10px] text-green-600 font-bold flex items-center gap-1">
                  <Check size={12} /> Paid
                </span>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-gray-500">
                    <span>Payment Method</span>
                    <div className="flex items-center gap-2">
                      <span className="bg-gray-100 px-1 py-0.5 rounded text-[10px] font-black italic">VISA</span>
                      <span className="text-gray-900 font-bold">#3634</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Subtotal</span>
                    <div className="flex gap-2">
                      <span>{items.length} items</span>
                      <span className="text-gray-900 font-bold">৳{totalPrice.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Shipping Type</span>
                    <p className="text-right max-w-[200px]">The customer selected <span className="text-gray-900 font-bold underline">Standard Shipping</span> at checkout</p>
                  </div>
                  <div className="flex justify-between text-gray-500">
                    <span>Delivery Charge</span>
                    <span className="text-gray-900 font-bold">৳{deliveryCharge.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Order Note */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 relative group">
              <button className="absolute top-6 right-6 text-gray-300 hover:text-primary transition-colors"><Pencil size={14} /></button>
              <h2 className="font-bold text-gray-900 mb-4 text-sm">Order Note</h2>
              <p className="text-xs text-gray-500 leading-relaxed italic">
                Please wrap the box with a wrapper, so the text is unreadable, this is for birthday present
              </p>
            </div>

            {/* Customer Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              <div className="p-6 relative">
                <h2 className="font-bold text-gray-900 mb-6 text-sm">Customer</h2>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative border border-gray-100 shadow-sm">
                      <Image src="/api/placeholder/100/100" alt="Customer" fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">Bagus Fikri</p>
                      <p className="text-[10px] text-gray-400 font-bold">Total: 2 order</p>
                    </div>
                  </div>
                  <button className="p-2 border border-gray-100 rounded-lg hover:bg-primary/5 hover:text-primary transition-all"><MessageSquare size={14} /></button>
                </div>
              </div>

              <div className="p-6 relative">
                <button className="absolute top-6 right-6 text-gray-300 hover:text-primary transition-colors"><Pencil size={14} /></button>
                <h2 className="font-bold text-gray-900 mb-6 text-sm">Shipping Address</h2>
                <div className="rounded-lg overflow-hidden border border-gray-100 mb-4 h-28 relative">
                  <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                    <MapPin size={24} className="text-primary opacity-20" />
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="font-bold text-gray-900 text-sm">Bagus Fikri</p>
                    <p className="text-xs text-gray-500 max-w-[180px] leading-relaxed">
                      2118 Thornridge Cir. Syracuse, Connecticut 35624 United State
                    </p>
                  </div>
                  <button className="text-[10px] font-bold underline text-gray-900 hover:text-primary">View on Map</button>
                </div>
              </div>

              <div className="p-6 relative">
                <button className="absolute top-6 right-6 text-gray-300 hover:text-primary transition-colors"><Pencil size={14} /></button>
                <h2 className="font-bold text-gray-900 mb-4 text-sm">Contact Information</h2>
                <div className="space-y-2">
                  <div className="bg-primary/5 text-primary text-[10px] font-bold px-3 py-1.5 rounded inline-block border border-primary/10">bagus.fikri@mail.com</div>
                  <br />
                  <div className="bg-primary/5 text-primary text-[10px] font-bold px-3 py-1.5 rounded inline-block border border-primary/10">+(22)-789-907</div>
                </div>
              </div>

              <div className="p-6">
                <h2 className="font-bold text-gray-900 mb-4 text-sm">Tags</h2>
                <div className="h-10 bg-gray-50 rounded-lg border border-dashed border-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRINT VIEW - Compact one-page invoice */}
      <div className="hidden print:block bg-white p-0 text-black font-sans overflow-hidden">
        {/* Top Curved Graphic (SVG) */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '9rem', zIndex: 0 }}>
          <svg viewBox="0 0 500 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
            <path d="M-1.41,40 C153.21,110 331.54,-30 502.54,55 L500,0 L0,0 Z" className="fill-primary"></path>
            <path d="M-5.36,28 C144.18,92 316.31,-28 501.41,46 L500,0 L0,0 Z" className="fill-primary/30"></path>
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 10, padding: '2.5rem 2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Header Title */}
          <div style={{ paddingTop: '3.5rem' }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 900, letterSpacing: '-0.05em', color: 'var(--primary)', marginBottom: '0.75rem', lineHeight: 1 }}>INVOICE</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ fontSize: '0.7rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.2em', color: '#9ca3af', marginBottom: '0.2rem' }}>Bill To:</p>
                <p style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase' }}>Ecomly Premium Store</p>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 500 }}>24 Lorem Street Area.</p>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 500 }}>{selectedAddress?.address || 'Dhaka, Bangladesh'}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.3rem' }}>Invoice Details</h3>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>Invoice Date: <span style={{ fontWeight: 500, color: '#6b7280' }}>{orderDate}</span></p>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>Due Date: <span style={{ fontWeight: 500, color: '#6b7280' }}>{orderDate}</span></p>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>Invoice No.: <span style={{ fontWeight: 500, color: '#6b7280' }}>#{orderId}</span></p>
              </div>
            </div>
          </div>

          {/* Product Table */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', background: 'color-mix(in srgb,var(--primary) 8%,white)', padding: '0.5rem 1rem', color: 'var(--primary)', fontWeight: 900, textTransform: 'uppercase', fontSize: '0.72rem', letterSpacing: '0.12em', borderBottom: '2px solid color-mix(in srgb,var(--primary) 15%,white)' }}>
              <div style={{ gridColumn: 'span 6' }}>Item Descriptions</div>
              <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>Unit Price</div>
              <div style={{ gridColumn: 'span 2', textAlign: 'center' }}>Qty</div>
              <div style={{ gridColumn: 'span 2', textAlign: 'right' }}>Amount</div>
            </div>
            <div>
              {items.map((item, idx) => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: 'repeat(12,1fr)', padding: '0.55rem 1rem', alignItems: 'center', borderBottom: '1px solid #f3f4f6' }}>
                  <div style={{ gridColumn: 'span 6' }}>
                    <p style={{ fontWeight: 900, color: '#111827', fontSize: '0.88rem' }}>{item.name}</p>
                    <p style={{ fontSize: '0.7rem', color: '#9ca3af', fontStyle: 'italic', marginTop: '0.1rem' }}>SKU: ITEM-{String(idx + 1).padStart(3, '0')}</p>
                  </div>
                  <div style={{ gridColumn: 'span 2', textAlign: 'center', fontWeight: 700, color: '#374151', fontSize: '0.88rem' }}>৳{item.price.toLocaleString()}</div>
                  <div style={{ gridColumn: 'span 2', textAlign: 'center', fontWeight: 700, color: '#374151', fontSize: '0.88rem' }}>{String(item.quantity).padStart(2, '0')}</div>
                  <div style={{ gridColumn: 'span 2', textAlign: 'right', fontWeight: 900, color: '#111827', fontSize: '0.88rem' }}>৳{(item.price * item.quantity).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Calculations */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingTop: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.5rem' }}>Payment Info</h3>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>Account: <span style={{ fontWeight: 500, color: '#6b7280', marginLeft: '0.25rem' }}>#123 456 789</span></p>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>A/c Name: <span style={{ fontWeight: 500, color: '#6b7280', marginLeft: '0.25rem' }}>Ecomly Store</span></p>
              <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>Bank Details: <span style={{ fontWeight: 500, color: '#6b7280', marginLeft: '0.25rem' }}>Add your Bank</span></p>
            </div>
            <div style={{ width: '15rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', padding: '0.25rem 0.5rem' }}>
                <span>Sub Total</span><span>৳{totalPrice.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', padding: '0.25rem 0.5rem' }}>
                <span>Delivery Charge</span><span>৳{deliveryCharge.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--primary)', marginTop: '0.4rem', padding: '0.4rem 0.5rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>Grand Total</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)' }}>৳{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Contact Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ padding: '0.5rem', background: 'color-mix(in srgb,var(--primary) 10%,white)', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}><PhoneCall size={16} /></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280' }}>
                <p>+123 456 7890</p><p>+777 500 5465</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ padding: '0.5rem', background: 'color-mix(in srgb,var(--primary) 10%,white)', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}><Mail size={16} /></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280' }}>
                <p>sales@ecomly.com</p><p>support@ecomly.com</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ padding: '0.5rem', background: 'color-mix(in srgb,var(--primary) 10%,white)', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}><MapPin size={16} /></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280' }}>
                <p>Your Address</p><p>Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Terms and Signature */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ maxWidth: '22rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Terms & Condition</h3>
              <p style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 500, lineHeight: 1.6 }}>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt.
              </p>
            </div>
            <div style={{ textAlign: 'center', width: '11rem' }}>
              <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '0.3rem' }}>
                <p style={{ fontSize: '1.1rem', fontWeight: 900, color: '#111827' }}>Signature</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          header, footer, nav, aside,
          [class*="CategorySidebar"],
          [class*="category-sidebar"] { display: none !important; }
          body { background: white !important; margin: 0 !important; }
          main { margin-left: 0 !important; padding: 0 !important; }
          @page { size: A4; margin: 0; }
        }
      `}</style>
    </div>
  )
}
