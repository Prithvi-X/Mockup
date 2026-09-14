import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Zap, 
  Globe, 
  Smartphone, 
  LayoutDashboard, 
  Sliders, 
  RotateCcw, 
  FileText, 
  Home, 
  Maximize2, 
  X,
  Scissors,
  Building2,
  Utensils,
  Dumbbell,
  Stethoscope,
  Briefcase,
  IndianRupee
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { useWorkflow } from '../../context/WorkflowContext';
import { BusinessCategory } from '../../types/showroom';

interface CommandItem {
  id: string;
  title: string;
  category: 'Demos' | 'Views' | 'Presenter';
  icon: React.ElementType;
  badge?: string;
  action: () => void;
}

export const QuickAccessPalette: React.FC = () => {
  const { 
    isQuickAccessOpen, 
    setIsQuickAccessOpen,
    openDemo,
    setViewMode,
    returnToShowroom,
    setIsCustomizeOpen,
    setIsSalesModeOpen,
    setIsDemoHandoffOpen,
    setIsPresentationMode,
    resetDemo,
    showToast
  } = useDemo();

  const { startQuickDemo } = useWorkflow();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isQuickAccessOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isQuickAccessOpen]);

  if (!isQuickAccessOpen) return null;

  const launchDemoAction = (cat: BusinessCategory, name: string) => {
    setIsQuickAccessOpen(false);
    openDemo(cat, 'website');
    startQuickDemo(cat, 'quick');
    showToast(`⚡ Running 60s demo for ${name}`);
  };

  const commands: CommandItem[] = [
    // Demos
    {
      id: 'demo-salon',
      title: 'Salon & Spa — 60s Quick Demo',
      category: 'Demos',
      icon: Scissors,
      badge: '60s',
      action: () => launchDemoAction('salon', 'Salon & Spa')
    },
    {
      id: 'demo-hotel',
      title: 'Hotel & Hospitality — 60s Quick Demo',
      category: 'Demos',
      icon: Building2,
      badge: '60s',
      action: () => launchDemoAction('hotel', 'Hotel & Resort')
    },
    {
      id: 'demo-restaurant',
      title: 'Restaurant & Dining — 60s Quick Demo',
      category: 'Demos',
      icon: Utensils,
      badge: '60s',
      action: () => launchDemoAction('restaurant', 'Dine-In Restaurant')
    },
    {
      id: 'demo-gym',
      title: 'Fitness & Gym Club — 60s Quick Demo',
      category: 'Demos',
      icon: Dumbbell,
      badge: '60s',
      action: () => launchDemoAction('gym', 'Fitness & Gym')
    },
    {
      id: 'demo-clinic',
      title: 'Healthcare Clinic — 60s Quick Demo',
      category: 'Demos',
      icon: Stethoscope,
      badge: '60s',
      action: () => launchDemoAction('clinic', 'Healthcare Clinic')
    },
    {
      id: 'demo-crm',
      title: 'Field CRM & Sales — 60s Quick Demo',
      category: 'Demos',
      icon: Briefcase,
      badge: '60s',
      action: () => launchDemoAction('crm', 'Field CRM & Leads')
    },
    // Views
    {
      id: 'view-website',
      title: 'Switch to Official Website Storefront',
      category: 'Views',
      icon: Globe,
      action: () => {
        setIsQuickAccessOpen(false);
        setViewMode('website');
      }
    },
    {
      id: 'view-customer',
      title: 'Switch to Customer Self-Service View',
      category: 'Views',
      icon: Smartphone,
      action: () => {
        setIsQuickAccessOpen(false);
        setViewMode('customer');
      }
    },
    {
      id: 'view-dashboard',
      title: 'Switch to Owner Operations Dashboard',
      category: 'Views',
      icon: LayoutDashboard,
      action: () => {
        setIsQuickAccessOpen(false);
        setViewMode('dashboard');
      }
    },
    {
      id: 'view-pricing',
      title: 'Switch to Pricing & Sales Offer Presentation',
      category: 'Views',
      icon: IndianRupee,
      badge: 'O',
      action: () => {
        setIsQuickAccessOpen(false);
        setViewMode('pricing');
      }
    },
    // Presenter
    {
      id: 'pres-sales-mode',
      title: 'Open Sales Mode Launcher (Rapid Prospect Setup)',
      category: 'Presenter',
      icon: Zap,
      badge: 'Q',
      action: () => {
        setIsQuickAccessOpen(false);
        setIsSalesModeOpen(true);
      }
    },
    {
      id: 'pres-customize',
      title: 'Open Live Business Customizer',
      category: 'Presenter',
      icon: Sliders,
      badge: 'C',
      action: () => {
        setIsQuickAccessOpen(false);
        setIsCustomizeOpen(true);
      }
    },
    {
      id: 'pres-packages',
      title: 'Open Package Quotation Cards & Intake',
      category: 'Presenter',
      icon: FileText,
      badge: 'H',
      action: () => {
        setIsQuickAccessOpen(false);
        setIsDemoHandoffOpen(true);
      }
    },
    {
      id: 'pres-presentation-mode',
      title: 'Toggle Distraction-Free Presentation Mode',
      category: 'Presenter',
      icon: Maximize2,
      badge: 'P',
      action: () => {
        setIsQuickAccessOpen(false);
        setIsPresentationMode(prev => !prev);
      }
    },
    {
      id: 'pres-reset',
      title: 'Reset Demo for Next Prospect',
      category: 'Presenter',
      icon: RotateCcw,
      badge: 'R',
      action: () => {
        setIsQuickAccessOpen(false);
        resetDemo();
      }
    },
    {
      id: 'pres-showroom',
      title: 'Return to Master Showroom Hub',
      category: 'Presenter',
      icon: Home,
      action: () => {
        setIsQuickAccessOpen(false);
        returnToShowroom();
      }
    }
  ];

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase()) ||
    cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      setIsQuickAccessOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md">
      <div 
        className="w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 animate-in fade-in zoom-in-95 duration-150"
        onKeyDown={handleKeyDown}
      >
        {/* Search Box */}
        <div className="flex items-center px-4 border-b border-slate-800 bg-slate-900/90">
          <Search className="w-5 h-5 text-slate-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to demo... (e.g. Salon, Reset, Quote)"
            className="w-full py-3.5 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
          />
          <span className="text-[10px] font-mono text-slate-500 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
            ESC
          </span>
        </div>

        {/* Command List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-500">
              No matching commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors ${
                    isSelected 
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30' 
                      : 'text-slate-300 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="truncate">
                      <span className="font-medium">{cmd.title}</span>
                      <span className="ml-2 text-[10px] text-slate-500 uppercase tracking-wider">{cmd.category}</span>
                    </div>
                  </div>

                  {cmd.badge && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-400">
                      {cmd.badge}
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <span>ATMAN Presenter Palette</span>
        </div>
      </div>
    </div>
  );
};
