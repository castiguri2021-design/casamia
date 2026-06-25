import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart, Phone, MapPin, User, MessageSquare } from 'lucide-react';
import { foodMenu } from '../data/foodMenu';

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
    let text = `🍕 COMANDĂ NOUĂ - Casa Mia\n\n👤 ${customerInfo.name}\n📞 ${customerInfo.phone}\n`;
    text += customerInfo.deliveryType === 'delivery' ? `📍 ${customerInfo.address}\n🚗 Livrare\n` : '🏪 Ridicare\n';
    text += `\n📋 COMANDĂ:\n`;
    cart.forEach(i => text += `• ${i.name} x${i.quantity} = ${i.price * i.quantity} LEI\n`);
    text += `\n💰 Subtotal: ${subtotal} LEI\n`;
    if (deliveryFee > 0) text += `🚚 Livrare: ${deliveryFee} LEI\n`;
    text += `💵 TOTAL: ${total} LEI\n`;
    if (customerInfo.notes) text += `\n📝 ${customerInfo.notes}`;
    window.open(`https://wa.me/40720718719?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 pb-24 md:pb-20">
      {/* Header */}
      <header className="bg-red-900 text-white p-4 sticky top-0 z-50 shadow-lg flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold">
          <ArrowLeft size={24} /> <span>Înapoi</span>
        </Link>
        <h1 className="font-serif font-bold text-xl">Comandă Online</h1>
        <div className="relative">
          <ShoppingCart size={26} />
          {totalItems > 0 && (
            <span className="absolute -top-3 -right-3 bg-amber-500 text-black text-xs font-black rounded-full w-6 h-6 flex items-center justify-center border-2 border-red-900">
              {totalItems}
            </span>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-6 mt-4">
        {/* Meniu */}
        <div className="md:col-span-2 space-y-6">
          {/* Categorii */}
          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {foodMenu.map(cat => (
              <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-bold text-sm transition-all border-2 flex-shrink-0 ${
                  activeCat === cat.id
                    ? 'bg-red-800 text-white border-red-800'
                    : 'bg-white text-stone-600 border-stone-200'
                }`}>
                {cat.name}
              </button>
            ))}
          </div>

          {/* Produse */}
          <div className="space-y-3">
            {foodMenu.find(c => c.id === activeCat)?.items.map((item: any, i: number) => {
              const inCart = cart.find(c => c.id === `${activeCat}-${item.name}`);
              return (
                <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 flex gap-4">
                  <img src={`/images/food/${item.image}`} alt={item.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg bg-stone-100 flex-shrink-0 border border-stone-200"
                    onError={(e) => (e.target as HTMLImageElement).src = '/images/loc1.jpg'} />
                  <div className="flex-1 min-w-0 flex flex-col">
                    <h3 className="font-bold text-stone-900 text-sm md:text-base leading-tight mb-1">{item.name}</h3>
                    <p className="text-[11px] md:text-xs text-stone-500 line-clamp-2 mb-auto">{item.ingredients}</p>
                    
                    {/* PREȚ + BUTON PE RÂNDURI SEPARATE */}
                    <div className="mt-2 space-y-2">
                      <span className="text-red-800 font-black text-lg md:text-xl block">{item.price} LEI</span>
                      
                      {inCart ? (
                        <div className="flex items-center gap-2 bg-stone-100 rounded-full px-2 py-1 border border-stone-200 w-fit">
                          <button onClick={() => updateQuantity(inCart.id, -1)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-red-800 touch-manipulation">
                            <Minus size={16} strokeWidth={3} />
                          </button>
                          <span className="font-black text-sm w-5 text-center">{inCart.quantity}</span>
                          <button onClick={() => updateQuantity(inCart.id, 1)} className="w-8 h-8 flex items-center justify-center bg-red-800 rounded-full shadow-sm text-white touch-manipulation">
                            <Plus size={16} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item, activeCat)}
                          className="bg-red-800 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md border border-red-950 touch-manipulation active:bg-red-900 w-fit">
                          Adaugă în Coș
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coș & Checkout */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl p-5 shadow-md border border-stone-200 sticky top-24">
            <h2 className="font-serif font-bold text-xl mb-4 flex items-center gap-2 text-stone-900 border-b border-stone-100 pb-3">
              <ShoppingCart size={22} className="text-red-800" /> Coșul Tău
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-10">
                <ShoppingCart size={48} className="mx-auto text-stone-300 mb-4" />
                <p className="text-stone-500 font-medium">Coșul este gol</p>
                <p className="text-stone-400 text-sm mt-1">Adaugă preparate din meniu</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-stone-50 p-3 rounded-xl border border-stone-100">
                      <div className="flex-1 min-w-0 mr-3">
                        <p className="font-bold text-stone-900 truncate text-sm">{item.name}</p>
                        <p className="text-stone-500 text-xs font-medium">{item.quantity} x {item.price} LEI</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 bg-white rounded-lg shadow-sm text-stone-600 border border-stone-200"><Minus size={14} /></button>
                        <span className="font-black text-sm w-5 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 bg-white rounded-lg shadow-sm text-stone-600 border border-stone-200"><Plus size={14} /></button>
                        <button onClick={() => removeFromCart(item.id)} className="p-1.5 ml-1 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-stone-100 pt-4 space-y-3 text-sm font-medium">
                  <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>{subtotal} LEI</span></div>
                  <div className="bg-stone-50 p-3 rounded-xl border border-stone-200 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="delivery" checked={customerInfo.deliveryType === 'delivery'}
                        onChange={() => setCustomerInfo({...customerInfo, deliveryType: 'delivery'})} className="accent-red-800 w-4 h-4" />
                      <span className="text-stone-800">Livrare (+15 LEI)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="delivery" checked={customerInfo.deliveryType === 'pickup'}
                        onChange={() => setCustomerInfo({...customerInfo, deliveryType: 'pickup'})} className="accent-red-800 w-4 h-4" />
                      <span className="text-stone-800">Ridicare Personală (Gratuit)</span>
                    </label>
                  </div>
                  <div className="flex justify-between font-black text-2xl text-red-900 pt-3 border-t border-stone-200">
                    <span>TOTAL</span><span>{total} LEI</span>
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-3.5 text-stone-400" />
                    <input placeholder="Nume complet *" value={customerInfo.name} required
                      onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-900 font-medium focus:border-red-800 outline-none" />
                  </div>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-3.5 text-stone-400" />
                    <input placeholder="Telefon *" type="tel" value={customerInfo.phone} required
                      onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-900 font-medium focus:border-red-800 outline-none" />
                  </div>
                  {customerInfo.deliveryType === 'delivery' && (
                    <div className="relative">
                      <MapPin size={18} className="absolute left-4 top-3.5 text-stone-400" />
                      <input placeholder="Adresa de livrare *" value={customerInfo.address} required
                        onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-900 font-medium focus:border-red-800 outline-none" />
                    </div>
                  )}
                  <div className="relative">
                    <MessageSquare size={18} className="absolute left-4 top-3.5 text-stone-400" />
                    <textarea placeholder="Observații (opțional)" value={customerInfo.notes}
                      onChange={e => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-stone-50 border-2 border-stone-200 rounded-xl text-stone-900 font-medium focus:border-red-800 outline-none resize-none h-24" />
                  </div>
                  <button onClick={sendToWhatsApp}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 text-lg mt-2">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
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
