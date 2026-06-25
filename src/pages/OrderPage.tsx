import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowLeft, User, MessageCircle } from 'lucide-react';
import { foodMenu } from '../data/foodMenu';

interface CartItem {
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCat, setActiveCat] = useState(foodMenu[0].id);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const addToCart = (item: { name: string; price: number; image?: string }) => {
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) {
        return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.name === name) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (name: string) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const generateWhatsAppLink = () => {
    if (cart.length === 0 || !customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('Te rugăm completează toate câmpurile obligatorii!');
      return;
    }

    const orderText = `COMANDĂ NOUĂ\n\nNume: ${customerInfo.name}\nTelefon: ${customerInfo.phone}\nAdresă: ${customerInfo.address}\n\nComandă:\n${cart.map(item => `• ${item.name} x${item.quantity} = ${item.price * item.quantity} LEI`).join('\n')}\n\nTotal: ${total} LEI\n\nObservații: ${customerInfo.notes || 'Fără observații'}`;
    
    const encodedText = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/40720718719?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="bg-stone-900 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:text-red-400 transition-colors">
            <ArrowLeft size={20} />
            <span className="hidden md:inline">Înapoi</span>
          </Link>
          <h1 className="font-serif text-xl md:text-2xl font-bold">Comandă Online</h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-red-800 hover:bg-red-900 p-2 rounded-full transition-colors"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-red-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Categories */}
      <div className="bg-white border-b border-stone-200 sticky top-16 md:top-[72px] z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {foodMenu.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeCat === cat.id
                    ? 'bg-red-800 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {foodMenu.find(c => c.id === activeCat)?.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="bg-white rounded-xl shadow-md overflow-hidden flex hover:shadow-lg transition-shadow"
            >
              <img
                src={`/images/food/${item.image}`}
                alt={item.name}
                className="w-24 h-24 md:w-32 md:h-32 object-cover flex-shrink-0"
                onError={(e) => { (e.target as HTMLImageElement).src = '/images/loc1.jpg'; }}
              />
              <div className="flex-1 p-3 md:p-4 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-base md:text-lg text-stone-800">{item.name}</h3>
                  {item.ingredients && (
                    <p className="text-stone-500 text-xs md:text-sm italic mt-1 line-clamp-2">{item.ingredients}</p>
                  )}
                  {item.weight && (
                    <p className="text-stone-400 text-xs mt-1">{item.weight}</p>
                  )}
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-red-800 font-bold text-lg">{item.price} LEI</span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-red-800 hover:bg-red-900 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                  >
                    <Plus size={16} />
                    Adaugă
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
                <h2 className="font-serif text-xl font-bold">Coșul Tău</h2>
                <button onClick={() => setShowCart(false)} className="hover:text-red-400">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                {cart.length === 0 ? (
                  <div className="text-center text-stone-500 py-12">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                    <p>Coșul tău este gol</p>
                    <p className="text-sm mt-2">Adaugă produse din meniu</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {cart.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-stone-50 p-3 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-red-800 font-bold text-sm">{item.price * item.quantity} LEI</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.name, -1)}
                              className="bg-stone-200 hover:bg-stone-300 p-1 rounded"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.name, 1)}
                              className="bg-stone-200 hover:bg-stone-300 p-1 rounded"
                            >
                              <Plus size={16} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.name)}
                              className="text-red-600 hover:text-red-800 ml-2"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <h3 className="font-bold mb-3 flex items-center gap-2">
                        <User size={18} />
                        Date de Contact
                      </h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          placeholder="Nume complet *"
                          value={customerInfo.name}
                          onChange={e => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                        />
                        <input
                          type="tel"
                          placeholder="Telefon *"
                          value={customerInfo.phone}
                          onChange={e => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                        />
                        <textarea
                          placeholder="Adresă de livrare *"
                          value={customerInfo.address}
                          onChange={e => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 resize-none"
                        />
                        <textarea
                          placeholder="Observații (opțional)"
                          value={customerInfo.notes}
                          onChange={e => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 resize-none"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4 bg-stone-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl font-bold text-red-800">{total} LEI</span>
                  </div>
                  <button
                    onClick={generateWhatsAppLink}
                    className="w-full bg-[#25D366] hover:bg-[#20BA5E] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle size={20} />
                    Trimite Comanda pe WhatsApp
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
