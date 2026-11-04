import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, Layers } from 'lucide-react';
import { BundleItem, Product } from '../types';

interface CuratedBundlesProps {
  bundles: BundleItem[];
  allProducts: Product[];
  onAddProductsToCart: (products: Product[]) => void;
}

export const CuratedBundles: React.FC<CuratedBundlesProps> = ({
  bundles,
  allProducts,
  onAddProductsToCart
}) => {
  const [selectedBundleId, setSelectedBundleId] = useState<string>(bundles[0]?.id || 'bundle-home-harmony');
  const [bundleAdded, setBundleAdded] = useState(false);

  // Custom Trio Builder states
  const kitchenOptions = allProducts.filter(p => p.category === 'kitchen');
  const cleaningOptions = allProducts.filter(p => p.category === 'cleaning');
  const storageOptions = allProducts.filter(p => p.category === 'storage');

  const [chosenKitchenId, setChosenKitchenId] = useState<string>(kitchenOptions[0]?.id || '');
  const [chosenCleaningId, setChosenCleaningId] = useState<string>(cleaningOptions[0]?.id || '');
  const [chosenStorageId, setChosenStorageId] = useState<string>(storageOptions[0]?.id || '');
  const [customTrioAdded, setCustomTrioAdded] = useState(false);

  const chosenKitchen = allProducts.find(p => p.id === chosenKitchenId);
  const chosenCleaning = allProducts.find(p => p.id === chosenCleaningId);
  const chosenStorage = allProducts.find(p => p.id === chosenStorageId);

  const customRegularTotal = (chosenKitchen?.price || 0) + (chosenCleaning?.price || 0) + (chosenStorage?.price || 0);
  const customDiscountedTotal = Math.round(customRegularTotal * 0.80); // 20% off
  const customSavings = customRegularTotal - customDiscountedTotal;

  const handleAddSelectedBundle = (bundle: BundleItem) => {
    onAddProductsToCart(bundle.products);
    setBundleAdded(true);
    setTimeout(() => setBundleAdded(false), 2000);
  };

  const handleAddCustomTrio = () => {
    const trio: Product[] = [];
    if (chosenKitchen) trio.push(chosenKitchen);
    if (chosenCleaning) trio.push(chosenCleaning);
    if (chosenStorage) trio.push(chosenStorage);

    onAddProductsToCart(trio);
    setCustomTrioAdded(true);
    setTimeout(() => setCustomTrioAdded(false), 2000);
  };

  const activeBundle = bundles.find(b => b.id === selectedBundleId) || bundles[0];

  return (
    <section id="curated-bundles" className="py-16 bg-[#F6F5F0] border-t border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
            Harmonious Systems
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-stone-900">
            Curated home kits with bundled savings.
          </h2>
          <p className="text-sm text-stone-600 mt-2 leading-relaxed">
            Organizing your dwelling is most effective when tools work symbiotically. Each collection arrives in a unified presentation box with complimentary care essentials.
          </p>
        </div>

        {/* Preset Bundles Showcase */}
        {activeBundle && (
          <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm grid grid-cols-1 lg:grid-cols-12 mb-16">
            
            {/* Visual presentation */}
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto bg-stone-100 min-h-[320px]">
              <img
                src={activeBundle.image}
                alt={activeBundle.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-stone-900 text-white text-xs font-medium px-3 py-1 rounded">
                Save {activeBundle.savingsPercentage}% Instantly
              </div>
            </div>

            {/* Bundle details */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                {/* Bundle Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {bundles.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setSelectedBundleId(b.id)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                        selectedBundleId === b.id
                          ? 'bg-stone-900 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                      }`}
                    >
                      {b.title}
                    </button>
                  ))}
                </div>

                <h3 className="font-display text-2xl font-medium tracking-tight text-stone-900">
                  {activeBundle.title}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">{activeBundle.subtitle}</p>

                <p className="text-xs text-stone-600 mt-4 leading-relaxed">
                  {activeBundle.description}
                </p>

                {/* Items included list */}
                <div className="mt-6 pt-6 border-t border-stone-200 space-y-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block">
                    Included Objects ({activeBundle.products.length})
                  </span>
                  {activeBundle.products.map((prod) => (
                    <div key={prod.id} className="flex items-center justify-between text-xs py-1">
                      <div className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-stone-800" />
                        <span className="font-medium text-stone-800">{prod.title}</span>
                      </div>
                      <span className="text-stone-400 font-mono text-[11px]">${prod.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Buy Action */}
              <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-semibold text-stone-950 tabular-nums">
                      ${activeBundle.price}
                    </span>
                    <span className="text-sm text-stone-400 line-through tabular-nums">
                      ${activeBundle.originalPrice}
                    </span>
                  </div>
                  <span className="text-xs text-stone-500 font-medium">
                    You save ${activeBundle.originalPrice - activeBundle.price} ({activeBundle.savingsPercentage}%)
                  </span>
                </div>

                <button
                  onClick={() => handleAddSelectedBundle(activeBundle)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                    bundleAdded
                      ? 'bg-stone-800 text-white'
                      : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
                  }`}
                >
                  {bundleAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Kit Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <Layers className="w-4 h-4" />
                      <span>Add Kit to Bag</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>
        )}

        {/* Interactive Custom Home Trio Builder */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-800 mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Custom Builder</span>
          </div>
          <h3 className="font-display text-xl font-medium tracking-tight text-stone-900">
            Build Your Custom 3-Pillar Home Trio & Unlock 20% Off
          </h3>
          <p className="text-xs text-stone-600 mt-1 max-w-xl">
            Choose exactly one kitchen gadget, one cleaning tool, and one home storage piece to create your personalized sanctuary kit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {/* Step 1: Kitchen Gadget */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-2">
                1. Select Kitchen Gadget
              </span>
              <div className="space-y-2">
                {kitchenOptions.map(p => (
                  <label
                    key={p.id}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      chosenKitchenId === p.id
                        ? 'border-stone-900 bg-white shadow-xs text-stone-900'
                        : 'border-stone-200 hover:bg-white text-stone-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="custom-kitchen"
                      checked={chosenKitchenId === p.id}
                      onChange={() => setChosenKitchenId(p.id)}
                      className="mt-0.5 accent-stone-900"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between font-medium">
                        <span>{p.title}</span>
                        <span className="font-mono">${p.price}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{p.subtitle}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 2: Cleaning Tool */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-2">
                2. Select Cleaning Tool
              </span>
              <div className="space-y-2">
                {cleaningOptions.map(p => (
                  <label
                    key={p.id}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      chosenCleaningId === p.id
                        ? 'border-stone-900 bg-white shadow-xs text-stone-900'
                        : 'border-stone-200 hover:bg-white text-stone-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="custom-cleaning"
                      checked={chosenCleaningId === p.id}
                      onChange={() => setChosenCleaningId(p.id)}
                      className="mt-0.5 accent-stone-900"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between font-medium">
                        <span>{p.title}</span>
                        <span className="font-mono">${p.price}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{p.subtitle}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Step 3: Home Storage */}
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-[11px] font-mono uppercase tracking-wider text-stone-400 block mb-2">
                3. Select Storage Solution
              </span>
              <div className="space-y-2">
                {storageOptions.map(p => (
                  <label
                    key={p.id}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border text-xs cursor-pointer transition-colors ${
                      chosenStorageId === p.id
                        ? 'border-stone-900 bg-white shadow-xs text-stone-900'
                        : 'border-stone-200 hover:bg-white text-stone-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name="custom-storage"
                      checked={chosenStorageId === p.id}
                      onChange={() => setChosenStorageId(p.id)}
                      className="mt-0.5 accent-stone-900"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between font-medium">
                        <span>{p.title}</span>
                        <span className="font-mono">${p.price}</span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{p.subtitle}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Custom Calculation Bar */}
          <div className="mt-8 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-stone-50 p-5 rounded-xl">
            <div>
              <div className="text-xs text-stone-500">
                Custom Trio Summary:
                <span className="font-medium text-stone-800 ml-1">
                  {chosenKitchen?.title} + {chosenCleaning?.title} + {chosenStorage?.title}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-display text-2xl font-bold text-stone-950 tabular-nums">
                  ${customDiscountedTotal}
                </span>
                <span className="text-sm text-stone-400 line-through tabular-nums">
                  ${customRegularTotal}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded ml-2">
                  Bundle 20% Applied (Save ${customSavings})
                </span>
              </div>
            </div>

            <button
              onClick={handleAddCustomTrio}
              className={`w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
                customTrioAdded
                  ? 'bg-stone-800 text-white'
                  : 'bg-stone-900 hover:bg-stone-800 text-white active:scale-95'
              }`}
            >
              {customTrioAdded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Custom Trio Added!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Add Custom Trio to Bag</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
