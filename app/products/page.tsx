import { getAllSitesProducts } from "../lib/products"
import ProductGrid from "./ProductGrid"


export default async function Home() {
  const sitesData = await getAllSitesProducts()
  const allProducts = sitesData.flatMap(site => site.products)

 return (
    <main className="min-h-screen bg-gray-50">
      {/* হিরো সেকশন */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container-custom py-16">
          <h1 className="text-5xl font-bold mb-4">Ecomly</h1>
          <p className="text-xl mb-8">বিশ্বের সেরা পণ্য এখন আপনার দোরগোড়ায়</p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100">
            এখনই কেনাকাটা করুন
          </button>
        </div>
      </section>

      {/* প্রোডাক্ট সেকশন - শুধু প্রোডাক্ট, কোন ট্যাব নেই */}
      <section className="container-custom py-12">
        <h2 className="text-2xl font-bold mb-8">জনপ্রিয় পণ্য</h2>
        
        <ProductGrid initialProducts={allProducts} />
        
      </section>

      {/* ফ্রি শিপিং ব্যানার */}
      <section className="bg-green-50 py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-xl font-bold text-green-600">ফ্রি শিপিং</h3>
              <p className="text-gray-600">৫০০০ টাকার উপরে অর্ডারে</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-600">৭ দিন রিটার্ন</h3>
              <p className="text-gray-600">সন্তুষ্টি না হলে</p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-600">২৪/৭ সাপোর্ট</h3>
              <p className="text-gray-600">যেকোনো সময় হেল্প</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
