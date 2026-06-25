import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

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

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 md:py-20 px-4 md:px-8 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-red-500 tracking-[0.3em] uppercase text-xs md:text-sm mb-3 font-bold">Recenzii</p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-800 mb-4">
            Ce Spun Clienții Noștri
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="fill-amber-500 text-amber-500" />
              ))}
            </div>
            <span className="text-2xl font-bold text-stone-800">5.0</span>
            <span className="text-stone-600">din 5 pe baza a 12 recenzii</span>
          </div>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Descoperiți de ce clienții noștri ne apreciază și ne recomandă cu încredere
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-stone-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-800 to-red-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-800">{review.name}</h4>
                    <p className="text-xs text-stone-500">{review.date}</p>
                  </div>
                </div>
                <Quote size={24} className="text-red-800 opacity-20" />
              </div>
              
              <div className="flex mb-3">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-amber-500 text-amber-500" />
                ))}
              </div>
              
              <p className="text-stone-600 text-sm leading-relaxed">{review.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/reviews"
            className="inline-flex items-center gap-2 px-8 py-3 bg-red-800 hover:bg-red-900 text-white rounded-full font-medium transition-all shadow-lg"
          >
            Vezi Toate Recenziile
          </a>
        </div>
      </div>
    </section>
  );
}
