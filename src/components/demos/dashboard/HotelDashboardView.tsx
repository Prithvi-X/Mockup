import React from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { StatCard } from '../../common/StatCard';
import { StatusBadge } from '../../common/StatusBadge';
import { BedDouble, Check, LogIn, MessageSquare, Eye } from 'lucide-react';

export const HotelDashboardView: React.FC = () => {
  const {
    hotelReservations,
    confirmHotelReservation,
    checkInHotelReservation,
    openWhatsAppModal
  } = useWorkflow();

  const { customization, setViewMode } = useDemo();

  const totalBookings = hotelReservations.length;
  const checkedInCount = hotelReservations.filter((r) => r.status === 'Checked In').length;
  const totalRevenue = hotelReservations.reduce((acc, r) => acc + r.totalAmount, 0);

  const stats = [
    { label: 'Room Occupancy', value: '82%', change: '+12% this weekend', isPositive: true },
    { label: 'Available Rooms', value: '6 / 34', subtext: '28 occupied currently' },
    { label: 'Check-ins Today', value: String(checkedInCount + 4), subtext: `${checkedInCount} already at desk` },
    { label: 'Total Reservations', value: String(totalBookings), subtext: 'Direct web & desk' },
    { label: "Today's Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, change: 'Zero OTA commission', isPositive: true }
  ];

  const handleSendWhatsApp = (res: typeof hotelReservations[0]) => {
    openWhatsAppModal(
      res.guestName,
      res.phone,
      `Hello ${res.guestName},\n\nYour stay at ${customization.businessName} has been confirmed!\n\nBooking ID: #${res.bookingRef}\nRoom: ${res.roomName}\nDuration: ${res.nights} Nights (${res.checkIn} to ${res.checkOut})\nStatus: ${res.status}\n\nFront Desk: ${customization.phone}\nAddress: ${customization.address}\n\nWe look forward to welcoming you!`
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Banner */}
      <div className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 sm:p-7 flex flex-col md:flex-row md:items-center md:justify-between gap-5 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
              Hotel Management & Front Desk
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Live Reservations
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Direct guest reservations, room inventory, and fast check-in processing.
          </p>
        </div>

        <button
          onClick={() => setViewMode('customer')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-neutral-950 hover:bg-neutral-200 font-semibold text-xs sm:text-sm shadow-md transition"
        >
          <Eye className="w-4 h-4 text-indigo-600" />
          <span>Book Stay on Customer Side</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Recent Reservations Table */}
      <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-neutral-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Recent Guest Reservations</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Click <strong>Check In</strong> when a guest arrives at the reception desk.
            </p>
          </div>
          <span className="text-xs font-medium text-neutral-400 bg-neutral-800 px-2.5 py-1 rounded-lg">
            Direct Bookings
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-neutral-900/90 text-neutral-400 uppercase tracking-wider text-[11px] border-b border-neutral-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Booking ID</th>
                <th className="px-4 py-3 font-semibold">Guest Name</th>
                <th className="px-4 py-3 font-semibold">Room Type</th>
                <th className="px-4 py-3 font-semibold">Stay Duration</th>
                <th className="px-4 py-3 font-semibold">Tariff</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/60 text-neutral-200">
              {hotelReservations.map((res) => (
                <tr key={res.id} className="hover:bg-neutral-800/30 transition">
                  <td className="px-4 py-3.5 font-mono font-bold text-indigo-400">{res.bookingRef}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="font-semibold text-white">{res.guestName}</div>
                    <div className="text-[11px] text-neutral-400">{res.phone}</div>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-neutral-300">{res.roomName}</td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-neutral-300">
                    {res.nights} Nights ({res.checkIn} to {res.checkOut})
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <div className="font-bold text-white">₹{res.totalAmount.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-emerald-400 font-medium">Paid</span>
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap">
                    <StatusBadge status={res.status} />
                  </td>
                  <td className="px-4 py-3.5 whitespace-nowrap text-right space-x-1.5">
                    {res.status === 'Pending' && (
                      <button
                        onClick={() => confirmHotelReservation(res.id)}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow-sm transition"
                      >
                        Confirm
                      </button>
                    )}

                    {res.status === 'Confirmed' && (
                      <button
                        onClick={() => checkInHotelReservation(res.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-sm transition inline-flex items-center gap-1"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        Check In
                      </button>
                    )}

                    <button
                      onClick={() => handleSendWhatsApp(res)}
                      className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-emerald-400 rounded-lg text-xs font-medium border border-neutral-700 transition"
                      title="Send WhatsApp Arrival Slip"
                    >
                      <MessageSquare className="w-3.5 h-3.5 inline" />
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
