export interface FoodItem {
  name: string;
  ingredients?: string;
  image?: string;
  weight?: string;
  price: number;
}

export interface FoodCategory {
  id: string;
  name: string;
  items: FoodItem[];
}

export const foodMenu: FoodCategory[] = [
  {
    id: "supe",
    name: "Supe & Ciorbe",
    items: [
      { name: "Supă cremă de legume", image: "supa-crema-de-legume.jpg", ingredients: "ceapă, țelină, morcov, păstârnac, smântână vegetală", weight: "350g", price: 20 },
      { name: "Supă cremă de ciuperci", image: "supa-crema-de-ciuperci.jpg", ingredients: "ciuperci, ceapă, țelină, smântână vegetală, pastă de trufe", weight: "350g", price: 20 },
      { name: "Ciorba de burtă", image: "ciorba-de-burta.jpg", ingredients: "burtă de vită, oase de vită, morcov, țelină, ceapă, smântână, gălbenuș, oțet, pătrunjel", weight: "400g", price: 35 },
      { name: "Ciorba de fasole", image: "ciorba-de-fasole.jpg", ingredients: "fasole albă, morcov, ceapă, ardei gras, țelină, borș, leuștean, pătrunjel", weight: "400g", price: 28 },
      { name: "Ciorbă de văcuță", image: "ciorba-de-vacuta.jpg", ingredients: "pulpă de vită, ceapă, morcov, ardei gras, țelină, fasole verde, borș, pătrunjel", weight: "400g", price: 28 },
      { name: "Ciorbă de pui", image: "ciorba-de-pui.jpg", ingredients: "piept de pui, ceapă, țelină, morcov, ardei gras, fasole verde, pătrunjel, borș", weight: "400g", price: 27 },
      { name: "Ciorbă de perișoare", image: "ciorba-de-perisoare.jpg", ingredients: "carne tocată de porc, borș, fasole verde, ardei gras, țelină, ceapă, pătrunjel, morcov", weight: "400g", price: 28 },
      { name: "Ciorbă de legume", image: "ciorba-de-legume.jpg", ingredients: "țelină, ceapă, morcov, ardei gras, borș, pătrunjel, fasole verde", weight: "400g", price: 20 },
    ]
  },
  {
    id: "salate",
    name: "Salate",
    items: [
      { name: "Salată grecească", image: "salata-greceasca.jpg", ingredients: "roșii, castraveți, ceapă, măsline, brânză feta, ulei de măsline, oregano", weight: "400g", price: 40 },
      { name: "Salată Caesar", image: "salata-caesar.jpg", ingredients: "piept de pui, salată verde, roșii, ardei gras, castraveți, parmesan, dressing de muștar", weight: "400g", price: 40 },
      { name: "Salată Halloumi", image: "salata-halloumi.jpg", ingredients: "rucola, roșii cherry, aceto balsamic", weight: "250g", price: 30 },
      { name: "Salată cu mușchi de vită", image: "salata-cu-muschi-de-vita.jpg", ingredients: "mușchi de vită, salată verde, roșii cherry, castraveți, ceapă roșie, ardei gras, măsline, brânză feta, ulei de măsline, pătrunjel", weight: "400g", price: 60 },
    ]
  },
  {
    id: "paste",
    name: "Paste",
    items: [
      { name: "Spaghetti Aglio Olio e Peperoncino", image: "spaghetti-aglio-olio-e-peperoncino.jpg", ingredients: "spaghetti, usturoi, ulei de măsline extravirgin, peperoncino, pătrunjel proaspăt, sare de mare", weight: "400g", price: 30 },
      { name: "Penne Carbonara", image: "penne-carbonara.jpg", ingredients: "penne, pancetta, parmesan, smântână vegetală", weight: "300g", price: 38 },
      { name: "Penne Quattro Formaggi", image: "penne-quattro-formaggi.jpg", ingredients: "penne, smântână vegetală, mozzarella, gorgonzola, parmesan, brie", weight: "300g", price: 42 },
      { name: "Penne Bolognese", image: "penne-bolognese.jpg", ingredients: "penne, sos de roșii, carne tocată de vită, ceapă, morcov, țelină, usturoi, vin alb, parmesan", weight: "300g", price: 42 },
      { name: "Penne Primavera", image: "penne-primavera.jpg", ingredients: "penne, sos de roșii, dovlecel, morcov, sos de usturoi, busuioc, parmesan", weight: "300g", price: 32 },
      { name: "Penne Fructe de Mare", image: "penne-fructe-de-mare.jpg", ingredients: "penne, sos de roșii, cocktail de fructe de mare, usturoi, busuioc, parmesan", weight: "300g", price: 42 },
      { name: "Penne Pomodoro Basilico", image: "penne-pomodoro-basilico.jpg", ingredients: "orez, unt, parmesan, ciuperci, trufe", weight: "350g", price: 27 }, // Notă: ingrediente preluate exact din fișierul sursă
    ]
  },
  {
    id: "risotto",
    name: "Risotto",
    items: [
      { name: "Risotto Tartufo Funghi", image: "risotto-tartufo-funghi.jpg", ingredients: "orez Arborio, ciuperci porcini, șampanie, ceapă, vin alb, parmezan, unt, ulei de trufe, pătrunjel", weight: "400g", price: 35 },
      { name: "Risotto cu Ciuperci și Trufe", image: "risotto-cu-ciuperci-si-trufe.jpg", ingredients: "orez Carnaroli, mix de ciuperci proaspete, ceapă, usturoi, vin alb, smântână, parmezan, ulei de trufe, pătrunjel", weight: "400g", price: 33 },
    ]
  },
  {
    id: "pui",
    name: "Preparate din Pui",
    items: [
      { name: "Piept de pui la grătar", image: "piept-de-pui-la-gratar.jpg", ingredients: "piept de pui dezosat, ulei de măsline, usturoi, rozmarin, cimbru, lămâie, sare, piper", weight: "200g", price: 32 },
      { name: "Curry cu pui și orez", image: "curry-cu-pui-si-orez.jpg", ingredients: "piept de pui, pastă curry, ardei gras, ceapă, morcov, smântână vegetală, usturoi, pătrunjel, orez", weight: "500g", price: 45 },
      { name: "Escalop cu ciuperci și piure", image: "escalop-cu-ciuperci-si-piure.jpg", ingredients: "piept de pui, ciuperci, sos brun, unt, piure de cartofi", weight: "450g", price: 42 },
      { name: "Tigaie picantă", image: "tigaie-picanta.jpg", ingredients: "piept de pui, morcov, ceapă, ardei gras, ciuperci, cârnați", weight: "350g", price: 43 },
      { name: "Ficăței de pui lionezi", image: "ficatei-de-pui-lionezi.jpg", ingredients: "ficat de pui, pancetta, ceapă, usturoi, sos brun, piure", weight: "500g", price: 40 },
      { name: "Pui cu smântână și ciuperci", image: "pui-cu-smantana-si-ciuperci.jpg", ingredients: "piept de pui, ciuperci, smântână vegetală, lămâie, parmesan, cheddar", weight: "300g", price: 40 },
      { name: "Șnițel Parmigiano", image: "snitel-parmigiano.jpg", ingredients: "piept de pui, sos brun, pesmet, roșie, parmesan, cheddar", weight: "300g", price: 48 },
      { name: "Șnițel Parizian", image: "snitel-parizian.jpg", ingredients: "mușchi de pui, ou, pesmet, făină, sare, piper, ulei pentru prăjit", weight: "300g", price: 40 },
      { name: "Quesadilla cu cartofi prăjiți", image: "quesadilla-cu-cartofi-prajiti.jpg", ingredients: "tortilla, piept de pui, ceapă, ardei gras, cream cheese", weight: "450g", price: 43 },
      { name: "Strips de pui cu cartofi prăjiți", image: "strips-de-pui-cu-cartofi-prajiti.jpg", ingredients: "piept de pui, ou, pesmet", weight: "400g", price: 42 },
    ]
  },
  {
    id: "porc",
    name: "Preparate din Porc",
    items: [
      { name: "Wok de porc cu orez", image: "wok-de-porc-cu-orez.jpg", ingredients: "ceafă de porc, ceapă, morcovi, ardei gras, țelină, ciuperci, sos teriyaki, usturoi, pătrunjel, orez", weight: "450g", price: 46 },
      { name: "Cotlet Tomahawk", image: "cotlet-tomahawk.jpg", ingredients: "cotlet de porc", weight: "400g", price: 50 },
      { name: "Coaste de porc", image: "coaste-de-porc.jpg", ingredients: "sos barbecue", price: 90 },
      { name: "Mici cu cartofi prăjiți", image: "mici-cu-cartofi-prajiti.jpg", ingredients: "3 mici, muștar, cartofi prăjiți", price: 40 },
      { name: "Cârnați de grătar", image: "carnati-de-gratar.jpg", ingredients: "3 cârnați", price: 25 },
      { name: "Tigaie picantă/nepicantă mixtă", image: "tigaie-picantasinepicanta-mixta.jpg", ingredients: "mușchi de porc, piept de pui, ceapă, ardei gras, usturoi, roșii, condimente, ulei, pătrunjel", weight: "400g", price: 44 },
      { name: "Mușchi de grill", image: "muschi-de-grill.jpg", ingredients: "mușchi de porc, condimente grill, usturoi, rozmarin, ulei de măsline, piper, sare", weight: "300g", price: 110 },
    ]
  },
  {
    id: "vita-miel",
    name: "Vită & Miel",
    items: [
      { name: "Antricot de vită", image: "antricot-de-vita.jpg", ingredients: "antricot de vită, sare, piper, ulei de măsline, usturoi, rozmarin, unt", weight: "300g", price: 100 },
      { name: "Cotletuțe de miel cu piure", image: "cotletute-de-miel-cu-piure.jpg", ingredients: "cotlet de miel Noua Zeelandă, piure de cartofi", weight: "400g", price: 95 },
      { name: "Mușchi de vită", image: "muschi-de-vita.jpg", ingredients: "mușchi de vită, ulei de măsline, sare, piper, usturoi, cimbru, unt", weight: "250g", price: 120 },
      { name: "Mușchiuleț de vită cu sos de piper verde și piure", image: "muschiulet-de-vita-cu-sos-de-piper-verde-si-piure.jpg", ingredients: "mușchi de vită, piper verde, coniac, sos brun, unt", weight: "400g", price: 155 },
    ]
  },
  {
    id: "peste",
    name: "Pește & Fructe de Mare",
    items: [
      { name: "File de somon cu sos de lămâie și orez", image: "file-de-somon-cu-sos-de-lamaie-si-orez.jpg", ingredients: "file de somon, unt, lămâie, smântână vegetală, piper alb, condimente pentru pește, orez, vin alb", weight: "400g", price: 68 },
      { name: "File de doradă grill", image: "file-de-dorada-grill.jpg", ingredients: "", weight: "200g", price: 52 },
      { name: "Saramură de doradă", image: "saramura-de-dorada.jpg", ingredients: "file de doradă, ceapă, morcov, țelină, roșii cherry, ardei gras, unt, vin alb, usturoi, pătrunjel", weight: "450g", price: 62 },
      { name: "Caracatiță cu piure și trufe", image: "caracatita-cu-piure-si-trufe.jpg", ingredients: "tentacule de caracatiță, oregano, ulei de măsline, piure de cartofi, trufe", weight: "350g", price: 125 },
      { name: "Caracatiță Casa Mia", image: "caracatita-casa-mia.jpg", ingredients: "caracatiță, roșii, usturoi, ceapă, vin alb, ulei de măsline, ardei iute, pătrunjel, lămâie", weight: "300g", price: 150 },
      { name: "Creveți în sos de vin", image: "creveti-in-sos-de-vin.jpg", ingredients: "creveți, vin alb, usturoi, unt, lămâie, pătrunjel, ardei iute, sare, piper", weight: "300g", price: 50 },
      { name: "Stridii (3 bucăți)", image: "stridii-(3-bucati).jpg", ingredients: "sos de oțet și ceapă roșie, servite pe pat de gheață", price: 70 },
    ]
  },
  {
    id: "platouri",
    name: "Platouri",
    items: [
      { name: "Platou Rece Italienesc", image: "platou-rece-italienesc.jpg", ingredients: "brânză Roquefort, Camembert, Brie, Burrata, sos pesto, prosciutto crudo, salam, cârnați sticks, rucola", weight: "600g (4 pers)", price: 150 },
      { name: "Platou Cald", image: "platou-cald.jpg", ingredients: "ceafă, mititei, piept de pui, cârnați, cartofi, murături", weight: "900g (4 pers)", price: 200 },
    ]
  },
  {
    id: "burgeri",
    name: "Burgeri",
    items: [
      { name: "Burger Clasic", image: "burger-clasic.jpg", ingredients: "chiflă brioche, salată verde, ceapă, roșie, castravete murat, carne de vită Angus home-made, cartofi prăjiți", weight: "400g", price: 50 },
      { name: "Cheese Burger", image: "cheese-burger.jpg", ingredients: "chiflă brioche, salată verde, ceapă, roșie, castravete murat, carne de vită Angus home-made, cheddar", weight: "400g", price: 55 },
      { name: "Lava Cheddar Burger", image: "lava-cheddar-burger.jpg", ingredients: "chiflă brioche, salată verde, ceapă, roșie, castravete murat, carne de vită Angus home-made, brânză cheddar, sos cheddar, cartofi prăjiți", weight: "430g", price: 62 },
      { name: "Burger Mia", image: "burger-mia.jpg", ingredients: "chiflă brioche, salată verde, ceapă, roșie, castravete murat, carne de vită Angus home-made, brânză Roquefort, cartofi prăjiți", weight: "420g", price: 62 },
      { name: "Mia Mini Burger", image: "mia-mini-burger.jpg", ingredients: "chiflă brioche, salată verde, ceapă, roșie, castravete murat, carne de vită Angus home-made, brânză Roquefort, cartofi prăjiți", weight: "320g", price: 31 },
    ]
  },
  {
    id: "pizza",
    name: "Pizza",
    items: [
      { name: "Pizza Margherita", image: "pizza-margherita.jpg", ingredients: "sos roșii, mozzarella, busuioc proaspăt, ulei măsline", weight: "350g", price: 35 },
      { name: "Pizza Tonno", image: "pizza-tonno.jpg", ingredients: "sos roșii, mozzarella, ceapă roșie, porumb, ton, măsline", weight: "500g", price: 45 },
      { name: "Pizza Quattro Stagioni", image: "pizza-quattro-stagioni.jpg", ingredients: "sos roșii, mozzarella, pancetta, prosciutto cotto, ciuperci, măsline", weight: "500g", price: 40 },
      { name: "Pizza Capricioasă", image: "pizza-capricioasa.jpg", ingredients: "sos roșii, mozzarella, prosciutto cotto, ciuperci", weight: "500g", price: 40 },
      { name: "Pizza Quattro Formaggi", image: "pizza-quattro-formaggi.jpg", ingredients: "mozzarella, cremă brânză, parmezan, gorgonzola, scalie", weight: "500g", price: 40 },
      { name: "Pizza Diavola", image: "pizza-diavola.jpg", ingredients: "sos roșii, mozzarella fior di latte, chorizo, salam ventricina picant", weight: "500g", price: 40 },
      { name: "Pizza Prosciutto & Gorgonzola", image: "pizza-prosciutto-si-gorgonzola.jpg", ingredients: "mozzarella, gorgonzola, bufala, roșii uscate, prosciutto crudo, rucola, parmezan", weight: "500g", price: 45 },
      { name: "Pizza Vegetariană", image: "pizza-vegetariana.jpg", ingredients: "ardei capia, ceapă roșie, măsline, ciuperci, ardei gras, vinete, dovlecel, sos roșu", price: 40 },
      { name: "Pizza Creveți", image: "pizza-creveti.jpg", ingredients: "sos roșii, mozzarella, creveți, somon, pesto, pătrunjel, salată verde", weight: "500g", price: 49 },
      { name: "Pizza Țărănească", image: "pizza-taraneasca.jpg", ingredients: "sos roșii, mozzarella, pancetta, prosciutto cotto, ciuperci, măsline", weight: "500g", price: 49 },
      { name: "Pizza Calzone", image: "pizza-calzone.jpg", ingredients: "mozzarella, cremă brânză, parmezan, gorgonzola, scalie", weight: "500g", price: 45 },
      { name: "Focaccia Simplă", image: "focaccia-simpla.jpg", ingredients: "ulei măsline, busuioc", weight: "300g", price: 15 },
      { name: "Focaccia cu Usturoi și Parmezan", image: "focaccia-cu-usturoi-si-parmezan.jpg", ingredients: "ulei măsline, usturoi, parmezan", weight: "300g", price: 20 },
    ]
  },
  {
    id: "desert",
    name: "Desert",
    items: [
      { name: "Papanași", image: "papanasi.jpg", ingredients: "smântână, dulceață de afine", weight: "150g", price: 30 },
      { name: "Cheesecake", image: "cheesecake.jpg", ingredients: "brânză Philadelphia, mascarpone, ou, unt, scorțișoară, biscuiți digestivi", weight: "150g", price: 36 },
      { name: "Lava Cake", image: "lava-cake.jpg", ingredients: "făină, ou, ciocolată, înghețată", weight: "150g", price: 38 },
      { name: "Profiterol", image: "profiterol.jpg", ingredients: "făină, ou, unt, cremă de vanilie, frișcă, ciocolată", weight: "150g", price: 30 },
    ]
  },
  {
    id: "garnituri",
    name: "Garnituri",
    items: [
      { name: "Cartofi prăjiți", image: "cartofi-prajiti.jpg", weight: "150g", price: 15 },
      { name: "Piure cu trufe", image: "piure-cu-trufe.jpg", weight: "180g", price: 27 },
      { name: "Piure de cartofi", image: "piure-de-cartofi.jpg", weight: "150g", price: 20 },
      { name: "Legume grill", image: "legume-grill.jpg", ingredients: "ceapă, usturoi, oțet balsamic, roșie, dovlecel, vinete, ardei gras", weight: "150g", price: 25 },
      { name: "Orez la abur", image: "orez-la-abur.jpg", weight: "150g", price: 15 },
    ]
  },
  {
    id: "salate-insotitoare",
    name: "Salate Însoțitoare",
    items: [
      { name: "Salată de varză", image: "salata-de-varza.jpg", weight: "150g", price: 15 },
      { name: "Salată de roșii și castraveți", image: "salata-de-rosii-si-castraveti.jpg", weight: "150g", price: 20 },
      { name: "Salată asortată", image: "salata-asortata.jpg", ingredients: "roșii, castraveți, ceapă, ardei gras", weight: "150g", price: 25 },
    ]
  }
];
