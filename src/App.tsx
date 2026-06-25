import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import OrderPage from './pages/OrderPage';
import ReviewsPage from './pages/ReviewsPage';
import SEOItalianTunari from './pages/SEOItalianTunari';
import SEOPizzaTunari from './pages/SEOPizzaTunari';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, ChevronUp, MessageCircle, X, Send, UtensilsCrossed, Navigation, ExternalLink  } from 'lucide-react';

// Social Media Icons
const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

// Social Media Widget
const SocialMediaWidget = () => (
  <div className="fixed bottom-32 right-4 md:right-6 z-40 flex flex-col gap-2 md:gap-3">
    <a href="https://www.facebook.com/p/Casamiaro-61570068728537/" target="_blank" rel="noopener noreferrer"
      className="bg-[#1877F2] hover:bg-[#166FE5] text-white p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110">
      <FacebookIcon />
    </a>
    <a href="https://www.instagram.com/casa_mia_cucina/" target="_blank" rel="noopener noreferrer"
      className="bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#dc2743] hover:opacity-90 text-white p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110">
      <InstagramIcon />
    </a>
    <a href="https://www.tiktok.com/@casamia.ro" target="_blank" rel="noopener noreferrer"
      className="bg-black hover:bg-gray-800 text-white p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110">
      <TikTokIcon />
    </a>
    <a href="https://wa.me/40720718719" target="_blank" rel="noopener noreferrer"
      className="bg-[#25D366] hover:bg-[#20BA5E] text-white p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110">
      <WhatsAppIcon />
    </a>
  </div>
);
import { foodMenu } from './data/foodMenu';
import Reviews from './components/Reviews';

// Chat Component
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      });
      const data = await res.json();
      const aiContent = data.choices?.[0]?.message?.content || 'Scuze, nu pot răspunde acum.';
      setMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Eroare de conexiune. Încearcă din nou.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-50 bg-red-800 hover:bg-red-900 text-white p-3 md:p-4 rounded-full shadow-xl transition-all">
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 right-4 md:left-6 md:right-auto z-50 w-auto md:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden h-[70vh] md:h-[500px]">
            <div className="bg-red-900 text-white p-4 flex items-center gap-2">
              <UtensilsCrossed size={20} /> <span className="font-serif font-bold">Asistent Casa Mia</span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-stone-50">
              {messages.length === 0 && <p className="text-stone-500 text-sm italic text-center">Bună! Cu ce te pot ajuta astăzi?</p>}
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-xl text-sm ${m.role === 'user' ? 'bg-red-800 text-white rounded-br-none' : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && <div className="text-stone-400 text-xs animate-pulse">Scrie...</div>}
              <div ref={endRef} />
            </div>
            <div className="p-3 border-t border-stone-200 flex gap-2 bg-white">
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
                placeholder="Întreabă despre meniu..." className="flex-1 px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 text-sm" />
              <button onClick={sendMessage} className="bg-red-800 text-white p-2 rounded-lg hover:bg-red-900"><Send size={18} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Section Wrapper
const Section = ({ id, title, children, dark = false }: any) => (
  <section id={id} className={`py-16 md:py-20 px-4 md:px-8 ${dark ? 'bg-stone-900 text-stone-100' : 'bg-white text-stone-800'}`}>
    <div className="max-w-6xl mx-auto">
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 md:mb-12 text-red-900">{title}</motion.h2>
      {children}
    </div>
  </section>
);

