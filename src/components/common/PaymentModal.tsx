import React, { useState } from 'react';
import { useWorkflow } from '../../context/WorkflowContext';
import { Modal } from './Modal';
import { IndianRupee, CreditCard, QrCode, Banknote, Check } from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const { paymentModal, closePaymentModal } = useWorkflow();
  const [selectedMethod, setSelectedMethod] = useState<'UPI' | 'Cash' | 'Card'>('UPI');

  if (!paymentModal.isOpen) return null;

  const handleConfirm = () => {
    paymentModal.onConfirm(selectedMethod);
    closePaymentModal();
  };

  return (
    <Modal
      isOpen={paymentModal.isOpen}
      onClose={closePaymentModal}
      title={paymentModal.title || 'Record Payment'}
      subtitle="Select the payment channel used by the client"
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        {/* Bill Summary Banner */}
        <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-center justify-between">
          <div>
            <div className="text-xs text-neutral-400 font-medium">Billed To</div>
            <div className="text-sm font-bold text-white mt-0.5">{paymentModal.customerName}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-neutral-400 font-medium">Total Amount</div>
            <div className="text-xl font-extrabold text-emerald-400">
              ₹{paymentModal.amount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Method Picker */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
            Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedMethod('UPI')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                selectedMethod === 'UPI'
                  ? 'bg-neutral-800 border-indigo-500 text-white shadow-sm ring-1 ring-indigo-500'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <QrCode className="w-5 h-5 text-indigo-400" />
              <span className="text-xs font-semibold">UPI / QR</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('Cash')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                selectedMethod === 'Cash'
                  ? 'bg-neutral-800 border-emerald-500 text-white shadow-sm ring-1 ring-emerald-500'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <Banknote className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-semibold">Cash</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('Card')}
              className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                selectedMethod === 'Card'
                  ? 'bg-neutral-800 border-cyan-500 text-white shadow-sm ring-1 ring-cyan-500'
                  : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              <CreditCard className="w-5 h-5 text-cyan-400" />
              <span className="text-xs font-semibold">Card</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closePaymentModal}
            className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark as Paid</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
