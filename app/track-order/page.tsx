export default function TrackOrderPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto">
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Order ID</label>
            <input 
              type="text" 
              placeholder="Enter your order ID"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input 
              type="tel" 
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-600"
            />
          </div>
          
          <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-medium hover:bg-primary-700 transition">
            Track Order
          </button>
        </div>
      </div>
    </div>
  )
}