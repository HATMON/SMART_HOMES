import { Product, BundleItem } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  // --- KITCHEN GADGETS ---
  {
    id: 'kit-mandoline-01',
    title: 'Precision Japanese Dial Mandoline',
    subtitle: 'Micro-adjustable titanium carbide blade with safety glide guard',
    category: 'kitchen',
    categoryLabel: 'Kitchen Gadgets',
    price: 68,
    originalPrice: 84,
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockCount: 18,
    tag: 'Best Seller',
    image: '/src/assets/images/product_kitchen_precision_prep_1793774872561.jpg',
    description: 'Engineered in Niigata, Japan, this precision mandoline provides 0.5mm to 9mm continuous rotary dial thickness control without cumbersome blade swaps. Features an angled dual-bevel blade that glides effortlessly through firm beets, delicate heirloom tomatoes, and crisp radishes without tearing.',
    features: [
      'Continuous rotary dial adjustment from 0.5mm to 9.0mm',
      'Dual-bevel 440C surgical stainless steel blade',
      'Ergonomic magnetic food pusher with stainless stabilizing pins',
      'Slip-resistant silicone feet with fold-out bowl notches',
      'Dishwasher safe body; quick-release blade rinse'
    ],
    specs: {
      'Blade Steel': 'Forged 440C Stainless Steel',
      'Dial Step': 'Continuous micrometric dial (0.5mm increments)',
      'Safety': 'Full-hand guard with 4 stainless food pins',
      'Origin': 'Tsubame-Sanjo, Japan'
    },
    dimensions: '38 cm × 14 cm × 4.5 cm (15" × 5.5" × 1.8")',
    materials: 'Surgical stainless steel, BPA-free anodized aluminum, food-grade silicone',
    careInstructions: 'Rinse blade immediately after acidic foods. Main frame is top-rack dishwasher safe.',
    reviews: [
      {
        id: 'rev-k1',
        author: 'Elena Rostova',
        rating: 5,
        date: '2026-10-18',
        comment: 'The micro dial is unlike any cheap plastic mandoline I have ever used. Paper-thin fennel and cucumber in seconds with zero wobble.',
        verified: true,
        helpfulCount: 38
      },
      {
        id: 'rev-k2',
        author: 'Marcus Vance',
        rating: 5,
        date: '2026-09-29',
        comment: 'Extremely sharp and the safety guard locks into the side rails so your fingers never get near the edge. Worth every dollar.',
        verified: true,
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'kit-scale-02',
    title: 'Dual-Sensor Waterproof Culinary Scale',
    subtitle: '0.1g resolution with pour-over brew timer and magnetic wall mount',
    category: 'kitchen',
    categoryLabel: 'Kitchen Gadgets',
    price: 52,
    originalPrice: 65,
    rating: 4.8,
    reviewCount: 96,
    inStock: true,
    stockCount: 24,
    tag: 'Design Award',
    image: '/src/assets/images/product_kitchen_precision_prep_1793774872561.jpg',
    description: 'A seamless matte black tempered glass work surface with invisible capacitive LED readout that lights up only when activated. Dual micro-strain gauge sensors yield 0.1g accuracy up to 3kg and 1g up to 10kg, perfect for artisanal sourdough hydration and daily prep.',
    features: [
      'Dual precision strain gauge sensors (0.1g to 3,000g / 1g to 10,000g)',
      'IPX7 waterproof rated: wash directly under running sink faucet',
      'Integrated tactile tare function & pour-over flow rate timer',
      'USB-C fast charge battery lasts 6 months on a single 30-min charge',
      'Magnetic back docks flush against steel splashbacks or fridge'
    ],
    specs: {
      'Measurement Range': '0.1g – 10,000g',
      'Units': 'g, oz, ml, fl.oz, lb:oz',
      'Water Resistance': 'IPX7 certified waterproof',
      'Battery': 'Rechargeable Li-ion 1200mAh via USB-C'
    },
    dimensions: '21 cm × 16 cm × 1.8 cm (8.2" × 6.3" × 0.7")',
    materials: 'Tempered matte silica glass, anodized aluminum frame',
    careInstructions: 'Wash under tap with gentle dish soap. Dry with a microfiber cloth.',
    reviews: [
      {
        id: 'rev-k3',
        author: 'David Chen',
        rating: 5,
        date: '2026-10-02',
        comment: 'Being able to wash this directly in the sink when flour or oil drips on it is life-changing. Fast tare response time.',
        verified: true,
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'kit-press-03',
    title: 'Forged Monolithic Garlic & Ginger Press',
    subtitle: 'Leveraged cam hinge with swing-out ejector grid for zero waste',
    category: 'kitchen',
    categoryLabel: 'Kitchen Gadgets',
    price: 36,
    rating: 4.9,
    reviewCount: 88,
    inStock: true,
    stockCount: 32,
    image: '/src/assets/images/bundle_curated_home_kit_1793774874177.jpg',
    description: 'Forged from a single solid billet of 304 food-grade stainless steel. The mechanical leverage cam multiplies pressing power by 3.5×, allowing you to press unpeeled cloves and tough ginger knobs without hand fatigue. The swing-out chamber flips open for effortless 2-second rinsing.',
    features: [
      'Solid forged 304 stainless steel with satin brushed finish',
      'High-ratio mechanical cam delivers 3.5× pressing force',
      'Accommodates 3 unpeeled cloves simultaneously',
      'Swing-out cleaning grid leaves zero trapped garlic pulp',
      'Lifetime mechanical warranty against bending or hinge failure'
    ],
    specs: {
      'Steel Grade': 'Solid 304 Stainless Steel (18/8)',
      'Leverage Ratio': '3.5:1 Mechanical Cam',
      'Capacity': 'Up to 3 jumbo cloves',
      'Weight': '340g solid balanced heft'
    },
    dimensions: '18.5 cm × 5 cm × 3.2 cm (7.3" × 2" × 1.25")',
    materials: '100% Solid forged 304 stainless steel',
    careInstructions: 'Dishwasher safe. Swing out the chamber and rinse under warm water.',
    reviews: [
      {
        id: 'rev-k4',
        author: 'Chef Sarah Lindqvist',
        rating: 5,
        date: '2026-10-14',
        comment: 'Every restaurant cook has broken three zinc-alloy presses. This forged stainless tool will literally outlive me.',
        verified: true,
        helpfulCount: 41
      }
    ]
  },
  {
    id: 'kit-infuser-04',
    title: 'Cold-Brew & Herbal Precision Infuser',
    subtitle: 'Borosilicate fluted pitcher with ultra-fine 15-micron laser etched filter',
    category: 'kitchen',
    categoryLabel: 'Kitchen Gadgets',
    price: 44,
    originalPrice: 55,
    rating: 4.7,
    reviewCount: 53,
    inStock: true,
    stockCount: 14,
    image: '/src/assets/images/hero_modern_home_haven_1793774872233.jpg',
    description: 'Designed to fit directly into the slim door bin of any refrigerator. The 15-micron laser-perforated stainless core prevents fine sediment from escaping into cold brew coffee, botanical infusions, or iced loose-leaf teas.',
    features: [
      '1.4 Liter thermal shock-resistant borosilicate glass',
      '15-micron micro-perforated stainless filter core',
      'Dual-pour silicone lid with integrated ice guard',
      'Ergonomic balance point with smooth drip-free spout'
    ],
    specs: {
      'Capacity': '1,400 ml (48 fl oz)',
      'Filter': 'Laser-etched 316 Stainless Steel (15 micron)',
      'Thermal Tolerance': '-20°C to 150°C'
    },
    dimensions: '10 cm diameter × 27 cm height (3.9" × 10.6")',
    materials: 'Laboratory-grade borosilicate glass, 316 surgical steel, food-grade silicone',
    careInstructions: 'All components top-rack dishwasher safe.',
    reviews: [
      {
        id: 'rev-k5',
        author: 'Julian Barnes',
        rating: 5,
        date: '2026-09-12',
        comment: 'Crystal clear cold brew with zero muddy sludge at the bottom. Fits the fridge door perfectly.',
        verified: true,
        helpfulCount: 15
      }
    ]
  },

  // --- CLEANING TOOLS ---
  {
    id: 'cln-sonic-01',
    title: 'SonicScrub Ergonomic Deep Power Wand',
    subtitle: '18,000 micro-oscillations/min with 4 interchangeable task heads',
    category: 'cleaning',
    categoryLabel: 'Cleaning Tools',
    price: 79,
    originalPrice: 95,
    rating: 4.9,
    reviewCount: 215,
    inStock: true,
    stockCount: 12,
    tag: 'Top Rated',
    image: '/src/assets/images/product_cleaning_sonic_brush_1793774871982.jpg',
    description: 'Eliminate stubborn stove grease, tile grout discoloration, and shower track buildup without scrubbing fatigue. The high-torque magnetic levitation motor vibrates at 18,000 cycles per minute, lifting grime at a molecular level with warm water alone.',
    features: [
      '18,000 RPM high-torque sonic motor with 3 speed modes',
      '4 specialized quick-click heads: Grout Wedge, Flat Surface, Soft Bristle, Corner Detail',
      'IPX8 submersible waterproof with sealed silicone grip',
      'Magnetic induction charging dock with ultraviolet self-drying sanitization',
      '120-minute continuous run time on a single charge'
    ],
    specs: {
      'Oscillation Speed': '12,000 / 15,000 / 18,000 strokes/min',
      'Battery Life': '120 minutes continuous (Li-ion 2,200mAh)',
      'Waterproof': 'IPX8 rated (submersible up to 2m)',
      'Heads Included': '4 interchangeable snap-lock heads'
    },
    dimensions: '26 cm × 3.5 cm × 3.5 cm (10.2" × 1.4" × 1.4")',
    materials: 'Matte antibacterial ABS, DuPont tapered nylon bristles, silicone seal',
    careInstructions: 'Rinse brush heads after each use. Store on the magnetic induction stand.',
    reviews: [
      {
        id: 'rev-c1',
        author: 'Clara Oswald',
        rating: 5,
        date: '2026-10-22',
        comment: 'Cleaned 5 years of baked-on oven door grease and bathroom grout in under 15 minutes. An absolute must-have.',
        verified: true,
        helpfulCount: 64
      },
      {
        id: 'rev-c2',
        author: 'Devon Miller',
        rating: 5,
        date: '2026-09-15',
        comment: 'The magnetic charging dock sits quietly on my counter. Feels like an Apple product for cleaning.',
        verified: true,
        helpfulCount: 29
      }
    ]
  },
  {
    id: 'cln-beechwood-02',
    title: 'Solid Beechwood & Horsehair Counter Sweeper',
    subtitle: 'Hand-turned European beech with magnetic solid brass dustpan',
    category: 'cleaning',
    categoryLabel: 'Cleaning Tools',
    price: 48,
    rating: 4.8,
    reviewCount: 79,
    inStock: true,
    stockCount: 28,
    tag: 'Artisanal',
    image: '/src/assets/images/product_cleaning_sonic_brush_1793774871982.jpg',
    description: 'Crafted in the Black Forest, Germany, from sustainably harvested FSC-certified beechwood and dense split horsehair bristles. Natural bristles hold static charge to collect bread crumbs, coffee grinds, and micro-dust without scratching marble or polished stone.',
    features: [
      'Hand-tufted natural split horsehair bristles',
      'FSC-certified European beechwood with natural linseed oil finish',
      'Solid pressed brass dustpan with ultra-thin bevel edge',
      'Hidden neodymium magnets nest the brush securely inside the pan',
      'Hangs flat or stands upright on your kitchen counter'
    ],
    specs: {
      'Wood Species': 'European Beech (FSC Certified)',
      'Bristle Material': '100% Natural unbleached horsehair',
      'Dustpan': 'Solid spun brass with protective wax coating',
      'Mounting': 'Dual concealed neodymium magnets'
    },
    dimensions: '22 cm × 15 cm × 4 cm (8.6" × 5.9" × 1.6")',
    materials: 'Solid beechwood, pure horsehair, solid brass, neodymium magnets',
    careInstructions: 'Comb bristles occasionally with a dry comb. Wipe brass with a soft dry cloth.',
    reviews: [
      {
        id: 'rev-c3',
        author: 'Tobias H.',
        rating: 5,
        date: '2026-10-09',
        comment: 'It sits out on my marble island like a piece of sculpture. Picks up the tiniest espresso grinds effortlessly.',
        verified: true,
        helpfulCount: 17
      }
    ]
  },
  {
    id: 'cln-amber-03',
    title: 'Amber Glass Refillable Cleaning Trio',
    subtitle: '500ml pharmaceutical amber bottles with dual-stream silicone sprayers',
    category: 'cleaning',
    categoryLabel: 'Cleaning Tools',
    price: 34,
    originalPrice: 42,
    rating: 4.8,
    reviewCount: 110,
    inStock: true,
    stockCount: 40,
    image: '/src/assets/images/bundle_curated_home_kit_1793774874177.jpg',
    description: 'Set of 3 heavy amber glass apothecary spray bottles with ergonomic commercial spray triggers. UV-blocking amber glass protects natural essential oil solutions, vinegar cleaners, and sanitizing solutions from degrading under ambient sunlight.',
    features: [
      'Heavy-wall laboratory amber glass protects UV-sensitive formulas',
      'Commercial-grade trigger rated for 50,000 cycles with mist & stream settings',
      'Silicone non-slip base boot prevents clanking on stone countertops',
      'Includes 6 waterproof embossed minimalist vinyl labels (Kitchen, Glass, Multi, Bathroom, Linen, Custom)'
    ],
    specs: {
      'Volume': '3 × 500 ml (16 fl oz)',
      'Spray Modes': 'Fine atomized mist, high-velocity jet stream, locked off',
      'UV Protection': 'Blocks 99% of UV spectrum (up to 400nm)'
    },
    dimensions: 'Each bottle: 7.5 cm diameter × 21 cm height (3" × 8.3")',
    materials: 'Pharmaceutical amber glass, BPA-free polypropylene trigger, food-grade silicone boot',
    careInstructions: 'Glass bottles dishwasher safe. Rinse trigger mechanism with warm soapy water periodically.',
    reviews: [
      {
        id: 'rev-c4',
        author: 'Hannah Ward',
        rating: 5,
        date: '2026-09-22',
        comment: 'The silicone boots at the bottom are such a smart touch! No loud clinking when setting them down on quartz.',
        verified: true,
        helpfulCount: 24
      }
    ]
  },
  {
    id: 'cln-dishcloth-04',
    title: 'Swedish Organic Cellulose Dishcloths (6-Pack)',
    subtitle: 'Absorbs 20× its weight in liquid, replaces 15 rolls of paper towels',
    category: 'cleaning',
    categoryLabel: 'Cleaning Tools',
    price: 22,
    rating: 4.9,
    reviewCount: 167,
    inStock: true,
    stockCount: 65,
    tag: 'Eco Hero',
    image: '/src/assets/images/bundle_curated_home_kit_1793774874177.jpg',
    description: 'Manufactured in Sweden from 70% wood cellulose and 30% organic unbleached cotton. Softens instantly when wet, drying quickly to prevent mildew smell. Washable over 200 times and 100% backyard compostable.',
    features: [
      'Absorbs 20× dry weight in liquid without dripping',
      'Dries 4× faster than cotton dishcloths to inhibit bacterial odors',
      'Washing machine and dishwasher safe (up to 200+ cycles)',
      'Certified 100% biodegradable and backyard compostable'
    ],
    specs: {
      'Pack Size': '6 cloths with natural Scandinavian botanical patterns',
      'Lifespan': 'Up to 9 months per cloth (replaces ~17 paper towel rolls)',
      'Dimensions': '17 cm × 20 cm (6.7" × 7.9")'
    },
    dimensions: '17 cm × 20 cm (6.7" × 7.9")',
    materials: '70% Scandinavian wood cellulose, 30% organic cotton',
    careInstructions: 'Wash on top rack of dishwasher or in washing machine. Air dry.',
    reviews: [
      {
        id: 'rev-c5',
        author: 'Rachel Bloom',
        rating: 5,
        date: '2026-10-04',
        comment: 'I will never buy paper towels again. They wipe counters streak-free and never smell sour.',
        verified: true,
        helpfulCount: 45
      }
    ]
  },

  // --- HOME STORAGE ---
  {
    id: 'str-canister-01',
    title: 'Airtight Modular Pantry Canister System (8-Piece)',
    subtitle: 'Smoked UV acrylic containers with solid American walnut silicone-sealed lids',
    category: 'storage',
    categoryLabel: 'Home Storage',
    price: 118,
    originalPrice: 145,
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    stockCount: 9,
    tag: 'Flagship System',
    image: '/src/assets/images/product_storage_modular_pantry_1793774873726.jpg',
    description: 'Transform cluttered pantry shelving into an architectural showcase. Smoked acrylic protects grains, pasta, coffee beans, and heirloom spices from light degradation. The modular footprint stacks securely with recessed perimeter lids that prevent slipping.',
    features: [
      '8 modular sizes: 2× 2.5L, 2× 1.8L, 2× 1.0L, 2× 0.4L spice jars',
      'Solid American walnut lids with double-lip silicone hermetic seals',
      'Smoked shatterproof optical acrylic filters 85% of ambient light',
      'Interlocking lid bevel locks canisters into stable vertical stacks',
      'Includes 32 matte black chalkboard-free minimalist pre-printed labels'
    ],
    specs: {
      'Sizes Included': '2.5L (2), 1.8L (2), 1.0L (2), 400ml (2)',
      'Seal Type': 'Double-lip airtight silicone gasket',
      'Acrylic Grade': 'BPA-free optical shatterproof resin',
      'Wood': 'Sustainable American Walnut'
    },
    dimensions: 'Modular footprint: 10cm × 10cm base (spice/medium) & 10cm × 20cm (large)',
    materials: 'Optical smoked acrylic, natural American walnut, food-grade silicone',
    careInstructions: 'Wash acrylic containers with gentle sponge. Wipe walnut lids with dry cloth and oil once yearly.',
    reviews: [
      {
        id: 'rev-s1',
        author: 'Julianna Morris',
        rating: 5,
        date: '2026-10-15',
        comment: 'Completely transformed our walk-in pantry. The seals are super tight and the walnut tops give a warm, organic feel.',
        verified: true,
        helpfulCount: 81
      },
      {
        id: 'rev-s2',
        author: 'Liam Gallagher',
        rating: 5,
        date: '2026-09-19',
        comment: 'High grade acrylic that looks like real glass without the heavy weight or fear of shattering on tile.',
        verified: true,
        helpfulCount: 34
      }
    ]
  },
  {
    id: 'str-divider-02',
    title: 'Spring-Loaded Deep Bamboo Drawer Dividers (4-Pack)',
    subtitle: 'Tension-fit dividers with silicone end-cushions for 30–55cm deep drawers',
    category: 'storage',
    categoryLabel: 'Home Storage',
    price: 42,
    rating: 4.8,
    reviewCount: 145,
    inStock: true,
    stockCount: 35,
    image: '/src/assets/images/bundle_curated_home_kit_1793774874177.jpg',
    description: 'Tame junk drawers, cooking utensil organizers, and wardrobe socks instantly. Heavy-duty internal steel springs exert constant positive pressure, keeping partitions locked firmly in place without tools, screws, or adhesive residue.',
    features: [
      'Adjustable extension range from 32 cm to 55 cm (12.5" to 21.6")',
      'Extra-tall 8 cm (3.15") profile prevents long ladles from hopping dividers',
      'High-grade Moso bamboo with water-resistant food-safe sealant',
      'Thick non-marking silicone pads protect cabinet drawer finishes'
    ],
    specs: {
      'Extension Range': '32 cm – 55 cm (12.5" – 21.6")',
      'Height': '8 cm (3.15")',
      'Pack Quantity': '4 spring-tensioned dividers',
      'Tension': 'Dual internal high-tensile steel springs'
    },
    dimensions: 'Expandable 32-55 cm × 8 cm × 1.6 cm each',
    materials: '100% Solid mature Moso bamboo, high-tensile steel spring, silicone end pads',
    careInstructions: 'Wipe clean with a damp cloth.',
    reviews: [
      {
        id: 'rev-s3',
        author: 'Chloe Dupont',
        rating: 5,
        date: '2026-10-11',
        comment: 'Strong tension! Other cheap ones slip when you close the drawer fast, but these stay rock solid.',
        verified: true,
        helpfulCount: 30
      }
    ]
  },
  {
    id: 'str-dropbins-03',
    title: 'Stackable Drop-Front Linen & Pantry Bins (2-Pack)',
    subtitle: 'Magnetic stay-open access doors with integrated ventilation louvers',
    category: 'storage',
    categoryLabel: 'Home Storage',
    price: 58,
    originalPrice: 72,
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    stockCount: 20,
    image: '/src/assets/images/product_storage_modular_pantry_1793774873726.jpg',
    description: 'Access stored linens, potatoes, onions, or dry pantry packages without unstacking the bins above. The clear front door lifts and magnetically clips open for effortless one-handed loading and retrieval.',
    features: [
      'Front-hinged door clicks magnetically into open position for easy access',
      'Structural ribbed design holds up to 25 kg (55 lbs) stacked weight',
      'Concealed micro-louvers permit gentle air circulation to keep produce fresh',
      'Recessed top channels guarantee zero slippage when stacked up to 5 high'
    ],
    specs: {
      'Weight Capacity': '25 kg per unit when stacked',
      'Capacity': '32 Liters per bin',
      'Door Mechanism': 'Magnetic lock stay-open hinge'
    },
    dimensions: '38 cm × 30 cm × 26 cm each (15" × 11.8" × 10.2")',
    materials: 'Heavy-duty virgin polypropylene (recyclable #5), neodymium magnets',
    careInstructions: 'Wipe clean with soap and water.',
    reviews: [
      {
        id: 'rev-s4',
        author: 'Siddharth Rao',
        rating: 5,
        date: '2026-09-08',
        comment: 'We use these for our root vegetables and bulk snacks. Opening the front door without lifting the entire stack is pure genius.',
        verified: true,
        helpfulCount: 27
      }
    ]
  },
  {
    id: 'str-caddy-04',
    title: 'Heavy Magnetic Refrigerator Spice & Towel Caddy',
    subtitle: 'Industrial grade neodymium back supports 8kg without slipping',
    category: 'storage',
    categoryLabel: 'Home Storage',
    price: 38,
    rating: 4.9,
    reviewCount: 122,
    inStock: true,
    stockCount: 26,
    tag: 'Space Saver',
    image: '/src/assets/images/hero_modern_home_haven_1793774872233.jpg',
    description: 'Reclaim unused dead space along the side of your refrigerator or metal pantry cabinet. Features 2 deep shelving tiers for daily cooking oils and spice grinders, plus a solid natural wood towel bar and 4 movable utensil hooks.',
    features: [
      'Full-sheet rare-earth rubberized magnet holds up to 8 kg (17.6 lbs)',
      '2 tiered deep baskets accommodate large olive oil and vinegar bottles',
      'Solid beechwood paper towel roll dowel with quick-load slot',
      '4 movable lower hooks for oven mitts, scissors, and bottle openers'
    ],
    specs: {
      'Magnetic Area': 'Full coverage 28 cm × 35 cm rubber-encased magnet',
      'Max Load': '8 kg (17.6 lbs) tested on painted appliance steel',
      'Finish': 'Matte powder-coated carbon steel'
    },
    dimensions: '30 cm wide × 40 cm tall × 11 cm deep (11.8" × 15.7" × 4.3")',
    materials: 'Heavy gauge powder-coated carbon steel, natural beech dowel, rubberized neodymium',
    careInstructions: 'Wipe clean with a damp microfiber cloth.',
    reviews: [
      {
        id: 'rev-s5',
        author: 'Megan Campbell',
        rating: 5,
        date: '2026-10-25',
        comment: 'Holds two huge Costco olive oil bottles, vinegar, salt cellar, and paper towels without budging a millimeter down the fridge.',
        verified: true,
        helpfulCount: 52
      }
    ]
  }
];

export const INITIAL_BUNDLES: BundleItem[] = [
  {
    id: 'bundle-home-harmony',
    title: 'The Home Harmony Reset Trio',
    subtitle: 'One flagship hero from Kitchen, Cleaning, and Storage',
    savingsPercentage: 22,
    price: 198,
    originalPrice: 255,
    image: '/src/assets/images/bundle_curated_home_kit_1793774874177.jpg',
    description: 'Our most celebrated collection. Includes the Japanese Precision Mandoline, the SonicScrub Power Wand, and the 8-Piece Modular Canister System. Everything needed to streamline food prep, deep sanitization, and pantry visual order.',
    products: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[4], INITIAL_PRODUCTS[8]]
  },
  {
    id: 'bundle-chef-prep',
    title: "The Chef's Mise En Place Kit",
    subtitle: 'Precision Mandoline + Waterproof Scale + Forged Garlic Press',
    savingsPercentage: 18,
    price: 128,
    originalPrice: 156,
    image: '/src/assets/images/product_kitchen_precision_prep_1793774872561.jpg',
    description: 'Elevate daily cooking precision. Slices in exact micrometric gauges, measures ingredients down to 0.1g, and crushes garlic cloves with 3.5× leveraged mechanical force.',
    products: [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[1], INITIAL_PRODUCTS[2]]
  },
  {
    id: 'bundle-clean-architecture',
    title: 'The Scandinavian Clean System',
    subtitle: 'SonicScrub Wand + Beechwood Sweeper + Amber Trio + Cellulose Set',
    savingsPercentage: 20,
    price: 146,
    originalPrice: 183,
    image: '/src/assets/images/product_cleaning_sonic_brush_1793774871982.jpg',
    description: 'Say goodbye to garish plastic cleaning bottles and sour sponges. An enduring set of high-performance natural materials and sonic deep-cleaning power.',
    products: [INITIAL_PRODUCTS[4], INITIAL_PRODUCTS[5], INITIAL_PRODUCTS[6], INITIAL_PRODUCTS[7]]
  },
  {
    id: 'bundle-pantry-flow',
    title: 'The Modular Pantry Optimization Kit',
    subtitle: '8-Piece Modular Canisters + 4-Pack Drawer Dividers + Magnetic Caddy',
    savingsPercentage: 20,
    price: 158,
    originalPrice: 198,
    image: '/src/assets/images/product_storage_modular_pantry_1793774873726.jpg',
    description: 'A complete structural overhaul for standard shelves, kitchen drawers, and refrigerator side space. Unlocks up to 40% more usable room.',
    products: [INITIAL_PRODUCTS[8], INITIAL_PRODUCTS[9], INITIAL_PRODUCTS[11]]
  }
];
