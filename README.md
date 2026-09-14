# ATMAN Software — Master Software Demo Showroom (Phase 2)

An interactive, responsive, offline-first sales showroom with **working simulated end-to-end workflows** for selling custom software to local businesses (Salons, Hotels, Restaurants, Gyms, Clinics, CRMs, and Bespoke Operations).

---

## 🚀 Quick Start (Local & 100% Offline)

Ensure dependencies are installed:
```bash
npm install
```

Start the interactive showroom locally:
```bash
npm run dev
```
Open **`http://localhost:5173`** on your laptop, tablet, or phone.

Build for production verification:
```bash
npm run build
```

---

## 🔁 The Phase 2 Interactive Loop

Every industry demonstrates the core value proposition of custom software:
```text
CUSTOMER VIEW
   ↓
Customer books an appointment, orders food, reserves a room, or requests a quote
   ↓
BUSINESS DASHBOARD
   ↓
New transaction appears immediately in real-time
   ↓
Owner takes action (Confirms, Checks-in, Advances Kitchen Ticket, Calls Next Token, Moves CRM Deal)
   ↓
Customer record, stats, revenue, activity feed, and notification badges update live!
```

---

## ⚡ 60-Second "Quick Demo" Guide for In-Person Pitches

When an owner only gives you 1–2 minutes, use the **[⚡ Quick Demo]** button in the top toolbar:

### 1. Salon & Beauty (*Ranchi Hair Studio*) — Priority Sales Demo
1. Open Salon Demo → Click **Quick Demo** (or tap **Customer View**).
2. **Step 1 (Service)**: Select *Keratin Hair Spa (₹800)*.
3. **Step 2 (Staff & Slots)**: Choose *Pooja (Senior Stylist)* and slot *04:30 PM*. Notice unavailable slots are crossed out.
4. **Step 3 (Contact)**: Enter or keep *Priya Sharma (+91 94311 88210)*.
5. **Step 4 (Review)**: Tap *Confirm Appointment* → generates **Token #A-104**.
6. **WhatsApp Simulation**: Tap *Simulate WhatsApp Slip* to show the formatted WhatsApp confirmation message!
7. **Switch to Business Dashboard**:
   - The new booking appears at the top of the schedule under **Pending**.
   - Tap **Confirm** → status turns green (**Confirmed**), today's confirmed count increases, and revenue updates.
   - Tap **Pay** → choose UPI / Cash / Card → status updates to **Paid**.
   - Tap **Priya Sharma** → her full customer profile modal opens showing total visits, past services, and an **Add Note** box where typing immediately adds a custom preference note to her permanent file!
   - Tap **Stylist Schedules** tab → Pooja's schedule reflects the newly assigned booking.
8. **Reset**: Tap **Reset Demo** in the toolbar to restore defaults for your next pitch!

### 2. Hotel & Hospitality (*Ranchi Grand Hotel*)
1. Customer View: Select check-in / check-out dates, guests, choose *Executive Business Suite (₹3,499/night)*.
2. Confirm reservation → generates **Booking ID #H-2048**.
3. Switch to Dashboard: Reservation appears in the list.
4. Owner taps **Confirm** → then taps **Check In** to assign the room.

### 3. Restaurant & Café (*The Ranchi Kitchen*)
1. Customer View: Browse digital menu, add *Mutton Handi Biryani* + *Butter Garlic Naan*, select *Dine In (Table 4)*.
2. Tap *Place Order* → generates **Order #TK-1042**.
3. Switch to Dashboard: Order appears on the **Kitchen Order Ticket (KOT)** display.
4. Advance ticket sequentially: **Accept Order → Mark as Ready → Mark as Completed / Billed**.
5. Switch to **Table Layout** tab: Tap any table to toggle status between *Available*, *Reserved*, and *Occupied*.

### 4. Gym & Fitness (*Ranchi Fitness Club*)
1. Customer View: Choose *Quarterly Transformation (₹2,499)*, enter member details, tap *Join Now*.
2. Switch to Dashboard: New member appears in the directory with active status.
3. Tap **Check In**: 1-tap biometric timestamp logs today's attendance.
4. Tap **Renew**: Simulates instant 3-month renewal.

### 5. Clinic & Healthcare (*CarePlus Clinic*)
1. Customer View: Select *Dr. Arvind Sharma (MD)*, select slot, enter patient details, tap *Confirm & Generate Token* → generates **Token #A-020**.
2. Switch to Dashboard: Token banner displays current patient in chamber.
3. Tap **Call Next Patient**: The token board animates to the next patient in line and updates consultation counters!
4. Tap patient name → opens Consultation Notes modal with live note saving.

### 6. Business & CRM (*ATMAN Business CRM*)
1. Customer View: Fill in company name, requirement, and budget range → tap *Request Proposal*.
2. Switch to Dashboard: Deal appears in the **Visual Kanban Pipeline**.
3. Use the arrow buttons on deal cards to advance opportunities: **New → Contacted → Proposal Sent → Won** and watch the active pipeline value re-calculate in real time!

---

## 🔔 Universal Showroom Enhancements

- **Notification Center**: Bell icon with unread count badge in toolbar displays live system events.
- **WhatsApp Simulator**: Realistic WhatsApp message preview modal with 1-click text copy and delivery simulation.
- **Payment Recorder**: Cash, UPI, and Card recording modal.
- **Live Demo Mode**: Subtle presenter status bar in the top toolbar.
- **Complete Reset**: **Reset Demo** clears all newly added bookings, orders, members, leads, and notes, returning all data to pristine showroom defaults.
- **100% Offline-Ready**: Works without internet connection during in-person visits.
