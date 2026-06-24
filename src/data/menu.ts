export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  category: 'racoritoare' | 'limonada' | 'apa' | 'milkshake' | 'fresh' | 'cafea' | 'cocktails' | 'vin' | 'bere' | 'tarie';
  volume?: string;
}

export const menuItems: MenuItem[] = [
  // RĂCORITOARE
  { id: 'r1', name: 'Cola', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r2', name: 'Cola Zero', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r3', name: 'Sprite', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r4', name: 'Fanta', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r5', name: 'Cappy Portocale', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r6', name: 'Cappy Vișine', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r7', name: 'Cappy Pere', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r8', name: 'Schweppes Mandarine', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r9', name: 'Schweppes Bitter Lemon', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r10', name: 'Schweppes Tonic', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r11', name: 'Fuze Tea Piersică', price: 12, category: 'racoritoare', volume: '250ml' },
  { id: 'r12', name: 'Fuze Tea Lămâie', price: 12, category: 'racoritoare', volume: '250ml' },

  // LIMONADE
  { id: 'l1', name: 'Limonadă Clasică', price: 18, category: 'limonada', volume: '250ml' },
  { id: 'l2', name: 'Limonadă Fructe de pădure', price: 22, category: 'limonada', volume: '250ml' },
  { id: 'l3', name: 'Limonadă Mentă', price: 20, category: 'limonada', volume: '250ml' },
  { id: 'l4', name: 'Limonadă Ghimbir', price: 22, category: 'limonada', volume: '250ml' },
  { id: 'l5', name: 'Limonadă Mango', price: 18, category: 'limonada', volume: '350ml' },
  { id: 'l6', name: 'Limonadă Pepene galben', price: 18, category: 'limonada', volume: '350ml' },

  // APĂ
  { id: 'a1', name: 'Apă plată', price: 11, category: 'apa', volume: '330ml' },
  { id: 'a2', name: 'Apă minerală', price: 11, category: 'apa', volume: '330ml' },
  { id: 'a3', name: 'Apă plată', price: 17, category: 'apa', volume: '750ml' },
  { id: 'a4', name: 'Apă minerală', price: 17, category: 'apa', volume: '750ml' },

  // MILKSHAKES
  { id: 'm1', name: 'Milkshake Căpșuni', price: 30, category: 'milkshake', volume: '350ml' },
  { id: 'm2', name: 'Milkshake Banane', price: 30, category: 'milkshake', volume: '350ml' },
  { id: 'm3', name: 'Milkshake Fructe de pădure', price: 30, category: 'milkshake', volume: '350ml' },
  { id: 'm4', name: 'Milkshake Vanilie', price: 30, category: 'milkshake', volume: '350ml' },

  // FRESH
  { id: 'f1', name: 'Fresh Portocale', price: 28, category: 'fresh', volume: '350ml' },
  { id: 'f2', name: 'Fresh Grep', price: 28, category: 'fresh', volume: '350ml' },
  { id: 'f3', name: 'Fresh Mix', price: 28, category: 'fresh', volume: '350ml' },

  // CAFEA
  { id: 'c1', name: 'Espresso scurt', price: 11, category: 'cafea' },
  { id: 'c2', name: 'Espresso lung', price: 11, category: 'cafea' },
  { id: 'c3', name: 'Espresso cu lapte', price: 14, category: 'cafea' },
  { id: 'c4', name: 'Cappuccino', price: 17, category: 'cafea' },
  { id: 'c5', name: 'Latte Macchiato', price: 17, category: 'cafea' },
  { id: 'c6', name: 'Ciocolată caldă', price: 13, category: 'cafea' },
  { id: 'c7', name: 'Frappe', price: 15, category: 'cafea' },
  { id: 'c8', name: 'Ceai', price: 13, category: 'cafea' },

  // COCKTAILS
  { id: 'ck1', name: 'Aperol Spritz', price: 35, category: 'cocktails' },
  { id: 'ck2', name: 'Cuba Libre', price: 35, category: 'cocktails' },
  { id: 'ck3', name: 'Mojito', price: 35, category: 'cocktails' },
  { id: 'ck4', name: 'Campari Orange', price: 35, category: 'cocktails' },
  { id: 'ck5', name: 'Green Apple', price: 35, category: 'cocktails' },
  { id: 'ck6', name: 'Gin Tonic', price: 35, category: 'cocktails' },
  { id: 'ck7', name: 'Amaretto Sour', price: 35, category: 'cocktails' },
  { id: 'ck8', name: 'Moscow Mule', price: 35, category: 'cocktails' },

  // VIN
  { id: 'v1', name: 'Vin la pahar', price: 20, category: 'vin' },
  { id: 'v2', name: 'Jidvei', price: 56, category: 'vin' },
  { id: 'v3', name: 'Prosecco italian', price: 92, category: 'vin' },
  { id: 'v4', name: 'Prosecco roze', price: 123, category: 'vin' },
  { id: 'v5', name: 'Purcari', price: 102, category: 'vin' },
  { id: 'v6', name: 'Purcari Rară Neagră Roze', price: 102, category: 'vin' },
  { id: 'v7', name: 'Purcari Ton Blanc', price: 163, category: 'vin' },
  { id: 'v8', name: 'Solo Quinta Alb', price: 0, category: 'vin' },

  // BERE
  { id: 'b1', name: 'Bere fresh lămâie', price: 13, category: 'bere' },
  { id: 'b2', name: 'Bere fresh zmeură', price: 13, category: 'bere' },
  { id: 'b3', name: 'Corona Extra', price: 21, category: 'bere', volume: '330ml' },
  { id: 'b4', name: 'Corona Extra 0%', price: 21, category: 'bere', volume: '330ml' },
  { id: 'b5', name: 'Stella Artois', price: 16, category: 'bere', volume: '330ml' },
  { id: 'b6', name: 'Stella Artois 0.0%', price: 16, category: 'bere', volume: '330ml' },
  { id: 'b7', name: 'Stella Artois', price: 16, category: 'bere', volume: '400ml' },
  { id: 'b8', name: 'Bere Draft', price: 15, category: 'bere' },
  { id: 'b9', name: 'Staropramen', price: 13, category: 'bere' },
  { id: 'b10', name: 'Hoegaarden', price: 21, category: 'bere', volume: '400ml' },

  // TĂRIE
  { id: 't1', name: 'Bumbu', price: 30, category: 'tarie' },
  { id: 't2', name: 'Captain Morgan', price: 17, category: 'tarie' },
  { id: 't3', name: 'Chivas', price: 25, category: 'tarie' },
  { id: 't4', name: 'Coniac Brâncoveanu', price: 30, category: 'tarie' },
  { id: 't5', name: 'Tequila Don Julio Reposado', price: 40, category: 'tarie' },
  { id: 't6', name: 'Malfy', price: 25, category: 'tarie' },
  { id: 't7', name: "Jack Daniel's", price: 20, category: 'tarie' },
  { id: 't8', name: 'Jagermeister', price: 15, category: 'tarie' },
  { id: 't9', name: 'Vodka Finlandia', price: 15, category: 'tarie' },
];

