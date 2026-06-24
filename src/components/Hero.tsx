import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/videos/video1.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-mia-dark" />
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="font-cinzel text-sm tracking-[6px] text-mia-gold uppercase mb-4">Ristorante</p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2">
            Casa <span className="text-mia-red">Mia</span>
          </h1>
          <p className="font-cinzel text-lg md:text-xl text-mia-gold tracking-[4px] mb-6">Cucina di Fuoco</p>
          <div className="w-24 h-0.5 bg-mia-red mx-auto my-6" />
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10">
            Autenticitate italiană în fiecare farfurie. Ingrediente proaspete, atmosferă caldă, experiență memorabilă.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a href="#menu" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-mia-red text-white font-medium rounded-full hover:bg-red-700 transition-colors">
              Vezi Meniul
            </motion.a>
            <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border border-white/30 text-white font-medium rounded-full hover:bg-white/10 transition-colors">
              Rezervă Masă
            </motion.a>
          </div>
        </motion.div>
      </div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50">
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
}
