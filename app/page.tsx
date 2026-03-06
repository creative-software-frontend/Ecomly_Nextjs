import SiteTabs from "./components/SiteTabs"
import { getAllSitesProducts } from "./lib/products"


export default async function Home() {
  // সার্ভার সাইডে ডাটা লোড
  const sitesData = await getAllSitesProducts()

  return (
    <main className="min-h-screen bg-gray-50">
      

      {/* ট্যাব ভিউ - বিভিন্ন সাইটের প্রোডাক্ট */}
      <section className="container mx-auto px-4 py-12">
        <SiteTabs sitesData={sitesData} />
      </section>

      
    </main>
  )
}