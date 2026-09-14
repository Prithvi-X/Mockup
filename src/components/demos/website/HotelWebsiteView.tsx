import React from 'react';
import { useDemo } from '../../../context/DemoContext';
import { useWorkflow } from '../../../context/WorkflowContext';
import {
  BedDouble,
  Calendar,
  Sparkles,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Wifi,
  Coffee,
  ShieldCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const HotelWebsiteView: React.FC = () => {
  const { customization, setViewMode, themeClasses } = useDemo();
  const { openWhatsAppModal } = useWorkflow();

  const sendWhatsAppInquiry = (text: string) => {
    openWhatsAppModal(
      customization.businessName,
      customization.whatsapp || customization.phone,
      text,
      'Hotel Concierge Desk'
    );
  };

  const rooms = customization.hotelRoomsList || [
    { id: 'rm-1', name: 'Deluxe King Room', price: 2499, capacity: '2 Adults', amenities: ['King Bed', 'Free WiFi', 'City View', 'Tea Maker'] },
    { id: 'rm-2', name: 'Executive Business Suite', price: 3499, capacity: '2 Adults, 1 Kid', amenities: ['Work Desk', 'Free Breakfast', 'Airport Pickup', 'Smart TV'] },
    { id: 'rm-3', name: 'Royal Grand Suite', price: 5499, capacity: '3 Adults', amenities: ['Master Bedroom', 'Bathtub', 'Living Area', 'Balcony Access'] }
  ];

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
            onClick={() => sendWhatsAppInquiry(`Hi ${customization.businessName}, checking room availability for this week.`)}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-emerald-400 transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Concierge Desk</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-white transition ${themeClasses.accentBg} hover:opacity-90`}
          >
            <Calendar className="w-3 h-3" />
            Reserve Room
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
              {customization.tagline || 'Luxury Stays & Business Banquets'}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
          <a href="#rooms" className="hover:text-white transition">Rooms & Suites</a>
          <a href="#amenities" className="hover:text-white transition">Amenities</a>
          <a href="#banquets" className="hover:text-white transition">Banquets & Events</a>
          <a href="#contact" className="hover:text-white transition">Location & Contact</a>
        </div>

        <button
          type="button"
          onClick={() => setViewMode('customer')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-white transition"
        >
          <span>Direct Booking</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-16 sm:py-24 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/70 text-xs text-neutral-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Official Direct Website • Best Rate Guarantee</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Experience Pure Comfort at{' '}
          <span className={themeClasses.accentText}>{customization.businessName}</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {customization.tagline}. Luxurious air-conditioned suites, multi-cuisine in-house restaurant, round-the-clock room service, and banquet halls for weddings and corporate gatherings.
        </p>

        {/* Search / Booking Box */}
        <div className="mt-8 p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800 max-w-3xl mx-auto shadow-xl flex flex-col sm:flex-row items-center gap-3 text-left">
          <div className="flex-1 w-full">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">Check-in</span>
            <div className="bg-neutral-950 px-3 py-2 rounded-lg border border-neutral-800 text-xs text-white flex items-center justify-between">
              <span>Today, 12:00 PM</span>
              <Calendar className="w-3.5 h-3.5 text-neutral-500" />
            </div>
          </div>

          <div className="flex-1 w-full">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 block mb-1">Guests</span>
            <div className="bg-neutral-950 px-3 py-2 rounded-lg border border-neutral-800 text-xs text-white">
              2 Adults • 1 Room
            </div>
          </div>

          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`w-full sm:w-auto self-end px-6 py-2.5 rounded-lg text-xs font-semibold text-white transition shadow-md ${themeClasses.accentBg} hover:opacity-90 flex items-center justify-center gap-1.5`}
          >
            <BedDouble className="w-4 h-4" />
            <span>Check Availability</span>
          </button>
        </div>

        {/* Direct Booking Benefit Alert */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-emerald-400">
          <CheckCircle2 className="w-4 h-4" />
          <span>Book directly on this website and get <strong>Free Breakfast + Early Check-in</strong></span>
        </div>
      </section>

      {/* Room Showcase */}
      <section id="rooms" className="px-6 py-12 max-w-5xl mx-auto border-t border-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Comfort & Elegance</span>
            <h3 className="text-2xl font-bold text-white mt-1">Our Rooms & Suites</h3>
          </div>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`text-xs font-semibold flex items-center gap-1 ${themeClasses.accentText} hover:underline`}
          >
            View all room categories <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-medium text-neutral-400">{room.capacity}</span>
                  <div className="flex items-center text-amber-400 text-xs">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span className="ml-1 text-white font-semibold">4.8</span>
                  </div>
                </div>

                <h4 className="font-semibold text-white text-base">{room.name}</h4>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {room.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-neutral-950 border border-neutral-800 text-neutral-300"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-neutral-400">Per Night</div>
                  <div className="text-lg font-bold text-white">₹{room.price}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewMode('customer')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition ${themeClasses.accentBg}`}
                >
                  Book Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotel Amenities */}
      <section id="amenities" className="px-6 py-12 max-w-5xl mx-auto border-t border-neutral-900">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Guest Privileges</span>
          <h3 className="text-2xl font-bold text-white mt-1">Hotel Amenities</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 flex flex-col items-center">
            <Wifi className="w-6 h-6 text-indigo-400 mb-2" />
            <h5 className="text-xs font-semibold text-white">High-Speed WiFi</h5>
            <p className="text-[11px] text-neutral-400 mt-0.5">Complimentary everywhere</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 flex flex-col items-center">
            <Coffee className="w-6 h-6 text-amber-400 mb-2" />
            <h5 className="text-xs font-semibold text-white">In-House Dining</h5>
            <p className="text-[11px] text-neutral-400 mt-0.5">24/7 multi-cuisine menu</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mb-2" />
            <h5 className="text-xs font-semibold text-white">Power Backup & CCTV</h5>
            <p className="text-[11px] text-neutral-400 mt-0.5">100% round-the-clock safety</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-rose-400 mb-2" />
            <h5 className="text-xs font-semibold text-white">Banquet & Weddings</h5>
            <p className="text-[11px] text-neutral-400 mt-0.5">Up to 400 guests capacity</p>
          </div>
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
            <h4 className="font-semibold text-white text-sm mb-2">Front Desk & Concierge</h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li>Check-in: 12:00 PM | Check-out: 11:00 AM</li>
              <li>Early check-in subject to availability</li>
              <li className="text-emerald-400 font-medium pt-1">● Reception Open 24 Hours</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-2">Direct Reservations</h4>
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
              Reserve Room Directly
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-neutral-900 text-center text-neutral-400 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {customization.businessName}. All rights reserved.</span>
          <span className="text-neutral-400">Powered by ATMAN Hospitality Software</span>
        </div>
      </footer>
    </div>
  );
};
