import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Pizza, Flame, Wheat } from 'lucide-react';

export default function SEOPizzaTunari() {
  const pizzas = [
    { name: "Margherita", desc: "Sos de roșii San Marzano, mozzarella di bufala, busuioc proaspăt", price: "35 LEI" },
    { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, parmezan, ricotta - un simfonie de brânzeturi", price: "45 LEI" },
    { name: "Diavola", desc: "Sos picant, salam calabrese, ardei iute, mozzarella - pentru cei curajoși", price: "42 LEI" },
    { name: "Prosciutto e Gorgonzola", desc: "Șuncă de Parma, gorgonzola dulce, rucola, parmezan ras", price: "48 LEI" },
    { name: "Vegetariana", desc: "Ciuperci, ardei gras, dovlecei, vinete, ceapă roșie, mozzarella", price: "40 LEI" },
    { name: "Creveti", desc: "Creveti proaspeți, sos de usturoi, pătrunjel, mozzarella, lămâie", price: "52 LEI" }
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-gray-900 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Înapoi</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold">
            Cea Mai Bună <span className="text-amber-500">Pizza din Tunari</span>
          </h1>
          <p className="text-stone-300 mt-2">Casa Mia - Pizza Autentică Italiană cu Blat Subțire</p>
        </div>
      </header>

      <section className="py-12 bg-gradient-to-r from-red-900 to-orange-800 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-serif font-bold mb-6">Pizza Artizanală în Tunari, Ilfov</h2>
          <p className="text-xl text-stone-200 max-w-3xl mx-auto mb-8">
            La Casa Mia, pizza nu este doar mâncare - este artă. Aluatul nostru este fermentat 48 de ore, iar ingredientele sunt importate direct din Italia. Descoperă gustul autentic al Naplesului chiar în Tunari.
          </p>
          <a href="tel:+40720718719" className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 rounded-full font-bold text-lg transition-colors">
            <Phone size={24} />
            Comandă Pizza Acum
          </a>
        </div>
      </section>

      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">Meniul Nostru de Pizza în Tunari</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map((pizza, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="h-48 bg-gray-200 relative">
                <img 
                  src={`/images/food/pizza-${pizza.name.toLowerCase().replace(/ /g, '-')}.jpg`} 
                  alt={`Pizza ${pizza.name} Tunari`}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/images/loc1.jpg'; }}
                />
                <div className="absolute top-4 right-4 bg-red-800 text-white px-3 py-1 rounded-full font-bold">
                  {pizza.price}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{pizza.name}</h3>
                <p className="text-gray-600 text-sm">{pizza.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">De Ce Pizza Noastră Este Specială?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Flame size={48} className="text-red-800 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cuptor cu Lemne</h3>
              <p className="text-gray-600">Pizza este coaptă la 450°C în cuptorul nostru tradițional cu lemne, exact ca în Napoli.</p>
            </div>
            <div className="text-center">
              <Wheat size={48} className="text-red-800 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aluat Fermentat 48h</h3>
              <p className="text-gray-600">Aluatul nostru este lăsat să se odihnească 48 de ore pentru o textură ușoară și aerată.</p>
            </div>
            <div className="text-center">
              <Pizza size={48} className="text-red-800 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Ingrediente Importate</h3>
              <p className="text-gray-600">Mozzarella di Bufala, sos San Marzano, ulei de măsline extra virgin - toate din Italia.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-red-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-6">Comandă Cea Mai Bună Pizza din Tunari</h2>
          <p className="text-xl text-stone-200 mb-8">Livrare rapidă în Tunari, Otopeni și împrejurimi</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+40720718719" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 rounded-full font-bold text-lg transition-colors">
              <Phone size={24} />
              +40 720 718 719
            </a>
            <Link to="/meniu" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-900 hover:bg-stone-100 rounded-full font-bold text-lg transition-colors">
              Vezi Meniul Complet
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
