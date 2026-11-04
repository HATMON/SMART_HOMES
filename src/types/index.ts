export type Category = 'kitchen' | 'cleaning' | 'storage';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  tag?: string;
  image: string;
  description: string;
  features: string[];
  specs: Record<string, string>;
  dimensions: string;
  materials: string;
  careInstructions: string;
  reviews: ProductReview[];
}

export interface BundleItem {
  id: string;
  title: string;
  subtitle: string;
  savingsPercentage: number;
  price: number;
  originalPrice: number;
  products: Product[];
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  title: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  email: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shippingFee: number;
  tax: number;
  total: number;
  status: 'confirmed' | 'processing' | 'dispatched' | 'delivered';
  paymentMethod: string;
  estimatedDelivery: string;
}

export interface AIConsultResult {
  diagnosis: string;
  coreAdvice: string[];
  recommendedProductIds: string[];
  recommendedProducts?: Product[];
  organizationTip: string;
  bundleOffer?: {
    title: string;
    discountPercent: number;
    combinedPrice: number;
  };
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  createdAt: string;
}
