import React, { useState } from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/StatusBadge';
import { Modal } from '../../common/Modal';
import { Stethoscope, BellRing, User, Plus, Eye, Check } from 'lucide-react';

export const ClinicDashboardView: React.FC = () => {
  const {
    clinicAppointments,
    clinicCurrentToken,
    callNextClinicPatient,
    selectedPatient,
    setSelectedPatient,
    addClinicPatientNote
  } = useWorkflow();

  const { customization, setViewMode } = useDemo();
  const [newNote, setNewNote] = useState('');

  const waitingCount = clinicAppointments.filter((a) => a.status === 'Waiting').length;
  const completedCount = clinicAppointments.filter((a) => a.status === 'Completed').length;
  const totalFees = clinicAppointments.reduce((acc, a) => acc + a.consultationFee, 0);

  const stats = [
    { label: "Today's Queue", value: String(clinicAppointments.length), change: `${waitingCount} waiting now`, isPositive: true },
    { label: 'In Consultation', value: '1 Patient', subtext: `Token #${clinicCurrentToken}` },
    { label: 'Completed Consults', value: String(completedCount), subtext: 'Prescriptions generated' },
    { label: 'In Waiting Area', value: String(waitingCount), subtext: 'Tokens in line' },
    { label: "Today's Fees", value: `₹${totalFees.toLocaleString('en-IN')}`, change: '100% accounted', isPositive: true }
  ];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient || !newNote.trim()) return;
    addClinicPatientNote(selectedPatient.id, newNote);
    setNewNote('');
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
              Outpatient Department & Queue Management
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Waiting Room
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Doctor tokens, waiting room queue callout, and electronic prescription history.
          </p>
        </div>

        <button
          onClick={() => setViewMode('customer')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs sm:text-sm shadow-md transition"
        >
          <Eye className="w-4 h-4 text-cyan-600" />
          <span>Book Token on Customer Side</span>
        </button>
      </div>

      {/* Prominent Live Token Callout Card */}
      <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-cyan-950/40 border border-cyan-500/30 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-mono text-2xl font-black text-cyan-300">
            {clinicCurrentToken}
          </div>
          <div>
            <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
              Current Patient In Chamber
            </div>
            <h3 className="text-lg font-bold text-white">
              {clinicAppointments.find((a) => a.tokenNumber === clinicCurrentToken)?.patientName || 'Ayush Kumar (12y)'}
            </h3>
            <p className="text-xs text-neutral-400">
              Doctor: {clinicAppointments.find((a) => a.tokenNumber === clinicCurrentToken)?.doctorName || 'Dr. Arvind Sharma'}
            </p>
          </div>
        </div>

        {/* Call Next Button */}
        <button
          onClick={callNextClinicPatient}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-950/40 transition transform active:scale-95"
        >
          <BellRing className="w-4 h-4 animate-bounce" />
          <span>Call Next Patient ({waitingCount} Waiting)</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Queue Table */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Today's OPD Consultation Queue</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click any patient name to open their consultation notes and medical history.
            </p>
          </div>
          <span className="text-xs font-medium text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-lg">
            Live Tokens
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Token</th>
                <th className="px-4 py-3 font-semibold">Time</th>
                <th className="px-4 py-3 font-semibold">Patient Name</th>
                <th className="px-4 py-3 font-semibold">Doctor</th>
                <th className="px-4 py-3 font-semibold">Reason / Symptoms</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
              {clinicAppointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-neutral-800/30 transition">
                  <td className="px-4 py-3.5 font-mono font-bold text-cyan-400">{appt.tokenNumber}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-white font-medium">{appt.time}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedPatient(appt)}
                      className="font-semibold text-white hover:underline text-left flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{appt.patientName}</span>
                      <span className="text-[11px] text-neutral-400 font-normal">({appt.age})</span>
                    </button>
                    <div className="text-[11px] text-neutral-400">{appt.phone}</div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-neutral-300">{appt.doctorName}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-neutral-300">{appt.reason}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge status={appt.status} />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedPatient(appt)}
                      className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-lg text-xs font-medium border border-neutral-700"
                    >
                      Notes ({appt.notes.length})
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PATIENT CONSULTATION NOTES MODAL */}
      {selectedPatient && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedPatient(null)}
          title={`Patient Record: ${selectedPatient.patientName} (${selectedPatient.age})`}
          subtitle={`Token #${selectedPatient.tokenNumber} • Doctor: ${selectedPatient.doctorName}`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4 text-xs">
            <div className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Chief Complaint:</span>
                <span className="font-semibold text-white">{selectedPatient.reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Phone:</span>
                <span className="text-neutral-200">{selectedPatient.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Consultation Status:</span>
                <StatusBadge status={selectedPatient.status} />
              </div>
            </div>

            <div>
              <h4 className="font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Consultation Notes & Prescriptions
              </h4>
              <div className="space-y-1.5 max-h-36 overflow-y-auto mb-3">
                {selectedPatient.notes.length === 0 ? (
                  <div className="text-neutral-500 italic p-2 bg-neutral-950 rounded border border-neutral-800">
                    No notes recorded yet for this visit.
                  </div>
                ) : (
                  selectedPatient.notes.map((note, idx) => (
                    <div key={idx} className="bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 text-neutral-200">
                      • {note}
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Type doctor observation or Rx note..."
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs rounded-lg transition disabled:opacity-50"
                >
                  Save Note
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
