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
            onClick={() => sendWhatsAppInquiry(`Hi ${customization.businessName}, I want to claim my free 1-day workout trial pass!`)}
            className="flex items-center gap-1.5 text-gray-600 hover:text-emerald-700 transition font-medium"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">WhatsApp Desk</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-semibold text-white transition ${themeClasses.accentBg} hover:opacity-90 shadow-sm`}
          >
            <Dumbbell className="w-3 h-3" />
            Join Now
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
              {customization.tagline || 'Strength, Conditioning, Cardio & Transformation'}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-xs text-gray-600">
          <a href="#plans" className="hover:text-gray-900 transition font-medium">Membership Plans</a>
          <a href="#facilities" className="hover:text-gray-900 transition font-medium">Equipment & Facilities</a>
          <a href="#reviews" className="hover:text-gray-900 transition font-medium">Member Stories</a>
          <a href="#contact" className="hover:text-gray-900 transition font-medium">Hours & Location</a>
        </div>

        <button
          type="button"
          onClick={() => setViewMode('customer')}
          className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-white hover:bg-gray-50 border border-gray-300 text-xs font-medium text-gray-700 transition shadow-xs"
        >
          <span>Start Membership</span>
          <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
        </button>
      </nav>

      {/* Hero */}
      <section className="relative px-6 py-14 sm:py-20 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-xs text-emerald-800 mb-6 font-medium">
          <Zap className="w-3.5 h-3.5 text-emerald-600" />
          <span>Premier Fitness Community in {customization.address.split(',').slice(-2, -1)[0]?.trim() || 'Ranchi'}</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 max-w-3xl mx-auto leading-tight">
          Transform Your Body & Mind at{' '}
          <span className={themeClasses.accentText}>{customization.businessName}</span>
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {customization.tagline}. High-end biomechanical equipment, dedicated powerlifting rigs, air-conditioned cardio deck, steam rooms, and certified strength coaches.
        </p>

        {/* CTA Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setViewMode('customer')}
            className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-semibold text-white shadow-sm transition ${themeClasses.accentBg} hover:opacity-90`}
          >
            <Dumbbell className="w-4 h-4" />
            <span>Join Gym Online</span>
          </button>
          <button
            type="button"
            onClick={() => sendWhatsAppInquiry(`Hello ${customization.businessName}, I would like to book a free 1-day gym workout trial.`)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 transition shadow-xs"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Claim Free 1-Day Trial</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-y border-gray-200 py-6">
          <div className="flex items-center gap-2.5">
            <Users className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">400+ Active Members</div>
              <div className="text-[11px] text-gray-500">Engaged community</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-indigo-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">5:30 AM – 10:00 PM</div>
              <div className="text-[11px] text-gray-500">Open 7 days a week</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-cyan-600 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">Biometric Access</div>
              <div className="text-[11px] text-gray-500">Safe & frictionless</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <Star className="w-5 h-5 text-amber-500 shrink-0" />
            <div>
              <div className="text-xs font-semibold text-gray-900">4.9 ★ Rating</div>
              <div className="text-[11px] text-gray-500">Certified coaches</div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership Plans */}
      <section id="plans" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">No Hidden Fees</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">Flexible Membership Plans</h3>
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
              className={`p-6 rounded-lg bg-white border transition flex flex-col justify-between relative shadow-xs ${
                idx === 1 ? 'border-emerald-600 ring-1 ring-emerald-600' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {idx === 1 && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-700 text-white uppercase tracking-wider">
                  Most Popular
                </span>
              )}

              <div>
                <span className="text-xs font-medium text-gray-500">{plan.duration}</span>
                <h4 className="font-semibold text-gray-900 text-lg mt-0.5">{plan.name}</h4>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-xs text-gray-500">/ {plan.duration}</span>
                </div>

                <div className="mt-6 space-y-2 text-xs">
                  {plan.benefits.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 text-gray-600">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setViewMode('customer')}
                className={`mt-6 w-full py-2.5 rounded-md text-xs font-semibold text-white transition ${
                  idx === 1 ? themeClasses.accentBg : 'bg-gray-800 hover:bg-gray-900'
                }`}
              >
                Choose {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Facilities */}
      <section id="facilities" className="px-6 py-12 max-w-5xl mx-auto border-t border-gray-200">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">World-Class Standards</span>
          <h3 className="text-2xl font-bold text-gray-900 mt-1">Gym Facilities</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-lg bg-white border border-gray-200 flex flex-col items-center shadow-xs">
            <Dumbbell className="w-6 h-6 text-emerald-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">Heavy Dumbbells up to 50kg</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Olympic barbells & bumper plates</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200 flex flex-col items-center shadow-xs">
            <Zap className="w-6 h-6 text-amber-500 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">CrossFit & Turf Track</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Sled push, battle ropes, rings</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200 flex flex-col items-center shadow-xs">
            <Sparkles className="w-6 h-6 text-cyan-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">Steam & Detox Sauna</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Post-workout muscle recovery</p>
          </div>
          <div className="p-4 rounded-lg bg-white border border-gray-200 flex flex-col items-center shadow-xs">
            <Users className="w-6 h-6 text-indigo-600 mb-2" />
            <h5 className="text-xs font-semibold text-gray-900">Certified Personal Coaches</h5>
            <p className="text-[11px] text-gray-500 mt-0.5">Personalized diet & workout plans</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-gray-200 bg-gray-50 px-6 py-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-xs">
          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">{customization.businessName}</h4>
            <p className="text-gray-600 leading-relaxed mb-3">{customization.tagline}</p>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{customization.address}</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Gym Timings</h4>
            <ul className="space-y-1.5 text-gray-600">
              <li>Morning: 05:30 AM – 11:30 AM</li>
              <li>Evening: 04:30 PM – 10:00 PM</li>
              <li>Sunday: 07:00 AM – 01:00 PM</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 text-sm mb-2">Membership Desk</h4>
            <div className="space-y-2">
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
              className={`mt-4 w-full py-2 rounded-md text-xs font-semibold text-white text-center transition ${themeClasses.accentBg} hover:opacity-90 shadow-xs`}
            >
              Get Membership Online
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} {customization.businessName}. All rights reserved.</span>
          <span className="text-gray-400">Powered by ATMAN Gym Biometrics & Member Engine</span>
        </div>
      </footer>
    </div>
  );
};
