import React, { useState } from 'react';
import { useWorkflow } from '../../../context/WorkflowContext';
import { useDemo } from '../../../context/DemoContext';
import { BedDouble, Calendar, Users, Check, ArrowRight, CheckCircle2, MessageSquare } from 'lucide-react';

interface RoomOption {
  id: string;
  name: string;
  price: number;
  capacity: string;
  amenities: string[];
}

const ROOMS: RoomOption[] = [
  { id: 'rm-1', name: 'Deluxe King Room', price: 2499, capacity: '2 Adults', amenities: ['King Bed', 'Free WiFi', 'City View', 'Tea Maker'] },
  { id: 'rm-2', name: 'Executive Business Suite', price: 3499, capacity: '2 Adults, 1 Kid', amenities: ['Work Desk', 'Free Breakfast', 'Airport Pickup', 'Smart TV'] },
  { id: 'rm-3', name: 'Royal Grand Suite', price: 5499, capacity: '3 Adults', amenities: ['Master Bedroom', 'Bathtub', 'Living Area', 'Balcony Access'] }
];

export const HotelBookingFlow: React.FC = () => {
  const { addHotelReservation, openWhatsAppModal } = useWorkflow();
  const { customization, setViewMode } = useDemo();

  const activeRooms = (customization.hotelRoomsList && customization.hotelRoomsList.length > 0)
    ? customization.hotelRoomsList
    : ROOMS;

  const [selectedRoom, setSelectedRoom] = useState<RoomOption>(activeRooms[0] || ROOMS[0]);
  const [checkIn, setCheckIn] = useState('2026-09-18');
  const [checkOut, setCheckOut] = useState('2026-09-20');
  const [guests, setGuests] = useState('2 Adults');
  const [guestName, setGuestName] = useState('Vikram Malhotra');
  const [phone, setPhone] = useState('+91 98351 00124');
  const [email, setEmail] = useState('vikram.malhotra@example.com');
  const [nights, setNights] = useState(2);
  const [bookingRef, setBookingRef] = useState('H-2048');
  const [confirmed, setConfirmed] = useState(false);

  const totalAmount = selectedRoom.price * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `H-${Math.floor(2000 + Math.random() * 8000)}`;
    setBookingRef(ref);

    addHotelReservation({
      bookingRef: ref,
      guestName: guestName.trim() || 'Vikram Malhotra',
      phone: phone.trim() || '+91 98351 00124',
      email: email.trim(),
      roomName: selectedRoom.name,
      checkIn: checkIn,
      checkOut: checkOut,
      nights: nights,
      guests: guests,
      totalAmount: totalAmount,
      status: 'Confirmed',
      paymentStatus: 'Paid',
      paymentMethod: 'UPI'
    });

    setConfirmed(true);
  };

  const openWhatsAppSlip = () => {
    openWhatsAppModal(
      guestName,
      phone,
      `Hello ${guestName},\n\nYour reservation at ${customization.businessName} is confirmed!\n\nBooking Ref: #${bookingRef}\nRoom: ${selectedRoom.name}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut} (${nights} nights)\nGuests: ${guests}\nTotal Amount: ₹${totalAmount.toLocaleString('en-IN')}\n\nFront Desk: ${customization.phone}\nAddress: ${customization.address}\n\nHave a pleasant stay!`
    );
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {confirmed ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6 text-center space-y-4 shadow-sm animate-in fade-in duration-200">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-0.5">
              Reservation Confirmed
            </div>
            <h3 className="text-xl font-bold text-gray-900">Booking ID #{bookingRef}</h3>
            <p className="text-xs text-gray-500 mt-1">
              Thank you, {guestName}. Your room at {customization.businessName} has been booked.
            </p>
          </div>

          <div className="bg-gray-50 p-3.5 rounded-md border border-gray-200 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-500">Room</span>
              <span className="font-semibold text-gray-900">{selectedRoom.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-500">Duration</span>
              <span className="font-medium text-gray-900">{nights} Nights ({checkIn} to {checkOut})</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-1.5">
              <span className="text-gray-500">Guests</span>
              <span className="font-medium text-gray-900">{guests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Total Tariff</span>
              <span className="font-bold text-gray-900">₹{totalAmount.toLocaleString('en-IN')} (Paid)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-md bg-gray-900 hover:bg-gray-800 text-white font-medium text-xs shadow-sm transition"
            >
              <span>View in Hotel Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={openWhatsAppSlip}
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs shadow-sm transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Simulate WhatsApp Slip</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Book Your Stay</h3>
            <p className="text-xs text-gray-500">Direct booking at {customization.businessName} with zero OTA commissions.</p>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200 text-xs">
            <div>
              <label className="text-gray-700 block mb-1 font-medium text-[11px]">
                Check-In Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md p-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 block mb-1 font-medium text-[11px]">
                Check-Out Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md p-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="text-gray-700 block mb-1 font-medium text-[11px]">
                Guests & Nights
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-white border border-gray-300 rounded-md p-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="1 Adult">1 Adult</option>
                <option value="2 Adults">2 Adults</option>
                <option value="2 Adults, 1 Kid">2 Adults, 1 Kid</option>
                <option value="Family (4 Guests)">Family (4 Guests)</option>
              </select>
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-2.5">
            <label className="block text-xs font-medium text-gray-700">
              Select Room Category
            </label>
            <div className="space-y-2">
              {activeRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                    selectedRoom.id === room.id
                      ? 'bg-indigo-50/50 border-indigo-500 text-gray-900 shadow-sm ring-1 ring-indigo-400/30'
                      : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs sm:text-sm text-gray-900 flex items-center gap-2">
                      <span>{room.name}</span>
                      <span className="text-[11px] bg-gray-100 text-gray-600 border border-gray-200 px-2 py-0.5 rounded font-normal">
                        {room.capacity}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1.5 text-[11px] text-gray-500">
                      {room.amenities.map((am, i) => (
                        <span key={i} className="bg-gray-100 px-1.5 py-0.5 rounded border border-gray-200">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-sm sm:text-base font-bold text-indigo-700">₹{room.price}</div>
                    <div className="text-[10px] text-gray-400">per night</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Details */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 space-y-3 text-xs">
            <h4 className="font-semibold text-gray-800 text-xs">Primary Guest Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-xs text-gray-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-between border-t border-gray-200">
            <div>
              <span className="text-xs text-gray-500 block">Total Due for {nights} Nights</span>
              <span className="text-base font-bold text-gray-900">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs shadow-sm transition"
            >
              <Check className="w-4 h-4" />
              <span>Confirm Reservation</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
