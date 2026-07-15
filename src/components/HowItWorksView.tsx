import React, { useState } from "react";
import { 
  HelpCircle, 
  ShieldCheck, 
  ShoppingCart, 
  Truck, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Sparkles, 
  DollarSign, 
  UserCheck, 
  AlertCircle,
  X,
  BookOpen
} from "lucide-react";
import { BLOG_GUIDES } from "../data";
import { BlogGuide } from "../types";

interface HowItWorksViewProps {
  onBackToHome: () => void;
  setActiveTab: (tab: "home" | "dashboard" | "wp-theme" | "how-it-works" | "about-us") => void;
}

export default function HowItWorksView({ onBackToHome, setActiveTab }: HowItWorksViewProps) {
  const [selectedGuide, setSelectedGuide] = useState<BlogGuide | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

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

  const stepsDetails = [
    {
      id: 0,
      title: "Ürün Tedariği ve Depolama",
      icon: <ShoppingCart className="w-6 h-6" />,
      tag: "ADIM 01",
      badge: "Lojistik Altyapı",
      desc: "ABD ve İngiltere'deki resmi şirketlerimiz aracılığıyla, talep ettiğiniz tüm ürünleri üreticiden veya satıcıdan sizin adınıza güvenle tedarik ediyor ve yurt dışı depolarımızda teslim alıyoruz.",
      importantNote: "Ürünlerimiz Amerika'dan çıkmadan önce kargo ücreti ve servis ücreti müşteriden tahsil edilir, ardından profesyonel gümrükleme sürecine geçiş yapılır.",
      benefits: [
        "Vergisiz Alışveriş (Lewes, Delaware Depomuz eyalet vergisinden muaftır %0 Tax)",
        "Ücretsiz Paket Kontrolü (Gelen ürünlerin fiziki durumu fotoğraflanarak panelinize yüklenir)",
        "Yeniden Paketleme & Hacim Küçültme (Kargo ücretinizi düşürmek için paketler optimize edilir)"
      ]
    },
    {
      id: 1,
      title: "Profesyonel Gümrükleme",
      icon: <ShieldCheck className="w-6 h-6" />,
      tag: "ADIM 02",
      badge: "Mevzuat ve Uyum",
      desc: "Ürünleriniz Türkiye gümrüğüne ulaştığında, hiçbir bürokratik detayla boğuşmanıza gerek kalmaz. Kendi bünyemizdeki uzman Mali Müşavirimiz aracılığıyla resmi ithalat bildirimi yaparak tüm yasal gümrük süreçlerinizi yasal mevzuata %100 uygun tamamlıyoruz.",
      importantNote: "Bireysel limitlere veya yasaklara takılmadan, Harp Global'in kurumsal gümrük lisansı sayesinde gümrük işlemleriniz sorunsuz çözülür.",
      benefits: [
        "Mali Müşavir Onaylı Beyanname (Tüm işlemler resmi mevzuatlara tam uygun ilerler)",
        "Önceden Hesaplanmış Vergi Güvencesi (Kapıda ekstra gümrük vergisi şoku yaşanmaz)",
        "Kurumsal İthalat Çözümü (Kozmetik, takviye edici gıda ve teknoloji ürünleri güvenle geçer)"
      ]
    },
    {
      id: 2,
      title: "Hızlı ve Güvenli Teslimat",
      icon: <Truck className="w-6 h-6" />,
      tag: "ADIM 03",
      badge: "Son Kilometre Dağıtımı",
      desc: "Gümrük işlemleri tamamlanıp ürünleriniz teslim alındıktan hemen sonra, Türkiye’nin en seçkin kargo partnerleri olan Aras Kargo, Yurtiçi Kargo veya global dağıtım ağımız DHL eCommerce ile adresinize sevk ediyoruz.",
      importantNote: "Siparişinizi baştan sona tek bir takip kodu ile hem yurt dışı aşamasında hem de yurt içi aşamasında canlı izleyebilirsiniz.",
      benefits: [
        "Hızlı Dağıtım Entegrasyonu (İstanbul gümrüğünden sonra 24-48 saatte teslim)",
        "Hasar ve Kayıp Sigortası (Tüm kargolarınız Harp Global güvencesiyle %100 sigortalı taşınır)",
        "Canlı Bildirim Desteği (Kargonuz her durum değiştirdiğinde SMS ve E-Posta bilgilendirmesi)"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Upper Breadcrumbs & Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-orange">
              <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Ana Sayfa</span>
              <span>/</span>
              <span className="text-slate-400">Nasıl Çalışır?</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight">
              Süreç Nasıl İşler?
            </h1>
            <p className="text-slate-500 text-sm max-w-xl">
              Amerika ve İngiltere'den kapınıza uzanan gümrük ve lojistik sürecinin tüm yasal detayları ve işleyişi.
            </p>
          </div>
          
          <button
            onClick={onBackToHome}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-xs"
          >
            Ana Sayfaya Dön
          </button>
        </div>

        {/* Process Visualizer and Interactive Stepper */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stepper Buttons (Left side on desktop) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">SÜREÇ ADIMLARI</p>
              
              <div className="space-y-2">
                {stepsDetails.map((step, idx) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(idx)}
                    className={`w-full text-left p-4 rounded-xl transition-all flex items-start gap-4 border cursor-pointer ${
                      activeStep === idx
                        ? "bg-brand-navy text-white border-brand-navy shadow-md"
                        : "bg-transparent hover:bg-slate-50 text-slate-700 border-transparent"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      activeStep === idx ? "bg-brand-orange text-white" : "bg-orange-50 text-brand-orange"
                    }`}>
                      {step.icon}
                    </div>
                    <div>
                      <span className={`block text-[10px] font-mono font-bold tracking-wider ${
                        activeStep === idx ? "text-orange-300" : "text-brand-orange"
                      }`}>
                        {step.tag}
                      </span>
                      <span className="block font-display font-bold text-sm mt-0.5">{step.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Support Callout */}
            <div className="bg-orange-50/50 p-6 rounded-2xl border border-orange-100/80 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-brand-orange">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-display font-bold text-sm text-brand-navy">Canlı Gümrük Desteği</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kafanıza takılan bir gümrük prosedürü mü var? Yapay zeka gümrük uzmanımız 7/24 size rehberlik etmek için hazır.
              </p>
              <button
                onClick={() => {
                  const aiBtn = document.getElementById("btn-quick-ai");
                  if (aiBtn) aiBtn.click();
                }}
                className="w-full py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Yapay Zekaya Danış</span>
              </button>
            </div>
          </div>

          {/* Stepper Detail View (Right side on desktop) */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-8 min-h-[450px] flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header inside detail card */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shadow-xs">
                    {stepsDetails[activeStep].icon}
                  </div>
                  <div>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-mono font-bold">
                      {stepsDetails[activeStep].badge}
                    </span>
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl text-brand-navy mt-1">
                      {stepsDetails[activeStep].title}
                    </h2>
                  </div>
                </div>
                <span className="font-mono font-black text-4xl text-orange-200">{stepsDetails[activeStep].tag}</span>
              </div>

              {/* Main Desc */}
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {stepsDetails[activeStep].desc}
              </p>

              {/* Important Alert Notice */}
              <div className="flex gap-3 bg-amber-50/60 border border-amber-100 p-4 rounded-xl text-amber-900">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-xs font-bold block text-amber-800">Önemli Kural / Bilgilendirme</span>
                  <p className="text-xs text-amber-700/90 leading-relaxed">
                    {stepsDetails[activeStep].importantNote}
                  </p>
                </div>
              </div>

              {/* Benefits Checklist */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Avantajlar & Güvenceler</h4>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-3">
                  {stepsDetails[activeStep].benefits.map((benefit, bIdx) => (
                    <div key={bIdx} className="flex gap-2 items-start">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Footer with action */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <span className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold">US</span>
                  <span className="w-6 h-6 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[8px] font-bold">UK</span>
                  <span className="w-6 h-6 rounded-full bg-brand-orange text-white border-2 border-white flex items-center justify-center text-[8px] font-bold">TR</span>
                </div>
                <span className="text-[11px] text-slate-400 font-medium">Harp Global Lojistik ve Gümrük Ağı</span>
              </div>

              <div className="flex gap-3">
                {activeStep > 0 && (
                  <button
                    onClick={() => setActiveStep(activeStep - 1)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
                  >
                    Önceki Adım
                  </button>
                )}
                {activeStep < stepsDetails.length - 1 ? (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="px-5 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Sonraki Adım</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => setActiveTab("home")}
                    className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>Hesaplayıcıyı Kullan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* SECTION 2: Blog Guides & Custom Popup */}
        <div className="space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mağaza Kılavuzları</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy tracking-tight">
              Yurt Dışı Sitelerden Alışveriş Kılavuzları
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Dünyanın en büyük perakendecilerinden alışveriş yaparken adresimizi nasıl kullanacağınızı öğrenin.
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BLOG_GUIDES.map((guide) => (
              <div 
                key={guide.id}
                onClick={() => setSelectedGuide(guide)}
                className="bg-brand-cream/10 rounded-2xl border border-slate-150 overflow-hidden shadow-xs hover:shadow-lg hover:border-brand-orange transition-all duration-300 group cursor-pointer text-left flex flex-col justify-between"
                id={`how-guide-${guide.id}`}
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
                  <div className="p-4 space-y-1.5">
                    <h4 className="font-display font-bold text-sm text-brand-navy group-hover:text-brand-orange transition-colors">
                      {guide.title}
                    </h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2">
                      {guide.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 flex items-center gap-1 text-[11px] font-bold text-brand-orange">
                  <span>Adımları Gör</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>

              </div>
            ))}
          </div>

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
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 text-white pr-8">
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold bg-brand-orange text-white px-2.5 py-0.5 rounded-md mb-1.5 inline-block">
                  {selectedGuide.sourceName} Rehberi
                </span>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  {selectedGuide.title}
                </h3>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {selectedGuide.description}
              </p>

              {/* Step checklist */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Adım Adım Sipariş Yol Haritası</h5>
                
                <div className="space-y-2">
                  {getGuideSteps(selectedGuide.id).map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-5 h-5 rounded-full bg-orange-50 text-brand-orange border border-orange-100 flex items-center justify-center text-[10px] font-bold shrink-0 font-mono mt-0.5">
                        {idx + 1}
                      </div>
                      <div>
                        <h6 className="text-xs font-semibold text-brand-navy">{step.title}</h6>
                        <p className="text-[10px] text-slate-500 leading-normal">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedGuide(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Kapat
                </button>
                <button
                  onClick={() => {
                    setSelectedGuide(null);
                    onBackToHome();
                    setTimeout(() => {
                      const el = document.getElementById("calculator-section");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }, 150);
                  }}
                  className="px-4 py-2 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Siparişi Hesapla</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
