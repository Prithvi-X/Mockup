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
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-cyan-700 uppercase tracking-wider">
              OPD & Queue
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Waiting Room
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Doctor tokens, waiting room queue callout, and electronic prescription history.
          </p>
        </div>

        <button
          onClick={() => setViewMode('customer')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
        >
          <Eye className="w-4 h-4" />
          <span>Book Token on Customer Side</span>
        </button>
      </div>

      {/* Prominent Live Token Callout Card */}
      <div className="bg-cyan-50/60 border border-cyan-200 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg bg-white border border-cyan-200 flex items-center justify-center font-mono text-xl font-bold text-cyan-700 shadow-sm">
            {clinicCurrentToken}
          </div>
          <div>
            <div className="text-[11px] font-semibold text-cyan-800 uppercase tracking-wider">
              Current Patient In Chamber
            </div>
            <h3 className="text-base font-bold text-gray-900">
              {clinicAppointments.find((a) => a.tokenNumber === clinicCurrentToken)?.patientName || 'Ayush Kumar (12y)'}
            </h3>
            <p className="text-xs text-gray-600">
              Doctor: {clinicAppointments.find((a) => a.tokenNumber === clinicCurrentToken)?.doctorName || 'Dr. Arvind Sharma'}
            </p>
          </div>
        </div>

        {/* Call Next Button */}
        <button
          onClick={callNextClinicPatient}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
        >
          <BellRing className="w-4 h-4" />
          <span>Call Next Patient ({waitingCount} Waiting)</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Queue Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Today's OPD Consultation Queue</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Click any patient name to open their consultation notes and medical history.
            </p>
          </div>
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded border border-gray-200">
            Live Tokens
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider text-[11px] font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Token</th>
                <th className="px-4 py-2.5 font-semibold">Time</th>
                <th className="px-4 py-2.5 font-semibold">Patient Name</th>
                <th className="px-4 py-2.5 font-semibold">Doctor</th>
                <th className="px-4 py-2.5 font-semibold">Reason / Symptoms</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {clinicAppointments.map((appt) => (
                <tr key={appt.id} className="hover:bg-gray-50/75 transition">
                  <td className="px-4 py-3 font-mono font-bold text-cyan-700">{appt.tokenNumber}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-900 font-medium">{appt.time}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedPatient(appt)}
                      className="font-semibold text-gray-900 hover:text-cyan-700 text-left flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <span>{appt.patientName}</span>
                      <span className="text-[11px] text-gray-500 font-normal">({appt.age})</span>
                    </button>
                    <div className="text-[11px] text-gray-500">{appt.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{appt.doctorName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">{appt.reason}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={appt.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <button
                      onClick={() => setSelectedPatient(appt)}
                      className="px-2.5 py-1 bg-white hover:bg-gray-50 text-gray-700 rounded text-xs font-medium border border-gray-200 transition shadow-sm"
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
            <div className="bg-gray-50 p-3.5 rounded-lg border border-gray-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500">Chief Complaint:</span>
                <span className="font-semibold text-gray-900">{selectedPatient.reason}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phone:</span>
                <span className="text-gray-800">{selectedPatient.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Consultation Status:</span>
                <StatusBadge status={selectedPatient.status} />
              </div>
            </div>

            <div>
              <h4 className="font-semibold uppercase tracking-wider text-gray-700 mb-2">
                Consultation Notes & Prescriptions
              </h4>
              <div className="space-y-1.5 max-h-36 overflow-y-auto mb-3">
                {selectedPatient.notes.length === 0 ? (
                  <div className="text-gray-500 italic p-2 bg-gray-50 rounded border border-gray-200">
                    No notes recorded yet for this visit.
                  </div>
                ) : (
                  selectedPatient.notes.map((note, idx) => (
                    <div key={idx} className="bg-gray-50 p-2.5 rounded-md border border-gray-200 text-gray-800">
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
                  className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-medium text-xs rounded-md transition disabled:opacity-50"
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
