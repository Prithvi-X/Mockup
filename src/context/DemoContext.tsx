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
          accentBg: 'bg-rose-500',
          accentText: 'text-rose-400',
          accentBorder: 'border-rose-500/30',
          accentBadge: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
          accentButton: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-950/40',
          accentGradient: 'from-rose-500/20 via-rose-500/5 to-transparent'
        };
      case 'emerald':
        return {
          accentBg: 'bg-emerald-500',
          accentText: 'text-emerald-400',
          accentBorder: 'border-emerald-500/30',
          accentBadge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
          accentButton: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40',
          accentGradient: 'from-emerald-500/20 via-emerald-500/5 to-transparent'
        };
      case 'amber':
        return {
          accentBg: 'bg-amber-500',
          accentText: 'text-amber-400',
          accentBorder: 'border-amber-500/30',
          accentBadge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
          accentButton: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-950/40',
          accentGradient: 'from-amber-500/20 via-amber-500/5 to-transparent'
        };
      case 'cyan':
        return {
          accentBg: 'bg-cyan-500',
          accentText: 'text-cyan-400',
          accentBorder: 'border-cyan-500/30',
          accentBadge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
          accentButton: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-950/40',
          accentGradient: 'from-cyan-500/20 via-cyan-500/5 to-transparent'
        };
      case 'violet':
        return {
          accentBg: 'bg-violet-500',
          accentText: 'text-violet-400',
          accentBorder: 'border-violet-500/30',
          accentBadge: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
          accentButton: 'bg-violet-600 hover:bg-violet-500 text-white shadow-violet-950/40',
          accentGradient: 'from-violet-500/20 via-violet-500/5 to-transparent'
        };
      case 'sky':
        return {
          accentBg: 'bg-sky-500',
          accentText: 'text-sky-400',
          accentBorder: 'border-sky-500/30',
          accentBadge: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
          accentButton: 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-950/40',
          accentGradient: 'from-sky-500/20 via-sky-500/5 to-transparent'
        };
      case 'slate':
        return {
          accentBg: 'bg-slate-400',
          accentText: 'text-slate-300',
          accentBorder: 'border-slate-400/30',
          accentBadge: 'bg-slate-500/10 text-slate-300 border-slate-400/20',
          accentButton: 'bg-slate-700 hover:bg-slate-600 text-white shadow-slate-950/40',
          accentGradient: 'from-slate-500/20 via-slate-500/5 to-transparent'
        };
      case 'indigo':
      default:
        return {
          accentBg: 'bg-indigo-500',
          accentText: 'text-indigo-400',
          accentBorder: 'border-indigo-500/30',
          accentBadge: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
          accentButton: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950/40',
          accentGradient: 'from-indigo-500/20 via-indigo-500/5 to-transparent'
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
