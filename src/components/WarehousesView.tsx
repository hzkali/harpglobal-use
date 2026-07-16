import React, { useState } from "react";
import { 
  Building2, 
  MapPin, 
  Copy, 
  Check, 
  Globe, 
  Info, 
  AlertCircle, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Plane,
  Truck
} from "lucide-react";

interface WarehousesViewProps {
  onBackToHome: () => void;
  setActiveTab?: (tab: any) => void;
}

export default function WarehousesView({ onBackToHome, setActiveTab }: WarehousesViewProps) {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const warehouses = [
    {
      id: "usa",
      country: "Amerika Birleşik Devletleri (USA)",
      shortName: "Sarasota, FL Deposu",
      flag: "🇺🇸",
      colorClass: "from-blue-50 to-indigo-50 border-blue-100",
      iconColor: "text-blue-600",
      accentBg: "bg-blue-100/60 text-blue-800",
      fullAddress: "4291 Express Lane Sarasota 34249",
      parsed: {
        addressLine1: "4291 Express Lane",
        city: "Sarasota",
        state: "Florida (FL)",
        zipCode: "34249",
        country: "United States"
      },
      tips: [
        "Amazon, eBay, Walmart, Sephora US ve tüm Amerikan sitelerinden verdiğiniz siparişler için uygundur.",
        "Satın alırken teslimat adresine (Shipping Address) bu bilgileri eksiksiz giriniz.",
        "Paketiniz depoya ulaştığında anında sistemimize tanımlanır ve size bildirim gönderilir."
      ],
      deliveryEstimate: "6 - 9 İş Günü"
    },
    {
      id: "uk",
      country: "Birleşik Krallık (UK)",
      shortName: "Londra, Middlesex Deposu",
      flag: "🇬🇧",
      colorClass: "from-rose-50 to-pink-50 border-rose-100",
      iconColor: "text-rose-600",
      accentBg: "bg-rose-100/60 text-rose-800",
      fullAddress: "Unit 9, Skyport Drive West Drayton Middx UB7 0LB",
      parsed: {
        addressLine1: "Unit 9, Skyport Drive",
        city: "West Drayton",
        county: "Middlesex (Middx)",
        zipCode: "UB7 0LB",
        country: "United Kingdom"
      },
      tips: [
        "Amazon UK, Boots, Cult Beauty ve diğer tüm İngiltere / Avrupa merkezli siteler için uygundur.",
        "Gümrük muafiyeti ve vergilendirmeler ürün cinsine (ilaç/gıda takviyesi/kozmetik vb.) göre otomatik gümrük motorumuzda hesaplanır.",
        "Londra aktarmalı hava kargo sevkiyatlarımız haftada 2 kez düzenli olarak çıkış yapmaktadır."
      ],
      deliveryEstimate: "5 - 8 İş Günü"
    }
  ];

  const handleCopy = (addressText: string, key: string) => {
    navigator.clipboard.writeText(addressText);
    setCopiedIndex(key);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-brand-cream/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumbs & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-orange">
              <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Ana Sayfa</span>
              <span>/</span>
              <span className="text-slate-400">Yurt Dışı Depolarımız</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight flex items-center gap-3">
              <Building2 className="w-8 h-8 text-brand-orange shrink-0 animate-pulse-slow" />
              <span>Yurt Dışı Sevkiyat Depolarımız</span>
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl">
              Amerika Birleşik Devletleri ve İngiltere'deki lojistik merkezlerimiz ile sınır ötesi alışverişlerinizi kolaylaştırıyor, resmi gümrük süreçlerinizi profesyonelce yönetiyoruz.
            </p>
          </div>
          
          <button
            onClick={onBackToHome}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer"
          >
            Ana Sayfaya Dön
          </button>
        </div>

        {/* Informative Alert */}
        <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-5 flex items-start gap-4 text-left">
          <div className="p-2 bg-amber-100 rounded-xl text-amber-700 shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="font-display font-bold text-sm text-brand-navy">Nasıl Kullanılır?</h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Yurt dışı internet sitelerinden (Amazon, Sephora, eBay vb.) doğrudan satın alma yaparken aşağıdaki adresleri teslimat adresi olarak kullanabilirsiniz. Siparişiniz depomuza ulaştığı anda, uzman Mali Müşavir kadromuz gümrük beyannamelerinizi yasal mevzuata %100 uygun olarak imzalar ve kapınıza sorunsuz teslimat süreci başlar.
            </p>
          </div>
        </div>

        {/* Warehouses Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {warehouses.map((wh) => (
            <div 
              key={wh.id} 
              className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between hover:border-brand-orange hover:shadow-md transition-all relative overflow-hidden group"
            >
              {/* Highlight Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 rounded-full filter blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>

              <div className="space-y-6">
                {/* Header Flag & Name */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl" role="img" aria-label="country-flag">{wh.flag}</span>
                      <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">{wh.country}</span>
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-navy tracking-tight">{wh.shortName}</h3>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-full ${wh.accentBg}`}>
                    AKTİF SEVKİYAT
                  </span>
                </div>

                {/* Main Copy Address block */}
                <div className="bg-slate-50 border border-slate-100/80 rounded-2xl p-4 space-y-3 relative">
                  <div className="flex justify-between items-center text-xs font-mono font-semibold text-slate-400">
                    <span>PANEL KOPYALAMA ADRESİ</span>
                    <button 
                      onClick={() => handleCopy(wh.fullAddress, wh.id)}
                      className="text-brand-orange hover:text-brand-orange-hover flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedIndex === wh.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                          <span className="text-emerald-600 font-bold">Kopyalandı!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Adresi Kopyala</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="font-mono text-sm font-bold text-brand-navy select-all break-words leading-relaxed pt-1">
                    {wh.fullAddress}
                  </p>
                </div>

                {/* Parsed / Detailed view */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ayrıntılı Adres Formu Girişi</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      <span className="block text-slate-400 font-medium mb-0.5">Adres Satırı (Address Line 1)</span>
                      <span className="font-mono font-bold text-brand-navy">{wh.parsed.addressLine1}</span>
                    </div>
                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      <span className="block text-slate-400 font-medium mb-0.5">Şehir (City)</span>
                      <span className="font-mono font-bold text-brand-navy">{wh.parsed.city}</span>
                    </div>
                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      <span className="block text-slate-400 font-medium mb-0.5">Eyalet / Bölge (State/County)</span>
                      <span className="font-mono font-bold text-brand-navy">{"state" in wh.parsed ? wh.parsed.state : "county" in wh.parsed ? (wh.parsed as any).county : ""}</span>
                    </div>
                    <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                      <span className="block text-slate-400 font-medium mb-0.5">Posta Kodu (ZIP/Postcode)</span>
                      <span className="font-mono font-bold text-brand-navy">{wh.parsed.zipCode}</span>
                    </div>
                  </div>
                </div>

                {/* Tips & Recommendations */}
                <div className="space-y-2 border-t border-slate-100 pt-4">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-brand-orange" />
                    <span>Önemli Bilgiler & Tavsiyeler</span>
                  </h4>
                  <ul className="space-y-2">
                    {wh.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-500">
                        <span className="text-brand-orange text-xs mt-0.5 shrink-0">•</span>
                        <span className="leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Delivery Duration & Actions */}
              <div className="border-t border-slate-100 pt-4 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-slate-500 font-semibold">
                  <Plane className="w-4 h-4 text-brand-orange shrink-0 animate-pulse-slow" />
                  <span>Ortalama Türkiye Teslimat Süresi:</span>
                  <span className="text-brand-navy font-bold">{wh.deliveryEstimate}</span>
                </div>
                {setActiveTab && (
                  <button 
                    onClick={() => setActiveTab("calculator")}
                    className="text-brand-orange hover:text-brand-orange-hover font-bold flex items-center gap-1 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <span>Maliyeti Hesapla</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Fully Compliant Legal & Safety Footer inside view */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/15 rounded-full filter blur-3xl pointer-events-none"></div>
          
          <div className="md:col-span-2 space-y-3 relative z-10">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-orange" />
              <h3 className="font-display font-bold text-lg text-white">Yasal Uyumluluk ve Mali Müşavir Garantisi</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Harp Global, ithal edilen tüm gönderilerde yasal mevzuat sınırlarına tam uyum taahhüt eder. Paketlerinizin depomuza girişinden gümrük beyannamelerinin imzalanmasına ve kapınıza kadar ulaştırılmasına kadarki süreç, %100 şeffaflıkla ve kendi gümrük müşavirlerimizce takip edilir. Türkiye Cumhuriyeti'ne gümrük vergisi olarak ödenen her tutarın resmi makbuzu adınıza tanzim edilir.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end relative z-10">
            <div className="bg-white/10 px-4 py-3 rounded-2xl border border-white/10 w-full text-center md:text-right">
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-mono">GÜMRÜK DESTEK HATTI</span>
              <span className="font-bold text-sm text-brand-orange block mt-0.5">destek@harpglobal.com.tr</span>
            </div>
            {setActiveTab && (
              <button 
                onClick={() => setActiveTab("dashboard")}
                className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold py-3 px-5 rounded-xl text-center shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
              >
                Paketlerimi Görüntüle
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
