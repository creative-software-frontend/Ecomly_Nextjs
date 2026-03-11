import Link from 'next/link'

export default function SellPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sell With Us</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-4">Why Sell on Ecomly?</h2>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Reach millions of customers</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Easy dashboard management</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Fast payments and settlements</span>
              </li>
            </ul>
            
            <Link 
              href="/seller-register" 
              className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Start Selling
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-xl font-semibold mb-4">Seller Support</h2>
            <p className="text-gray-600 mb-4">Contact our seller support team for assistance</p>
            <div className="space-y-2">
              <p className="text-gray-800">Email: seller@ecomly.com</p>
              <p className="text-gray-800">Phone: +880 1234 567890</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}