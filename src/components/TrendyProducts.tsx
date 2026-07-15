import React from "react";
import { ShoppingBag, ArrowRight, Star, Globe, ShieldCheck } from "lucide-react";
import { TREND_PRODUCTS } from "../data";
import { TrendProduct } from "../types";

interface TrendyProductsProps {
  onSelectProduct: (product: TrendProduct) => void;
}

export default function TrendyProducts({ onSelectProduct }: TrendyProductsProps) {
  return (
    <section className="py-20 bg-white" id="trend-products">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange text-xs font-semibold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-brand-orange" />
            <span>Amerika & İngiltere'de En Çok Satanlar</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-navy tracking-tight">
            Popüler Trend Ürünleri <br />
            <span className="text-brand-orange">Harp Global Altyapısıyla</span> Hemen Getirin
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Aşağıdaki popüler yurt dışı ürünlerinden dilediğinizi seçin. Biz sizin adınıza satın alalım, tüm gümrük beyanlarını vergi ödemelerini yasal ve faturalı olarak tamamlayıp kapınıza ulaştıralım!
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TREND_PRODUCTS.map((prod) => (
            <div 
              key={prod.id} 
              className="group bg-slate-50/50 hover:bg-white rounded-3xl border border-slate-150 p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-brand-orange text-left"
            >
              <div>
                {/* Product Image Frame */}
                <div className="aspect-square bg-white rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center relative mb-4">
                  <img 
                    src={prod.imageUrl} 
                    alt={prod.title} 
                    className="w-[85%] h-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-slate-900 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {prod.store}
                  </span>
                  
                  <span className="absolute bottom-3 right-3 bg-brand-orange/10 text-brand-orange text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                    {prod.category === "cosmetics" ? "Makyaj & Bakım" : prod.category === "electronics" ? "Teknoloji" : "Aksesuar"}
                  </span>
                </div>

                {/* Brands and Titles */}
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                  {prod.brand}
                </span>
                <h4 className="font-display font-bold text-base text-brand-navy mt-1 group-hover:text-brand-orange transition-colors line-clamp-2 min-h-[48px]">
                  {prod.title}
                </h4>
              </div>

              {/* Price and Action Button footer */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Yurtdışı Fiyatı</span>
                  <span className="font-mono font-bold text-lg text-brand-navy">
                    ${prod.priceUSD.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => onSelectProduct(prod)}
                  className="bg-brand-navy group-hover:bg-brand-orange text-white p-3 rounded-xl transition-all duration-200 cursor-pointer shadow-sm active:scale-95 flex items-center justify-center"
                  title="Fiyat Hesapla & Satın Al"
                >
                  <ShoppingBag className="w-4.5 h-4.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Informative footer for confidence */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-50 border border-slate-200/60 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5.5 h-5.5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-brand-navy">Kendi Mali Müşavir Onayımızla Gümrük Riski Sıfır!</p>
              <p className="text-[11px] text-slate-400">Ürünlerin yasal izin belgeleri ve tüm gümrük beyannameleri şirketimiz bünyesinde faturalı olarak tamamlanır.</p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              const el = document.getElementById("calculator");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-xs sm:text-sm font-semibold text-brand-orange hover:text-brand-orange-hover flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
          >
            <span>Özel Ürün Fiyatı Hesapla</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
