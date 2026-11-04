import React, { useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Product, Category } from '../types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  activeCategory: Category | 'all';
  onSelectCategory: (cat: Category | 'all') => void;
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product, e: React.MouseEvent) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortOption: string;
  onSortChange: (sort: string) => void;
  loading: boolean;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  searchQuery,
  onSearchChange,
  sortOption,
  onSortChange,
  loading
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(150);

  const categories = [
    { id: 'all', label: 'All Catalog' },
    { id: 'kitchen', label: 'Kitchen Gadgets' },
    { id: 'cleaning', label: 'Cleaning Tools' },
    { id: 'storage', label: 'Home Storage' }
  ];

  const filteredProducts = products.filter(p => p.price <= maxPriceFilter);

  return (
    <section id="collection-grid" className="py-12 border-t border-stone-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Controls Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-8 border-b border-stone-200">
          
          {/* Category Filter Buttons (Functional Segmented Tabs) */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id as any)}
                className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 bg-stone-100/80 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search mandoline, sonic, canister..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900 focus:bg-white text-stone-800 placeholder-stone-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-stone-700 focus:outline-none focus:border-stone-900 font-medium cursor-pointer"
            >
              <option value="featured">Featured Order</option>
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviewed</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Price Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                showFilters || maxPriceFilter < 150
                  ? 'border-stone-900 bg-stone-100 text-stone-900'
                  : 'border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
              title="Filter by price"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Collapsible Quick Price Slider */}
        {showFilters && (
          <div className="py-4 px-5 my-4 bg-stone-50 rounded-xl border border-stone-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <span className="text-xs font-medium text-stone-700">Max Budget:</span>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-48 accent-stone-900 cursor-pointer"
              />
              <span className="text-xs font-mono font-semibold text-stone-900 tabular-nums">
                ${maxPriceFilter}
              </span>
            </div>

            {maxPriceFilter < 150 && (
              <button
                onClick={() => setMaxPriceFilter(150)}
                className="text-xs text-stone-500 hover:text-stone-900 underline"
              >
                Reset Price Limit
              </button>
            )}
          </div>
        )}

        {/* Product Grid Area */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 border-2 border-stone-300 border-t-stone-900 rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-stone-500">Retrieving catalog from backend...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center bg-stone-50/50 rounded-2xl border border-stone-200 mt-6 p-8">
            <h3 className="font-display text-lg font-medium text-stone-800">
              No home essentials match your current criteria.
            </h3>
            <p className="text-xs text-stone-500 mt-1 max-w-md mx-auto">
              Try adjusting your search terms or relaxing the price filter.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('all');
                setMaxPriceFilter(150);
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
