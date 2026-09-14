import React from 'react';
import { 
  Play, 
  Pause, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  Zap, 
  Compass, 
  Layers, 
  FileText, 
  Maximize2, 
  Minimize2, 
  X,
  Sparkles,
  Command
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { useWorkflow } from '../../context/WorkflowContext';
import { QUICK_DEMO_SCENARIOS } from '../../data/quickDemoScenarios';

export const PresenterControlBar: React.FC = () => {
  const { 
    screen, 
    category, 
    demoSpeedMode, 
    setDemoSpeedMode, 
    isPresentationMode, 
    setIsPresentationMode,
    setIsDemoHandoffOpen,
    setIsQuickAccessOpen,
    resetDemo
  } = useDemo();

  const {
    isQuickDemoRunning,
    quickDemoStep,
    isQuickDemoAutoPlay,
    startQuickDemo,
    nextQuickDemoStep,
    prevQuickDemoStep,
    startOverQuickDemo,
    exitQuickDemo,
    toggleQuickDemoAutoPlay
  } = useWorkflow();

  // Only show when in a demo screen
  if (screen !== 'demo') return null;

  const currentScenario = QUICK_DEMO_SCENARIOS[category];
  const totalSteps = currentScenario?.steps.length || 4;
  const currentStepObj = currentScenario?.steps[quickDemoStep - 1];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[calc(100%-2rem)] px-2 pointer-events-auto transition-all duration-300">
      <div className="bg-slate-900/90 hover:bg-slate-900/95 text-slate-200 backdrop-blur-xl border border-slate-700/70 shadow-2xl rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left Section: Active Demo Info & Steps */}
        <div className="flex items-center gap-3 min-w-0">
          {isQuickDemoRunning ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-semibold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20 shadow-inner whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                Step {quickDemoStep}/{totalSteps}
              </span>
              <div className="hidden sm:flex flex-col min-w-0">
                <span className="font-semibold text-white truncate max-w-[200px] md:max-w-[300px]">
                  {currentStepObj?.title || 'Interactive Step'}
                </span>
                <span className="text-[10px] text-slate-400 truncate max-w-[200px] md:max-w-[300px]">
                  {currentStepObj?.subtitle}
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => startQuickDemo(category, 'quick')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20 active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Run 60s Quick Demo</span>
            </button>
          )}

          {/* Stepper Dots (only when running) */}
          {isQuickDemoRunning && (
            <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-slate-700/60">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i + 1 === quickDemoStep
                      ? 'w-6 bg-amber-400'
                      : i + 1 < quickDemoStep
                      ? 'w-3 bg-emerald-400'
                      : 'w-2 bg-slate-700'
                  }`}
                  title={`Step ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Center: Stepper Controls (if running) */}
        {isQuickDemoRunning && (
          <div className="flex items-center gap-1.5 bg-slate-800/80 px-2 py-1 rounded-xl border border-slate-700/50">
            <button
              onClick={prevQuickDemoStep}
              disabled={quickDemoStep <= 1}
              className="p-1 rounded-lg hover:bg-slate-700 text-slate-300 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
              title="Previous Step (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={toggleQuickDemoAutoPlay}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-all ${
                isQuickDemoAutoPlay
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-inner'
                  : 'hover:bg-slate-700 text-slate-300'
              }`}
              title="Toggle Auto-Play (Spacebar)"
            >
              {isQuickDemoAutoPlay ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Auto (7s)</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Play</span>
                </>
              )}
            </button>

            <button
              onClick={nextQuickDemoStep}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/30 transition-all active:scale-95"
              title="Next Step (Right Arrow)"
            >
              <span className="text-[11px]">{quickDemoStep === totalSteps ? 'Finish' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={startOverQuickDemo}
              className="p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors ml-1"
              title="Start Over"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={exitQuickDemo}
              className="p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
              title="Exit Quick Demo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Right Section: Speed Pacing, Presentation Mode & Quote */}
        <div className="flex items-center gap-2">
          {/* Speed Selector */}
          <div className="hidden lg:flex items-center bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/60">
            <button
              onClick={() => {
                setDemoSpeedMode('quick');
                if (!isQuickDemoRunning) startQuickDemo(category, 'quick');
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                demoSpeedMode === 'quick'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="60-second high velocity demo"
            >
              <Zap className="w-3 h-3" />
              Quick
            </button>
            <button
              onClick={() => {
                setDemoSpeedMode('guided');
                if (!isQuickDemoRunning) startQuickDemo(category, 'guided');
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                demoSpeedMode === 'guided'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Guided multi-step demo"
            >
              <Compass className="w-3 h-3" />
              Guided
            </button>
            <button
              onClick={() => setDemoSpeedMode('explore')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium transition-all ${
                demoSpeedMode === 'explore'
                  ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Unrestricted exploration"
            >
              <Layers className="w-3 h-3" />
              Explore
            </button>
          </div>

          {/* Package Quotes & Closing Modal Button */}
          <button
            onClick={() => setIsDemoHandoffOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold border border-emerald-500/30 transition-all shadow-sm active:scale-95"
            title="Open Package Quotations & Requirement Intake (H)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Package Quote</span>
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={() => setIsPresentationMode(prev => !prev)}
            className={`p-1.5 rounded-xl border transition-all ${
              isPresentationMode 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Toggle Distraction-Free Presentation Mode (P)"
          >
            {isPresentationMode ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Quick Palette Shortcut hint */}
          <button
            onClick={() => setIsQuickAccessOpen(true)}
            className="hidden sm:flex items-center gap-1 p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 text-[10px] transition-colors"
            title="Command Palette (Ctrl+K)"
          >
            <Command className="w-3 h-3" />
            <span>K</span>
          </button>
        </div>

      </div>
    </div>
  );
};