function App() {
  const [activeCat, setActiveCat] = useState(foodMenu[0].id);
  const [showTop, setShowTop] = useState(false);

  const restaurantAddress = "Strada San Marco 1-5, 077180 Tunari";
  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(restaurantAddress)}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent(restaurantAddress)}&navigate=yes`;

  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/meniu" element={<OrderPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/restaurant-italian-tunari" element={<SEOItalianTunari />} />
        <Route path="/pizza-tunari" element={<SEOPizzaTunari />} />
        <Route path="/restaurant-italian-tunari" element={<SEOItalianTunari />} />
        <Route path="/pizza-tunari" element={<SEOPizzaTunari />} />
        <Route path="/" element={
    <div className="font-sans bg-stone-50 text-stone-800 scroll-smooth">
      
      {/* 1. HERO IMAGE CU TITLU ȘI BUTON UNIC DE COMANDĂ */}
      <header className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="/images/loc1.jpg"
          alt="Ristorante Casa Mia"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center gap-2 mb-8">
              <p className="font-serif text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide drop-shadow-xl">
                Ristorante
              </p>
              <h1 className="font-serif text-white text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider drop-shadow-2xl">
                Casa Mia
              </h1>
              <p className="font-serif text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide drop-shadow-xl">
                Cucina di Fuoco
              </p>
            </div>
            
            {/* UNICUL BUTON DE COMANDĂ ONLINE */}
            <Link 
              to="/meniu" 
              className="inline-flex items-center gap-3 px-10 py-4 bg-red-700 hover:bg-red-800 text-white rounded-full font-bold text-lg transition-all hover:scale-105 shadow-2xl border border-white/30 backdrop-blur-md"
            >
              <span className="text-2xl">🛒</span>
              <span>Comandă Online</span>
            </Link>
            <p className="text-white/90 text-sm mt-4 font-medium drop-shadow-md max-w-md mx-auto">
              Alege preparatele favorite și trimite comanda pe WhatsApp
            </p>
          </motion.div>
        </div>
      </header>



      {/* 2. INTRO TEXT */}
      <section className="relative z-20 bg-stone-950 text-stone-100 py-16 md:py-24 px-4 text-center border-t border-stone-800">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex flex-col items-center justify-center mb-6 md:mb-8">
            <p className="font-cinzel text-stone-400 tracking-[0.4em] uppercase text-sm md:text-base mb-2 font-medium">
              Ristorante
            </p>
            <h1 className="font-serif font-bold text-6xl md:text-8xl lg:text-9xl text-white leading-none drop-shadow-2xl">
              Casa <span className="text-red-600">Mia</span>
            </h1>
            <div className="w-24 h-1 bg-red-600 my-4 rounded-full shadow-lg"></div>
            <p className="font-cinzel text-amber-500 tracking-[0.3em] uppercase text-lg md:text-xl font-bold italic">
              Cucina di Fuoco
            </p>
          </div>
          <div className="w-20 h-1 bg-red-600 mx-auto my-6 rounded-full" />
          <p className="text-stone-300 text-base md:text-xl italic font-light leading-relaxed mb-8 md:mb-10 px-2">
            Autenticitate italiană în fiecare farfurie. Ingrediente proaspete, atmosferă caldă, experiență memorabilă.
          </p>
          <motion.a 
            href="#meniu" 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 md:px-10 md:py-4 bg-red-700 hover:bg-red-800 text-white rounded-full font-medium transition-all shadow-lg shadow-red-900/30 text-base md:text-lg"
          >
            Descoperă Meniul
          </motion.a>
        </motion.div>
      </section>

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
                className={`overflow-hidden rounded-2xl shadow-xl relative group ${i === 0 ? 'md:col-span-2 h-64 md:h-[550px]' : 'h-64 md:h-96'}`}>
                <img src={`/images/loc${n}.jpg`} alt={`Locație ${n}`} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 contrast-105 brightness-95 group-hover:brightness-100" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENZII CLIENȚI */}
      <Reviews />

      {/* CONTACT CU HARTĂ ȘI BUTOANE NAVIGARE */}
      <section id="contact" className="py-16 md:py-20 px-4 md:px-8 bg-stone-900 text-stone-100">
        <div className="max-w-6xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif font-bold text-center mb-8 md:mb-12 text-red-900">Rezervă-ți Masa</motion.h2>
          
          {/* Informații Contact */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center mb-12">
            <div className="p-6 bg-stone-800 rounded-xl">
              <MapPin className="mx-auto text-red-500 mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2">Adresă</h3>
              <p className="text-stone-400 text-sm md:text-base">Strada San Marco Nr. 1-5<br/>Tunari, Ilfov</p>
            </div>
            <div className="p-6 bg-stone-800 rounded-xl">
              <Phone className="mx-auto text-red-500 mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2">Telefon</h3>
              <a href="tel:+40720718719" className="text-red-400 hover:underline text-sm md:text-base">+40 720 718 719</a>
            </div>
            <div className="p-6 bg-stone-800 rounded-xl">
              <Clock className="mx-auto text-red-500 mb-3" size={32} />
              <h3 className="font-bold text-lg mb-2">Program</h3>
              <p className="text-stone-400 text-xs md:text-sm">L-J: 12:00-23:00<br/>V-S: 12:00-00:00<br/>D: 13:00-22:00</p>
            </div>
          </div>

          <div className="text-center mb-8">
            <a href="mailto:ristorantemia@gmail.com" className="inline-flex items-center gap-2 text-stone-300 hover:text-white transition-colors text-sm md:text-base">
              <Mail size={18} /> ristorantemia@gmail.com
            </a>
          </div>

          {/* Formular Rezervare */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mb-8 bg-stone-800 rounded-2xl p-6 md:p-8 border border-stone-700"
          >
            <h3 className="font-serif text-2xl font-bold text-center mb-6 text-white">Rezervă o Masă</h3>
            <form 
              action="https://wa.me/40720718719" 
              method="get" 
              target="_blank"
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const name = formData.get('name');
                const phone = formData.get('phone');
                const date = formData.get('date');
                const time = formData.get('time');
                const guests = formData.get('guests');
                const message = `Rezervare nouă:%0A%0ANume: ${name}%0ATelefon: ${phone}%0AData: ${date}%0AOra: ${time}%0APersoane: ${guests}`;
                window.open(`https://wa.me/40720718719?text=${message}`, '_blank');
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Nume complet *"
                  required
                  className="w-full px-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-800"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Telefon *"
                  required
                  className="w-full px-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-red-800"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                />
                <input
                  type="time"
                  name="time"
                  required
                  className="w-full px-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                />
                <select
                  name="guests"
                  required
                  className="w-full px-4 py-3 bg-stone-700 border border-stone-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-800"
                >
                  <option value="">Persoane</option>
                  <option value="1">1 persoană</option>
                  <option value="2">2 persoane</option>
                  <option value="3">3 persoane</option>
                  <option value="4">4 persoane</option>
                  <option value="5">5 persoane</option>
                  <option value="6">6 persoane</option>
                  <option value="7">7+ persoane</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-red-800 hover:bg-red-900 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Trimite Rezervarea pe WhatsApp
              </button>
            </form>
          </motion.div>

          {/* Buton Comandă Online */}
          <div className="text-center mb-8">
            <a 
              href="/meniu" 
              className="inline-flex items-center gap-3 px-8 py-4 bg-red-800 hover:bg-red-900 text-white font-bold rounded-full transition-all hover:scale-105 shadow-lg"
            >
              <span className="text-2xl">🛒</span>
              <span className="text-lg">Comandă Online</span>
            </a>
            <p className="text-stone-400 text-sm mt-3">Alege preparatele favorite și trimite comanda pe WhatsApp</p>
          </div>

          {/* Hartă Google Maps */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-8 rounded-2xl overflow-hidden shadow-2xl border-4 border-stone-700">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.1234567890123!2d26.123456789012345!3d44.567890123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f1234567890a%3A0x1234567890abcdef!2sStrada%20San%20Marco%201-5%2C%20077180%20Tunari!5e0!3m2!1sen!2sro!4v1234567890123!5m2!1sen!2sro`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>

          {/* Butoane Navigare */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <motion.a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 bg-[#33ccff] hover:bg-[#2db8e6] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg"
            >
              <Navigation size={24} />
              <div className="text-left">
                <div className="text-xs opacity-90">Deschide în</div>
                <div className="text-lg">Waze</div>
              </div>
              <ExternalLink size={18} className="opacity-75" />
            </motion.a>

            <motion.a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 bg-[#4285f4] hover:bg-[#3367d6] text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg"
            >
              <MapPin size={24} />
              <div className="text-left">
                <div className="text-xs opacity-90">Deschide în</div>
                <div className="text-lg">Google Maps</div>
              </div>
              <ExternalLink size={18} className="opacity-75" />
            </motion.a>
          </div>

          <p className="text-center text-stone-400 text-sm mt-6">
            Apasă pe butoane pentru navigare directă către locația noastră
          </p>
        </div>
      </section>

      <footer className="bg-stone-950 text-stone-500 py-6 text-center text-xs md:text-sm border-t border-stone-800 px-4">
        © {new Date().getFullYear()} Ristorante Casa Mia • Cucina di Fuoco. Toate drepturile rezervate.
      </footer>

      <SocialMediaWidget />
      <ChatWidget />
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-stone-800 text-white p-2 md:p-3 rounded-full shadow-lg hover:bg-stone-700">
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
