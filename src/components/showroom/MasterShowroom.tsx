import React from 'react';
import { MasterHeader } from '../layout/MasterHeader';
import { MasterFooter } from '../layout/MasterFooter';
import { HeroSection } from './HeroSection';
import { SolutionsSection } from './SolutionsSection';
import { CategorySelector } from './CategorySelector';
import { WorkflowCTA } from './WorkflowCTA';
import { BookDemoModal } from '../common/BookDemoModal';
import { CustomizationModal } from '../common/CustomizationModal';

export const MasterShowroom: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-gray-900 selection:bg-indigo-100 selection:text-indigo-900">
      <MasterHeader />
      <main className="flex-1">
        <HeroSection />
        <SolutionsSection />
        <CategorySelector />
        <WorkflowCTA />
      </main>
      <MasterFooter />
      <BookDemoModal />
      <CustomizationModal />
    </div>
  );
};
