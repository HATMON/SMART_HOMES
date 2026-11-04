import { ShoppingBag, Search, PackageCheck, Phone } from 'lucide-react';
import { Category } from '../types';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenTracker: () => void;
  onOpenContact: () => void;
  onSelectCategory: (category: Category | 'all') => void;
  activeCategory: Category | 'all';
  onScrollToConsultant: () => void;
  onScrollToBundles: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenTracker,
  onOpenContact,
  onSelectCategory,
  activeCategory,
  onScrollToConsultant,
  onScrollToBundles
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
      {/* Promotional & Contact Top Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs py-1.5 px-4 text-center font-medium tracking-wide flex items-center justify-between max-w-7xl mx-auto">
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-stone-400">
          <span>Concierge & Orders:</span>
          <a
            href="tel:+254702502360"
            className="text-white hover:text-amber-200 font-mono font-semibold transition-colors"
          >
            +254 702 502360
          </a>
        </div>

        <div className="mx-auto sm:mx-0">
          <span className="opacity-90 font-medium text-amber-200">Smart Home Finds</span>
          <span className="mx-2 text-stone-600">·</span>
          <span>Complimentary delivery over $65 with <code className="bg-stone-800 text-amber-200 px-1 py-0.5 rounded text-[11px] font-mono">ORGANIZE15</code></span>
        </div>

        <button
          onClick={onOpenContact}
          className="hidden md:inline-flex items-center gap-1 text-[11px] text-stone-300 hover:text-white transition-colors cursor-pointer"
        >
          <span>Support & WhatsApp</span>
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8">
        {/* Zone 1: Smart Home Finds Brand Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectCategory('all');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-none"
            aria-label="Smart Home Finds - Smart Choices. Better Living."
          >
            <img
              src="/assets/aistudio/Smart_Home_Finds_Logo_e816e860.png"
              alt="Smart Home Finds - Smart Choices. Better Living."
              className="h-11 sm:h-12 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </a>
        </div>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => onSelectCategory('kitchen')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeCategory === 'kitchen'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Kitchen Gadgets
          </button>
          <button
            onClick={() => onSelectCategory('cleaning')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeCategory === 'cleaning'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Cleaning Tools
          </button>
          <button
            onClick={() => onSelectCategory('storage')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 ${
              activeCategory === 'storage'
                ? 'border-stone-900 text-stone-950 font-semibold'
                : 'border-transparent hover:text-stone-950 hover:border-stone-300'
            }`}
          >
            Home Storage
          </button>
          <button
            onClick={onScrollToBundles}
            className="whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 border-transparent hover:text-stone-950 hover:border-stone-300"
          >
            Curated Bundles
          </button>
          <button
            onClick={onScrollToConsultant}
            className="whitespace-nowrap shrink-0 transition-colors py-1 border-b-2 border-transparent hover:text-stone-950 hover:border-stone-300 text-amber-800 font-medium"
          >
            Space Diagnostic
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg border border-stone-200 hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0"
            title="Contact Concierge (+254 702 502360)"
          >
            <Phone className="w-3.5 h-3.5 text-stone-500" />
            <span className="hidden sm:inline">Contact</span>
          </button>

          <button
            onClick={onOpenTracker}
            className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 px-3 py-2 rounded-lg border border-stone-200 hover:bg-stone-100 transition-colors whitespace-nowrap shrink-0"
            title="Track existing order"
          >
            <PackageCheck className="w-4 h-4 text-stone-500" />
            <span className="hidden md:inline">Track Order</span>
          </button>

          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium px-4 py-2 rounded-lg transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Bag</span>
            <span className="tabular-nums font-semibold bg-white/20 text-white text-[11px] px-1.5 py-0.2 rounded-full">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
