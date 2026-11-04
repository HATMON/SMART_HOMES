import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_PRODUCTS, INITIAL_BUNDLES } from './src/data/catalog.ts';
import { Product, Order, AIConsultResult } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory persistent database across requests
let products: Product[] = JSON.parse(JSON.stringify(INITIAL_PRODUCTS));
const bundles = JSON.parse(JSON.stringify(INITIAL_BUNDLES));
const orders: Map<string, Order> = new Map();

// Helper to seed a demo order for user testing
const seedDemoOrder: Order = {
  id: 'SHF-74921',
  date: '2026-11-02T14:32:00Z',
  customerName: 'Aria Sterling',
  email: 'aria.sterling@example.com',
  shippingAddress: {
    street: '742 Evergreen Terrace',
    city: 'Portland',
    state: 'OR',
    postalCode: '97201',
    country: 'United States'
  },
  items: [
    {
      productId: 'kit-mandoline-01',
      title: 'Precision Japanese Dial Mandoline',
      quantity: 1,
      unitPrice: 68
    },
    {
      productId: 'cln-beechwood-02',
      title: 'Solid Beechwood & Horsehair Counter Sweeper',
      quantity: 1,
      unitPrice: 48
    }
  ],
  subtotal: 116,
  discount: 17.4,
  shippingFee: 0,
  tax: 7.89,
  total: 106.49,
  status: 'processing',
  paymentMethod: 'Credit Card (ending 4242)',
  estimatedDelivery: 'November 6, 2026'
};
orders.set(seedDemoOrder.id, seedDemoOrder);
orders.set('KOBO-74921', { ...seedDemoOrder, id: 'KOBO-74921' });

// -------------------------------------------------------------
// REST API ROUTES
// -------------------------------------------------------------

