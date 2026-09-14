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
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gray-900 border border-gray-900 flex items-center justify-center text-white font-bold tracking-wider shadow-2xs">
            <Layers className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-extrabold text-base sm:text-lg tracking-tight text-gray-900">
              ATMAN
            </span>
            <span className="text-[11px] font-semibold tracking-wider text-gray-500 ml-1.5 uppercase hidden sm:inline">
              Software
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-600">
          <button
            onClick={() => scrollToSection('hero')}
            className="hover:text-gray-900 transition"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('solutions')}
            className="hover:text-gray-900 transition"
          >
            Solutions
          </button>
          <button
            onClick={() => scrollToSection('categories')}
            className="hover:text-gray-900 transition"
          >
            Demos
          </button>
          <button
            onClick={() => openDemo('custom')}
            className="hover:text-indigo-700 flex items-center gap-1 text-indigo-600 transition font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Custom Software
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => setIsSalesModeOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 px-3 py-1.5 rounded-lg shadow-2xs active:scale-95 transition"
            title="Open Field-Ready Sales Mode Launcher (Q)"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-amber-600" />
            <span>Sales Mode</span>
          </button>
          <button
            onClick={() => scrollToSection('categories')}
            className="text-xs font-medium text-gray-700 hover:text-gray-900 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition"
          >
            Explore Demos
          </button>
          <button
            onClick={() => setIsBookDemoOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-3.5 py-1.5 rounded-lg shadow-xs transition"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white px-4 pt-2 pb-5 space-y-2">
          <button
            onClick={() => scrollToSection('hero')}
            className="block w-full text-left py-2 px-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection('solutions')}
            className="block w-full text-left py-2 px-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Solutions
          </button>
          <button
            onClick={() => scrollToSection('categories')}
            className="block w-full text-left py-2 px-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            Demos
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openDemo('custom');
            }}
            className="block w-full text-left py-2 px-2 rounded-lg text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50"
          >
            Custom Software
          </button>
          <div className="pt-2 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSalesModeOpen(true);
              }}
              className="w-full text-center py-2 text-xs font-semibold text-amber-900 bg-amber-50 border border-amber-300 hover:bg-amber-100 rounded-lg shadow-2xs flex items-center justify-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 fill-current text-amber-600" />
              <span>Launch Sales Mode</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsBookDemoOpen(true);
              }}
              className="w-full text-center py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
            >
              Book a Demo
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
