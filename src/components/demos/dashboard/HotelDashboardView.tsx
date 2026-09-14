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
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="bg-white border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
              Front Desk & Rooms
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs font-medium text-emerald-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Live Reservations
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
            {customization.businessName}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Direct guest reservations, room inventory, and reception check-in workflow.
          </p>
        </div>

        <button
          onClick={() => setViewMode('customer')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs sm:text-sm shadow-sm transition"
        >
          <Eye className="w-4 h-4" />
          <span>Book Stay on Customer Side</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((metric, idx) => (
          <StatCard key={idx} metric={metric} />
        ))}
      </div>

      {/* Recent Reservations Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Recent Guest Reservations</h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Click <strong>Check In</strong> when a guest arrives at reception.
            </p>
          </div>
          <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded border border-gray-200">
            Direct Bookings
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider text-[11px] font-semibold border-b border-gray-200">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Booking ID</th>
                <th className="px-4 py-2.5 font-semibold">Guest Name</th>
                <th className="px-4 py-2.5 font-semibold">Room Type</th>
                <th className="px-4 py-2.5 font-semibold">Stay Duration</th>
                <th className="px-4 py-2.5 font-semibold">Tariff</th>
                <th className="px-4 py-2.5 font-semibold">Status</th>
                <th className="px-4 py-2.5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {hotelReservations.map((res) => (
                <tr key={res.id} className="hover:bg-gray-50/75 transition">
                  <td className="px-4 py-3 font-mono font-bold text-indigo-700">{res.bookingRef}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-semibold text-gray-900">{res.guestName}</div>
                    <div className="text-[11px] text-gray-500">{res.phone}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-700">{res.roomName}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-gray-600">
                    {res.nights} Nights ({res.checkIn} to {res.checkOut})
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="font-bold text-gray-900">₹{res.totalAmount.toLocaleString('en-IN')}</div>
                    <span className="text-[10px] text-emerald-700 font-medium">Paid Direct</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <StatusBadge status={res.status} />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right space-x-1.5">
                    {res.status === 'Pending' && (
                      <button
                        onClick={() => confirmHotelReservation(res.id)}
                        className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-xs font-medium transition shadow-sm"
                      >
                        Confirm
                      </button>
                    )}

                    {res.status === 'Confirmed' && (
                      <button
                        onClick={() => checkInHotelReservation(res.id)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium transition shadow-sm inline-flex items-center gap-1"
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        Check In
                      </button>
                    )}

                    <button
                      onClick={() => handleSendWhatsApp(res)}
                      className="px-2 py-1 bg-white hover:bg-emerald-50 text-emerald-700 rounded text-xs font-medium border border-gray-200 hover:border-emerald-300 transition"
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
