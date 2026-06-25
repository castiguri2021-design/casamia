import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart, Phone, MapPin, User, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { foodMenu } from '../data/foodMenu';

export default function OrderPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [activeCat, setActiveCat] = useState(foodMenu[0].id);
  const [customerInfo, setCustomerInfo] = useState({
    name: '', phone: '', address: '', notes: '', deliveryType: 'delivery' as 'delivery' | 'pickup'
  });
  const catScrollRef = useRef<HTMLDivElement>(null);

  const scrollCats = (dir: 'left' | 'right') => {
    if (catScrollRef.current) {
      const amount = dir === 'left' ? -200 : 200;
      catScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

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
    <div className="min-h-screen bg-white text-stone-900 pb-20">
      {/* Header */}
      <header className="bg-red-900 text-white p-3 sticky top-0 z-50 shadow-lg flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 font-bold text-sm">
          <ArrowLeft size={20} /> Înapoi
        </Link>
        <h1 className="font-serif font-bold text-base md:text-xl">Comandă Online</h1>
        <div className="relative">
          <ShoppingCart size={22} />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-black text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center border-2 border-red-900">
              {totalItems}
            </span>
          )}
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-3 md:p-6 grid md:grid-cols-3 gap-4 mt-2">
        {/* Meniu */}
        <div className="md:col-span-2 space-y-4">
          
          {/* CATEGORII CU SLIDE STÂNGA-DREAPTA */}
          <div className="relative">
            {/* Buton slide stânga (doar mobile) */}
            <button onClick={() => scrollCats('left')} 
              className="absolute left-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-r from-white to-transparent flex items-center justify-center md:hidden">
              <ChevronLeft size={20} className="text-red-800" />
            </button>
            
            {/* Container scrollabil */}
            <div ref={catScrollRef} 
              className="flex overflow-x-auto gap-2 pb-2 px-8 md:px-0 scrollbar-hide"
              style={{ WebkitOverflowScrolling: 'touch', scrollBehavior: 'smooth' }}>
              {foodMenu.map(cat => (
                <button key={cat.id} onClick={() => setActiveCat(cat.id)}
                  className={`px-3 py-1.5 rounded-full whitespace-nowrap font-bold text-xs transition-all border flex-shrink-0 active:scale-95 ${
                    activeCat === cat.id
                      ? 'bg-red-800 text-white border-red-800'
                      : 'bg-white text-stone-600 border-stone-300'
                  }`}>
                  {cat.name}
                </button>
              ))}
            </div>
            
            {/* Buton slide dreapta (doar mobile) */}
            <button onClick={() => scrollCats('right')} 
              className="absolute right-0 top-0 bottom-0 z-10 w-8 bg-gradient-to-l from-white to-transparent flex items-center justify-center md:hidden">
              <ChevronRight size={20} className="text-red-800" />
            </button>
          </div>

          {/* Produse */}
          <div className="space-y-2">
            {foodMenu.find(c => c.id === activeCat)?.items.map((item: any, i: number) => {
              const inCart = cart.find(c => c.id === `${activeCat}-${item.name}`);
              return (
                <div key={i} className="bg-white rounded-lg p-3 shadow-sm border border-stone-200 flex gap-3">
                  <img src={`/images/food/${item.image}`} alt={item.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-md bg-stone-100 flex-shrink-0 border border-stone-200"
                    onError={(e) => (e.target as HTMLImageElement).src = '/images/loc1.jpg'} />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-stone-900 text-sm leading-tight mb-0.5">{item.name}</h3>
                      <p className="text-[10px] text-stone-500 line-clamp-2">{item.ingredients}</p>
                    </div>
                    <div className="mt-1">
                      <span className="text-red-800 font-black text-base block mb-1">{item.price} LEI</span>
                      {inCart ? (
                        <div className="flex items-center gap-1 bg-stone-100 rounded-full px-1 py-0.5 border border-stone-200 w-fit">
                          <button onClick={() => updateQuantity(inCart.id, -1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-full shadow-sm text-red-800">
                            <Minus size={14} strokeWidth={3} />
                          </button>
                          <span className="font-black text-xs w-4 text-center">{inCart.quantity}</span>
                          <button onClick={() => updateQuantity(inCart.id, 1)} className="w-7 h-7 flex items-center justify-center bg-red-800 rounded-full shadow-sm text-white">
                            <Plus size={14} strokeWidth={3} />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item, activeCat)}
                          className="bg-red-800 text-white px-3 py-1.5 rounded-md text-xs font-bold shadow-sm border border-red-950 active:bg-red-900 w-fit">
                          Adaugă
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
          <div className="bg-white rounded-lg p-4 shadow-md border border-stone-200 md:sticky md:top-24">
            <h2 className="font-serif font-bold text-lg mb-3 flex items-center gap-2 text-stone-900 border-b border-stone-100 pb-2">
              <ShoppingCart size={18} className="text-red-800" /> Coșul Tău
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart size={36} className="mx-auto text-stone-300 mb-3" />
                <p className="text-stone-500 text-sm font-medium">Coșul este gol</p>
              </div>
            ) : (
              <>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1 mb-3">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center bg-stone-50 p-2 rounded-lg border border-stone-100">
                      <div className="flex-1 min-w-0 mr-2">
                        <p className="font-bold text-stone-900 truncate text-xs">{item.name}</p>
                        <p className="text-stone-500 text-[10px]">{item.quantity} x {item.price} LEI</p>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 bg-white rounded shadow-sm text-stone-600 border border-stone-200"><Minus size={10} /></button>
                        <span className="font-black text-xs w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 bg-white rounded shadow-sm text-stone-600 border border-stone-200"><Plus size={10} /></button>
                        <button onClick={() => removeFromCart(item.id)} className="p-1 ml-0.5 text-red-500"><Trash2 size={10} /></button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-stone-100 pt-2 space-y-2 text-xs font-medium">
                  <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>{subtotal} LEI</span></div>
                  <div className="bg-stone-50 p-2 rounded-lg border border-stone-200 space-y-1.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="delivery" checked={customerInfo.deliveryType === 'delivery'}
                        onChange={() => setCustomerInfo({...customerInfo, deliveryType: 'delivery'})} className="accent-red-800 w-3 h-3" />
                      <span className="text-stone-800 text-xs">Livrare (+15 LEI)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="delivery" checked={customerInfo.deliveryType === 'pickup'}
                        onChange={() => setCustomerInfo({...customerInfo, deliveryType: 'pickup'})} className="accent-red-800 w-3 h-3" />
                      <span className="text-stone-800 text-xs">Ridicare (Gratuit)</span>
                    </label>
                  </div>
                  <div className="flex justify-between font-black text-lg text-red-900 pt-2 border-t border-stone-200">
                    <span>TOTAL</span><span>{total} LEI</span>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <div className="relative">
                    <User size={14} className="absolute left-3 top-2.5 text-stone-400" />
                    <input placeholder="Nume *" value={customerInfo.name} required
                      onChange={e => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:border-red-800 outline-none" />
                  </div>
                  <div className="relative">
                    <Phone size={14} className="absolute left-3 top-2.5 text-stone-400" />
                    <input placeholder="Telefon *" type="tel" value={customerInfo.phone} required
                      onChange={e => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:border-red-800 outline-none" />
                  </div>
                  {customerInfo.deliveryType === 'delivery' && (
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-2.5 text-stone-400" />
                      <input placeholder="Adresa *" value={customerInfo.address} required
                        onChange={e => setCustomerInfo({...customerInfo, address: e.target.value})}
                        className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:border-red-800 outline-none" />
                    </div>
                  )}
                  <div className="relative">
                    <MessageSquare size={14} className="absolute left-3 top-2.5 text-stone-400" />
                    <textarea placeholder="Observații" value={customerInfo.notes}
                      onChange={e => setCustomerInfo({...customerInfo, notes: e.target.value})}
                      className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-xs font-medium focus:border-red-800 outline-none resize-none h-16" />
                  </div>
                  
                  {/* BUTON WHATSAPP COMPACT ȘI ALINIAT */}
                  <button onClick={sendToWhatsApp}
                    className="w-full bg-green-600 active:bg-green-700 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm mt-1">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                    <span>Trimite pe WhatsApp</span>
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
