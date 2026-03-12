'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ProductCard from '../../components/shared/ProductCard';
import { fakeProducts, FakeProduct } from '@/lib/imageSearchData';
import { Search, Camera } from 'lucide-react';

function ImageSearchResultsContent() {
  const searchParams = useSearchParams();
  const searchType = searchParams.get('type');
  const tags = searchParams.get('tags')?.split(',') || [];
  const category = searchParams.get('category');

  // If this is an image search, show fake results
  if (searchType === 'image') {
    // Get top matching products (sorted by matchScore)
    const imageSearchResults = fakeProducts
      .filter((p) => p.matchScore >= 85)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 12);

    return (
      <main className="min-h-screen bg-gray-50">
        <section className="container-custom py-12">
          {/* Image Search Header */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Camera className="text-yellow-500" size={32} />
              <h1 className="text-3xl font-bold text-gray-800">
                Visual Search Results
              </h1>
            </div>
            <p className="text-gray-600 mb-2">
              We found similar products based on the image you uploaded
            </p>
            {tags.length > 0 && tags[0] !== 'generic' && (
              <div className="flex items-center justify-center gap-2 flex-wrap mt-4">
                <span className="text-sm text-gray-500">Detected:</span>
                {tags.map((tag, index) => (
                  <span
                    key={tag}
                    className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {category && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {category}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {imageSearchResults.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.image}
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            ))}
          </div>

          {/* Info Box */}
          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Search size={20} className="text-blue-600" />
              <h3 className="font-semibold text-blue-900">Demo Mode</h3>
            </div>
            <p className="text-sm text-blue-700">
              This is using fake data for demonstration. When the backend is ready, 
              the actual AI-powered image recognition will be connected.
            </p>
          </div>
        </section>
      </main>
    );
  }

  // Regular products page fallback
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="container-custom py-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          All Products
        </h1>
        <p className="text-gray-600 text-center">
          Browse our complete collection
        </p>
      </section>
    </main>
  );
}

export default function ImageSearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ImageSearchResultsContent />
    </Suspense>
  );
}
