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

  // 4 Primary Tiers: Website, Booking (Primary), Dashboard, Custom
  const activeTiers: PricingTierConfig[] = [
    PRICING_CONFIG.tiers.website,
    PRICING_CONFIG.tiers.booking,
    PRICING_CONFIG.tiers.dashboard,
    PRICING_CONFIG.tiers.custom
  ];

  const getTierPricing = (tier: PricingTierConfig) => {
    if (tier.isQuote || tier.id === 'custom') {
      return {
        regular: tier.regularPrice,
        finalPrice: tier.offerPrice,
        advance: Math.round((tier.offerPrice * advancePercentage) / 100),
        remaining: tier.offerPrice - Math.round((tier.offerPrice * advancePercentage) / 100),
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

  const selectedTier = PRICING_CONFIG.tiers[selectedPricingTierId] || PRICING_CONFIG.tiers.booking;
  const selectedTierPricing = getTierPricing(selectedTier);

  const handleStartProject = (tier: PricingTierConfig) => {
    setSelectedPricingTierId(tier.id);
    const pricing = getTierPricing(tier);
    showToast(`Starting ${tier.name} proposal for ${customization.businessName}`);
    setIsDemoHandoffOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-gray-900 py-8 px-4 sm:px-6 lg:px-8 space-y-12 max-w-6xl mx-auto pb-28">
      
      {/* 1. TOP HEADER & POSITIONING */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-xs font-semibold text-gray-600 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="uppercase tracking-wider">
            {customization.businessName} • {category.toUpperCase()} SOLUTIONS
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 leading-tight">
          Choose what your business needs
        </h1>

        <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Start small or build the complete workflow. Everything can be customized around your business.
        </p>

        {/* Sales Positioning Callout */}
        <div className="p-3.5 bg-white border border-gray-200 rounded-lg shadow-xs inline-block text-left text-xs sm:text-sm text-gray-700">
          <p className="flex items-center gap-2 font-medium">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              <strong>Positioning:</strong> Custom software without the cost and complexity of a traditional software project.
            </span>
          </p>
        </div>

        {/* Deal Mode Status Badge (Truthful & Non-Deceptive) */}
        {dealMode === 'launch_offer' && (
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-800">
            <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
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
              className={`rounded-xl p-6 border flex flex-col justify-between transition-all duration-200 relative shadow-xs ${
                tier.isPopular
                  ? 'bg-white border-2 border-indigo-600 shadow-sm'
                  : 'bg-white border-gray-200 hover:border-gray-300'
              } ${isSelected ? 'ring-2 ring-indigo-600' : ''}`}
            >
              {/* Popular Badge */}
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white font-semibold text-[11px] uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-xs">
                  {tier.badge}
                </div>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 min-h-[32px] leading-relaxed">
                    {tier.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="my-4 p-3.5 rounded-lg bg-gray-50 border border-gray-200">
                  {pricing.isQuote ? (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
                        <span>Standard Project:</span>
                        <span className="font-semibold text-gray-700">{tier.regularPriceDisplay || '₹60,000–₹1,00,000+'}</span>
                      </div>
                      <div className="flex items-baseline justify-between pt-1">
                        <span className="text-xs font-bold text-indigo-900">Launch Offer:</span>
                        <span className="text-xl font-extrabold text-gray-900">
                          {tier.offerPriceDisplay || 'Starting ₹20,000 / Custom Quote'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-500 pt-1">
                        Architecture tailored to your operational scale
                      </p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between text-xs text-gray-600 font-medium pb-1">
                        <span>Standard Project Price:</span>
                        <span className="text-sm font-semibold text-gray-400 line-through">
                          ₹{pricing.regular.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <div className="flex items-baseline justify-between pt-0.5">
                        <span className="text-xs font-bold text-indigo-900">Launch Offer:</span>
                        <span className="text-2xl font-extrabold text-gray-900">
                          ₹{pricing.finalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>

                      {pricing.savings > 0 && (
                        <div className="mt-2 flex items-center justify-between text-xs text-emerald-800 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                          <span>You Save:</span>
                          <span>₹{pricing.savings.toLocaleString('en-IN')}</span>
                        </div>
                      )}

                      {/* Advance Breakdown: 50% Today / 50% on Delivery */}
                      <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white p-2 rounded border border-gray-200">
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">
                            Advance ({advancePercentage}%)
                          </span>
                          <span className="text-sm font-bold text-emerald-700">
                            ₹{pricing.advance.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <div className="bg-white p-2 rounded border border-gray-200">
                          <span className="text-[10px] text-gray-500 uppercase tracking-wider block font-semibold">
                            On Delivery
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            ₹{pricing.remaining.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Included Bonus Tag on Offer Tiers */}
                {!pricing.isQuote && (
                  <div className="mb-4 p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between text-xs font-semibold text-amber-900">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      ReviewBro.in:
                    </span>
                    <span className="font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-amber-200 uppercase text-[10px]">
                      FREE for 2 months
                    </span>
                  </div>
                )}

                {/* Category-Specific Inclusions Checklist */}
                <div className="space-y-2 mb-6 text-xs text-gray-700">
                  <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                    What's included for your business:
                  </div>
                  {inclusions.slice(0, 6).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                  {inclusions.length > 6 && (
                    <div className="text-[11px] text-gray-400 pl-6">
                      + {inclusions.length - 6} more tailored modules
                    </div>
                  )}
                </div>
              </div>

              {/* Tier CTA Button */}
              <button
                type="button"
                onClick={() => handleStartProject(tier)}
                className={`w-full py-2.5 rounded-lg font-semibold text-xs transition shadow-xs flex items-center justify-center gap-2 active:scale-98 ${
                  tier.isPopular
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-300'
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
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Launch Offer Bonus Value</span>
            </div>
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Included at no extra charge
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs self-start">
            100% Free with Project
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-gray-900">
              {PRICING_CONFIG.bonus.exactHeadline}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              {PRICING_CONFIG.bonus.description}
            </p>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs text-gray-600">
              💡 <em>Truthful note: ReviewBro.in is provided as an introductory standalone growth tool to help your business gather verified Google reviews from happy clients.</em>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-900">
              <span>Introductory Perk</span>
              <span className="text-emerald-700 font-bold">2 Months Full Access</span>
            </div>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>One-tap WhatsApp review request links for clients</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct Google Maps review collection flow</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero recurring commitments or credit card required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. INTERACTIVE MONTHLY VS ONE-TIME CALCULATOR */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-700 uppercase tracking-wider">
            <IndianRupee className="w-4 h-4 text-indigo-600" />
            <span>Payment Structure Comparison</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Monthly Subscription vs One-Time Project
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            See the structural cost difference between paying ongoing monthly software rent versus a one-time project fee.
          </p>
        </div>

        {/* Rate Selector */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-gray-600">Typical SaaS Monthly Fee:</span>
          {[799, 999, 1499, 1999].map((rate) => (
            <button
              key={rate}
              type="button"
              onClick={() => setCalculatorMonthlyRate(rate)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition ${
                calculatorMonthlyRate === rate
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
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
              <div key={item.months} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">
                  {item.label}
                </span>
                <div className="text-lg sm:text-xl font-bold text-rose-600 mt-1">
                  ₹{cumulative.toLocaleString('en-IN')}
                </div>
                <span className="text-[10px] text-gray-500">Recurring SaaS cost</span>
              </div>
            );
          })}
        </div>

        {/* Versus Callout */}
        <div className="p-4 bg-emerald-50/70 rounded-lg border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">
              Our Custom Project
            </span>
            <div className="text-xl sm:text-2xl font-bold text-gray-900 mt-0.5">
              ₹7,500 – ₹15,000 One-Time Project Fee
            </div>
            <p className="text-xs text-gray-600 mt-0.5">
              Zero monthly subscription fees. No commission on customer bookings or orders.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleStartProject(PRICING_CONFIG.tiers.booking)}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-md shadow-xs transition self-start sm:self-center shrink-0"
          >
            Start With ₹5,000 Advance
          </button>
        </div>

        {/* Footnote Disclaimer */}
        <p className="text-[11px] text-gray-500 italic">
          * {PRICING_CONFIG.disclaimers.paymentStructureOnly}
        </p>
      </div>

      {/* 5. STRUCTURAL COMPETITOR COMPARISON ("Why Custom Software?") */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Why custom software?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            A transparent look at how different software delivery models compare.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-xs">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Attribute</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">SaaS Tool</th>
                <th className="py-3 px-4 font-semibold uppercase tracking-wider">Traditional Agency</th>
                <th className="py-3 px-4 font-bold text-indigo-800 uppercase tracking-wider bg-indigo-50/60 border-l border-indigo-100">
                  Our Custom Solution
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {PRICING_CONFIG.structuralComparison.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-semibold text-gray-900 whitespace-nowrap">
                    {row.feature}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {row.saas}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {row.agency}
                  </td>
                  <td className="py-3 px-4 font-semibold text-indigo-900 bg-indigo-50/30 border-l border-indigo-100">
                    {row.ourSolution}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-[11px] text-gray-500 text-center italic">
          * {PRICING_CONFIG.disclaimers.structuralComparisonFootnote}
        </p>
      </div>

      {/* 6. COMPETITOR PRICE CONTEXT (INDICATIVE BENCHMARKS) */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Typical Alternative Pricing in the Market
            </h3>
            <span className="text-[11px] text-indigo-700 font-semibold">
              * {PRICING_CONFIG.disclaimers.indicativePricing}
            </span>
          </div>
          <span className="text-[10px] text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full self-start font-medium">
            Reference Only
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
          {PRICING_CONFIG.competitors.map((comp, idx) => (
            <div key={idx} className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 space-y-1 text-xs">
              <span className="font-bold text-gray-900 block">{comp.name}</span>
              <span className="text-indigo-700 font-bold block">{comp.typicalPricing}</span>
              <p className="text-[10px] text-gray-500 leading-snug">{comp.note}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 7. "WHY THIS PRICE?" SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2.5 shadow-xs">
          <h3 className="text-base font-bold text-gray-900">
            Why is this affordable?
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            You're not buying a generic template. The workflow, branding and customer experience are adapted specifically to your business.
          </p>
          <p className="text-xs text-gray-500 leading-relaxed">
            We keep the first version intentionally focused so you can start using it without paying for heavy features you don't need.
          </p>
        </div>

        <div className="p-6 bg-white rounded-xl border border-gray-200 space-y-2.5 shadow-xs">
          <h3 className="text-base font-bold text-gray-900">
            How the sales process works
          </h3>
          <div className="space-y-1.5 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-[10px]">1</span>
              <span><strong>What you have:</strong> Spreadsheets, registers, or manual WhatsApp chats</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-[10px]">2</span>
              <span><strong>What we build:</strong> Branded website + booking + owner dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-gray-100 text-gray-700 font-bold flex items-center justify-center text-[10px]">3</span>
              <span><strong>Launch Offer:</strong> Introductory one-time price with zero commission</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-800 font-bold flex items-center justify-center text-[10px]">4</span>
              <span><strong>Start with 50% Advance:</strong> Remainder due only after delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* 8. FINAL CLOSE SCREEN ("Ready to build it?") */}
      <div className="bg-white border-2 border-indigo-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs relative overflow-hidden">
        <div className="max-w-2xl space-y-2">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 uppercase tracking-wider bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
            <Sparkles className="w-3.5 h-3.5" />
            Final Step: Proposal Close
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Ready to build it for {customization.businessName}?
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Confirm your requirements. We will prepare your live software sandbox within 24–48 hours.
          </p>
        </div>

        {/* Selected Package Summary Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 bg-gray-50 p-4 sm:p-5 rounded-lg border border-gray-200 text-xs">
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">Package</span>
            <span className="text-sm font-bold text-gray-900 block mt-0.5">{selectedTier.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">Total Investment</span>
            <span className="text-sm font-extrabold text-indigo-700 block mt-0.5">
              {selectedTierPricing.isQuote ? 'Custom Quote' : `₹${selectedTierPricing.finalPrice.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">Today's Advance ({advancePercentage}%)</span>
            <span className="text-sm font-bold text-emerald-700 block mt-0.5">
              {selectedTierPricing.isQuote ? 'TBD' : `₹${selectedTierPricing.advance.toLocaleString('en-IN')}`}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">Delivery Timeline</span>
            <span className="text-sm font-semibold text-gray-800 block mt-0.5">24–48 Hours</span>
          </div>
          <div>
            <span className="text-[10px] text-gray-500 uppercase font-bold tracking-wider block">Included Bonus</span>
            <span className="text-sm font-semibold text-amber-800 block mt-0.5">2 Mo ReviewBro.in</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => handleStartProject(selectedTier)}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm rounded-lg shadow-sm active:scale-98 transition flex items-center gap-2"
          >
            <span>🚀 Start Project (Record Requirements)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setViewMode('dashboard')}
            className="px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs rounded-lg border border-gray-300 transition shadow-xs"
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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white hover:bg-gray-50 text-gray-400 hover:text-gray-700 border border-gray-200 text-[11px] font-mono transition shadow-xs"
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
