'use client'

import { Package, ChevronRight, User, Heart, MapPin, Bell, ArrowLeft, Printer, Download, Truck, Calendar, CreditCard, ShieldCheck, Smartphone, PhoneCall, Mail } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import Link from 'next/link'
import { use } from 'react'

interface PageProps {
  params: Promise<{ id: string }>
}

// Static Order Details Data (Mock)
const ORDER_DETAILS = {
  id: 'ORD-2024-8742',
  date: 'Mar 15, 2024',
  time: '10:45 AM',
  status: 'Delivered',
  statusColor: 'text-green-600 bg-green-50',
  paymentMethod: 'Cash on Delivery',
  shippingMethod: 'Standard Delivery',
  subtotal: 420.00,
  shipping: 30.00,
  discount: 0.00,
  total: 450.00,
  address: {
    name: 'Demo User',
    street: '123 Ecomly Street, Flat 4B',
    city: 'Dhaka',
    country: 'Bangladesh',
    phone: '01234567890'
  },
  items: [
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 250.00,
      quantity: 1,
      image: 'https://admin.prothomashop.com/product/1709452044.png',
      vendor: 'Ecomly Official Store'
    },
    {
      id: '2',
      name: 'Premium Leather Wallet',
      price: 170.00,
      quantity: 1,
      image: 'https://admin.prothomashop.com/product/1710156482.png',
      vendor: 'Urban Style'
    }
  ]
}

export default function OrderDetailsPage({ params }: PageProps) {
  const { user } = useAuth()
  const { id } = use(params)

  const handlePrint = () => {
    window.print()
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view order details</h2>
        <Link href="/" className="text-primary hover:underline">Go back to home</Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      {/* SCREEN VIEW */}
      <div className="container-custom px-4 print:hidden">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/order-history" className="hover:text-primary transition-colors">Order History</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Order Details</span>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <main className="w-full space-y-6">
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link href="/order-history" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <ArrowLeft size={20} className="text-gray-600" />
                </Link>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h1 className="text-xl font-bold text-gray-900">Order {id}</h1>
                    <span className={`px-3 py-0.5 rounded-full text-[11px] font-bold ${ORDER_DETAILS.statusColor}`}>
                      {ORDER_DETAILS.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Placed on {ORDER_DETAILS.date} at {ORDER_DETAILS.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <Printer size={18} />
                  Print
                </button>
                <button 
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-bold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20"
                >
                  <Download size={18} />
                  Invoice
                </button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Order Info (Items & Tracking) */}
              <div className="flex-1 space-y-6">
                {/* Order Items */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-6 border-b border-gray-50">
                    <h2 className="text-lg font-bold text-gray-900">Order Items</h2>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {ORDER_DETAILS.items.map((item) => (
                      <div key={item.id} className="p-6 flex items-center gap-6">
                        <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden border border-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <Link href={`/product/${item.id}`} className="text-sm font-bold text-gray-900 hover:text-primary transition-colors block truncate mb-1">
                            {item.name}
                          </Link>
                          <p className="text-xs text-gray-500 mb-2">Vendor: {item.vendor}</p>
                          <div className="flex items-center gap-4">
                            <p className="text-sm font-bold text-gray-900">৳{item.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-gray-900">৳{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Tracking / Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Expected Date</h3>
                      <p className="text-xs text-gray-500">Mar 18, 2024</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                      <Truck size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Shipping Agent</h3>
                      <p className="text-xs text-gray-500">Ecomly Logistics</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
                    <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 mb-1">Payment Method</h3>
                      <p className="text-xs text-gray-500">{ORDER_DETAILS.paymentMethod}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar: Summary & Address */}
              <aside className="w-full lg:w-96 space-y-6">
                {/* Order Summary */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal ({ORDER_DETAILS.items.length} items)</span>
                      <span className="text-gray-900 font-medium">৳{ORDER_DETAILS.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery Charge</span>
                      <span className="text-gray-900 font-medium">৳{ORDER_DETAILS.shipping.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Discount</span>
                      <span className="text-green-600 font-medium">-৳{ORDER_DETAILS.discount.toLocaleString()}</span>
                    </div>
                    <div className="pt-4 border-t border-gray-50 flex justify-between items-center">
                      <span className="text-base font-bold text-gray-900">Grand Total</span>
                      <span className="text-xl font-black text-primary">৳{ORDER_DETAILS.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-xl flex items-center gap-3">
                    <ShieldCheck className="text-green-600" size={20} />
                    <p className="text-xs text-gray-600">Your transaction is protected by Ecomly Guarantee.</p>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>
                    <MapPin size={18} className="text-gray-400" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-bold text-gray-900">{ORDER_DETAILS.address.name}</p>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {ORDER_DETAILS.address.street}, {ORDER_DETAILS.address.city}
                      <br />
                      {ORDER_DETAILS.address.country}
                    </p>
                    <div className="pt-2 flex items-center gap-2 text-sm text-gray-700">
                      <Smartphone size={16} className="text-gray-400" />
                      {ORDER_DETAILS.address.phone}
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </main>
        </div>
      </div>

      {/* PRINT VIEW - Matches Success Page Invoice */}
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
                <p style={{ fontSize: '1rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase' }}>{ORDER_DETAILS.address.name}</p>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 500 }}>{ORDER_DETAILS.address.street}</p>
                <p style={{ fontSize: '0.82rem', color: '#6b7280', fontWeight: 500 }}>{ORDER_DETAILS.address.city}, {ORDER_DETAILS.address.country}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: 'var(--primary)', marginBottom: '0.3rem' }}>Invoice Details</h3>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>Invoice Date: <span style={{ fontWeight: 500, color: '#6b7280' }}>{ORDER_DETAILS.date}</span></p>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>Due Date: <span style={{ fontWeight: 500, color: '#6b7280' }}>{ORDER_DETAILS.date}</span></p>
                <p style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>Invoice No.: <span style={{ fontWeight: 500, color: '#6b7280' }}>#{id}</span></p>
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
              {ORDER_DETAILS.items.map((item, idx) => (
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
                <span>Sub Total</span><span>৳{ORDER_DETAILS.subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', padding: '0.25rem 0.5rem' }}>
                <span>Delivery Charge</span><span>৳{ORDER_DETAILS.shipping.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid var(--primary)', marginTop: '0.4rem', padding: '0.4rem 0.5rem' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '-0.03em' }}>Grand Total</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--primary)' }}>৳{ORDER_DETAILS.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Contact Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ padding: '0.5rem', background: 'color-mix(in srgb,var(--primary) 10%,white)', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}><PhoneCall size={16} /></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280' }}>
                <p>+880 1XXXXXXXXX</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ padding: '0.5rem', background: 'color-mix(in srgb,var(--primary) 10%,white)', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}><Mail size={16} /></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280' }}>
                <p>support@ecomly.com</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ padding: '0.5rem', background: 'color-mix(in srgb,var(--primary) 10%,white)', borderRadius: '50%', color: 'var(--primary)', display: 'flex' }}><MapPin size={16} /></div>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6b7280' }}>
                <p>Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Terms and Signature */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6' }}>
            <div style={{ maxWidth: '22rem' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 900, color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>Terms & Condition</h3>
              <p style={{ fontSize: '0.72rem', color: '#9ca3af', fontWeight: 500, lineHeight: 1.6 }}>
                This is a computer generated invoice. No signature is required.
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
