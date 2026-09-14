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
        <div className="flex items-center justify-between px-1 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <span
                key={s}
                className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] transition ${
                  step === s
                    ? 'bg-rose-600 text-white'
                    : step > s
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-gray-100 border border-gray-200 text-gray-500'
                }`}
              >
                {step > s ? '✓' : s}
              </span>
            ))}
          </div>
          <span className="text-[11px] font-medium text-gray-600">
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
            <h3 className="text-base font-semibold text-gray-900">Select a Service</h3>
            <p className="text-xs text-gray-500">Choose the grooming or beauty treatment you wish to book.</p>
          </div>

          <div className="space-y-2">
            {activeServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedService(srv)}
                className={`p-3.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                  selectedService.id === srv.id
                    ? 'bg-rose-50/50 border-rose-500 text-gray-900 shadow-sm ring-1 ring-rose-400/30'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="font-semibold text-xs sm:text-sm text-gray-900 flex items-center gap-2">
                    <span>{srv.name}</span>
                    <span className="text-[11px] bg-gray-100 border border-gray-200 px-2 py-0.5 rounded text-gray-600 font-normal">
                      {srv.duration}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{srv.desc}</p>
                </div>
                <div className="text-right shrink-0 ml-4">
                  <div className="text-sm sm:text-base font-bold text-rose-700">₹{srv.price}</div>
                  <span
                    className={`inline-block text-[10px] font-medium mt-1 px-2 py-0.5 rounded ${
                      selectedService.id === srv.id
                        ? 'bg-rose-600 text-white'
                        : 'bg-gray-100 text-gray-600'
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
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs transition shadow-sm"
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
            <h3 className="text-base font-semibold text-gray-900">Select Staff & Time Slot</h3>
            <p className="text-xs text-gray-500">Choose your preferred stylist and an available slot today.</p>
          </div>

          {/* Staff Cards */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Available Stylists Today
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {staffList.map((staff) => (
                <div
                  key={staff.id}
                  onClick={() => setSelectedStaff(staff.name)}
                  className={`p-3 rounded-lg border cursor-pointer transition ${
                    selectedStaff === staff.name
                      ? 'bg-rose-50/50 border-rose-500 text-gray-900 ring-1 ring-rose-400/30 shadow-sm'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-xs text-gray-900">{staff.name}</div>
                  <div className="text-[11px] text-gray-500 mt-0.5">{staff.role}</div>
                  <div className="text-[10px] text-emerald-700 mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{staff.availableSlots.length} slots open</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Select Time Slot (Today)
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {slots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={!slot.available}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`py-1.5 px-1 text-center rounded-md text-xs font-medium border transition ${
                    !slot.available
                      ? 'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200 text-gray-400 line-through'
                      : selectedSlot === slot.time
                      ? 'bg-rose-600 border-rose-600 text-white font-semibold shadow-sm'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5">
              * Slots with strikethrough are already booked by other clients.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs transition shadow-sm"
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
            <h3 className="text-base font-semibold text-gray-900">Customer Information</h3>
            <p className="text-xs text-gray-500">Enter your name and WhatsApp number to receive appointment updates.</p>
          </div>

          <div className="space-y-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Your Full Name *
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                WhatsApp / Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 94311 88210"
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Special Requests or Service Notes (Optional)
              </label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Prefers organic shampoo or sensitive skin"
                className="w-full bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              disabled={!customerName.trim() || !phone.trim()}
              onClick={() => setStep(4)}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs transition shadow-sm disabled:opacity-50"
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
            <h3 className="text-base font-semibold text-gray-900">Review & Confirm Appointment</h3>
            <p className="text-xs text-gray-500">Review your appointment details before submitting.</p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3 shadow-sm">
            <div className="flex items-center justify-between pb-2.5 border-b border-gray-200">
              <div>
                <div className="text-xs text-gray-500">Salon</div>
                <div className="text-sm font-semibold text-gray-900">{customization.businessName}</div>
              </div>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                Direct Booking
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-gray-500 block text-[11px]">Service</span>
                <span className="font-medium text-gray-900">{selectedService.name}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Duration</span>
                <span className="font-medium text-gray-900">{selectedService.duration}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Date & Time</span>
                <span className="font-medium text-gray-900">Today, {selectedSlot}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Assigned Stylist</span>
                <span className="font-medium text-gray-900">{selectedStaff}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Client Name</span>
                <span className="font-medium text-gray-900">{customerName}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">WhatsApp</span>
                <span className="font-medium text-gray-900">{phone}</span>
              </div>
            </div>

            <div className="pt-2.5 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs font-medium text-gray-600">Total Due at Salon</span>
              <span className="text-base font-bold text-gray-900">₹{selectedService.price}</span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 px-3 py-1.5 rounded-md"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleConfirmBooking}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shadow-sm transition"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Appointment</span>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUCCESS SLIP */}
      {step === 5 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center space-y-4 shadow-sm animate-in fade-in zoom-in-95 duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>

          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-0.5">
              Appointment Confirmed
            </div>
            <h3 className="text-xl font-bold text-gray-900">Token #{generatedToken}</h3>
            <p className="text-xs text-gray-500 mt-1">
              Thank you, {customerName}. Your slot with {selectedStaff} has been reserved.
            </p>
          </div>

          {/* Appointment Card Summary */}
          <div className="bg-gray-50 p-3.5 rounded-md border border-gray-200 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-500">Salon</span>
              <span className="font-semibold text-gray-900">{customization.businessName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-500">Service</span>
              <span className="font-semibold text-gray-900">{selectedService.name} (₹{selectedService.price})</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-500">Timing</span>
              <span className="font-semibold text-gray-900">Today · {selectedSlot}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Stylist</span>
              <span className="font-semibold text-gray-900">{selectedStaff}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs shadow-sm transition"
            >
              <span>View in Owner Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={openConfirmationWhatsApp}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Simulate WhatsApp Slip</span>
            </button>

            <button
              onClick={() => setStep(1)}
              className="w-full sm:w-auto text-xs text-gray-500 hover:text-gray-900 px-3 py-1.5"
            >
              Book Another
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
