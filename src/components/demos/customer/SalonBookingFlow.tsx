import React, { useState } from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import {
  Sparkles,
  UserCheck,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Check,
  Smartphone,
  Phone,
  MessageSquare
} from 'lucide-react';

interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  desc: string;
}

const SERVICES: ServiceItem[] = [
  { id: 'srv-1', name: 'Haircut & Styling', price: 300, duration: '30 mins', desc: 'Precision cut tailored to your face structure' },
  { id: 'srv-2', name: 'Keratin Hair Spa', price: 800, duration: '45 mins', desc: 'Deep nourishment, steam therapy, and frizz reduction' },
  { id: 'srv-3', name: 'Organic Glow Facial', price: 600, duration: '45 mins', desc: 'Herbal fruit extraction with gentle hydration' },
  { id: 'srv-4', name: 'Beard Grooming & Trim', price: 250, duration: '20 mins', desc: 'Hot towel prep with organic beard oil finish' },
  { id: 'srv-5', name: 'Complete Bridal / Groom Package', price: 1499, duration: '90 mins', desc: 'Full glow facial, hair spa, styling, and manicure' }
];

export const SalonBookingFlow: React.FC = () => {
  const { addSalonBooking, salonStaff, openWhatsAppModal } = useWorkflow();
  const { customization, setViewMode, showToast } = useDemo();

  const activeServices = (customization.salonServices && customization.salonServices.length > 0)
    ? customization.salonServices
    : SERVICES;

  const staffList = (customization.salonStaffList && customization.salonStaffList.length > 0)
    ? customization.salonStaffList.map((s, i) => ({
        id: s.id || `st-${i}`,
        name: s.name,
        role: s.role,
        availableSlots: ['11:00 AM', '02:00 PM', '04:30 PM']
      }))
    : salonStaff;

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [selectedService, setSelectedService] = useState<ServiceItem>(activeServices[0] || SERVICES[0]);
  const [selectedStaff, setSelectedStaff] = useState<string>(staffList[0]?.name || 'Pooja');
  const [selectedSlot, setSelectedSlot] = useState<string>('04:30 PM');
  const [customerName, setCustomerName] = useState<string>('Priya Sharma');
  const [phone, setPhone] = useState<string>('+91 94311 88210');
  const [email, setEmail] = useState<string>('priya.sharma@example.com');
  const [notes, setNotes] = useState<string>('Prefers natural organic serum');
  const [generatedToken, setGeneratedToken] = useState<string>('A-104');

  const slots = [
    { time: '10:00 AM', available: false },
    { time: '10:30 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '11:30 AM', available: true },
    { time: '12:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '03:30 PM', available: true },
    { time: '04:30 PM', available: true },
    { time: '05:30 PM', available: true }
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const tokenStr = `A-${Math.floor(100 + Math.random() * 900)}`;
    setGeneratedToken(tokenStr);

    addSalonBooking({
      token: tokenStr,
      customerName: customerName.trim() || 'Priya Sharma',
      phone: phone.trim() || '+91 94311 88210',
      email: email.trim(),
      serviceName: selectedService.name,
      staffName: selectedStaff,
      date: 'Today',
      time: selectedSlot,
      price: selectedService.price,
      status: 'Pending',
      paymentStatus: 'Pending',
      notes: notes.trim()
    });

    setStep(5);
  };

  const openConfirmationWhatsApp = () => {
    openWhatsAppModal(
      customerName,
      phone,
      `Hi ${customerName},\n\nYour appointment at ${customization.businessName} has been booked!\n\nToken: #${generatedToken}\nService: ${selectedService.name}\nDate: Today\nTime: ${selectedSlot}\nStylist: ${selectedStaff}\nTotal: ₹${selectedService.price}\n\nAddress: ${customization.address}\n\nThank you!`
    );
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Step Indicator */}
      {step < 5 && (
        <div className="flex items-center justify-between px-2 text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <span
                key={s}
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] transition ${
                  step === s
                    ? 'bg-rose-500 text-white ring-2 ring-rose-500/40'
                    : step > s
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
                }`}
              >
                {step > s ? '✓' : s}
              </span>
            ))}
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-300">
            {step === 1 && 'Step 1: Choose Service'}
            {step === 2 && 'Step 2: Select Staff & Slot'}
            {step === 3 && 'Step 3: Your Details'}
            {step === 4 && 'Step 4: Review Booking'}
          </span>
        </div>
      )}

      {/* STEP 1: SERVICE SELECTION */}
      {step === 1 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Select a Service</h3>
            <p className="text-xs text-neutral-400">Choose the grooming or beauty treatment you wish to book.</p>
          </div>

          <div className="space-y-2.5">
            {activeServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                  selectedService.id === srv.id
                    ? 'bg-neutral-800/90 border-rose-500 text-white shadow-md ring-1 ring-rose-500/40'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-sm text-white flex items-center gap-2">
                    <span>{srv.name}</span>
                    <span className="text-[11px] bg-neutral-900 px-2 py-0.5 rounded text-neutral-400 font-normal">
                      {srv.duration}
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400">{srv.desc}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-base font-extrabold text-rose-400">₹{srv.price}</div>
                  <span
                    className={`inline-block text-[10px] font-semibold mt-1 px-2 py-0.5 rounded-full ${
                      selectedService.id === srv.id
                        ? 'bg-rose-500 text-white'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {selectedService.id === srv.id ? 'Selected' : 'Select'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs transition shadow"
            >
              <span>Continue to Staff Selection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: STAFF & SLOT SELECTION */}
      {step === 2 && (
        <div className="space-y-5">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Select Staff & Time Slot</h3>
            <p className="text-xs text-neutral-400">Choose your preferred stylist and an available slot today.</p>
          </div>

          {/* Staff Cards */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Available Stylists Today
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {staffList.map((staff) => (
                <div
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff.name)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition ${
                    selectedStaff === staff.name
                      ? 'bg-neutral-800 border-rose-500 text-white ring-1 ring-rose-500/40 shadow-sm'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold text-xs text-white">{staff.name}</div>
                  <div className="text-[11px] text-neutral-400 mt-0.5">{staff.role}</div>
                  <div className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{staff.availableSlots.length} slots open</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Select Time Slot (Today)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`py-2 px-1 text-center rounded-lg text-xs font-medium border transition ${
                    !slot.available
                      ? 'opacity-40 cursor-not-allowed bg-neutral-950 border-neutral-900 text-neutral-600 line-through'
                      : selectedSlot === slot.time
                      ? 'bg-rose-600 border-rose-500 text-white font-bold shadow-sm'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-700'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-neutral-400 mt-1.5">
              * Slots with strikethrough are already booked by other clients.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-2 rounded-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs transition shadow"
            >
              <span>Continue to Contact Info</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: CUSTOMER DETAILS */}
      {step === 3 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Customer Information</h3>
            <p className="text-xs text-neutral-400">Enter your name and WhatsApp number to receive appointment updates.</p>
          </div>

          <div className="space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                WhatsApp / Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 94311 88210"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                Special Requests or Service Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Prefers organic shampoo or sensitive skin"
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-2 rounded-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              disabled={!customerName.trim() || !phone.trim()}
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs transition shadow disabled:opacity-50"
            >
              <span>Review Booking</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW & CONFIRM */}
      {step === 4 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Review & Confirm Appointment</h3>
            <p className="text-xs text-neutral-400">Review your appointment details before submitting.</p>
          </div>

          <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-800/80">
              <div>
                <div className="text-xs text-neutral-400">Salon</div>
                <div className="text-sm font-bold text-white">{customization.businessName}</div>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
                Direct Booking
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-neutral-400 block text-[11px]">Service</span>
                <span className="font-semibold text-white">{selectedService.name}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Duration</span>
                <span className="font-semibold text-white">{selectedService.duration}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Date & Time</span>
                <span className="font-semibold text-white">Today, {selectedSlot}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Assigned Stylist</span>
                <span className="font-semibold text-white">{selectedStaff}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Client Name</span>
                <span className="font-semibold text-white">{customerName}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">WhatsApp</span>
                <span className="font-semibold text-white">{phone}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-300">Total Due at Salon</span>
              <span className="text-lg font-extrabold text-white">₹{selectedService.price}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-2 rounded-lg"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleConfirmBooking}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-950/40 transition"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Appointment</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUCCESS SLIP */}
      {step === 5 && (
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              Appointment Confirmed
            </div>
            <h3 className="text-2xl font-extrabold text-white">Token #{generatedToken}</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Thank you, {customerName}. Your slot with {selectedStaff} has been reserved.
            </p>
          </div>

          {/* Appointment Card Summary */}
          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Salon</span>
              <span className="font-semibold text-white">{customization.businessName}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Service</span>
              <span className="font-semibold text-white">{selectedService.name} (₹{selectedService.price})</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Timing</span>
              <span className="font-semibold text-white">Today · {selectedSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Stylist</span>
              <span className="font-semibold text-white">{selectedStaff}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs shadow-md transition"
            >
              <span>View in Owner Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={openConfirmationWhatsApp}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs shadow-md transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Simulate WhatsApp Slip</span>
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full sm:w-auto text-xs text-neutral-400 hover:text-white px-3 py-2"
            >
              Book Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
