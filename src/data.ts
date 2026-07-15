import { AddressWarehouse, TrendProduct, BlogGuide, InternationalOrder } from "./types";

export const WAREHOUSES: AddressWarehouse[] = [
  {
    id: "us-delaware",
    country: "US",
    title: "Amerika Birleşik Devletleri Deposu (Vergisiz Eyalet - Delaware)",
    fullName: "Harp Global - [Müşteri Adınız]",
    addressLine1: "16192 Coastal Highway",
    addressLine2: "Suite HP-8820-TR",
    city: "Lewes",
    state: "Delaware (DE)",
    zipCode: "19958",
    phone: "+1 (302) 504-4412",
    isTaxFree: true,
  },
  {
    id: "uk-london",
    country: "UK",
    title: "İngiltere Deposu (Londra Lojistik Merkezi)",
    fullName: "Harp Global Ltd - [Müşteri Adınız]",
    addressLine1: "Unit 4, Nucleus Industrial Estate",
    addressLine2: "Central Way, Suite HP-8820-TR",
    city: "London",
    state: "Greater London",
    zipCode: "HA9 0XQ",
    phone: "+44 20 8903 5522",
    isTaxFree: false,
  }
];

export const TREND_PRODUCTS: TrendProduct[] = [
  {
    id: "tp1",
    title: "Rhode Peptide Lip Tint - Toast",
    brand: "Rhode by Hailey Bieber",
    priceUSD: 24.00,
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
    store: "Sephora",
    category: "cosmetics",
  },
  {
    id: "tp2",
    title: "AirPods Max Silver Noise Cancelling",
    brand: "Apple Inc.",
    priceUSD: 549.00,
    imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=400",
    store: "Amazon",
    category: "electronics",
  },
  {
    id: "tp3",
    title: "Stanley Quencher H2.0 FlowState 40oz",
    brand: "Stanley",
    priceUSD: 45.00,
    imageUrl: "https://images.unsplash.com/photo-1685361288258-06fc56641b63?auto=format&fit=crop&q=80&w=400",
    store: "Walmart",
    category: "other",
  },
  {
    id: "tp4",
    title: "Dalstrong Gladiator Series 8-Piece Knife Block Set",
    brand: "Dalstrong Inc.",
    priceUSD: 189.00,
    imageUrl: "https://images.unsplash.com/photo-1593113630400-ea4288922497?auto=format&fit=crop&q=80&w=400",
    store: "eBay",
    category: "other",
  }
];

export const BLOG_GUIDES: BlogGuide[] = [
  {
    id: "guide-walmart",
    title: "Walmart'tan Alışveriş",
    sourceName: "Walmart",
    description: "Amerika'nın en büyük perakende devinden uygun fiyatlarla alışveriş yapmanın ve vergisiz Delaware depomuza sipariş vermenin püf noktaları.",
    imageUrl: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=600",
    link: "walmart",
  },
  {
    id: "guide-cosmetics",
    title: "Yurt Dışı Kozmetik Alışverişi",
    sourceName: "Sephora & Ulta",
    description: "Yurt dışından kozmetik siparişi artık mümkün hem de çok kolay. Harp Global yasal gümrük bildirimleriyle makyaj malzemelerini kapınıza getiriyor.",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600",
    link: "cosmetics",
  },
  {
    id: "guide-ebay",
    title: "Ebay'den Güvenli Alışveriş",
    sourceName: "eBay",
    description: "eBay'den ikinci el veya sıfır nadir ürünleri nasıl güvenle satın alacağınızı, gümrük beyannamelerini nasıl oluşturacağınızı inceliyoruz.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&q=80&w=600",
    link: "ebay",
  },
  {
    id: "guide-amazon",
    title: "Amazon ABD & UK'den Sipariş Ver",
    sourceName: "Amazon",
    description: "Amazon Amerika veya İngiltere'de satılan Türkiye'de bulunmayan milyonlarca özel ürünü en hızlı kargo seçeneğiyle doğrudan satın alın.",
    imageUrl: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?auto=format&fit=crop&q=80&w=600",
    link: "amazon",
  }
];

export const INITIAL_ORDERS: InternationalOrder[] = [
  {
    id: "HP-30911",
    type: "buy_for_me",
    title: "Stanley Quencher H2.0 40oz (Eucalyptus)",
    url: "https://www.amazon.com/dp/B0BWSGCJ93",
    priceUSD: 45.00,
    weightKg: 0.8,
    country: "US",
    status: "domestic_shipping",
    updatedAt: "2026-07-14",
    shippingCarrier: "DHL eCommerce",
    trackingCode: "DHL-98231023",
    customsTaxUSD: 13.50,
    shippingCostUSD: 12.00,
    serviceFeeUSD: 5.00,
    totalUSD: 75.50,
    notes: "DHL ile Türkiye'ye sevkiyatı yapıldı, gümrük işlemleriniz mali müşavirimiz tarafından onaylandı.",
  },
  {
    id: "HP-29804",
    type: "forwarding",
    title: "Sephora Favorites Beauty Perfume Gift Set",
    priceUSD: 95.00,
    weightKg: 0.4,
    country: "US",
    trackingNumber: "UPS-1Z999AA10123456784",
    status: "delivered",
    updatedAt: "2026-07-10",
    shippingCarrier: "Yurtiçi Kargo",
    trackingCode: "YK-982110292",
    customsTaxUSD: 28.50,
    shippingCostUSD: 6.00,
    serviceFeeUSD: 5.00,
    totalUSD: 134.50,
    notes: "Teslim edildi. Yurtiçi Kargo takip numarası ile ev adresinize ulaştırıldı.",
  }
];
