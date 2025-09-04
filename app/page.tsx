'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MessageCircle, Star, ChefHat, Heart, Clock, Shield, Mail, Phone, MapPin, ArrowDown, Calendar, ShoppingCart, Plane, Truck, Utensils, ChevronDown, Globe } from 'lucide-react';

const openWhatsApp = () => {
  window.open('https://wa.me/972545448423', '_blank');
};

const orderProduct = (product: string) => {
  window.open(`https://wa.me/972545448423?text=היי, אני מעוניין ב${product}`, '_blank');
};

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
};

// Language types and context
type Language = 'he' | 'en' | 'ja';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation object with proper typing
const translations: Record<Language, Record<string, string>> = {
  he: {
    // Navigation
    'nav.about': 'אודות',
    'nav.service': 'השירות',
    'nav.howItWorks': 'איך זה עובד',
    'nav.products': 'מוצרים',
    'nav.contact': 'צור קשר',
    'nav.getCatalog': 'קבל קטלוג',
    
    // Hero Section
    'hero.title1': 'מוצרי מזון יפניים',
    'hero.title2': 'פרימיום טריים',
    'hero.subtitle': 'מביאים את המרכיבים היפניים המשובחים ביותר ישירות משווקי טוקיו למסעדות המובחרות של תל אביב ולשפים',
    'hero.contactUs': 'צור קשר',
    'hero.viewProducts': 'צפה במוצרים',
    
    // About Section
    'about.title': 'אודות קמפאי תל אביב',
    'about.p1': 'המשימה שלנו היא להביא מוצרי מזון יפניים פרימיום טריים לקהילה הקולינרית הפורחת של ישראל.',
    'about.p2': 'נוסד על ידי אורן רבוי, חובב מזון יפני ותיק, שף ומעריץ עם למעלה מעשור של ניסיון במטבח היפני.',
    'about.p3': 'אנחנו נלהבים לגדל את המטבח היפני בישראל ולספק את המרכיבים המשובחים ביותר לקהילת הדיינינג של תל אביב.',
    
    // Service Section
    'service.title': 'השירות שלנו',
    'service.subtitle': 'משרתים את שוק הדיינינג היפני הפורח של ישראל עם מרכיבים פרימיום',
    'service.restaurants.title': 'מסעדות פרימיום',
    'service.restaurants.desc': 'חוויות דיינינג יפניות יוקרתיות בתל אביב המחפשות את המרכיבים המשובחים ביותר למנות מעודנות.',
    'service.chefs.title': 'שפים פרטיים',
    'service.chefs.desc': 'קהילה פורחת של שפים פרטיים וקייטרינג המתמקדת בדיינינג יוקרתי הדורש אספקה קבועה של חומרים אלגנטיים ומגוונים.',
    'service.foodies.title': 'חובבי מזון ויפנופילים',
    'service.foodies.desc': 'קבוצה גדלה של חובבי מזון נלהבים ואוהבי יפן שיוצרים, חווים ומשתפים את המזון הטוב ביותר שיש ליפן להציע.',
    
    // Values
    'values.title': 'הערכים שלנו',
    'values.quality.title': 'איכות',
    'values.quality.desc': 'להביא את מוצרי המזון היפניים הטובים ביותר לקהילה הקולינרית של ישראל',
    'values.personal.title': 'מגע אישי',
    'values.personal.desc': 'שירות פרימיום ומותאם אישית ללקוחות ולספקים',
    'values.streamlined.title': 'יעיל',
    'values.streamlined.desc': 'תהליך משלוח מבוקר איכות המבטיח רעננות ובמחיר סביר',
    
    // How It Works
    'howItWorks.title': 'איך זה עובד',
    'howItWorks.subtitle': 'התהליך הפשוט שלנו מבטיח שמוצרים יפניים פרימיום יגיעו טריים ובזמן',
    'howItWorks.shipments': 'משלוחים מתוכננים בשנה',
    'howItWorks.preorder.title': 'הזמנה מוקדמת',
    'howItWorks.preorder.desc': 'אנחנו מתחברים עם שפים ומסעדות בתל אביב כדי לבנות רשימה של מוצרים רצויים דרך חנות האינטרנט ושירות הקונסיירז׳ שלנו.',
    'howItWorks.procurement.title': 'רכש',
    'howItWorks.procurement.desc': 'השותפים היפניים שלנו רוכשים ושולחים את כל מוצרי הלקוחות למרכז החלוקה הישראלי שלנו.',
    'howItWorks.distribution.title': 'הפצה',
    'howItWorks.distribution.desc': 'קמפאי תל אביב מארגנת הפצת סחורות ללקוחות תוך 24 שעות מאישור המכס.',
    'howItWorks.enjoy.title': 'תהנה',
    'howItWorks.enjoy.desc': 'לקוחות מבשלים ונהנים מהחומרים היפניים המשובחים ביותר, יוצרים חוויות דיינינג מדהימות.',
    
    // Products
    'products.title': 'המוצרים שלנו',
    'products.subtitle': 'מבחר מהמרכיבים היפניים הפרימיום שלנו',
    'products.uni.title': 'אוני',
    'products.uni.desc': 'קיפוד ים פרימיום ממים הבתוליים של הוקאידו. ידוע במרקם הקרמי שלו ובטעם המתוק והמלוח המעלה כל חוויית סושי או סשימי.',
    'products.unagi.title': 'אונאגי',
    'products.unagi.desc': 'צלופח מים מתוקים שהוכן בשיטות יפניות מסורתיות. עשיר, מלוח, ומזוגג בצורה מושלמת עם רוטב טארה אותנטי לחוויה אמיתית.',
    'products.binchotan.title': 'בינצ׳וטן',
    'products.binchotan.desc': 'פחם יפני פרימיום המוערך ביכולתו לשרוף בטמפרטורות גבוהות עם עשן מינימלי, מושלם לבישול יקיטורי ורובטאיקי אותנטי.',
    'products.inquire': '← בירור זמינות',
    'products.browseCatalog': 'עיין בקטלוג המלא שלנו',
    
    // Contact
    'contact.title': 'צור קשר',
    'contact.subtitle': 'מוכן להביא מרכיבים יפניים פרימיום למטבח שלך?',
    'contact.getInTouch': 'צור קשר',
    'contact.whatsapp': 'וואטסאפ',
    'contact.email': 'אימייל',
    'contact.location': 'מיקום',
    'contact.locationValue': 'תל אביב, ישראל',
    'contact.sendMessage': 'שלח לנו הודעה',
    'contact.form.name': 'השם שלך',
    'contact.form.email': 'האימייל שלך',
    'contact.form.business': 'שם המסעדה/העסק',
    'contact.form.products': 'באילו מוצרים אתה מעוניין?',
    'contact.form.send': 'שלח הודעה',
    
    // Footer
    'footer.description': 'מביאים מוצרי מזון יפניים פרימיום טריים ישירות משווקי טוקיו למוסדות הדיינינג המובחרים של ישראל.',
    'footer.contact': 'צור קשר',
    'footer.foundedBy': 'נוסד על ידי',
    'footer.founder.name': 'אורן רבוי',
    'footer.founder.title1': 'חובב מטבח יפני',
    'footer.founder.title2': 'ניסיון של 10+ שנים',
    'footer.copyright': '© 2025 קמפאי תל אביב. נעשה באהבה בתל אביב.'
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.service': 'Service',
    'nav.howItWorks': 'How It Works',
    'nav.products': 'Products',
    'nav.contact': 'Contact',
    'nav.getCatalog': 'Get Catalog',
    
    // Hero Section
    'hero.title1': 'Premium Japanese',
    'hero.title2': 'Fresh Food Products',
    'hero.subtitle': 'Bringing the finest Japanese ingredients directly from Tokyo\'s markets to Tel Aviv\'s finest restaurants and chefs',
    'hero.contactUs': 'Contact Us',
    'hero.viewProducts': 'View Products',
    
    // About Section
    'about.title': 'About Kampai Tel-Aviv',
    'about.p1': 'Our mission is to bring premium Japanese fresh food products to Israel\'s thriving culinary scene.',
    'about.p2': 'Founded by Oren Raboy, a longtime Japanese food enthusiast, chef, and admirer with over a decade of experience in Japanese cuisine.',
    'about.p3': 'We are passionate about growing Japanese cuisine in Israel and providing the finest ingredients to Tel Aviv\'s dining community.',
    
    // Service Section
    'service.title': 'Our Service',
    'service.subtitle': 'Serving Israel\'s booming Japanese dining market with premium ingredients',
    'service.restaurants.title': 'Premium Restaurants',
    'service.restaurants.desc': 'High-end Japanese dining experiences in Tel Aviv seeking the finest ingredients for exquisite dishes.',
    'service.chefs.title': 'Private Chefs',
    'service.chefs.desc': 'A thriving community of private chefs and caterers focused on high-end dining requiring regular supply of elegant, diverse materials.',
    'service.foodies.title': 'Foodies & Japanophiles',
    'service.foodies.desc': 'Growing group of passionate food enthusiasts and Japan lovers who craft, experience, and share the best food Japan has to offer.',
    
    // Values
    'values.title': 'Our Values',
    'values.quality.title': 'Quality',
    'values.quality.desc': 'Bringing the best Japanese food products to Israel\'s culinary community',
    'values.personal.title': 'Personal Touch',
    'values.personal.desc': 'Premium, personalized service for customers and suppliers',
    'values.streamlined.title': 'Streamlined',
    'values.streamlined.desc': 'Quality-controlled delivery process ensuring freshness and affordability',
    
    // How It Works
    'howItWorks.title': 'How It Works',
    'howItWorks.subtitle': 'Our simple process ensures premium Japanese products arrive fresh and on time',
    'howItWorks.shipments': 'Planned Shipments Per Year',
    'howItWorks.preorder.title': 'Pre-Order',
    'howItWorks.preorder.desc': 'We connect with Tel Aviv chefs and restaurants to build a list of desired products through our storefront and concierge service.',
    'howItWorks.procurement.title': 'Procurement',
    'howItWorks.procurement.desc': 'Our Japanese partners procure and ship all customer products to our Israeli distribution center.',
    'howItWorks.distribution.title': 'Distribution',
    'howItWorks.distribution.desc': 'Kampai TLV arranges distribution of goods to customers within 24 hours of customs clearance.',
    'howItWorks.enjoy.title': 'Enjoy',
    'howItWorks.enjoy.desc': 'Customers cook and enjoy the finest Japanese materials, creating incredible dining experiences.',
    
    // Products
    'products.title': 'Our Products',
    'products.subtitle': 'A selection of our premium Japanese ingredients',
    'products.uni.title': 'Uni',
    'products.uni.desc': 'Premium sea urchin from Hokkaido\'s pristine waters. Known for its creamy texture and sweet, briny flavor that elevates any sushi or sashimi experience.',
    'products.unagi.title': 'Unagi',
    'products.unagi.desc': 'Freshwater eel prepared using traditional Japanese methods. Rich, savory, and perfectly glazed with authentic tare sauce for an authentic experience.',
    'products.binchotan.title': 'Binchotan',
    'products.binchotan.desc': 'Premium Japanese charcoal prized for its ability to burn at high temperatures with minimal smoke, perfect for authentic yakitori and robatayaki cooking.',
    'products.inquire': 'Inquire About Availability →',
    'products.browseCatalog': 'Browse Our Full Catalog',
    
    // Contact
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Ready to bring premium Japanese ingredients to your kitchen?',
    'contact.getInTouch': 'Get In Touch',
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'Email',
    'contact.location': 'Location',
    'contact.locationValue': 'Tel Aviv, Israel',
    'contact.sendMessage': 'Send Us A Message',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.business': 'Restaurant/Business Name',
    'contact.form.products': 'What products are you interested in?',
    'contact.form.send': 'Send Message',
    
    // Footer
    'footer.description': 'Bringing premium Japanese fresh food products directly from Tokyo\'s markets to Israel\'s finest dining establishments.',
    'footer.contact': 'Contact',
    'footer.foundedBy': 'Founded by',
    'footer.founder.name': 'Oren Raboy',
    'footer.founder.title1': 'Japanese cuisine enthusiast',
    'footer.founder.title2': '10+ years experience',
    'footer.copyright': '© 2025 Kampai TLV. Made with care in Tel Aviv.'
  },
  ja: {
    // Navigation
    'nav.about': 'について',
    'nav.service': 'サービス',
    'nav.howItWorks': '仕組み',
    'nav.products': '商品',
    'nav.contact': 'お問い合わせ',
    'nav.getCatalog': 'カタログを取得',
    
    // Hero Section
    'hero.title1': 'プレミアム日本の',
    'hero.title2': '新鮮食品',
    'hero.subtitle': '東京の市場から直接、テルアビブの最高級レストランとシェフに最高の日本の食材をお届けします',
    'hero.contactUs': 'お問い合わせ',
    'hero.viewProducts': '商品を見る',
    
    // About Section
    'about.title': 'カンパイ・テルアビブについて',
    'about.p1': '私たちの使命は、イスラエルの活況を呈する料理界にプレミアム日本の新鮮食品をもたらすことです。',
    'about.p2': '日本料理に10年以上の経験を持つ、長年の日本料理愛好家、シェフ、そして賞賛者であるオレン・ラボイによって設立されました。',
    'about.p3': '私たちはイスラエルで日本料理を発展させ、テルアビブのダイニングコミュニティに最高の食材を提供することに情熱を注いでいます。',
    
    // Service Section
    'service.title': '私たちのサービス',
    'service.subtitle': 'プレミアム食材でイスラエルの成長する日本料理市場にサービスを提供',
    'service.restaurants.title': 'プレミアムレストラン',
    'service.restaurants.desc': '絶妙な料理のために最高の食材を求めるテルアビブの高級日本料理体験。',
    'service.chefs.title': 'プライベートシェフ',
    'service.chefs.desc': 'エレガントで多様な材料の定期的な供給を必要とする高級ダイニングに焦点を当てた、活況を呈するプライベートシェフとケータリング業者のコミュニティ。',
    'service.foodies.title': 'グルメ＆日本愛好家',
    'service.foodies.desc': '日本が提供する最高の食べ物を作り、体験し、共有する情熱的な食品愛好家と日本愛好家の成長するグループ。',
    
    // Values
    'values.title': '私たちの価値観',
    'values.quality.title': '品質',
    'values.quality.desc': 'イスラエルの料理コミュニティに最高の日本食品をもたらす',
    'values.personal.title': '個人的なタッチ',
    'values.personal.desc': '顧客とサプライヤーのためのプレミアムでパーソナライズされたサービス',
    'values.streamlined.title': '効率的',
    'values.streamlined.desc': '新鮮さと手頃な価格を確保する品質管理された配送プロセス',
    
    // How It Works
    'howItWorks.title': '仕組み',
    'howItWorks.subtitle': 'シンプルなプロセスで、プレミアム日本製品が新鮮で時間通りに到着することを保証します',
    'howItWorks.shipments': '年間計画出荷数',
    'howItWorks.preorder.title': '事前注文',
    'howItWorks.preorder.desc': '私たちはテルアビブのシェフやレストランとつながり、店舗とコンシェルジュサービスを通じて希望する製品のリストを構築します。',
    'howItWorks.procurement.title': '調達',
    'howItWorks.procurement.desc': '私たちの日本のパートナーは、すべての顧客製品を調達し、イスラエルの配送センターに出荷します。',
    'howItWorks.distribution.title': '配送',
    'howItWorks.distribution.desc': 'カンパイTLVは、税関通過から24時間以内に顧客への商品配送を手配します。',
    'howItWorks.enjoy.title': '楽しむ',
    'howItWorks.enjoy.desc': '顧客は最高の日本の材料を調理し、楽しみ、素晴らしいダイニング体験を作り出します。',
    
    // Products
    'products.title': '私たちの商品',
    'products.subtitle': 'プレミアム日本食材の選択',
    'products.uni.title': 'ウニ',
    'products.uni.desc': '北海道の原始の海からのプレミアムウニ。クリーミーな食感と、あらゆる寿司や刺身の体験を向上させる甘くて塩辛い風味で知られています。',
    'products.unagi.title': 'うなぎ',
    'products.unagi.desc': '伝統的な日本の方法を使用して調理された淡水うなぎ。本格的なタレソースで豊かで風味があり、完璧に艶をかけられた本格的な体験。',
    'products.binchotan.title': '備長炭',
    'products.binchotan.desc': '最小限の煙で高温で燃焼する能力で価値のあるプレミアム日本炭、本格的な焼き鳥とロバタ焼き料理に最適。',
    'products.inquire': '在庫確認 →',
    'products.browseCatalog': '全カタログを閲覧',
    
    // Contact
    'contact.title': 'お問い合わせ',
    'contact.subtitle': 'あなたのキッチンにプレミアム日本食材をもたらす準備はできていますか？',
    'contact.getInTouch': 'お気軽にお問い合わせください',
    'contact.whatsapp': 'WhatsApp',
    'contact.email': 'メール',
    'contact.location': '場所',
    'contact.locationValue': 'テルアビブ、イスラエル',
    'contact.sendMessage': 'メッセージを送る',
    'contact.form.name': 'お名前',
    'contact.form.email': 'メールアドレス',
    'contact.form.business': 'レストラン/ビジネス名',
    'contact.form.products': 'どの商品に興味がありますか？',
    'contact.form.send': 'メッセージを送信',
    
    // Footer
    'footer.description': '東京の市場から直接、イスラエルの最高級ダイニング施設にプレミアム日本新鮮食品をお届けします。',
    'footer.contact': 'お問い合わせ',
    'footer.foundedBy': '創設者',
    'footer.founder.name': 'オレン・ラボイ',
    'footer.founder.title1': '日本料理愛好家',
    'footer.founder.title2': '10年以上の経験',
    'footer.copyright': '© 2025 カンパイTLV。テルアビブで愛情を込めて作られました。'
  }
};

