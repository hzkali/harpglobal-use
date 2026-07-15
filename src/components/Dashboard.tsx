import React, { useState } from "react";
import { Copy, Check, Warehouse, ShoppingCart, PlusCircle, Clock, CheckCircle2, AlertCircle, ArrowUpRight, ChevronDown, ChevronUp, Package, Compass, HelpCircle, RefreshCw } from "lucide-react";
import { WAREHOUSES } from "../data";
import { AddressWarehouse, InternationalOrder } from "../types";

interface DashboardProps {
  orders: InternationalOrder[];
  onAddOrder: (order: InternationalOrder) => void;
  onUpdateOrderStatus: (id: string, newStatus: InternationalOrder["status"]) => void;
}

export default function Dashboard({ orders, onAddOrder, onUpdateOrderStatus }: DashboardProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState("help@harpglobal.com.tr");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [activeSubTab, setActiveSubTab] = useState<"addresses" | "buy_for_me" | "forwarding" | "orders">("addresses");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  // Form states for "Benim İçin Al" (Buy For Me)
  const [buyLink, setBuyLink] = useState("");
  const [buyTitle, setBuyTitle] = useState("");
  const [buyPrice, setBuyPrice] = useState("79");
  const [buyWeight, setBuyWeight] = useState("1.5");
  const [buyCountry, setBuyCountry] = useState<"US" | "UK">("US");
  const [buyCategory, setBuyCategory] = useState("clothing");
  const [buyNotes, setBuyNotes] = useState("");

  // Form states for "Paket Gönder" (Forwarding)
  const [forwardCarrier, setForwardCarrier] = useState("FedEx");
  const [forwardTracking, setForwardTracking] = useState("TRACK-92813102");
  const [forwardTitle, setForwardTitle] = useState("");
  const [forwardPrice, setForwardPrice] = useState("45");
  const [forwardCountry, setForwardCountry] = useState<"US" | "UK">("US");
  const [forwardNotes, setForwardNotes] = useState("");

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Submit Buy For Me
  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyTitle) return;

    const itemPrice = parseFloat(buyPrice) || 0;
    const itemWeight = parseFloat(buyWeight) || 0.1;
    
    // Core logic
    const shippingCostUSD = itemWeight <= 4 ? 140 : 140 + (itemWeight - 4) * 22;
    
    let customsTaxUSD = 0;
    if (buyCategory === "supplements") {
      customsTaxUSD = itemPrice <= 1500 ? 0 : itemPrice * 0.60;
    } else {
      customsTaxUSD = itemPrice * 0.60;
    }
    
    const weightBasedFee = itemWeight * 40;
    const priceBasedFee = Math.ceil(itemPrice / 100) * 40;
    const serviceFeeUSD = Math.max(weightBasedFee, priceBasedFee);
    const totalUSD = itemPrice + shippingCostUSD + customsTaxUSD + serviceFeeUSD;

    const newOrder: InternationalOrder = {
      id: `HP-${Math.floor(10000 + Math.random() * 90000)}`,
      type: "buy_for_me",
      title: buyTitle,
      url: buyLink,
      priceUSD: itemPrice,
      weightKg: itemWeight,
      country: buyCountry,
      status: "order_received",
      updatedAt: new Date().toISOString().split("T")[0],
      shippingCarrier: "DHL eCommerce",
      customsTaxUSD,
      shippingCostUSD,
      serviceFeeUSD,
      totalUSD,
      notes: buyNotes || "Siparişiniz inceleniyor, satın alma işlemi başlatılacaktır.",
    };

    onAddOrder(newOrder);
    setActiveSubTab("orders");
    setSelectedOrder(newOrder.id);
    
    // Reset
    setBuyLink("");
    setBuyTitle("");
    setBuyPrice("79");
    setBuyWeight("1.5");
    setBuyNotes("");
  };

  // Submit Forwarding Paket
  const handleForwardSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forwardTitle || !forwardTracking) return;

    const itemPrice = parseFloat(forwardPrice) || 0;
    const itemWeight = 1.0; // standard forwarding package estimate
    
    // Core logic
    const shippingCostUSD = itemWeight <= 4 ? 140 : 140 + (itemWeight - 4) * 22;
    const customsTaxUSD = itemPrice * 0.60;
    
    const weightBasedFee = itemWeight * 40;
    const priceBasedFee = Math.ceil(itemPrice / 100) * 40;
    const serviceFeeUSD = Math.max(weightBasedFee, priceBasedFee);
    const totalUSD = itemPrice + shippingCostUSD + customsTaxUSD + serviceFeeUSD;

    const newOrder: InternationalOrder = {
      id: `HP-${Math.floor(10000 + Math.random() * 90000)}`,
      type: "forwarding",
      title: forwardTitle,
      priceUSD: itemPrice,
      weightKg: itemWeight,
      country: forwardCountry,
      trackingNumber: `${forwardCarrier}: ${forwardTracking}`,
      status: "warehouse_received",
      updatedAt: new Date().toISOString().split("T")[0],
      shippingCarrier: "Aras Kargo",
      customsTaxUSD,
      shippingCostUSD,
      serviceFeeUSD,
      totalUSD,
      notes: `Yurt dışı depomuzda ${forwardTracking} takip nolu paketiniz teslim alındı. Gümrükleme beyanı hazırlandı.`,
    };

    onAddOrder(newOrder);
    setActiveSubTab("orders");
    setSelectedOrder(newOrder.id);

    // Reset
    setForwardTitle("");
    setForwardTracking("");
    setForwardPrice("45");
    setForwardNotes("");
  };

  // Tracking progress order list steps
  const steps: { key: InternationalOrder["status"]; label: string; desc: string }[] = [
    { key: "order_received", label: "Talep Alındı", desc: "Sipariş veya yönlendirme talebiniz onaylandı." },
    { key: "warehouse_received", label: "Yurtdışı Depoda", desc: "Paketiniz New York/Londra depomuzda tasnif edildi." },
    { key: "customs_clearing", label: "Gümrük Yolunda", desc: "Mali müşavirimiz gümrük beyannamesini onayladı." },
    { key: "customs_passed", label: "Gümrükten Geçti", desc: "İthalat işlemleri tamamlandı, vergi ödendi." },
    { key: "domestic_shipping", label: "Yurtiçi Dağıtımda", desc: "Aras Kargo veya Yurtiçi Kargo'ya teslim edildi." },
    { key: "delivered", label: "Teslim Edildi", desc: "Hasarsız ve %100 yasal olarak adresinize ulaştırıldı." },
  ];

  const getStepIndex = (status: InternationalOrder["status"]) => {
    return steps.findIndex((s) => s.key === status);
  };

  // Interactive Simulator helper to fast-forward ship steps
  const handleSimulateStep = (orderId: string, currentStatus: InternationalOrder["status"]) => {
    const currentIndex = getStepIndex(currentStatus);
    if (currentIndex < steps.length - 1) {
      const nextStatus = steps[currentIndex + 1].key;
      onUpdateOrderStatus(orderId, nextStatus);
    } else {
      // Loop back
      onUpdateOrderStatus(orderId, "order_received");
    }
  };

  const getStatusBadgeClass = (status: InternationalOrder["status"]) => {
    switch (status) {
      case "order_received": return "bg-blue-50 text-blue-700 border-blue-100";
      case "warehouse_received": return "bg-purple-50 text-purple-700 border-purple-100";
      case "customs_clearing": return "bg-amber-50 text-amber-700 border-amber-100";
      case "customs_passed": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "domestic_shipping": return "bg-sky-50 text-sky-700 border-sky-100 font-semibold animate-pulse";
      case "delivered": return "bg-stone-100 text-stone-700 border-stone-200";
    }
  };

  const getStatusLabel = (status: InternationalOrder["status"]) => {
    const s = steps.find((step) => step.key === status);
    return s ? s.label : "Bilinmiyor";
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto space-y-6 text-left" id="auth-portal">
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden p-6 sm:p-8">
          {/* Form Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange text-white flex items-center justify-center shadow-lg shadow-brand-orange/20 mx-auto mb-3">
              <Warehouse className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl text-brand-navy">
              {isLoginMode ? "Müşteri Paneline Giriş Yap" : "Yeni Hesap Oluştur"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {isLoginMode 
                ? "Sanal depolarınızı ve siparişlerinizi yönetmek için giriş yapın." 
                : "Harp Global ayrıcalıklarıyla sınır ötesi alışverişe başlayın."}
            </p>
          </div>

          <form onSubmit={(e) => {
            e.preventDefault();
            setIsLoggedIn(true);
          }} className="space-y-4">
            
            {!isLoginMode && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Adınız Soyadınız</label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-orange"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ahmet Yılmaz"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Telefon Numarası</label>
                  <input
                    type="tel"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-orange"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+90 555 123 4567"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">E-posta Adresi</label>
              <input
                type="email"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-orange"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@mail.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Şifre</label>
              <input
                type="password"
                required
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-brand-navy focus:outline-none focus:border-brand-orange"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-brand-orange/10 transition-all cursor-pointer hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mt-6"
            >
              <span>{isLoginMode ? "Giriş Yap" : "Kayıt Ol ve Başla"}</span>
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="text-xs font-semibold text-slate-500 hover:text-brand-orange transition-colors cursor-pointer"
            >
              {isLoginMode ? "Hesabınız yok mu? Yeni bir hesap oluşturun" : "Zaten hesabınız var mı? Giriş yapın"}
            </button>
          </div>
        </div>

        {/* Warning Notification below the form as requested */}
        <div className="p-4 bg-amber-50 border border-amber-200/80 rounded-2xl flex gap-3 text-left shadow-xs">
          <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <p className="text-xs font-bold text-amber-900">Sanal Depo Yapılandırması</p>
            <p className="text-[11px] text-amber-800 leading-relaxed mt-0.5 font-medium">
              Şu anda depoların konumları ayarlanmaktadır en kısa sürede aktif olacaktır
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden max-w-6xl mx-auto" id="dashboard-portal">
      
      {/* Dashboard Mini Header */}
      <div className="bg-brand-navy p-6 sm:p-8 text-white text-left flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Warehouse className="w-5 h-5 text-brand-orange" />
            <span className="text-xs uppercase tracking-wider font-mono text-slate-300">Harp Global Müşteri Portalı</span>
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">Lojistik Takip & Sanal Depolarım</h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 flex flex-wrap items-center gap-2">
            <span>Müşteri Suite Numaranız:</span>
            <strong className="text-brand-orange font-mono font-bold bg-slate-800 px-2 py-0.5 rounded-md">HP-8820-TR</strong>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="text-[11px] font-bold text-slate-300 hover:text-brand-orange underline transition-colors cursor-pointer animate-pulse"
            >
              Çıkış Yap
            </button>
          </p>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-1 bg-slate-800 p-1.5 rounded-xl border border-slate-700 w-full sm:w-auto">
          <button
            onClick={() => setActiveSubTab("addresses")}
            className={`flex-1 sm:flex-initial text-center px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeSubTab === "addresses" ? "bg-brand-orange text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Sanal Depo Adreslerim
          </button>
          <button
            onClick={() => setActiveSubTab("orders")}
            className={`flex-1 sm:flex-initial text-center px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeSubTab === "orders" ? "bg-brand-orange text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Siparişlerim ({orders.length})
          </button>
          <button
            onClick={() => setActiveSubTab("buy_for_me")}
            className={`flex-1 sm:flex-initial text-center px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeSubTab === "buy_for_me" ? "bg-brand-orange text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Benim İçin Al
          </button>
          <button
            onClick={() => setActiveSubTab("forwarding")}
            className={`flex-1 sm:flex-initial text-center px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              activeSubTab === "forwarding" ? "bg-brand-orange text-white" : "text-slate-300 hover:text-white"
            }`}
          >
            Paket Gönder
          </button>
        </div>
      </div>

      {/* Main Panel Content Area */}
      <div className="p-6 sm:p-8">
        
        {/* TAB 1: Virtual Addresses */}
        {activeSubTab === "addresses" && (
          <div className="space-y-6 text-left">
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl">
              <p className="text-sm text-brand-orange font-medium">
                💡 <strong>Nasıl Kullanılır?</strong> ABD veya İngiltere sitelerinden alışveriş yaparken aşağıdaki adresleri teslimat adresi (Shipping Address) olarak girin. Satın aldığınız ürünler depomuza ulaştığında size e-posta ile haber verir, gümrük beyanınızı onaylar ve Türkiye'deki adresinize yollarız.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {WAREHOUSES.map((wh) => (
                <div key={wh.id} className="bg-slate-50 rounded-2xl border border-slate-200/60 p-6 flex flex-col justify-between hover:border-brand-orange transition-all relative">
                  
                  {wh.isTaxFree && (
                    <span className="absolute top-4 right-4 bg-emerald-100 text-emerald-800 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-mono">
                      %0 Satış Vergisi (Tax-Free)
                    </span>
                  )}
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-2xl">{wh.country === "US" ? "🇺🇸" : "🇬🇧"}</span>
                      <h4 className="font-display font-bold text-base text-brand-navy">{wh.title}</h4>
                    </div>

                    <div className="space-y-3 font-mono text-xs text-slate-600 border-t border-slate-200/60 pt-4">
                      {/* Name Row */}
                      <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-150">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Full Name / Alıcı Adı</span>
                          <span className="font-bold text-brand-navy">{wh.fullName}</span>
                        </div>
                        <button 
                          onClick={() => handleCopy(wh.fullName, `${wh.id}-name`)}
                          className="text-slate-400 hover:text-brand-orange transition-colors"
                        >
                          {copiedField === `${wh.id}-name` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Address Line 1 Row */}
                      <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-150">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Address Line 1</span>
                          <span className="font-bold text-brand-navy">{wh.addressLine1}</span>
                        </div>
                        <button 
                          onClick={() => handleCopy(wh.addressLine1, `${wh.id}-addr1`)}
                          className="text-slate-400 hover:text-brand-orange transition-colors"
                        >
                          {copiedField === `${wh.id}-addr1` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Address Line 2 Row */}
                      <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-150">
                        <div>
                          <span className="text-[10px] text-slate-400 block font-sans">Address Line 2 (Dahil Suite ID)</span>
                          <span className="font-bold text-brand-orange">{wh.addressLine2}</span>
                        </div>
                        <button 
                          onClick={() => handleCopy(wh.addressLine2, `${wh.id}-addr2`)}
                          className="text-slate-400 hover:text-brand-orange transition-colors"
                        >
                          {copiedField === `${wh.id}-addr2` ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* City State Zip Phone Grid */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-150">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-sans">City / Şehir</span>
                            <span className="font-bold text-brand-navy">{wh.city}</span>
                          </div>
                          <button onClick={() => handleCopy(wh.city, `${wh.id}-city`)} className="text-slate-400">
                            {copiedField === `${wh.id}-city` ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-150">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-sans">State / Eyalet</span>
                            <span className="font-bold text-brand-navy">{wh.state}</span>
                          </div>
                          <button onClick={() => handleCopy(wh.state, `${wh.id}-state`)} className="text-slate-400">
                            {copiedField === `${wh.id}-state` ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-150">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-sans">Zip Code / Posta Kodu</span>
                            <span className="font-bold text-brand-navy">{wh.zipCode}</span>
                          </div>
                          <button onClick={() => handleCopy(wh.zipCode, `${wh.id}-zip`)} className="text-slate-400">
                            {copiedField === `${wh.id}-zip` ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>

                        <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-150">
                          <div>
                            <span className="text-[10px] text-slate-400 block font-sans">Phone / Telefon</span>
                            <span className="font-bold text-brand-navy">{wh.phone}</span>
                          </div>
                          <button onClick={() => handleCopy(wh.phone, `${wh.id}-phone`)} className="text-slate-400">
                            {copiedField === `${wh.id}-phone` ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-400 mt-4 italic">
                    *Alışveriş yaparken Address Line 2 (Daire/Suite) alanına mutlaka <strong>HP-8820-TR</strong> kodunuzu yazın. Bu kod, paketlerinizin size atanmasını sağlar.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: Benim İçin Al (Buy For Me) */}
        {activeSubTab === "buy_for_me" && (
          <div className="max-w-2xl mx-auto text-left">
            <h3 className="font-display font-bold text-xl text-brand-navy mb-2">Benim İçin Al (Proxy Shopping)</h3>
            <p className="text-xs text-slate-500 mb-6">
              Kredi kartınız yurt dışı sitelerde geçmiyor mu ya da gümrükle uğraşmak istemiyor musunuz? Ürün linkini yapıştırın, Harp Global sizin adınıza satın alsın, vergileri önceden ödeyerek kapınıza getirsin!
            </p>

            <form onSubmit={handleBuySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ürün Satış Linki (URL)</label>
                <input
                  type="url"
                  required
                  placeholder="https://www.amazon.com/dp/B0BWSGCJ93..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-orange"
                  value={buyLink}
                  onChange={(e) => setBuyLink(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ürün Adı / Başlığı</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: AirPods Max Gümüş"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-orange"
                    value={buyTitle}
                    onChange={(e) => setBuyTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tahmini Fiyat ($ USD / £ GBP)</label>
                  <input
                    type="number"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-mono"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Mağaza Ülkesi</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none"
                    value={buyCountry}
                    onChange={(e: any) => setBuyCountry(e.target.value)}
                  >
                    <option value="US">Amerika (US Warehouse)</option>
                    <option value="UK">İngiltere (UK Warehouse)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Kategori</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none"
                    value={buyCategory}
                    onChange={(e: any) => setBuyCategory(e.target.value)}
                  >
                    <option value="electronics">Elektronik</option>
                    <option value="clothing">Giyim</option>
                    <option value="cosmetics">Kozmetik</option>
                    <option value="supplements">İlaç ve Gıda Takviyesi</option>
                    <option value="other">Diğer Sınıflar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ağırlık (Tahmini kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-mono"
                    value={buyWeight}
                    onChange={(e) => setBuyWeight(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Renk, Beden ve Sipariş Notları</label>
                <textarea
                  rows={2}
                  placeholder="Örn: Gümüş renk, L beden, 1 adet istiyorum."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-orange"
                  value={buyNotes}
                  onChange={(e) => setBuyNotes(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3 px-6 rounded-xl font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
                id="btn-buy-submit"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Benim İçin Al Talebi Oluştur</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: Paket Gönder (Forwarding) */}
        {activeSubTab === "forwarding" && (
          <div className="max-w-2xl mx-auto text-left">
            <h3 className="font-display font-bold text-xl text-brand-navy mb-2">Paket Oluştur / Kendin Gönder</h3>
            <p className="text-xs text-slate-500 mb-6">
              Ödemesini kendiniz yaptığınız ve bizim US/UK sanal depo adreslerimize gönderdiğiniz paketlerin kargo takip kodunu girin. Paketiniz depomuza ulaşınca eşleştirip hemen kargolayalım!
            </p>

            <form onSubmit={handleForwardSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Yurtdışı Kargo Firması</label>
                  <select
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none"
                    value={forwardCarrier}
                    onChange={(e) => setForwardCarrier(e.target.value)}
                  >
                    <option value="FedEx">FedEx</option>
                    <option value="UPS">UPS</option>
                    <option value="USPS">USPS</option>
                    <option value="DHL Express">DHL Express</option>
                    <option value="Royal Mail">Royal Mail (İngiltere)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Yurtdışı Kargo Takip No (Tracking ID)</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: 1Z999AA10123456784"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-mono"
                    value={forwardTracking}
                    onChange={(e) => setForwardTracking(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ürün Açıklaması / İçerik</label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Stanley Termos ve Spor Ayakkabı"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-orange"
                    value={forwardTitle}
                    onChange={(e) => setForwardTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Ürün Beyan Değeri ($ USD)</label>
                  <input
                    type="number"
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-orange font-mono"
                    value={forwardPrice}
                    onChange={(e) => setForwardPrice(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Depomuz Hangisi?</label>
                <select
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none"
                  value={forwardCountry}
                  onChange={(e: any) => setForwardCountry(e.target.value)}
                >
                  <option value="US">Amerika Depomuz (Lewes, DE)</option>
                  <option value="UK">İngiltere Depomuz (London Wembley)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Depo Ek Hizmet Talebi (Opsiyonel)</label>
                <textarea
                  rows={2}
                  placeholder="Örn: Faturasını paketten çıkarın, ek baloncuklu naylona sarın."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-brand-navy focus:outline-none focus:border-brand-orange"
                  value={forwardNotes}
                  onChange={(e) => setForwardNotes(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white py-3 px-6 rounded-xl font-bold text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md"
                id="btn-forward-submit"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Paket Yönlendirme Kaydı Oluştur</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: My Active Orders & Simulator */}
        {activeSubTab === "orders" && (
          <div className="space-y-6 text-left">
            <div className="flex justify-between items-center flex-wrap gap-2 border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-display font-bold text-lg text-brand-navy">Aktif Gönderilerim</h3>
                <p className="text-xs text-slate-400">Tüm gümrük beyannameleri ve kargo hareketleri anlık listelenir.</p>
              </div>
              
              <div className="bg-slate-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs text-slate-600 font-medium">
                <Compass className="w-4 h-4 text-brand-orange animate-spin-slow" />
                <span>Simülatör Aktif: İlerleme takibi yapabilirsiniz</span>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500 font-medium text-sm">Kayıtlı aktif bir siparişiniz bulunmamaktadır.</p>
                <p className="text-xs text-slate-400 mt-1">Hesaplama panelinden veya Benim İçin Al formundan yeni bir sipariş ekleyin.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => {
                  const isOpen = selectedOrder === order.id;
                  const stepIdx = getStepIndex(order.status);

                  return (
                    <div 
                      key={order.id} 
                      className={`border rounded-2xl overflow-hidden bg-white transition-all ${
                        isOpen ? "border-brand-orange ring-1 ring-brand-orange/20" : "border-slate-200 hover:border-slate-300"
                      }`}
                    >
                      {/* Order Title Header Row */}
                      <div 
                        onClick={() => setSelectedOrder(isOpen ? null : order.id)}
                        className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer select-none bg-slate-50/50 hover:bg-slate-50"
                        id={`order-header-${order.id}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`p-2.5 rounded-xl ${order.type === "buy_for_me" ? "bg-orange-50 text-brand-orange" : "bg-blue-50 text-blue-600"}`}>
                            {order.type === "buy_for_me" ? <ShoppingCart className="w-5 h-5" /> : <Warehouse className="w-5 h-5" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-sm text-brand-navy">{order.id}</span>
                              <span className={`border px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono ${getStatusBadgeClass(order.status)}`}>
                                {getStatusLabel(order.status)}
                              </span>
                            </div>
                            <h4 className="font-semibold text-sm text-slate-800 mt-1">{order.title}</h4>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                              {order.country === "US" ? "🇺🇸 Amerika" : "🇬🇧 İngiltere"} • Güncellenme: {order.updatedAt}
                            </p>
                          </div>
                        </div>

                        {/* Right quick stats */}
                        <div className="flex items-center gap-4 self-end sm:self-center font-mono">
                          <div className="text-right">
                            <span className="text-[9px] text-slate-400 block uppercase font-sans">Kapı Teslim</span>
                            <span className="font-bold text-sm text-brand-navy">${order.totalUSD.toFixed(2)}</span>
                          </div>

                          {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                        </div>
                      </div>

                      {/* Expanded Section Details & Progress */}
                      {isOpen && (
                        <div className="p-6 border-t border-slate-150 bg-white space-y-6">
                          
                          {/* Simulator control at the top of detail */}
                          <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center flex-wrap gap-2 text-xs">
                            <span className="text-slate-600">
                              🚚 <strong>Kargo Simülatörü:</strong> Bu paketin teslimat sürecini adım adım izlemek için durumu ilerletin:
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSimulateStep(order.id, order.status);
                              }}
                              className="bg-brand-navy hover:bg-slate-800 text-white font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                              id={`btn-simulate-${order.id}`}
                            >
                              <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-brand-orange" />
                              <span>Durumu İlerlet / Değiştir</span>
                            </button>
                          </div>

                          {/* Visual Step Timeline */}
                          <div className="relative pt-6 pb-2">
                            {/* Desktop Line */}
                            <div className="absolute top-[38px] left-[5%] right-[5%] h-1 bg-slate-200 -z-10 hidden md:block">
                              <div 
                                className="h-full bg-brand-orange transition-all duration-300"
                                style={{ width: `${(stepIdx / (steps.length - 1)) * 100}%` }}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 md:gap-2">
                              {steps.map((st, i) => {
                                const isCompleted = i <= stepIdx;
                                const isActive = i === stepIdx;

                                return (
                                  <div key={st.key} className="flex md:flex-col items-start md:items-center text-left md:text-center relative">
                                    {/* Circle Indicator */}
                                    <div className="md:mb-3 mr-3 md:mr-0 z-10 shrink-0">
                                      {isCompleted ? (
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                          isActive ? "bg-brand-orange text-white ring-4 ring-orange-100" : "bg-brand-navy text-white"
                                        }`}>
                                          <Check className="w-4 h-4" />
                                        </div>
                                      ) : (
                                        <div className="w-8 h-8 rounded-full bg-slate-100 border-2 border-slate-200 text-slate-400 flex items-center justify-center font-mono text-xs font-bold">
                                          {i + 1}
                                        </div>
                                      )}
                                    </div>

                                    {/* Text copy */}
                                    <div>
                                      <h5 className={`font-semibold text-xs transition-colors ${
                                        isCompleted ? "text-brand-navy" : "text-slate-400"
                                      }`}>
                                        {st.label}
                                      </h5>
                                      <p className="text-[10px] text-slate-400 max-w-[140px] md:mx-auto mt-0.5 leading-tight">
                                        {st.desc}
                                      </p>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Itemized cost breakdown inside shipment */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
                            
                            {/* Col 1: Base Details */}
                            <div className="space-y-2 text-xs">
                              <h5 className="font-bold text-slate-700 uppercase tracking-wider font-mono">Paket Detayı</h5>
                              <p className="text-slate-600">
                                <span className="font-medium text-slate-400">Ürün URL: </span>
                                {order.url ? (
                                  <a href={order.url} target="_blank" rel="noreferrer" className="text-brand-orange hover:underline font-mono truncate max-w-xs inline-block align-bottom">
                                    {order.url}
                                  </a>
                                ) : (
                                  <span className="font-mono text-slate-500">Müşteri Kendisi Satın Aldı</span>
                                )}
                              </p>
                              {order.trackingNumber && (
                                <p className="text-slate-600">
                                  <span className="font-medium text-slate-400">Yurtdışı Takip No: </span>
                                  <span className="font-mono font-bold bg-slate-100 px-2 py-0.5 rounded-sm">{order.trackingNumber}</span>
                                </p>
                              )}
                              <p className="text-slate-600">
                                <span className="font-medium text-slate-400">Ağırlık: </span>
                                <span className="font-mono">{order.weightKg} kg</span>
                              </p>
                            </div>

                            {/* Col 2: Carrier Details */}
                            <div className="space-y-2 text-xs">
                              <h5 className="font-bold text-slate-700 uppercase tracking-wider font-mono">Lojistik Partneri</h5>
                              {order.shippingCarrier ? (
                                <div className="space-y-1">
                                  <p className="text-slate-800 font-semibold">{order.shippingCarrier}</p>
                                  <p className="text-[11px] text-slate-500">
                                    Yurtiçi Takip Kodu: <strong className="font-mono text-brand-navy">{order.trackingCode || "Atanıyor..."}</strong>
                                  </p>
                                </div>
                              ) : (
                                <p className="text-slate-400 italic">Ülkeye giriş yaptıktan sonra kargo firması atanacaktır.</p>
                              )}
                              <p className="text-[11px] text-slate-400">
                                🛡️ Ürününüz Harp Global Lojistik güvencesiyle çalınma/hasara karşı tam sigortalıdır.
                              </p>
                            </div>

                            {/* Col 3: Invoice Breakdowns */}
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 space-y-1.5 font-mono text-xs">
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-sans">Ürün Fiyatı:</span>
                                <span className="font-bold text-brand-navy">${order.priceUSD.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-sans">Kargo:</span>
                                <span className="font-bold text-brand-navy">${order.shippingCostUSD.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-sans">Gümrük Vergisi:</span>
                                <span className="font-bold text-brand-navy">${order.customsTaxUSD.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-400 font-sans">Hizmet Bedeli:</span>
                                <span className="font-bold text-brand-navy">${order.serviceFeeUSD.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between border-t border-slate-200 pt-1.5 font-sans font-bold">
                                <span className="text-brand-navy">Toplam Ödenen:</span>
                                <span className="text-brand-orange">${order.totalUSD.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Shipping Notes */}
                          <div className="bg-orange-50/40 p-3 rounded-lg border border-orange-100/60 text-xs flex gap-2">
                            <AlertCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                            <div>
                              <strong className="text-brand-navy">Son Durum Notu:</strong>
                              <p className="text-slate-600 mt-0.5">{order.notes}</p>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
