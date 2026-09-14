import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { BusinessCategory, CustomizationState, DemoViewMode } from '../types/showroom';
import { DemoSpeedMode } from '../types/salesMode';
import { DealMode } from '../types/pricing';
import { BUSINESS_DATA_MAP } from '../data/mockBusinesses';

const STORAGE_KEY = 'atman_demo_customizations_v2';
const RECENT_KEY = 'atman_recent_demos';
const PINNED_KEY = 'atman_pinned_demos';

interface DemoContextType {
  screen: 'showroom' | 'demo';
  category: BusinessCategory;
  viewMode: DemoViewMode;
  activeSidebarTab: string;
  customization: CustomizationState;
  isCustomized: boolean;
  
  // Phase 4 Speed & Sales Presentation modes
  demoSpeedMode: DemoSpeedMode;
  setDemoSpeedMode: (mode: DemoSpeedMode) => void;
  isPresentationMode: boolean;
  setIsPresentationMode: React.Dispatch<React.SetStateAction<boolean>>;
  isSalesModeOpen: boolean;
  setIsSalesModeOpen: (open: boolean) => void;
  isQuickAccessOpen: boolean;
  setIsQuickAccessOpen: (open: boolean) => void;
  isDemoHandoffOpen: boolean;
  setIsDemoHandoffOpen: (open: boolean) => void;
  recentDemos: BusinessCategory[];
  pinnedDemos: BusinessCategory[];
  pinDemo: (cat: BusinessCategory) => void;
  unpinDemo: (cat: BusinessCategory) => void;

  // Phase 5 Pricing, Competitor Comparison & Sales Offer Engine
  dealMode: DealMode;
  setDealMode: (mode: DealMode) => void;
  selectedPricingTierId: 'tier_a' | 'tier_b' | 'tier_c' | 'restaurant_special';
  setSelectedPricingTierId: (id: 'tier_a' | 'tier_b' | 'tier_c' | 'restaurant_special') => void;
  customPriceOverrides: Record<string, number>;
  setCustomPriceOverride: (tierId: string, price: number) => void;
  advancePercentage: number;
  setAdvancePercentage: (pct: number) => void;
  isNegotiationDrawerOpen: boolean;
  setIsNegotiationDrawerOpen: (open: boolean) => void;
  openPricingForCategory: (cat?: BusinessCategory) => void;

  // Modals
  isCustomizeOpen: boolean;
  isQuickCustomizeOpen: boolean;
  isRequestBuildOpen: boolean;
  isResetConfirmOpen: boolean;
  isBookDemoOpen: boolean;
  toast: string | null;

  // Actions
  openDemo: (cat: BusinessCategory, mode?: DemoViewMode) => void;
  switchCategory: (cat: BusinessCategory) => void;
  setViewMode: (mode: DemoViewMode) => void;
  setActiveSidebarTab: (tab: string) => void;
  returnToShowroom: () => void;
  updateCustomization: (updates: Partial<CustomizationState>) => void;
  resetDemo: () => void;
  hardResetDemo: () => void;
  setIsCustomizeOpen: (open: boolean) => void;
  setIsQuickCustomizeOpen: (open: boolean) => void;
  setIsRequestBuildOpen: (open: boolean) => void;
  setIsResetConfirmOpen: (open: boolean) => void;
  setIsBookDemoOpen: (open: boolean) => void;
  showToast: (message: string) => void;
  themeClasses: {
    accentBg: string;
    accentText: string;
    accentBorder: string;
    accentBadge: string;
    accentButton: string;
    accentGradient: string;
  };
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export const DemoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<'showroom' | 'demo'>('showroom');
  const [category, setCategory] = useState<BusinessCategory>('salon');
  const [viewMode, setViewMode] = useState<DemoViewMode>('dashboard');
  const [activeSidebarTab, setActiveSidebarTab] = useState<string>('overview');
  
