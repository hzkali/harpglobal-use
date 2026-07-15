export interface ProductLinkData {
  url: string;
  title: string;
  price: number;
  image?: string;
  source: "Amazon" | "eBay" | "Walmart" | "Sephora" | "Other";
}

export interface AddressWarehouse {
  id: string;
  country: "US" | "UK";
  title: string;
  fullName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isTaxFree: boolean;
}

export interface InternationalOrder {
  id: string;
  type: "buy_for_me" | "forwarding";
  title: string;
  url?: string;
  priceUSD: number;
  weightKg: number;
  country: "US" | "UK";
  trackingNumber?: string;
  status: "order_received" | "warehouse_received" | "customs_clearing" | "customs_passed" | "domestic_shipping" | "delivered";
  updatedAt: string;
  shippingCarrier?: "Aras Kargo" | "Yurtiçi Kargo" | "DHL eCommerce";
  trackingCode?: string;
  customsTaxUSD: number;
  shippingCostUSD: number;
  serviceFeeUSD: number;
  totalUSD: number;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export interface CalculatorParams {
  price: number;
  weightKg: number;
  category: "clothing" | "electronics" | "cosmetics" | "supplements" | "other";
  country: "US" | "UK";
}

export interface CalculatorResult {
  originalPrice: number;
  shippingCost: number;
  customsTax: number;
  serviceFee: number;
  totalUSD: number;
  totalTRY: number;
  exchangeRate: number;
  currency: string;
  breakdown: {
    productPrice: number;
    shipping: number;
    customs: number;
    service: number;
  };
}

export interface BlogGuide {
  id: string;
  title: string;
  sourceName: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface TrendProduct {
  id: string;
  title: string;
  brand: string;
  priceUSD: number;
  imageUrl: string;
  store: "Amazon" | "eBay" | "Walmart" | "Sephora";
  category: string;
}
