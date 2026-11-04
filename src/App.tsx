import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryPillars } from './components/CategoryPillars';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CuratedBundles } from './components/CuratedBundles';
import { AiSpaceConsultant } from './components/AiSpaceConsultant';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';
import { Product, BundleItem, CartItem, Category, Order } from './types';
import { INITIAL_PRODUCTS, INITIAL_BUNDLES } from './data/catalog';

export default function App() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [bundles, setBundles] = useState<BundleItem[]>(INITIAL_BUNDLES);
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('featured');
  const [loading, setLoading] = useState(false);

  // Modals & Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('kobo_cart');
      return saved ? JSON.parse(saved) : [
        { product: INITIAL_PRODUCTS[0], quantity: 1 },
        { product: INITIAL_PRODUCTS[5], quantity: 1 }
      ];
    } catch {
      return [
        { product: INITIAL_PRODUCTS[0], quantity: 1 },
        { product: INITIAL_PRODUCTS[5], quantity: 1 }
      ];
    }
  });

  const [discountCode, setDiscountCode] = useState('ORGANIZE15');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('kobo_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to storage:', e);
    }
  }, [cart]);

  // Recalculate discount whenever cart or code changes
  useEffect(() => {
    const subtotal = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const code = discountCode.trim().toUpperCase();

    if (code === 'ORGANIZE15') {
      setDiscountAmount(parseFloat((subtotal * 0.15).toFixed(2)));
    } else if (code === 'HARMONY20') {
      setDiscountAmount(parseFloat((subtotal * 0.20).toFixed(2)));
    } else {
      setDiscountAmount(0);
    }
  }, [cart, discountCode]);

  // Fetch products from backend whenever category, search, or sort changes
  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        if (activeCategory !== 'all') params.append('category', activeCategory);
        if (searchQuery.trim()) params.append('q', searchQuery.trim());
        if (sortOption !== 'featured') params.append('sort', sortOption);

        const res = await fetch(`/api/products?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && Array.isArray(data.products)) {
            setProducts(data.products);
          }
        }
      } catch (err) {
        console.warn('Backend fetch error, retaining loaded catalog:', err);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchCatalog, 150);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, sortOption]);

  // Fetch bundles on mount
  useEffect(() => {
    fetch('/api/bundles')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.bundles)) {
          setBundles(data.bundles);
        }
      })
      .catch(() => {});
  }, []);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleAddProductsToCart = (prods: Product[]) => {
    setCart(prev => {
      let updated = [...prev];
      for (const p of prods) {
        const existingIndex = updated.findIndex(i => i.product.id === p.id);
        if (existingIndex > -1) {
          updated[existingIndex] = {
            ...updated[existingIndex],
            quantity: updated[existingIndex].quantity + 1
          };
        } else {
          updated.push({ product: p, quantity: 1 });
        }
      }
      return updated;
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, quantity } : i))
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(i => i.product.id !== productId));
  };

  const handleApplyDiscountCode = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ORGANIZE15' || clean === 'HARMONY20' || clean === 'FREESHIP') {
      setDiscountCode(clean);
      return true;
    }
    return false;
  };

  const handleReviewAdded = (updatedProduct: Product) => {
    setProducts(prev => prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p)));
    setSelectedProduct(updatedProduct);
  };

  const handleOrderCompleted = (order: Order) => {
    setLatestOrder(order);
    setCart([]);
  };

  // Scroll helpers
  const scrollToCollection = () => {
    document.getElementById('collection-grid')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBundles = () => {
    document.getElementById('curated-bundles')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToConsultant = () => {
    document.getElementById('space-consultant')?.scrollIntoView({ behavior: 'smooth' });
  };

  const productCounts = {
    kitchen: products.filter(p => p.category === 'kitchen').length,
    cleaning: products.filter(p => p.category === 'cleaning').length,
    storage: products.filter(p => p.category === 'storage').length
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-stone-900">
      
      {/* Strict 3-Zone Navigation */}
      <Navbar
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCollection();
        }}
        activeCategory={activeCategory}
        onScrollToConsultant={scrollToConsultant}
        onScrollToBundles={scrollToBundles}
      />

      <main className="flex-1">
        {/* Campaign Hero Showcase */}
        <Hero
          onExploreClick={scrollToCollection}
          onConsultClick={scrollToConsultant}
        />

        {/* 3 Domain Pillars Section */}
        <CategoryPillars
          activeCategory={activeCategory}
          onSelectCategory={(cat) => {
            setActiveCategory(cat);
            scrollToCollection();
          }}
          productCounts={productCounts}
        />

        {/* Filterable Product Grid */}
        <ProductGrid
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onSelectProduct={setSelectedProduct}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortOption={sortOption}
          onSortChange={setSortOption}
          loading={loading}
        />

        {/* Pre-Curated Bundles & Custom 3-Pillar Trio Builder */}
        <CuratedBundles
          bundles={bundles}
          allProducts={INITIAL_PRODUCTS}
          onAddProductsToCart={handleAddProductsToCart}
        />

        {/* AI Home Space Diagnostic Studio */}
        <AiSpaceConsultant
          onAddProductsToCart={handleAddProductsToCart}
          allProducts={INITIAL_PRODUCTS}
        />
      </main>

      {/* Footer with brand philosophy & links */}
      <Footer
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          scrollToCollection();
        }}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
        onScrollToConsultant={scrollToConsultant}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onReviewAdded={handleReviewAdded}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        discountCode={discountCode}
        onApplyDiscountCode={handleApplyDiscountCode}
        discountAmount={discountAmount}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        discountCode={discountCode}
        discountAmount={discountAmount}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Order Tracker Modal */}
      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        defaultOrderId={latestOrder?.id || 'SHF-74921'}
      />

      {/* Contact Concierge Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
}
