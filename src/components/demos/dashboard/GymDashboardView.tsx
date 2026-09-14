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
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              Membership & Access
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Biometric Sync Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Membership plans, 1-tap attendance logs, and automated WhatsApp renewal recovery.
          </p>
        </div>

        <button
          onClick={() => setViewMode('customer')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
        >
          <Eye className="w-4 h-4" />
          <span>Join Plan on Customer Side</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Member Directory */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Active Member Directory</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Click <strong>Check In</strong> or <strong>Renew</strong> to test member lifecycle.
            </p>
          </div>
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded border border-gray-200">
            Biometric Sync
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider text-[11px] font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Member Code</th>
                <th className="px-4 py-2.5 font-semibold">Member Name</th>
                <th className="px-4 py-2.5 font-semibold">Current Plan</th>
                <th className="px-4 py-2.5 font-semibold">Expiry Date</th>
                <th className="px-4 py-2.5 font-semibold">Last Attendance</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {gymMembers.map((m) => (
                <tr key={m.id} className="hover:bg-gray-50/75 transition">
                  <td className="px-4 py-3 font-mono font-bold text-emerald-700">{m.memberCode}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{m.name}</div>
                    <div className="text-[11px] text-gray-500">{m.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{m.planName}</div>
                    <div className="text-[10px] text-gray-500">₹{m.planPrice}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700 font-mono text-xs">
                    {m.expiryDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">
                    <div>{m.lastAttendance || 'Never'}</div>
                    <div className="text-[10px] text-gray-400">{m.totalCheckins} check-ins total</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={m.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right space-x-1.5">
                    <button
                      onClick={() => markGymAttendance(m.id)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium shadow-sm transition inline-flex items-center gap-1"
                      title="Log Member Check-In"
                    >
                      <Fingerprint className="w-3.5 h-3.5" />
                      <span>Check In</span>
                    </button>

                    <button
                      onClick={() => renewGymMembership(m.id, 3)}
                      className="px-2.5 py-1 bg-white hover:bg-gray-50 text-gray-700 rounded text-xs font-medium border border-gray-200 transition inline-flex items-center gap-1"
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