export const categoryLabels: Record<string, { label: string; icon: string }> = {
  racoritoare: { label: 'Răcoritoare', icon: '🥤' },
  limonada: { label: 'Limonadă', icon: '🍋' },
  apa: { label: 'Apă', icon: '💧' },
  milkshake: { label: 'Milkshakes', icon: '🥤' },
  fresh: { label: 'Fresh', icon: '🍊' },
  cafea: { label: 'Cafea & Ceai', icon: '☕' },
  cocktails: { label: 'Cocktails', icon: '🍸' },
  vin: { label: 'Vin', icon: '🍷' },
  bere: { label: 'Bere', icon: '🍺' },
  tarie: { label: 'Tărie', icon: '🥃' },
};

export const categoryOrder = ['racoritoare', 'limonada', 'apa', 'milkshake', 'fresh', 'cafea', 'cocktails', 'vin', 'bere', 'tarie'];

export function getMenuByCategory(category: string): MenuItem[] {
  return menuItems.filter(item => item.category === category);
}

export function searchMenu(query: string): MenuItem[] {
  const q = query.toLowerCase();
  return menuItems.filter(item => 
    item.name.toLowerCase().includes(q) || 
    item.category.toLowerCase().includes(q)
  );
}

export function getPriceRange(): { min: number; max: number } {
  const prices = menuItems.filter(i => i.price > 0).map(i => i.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
