import React, { useState } from 'react';
import { X, Star, Check, ShoppingBag, ShieldCheck, Ruler, Sparkles, MessageSquarePlus } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onReviewAdded: (updatedProduct: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onReviewAdded
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');
  const [addedNotice, setAddedNotice] = useState(false);

  // Review form state
  const [authorName, setAuthorName] = useState('');
  const [ratingVal, setRatingVal] = useState(5);
  const [commentText, setCommentText] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    setSubmittingReview(true);
    try {
      const res = await fetch(`/api/products/${product.id}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: authorName.trim(),
          rating: ratingVal,
          comment: commentText.trim()
        })
      });

      const data = await res.json();
      if (data.success && data.product) {
        onReviewAdded(data.product);
        setReviewSuccess(true);
        setAuthorName('');
        setCommentText('');
        setTimeout(() => setReviewSuccess(false), 3000);
      }
    } catch (err) {
      console.error('Failed to submit review:', err);
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-8">
          
          {/* Gallery View (Left Column) */}
          <div className="md:col-span-6 flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
              <img
                src={product.image}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.tag && (
                <div className="absolute top-3 left-3 bg-stone-900 text-white text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded">
                  {product.tag}
                </div>
              )}
            </div>

            {/* In-box materials summary card */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80 text-xs space-y-2">
              <div className="flex items-center gap-2 font-medium text-stone-800">
                <Ruler className="w-4 h-4 text-stone-500" />
                <span>Dimensions & Craft</span>
              </div>
              <p className="text-stone-600 font-mono text-[11px]">{product.dimensions}</p>
              <p className="text-stone-500 text-[11px]">Materials: {product.materials}</p>
            </div>
          </div>

          {/* Purchase Module & Tabs (Right Column) */}
          <div className="md:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span className="uppercase tracking-wider font-semibold text-stone-400">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1.5 text-stone-800 tabular-nums">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span className="font-semibold">{product.rating.toFixed(1)}</span>
                  <span className="text-stone-400">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-stone-900 leading-tight">
                {product.title}
              </h2>

              <p className="text-xs text-stone-600 mt-1 font-medium">
                {product.subtitle}
              </p>

              {/* Price Row */}
              <div className="mt-4 flex items-baseline gap-3 pb-4 border-b border-stone-200">
                <span className="font-display text-3xl font-semibold text-stone-950 tabular-nums">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-stone-400 line-through tabular-nums">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded">
                  {product.inStock ? 'Ready to ship' : 'Pre-order'}
                </span>
              </div>

              {/* Sub-Tabs Selector */}
              <div className="flex items-center gap-4 mt-4 border-b border-stone-200 text-xs font-medium">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2.5 transition-colors border-b-2 ${
                    activeTab === 'details'
                      ? 'border-stone-900 text-stone-900 font-semibold'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Overview & Features
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2.5 transition-colors border-b-2 ${
                    activeTab === 'specs'
                      ? 'border-stone-900 text-stone-900 font-semibold'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Technical Specs
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2.5 transition-colors border-b-2 ${
                    activeTab === 'reviews'
                      ? 'border-stone-900 text-stone-900 font-semibold'
                      : 'border-transparent text-stone-500 hover:text-stone-800'
                  }`}
                >
                  Reviews ({product.reviews.length})
                </button>
              </div>

              {/* Tab Contents */}
              <div className="py-4">
                {activeTab === 'details' && (
                  <div className="space-y-4">
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {product.description}
                    </p>
                    <ul className="space-y-2 text-xs text-stone-700">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-stone-800 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'specs' && (
                  <div className="space-y-3">
                    <dl className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(product.specs).map(([key, val]) => (
                        <div key={key} className="p-2.5 rounded bg-stone-50 border border-stone-150">
                          <dt className="text-[11px] font-mono uppercase text-stone-400">{key}</dt>
                          <dd className="font-medium text-stone-800 mt-0.5">{val}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="p-3 bg-stone-50 rounded text-xs text-stone-600">
                      <span className="font-semibold block text-stone-800 mb-0.5">Care Instructions:</span>
                      {product.careInstructions}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                    {/* List Existing Reviews */}
                    {product.reviews.map((rev) => (
                      <div key={rev.id} className="p-3 rounded-lg border border-stone-150 bg-stone-50/50 space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-stone-900">{rev.author}</span>
                          <span className="text-stone-400 text-[11px] font-mono">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rev.rating
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-stone-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-stone-600 leading-normal">{rev.comment}</p>
                      </div>
                    ))}

                    {/* Write Review Form */}
                    <form onSubmit={handleSubmitReview} className="mt-4 pt-3 border-t border-stone-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-800">Add Verified Review</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              type="button"
                              key={s}
                              onClick={() => setRatingVal(s)}
                              className="text-stone-300 hover:text-amber-500 transition-colors"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  s <= ratingVal
                                    ? 'fill-amber-500 text-amber-500'
                                    : 'text-stone-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        <input
                          type="text"
                          required
                          value={authorName}
                          onChange={(e) => setAuthorName(e.target.value)}
                          placeholder="Your Name (e.g. Thomas K.)"
                          className="w-full text-xs px-3 py-1.5 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                        />
                        <textarea
                          required
                          rows={2}
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          placeholder="Share your experience with this home tool..."
                          className="w-full text-xs p-3 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-900"
                        />
                      </div>

                      {reviewSuccess && (
                        <p className="text-xs text-emerald-700 font-medium">
                          Thank you! Your review has been saved to the database.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={submittingReview}
                        className="w-full py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-lg text-xs font-medium transition-colors"
                      >
                        {submittingReview ? 'Submitting...' : 'Post Customer Review'}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Contiguous Buy Action Box */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Stepper */}
                <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 transition-colors text-sm font-semibold"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-xs font-mono font-semibold tabular-nums text-stone-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-stone-600 hover:bg-stone-200 transition-colors text-sm font-semibold"
                  >
                    +
                  </button>
                </div>

                {/* Primary Buy CTA */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 py-3 px-6 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                    addedNotice
                      ? 'bg-stone-800 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-[0.99]'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag — ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-stone-500 font-mono">
                <span>Free 3-Day Shipping</span>
                <span>·</span>
                <span>30-Day In-Home Trial</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
