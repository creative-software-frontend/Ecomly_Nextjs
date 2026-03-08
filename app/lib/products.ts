// সাইটগুলোর তালিকা
const SITES = [
  { id: 'ecomly', name: 'Ecomly', url: 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json' },
  { id: 'chinaonline', name: 'China Online BD', url: 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json' },
  { id: 'skybuy', name: 'Sky Buy BD', url: 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json' },
  { id: 'packly', name: 'Packly', url: 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json' },
  { id: 'dummy', name: 'Dummy Site', url: 'https://dummy-site.com/products.json' }, // এইটা এরর দেবে
]

// একটা সাইট থেকে ডাটা আনার ফাংশন
async function fetchSingleSite(site: { id: string; name: string; url: string }) {
  try {
    const response = await fetch(site.url, {
      next: { revalidate: 3600 } 
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    return {
      id: site.id,
      site: site.name,
      products: data,
      success: true
    }
  } catch (error) {
    console.log(`${site.name} থেকে ডাটা আসেনি, খালি অ্যারে দিচ্ছি`)
    return {
      id: site.id,
      site: site.name,
      products: [], 
      success: false
    }
  }
}

// সব সাইট থেকে ডাটা আনবে - কোনো সাইট এরর দিলেও বাকিগুলো কাজ করবে
export async function getAllSitesProducts() {
  try {
    // সব সাইটের জন্য প্রমিস তৈরি
    const promises = SITES.map(site => fetchSingleSite(site))
    
    // সবগুলো একসাথে রান করবে
    const results = await Promise.all(promises)
    
    // সফল সাইটগুলো কতটা চেক করতে চাইলে:
    const successfulSites = results.filter(r => r.success).length
    console.log(`${successfulSites} টা সাইট থেকে ডাটা এসেছে, ${SITES.length - successfulSites} টা থেকে আসেনি`)
    
    return results
    
  } catch (error) {
    console.log('মেজর এরর! কিন্তু আমরা খালি অ্যারে রিটার্ন করবো')
    return SITES.map(site => ({
      id: site.id,
      site: site.name,
      products: [],
      success: false
    }))
  }
}

// শুধু একটা সাইটের ডাটা চাইলে
export async function getSiteProducts(siteId: string) {
  const allData = await getAllSitesProducts()
  return allData.find(site => site.id === siteId)?.products || []
}