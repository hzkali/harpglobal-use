import React from "react";
import { Globe, Phone, Mail, ShieldCheck, MapPin, ArrowUp } from "lucide-react";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-brand-navy text-slate-300 border-t border-slate-800" id="footer-section">
      
      {/* Top section: Quick contact and partner logs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-b border-slate-800/60 grid grid-cols-1 md:grid-cols-12 gap-8 text-left items-center">
        
        {/* Branding & Partner Courier tags */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-orange text-white flex items-center justify-center font-bold">
              <Globe className="w-4.5 h-4.5" />
            </div>
            <span className="font-display font-bold text-xl text-white">harp<span className="text-brand-orange">global</span></span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
            Harp Global Altyapısıyla ABD ve İngiltere'den satın almak istediğiniz her ürünü gümrük stresi olmadan, yasal mevzuata uygun şekilde kapınıza ulaştırıyoruz.
          </p>
        </div>

        {/* Courier Partners */}
        <div className="md:col-span-5 space-y-3">
          <h5 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Türkiye ve Global Kargo Partnerlerimiz</h5>
          <div className="flex flex-wrap items-center gap-3">
            <span className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold font-mono">
              DHL eCommerce
            </span>
            <span className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold font-mono">
              Aramex
            </span>
            <span className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold font-mono">
              Yurtiçi Kargo
            </span>
            <span className="bg-slate-800 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold font-mono">
              Aras Kargo
            </span>
          </div>
        </div>

        {/* Rapid Support Info */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-mono">Resmi Destek Hattı</h5>
          <div className="space-y-1 text-xs">
            <a href="tel:05403300025" className="flex items-center gap-2 text-white hover:text-brand-orange transition-colors">
              <Phone className="w-4 h-4 text-brand-orange shrink-0" />
              <span className="font-mono font-bold">0540 330 00 25</span>
            </a>
            <a href="mailto:destek@harpglobal.com.tr" className="flex items-center gap-2 hover:text-brand-orange transition-colors">
              <Mail className="w-4 h-4 text-brand-orange shrink-0" />
              <span>destek@harpglobal.com.tr</span>
            </a>
          </div>
        </div>

      </div>

      {/* Main Sitemap Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-left">
        
        {/* Col 1: Harp Global structure */}
        <div className="space-y-4">
          <h4 className="text-white font-display font-bold text-sm tracking-wide">Yasal Resmi Ofislerimiz</h4>
          <ul className="space-y-3 text-xs text-slate-400 font-mono">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span><strong>ABD Şubesi:</strong> Harp Global Technology LLC, Florida, USA</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
              <span><strong>UK Şubesi:</strong> Harp Global UK Ltd, London, UK</span>
            </li>
          </ul>
        </div>

        {/* Col 2: Services */}
        <div className="space-y-4">
          <h4 className="text-white font-display font-bold text-sm tracking-wide">Çözümlerimiz</h4>
          <ul className="space-y-2 text-xs text-slate-400 font-medium">
            <li>
              <a href="#how-it-works" className="hover:text-white transition-colors">Benim İçin Al (Proxy Shopping)</a>
            </li>
            <li>
              <a href="#how-it-works" className="hover:text-white transition-colors">Paket Oluştur / Kendin Gönder</a>
            </li>
            <li>
              <a href="#calculator" className="hover:text-white transition-colors">Müşavir Onaylı Gümrükleme</a>
            </li>
            <li>
              <a href="#trend-products" className="hover:text-white transition-colors">Yurtdışı Adres Kiralama</a>
            </li>
          </ul>
        </div>

        {/* Col 3: Popular shops */}
        <div className="space-y-4">
          <h4 className="text-white font-display font-bold text-sm tracking-wide">Desteklenen Mağazalar</h4>
          <ul className="space-y-2 text-xs text-slate-400 font-medium">
            <li><span className="hover:text-white transition-colors">Amazon US & UK</span></li>
            <li><span className="hover:text-white transition-colors">Walmart Marketplace</span></li>
            <li><span className="hover:text-white transition-colors">eBay Global Auction</span></li>
            <li><span className="hover:text-white transition-colors">Sephora & Ulta Cosmetics</span></li>
            <li><span className="hover:text-white transition-colors">Nordstrom & Macy's</span></li>
          </ul>
        </div>

        {/* Col 4: Trust & Guarantees */}
        <div className="space-y-4">
          <h4 className="text-white font-display font-bold text-sm tracking-wide">Yasal Koruma & Güvence</h4>
          <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-start gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-300 leading-normal">
                Gümrük süreçleriniz kendi mali müşavirimizce takip edildiğinden ek beklenmedik masraf veya gümrükte kalma riski %0'dır.
              </p>
            </div>
            <div className="text-[10px] text-slate-500 font-mono text-center border-t border-slate-700/60 pt-2 flex justify-between">
              <span>%100 Faturalı</span>
              <span>•</span>
              <span>Yasal İthalat</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal disclaimer & Scroll to Top */}
      <div className="bg-slate-950 py-6 text-xs text-slate-500 text-left border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 Harp Global Technology LLC. Tüm Hakları Saklıdır.</p>
          
          <div className="flex flex-wrap gap-4 text-[11px]">
            <span className="hover:text-slate-300 cursor-pointer">Kullanıcı Sözleşmesi</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Gizlilik Politikası</span>
            <span>•</span>
            <span className="hover:text-slate-300 cursor-pointer">Çerez Politikası</span>
          </div>

          <button
            onClick={handleScrollToTop}
            className="bg-slate-800 hover:bg-brand-orange text-white p-2 rounded-lg transition-colors cursor-pointer flex items-center justify-center"
            title="Yukarı Dön"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

    </footer>
  );
}
