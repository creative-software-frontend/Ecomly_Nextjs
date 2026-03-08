import Link from 'next/link'

export default function HelpPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container-custom py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Help Center</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/faq" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">FAQ</h2>
            <p className="text-gray-600">Find answers to common questions</p>
          </Link>
          
          <Link href="/contact" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
            <p className="text-gray-600">Get in touch with our support team</p>
          </Link>
          
          <Link href="/how-to-buy" className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
            <h2 className="text-xl font-semibold mb-2">How to Buy</h2>
            <p className="text-gray-600">Step by step buying guide</p>
          </Link>
        </div>
      </div>
    </div>
  )
}