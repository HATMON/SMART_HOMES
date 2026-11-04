import React from 'react';
import { ChefHat, Sparkles, Box, ArrowUpRight } from 'lucide-react';
import { Category } from '../types';

interface CategoryPillarsProps {
  activeCategory: Category | 'all';
  onSelectCategory: (category: Category | 'all') => void;
  productCounts: Record<Category, number>;
}

export const CategoryPillars: React.FC<CategoryPillarsProps> = ({
  activeCategory,
  onSelectCategory,
  productCounts
}) => {
  const pillars = [
    {
      id: 'kitchen' as Category,
      title: 'Kitchen Gadgets',
      japanese: '調理器',
      subtitle: 'Micrometric prep mandolines, forged monolithic presses, and waterproof scales.',
      image: '/src/assets/images/product_kitchen_precision_prep_1793774872561.jpg',
      icon: ChefHat,
      count: productCounts.kitchen || 4
    },
    {
      id: 'cleaning' as Category,
      title: 'Cleaning Tools',
      japanese: '清掃具',
      subtitle: '18,000 RPM sonic deep-scrub wands and Black Forest horsehair counter sweeper.',
      image: '/src/assets/images/product_cleaning_sonic_brush_1793774871982.jpg',
      icon: Sparkles,
      count: productCounts.cleaning || 4
    },
    {
      id: 'storage' as Category,
      title: 'Home Storage',
      japanese: '収納具',
      subtitle: 'Smoked optical acrylic pantry canisters with walnut lids and tension dividers.',
      image: '/src/assets/images/product_storage_modular_pantry_1793774873726.jpg',
      icon: Box,
      count: productCounts.storage || 4
    }
  ];

  return (
    <section className="py-12 bg-[#FBFBFA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              Curated Domains
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-medium tracking-tight text-stone-900">
              Three pillars of intentional domestic order.
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeCategory === 'all'
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200'
              }`}
            >
              View Full Catalog
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const isSelected = activeCategory === pillar.id;
            const Icon = pillar.icon;

            return (
              <div
                key={pillar.id}
                onClick={() => onSelectCategory(pillar.id)}
                className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all duration-300 ${
                  isSelected
                    ? 'border-stone-900 ring-2 ring-stone-900/10 shadow-md bg-stone-50'
                    : 'border-stone-200/80 bg-white hover:border-stone-300 hover:shadow-sm'
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-950/20 to-transparent pointer-events-none" />

                  <div className="absolute top-3 left-3 text-[11px] font-mono tracking-wider text-white/80 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded">
                    {pillar.count} Objects
                  </div>

                  <div className="absolute top-3 right-3 text-xs text-white/80 font-serif">
                    {pillar.japanese}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display text-xl font-medium tracking-tight">
                        {pillar.title}
                      </h3>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                    {pillar.subtitle}
                  </p>
                  
                  <div className="mt-3 flex items-center justify-between text-xs font-medium">
                    <span className={isSelected ? 'text-stone-950 font-semibold' : 'text-stone-500 group-hover:text-stone-900'}>
                      {isSelected ? 'Currently Viewing' : 'Explore Category'}
                    </span>
                    <Icon className="w-4 h-4 text-stone-400 group-hover:text-stone-700 transition-colors" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
