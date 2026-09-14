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
        <div className="bg-neutral-950 rounded-2xl border border-neutral-800 p-6 sm:p-8 text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <div className="text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              Reservation Confirmed
            </div>
            <h3 className="text-2xl font-extrabold text-white">Booking ID #{bookingRef}</h3>
            <p className="text-xs text-neutral-400 mt-1">
              Thank you, {guestName}. Your room at {customization.businessName} has been booked.
            </p>
          </div>

          <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800 text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Room</span>
              <span className="font-semibold text-white">{selectedRoom.name}</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Duration</span>
              <span className="font-semibold text-white">{nights} Nights ({checkIn} to {checkOut})</span>
            </div>
            <div className="flex justify-between border-b border-neutral-800 pb-2">
              <span className="text-neutral-400">Guests</span>
              <span className="font-semibold text-white">{guests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-400">Total Tariff</span>
              <span className="font-bold text-emerald-400">₹{totalAmount.toLocaleString('en-IN')} (Paid)</span>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => setViewMode('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-white text-neutral-950 font-semibold text-xs transition shadow"
            >
              <span>View in Hotel Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={openWhatsAppSlip}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Simulate WhatsApp Slip</span>
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Book Your Stay</h3>
            <p className="text-xs text-neutral-400">Direct booking at {customization.businessName} with zero OTA commissions.</p>
          </div>

          {/* Dates & Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-xs">
            <div>
              <label className="text-neutral-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                Check-In Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white"
                required
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                Check-Out Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white"
                required
              />
            </div>
            <div>
              <label className="text-neutral-400 block mb-1 font-semibold uppercase tracking-wider text-[10px]">
                Guests & Nights
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg p-2 text-white"
              >
                <option value="1 Adult">1 Adult</option>
                <option value="2 Adults">2 Adults</option>
                <option value="2 Adults, 1 Kid">2 Adults, 1 Kid</option>
                <option value="Family (4 Guests)">Family (4 Guests)</option>
              </select>
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-3">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Select Room Category
            </label>
            <div className="space-y-2.5">
              {activeRooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                    selectedRoom.id === room.id
                      ? 'bg-neutral-800/90 border-indigo-500 text-white shadow-md ring-1 ring-indigo-500/40'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <div>
                    <div className="font-bold text-sm text-white flex items-center gap-2">
                      <span>{room.name}</span>
                      <span className="text-[11px] bg-neutral-900 text-neutral-400 px-2 py-0.5 rounded font-normal">
                        {room.capacity}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1.5 text-[11px] text-neutral-400">
                      {room.amenities.map((am, i) => (
                        <span key={i} className="bg-neutral-900/90 px-1.5 py-0.5 rounded border border-neutral-800">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-base font-extrabold text-indigo-400">₹{room.price}</div>
                    <div className="text-[10px] text-neutral-400">per night</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Guest Details */}
          <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Primary Guest Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Full Name"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                required
              />
              <input
                type="tel"
                placeholder="WhatsApp Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white"
                required
              />
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
            <div>
              <span className="text-xs text-neutral-400 block">Total Due for {nights} Nights</span>
              <span className="text-lg font-extrabold text-white">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md transition"
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
