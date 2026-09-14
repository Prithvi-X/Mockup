import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { useWorkflow } from '../../context/WorkflowContext';
import { Modal } from './Modal';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export const ResetConfirmModal: React.FC = () => {
  const { isResetConfirmOpen, setIsResetConfirmOpen, resetDemo, customization } = useDemo();
  const { resetAllWorkflowData } = useWorkflow();

  const handleConfirm = () => {
    resetDemo();
    resetAllWorkflowData();
  };

  return (
    <Modal
      isOpen={isResetConfirmOpen}
      onClose={() => setIsResetConfirmOpen(false)}
      title="Reset Demo to Defaults"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 shadow-2xs">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-amber-900">Are you sure you want to reset this demo?</p>
            <p className="text-gray-600 leading-relaxed">
              This will restore all customized branding for <strong className="text-gray-900">"{customization.businessName}"</strong>, including custom logos, edited catalog pricing, and all active simulation transactions back to the original showroom presets.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-gray-200">
          <button
            type="button"
            onClick={() => setIsResetConfirmOpen(false)}
            className="px-4 py-2 text-xs font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg shadow-2xs transition"
          >
            Keep My Customizations
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-xs transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Yes, Reset to Defaults
          </button>
        </div>
      </div>
    </Modal>
  );
};
