import React, { useState } from "react";
import { 
  Building2, 
  Cpu, 
  HeartPulse, 
  Calendar, 
  TrendingUp, 
  Users, 
  Award, 
  Globe2, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Database, 
  Leaf, 
  Activity, 
  BarChart4, 
  Lock
} from "lucide-react";

interface HarpGlobalTechViewProps {
  onBackToHome: () => void;
}

export default function HarpGlobalTechView({ onBackToHome }: HarpGlobalTechViewProps) {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "tech" | "health">("all");

  const revenueData = [
    { year: "2020", revenue: 1.2, software: 0.8, supplements: 0.4 },
    { year: "2021", revenue: 2.8, software: 1.7, supplements: 1.1 },
    { year: "2022", revenue: 5.4, software: 3.2, supplements: 2.2 },
    { year: "2023", revenue: 9.1, software: 5.1, supplements: 4.0 },
    { year: "2024", revenue: 14.8, software: 8.2, supplements: 6.6 },
    { year: "2025", revenue: 22.5, software: 12.0, supplements: 10.5 },
    { year: "2026 (Hedef)", revenue: 35.0, software: 19.5, supplements: 15.5 },
  ];

  const milestones = [
    {
      year: "2020",
      title: "Kuruluş & Temeller",
      desc: "Harp Global Technology, 2020 yılında hem dijital altyapıyı hem de insan biyolojisini optimize etme vizyonuyla, yazılım ve takviye edici gıda (food supplements) sektörlerinde eş zamanlı faaliyet göstermek üzere kuruldu."
    },
    {
      year: "2022",
      title: "Uluslararası Ofisler & GMP Standartları",
      desc: "Yazılım kolunda ilk büyük sınır ötesi lojistik otomasyonunu canlıya alırken; gıda takviyesi kolunda FDA onaylı, GMP (İyi Üretim Uygulamaları) sertifikalı ham madde tedarik hatlarımızı kurduk."
    },
    {
      year: "2024",
      title: "Yapay Zeka Entegrasyonları",
      desc: "Lojistik hesaplama motorlarımıza yapay zekayı dahil ettik. Gıda takviyelerimizde kişiselleştirilmiş formüller sunan algoritmaları geliştirdik."
    },
    {
      year: "2026",
      title: "Sınır Tanımayan Global Teknoloji",
      desc: "Türkiye, Amerika (Delaware) ve İngiltere (Londra) merkezli operasyonlarımızla, on binlerce kurumsal ve bireysel kullanıcıya hem yazılım çözümleri hem de birinci sınıf sağlıklı yaşam ürünleri sunuyoruz."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Upper Header & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-orange">
              <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Ana Sayfa</span>
              <span>/</span>
              <span className="text-slate-400">Harp Global Tech</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight flex items-center gap-3">
              <Building2 className="w-8 h-8 text-brand-orange shrink-0" />
              <span>Harp Global Technology</span>
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl">
              2020 yılında kurulan, yüksek performanslı yazılımlar ve bilimsel olarak desteklenen gıda takviyeleri üreten öncü bir küresel teknoloji şirketidir.
            </p>
          </div>
          
          <button
            onClick={onBackToHome}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-xs"
          >
            Ana Sayfaya Dön
          </button>
        </div>

        {/* Corporate Identity Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Founding & Vision */}
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-4 shadow-xs md:col-span-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5" />
              <span>Kuruluş: 2020</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-navy">
              Geleceği Kodluyor, Sağlığı Formüle Ediyoruz
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Harp Global Technology, dijitalleşen dünyanın yazılım ihtiyaçlarını karşılarken; yoğun iş ve yaşam temposunda insan vücudunun ihtiyaç duyduğu bilimsel formüllere sahip takviye edici gıdaları aynı çatı altında birleştiren vizyoner bir holding yapısına sahiptir.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Teknoloji departmanımız global ölçekli e-ticaret, lojistik otomasyon, akıllı gümrükleme algoritmaları ve API entegrasyonları geliştirirken; gıda takviyesi birimimiz %100 saf ham maddelerle klinik olarak kanıtlanmış sağlık ve zindelik destekleri hazırlar.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="block font-display font-black text-2xl sm:text-3xl text-brand-orange">2020</span>
                <span className="block text-[11px] text-slate-400 font-medium">Kuruluş Yılı</span>
              </div>
              <div>
                <span className="block font-display font-black text-2xl sm:text-3xl text-brand-navy">3+ Ülke</span>
                <span className="block text-[11px] text-slate-400 font-medium">Global Operasyon Merkezi</span>
              </div>
            </div>
          </div>

          {/* Card 2: Core Philosophy */}
          <div className="bg-brand-navy text-white rounded-3xl p-6 sm:p-8 space-y-6 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-orange/10 rounded-full filter blur-3xl pointer-events-none"></div>
            <div className="space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-brand-orange flex items-center justify-center">
                <Globe2 className="w-5.5 h-5.5 animate-pulse-slow" />
              </div>
              <h3 className="font-display font-bold text-lg text-white">Sınır Tanımayan Sinerji</h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                "Hem yazılım algoritmalarımızda kusursuzluğu, hem de insan metabolizmasında kusursuz biyoyararlanımı hedefliyoruz. Harp Global olarak teknolojiyi hayat kalitesini artırmak için kullanıyoruz."
              </p>
            </div>
            
            <div className="pt-4 border-t border-white/10 text-xs text-slate-400 font-mono">
              Harp Global Technology Group Inc.
            </div>
          </div>

        </div>

        {/* Divisions Section */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy tracking-tight">
              Faaliyet Alanlarımız
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Harp Global çatısı altında dünya standartlarında hizmet veren iki ana operasyonel gücümüz:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Division 1: Software & Technology */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 hover:border-brand-orange transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 text-brand-orange flex items-center justify-center shadow-xs">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold tracking-wider text-brand-orange">DİJİTAL ALTYAPI</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-brand-navy">Yazılım ve Teknoloji Birimi</h3>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                Yazılım departmanımız, sınır ötesi e-ticaret entegrasyonları, gerçek zamanlı vergi hesaplama motorları, WordPress tema çevirici ve otomasyon sistemleri geliştirmektedir. Sektördeki en modern bulut mimarilerini, API ağ geçitlerini ve gümrük otomasyon algoritmalarını kuruyoruz.
              </p>

              <div className="space-y-2 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  <span>Gerçek Zamanlı Gümrük Hesaplama Motoru API'leri</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  <span>WordPress & Shopify Otomatik Dil ve Tema Çeviri Servisleri</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-orange" />
                  <span>SaaS Tabanlı Global Kargo Entegrasyon Panelleri</span>
                </div>
              </div>
            </div>

            {/* Division 2: Food Supplements */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 hover:border-brand-navy transition-all group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                  <HeartPulse className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono font-bold tracking-wider text-emerald-600">BİYO-TEKNOLOJİ & SAĞLIK</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-brand-navy">Gıda Takviyeleri Birimi</h3>
                </div>
              </div>

              <p className="text-slate-500 text-sm leading-relaxed">
                Biyoteknoloji ve gıda takviyesi birimimiz, modern insanın fiziksel ve bilişsel potansiyelini zirveye ulaştırmayı hedefler. FDA onaylı laboratuvarlarda, uzman hekim ve gıda mühendislerimizin rehberliğinde patentli, temiz ve yüksek yararlanıma sahip vitaminler, protein destekleri ve zihinsel odaklanma (Nootropik) formülleri üretiyoruz.
              </p>

              <div className="space-y-2 border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Klinik Olarak Test Edilmiş Nootropikler ve Odaklanma Destekleri</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Saf Vitamin, Mineral ve Elektrolit Formülleri</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>GMP Standartlarında, Ağır Metal Analizlerinden Geçmiş Üretim</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Dynamic Graphics & Analytics Section */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold tracking-wider text-brand-orange uppercase">BÜYÜME VE PERFORMANS GRAFİKLERİ</span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-navy">
                Harp Global Finansal & Operasyonel Büyüme
              </h3>
              <p className="text-slate-400 text-xs">2020-2026 yılları arası departman bazlı ciro dağılımları ($ Milyon bazında)</p>
            </div>

            {/* Filter */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start md:self-auto">
              <button 
                onClick={() => setActiveTab("all")} 
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${activeTab === "all" ? "bg-white text-brand-navy shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
              >
                Toplam Ciro
              </button>
              <button 
                onClick={() => setActiveTab("tech")} 
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${activeTab === "tech" ? "bg-white text-brand-orange shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
              >
                Yazılım / SaaS
              </button>
              <button 
                onClick={() => setActiveTab("health")} 
                className={`px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${activeTab === "health" ? "bg-white text-emerald-600 shadow-xs" : "text-slate-500 hover:text-slate-800"}`}
              >
                Gıda Takviyesi
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* SVG Visual Graphic (Clean, responsive, elegant, custom interactive) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="h-64 sm:h-80 w-full bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-100 flex flex-col justify-between relative">
                
                {/* Graph Title & Legend */}
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500">
                  <span>Yıllık Büyüme Hacmi (USD Milyon)</span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-brand-orange inline-block"></span> Yazılım
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500 inline-block"></span> Gıda Takviyesi
                    </span>
                  </div>
                </div>

                {/* Bars Representation */}
                <div className="flex items-end justify-between h-44 sm:h-52 px-2 sm:px-6 pt-4 border-b border-slate-200">
                  {revenueData.map((data, idx) => {
                    const total = data.revenue;
                    // max revenue is 35
                    const heightPercent = (total / 35) * 100;
                    const softwarePercent = (data.software / total) * 100;
                    const supplementsPercent = (data.supplements / total) * 100;

                    let isFocused = hoveredMetric === data.year;

                    return (
                      <div 
                        key={idx} 
                        className="flex flex-col items-center flex-1 group cursor-pointer relative"
                        onMouseEnter={() => setHoveredMetric(data.year)}
                        onMouseLeave={() => setHoveredMetric(null)}
                      >
                        {/* Tooltip on hover */}
                        <div className={`absolute -top-16 bg-brand-navy text-white text-[10px] p-2.5 rounded-xl shadow-xl z-15 pointer-events-none transition-all duration-200 w-32 ${
                          isFocused ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-90"
                        }`}>
                          <p className="font-bold border-b border-slate-700 pb-1 mb-1">{data.year}</p>
                          <p className="text-slate-300 flex justify-between"><span>Toplam:</span> <span className="font-bold text-white">${total}M</span></p>
                          <p className="text-brand-orange flex justify-between"><span>Yazılım:</span> <span>${data.software}M</span></p>
                          <p className="text-emerald-400 flex justify-between"><span>Takviye:</span> <span>${data.supplements}M</span></p>
                        </div>

                        {/* Bar */}
                        <div 
                          className="w-5 sm:w-10 rounded-t-md overflow-hidden flex flex-col justify-end transition-all duration-300" 
                          style={{ 
                            height: `${heightPercent}%`,
                            opacity: activeTab === "all" ? 1 : activeTab === "tech" ? 0.3 : 0.3
                          }}
                        >
                          <div className="bg-emerald-500" style={{ height: `${supplementsPercent}%` }}></div>
                          <div className="bg-brand-orange" style={{ height: `${softwarePercent}%` }}></div>
                        </div>

                        {/* Specific Overlay Highlight Bars if tab is filtered */}
                        {activeTab === "tech" && (
                          <div 
                            className="absolute bottom-0 w-5 sm:w-10 bg-brand-orange rounded-t-md transition-all duration-300"
                            style={{ height: `${(data.software / 35) * 100}%`, opacity: 1 }}
                          ></div>
                        )}
                        {activeTab === "health" && (
                          <div 
                            className="absolute bottom-0 w-5 sm:w-10 bg-emerald-500 rounded-t-md transition-all duration-300"
                            style={{ height: `${(data.supplements / 35) * 100}%`, opacity: 1 }}
                          ></div>
                        )}

                        <span className="text-[10px] sm:text-xs font-mono font-medium text-slate-400 mt-2 text-center truncate w-full">
                          {data.year.split(" ")[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[10px] text-slate-400 text-center italic mt-1">
                  * Verilerin üzerine gelerek ciro dökümünü inceleyebilirsiniz.
                </div>

              </div>
            </div>

            {/* Strategic KPI metrics side cards */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-orange-50/50 p-5 rounded-2xl border border-orange-100 text-left space-y-2">
                <div className="flex justify-between items-center">
                  <TrendingUp className="w-5 h-5 text-brand-orange" />
                  <span className="text-[10px] font-mono font-bold text-brand-orange bg-white px-2.5 py-0.5 rounded-full border border-orange-100">SAAS & API HIZI</span>
                </div>
                <h4 className="font-display font-bold text-sm text-brand-navy">Gelişmiş Yazılım Performansı</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Geliştirdiğimiz entegrasyonlar saniyede 12,000 API çağrısına kadar ultra düşük gecikme ile yanıt vermektedir. E-Ticaret ve lojistikte %99.99 kesintisiz uptime sunuyoruz.
                </p>
              </div>

              <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-100 text-left space-y-2">
                <div className="flex justify-between items-center">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-white px-2.5 py-0.5 rounded-full border border-emerald-100">STANDARTLAR</span>
                </div>
                <h4 className="font-display font-bold text-sm text-brand-navy">Gıda Takviyesinde Güvence</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Hammaddelerimiz tarladan şişeye kadar her partide akredite üçüncü taraf laboratuvarlarda saflık, ağır metal ve etken madde oranı açısından test edilerek formüle edilir.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Milestones / Timeline */}
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy tracking-tight">
              Kuruluştan Bugüne Kilometre Taşlarımız
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              2020'de başlayan inovasyon ve sağlık yolculuğumuzun satır başları:
            </p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-10 space-y-8 pb-4">
            {milestones.map((milestone, mIdx) => (
              <div key={mIdx} className="relative pl-6 md:pl-10 text-left group">
                
                {/* Dot marker */}
                <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-300 border-2 border-white group-hover:bg-brand-orange group-hover:scale-125 transition-all"></div>
                
                <div className="space-y-1">
                  <span className="inline-block bg-orange-100 text-brand-orange text-xs font-mono font-black px-3 py-1 rounded-md">
                    {milestone.year}
                  </span>
                  <h4 className="font-display font-bold text-base sm:text-lg text-brand-navy group-hover:text-brand-orange transition-colors">
                    {milestone.title}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-3xl">
                    {milestone.desc}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
