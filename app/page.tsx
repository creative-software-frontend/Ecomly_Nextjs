import SiteTabs from "./components/SiteTabs"
import { getAllSitesProducts } from "./lib/products"


export default async function Home() {
  console.log('\n [HOMEPAGE] Loading...')
  
  // Load data on server side
  const sitesData = await getAllSitesProducts()
  
  const totalProducts = sitesData.reduce((sum, site) => sum + site.products.length, 0)
  console.log(` [HOMEPAGE] Loaded ${sitesData.length} sites with ${totalProducts} total products`)
  
  // Check for failed sites
  const failedSites = sitesData.filter(site => !site.success).length
  if (failedSites > 0) {
    console.warn(' [HOMEPAGE] Some sites failed to load')
    sitesData.forEach(site => {
      if (site.error) {
        console.warn(`  - ${site.site}: ${site.error}`)
      }
    })
  } else {
    console.log(' [HOMEPAGE] All sites loaded with real API data')
  }
  
  console.log(' [HOMEPAGE] Rendering complete\n')

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Ecomly
          </h1>
          <p className="text-xl md:text-2xl opacity-90">
            Your one-stop shop for everything you need
          </p>
          {failedSites > 0 && (
            <div className="mt-4 bg-yellow-500 bg-opacity-30 px-4 py-2 rounded-lg inline-block">
              <span className="text-sm">Some sites failed to load - check console for details</span>
            </div>
          )}
        </div>
      </section>

      {/* Product Tabs - Products from different sites */}
      <section className="container mx-auto px-4 py-12">
        <SiteTabs sitesData={sitesData} />
      </section>

      
    </main>
  )
}