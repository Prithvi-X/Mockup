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
  Command,
  Tag
} from 'lucide-react';
import { useDemo } from '../../context/DemoContext';
import { useWorkflow } from '../../context/WorkflowContext';
import { QUICK_DEMO_SCENARIOS } from '../../data/quickDemoScenarios';

export const PresenterControlBar: React.FC = () => {
  const { 
    screen, 
    category, 
    viewMode,
    setViewMode,
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
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[calc(100%-2rem)] px-2 pointer-events-auto transition-all duration-300">
      <div className="bg-white/95 backdrop-blur-md text-gray-800 border border-gray-200 shadow-lg rounded-xl px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left Section: Active Demo Info & Steps */}
        <div className="flex items-center gap-3 min-w-0">
          {isQuickDemoRunning ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 font-semibold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md border border-indigo-200 shadow-xs whitespace-nowrap">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Step {quickDemoStep}/{totalSteps}
              </span>
              <div className="hidden sm:flex flex-col min-w-0">
                <span className="font-semibold text-gray-900 truncate max-w-[180px] md:max-w-[260px]">
                  {currentStepObj?.title || 'Interactive Step'}
                </span>
                <span className="text-[10px] text-gray-500 truncate max-w-[180px] md:max-w-[260px]">
                  {currentStepObj?.subtitle}
                </span>
              </div>
            </div>
          ) : (
            <button
              onClick={() => startQuickDemo(category, 'quick')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-xs active:scale-98 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>Run 60s Quick Demo</span>
            </button>
          )}

          {/* Stepper Dots (only when running) */}
          {isQuickDemoRunning && (
            <div className="hidden md:flex items-center gap-1.5 pl-2 border-l border-gray-200">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i + 1 === quickDemoStep
                      ? 'w-5 bg-indigo-600'
                      : i + 1 < quickDemoStep
                      ? 'w-2.5 bg-emerald-600'
                      : 'w-2 bg-gray-200'
                  }`}
                  title={`Step ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Center: Stepper Controls (if running) */}
        {isQuickDemoRunning && (
          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg border border-gray-200">
            <button
              onClick={prevQuickDemoStep}
              disabled={quickDemoStep <= 1}
              className="p-1 rounded-md hover:bg-gray-200 text-gray-600 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              title="Previous Step (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={toggleQuickDemoAutoPlay}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all ${
                isQuickDemoAutoPlay
                  ? 'bg-indigo-100 text-indigo-800 font-semibold'
                  : 'hover:bg-gray-200 text-gray-700'
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
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-all active:scale-98 shadow-xs"
              title="Next Step (Right Arrow)"
            >
              <span className="text-[11px]">{quickDemoStep === totalSteps ? 'Finish' : 'Next'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={startOverQuickDemo}
              className="p-1 rounded-md hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-colors ml-1"
              title="Start Over"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={exitQuickDemo}
              className="p-1 rounded-md hover:bg-gray-200 text-gray-500 hover:text-rose-600 transition-colors"
              title="Exit Quick Demo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Right Section: Speed Pacing, Presentation Mode & Quote */}
        <div className="flex items-center gap-2">
          {/* Speed Selector */}
          <div className="hidden lg:flex items-center bg-gray-100 p-0.5 rounded-md border border-gray-200">
            <button
              onClick={() => {
                setDemoSpeedMode('quick');
                if (!isQuickDemoRunning) startQuickDemo(category, 'quick');
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all ${
                demoSpeedMode === 'quick'
                  ? 'bg-white text-gray-900 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
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
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all ${
                demoSpeedMode === 'guided'
                  ? 'bg-white text-gray-900 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Guided multi-step demo"
            >
              <Compass className="w-3 h-3" />
              Guided
            </button>
            <button
              onClick={() => setDemoSpeedMode('explore')}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium transition-all ${
                demoSpeedMode === 'explore'
                  ? 'bg-white text-gray-900 font-semibold shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Unrestricted exploration"
            >
              <Layers className="w-3 h-3" />
              Explore
            </button>
          </div>

          {/* Pricing & Sales Offer Engine Button */}
          <button
            onClick={() => setViewMode('pricing')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-semibold border transition-all shadow-xs active:scale-98 ${
              viewMode === 'pricing'
                ? 'bg-indigo-600 text-white font-semibold border-indigo-600'
                : 'bg-white hover:bg-gray-50 text-indigo-700 border-indigo-200'
            }`}
            title="Open Pricing, Comparison & Sales Offer Engine"
          >
            <Tag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pricing</span>
          </button>

          {/* Package Quotes & Closing Modal Button */}
          <button
            onClick={() => setIsDemoHandoffOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 transition-all shadow-xs active:scale-98"
            title="Open Package Quotations & Requirement Intake (H)"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Package Quote</span>
          </button>

          {/* Presentation Mode Toggle */}
          <button
            onClick={() => setIsPresentationMode(prev => !prev)}
            className={`p-1.5 rounded-md border transition-all shadow-xs ${
              isPresentationMode 
                ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                : 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
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
            className="hidden sm:flex items-center gap-1 p-1.5 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-800 border border-gray-200 text-[10px] transition-colors"
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
