import React, { useState, useEffect } from "react";
import { Ship, Globe, Clock, Menu, X, ArrowRight, User, HelpCircle, ShieldCheck } from "lucide-react";

interface HeaderProps {
  activeTab: "home" | "dashboard" | "how-it-works" | "about-us" | "calculator" | "trend-products" | "warehouses";
  setActiveTab: (tab: "home" | "dashboard" | "how-it-works" | "about-us" | "calculator" | "trend-products" | "warehouses") => void;
  onOpenAIAssistant: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ activeTab, setActiveTab, onOpenAIAssistant, onScrollToSection }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    // Show current local time dynamically (formatted for Turkish users)
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    setActiveTab("home");
    setTimeout(() => {
      onScrollToSection(sectionId);
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
      {/* Top Banner - Mini Notifications */}
      <div className="bg-brand-navy text-white text-xs py-1.5 px-4 flex justify-between items-center select-none">
        <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
          <span>Tüm gümrükleme işlemleri mali müşavirlerimizce yasal olarak takip edilmektedir.</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-slate-300">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-brand-orange" />
            <span>Gümrük Hattı Açık • TR {timeStr || "10:39"}</span>
          </div>
          <span className="text-slate-500">|</span>
          <div className="flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" />
            <span>USA-UK to TR</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
        {/* Logo / Brand */}
        <div 
          onClick={() => setActiveTab("home")} 
          className="flex items-center gap-2.5 cursor-pointer group"
          id="brand-logo-container"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-orange text-white flex items-center justify-center shadow-md shadow-brand-orange/20 transition-transform group-hover:scale-105">
            <Globe className="w-5.5 h-5.5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-2xl tracking-tight text-brand-navy">harp</span>
              <span className="font-display font-bold text-2xl tracking-tight text-brand-orange">global</span>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-slate-400 font-mono font-medium leading-none mt-0.5">Sınır Tanımayan Ticaret</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          <button 
            onClick={() => setActiveTab("how-it-works")}
            className={`font-medium text-sm transition-colors cursor-pointer ${
              activeTab === "how-it-works" ? "text-brand-orange font-bold" : "text-slate-600 hover:text-brand-orange"
            }`}
          >
            Nasıl Çalışır?
          </button>
          <button 
            onClick={() => setActiveTab("about-us")}
            className={`font-medium text-sm transition-colors cursor-pointer ${
              activeTab === "about-us" ? "text-brand-orange font-bold" : "text-slate-600 hover:text-brand-orange"
            }`}
          >
            Harp Global Tech
          </button>
          <button 
            onClick={() => setActiveTab("calculator")}
            className={`font-medium text-sm transition-colors cursor-pointer ${
              activeTab === "calculator" ? "text-brand-orange font-bold" : "text-slate-600 hover:text-brand-orange"
            }`}
          >
            Fiyat Hesaplama
          </button>
          <button 
            onClick={() => setActiveTab("trend-products")}
            className={`font-medium text-sm transition-colors cursor-pointer ${
              activeTab === "trend-products" ? "text-brand-orange font-bold" : "text-slate-600 hover:text-brand-orange"
            }`}
          >
            Trend Ürünler
          </button>
          <button 
            onClick={() => setActiveTab("warehouses")}
            className={`font-medium text-sm transition-colors cursor-pointer ${
              activeTab === "warehouses" ? "text-brand-orange font-bold" : "text-slate-600 hover:text-brand-orange"
            }`}
          >
            Depolarımız
          </button>
          <button 
            onClick={() => handleNavClick("guides")}
            className="text-slate-600 hover:text-brand-orange font-medium text-sm transition-colors cursor-pointer"
          >
            Alışveriş Rehberleri
          </button>
          <button 
            onClick={onOpenAIAssistant}
            className="text-slate-600 hover:text-brand-orange font-medium text-sm flex items-center gap-1 transition-colors cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-brand-orange" />
            AI Asistan
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          {activeTab === "home" ? (
            <button
              onClick={() => setActiveTab("dashboard")}
              className="bg-brand-navy text-white hover:bg-slate-800 font-medium text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              id="btn-goto-dashboard"
            >
              <User className="w-4 h-4 text-brand-orange" />
              <span>Müşteri Paneli / Depolarım</span>
            </button>
          ) : (
            <button
              onClick={() => setActiveTab("home")}
              className="border border-slate-200 text-brand-navy hover:bg-slate-50 font-medium text-sm px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all cursor-pointer"
              id="btn-goto-home"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              <span>Ana Sayfaya Dön</span>
            </button>
          )}

          {/* Quick AI Trigger */}
          <button
            onClick={onOpenAIAssistant}
            className="bg-orange-50 text-brand-orange hover:bg-brand-orange hover:text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-sm relative group"
            title="Yapay Zeka Gümrük Danışmanı"
            id="btn-quick-ai"
          >
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
            <Globe className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAIAssistant}
            className="bg-orange-50 text-brand-orange p-2.5 rounded-xl"
            title="Yapay Zeka"
          >
            <Globe className="w-4.5 h-4.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-brand-orange rounded-lg focus:outline-none"
            id="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-6 space-y-4 shadow-xl">
          <div className="space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab("how-it-works");
              }}
              className="block w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-brand-orange font-medium"
            >
              Nasıl Çalışır?
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab("about-us");
              }}
              className="block w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-brand-orange font-medium"
            >
              Harp Global Tech (Hakkımızda)
            </button>
             <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab("calculator");
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 font-medium ${
                activeTab === "calculator" ? "text-brand-orange font-bold bg-orange-50/50" : "text-slate-700 hover:text-brand-orange"
              }`}
            >
              Fiyat Hesaplama
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab("trend-products");
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 font-medium ${
                activeTab === "trend-products" ? "text-brand-orange font-bold bg-orange-50/50" : "text-slate-700 hover:text-brand-orange"
              }`}
            >
              Trend Ürünler
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveTab("warehouses");
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 font-medium ${
                activeTab === "warehouses" ? "text-brand-orange font-bold bg-orange-50/50" : "text-slate-700 hover:text-brand-orange"
              }`}
            >
              Depolarımız
            </button>
            <button
              onClick={() => handleNavClick("guides")}
              className="block w-full text-left px-3 py-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-brand-orange font-medium"
            >
              Alışveriş Rehberleri
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAIAssistant();
              }}
              className="block w-full text-left px-3 py-2.5 rounded-xl hover:bg-orange-50 text-brand-orange font-medium flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Yapay Zeka Gümrük Asistanı
            </button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            {activeTab === "home" ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTab("dashboard");
                }}
                className="w-full bg-brand-navy text-white text-center py-3 rounded-xl font-medium flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4 text-brand-orange" />
                Müşteri Paneli / Depolarım
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setActiveTab("home");
                }}
                className="w-full border border-slate-200 text-brand-navy text-center py-3 rounded-xl font-medium"
              >
                Kurumsal Siteye Dön
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
