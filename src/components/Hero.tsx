import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onConsultClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onConsultClick }) => {
  return (
    <section className="relative overflow-hidden border-b border-stone-200/80 bg-[#FAF9F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Manifesto */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Unboxed metadata kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-amber-800">
              <span>Smart Choices</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Better Living</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Kitchen, Cleaning & Storage</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-stone-900 leading-[1.08] text-balance">
              Smart finds for effortless, better living.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 font-normal leading-relaxed max-w-xl">
              Discover curated innovations across precision kitchen gadgets, sonic cleaning tools, and modular home storage systems. Thoughtfully selected for modern homes.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-stone-900 rounded-lg hover:bg-stone-800 transition-all shadow-sm group active:scale-[0.99] whitespace-nowrap"
              >
                <span>Explore the Collection</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onConsultClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-stone-800 bg-white border border-stone-300/80 rounded-lg hover:bg-stone-50 hover:border-stone-400 transition-all active:scale-[0.99] whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-amber-700" />
                <span>AI Space Diagnostic</span>
              </button>
            </div>

            {/* Micro proof line */}
            <div className="pt-4 flex items-center gap-6 text-xs text-stone-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-stone-700" />
                <span>Lifetime Mechanical Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-stone-700" />
                <span>Complimentary Over $65</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Photography Frame */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-2xl overflow-hidden border border-stone-200/90 shadow-lg bg-stone-100 group">
              <img
                src="/src/assets/images/hero_modern_home_haven_1793774872233.jpg"
                alt="Architectural Scandinavian kitchen and organized walk-in pantry with oak shelving and precision tools"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-stone-950/10 to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-amber-200">The Smart Home Finds Standard</p>
                  <p className="font-display text-lg font-medium tracking-tight">Smart Choices. Better Living.</p>
                </div>
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-stone-300 font-mono">Series 04 / 2026</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* 4-Column Reassurance Strip below hero split */}
        <div className="mt-16 pt-10 border-t border-stone-200/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-stone-600">
          <div className="flex items-start gap-3">
            <Award className="w-5 h-5 text-stone-900 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Enduring Materials</h4>
              <p className="text-xs text-stone-500 mt-0.5">Surgical steel, natural beechwood, and laboratory borosilicate.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw className="w-5 h-5 text-stone-900 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-stone-900">30-Day Home Trial</h4>
              <p className="text-xs text-stone-500 mt-0.5">Test every prep tool and canister in your kitchen risk-free.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Truck className="w-5 h-5 text-stone-900 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Carbon-Neutral Freight</h4>
              <p className="text-xs text-stone-500 mt-0.5">100% recyclable, zero-plastic unboxing packaging.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-stone-900 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-stone-900">Adaptive Space Logic</h4>
              <p className="text-xs text-stone-500 mt-0.5">Modular components designed to scale with your room dimensions.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
