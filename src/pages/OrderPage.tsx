import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart, Phone, MapPin, User, MessageSquare, Bike, Store } from 'lucide-react';
import { foodMenu } from '../data/foodMenu';
import { motion, AnimatePresence } from 'framer-motion';

export default function OrderPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState(foodMenu[0].id);
  const [customerInfo, setCustomerInfo] = useState({
    name: '', phone: '', address: '', notes: '', deliveryType: 'delivery' as 'delivery' | 'pickup'
  });

  const addToCart = (item: any, category: string) => {
    const uniqueId = `${category}-${item.name}`;
    setCart(prev => {
      const existing = prev.find(i => i.id === uniqueId);
      if (existing) {
        return prev.map(i => i.id === uniqueId ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, id: uniqueId, quantity: 1, category }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const itemIndex = prev.findIndex(i => i.id === id);
      if (itemIndex === -1) return prev;
      const newQty = prev[itemIndex].quantity + delta;
      if (newQty <= 0) return prev.filter(i => i.id !== id);
      return prev.map((item, idx) => idx === itemIndex ? { ...item, quantity: newQty } : item);
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = customerInfo.deliveryType === 'delivery' && subtotal > 0 ? 15 : 0;
  const total = subtotal + deliveryFee;

  const sendToWhatsApp = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Te rog completează numele și telefonul!');
      return;
    }
    let text = ` COMANDĂ NOUĂ - Casa Mia\n\n`;
    text += `👤 Client: ${customerInfo.name}\n`;
    text += `📞 Telefon: ${customerInfo.phone}\n`;
    text += customerInfo.deliveryType === 'delivery' 
      ? `📍 Adresă: ${customerInfo.address}\n🚗 Livrare\n` 
      : '🏪 Ridicare personală\n';
    text += `\n COMANDĂ:\n`;
    cart.forEach(item => {
      text += `• ${item.name} x${item.quantity} = ${item.price * item.quantity} LEI\n`;
    });
    text += `\n💰 Subtotal: ${subtotal} LEI\n`;
    if (deliveryFee > 0) text += `🚚 Livrare: ${deliveryFee} LEI\n`;
    text += `💵 TOTAL: ${total} LEI\n`;
    if (customerInfo.notes) text += `\n📝 Observații: ${customerInfo.notes}`;
    
    window.open(`https://wa.me/40720718719?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 pb-20">
      {/* Header */}
      <header className="bg-red-900 text-white p-4 sticky top-0 z-50 shadow-lg flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:text-red-200">
          <ArrowLeft size={24} /> <span>Înapoi</span>
        </Link>
        <h1 className="font-serif font-bold text-xl">Comandă Online</h1>
        <div className="relative">
          <ShoppingCart size={24} />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.reduce((s, i) => s + i.quantity, 0)}
            </span>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-6 mt-6">
        {/* Meniu */}
        <div className="md:col-span-2 space-y-6">
          {/* Categorii */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {foodMenu.map(cat => (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${activeCat === cat.id ? 'bg-red-800 text-white' : 'bg-white text-stone-600 border border-stone-200'}`}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Produse */}
          <div className="grid sm:grid-cols-2 gap-4">
            {foodMenu.find(c => c.id === activeCat)?.items.map((item: any, i: number) => {
              const inCart = cart.find(c => c.id === `${activeCat}-${item.name}`);
              return (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="bg-white rounded-xl p-4 shadow-sm border border-stone-100 flex gap-4">
                  <img src={`/images/food/${item.image}`} alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg bg-stone-100 flex-shrink-0"
                    onError={(e) => (e.target as HTMLImageElement).src = '/images/loc1.jpg'} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-stone-800">{item.name}</h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mb-2">{item.ingredients}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-red-800 font-bold">{item.price} LEI</span>
                      {inCart ? (
                        <div className="flex items-center gap-2 bg-stone-100 rounded-full px-2 py-1">
                          <button onClick={() => updateQuantity(inCart.id, -1)} className="p-1 hover:bg-stone-200 rounded-full"><Minus size={14} /></button>
                          <span className="font-bold text-sm w-4 text-center">{inCart.quantity}</span>
                          <button onClick={() => updateQuantity(inCart.id, 1)} className="p-1 hover:bg-stone-200 rounded-full"><Plus size={14} /></button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item, activeCat)} 
                          className="bg-red-800 text-white px-3 py-1 rounded-full text-sm font-bold hover:bg-red-900">Adaugă</button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Coș & Checkout */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-md border border-stone-100 sticky top-24">
            <h2 className="font-serif font-bold text-xl mb-4 flex items-center gap-2">
              <ShoppingCart size={20} /> Coșul Tău
            </h2>
            
            {cart.length === 0 ? (
              <p className="text-stone-400 text-center py-8">Coșul este gol</p>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name}</p>
                      <p className="text-stone-500 text-xs">{item.quantity} x {item.price} LEI</p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-stone-100 rounded"><Minus size={14} /></button>
                      <span className="font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-stone-100 rounded"><Plus size={14} /></button>
                      <button onClick={() => removeFromCart(item.id)} className="p-1 text-red-500 hover:bg-red-50 rounded ml-1"><Trash2 size={14} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {cart.length > 0 && (
              <>
                <div className="border-t pt-3 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>{subtotal} LEI</span></div>
                  <div className="flex justify-between items-center">
                    <span>Livrare</span>
                    <select value={customerInfo.deliveryType} onChange={e => setCustomerInfo({...customerInfo, deliveryType: e.target.value as any})}
                      className="bg-stone-50 border rounded px-2 py-1 text-xs">
                      <option value="delivery">Livrare (+15 LEI)</option>
                      <option value="pickup">Ridicare (Gratuit)</option>
                    </select>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-red-800 pt-2 border-t">
                    <span>TOTAL</span><span>{total} LEI</span>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div className="relative"><User size={16} className="absolute left-3 top-3 text-stone-400" />
                    <input placeholder="Nume complet" value={customerInfo.name} onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-800 outline-none" /></div>
                  <div className="relative"><Phone size={16} className="absolute left-3 top-3 text-stone-400" />
                    <input placeholder="Telefon" value={customerInfo.phone} onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-800 outline-none" /></div>
                  {customerInfo.deliveryType === 'delivery' && (
                    <div className="relative"><MapPin size={16} className="absolute left-3 top-3 text-stone-400" />
                      <input placeholder="Adresa de livrare" value={customerInfo.address} onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-800 outline-none" /></div>
                  )}
                  <div className="relative"><MessageSquare size={16} className="absolute left-3 top-3 text-stone-400" />
                    <textarea placeholder="Observații (opțional)" value={customerInfo.notes} onChange={e => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      className="w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-800 outline-none resize-none h-20" /></div>
                  
                  <button onClick={sendToWhatsApp} 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    Trimite pe WhatsApp
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
