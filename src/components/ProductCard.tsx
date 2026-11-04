import React, { useState } from 'react';
import { Star, Plus, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart
}) => {
  const [addedRecently, setAddedRecently] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, e);
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1400);
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col bg-white rounded-xl border border-stone-200/90 overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-stone-300"
    >
      {/* Visual Slot (65%-70% of card visual weight) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 flex items-center justify-center">
        {!imageError ? (
          <img
            src={product.image}
            alt={product.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-stone-100 text-stone-500">
            <span className="text-xs uppercase tracking-widest font-mono text-stone-400 mb-1">
              {product.categoryLabel}
            </span>
            <span className="text-sm font-medium text-stone-700">{product.title}</span>
          </div>
        )}

        {/* Subtle non-pill tag if available */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-stone-900/90 backdrop-blur-xs text-white text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded">
            {product.tag}
          </div>
        )}

        {/* Floating Quick Add Trigger */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 shadow-sm ${
            addedRecently
              ? 'bg-stone-800 text-white scale-105'
              : 'bg-white/95 text-stone-900 hover:bg-stone-900 hover:text-white backdrop-blur-xs'
          }`}
          aria-label={`Add ${product.title} to bag`}
          title="Quick add to bag"
        >
          {addedRecently ? (
            <Check className="w-4 h-4 text-emerald-400" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Structured Content Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Category kicker with rating separator */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px]">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-stone-700 tabular-nums">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-xs">{product.rating.toFixed(1)}</span>
              <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-display text-base font-semibold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
            {product.title}
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Price and Stock Status */}
        <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-semibold text-stone-950 tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <span className="text-[11px] text-stone-500 font-medium">
            {product.inStock ? `${product.stockCount} in stock` : 'Restocking soon'}
          </span>
        </div>
      </div>
    </div>
  );
};
