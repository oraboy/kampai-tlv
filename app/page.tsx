import React from 'react';
import { MessageCircle, MapPin, Clock, Users } from 'lucide-react';

export default function KampaiLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
      {/* Header */}
      <nav className="px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-white text-2xl font-bold">
            Kampai TLV 🍻
          </div>
          <button className="bg-white/20 backdrop-blur text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors">
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Your AI Wingman for
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
              Tel Aviv Nights
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Get personalized recommendations for the best bars, clubs, and experiences 
            in Tel Aviv. From Florentin underground to Rothschild rooftops.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
              <MessageCircle size={20} />
              Start Chatting
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-16">
            Why Kampai TLV?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
              <MapPin className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Local Expert</h3>
              <p className="text-blue-100">
                Knows every neighborhood from Jaffa Port to Park Hayarkon
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
              <Clock className="w-12 h-12 text-green-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Real-Time</h3>
              <p className="text-blue-100">
                Live updates on events, happy hours, and crowd levels
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
              <Users className="w-12 h-12 text-pink-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Personalized</h3>
              <p className="text-blue-100">
                Learns your vibe and suggests spots that match your energy
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-center">
              <MessageCircle className="w-12 h-12 text-blue-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Always On</h3>
              <p className="text-blue-100">
                24/7 companion for spontaneous adventures in the city
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore Tel Aviv?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands discovering the best nightlife in the Middle East
          </p>
          <button className="bg-gradient-to-r from-yellow-400 to-pink-400 text-purple-900 px-12 py-4 rounded-xl font-bold text-xl hover:scale-105 transition-transform">
            Get Started Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/20">
        <div className="max-w-6xl mx-auto text-center text-blue-200">
          <p>&copy; 2025 Kampai TLV. Made with ❤️ in Tel Aviv.</p>
        </div>
      </footer>
    </div>
  );
}
