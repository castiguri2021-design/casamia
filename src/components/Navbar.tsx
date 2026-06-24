import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Acasă', href: '#home' },
  { label: 'Meniu', href: '#menu' },
  { label: 'Galerie', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-mia-red flex items-center justify-center">
              <span className="font-serif font-bold text-white text-lg">M</span>
            </div>
            <div>
              <h1 className="font-serif font-bold text-xl text-white">Casa Mia</h1>
              <p className="text-[10px] text-mia-gold tracking-widest uppercase font-cinzel">Cucina di Fuoco</p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-white/70 hover:text-mia-gold transition-colors font-medium">
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+40720718719" className="flex items-center gap-2 text-sm text-mia-gold hover:text-white transition-colors">
              <Phone size={14} />
              <span>+40 720 718 719</span>
            </a>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-30 bg-black pt-24 px-6 lg:hidden"
          >
            <div className="space-y-6">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="block text-2xl font-serif text-white hover:text-mia-gold transition-colors">
                  {link.label}
                </a>
              ))}
              <div className="pt-6 border-t border-white/10">
                <a href="tel:+40720718719" className="flex items-center gap-3 text-mia-gold">
                  <Phone size={18} />
                  <span>+40 720 718 719</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
