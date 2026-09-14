import { BusinessCategory } from './showroom';

export type DealMode = 'standard' | 'launch_offer' | 'special_discount' | 'custom_quote';

export interface PricingTierConfig {
  id: 'tier_a' | 'tier_b' | 'tier_c' | 'restaurant_special';
  name: string;
  tagline: string;
  badge?: string;
  isPopular?: boolean;
  regularPrice: number; // e.g. 4499 or 9999
  offerPrice: number;   // e.g. 3499 or 7499
  floorPrice: number;   // PRESENTER-ONLY safety guard (e.g. 2500, 5500)
  defaultAdvancePercent: number; // default 50%
  description: string;
  features: string[];
  inclusionsByCategory: Record<BusinessCategory, string[]>;
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
  selectedTierId: 'tier_a' | 'tier_b' | 'tier_c' | 'restaurant_special';
  customPriceOverrides: Record<string, number>;
  advancePercentage: number; // default 50
  isNegotiationDrawerOpen: boolean; // Presenter-only drawer
  monthlyComparisonRate: number; // default 999 for interactive calculator
}

export interface PricingConfig {
  tiers: {
    tier_a: PricingTierConfig;
    tier_b: PricingTierConfig;
    tier_c: PricingTierConfig;
    restaurant_special: PricingTierConfig;
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
