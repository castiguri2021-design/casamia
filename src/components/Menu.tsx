import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { menuItems, categoryLabels, categoryOrder } from '../data/menu';
import type { MenuItem } from '../data/menu';
import { Search } from 'lucide-react';

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const filteredItems: MenuItem[] = menuItems.filter((item: MenuItem) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = !searchQuery ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const groupedItems = categoryOrder.reduce<Record<string, MenuItem[]>>((acc, cat) => {
    const catItems = filteredItems.filter((i: MenuItem) => i.category === cat);
    if (catItems.length > 0) acc[cat] = catItems;
    return acc;
  }, {});

  return (
    <section id="menu" className="py-24 bg-mia-dark relative">
      <div className="max-w-7xl mx-auto px-6" ref={ref}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-16">
          <p className="font-cinzel text-sm tracking-[4px] text-mia-gold uppercase mb-4">Meniu</p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Descoperă <span className="text-mia-red">Aromele Noastre</span>
          </h2>
          <p className="text-white/50 max-w-2xl mx-auto">Băuturi răcoritoare, cocktails artizanale, vinuri selecte și multe altele.</p>
        </motion.div>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
            <input type="text" placeholder="Caută în meniu..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full pl-12 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-mia-red/50" />
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button onClick={() => setActiveCategory('all')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === 'all' ? 'bg-mia-red text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
            Toate
          </button>
          {categoryOrder.map((cat: string) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-mia-red text-white' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
              {categoryLabels[cat].icon} {categoryLabels[cat].label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeCategory + searchQuery} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12">
            {Object.entries(groupedItems).map(([cat, items]: [string, MenuItem[]]) => (
              <div key={cat}>
                <h3 className="font-cinzel text-xl font-bold text-mia-gold mb-6 flex items-center gap-3">
                  <span className="w-8 h-0.5 bg-mia-gold" />
                  {categoryLabels[cat].icon} {categoryLabels[cat].label}
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {items.map((item: MenuItem, i: number) => (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}
                      className="group bg-white/5 hover:bg-white/10 border border-white/5 hover:border-mia-red/20 rounded-xl p-4 transition-all flex justify-between items-center">
                      <div>
                        <h4 className="font-serif font-bold text-white group-hover:text-mia-red transition-colors">{item.name}</h4>
                        {item.volume && <p className="text-white/40 text-xs">{item.volume}</p>}
                      </div>
                      <span className="font-cinzel font-bold text-mia-gold text-lg whitespace-nowrap">
                        {item.price > 0 ? `${item.price} Lei` : '—'}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(groupedItems).length === 0 && (
              <div className="text-center py-16 text-white/40"><p className="text-lg">Niciun preparat găsit.</p></div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
