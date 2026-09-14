import { useEffect } from 'react';
import { useDemo } from '../context/DemoContext';
import { useWorkflow } from '../context/WorkflowContext';

export const useSalesKeyboardShortcuts = () => {
  const {
    isSalesModeOpen,
    setIsSalesModeOpen,
    isQuickAccessOpen,
    setIsQuickAccessOpen,
    isDemoHandoffOpen,
    setIsDemoHandoffOpen,
    isCustomizeOpen,
    setIsCustomizeOpen,
    isQuickCustomizeOpen,
    setIsQuickCustomizeOpen,
    isPresentationMode,
    setIsPresentationMode,
    screen,
    resetDemo,
    showToast
  } = useDemo();

  const {
    isQuickDemoRunning,
    toggleQuickDemoAutoPlay,
    nextQuickDemoStep,
    prevQuickDemoStep,
    exitQuickDemo
  } = useWorkflow();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore shortcuts if active element is an input, textarea, or select
      const target = e.target as HTMLElement;
      const isInput = 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.tagName === 'SELECT' ||
        target.isContentEditable;

      // Ctrl+K / Cmd+K Command Palette always available
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsQuickAccessOpen(!isQuickAccessOpen);
        return;
      }

      if (isInput) return;

      // Esc closes modals
      if (e.key === 'Escape') {
        if (isQuickAccessOpen) setIsQuickAccessOpen(false);
        else if (isSalesModeOpen) setIsSalesModeOpen(false);
        else if (isDemoHandoffOpen) setIsDemoHandoffOpen(false);
        else if (isCustomizeOpen) setIsCustomizeOpen(false);
        else if (isQuickCustomizeOpen) setIsQuickCustomizeOpen(false);
        else if (isQuickDemoRunning) exitQuickDemo();
        return;
      }

      // Single Key Presenter Shortcuts
      switch (e.key.toLowerCase()) {
        case 'q':
          e.preventDefault();
          setIsSalesModeOpen(!isSalesModeOpen);
          break;

        case 'h':
          e.preventDefault();
          setIsDemoHandoffOpen(!isDemoHandoffOpen);
          break;

        case 'c':
          e.preventDefault();
          setIsCustomizeOpen(!isCustomizeOpen);
          break;

        case 'p':
          e.preventDefault();
          setIsPresentationMode(prev => !prev);
          showToast(`Presentation mode: ${!isPresentationMode ? 'Enabled' : 'Disabled'}`);
          break;

        case 'r':
          e.preventDefault();
          if (screen === 'demo') {
            resetDemo();
          }
          break;

        case ' ':
          if (isQuickDemoRunning) {
            e.preventDefault();
            toggleQuickDemoAutoPlay();
          }
          break;

        case 'arrowright':
          if (isQuickDemoRunning) {
            e.preventDefault();
            nextQuickDemoStep();
          }
          break;

        case 'arrowleft':
          if (isQuickDemoRunning) {
            e.preventDefault();
            prevQuickDemoStep();
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isSalesModeOpen,
    setIsSalesModeOpen,
    isQuickAccessOpen,
    setIsQuickAccessOpen,
    isDemoHandoffOpen,
    setIsDemoHandoffOpen,
    isCustomizeOpen,
    setIsCustomizeOpen,
    isQuickCustomizeOpen,
    setIsQuickCustomizeOpen,
    isPresentationMode,
    setIsPresentationMode,
    screen,
    resetDemo,
    showToast,
    isQuickDemoRunning,
    toggleQuickDemoAutoPlay,
    nextQuickDemoStep,
    prevQuickDemoStep,
    exitQuickDemo
  ]);
};
