import React, { useState, useEffect, useRef } from "react";
import { Globe, X, Send, HelpCircle, Loader2, Compass, ShieldAlert, Sparkles, AlertCircle } from "lucide-react";
import { ChatMessage } from "../types";

interface AIAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIAssistant({ isOpen, onClose }: AIAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Merhaba! Ben Harp Global Alışveriş ve Gümrük Danışmanıyım. Amerika (USA) ve İngiltere (UK) mağazalarından dilediğiniz her ürünü gümrük stresi olmadan getirme süreçleri, yasaklı ürünler veya kargo fiyatları hakkında sorularınızı yanıtlayabilirim. Nasıl yardımcı olabilirim?",
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyError, setKeyError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-u`,
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setLoading(true);
    setKeyError(false);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          chatHistory: messages.map((m) => ({
            role: m.role,
            text: m.text,
          })),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.isKeyMissing) {
          setKeyError(true);
        }
        throw new Error(errorData.error || "Sunucu hatası");
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now()}-a`,
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      
      // Dynamic helpful error answers in Turkish if the API key is missing
      const errorText = keyError 
        ? "Yapay zeka asistanı şu anda beklemede. Geliştirici olarak, lütfen 'Settings > Secrets' menüsünden 'GEMINI_API_KEY' parametresini girin. Biz o sırada kargo ve gümrük dökümlerini hesaplamaya devam edebiliriz!"
        : "Bağlantı hatası oluştu. Lütfen tekrar deneyin.";

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}-err`,
          role: "model",
          text: errorText,
          timestamp: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handlePresetQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const presets = [
    "Parfüm sipariş edebilir miyim? (Sınırlamalar)",
    "30 Euro gümrük muafiyeti Harp Global'de nasıl aşılıyor?",
    "Harp Global'in gümrükleme süreci tam olarak nasıl işliyor?",
    "Amerika ve İngiltere'den vergisiz Delaware deposu nedir?"
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200" id="ai-assistant-panel">
      {/* Drawer Header */}
      <div className="bg-brand-navy p-4 sm:p-5 text-white flex justify-between items-center border-b border-slate-800 text-left">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-brand-orange text-white flex items-center justify-center">
            <Sparkles className="w-5 h-5 animate-pulse-slow text-white" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-white">Harp Global AI Gümrük Asistanı</h3>
            <p className="text-[10px] text-slate-300 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Yapay Zeka Destekli Uzman • Çevrimiçi
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
          id="btn-close-ai"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-brand-cream/60">
        
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          return (
            <div key={msg.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm text-left shadow-xs ${
                isUser 
                  ? "bg-brand-orange text-white rounded-tr-none" 
                  : "bg-white border border-slate-200/80 text-brand-navy rounded-tl-none"
              }`}>
                {/* Text formatting - simple markdown paragraphs */}
                <div className="space-y-1.5 leading-relaxed font-sans whitespace-pre-wrap">
                  {msg.text}
                </div>
                <span className={`text-[9px] block text-right mt-1.5 font-mono ${isUser ? "text-orange-200" : "text-slate-400"}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 flex items-center gap-2.5 text-xs text-slate-500 shadow-xs">
              <Loader2 className="w-4 h-4 animate-spin text-brand-orange" />
              <span>Harp Global AI gümrük kurallarını sorguluyor...</span>
            </div>
          </div>
        )}

        <div ref={scrollRef} />
      </div>

      {/* Static Helpers & Preset Prompts */}
      <div className="p-4 border-t border-slate-100 bg-white space-y-3">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <HelpCircle className="w-4 h-4 text-brand-orange" />
          <span>Sık Sorulan Sorular (Hızlı Seçim)</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p, i) => (
            <button
              key={i}
              onClick={() => handlePresetQuestion(p)}
              className="text-[11px] font-semibold text-slate-600 bg-slate-50 hover:bg-orange-50 hover:text-brand-orange hover:border-orange-200 px-3 py-2 rounded-lg border border-slate-200 text-left transition-all duration-150 shrink-0 cursor-pointer"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* User Input Form */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(userInput);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-brand-navy focus:outline-none focus:border-brand-orange focus:bg-white"
            placeholder="Gümrük, kargo veya sipariş sorusu yazın..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            disabled={loading}
            id="ai-chat-input"
          />
          <button
            type="submit"
            disabled={loading || !userInput.trim()}
            className="bg-brand-navy hover:bg-brand-orange text-white p-3 rounded-xl transition-all flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-50 disabled:hover:bg-brand-navy"
            id="btn-ai-send"
          >
            <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </button>
        </form>
        <div className="flex items-center justify-center gap-1 mt-2.5 text-[10px] text-slate-400 font-medium">
          <ShieldAlert className="w-3.5 h-3.5 text-brand-orange" />
          <span>Mevzuatlara %100 uyumlu Harp Global Yapay Zeka Danışmanı</span>
        </div>
      </div>

    </div>
  );
}
