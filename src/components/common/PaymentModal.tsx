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
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 flex items-center justify-between shadow-2xs">
          <div>
            <div className="text-xs text-gray-500 font-medium">Billed To</div>
            <div className="text-sm font-bold text-gray-900 mt-0.5">{paymentModal.customerName}</div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-500 font-medium">Total Amount</div>
            <div className="text-xl font-extrabold text-emerald-700">
              ₹{paymentModal.amount.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Method Picker */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-2">
            Payment Method
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            <button
              type="button"
              onClick={() => setSelectedMethod('UPI')}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition ${
                selectedMethod === 'UPI'
                  ? 'bg-indigo-50/70 border-indigo-600 text-indigo-950 shadow-xs ring-1 ring-indigo-500'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <QrCode className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-semibold">UPI / QR</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('Cash')}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition ${
                selectedMethod === 'Cash'
                  ? 'bg-emerald-50/70 border-emerald-600 text-emerald-950 shadow-xs ring-1 ring-emerald-500'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Banknote className="w-5 h-5 text-emerald-600" />
              <span className="text-xs font-semibold">Cash</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedMethod('Card')}
              className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 transition ${
                selectedMethod === 'Card'
                  ? 'bg-sky-50/70 border-sky-600 text-sky-950 shadow-xs ring-1 ring-sky-500'
                  : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <CreditCard className="w-5 h-5 text-sky-600" />
              <span className="text-xs font-semibold">Card</span>
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-gray-200 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closePaymentModal}
            className="px-4 py-2 text-xs font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition shadow-2xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark as Paid</span>
          </button>
        </div>
      </div>
    </Modal>
  );
};