// 1. GET /api/products - Supports filtering, search, and sorting
app.get('/api/products', (req: Request, res: Response) => {
  try {
    const { category, q, sort, minPrice, maxPrice } = req.query;

    let filtered = [...products];

    // Category filter
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    // Search query filter
    if (q && typeof q === 'string') {
      const query = q.toLowerCase().trim();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.subtitle.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.features.some(f => f.toLowerCase().includes(query)) ||
        (p.tag && p.tag.toLowerCase().includes(query))
      );
    }

    // Price range filter
    if (minPrice) {
      const min = parseFloat(minPrice as string);
      if (!isNaN(min)) filtered = filtered.filter(p => p.price >= min);
    }
    if (maxPrice) {
      const max = parseFloat(maxPrice as string);
      if (!isNaN(max)) filtered = filtered.filter(p => p.price <= max);
    }

    // Sort options
    if (sort === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    } else if (sort === 'reviews') {
      filtered.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    res.json({
      success: true,
      total: filtered.length,
      products: filtered
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. GET /api/products/:id - Single product details
app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  res.json({ success: true, product });
});

// 3. POST /api/products/:id/reviews - Submit review and recalculate score
app.post('/api/products/:id/reviews', (req: Request, res: Response) => {
  const { author, rating, comment } = req.body;
  const productIndex = products.findIndex(p => p.id === req.params.id);

  if (productIndex === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  if (!author || !rating || !comment) {
    return res.status(400).json({ success: false, message: 'Missing required review fields' });
  }

  const numRating = Math.min(5, Math.max(1, Number(rating)));
  const newReview = {
    id: `rev-${Date.now()}`,
    author: String(author).trim(),
    rating: numRating,
    date: new Date().toISOString().split('T')[0],
    comment: String(comment).trim(),
    verified: true,
    helpfulCount: 0
  };

  const product = products[productIndex];
  const updatedReviews = [newReview, ...product.reviews];
  const newAvgRating = parseFloat(
    (updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length).toFixed(1)
  );

  product.reviews = updatedReviews;
  product.rating = newAvgRating;
  product.reviewCount = updatedReviews.length;

  res.json({
    success: true,
    message: 'Review successfully posted',
    product
  });
});

// 4. GET /api/categories - Category overview and counts
app.get('/api/categories', (_req: Request, res: Response) => {
  const counts = {
    kitchen: products.filter(p => p.category === 'kitchen').length,
    cleaning: products.filter(p => p.category === 'cleaning').length,
    storage: products.filter(p => p.category === 'storage').length
  };

  res.json({
    success: true,
    categories: [
      {
        slug: 'kitchen',
        title: 'Kitchen Gadgets',
        tagline: 'Precision culinary tools designed for fluid, effortless preparation.',
        itemCount: counts.kitchen,
        highlights: ['0.5mm Micrometric Mandoline', 'IPX7 Waterproof Culinary Scale', 'Solid Forged Cam Press']
      },
      {
        slug: 'cleaning',
        title: 'Cleaning Tools',
        tagline: 'High-torque sonic wands and natural German horsehair counter tools.',
        itemCount: counts.cleaning,
        highlights: ['18,000 RPM SonicScrub Wand', 'Beechwood & Brass Sweeper', 'Apothecary Amber Refills']
      },
      {
        slug: 'storage',
        title: 'Home Storage',
        tagline: 'Modular smoked acrylic canisters, walnut seals, and tension bamboo dividers.',
        itemCount: counts.storage,
        highlights: ['Smoked Acrylic Canister System', 'Tension Bamboo Dividers', 'Drop-Front Linen Bins']
      }
    ]
  });
});

// 5. GET /api/bundles - Pre-curated kit bundles
app.get('/api/bundles', (_req: Request, res: Response) => {
  res.json({
    success: true,
    bundles
  });
});

// 6. POST /api/orders - Place and record order
app.post('/api/orders', (req: Request, res: Response) => {
  try {
    const { customerName, email, shippingAddress, items, discountCode, paymentMethod } = req.body;

    if (!customerName || !email || !items || !items.length || !shippingAddress) {
      return res.status(400).json({ success: false, message: 'Incomplete order payload' });
    }

    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        const qty = Math.max(1, parseInt(item.quantity, 10) || 1);
        subtotal += prod.price * qty;
        orderItems.push({
          productId: prod.id,
          title: prod.title,
          quantity: qty,
          unitPrice: prod.price
        });
      }
    }

    if (orderItems.length === 0) {
      return res.status(400).json({ success: false, message: 'No valid products in cart' });
    }

    // Coupon discount logic
    let discount = 0;
    if (discountCode) {
      const code = String(discountCode).trim().toUpperCase();
      if (code === 'ORGANIZE15') {
        discount = parseFloat((subtotal * 0.15).toFixed(2));
      } else if (code === 'HARMONY20') {
        discount = parseFloat((subtotal * 0.20).toFixed(2));
      } else if (code === 'FREESHIP') {
        discount = 0; // handled via free shipping
      }
    }

    const shippingFee = (subtotal >= 65 || discountCode?.toUpperCase() === 'FREESHIP') ? 0 : 8.50;
    const taxableAmount = Math.max(0, subtotal - discount);
    const tax = parseFloat((taxableAmount * 0.0825).toFixed(2));
    const total = parseFloat((taxableAmount + shippingFee + tax).toFixed(2));

    const orderId = `SHF-${Math.floor(10000 + Math.random() * 90000)}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    const newOrder: Order = {
      id: orderId,
      date: new Date().toISOString(),
      customerName,
      email,
      shippingAddress,
      items: orderItems,
      subtotal,
      discount,
      shippingFee,
      tax,
      total,
      status: 'confirmed',
      paymentMethod: paymentMethod || 'Credit Card (ending 8821)',
      estimatedDelivery
    };

    orders.set(orderId, newOrder);

    res.json({
      success: true,
      order: newOrder
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 7. GET /api/orders/:id - Track order status
app.get('/api/orders/:id', (req: Request, res: Response) => {
  const order = orders.get(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order ID not found' });
  }
  res.json({ success: true, order });
});

// 8. POST /api/ai/consult - Space diagnostic & personalized 3-pillar home organizer
app.post('/api/ai/consult', async (req: Request, res: Response) => {
  const { room, problemDescription, priority } = req.body;

  const validProductsList = products.map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    price: p.price,
    features: p.features
  }));

  // Fallback intelligent curated heuristic
  const buildSmartFallback = (): AIConsultResult => {
    let recommendedIds: string[] = [];
    let diagnosis = '';
    let coreAdvice: string[] = [];
    let tip = '';

    const problem = (problemDescription || '').toLowerCase();

    if (problem.includes('pantry') || problem.includes('cabinet') || room === 'Pantry') {
      diagnosis = 'Vertical volume loss with light degradation and cluttered dry packages.';
      coreAdvice = [
        'Decant dry staples into airtight smoked canisters to preserve freshness and eliminate visual chaos.',
        'Use tension bamboo dividers in deep drawers so utensils never pile up.',
        'Install magnetic side caddies on metal surfaces to liberate prime shelf real estate.'
      ];
      recommendedIds = ['str-canister-01', 'str-divider-02', 'str-caddy-04', 'kit-mandoline-01'];
      tip = 'Group everyday cooking essentials within forearm reach (between hip and eye level), and reserve high shelves for seasonal items.';
    } else if (problem.includes('grease') || problem.includes('cleaning') || problem.includes('scrub') || room === 'Cleaning Station') {
      diagnosis = 'Surface micro-grime accumulation and abrasive manual scrubbing fatigue.';
      coreAdvice = [
        'Replace manual scouring pads with high-torque sonic micro-oscillations to lift burnt grease without scratching.',
        'Switch to natural split horsehair bristles for daily electrostatic dry sweeping of grinds and crumbs.',
        'Adopt pharmaceutical amber glass refill bottles to protect natural enzyme cleaning solutions.'
      ];
      recommendedIds = ['cln-sonic-01', 'cln-beechwood-02', 'cln-amber-03', 'cln-dishcloth-04'];
      tip = 'Keep a dedicated counter sweeper stationed right beside your prep board or coffee station for instant 5-second resets.';
    } else {
      diagnosis = 'Fragmented workflow across food preparation, surface sanitization, and storage balance.';
      coreAdvice = [
        'Standardize prep with precision slicing and weighing to cut cooking and cleanup time in half.',
        'Deploy sonic power cleaning in problem areas (stovetop, sink rim, grout lines).',
        'Use modular smoked acrylic containers to maintain airtight freshness and clean visual lines.'
      ];
      recommendedIds = ['kit-mandoline-01', 'cln-sonic-01', 'str-canister-01'];
      tip = 'Apply the "One In, One Out" rule and keep countertops at least 70% clear of static appliances.';
    }

    const matchedProducts = products.filter(p => recommendedIds.includes(p.id));
    const combinedPrice = matchedProducts.reduce((sum, p) => sum + p.price, 0);

    return {
      diagnosis,
      coreAdvice,
      recommendedProductIds: recommendedIds,
      recommendedProducts: matchedProducts,
      organizationTip: tip,
      bundleOffer: {
        title: 'Curated 3-Pillar Room Reset System',
        discountPercent: 20,
        combinedPrice: Math.round(combinedPrice * 0.8)
      }
    };
  };

  // Try Gemini if API key is provided
  if (process.env.GEMINI_API_KEY) {
    try {
      const ai = new GoogleGenAI();
      const prompt = `You are the master spatial organizer and product curator for Smart Home Finds (Smart Choices. Better Living.).
A customer has submitted a home challenge:
- Room / Zone: ${room || 'General Kitchen & Living'}
- Challenge Details: "${problemDescription || 'General clutter and disorganized daily prep'}"
- Priority Focus: ${priority || 'Maximum Efficiency & Clean Design'}

Available product catalog:
${JSON.stringify(validProductsList, null, 2)}

Provide a structured JSON response (no markdown, pure JSON) with:
1. "diagnosis": A concise 1-sentence architectural assessment of why this space becomes chaotic.
2. "coreAdvice": An array of exactly 3 concrete, actionable spatial reorganization rules.
3. "recommendedProductIds": An array of 3 to 4 product IDs from the catalog that directly solve the problem across kitchen gadgets, cleaning tools, and home storage.
4. "organizationTip": One distinctive designer habit for keeping this space permanently calm.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        const matched = products.filter(p => parsed.recommendedProductIds?.includes(p.id));
        const combined = matched.reduce((s, p) => s + p.price, 0);

        return res.json({
          success: true,
          consultation: {
            diagnosis: parsed.diagnosis,
            coreAdvice: parsed.coreAdvice,
            recommendedProductIds: parsed.recommendedProductIds,
            recommendedProducts: matched.length > 0 ? matched : products.slice(0, 3),
            organizationTip: parsed.organizationTip,
            bundleOffer: {
              title: 'Custom AI Recommended Home Set',
              discountPercent: 20,
              combinedPrice: Math.round(combined * 0.8)
            }
          }
        });
      }
    } catch (err: any) {
      console.warn('Gemini consultation fallback triggered:', err.message);
    }
  }

  // Graceful fallback
  const fallbackResult = buildSmartFallback();
  res.json({
    success: true,
    consultation: fallbackResult
  });
});

