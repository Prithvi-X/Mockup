import React, { useState } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Sparkles, ArrowRight, Menu, X, Layers, Zap } from 'lucide-react';

export const MasterHeader: React.FC = () => {
  const { setIsBookDemoOpen, openDemo, setIsSalesModeOpen } = useDemo();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-800/80 bg-neutral-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white font-bold tracking-wider shadow-inner">
            <Layers className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-white">
              ATMAN
            </span>
            <span className="text-[11px] font-medium tracking-wider text-neutral-400 ml-1.5 uppercase hidden sm:inline">
              Software
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-400">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-white transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('solutions')}
            className="hover:text-white transition"
          >
            Solutions
          </button>
          <button
            onClick={() => scrollToSection('categories')}
            className="hover:text-white transition"
          >
            Demos
          </button>
          <button
            onClick={() => openDemo('custom')}
            className="hover:text-white flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Custom Software
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => setIsSalesModeOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 px-3.5 py-2 rounded-lg shadow-sm shadow-amber-500/20 active:scale-95 transition"
            title="Open Field-Ready Sales Mode Launcher (Q)"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Sales Mode</span>
          </button>
          <button
            onClick={() => scrollToSection('categories')}
            className="text-xs font-medium text-neutral-300 hover:text-white px-3.5 py-2 rounded-lg hover:bg-neutral-900 transition"
          >
            Explore Demos
          </button>
          <button
            onClick={() => setIsBookDemoOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg shadow-sm shadow-indigo-900/30 transition"
          >
            Book a Demo
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-4 pt-2 pb-5 space-y-3">
          <button
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-300 hover:text-white"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('solutions')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-300 hover:text-white"
          >
            Solutions
          </button>
          <button
            onClick={() => scrollToSection('categories')}
            className="block w-full text-left py-2 text-sm font-medium text-neutral-300 hover:text-white"
          >
            Demos
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openDemo('custom');
            }}
            className="block w-full text-left py-2 text-sm font-medium text-indigo-400 hover:text-indigo-300"
          >
            Custom Software
          </button>
          <div className="pt-2 border-t border-neutral-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSalesModeOpen(true);
              }}
              className="w-full text-center py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Launch Sales Mode</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookDemoOpen(true);
              }}
              className="w-full text-center py-2.5 text-xs font-semibold text-white bg-indigo-600 rounded-lg shadow"
            >
              Book a Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
