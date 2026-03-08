import { Product, SiteProducts, ProthomashopProduct, GenericApiResponse } from '@/app/types/product'
import { getFallbackProducts } from './fallbackProducts'

// ============================================
// STEP 1: Define all sites/sources
// ============================================

interface SiteConfig {
  id: string
  name: string
  apiUrl: string
  imageUrl?: string
  categoryApi?: (catId: number) => string
}

const SITES: SiteConfig[] = [
  { 
    id: 'prothomashop',
    name: 'প্রথম আলো শপ',
    apiUrl: 'https://admin.prothomashop.com/api/products',
    imageUrl: 'https://admin.prothomashop.com/public/uploads/products/',
    categoryApi: (catId: number) => `https://admin.prothomashop.com/api/category/${catId}/products`
  }
]

// ============================================
// STEP 2: Safe JSON Parser
// ============================================

async function safeJsonParse(response: Response): Promise<any> {
  try {
    const text = await response.text()
    console.log('Response text (first 100 chars):', text.substring(0, 100))
    
    if (!text || text.includes('Not found') || text.includes('not found')) {
      console.warn('API returned "Not found" or empty response')
      return null
    }
    
    return JSON.parse(text)
  } catch (error) {
    console.error('JSON parse error:', error instanceof Error ? error.message : error)
    return null
  }
}

// ============================================
// STEP 3: Format Prothomashop product data
// ============================================

function formatProthomashopProduct(product: ProthomashopProduct, baseUrl?: string): Product {
  const cleanDescription = product.short_description 
    ? product.short_description.replace(/<[^>]*>/g, '').trim()
    : ''
  
  return {
    id: product.id.toString(),
    name: product.title,
    price: product.sale_price || product.price,
    oldPrice: product.price > product.sale_price ? product.price : undefined,
    image: baseUrl ? `${baseUrl}${product.image}` : `https://admin.prothomashop.com/public/uploads/products/${product.image}`,
    rating: {
      stars: 4.5,
      count: product.total_orders || 0
    },
    category: product.category || 'Book',
    description: cleanDescription,
    sku: product.sku,
    shipping_cost: product.shipping_cost,
    brand_id: product.brand_id,
    vendor_id: product.vendor_id,
    totalOrders: product.total_orders
  }
}

// ============================================
// STEP 4: Fetch data from a single site
// ============================================

async function fetchSingleSite(site: SiteConfig): Promise<SiteProducts> {
  try {
    console.log(`\nFetching data from ${site.name}...`)
    console.log(`API URL: ${site.apiUrl}`)
    
    const response = await fetch(site.apiUrl, {
      next: { revalidate: 3600 }
    })
    
    console.log(`Response Status: ${response.status}`)
    console.log(`Content-Type: ${response.headers.get('content-type')}`)
    
    if (!response.ok) {
      console.warn(`${site.name} - HTTP error! Status: ${response.status}`)
      const errorText = await response.text()
      console.warn(`Error response:`, errorText.substring(0, 200))
      throw new Error(`HTTP ${response.status}`)
    }
    
    const data: GenericApiResponse = await safeJsonParse(response)
    
    if (!data) {
      console.warn(`${site.name}: No valid data received - switching to fallback`)
      const fallbackProducts = getFallbackProducts()
      console.log(`${site.name}: Loaded ${fallbackProducts.length} fallback products`)
      
      return {
        id: site.id,
        site: site.name,
        products: fallbackProducts,
        success: true,
        error: 'Using fallback data (API returned invalid response)'
      }
    }
    
    let products: Product[] = []
    
    // ===== নতুন CASE যোগ করা হলো =====
    // CASE: Paginated API format (current_page, data array)
    if (data.current_page && Array.isArray(data.data)) {
      console.log(`${site.name}: Detected paginated format with ${data.data.length} products`)
      products = data.data.map((item: any) => ({
        id: item.id.toString(),
        name: item.title || item.name || 'Unknown',
        price: item.sale_price || item.price || 0,
        oldPrice: item.price && item.sale_price && item.price > item.sale_price ? item.price : undefined,
        image: site.imageUrl ? `${site.imageUrl}${item.image}` : `https://admin.prothomashop.com/public/uploads/products/${item.image}`,
        rating: {
          stars: 4.5,
          count: item.total_orders || 0
        },
        category: item.category_name || 'Book',
        description: item.short_description?.replace(/<[^>]*>/g, '') || '',
        sku: item.sku,
        shipping_cost: item.shipping_cost
      }))
    }
    // CASE 1: Prothomashop data format
    else if (site.id === 'prothomashop' && data.success && data.result?.products) {
      console.log(`${site.name}: Detected Prothomashop format with ${data.result.products.length} products`)
      products = data.result.products.map((product: any) => 
        formatProthomashopProduct(product as ProthomashopProduct, site.imageUrl)
      )
    } 
    // CASE 2: Direct array format
    else if (Array.isArray(data)) {
      console.log(`${site.name}: Detected direct array format with ${data.length} products`)
      products = data as Product[]
    } 
    // CASE 3: Data inside 'products' property
    else if (data.products) {
      console.log(`${site.name}: Detected products property format`)
      products = data.products.map((p: any) => ({
        id: p.id.toString(),
        name: p.name || p.title || 'Unknown Product',
        price: p.sale_price || p.price,
        oldPrice: p.sale_price && p.sale_price < p.price ? p.price : undefined,
        image: p.image || p.thumbnail || '/placeholder.jpg',
        rating: {
          stars: p.rating || 0,
          count: p.reviews || 0
        }
      }))
    } 
    // CASE 4: Data inside 'result.products'
    else if (data.result?.products) {
      console.log(`${site.name}: Detected result.products format with ${data.result.products.length} products`)
      products = data.result.products.map((p: any) => ({
        id: p.id.toString(),
        name: p.name || p.title || 'Unknown Product',
        price: p.sale_price || p.price,
        oldPrice: p.sale_price && p.sale_price < p.price ? p.price : undefined,
        image: p.image || p.thumbnail || '/placeholder.jpg',
        rating: {
          stars: p.rating || 0,
          count: p.reviews || p.total_orders || 0
        }
      }))
    }
    else {
      console.warn(`${site.name}: Unknown data format`, Object.keys(data))
    }
    
    console.log(`${site.name}: Processed ${products.length} products`)
    
    if (products.length === 0) {
      console.warn(`${site.name}: API returned 0 products - using fallback`)
      const fallbackProducts = getFallbackProducts()
      console.log(`${site.name}: Loaded ${fallbackProducts.length} fallback products`)
      
      return {
        id: site.id,
        site: site.name,
        products: fallbackProducts,
        success: true,
        error: 'Using fallback data (API returned empty products array)'
      }
    }
    
    console.log(`${site.name}: Successfully loaded ${products.length} products`)
    
    return {
      id: site.id,
      site: site.name,
      products: products,
      success: true
    }
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(`${site.name} data fetch failed:`, errorMessage)
    console.log(`${site.name}: Switching to fallback products`)
    
    const fallbackProducts = getFallbackProducts()
    console.log(`${site.name}: Loaded ${fallbackProducts.length} fallback products`)
    
    return {
      id: site.id,
      site: site.name,
      products: fallbackProducts,
      success: true,
      error: `Fetch failed: ${errorMessage}`
    }
  }
}

