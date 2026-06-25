import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Clock, ChevronUp } from 'lucide-react';
import { foodMenu } from './data/foodMenu';
import Reviews from './components/Reviews';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import OrderPage from './pages/OrderPage';
import ReviewsPage from './pages/ReviewsPage';
import SEOItalianTunari from './pages/SEOItalianTunari';
import SEOPizzaTunari from './pages/SEOPizzaTunari';

function Section({ id, title, children, dark = false }: { id: string; title: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <section id={id} className={`py-16 md:py-20 px-4 md:px-8 ${dark ? 'bg-stone-900 text-stone-100' : 'bg-stone-50 text-stone-800'}`}>
      <div className="max-w-6xl mx-auto">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-serif font-bold text-center mb-8 md:mb-12 ${dark ? 'text-red-500' : 'text-red-900'}`}>{title}</motion.h2>
        {children}
      </div>
    </section>
  );
}

function App() {
  const [activeCat, setActiveCat] = useState(foodMenu[0].id);
  
  // Slideshow Logic
  const heroImages = ['/images/loc1.jpg', '/images/loc2.jpg', '/images/loc3.jpg', '/images/loc4.jpg'];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/meniu" element={<OrderPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/restaurant-italian-tunari" element={<SEOItalianTunari />} />
        <Route path="/pizza-tunari" element={<SEOPizzaTunari />} />
        <Route path="/" element={
          <div className="font-sans bg-stone-50 text-stone-800 scroll-smooth">
            <Navbar />

            {/* 1. HERO SLIDESHOW CU TITLU ȘI BUTON UNIC */}
            <header className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
              <AnimatePresence mode='wait'>
                <motion.img
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  src={heroImages[currentImageIndex]}
                  alt="                  <div className="flex flex-col items-center mb-12 px-6">
                    <p className="text-stone-300 tracking-[0.6em] uppercase text-xs md:text-sm font-medium mb-6 drop-shadow-md">
                      Ristorante
                    </p>
                    
                    <h1 className="font-serif text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-center leading-none tracking-tight" 
                        style={{ textShadow: '0 4px 30px rgba(0,0,0,0.8)' }}>
                      Casa Mia
                    </h1>
                    
                    <div className="flex items-center gap-4 my-6">
                      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-red-600"></div>
                      <div className="w-3 h-3 rotate-45 bg-red-600 shadow-lg"></div>
                      <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-red-600"></div>
                    </div>
                    
                    <p className="font-cinzel text-amber-400 tracking-[0.5em] uppercase text-base md:text-xl font-bold italic"
                       style={{ textShadow: '0 2px 20px rgba(251,191,36,0.4)' }}>
                      Cucina di Fuoco
                    </p>
                  </div>
                    </p>
                  </div>
                  
                  <Link 
                    to="/meniu" 
                    className="inline-flex items-center gap-3 px-10 py-5 bg-red-700 hover:bg-red-800 text-white rounded-full font-bold text-xl transition-all hover:scale-105 shadow-2xl border-2 border-white/20 backdrop-blur-sm group"
                  >
                    <span className="text-3xl group-hover:rotate-12 transition-transform">🛒</span>
                    <span>Comandă Online</span>
                  </Link>
                  
                  <p className="text-white/80 text-base md:text-lg mt-6 font-medium drop-shadow-md max-w-lg mx-auto">
                    Alege preparatele favorite și trimite comanda direct pe WhatsApp
                  </p>
                </motion.div>
              </div>
            </header>

            {/* DESPRE NOI */}
            <Section id="despre" title="Despre Noi">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-center">
                <motion.img initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
                  src="/images/loc1.jpg" alt="Interior" className="rounded-2xl shadow-xl w-full h-64 md:h-80 object-cover" />
                <div className="space-y-4 text-base md:text-lg leading-relaxed text-stone-600 text-center md:text-left">
                  <p>La <strong className="text-red-900">Ristorante Casa Mia</strong>, aducem Italia mai aproape de tine. Fiecare farfurie este o poveste despre ingrediente proaspete, rețete tradiționale și pasiune pentru focul bucătăriei.</p>
                  <p>Situați în inima zonei Tunari, lângă Otopeni, vă invităm să vă deconectați de la ritmul alert și să vă bucurați de o atmosferă caldă, specific italiană.</p>
                </div>
              </div>
            </Section>

            {/* MENIU MANCARE */}
            <Section id="meniu" title="Meniu Mâncare" dark>
              <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10">
                {foodMenu.map(cat => (
                  <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                    className={`px-3 py-2 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all ${activeCat === cat.id ? 'bg-red-800 text-white' : 'bg-stone-800 text-stone-300 hover:bg-stone-700'}`}>
                    {cat.name}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {foodMenu.find(c => c.id === activeCat)?.items.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                    className="bg-stone-800 p-3 md:p-4 rounded-xl border border-stone-700 hover:border-red-900 transition-all flex gap-3 md:gap-4">
                    <img
                      src={`/images/food/${item.image}`}
                      alt={item.name}
                      className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg flex-shrink-0 bg-stone-700"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/images/loc1.jpg'; }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-serif font-bold text-base md:text-lg text-stone-100 leading-tight">{item.name}</h3>
                        <span className="text-red-400 font-bold whitespace-nowrap ml-2 text-sm md:text-base">{item.price} LEI</span>
                      </div>
                      <p className="text-stone-400 text-xs md:text-sm italic line-clamp-2">{item.ingredients}</p>
                      {item.weight && <p className="text-stone-500 text-xs mt-1">{item.weight}</p>}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* GALERIE PREMIUM */}
            <section id="galerie" className="py-16 md:py-20 px-4 md:px-6 lg:px-10 bg-stone-50">
              <div className="max-w-[1400px] mx-auto">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-serif font-bold text-center mb-3 text-red-900">Galerie</motion.h2>
                <p className="text-center text-stone-500 mb-8 md:mb-12 italic text-base md:text-lg">Ambianța Noastră</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[1,2,3,4,5].map((n, i) => (
                    <motion.div key={n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="group relative overflow-hidden rounded-2xl shadow-lg aspect-video cursor-pointer">
                      <img src={`/images/loc${n}.jpg`} alt={`Locație ${n}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* RECENZII */}
            <Reviews />

            {/* CONTACT */}
            <section id="contact" className="py-16 md:py-20 px-4 md:px-8 bg-stone-900 text-stone-100">
              <div className="max-w-6xl mx-auto">
                <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 md:mb-12 text-red-500">Rezervă-ți Masa</motion.h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center mb-12">
                  <div className="p-6 bg-stone-800 rounded-xl">
                    <MapPin className="mx-auto text-red-500 mb-3" size={32} />
                    <h3 className="font-bold text-lg mb-2">Adresă</h3>
                    <p className="text-stone-400 text-sm md:text-base">Strada San Marco Nr. 1-5<br/>Tunari, Ilfov</p>
                  </div>
                  <div className="p-6 bg-stone-800 rounded-xl">
                    <Phone className="mx-auto text-red-500 mb-3" size={32} />
                    <h3 className="font-bold text-lg mb-2">Telefon</h3>
                    <a href="tel:+40720718719" className="text-stone-400 hover:text-white transition-colors">+40 720 718 719</a>
                  </div>
                  <div className="p-6 bg-stone-800 rounded-xl">
                    <Clock className="mx-auto text-red-500 mb-3" size={32} />
                    <h3 className="font-bold text-lg mb-2">Program</h3>
                    <p className="text-stone-400 text-sm md:text-base">L-J: 12:00-23:00<br/>V-S: 12:00-00:00</p>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <Link to="/meniu" className="inline-flex items-center gap-3 px-8 py-4 bg-red-800 hover:bg-red-900 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg">
                    <span className="text-2xl">🛒</span>
                    <span className="text-lg">Comandă Online</span>
                  </Link>
                  <p className="text-stone-400 text-sm mt-3">Alege preparatele favorite și trimite comanda pe WhatsApp</p>
                </div>
              </div>
            </section>

            <Footer />
            
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-stone-800 text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-stone-700">
              <ChevronUp size={24} />
            </button>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
