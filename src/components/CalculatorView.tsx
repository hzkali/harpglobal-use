import React from "react";
import { 
  Calculator, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  Percent, 
  MapPin, 
  TrendingDown, 
  Scale, 
  AlertCircle 
} from "lucide-react";
import CustomCalculator from "./Calculator";

interface CalculatorViewProps {
  onBackToHome: () => void;
  pastedUrl: string;
  onAddCalculatedOrder: (orderData: {
    title: string;
    priceUSD: number;
    weightKg: number;
    country: "US" | "UK";
    customsTaxUSD: number;
    shippingCostUSD: number;
    serviceFeeUSD: number;
    totalUSD: number;
  }) => void;
  setActiveTab: (tab: "home" | "dashboard" | "wp-theme" | "how-it-works" | "about-us" | "calculator") => void;
}

export default function CalculatorView({ 
  onBackToHome, 
  pastedUrl, 
  onAddCalculatedOrder,
  setActiveTab 
}: CalculatorViewProps) {

  const calculatorFaqs = [
    {
      q: "Gümrük vergisi oranları nasıl hesaplanıyor?",
      a: "Türkiye gümrük mevzuatına göre yurt dışından gelen ürünlerin kategorilerine (giyim, elektronik, gıda takviyesi vb.) göre gümrük vergisi oranları değişmektedir. Hesaplayıcımız, en güncel resmi ithalat beyannamesi vergilerini otomatik olarak hesaplar."
    },
    {
      q: "Delaware depomuzun avantajı nedir?",
      a: "Amerika'da yapacağınız online alışverişlerde teslimat adresi olarak Delaware depomuzu girdiğinizde eyalet vergisi (Sales Tax) oranı %0 olur. Bu sayede ABD içi vergiden %8 ile %10 arasında anında kazanç sağlarsınız."
    },
    {
      q: "Kozmetik veya gıda takviyesi getirmek yasak değil mi?",
      a: "Bireysel kargo gönderilerinde kozmetik ve takviye edici gıdaların ülkeye girişi yasaktır. Ancak Harp Global, resmi ithalat lisansları ve kendi bünyesindeki Mali Müşavir aracılığıyla kurumsal gümrükleme beyannamesi oluşturduğu için bu ürünler yasal prosedürlere tam uyarak güvenle teslim edilir."
    },
    {
      q: "Kargo ücreti neye göre belirlenir?",
      a: "Kargo ücretleri paketinizin fiziki ağırlığı (Kg) ve hacimsel ağırlığı (Desi) arasından büyük olan baz alınarak hesaplanır. Amerika Lewes depomuzda kargo maliyetlerinizi en aza indirmek için ücretsiz hacim küçültme ve yeniden paketleme işlemi yapıyoruz."
    }
  ];

  return (
    <div className="min-h-screen bg-brand-cream/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Upper Header Navigation & Breadcrumbs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-8">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-semibold text-brand-orange">
              <span className="cursor-pointer hover:underline" onClick={onBackToHome}>Ana Sayfa</span>
              <span>/</span>
              <span className="text-slate-400">Fiyat Hesaplama</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-navy tracking-tight flex items-center gap-3">
              <Calculator className="w-8 h-8 text-brand-orange shrink-0" />
              <span>Gümrük & Kargo Hesaplama</span>
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl">
              Yurt dışından almak istediğiniz ürünün tahmini fiyat ve ağırlık bilgilerini girerek, kapınıza teslim toplam maliyeti kuruşu kuruşuna anında hesaplayın.
            </p>
          </div>
          
          <button
            onClick={onBackToHome}
            className="self-start md:self-auto px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-colors shadow-xs"
          >
            Ana Sayfaya Dön
          </button>
        </div>

        {/* Info Cards / Core Guarantees of our Calculation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-brand-navy">Mali Müşavir Güvencesi</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hesaplama motorumuz gümrük vergilerini mevzuata uygun hesaplar. Harp Global kendi bünyesinde istihdam ettiği mali müşaviriyle tüm süreci yasal olarak beyan eder.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-brand-navy">Sıfır Eyalet Vergisi (%0 Sales Tax)</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Amerika'daki Lewes, Delaware depomuz vergisiz eyalette bulunduğu için alışverişlerinizde ABD içi %8-10 eyalet vergisinden tamamen tasarruf edersiniz.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex gap-4 items-start">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
              <TrendingDown className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-bold text-sm text-brand-navy">Ücretsiz Hacim Küçültme</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Yurt dışı depomuza ulaşan ürünlerin kargo masrafını düşürmek amacıyla kutularını profesyonelce yeniden paketliyor ve hacimsel ağırlığı (Desi) küçültüyoruz.
              </p>
            </div>
          </div>

        </div>

        {/* Main Custom Calculator Container */}
        <div className="bg-white rounded-3xl border border-slate-200 p-2 sm:p-6 shadow-sm">
          <CustomCalculator 
            initialUrl={pastedUrl} 
            onAddCalculatedOrder={(data) => {
              onAddCalculatedOrder(data);
              // Switch to dashboard tab to let user see their order!
              setActiveTab("dashboard");
            }}
          />
        </div>

        {/* Calculation Guidelines & Constraints Disclaimer */}
        <div className="bg-orange-50/40 border border-orange-100 p-6 rounded-2xl flex gap-4 items-start text-left">
          <AlertCircle className="w-6 h-6 text-brand-orange shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-display font-bold text-sm text-brand-navy">Hesaplamalara Dair Önemli Bilgilendirme</h4>
            <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed">
              <p>
                * Hesaplanan tutarlar gümrük gidişatındaki dönemsel vergi oranı güncellemelerine veya döviz kurlarındaki dalgalanmalara bağlı olarak gümrükleme anında küçük değişiklikler gösterebilir.
              </p>
              <p>
                * Takviye edici gıda, vitamin ve kozmetik grubu ürünler kurumsal ithalat kapsamında değerlendirildiği için mevzuat uyarınca ek tahlil ve beyanname süreçlerine tabidir. Bu ek güvence maliyetleri hesaplayıcıda otomatik olarak fiyata yansıtılmaktadır.
              </p>
              <p>
                * Kargonuz depomuza ulaştığında tartım işlemi hassas elektronik teraziler ile yapılır. Fiziki tartım sonucundaki ağırlık ile hesaplamaya girdiğiniz tahmini ağırlık arasında fark olması halinde kargo ücreti fiziki ağırlık üzerinden güncellenir.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/80 shadow-xs space-y-8 text-left">
          <div className="space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-wider text-brand-orange uppercase">SIKÇA SORULAN SORULAR</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-brand-navy tracking-tight">
              Hesaplama ve Gümrük Hakkında SSS
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Kargo ve gümrük maliyetlerinin nasıl hesaplandığına dair merak edilen tüm detaylar:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
            {calculatorFaqs.map((faq, index) => (
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

          {/* Quick AI Help callout */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-500">
              Aradığınız sorunun cevabını bulamadınız mı? Yapay Zeka Gümrük Danışmanımız tüm sorularınızı anında yanıtlasın.
            </p>
            <button
              onClick={() => {
                const aiBtn = document.getElementById("btn-quick-ai");
                if (aiBtn) aiBtn.click();
              }}
              className="px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>Yapay Zekaya Danış</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