// ============================================
// STEP 5: Fetch data from all sites
// ============================================

export async function getAllSitesProducts(): Promise<SiteProducts[]> {
  try {
    console.log('Starting data fetch from all sites...')
    console.log(`Total sites configured: ${SITES.length}`)
    
    const promises = SITES.map(site => fetchSingleSite(site))
    const results = await Promise.all(promises)
    
    const successfulSites = results.filter((r: SiteProducts) => r.success).length
    const totalProducts = results.reduce((sum: number, r: SiteProducts) => sum + r.products.length, 0)
    
    const usingFallback = results.some(r => r.error !== undefined)
    const fallbackCount = results.filter(r => r.error !== undefined).length
    
    console.log(`\n=== Data Load Summary ===`)
    console.log(`${successfulSites}/${SITES.length} sites succeeded`)
    console.log(`Total products: ${totalProducts}`)
    
    if (usingFallback) {
      console.log(`${fallbackCount} site(s) using fallback data`)
      results.forEach(r => {
        if (r.error) {
          console.log(`  - ${r.site}: ${r.error}`)
        }
      })
    } else {
      console.log('All sites loaded successfully with real API data')
    }
    
    console.log(`=========================\n`)
    
    return results
    
  } catch (error) {
    console.error('Major error! Returning fallback products for all sites', error)
    const fallbackProducts = getFallbackProducts()
    console.log(`Emergency fallback: Loaded ${fallbackProducts.length} products`)
    
    return SITES.map(site => ({
      id: site.id,
      site: site.name,
      products: fallbackProducts,
      success: true,
      error: 'Using fallback data due to major error'
    }))
  }
}

// ============================================
// STEP 6: Get products by category
// ============================================

export async function getCategoryProducts(categoryId: number): Promise<Product[]> {
  try {
    console.log(`Fetching category ${categoryId} products...`)
    
    const url = `https://admin.prothomashop.com/api/category/${categoryId}/products`
    console.log('URL:', url)
    
    const response = await fetch(url, {
      next: { revalidate: 60 }
    })
    
    console.log('Response status:', response.status)
    
    if (!response.ok) {
      console.warn('Category API response not OK')
      return []
    }
    
    const data = await response.json()
    
    if (data.success && data.result?.products) {
      console.log(`Found ${data.result.products.length} products`)
      return data.result.products.map((p: any) => ({
        id: p.id.toString(),
        name: p.title,
        price: p.sale_price || p.price,
        oldPrice: p.price > p.sale_price ? p.price : undefined,
        image: `https://admin.prothomashop.com/public/uploads/products/${p.image}`,
        rating: { stars: 4.5, count: p.total_orders || 0 },
        category: 'Book',
        description: p.short_description?.replace(/<[^>]*>/g, '') || ''
      }))
    }
    
    return []
    
  } catch (error) {
    console.error('Error fetching category products:', error)
    return []
  }
}

// ============================================
// STEP 7: Get products from a specific site
// ============================================

export async function getSiteProducts(siteId: string): Promise<Product[]> {
  const allData = await getAllSitesProducts()
  const siteData = allData.find(site => site.id === siteId)
  return siteData?.products || []
}

// ============================================
// STEP 8: Get all products combined
// ============================================

export async function getAllProducts(): Promise<Product[]> {
  const sitesData = await getAllSitesProducts()
  return sitesData.flatMap(site => site.products)
}