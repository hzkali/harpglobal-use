import React, { useState } from "react";
import { Globe, ArrowRight, ShieldCheck, CheckCircle2, ArrowUpRight, ShoppingBag, Truck } from "lucide-react";

interface HeroProps {
  onPasteLink: (url: string) => void;
  setActiveTab: (tab: "home" | "dashboard") => void;
}

export default function Hero({ onPasteLink, setActiveTab }: HeroProps) {
  const [pasteUrl, setPasteUrl] = useState("");
  const [detectedStore, setDetectedStore] = useState<string | null>(null);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPasteUrl(val);

    // Dynamic store detection helper for nice feedback
    if (val.toLowerCase().includes("amazon")) {
      setDetectedStore("Amazon US/UK");
    } else if (val.toLowerCase().includes("ebay")) {
      setDetectedStore("eBay Marketplace");
    } else if (val.toLowerCase().includes("walmart")) {
      setDetectedStore("Walmart Retail");
    } else if (val.toLowerCase().includes("sephora")) {
      setDetectedStore("Sephora Cosmetics");
    } else if (val.length > 5) {
      setDetectedStore("Global Mağaza");
    } else {
      setDetectedStore(null);
    }
  };

  const handleSubmitLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pasteUrl) return;
    onPasteLink(pasteUrl);
  };

  const handleQuickDemoLink = (url: string) => {
    setPasteUrl(url);
    onPasteLink(url);
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:py-24 bg-brand-cream" id="hero-section">
      {/* Decorative Elliptical Rings inspired by the shared design layout */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] border border-slate-200/50 rounded-full pointer-events-none select-none z-0">
        <div className="absolute inset-20 border border-slate-200/30 rounded-full"></div>
        <div className="absolute inset-40 border border-slate-200/20 rounded-full"></div>
      </div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-orange/5 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/5 rounded-full filter blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left copy column */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-brand-orange text-xs font-semibold uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5 text-brand-orange animate-spin-slow" />
              <span>Harp Global Altyapısı Güvencesiyle</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-navy leading-[1.1] tracking-tight">
              Dünyayı Kapınıza Getiren <br />
              <span className="text-brand-orange relative inline-block">
                Güvenilir Köprünüz:
                <span className="absolute bottom-1.5 left-0 w-full h-1 bg-brand-orange/20 rounded-full"></span>
              </span><br />
              Harp Global Altyapısıyla Sınırları Aşın!
            </h1>

            <p className="text-slate-600 text-lg sm:text-xl font-normal leading-relaxed max-w-2xl">
              Günümüz dünyasında alışverişin sınırı yok, ancak sınır ötesi alışverişlerin getirdiği lojistik ve gümrük süreçleri gözünüzü korkutabilir. 
              <strong> Harp Global</strong> olarak, güçlü ve yenilikçi teknolojik altyapımızı arkamıza alarak, Amerika Birleşik Devletleri ve İngiltere'den satın almak istediğiniz tüm ürünleri güvenle kapınıza ulaştırıyoruz.
            </p>

            <div className="p-4 rounded-xl bg-white border border-slate-100 shadow-xs max-w-xl">
              <p className="text-sm text-slate-700 italic font-medium">
                "Siz sadece hayal edin; tedarikten gümrüğe, gümrükten kapınıza kadar olan tüm karmaşık süreçleri biz yönetelim."
              </p>
            </div>

            {/* Link Paste Widget */}
            <div className="max-w-xl">
              <form onSubmit={handleSubmitLink} className="relative flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-md">
                <div className="relative flex-1">
                  <input
                    type="url"
                    placeholder="ABD veya İngiltere Satış Linkini Yapıştırın... (Amazon, eBay, Sephora vb.)"
                    className="w-full pl-3.5 pr-4 py-3.5 text-sm text-brand-navy bg-transparent border-0 focus:outline-none focus:ring-0 placeholder:text-slate-400"
                    value={pasteUrl}
                    onChange={handleUrlChange}
                    required
                    id="hero-link-input"
                  />
                  {detectedStore && (
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-1 rounded-md uppercase font-mono tracking-wider">
                      {detectedStore} algılandı
                    </span>
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95"
                  id="btn-hero-calc"
                >
                  <span>Fiyat Hesapla</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick links wrapper */}
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Örnek linkler:</span>
                <button 
                  type="button"
                  onClick={() => handleQuickDemoLink("https://www.amazon.com/dp/B0BWSGCJ93")}
                  className="text-xs text-slate-500 hover:text-brand-orange bg-slate-100 hover:bg-orange-50 px-2.5 py-1 rounded-md transition-colors font-mono"
                >
                  amazon.com/item...
                </button>
                <button 
                  type="button"
                  onClick={() => handleQuickDemoLink("https://www.sephora.com/product/peptide-lip-tint-P508124")}
                  className="text-xs text-slate-500 hover:text-brand-orange bg-slate-100 hover:bg-orange-50 px-2.5 py-1 rounded-md transition-colors font-mono"
                >
                  sephora.com/makeup...
                </button>
              </div>
            </div>

            {/* Core Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 max-w-xl border-t border-slate-200/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-brand-navy">%100 Resmi & Faturalı</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-brand-navy">Mali Müşavir Güvencesi</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-5 h-5 text-brand-orange shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-brand-navy">Hızlı DHL & Aras Dağıtım</span>
              </div>
            </div>
          </div>

          {/* Right Product Showcase / Interactive Dashboard Launch Columns */}
          <div className="lg:col-span-5 relative flex flex-col items-center">
            {/* Visual representation card */}
            <div className="relative w-full max-w-md bg-white rounded-3xl border border-slate-100 shadow-xl p-6 overflow-hidden transition-all hover:shadow-2xl">
              {/* Soft aesthetic background gradient */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100/40 rounded-full filter blur-xl pointer-events-none"></div>
              
              {/* Main Product Frame */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100 mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600" 
                  alt="US Premium Headphone import via Harp Global" 
                  className="w-4/5 h-4/5 object-contain mix-blend-multiply drop-shadow-xl animate-float"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-3 left-3 bg-brand-navy/90 text-white text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-full uppercase flex items-center gap-1.5 backdrop-blur-xs">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  ABD Depoda Hazır
                </span>
                
                <span className="absolute top-3 right-3 bg-brand-orange text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase font-display">
                  Sınır Ötesi Teslimat
                </span>
              </div>

              {/* Quick Actions Portal */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="font-display font-bold text-lg text-brand-navy">Hemen Alışverişe Başlayın</h3>
                  <p className="text-xs text-slate-400">Aracı firmalarla boğuşmadan doğrudan depomuzdan yönlendirin</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="p-3 bg-brand-navy text-white hover:bg-slate-800 text-xs font-semibold rounded-xl flex flex-col items-center gap-1.5 transition-colors cursor-pointer text-center"
                    id="hero-buyforme-trigger"
                  >
                    <ShoppingBag className="w-5.5 h-5.5 text-brand-orange" />
                    <span>Benim İçin Al</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("dashboard")}
                    className="p-3 bg-white text-brand-navy border border-slate-200 hover:bg-slate-50 text-xs font-semibold rounded-xl flex flex-col items-center gap-1.5 transition-colors cursor-pointer text-center"
                    id="hero-forward-trigger"
                  >
                    <Truck className="w-5.5 h-5.5 text-brand-orange" />
                    <span>Paket Oluştur / Gönder</span>
                  </button>
                </div>

                {/* Micro Warehouses Summary Indicator */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-3 font-mono">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    Delaware Tax-Free Active
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    UK London Depot Active
                  </span>
                </div>
              </div>
            </div>

            {/* Glowing Tagline Under the Card */}
            <div className="mt-6 flex items-center gap-2 bg-white/80 border border-slate-100 py-2 px-4 rounded-full shadow-sm text-xs font-medium text-slate-600">
              <ShieldCheck className="w-4 h-4 text-brand-orange" />
              <span>Resmi bölge ofisleri & depolarımızla %100 yasal güvence</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
