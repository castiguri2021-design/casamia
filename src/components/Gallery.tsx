import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const images = [
  { src: '/images/loc1.jpg', title: 'Salon Principal' },
  { src: '/images/loc2.jpg', title: 'Atmosferă Caldă' },
  { src: '/images/loc3.jpg', title: 'Terasa' },
  { src: '/images/loc4.jpg', title: 'Detalii Design' },
  { src: '/images/loc5.jpg', title: 'Sala Privată' },
];

export default function Gallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="gallery" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <p className="font-cinzel text-sm tracking-[4px] text-mia-gold uppercase mb-4">Galerie</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Ambianța <span className="text-mia-red">Noastră</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.1 }} className={`relative group cursor-pointer overflow-hidden rounded-xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              onClick={() => setSelected(i)}>
              <div className={i === 0 ? 'aspect-square' : 'aspect-[4/3]'}>
                <img src={img.src} alt={img.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h4 className="font-serif font-bold text-white">{img.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
            <button className="absolute top-6 right-6 text-white/70 hover:text-white"><X size={32} /></button>
            <motion.img initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}
              src={images[selected].src} alt={images[selected].title} className="max-w-full max-h-[85vh] object-contain rounded-lg" onClick={(e) => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
