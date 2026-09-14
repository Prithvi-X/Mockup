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
    <div className="space-y-5">
      {/* Top Banner with Quick Actions */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider">
              Salon Operations
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-medium text-emerald-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Interactive
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Appointments, stylist availability, payments & customer history.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('customer')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs sm:text-sm shadow-xs transition"
          >
            <Eye className="w-4 h-4" />
            <span>Book from Customer View</span>
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* View Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 text-xs">
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-3 py-1.5 rounded-md font-medium transition ${
            activeTab === 'appointments'
              ? 'bg-gray-100 text-gray-900 font-semibold'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Appointments ({salonBookings.length})
        </button>

        <button
          onClick={() => setActiveTab('customers')}
          className={`px-3 py-1.5 rounded-md font-medium transition ${
            activeTab === 'customers'
              ? 'bg-gray-100 text-gray-900 font-semibold'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Customer Records ({salonCustomers.length})
        </button>

        <button
          onClick={() => setActiveTab('staff')}
          className={`px-3 py-1.5 rounded-md font-medium transition ${
            activeTab === 'staff'
              ? 'bg-gray-100 text-gray-900 font-semibold'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Stylist Schedules ({salonStaff.length})
        </button>
      </div>

      {/* TAB 1: APPOINTMENTS TABLE */}
      {activeTab === 'appointments' && (
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="p-3.5 sm:p-4 border-b border-gray-200 flex items-center justify-between bg-white">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Today's Appointments Schedule</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Click <strong>Confirm</strong> to approve pending bookings, or <strong>Record Payment</strong>.
              </p>
            </div>
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded">
              Live updates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 text-gray-600 font-medium text-[11px] uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-3.5 py-2.5 font-semibold">Token</th>
                  <th className="px-3.5 py-2.5 font-semibold">Time</th>
                  <th className="px-3.5 py-2.5 font-semibold">Customer</th>
                  <th className="px-3.5 py-2.5 font-semibold">Service</th>
                  <th className="px-3.5 py-2.5 font-semibold">Stylist</th>
                  <th className="px-3.5 py-2.5 font-semibold">Amount</th>
                  <th className="px-3.5 py-2.5 font-semibold">Status</th>
                  <th className="px-3.5 py-2.5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-800">
                {salonBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50/70 transition">
                    <td className="px-3.5 py-2.5 font-mono font-bold text-rose-700">{b.token}</td>
                    <td className="px-3.5 py-2.5 whitespace-nowrap font-medium text-gray-900">{b.time}</td>
                    <td className="px-3.5 py-2.5 whitespace-nowrap">
                      <button
                        onClick={() => {
                          const cust = salonCustomers.find(
                            (c) => c.name.toLowerCase() === b.customerName.toLowerCase()
                          );
                          if (cust) setSelectedCustomer(cust);
                        }}
                        className="font-medium text-gray-900 hover:text-rose-700 hover:underline text-left flex items-center gap-1.5"
                      >
                        <User className="w-3.5 h-3.5 text-gray-400" />
                        <span>{b.customerName}</span>
                      </button>
                      <div className="text-[11px] text-gray-400">{b.phone}</div>
                    </td>
                    <td className="px-3.5 py-2.5 whitespace-nowrap text-gray-700">{b.serviceName}</td>
                    <td className="px-3.5 py-2.5 whitespace-nowrap text-gray-700">{b.staffName}</td>
                    <td className="px-3.5 py-2.5 whitespace-nowrap">
                      <div className="font-semibold text-gray-900">₹{b.price}</div>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.2 rounded border ${
                          b.paymentStatus === 'Paid'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                            : 'bg-amber-50 text-amber-700 border-amber-200/60'
                        }`}
                      >
                        {b.paymentStatus === 'Paid' ? `Paid (${b.paymentMethod || 'UPI'})` : 'Unpaid'}
                      </span>
                    </td>
                    <td className="px-3.5 py-2.5 whitespace-nowrap">
                      <StatusBadge status={b.status} />
                    </td>
                    <td className="px-3.5 py-2.5 whitespace-nowrap text-right space-x-1.5">
                      {b.status === 'Pending' && (
                        <button
                          onClick={() => confirmSalonBooking(b.id)}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition"
                          title="Confirm Appointment"
                        >
                          Confirm
                        </button>
                      )}

                      {b.paymentStatus === 'Pending' && (
                        <button
                          onClick={() => handleOpenPayment(b)}
                          className="px-2 py-1 bg-white hover:bg-gray-50 text-gray-700 rounded text-xs font-medium border border-gray-300 transition"
                          title="Record Payment"
                        >
                          <CreditCard className="w-3.5 h-3.5 inline mr-1 text-gray-500" />
                          Pay
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenWhatsApp(b)}
                        className="px-2 py-1 bg-white hover:bg-gray-50 text-emerald-700 rounded text-xs font-medium border border-gray-300 transition"
                        title="Simulate WhatsApp Confirmation"
                      >
                        <MessageSquare className="w-3.5 h-3.5 inline" />
                      </button>

                      {b.status !== 'Cancelled' && (
                        <button
                          onClick={() => cancelSalonBooking(b.id)}
                          className="px-1.5 py-1 text-gray-400 hover:text-rose-600 text-xs rounded transition"
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
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Customer Loyalty & History Records</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Click any customer to open their full profile and service history.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {salonCustomers.map((cust) => (
              <div
                key={cust.id}
                onClick={() => setSelectedCustomer(cust)}
                className="bg-white border border-gray-200 hover:border-gray-300 rounded-lg p-3.5 cursor-pointer transition space-y-2 hover:bg-gray-50/50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-md bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-700 font-bold text-xs">
                      {cust.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900">{cust.name}</h4>
                      <p className="text-xs text-gray-500">{cust.phone}</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-700 border border-gray-200">
                    {cust.totalVisits} Visits
                  </span>
                </div>

                <div className="text-xs text-gray-500 space-y-1 pt-1.5 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span>Last Visit:</span>
                    <span className="text-gray-800 font-medium">{cust.lastVisit}</span>
                  </div>
                  {cust.upcomingAppointment && (
                    <div className="flex justify-between text-rose-700 font-medium">
                      <span>Upcoming:</span>
                      <span>{cust.upcomingAppointment}</span>
                    </div>
                  )}
                </div>

                {cust.notes.length > 0 && (
                  <div className="bg-gray-50 p-2 rounded text-[11px] text-gray-600 italic line-clamp-1 border border-gray-200">
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
        <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-tight">Stylist Schedules & Load Today</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Assigned appointments and available openings across senior stylists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {salonStaff.map((staff) => (
              <div key={staff.id} className="bg-white border border-gray-200 rounded-lg p-3.5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">{staff.name}</h4>
                    <p className="text-xs text-gray-500">{staff.role}</p>
                  </div>
                  <span className="text-xs font-medium px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    {staff.activeAppointments} Booked
                  </span>
                </div>

                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Today's Bookings
                  </div>
                  <div className="space-y-1">
                    {staff.bookedSlots.length === 0 ? (
                      <div className="text-xs text-gray-400 italic">No bookings yet today</div>
                    ) : (
                      staff.bookedSlots.map((slot, i) => (
                        <div key={i} className="text-xs text-gray-800 bg-gray-50 p-1.5 rounded border border-gray-200">
                          {slot}
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Open Slots
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {staff.availableSlots.map((slot, i) => (
                      <span key={i} className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded">
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
            <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-lg border border-gray-200 text-xs">
              <div>
                <span className="text-gray-500 block text-[11px]">Total Visits</span>
                <span className="text-base font-bold text-gray-900">{selectedCustomer.totalVisits}</span>
              </div>
              <div>
                <span className="text-gray-500 block text-[11px]">Last Visit</span>
                <span className="text-base font-medium text-gray-800">{selectedCustomer.lastVisit}</span>
              </div>
              {selectedCustomer.upcomingAppointment && (
                <div className="col-span-2 pt-2 border-t border-gray-200 text-rose-700 font-medium">
                  <span className="text-gray-500 block text-[11px]">Upcoming Appointment:</span>
                  {selectedCustomer.upcomingAppointment}
                </div>
              )}
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Services Used History
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCustomer.servicesUsed.map((srv, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200"
                  >
                    {srv}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
                Customer Notes & Preferences
              </h4>
              <div className="space-y-1.5 max-h-32 overflow-y-auto mb-3">
                {selectedCustomer.notes.map((note, idx) => (
                  <div key={idx} className="text-xs text-gray-700 bg-gray-50 p-2 rounded border border-gray-200">
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
                  className="flex-1 bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-rose-500"
                />
                <button
                  type="submit"
                  disabled={!newNote.trim()}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs rounded-md transition disabled:opacity-50"
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
