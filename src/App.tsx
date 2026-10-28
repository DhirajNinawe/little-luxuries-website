/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  ShoppingBag,
  Heart,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Star,
  Sparkles,
  Truck,
  Flame,
  ShieldCheck,
  Phone,
  Mail,
  Check,
  Plus,
  Minus,
  Gift,
  Clock,
  Leaf,
  ArrowRight,
  Share2,
  ExternalLink,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';

// Contact Information
const CONTACT_WHATSAPP = '8446123817';
const CONTACT_WHATSAPP_LINK = 'https://wa.me/918446123817';
const CONTACT_EMAIL = 'Saundaryagarkate@gmail.com';
const BRAND_LOGO = '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.00.58_PM_2cfd3d99.jpeg';

export interface Product {
  id: string;
  name: string;
  category: 'festive-sweets' | 'diyas' | 'floral' | 'hampers';
  categoryLabel: string;
  actualPrice: number;
  originalPrice: number; // Exactly double actual price (50% OFF)
  image: string;
  rating: number;
  reviewCount: number;
  badge?: string;
  shortDescription: string;
  fullDescription: string;
  waxType: string;
  burnTime: string;
  fragranceNotes: string;
  pieces: string;
  dimensions: string;
  inStock: boolean;
}

// Complete Product Catalog with corrected image mapping (verified visually)
export const PRODUCTS: Product[] = [
  {
    // Index 0 – image shows: Scalloped Gold Pressed Candle (white scalloped bowl, pink flowers, gold edges)
    id: 'scalloped-gold-pressed-candle',
    name: 'Scalloped Gold Pressed Candle',
    category: 'floral',
    categoryLabel: 'Floral Tin & Sculpted',
    actualPrice: 149,
    originalPrice: 298,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.17.26_PM_7b7f73ed.jpeg',
    rating: 5.0,
    reviewCount: 94,
    badge: 'Limited Festive Edition',
    shortDescription: 'White scalloped bowl candle with real pink pressed flowers, pearls, and gold-leaf edges.',
    fullDescription: 'An heirloom-quality artisanal piece. A scalloped floral bowl with hand-applied gold leaf edging, filled with porcelain-white soy wax and studded with real dried pink marguerite flowers, lustrous pearls, and gold bullion beads.',
    waxType: 'Double-Filtered Botanical Soy Wax',
    burnTime: '~24 Hours',
    fragranceNotes: 'French Vanilla, White Lotus & Sweet Freesia',
    pieces: '1 Large Urli Centerpiece',
    dimensions: '12 cm diameter x 4.5 cm depth',
    inStock: true,
  },
  {
    // Index 1 – image shows: Rose & Peony Pastel Duo (yellow + pink floral candles in gift box)
    id: 'rose-peony-pastel-duo',
    name: 'Rose & Peony Pastel Duo (Set of 2)',
    category: 'hampers',
    categoryLabel: 'Luxury Gift Hampers',
    actualPrice: 149,
    originalPrice: 298,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.12.52_PM_bbaf2bb7.jpeg',
    rating: 4.9,
    reviewCount: 88,
    badge: 'Gift Ready Packaging',
    shortDescription: 'Two sculpted floral candles (yellow and pink) nestled in an ivory gift box with ribbon & card.',
    fullDescription: 'Two statement sculpted flower candles in pastel buttercup yellow and baby blush pink, presented in an elegant ivory keepsake gift box with a customized Little Luxuries greeting card and soft shred cushion. Poured with silky botanical soy wax and delicate peony essence.',
    waxType: 'Silky Sculpting Soy Blend',
    burnTime: '~12 Hours per bloom',
    fragranceNotes: 'English Rose Garden, Lychee & Soft Cashmere',
    pieces: 'Set of 2 Sculpted Floral Candles in Gift Box',
    dimensions: '18 cm x 11 cm gift box',
    inStock: true,
  },
  {
    // Index 2 – image shows: Loose Sunflower Candles (6 colorful sunflowers on plate, no bowls)
    id: 'loose-sunflower-candles-6pc',
    name: 'Loose Sunflower Candles (Set of 6)',
    category: 'floral',
    categoryLabel: 'Sculpted Floral Blooms',
    actualPrice: 149,
    originalPrice: 298,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.12.13_PM_5_728c173b.jpeg',
    rating: 4.9,
    reviewCount: 96,
    badge: 'Popular Urli Floatables',
    shortDescription: 'Six colorful loose sunflower candles on a plate (without terracotta bowls) that float gracefully.',
    fullDescription: 'Six vibrant loose sunflower blossom candles in pastel pink, sunshine yellow, pearl white, royal lilac, bright orange, and ruby red. Meticulously hand-carved with textured crystal seed centers, these buoyant candles float smoothly in decorative water bowls or can be set along festive rangolis.',
    waxType: 'Buoyant High-Density Botanical Soy Wax',
    burnTime: '~7 Hours per candle',
    fragranceNotes: 'Sweet Orange, Neroli Blossom & Vanilla Sugar',
    pieces: 'Set of 6 Loose Sunflower Candles',
    dimensions: '6 cm diameter each',
    inStock: true,
  },
  {
    // Index 3 – image shows: Sunflower Candle in Terracotta Bowl (sunflower candles in terracotta bowls)
    id: 'sunflower-candle-terracotta-bowl-6pc',
    name: 'Sunflower Candle in Terracotta Bowl (6 pieces)',
    category: 'floral',
    categoryLabel: 'Terracotta Floral Bowls',
    actualPrice: 129,
    originalPrice: 258,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.11.07_PM_4_51194570.jpeg',
    rating: 4.9,
    reviewCount: 118,
    badge: 'Warm Festive Charm',
    shortDescription: 'Terracotta bowls crowned with hand-carved miniature blooming sunflowers & foliage.',
    fullDescription: 'Brimming with sunshine and optimism! These handcrafted rustic terracotta bowls are poured with creamy organic soy wax and hand-decorated with detailed sunflower blossoms and miniature green wax foliage, filling any room with joyful floral warmth.',
    waxType: 'Organic Soy Wax in Rustic Clay',
    burnTime: '~14-16 Hours each',
    fragranceNotes: 'Sunlit Bergamot, Citrus Blossom & Wild Honey',
    pieces: 'Set of 6 Terracotta Bowls',
    dimensions: '7.5 cm diameter each',
    inStock: true,
  },
  {
    // Index 4 – image shows: Colour Mitti Diya (pastel-colored wax diyas poster)
    id: 'colour-mitti-diya-6pc',
    name: 'Colour Mitti Diya (6 pieces)',
    category: 'diyas',
    categoryLabel: 'Terracotta Diyas',
    actualPrice: 99,
    originalPrice: 198,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.11.41_PM_726791e8.jpeg',
    rating: 4.8,
    reviewCount: 153,
    badge: 'Traditional Touch Modern Vibes',
    shortDescription: 'Handcrafted terracotta clay diyas filled with pastel-colored soy wax and dried botanicals.',
    fullDescription: 'Traditional terracotta craft meets modern pastel aesthetics. Features a palette of soothing blush pink, lavender, marigold yellow, and ivory soy wax adorned with real dried botanical flower petals. Brings radiant festive vibes to any pooja thali or home corner.',
    waxType: 'Handmade Terracotta & Soy Wax',
    burnTime: '~6 Hours each',
    fragranceNotes: 'Fresh Rose Petals, Lavender Spikes & Sweet Almond',
    pieces: 'Set of 6 assorted colors',
    dimensions: '5.5 cm diameter each',
    inStock: true,
  },
  {
    // Index 5 – image shows: Laddu Candle (orange motichoor laddus on brass thali)
    id: 'laddu-candle-6pc',
    name: 'Laddu Candle (6 piece set)',
    category: 'festive-sweets',
    categoryLabel: 'Festive Sweets & Specials',
    actualPrice: 129,
    originalPrice: 258,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.10.38_PM_c3f29cd1.jpeg',
    rating: 4.9,
    reviewCount: 164,
    badge: 'Bestseller Festive Essential',
    shortDescription: 'Handcrafted orange motichoor laddu candles with dry rose petals & crushed pistachio garnish.',
    fullDescription: 'Indulge in the celebratory joy of Indian festivities with our ultra-realistic Motichoor Laddu candles. Handcrafted meticulously in a 6-piece brass thali presentation, each candle is infused with authentic royal saffron and cardamom fragrance, adorned with dried botanical rose petals and faux pistachios.',
    waxType: '100% Organic Soy & Vegetable Wax',
    burnTime: '~6-8 Hours per candle',
    fragranceNotes: 'Kesari Saffron, Crushed Cardamom & Warm Caramel',
    pieces: 'Set of 6 candles',
    dimensions: '4.5 cm diameter each',
    inStock: true,
  },
  {
    // Index 6 – image shows: Lotus Candle (pink lotus bloom on wooden tray)
    id: 'lotus-candle',
    name: 'Lotus Candle',
    category: 'floral',
    categoryLabel: 'Sculpted Floral Blooms',
    actualPrice: 79,
    originalPrice: 158,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.10.38_PM_1_99f45cab.jpeg',
    rating: 4.8,
    reviewCount: 98,
    badge: 'Spiritual Decor Favorite',
    shortDescription: 'Hand-sculpted sacred pink lotus bloom candle with tiered lotus petal base.',
    fullDescription: 'Carved with artistic grace, the Lotus Candle is a symbol of purity, prosperity, and divine radiance. Crafted from a velvety soy blend with a soothing natural jasmine and floral mist fragrance, this sculptural candle floats gently in urli bowls or shines atop wooden pedestals.',
    waxType: 'Pure Botanical Soy Blend',
    burnTime: '~10-12 Hours',
    fragranceNotes: 'Pink Lotus Nectar, Fresh Jasmine & Wild White Flora',
    pieces: '1 Sculptural Piece',
    dimensions: '9 cm diameter x 4.5 cm height',
    inStock: true,
  },
  {
    // Index 7 – image shows: Chakli Candles (spiral orange & golden candles in kraft box)
    id: 'chakli-candles-set-4',
    name: 'Chakli Candles (Set of 4)',
    category: 'festive-sweets',
    categoryLabel: 'Festive Sweets & Specials',
    actualPrice: 149,
    originalPrice: 298,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.10.39_PM__2_2a0162ad.jpeg',
    rating: 5.0,
    reviewCount: 89,
    badge: 'New Festive Launch',
    shortDescription: 'Artisanal festive spiral chakli candles in golden and orange hues in a clear window gift box.',
    fullDescription: 'A delightful homage to festive delicacies! Our Chakli Candles feature intricate concentric spiral ridges in golden saffron and turmeric orange tones. Packaged lovingly in a clear-window kraft gift box with jute twine and Little Luxuries seal.',
    waxType: 'Hard-poured Textured Soy Wax',
    burnTime: '~8 Hours per candle',
    fragranceNotes: 'Cinnamon Bark, Sweet Sesame & Honeyed Amber',
    pieces: 'Set of 4 (2 Gold, 2 Terracotta Orange)',
    dimensions: '6.5 cm diameter each',
    inStock: true,
  },
  {
    // Index 8 – image shows: Rose Candle (Tin) (golden tin with crimson red roses and pearls)
    id: 'rose-candle-tin',
    name: 'Rose Candle (Tin)',
    category: 'floral',
    categoryLabel: 'Floral Tin & Sculpted',
    actualPrice: 179,
    originalPrice: 358,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.10.39_PM_1_aeb38bea.jpeg',
    rating: 5.0,
    reviewCount: 210,
    badge: 'Customer Choice Luxury',
    shortDescription: 'Golden bowl tin adorned with hand-carved crimson red roses, pearls & authentic Damask fragrance.',
    fullDescription: 'Our signature showpiece! Poured into an opulent brushed golden tin bowl, this candle features delicate hand-molded crimson red rosebuds, shimmering faux pearls, and crushed ruby potpourri. Infused with pure Damask Rose essential oil for a captivating scent.',
    waxType: '100% Premium Soy Wax',
    burnTime: '~28-32 Hours',
    fragranceNotes: 'Damask Rose, Velvet Peony & Creamy Cashmere',
    pieces: '1 Deluxe Tin with Double Wick',
    dimensions: '10 cm diameter x 5 cm height',
    inStock: true,
  },
  {
    // Index 9 – image shows: Simple Mitti Diya (white wax in terracotta bowls with pearl beads)
    id: 'simple-mitti-diya-6pc',
    name: 'Simple Mitti Diya (6 pieces)',
    category: 'diyas',
    categoryLabel: 'Terracotta Diyas',
    actualPrice: 79,
    originalPrice: 158,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.10.39_PM_9215aa94.jpeg',
    rating: 4.9,
    reviewCount: 142,
    badge: 'Minimal Design Timeless Beauty',
    shortDescription: 'Classic handcrafted terracotta clay diyas filled with pure white soy wax and golden pearls.',
    fullDescription: 'Celebrate timeless traditions with our artisanal Simple Mitti Diyas. Hand-poured using clean-burning, smoke-free white soy wax into earthen clay pots, each diya is topped with delicate miniature golden and pearlescent beads for a touch of contemporary luxury.',
    waxType: 'Natural Soy Wax in Earthen Clay',
    burnTime: '~5-6 Hours per diya',
    fragranceNotes: 'Warm Sandalwood & Sacred Camphor Blossom',
    pieces: 'Box of 6 pieces',
    dimensions: '5 cm diameter each',
    inStock: true,
  },
  {
    // Index 10 – image shows: Festive Royal Hamper (large red net gift basket)
    id: 'festive-royal-hamper',
    name: 'Festive Royal Hamper',
    category: 'hampers',
    categoryLabel: 'Luxury Gift Hampers',
    actualPrice: 799,
    originalPrice: 1598,
    image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.18.27_PM_0a499587.jpeg',
    rating: 5.0,
    reviewCount: 124,
    badge: 'Ultra Luxury Hamper',
    shortDescription: 'Crocheted hamper basket in red net packaging with Vanilla Bloom candle, dry fruits & chocolates.',
    fullDescription: 'The ultimate gesture of warmth and grandeur! An artisan hand-crocheted red-and-ivory basket enveloped in ceremonial red festive netting with pom-pom finish. Contains a glass jar Vanilla Bloom Little Luxuries candle with satin ribbon, gourmet Badam jar, crunchy Kaju jar, Swiss Lindt chocolate bar, and Ferrero Rocher pralines.',
    waxType: 'Glass Jar Soy Candle + Dry Fruits + Gourmet Sweets',
    burnTime: '~40 Hours (Candle)',
    fragranceNotes: 'Madagascar Vanilla Bean & Tahitian Coconut Cream',
    pieces: 'Complete Royal Hamper Basket Set',
    dimensions: '26 cm x 24 cm x 30 cm height',
    inStock: true,
  },
  {
    id: 'heart-rose-candle-single',
    name: 'Heart Rose Candle (Single Piece)',
    category: 'floral',
    categoryLabel: 'Love & Gifting',
    actualPrice: 50,
    originalPrice: 100,
    image: '/WhatsApp Image 2026-10-28 at 9.27.12 PM.jpeg',
    rating: 5.0,
    reviewCount: 0,
    shortDescription: 'Beautiful handcrafted heart-shaped red rose candle.',
    fullDescription: 'Intricately detailed red rose petals formed into a beautiful heart shape. Perfect for gifting and special occasions.',
    waxType: 'Soy Wax',
    burnTime: '2 Hours',
    fragranceNotes: 'Classic Rose',
    pieces: '1',
    dimensions: 'Small',
    inStock: true,
  },
  {
    id: 'handcrafted-gujiya-candle-single',
    name: 'Handcrafted Gujiya Candle (Single Piece)',
    category: 'festive-sweets',
    categoryLabel: 'Festive Special',
    actualPrice: 25,
    originalPrice: 50,
    image: '/WhatsApp Image 2026-10-28 at 9.27.45 PM.jpeg',
    rating: 5.0,
    reviewCount: 0,
    shortDescription: 'Traditional Indian sweet gujiya shaped handcrafted candle.',
    fullDescription: 'Bring the festive spirit home with this hyper-realistic gujiya shaped candle. Looks just like the real traditional sweet!',
    waxType: 'Natural Wax Blend',
    burnTime: '1.5 Hours',
    fragranceNotes: 'Warm Sweet Notes',
    pieces: '1',
    dimensions: 'Small',
    inStock: true,
  },
];

