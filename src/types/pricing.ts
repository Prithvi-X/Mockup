import { BusinessCategory } from './showroom';

export type DealMode = 'standard' | 'launch_offer' | 'special_discount' | 'custom_quote';

export type PricingTierId = 'website' | 'booking' | 'dashboard' | 'custom';

export interface PricingTierConfig {
  id: PricingTierId;
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  regularPrice: number; // e.g. 20000, 30000, 45000, 60000
  regularPriceDisplay?: string; // e.g. "₹60,000–₹1,00,000+"
  offerPrice: number;   // e.g. 7500, 10000, 15000, 20000
  offerPriceDisplay?: string; // e.g. "Starting ₹20,000 / Custom Quote"
  floorPrice: number;   // PRESENTER-ONLY safety guard (e.g. 5000, 8000, 12000, 20000)
  defaultAdvancePercent: number; // default 50%
  description: string;
  features: string[];
  inclusionsByCategory: Record<BusinessCategory, string[]>;
  isQuote?: boolean;
}

export interface CompetitorBenchmark {
  name: string;
  category: BusinessCategory | 'general';
  typicalPricing: string;
  billingModel: 'Monthly SaaS' | 'One-Time Project' | 'Custom';
  note: string;
}

export interface BonusOfferConfig {
  title: string;
  durationText: string;
  exactHeadline: string; // "ReviewBro.in included free for 2 months"
  description: string;
  configurableValue?: number; // Only shown if explicitly set
}

export interface PricingState {
  dealMode: DealMode;
  selectedTierId: PricingTierId;
  customPriceOverrides: Record<string, number>;
  advancePercentage: number; // default 50
  isNegotiationDrawerOpen: boolean; // Presenter-only drawer
  monthlyComparisonRate: number; // default 999 for interactive calculator
}

export interface PricingConfig {
  tiers: {
    website: PricingTierConfig;
    booking: PricingTierConfig;
    dashboard: PricingTierConfig;
    custom: PricingTierConfig;
  };
  bonus: BonusOfferConfig;
  competitors: CompetitorBenchmark[];
  structuralComparison: {
    feature: string;
    saas: string;
    agency: string;
    ourSolution: string;
  }[];
  disclaimers: {
    indicativePricing: string;
    paymentStructureOnly: string;
    structuralComparisonFootnote: string;
    honestUrgency: string;
  };
}
