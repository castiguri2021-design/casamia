import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Clock, Mail, ChevronUp, MessageCircle, X, Send, UtensilsCrossed, Navigation, ExternalLink } from 'lucide-react';
import { foodMenu } from './data/foodMenu';

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
      <button onClick={() => setIsOpen(!isOpen)} className="fixed bottom-6 right-6 z-50 bg-red-800 hover:bg-red-900 text-white p-4 rounded-full shadow-xl transition-all">
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-[85vw] md:w-96 bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden h-[60vh] md:h-[500px]">
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

export default function App() {
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
    <div className="font-sans bg-stone-50 text-stone-800 scroll-smooth">
      
      {/* 1. HERO VIDEO: PRIMUL LUCRU, FULL SCREEN, OPTIMIZAT PENTRU MOBIL */}
      <header className="relative w-full h-[100dvh] overflow-hidden bg-black">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'contrast(1.15) brightness(0.85)' }}
        >
          <source src="/videos/video1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />
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
          <p className="text-red-500 tracking-[0.3em] uppercase text-xs md:text-sm mb-3 font-bold">Cucina di Fuoco</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight mb-4 md:mb-6">
            Ristorante <span className="text-red-600">Casa Mia</span>
          </h1>
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

      <ChatWidget />
      <AnimatePresence>
        {showTop && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-50 bg-stone-800 text-white p-3 rounded-full shadow-lg hover:bg-stone-700">
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
