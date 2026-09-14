import { BusinessCategory, DemoViewMode } from './showroom';

export type DemoSpeedMode = 'quick' | 'guided' | 'explore';

export interface QuickDemoStep {
  stepIndex: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  viewMode: DemoViewMode;
  targetDescription: string;
  sidebarTab?: string;
  wowMoment?: {
    title: string;
    description: string;
  };
}

export interface QuickDemoScenario {
  category: BusinessCategory;
  industryLabel: string;
  durationEstimate: string;
  steps: QuickDemoStep[];
  defaultValues: Record<string, unknown>;
}

export interface PackageCard {
  id: string;
  title: string;
  tag: string;
  description: string;
  startingPrice: number;
  isPopular?: boolean;
  features: string[];
}

export interface SalesRequirementInquiry {
  businessName: string;
  contactName: string;
  phone: string;
  category: BusinessCategory;
  modules: string[];
  budgetTier: string;
  notes: string;
  timestamp: string;
}
