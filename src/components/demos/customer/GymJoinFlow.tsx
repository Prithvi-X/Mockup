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
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              Membership Activated
            </div>
            <h3 className="text-2xl font-extrabold text-white">Member ID #{memberCode}</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Welcome to {customization.businessName}, {memberName}. Your membership is live.
            </p>
          </div>

          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Plan</span>
              <span className="font-semibold text-white">{selectedPlan.name} (₹{selectedPlan.price})</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Duration</span>
              <span className="font-semibold text-white">{selectedPlan.duration}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Biometric / QR Status</span>
              <span className="font-bold text-emerald-400">Authorized for Gym Entry</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs transition shadow"
            >
              <span>View in Member Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsRegistered(false)}
              className="w-full sm:w-auto text-xs text-neutral-400 hover:text-white px-3 py-2"
            >
              Register Another Member
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleJoin} className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Choose Your Membership Plan</h3>
            <p className="text-xs text-neutral-400">Join {customization.businessName} today with instant QR access.</p>
          </div>

          {/* Plan Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {activePlans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan)}
                className={`p-4 rounded-xl border cursor-pointer transition flex flex-col justify-between ${
                  selectedPlan.id === plan.id
                    ? 'bg-neutral-800/90 border-emerald-500 text-white shadow-md ring-1 ring-emerald-500/40'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div>
                  <div className="font-bold text-xs text-white">{plan.name}</div>
                  <div className="text-2xl font-extrabold text-emerald-400 my-2">₹{plan.price}</div>
                  <ul className="space-y-1 text-[11px] text-neutral-400">
                    {plan.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-neutral-800 text-center">
                  <span
                    className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      selectedPlan.id === plan.id
                        ? 'bg-emerald-500 text-white'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {selectedPlan.id === plan.id ? 'Selected' : 'Choose Plan'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Member Details */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Member Details</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                required
              />
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
            <div>
              <span className="text-xs text-neutral-400 block">Total Due</span>
              <span className="text-lg font-extrabold text-white">₹{selectedPlan.price}</span>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition"
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
