// বিভিন্ন সাইটের API এন্ডপয়েন্ট
const SITES = {
  ecomly: 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json',
  chinaonline: 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json',
  skybuy: 'https://kolzsticks.github.io/Free-Ecommerce-Products-Api/main/products.json'
}

// সব সাইট থেকে ডাটা লোড করবে
export async function getAllSitesProducts() {
  try {
    // সমান্তরালে সব সাইট থেকে ডাটা আনবে
    const [ecomlyProducts, chinaProducts, skyProducts] = await Promise.all([
      fetch(SITES.ecomly).then(res => res.json()),
      fetch(SITES.chinaonline).then(res => res.json()),
      fetch(SITES.skybuy).then(res => res.json())
    ])

    // ডাটাকে সাইট অনুযায়ী সাজিয়ে দেওয়া
    return [
      { site: 'Ecomly', products: ecomlyProducts },
      { site: 'China Online BD', products: chinaProducts },
      { site: 'Sky Buy BD', products: skyProducts }
    ]
  } catch (error) {
    console.error('Error loading products:', error)
    return []
  }
}

// শুধু একটা সাইটের ডাটা চাইলে
export async function getSiteProducts(siteName: string) {
  const allData = await getAllSitesProducts()
  return allData.find(site => site.site === siteName)?.products || []
}