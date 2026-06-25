import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Quote, ArrowLeft, MapPin, Phone, Clock } from 'lucide-react';

const reviews = [
  {
    name: "Alexandra M.",
    rating: 5,
    text: "Am fost pentru prima dată săptămâna trecută și am rămas impresionată! Pizza Margherita este absolut delicioasă, cu blat subțire și ingrediente proaspete. Atmosfera este foarte primitoare, iar personalul extrem de amabil. Cu siguranță voi reveni!",
    date: "2 săptămâni în urmă"
  },
  {
    name: "Bogdan P.",
    rating: 5,
    text: "Cel mai bun restaurant italian din Tunari! Am comandat penne carbonara și a fost excelentă. Porțiile sunt generoase, iar prețurile foarte corecte pentru calitatea oferită. Recomand cu căldură!",
    date: "1 lună în urmă"
  },
  {
    name: "Andreea S.",
    rating: 5,
    text: "Am sărbătorit aniversarea soțului aici și a fost o experiență deosebită. Mâncarea a fost impecabilă, iar atmosfera romantică perfectă. Personalul a fost foarte atent și ne-a făcut să ne simțim speciali.",
    date: "3 săptămâni în urmă"
  },
  {
    name: "Mihai T.",
    rating: 5,
    text: "Am comandat delivery și am fost plăcut surprins. Mâncarea a ajuns caldă și ambalată foarte bine. Pizza quattro formaggi este senzațională! Cu siguranță voi mai comanda.",
    date: "1 săptămână în urmă"
  },
  {
    name: "Elena D.",
    rating: 5,
    text: "Locație superbă, mâncare excelentă și servicii de top! Am încercat risotto cu trufe și a fost divin. Desertul (tiramisu) a fost perfect pentru a încheia masa. 10/10!",
    date: "2 luni în urmă"
  },
  {
    name: "George V.",
    rating: 5,
    text: "Am fost cu familia duminică și toți am fost încântați. Copiii au adorat pizza, iar noi am apreciat calitatea preparatelor. Personalul a fost foarte răbdător cu cei mici. Recomand familiilor!",
    date: "3 zile în urmă"
  },
  {
    name: "Cristina L.",
    rating: 5,
    text: "Restaurantul meu preferat pentru întâlniri de afaceri. Atmosfera este elegantă dar nu pretențioasă, mâncarea este de calitate superioară, iar serviciile impecabile. Mereu impresionant!",
    date: "1 lună în urmă"
  },
  {
    name: "Radu N.",
    rating: 5,
    text: "Am descoperit acest restaurant recent și sunt cucerit complet. Ciorba de burtă este cea mai bună pe care am mâncat-o vreodată, iar friptura de vită este gătită perfect. Bravo!",
    date: "2 săptămâni în urmă"
  },
  {
    name: "Diana F.",
    rating: 5,
    text: "Am comandat pentru o petrecere privată și totul a fost perfect. Mâncarea a fost delicioasă, porțiile generoase, iar livrarea la timp. Toți invitații au fost încântați. Mulțumim!",
    date: "1 lună în urmă"
  },
  {
    name: "Adrian C.",
    rating: 5,
    text: "Locație minunată cu o terasă superbă vara. Mâncarea este autentică italiană, nu fake ca în alte locuri. Pastele sunt făcute în casă și se simte. Prețurile sunt foarte bune pentru calitate.",
    date: "2 luni în urmă"
  },
  {
    name: "Simona R.",
    rating: 5,
    text: "Am fost de mai multe ori și niciodată nu am fost dezamăgită. Burger-ul Mia este fenomenal, iar cartofii prăjiți sunt cei mai buni din zonă. Personalul mereu zâmbitor și atent.",
    date: "1 săptămână în urmă"
  },
  {
    name: "Vlad M.",
    rating: 5,
    text: "Restaurant de nota 10! Am comandat platou rece italienesc pentru o întâlnire de afaceri și a fost impresionant. Calitatea ingredientelor se vede și se gustă. Serviciile sunt rapide și profesioniste.",
    date: "3 săptămâni în urmă"
  }
];

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-stone-900 text-white py-6 shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 hover:text-red-400 transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Înapoi la pagina principală</span>
          </Link>
          <h1 className="text-3xl md:text-4xl font-serif font-bold">
            Recenzii <span className="text-red-600">Casa Mia</span> Tunari
          </h1>
          <p className="text-stone-300 mt-2">Restaurant Italian Autentic în Tunari, Ilfov</p>
        </div>
      </header>

      {/* Info Box - SEO */}
      <div className="bg-white border-b border-stone-200 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <MapPin size={32} className="text-red-800 mb-2" />
              <h3 className="font-bold text-stone-800 mb-1">Locație</h3>
              <p className="text-stone-600 text-sm">Strada San Marco 1-5<br/>Tunari, Ilfov (lângă Otopeni)</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone size={32} className="text-red-800 mb-2" />
              <h3 className="font-bold text-stone-800 mb-1">Telefon</h3>
              <a href="tel:+40720718719" className="text-red-800 hover:underline">+40 720 718 719</a>
            </div>
            <div className="flex flex-col items-center">
              <Clock size={32} className="text-red-800 mb-2" />
              <h3 className="font-bold text-stone-800 mb-1">Program</h3>
              <p className="text-stone-600 text-sm">L-J: 12:00-23:00<br/>V-S: 12:00-00:00<br/>D: 13:00-22:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={32} className="fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-4xl font-bold text-stone-800 ml-4">5.0</span>
          </div>
          <p className="text-xl text-stone-600 mb-2">Excelent</p>
          <p className="text-stone-500">Bazat pe 12 recenzii de la clienții noștri</p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-stone-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-gradient-to-br from-red-800 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800 text-lg">{review.name}</h4>
                    <p className="text-sm text-stone-500">{review.date}</p>
                  </div>
                </div>
                <Quote size={28} className="text-red-800 opacity-20" />
              </div>
              
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={18} className="fill-amber-500 text-amber-500" />
                ))}
              </div>
              
              <p className="text-stone-700 leading-relaxed">{review.text}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 bg-gradient-to-r from-red-800 to-red-900 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-serif font-bold mb-4">Vizitează-ne la Casa Mia Tunari</h3>
          <p className="mb-6 text-stone-200">Strada San Marco 1-5, Tunari, Ilfov</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+40720718719"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-red-800 rounded-full font-bold hover:bg-stone-100 transition-colors"
            >
              <Phone size={20} />
              Sună Acum
            </a>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white text-white rounded-full font-bold hover:bg-white hover:text-red-800 transition-colors"
            >
              Vezi Meniul
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
