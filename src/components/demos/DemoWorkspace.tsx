import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { DemoToolbar } from '../layout/DemoToolbar';
import { DemoSidebar } from '../layout/DemoSidebar';
import { DashboardShell } from './DashboardShell';
import { CustomerPreviewShell } from './CustomerPreviewShell';
import { FeaturesView } from './FeaturesView';
import { CustomSoftwareView } from './CustomSoftwareView';
import { WebsiteViewDispatcher } from './website/WebsiteViewDispatcher';
import { CustomizationModal } from '../common/CustomizationModal';
import { QuickCustomizeModal } from '../common/QuickCustomizeModal';
import { RequestCustomBuildModal } from '../common/RequestCustomBuildModal';
import { ResetConfirmModal } from '../common/ResetConfirmModal';
import { BookDemoModal } from '../common/BookDemoModal';
import { WhatsAppModal } from '../common/WhatsAppModal';
import { PaymentModal } from '../common/PaymentModal';
import { PresenterControlBar } from '../sales/PresenterControlBar';
import { DemoErrorBoundary } from '../common/DemoErrorBoundary';
import { PricingPresentationView } from '../pricing/PricingPresentationView';

export const DemoWorkspace: React.FC = () => {
  const { category, viewMode, isPresentationMode, resetDemo, returnToShowroom } = useDemo();

  const renderContent = () => {
    if (category === 'custom') {
      return <CustomSoftwareView />;
    }
    switch (viewMode) {
      case 'pricing':
        return <PricingPresentationView />;
      case 'website':
        return <WebsiteViewDispatcher />;
      case 'customer':
        return <CustomerPreviewShell />;
      case 'features':
        return <FeaturesView />;
      case 'dashboard':
      default:
        return <DashboardShell />;
    }
  };

  const isFullWidthView = (viewMode === 'website' || viewMode === 'pricing') && category !== 'custom';
  const hideSidebar = isFullWidthView || (isPresentationMode && viewMode !== 'dashboard');

  return (
    <div className="min-h-screen flex flex-col bg-neutral-950 text-neutral-100 relative pb-16">
      {/* Fixed Demo Toolbar with Category Switcher & Notifications */}
      <DemoToolbar />

      {/* Main Workspace Layout with Sidebar (hidden in full website preview or presentation customer mode) */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {!hideSidebar && <DemoSidebar />}

        {/* Dynamic Workspace Content with Error Boundary */}
        <main className={`flex-1 overflow-y-auto ${isFullWidthView ? 'p-0 w-full' : 'p-4 sm:p-6 lg:p-8 max-w-7xl'}`}>
          <DemoErrorBoundary onReset={resetDemo} onReturnToShowroom={returnToShowroom}>
            {renderContent()}
          </DemoErrorBoundary>
        </main>
      </div>

      {/* Presenter Floating Control Bar for Live Guidance */}
      <PresenterControlBar />

      {/* Global Modals for Live Customization Engine & Sales Demos */}
      <QuickCustomizeModal />
      <CustomizationModal />
      <RequestCustomBuildModal />
      <ResetConfirmModal />
      <BookDemoModal />
      <WhatsAppModal />
      <PaymentModal />
    </div>
  );
};
