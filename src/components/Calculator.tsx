import React, { useState, useEffect } from "react";
import { Calculator, ArrowRight, ShieldAlert, Check, HelpCircle, DollarSign, Weight, ShoppingBag, Percent } from "lucide-react";
import { CalculatorParams, CalculatorResult } from "../types";

interface CalculatorProps {
  initialUrl?: string;
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
}

export default function CustomCalculator({ initialUrl, onAddCalculatedOrder }: CalculatorProps) {
  const [price, setPrice] = useState<number>(49);
  const [weightKg, setWeightKg] = useState<number>(1.2);
  const [category, setCategory] = useState<"clothing" | "electronics" | "cosmetics" | "supplements" | "other">("clothing");
  const [country, setCountry] = useState<"US" | "UK">("US");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<CalculatorResult | null>(null);
  const [productTitle, setProductTitle] = useState<string>("İthal Giyim Ürünü");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Dynamically update productTitle when category changes
  useEffect(() => {
    const categoryLabels: Record<string, string> = {
      clothing: "İthal Giyim Ürünü",
      electronics: "İthal Elektronik Ürün",
      cosmetics: "İthal Kozmetik Ürün",
      supplements: "İthal İlaç ve Gıda Takviyesi",
      other: "İthal Diğer Sınıf Ürün",
    };
    setProductTitle(categoryLabels[category] || "İthal Edilecek Ürün");
  }, [category]);

  // Re-calculate whenever input variables change
  const handleCalculate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/calculate-customs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, weightKg, category, country }),
      });
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        throw new Error("Backend calculate failed");
      }
    } catch (e) {
      // Client-side fallback calculation in case of server offline
      const shippingCost = weightKg <= 1 ? 25 : 25 + (weightKg - 1) * 10;
      
      let customsTax = 0;
      if (category === "supplements") {
        customsTax = price <= 1500 ? 0 : price * 0.60;
      } else {
        customsTax = price * 0.60;
      }
      
      const weightBasedFee = weightKg * 40;
      const priceBasedFee = Math.ceil(price / 100) * 40;
      const serviceFee = Math.max(weightBasedFee, priceBasedFee);
      
      const totalUSD = price + shippingCost + customsTax + serviceFee;
      const usdToTry = 49.00;

      setResult({
        originalPrice: price,
        shippingCost,
        customsTax,
        serviceFee,
        totalUSD,
        totalTRY: totalUSD * usdToTry,
        exchangeRate: usdToTry,
        currency: "USD",
        breakdown: {
          productPrice: price,
          shipping: shippingCost,
          customs: customsTax,
          service: serviceFee
        }
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleCalculate();
  }, [price, weightKg, category, country]);

  // Extract initial info if user pasted a link in hero or selected a trend product
  useEffect(() => {
    if (initialUrl) {
      if (initialUrl.includes("photo-1620916566398") || initialUrl.includes("toast") || initialUrl.includes("rhode")) {
        setPrice(24);
        setWeightKg(0.4);
        setCategory("cosmetics");
        setProductTitle("Rhode Peptide Lip Tint - Toast");
      } else if (initialUrl.includes("photo-1546435770") || initialUrl.includes("airpods") || initialUrl.includes("max")) {
        setPrice(549);
        setWeightKg(1.5);
        setCategory("electronics");
        setProductTitle("AirPods Max Silver Noise Cancelling");
      } else if (initialUrl.includes("photo-1685361288") || initialUrl.includes("stanley") || initialUrl.includes("quencher")) {
        setPrice(45);
        setWeightKg(1.5);
        setCategory("other");
        setProductTitle("Stanley Quencher H2.0 FlowState 40oz");
      } else if (initialUrl.includes("photo-1593113630") || initialUrl.includes("knife") || initialUrl.includes("dalstrong")) {
        setPrice(189);
        setWeightKg(1.5);
        setCategory("other");
        setProductTitle("Dalstrong Gladiator Series 8-Piece Knife Block Set");
      } else if (initialUrl.includes("sephora")) {
        setCategory("cosmetics");
        setProductTitle("Yurt Dışı Kozmetik Ürünü");
      } else if (initialUrl.includes("amazon") || initialUrl.includes("ebay") || initialUrl.includes("walmart")) {
        setCategory("clothing");
        setProductTitle("İthal Edilen Mağaza Ürünü");
      }
    }
  }, [initialUrl]);

  const handleOrderSubmission = () => {
    if (!result) return;
    onAddCalculatedOrder({
      title: productTitle || "Hesaplanan Ürün Siparişi",
      priceUSD: result.originalPrice,
      weightKg: weightKg,
      country: country,
      customsTaxUSD: result.customsTax,
      shippingCostUSD: result.shippingCost,
      serviceFeeUSD: result.serviceFee,
      totalUSD: result.totalUSD,
    });
    setSuccessMsg("Sipariş başarıyla müşteri panelinize aktarıldı! 'Müşteri Paneli' sekmesine giderek görebilirsiniz.");
    setTimeout(() => {
      setSuccessMsg(null);
    }, 5000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden max-w-5xl mx-auto" id="calculator">
      <div className="grid grid-cols-1 md:grid-cols-12">
        
        {/* Left Side: Input Fields */}
        <div className="md:col-span-6 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-100 text-left">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="p-2 rounded-lg bg-orange-50 text-brand-orange">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-brand-navy">Gümrük & Kargo Hesaplama</h3>
              <p className="text-xs text-slate-400">ABD veya İngiltere siparişiniz için anlık vergi dökümü</p>
            </div>
          </div>

          <div className="space-y-5">
            {/* Price Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Ürün Fiyatı (Mağaza Satış)</label>
                <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-lg px-2 py-0.5">
                  <span className="text-xs text-slate-400 font-mono font-bold">$</span>
                  <input
                    type="number"
                    min="5"
                    max="10000"
                    className="w-16 bg-transparent text-xs font-mono font-bold text-brand-orange text-right focus:outline-none"
                    value={price}
                    onChange={(e) => setPrice(Math.min(10000, Math.max(0, Number(e.target.value))))}
                  />
                  <span className="text-[10px] text-slate-400 font-mono">USD</span>
                </div>
              </div>
              <input
                type="range"
                min="5"
                max="10000"
                step="5"
                className="w-full accent-brand-orange"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>$5 USD</span>
                <span>$5,000 USD</span>
                <span>$10,000 USD</span>
              </div>
            </div>

            {/* Weight Slider */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Paket Desi / Ağırlığı (kg)</label>
                <span className="text-sm font-mono font-bold text-brand-navy">{weightKg} kg</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="25"
                step="0.1"
                className="w-full accent-brand-orange"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0.1 kg</span>
                <span>12.5 kg</span>
                <span>25 kg</span>
              </div>
            </div>

            {/* Store Country Selection */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Çıkış Ülkesi</label>
                <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setCountry("US")}
                    className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all ${
                      country === "US" ? "bg-white text-brand-orange shadow-xs" : "text-slate-500 hover:text-brand-navy"
                    }`}
                  >
                    ABD (USA)
                  </button>
                  <button
                    type="button"
                    onClick={() => setCountry("UK")}
                    className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all ${
                      country === "UK" ? "bg-white text-brand-orange shadow-xs" : "text-slate-500 hover:text-brand-navy"
                    }`}
                  >
                    İngiltere (UK)
                  </button>
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Kategori</label>
                <select
                  value={category}
                  onChange={(e: any) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-brand-navy focus:outline-none"
                >
                  <option value="electronics">Elektronik</option>
                  <option value="clothing">Giyim</option>
                  <option value="cosmetics">Kozmetik</option>
                  <option value="supplements">İlaç ve Gıda Takviyesi</option>
                  <option value="other">Diğer Sınıflar</option>
                </select>
              </div>
            </div>

            {/* Restrictions Box */}
            {category === "cosmetics" && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex gap-2.5 text-xs text-amber-800">
                <ShieldAlert className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Kozmetik Uyarısı:</strong> Parfümler (yanıcı sıvı) havayolu kuralları gereği taşınamaz. Makyaj malzemeleri, krem ve losyonlar gümrük uzmanlarımızca sorunsuz şekilde geçirilir.
                </p>
              </div>
            )}
            
            {category === "supplements" && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl flex gap-2.5 text-xs text-blue-800">
                <ShieldAlert className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
                <p>
                  <strong>İlaç & Gıda Takviyesi Uyarısı:</strong> İlaç, protein tozu, vitamin ve gıda takviyeleri ambalajı açılmamış şekilde ithal edilir. $1500 limitine kadar gümrük vergisi tamamen %0'dır!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Invoice Breakdown */}
        <div className="md:col-span-6 p-6 sm:p-8 bg-slate-50 flex flex-col justify-between text-left relative">
          
          <div>
            <h4 className="font-display font-bold text-lg text-brand-navy mb-4">Gümrük ve Kargo Fatura Dökümü</h4>
            
            {result ? (
              <div className="space-y-4">
                {/* Visual bar chart representing proportion of cost */}
                <div className="h-2 w-full rounded-full bg-slate-200 flex overflow-hidden">
                  <div 
                    style={{ width: `${(result.originalPrice / result.totalUSD) * 100}%` }} 
                    className="h-full bg-brand-navy"
                    title="Ürün Bedeli"
                  />
                  <div 
                    style={{ width: `${(result.shippingCost / result.totalUSD) * 100}%` }} 
                    className="h-full bg-brand-orange"
                    title="Uluslararası Lojistik"
                  />
                  <div 
                    style={{ width: `${(result.customsTax / result.totalUSD) * 100}%` }} 
                    className="h-full bg-emerald-500"
                    title="Gümrük Vergisi"
                  />
                  <div 
                    style={{ width: `${(result.serviceFee / result.totalUSD) * 100}%` }} 
                    className="h-full bg-purple-500"
                    title="Harp Global Hizmet Bedeli"
                  />
                </div>

                {/* Legend */}
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] text-slate-400 font-medium">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-brand-navy"></span> Ürün Bedeli
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-brand-orange"></span> Kargo
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Gümrük Vergisi
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Hizmet Bedeli
                  </span>
                </div>

                {/* Itemized list */}
                <div className="border-t border-slate-200/60 pt-4 space-y-3 font-mono text-xs text-slate-600">
                  <div className="flex justify-between items-center">
                    <span>Orijinal Ürün Fiyatı:</span>
                    <span className="font-bold text-brand-navy">${result.originalPrice.toFixed(2)} USD</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      Uluslararası Kargo Bedeli:
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" title="1 kg için $25 USD, sonraki her kg için +$10 USD kargo ücreti" />
                    </span>
                    <span className="font-bold text-brand-navy">${result.shippingCost.toFixed(2)} USD</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1">
                        Müşavir Onaylı Gümrük Vergisi:
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400" title="Elektronik vb. ürünlerde %60, ilaç ve gıda takviyesinde $1500 limitine kadar %0 vergi!" />
                      </span>
                      <span className="font-bold text-brand-navy">${result.customsTax.toFixed(2)} USD</span>
                    </div>
                    {result.customsTax > 0 && (
                      <div className="text-[10px] text-amber-600 font-sans text-left flex items-start gap-1 bg-amber-50/40 border border-amber-100/50 rounded-lg p-1.5 mt-0.5">
                        <span>⚠️</span>
                        <span><strong>Uyarı:</strong> Bu ücret Türkiye Cumhuriyeti'ne gümrük vergisi olarak ödenmektedir.</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      Harp Global Altyapı Bedeli:
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" title="Kilogram başına veya her $100 ürün bedeli için $40 altyapı ücreti (hangisi yüksekse)" />
                    </span>
                    <span className="font-bold text-brand-navy">${result.serviceFee.toFixed(2)} USD</span>
                  </div>
                </div>

                {/* Total box */}
                <div className="bg-white border border-slate-200 rounded-2xl p-4 flex justify-between items-center mt-4 shadow-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Kapı Teslim Toplam</span>
                    <span className="font-display font-extrabold text-2xl text-brand-orange">${result.totalUSD.toFixed(2)} USD</span>
                  </div>
                  <div className="text-right border-l border-slate-100 pl-4">
                    <span className="text-[10px] text-slate-400 font-bold tracking-wider block">TL Karşılığı (Tahmini)</span>
                    <span className="font-display font-extrabold text-lg text-brand-navy">₺{result.totalTRY.toLocaleString("tr-TR", { maximumFractionDigits: 0 })} TRY</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Döviz Kuru: 1$ = {result.exchangeRate} TL</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center text-slate-400 text-sm">
                Hesaplama yapılıyor...
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200/60">
            {successMsg && (
              <div className="mb-4 p-2.5 bg-green-50 text-green-800 text-xs rounded-lg flex items-center gap-2 border border-green-200">
                <Check className="w-4 h-4 text-green-600 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              onClick={handleOrderSubmission}
              className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white text-sm font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shadow-brand-orange/10 active:scale-95"
              id="btn-calculator-submit"
            >
              <ShoppingBag className="w-4.5 h-4.5" />
              <span>Bu Ürünü Benim İçin Satın Al</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-slate-400 text-center mt-2.5">
              Gümrükte takılma riski yoktur. Tüm lojistik, gümrük beyanı ve kapıya teslimatı Harp Global üstlenir.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
