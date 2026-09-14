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
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-100">
      {/* Chrome address bar */}
      <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
          </div>
          <div className="bg-white px-3 py-1 rounded border border-gray-300 text-gray-600 font-mono text-[11px] flex items-center gap-2 shadow-xs">
            <span className="text-emerald-600">🔒</span>
            <span>https://{customization.website || `${customization.businessName.toLowerCase().replace(/\s+/g, '')}.com`}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => sendWhatsAppInquiry(`Hi ${customization.businessName}, checking room availability for this week.`)}
            className="flex items-center gap-1.5 text-gray-600 hover:text-emerald-700 transition font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Concierge Desk</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium text-white transition ${themeClasses.accentBg} hover:opacity-90 shadow-sm`}
          >
            <Calendar className="w-3 h-3" />
            Reserve Room
          </button>
        </div>
      </div>

      {/* Brand Navbar */}
      <nav className="border-b border-gray-200 bg-white/95 backdrop-blur px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {customization.logoUrl ? (
            <img
              src={customization.logoUrl}
              alt={customization.businessName}
              className="w-10 h-10 object-contain rounded-md border border-gray-200 bg-white p-1"
            />
          ) : (
            <div className={`w-9 h-9 rounded-md flex items-center justify-center font-bold text-sm shadow-xs ${themeClasses.accentBg} text-white`}>
              {customization.businessName.substring(0, 2).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-semibold text-base text-gray-900 tracking-tight leading-tight">
              {customization.businessName}
            </h1>
            <p className="text-xs text-gray-500 leading-tight">
              {customization.tagline || 'Luxury Stays & Business Banquets'}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-gray-600">
          <a href="#rooms" className="hover:text-gray-900 transition">Rooms & Suites</a>
          <a href="#amenities" className="hover:text-gray-900 transition">Amenities</a>
          <a href="#banquets" className="hover:text-gray-900 transition">Banquets & Events</a>
          <a href="#contact" className="hover:text-gray-900 transition">Location & Contact</a>
        </div>

        <button
          type="button"
          onClick={() => setViewMode('customer')}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-gray-900 hover:bg-gray-800 text-xs font-medium text-white transition shadow-sm"
        >
          <span>Direct Booking</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-14 sm:py-20 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-xs text-gray-700 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Official Direct Website • Best Rate Guarantee</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 max-w-3xl mx-auto leading-tight">
          Experience Pure Comfort at{' '}
          <span className={themeClasses.accentText}>{customization.businessName}</span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {customization.tagline}. Luxurious air-conditioned suites, multi-cuisine in-house restaurant, round-the-clock room service, and banquet halls for weddings and corporate gatherings.
        </p>

        {/* Search / Booking Box */}
        <div className="mt-7 p-3.5 rounded-lg bg-gray-50 border border-gray-200 max-w-3xl mx-auto shadow-xs flex flex-col sm:flex-row items-center gap-3 text-left">
          <div className="flex-1 w-full">
            <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 block mb-1">Check-in</span>
            <div className="bg-white px-3 py-1.5 rounded-md border border-gray-300 text-xs text-gray-800 flex items-center justify-between">
              <span>Today, 12:00 PM</span>
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 w-full">
            <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500 block mb-1">Guests</span>
            <div className="bg-white px-3 py-1.5 rounded-md border border-gray-300 text-xs text-gray-800">
              2 Adults • 1 Room
            </div>
          </div>

          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`w-full sm:w-auto self-end px-4 py-2 rounded-md text-xs font-medium text-white transition shadow-sm ${themeClasses.accentBg} hover:opacity-90 flex items-center justify-center gap-1.5`}
          >
            <BedDouble className="w-4 h-4" />
            <span>Check Availability</span>
          </button>
        </div>

        {/* Direct Booking Benefit Alert */}
        <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-emerald-700">
          <CheckCircle2 className="w-4 h-4" />
          <span>Book directly on this website and get <strong>Free Breakfast + Early Check-in</strong></span>
        </div>
      </section>

      {/* Room Showcase */}
      <section id="rooms" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Comfort & Elegance</span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">Our Rooms & Suites</h3>
          </div>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`text-xs font-semibold flex items-center gap-1 ${themeClasses.accentText} hover:underline`}
          >
            View all room categories <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="p-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-medium text-gray-500">{room.capacity}</span>
                  <div className="flex items-center text-amber-500 text-xs">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span className="ml-1 text-gray-900 font-semibold">4.8</span>
                  </div>
                </div>

                <h4 className="font-semibold text-gray-900 text-base">{room.name}</h4>

                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {room.amenities.map((amenity, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] bg-gray-100 border border-gray-200 text-gray-600"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-gray-400">Per Night</div>
                  <div className="text-base font-bold text-gray-900">₹{room.price}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewMode('customer')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium text-white transition ${themeClasses.accentBg} shadow-sm`}
                >
                  Book Room
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hotel Amenities */}
      <section id="amenities" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Guest Privileges</span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">Hotel Amenities</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-center">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center">
            <Wifi className="w-5 h-5 text-indigo-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">High-Speed WiFi</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Complimentary everywhere</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center">
            <Coffee className="w-5 h-5 text-amber-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">In-House Dining</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">24/7 multi-cuisine menu</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center">
            <ShieldCheck className="w-5 h-5 text-emerald-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">Power Backup & CCTV</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">100% round-the-clock safety</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 flex flex-col items-center">
            <Sparkles className="w-5 h-5 text-rose-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">Banquet & Weddings</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Up to 400 guests capacity</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-200 bg-gray-50 px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">{customization.businessName}</h4>
            <p className="text-gray-600 leading-relaxed mb-3">{customization.tagline}</p>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{customization.address}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Front Desk & Concierge</h4>
            <ul className="space-y-1 text-gray-600">
              <li>Check-in: 12:00 PM | Check-out: 11:00 AM</li>
              <li>Early check-in subject to availability</li>
              <li className="text-emerald-700 font-medium pt-0.5">● Reception Open 24 Hours</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Direct Reservations</h4>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-indigo-600" />
                <span>{customization.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp: {customization.whatsapp}</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setViewMode('customer')}
              className={`mt-3.5 w-full py-2 rounded-md text-xs font-medium text-white text-center transition ${themeClasses.accentBg} shadow-sm`}
            >
              Reserve Room Directly
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {customization.businessName}. All rights reserved.</span>
          <span className="text-gray-400">Powered by Xampire Technologies Hospitality Software</span>
        </div>
      </footer>
    </div>
  );
};
