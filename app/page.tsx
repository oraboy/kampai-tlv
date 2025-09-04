'use client';

import React from 'react';
import { MessageCircle, Truck, Star, ChefHat } from 'lucide-react';

const openWhatsApp = () => {
  window.open('https://wa.me/972501234567', '_blank');
};

const orderProduct = (product: string) => {
  window.open(`https://wa.me/972501234567?text=היי, אני מעוניין ב${product}`, '_blank');
};

export default function KampaiLanding() {
  return (
    <div className="min-h-screen bg-white" dir="rtl" style={{ fontFamily: 'system-ui, sans-serif' }}>
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-8 py-4">
          <div className="text-2xl font-bold text-red-600">
            🍶 Kampai TLV
          </div>
          <div className="flex gap-8">
            <a href="#products" className="text-gray-800 hover:text-red-600 transition-colors">מוצרים</a>
            <a href="#about" className="text-gray-800 hover:text-red-600 transition-colors">אודות</a>
            <a href="tel:+972501234567" className="text-gray-800 hover:text-red-600 transition-colors">📞 050-123-4567</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-bl from-blue-600 via-purple-600 to-indigo-700 text-white py-20 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
            היבואן הישיר שלך מיפן
          </h1>
          <p className="text-2xl mb-2 opacity-95">Your Direct Japanese Import Partner</p>
          <p className="text-lg mb-8 opacity-90">מהשווקים של טוקיו ישירות למטבח שלך</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={openWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
            >
              💬 WhatsApp לקבלת קטלוג
            </button>
            <button 
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-indigo-700 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              📋 ראה מוצרים
            </button>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-16 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">משלוחים שבועיים</h3>
              <p className="text-gray-600">ישירות מיפן כל שבוע</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">איכות פרימיום</h3>
              <p className="text-gray-600">רק המוצרים הטובים ביותר</p>
            </div>
            
            <div className="bg-white rounded-xl p-8 text-center shadow-lg">
              <ChefHat className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2 text-gray-800">למסעדות ושפים</h3>
              <p className="text-gray-600">שירות מותאם למקצוענים</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-indigo-800">המוצרים שלנו | Our Products</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow text-center">
              <div className="flex justify-between items-center mb-4">
                <span className="text-4xl">🦪</span>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">השבוע</span>
              </div>
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Uni (אוני)</h3>
              <p className="text-gray-600 mb-3">אוני טרי מהוקאידו</p>
              <p className="text-2xl font-bold text-red-600 mb-4">₪450/100g</p>
              <button 
                onClick={() => orderProduct('Uni')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                הזמן עכשיו
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow text-center">
              <div className="flex justify-between items-center mb-4">
                <span className="text-4xl">🥩</span>
                <span className="bg-orange-100 text-orange-800 text-xs font-semibold px-3 py-1 rounded-full">הזמנה מראש</span>
              </div>
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Wagyu A5</h3>
              <p className="text-gray-600 mb-3">בקר וואגיו ממיאזאקי</p>
              <p className="text-2xl font-bold text-red-600 mb-4">₪850/kg</p>
              <button 
                onClick={() => orderProduct('Wagyu')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                הזמן עכשיו
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow text-center">
              <div className="flex justify-between items-center mb-4">
                <span className="text-4xl">🍶</span>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">במלאי</span>
              </div>
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Premium Sake</h3>
              <p className="text-gray-600 mb-3">מבחר סאקה מובחר</p>
              <p className="text-2xl font-bold text-red-600 mb-4">₪180+</p>
              <button 
                onClick={() => orderProduct('Sake')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                ראה מבחר
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow text-center">
              <div className="flex justify-between items-center mb-4">
                <span className="text-4xl">🐟</span>
                <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">עונתי</span>
              </div>
              <h3 className="text-xl font-bold text-indigo-800 mb-2">Seasonal Fish</h3>
              <p className="text-gray-600 mb-3">דגים טריים מצוקיג'י</p>
              <p className="text-2xl font-bold text-red-600 mb-4">לפי השוק</p>
              <button 
                onClick={() => orderProduct('Fish')}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors"
              >
                בדוק זמינות
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 px-8 bg-gray-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-indigo-800">אודות Kampai TLV</h2>
          <p className="text-lg mb-4 text-gray-700">אנחנו מביאים את המרכיבים היפניים הטובים ביותר ישירות לתל אביב.</p>
          <p className="text-lg mb-8 text-gray-700">בעלים: אורן רבוי | מעל 10 שנות ניסיון במטבח היפני</p>
          
          <div className="flex justify-center gap-8 flex-wrap text-gray-700">
            <p className="flex items-center gap-2">📞 050-123-4567</p>
            <p className="flex items-center gap-2">📧 info@kampaitlv.com</p>
            <p className="flex items-center gap-2">📍 תל אביב</p>
          </div>
        </div>
      </section>

      {/* AI Chat Widget */}
      <div className="fixed bottom-5 left-5 z-50">
        <button 
          onClick={openWhatsApp}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <MessageCircle size={20} />
          שאל על מוצרים
        </button>
      </div>

      {/* Footer */}
      <footer className="bg-indigo-800 text-white py-8 px-8 text-center">
        <div className="max-w-6xl mx-auto">
          <p>&copy; 2025 Kampai TLV. Made with ❤️ in Tel Aviv.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}
