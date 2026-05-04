'use client'

import { Package, ChevronRight, Search, Filter, Eye, User, Heart, MapPin, Bell } from 'lucide-react'
import { useAuth } from '@/app/context/AuthContext'
import Link from 'next/link'
import { useState } from 'react'

// Static Order Data
const ORDERS = [
  {
    id: 'ORD-2024-8742',
    date: 'Mar 15, 2024',
    total: 450.00,
    status: 'Delivered',
    statusColor: 'text-green-600 bg-green-50',
    items: 3,
    image: 'https://admin.prothomashop.com/product/1709452044.png'
  },
  {
    id: 'ORD-2024-5412',
    date: 'Mar 10, 2024',
    total: 120.50,
    status: 'Processing',
    statusColor: 'text-blue-600 bg-blue-50',
    items: 1,
    image: 'https://admin.prothomashop.com/product/1710156482.png'
  },
  {
    id: 'ORD-2024-2198',
    date: 'Feb 28, 2024',
    total: 890.00,
    status: 'Shipped',
    statusColor: 'text-purple-600 bg-purple-50',
    items: 5,
    image: 'https://admin.prothomashop.com/product/1710156321.png'
  },
  {
    id: 'ORD-2024-0932',
    date: 'Jan 15, 2024',
    total: 65.00,
    status: 'Cancelled',
    statusColor: 'text-red-600 bg-red-50',
    items: 2,
    image: 'https://admin.prothomashop.com/product/1709452044.png'
  }
]

export default function OrderHistoryPage() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOrders = ORDERS.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Please login to view your orders</h2>
        <Link href="/" className="text-primary hover:underline">Go back to home</Link>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/profile" className="hover:text-primary transition-colors">Profile</Link>
          <ChevronRight size={14} />
          <span className="text-gray-900 font-medium">Order History</span>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Content */}
          <main className="w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Order History</h1>
                  <p className="text-sm text-gray-500">View and track all your previous orders</p>
                </div>

                <div className="relative group max-w-xs w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Search order ID..."
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-gray-50/50 border-b border-gray-50">
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Order Details</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-gray-200">
                                <img src={order.image} alt={order.id} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <Link href={`/order-history/${order.id}`} className="text-sm font-bold text-gray-900 hover:text-primary transition-colors">
                                  {order.id}
                                </Link>
                                <p className="text-xs text-gray-500">{order.items} {order.items === 1 ? 'item' : 'items'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm text-gray-700">{order.date}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-bold text-gray-900">৳{order.total.toLocaleString()}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/order-history/${order.id}`}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              <Eye size={14} />
                              Details
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-20 text-center text-gray-500">
                          <Package size={40} className="mx-auto mb-3 opacity-20" />
                          <p className="text-sm font-medium">No orders found</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
