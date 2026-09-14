import React from 'react';
import { useDemo } from '../../../context/DemoContext';
import { useWorkflow } from '../../../context/WorkflowContext';
import {
  Dumbbell,
  Sparkles,
  Star,
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Users
} from 'lucide-react';

export const GymWebsiteView: React.FC = () => {
  const { customization, setViewMode, themeClasses } = useDemo();
  const { openWhatsAppModal } = useWorkflow();

  const sendWhatsAppInquiry = (text: string) => {
    openWhatsAppModal(
      customization.businessName,
      customization.whatsapp || customization.phone,
      text,
      'Gym Membership Desk'
    );
  };

  const plans = customization.gymPlansList || [
    { id: 'p-1', name: 'Monthly Flexible', price: 999, duration: '1 Month', benefits: ['Full floor access', 'Locker & showers', 'Cardio & weights'] },
    { id: 'p-2', name: 'Quarterly Transformation', price: 2499, duration: '3 Months', benefits: ['Save 17%', 'Body fat analysis', 'Diet chart & guidance'] },
    { id: 'p-3', name: 'Annual VIP Athlete', price: 7999, duration: '12 Months', benefits: ['Best value (₹666/mo)', 'CrossFit area access', '2 guest passes/month', 'Sauna'] }
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
            onClick={() => sendWhatsAppInquiry(`Hi ${customization.businessName}, I want to claim my free 1-day workout trial pass!`)}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-emerald-400 transition"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">WhatsApp Desk</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold text-white transition ${themeClasses.accentBg} hover:opacity-90`}
          >
            <Dumbbell className="w-3 h-3" />
            Join Now
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
              {customization.tagline || 'Strength, Conditioning, Cardio & Transformation'}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-neutral-400">
          <a href="#plans" className="hover:text-white transition">Membership Plans</a>
          <a href="#facilities" className="hover:text-white transition">Equipment & Facilities</a>
          <a href="#reviews" className="hover:text-white transition">Member Stories</a>
          <a href="#contact" className="hover:text-white transition">Hours & Location</a>
        </div>

        <button
          type="button"
          onClick={() => setViewMode('customer')}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-medium text-white transition"
        >
          <span>Start Membership</span>
          <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-16 sm:py-24 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/70 text-xs text-neutral-300 mb-6">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Premier Fitness Community in {customization.address.split(',').slice(-2, -1)[0]?.trim() || 'Ranchi'}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Transform Your Body & Mind at{' '}
          <span className={themeClasses.accentText}>{customization.businessName}</span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          {customization.tagline}. High-end biomechanical equipment, dedicated powerlifting rigs, air-conditioned cardio deck, steam rooms, and certified strength coaches.
        </p>

        {/* CTA Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-white shadow-lg transition transform hover:-translate-y-0.5 ${themeClasses.accentBg} hover:opacity-90`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>Join Gym Online</span>
          </button>
          <button
            type="button"
            onClick={() => sendWhatsAppInquiry(`Hello ${customization.businessName}, I would like to book a free 1-day gym workout trial.`)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Claim Free 1-Day Trial</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-y border-neutral-900 py-6">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">400+ Active Members</div>
              <div className="text-[11px] text-neutral-400">Engaged community</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-indigo-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">5:30 AM – 10:00 PM</div>
              <div className="text-[11px] text-neutral-400">Open 7 days a week</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">Biometric Access</div>
              <div className="text-[11px] text-neutral-400">Safe & frictionless</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Star className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-white">4.9 ★ Rating</div>
              <div className="text-[11px] text-neutral-400">Certified coaches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section id="plans" className="px-6 py-12 max-w-5xl mx-auto border-t border-neutral-900">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">No Hidden Fees</span>
            <h3 className="text-2xl font-bold text-white mt-1">Flexible Membership Plans</h3>
          </div>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`text-xs font-semibold flex items-center gap-1 ${themeClasses.accentText} hover:underline`}
          >
            Select a plan & activate <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, idx) => (
            <div
              key={plan.id}
              className={`p-6 rounded-2xl bg-neutral-900/50 border transition flex flex-col justify-between relative ${
                idx === 1 ? 'border-emerald-500/50 shadow-lg shadow-emerald-950/20' : 'border-neutral-800/80 hover:border-neutral-700'
              }`}
            >
              {idx === 1 && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500 text-neutral-950 uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div>
                <span className="text-xs font-medium text-neutral-400">{plan.duration}</span>
                <h4 className="font-semibold text-white text-lg mt-0.5">{plan.name}</h4>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">₹{plan.price}</span>
                  <span className="text-xs text-neutral-400">/ {plan.duration}</span>
                </div>

                <div className="mt-6 space-y-2 text-xs">
                  {plan.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewMode('customer')}
                className={`mt-6 w-full py-2.5 rounded-lg text-xs font-semibold text-white transition ${
                  idx === 1 ? themeClasses.accentBg : 'bg-neutral-800 hover:bg-neutral-700'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="px-6 py-12 max-w-5xl mx-auto border-t border-neutral-900">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">World-Class Standards</span>
          <h3 className="text-2xl font-bold text-white mt-1">Gym Facilities</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 flex flex-col items-center">
            <Dumbbell className="w-6 h-6 text-emerald-400 mb-2" />
            <h5 className="text-xs font-semibold text-white">Heavy Dumbbells up to 50kg</h5>
            <p className="text-[11px] text-neutral-400 mt-0.5">Olympic barbells & bumper plates</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 flex flex-col items-center">
            <Zap className="w-6 h-6 text-amber-400 mb-2" />
            <h5 className="text-xs font-semibold text-white">CrossFit & Turf Track</h5>
            <p className="text-[11px] text-neutral-400 mt-0.5">Sled push, battle ropes, rings</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 flex flex-col items-center">
            <Sparkles className="w-6 h-6 text-cyan-400 mb-2" />
            <h5 className="text-xs font-semibold text-white">Steam & Detox Sauna</h5>
            <p className="text-[11px] text-neutral-400 mt-0.5">Post-workout muscle recovery</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900/30 border border-neutral-800 flex flex-col items-center">
            <Users className="w-6 h-6 text-indigo-400 mb-2" />
            <h5 className="text-xs font-semibold text-white">Certified Personal Coaches</h5>
            <p className="text-[11px] text-neutral-400 mt-0.5">Personalized diet & workout plans</p>
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
            <h4 className="font-semibold text-white text-sm mb-2">Gym Timings</h4>
            <ul className="space-y-1.5 text-neutral-400">
              <li>Morning: 05:30 AM – 11:30 AM</li>
              <li>Evening: 04:30 PM – 10:00 PM</li>
              <li>Sunday: 07:00 AM – 01:00 PM</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-sm mb-2">Membership Desk</h4>
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
              Get Membership Online
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-neutral-900 text-center text-neutral-400 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {customization.businessName}. All rights reserved.</span>
          <span className="text-neutral-400">Powered by ATMAN Gym Biometrics & Member Engine</span>
        </div>
      </footer>
    </div>
  );
};
