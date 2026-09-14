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
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-white border-l border-gray-200 p-6 flex flex-col justify-between shadow-2xl overflow-y-auto text-gray-900">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
              <Lock className="w-3.5 h-3.5 text-amber-700" />
              <span>Presenter Negotiation Mode</span>
            </div>
            <button
              onClick={() => setIsNegotiationDrawerOpen(false)}
              className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="Close Presenter Controls"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">
              Adjust Offer & Deal Terms
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Presenter-only pricing controls. Changes update the live customer screen immediately.
            </p>
          </div>

          {/* Deal Mode Switcher */}
          <div className="space-y-1.5 pt-2">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
              Deal Mode
            </label>
            <div className="grid grid-cols-2 gap-1.5 bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs">
              {(['launch_offer', 'standard', 'special_discount', 'custom_quote'] as DealMode[]).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setDealMode(mode)}
                  className={`py-1.5 px-2 rounded-md font-medium transition-all text-center capitalize ${
                    dealMode === mode
                      ? 'bg-white text-gray-900 font-bold shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {mode.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Target Package Selector */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
              Target Package Tier
            </label>
            <select
              value={selectedPricingTierId}
              onChange={(e) => setSelectedPricingTierId(e.target.value as any)}
              className="w-full bg-white border border-gray-300 text-gray-900 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-600"
            >
              <option value="website">Business Website (₹20,000 std / ₹7,500 offer)</option>
              <option value="booking">Website + Booking System (₹30,000 std / ₹10,000 offer)</option>
              <option value="dashboard">Website + Business Dashboard (₹45,000 std / ₹15,000 offer)</option>
              <option value="custom">Custom Business Software (₹60,000+ / Custom Quote)</option>
            </select>
          </div>

          {/* Floor Price Safety Guard Notice (PRESENTER ONLY) */}
          <div className="p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-xs space-y-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-amber-800 flex items-center gap-1 font-semibold">
                <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                Floor Price Guard (Presenter Internal)
              </span>
              <span className="font-bold text-amber-900">
                ₹{floorPrice.toLocaleString('en-IN')} min
              </span>
            </div>
            <p className="text-[10px] text-amber-700">
              Never quote below this floor to safeguard margin. The UI warns if exceeded.
            </p>
          </div>

          {/* Quick Discount Presets */}
          <div className="space-y-2 pt-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
              Quick Negotiation Presets
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => applyDiscountPercent(10)}
                className="py-1.5 px-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-md text-xs font-medium border border-gray-300 transition shadow-xs"
              >
                10% Discount
              </button>
              <button
                type="button"
                onClick={() => applyDiscountPercent(15)}
                className="py-1.5 px-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-md text-xs font-medium border border-gray-300 transition shadow-xs"
              >
                15% Discount
              </button>
              <button
                type="button"
                onClick={() => applyFlatDiscount(1000)}
                className="py-1.5 px-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-md text-xs font-medium border border-gray-300 transition shadow-xs"
              >
                ₹1,000 Off
              </button>
              <button
                type="button"
                onClick={() => applyFlatDiscount(2500)}
                className="py-1.5 px-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-md text-xs font-medium border border-gray-300 transition shadow-xs"
              >
                ₹2,500 Off
              </button>
            </div>
          </div>

          {/* Custom Price Input */}
          <form onSubmit={handleCustomPriceSubmit} className="space-y-2 pt-1">
            <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
              Custom Negotiated Price
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-2.5 text-xs text-gray-400 font-bold">₹</span>
                <input
                  type="number"
                  placeholder={String(activeOfferPrice)}
                  value={enteredPrice}
                  onChange={(e) => setEnteredPrice(e.target.value)}
                  className="w-full pl-7 pr-3 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 text-xs focus:outline-none focus:border-indigo-600"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-xs transition shadow-xs"
              >
                Apply
              </button>
            </div>

            {/* Floor Price Warning Prompt if user types below floor */}
            {enteredPrice && parseInt(enteredPrice, 10) < floorPrice && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs space-y-1.5 text-rose-800">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Below Minimum Floor Price (₹{floorPrice})</span>
                </div>
                <p className="text-[11px] text-rose-700">
                  This custom quote is lower than the recommended floor for {currentTierConfig.name}.
                </p>
                <label className="flex items-center gap-2 text-[11px] cursor-pointer pt-0.5 text-gray-900 font-medium">
                  <input
                    type="checkbox"
                    checked={overrideWarningConfirmed}
                    onChange={(e) => setOverrideWarningConfirmed(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-0"
                  />
                  <span>I understand and confirm this override</span>
                </label>
              </div>
            )}
          </form>

          {/* Advance Percentage Selector */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-gray-500 uppercase tracking-wider">
                Advance Payment Split
              </span>
              <span className="font-bold text-emerald-700">{advancePercentage}% Today</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 bg-gray-100 p-1 rounded-lg border border-gray-200 text-xs text-center">
              {[40, 50, 60].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setAdvancePercentage(pct)}
                  className={`py-1 rounded-md font-medium transition ${
                    advancePercentage === pct
                      ? 'bg-emerald-600 text-white font-bold shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {pct}% Advance
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Calculation Summary & Bottom Actions */}
        <div className="pt-6 border-t border-gray-200 space-y-4">
          <div className="p-3.5 bg-gray-50 rounded-lg border border-gray-200 space-y-2 text-xs">
            <div className="flex items-center justify-between text-gray-500">
              <span>Regular Price:</span>
              <span className="line-through">₹{regularPrice.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between font-bold text-gray-900">
              <span>Final Quoted Offer:</span>
              <span className="text-base text-indigo-700">₹{activeOfferPrice.toLocaleString('en-IN')}</span>
            </div>
            {savings > 0 && (
              <div className="flex items-center justify-between text-emerald-700 font-semibold text-[11px]">
                <span>Prospect Saves:</span>
                <span>₹{savings.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-gray-700 text-[11px]">
              <span>Today's Advance ({advancePercentage}%):</span>
              <span className="font-bold text-emerald-700">₹{advanceAmount.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center justify-between text-gray-500 text-[11px]">
              <span>On Delivery Remaining:</span>
              <span className="font-semibold text-gray-900">₹{remainingAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetOffer}
              className="flex-1 py-2 rounded-md bg-white hover:bg-gray-50 text-gray-700 font-medium text-xs border border-gray-300 transition flex items-center justify-center gap-1.5 shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              type="button"
              onClick={() => setIsNegotiationDrawerOpen(false)}
              className="flex-1 py-2 rounded-md bg-gray-900 hover:bg-black text-white font-semibold text-xs shadow-xs transition text-center"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
