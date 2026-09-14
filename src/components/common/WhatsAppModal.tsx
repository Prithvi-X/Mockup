import React from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import { useDemo } from '../../context/DemoContext';
import { Modal } from './Modal';
import { Check, Copy, MessageSquare, Smartphone, CheckCheck } from 'lucide-react';

export const WhatsAppModal: React.FC = () => {
  const { whatsAppModal, closeWhatsAppModal } = useWorkflow();
  const { showToast } = useDemo();
  const [copied, setCopied] = React.useState(false);

  if (!whatsAppModal.isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsAppModal.message);
    setCopied(true);
    showToast('Message text copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulateSend = () => {
    showToast(`Simulated WhatsApp delivered to ${whatsAppModal.recipientName}!`);
    closeWhatsAppModal();
  };

  return (
    <Modal
      isOpen={whatsAppModal.isOpen}
      onClose={closeWhatsAppModal}
      title={whatsAppModal.title || 'WhatsApp Message Simulation'}
      subtitle="Preview of the automated message delivered to the client"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {/* WhatsApp App Mock Header */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              {whatsAppModal.recipientName.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                <span>{whatsAppModal.recipientName}</span>
                <span className="text-[10px] text-emerald-700 font-medium">Customer</span>
              </div>
              <div className="text-[11px] text-gray-500 font-mono">{whatsAppModal.phone}</div>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" title="Online" />
        </div>

        {/* WhatsApp Chat Message Bubble */}
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2">
          <div className="text-[10px] text-gray-400 text-center uppercase tracking-wider font-semibold">
            Today • Automated WhatsApp Notification
          </div>
          <div className="bg-emerald-100/70 border border-emerald-200 rounded-2xl rounded-tl-xs p-4 text-xs text-gray-900 whitespace-pre-line leading-relaxed shadow-2xs font-sans">
            {whatsAppModal.message}
            <div className="mt-2 text-[10px] text-emerald-700 flex items-center justify-end gap-1">
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-gray-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-gray-700 hover:text-gray-900 px-3 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 shadow-2xs transition font-medium"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
            <span>{copied ? 'Copied' : 'Copy Message'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeWhatsAppModal}
              className="text-xs text-gray-600 hover:text-gray-900 px-3 py-2 transition font-medium"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSimulateSend}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Simulate Send</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