// 9. GET /api/contact-info - Studio contact information
app.get('/api/contact-info', (_req: Request, res: Response) => {
  res.json({
    success: true,
    contact: {
      phone: '+254 702 502360',
      phoneFormatted: '+254 702 502360',
      whatsappUrl: 'https://wa.me/254702502360?text=Hello%20K%C5%8Db%C5%8D%20Living%2C%20I%20have%20an%20inquiry%20regarding%20products',
      telUrl: 'tel:+254702502360',
      email: 'maggiemaggy6350@gmail.com',
      emailUrl: 'mailto:maggiemaggy6350@gmail.com?subject=K%C5%8Db%C5%8D%20Living%20Inquiry',
      hours: 'Monday – Saturday: 8:00 AM – 7:00 PM (EAT)',
      supportNote: 'Direct phone & WhatsApp concierge available for order queries, bulk requests, and spatial advice.'
    }
  });
});

// In-memory inquiries store
const inquiries: Array<{
  id: string;
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  createdAt: string;
}> = [];

// 10. POST /api/inquiries - Submit customer inquiry
app.post('/api/inquiries', (req: Request, res: Response) => {
  try {
    const { name, email, phone, topic, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const inquiryId = `INQ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInquiry = {
      id: inquiryId,
      name: String(name).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : '',
      topic: topic || 'General Inquiry',
      message: String(message).trim(),
      createdAt: new Date().toISOString()
    };

    inquiries.push(newInquiry);

    res.json({
      success: true,
      message: 'Inquiry received. Our concierge will contact you via phone or email shortly.',
      inquiryId: inquiryId
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// -------------------------------------------------------------
// VITE DEV SERVER / PRODUCTION STATIC ASSET SERVING
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Smart Home Finds server listening on port ${PORT}`);
  });
}

startServer();
