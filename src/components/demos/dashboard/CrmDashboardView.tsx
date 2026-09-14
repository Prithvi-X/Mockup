import React from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/StatusBadge';
import { CrmLead } from '../../../types/showroom';
import { Briefcase, ArrowRight, ArrowLeft, Plus, CheckCircle2, Eye, Building } from 'lucide-react';

export const CrmDashboardView: React.FC = () => {
  const { crmLeads, advanceCrmLeadStage } = useWorkflow();
  const { customization, setViewMode } = useDemo();

  const stages: CrmLead['stage'][] = ['New', 'Contacted', 'Proposal Sent', 'Won'];

  const totalValue = crmLeads
    .filter((l) => l.stage !== 'Lost')
    .reduce((acc, l) => acc + l.estimatedValue, 0);

  const wonValue = crmLeads
    .filter((l) => l.stage === 'Won')
    .reduce((acc, l) => acc + l.estimatedValue, 0);

  const stats = [
    { label: 'Active Pipeline Value', value: `₹${totalValue.toLocaleString('en-IN')}`, change: 'Open opportunities', isPositive: true },
    { label: 'Closed Won Revenue', value: `₹${wonValue.toLocaleString('en-IN')}`, subtext: 'Deals completed' },
    { label: 'Total Inquiries', value: String(crmLeads.length), subtext: 'This month' },
    { label: 'Proposal Sent', value: String(crmLeads.filter((l) => l.stage === 'Proposal Sent').length), subtext: 'Awaiting client sign-off' },
    { label: 'Closing Ratio', value: '44%', change: '+8% this quarter', isPositive: true }
  ];

  const getNextStage = (current: CrmLead['stage']): CrmLead['stage'] | null => {
    if (current === 'New') return 'Contacted';
    if (current === 'Contacted') return 'Proposal Sent';
    if (current === 'Proposal Sent') return 'Won';
    return null;
  };

  const getPrevStage = (current: CrmLead['stage']): CrmLead['stage'] | null => {
    if (current === 'Won') return 'Proposal Sent';
    if (current === 'Proposal Sent') return 'Contacted';
    if (current === 'Contacted') return 'New';
    return null;
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
              Sales Pipeline & Opportunity CRM
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Kanban Pipeline
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Capture inquiries, advance deal stages, and forecast revenue without losing leads.
          </p>
        </div>

        <button
          onClick={() => setViewMode('customer')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs sm:text-sm shadow-md transition"
        >
          <Eye className="w-4 h-4 text-violet-600" />
          <span>Submit Inquiry from Client Side</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Visual Kanban Deal Pipeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white tracking-tight">Visual Deal Pipeline</h3>
          <span className="text-xs text-neutral-400">
            Click arrows on cards to move deals through stages
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage) => {
            const leadsInStage = crmLeads.filter((l) => l.stage === stage);
            const stageValue = leadsInStage.reduce((acc, l) => acc + l.estimatedValue, 0);

            return (
              <div
                key={stage}
                className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 flex flex-col justify-between min-h-[420px]"
              >
                {/* Column Header */}
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-800 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-violet-400" />
                      <h4 className="font-bold text-xs uppercase tracking-wider text-white">
                        {stage}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono bg-neutral-800 px-2 py-0.5 rounded text-neutral-300">
                      {leadsInStage.length}
                    </span>
                  </div>

                  <div className="text-[11px] text-neutral-400 mb-3 font-mono">
                    Total: ₹{stageValue.toLocaleString('en-IN')}
                  </div>

                  {/* Deal Cards */}
                  <div className="space-y-3">
                    {leadsInStage.map((lead) => {
                      const next = getNextStage(lead.stage);
                      const prev = getPrevStage(lead.stage);

                      return (
                        <div
                          key={lead.id}
                          className="bg-neutral-950 border border-neutral-800/90 rounded-xl p-3.5 space-y-2.5 shadow-sm hover:border-neutral-700 transition"
                        >
                          <div className="flex items-start justify-between gap-1">
                            <h5 className="font-bold text-xs text-white leading-snug">
                              {lead.companyName}
                            </h5>
                            <span className="text-[10px] font-mono text-neutral-400 shrink-0">
                              {lead.leadCode}
                            </span>
                          </div>

                          <p className="text-[11px] text-neutral-400 leading-tight">
                            {lead.requirement}
                          </p>

                          <div className="flex items-center justify-between pt-1 border-t border-neutral-900 text-xs">
                            <span className="text-[11px] text-neutral-400">{lead.contactPerson}</span>
                            <span className="font-bold text-emerald-400 font-mono">
                              ₹{lead.estimatedValue.toLocaleString('en-IN')}
                            </span>
                          </div>

                          {/* Stage Transition Arrows */}
                          <div className="flex items-center justify-between pt-1">
                            {prev ? (
                              <button
                                onClick={() => advanceCrmLeadStage(lead.id, prev)}
                                className="p-1 rounded bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white text-[10px] flex items-center gap-0.5"
                                title={`Move back to ${prev}`}
                              >
                                <ArrowLeft className="w-3 h-3" />
                                <span>{prev}</span>
                              </button>
                            ) : (
                              <span />
                            )}

                            {next && (
                              <button
                                onClick={() => advanceCrmLeadStage(lead.id, next)}
                                className="p-1 px-2 rounded bg-violet-600 hover:bg-violet-500 text-white font-semibold text-[10px] flex items-center gap-0.5 shadow-sm"
                                title={`Advance to ${next}`}
                              >
                                <span>{next}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    {leadsInStage.length === 0 && (
                      <div className="text-center py-10 text-xs text-neutral-600 italic">
                        No deals in this stage
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
