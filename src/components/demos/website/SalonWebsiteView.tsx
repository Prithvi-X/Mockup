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
    <div className="min-h-screen bg-neutral-950 text-neutral-100 selection:bg-neutral-800">
      {/* Website Mock Browser Chrome Bar */}
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
            onClick={() => sendWhatsAppInquiry(`Hi ${customization.businessName}, I would like to inquire about your salon services.`)}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-emerald-400 transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp Us</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-white transition ${themeClasses.accentBg} hover:opacity-90`}
          >
            <Calendar className="w-3 h-3" />
            Book Online
          </button>
        </div>
      </div>

      {/* Website Navbar */}
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
              {customization.tagline || 'Luxury Hair, Skin & Grooming Studio'}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
          <a href="#services" className="hover:text-white transition">Services & Pricing</a>
          <a href="#stylists" className="hover:text-white transition">Our Stylists</a>
          <a href="#reviews" className="hover:text-white transition">Reviews</a>
          <a href="#contact" className="hover:text-white transition">Location & Hours</a>
        </div>

        <button
          type="button"
          onClick={() => setViewMode('customer')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-white transition"
        >
          <span>Schedule Visit</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-16 sm:py-24 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/70 text-xs text-neutral-300 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Voted #1 Grooming Studio in {customization.address.split(',').slice(-2, -1)[0]?.trim() || 'Ranchi'}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Look Sharp, Feel Confident at{' '}
          <span className={themeClasses.accentText}>{customization.businessName}</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {customization.tagline}. Experience precision hair crafting, therapeutic skin rejuvenation, and bespoke bridal packages by certified master artists.
        </p>

        {/* CTA Banner */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg transition transform hover:-translate-y-0.5 ${themeClasses.accentBg} hover:opacity-90`}
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment Online</span>
          </button>
          <button
            type="button"
            onClick={() => sendWhatsAppInquiry(`Hello ${customization.businessName}, please share appointment slots for today.`)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-y border-neutral-900 py-6">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">4.9 ★ Rating</div>
              <div className="text-[11px] text-neutral-400">Over 850+ reviews</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">Zero Wait Time</div>
              <div className="text-[11px] text-neutral-400">Reserved time slots</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">100% Sanitized</div>
              <div className="text-[11px] text-neutral-400">Autoclaved equipment</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-5 h-5 text-rose-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">Certified Stylists</div>
              <div className="text-[11px] text-neutral-400">Trained experts</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services & Dynamic Pricing Menu */}
      <section id="services" className="px-6 py-12 max-w-5xl mx-auto border-t border-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Transparent Pricing</span>
            <h3 className="text-2xl font-bold text-white mt-1">Our Signature Services</h3>
          </div>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`text-xs font-semibold flex items-center gap-1 ${themeClasses.accentText} hover:underline`}
          >
            View full menu & schedule <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800/80 hover:border-neutral-700 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h4 className="font-semibold text-white text-sm">{svc.name}</h4>
                  <span className="font-bold text-base text-white shrink-0">₹{svc.price}</span>
                </div>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">{svc.desc}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs">
                <span className="text-neutral-400 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-neutral-500" />
                  {svc.duration}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode('customer')}
                  className="text-xs font-medium text-neutral-200 hover:text-white underline underline-offset-4"
                >
                  Book this service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stylist Team */}
      <section id="stylists" className="px-6 py-12 max-w-5xl mx-auto border-t border-neutral-900">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Craftsmanship</span>
          <h3 className="text-2xl font-bold text-white mt-1">Meet Our Master Stylists</h3>
          <p className="text-xs text-neutral-400 mt-1.5">
            Choose your preferred artist when booking online.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {staff.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 text-center flex flex-col items-center"
            >
              <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg mb-3 ${themeClasses.accentBadge}`}>
                {member.name.substring(0, 2).toUpperCase()}
              </div>
              <h4 className="text-sm font-semibold text-white">{member.name}</h4>
              <p className="text-xs text-neutral-400 mt-0.5">{member.role}</p>
              <div className="flex items-center gap-1 mt-2 text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="px-6 py-12 max-w-5xl mx-auto border-t border-neutral-900">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Client Stories</span>
          <h3 className="text-2xl font-bold text-white mt-1">What Our Customers Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/80 space-y-2 text-xs">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400" />
              ))}
            </div>
            <p className="text-neutral-300 italic leading-relaxed">
              "Hands down the best grooming experience in town. Booking online took 30 seconds and I got a WhatsApp confirmation instantly."
            </p>
            <div className="pt-2 text-neutral-400 font-semibold">— Priya Sharma</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/80 space-y-2 text-xs">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400" />
              ))}
            </div>
            <p className="text-neutral-300 italic leading-relaxed">
              "The Keratin spa transformed my hair completely. {customization.businessName} has maintained 5-star hygiene standards throughout."
            </p>
            <div className="pt-2 text-neutral-400 font-semibold">— Rajesh Verma</div>
          </div>

          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800/80 space-y-2 text-xs">
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-amber-400" />
              ))}
            </div>
            <p className="text-neutral-300 italic leading-relaxed">
              "Friendly staff, zero waiting when you have an appointment slot. Highly recommended for bridal styling!"
            </p>
            <div className="pt-2 text-neutral-400 font-semibold">— Anjali Kumari</div>
          </div>
        </div>
      </section>

      {/* Location & Contact Footer */}
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
            <h4 className="font-semibold text-white text-sm mb-2">Hours & Appointments</h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li>Monday – Saturday: 09:30 AM – 08:30 PM</li>
              <li>Sunday: 10:00 AM – 07:00 PM</li>
              <li className="text-emerald-400 font-medium pt-1">● Currently Open Today</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-2">Instant Inquiries</h4>
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
              Book Online Now
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-neutral-900 text-center text-neutral-400 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {customization.businessName}. All rights reserved.</span>
          <span className="text-neutral-400">Custom Software & Web Experience by ATMAN Studios</span>
        </div>
      </footer>
    </div>
  );
};
