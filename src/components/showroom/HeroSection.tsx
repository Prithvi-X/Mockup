import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';

export const HeroSection: React.FC = () => {

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-neutral-900">
      {/* Subtle radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Subtle pill tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-300 mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Interactive Master Sales Showroom</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          Software built around{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-100 via-indigo-200 to-indigo-400">
            your business.
          </span>
        </h1>

        {/* Supporting Copy */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-normal">
          From booking systems and customer dashboards to complete business websites, we build simple software that fits the way your business actually works.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            onClick={() => scrollToSection('categories')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-neutral-950 font-semibold text-sm hover:bg-neutral-200 shadow-lg shadow-white/5 transition-all transform active:scale-98"
          >
            <span>Explore Demos</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection('solutions')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-900/90 text-neutral-200 font-semibold text-sm border border-neutral-800 hover:bg-neutral-800 hover:text-white transition-all"
          >
            <span>See Solutions</span>
          </button>
        </div>

        {/* Value Proposition Badge */}
        <div className="mt-10 pt-6 border-t border-neutral-900 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-neutral-400">
          <span className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Fast setup
          </span>
          <span className="text-neutral-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            Custom workflows
          </span>
          <span className="text-neutral-700 hidden sm:inline">•</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            No unnecessary complexity
          </span>
        </div>
      </div>
    </section>
  );
};
