import React, { useState } from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/StatusBadge';
import { Modal } from '../../common/Modal';
import {
  Check,
  X,
  MessageSquare,
  CreditCard,
  User,
  Plus,
  Clock,
  Sparkles,
  Phone,
  Calendar,
  Eye,
  UserCheck
} from 'lucide-react';

export const SalonDashboardView: React.FC = () => {
  const {
    salonBookings,
    salonCustomers,
    salonStaff,
    confirmSalonBooking,
    cancelSalonBooking,
    recordSalonPayment,
    addSalonCustomerNote,
    selectedCustomer,
    setSelectedCustomer,
    openWhatsAppModal,
    openPaymentModal
  } = useWorkflow();

  const { setViewMode, customization } = useDemo();
  const [activeTab, setActiveTab] = useState<'appointments' | 'customers' | 'staff'>('appointments');
  const [newNote, setNewNote] = useState('');

  // Calculate dynamic metrics
  const totalAppointments = salonBookings.length;
  const confirmedCount = salonBookings.filter((b) => b.status === 'Confirmed').length;
  const pendingCount = salonBookings.filter((b) => b.status === 'Pending').length;
  const completedCount = salonBookings.filter((b) => b.status === 'Completed').length;
  const totalRevenue = salonBookings
    .filter((b) => b.paymentStatus === 'Paid' || b.status === 'Confirmed')
    .reduce((acc, b) => acc + b.price, 0);

  const stats = [
    { label: "Today's Appointments", value: String(totalAppointments), change: `+${totalAppointments} scheduled`, isPositive: true },
    { label: 'Confirmed', value: String(confirmedCount), subtext: 'Ready for service' },
    { label: 'Pending Action', value: String(pendingCount), subtext: 'Awaiting confirmation' },
    { label: 'Completed', value: String(completedCount), subtext: 'Checked out' },
    { label: "Today's Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, change: 'Real-time total', isPositive: true }
  ];

  const handleOpenWhatsApp = (b: typeof salonBookings[0]) => {
    openWhatsAppModal(
      b.customerName,
      b.phone,
      `Hello ${b.customerName},\n\nYour appointment at ${customization.businessName} has been confirmed!\n\nToken: #${b.token}\nService: ${b.serviceName}\nTiming: Today at ${b.time}\nStylist: ${b.staffName}\nAmount: ₹${b.price}\n\nAddress: ${customization.address}\n\nWe look forward to seeing you!`
    );
  };

  const handleOpenPayment = (b: typeof salonBookings[0]) => {
    openPaymentModal(
      `Settle Appointment #${b.token}`,
      b.price,
      b.customerName,
      (method) => recordSalonPayment(b.id, method)
    );
  };

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer || !newNote.trim()) return;
    addSalonCustomerNote(selectedCustomer.id, newNote);
    setNewNote('');
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner with Quick Actions */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
              Salon Operating System
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Interactive State
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Appointments, stylist availability, payments & customer history.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setViewMode('customer')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs sm:text-sm shadow-md transition"
          >
            <Eye className="w-4 h-4 text-rose-600" />
            <span>Book New from Customer View</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* View Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-neutral-800 pb-3 text-xs">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
            activeTab === 'appointments'
              ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Today's Appointments ({salonBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
            activeTab === 'customers'
              ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Customer Records & Profiles ({salonCustomers.length})
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`px-3.5 py-1.5 rounded-lg font-semibold transition ${
            activeTab === 'staff'
              ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          Stylist Schedules ({salonStaff.length})
        </button>
      </div>

      {/* TAB 1: APPOINTMENTS TABLE */}
      {activeTab === 'appointments' && (
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Today's Appointments Schedule</h3>
              <p className="text-xs text-neutral-400 mt-0.5">
                Click <strong>Confirm</strong> to approve pending bookings, or <strong>Record Payment</strong>.
              </p>
            </div>
            <span className="text-xs font-medium text-neutral-400 bg-neutral-800/80 px-2.5 py-1 rounded-lg">
              Live updates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Token</th>
                  <th className="px-4 py-3 font-semibold">Time</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Stylist</th>
                  <th className="px-4 py-3 font-semibold">Amount</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
                {salonBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-neutral-800/30 transition">
                    <td className="px-4 py-3.5 font-mono font-bold text-rose-400">{b.token}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap font-medium text-white">{b.time}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <button
                        onClick={() => {
                          const cust = salonCustomers.find(
                            (c) => c.name.toLowerCase() === b.customerName.toLowerCase()
                          );
                          if (cust) setSelectedCustomer(cust);
                        }}
                        className="font-semibold text-white hover:underline text-left flex items-center gap-1.5"
                      >
                        <User className="w-3.5 h-3.5 text-neutral-400" />
                        <span>{b.customerName}</span>
                      </button>
                      <div className="text-[11px] text-neutral-400">{b.phone}</div>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-neutral-300">{b.serviceName}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-neutral-300">{b.staffName}</td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <div className="font-bold text-white">₹{b.price}</div>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                          b.paymentStatus === 'Paid'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-amber-500/10 text-amber-400'
                        }`}
                      >
                        {b.paymentStatus === 'Paid' ? `Paid (${b.paymentMethod || 'UPI'})` : 'Unpaid'}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-4 py-3.5 whitespace-nowrap text-right space-x-1.5">
                      {b.status === 'Pending' && (
                        <button
                          onClick={() => confirmSalonBooking(b.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                          title="Confirm Appointment"
                        >
                          Confirm
                        </button>
                      )}

                      {b.paymentStatus === 'Pending' && (
                        <button
                          onClick={() => handleOpenPayment(b)}
                          className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium border border-neutral-700 transition"
                          title="Record Payment"
                        >
                          <CreditCard className="w-3.5 h-3.5 inline mr-1" />
                          Pay
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenWhatsApp(b)}
                        className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-emerald-400 rounded-lg text-xs font-medium border border-neutral-700 transition"
                        title="Simulate WhatsApp Confirmation"
                      >
                        <MessageSquare className="w-3.5 h-3.5 inline" />
                      </button>

                      {b.status !== 'Cancelled' && (
                        <button
                          onClick={() => cancelSalonBooking(b.id)}
                          className="px-2 py-1 text-neutral-400 hover:text-rose-400 text-xs rounded transition"
                          title="Cancel"
                        >
                          <X className="w-3.5 h-3.5 inline" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOMERS DIRECTORY */}
      {activeTab === 'customers' && (
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Customer Loyalty & History Records</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click any customer to open their full profile and service history.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {salonCustomers.map((cust) => (
              <div
                key={cust.id}
                onClick={() => setSelectedCustomer(cust)}
                className="bg-neutral-950 border border-neutral-800 hover:border-neutral-700 rounded-xl p-4 cursor-pointer transition space-y-2.5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 font-bold text-xs">
                      {cust.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white">{cust.name}</h4>
                      <p className="text-xs text-neutral-400">{cust.phone}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
                    {cust.totalVisits} Visits
                  </span>
                </div>

                <div className="text-xs text-neutral-400 space-y-1 pt-1 border-t border-neutral-900">
                  <div className="flex justify-between">
                    <span>Last Visit:</span>
                    <span className="text-neutral-300 font-medium">{cust.lastVisit}</span>
                  </div>
                  {cust.upcomingAppointment && (
                    <div className="flex justify-between text-rose-400 font-medium">
                      <span>Upcoming:</span>
                      <span>{cust.upcomingAppointment}</span>
                    </div>
                  )}
                </div>

                {cust.notes.length > 0 && (
                  <div className="bg-neutral-900/70 p-2 rounded-lg text-[11px] text-neutral-300 italic line-clamp-1 border border-neutral-800/80">
                    "{cust.notes[0]}"
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: STYLIST SCHEDULES */}
      {activeTab === 'staff' && (
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Stylist Schedules & Load Today</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Assigned appointments and available openings across senior stylists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {salonStaff.map((staff) => (
              <div key={staff.id} className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <div>
                    <h4 className="font-bold text-sm text-white">{staff.name}</h4>
                    <p className="text-xs text-neutral-400">{staff.role}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20">
                    {staff.activeAppointments} Booked
                  </span>
                </div>

                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Today's Bookings
                  </div>
                  <div className="space-y-1">
                    {staff.bookedSlots.length === 0 ? (
                      <div className="text-xs text-neutral-500 italic">No bookings yet today</div>
                    ) : (
                      staff.bookedSlots.map((slot, i) => (
                        <div key={i} className="text-xs text-white bg-neutral-900 p-1.5 rounded border border-neutral-800">
                          {slot}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Open Slots
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {staff.availableSlots.map((slot, i) => (
                      <span key={i} className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded">
                        {slot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CUSTOMER PROFILE MODAL (Priya Sharma, etc.) */}
      {selectedCustomer && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedCustomer(null)}
          title={selectedCustomer.name}
          subtitle={`Customer Record • ${selectedCustomer.phone}`}
          maxWidth="max-w-lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 bg-neutral-950 p-3.5 rounded-xl border border-neutral-800 text-xs">
              <div>
                <span className="text-neutral-400 block text-[11px]">Total Visits</span>
                <span className="text-base font-extrabold text-white">{selectedCustomer.totalVisits}</span>
              </div>
              <div>
                <span className="text-neutral-400 block text-[11px]">Last Visit</span>
                <span className="text-base font-bold text-neutral-200">{selectedCustomer.lastVisit}</span>
              </div>
              {selectedCustomer.upcomingAppointment && (
                <div className="col-span-2 pt-2 border-t border-neutral-800 text-rose-400 font-medium">
                  <span className="text-neutral-400 block text-[11px]">Upcoming Appointment:</span>
                  {selectedCustomer.upcomingAppointment}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Services Used History
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCustomer.servicesUsed.map((srv, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-neutral-800/80 text-neutral-300 px-2.5 py-1 rounded-lg border border-neutral-700"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Customer Notes & Preferences
              </h4>
              <div className="space-y-1.5 max-h-32 overflow-y-auto mb-3">
                {selectedCustomer.notes.map((note, idx) => (
                  <div key={idx} className="text-xs text-neutral-300 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800">
                    • {note}
                  </div>
                ))}
              </div>

              {/* Add Note Input Form */}
              <form onSubmit={handleAddNoteSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add custom preference note..."
                  className="flex-1 bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-rose-500"
                />
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs rounded-lg transition disabled:opacity-50"
                >
                  Add Note
                </button>
              </form>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
