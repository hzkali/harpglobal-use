import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Support JSON payloads
app.use(express.json());

// Lazy-loaded Gemini SDK Instance
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please configure it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// AI Shopping and Customs Assistant Endpoint
app.post("/api/gemini", async (req, res) => {
  try {
    const { message, chatHistory } = req.body;
    
    if (!message) {
      res.status(400).json({ error: "Mesaj alanı zorunludur." });
      return;
    }

    const ai = getGeminiClient();
    
    // System instruction to act as a customs & proxy buying expert for Harp Global
    const systemInstruction = `
Sen Harp Global şirketinin yapay zeka destekli "Lojistik, Gümrük ve Yurtdışı Alışveriş Uzmanı" yardımcısısın.
Kullanıcılara Amerika Birleşik Devletleri (ABD) ve İngiltere (UK) sitelerinden (Amazon, eBay, Walmart, Sephora, Nordstrom vb.) nasıl alışveriş yapacakları, kargo süreçleri ve Türkiye gümrük kuralları konusunda yardımcı olacaksın.

Önemli Bilgiler ve Kurallar:
1. Harp Global, kullanıcılar adına ABD ve UK'den ürün satın alabilir ("Benim İçin Al") ya da kullanıcılara ABD/UK adresleri vererek paketlerini Türkiye'ye yönlendirebilir ("Paket Oluştur / Kendin Gönder").
2. Gümrükleme: Harp Global, kendi bünyesindeki Mali Müşavir kadrosuyla tüm yasal gümrük işlemlerini kullanıcı adına %100 yasal şekilde halleder. Bireysel gümrük muafiyeti olan 30 Euro limitinden bağımsız kurumsal ithalat çözümleri de sunabilir, ancak standart bireysel siparişler için gümrük vergilerini önceden tahsil ederek gümrükte takılma stresini tamamen ortadan kaldırır.
3. Yasaklı Ürünler: Parfümler (yanıcı sıvı olduklarından uçak kargoda taşınamaz), bataryalı/pilli patlayıcı riski taşıyan bazı kimyasallar, canlı bitkiler, tütün ve alkollü içecekler, reçeteli ilaçlar gümrükten geçemez veya taşınamaz.
4. Kargo Partnerleri: Yurtiçinde Aras Kargo, Yurtiçi Kargo ve global dağıtımda DHL eCommerce ile çalışılmaktadır.
5. Hesaplama ve Ücretlendirme Kuralları:
   - Uluslararası kargo bedeli 1 kg'a kadar paketler için sabit 25 dolardır. 1 kg üzerindeki her bir kilogram için bu sabit ücrete kilogram başına 10 dolar eklenir (Örn: 2 kg için kargo bedeli 25 + 10 = 35 dolardır).
   - Gümrük Vergisi: Elektronik ve diğer genel kategorilerdeki ürünlerde ürün fiyatının %60'ı kadardır.
   - İlaç ve gıda takviyesi (supplement) kategorisindeki ürünlerde 1500 dolara kadar gümrük vergisi tamamen 0 dolar ($0) uygulanır.
   - Harp Global Altyapı/Hizmet Bedeli: Paket ağırlığı kilogram başına $40 veya her 100 dolarlık ürün bedeli için $40 olarak hesaplanır (hangisi yüksekse o geçerlidir).
6. Samimi, profesyonel, güven verici ve Türkçe konuş. Kısa, öz ve net cevaplar ver.
`;

    // Format historical messages if present
    const contents: any[] = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach((msg: any) => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      });
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: error.message || "Yapay zeka yanıtı üretilirken bir hata oluştu.",
      isKeyMissing: !process.env.GEMINI_API_KEY 
    });
  }
});

// Mock Price / Customs Calculator Helper
app.post("/api/calculate-customs", (req, res) => {
  try {
    const { price, weightKg, category, country } = req.body;
    
    const itemPrice = parseFloat(price) || 0;
    const itemWeight = parseFloat(weightKg) || 0.1;
    
    // 1. Shipping cost: $25 for the first kg, plus $10 for each subsequent kg
    const shippingCost = itemWeight <= 1 ? 25 : 25 + (itemWeight - 1) * 10;
    
    // 2. Customs Tax: 
    // Electronics/General: 60% of product price.
    // Medicine & supplements ("supplements" category) up to $1500 is $0. If above $1500, standard 60% applies.
    let customsTax = 0;
    if (category === "supplements") {
      customsTax = itemPrice <= 1500 ? 0 : itemPrice * 0.60;
    } else {
      customsTax = itemPrice * 0.60;
    }
    
    // 3. Harp Global Infrastructure Fee:
    // $40 per kg or $40 per $100 of product value (whichever is higher)
    const weightBasedFee = itemWeight * 40;
    const priceBasedFee = Math.ceil(itemPrice / 100) * 40;
    const serviceFee = Math.max(weightBasedFee, priceBasedFee);
    
    const totalUSD = itemPrice + shippingCost + customsTax + serviceFee;
    
    // Conversion rate: $1 = 49 TRY (Mocked exchange rate)
    const usdToTry = 49;
    
    res.json({
      originalPrice: itemPrice,
      shippingCost,
      customsTax,
      serviceFee,
      totalUSD,
      totalTRY: totalUSD * usdToTry,
      exchangeRate: usdToTry,
      currency: "USD",
      breakdown: {
        productPrice: itemPrice,
        shipping: shippingCost,
        customs: customsTax,
        service: serviceFee,
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: "Hesaplama yapılırken hata oluştu." });
  }
});

// SEO & Search Engine Crawl Endpoints
app.get("/robots.txt", (req, res) => {
  res.type("text/plain");
  res.send("User-agent: *\nAllow: /\n\nSitemap: https://harpglobal.com.tr/sitemap.xml");
});

app.get("/sitemap.xml", (req, res) => {
  res.type("application/xml");
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://harpglobal.com.tr/</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://harpglobal.com.tr/how-it-works</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://harpglobal.com.tr/about-us</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://harpglobal.com.tr/calculator</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://harpglobal.com.tr/trend-products</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.00</priority>
  </url>
  <url>
    <loc>https://harpglobal.com.tr/dashboard</loc>
    <lastmod>2026-07-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.00</priority>
  </url>
</urlset>`);
});

// -------------------------------------------------------------
// Vite Dev / Static Production Server Integration
// -------------------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Harp Global Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
