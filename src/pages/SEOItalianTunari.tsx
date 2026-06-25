import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, Clock, Star, Utensils, Pizza, Wine } from 'lucide-react';

export default function SEOItalianTunari() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-gray-900 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 hover:text-amber-400 transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Înapoi la pagina principală</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold">
            Restaurant Italian Autentic în <span className="text-amber-500">Tunari</span>
          </h1>
          <p className="text-stone-300 mt-2">Casa Mia - Experiență Culinară Premium lângă Otopeni</p>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-red-900 to-red-800 text-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold mb-4">De ce Casa Mia este Cel Mai Bun Restaurant Italian din Tunari?</h2>
            <p className="text-stone-200 mb-6 leading-relaxed">
              Situat pe Strada San Marco 1-5, în inima comunității Tunari, Ilfov, Ristorante Casa Mia aduce autenticitatea bucătăriei italiene chiar lângă aeroportul Otopeni. Fiecare preparat este o poveste despre ingrediente proaspete, rețete tradiționale și pasiune pentru excelență culinară.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:+40720718719" className="inline-flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-700 rounded-full font-bold transition-colors">
                <Phone size={20} />
                Sună Acum
              </a>
              <Link to="/meniu" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white hover:bg-white hover:text-red-900 rounded-full font-bold transition-colors">
                <Utensils size={20} />
                Vezi Meniul
              </Link>
            </div>
          </div>
          <div className="relative">
            <img src="/images/loc1.jpg" alt="Interior Restaurant Italian Tunari" className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">Specialitățile Noastre Italiene în Tunari</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <Pizza size={48} className="text-red-800 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Pizza cu Blat Subțire</h3>
            <p className="text-gray-600">Preparată în cuptorul nostru special, cu aluat fermentat 48 de ore și ingrediente importate direct din Italia. Margherita, Quattro Formaggi, Diavola și multe alte variante autentice.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <Utensils size={48} className="text-red-800 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Paste Făcute în Casă</h3>
            <p className="text-gray-600">Penne Carbonara, Bolognese, Quattro Formaggi și Primavera - toate preparate zilnic cu paste proaspete făcute manual în bucătăria noastră din Tunari.</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
            <Wine size={48} className="text-red-800 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Risotto & Vinuri Selecte</h3>
            <p className="text-gray-600">Risotto Tartufo Funghi cu trufe negre și o selecție premium de vinuri italiene care completează perfect experiența culinară la Casa Mia.</p>
          </motion.div>
        </div>
      </section>

      {/* Location Benefits */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-center text-gray-900 mb-12">Locația Ideală în Tunari, Ilfov</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-red-800 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-gray-900">Adresă Preciză</h4>
                  <p className="text-gray-600">Strada San Marco 1-5, Tunari, Ilfov, 077180. Ușor de găsit, cu parcare gratuită pentru clienți.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-red-800 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-gray-900">Program Extins</h4>
                  <p className="text-gray-600">Deschis Luni-Joi 12:00-23:00, Vineri-Sâmbătă 12:00-00:00, Duminică 13:00-22:00. Perfect pentru cine de afaceri sau întâlniri romantice.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Star className="text-red-800 flex-shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-gray-900">Recenzii Excelente</h4>
                  <p className="text-gray-600">5.0 stele pe baza a 12+ recenzii verificate. Clienții noștri apreciază calitatea excepțională și atmosfera primitoare.</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.1234567890123!2d26.123456789012345!3d44.567890123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1f1234567890a%3A0x1234567890abcdef!2sStrada%20San%20Marco%201-5%2C%20077180%20Tunari!5e0!3m2!1sen!2sro!4v1234567890123!5m2!1sen!2sro"
                width="100%"
                height="300"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-red-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-6">Rezervă Masa Ta la Cel Mai Bun Restaurant Italian din Tunari</h2>
          <p className="text-xl text-stone-200 mb-8">Experiență autentică italiană chiar lângă tine, în Tunari, Ilfov</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+40720718719" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 rounded-full font-bold text-lg transition-colors">
              <Phone size={24} />
              +40 720 718 719
            </a>
            <Link to="/meniu" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-red-900 hover:bg-stone-100 rounded-full font-bold text-lg transition-colors">
              Comandă Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
