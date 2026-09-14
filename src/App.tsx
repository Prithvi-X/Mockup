import React from 'react';
import { DemoProvider, useDemo } from './context/DemoContext';
import { WorkflowProvider } from './context/WorkflowContext';
import { MasterShowroom } from './components/showroom/MasterShowroom';
import { DemoWorkspace } from './components/demos/DemoWorkspace';
import { Toast } from './components/common/Toast';
import { DemoErrorBoundary } from './components/common/DemoErrorBoundary';
import { SalesModeLauncherModal } from './components/sales/SalesModeLauncherModal';
import { DemoHandoffModal } from './components/sales/DemoHandoffModal';
import { QuickAccessPalette } from './components/sales/QuickAccessPalette';
import { WowMomentBanner } from './components/sales/WowMomentBanner';
import { useSalesKeyboardShortcuts } from './hooks/useSalesKeyboardShortcuts';

const AppContent: React.FC = () => {
  const { screen, hardResetDemo, returnToShowroom } = useDemo();

  // Activate global presenter keyboard shortcuts (Ctrl+K, Q, R, H, C, P, Space, etc.)
  useSalesKeyboardShortcuts();

  return (
    <>
      <DemoErrorBoundary onReset={hardResetDemo} onReturnToShowroom={returnToShowroom}>
        {screen === 'showroom' ? <MasterShowroom /> : <DemoWorkspace />}
      </DemoErrorBoundary>

      {/* Global Presenter & Sales Mode Portals */}
      <SalesModeLauncherModal />
      <DemoHandoffModal />
      <QuickAccessPalette />
      <WowMomentBanner />
      <Toast />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <DemoProvider>
      <WorkflowProvider>
        <AppContent />
      </WorkflowProvider>
    </DemoProvider>
  );
};

export default App;
