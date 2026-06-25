import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, X, Plus, Minus, Trash2, ArrowLeft, 
  Search, Filter, SortAsc, SortDesc, Check, 
  MessageCircle, User, MapPin, Phone, FileText,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [showFilters, setShowFilters] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    address: '',
    notes: '',
    deliveryType: 'delivery'
  });
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Salvăm coșul în localStorage
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

  // Filtrăm și sortăm produsele
  const getFilteredItems = () => {
    let items = foodMenu.find(c => c.id === activeCat)?.items || [];
    
    // Căutare
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) ||
        item.ingredients?.toLowerCase().includes(query)
      );
    }

    // Sortare
    if (sortBy === 'price-asc') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      items = [...items].sort((a, b) => a.name.localeCompare(b.name));
    }

    return items;
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'CASA10') {
      setDiscount(subtotal * 0.1); // 10% reducere
      alert('Cod promoțional aplicat: 10% reducere!');
    } else if (promoCode.toUpperCase() === 'WELCOME5') {
      setDiscount(5); // 5 LEI reducere
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
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-white text-red-800 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>
      </header>

      {/* Search and Filters */}
      <div className="bg-white border-b border-stone-200 sticky top-16 md:top-[72px] z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 mb-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
              <input
                type="text"
                placeholder="Caută produse..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                showFilters ? 'bg-red-800 text-white' : 'bg-stone-100 text-stone-700'
              }`}
            >
              <Filter size={20} />
              <span className="hidden md:inline">Filtre</span>
            </button>
          </div>

          {/* Sort options */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSortBy('default')}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                sortBy === 'default' ? 'bg-red-800 text-white' : 'bg-stone-100 text-stone-700'
              }`}
            >
              Implicit
            </button>
            <button
              onClick={() => setSortBy(sortBy === 'price-asc' ? 'price-desc' : 'price-asc')}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap flex items-center gap-1 ${
                sortBy.startsWith('price') ? 'bg-red-800 text-white' : 'bg-stone-100 text-stone-700'
              }`}
            >
              Preț {sortBy === 'price-asc' ? <SortAsc size={14} /> : sortBy === 'price-desc' ? <SortDesc size={14} /> : null}
            </button>
            <button
              onClick={() => setSortBy('name')}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                sortBy === 'name' ? 'bg-red-800 text-white' : 'bg-stone-100 text-stone-700'
              }`}
            >
              Nume A-Z
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-stone-200 sticky top-[120px] md:top-[128px] z-20">
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
          {getFilteredItems().map((item, i) => {
            const cartItem = cart.find(c => c.name === item.name);
            return (
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
                    {cartItem ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(cartItem.id, -1)}
                          className="bg-stone-200 hover:bg-stone-300 p-1 rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-bold w-6 text-center">{cartItem.quantity}</span>
                        <button
                          onClick={() => updateQuantity(cartItem.id, 1)}
                          className="bg-stone-200 hover:bg-stone-300 p-1 rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart({ id: item.name, name: item.name, price: item.price, image: item.image }, activeCat)}
                        className="bg-red-800 hover:bg-red-900 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1"
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
                          <img
                            src={`/images/food/${item.image}`}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/images/loc1.jpg'; }}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-stone-500 text-xs">{item.price} LEI x {item.quantity}</p>
                            <p className="text-red-800 font-bold text-sm">{item.price * item.quantity} LEI</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="bg-stone-200 hover:bg-stone-300 p-1 rounded"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="bg-stone-200 hover:bg-stone-300 p-1 rounded"
                            >
                              <Plus size={16} />
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-800 ml-2"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Promo Code */}
                    <div className="border-t pt-4 mb-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Cod promoțional"
                          value={promoCode}
                          onChange={e => setPromoCode(e.target.value)}
                          className="flex-1 px-3 py-2 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="bg-stone-800 hover:bg-stone-900 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                          <Percent size={18} />
                          Aplică
                        </button>
                      </div>
                      {discount > 0 && (
                        <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                          <Check size={16} /> Reducere aplicată: -{discount} LEI
                        </p>
                      )}
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="w-full bg-red-800 hover:bg-red-900 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard size={20} />
                      Finalizează Comanda
                    </button>
                  </>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4 bg-stone-50">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>{subtotal} LEI</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Livrare:</span>
                      <span>{deliveryFee} LEI</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Reducere:</span>
                        <span>-{discount} LEI</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-lg font-bold">Total:</span>
                      <span className="text-2xl font-bold text-red-800">{total} LEI</span>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {showCheckout && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckout(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-white rounded-2xl z-50 shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="bg-stone-900 text-white p-4 flex items-center justify-between rounded-t-2xl">
                <h2 className="font-serif text-xl font-bold">Finalizare Comandă</h2>
                <button onClick={() => setShowCheckout(false)} className="hover:text-red-400">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {/* Delivery Type */}
                <div className="mb-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Clock size={18} />
                    Tip de comandă
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setCustomerInfo(prev => ({ ...prev, deliveryType: 'delivery' }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        customerInfo.deliveryType === 'delivery'
                          ? 'border-red-800 bg-red-50'
                          : 'border-stone-300 hover:border-stone-400'
                      }`}
                    >
                      <MapPin className="mx-auto mb-2" size={24} />
                      <p className="font-medium">Livrare</p>
                      <p className="text-xs text-stone-500">15 LEI</p>
                    </button>
                    <button
                      onClick={() => setCustomerInfo(prev => ({ ...prev, deliveryType: 'pickup' }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        customerInfo.deliveryType === 'pickup'
                          ? 'border-red-800 bg-red-50'
                          : 'border-stone-300 hover:border-stone-400'
                      }`}
                    >
                      <ShoppingCart className="mx-auto mb-2" size={24} />
                      <p className="font-medium">Ridicare</p>
                      <p className="text-xs text-stone-500">Gratuit</p>
                    </button>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="space-y-4 mb-6">
                  <h3 className="font-bold flex items-center gap-2">
                    <User size={18} />
                    Date de contact
                  </h3>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      type="text"
                      placeholder="Nume complet *"
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                    />
                  </div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    <input
                      type="tel"
                      placeholder="Telefon *"
                      value={customerInfo.phone}
                      onChange={e => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800"
                    />
                  </div>
                  {customerInfo.deliveryType === 'delivery' && (
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 text-stone-400" size={18} />
                      <textarea
                        placeholder="Adresă completă de livrare *"
                        value={customerInfo.address}
                        onChange={e => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                        rows={2}
                        className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 resize-none"
                      />
                    </div>
                  )}
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 text-stone-400" size={18} />
                    <textarea
                      placeholder="Observații (opțional)"
                      value={customerInfo.notes}
                      onChange={e => setCustomerInfo(prev => ({ ...prev, notes: e.target.value }))}
                      rows={2}
                      className="w-full pl-10 pr-4 py-3 border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-800 resize-none"
                    />
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t pt-4">
                  <h3 className="font-bold mb-3">Sumar comandă</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} produse):</span>
                      <span>{subtotal} LEI</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livrare:</span>
                      <span>{deliveryFee} LEI</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Reducere:</span>
                        <span>-{discount} LEI</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center pt-2 border-t font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-red-800">{total} LEI</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t p-4 bg-stone-50 rounded-b-2xl">
                <button
                  onClick={generateWhatsAppLink}
                  className="w-full bg-[#25D366] hover:bg-[#20BA5E] text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={20} />
                  Trimite Comanda pe WhatsApp
                </button>
                <p className="text-center text-xs text-stone-500 mt-2">
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
