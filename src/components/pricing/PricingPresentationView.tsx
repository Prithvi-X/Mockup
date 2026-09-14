import React, { useState } from 'react';
import { 
  Check, 
  Sparkles, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  HelpCircle, 
  Info, 
  SlidersHorizontal, 
  Lock, 
  Calendar, 
  Clock, 
  IndianRupee, 
  CheckCircle2, 
  Star,
  Layers,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { PRICING_CONFIG } from '../../data/pricingConfig';
import { PricingTierConfig } from '../../types/pricing';
import { PresenterNegotiationDrawer } from './PresenterNegotiationDrawer';

export const PricingPresentationView: React.FC = () => {
  const { 
    category, 
    customization, 
    dealMode,
    selectedPricingTierId,
    setSelectedPricingTierId,
    customPriceOverrides,
    advancePercentage,
    setIsNegotiationDrawerOpen,
    setIsDemoHandoffOpen,
    setViewMode,
    showToast
  } = useDemo();

  // Interactive Monthly vs One-Time calculator rate (default ₹999/month)
  const [calculatorMonthlyRate, setCalculatorMonthlyRate] = useState<number>(999);

  // Determine tiers to display based on category
  const activeTiers: PricingTierConfig[] = 
    category === 'restaurant'
      ? [
          PRICING_CONFIG.tiers.restaurant_special,
          PRICING_CONFIG.tiers.tier_a,
          PRICING_CONFIG.tiers.tier_b,
          PRICING_CONFIG.tiers.tier_c
        ]
      : [
          PRICING_CONFIG.tiers.tier_a,
          PRICING_CONFIG.tiers.tier_b,
          PRICING_CONFIG.tiers.tier_c
        ];

  const getTierPricing = (tier: PricingTierConfig) => {
    if (tier.id === 'tier_c') {
      return {
        regular: 0,
        finalPrice: 0,
        advance: 0,
        remaining: 0,
        isQuote: true,
        savings: 0
      };
    }

    const overridden = customPriceOverrides[tier.id];
    let finalPrice = overridden !== undefined 
      ? overridden 
      : dealMode === 'standard' 
      ? tier.regularPrice 
      : tier.offerPrice;

    const savings = Math.max(0, tier.regularPrice - finalPrice);
    const advance = Math.round((finalPrice * advancePercentage) / 100);
    const remaining = finalPrice - advance;

    return {
      regular: tier.regularPrice,
      finalPrice,
      advance,
      remaining,
      isQuote: false,
      savings
    };
  };

  const selectedTier = PRICING_CONFIG.tiers[selectedPricingTierId] || PRICING_CONFIG.tiers.tier_a;
  const selectedTierPricing = getTierPricing(selectedTier);

  const handleStartProject = (tier: PricingTierConfig) => {
    setSelectedPricingTierId(tier.id);
    const pricing = getTierPricing(tier);
    showToast(`Starting ${tier.name} proposal for ${customization.businessName}`);
    setIsDemoHandoffOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 space-y-16 max-w-7xl mx-auto pb-28">
      
      {/* 1. TOP HEADER & POSITIONING */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="uppercase tracking-wider">
            {customization.businessName} • {category.toUpperCase()} SOLUTIONS
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Choose what your business needs
        </h1>

        <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
          Start small or build the complete workflow. Everything can be customized around your business.
        </p>

        {/* Sales Positioning Callout */}
        <div className="p-4 bg-gradient-to-r from-slate-900/90 via-slate-800/60 to-slate-900/90 border border-slate-700/60 rounded-2xl shadow-lg inline-block text-left text-xs sm:text-sm text-slate-200">
          <p className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              <strong>Positioning:</strong> Custom software without the cost and complexity of a traditional software project.
            </span>
          </p>
        </div>

        {/* Deal Mode Status Badge (Truthful & Non-Deceptive) */}
        {dealMode === 'launch_offer' && (
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-300">
            <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              {PRICING_CONFIG.disclaimers.honestUrgency}
            </span>
          </div>
        )}
      </div>

      {/* 2. PRIMARY TIERS CARDS */}
      <div className={`grid grid-cols-1 gap-6 ${activeTiers.length === 4 ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-3'}`}>
        {activeTiers.map((tier) => {
          const pricing = getTierPricing(tier);
          const isSelected = selectedPricingTierId === tier.id;
          const inclusions = tier.inclusionsByCategory[category] || tier.features;

          return (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-200 relative ${
                tier.isPopular
                  ? 'bg-slate-900/90 border-amber-500/60 shadow-2xl shadow-amber-500/10 ring-1 ring-amber-500/30'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
              } ${isSelected ? 'ring-2 ring-amber-400' : ''}`}
            >
              {/* Popular Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 min-h-[32px] leading-relaxed">
                    {tier.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="my-5 p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                  {pricing.isQuote ? (
                    <div>
                      <span className="text-2xl sm:text-3xl font-extrabold text-white">
                        Custom Quote
                      </span>
                      <p className="text-xs text-slate-400 mt-1">
                        Tailored to your specific operational scale
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-2">
                        {pricing.savings > 0 && (
                          <span className="text-sm text-slate-500 line-through font-semibold">
                            ₹{pricing.regular.toLocaleString('en-IN')}
                          </span>
                        )}
                        <span className="text-3xl sm:text-4xl font-extrabold text-amber-400">
                          ₹{pricing.finalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {pricing.savings > 0 && (
                        <div className="mt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                          <TrendingDown className="w-3.5 h-3.5" />
                          <span>Save ₹{pricing.savings.toLocaleString('en-IN')} with Launch Offer</span>
                        </div>
                      )}

                      {/* Advance Breakdown: 50% Today / 50% on Delivery */}
                      <div className="mt-3 pt-3 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                            Today ({advancePercentage}%)
                          </span>
                          <span className="text-sm font-bold text-emerald-400">
                            ₹{pricing.advance.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="bg-slate-900/90 p-2 rounded-xl border border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold">
                            On Delivery
                          </span>
                          <span className="text-sm font-bold text-slate-200">
                            ₹{pricing.remaining.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Included Bonus Tag on Offer Tiers */}
                {!pricing.isQuote && dealMode === 'launch_offer' && (
                  <div className="mb-5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-2 text-xs text-amber-300">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span><strong>Bonus:</strong> ReviewBro.in free for 2 months</span>
                  </div>
                )}

                {/* Category-Specific Inclusions Checklist */}
                <div className="space-y-2.5 mb-6 text-xs text-slate-300">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    What's included for your business:
                  </div>
                  {inclusions.slice(0, 6).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                  {inclusions.length > 6 && (
                    <div className="text-[11px] text-slate-500 pl-6">
                      + {inclusions.length - 6} more tailored modules
                    </div>
                  )}
                </div>
              </div>

              {/* Tier CTA Button */}
              <button
                type="button"
                onClick={() => handleStartProject(tier)}
                className={`w-full py-3 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg ${
                  tier.isPopular
                    ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/20'
                    : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                }`}
              >
                <span>{pricing.isQuote ? 'Discuss Your Workflow' : `Select ${tier.name}`}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>

      {/* 3. INCLUDED BONUSES SECTION (Truthful positioning) */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Launch Offer Bonus Value</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Included at no extra charge
            </h2>
          </div>
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold text-xs self-start">
            100% Free with Project
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <h3 className="text-xl font-extrabold text-white">
              {PRICING_CONFIG.bonus.exactHeadline}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {PRICING_CONFIG.bonus.description}
            </p>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-400">
              💡 <em>Truthful note: ReviewBro.in is provided as an introductory standalone growth tool to help your business gather verified Google reviews from happy clients.</em>
            </div>
          </div>

          <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span>Introductory Perk</span>
              <span className="text-emerald-400 font-bold">2 Months Full Access</span>
            </div>
            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>One-tap WhatsApp review request links for clients</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Direct Google Maps review collection flow</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero recurring commitments or credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE MONTHLY VS ONE-TIME CALCULATOR */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
            <IndianRupee className="w-4 h-4" />
            <span>Payment Structure Comparison</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Monthly Subscription vs One-Time Project
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            See the structural cost difference between paying ongoing monthly software rent versus a one-time project fee.
          </p>
        </div>

        {/* Rate Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-400">Typical SaaS Monthly Fee:</span>
          {[799, 999, 1499, 1999].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setCalculatorMonthlyRate(rate)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                calculatorMonthlyRate === rate
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow'
                  : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-white'
              }`}
            >
              ₹{rate.toLocaleString('en-IN')} / month
            </button>
          ))}
        </div>

        {/* Comparison Timeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { months: 1, label: '1 Month' },
            { months: 6, label: '6 Months' },
            { months: 12, label: '1 Year (12 mo)' },
            { months: 24, label: '2 Years (24 mo)' }
          ].map((item) => {
            const cumulative = calculatorMonthlyRate * item.months;
            return (
              <div key={item.months} className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  {item.label}
                </span>
                <div className="text-lg sm:text-xl font-extrabold text-rose-400 mt-1">
                  ₹{cumulative.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-slate-500">Recurring SaaS cost</span>
              </div>
            );
          })}
        </div>

        {/* Versus Callout */}
        <div className="p-4 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 rounded-2xl border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
              Our Custom Project
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              ₹3,499 – ₹7,499 One-Time Project Fee
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Zero monthly subscription fees. No commission on customer bookings or orders.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleStartProject(PRICING_CONFIG.tiers.tier_a)}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow transition self-start sm:self-center shrink-0"
          >
            Start With ₹1,750 Advance
          </button>
        </div>

        {/* Footnote Disclaimer */}
        <p className="text-[11px] text-slate-500 italic">
          * {PRICING_CONFIG.disclaimers.paymentStructureOnly}
        </p>
      </div>

      {/* 5. STRUCTURAL COMPETITOR COMPARISON ("Why Custom Software?") */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Why custom software?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A transparent look at how different software delivery models compare.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 text-slate-400">
                <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">Attribute</th>
                <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">SaaS Tool</th>
                <th className="py-3.5 px-4 font-semibold uppercase tracking-wider">Traditional Agency</th>
                <th className="py-3.5 px-4 font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 border-l border-amber-500/20">
                  Our Custom Solution
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {PRICING_CONFIG.structuralComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-semibold text-white whitespace-nowrap">
                    {row.feature}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {row.saas}
                  </td>
                  <td className="py-3 px-4 text-slate-400">
                    {row.agency}
                  </td>
                  <td className="py-3 px-4 font-semibold text-emerald-300 bg-amber-500/5 border-l border-amber-500/20">
                    {row.ourSolution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-slate-500 text-center italic">
          * {PRICING_CONFIG.disclaimers.structuralComparisonFootnote}
        </p>
      </div>

      {/* 6. COMPETITOR PRICE CONTEXT (INDICATIVE BENCHMARKS) */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white">
              Typical Alternative Pricing in the Market
            </h3>
            <span className="text-[11px] text-amber-400 font-semibold">
              * {PRICING_CONFIG.disclaimers.indicativePricing}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full self-start">
            Reference Only
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
          {PRICING_CONFIG.competitors.map((comp, idx) => (
            <div key={idx} className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-1 text-xs">
              <span className="font-bold text-white block">{comp.name}</span>
              <span className="text-amber-400 font-semibold block">{comp.typicalPricing}</span>
              <p className="text-[10px] text-slate-500 leading-snug">{comp.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. "WHY THIS PRICE?" SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-2.5">
          <h3 className="text-lg font-bold text-white">
            Why is this affordable?
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            You're not buying a generic template. The workflow, branding and customer experience are adapted specifically to your business.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            We keep the first version intentionally focused so you can start using it without paying for heavy features you don't need.
          </p>
        </div>

        <div className="p-6 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-2.5">
          <h3 className="text-lg font-bold text-white">
            How the sales process works
          </h3>
          <div className="space-y-1.5 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px]">1</span>
              <span><strong>What you have:</strong> Spreadsheets, registers, or manual WhatsApp chats</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px]">2</span>
              <span><strong>What we build:</strong> Branded website + booking + owner dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px]">3</span>
              <span><strong>Launch Offer:</strong> Introductory one-time price with zero commission</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-emerald-400 font-bold flex items-center justify-center text-[10px]">4</span>
              <span><strong>Start with 50% Advance:</strong> Remainder due only after delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. FINAL CLOSE SCREEN ("Ready to build it?") */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-amber-500/40 rounded-3xl p-6 sm:p-10 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Final Step: Proposal Close
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to build it for {customization.businessName}?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Confirm your requirements. We will prepare your live software sandbox within 24–48 hours.
          </p>
        </div>

        {/* Selected Package Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 bg-slate-950/80 p-4 sm:p-5 rounded-2xl border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Package</span>
            <span className="text-sm font-bold text-white block mt-0.5">{selectedTier.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Total Investment</span>
            <span className="text-sm font-extrabold text-amber-400 block mt-0.5">
              {selectedTierPricing.isQuote ? 'Custom Quote' : `₹${selectedTierPricing.finalPrice.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Today's Advance ({advancePercentage}%)</span>
            <span className="text-sm font-bold text-emerald-400 block mt-0.5">
              {selectedTierPricing.isQuote ? 'TBD' : `₹${selectedTierPricing.advance.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Delivery Timeline</span>
            <span className="text-sm font-semibold text-slate-200 block mt-0.5">24–48 Hours</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Included Bonus</span>
            <span className="text-sm font-semibold text-amber-300 block mt-0.5">2 Mo ReviewBro.in</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => handleStartProject(selectedTier)}
            className="px-7 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl shadow-amber-500/20 active:scale-95 transition flex items-center gap-2"
          >
            <span>🚀 Start Project (Record Requirements)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setViewMode('dashboard')}
            className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-2xl border border-slate-700 transition"
          >
            Review Owner Dashboard Again
          </button>
        </div>
      </div>

      {/* 9. PRESENTER PRIVATE CONTROL BUTTON (Discreet lock toggle at bottom) */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={() => setIsNegotiationDrawerOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-500 hover:text-amber-400 border border-slate-800 text-[11px] font-mono transition"
          title="Presenter Negotiation Drawer (Private Controls)"
        >
          <Lock className="w-3 h-3" />
          <span>Adjust Offer (Presenter Controls)</span>
        </button>
      </div>

      {/* Presenter Negotiation Drawer Modal */}
      <PresenterNegotiationDrawer />

    </div>
  );
};
