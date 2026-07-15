import React, { useState } from "react";
import { 
  ShoppingBag, 
  ArrowRight, 
  Star, 
  Globe, 
  ShieldCheck, 
  Search, 
  Filter, 
  HelpCircle, 
  Info,
  DollarSign,
  Package,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { TREND_PRODUCTS } from "../data";
import { TrendProduct } from "../types";

interface TrendyProductsViewProps {
  onBackToHome: () => void;
  onSelectProduct: (product: TrendProduct) => void;
  setActiveTab: (tab: "home" | "dashboard" | "wp-theme" | "how-it-works" | "about-us" | "calculator" | "trend-products") => void;
}

export default function TrendyProductsView({ 
  onBackToHome, 
  onSelectProduct,
  setActiveTab 
}: TrendyProductsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "cosmetics" | "electronics" | "other">("all");

  const categories = [
    { id: "all", name: "Tüm Ürünler" },
    { id: "cosmetics", name: "Kozmetik & Bakım" },
    { id: "electronics", name: "Teknoloji & Elektronik" },
    { id: "other", name: "Yaşam & Aksesuar" }
  ] as const;

  const filteredProducts = TREND_PRODUCTS.filter((prod) => {
    const matchesSearch = 
      prod.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.store.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || prod.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Calculate estimated total land-cost including customs & shipping
  const getEstimatedCosts = (priceUSD: number, category: string) => {
    const isCosmetics = category === "cosmetics";
    const customsRate = isCosmetics ? 0.30 : 0.20; // Kozmetikte vergi yükü daha fazla
    const estimatedWeight = isCosmetics ? 0.4 : 1.5; // Tahmini ağırlık kg
    
    const customsTax = priceUSD * customsRate;
    const shipping = estimatedWeight <= 1 ? 25 : 25 + (estimatedWeight - 1) * 10;
    const serviceFee = 5.00;
    const total = priceUSD + customsTax + shipping + serviceFee;
    
    return {
      customsTax,
      shipping,
      serviceFee,
      total
    };
  };

  const trendFaqs = [
    {
      q: "Yurt dışından kozmetik ürünleri getirmek yasal mı?",
      a: "Evet, Harp Global sayesinde tamamen yasaldır! Bireysel kargolarla kozmetik ithalatı yasak olsa da, Harp Global kendi gümrük lisansı ve bünyesindeki Mali Müşavir eşliğinde kurumsal beyanname düzenler. Ürünleriniz mevzuata %100 uygun şekilde kapınıza faturalı teslim edilir."
    },
    {
      q: "Kendi istediğim başka bir ürünü nasıl getirtebilirim?",
      a: "Bu sayfadaki ürünlerin dışında, Amerika veya İngiltere web sitelerinden dilediğiniz ürünün linkini kopyalayıp 'Fiyat Hesaplama' sayfamıza yapıştırabilir ya da 'Benim İçin Satın Al' formuna ekleyerek anında sipariş oluşturabilirsiniz."
    },
    {
      q: "Gümrük vergisi ve kargo için ekstra ücret ödeyecek miyim?",
      a: "Hayır. Harp Global hesaplayıcıları ve sunduğu teklifler her şey dahil ('Kapıdan Kapıya Teslim') fiyatlardır. Siz ödemenizi yaptıktan sonra Türkiye'deki adresinize ulaşana kadar hiçbir gümrük vergisi, muayene ücreti veya kurye bedeli adı altında ek ücret talep edilmez."
    },
    {
      q: "Ürünler ne kadar sürede Türkiye'deki adresime teslim edilir?",
      a: "Amerika (Delaware) veya İngiltere (Londra) depomuza teslim edilen paketleriniz, her hafta düzenlenen düzenli hava kargo sevkiyatlarımızla yola çıkar. Depomuza ulaştıktan sonra ortalama 5-7 iş günü içerisinde gümrüklenerek Türkiye adresinize teslim edilir."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Upper Navigation & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-8">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-orange">
              <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Ana Sayfa</span>
              <span>/</span>
              <span className="text-slate-400 font-medium">Trend Ürünler</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight flex items-center gap-3">
              <Star className="w-8 h-8 text-brand-orange fill-brand-orange shrink-0" />
              <span>Yurt Dışı Popüler Trend Ürünler</span>
            </h1>
            <p className="text-slate-500 text-sm max-w-3xl">
              Amerika ve İngiltere'de en çok talep gören, Türkiye'de bulunmayan ya da fiyat farkı yüksek popüler ürünler. 
              Sizin için satın alıyor, gümrük süreçlerini Mali Müşavirimizle çözüp kapınıza teslim ediyoruz.
            </p>
          </div>
          
          <button
            onClick={onBackToHome}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-xs"
          >
            Ana Sayfaya Dön
          </button>
        </div>

        {/* Dynamic Filters & Search Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Ürün adı, marka veya mağaza ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange focus:bg-white transition-all"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-400 mr-2 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              Kategoriler:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-brand-navy text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200/80 text-slate-600"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Standalone Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProducts.map((prod) => {
              const estimate = getEstimatedCosts(prod.priceUSD, prod.category);
              return (
                <div 
                  key={prod.id} 
                  className="group bg-white rounded-3xl border border-slate-200/80 p-6 flex flex-col md:flex-row gap-6 hover:shadow-xl hover:border-brand-orange transition-all duration-300 text-left"
                >
                  {/* Product Image Frame */}
                  <div className="w-full md:w-48 aspect-square md:aspect-auto md:h-full bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 flex items-center justify-center relative shrink-0">
                    <img 
                      src={prod.imageUrl} 
                      alt={prod.title} 
                      className="w-[85%] h-[85%] object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 bg-brand-navy text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {prod.store}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-brand-orange/10 text-brand-orange text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                      {prod.category === "cosmetics" ? "Makyaj & Bakım" : prod.category === "electronics" ? "Teknoloji" : "Aksesuar"}
                    </span>
                  </div>

                  {/* Product Details & Calculations Panel */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                          {prod.brand}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Stokta Var
                        </span>
                      </div>
                      
                      <h3 className="font-display font-extrabold text-lg text-brand-navy group-hover:text-brand-orange transition-colors line-clamp-2">
                        {prod.title}
                      </h3>

                      {/* Estimated Land Cost Breakdown */}
                      <div className="bg-slate-50/70 p-3.5 rounded-xl space-y-2 border border-slate-100/80">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Yurt dışı ürün fiyatı:</span>
                          <span className="font-mono font-bold text-slate-700">${prod.priceUSD.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500 flex items-center gap-1">
                            Resmi Gümrük Vergisi ({prod.category === "cosmetics" ? "%30" : "%20"}):
                            <Info className="w-3 h-3 text-slate-400 cursor-help" title="Mali Müşavir beyannameli resmi ithalat gümrükleme vergisi" />
                          </span>
                          <span className="font-mono text-slate-600">+${estimate.customsTax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Hava Kargo + Dağıtım:</span>
                          <span className="font-mono text-slate-600">+${estimate.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-500">Müşavir & Hizmet Bedeli:</span>
                          <span className="font-mono text-slate-600">+${estimate.serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-slate-200/60 pt-2 flex justify-between items-center">
                          <span className="text-xs font-bold text-brand-navy">Kapınıza Teslim Toplam:</span>
                          <span className="font-mono font-extrabold text-brand-orange text-base">${estimate.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                      <button
                        onClick={() => onSelectProduct(prod)}
                        className="flex-1 bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold py-2.5 px-4 rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        <span>Hesaplamayı Seç & Getirt</span>
                      </button>
                      <button
                        onClick={() => {
                          // Quick jump to Custom Calculator with pre-filled state
                          setActiveTab("calculator");
                        }}
                        className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                        title="Özel Bilgilerle Hesapla"
                      >
                        Maliyeti Düzenle
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-4">
            <Package className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-display font-bold text-lg text-brand-navy">Aramanıza Uygun Ürün Bulunamadı</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              "{searchQuery}" aramasıyla eşleşen bir trend ürün bulunamadı. Dilerseniz hemen hesaplama sayfamıza gidip istediğiniz herhangi bir linkle anında teklif oluşturabilirsiniz!
            </p>
            <button
              onClick={() => setActiveTab("calculator")}
              className="px-6 py-3 rounded-xl bg-brand-orange text-white text-xs font-bold hover:bg-brand-orange-hover transition-colors shadow-xs"
            >
              Fiyat Hesaplama Sayfasına Git
            </button>
          </div>
        )}

        {/* Corporate Guarantees Grid for Buying Trend Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-150 flex gap-3 items-start">
            <ShieldCheck className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs sm:text-sm text-brand-navy">Mali Müşavir Beyannamesi</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kozmetik, gıda takviyesi ve elektronik gümrük beyannameleri, firmamızın resmi mali müşaviri tarafından onaylanır.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-150 flex gap-3 items-start">
            <Globe className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs sm:text-sm text-brand-navy">%0 Sales Tax (Eyalet Vergisi)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Tüm satın alımlarda Delaware vergisiz depomuzu kullandığımız için ABD içi %8-10 oranındaki ek satış vergisinden muafsınız.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-150 flex gap-3 items-start">
            <DollarSign className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs sm:text-sm text-brand-navy">Gizli Maliyet Yok</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hesaplama dökümünde gördüğünüz nihai fiyattan başka hiçbir isim altında ek gümrük vergisi, muayene veya işlem bedeli ödemezsiniz.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-150 flex gap-3 items-start">
            <Package className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-display font-bold text-xs sm:text-sm text-brand-navy">Güvenli Kutulama</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kırılabilir makyaj malzemeleri veya değerli teknoloji ürünleri, depolarımızda ücretsiz olarak darbe emici balonlu naylonlarla kaplanır.
              </p>
            </div>
          </div>
        </div>

        {/* Warning callout */}
        <div className="bg-orange-50/40 border border-orange-100 p-6 rounded-2xl flex gap-4 items-start text-left">
          <AlertCircle className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h4 className="font-display font-bold text-sm text-brand-navy">İthalat ve Teslimat Güvencesi</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bu sayfada listelenen ürünlerin hepsi yasal gümrük prosedürlerine tabi olarak kurumsal ithalat kapsamında Türkiye'ye getirilmektedir. 
              Gümrük kapılarında yaşanan bireysel kargo kısıtlamaları veya T.C. Kimlik numarası limiti engelleri Harp Global kurumsal lisanslı kargo sevkiyatları için geçerli değildir. 
              Sınırsız adette ve hacimde sipariş verebilirsiniz.
            </p>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-8 text-left">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold tracking-wider text-brand-orange uppercase">SIKÇA SORULAN SORULAR</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy tracking-tight">
              Trend Ürün Siparişleri ve Gümrükleme SSS
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Trend ürün getirtme süreci ve yasal detaylara dair aklınıza takılabilecek soruların yanıtları:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {trendFaqs.map((faq, index) => (
              <div key={index} className="space-y-2">
                <h4 className="font-display font-bold text-sm sm:text-base text-brand-navy flex gap-2 items-start">
                  <HelpCircle className="w-4.5 h-4.5 text-brand-orange shrink-0 mt-1" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-500 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
