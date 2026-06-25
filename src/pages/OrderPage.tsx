import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart, Phone, MapPin, User, MessageSquare } from 'lucide-react';
import { foodMenu } from '../data/foodMenu';
import { motion } from 'framer-motion';

export default function OrderPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState(foodMenu[0].id);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '', phone: '', address: '', notes: '', deliveryType: 'delivery' as 'delivery' | 'pickup'
  });

  const addToCart = (item: any, category: string) => {
    const uniqueId = `${category}-${item.name}`;
    setCart(prev => {
      const existing = prev.find(i => i.id === uniqueId);
      if (existing) return prev.map(i => i.id === uniqueId ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, id: uniqueId, quantity: 1, category }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const idx = prev.findIndex(i => i.id === id);
      if (idx === -1) return prev;
      const newQty = prev[idx].quantity + delta;
      if (newQty <= 0) return prev.filter(i => i.id !== id);
      return prev.map((item, i) => i === idx ? { ...item, quantity: newQty } : item);
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveryFee = customerInfo.deliveryType === 'delivery' && subtotal > 0 ? 15 : 0;
  const total = subtotal + deliveryFee;
  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);

  const sendToWhatsApp = () => {
    if (!customerInfo.name || !customerInfo.phone) { alert('Completează numele și telefonul!'); return; }
    let text = `🍕 COMANDĂ NOUĂ - Casa Mia\n\n ${customerInfo.name}\n📞 ${customerInfo.phone}\n`;
    text += customerInfo.deliveryType === 'delivery' ? `📍 ${customerInfo.address}\n🚗 Livrare\n` : '🏪 Ridicare\n';
    text += `\n📋 COMANDĂ:\n`;
    cart.forEach(i => text += `• ${i.name} x${i.quantity} = ${i.price * i.quantity} LEI\n`);
    text += `\n💰 Subtotal: ${subtotal} LEI\n`;
    if (deliveryFee > 0) text += ` Livrare: ${deliveryFee} LEI\n`;
    text += `💵 TOTAL: ${total} LEI\n`;
    if (customerInfo.notes) text += `\n📝 ${customerInfo.notes}`;
    window.open(`https://wa.me/40720718719?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 pb-32 md:pb-20">
      {/* Header Sticky */}
      <header className="bg-red-900 text-white px-4 py-3 sticky top-0 z-50 shadow-lg flex items-center justify-between border-b-4 border-red-950">
        <Link to="/" className="flex items-center gap-2 font-bold active:opacity-70">
          <ArrowLeft size={22} /> <span className="text-sm md:text-base">Înapoi</span>
        </Link>
        <h1 className="font-serif font-bold text-lg md:text-xl">Comandă Online</h1>
        <button onClick={() => setShowCheckout(!showCheckout)} className="relative active:opacity-70 p-1">
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-red-900">
              {totalItems}
            </span>
          )}
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-3 md:p-6 grid lg:grid-cols-3 gap-6 mt-4">
        
        {/* MENIU */}
        <div className="lg:col-span-2 space-y-4">
          {/* Categorii - scroll orizontal pe mobile */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide -mx-3 px-3 md:mx-0 md:px-0 md:gap-3 border-b border-stone-200 md:border-none">
            {foodMenu.map(cat => (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-bold text-xs md:text-sm transition-all border-2 flex-shrink-0 active:scale-95 ${
                  activeCat === cat.id 
                    ? 'bg-red-800 text-white border-red-800 shadow-md' 
                    : 'bg-white text-stone-600 border-stone-200 hover:border-red-300'
                }`}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Produse Grid Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
            {foodMenu.find(c => c.id === activeCat)?.items.map((item: any, i: number) => {
              const inCart = cart.find(c => c.id === `${activeCat}-${item.name}`);
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-stone-100 active:scale-[0.98] transition-transform flex flex-col md:flex-row">
                  
                  {/* IMAGINE - Full width pe mobile, fixă pe desktop */}
                  <div className="relative w-full md:w-32 h-48 md:h-auto flex-shrink-0 bg-stone-100">
                    <img src={`/images/food/${item.image}`} alt={item.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target as HTMLImageElement).src = '/images/loc1.jpg'} />
                  </div>
                    
                  {/* DETALII & BUTON */}
                  <div className="p-3 md:p-4 flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="font-serif font-bold text-sm md:text-lg text-stone-900 leading-tight mb-1">{item.name}</h3>
                      <p className="text-[11px] md:text-xs text-stone-500 line-clamp-2 mb-2 leading-snug">{item.ingredients}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100 md:border-none md:pt-0 md:mt-0">
                      <span className="text-red-800 font-black text-lg md:text-xl">{item.price} LEI</span>
                      
                      {inCart ? (
                        <div className="flex items-center gap-1 bg-stone-100 rounded-full p-0.5 border border-stone-200">
                          <button onClick={() => updateQuantity(inCart.id, -1)} 
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-red-800 active:bg-red-50 touch-manipulation">
                            <Minus size={16} strokeWidth={3} />
                          </button>
                          <span className="font-black text-sm w-6 text-center">{inCart.quantity}</span>
                          <button onClick={() => updateQuantity(inCart.id, 1)} 
                            className="w-8 h-8 flex items-center justify-center bg-red-800 rounded-full shadow-sm text-white active:bg-red-900 touch-manipulation">
                            <Plus size={16} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        /* BUTON ADAUGĂ - LAT PE MOBILE, COMPACT PE DESKTOP */
                        <button onClick={() => addToCart(item, activeCat)} 
                          className="w-full md:w-auto bg-red-800 text-white px-4 py-3 md:py-1.5 rounded-lg md:rounded-full text-sm md:text-xs font-bold active:bg-red-900 shadow-sm border border-red-950 whitespace-nowrap touch-manipulation mt-2 md:mt-0">
                          Adaugă în Coș
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* COS & CHECKOUT */}
        <div className={`lg:col-span-1 ${showCheckout ? 'fixed inset-0 z-[60] bg-black/50 flex items-end md:items-center justify-center' : 'hidden lg:block'}`}>
          <div className={`bg-white rounded-t-2xl md:rounded-2xl p-4 md:p-6 shadow-2xl border border-stone-200 w-full md:w-auto ${showCheckout ? 'max-h-[85vh] overflow-y-auto animate-slide-up' : 'sticky top-24'}`}>
            
            {showCheckout && (
              <div className="flex justify-between items-center mb-4 md:hidden">
                <h2 className="font-serif font-bold text-xl flex items-center gap-2"><ShoppingCart size={20} className="text-red-800"/> Coșul Tău</h2>
                <button onClick={() => setShowCheckout(false)} className="p-2 bg-stone-100 rounded-full"><ArrowLeft size={20}/></button>
              </div>
            )}

            {!showCheckout && (
              <h2 className="font-serif font-bold text-xl md:text-2xl mb-4 md:mb-6 flex items-center gap-3 text-stone-900 border-b border-stone-100 pb-3 md:pb-4">
                <ShoppingCart size={22} className="text-red-800" /> Coșul Tău
              </h2>
            )}
            
            {cart.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <ShoppingCart size={40} className="mx-auto text-stone-300 mb-3" />
                <p className="text-stone-500 font-medium text-sm">Coșul este gol</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-[30vh] md:max-h-[40vh] overflow-y-auto pr-1 mb-4 custom-scrollbar">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-stone-50 p-2.5 md:p-3 rounded-xl border border-stone-100">
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="font-bold text-stone-900 truncate text-xs md:text-sm">{item.name}</p>
                        <p className="text-stone-500 text-[10px] md:text-xs font-medium">{item.quantity} x {item.price} LEI</p>
                      </div>
                      <div className="flex items-center gap-0.5 md:gap-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 md:p-1.5 bg-white rounded-lg shadow-sm text-stone-600 active:text-red-800 border border-stone-200"><Minus size={12} /></button>
                        <span className="font-black text-xs md:text-sm w-4 md:w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 md:p-1.5 bg-white rounded-lg shadow-sm text-stone-600 active:text-green-700 border border-stone-200"><Plus size={12} /></button>
                        <button onClick={() => removeFromCart(item.id)} className="p-1 md:p-1.5 ml-0.5 md:ml-1 text-red-500 active:bg-red-50 rounded-lg"><Trash2 size={12} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-stone-100 pt-3 md:pt-4 space-y-2 md:space-y-3 text-xs md:text-sm font-medium">
                  <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>{subtotal} LEI</span></div>
                  
                  <div className="bg-stone-50 p-2.5 md:p-3 rounded-xl border border-stone-200 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="delivery" checked={customerInfo.deliveryType === 'delivery'} 
                        onChange={() => setCustomerInfo({...customerInfo, deliveryType: 'delivery'})} className="accent-red-800 w-4 h-4" />
                      <span className="text-stone-800 text-xs md:text-sm">Livrare (+15 LEI)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="delivery" checked={customerInfo.deliveryType === 'pickup'} 
                        onChange={() => setCustomerInfo({...customerInfo, deliveryType: 'pickup'})} className="accent-red-800 w-4 h-4" />
                      <span className="text-stone-800 text-xs md:text-sm">Ridicare Personală (Gratuit)</span>
                    </label>
                  </div>

                  <div className="flex justify-between font-black text-xl md:text-2xl text-red-900 pt-2 md:pt-3 border-t border-stone-200">
                    <span>TOTAL</span><span>{total} LEI</span>
                  </div>
                </div>

                <div className="mt-4 md:mt-6 space-y-2.5 md:space-y-3">
                  <div className="relative">
                    <User size={16} className="absolute left-3.5 top-3 text-stone-400" />
                    <input placeholder="Nume complet *" value={customerInfo.name} required
                      onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-900 font-medium focus:border-red-800 outline-none text-xs md:text-sm placeholder:text-stone-400" />
                  </div>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3.5 top-3 text-stone-400" />
                    <input placeholder="Telefon *" type="tel" value={customerInfo.phone} required
                      onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-900 font-medium focus:border-red-800 outline-none text-xs md:text-sm placeholder:text-stone-400" />
                  </div>
                  {customerInfo.deliveryType === 'delivery' && (
                    <div className="relative">
                      <MapPin size={16} className="absolute left-3.5 top-3 text-stone-400" />
                      <input placeholder="Adresa de livrare *" value={customerInfo.address} required
                        onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-900 font-medium focus:border-red-800 outline-none text-xs md:text-sm placeholder:text-stone-400" />
                    </div>
                  )}
                  <div className="relative">
                    <MessageSquare size={16} className="absolute left-3.5 top-3 text-stone-400" />
                    <textarea placeholder="Observații (opțional)" value={customerInfo.notes} 
                      onChange={e => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      className="w-full pl-10 pr-3 py-2.5 md:py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-900 font-medium focus:border-red-800 outline-none resize-none h-20 md:h-24 text-xs md:text-sm placeholder:text-stone-400" />
                  </div>
                  
                  <button onClick={sendToWhatsApp} 
                    className="w-full bg-green-600 active:bg-green-700 text-white font-black py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 md:gap-3 text-sm md:text-lg mt-2 active:scale-[0.98]">
                    <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    Trimite pe WhatsApp
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* BARA STICKY JOS PE MOBILE */}
      {totalItems > 0 && !showCheckout && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-stone-200 p-3 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.1)] safe-area-pb">
          <button onClick={() => setShowCheckout(true)} 
            className="w-full bg-red-800 text-white font-black py-3.5 rounded-xl flex items-center justify-between px-5 active:scale-[0.98]">
            <div className="flex items-center gap-3">
              <span className="bg-white/20 px-2.5 py-1 rounded-lg text-sm font-bold">{totalItems}</span>
              <span className="text-sm">Vezi Coșul</span>
            </div>
            <span className="text-lg">{total} LEI</span>
          </button>
        </div>
      )}
    </div>
  );
}
