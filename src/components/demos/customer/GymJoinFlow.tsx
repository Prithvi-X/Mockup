import React, { useState } from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { Dumbbell, Check, ArrowRight, CheckCircle2, Award } from 'lucide-react';

interface PlanOption {
  id: string;
  name: string;
  price: number;
  duration: string;
  benefits: string[];
}

const PLANS: PlanOption[] = [
  { id: 'p1', name: 'Monthly Flexible', price: 999, duration: '1 Month', benefits: ['Full gym access', 'Locker room & shower', 'Cardio & strength floor'] },
  { id: 'p2', name: 'Quarterly Transformation', price: 2499, duration: '3 Months', benefits: ['Save 17%', 'Free body fat analysis', 'Custom diet chart', 'Trainer support'] },
  { id: 'p3', name: 'Annual VIP Athlete', price: 7999, duration: '12 Months', benefits: ['Best value (₹666/mo)', 'CrossFit area access', '2 guest passes/mo', 'Free sauna access'] }
];

export const GymJoinFlow: React.FC = () => {
  const { addGymMember } = useWorkflow();
  const { customization, setViewMode } = useDemo();

  const activePlans = (customization.gymPlansList && customization.gymPlansList.length > 0)
    ? customization.gymPlansList
    : PLANS;

  const [selectedPlan, setSelectedPlan] = useState<PlanOption>(activePlans[1] || activePlans[0]);
  const [memberName, setMemberName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 94311 88210');
  const [email, setEmail] = useState('priya.sharma@example.com');
  const [memberCode, setMemberCode] = useState('RFC-105');
  const [isRegistered, setIsRegistered] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    const code = `RFC-${Math.floor(100 + Math.random() * 900)}`;
    setMemberCode(code);

    addGymMember({
      memberCode: code,
      name: memberName.trim() || 'Priya Sharma',
      phone: phone.trim() || '+91 94311 88210',
      email: email.trim(),
      planName: selectedPlan.name,
      planPrice: selectedPlan.price,
      startDate: 'Today',
      expiryDate: '15 Dec 2026',
      paymentStatus: 'Paid',
      status: 'Active'
    });

    setIsRegistered(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {isRegistered ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center space-y-4 shadow-sm animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-0.5">
              Membership Activated
            </div>
            <h3 className="text-xl font-bold text-gray-900">Member ID #{memberCode}</h3>
            <p className="text-xs text-gray-500 mt-1">
              Welcome to {customization.businessName}, {memberName}. Your membership is live.
            </p>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-md border border-gray-200 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-500">Plan</span>
              <span className="font-semibold text-gray-900">{selectedPlan.name} (₹{selectedPlan.price})</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-500">Duration</span>
              <span className="font-medium text-gray-900">{selectedPlan.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Biometric / QR Status</span>
              <span className="font-semibold text-emerald-700">Authorized for Gym Entry</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs shadow-sm transition"
            >
              <span>View in Member Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsRegistered(false)}
              className="w-full sm:w-auto text-xs text-gray-500 hover:text-gray-900 px-3 py-1.5"
            >
              Register Another Member
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleJoin} className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Choose Your Membership Plan</h3>
            <p className="text-xs text-gray-500">Join {customization.businessName} today with instant QR access.</p>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activePlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`p-3.5 rounded-lg border cursor-pointer transition flex flex-col justify-between ${
                  selectedPlan.id === plan.id
                    ? 'bg-emerald-50/50 border-emerald-500 text-gray-900 shadow-sm ring-1 ring-emerald-400/30'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div>
                  <div className="font-semibold text-xs text-gray-900">{plan.name}</div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-700 my-1.5">₹{plan.price}</div>
                  <ul className="space-y-1 text-[11px] text-gray-600">
                    {plan.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-3.5 pt-2.5 border-t border-gray-200 text-center">
                  <span
                    className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded ${
                      selectedPlan.id === plan.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {selectedPlan.id === plan.id ? 'Selected' : 'Choose Plan'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Member Details */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3 text-xs">
            <h4 className="font-semibold text-gray-800 text-xs">Member Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-between border-t border-gray-200">
            <div>
              <span className="text-xs text-gray-500 block">Total Due</span>
              <span className="text-base font-bold text-gray-900">₹{selectedPlan.price}</span>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition"
            >
              <Check className="w-4 h-4" />
              <span>Join Now & Activate</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
