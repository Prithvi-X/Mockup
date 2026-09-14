import React, { useState } from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { UtensilsCrossed, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Check } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  desc: string;
  isVeg: boolean;
}

const MENU: MenuItem[] = [
  { id: 'm1', name: 'Mutton Handi Biryani', category: 'Main Course', price: 380, desc: 'Slow-cooked fragrant rice in earthen clay pot', isVeg: false },
  { id: 'm2', name: 'Chicken Butter Masala', category: 'Main Course', price: 360, desc: 'Tender chicken in rich tomato cashew gravy', isVeg: false },
  { id: 'm3', name: 'Paneer Angara Tikka', category: 'Starters', price: 280, desc: 'Charcoal roasted cottage cheese with mint dip', isVeg: true },
  { id: 'm4', name: 'Butter Garlic Naan', category: 'Breads', price: 80, desc: 'Tandoor baked flatbread brushed with butter', isVeg: true },
  { id: 'm5', name: 'Desi Masala Cold Brew', category: 'Beverages', price: 140, desc: 'Chilled coffee infused with signature spices', isVeg: true }
];

export const RestaurantOrderFlow: React.FC = () => {
  const { addRestaurantOrder } = useWorkflow();
  const { customization, setViewMode } = useDemo();

  const activeMenu = (customization.restaurantMenuList && customization.restaurantMenuList.length > 0)
    ? customization.restaurantMenuList
    : MENU;

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [quantities, setQuantities] = useState<Record<string, number>>(() => ({
    [activeMenu[0]?.id || 'm1']: 1
  }));
  const [customerName, setCustomerName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 94311 88210');
  const [orderType, setOrderType] = useState<'Dine In' | 'Takeaway' | 'Delivery'>('Dine In');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [placedOrderNumber, setPlacedOrderNumber] = useState('TK-1042');
  const [isOrdered, setIsOrdered] = useState(false);

  const categories = ['All', ...Array.from(new Set(activeMenu.map(m => m.category)))];

  const filteredMenu = activeCategory === 'All'
    ? activeMenu
    : activeMenu.filter(item => item.category === activeCategory);

  const handleQuantity = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  const cartItems = activeMenu.filter(item => (quantities[item.id] || 0) > 0);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * (quantities[item.id] || 0), 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + (quantities[item.id] || 0), 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (totalItemsCount === 0) return;

    const num = `TK-${Math.floor(1000 + Math.random() * 9000)}`;
    setPlacedOrderNumber(num);

    addRestaurantOrder({
      orderNumber: num,
      customerName: customerName.trim() || 'Priya Sharma',
      phone: phone.trim() || '+91 94311 88210',
      type: orderType,
      tableNumber: orderType === 'Dine In' ? tableNumber : undefined,
      items: cartItems.map(item => ({
        name: item.name,
        quantity: quantities[item.id],
        price: item.price
      })),
      totalAmount: totalAmount,
      status: 'New'
    });

    setIsOrdered(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {isOrdered ? (
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              Order Sent to Kitchen
            </div>
            <h3 className="text-2xl font-extrabold text-white">Order #{placedOrderNumber}</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Thank you, {customerName}. The kitchen is preparing your dishes.
            </p>
          </div>

          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Order Mode</span>
              <span className="font-semibold text-white">{orderType} {orderType === 'Dine In' ? `(${tableNumber})` : ''}</span>
            </div>
            <div className="space-y-1 py-1">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-neutral-300">
                  <span>{quantities[item.id]} × {item.name}</span>
                  <span className="font-mono">₹{item.price * quantities[item.id]}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between border-t border-neutral-800 pt-2 font-bold">
              <span className="text-neutral-300">Total Bill</span>
              <span className="text-emerald-400 font-mono">₹{totalAmount}</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs transition shadow"
            >
              <span>View in Kitchen Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsOrdered(false)}
              className="w-full sm:w-auto text-xs text-neutral-400 hover:text-white px-3 py-2"
            >
              Order More Items
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handlePlaceOrder} className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Digital Menu & Ordering</h3>
              <p className="text-xs text-neutral-400">Add dishes and send your order straight to the kitchen.</p>
            </div>
            <div className="flex items-center gap-1 bg-neutral-900 px-3 py-1.5 rounded-xl border border-neutral-800 text-xs font-semibold text-amber-400">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{totalItemsCount} items (₹{totalAmount})</span>
            </div>
          </div>

          {/* Dining Type Selection */}
          <div className="grid grid-cols-3 gap-2 bg-neutral-950 p-1.5 rounded-xl border border-neutral-800 text-xs">
            {(['Dine In', 'Takeaway', 'Delivery'] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setOrderType(type)}
                className={`py-2 rounded-lg font-semibold transition ${
                  orderType === type
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {orderType === 'Dine In' && (
            <div className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between text-xs">
              <span className="text-neutral-400">Table Number:</span>
              <select
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                className="bg-neutral-900 border border-neutral-700 text-white font-semibold rounded-lg px-2.5 py-1 text-xs"
              >
                <option value="Table 1">Table 1</option>
                <option value="Table 2">Table 2</option>
                <option value="Table 3">Table 3</option>
                <option value="Table 4">Table 4</option>
                <option value="Table 7">Table 7</option>
              </select>
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-semibold'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <div className="space-y-2.5">
            {filteredMenu.map((dish) => {
              const qty = quantities[dish.id] || 0;
              return (
                <div
                  key={dish.id}
                  className="bg-neutral-950 border border-neutral-800 rounded-xl p-3.5 flex items-center justify-between hover:border-neutral-700 transition"
                >
                  <div className="space-y-0.5 max-w-[70%]">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${dish.isVeg ? 'bg-emerald-400' : 'bg-rose-500'}`} />
                      <span className="font-bold text-xs text-white">{dish.name}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-tight">{dish.desc}</p>
                    <div className="text-xs font-extrabold text-amber-400 mt-1">₹{dish.price}</div>
                  </div>

                  {/* Quantity Controller */}
                  <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg p-1">
                    {qty > 0 && (
                      <button
                        type="button"
                        onClick={() => handleQuantity(dish.id, -1)}
                        className="w-6 h-6 rounded bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                    )}
                    <span className="w-5 text-center text-xs font-bold text-white">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleQuantity(dish.id, 1)}
                      className="w-6 h-6 rounded bg-amber-600 hover:bg-amber-500 flex items-center justify-center text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Customer Details */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Customer Contact</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                required
              />
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
            <div>
              <span className="text-xs text-neutral-400 block">Subtotal</span>
              <span className="text-lg font-extrabold text-white">₹{totalAmount}</span>
            </div>
            <button
              type="submit"
              disabled={totalItemsCount === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-semibold text-xs shadow-md transition disabled:opacity-50"
            >
              <Check className="w-4 h-4" />
              <span>Place Order ({totalItemsCount} items)</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
