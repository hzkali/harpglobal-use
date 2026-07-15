import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CustomCalculator from "./components/Calculator";
import TrendyProducts from "./components/TrendyProducts";
import Guides from "./components/Guides";
import Dashboard from "./components/Dashboard";
import AIAssistant from "./components/AIAssistant";
import HowItWorksView from "./components/HowItWorksView";
import HarpGlobalTechView from "./components/HarpGlobalTechView";
import CalculatorView from "./components/CalculatorView";
import TrendyProductsView from "./components/TrendyProductsView";
import Footer from "./components/Footer";
import { INITIAL_ORDERS } from "./data";
import { InternationalOrder, TrendProduct } from "./types";
import { Globe, ShieldCheck, Check, Sparkles, AlertCircle, ShoppingBag, Truck } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"home" | "dashboard" | "how-it-works" | "about-us" | "calculator" | "trend-products">("home");
  const [aiOpen, setAiOpen] = useState(false);
  const [orders, setOrders] = useState<InternationalOrder[]>([]);
  const [pastedUrl, setPastedUrl] = useState<string>("");
  const [notification, setNotification] = useState<string | null>(null);

  // Initialize orders with sample data on load
  useEffect(() => {
    const saved = localStorage.getItem("harp_global_orders");
    if (saved) {
      try {
        setOrders(JSON.parse(saved));
      } catch (e) {
        setOrders(INITIAL_ORDERS);
      }
    } else {
      setOrders(INITIAL_ORDERS);
    }
  }, []);

  // Save orders to localStorage for durable client-side persistence
  const saveOrders = (updated: InternationalOrder[]) => {
    setOrders(updated);
    localStorage.setItem("harp_global_orders", JSON.stringify(updated));
  };

  const handleAddOrder = (newOrder: InternationalOrder) => {
    const updated = [newOrder, ...orders];
    saveOrders(updated);
    triggerNotification(`Sipariş başarıyla oluşturuldu! Takip No: ${newOrder.id}`);
  };

  const handleUpdateOrderStatus = (id: string, newStatus: InternationalOrder["status"]) => {
    const updated = orders.map((o) => {
      if (o.id === id) {
        let notes = o.notes;
        if (newStatus === "warehouse_received") {
          notes = "Paketiniz New York/Londra depomuza hasarsız olarak ulaştı. Tasnif edildi.";
        } else if (newStatus === "customs_clearing") {
          notes = "Uzman Mali Müşavir kadromuz gümrük beyannamesini imzaladı. Ülkeye giriş işlemleri başladı.";
        } else if (newStatus === "customs_passed") {
          notes = "Gümrük muayenesi başarıyla tamamlandı. Resmi ithalat vergileri ödendi.";
        } else if (newStatus === "domestic_shipping") {
          notes = "Türkiye kargo dağıtım şubesine verildi. DHL / Aras Kargo teslimat aşamasında.";
        } else if (newStatus === "delivered") {
          notes = "Kargonuz adresinize sorunsuz ve güvenli bir şekilde teslim edilmiştir. Bizi tercih ettiğiniz için teşekkürler!";
        }
        return {
          ...o,
          status: newStatus,
          notes,
          updatedAt: new Date().toISOString().split("T")[0]
        };
      }
      return o;
    });
    saveOrders(updated);
    triggerNotification(`Sipariş ${id} durumu güncellendi: ${newStatus}`);
  };

  const handleAddCalculatedOrder = (orderData: {
    title: string;
    priceUSD: number;
    weightKg: number;
    country: "US" | "UK";
    customsTaxUSD: number;
    shippingCostUSD: number;
    serviceFeeUSD: number;
    totalUSD: number;
  }) => {
    const newOrder: InternationalOrder = {
      id: `HP-${Math.floor(10000 + Math.random() * 90000)}`,
      type: "buy_for_me",
      title: orderData.title,
      priceUSD: orderData.priceUSD,
      weightKg: orderData.weightKg,
      country: orderData.country,
      status: "order_received",
      updatedAt: new Date().toISOString().split("T")[0],
      shippingCarrier: "DHL eCommerce",
      customsTaxUSD: orderData.customsTaxUSD,
      shippingCostUSD: orderData.shippingCostUSD,
      serviceFeeUSD: orderData.serviceFeeUSD,
      totalUSD: orderData.totalUSD,
      notes: "Hesaplama panelinden aktarıldı. Ödeme onayı bekleniyor."
    };
    const updated = [newOrder, ...orders];
    saveOrders(updated);
    triggerNotification(`Hesaplanan sipariş ${newOrder.id} müşteri panelinize eklendi!`);
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification(null);
    }, 4500);
  };

  const handlePasteLink = (url: string) => {
    setPastedUrl(url);
    triggerNotification("Link algılandı! Gümrük ve kargo maliyetleri hesaplama sayfasına aktarılıyor...");
    setActiveTab("calculator");
  };

  const handleSelectTrendProduct = (prod: TrendProduct) => {
    setPastedUrl(prod.imageUrl); // reference trigger
    triggerNotification(`${prod.title} seçildi! Hesaplama dökümü hesaplama sayfasında gösteriliyor.`);
    setActiveTab("calculator");
  };

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream text-brand-navy flex flex-col font-sans selection:bg-brand-orange/20 selection:text-brand-orange">
      
      {/* Dynamic Pop-up Notification Banner */}
      {notification && (
        <div className="fixed bottom-6 left-6 z-50 max-w-sm bg-brand-navy border border-slate-700 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-float">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 text-brand-orange flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-200">Harp Global Sistem Uyarısı</p>
            <p className="text-[11px] text-slate-400 mt-0.5">{notification}</p>
          </div>
        </div>
      )}

      {/* Corporate Header Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAIAssistant={() => setAiOpen(true)}
        onScrollToSection={handleScrollToSection}
      />

      {/* MAIN LAYOUT */}
      <main className="flex-1">
        {activeTab === "home" ? (
          /* TAB: HOME LANDING PAGE */
          <div className="space-y-0">
            {/* 1. Hero Landing Pitch */}
            <Hero 
              onPasteLink={handlePasteLink} 
              setActiveTab={setActiveTab} 
            />

            {/* 2. Interactive Calculator Section */}
            <section className="py-20 bg-slate-50 border-y border-slate-100" id="calculator-section">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange text-xs font-semibold uppercase tracking-wider">
                    <Globe className="w-3.5 h-3.5" />
                    <span>Lojistik Hesaplama Motoru</span>
                  </div>
                  <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-navy">
                    Gizli Ücret Yok, Gümrük Şoku Yok! <br />
                    <span className="text-brand-orange">Anlık Gümrük Vergisi Hesaplayın</span>
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Ürün fiyatını ve ağırlığını girin, kendi bünyemizdeki Mali Müşavir onaylı resmi gümrük beyannamemizle evinize teslim toplam tutarı anında görün.
                  </p>
                </div>

                <CustomCalculator 
                  initialUrl={pastedUrl} 
                  onAddCalculatedOrder={handleAddCalculatedOrder}
                />
              </div>
            </section>

            {/* 3. Three-Step Process & Guides */}
            <Guides />

            {/* 4. Trend Products */}
            <TrendyProducts onSelectProduct={handleSelectTrendProduct} />

            {/* 5. Fast Call to Action banner */}
            <section className="py-16 bg-gradient-to-r from-brand-navy to-slate-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/10 rounded-full filter blur-3xl pointer-events-none"></div>
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
                <h3 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
                  Sınır Ötesi Alışverişte <span className="text-brand-orange">Sıfır Gümrük Stresi</span> <br />
                  Harp Global ile Hemen Başlayın!
                </h3>
                <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
                  Üye olun, size özel Delaware ve Londra sanal depolarınızı anında kullanmaya başlayın ya da link yapıştırıp tüm süreci bize bırakın.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-2">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm px-8 py-4 rounded-xl shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4.5 h-4.5" />
                    <span>Müşteri Paneline Giriş Yap</span>
                  </button>
                  <button
                    onClick={() => setAiOpen(true)}
                    className="bg-white/10 hover:bg-white/25 border border-slate-700 text-white font-semibold text-sm px-8 py-4 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="w-4.5 h-4.5 text-brand-orange" />
                    <span>AI Gümrük Danışmanına Sor</span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : activeTab === "dashboard" ? (
          /* TAB: INTERACTIVE CUSTOMER DASHBOARD */
          <div className="py-12 bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              
              {/* Back breadcrumb */}
              <div className="flex justify-between items-center text-left">
                <button
                  onClick={() => setActiveTab("home")}
                  className="text-xs sm:text-sm font-semibold text-slate-500 hover:text-brand-orange transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  ← Kurumsal Site Ana Sayfasına Dön
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>Yasal Statü:</span>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-bold">%100 AKTİF</span>
                </div>
              </div>

              {/* Core Dashboard UI */}
              <Dashboard 
                orders={orders} 
                onAddOrder={handleAddOrder}
                onUpdateOrderStatus={handleUpdateOrderStatus}
              />
              
            </div>
          </div>
        ) : activeTab === "how-it-works" ? (
          /* TAB: HOW IT WORKS */
          <HowItWorksView 
            onBackToHome={() => setActiveTab("home")} 
            setActiveTab={setActiveTab}
          />
        ) : activeTab === "calculator" ? (
          /* TAB: DETAILED STANDALONE CALCULATOR PAGE */
          <CalculatorView 
            onBackToHome={() => setActiveTab("home")} 
            pastedUrl={pastedUrl}
            onAddCalculatedOrder={handleAddCalculatedOrder}
            setActiveTab={setActiveTab}
          />
        ) : activeTab === "trend-products" ? (
          /* TAB: STANDALONE TREND PRODUCTS PAGE */
          <TrendyProductsView 
            onBackToHome={() => setActiveTab("home")} 
            onSelectProduct={handleSelectTrendProduct}
            setActiveTab={setActiveTab}
          />
        ) : (
          /* TAB: ABOUT US */
          <HarpGlobalTechView 
            onBackToHome={() => setActiveTab("home")} 
          />
        )}
      </main>

      {/* Floating AI Shopping Assistant slider drawer */}
      <AIAssistant 
        isOpen={aiOpen} 
        onClose={() => setAiOpen(false)} 
      />

      {/* Corporate trust sitemapped Footer */}
      <Footer />
    </div>
  );
}
