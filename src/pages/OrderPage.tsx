import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, X, Plus, Minus, Trash2, ArrowLeft, 
  Check, MessageCircle, User, MapPin, Phone, FileText,
  Clock, CreditCard, Percent
} from 'lucide-react';
import { foodMenu } from '../data/foodMenu';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category: string;
}

interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  notes: string;
  deliveryType: 'delivery' | 'pickup';
}

export default function OrderPage() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [activeCat, setActiveCat] = useState(foodMenu[0].id);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    notes: '',
    deliveryType: 'delivery'
  });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: { id: string; name: string; price: number; image?: string }, category: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1, category }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = customerInfo.deliveryType === 'delivery' ? 15 : 0;
  const total = subtotal + deliveryFee - discount;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getItems = () => {
    return foodMenu.find(c => c.id === activeCat)?.items || [];
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'CASA10') {
      setDiscount(subtotal * 0.1);
      alert('Cod promoțional aplicat: 10% reducere!');
    } else if (promoCode.toUpperCase() === 'WELCOME5') {
      setDiscount(5);
      alert('Cod promoțional aplicat: 5 LEI reducere!');
    } else {
      alert('Cod promoțional invalid!');
    }
  };

  const generateWhatsAppLink = () => {
    if (cart.length === 0) {
      alert('Coșul este gol!');
      return;
    }
    if (!customerInfo.name || !customerInfo.phone) {
      alert('Completează numele și telefonul!');
      return;
    }
    if (customerInfo.deliveryType === 'delivery' && !customerInfo.address) {
      alert('Completează adresa de livrare!');
      return;
    }

    const orderText = `🍕 COMANDĂ NOUĂ - Casa Mia\n\n` +
      `👤 Client: ${customerInfo.name}\n` +
      `📞 Telefon: ${customerInfo.phone}\n` +
      `${customerInfo.deliveryType === 'delivery' ? `📍 Adresă: ${customerInfo.address}\n🚗 Livrare\n` : '🏪 Ridicare personală\n'}\n` +
      `📋 COMANDĂ:\n${cart.map(item => 
        `• ${item.name} x${item.quantity} = ${item.price * item.quantity} LEI`
      ).join('\n')}\n\n` +
      `💰 Subtotal: ${subtotal} LEI\n` +
      `${deliveryFee > 0 ? `🚚 Livrare: ${deliveryFee} LEI\n` : ''}` +
      `${discount > 0 ? `🎁 Reducere: -${discount} LEI\n` : ''}` +
      `💵 TOTAL: ${total} LEI\n\n` +
      `${customerInfo.notes ? `📝 Observații: ${customerInfo.notes}` : ''}`;
    
    const encodedText = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/40720718719?text=${encodedText}`;
    
    window.open(whatsappUrl, '_blank');
    clearCart();
    setShowCheckout(false);
    setShowCart(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Business Dark */}
      <header className="bg-gray-900 text-white sticky top-0 z-40 shadow-xl">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:text-amber-400 transition-colors">
            <ArrowLeft size={20} />
            <span className="hidden md:inline font-medium">Înapoi</span>
          </Link>
          <h1 className="font-serif text-xl md:text-2xl font-bold tracking-wide">Comandă Online</h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-amber-600 hover:bg-amber-700 text-white p-3 rounded-full transition-all shadow-lg"
          >
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>
      </header>

      {/* Categories - Clean White */}
      <div className="bg-white border-b-2 border-gray-200 sticky top-16 md:top-[72px] z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {foodMenu.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-all ${
                  activeCat === cat.id
                    ? 'bg-gray-900 text-amber-400 shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items - Card Style */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getItems().map((item, i) => {
            const cartItem = cart.find(c => c.name === item.name);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className="bg-white rounded-xl shadow-md overflow-hidden flex hover:shadow-xl transition-all border border-gray-200"
              >
                <img
                  src={`/images/food/${item.image}`}
                  alt={item.name}
                  className="w-28 h-28 md:w-36 md:h-36 object-cover flex-shrink-0"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/images/loc1.jpg'; }}
                />
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg md:text-xl text-gray-900">{item.name}</h3>
                    {item.ingredients && (
                      <p className="text-gray-600 text-sm italic mt-1 line-clamp-2">{item.ingredients}</p>
                    )}
                    {item.weight && (
                      <p className="text-gray-500 text-xs mt-1">{item.weight}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-amber-600 font-bold text-xl">{item.price} LEI</span>
                    {cartItem ? (
                      <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                        <button
                          onClick={() => updateQuantity(cartItem.id, -1)}
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors shadow-sm"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold text-lg w-8 text-center text-gray-900">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(cartItem.id, 1)}
                          className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors shadow-sm"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart({ id: item.name, name: item.name, price: item.price, image: item.image }, activeCat)}
                        className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-md"
                      >
                        <Plus size={16} />
                        Adaugă
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Cart Sidebar - Professional */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-white z-50 shadow-2xl flex flex-col"
            >
              <div className="bg-gray-900 text-white p-5 flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold">Coșul Tău</h2>
                <button onClick={() => setShowCart(false)} className="hover:text-amber-400 transition-colors">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {cart.length === 0 ? (
                  <div className="text-center text-gray-500 py-12">
                    <ShoppingCart size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg font-medium">Coșul tău este gol</p>
                    <p className="text-sm mt-2">Adaugă produse din meniu</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3 mb-6">
                      {cart.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                          <img
                            src={`/images/food/${item.image}`}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg flex-shrink-0 border-2 border-gray-200"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/images/loc1.jpg'; }}
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                            <p className="text-gray-600 text-xs">{item.price} LEI x {item.quantity}</p>
                            <p className="text-amber-600 font-bold text-base">{item.price * item.quantity} LEI</p>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-bold w-6 text-center text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-green-600 hover:bg-green-700 text-white p-1.5 rounded transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-800 ml-1"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code */}
                    <div className="border-t-2 border-gray-300 pt-4 mb-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Cod promoțional"
                          value={promoCode}
                          onChange={e => setPromoCode(e.target.value)}
                          className="flex-1 px-3 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 bg-white"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-semibold"
                        >
                          <Percent size={18} />
                          Aplică
                        </button>
                      </div>
                      {discount > 0 && (
                        <p className="text-green-600 text-sm mt-2 flex items-center gap-1 font-medium">
                          <Check size={16} /> Reducere aplicată: -{discount} LEI
                        </p>
                      )}
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg text-lg"
                    >
                      <CreditCard size={24} />
                      Finalizează Comanda
                    </button>
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t-2 border-gray-300 p-4 bg-white">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Subtotal:</span>
                      <span className="font-medium">{subtotal} LEI</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-700">
                      <span>Livrare:</span>
                      <span className="font-medium">{deliveryFee} LEI</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600 font-medium">
                        <span>Reducere:</span>
                        <span>-{discount} LEI</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                      <span className="text-xl font-bold text-gray-900">Total:</span>
                      <span className="text-3xl font-bold text-amber-600">{total} LEI</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal - Professional */}
      <AnimatePresence>
        {showCheckout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckout(false)}
              className="fixed inset-0 bg-black/60 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-2xl z-50 shadow-2xl flex flex-col max-h-[90vh] text-gray-900"
            >
              <div className="bg-gray-900 text-white p-5 flex items-center justify-between rounded-t-2xl">
                <h2 className="font-serif text-2xl font-bold">Finalizare Comandă</h2>
                <button onClick={() => setShowCheckout(false)} className="hover:text-amber-400 transition-colors">
                  <X size={28} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                {/* Delivery Type */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2 text-gray-900 text-lg">
                    <Clock size={20} className="text-amber-600" />
                    Tip de comandă
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCustomerInfo(prev => ({ ...prev, deliveryType: 'delivery' }))}
                      className={`p-4 rounded-xl border-3 transition-all ${
                        customerInfo.deliveryType === 'delivery'
                          ? 'border-amber-600 bg-amber-50 shadow-md'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                      style={{ borderWidth: customerInfo.deliveryType === 'delivery' ? '3px' : '2px' }}
                    >
                      <MapPin className="mx-auto mb-2 text-amber-600" size={28} />
                      <p className="font-bold text-gray-900">Livrare</p>
                      <p className="text-xs text-gray-600">15 LEI</p>
                    </button>
                    <button
                      onClick={() => setCustomerInfo(prev => ({ ...prev, deliveryType: 'pickup' }))}
                      className={`p-4 rounded-xl border-3 transition-all ${
                        customerInfo.deliveryType === 'pickup'
                          ? 'border-amber-600 bg-amber-50 shadow-md'
                          : 'border-gray-300 bg-white hover:border-gray-400'
                      }`}
                      style={{ borderWidth: customerInfo.deliveryType === 'pickup' ? '3px' : '2px' }}
                    >
                      <ShoppingCart className="mx-auto mb-2 text-amber-600" size={28} />
                      <p className="font-bold text-gray-900">Ridicare</p>
                      <p className="text-xs text-gray-600">Gratuit</p>
                    </button>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-bold flex items-center gap-2 text-gray-900 text-lg">
                    <User size={20} className="text-amber-600" />
                    Date de contact
                  </h3>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="text"
                      placeholder="Nume complet *"
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white font-medium"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                    <input
                      type="tel"
                      placeholder="Telefon *"
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white font-medium"
                    />
                  </div>
                  {customerInfo.deliveryType === 'delivery' && (
                    <div className="relative">
                      <MapPin className="absolute left-3 top-4 text-gray-500" size={20} />
                      <textarea
                        placeholder="Adresă completă de livrare *"
                        value={customerInfo.address}
                        onChange={e => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                        rows={2}
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white resize-none font-medium"
                      />
                    </div>
                  )}
                  <div className="relative">
                    <FileText className="absolute left-3 top-4 text-gray-500" size={20} />
                    <textarea
                      placeholder="Observații (opțional)"
                      value={customerInfo.notes}
                      onChange={e => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-gray-900 bg-white resize-none font-medium"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t-2 border-gray-300 pt-4">
                  <h3 className="font-bold mb-3 text-gray-900 text-lg">Sumar comandă</h3>
                  <div className="space-y-2 text-base">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({totalItems} produse):</span>
                      <span className="font-medium">{subtotal} LEI</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Livrare:</span>
                      <span className="font-medium">{deliveryFee} LEI</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600 font-medium">
                        <span>Reducere:</span>
                        <span>-{discount} LEI</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                      <span className="text-xl font-bold text-gray-900">Total:</span>
                      <span className="text-3xl font-bold text-amber-600">{total} LEI</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-gray-300 p-5 bg-white rounded-b-2xl">
                <button
                  onClick={generateWhatsAppLink}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-3 shadow-lg text-lg"
                >
                  <MessageCircle size={24} />
                  Trimite Comanda pe WhatsApp
                </button>
                <p className="text-center text-sm text-gray-600 mt-3">
                  Vei fi redirecționat către WhatsApp pentru a confirma comanda
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
