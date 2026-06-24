import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-black to-mia-dark">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <p className="font-cinzel text-sm tracking-[4px] text-mia-gold uppercase mb-4">Contact</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Rezervă-ți <span className="text-mia-red">Masa</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">Te așteptăm cu drag la Ristorante Casa Mia.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: MapPin, title: 'Adresă', lines: ['Strada San Marco Nr. 1-5', 'Tunari, Ilfov (near Otopeni)'] },
            { icon: Phone, title: 'Telefon', lines: ['+40 720 718 719'], href: 'tel:+40720718719' },
            { icon: Mail, title: 'Email', lines: ['ristorantemia@gmail.com'], href: 'mailto:ristorantemia@gmail.com' },
            { icon: Clock, title: 'Program', lines: ['Luni-Joi: 12:00-23:00', 'Vineri-Sâmb: 12:00-00:00', 'Duminică: 13:00-22:00'] },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center hover:bg-white/10 transition-colors">
              <div className="w-12 h-12 rounded-full bg-mia-red/20 flex items-center justify-center mx-auto mb-4">
                <item.icon size={20} className="text-mia-red" />
              </div>
              <h3 className="font-serif font-bold text-white mb-2">{item.title}</h3>
              {item.lines.map((line, j) => (
                item.href ? (
                  <a key={j} href={item.href} className="block text-mia-gold hover:text-white transition-colors text-sm">{line}</a>
                ) : (
                  <p key={j} className="text-white/60 text-sm">{line}</p>
                )
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.4 }}
          className="mt-12 glass rounded-2xl p-8 text-center">
          <h3 className="font-serif text-2xl font-bold text-white mb-4">Rezervare Rapidă</h3>
          <p className="text-white/60 mb-6">Pentru rezervări și evenimente private, sună-ne sau trimite un email.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+40720718719" className="inline-flex items-center gap-2 px-6 py-3 bg-mia-red text-white rounded-full hover:bg-red-700 transition-colors">
              <Phone size={18} /> Sună Acum
            </a>
            <a href="mailto:ristorantemia@gmail.com" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors">
              <Mail size={18} /> Trimite Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
