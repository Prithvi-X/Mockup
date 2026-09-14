import React, { useState } from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { Stethoscope, Clock, Check, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';

interface DoctorOption {
  id: string;
  name: string;
  degree: string;
  specialty: string;
  fee: number;
}

const DOCTORS: DoctorOption[] = [
  { id: 'doc-1', name: 'Dr. Arvind Sharma', degree: 'MD (Medicine)', specialty: 'General Physician & Diabetologist', fee: 500 },
  { id: 'doc-2', name: 'Dr. Sneha Rao', degree: 'MDS', specialty: 'Dental Surgeon & Implantologist', fee: 400 }
];

export const ClinicAppointmentFlow: React.FC = () => {
  const { addClinicAppointment, openWhatsAppModal } = useWorkflow();
  const { customization, setViewMode } = useDemo();

  const activeDoctors = (customization.clinicDoctorsList && customization.clinicDoctorsList.length > 0)
    ? customization.clinicDoctorsList
    : DOCTORS;

  const [selectedDoctor, setSelectedDoctor] = useState<DoctorOption>(activeDoctors[0] || DOCTORS[0]);
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM');
  const [patientName, setPatientName] = useState('Priya Sharma');
  const [phone, setPhone] = useState('+91 94311 88210');
  const [age, setAge] = useState('28y');
  const [reason, setReason] = useState('Seasonal cold & mild fever');
  const [tokenNumber, setTokenNumber] = useState('A-020');
  const [isBooked, setIsBooked] = useState(false);

  const slots = ['09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '12:30 PM', '05:30 PM', '06:15 PM'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const token = `A-0${Math.floor(20 + Math.random() * 80)}`;
    setTokenNumber(token);

    addClinicAppointment({
      tokenNumber: token,
      patientName: patientName.trim() || 'Priya Sharma',
      phone: phone.trim() || '+91 94311 88210',
      age: age.trim() || '28y',
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      date: 'Today',
      time: selectedSlot,
      reason: reason.trim() || 'General Consultation',
      status: 'Waiting',
      consultationFee: selectedDoctor.fee,
      notes: []
    });

    setIsBooked(true);
  };

  const openWhatsAppSlip = () => {
    openWhatsAppModal(
      patientName,
      phone,
      `Hello ${patientName},\n\nYour consultation at ${customization.businessName} has been booked!\n\nToken: #${tokenNumber}\nDoctor: ${selectedDoctor.name} (${selectedDoctor.specialty})\nTime: Today at ${selectedSlot}\nFee: ₹${selectedDoctor.fee}\n\nClinic Address: ${customization.address}\nHelpline: ${customization.phone}\n\nPlease arrive 10 minutes prior to your slot.`
    );
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {isBooked ? (
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              OPD Token Reserved
            </div>
            <h3 className="text-2xl font-extrabold text-white">Token #{tokenNumber}</h3>
            <p className="text-xs text-neutral-400 mt-1">
              {patientName}, your token with {selectedDoctor.name} is confirmed.
            </p>
          </div>

          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Doctor</span>
              <span className="font-semibold text-white">{selectedDoctor.name}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Specialty</span>
              <span className="text-neutral-300">{selectedDoctor.specialty}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Estimated Time</span>
              <span className="font-semibold text-white">Today at {selectedSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Consultation Fee</span>
              <span className="font-bold text-cyan-400">₹{selectedDoctor.fee} (Pay at Reception)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs transition shadow"
            >
              <span>View in Patient Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={openWhatsAppSlip}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Simulate WhatsApp Token</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Book Doctor Consultation</h3>
            <p className="text-xs text-neutral-400">Select doctor and reserve your digital queue token.</p>
          </div>

          {/* Doctor Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
              1. Choose Specialist Doctor
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeDoctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctor(doc)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedDoctor.id === doc.id
                      ? 'bg-neutral-800/90 border-cyan-500 text-white shadow-md ring-1 ring-cyan-500/40'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white">{doc.name}</div>
                    <div className="text-xs text-cyan-400">{doc.degree}</div>
                    <div className="text-[11px] text-neutral-400 mt-0.5">{doc.specialty}</div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <div className="text-sm font-extrabold text-cyan-400">₹{doc.fee}</div>
                    <div className="text-[10px] text-neutral-400">Fee</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slot Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              2. Select Consultation Slot (Today)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`py-2 text-center rounded-lg text-xs font-medium border transition ${
                    selectedSlot === slot
                      ? 'bg-cyan-600 border-cyan-500 text-white font-bold shadow-sm'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:text-white'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Details */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">3. Patient Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Patient Name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white sm:col-span-2"
                required
              />
              <input
                type="text"
                placeholder="Age (e.g. 28y)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                required
              />
              <input
                type="text"
                placeholder="Symptoms / Reason for visit"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
              />
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
            <div>
              <span className="text-xs text-neutral-400 block">Consultation Fee</span>
              <span className="text-lg font-extrabold text-white">₹{selectedDoctor.fee}</span>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Generate Token</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