  // Phase 4 Speed & Sales Modes
  const [demoSpeedMode, setDemoSpeedMode] = useState<DemoSpeedMode>('explore');
  const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false);
  const [isSalesModeOpen, setIsSalesModeOpen] = useState<boolean>(false);
  const [isQuickAccessOpen, setIsQuickAccessOpen] = useState<boolean>(false);
  const [isDemoHandoffOpen, setIsDemoHandoffOpen] = useState<boolean>(false);

  // Recent & Pinned Demos stored locally
  const [recentDemos, setRecentDemos] = useState<BusinessCategory[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return ['salon', 'hotel', 'restaurant'];
  });

  const [pinnedDemos, setPinnedDemos] = useState<BusinessCategory[]>(() => {
    try {
      const saved = localStorage.getItem(PINNED_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return ['salon', 'restaurant', 'gym'];
  });

  // Phase 5 Pricing & Sales Offer Engine
  const [dealMode, setDealMode] = useState<DealMode>('launch_offer');
  const [selectedPricingTierId, setSelectedPricingTierId] = useState<'tier_a' | 'tier_b' | 'tier_c' | 'restaurant_special'>('tier_a');
  const [customPriceOverrides, setCustomPriceOverrides] = useState<Record<string, number>>({});
  const [advancePercentage, setAdvancePercentage] = useState<number>(50);
  const [isNegotiationDrawerOpen, setIsNegotiationDrawerOpen] = useState<boolean>(false);

  const setCustomPriceOverride = (tierId: string, price: number) => {
    setCustomPriceOverrides(prev => ({ ...prev, [tierId]: price }));
  };

  const getCategoryDefaultTier = (cat: BusinessCategory): 'tier_a' | 'tier_b' | 'tier_c' | 'restaurant_special' => {
    switch (cat) {
      case 'salon': return 'tier_a';
      case 'hotel': return 'tier_b';
      case 'restaurant': return 'restaurant_special';
      case 'gym': return 'tier_b';
      case 'clinic': return 'tier_b';
      case 'crm':
      case 'custom':
      default: return 'tier_c';
    }
  };

  const openPricingForCategory = (cat: BusinessCategory = category) => {
    setCategory(cat);
    setSelectedPricingTierId(getCategoryDefaultTier(cat));
    setViewMode('pricing');
    setScreen('demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Modals
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);
  const [isQuickCustomizeOpen, setIsQuickCustomizeOpen] = useState<boolean>(false);
  const [isRequestBuildOpen, setIsRequestBuildOpen] = useState<boolean>(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);
  const [isBookDemoOpen, setIsBookDemoOpen] = useState<boolean>(false);
  
  const [toast, setToast] = useState<string | null>(null);

  // Initialize per-business customization map from localStorage if available
  const [customizations, setCustomizations] = useState<Record<BusinessCategory, CustomizationState>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const initialMap = {} as Record<BusinessCategory, CustomizationState>;
        (['salon', 'hotel', 'restaurant', 'gym', 'clinic', 'crm', 'custom'] as BusinessCategory[]).forEach(cat => {
          initialMap[cat] = {
            ...BUSINESS_DATA_MAP[cat].defaultCustomization,
            ...(parsed[cat] || {})
          };
        });
        return initialMap;
      }
    } catch (e) {
      console.error('Failed to load customizations from localStorage', e);
    }

    const map = {} as Record<BusinessCategory, CustomizationState>;
    (['salon', 'hotel', 'restaurant', 'gym', 'clinic', 'crm', 'custom'] as BusinessCategory[]).forEach(cat => {
      map[cat] = { ...BUSINESS_DATA_MAP[cat].defaultCustomization };
    });
    return map;
  });

  // Persist customizations to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customizations));
    } catch (e) {
      console.warn('Unable to persist customizations to localStorage', e);
    }
  }, [customizations]);

  // Persist recent demos
  const recordRecent = (cat: BusinessCategory) => {
    setRecentDemos((prev) => {
      const filtered = prev.filter((c) => c !== cat);
      const next = [cat, ...filtered].slice(0, 5);
      try {
        localStorage.setItem(RECENT_KEY, JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const pinDemo = (cat: BusinessCategory) => {
    setPinnedDemos((prev) => {
      if (prev.includes(cat)) return prev;
      const next = [...prev, cat];
      try {
        localStorage.setItem(PINNED_KEY, JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const unpinDemo = (cat: BusinessCategory) => {
    setPinnedDemos((prev) => {
      const next = prev.filter((c) => c !== cat);
      try {
        localStorage.setItem(PINNED_KEY, JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast((prev) => (prev === message ? null : prev));
    }, 3200);
  };

  const openDemo = (cat: BusinessCategory, mode: DemoViewMode = 'dashboard') => {
    setCategory(cat);
    setSelectedPricingTierId(getCategoryDefaultTier(cat));
    setViewMode(mode);
    setActiveSidebarTab('overview');
    setScreen('demo');
    recordRecent(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchCategory = (cat: BusinessCategory) => {
    setCategory(cat);
    setSelectedPricingTierId(getCategoryDefaultTier(cat));
    setActiveSidebarTab('overview');
    recordRecent(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Switched to ${BUSINESS_DATA_MAP[cat].name}`);
  };

  const returnToShowroom = () => {
    setScreen('showroom');
    setDemoSpeedMode('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateCustomization = (updates: Partial<CustomizationState>) => {
    setCustomizations(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        ...updates
      }
    }));
    setIsCustomizeOpen(false);
    setIsQuickCustomizeOpen(false);
    showToast('Applied custom business preview!');
  };

  const resetDemo = () => {
    setCustomizations(prev => {
      const next = {
        ...prev,
        [category]: { ...BUSINESS_DATA_MAP[category].defaultCustomization }
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
    setDealMode('launch_offer');
    setAdvancePercentage(50);
    setCustomPriceOverrides({});
    setIsNegotiationDrawerOpen(false);
    setSelectedPricingTierId(getCategoryDefaultTier(category));
    setIsResetConfirmOpen(false);
    setActiveSidebarTab('overview');
    setViewMode('dashboard');
    showToast('Demo data reset to default showroom template.');
  };

  const hardResetDemo = () => {
    const map = {} as Record<BusinessCategory, CustomizationState>;
    (['salon', 'hotel', 'restaurant', 'gym', 'clinic', 'crm', 'custom'] as BusinessCategory[]).forEach(cat => {
      map[cat] = { ...BUSINESS_DATA_MAP[cat].defaultCustomization };
    });
    setCustomizations(map);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    setDealMode('launch_offer');
    setAdvancePercentage(50);
    setCustomPriceOverrides({});
    setIsNegotiationDrawerOpen(false);
    setSelectedPricingTierId(getCategoryDefaultTier('salon'));
    setDemoSpeedMode('explore');
    setViewMode('dashboard');
    setActiveSidebarTab('overview');
    setIsResetConfirmOpen(false);
    showToast('Hardened Reset: All showroom businesses restored to default.');
  };

  const currentCustomization = customizations[category] || BUSINESS_DATA_MAP[category].defaultCustomization;

  const isCustomized = useMemo(() => {
    const defaultData = BUSINESS_DATA_MAP[category].defaultCustomization;
    if (!currentCustomization || !defaultData) return false;
    return (
      currentCustomization.businessName !== defaultData.businessName ||
      currentCustomization.tagline !== defaultData.tagline ||
      currentCustomization.accentColor !== defaultData.accentColor ||
      currentCustomization.phone !== defaultData.phone ||
      currentCustomization.whatsapp !== defaultData.whatsapp ||
      currentCustomization.address !== defaultData.address ||
      Boolean(currentCustomization.logoUrl) ||
      JSON.stringify(currentCustomization.salonServices) !== JSON.stringify(defaultData.salonServices) ||
      JSON.stringify(currentCustomization.hotelRoomsList) !== JSON.stringify(defaultData.hotelRoomsList) ||
      JSON.stringify(currentCustomization.restaurantMenuList) !== JSON.stringify(defaultData.restaurantMenuList) ||
      JSON.stringify(currentCustomization.gymPlansList) !== JSON.stringify(defaultData.gymPlansList) ||
      JSON.stringify(currentCustomization.clinicDoctorsList) !== JSON.stringify(defaultData.clinicDoctorsList)
    );
  }, [category, currentCustomization]);

  const themeClasses = useMemo(() => {
    const color = currentCustomization.accentColor || 'indigo';
    switch (color) {
      case 'rose':
        return {
          accentBg: 'bg-rose-600',
          accentText: 'text-rose-700',
          accentBorder: 'border-rose-200',
          accentBadge: 'bg-rose-50 text-rose-700 border-rose-200',
          accentButton: 'bg-rose-600 hover:bg-rose-700 text-white',
          accentGradient: 'bg-rose-50'
        };
      case 'emerald':
        return {
          accentBg: 'bg-emerald-600',
          accentText: 'text-emerald-700',
          accentBorder: 'border-emerald-200',
          accentBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          accentButton: 'bg-emerald-600 hover:bg-emerald-700 text-white',
          accentGradient: 'bg-emerald-50'
        };
      case 'amber':
        return {
          accentBg: 'bg-amber-600',
          accentText: 'text-amber-800',
          accentBorder: 'border-amber-200',
          accentBadge: 'bg-amber-50 text-amber-800 border-amber-200',
          accentButton: 'bg-amber-600 hover:bg-amber-700 text-white',
          accentGradient: 'bg-amber-50'
        };
      case 'cyan':
        return {
          accentBg: 'bg-cyan-600',
          accentText: 'text-cyan-800',
          accentBorder: 'border-cyan-200',
          accentBadge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
          accentButton: 'bg-cyan-600 hover:bg-cyan-700 text-white',
          accentGradient: 'bg-cyan-50'
        };
      case 'violet':
        return {
          accentBg: 'bg-violet-600',
          accentText: 'text-violet-700',
          accentBorder: 'border-violet-200',
          accentBadge: 'bg-violet-50 text-violet-700 border-violet-200',
          accentButton: 'bg-violet-600 hover:bg-violet-700 text-white',
          accentGradient: 'bg-violet-50'
        };
      case 'sky':
        return {
          accentBg: 'bg-sky-600',
          accentText: 'text-sky-800',
          accentBorder: 'border-sky-200',
          accentBadge: 'bg-sky-50 text-sky-800 border-sky-200',
          accentButton: 'bg-sky-600 hover:bg-sky-700 text-white',
          accentGradient: 'bg-sky-50'
        };
      case 'slate':
        return {
          accentBg: 'bg-slate-700',
          accentText: 'text-slate-800',
          accentBorder: 'border-slate-200',
          accentBadge: 'bg-slate-100 text-slate-800 border-slate-200',
          accentButton: 'bg-slate-800 hover:bg-slate-900 text-white',
          accentGradient: 'bg-slate-50'
        };
      case 'indigo':
      default:
        return {
          accentBg: 'bg-indigo-600',
          accentText: 'text-indigo-700',
          accentBorder: 'border-indigo-200',
          accentBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
          accentButton: 'bg-indigo-600 hover:bg-indigo-700 text-white',
          accentGradient: 'bg-indigo-50'
        };
    }
  }, [currentCustomization.accentColor]);

  return (
    <DemoContext.Provider
      value={{
        screen,
        category,
        viewMode,
        activeSidebarTab,
        customization: currentCustomization,
        isCustomized,
        demoSpeedMode,
        setDemoSpeedMode,
        isPresentationMode,
        setIsPresentationMode,
        isSalesModeOpen,
        setIsSalesModeOpen,
        isQuickAccessOpen,
        setIsQuickAccessOpen,
        isDemoHandoffOpen,
        setIsDemoHandoffOpen,
        recentDemos,
        pinnedDemos,
        pinDemo,
        unpinDemo,
        dealMode,
        setDealMode,
        selectedPricingTierId,
        setSelectedPricingTierId,
        customPriceOverrides,
        setCustomPriceOverride,
        advancePercentage,
        setAdvancePercentage,
        isNegotiationDrawerOpen,
        setIsNegotiationDrawerOpen,
        openPricingForCategory,
        isCustomizeOpen,
        isQuickCustomizeOpen,
        isRequestBuildOpen,
        isResetConfirmOpen,
        isBookDemoOpen,
        toast,
        openDemo,
        switchCategory,
        setViewMode,
        setActiveSidebarTab,
        returnToShowroom,
        updateCustomization,
        resetDemo,
        hardResetDemo,
        setIsCustomizeOpen,
        setIsQuickCustomizeOpen,
        setIsRequestBuildOpen,
        setIsResetConfirmOpen,
        setIsBookDemoOpen,
        showToast,
        themeClasses
      }}
    >
      {children}
    </DemoContext.Provider>
  );
};

export const useDemo = () => {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
};
