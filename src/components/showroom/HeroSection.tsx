import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-xs text-gray-700 mb-6 shadow-2xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
          <span>Interactive Master Sales Showroom</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-gray-900 max-w-4xl mx-auto leading-[1.15]">
          Software built around{' '}
          <span className="text-indigo-600">
            your business.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-5 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
          From booking systems and customer dashboards to complete business websites, we build simple software that fits the way your business actually works.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => scrollToSection('categories')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-gray-900 text-white font-medium text-sm hover:bg-gray-800 shadow-xs transition-colors"
          >
            <span>Explore Demos</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection('solutions')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white text-gray-700 font-medium text-sm border border-gray-200 hover:bg-gray-50 hover:text-gray-900 shadow-2xs transition-colors"
          >
            <span>See Solutions</span>
          </button>
        </div>

        {/* Value Proposition Badge */}
        <div className="mt-10 pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            Fast setup
          </span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
            Custom workflows
          </span>
          <span className="text-gray-300 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            No unnecessary complexity
          </span>
        </div>
      </div>
    </section>
  );
};
