export interface Product {
  id: string
  name: string
  price: number
  oldPrice?: number
  image: string
  rating: {
    stars: number
    count: number
  }
  category?: string
  description?: string
  sku?: string
  shipping_cost?: number
  brand_id?: number
  vendor_id?: string
  totalOrders?: number
}

export interface SiteProducts {
  id: string
  site: string
  products: Product[]
  success: boolean
  error?: string
}

export interface ProthomashopProduct {
  id: number
  title: string
  price: number
  sale_price: number
  image: string
  total_orders: number
  short_description?: string
  sku?: string
  shipping_cost?: number
  brand_id?: number
  vendor_id?: string
  category?: string
}

// ===== GenericApiResponse =====
export interface GenericApiResponse {
  success?: boolean
  result?: {
    products?: ProthomashopProduct[]
  }
  products?: any[]
  // Paginated API format
  current_page?: number
  data?: any[]
  first_page_url?: string
  from?: number
  last_page?: number
  last_page_url?: string
  links?: any[]
  next_page_url?: string | null
  path?: string
  per_page?: number
  prev_page_url?: string | null
  to?: number
  total?: number
  [key: string]: any
}