export interface CartItem {
  product: Product;
  quantity: number;
}

export default function App() {
  // Navigation & Category states
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  // Cart & Wishlist state
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalQuantity, setModalQuantity] = useState<number>(1);

  // Order confirmation state
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [orderConfirmed, setOrderConfirmed] = useState<boolean>(false);
  const [lastOrderId, setLastOrderId] = useState<string>('');

  // Hero carousel state
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState<boolean>(false);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const heroSlides = useMemo(
    () => [
      {
        id: 1,
        title: 'Light Up Every Celebration with Handcrafted Luxury',
        subtitle: 'Authentic Motichoor Laddu & Terracotta Mitti Diyas',
        badge: 'Festive Season Grand Sale',
        discount: 'Flat 50% OFF All Products',
        image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.10.38_PM_c3f29cd1.jpeg',
        ctaText: 'Shop Festive Diyas',
        categoryTarget: 'festive-sweets',
      },
      {
        id: 2,
        title: 'Botanical Fragrance Infused with Real Petals & Gold',
        subtitle: 'Sculpted Lotus, Damask Rose Tins & Scalloped Urli Bowls',
        badge: '100% Organic Soy Wax',
        discount: 'Handcrafted in India',
        image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.10.39_PM_1_aeb38bea.jpeg',
        ctaText: 'Explore Floral Tins',
        categoryTarget: 'floral',
      },
      {
        id: 3,
        title: 'Exquisite Curated Hampers for Unforgettable Gifting',
        subtitle: 'Vanilla Bloom Glass Jars, Premium Dry Fruits & Lindt Chocolates',
        badge: 'Luxury Gift Collection',
        discount: 'Direct Artisan Pricing · 50% OFF',
        image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.10.39_PM_9215aa94.jpeg',
        ctaText: 'View Gift Hampers',
        categoryTarget: 'hampers',
      },
      {
        id: 4,
        title: 'Playful Festive Confections in Pure Soy Candle Light',
        subtitle: 'Hand-Poured Chakli Spirals & Terracotta Sunflower Bowls',
        badge: 'Handmade In Small Batches',
        discount: 'Limited Festive Stock Available',
        image: '/assets/aistudio/WhatsApp_Image_2026-10-28_at_9.10.39_PM__2_2a0162ad.jpeg',
        ctaText: 'Discover Sweets & Snacks',
        categoryTarget: 'festive-sweets',
      },
    ],
    []
  );

  // Auto-rolling banner carousel
  useEffect(() => {
    if (isCarouselHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isCarouselHovered, heroSlides.length]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProduct(null);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.fragranceNotes.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Similar products for modal
  const similarProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return PRODUCTS.filter((p) => p.id !== selectedProduct.id);
  }, [selectedProduct]);

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.actualPrice * item.quantity, 0);
  }, [cart]);

  const cartOriginalTotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.originalPrice * item.quantity, 0);
  }, [cart]);

  const cartTotalSavings = cartOriginalTotal - cartSubtotal;
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Cart actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.product.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    setToastMessage(`Added ${quantity}x "${product.name}" to your bag ✨`);
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    setToastMessage('Item removed from cart');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        setToastMessage('Removed from wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        setToastMessage('Added to your luxury wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  // WhatsApp Order Generator
  const generateWhatsAppMessage = () => {
    if (cart.length === 0) {
      return `Hi Saundarya! I am interested in Little Luxuries candles. Could you please share more details?`;
    }

    let itemsList = cart
      .map(
        (item, index) =>
          `${index + 1}. *${item.product.name}* x ${item.quantity} = ₹${
            item.product.actualPrice * item.quantity
          }`
      )
      .join('\n');

    let msg = `✨ *NEW ORDER INQUIRY - LITTLE LUXURIES* ✨\n\n`;
    msg += `Hello! I would like to place an order for the following items:\n\n`;
    msg += `${itemsList}\n\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *Subtotal:* ₹${cartSubtotal}\n`;
    msg += `🎉 *Festive Savings (50% OFF):* ₹${cartTotalSavings}\n`;
    msg += `⭐ *Total Payable:* ₹${cartSubtotal}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (customerName) msg += `👤 *Customer Name:* ${customerName}\n`;
    if (customerPhone) msg += `📞 *Phone:* ${customerPhone}\n`;
    if (customerAddress) msg += `📍 *Delivery Address:* ${customerAddress}\n\n`;

    msg += `Please confirm availability and share payment details. Thank you!`;
    return encodeURIComponent(msg);
  };

  const handleCheckoutViaWhatsApp = () => {
    const encoded = generateWhatsAppMessage();
    const url = `https://wa.me/91${CONTACT_WHATSAPP}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCompleteOrderSimulation = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const generatedId = 'LL-' + Math.floor(100000 + Math.random() * 900000);
    setLastOrderId(generatedId);
    setOrderConfirmed(true);
    setCart([]);
  };

  const openProductModal = (product: Product) => {
    setSelectedProduct(product);
    setModalQuantity(1);
  };

  return (
    <div className="min-h-screen bg-[#FFFDFB] text-[#3B2C2C] flex flex-col font-sans selection:bg-[#FCE7EC] selection:text-[#902A46]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-full bg-[#2C1820]/95 text-[#FFF5F7] shadow-xl text-sm font-medium flex items-center gap-2.5 backdrop-blur-md border border-[#D4A056]/40 transition-all duration-300">
          <Sparkles className="w-4 h-4 text-[#E6B87D] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="bg-gradient-to-r from-[#902A46] via-[#A83756] to-[#902A46] text-[#FFF4F6] text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 border-b border-[#D4A056]/30">
        <Sparkles className="w-3.5 h-3.5 text-[#FCE7B3] animate-pulse" />
        <span>
          <strong className="font-semibold text-[#FCE7B3]">FESTIVE EXTRAVAGANZA:</strong>{' '}
          Flat 50% OFF Applied Storewide
        </span>
        <span className="hidden sm:inline text-rose-200">·</span>
        <span className="hidden sm:inline font-mono tracking-wider text-[#FCE7B3]">Code: LUXE50</span>
      </div>

      {/* 2. TOP BAR CONTRACT (Strict 3 Zones) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#F0D5C3]/60 transition-shadow duration-300 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark & Official Emblem */}
          <a
            href="/"
            className="flex items-center gap-3.5 group whitespace-nowrap shrink-0"
            aria-label="Little Luxuries Home"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4A056]/80 p-0.5 bg-gradient-to-br from-[#FFF5F7] to-[#FCE7EC] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img
                src={BRAND_LOGO}
                alt="Little Luxuries Emblem"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-tight text-[#3B1F2B] group-hover:text-[#902A46] transition-colors">
                Little Luxuries
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase font-medium text-[#B87A42]">
                Artisanal Scented Candles
              </span>
            </div>
          </a>

          {/* Zone 2: 4-5 Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5B434B]">
            <button
              onClick={() => {
                setActiveCategory('all');
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#902A46] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all' ? 'text-[#902A46] font-semibold' : ''
              }`}
            >
              All Creations
            </button>
            <button
              onClick={() => {
                setActiveCategory('festive-sweets');
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#902A46] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'festive-sweets' ? 'text-[#902A46] font-semibold' : ''
              }`}
            >
              Festive Sweets
            </button>
            <button
              onClick={() => {
                setActiveCategory('diyas');
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#902A46] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'diyas' ? 'text-[#902A46] font-semibold' : ''
              }`}
            >
              Terracotta Diyas
            </button>
            <button
              onClick={() => {
                setActiveCategory('floral');
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#902A46] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'floral' ? 'text-[#902A46] font-semibold' : ''
              }`}
            >
              Sculpted Floral Tins
            </button>
            <button
              onClick={() => {
                setActiveCategory('hampers');
                document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-[#902A46] transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'hampers' ? 'text-[#902A46] font-semibold' : ''
              }`}
            >
              Luxury Hampers
            </button>
          </nav>

          {/* Zone 3: Primary Action & Interactive Affordances */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Search Input Toggle */}
            <div className="relative">
              {isSearchOpen ? (
                <div className="flex items-center bg-[#FDF5F2] border border-[#EAC8B5] rounded-full px-3 py-1.5 shadow-inner">
                  <Search className="w-4 h-4 text-[#902A46] mr-2 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search candles, diyas, fragrance..."
                    className="bg-transparent text-xs text-[#3B2C2C] placeholder-[#9C7F87] focus:outline-hidden w-36 sm:w-48"
                    autoFocus
                  />
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="text-[#9C7F87] hover:text-[#3B2C2C] ml-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  aria-label="Search Collection"
                  className="p-2.5 rounded-full text-[#5B434B] hover:text-[#902A46] hover:bg-[#FDF3F5] transition-colors cursor-pointer"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              className="relative p-2.5 rounded-full text-[#5B434B] hover:text-[#902A46] hover:bg-[#FDF3F5] transition-colors cursor-pointer"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute 1 top-1 right-1 w-4 h-4 rounded-full bg-[#902A46] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart Drawer"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#902A46] to-[#781B34] text-white hover:from-[#7D2039] hover:to-[#67142A] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer whitespace-nowrap"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#FCE7B3]" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D4A056] text-[#3B1F2B] text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {totalCartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold tracking-wide hidden sm:inline">Bag</span>
              <span className="text-xs font-bold font-mono text-[#FCE7B3] border-l border-white/20 pl-2">
                ₹{cartSubtotal}
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 3. HERO SECTION: AUTO-ROLLING / SLIDING IMAGE CAROUSEL BANNER */}
        <section
          className="relative bg-gradient-to-b from-[#FFF5F7] via-[#FFF9F6] to-[#FFFDFB] overflow-hidden border-b border-[#F0D5C3]/40"
          onMouseEnter={() => setIsCarouselHovered(true)}
          onMouseLeave={() => setIsCarouselHovered(false)}
        >
          {/* Subtle gold luxury background glow accents */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FCE7EC]/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#FBEED7]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E9CBBB]/60 bg-[#2A161E]">
              {/* Carousel Track */}
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {heroSlides.map((slide, index) => (
                  <div key={slide.id} className="min-w-full relative flex flex-col lg:flex-row items-stretch">
                    {/* Content Column */}
                    <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 z-10 flex flex-col justify-between bg-gradient-to-br from-[#2D1620] via-[#381B27] to-[#1F0E16] text-[#FFF5F7]">
                      <div>
                        {/* Slide Badges */}
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wide bg-[#D4A056]/20 text-[#F5CF96] border border-[#D4A056]/40">
                            <Sparkles className="w-3 h-3 text-[#F5CF96]" />
                            {slide.badge}
                          </span>
                          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#902A46] text-[#FFE7ED] border border-rose-300/30">
                            {slide.discount}
                          </span>
                        </div>

                        {/* Title */}
                        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4 text-balance">
                          {slide.title}
                        </h1>

                        <p className="text-sm sm:text-base text-[#E2CCD2] font-light leading-relaxed mb-8 max-w-xl">
                          {slide.subtitle}. Handcrafted with 100% natural organic soy wax, pure therapeutic
                          essential oils, and lead-free cotton wicks for a soot-free sacred luminescence.
                        </p>
                      </div>

                      {/* CTA & Trust Strip */}
                      <div>
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                          <button
                            onClick={() => {
                              setActiveCategory(slide.categoryTarget);
                              document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#D4A056] to-[#B87A42] text-[#2C1820] font-semibold text-sm shadow-lg hover:from-[#E5B56F] hover:to-[#C98B53] transition-all duration-200 flex items-center gap-2 group cursor-pointer"
                          >
                            <span>{slide.ctaText}</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </button>

                          <a
                            href={`https://wa.me/91${CONTACT_WHATSAPP}?text=${encodeURIComponent(
                              `Hi Saundarya! I saw the "${slide.title}" on Little Luxuries and would like to order.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-sm font-medium border border-white/20 transition-colors flex items-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4 text-emerald-400" />
                            <span>WhatsApp Order</span>
                          </a>
                        </div>

                        {/* Micro Trust Indicators */}
                        <div className="flex items-center gap-6 text-xs text-[#C8B0B8] border-t border-white/10 pt-4">
                          <div className="flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5 text-[#F5CF96]" />
                            <span>Pan-India Delivery</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
                            <span>100% Soy Wax</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#F5CF96]" />
                            <span>Direct Artisan Made</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Image Column */}
                    <div className="lg:w-1/2 relative min-h-[300px] sm:min-h-[380px] lg:min-h-[480px] bg-[#1A0C13]">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#2D1620] lg:via-transparent lg:to-transparent" />
                      
                      {/* Floating Product Highlight Tag */}
                      <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-2xl border border-white/20 text-xs flex items-center gap-2">
                        <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
                        <div>
                          <p className="font-semibold text-white">Little Luxuries Artisan Edition</p>
                          <p className="text-[10px] text-rose-200">Starting at ₹79 · 50% OFF</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Left / Right Arrows */}
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
                }
                aria-label="Previous Slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/30 z-20"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() =>
                  setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
                }
                aria-label="Next Slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer border border-white/30 z-20"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Carousel Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-xs border border-white/10">
                {heroSlides.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setCurrentSlide(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === dotIdx ? 'w-6 bg-[#D4A056]' : 'w-2 bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 4. VALUE PROPOSITION STRIP */}
        <section className="border-b border-[#F0D5C3]/60 bg-white py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FFF0F3] border border-[#FAD2DC] flex items-center justify-center shrink-0">
                <Truck className="w-5 h-5 text-[#902A46]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#3B1F2B]">Pan-India Delivery</p>
                <p className="text-[11px] text-[#7A6068]">Delivery details confirmed at checkout</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FFF8EB] border border-[#FBE3B8] flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#B87A42]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#3B1F2B]">50% Festive Discount</p>
                <p className="text-[11px] text-[#7A6068]">Direct studio artisan pricing</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#F2FBF6] border border-[#C6EDD8] flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#3B1F2B]">100% Pure Soy Wax</p>
                <p className="text-[11px] text-[#7A6068]">Non-toxic & smoke-free wicks</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-full bg-[#FFF0F3] border border-[#FAD2DC] flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-[#902A46]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#3B1F2B]">Direct WhatsApp Support</p>
                <p className="text-[11px] text-[#7A6068]">Instant order help: 8446123817</p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. PRODUCT CATALOG & GRID (Amazon/Flipkart Style with 50% discount look) */}
        <section id="catalog-section" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#B87A42] bg-[#FDF1E6] px-3 py-1 rounded-full border border-[#F3DAC5]">
              Handcrafted With Love
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#3B1F2B] mt-3 mb-3">
              Festive Candle & Diya Collection
            </h2>
            <p className="text-sm text-[#6C535C] leading-relaxed">
              Every creation is individually sculpted and poured using organic wax and therapeutic oils.
              Enjoy our limited-edition 50% festival discount.
            </p>

            {/* Category Filter Pills (Functional Buttons) */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {[
                { id: 'all', label: 'All Collections' },
                { id: 'festive-sweets', label: 'Festive Sweets' },
                { id: 'diyas', label: 'Terracotta Diyas' },
                { id: 'floral', label: 'Sculpted Floral Tins' },
                { id: 'hampers', label: 'Luxury Hampers' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-[#902A46] text-white shadow-md'
                      : 'bg-white text-[#5B434B] border border-[#E9CBBB] hover:border-[#902A46] hover:text-[#902A46]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active filter count / search indicator */}
          <div className="flex items-center justify-between text-xs text-[#7A6068] mb-6 border-b border-[#F0D5C3]/60 pb-3">
            <p>
              Showing <span className="font-bold text-[#3B1F2B]">{filteredProducts.length}</span> luxury handcrafted items
              {searchQuery && (
                <span>
                  {' '}
                  matching &quot;<strong>{searchQuery}</strong>&quot;
                </span>
              )}
            </p>
          </div>

          {/* Clean Amazon/Flipkart Style Product Card Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#F0D5C3]/60 p-8">
              <Flame className="w-12 h-12 text-[#D4A056] mx-auto mb-3 opacity-60" />
              <h3 className="font-display text-lg font-bold text-[#3B1F2B]">No candles matched your search</h3>
              <p className="text-sm text-[#7A6068] mt-1 mb-4">Try searching with other terms or clear your filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                }}
                className="px-4 py-2 bg-[#902A46] text-white rounded-full text-xs font-semibold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id);
                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-[#F0D5C3]/70 hover:border-[#D4A056] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative"
                  >
                    {/* Image Container with Badges & Wishlist Trigger */}
                    <div
                      onClick={() => openProductModal(product)}
                      className="relative w-full aspect-square bg-[#FAF5F2] overflow-hidden cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* 50% OFF Pill (Marketing Requirement) */}
                      <div className="absolute top-3 left-3 bg-[#902A46] text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-sm border border-rose-300/30">
                        50% OFF
                      </div>

                      {/* Optional Special Badge */}
                      {product.badge && (
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-[#FFF0F3] text-[10px] font-medium px-2 py-0.5 rounded-sm">
                          {product.badge}
                        </div>
                      )}

                      {/* Wishlist Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWishlist(product.id);
                        }}
                        aria-label={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-[#902A46] shadow-md flex items-center justify-center transition-transform active:scale-90 cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            isWishlisted ? 'fill-[#902A46] text-[#902A46]' : 'text-[#5B434B]'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Product Details Section */}
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Rating & Review Count (Amazon/Flipkart Style) */}
                        <div className="flex items-center gap-1.5 text-xs text-[#B87A42] mb-1.5">
                          <div className="flex items-center bg-[#FFF8EB] px-1.5 py-0.5 rounded border border-[#FBE3B8] font-bold text-[11px] text-[#A6682A]">
                            <span>{product.rating.toFixed(1)}</span>
                            <Star className="w-3 h-3 fill-[#A6682A] ml-1" />
                          </div>
                          <span className="text-[#8C7079] text-[11px]">({product.reviewCount} verified ratings)</span>
                        </div>

                        {/* Title */}
                        <h3
                          onClick={() => openProductModal(product)}
                          className="font-display font-bold text-base sm:text-lg text-[#3B1F2B] hover:text-[#902A46] cursor-pointer line-clamp-1 transition-colors"
                          title={product.name}
                        >
                          {product.name}
                        </h3>

                        {/* Short Description */}
                        <p className="text-xs text-[#7A6068] line-clamp-2 mt-1 mb-3">
                          {product.shortDescription}
                        </p>
                      </div>

                      {/* Pricing Section (Strict 50% discount look requirement) */}
                      <div className="pt-3 border-t border-[#F5E6DC]/80">
                        <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                          {/* Prominent Actual Price */}
                          <span className="text-xl sm:text-2xl font-bold text-[#3B1F2B] font-mono tabular-nums">
                            ₹{product.actualPrice}
                          </span>

                          {/* Calculated Strikethrough Original Price (2x) */}
                          <span className="text-xs sm:text-sm text-[#9C7F87] line-through font-mono">
                            M.R.P: ₹{product.originalPrice}
                          </span>

                          {/* Discount percentage tag */}
                          <span className="text-xs font-bold text-[#902A46]">
                            (50% off)
                          </span>
                        </div>

                        {/* Stock indicator */}
                        <div className="flex items-center mb-4">
                          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                            In Stock
                          </span>
                        </div>

                        {/* Action Buttons: Add to Cart & Quick View */}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => addToCart(product, 1)}
                            className="w-full py-2 px-2 rounded-lg bg-gradient-to-r from-[#902A46] to-[#781B34] hover:from-[#7D2039] hover:to-[#67142A] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5 text-[#FCE7B3]" />
                            <span>Add to Cart</span>
                          </button>

                          <button
                            onClick={() => openProductModal(product)}
                            className="w-full py-2 px-2 rounded-lg bg-[#FFF5F7] hover:bg-[#FCE7EC] text-[#902A46] border border-[#FAD2DC] text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <span>Quick View</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 6. BRAND STORY & ARTISANAL CRAFTSMANSHIP SPOTLIGHT */}
        <section className="bg-gradient-to-b from-[#FFFDFB] to-[#FFF5F7] py-16 border-t border-[#F0D5C3]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl border border-[#E9CBBB]/80 p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center text-center">
                <div className="w-40 h-40 rounded-full border-4 border-[#D4A056] p-1 bg-white shadow-xl overflow-hidden mb-6">
                  <img
                    src={BRAND_LOGO}
                    alt="Little Luxuries Brand Stamp"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#3B1F2B]">Little Luxuries</h3>
                <p className="text-xs uppercase tracking-widest text-[#B87A42] font-semibold mt-1">
                  Handcrafted with Purity & Grace
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-[#7A6068]">
                  <span>Founder: Saundarya Garkate</span>
                  <span>·</span>
                  <span>Direct Studio Orders</span>
                </div>
              </div>

              <div className="lg:col-span-7">
                <span className="text-xs font-bold text-[#902A46] tracking-widest uppercase bg-[#FFF0F3] px-3 py-1 rounded-full border border-[#FAD2DC]">
                  Our Philosophy
                </span>
                <h2 className="font-display text-3xl font-bold text-[#3B1F2B] mt-3 mb-4">
                  Where Sacred Traditions Meet Modern Opulence
                </h2>
                <p className="text-sm text-[#5B434B] leading-relaxed mb-6">
                  At <strong>Little Luxuries</strong>, every candle and diya is more than a decorative piece — it is an
                  artisanal sculpture created to evoke comfort, festive memory, and warmth. We pour each candle in
                  micro-batches using 100% natural soy wax, authentic essential oil essences, and pure cotton wicks, ensuring a
                  clean burn with no chemical soot or synthetic paraffin.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-[#F5E6DC] pt-6">
                  <div>
                    <h4 className="font-bold text-sm text-[#3B1F2B] flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-4 h-4 text-[#D4A056]" />
                      Handmade in India
                    </h4>
                    <p className="text-xs text-[#7A6068]">Supporting local clay artisans and traditional diya craft.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#3B1F2B] flex items-center gap-1.5 mb-1">
                      <Leaf className="w-4 h-4 text-emerald-600" />
                      Soy & Botanical Wax
                    </h4>
                    <p className="text-xs text-[#7A6068]">Eco-friendly, renewable, and safe for children and pets.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#3B1F2B] flex items-center gap-1.5 mb-1">
                      <Gift className="w-4 h-4 text-[#902A46]" />
                      Custom Gifting
                    </h4>
                    <p className="text-xs text-[#7A6068]">Corporate hampers, return gifts & bespoke wedding favors.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* 8. PRODUCT DETAIL POPUP MODAL (Strict Requirement) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 md:p-6 animate-in fade-in duration-200">
          <div
            className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-[#E9CBBB] overflow-hidden my-auto max-h-[92vh] flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#3B2C2C] shadow-md flex items-center justify-center border border-[#F0D5C3] transition-transform active:scale-90 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scrollable Container */}
            <div className="overflow-y-auto flex-1 p-6 sm:p-8">
              {/* Top Split: Image & Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Enlarged Image Container */}
                <div className="relative rounded-2xl overflow-hidden bg-[#FAF5F2] border border-[#F0D5C3]/80 aspect-square shadow-inner">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-[#902A46] text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
                    50% FESTIVE DISCOUNT
                  </div>
                  {selectedProduct.badge && (
                    <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xs text-white text-xs font-medium px-2.5 py-1 rounded">
                      {selectedProduct.badge}
                    </div>
                  )}
                </div>

                {/* Details Column */}
                <div className="flex flex-col">
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs uppercase tracking-widest text-[#B87A42] font-semibold">
                      {selectedProduct.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 bg-[#FFF8EB] border border-[#FBE3B8] px-2 py-0.5 rounded text-xs font-bold text-[#A6682A]">
                      <Star className="w-3.5 h-3.5 fill-[#A6682A]" />
                      <span>{selectedProduct.rating.toFixed(1)}</span>
                      <span className="text-[#8C7079] font-normal">({selectedProduct.reviewCount})</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#3B1F2B] mb-3">
                    {selectedProduct.name}
                  </h2>

                  {/* Pricing Breakdown (50% Off Look) */}
                  <div className="bg-[#FFF8FA] border border-[#FAD2DC] rounded-xl p-3.5 mb-5">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-extrabold text-[#3B1F2B] font-mono tabular-nums">
                        ₹{selectedProduct.actualPrice}
                      </span>
                      <span className="text-base text-[#9C7F87] line-through font-mono">
                        M.R.P: ₹{selectedProduct.originalPrice}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#902A46] text-white">
                        50% OFF
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#7A6068]">
                      <span className="text-[#902A46] font-medium">You Save ₹{selectedProduct.originalPrice - selectedProduct.actualPrice}</span>
                      <span>·</span>
                      <span>Inclusive of all taxes</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#5B434B] leading-relaxed mb-5">
                    {selectedProduct.fullDescription}
                  </p>

                  {/* Key Specifications Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs text-[#5B434B] bg-[#FFFDFB] border border-[#F0D5C3]/70 rounded-xl p-3.5 mb-6">
                    <div>
                      <span className="text-[#9C7F87] block text-[11px]">Wax Composition:</span>
                      <strong className="text-[#3B1F2B]">{selectedProduct.waxType}</strong>
                    </div>
                    <div>
                      <span className="text-[#9C7F87] block text-[11px]">Burn Duration:</span>
                      <strong className="text-[#3B1F2B]">{selectedProduct.burnTime}</strong>
                    </div>
                    <div>
                      <span className="text-[#9C7F87] block text-[11px]">Fragrance Profile:</span>
                      <strong className="text-[#3B1F2B]">{selectedProduct.fragranceNotes}</strong>
                    </div>
                    <div>
                      <span className="text-[#9C7F87] block text-[11px]">Set Contents:</span>
                      <strong className="text-[#3B1F2B]">{selectedProduct.pieces}</strong>
                    </div>
                  </div>

                  {/* Quantity & CTA Buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
                    {/* Quantity Stepper */}
                    <div className="flex items-center border border-[#E9CBBB] rounded-lg bg-[#FAF5F2] self-start sm:self-auto">
                      <button
                        onClick={() => setModalQuantity((q) => Math.max(1, q - 1))}
                        className="px-3 py-2 text-[#5B434B] hover:text-[#902A46] transition-colors cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 py-2 text-xs font-bold font-mono text-[#3B1F2B] min-w-[2rem] text-center">
                        {modalQuantity}
                      </span>
                      <button
                        onClick={() => setModalQuantity((q) => q + 1)}
                        className="px-3 py-2 text-[#5B434B] hover:text-[#902A46] transition-colors cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => {
                        addToCart(selectedProduct, modalQuantity);
                        setIsCartOpen(true);
                      }}
                      className="flex-1 py-3 px-5 rounded-xl bg-gradient-to-r from-[#902A46] to-[#781B34] hover:from-[#7D2039] hover:to-[#67142A] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#FCE7B3]" />
                      <span>Add {modalQuantity} to Cart · ₹{selectedProduct.actualPrice * modalQuantity}</span>
                    </button>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => toggleWishlist(selectedProduct.id)}
                      className={`p-3 rounded-xl border transition-colors flex items-center justify-center cursor-pointer ${
                        wishlist.includes(selectedProduct.id)
                          ? 'bg-[#FFF0F3] border-[#FAD2DC] text-[#902A46]'
                          : 'bg-white border-[#E9CBBB] text-[#5B434B] hover:text-[#902A46]'
                      }`}
                      aria-label="Toggle wishlist"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          wishlist.includes(selectedProduct.id) ? 'fill-[#902A46]' : ''
                        }`}
                      />
                    </button>
                  </div>

                  {/* Direct WhatsApp Quick Order */}
                  <a
                    href={`https://wa.me/91${CONTACT_WHATSAPP}?text=${encodeURIComponent(
                      `Hi Saundarya! I would like to order ${modalQuantity}x "${selectedProduct.name}" (Actual Price ₹${
                        selectedProduct.actualPrice * modalQuantity
                      }) from Little Luxuries.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] border border-[#25D366]/40 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    <span>Instant Order on WhatsApp (8446123817)</span>
                  </a>
                </div>
              </div>

              {/* Bottom: Similar Products — Flipkart/Amazon horizontal scroll row */}
              <div className="mt-10 pt-8 border-t border-[#F0D5C3]/80">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display text-xl font-bold text-[#3B1F2B]">Similar Handcrafted Candles</h3>
                  <span className="text-xs text-[#8C7079]">Scroll to explore →</span>
                </div>

                <div className="flex overflow-x-auto gap-4 py-4 no-scrollbar scroll-smooth">
                  {similarProducts.map((simProduct) => (
                    <div
                      key={simProduct.id}
                      onClick={() => {
                        setSelectedProduct(simProduct);
                        setModalQuantity(1);
                      }}
                      className="shrink-0 w-36 bg-[#FFFDFB] rounded-xl border border-[#F0D5C3] hover:border-[#D4A056] shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col overflow-hidden"
                    >
                      {/* Square thumbnail */}
                      <div className="relative w-full h-32 bg-[#FAF5F2] overflow-hidden">
                        <img
                          src={simProduct.image}
                          alt={simProduct.name}
                          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute top-1.5 left-1.5 bg-[#902A46] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                          50% OFF
                        </span>
                      </div>
                      {/* Text info */}
                      <div className="p-2.5 flex flex-col gap-1">
                        <h4 className="font-display font-semibold text-[11px] text-[#3B1F2B] line-clamp-2 leading-tight">
                          {simProduct.name}
                        </h4>
                        <div className="flex items-baseline gap-1.5 mt-0.5">
                          <span className="text-sm font-bold text-[#3B1F2B] font-mono">₹{simProduct.actualPrice}</span>
                          <span className="text-[10px] text-[#9C7F87] line-through font-mono">₹{simProduct.originalPrice}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 9. SLIDING CART DRAWER FROM THE RIGHT SIDE (Strict Requirement) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl border-l border-[#F0D5C3] flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-[#F0D5C3]/80 flex items-center justify-between bg-[#FFFDFB]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFF0F3] border border-[#FAD2DC] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-[#902A46]" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#3B1F2B]">Your Luxury Bag</h3>
                  <p className="text-[11px] text-[#7A6068]">
                    {totalCartCount} {totalCartCount === 1 ? 'item' : 'items'} in cart
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart drawer"
                className="p-2 rounded-full text-[#7A6068] hover:text-[#3B2C2C] hover:bg-[#FAF5F2] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 50% Savings Banner in Cart */}
            {cartTotalSavings > 0 && (
              <div className="bg-gradient-to-r from-[#FFF0F3] to-[#FCE7EC] px-6 py-2.5 border-b border-[#FAD2DC] flex items-center justify-between text-xs text-[#902A46] font-medium">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4A056]" />
                  <span>50% Festive Discount Applied!</span>
                </span>
                <span className="font-bold font-mono">You Save ₹{cartTotalSavings}</span>
              </div>
            )}

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#F5E6DC]/80">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-[#FAF5F2] border border-[#F0D5C3] flex items-center justify-center mx-auto mb-4 text-[#9C7F87]">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <h4 className="font-display text-base font-bold text-[#3B1F2B]">Your Bag is Empty</h4>
                  <p className="text-xs text-[#7A6068] mt-1 mb-6 max-w-xs mx-auto">
                    Explore our handcrafted scented candles and terracotta diyas with flat 50% festive discount!
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 bg-[#902A46] text-white rounded-full text-xs font-semibold shadow-md cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="py-4 flex gap-4 items-center">
                    {/* Item Image */}
                    <div
                      onClick={() => {
                        setSelectedProduct(item.product);
                        setIsCartOpen(false);
                      }}
                      className="w-20 h-20 rounded-xl overflow-hidden bg-[#FAF5F2] border border-[#F0D5C3] shrink-0 cursor-pointer"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Details & Controls */}
                    <div className="flex-1 min-w-0">
                      <h4
                        onClick={() => {
                          setSelectedProduct(item.product);
                          setIsCartOpen(false);
                        }}
                        className="font-display font-bold text-sm text-[#3B1F2B] hover:text-[#902A46] truncate cursor-pointer"
                      >
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#8C7079] mb-1.5">{item.product.pieces}</p>

                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-sm font-bold text-[#3B1F2B] font-mono">
                          ₹{item.product.actualPrice * item.quantity}
                        </span>
                        <span className="text-xs text-[#9C7F87] line-through font-mono">
                          ₹{item.product.originalPrice * item.quantity}
                        </span>
                      </div>

                      {/* Quantity Stepper & Remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-[#E9CBBB] rounded bg-[#FAF5F2]">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, -1)}
                            className="px-2 py-0.5 text-[#5B434B] hover:text-[#902A46] cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-0.5 text-xs font-mono font-bold text-[#3B1F2B]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, 1)}
                            className="px-2 py-0.5 text-[#5B434B] hover:text-[#902A46] cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[11px] text-[#A84964] hover:text-[#781B34] font-medium cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer & Checkout Module */}
            {cart.length > 0 && (
              <div className="border-t border-[#F0D5C3] p-6 bg-[#FFFDFB] space-y-4">
                {/* Delivery Customer Fields */}
                <div className="space-y-2 bg-[#FAF5F2] p-3 rounded-xl border border-[#E9CBBB]/70">
                  <p className="text-[11px] font-bold text-[#3B1F2B] uppercase tracking-wider">
                    Fast Delivery Details
                  </p>
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#E0C3B1] rounded focus:outline-hidden focus:border-[#902A46]"
                  />
                  <input
                    type="tel"
                    placeholder="Contact Phone Number"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#E0C3B1] rounded focus:outline-hidden focus:border-[#902A46]"
                  />
                  <input
                    type="text"
                    placeholder="Delivery City & Address"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 bg-white border border-[#E0C3B1] rounded focus:outline-hidden focus:border-[#902A46]"
                  />
                </div>

                {/* Subtotal breakdown */}
                <div className="space-y-1.5 text-xs text-[#5B434B]">
                  <div className="flex justify-between">
                    <span>Total MRP (Original):</span>
                    <span className="line-through font-mono">₹{cartOriginalTotal}</span>
                  </div>
                  <div className="flex justify-between text-[#902A46] font-medium">
                    <span>Festive Discount (50% OFF):</span>
                    <span className="font-mono">- ₹{cartTotalSavings}</span>
                  </div>
                  <div className="border-t border-[#F5E6DC] pt-2 flex justify-between text-base font-bold text-[#3B1F2B]">
                    <span>Total Amount Payable:</span>
                    <span className="font-mono text-xl text-[#902A46]">₹{cartSubtotal}</span>
                  </div>
                </div>

                {/* Checkout with WhatsApp Button (Direct & Seamless) */}
                <button
                  onClick={handleCheckoutViaWhatsApp}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#22be5b] hover:to-[#0f7a6e] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-white" />
                  <span>Order on WhatsApp (8446123817)</span>
                </button>

                {/* Alternative Quick Direct Checkout Simulation */}
                <button
                  onClick={handleCompleteOrderSimulation}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FFF0F3] hover:bg-[#FCE7EC] text-[#902A46] border border-[#FAD2DC] text-xs font-semibold transition-colors cursor-pointer"
                >
                  Confirm Order & Generate Invoice
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 10. WISHLIST MODAL */}
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl border-l border-[#F0D5C3] flex flex-col transform transition-transform duration-300 animate-in slide-in-from-right"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-5 border-b border-[#F0D5C3] flex items-center justify-between bg-[#FFFDFB]">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-[#902A46] fill-[#902A46]" />
                <h3 className="font-display text-lg font-bold text-[#3B1F2B]">Your Wishlist</h3>
              </div>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="p-2 text-[#7A6068] hover:text-[#3B2C2C] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {wishlist.length === 0 ? (
                <div className="text-center py-16 text-[#7A6068]">
                  <Heart className="w-12 h-12 mx-auto mb-3 opacity-30 text-[#902A46]" />
                  <p className="font-display font-semibold text-[#3B1F2B]">No items saved yet</p>
                  <p className="text-xs mt-1">Tap the heart icon on any candle card to save it here.</p>
                </div>
              ) : (
                wishlist.map((id) => {
                  const prod = PRODUCTS.find((p) => p.id === id);
                  if (!prod) return null;
                  return (
                    <div
                      key={prod.id}
                      className="flex items-center gap-4 bg-[#FFFDFB] p-3 rounded-xl border border-[#F0D5C3]"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-16 h-16 rounded-lg object-cover bg-[#FAF5F2]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-xs text-[#3B1F2B] truncate">{prod.name}</h4>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-sm font-bold font-mono">₹{prod.actualPrice}</span>
                          <span className="text-xs text-[#9C7F87] line-through font-mono">₹{prod.originalPrice}</span>
                        </div>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => {
                              addToCart(prod, 1);
                              setIsWishlistOpen(false);
                              setIsCartOpen(true);
                            }}
                            className="text-xs font-semibold text-[#902A46] hover:underline cursor-pointer"
                          >
                            Move to Bag
                          </button>
                          <button
                            onClick={() => toggleWishlist(prod.id)}
                            className="text-xs text-[#8C7079] hover:text-[#3B2C2C] cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* 11. ORDER CONFIRMATION MODAL */}
      {orderConfirmed && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-8 border border-[#E9CBBB] shadow-2xl text-center relative animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 border border-emerald-300">
              <Check className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B87A42]">Order Reserved</span>
            <h3 className="font-display text-2xl font-bold text-[#3B1F2B] mt-1 mb-2">Thank You for Your Order!</h3>
            <p className="text-sm text-[#5B434B] leading-relaxed mb-6">
              Your order <strong className="font-mono text-[#902A46]">#{lastOrderId}</strong> has been registered.
              Our team at Little Luxuries will verify your dispatch details and send the dispatch tracking link.
            </p>

            <div className="bg-[#FFF8FA] p-4 rounded-2xl border border-[#FAD2DC] text-xs text-left mb-6 space-y-1.5">
              <p>
                <strong>Delivery Type:</strong> To be confirmed
              </p>
              <p>
                <strong>Recipient Name:</strong> {customerName || 'Valued Patron'}
              </p>
              <p>
                <strong>Contact WhatsApp:</strong> +91 {CONTACT_WHATSAPP}
              </p>
              <p>
                <strong>Direct Email:</strong> {CONTACT_EMAIL}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/91${CONTACT_WHATSAPP}?text=${encodeURIComponent(
                  `Hi Saundarya! I placed Order #${lastOrderId} for Little Luxuries candles. Please confirm dispatch details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-xs font-semibold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Confirm on WhatsApp</span>
              </a>

              <button
                onClick={() => setOrderConfirmed(false)}
                className="py-3 px-5 rounded-xl bg-[#FAF5F2] hover:bg-[#F2E8E2] text-[#3B1F2B] text-xs font-semibold border border-[#E0C3B1]"
              >
                Continue Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. FLOATING ACTION BUTTONS (FAB) - STRICT REQUIREMENT */}
      {/* Sticky buttons at the bottom corner for direct contact:
          - WhatsApp: 8446123817
          - Email: Saundaryagarkate@gmail.com */}
      <aside aria-label="Quick Contact Assistance" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        {/* Email Floating Button */}
        <a
          href={`mailto:${CONTACT_EMAIL}?subject=Enquiry%20-%20Little%20Luxuries%20Candles&body=Hi%20Saundarya%2C%0A%0AI%20am%20interested%20in%20your%20handcrafted%20candles%20from%20Little%20Luxuries.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Email Little Luxuries at ${CONTACT_EMAIL}`}
          className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-gradient-to-br from-[#902A46] to-[#67142A] text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-[#D4A056]"
        >
          <Mail className="w-5 h-5 text-[#FCE7EC]" />
          
          {/* Tooltip on hover */}
          <span className="absolute right-15 bg-[#2C1820] text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-[#D4A056]/30">
            Email: {CONTACT_EMAIL}
          </span>
        </a>

        {/* WhatsApp Floating Button */}
        <a
          href={`https://wa.me/91${CONTACT_WHATSAPP}?text=Hi%20Saundarya!%20I%20would%20like%20to%20know%20more%20about%20Little%20Luxuries%20candles.`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Chat with Little Luxuries on WhatsApp: ${CONTACT_WHATSAPP}`}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-2xl hover:shadow-green-500/30 hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white"
        >
          <MessageCircle className="w-7 h-7 fill-white" />

          {/* Pulse ring */}
          <span className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-30 pointer-events-none" />

          {/* Tooltip on hover */}
          <span className="absolute right-16 bg-[#1A3326] text-white text-xs font-medium px-3.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity border border-emerald-400/40">
            WhatsApp: {CONTACT_WHATSAPP}
          </span>
        </a>
      </aside>

      {/* 13. LUXURY FOOTER */}
      <footer className="bg-[#26131B] text-[#FFF0F3] border-t border-[#D4A056]/30 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand Column */}
            <div className="md:col-span-1 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4A056] p-0.5 bg-white">
                  <img
                    src={BRAND_LOGO}
                    alt="Little Luxuries Logo"
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-display text-xl font-bold text-white">Little Luxuries</h4>
                  <p className="text-[10px] tracking-widest uppercase text-[#D4A056]">Artisanal Candles</p>
                </div>
              </div>
              <p className="text-xs text-[#D8BCC5] leading-relaxed">
                Handcrafted pure soy wax candles, artisanal festive terracotta diyas, and bespoke luxury gifting hampers
                designed to illuminate life&apos;s special moments.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="font-display text-sm font-bold text-[#FCE7B3] uppercase tracking-wider mb-4">
                Curated Collections
              </h5>
              <ul className="space-y-2.5 text-xs text-[#D8BCC5]">
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('festive-sweets');
                      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Motichoor Laddu & Chakli Candles
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('diyas');
                      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Terracotta Mitti Diyas
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('floral');
                      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Lotus & Rose Gold Tins
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setActiveCategory('hampers');
                      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Festive Royal Gift Hampers
                  </button>
                </li>
              </ul>
            </div>

            {/* Direct Contact Details (Strict User Requirement) */}
            <div>
              <h5 className="font-display text-sm font-bold text-[#FCE7B3] uppercase tracking-wider mb-4">
                Direct Contact & Orders
              </h5>
              <ul className="space-y-3 text-xs text-[#D8BCC5]">
                <li className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-[#25D366] shrink-0" />
                  <a
                    href={`https://wa.me/91${CONTACT_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white font-mono transition-colors"
                  >
                    WhatsApp: {CONTACT_WHATSAPP}
                  </a>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#E6B87D] shrink-0" />
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="hover:text-white break-all transition-colors"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#E6B87D] shrink-0 mt-0.5" />
                  <span>Pan-India Delivery</span>
                </li>
              </ul>
            </div>

            {/* Artisan Commitment */}
            <div>
              <h5 className="font-display text-sm font-bold text-[#FCE7B3] uppercase tracking-wider mb-4">
                Our Guarantee
              </h5>
              <p className="text-xs text-[#D8BCC5] leading-relaxed mb-3">
                All candles are hand-poured in small batches in India. 100% Paraffin-Free, non-toxic, and crafted with
                sustainable natural botanical soy wax.
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FCE7B3]">
                <ShieldCheck className="w-4 h-4 text-[#25D366]" />
                <span>Verified Handcrafted Quality</span>
              </div>
            </div>
          </div>

          {/* Copyright & Disclaimer */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#A88B95] gap-4">
            <p>© {new Date().getFullYear()} Little Luxuries. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>Handcrafted with</span>
              <Heart className="w-3.5 h-3.5 text-[#E69CB0] fill-[#E69CB0]" />
              <span>for festive celebrations</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
