import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Unlock, 
  Percent, 
  RotateCcw, 
  ShieldAlert, 
  Check, 
  Sparkles, 
  DollarSign,
  Sliders,
  AlertTriangle
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { PRICING_CONFIG } from '../../data/pricingConfig';
import { DealMode } from '../../types/pricing';

export const PresenterNegotiationDrawer: React.FC = () => {
  const { 
    isNegotiationDrawerOpen, 
    setIsNegotiationDrawerOpen,
    dealMode,
    setDealMode,
    selectedPricingTierId,
    setSelectedPricingTierId,
    customPriceOverrides,
    setCustomPriceOverride,
    advancePercentage,
    setAdvancePercentage,
    category,
    showToast
  } = useDemo();

  const [enteredPrice, setEnteredPrice] = useState<string>('');
  const [overrideWarningConfirmed, setOverrideWarningConfirmed] = useState<boolean>(false);

  if (!isNegotiationDrawerOpen) return null;

  const currentTierConfig = PRICING_CONFIG.tiers[selectedPricingTierId];
  const regularPrice = currentTierConfig.regularPrice;
  const baseOfferPrice = currentTierConfig.offerPrice;
  const floorPrice = currentTierConfig.floorPrice; // STRICTLY PRESENTER-ONLY

  const activeOfferPrice = 
    customPriceOverrides[selectedPricingTierId] !== undefined
      ? customPriceOverrides[selectedPricingTierId]
      : dealMode === 'standard'
      ? regularPrice
      : baseOfferPrice;

  const advanceAmount = Math.round((activeOfferPrice * advancePercentage) / 100);
  const remainingAmount = activeOfferPrice - advanceAmount;
  const savings = Math.max(0, regularPrice - activeOfferPrice);

  const applyDiscountPercent = (pct: number) => {
    const discounted = Math.round(regularPrice * (1 - pct / 100));
    setDealMode('special_discount');
    setCustomPriceOverride(selectedPricingTierId, discounted);
    showToast(`Applied ${pct}% discount: ₹${discounted.toLocaleString('en-IN')}`);
  };

  const applyFlatDiscount = (amount: number) => {
    const discounted = Math.max(0, regularPrice - amount);
    setDealMode('special_discount');
    setCustomPriceOverride(selectedPricingTierId, discounted);
    showToast(`Deducted ₹${amount}: ₹${discounted.toLocaleString('en-IN')}`);
  };

  const handleCustomPriceSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(enteredPrice, 10);
    if (isNaN(val) || val <= 0) {
      showToast('Please enter a valid numeric price.');
      return;
    }

    if (val < floorPrice && !overrideWarningConfirmed) {
      showToast(`Warning: ₹${val} is below the ₹${floorPrice} floor price guard!`);
      return;
    }

    setDealMode('special_discount');
    setCustomPriceOverride(selectedPricingTierId, val);
    setEnteredPrice('');
    setOverrideWarningConfirmed(false);
    showToast(`Custom offer set to ₹${val.toLocaleString('en-IN')}`);
  };

  const handleResetOffer = () => {
    setDealMode('launch_offer');
    setAdvancePercentage(50);
    setCustomPriceOverride(selectedPricingTierId, baseOfferPrice);
    setOverrideWarningConfirmed(false);
    showToast('Reset offer back to standard Launch Offer.');
  };

  const isBelowFloor = activeOfferPrice < floorPrice && activeOfferPrice > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto text-slate-100">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
              <Lock className="w-3.5 h-3.5" />
              <span>Presenter Negotiation Mode</span>
            </div>
            <button
              onClick={() => setIsNegotiationDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Close Presenter Controls"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Adjust Offer & Deal Terms
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Presenter-only pricing controls. Changes update the live customer screen immediately.
            </p>
          </div>

          {/* Deal Mode Switcher */}
          <div className="space-y-1.5 pt-2">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Deal Mode
            </label>
            <div className="grid grid-cols-2 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['launch_offer', 'standard', 'special_discount', 'custom_quote'] as DealMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setDealMode(mode)}
                  className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center capitalize ${
                    dealMode === mode
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Target Package Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Target Package Tier
            </label>
            <select
              value={selectedPricingTierId}
              onChange={(e) => setSelectedPricingTierId(e.target.value as any)}
              className="w-full bg-slate-800 border border-slate-700 text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-amber-500"
            >
              <option value="tier_a">Tier A: Custom Website / Booking (₹4,499 reg)</option>
              <option value="tier_b">Tier B: Business System + Dashboard (₹9,999 reg)</option>
              {category === 'restaurant' && (
                <option value="restaurant_special">Restaurant Special: QR Menu (₹2,999 reg)</option>
              )}
              <option value="tier_c">Tier C: Full Custom Software (Custom Quote)</option>
            </select>
          </div>

          {/* Floor Price Safety Guard Notice (PRESENTER ONLY) */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
                Floor Price Guard (Presenter Internal)
              </span>
              <span className="font-bold text-amber-400">
                ₹{floorPrice.toLocaleString('en-IN')} min
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              Never quote below this floor to safeguard margin. The UI warns if exceeded.
            </p>
          </div>

          {/* Quick Discount Presets */}
          <div className="space-y-2 pt-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Quick Negotiation Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => applyDiscountPercent(10)}
                className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
              >
                10% Discount
              </button>
              <button
                type="button"
                onClick={() => applyDiscountPercent(15)}
                className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
              >
                15% Discount
              </button>
              <button
                type="button"
                onClick={() => applyFlatDiscount(500)}
                className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
              >
                ₹500 Off
              </button>
              <button
                type="button"
                onClick={() => applyFlatDiscount(1000)}
                className="py-1.5 px-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition"
              >
                ₹1,000 Off
              </button>
            </div>
          </div>

          {/* Custom Price Input */}
          <form onSubmit={handleCustomPriceSubmit} className="space-y-2 pt-1">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
              Custom Negotiated Price
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  placeholder={String(activeOfferPrice)}
                  value={enteredPrice}
                  onChange={(e) => setEnteredPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition"
              >
                Apply
              </button>
            </div>

            {/* Floor Price Warning Prompt if user types below floor */}
            {enteredPrice && parseInt(enteredPrice, 10) < floorPrice && (
              <div className="p-2.5 bg-rose-500/15 border border-rose-500/30 rounded-xl text-xs space-y-1.5 text-rose-300">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>Below Minimum Floor Price (₹{floorPrice})</span>
                </div>
                <p className="text-[11px] text-rose-300/80">
                  This custom quote is lower than the recommended floor for {currentTierConfig.name}.
                </p>
                <label className="flex items-center gap-2 text-[11px] cursor-pointer pt-0.5 text-white">
                  <input
                    type="checkbox"
                    checked={overrideWarningConfirmed}
                    onChange={(e) => setOverrideWarningConfirmed(e.target.checked)}
                    className="rounded text-rose-500 focus:ring-0"
                  />
                  <span>I understand and confirm this override</span>
                </label>
              </div>
            )}
          </form>

          {/* Advance Percentage Selector */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-400 uppercase tracking-wider">
                Advance Payment Split
              </span>
              <span className="font-bold text-emerald-400">{advancePercentage}% Today</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs text-center">
              {[40, 50, 60].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setAdvancePercentage(pct)}
                  className={`py-1 rounded-lg font-medium transition ${
                    advancePercentage === pct
                      ? 'bg-emerald-600 text-white font-bold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {pct}% Advance
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Calculation Summary & Bottom Actions */}
        <div className="pt-6 border-t border-slate-800 space-y-4">
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span>Regular Price:</span>
              <span className="line-through">₹{regularPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between font-bold text-white">
              <span>Final Quoted Offer:</span>
              <span className="text-base text-amber-400">₹{activeOfferPrice.toLocaleString('en-IN')}</span>
            </div>
            {savings > 0 && (
              <div className="flex items-center justify-between text-emerald-400 font-semibold text-[11px]">
                <span>Prospect Saves:</span>
                <span>₹{savings.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-slate-300 text-[11px]">
              <span>Today's Advance ({advancePercentage}%):</span>
              <span className="font-bold text-emerald-400">₹{advanceAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between text-slate-400 text-[11px]">
              <span>On Delivery Remaining:</span>
              <span className="font-semibold text-slate-200">₹{remainingAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetOffer}
              className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs border border-slate-700 transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              type="button"
              onClick={() => setIsNegotiationDrawerOpen(false)}
              className="flex-1 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow transition text-center"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
