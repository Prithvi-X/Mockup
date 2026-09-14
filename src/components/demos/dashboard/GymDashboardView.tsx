import React from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/StatusBadge';
import { Dumbbell, Fingerprint, RotateCcw, User, Eye, Check } from 'lucide-react';

export const GymDashboardView: React.FC = () => {
  const {
    gymMembers,
    markGymAttendance,
    renewGymMembership
  } = useWorkflow();

  const { customization, setViewMode } = useDemo();

  const totalMembers = gymMembers.length;
  const activeMembers = gymMembers.filter((m) => m.status === 'Active').length;
  const todayCheckins = gymMembers.reduce((acc, m) => acc + m.totalCheckins, 0);

  const stats = [
    { label: 'Active Members', value: String(activeMembers + 338), change: `+${totalMembers} in showroom`, isPositive: true },
    { label: "Today's Attendance", value: String(todayCheckins + 75), subtext: 'Biometric & QR logs' },
    { label: 'Expiring This Week', value: '16', subtext: 'Auto-renewals queued' },
    { label: 'Monthly Cashflow', value: '₹1,42,000', change: '+15% this month', isPositive: true },
    { label: 'Retention Rate', value: '88%', subtext: 'Higher with auto-alerts', isPositive: true }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              Gym Membership & Access Management
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Biometric Logs Live
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Membership plans, 1-tap attendance logs, and automated WhatsApp renewal recovery.
          </p>
        </div>

        <button
          onClick={() => setViewMode('customer')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs sm:text-sm shadow-md transition"
        >
          <Eye className="w-4 h-4 text-emerald-600" />
          <span>Join Plan on Customer Side</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Member Directory */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Active Member Directory</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click <strong>Mark Attendance</strong> or <strong>Renew</strong> to test member lifecycle.
            </p>
          </div>
          <span className="text-xs font-medium text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-lg">
            Biometric Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Member Code</th>
                <th className="px-4 py-3 font-semibold">Member Name</th>
                <th className="px-4 py-3 font-semibold">Current Plan</th>
                <th className="px-4 py-3 font-semibold">Expiry Date</th>
                <th className="px-4 py-3 font-semibold">Last Attendance</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
              {gymMembers.map((m) => (
                <tr key={m.id} className="hover:bg-neutral-800/30 transition">
                  <td className="px-4 py-3.5 font-mono font-bold text-emerald-400">{m.memberCode}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="font-semibold text-white">{m.name}</div>
                    <div className="text-[11px] text-neutral-400">{m.phone}</div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="font-medium text-white">{m.planName}</div>
                    <div className="text-[10px] text-neutral-400">₹{m.planPrice}</div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-neutral-300 font-mono text-xs">
                    {m.expiryDate}
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-neutral-300">
                    <div>{m.lastAttendance || 'Never'}</div>
                    <div className="text-[10px] text-neutral-400">{m.totalCheckins} check-ins total</div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-right space-x-1.5">
                    <button
                      onClick={() => markGymAttendance(m.id)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition inline-flex items-center gap-1"
                      title="Log Member Check-In"
                    >
                      <Fingerprint className="w-3.5 h-3.5" />
                      <span>Check In</span>
                    </button>

                    <button
                      onClick={() => renewGymMembership(m.id, 3)}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium border border-neutral-700 transition inline-flex items-center gap-1"
                      title="Simulate 3-Month Renewal"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Renew</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
