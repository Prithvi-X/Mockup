import React, { useState } from 'react';
import { useDemo } from '../../../context/DemoContext';
import { useWorkflow } from '../../../context/WorkflowContext';
import {
  UtensilsCrossed,
  Sparkles,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  ShoppingBag,
  Flame,
  Award
} from 'lucide-react';

export const RestaurantWebsiteView: React.FC = () => {
  const { customization, setViewMode, themeClasses } = useDemo();
  const { openWhatsAppModal } = useWorkflow();

  const sendWhatsAppInquiry = (text: string) => {
    openWhatsAppModal(
      customization.businessName,
      customization.whatsapp || customization.phone,
      text,
      'Restaurant Orders & Table Booking'
    );
  };

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const menu = customization.restaurantMenuList || [
    { id: 'm-1', name: 'Paneer Butter Masala', category: 'Main Course', price: 280, desc: 'Cottage cheese cubes simmered in rich buttery tomato gravy', isVeg: true },
    { id: 'm-2', name: 'Chicken Biryani (Dum Handi)', category: 'Main Course', price: 340, desc: 'Aromatic basmati rice cooked with tender marinated chicken & saffron', isVeg: false },
    { id: 'm-3', name: 'Crispy Corn & Salt Pepper', category: 'Starters', price: 190, desc: 'Golden sweet corn tossed with spring onions & crushed peppercorns', isVeg: true },
    { id: 'm-4', name: 'Tandoori Chicken Half', category: 'Starters', price: 260, desc: 'Clay oven roasted chicken seasoned with spicy Punjabi masala', isVeg: false },
    { id: 'm-5', name: 'Butter Garlic Naan', category: 'Breads & Rice', price: 65, desc: 'Fresh tandoor baked refined flour bread infused with roasted garlic', isVeg: true },
    { id: 'm-6', name: 'Gulab Jamun (2 pcs)', category: 'Desserts', price: 90, desc: 'Warm cottage cheese dumplings soaked in rose flavored cardamom syrup', isVeg: true }
  ];

  const categories = ['All', ...Array.from(new Set(menu.map(m => m.category)))];

  const filteredMenu = selectedCategory === 'All'
    ? menu
    : menu.filter(m => m.category === selectedCategory);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-neutral-800">
      {/* Chrome address bar */}
      <div className="bg-neutral-900/90 backdrop-blur border-b border-neutral-800 px-4 py-2.5 flex items-center justify-between text-xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="bg-neutral-950 px-3 py-1 rounded-md border border-neutral-800 text-neutral-400 font-mono text-[11px] flex items-center gap-2">
            <span className="text-emerald-400">🔒</span>
            <span>https://{customization.website || `${customization.businessName.toLowerCase().replace(/\s+/g, '')}.com`}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => sendWhatsAppInquiry(`Hi ${customization.businessName}, I would like to place a food takeaway order.`)}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-emerald-400 transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp Order</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-white transition ${themeClasses.accentBg} hover:opacity-90`}
          >
            <UtensilsCrossed className="w-3 h-3" />
            Order / Book Table
          </button>
        </div>
      </div>

      {/* Brand Navbar */}
      <nav className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {customization.logoUrl ? (
            <img
              src={customization.logoUrl}
              alt={customization.businessName}
              className="w-10 h-10 object-contain rounded-lg border border-neutral-800 bg-neutral-900 p-1"
            />
          ) : (
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shadow-sm ${themeClasses.accentBg} text-white`}>
              {customization.businessName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-semibold text-base text-white tracking-tight leading-tight">
              {customization.businessName}
            </h1>
            <p className="text-xs text-neutral-400 leading-tight">
              {customization.tagline || 'Authentic Flavors, Fine Dining & Live Kitchen'}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
          <a href="#menu" className="hover:text-white transition">Full Menu</a>
          <a href="#experience" className="hover:text-white transition">Dining Experience</a>
          <a href="#reviews" className="hover:text-white transition">Foodie Reviews</a>
          <a href="#contact" className="hover:text-white transition">Contact & Timings</a>
        </div>

        <button
          type="button"
          onClick={() => setViewMode('customer')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-white transition"
        >
          <span>Online Ordering</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-16 sm:py-24 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/70 text-xs text-neutral-300 mb-6">
          <Flame className="w-3.5 h-3.5 text-amber-400" />
          <span>Fresh Local Ingredients • Woodfired & Dum Specialties</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          A Symphony of Flavors at{' '}
          <span className={themeClasses.accentText}>{customization.businessName}</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {customization.tagline}. Hand-tossed delicacies, sizzling tandoor specialties, and comforting curries made from time-honored family recipes.
        </p>

        {/* CTA Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg transition transform hover:-translate-y-0.5 ${themeClasses.accentBg} hover:opacity-90`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Order Food Online (Direct 10% Off)</span>
          </button>
          <button
            type="button"
            onClick={() => sendWhatsAppInquiry(`Hello ${customization.businessName}, I would like to reserve a dinner table for 4 guests.`)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Reserve Table via WhatsApp</span>
          </button>
        </div>

        {/* Highlights */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-y border-neutral-900 py-6">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">4.8 ★ on Zomato</div>
              <div className="text-[11px] text-neutral-400">1,200+ verified foodies</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">25-Min Kitchen Prep</div>
              <div className="text-[11px] text-neutral-400">Piping hot guarantee</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <UtensilsCrossed className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">100% Fresh Desi Ghee</div>
              <div className="text-[11px] text-neutral-400">Zero artificial colors</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">Family Dining Zone</div>
              <div className="text-[11px] text-neutral-400">AC halls & private cabins</div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Showcase */}
      <section id="menu" className="px-6 py-12 max-w-5xl mx-auto border-t border-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Our Kitchen</span>
            <h3 className="text-2xl font-bold text-white mt-1">Explore Our Menu</h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'bg-neutral-950 text-neutral-400 border border-neutral-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredMenu.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${
                        item.isVeg ? 'border-emerald-500' : 'border-rose-500'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    </span>
                    <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                  </div>
                  <span className="font-bold text-base text-white shrink-0">₹{item.price}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1.5 pl-5 leading-relaxed">{item.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs pl-5">
                <span className="text-neutral-500 text-[11px]">{item.category}</span>
                <button
                  type="button"
                  onClick={() => setViewMode('customer')}
                  className={`text-xs font-semibold ${themeClasses.accentText} hover:underline`}
                >
                  + Add to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-neutral-800 bg-neutral-950 px-6 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          <div>
            <h4 className="font-semibold text-white text-sm mb-2">{customization.businessName}</h4>
            <p className="text-neutral-400 leading-relaxed mb-3">{customization.tagline}</p>
            <div className="flex items-center gap-2 text-neutral-400">
              <MapPin className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{customization.address}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-2">Kitchen Hours</h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li>Lunch: 11:30 AM – 03:30 PM</li>
              <li>Dinner: 07:00 PM – 11:00 PM</li>
              <li className="text-emerald-400 font-medium pt-1">● Kitchen Active & Accepting Orders</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-2">Delivery & Takeaway</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-4 h-4 text-indigo-400" />
                <span>{customization.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-300">
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {customization.whatsapp}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('customer')}
              className={`mt-4 w-full py-2 rounded-lg text-xs font-semibold text-white text-center transition ${themeClasses.accentBg}`}
            >
              Order Online Direct
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-neutral-900 text-center text-neutral-400 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {customization.businessName}. All rights reserved.</span>
          <span className="text-neutral-400">Powered by ATMAN Restaurant POS & Web Engine</span>
        </div>
      </footer>
    </div>
  );
};
