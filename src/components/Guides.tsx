import React, { useState } from "react";
import { HelpCircle, ArrowRight, ShieldCheck, ShoppingCart, Truck, Ship, BookOpen, X, Sparkles } from "lucide-react";
import { BLOG_GUIDES } from "../data";
import { BlogGuide } from "../types";

export default function Guides() {
  const [selectedGuide, setSelectedGuide] = useState<BlogGuide | null>(null);

  const getGuideSteps = (id: string) => {
    switch (id) {
      case "guide-walmart":
        return [
          { title: "Walmart.com Adresine Girin", desc: "Amerika Walmart mağazasında istediğiniz elektronik, giyim veya ev eşyasını bulun." },
          { title: "Sanal Depo Adresinizi Kopyalayın", desc: "Ödeme adımına (Checkout) geldiğinizde Harp Global Delaware (Tax-Free) adresinizi teslimat adresi olarak girin." },
          { title: "Fiyat Avantajı Sağlayın", desc: "Delaware vergisiz eyalet olduğu için ekstra %8 - %10 ABD içi eyalet vergisinden anında tasarruf edin." },
          { title: "Kargo Takip Kodunu Bize Bildirin", desc: "Sipariş kargoya verildiğinde takip numarasını Müşteri Panelimize girerek yönlendirmeyi başlatın." },
        ];
      case "guide-cosmetics":
        return [
          { title: "Sephora / Ulta Linkini Alın", desc: "Türkiye'de bulunmayan veya fahiş fiyatlı olan ruj, krem, palet gibi kozmetik ürünleri belirleyin." },
          { title: "Benim İçin Al Formunu Doldurun", desc: "Link, marka ve rengi girin. Biz sizin yerinize resmi Sephora sitelerinden güvenle tedarik edelim." },
          { title: "Gümrük Limitine Takılmayın", desc: "Bireysel siparişlerde kozmetik getirmek yasaktır; ancak Harp Global resmi gümrük beyannamesiyle yasal olarak ithal eder." },
          { title: "Kapınıza Sorunsuz Teslim", desc: "Gümrük vergisi faturanıza peşin eklendiğinden sürpriz gümrük maliyetleriyle karşılaşmazsınız." },
        ];
      case "guide-ebay":
        return [
          { title: "eBay Üzerinden Ürünü Seçin", desc: "Aradığınız koleksiyon parçasını, vintage giysiyi veya yedek parçayı eBay'den bulun." },
          { title: "Güvenli Satıcı Kontrolü Yapın", desc: "Satıcı puanı %95 ve üzeri olanları tercih etmenizi öneririz. Emin değilseniz AI Asistanımıza danışabilirsiniz." },
          { title: "Adres Olarak Delaware Seçin", desc: "Satıcıya teslimat adresi olarak Lewes, Delaware adresimizi vererek yola çıkartın." },
          { title: "Gümrük Beyannamesi Oluşturun", desc: "Paketiniz depomuza vardığında, faturasıyla birlikte gümrükleme işlemini uzman mali müşavirimizle başlatırız." },
        ];
      case "guide-amazon":
        default:
        return [
          { title: "Amazon US veya UK Sürümünü Açın", desc: "Amazon.com veya Amazon.co.uk üzerinden dilediğiniz ürünü inceleyin." },
          { title: "Harp Global Link Analizini Kullanın", desc: "Amazon linkini ana sayfamızdaki hesaplama çubuğuna yapıştırıp anlık kargo ve gümrük maliyetini çıkarın." },
          { title: "Müşavir Onaylı Gümrükleme", desc: "Hiçbir bürokratik belgeyle uğraşmadan, tüm vergi ödeme dökümlerini Harp Global sizin adınıza yasal olarak tamamlar." },
          { title: "Hızlı DHL eCommerce Dağıtımı", desc: "Gümrükten çıkan paketiniz DHL veya Aras Kargo ile 3-5 iş günü içinde kapınıza teslim edilir." },
        ];
    }
  };

  return (
    <div className="space-y-24 bg-brand-cream/40 py-20" id="how-it-works">
      
      {/* SECTION 1: How It Works Process */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Süreç Nasıl İşler?</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-navy tracking-tight">
            Uçtan Uca Kusursuz <br />
            <span className="text-brand-orange">Lojistik ve Gümrük Operasyonu</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Amerika veya İngiltere'den beğendiğiniz ürünlerin kapınıza ulaşma serüvenini, tüm yasal süreçleri üstlenerek yönetiyoruz:
          </p>
        </div>

        {/* Process Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Connecting arrow background lines for desktop */}
          <div className="absolute top-[35%] left-[25%] w-[15%] h-0.5 border-t border-dashed border-slate-300 hidden lg:block" />
          <div className="absolute top-[35%] left-[60%] w-[15%] h-0.5 border-t border-dashed border-slate-300 hidden lg:block" />

          {/* Step 1 */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 text-left space-y-4 shadow-xs relative hover:border-brand-orange transition-all">
            <span className="absolute top-4 right-4 font-mono font-bold text-3xl text-orange-200">01</span>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shadow-sm">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-navy">1. Ürün Tedariği ve Depolama</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              ABD ve İngiltere'deki resmi şirketlerimiz aracılığıyla, talep ettiğiniz tüm ürünleri üreticiden veya satıcıdan sizin adınıza güvenle tedarik ediyor ve yurt dışı depolarımızda teslim alıyoruz. <strong>Ürünlerimiz Amerika'dan çıkmadan önce kargo ücreti ve servis ücreti müşteriden tahsil edilir</strong>, ardından profesyonel gümrükleme sürecine geçiş yapılır.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 text-left space-y-4 shadow-xs relative hover:border-brand-orange transition-all">
            <span className="absolute top-4 right-4 font-mono font-bold text-3xl text-orange-200">02</span>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-navy">2. Profesyonel Gümrükleme</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Ürünleriniz Türkiye gümrüğüne ulaştığında, hiçbir bürokratik detayla boğuşmanıza gerek kalmaz. Kendi bünyemizdeki uzman <strong>Mali Müşavirimiz</strong> aracılığıyla resmi ithalat bildirimi yaparak tüm yasal gümrük süreçlerinizi yasal mevzuata %100 uygun tamamlıyoruz.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl border border-slate-150 p-6 sm:p-8 text-left space-y-4 shadow-xs relative hover:border-brand-orange transition-all">
            <span className="absolute top-4 right-4 font-mono font-bold text-3xl text-orange-200">03</span>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shadow-sm">
              <Truck className="w-6 h-6 animate-pulse-slow" />
            </div>
            <h3 className="font-display font-bold text-lg text-brand-navy">3. Hızlı ve Güvenli Teslimat</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Gümrük işlemleri tamamlanıp ürünleriniz teslim alındıktan hemen sonra, Türkiye’nin en seçkin kargo partnerleri olan <strong>Aras Kargo</strong>, <strong>Yurtiçi Kargo</strong> veya global dağıtım ağımız <strong>DHL eCommerce</strong> ile adresinize sevk ediyoruz.
            </p>
          </div>

        </div>

      </div>

      {/* SECTION 2: Blog Guides & Custom Popup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" id="guides">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Alışveriş Kılavuzları</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-navy tracking-tight">
            Trend Alışveriş Rehberleri <br />
            <span className="text-slate-400">Yurt Dışından Sipariş Püf Noktaları</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base">
            Amerika ve İngiltere'nin en popüler e-ticaret devlerinden alışveriş yapmanın detaylı rehberlerini inceleyin.
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {BLOG_GUIDES.map((guide) => (
            <div 
              key={guide.id}
              onClick={() => setSelectedGuide(guide)}
              className="bg-white rounded-3xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-xl hover:border-brand-orange transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between"
              id={`guide-card-${guide.id}`}
            >
              <div>
                {/* Image */}
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <img 
                    src={guide.imageUrl} 
                    alt={guide.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 text-brand-navy text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {guide.sourceName}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <h4 className="font-display font-bold text-base text-brand-navy group-hover:text-brand-orange transition-colors">
                    {guide.title}
                  </h4>
                  <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                    {guide.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center gap-1.5 text-xs font-bold text-brand-orange group-hover:text-brand-orange-hover">
                <span>Rehberi İncele</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* MODAL / POPUP DETAILS */}
      {selectedGuide && (
        <div className="fixed inset-0 bg-brand-navy/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative border border-slate-200 text-left animate-float">
            
            <div className="aspect-video relative">
              <img 
                src={selectedGuide.imageUrl} 
                alt={selectedGuide.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
              
              <button
                onClick={() => setSelectedGuide(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 text-white rounded-full transition-colors cursor-pointer"
                id="btn-close-guide"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 text-white pr-8">
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold bg-brand-orange text-white px-2.5 py-0.5 rounded-md mb-1.5 inline-block">
                  {selectedGuide.sourceName} Rehberi
                </span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                  {selectedGuide.title}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-5">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedGuide.description}
              </p>

              {/* Step checklist */}
              <div className="space-y-4">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Adım Adım Sipariş Yol Haritası</h5>
                
                <div className="space-y-3">
                  {getGuideSteps(selectedGuide.id).map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-5.5 h-5.5 rounded-full bg-orange-50 text-brand-orange border border-orange-100 flex items-center justify-center text-xs font-bold shrink-0 font-mono mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h6 className="text-xs sm:text-sm font-semibold text-brand-navy">{step.title}</h6>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-normal">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2.5">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Kapat
                </button>
                <button
                  onClick={() => {
                    setSelectedGuide(null);
                    const el = document.getElementById("calculator");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  id="btn-modal-calc"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Şimdi Hesapla & Başlat</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