// Language Provider Component
function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('he'); // Hebrew as default

  // Load saved language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('kampai-language') as Language;
    if (savedLang && ['he', 'en', 'ja'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem('kampai-language', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const isRTL = language === 'he';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook to use language context
function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Language Selector Component
function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'he' as Language, name: 'עברית', flag: '🇮🇱' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <ChevronDown size={16} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[120px] z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                language === lang.code ? 'bg-gray-50 font-medium' : ''
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function KampaiLandingContent() {
  const { t, isRTL } = useLanguage();

  return (
    <div className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'}`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Floating Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          <div className="text-2xl font-light text-gray-900">
            <span className="font-bold">Kampai</span> <span className="text-gray-600">TLV</span> 🍶
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-gray-900 transition-colors">{t('nav.about')}</button>
            <button onClick={() => scrollToSection('service')} className="text-gray-700 hover:text-gray-900 transition-colors">{t('nav.service')}</button>
            <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-gray-900 transition-colors">{t('nav.howItWorks')}</button>
            <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-gray-900 transition-colors">{t('nav.products')}</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-gray-900 transition-colors">{t('nav.contact')}</button>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSelector />
            <button 
              onClick={openWhatsApp}
              className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {t('nav.getCatalog')}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://cdn.midjourney.com/video/f70afcd9-2026-4e6f-8020-0acae85b3604/3.mp4" type="video/mp4" />
        </video>
        
        {/* Translucent Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10"></div>
        
        {/* Content */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-light text-white mb-4 drop-shadow-lg">
              {t('hero.title1')}
            </h1>
            <h2 className="text-4xl md:text-6xl font-light text-white mb-8 drop-shadow-lg">
              {t('hero.title2')}
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl text-white mb-12 font-light max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button 
              onClick={openWhatsApp}
              className="bg-white hover:bg-gray-100 text-gray-900 px-10 py-4 rounded-full text-lg font-medium transition-all hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
            >
              <MessageCircle size={20} />
              {t('hero.contactUs')}
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="border-2 border-white hover:bg-white hover:text-gray-900 text-white px-10 py-4 rounded-full text-lg font-medium transition-all"
            >
              {t('hero.viewProducts')}
            </button>
          </div>
          
          <button 
            onClick={() => scrollToSection('about')}
            className="text-white hover:text-gray-200 transition-colors animate-bounce drop-shadow-md"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">{t('about.title')}</h2>
          <div className="text-lg md:text-xl text-gray-600 font-light leading-relaxed space-y-6 max-w-3xl mx-auto">
            <p>
              {t('about.p1')}
            </p>
            <p>
              {t('about.p2')}
            </p>
            <p>
              {t('about.p3')}
            </p>
          </div>
        </div>
      </section>

      {/* Service & Values Section */}
      <section id="service" className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">{t('service.title')}</h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              {t('service.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            <div className="text-center">
              <ChefHat className="w-12 h-12 text-gray-800 mx-auto mb-6" />
              <h3 className="text-xl font-medium mb-4 text-gray-900">{t('service.restaurants.title')}</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                {t('service.restaurants.desc')}
              </p>
            </div>
            
            <div className="text-center">
              <Star className="w-12 h-12 text-gray-800 mx-auto mb-6" />
              <h3 className="text-xl font-medium mb-4 text-gray-900">Private Chefs</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                A thriving community of private chefs and caterers focused on high-end dining requiring regular supply of elegant, diverse materials.
              </p>
            </div>
            
            <div className="text-center">
              <Heart className="w-12 h-12 text-gray-800 mx-auto mb-6" />
              <h3 className="text-xl font-medium mb-4 text-gray-900">Foodies & Japanophiles</h3>
              <p className="text-gray-600 font-light leading-relaxed">
                Growing group of passionate food enthusiasts and Japan lovers who craft, experience, and share the best food Japan has to offer.
              </p>
            </div>
          </div>
          
          {/* Values */}
          <div className="bg-white rounded-2xl p-12">
            <h3 className="text-2xl font-light text-gray-900 mb-8 text-center">Our Values</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-8 h-8 text-gray-600 mx-auto mb-4" />
                <h4 className="font-medium mb-2 text-gray-900">Quality</h4>
                <p className="text-sm text-gray-600 font-light">Bringing the best Japanese food products to Israel's culinary community</p>
              </div>
              <div className="text-center">
                <Heart className="w-8 h-8 text-gray-600 mx-auto mb-4" />
                <h4 className="font-medium mb-2 text-gray-900">Personal Touch</h4>
                <p className="text-sm text-gray-600 font-light">Premium, personalized service for customers and suppliers</p>
              </div>
              <div className="text-center">
                <Clock className="w-8 h-8 text-gray-600 mx-auto mb-4" />
                <h4 className="font-medium mb-2 text-gray-900">Streamlined</h4>
                <p className="text-sm text-gray-600 font-light">Quality-controlled delivery process ensuring freshness and affordability</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-gradient-to-b from-blue-50 to-cyan-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">How It Works</h2>
            <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto leading-relaxed">
              Our simple process ensures premium Japanese products arrive fresh and on time
            </p>
            <div className="mt-8 inline-block bg-gray-100 px-6 py-3 rounded-full">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-600" />
                <span className="text-lg font-medium text-gray-800">4-12 Planned Shipments Per Year</span>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-14 h-14 text-gray-800" />
                <span className="text-xs font-bold text-gray-600 mt-1">1</span>
              </div>
              <h3 className="text-lg font-medium mb-4 text-gray-900">Pre-Order</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                We connect with Tel Aviv chefs and restaurants to build a list of desired products through our storefront and concierge service.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
                <Plane className="w-14 h-14 text-gray-800" />
                <span className="text-xs font-bold text-gray-600 mt-1">2</span>
              </div>
              <h3 className="text-lg font-medium mb-4 text-gray-900">Procurement</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Our Japanese partners procure and ship all customer products to our Israeli distribution center.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
                <Truck className="w-14 h-14 text-gray-800" />
                <span className="text-xs font-bold text-gray-600 mt-1">3</span>
              </div>
              <h3 className="text-lg font-medium mb-4 text-gray-900">Distribution</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Kampai TLV arranges distribution of goods to customers within 24 hours of customs clearance.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-full flex flex-col items-center justify-center mx-auto mb-6">
                <Utensils className="w-14 h-14 text-gray-800" />
                <span className="text-xs font-bold text-gray-600 mt-1">4</span>
              </div>
              <h3 className="text-lg font-medium mb-4 text-gray-900">Enjoy</h3>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                Customers cook and enjoy the finest Japanese materials, creating incredible dining experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 px-6 bg-gradient-to-b from-amber-50 to-orange-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">Our Products</h2>
            <p className="text-xl text-gray-600 font-light">A selection of our premium Japanese ingredients</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center">
                <img 
                  src="https://storage.googleapis.com/duckr-b8e76.appspot.com/resized/aS9MfEC71-b2845133a81ea80a8efa69ad70effa79dff2c60a56e3a5168a41c0c789505a12_896x504.jpg" 
                  alt="Premium Uni" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-light mb-4 text-gray-900">Uni</h3>
                <p className="text-gray-600 font-light mb-6 leading-relaxed">
                  Premium sea urchin from Hokkaido's pristine waters. Known for its creamy texture and sweet, briny flavor that elevates any sushi or sashimi experience.
                </p>
                <button 
                  onClick={() => orderProduct('Premium Uni from Hokkaido')}
                  className="text-gray-800 hover:text-gray-900 font-medium transition-colors border-b border-gray-300 hover:border-gray-500"
                >
                  Inquire About Availability →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                <img 
                  src="https://storage.googleapis.com/duckr-b8e76.appspot.com/resized/bfuUD-Alj-4b4fb0de7d0c038bc6b0d0b2a097cc035a4bc0785bc04cfebe1173bb65152f54_896x504.jpg" 
                  alt="Premium Unagi" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-light mb-4 text-gray-900">Unagi</h3>
                <p className="text-gray-600 font-light mb-6 leading-relaxed">
                  Freshwater eel prepared using traditional Japanese methods. Rich, savory, and perfectly glazed with authentic tare sauce for an authentic experience.
                </p>
                <button 
                  onClick={() => orderProduct('Premium Unagi with traditional preparation')}
                  className="text-gray-800 hover:text-gray-900 font-medium transition-colors border-b border-gray-300 hover:border-gray-500"
                >
                  Inquire About Availability →
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <img 
                  src="/images/binchotan.png" 
                  alt="Premium Binchotan Japanese Charcoal burning with red embers" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-light mb-4 text-gray-900">Binchotan</h3>
                <p className="text-gray-600 font-light mb-6 leading-relaxed">
                  Premium Japanese charcoal prized for its ability to burn at high temperatures with minimal smoke, perfect for authentic yakitori and robatayaki cooking.
                </p>
                <button 
                  onClick={() => orderProduct('Premium Binchotan charcoal')}
                  className="text-gray-800 hover:text-gray-900 font-medium transition-colors border-b border-gray-300 hover:border-gray-500"
                >
                  Inquire About Availability →
                </button>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={openWhatsApp}
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors"
            >
              Browse Our Full Catalog
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-gradient-to-b from-purple-50 to-indigo-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-8">Contact Us</h2>
            <p className="text-xl text-gray-600 font-light">
              Ready to bring premium Japanese ingredients to your kitchen?
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-light mb-8 text-gray-900">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">WhatsApp</p>
                    <p className="text-gray-600">+972-54-544-8423</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Email</p>
                    <p className="text-gray-600">info@kampaitlv.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">Location</p>
                    <p className="text-gray-600">Tel Aviv, Israel</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-xl font-medium mb-6 text-gray-900">Send Us A Message</h3>
              <form className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
                />
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
                />
                <input 
                  type="text" 
                  placeholder="Restaurant/Business Name" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
                />
                <textarea 
                  placeholder="What products are you interested in?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors resize-none"
                ></textarea>
                <button 
                  type="submit"
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Widget - Hidden as requested */}
      {/* 
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={openWhatsApp}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-all"
          title="Contact us on WhatsApp"
        >
          <MessageCircle size={24} />
        </button>
      </div>
      */}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-light mb-4">Kampai TLV</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Bringing premium Japanese fresh food products directly from Tokyo's markets to Israel's finest dining establishments.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Contact</h4>
              <div className="space-y-2 text-sm text-gray-400">
                <p>+972-54-544-8423</p>
                <p>info@kampaitlv.com</p>
                <p>Tel Aviv, Israel</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-4">Founded by</h4>
              <p className="text-gray-400 text-sm">
                Oren Raboy<br />
                Japanese cuisine enthusiast<br />
                10+ years experience
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Kampai TLV. Made with care in Tel Aviv.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        
        html {
          scroll-behavior: smooth;
        }
        
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
}

export default function KampaiLanding() {
  return (
    <LanguageProvider>
      <KampaiLandingContent />
    </LanguageProvider>
  );
}
