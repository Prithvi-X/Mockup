import React from 'react';
import { useDemo } from '../../../context/DemoContext';
import { useWorkflow } from '../../../context/WorkflowContext';
import {
  Sparkles,
  Scissors,
  Star,
  Clock,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  ShieldCheck,
  Award,
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const SalonWebsiteView: React.FC = () => {
  const { customization, setViewMode, themeClasses } = useDemo();
  const { openWhatsAppModal } = useWorkflow();

  const sendWhatsAppInquiry = (text: string) => {
    openWhatsAppModal(
      customization.businessName,
      customization.whatsapp || customization.phone,
      text,
      'Customer Web Inquiry'
    );
  };

  const services = customization.salonServices || [
    { id: 's1', name: 'Haircut & Blowdry', price: 350, duration: '30 mins', desc: 'Precision cut tailored to your face structure' },
    { id: 's2', name: 'Keratin Hair Spa & Treatment', price: 1200, duration: '60 mins', desc: 'Deep nourishment and frizz elimination' },
    { id: 's3', name: 'Instant Glow Herbal Facial', price: 850, duration: '45 mins', desc: 'Natural fruit extracts with gentle exfoliation' },
    { id: 's4', name: 'Signature Beard Trim & Styling', price: 250, duration: '20 mins', desc: 'Hot towel prep with organic beard oil finish' }
  ];

  const staff = customization.salonStaffList || [
    { id: 'st1', name: 'Pooja Verma', role: 'Senior Stylist & Bridal Specialist' },
    { id: 'st2', name: 'Rahul Sharma', role: 'Master Barber & Beard Artist' },
    { id: 'st3', name: 'Neha Roy', role: 'Skin Care & Organic Facial Expert' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-100">
      {/* Website Mock Browser Chrome Bar */}
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
            onClick={() => sendWhatsAppInquiry(`Hi ${customization.businessName}, I would like to inquire about your salon services.`)}
            className="flex items-center gap-1.5 text-gray-600 hover:text-emerald-700 transition font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">WhatsApp Us</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium text-white transition ${themeClasses.accentBg} hover:opacity-90 shadow-sm`}
          >
            <Calendar className="w-3 h-3" />
            Book Online
          </button>
        </div>
      </div>

      {/* Website Navbar */}
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
              {customization.tagline || 'Luxury Hair, Skin & Grooming Studio'}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-gray-600">
          <a href="#services" className="hover:text-gray-900 transition">Services & Pricing</a>
          <a href="#stylists" className="hover:text-gray-900 transition">Our Stylists</a>
          <a href="#reviews" className="hover:text-gray-900 transition">Reviews</a>
          <a href="#contact" className="hover:text-gray-900 transition">Location & Hours</a>
        </div>

        <button
          type="button"
          onClick={() => setViewMode('customer')}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-gray-900 hover:bg-gray-800 text-xs font-medium text-white transition shadow-sm"
        >
          <span>Schedule Visit</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-14 sm:py-20 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50 text-xs text-gray-700 mb-5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Voted #1 Grooming Studio in {customization.address.split(',').slice(-2, -1)[0]?.trim() || 'Ranchi'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 max-w-3xl mx-auto leading-tight">
          Look Sharp, Feel Confident at{' '}
          <span className={themeClasses.accentText}>{customization.businessName}</span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {customization.tagline}. Experience precision hair crafting, therapeutic skin rejuvenation, and bespoke bridal packages by certified master artists.
        </p>

        {/* CTA Banner */}
        <div className="mt-7 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium text-white shadow-sm transition ${themeClasses.accentBg} hover:opacity-90`}
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment Online</span>
          </button>
          <button
            type="button"
            onClick={() => sendWhatsAppInquiry(`Hello ${customization.businessName}, please share appointment slots for today.`)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 transition shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-y border-gray-200 py-5">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">4.9 ★ Rating</div>
              <div className="text-[11px] text-gray-500">Over 850+ reviews</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">Zero Wait Time</div>
              <div className="text-[11px] text-gray-500">Reserved time slots</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">100% Sanitized</div>
              <div className="text-[11px] text-gray-500">Autoclaved equipment</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-rose-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">Certified Stylists</div>
              <div className="text-[11px] text-gray-500">Trained experts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Dynamic Pricing Menu */}
      <section id="services" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Transparent Pricing</span>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">Our Signature Services</h3>
          </div>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`text-xs font-semibold flex items-center gap-1 ${themeClasses.accentText} hover:underline`}
          >
            View full menu & schedule <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="p-4 rounded-lg bg-white border border-gray-200 hover:border-gray-300 transition flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-semibold text-gray-900 text-sm">{svc.name}</h4>
                  <span className="font-bold text-base text-gray-900 shrink-0">₹{svc.price}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">{svc.desc}</p>
              </div>

              <div className="mt-3.5 pt-2.5 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-gray-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-gray-400" />
                  {svc.duration}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode('customer')}
                  className="text-xs font-medium text-gray-700 hover:text-gray-900 underline underline-offset-4"
                >
                  Book this service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stylist Team */}
      <section id="stylists" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Craftsmanship</span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">Meet Our Master Stylists</h3>
          <p className="text-xs text-gray-500 mt-1">
            Choose your preferred artist when booking online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {staff.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-lg bg-gray-50 border border-gray-200 text-center flex flex-col items-center"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-base mb-2.5 ${themeClasses.accentBadge}`}>
                {member.name.substring(0, 2).toUpperCase()}
              </div>
              <h4 className="text-sm font-semibold text-gray-900">{member.name}</h4>
              <p className="text-xs text-gray-500 mt-0.5">{member.role}</p>
              <div className="flex items-center gap-0.5 mt-2 text-amber-500 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">Client Stories</span>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">What Our Customers Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-2 text-xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500" />
              ))}
            </div>
            <p className="text-gray-700 italic leading-relaxed">
              "Hands down the best grooming experience in town. Booking online took 30 seconds and I got a WhatsApp confirmation instantly."
            </p>
            <div className="pt-2 text-gray-900 font-semibold">— Priya Sharma</div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-2 text-xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500" />
              ))}
            </div>
            <p className="text-gray-700 italic leading-relaxed">
              "The Keratin spa transformed my hair completely. {customization.businessName} has maintained 5-star hygiene standards throughout."
            </p>
            <div className="pt-2 text-gray-900 font-semibold">— Rajesh Verma</div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50 border border-gray-200 space-y-2 text-xs">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-500" />
              ))}
            </div>
            <p className="text-gray-700 italic leading-relaxed">
              "Friendly staff, zero waiting when you have an appointment slot. Highly recommended for bridal styling!"
            </p>
            <div className="pt-2 text-gray-900 font-semibold">— Anjali Kumari</div>
          </div>
        </div>
      </section>

      {/* Location & Contact Footer */}
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
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Hours & Appointments</h4>
            <ul className="space-y-1 text-gray-600">
              <li>Monday – Saturday: 09:30 AM – 08:30 PM</li>
              <li>Sunday: 10:00 AM – 07:00 PM</li>
              <li className="text-emerald-700 font-medium pt-0.5">● Currently Open Today</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Instant Inquiries</h4>
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
              Book Online Now
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {customization.businessName}. All rights reserved.</span>
          <span className="text-gray-400">Custom Software & Web Experience by ATMAN Studios</span>
        </div>
      </footer>
    </div>
  );
};
