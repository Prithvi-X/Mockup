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
        <div className="bg-emerald-900/40 border border-emerald-500/30 rounded-xl p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-xs">
              {whatsAppModal.recipientName.charAt(0)}
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{whatsAppModal.recipientName}</span>
                <span className="text-[10px] text-emerald-400 font-normal">Customer</span>
              </div>
              <div className="text-[11px] text-neutral-300 font-mono">{whatsAppModal.phone}</div>
            </div>
          </div>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" title="Online" />
        </div>

        {/* WhatsApp Chat Message Bubble */}
        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
          <div className="text-[10px] text-neutral-400 text-center uppercase tracking-wider font-semibold">
            Today • Automated WhatsApp Notification
          </div>
          <div className="bg-emerald-950/60 border border-emerald-800/60 rounded-2xl rounded-tl-sm p-4 text-xs text-neutral-100 whitespace-pre-line leading-relaxed shadow-sm font-sans">
            {whatsAppModal.message}
            <div className="mt-2 text-[10px] text-emerald-400/80 flex items-center justify-end gap-1">
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 border-t border-neutral-800 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy Message'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={closeWhatsAppModal}
              className="text-xs text-neutral-400 hover:text-white px-3 py-2 transition"
            >
              Close
            </button>
            <button
              type="button"
              onClick={handleSimulateSend}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition"
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
