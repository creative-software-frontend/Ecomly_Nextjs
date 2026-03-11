// Debug API Route - Test all data sources
// GET /api/debug

import { NextResponse } from 'next/server'
import { getAllSitesProducts } from '@/app/lib/products'

export async function GET() {
  const debugInfo: any = {
    timestamp: new Date().toISOString(),
    tests: []
  }
  
  // Test 1: Direct API Call (Server-side)
  console.log('\n🔍 [DEBUG] Test 1: Testing direct API call...')
  try {
    const apiUrl = 'https://admin.prothomashop.com/api/products'
    const response = await fetch(apiUrl, {
      next: { revalidate: 0 } // Don't cache for debug
    })
    
    debugInfo.tests.push({
      name: 'Direct API Call',
      status: response.ok ? '✅ PASS' : '❌ FAIL',
      statusCode: response.status,
      contentType: response.headers.get('content-type'),
      contentLength: response.headers.get('content-length')
    })
    
    console.log(`📊 [DEBUG] API Response: ${response.status}`)
    
    if (!response.ok) {
      const text = await response.text()
      console.log(`Error body:`, text.substring(0, 100))
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    debugInfo.tests.push({
      name: 'Direct API Call',
      status: '❌ FAIL',
      error: errorMessage
    })
    console.error('❌ [DEBUG] API call failed:', errorMessage)
  }
  
  // Test 2: getAllSitesProducts Function
  console.log('\n🔍 [DEBUG] Test 2: Testing getAllSitesProducts...')
  try {
    const sitesData = await getAllSitesProducts()
    const totalProducts = sitesData.reduce((sum, site) => sum + site.products.length, 0)
    
    debugInfo.tests.push({
      name: 'getAllSitesProducts',
      status: '✅ PASS',
      sitesCount: sitesData.length,
      totalProducts: totalProducts,
      breakdown: sitesData.map(site => ({
        name: site.site,
        products: site.products.length,
        success: site.success,
        error: site.error || null
      }))
    })
    
    console.log(`✅ [DEBUG] Sites loaded: ${sitesData.length}, Total products: ${totalProducts}`)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    debugInfo.tests.push({
      name: 'getAllSitesProducts',
      status: '❌ FAIL',
      error: errorMessage
    })
    console.error('❌ [DEBUG] getAllSitesProducts failed:', errorMessage)
  }
  
  // Summary
  const passCount = debugInfo.tests.filter((t: any) => t.status === '✅ PASS').length
  const failCount = debugInfo.tests.filter((t: any) => t.status === '❌ FAIL').length
  
  debugInfo.summary = {
    total: debugInfo.tests.length,
    passed: passCount,
    failed: failCount,
    overall: failCount === 0 ? '✅ ALL TESTS PASSED' : `⚠️ ${failCount} TEST(S) FAILED`
  }
  
  console.log('\n=== DEBUG SUMMARY ===')
  console.log(`Tests: ${debugInfo.tests.length} | Passed: ${passCount} | Failed: ${failCount}`)
  console.log(`Overall: ${debugInfo.summary.overall}`)
  console.log('=====================\n')
  
  return NextResponse.json(debugInfo)
}
