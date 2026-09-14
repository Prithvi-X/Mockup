import {
  SalonBooking,
  SalonCustomer,
  SalonStaff,
  HotelReservation,
  RestaurantOrder,
  RestaurantTable,
  GymMember,
  ClinicAppointment,
  CrmLead,
  NotificationItem,
  ActivityItem
} from '../types/showroom';

export const INITIAL_SALON_BOOKINGS: SalonBooking[] = [
  {
    id: 'apt-1',
    token: 'A-101',
    customerName: 'Priya Sharma',
    phone: '+91 94311 88210',
    serviceName: 'Haircut & Styling',
    staffName: 'Pooja',
    date: 'Today',
    time: '10:00 AM',
    price: 450,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    notes: 'Requested natural layer cut',
    createdAt: '10 mins ago'
  },
  {
    id: 'apt-2',
    token: 'A-102',
    customerName: 'Riya Singh',
    phone: '+91 98350 44122',
    serviceName: 'Keratin Hair Spa',
    staffName: 'Rahul',
    date: 'Today',
    time: '10:30 AM',
    price: 1800,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI',
    notes: 'Mild scalp sensitivity',
    createdAt: '35 mins ago'
  },
  {
    id: 'apt-3',
    token: 'A-103',
    customerName: 'Anjali Kumar',
    phone: '+91 82104 99182',
    serviceName: 'Organic Glow Facial',
    staffName: 'Pooja',
    date: 'Today',
    time: '11:00 AM',
    price: 1200,
    status: 'Pending',
    paymentStatus: 'Pending',
    notes: 'First time visitor',
    createdAt: '45 mins ago'
  },
  {
    id: 'apt-4',
    token: 'A-104',
    customerName: 'Rajesh Verma',
    phone: '+91 99341 62710',
    serviceName: 'Beard Grooming & Haircut',
    staffName: 'Neha',
    date: 'Today',
    time: '11:45 AM',
    price: 550,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Cash',
    notes: 'Regular customer',
    createdAt: '1 hr ago'
  },
  {
    id: 'apt-5',
    token: 'A-105',
    customerName: 'Sneha Sen',
    phone: '+91 97711 34912',
    serviceName: 'Bridal Consultation',
    staffName: 'Rahul',
    date: 'Today',
    time: '12:30 PM',
    price: 2500,
    status: 'Pending',
    paymentStatus: 'Pending',
    notes: 'Pre-wedding skin & hair package inquiry',
    createdAt: '2 hrs ago'
  }
];

export const INITIAL_SALON_CUSTOMERS: SalonCustomer[] = [
  {
    id: 'cust-1',
    name: 'Priya Sharma',
    phone: '+91 94311 88210',
    email: 'priya.sharma@example.com',
    totalVisits: 7,
    lastVisit: '12 Sep 2026',
    upcomingAppointment: 'Today, 10:00 AM (Haircut & Styling)',
    servicesUsed: ['Haircut & Styling', 'Keratin Hair Spa', 'Glow Facial', 'Haircut & Styling'],
    notes: [
      'Prefers Pooja as her senior stylist',
      'Uses organic argan oil serum finish',
      'Always prefers morning slots before 11:30 AM'
    ]
  },
  {
    id: 'cust-2',
    name: 'Riya Singh',
    phone: '+91 98350 44122',
    totalVisits: 4,
    lastVisit: 'Today, 10:30 AM',
    servicesUsed: ['Keratin Hair Spa', 'Manicure', 'Hair Spa'],
    notes: ['Enjoys green tea during treatments', 'Sensitive scalp']
  },
  {
    id: 'cust-3',
    name: 'Swati Mishra',
    phone: '+91 82104 99182',
    totalVisits: 12,
    lastVisit: 'Yesterday',
    servicesUsed: ['Organic Glow Facial', 'Haircut', 'Eyebrow Shaping'],
    notes: ['VIP member, always pays via PhonePe UPI']
  },
  {
    id: 'cust-4',
    name: 'Deepak Choudhury',
    phone: '+91 99341 62710',
    totalVisits: 6,
    lastVisit: '3 days ago',
    servicesUsed: ['Beard Grooming & Haircut', 'Scalp Detox'],
    notes: ['Prefers Saturday afternoon slots']
  }
];

export const INITIAL_SALON_STAFF: SalonStaff[] = [
  {
    id: 'staff-1',
    name: 'Pooja',
    role: 'Senior Hair & Color Stylist',
    availableSlots: ['01:00 PM', '02:30 PM', '04:00 PM', '05:30 PM'],
    bookedSlots: ['10:00 AM (Priya S.)', '11:00 AM (Anjali K.)'],
    activeAppointments: 2
  },
  {
    id: 'staff-2',
    name: 'Rahul',
    role: 'Creative Stylist & Treatments',
    availableSlots: ['01:30 PM', '03:00 PM', '04:30 PM', '06:00 PM'],
    bookedSlots: ['10:30 AM (Riya S.)', '12:30 PM (Sneha S.)'],
    activeAppointments: 2
  },
  {
    id: 'staff-3',
    name: 'Neha',
    role: 'Skin & Beauty Specialist',
    availableSlots: ['10:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'],
    bookedSlots: ['11:45 AM (Rajesh V.)'],
    activeAppointments: 1
  }
];

export const INITIAL_HOTEL_RESERVATIONS: HotelReservation[] = [
  {
    id: 'res-1',
    bookingRef: 'H-2045',
    guestName: 'Vikram Malhotra',
    phone: '+91 98351 00124',
    roomName: 'Deluxe King Room',
    checkIn: 'Today',
    checkOut: '16 Sep 2026',
    nights: 2,
    guests: '2 Adults',
    totalAmount: 4998,
    status: 'Checked In',
    paymentStatus: 'Paid',
    paymentMethod: 'UPI'
  },
  {
    id: 'res-2',
    bookingRef: 'H-2046',
    guestName: 'Sunita Sen',
    phone: '+91 94311 77120',
    roomName: 'Executive Business Suite',
    checkIn: 'Today',
    checkOut: '17 Sep 2026',
    nights: 3,
    guests: '1 Adult',
    totalAmount: 11697,
    status: 'Confirmed',
    paymentStatus: 'Paid',
    paymentMethod: 'Card'
  },
  {
    id: 'res-3',
    bookingRef: 'H-2047',
    guestName: 'Dr. Alok Gupta',
    phone: '+91 82103 44109',
    roomName: 'Deluxe King Room',
    checkIn: 'Today',
    checkOut: 'Tomorrow',
    nights: 1,
    guests: '1 Adult',
    totalAmount: 2499,
    status: 'Checked In',
    paymentStatus: 'Paid',
    paymentMethod: 'Cash'
  },
  {
    id: 'res-4',
    bookingRef: 'H-2048',
    guestName: 'Meera Deshmukh',
    phone: '+91 91024 99012',
    roomName: 'Executive Business Suite',
    checkIn: 'Today',
    checkOut: '16 Sep 2026',
    nights: 2,
    guests: '2 Adults',
    totalAmount: 7798,
    status: 'Pending',
    paymentStatus: 'Pending'
  }
];

export const INITIAL_RESTAURANT_ORDERS: RestaurantOrder[] = [
  {
    id: 'ord-1',
    orderNumber: 'TK-108',
    customerName: 'Priya Sharma',
    phone: '+91 94311 88210',
    type: 'Dine In',
    tableNumber: 'Table 4',
    items: [
      { name: 'Chicken Butter Masala', quantity: 1, price: 360 },
      { name: 'Garlic Naan', quantity: 3, price: 240 },
      { name: 'Desi Masala Lemonade', quantity: 1, price: 80 }
    ],
    totalAmount: 680,
    status: 'Preparing',
    orderTime: '8 mins ago'
  },
  {
    id: 'ord-2',
    orderNumber: 'TK-109',
    customerName: 'Kunal Verma',
    phone: '+91 98350 22019',
    type: 'Dine In',
    tableNumber: 'Table 7',
    items: [
      { name: 'Paneer Angara Tikka', quantity: 1, price: 280 },
      { name: 'Dal Makhani', quantity: 1, price: 260 }
    ],
    totalAmount: 540,
    status: 'Ready',
    orderTime: '14 mins ago'
  },
  {
    id: 'ord-3',
    orderNumber: 'TK-110',
    customerName: 'Rohit Tiwary',
    phone: '+91 82105 88123',
    type: 'Takeaway',
    items: [
      { name: 'Mutton Handi Biryani', quantity: 2, price: 760 }
    ],
    totalAmount: 760,
    status: 'New',
    orderTime: '3 mins ago'
  }
];

export const INITIAL_RESTAURANT_TABLES: RestaurantTable[] = [
  { id: 't1', name: 'Table 1', capacity: 2, status: 'Available' },
  { id: 't2', name: 'Table 2', capacity: 2, status: 'Occupied', reservedFor: 'Arvind Pandey' },
  { id: 't3', name: 'Table 3', capacity: 4, status: 'Available' },
  { id: 't4', name: 'Table 4', capacity: 4, status: 'Occupied', reservedFor: 'Priya Sharma (Order TK-108)' },
  { id: 't5', name: 'Table 5', capacity: 6, status: 'Reserved', reservedFor: 'Dr. Sinha Family (1:30 PM)' },
  { id: 't6', name: 'Table 6', capacity: 6, status: 'Available' },
  { id: 't7', name: 'Table 7', capacity: 2, status: 'Occupied', reservedFor: 'Kunal Verma' },
  { id: 't8', name: 'Table 8 (Family Lounge)', capacity: 8, status: 'Available' }
];

export const INITIAL_GYM_MEMBERS: GymMember[] = [
  {
    id: 'mem-1',
    memberCode: 'RFC-101',
    name: 'Amit Verma',
    phone: '+91 91024 88300',
    planName: 'Annual VIP Athlete',
    planPrice: 7999,
    startDate: '15 Jan 2026',
    expiryDate: '14 Jan 2027',
    paymentStatus: 'Paid',
    status: 'Active',
    lastAttendance: 'Today, 06:15 AM',
    totalCheckins: 148
  },
  {
    id: 'mem-2',
    memberCode: 'RFC-102',
    name: 'Neha Roy',
    phone: '+91 98351 11200',
    planName: 'Quarterly Transformation',
    planPrice: 2499,
    startDate: '01 Jul 2026',
    expiryDate: '30 Sep 2026',
    paymentStatus: 'Paid',
    status: 'Expiring Soon',
    lastAttendance: 'Today, 06:45 AM',
    totalCheckins: 52
  },
  {
    id: 'mem-3',
    memberCode: 'RFC-103',
    name: 'Rahul Singh',
    phone: '+91 94311 44091',
    planName: 'Monthly Flexible',
    planPrice: 999,
    startDate: '14 Aug 2026',
    expiryDate: '13 Sep 2026',
    paymentStatus: 'Pending',
    status: 'Expired',
    lastAttendance: 'Yesterday',
    totalCheckins: 22
  },
  {
    id: 'mem-4',
    memberCode: 'RFC-104',
    name: 'Pooja Jha',
    phone: '+91 82103 77129',
    planName: 'Quarterly Transformation',
    planPrice: 2499,
    startDate: '10 Aug 2026',
    expiryDate: '09 Nov 2026',
    paymentStatus: 'Paid',
    status: 'Active',
    lastAttendance: 'Today, 07:30 AM',
    totalCheckins: 28
  }
];

export const INITIAL_CLINIC_APPOINTMENTS: ClinicAppointment[] = [
  {
    id: 'cln-1',
    tokenNumber: 'A-015',
    patientName: 'Ramesh Prasad',
    phone: '+91 98355 66010',
    age: '58y',
    doctorName: 'Dr. Arvind Sharma',
    specialty: 'General Medicine',
    date: 'Today',
    time: '09:30 AM',
    reason: 'Hypertension & BP Review',
    status: 'Completed',
    consultationFee: 500,
    notes: ['Prescribed Telmisartan 40mg once daily', 'Advised 15-day review with lipid profile']
  },
  {
    id: 'cln-2',
    tokenNumber: 'A-016',
    patientName: 'Vandana Devi',
    phone: '+91 94311 00219',
    age: '42y',
    doctorName: 'Dr. Sneha Rao',
    specialty: 'Dentistry',
    date: 'Today',
    time: '10:00 AM',
    reason: 'Root Canal Session 2',
    status: 'Completed',
    consultationFee: 400,
    notes: ['Canal obturation completed successfully', 'Crown fitting appointment scheduled in 5 days']
  },
  {
    id: 'cln-3',
    tokenNumber: 'A-017',
    patientName: 'Ayush Kumar',
    phone: '+91 82104 22109',
    age: '12y',
    doctorName: 'Dr. Arvind Sharma',
    specialty: 'General Medicine',
    date: 'Today',
    time: '10:30 AM',
    reason: 'Viral Fever & Dry Cough',
    status: 'In Consultation',
    consultationFee: 500,
    notes: ['Temperature 100.4 F', 'Mild throat congestion']
  },
  {
    id: 'cln-4',
    tokenNumber: 'A-018',
    patientName: 'Manisha Kumari',
    phone: '+91 99341 88012',
    age: '29y',
    doctorName: 'Dr. Sneha Rao',
    specialty: 'Dentistry',
    date: 'Today',
    time: '11:00 AM',
    reason: 'Dental Scaling & Polish',
    status: 'Waiting',
    consultationFee: 400,
    notes: []
  },
  {
    id: 'cln-5',
    tokenNumber: 'A-019',
    patientName: 'Suresh Mandal',
    phone: '+91 97714 55001',
    age: '64y',
    doctorName: 'Dr. Arvind Sharma',
    specialty: 'General Medicine',
    date: 'Today',
    time: '11:30 AM',
    reason: 'Diabetes Blood Sugar Follow-up',
    status: 'Waiting',
    consultationFee: 500,
    notes: ['Fasting BS 138 mg/dL, Post-meal 194 mg/dL']
  }
];

export const INITIAL_CRM_LEADS: CrmLead[] = [
  {
    id: 'lead-1',
    leadCode: 'LEAD-501',
    companyName: 'Jharkhand Fleet Logistics',
    contactPerson: 'Rajesh Singh',
    phone: '+91 94311 00880',
    requirement: 'Driver dispatch app & diesel expense tracking',
    budgetRange: '₹1,00,000 - ₹1,50,000',
    estimatedValue: 120000,
    stage: 'Proposal Sent',
    createdAt: 'Yesterday',
    notes: 'Quotation sent for 12 vehicle setup. Meeting on Friday.'
  },
  {
    id: 'lead-2',
    leadCode: 'LEAD-502',
    companyName: 'Singh Dental Studio',
    contactPerson: 'Dr. Manisha Singh',
    phone: '+91 98351 77209',
    requirement: 'Patient appointment system with WhatsApp reminders',
    budgetRange: '₹40,000 - ₹60,000',
    estimatedValue: 45000,
    stage: 'Contacted',
    createdAt: '2 days ago',
    notes: 'Demonstrated clinic software. Very positive response.'
  },
  {
    id: 'lead-3',
    leadCode: 'LEAD-503',
    companyName: 'Blue Pearl Events & Catering',
    contactPerson: 'Anand Topno',
    phone: '+91 82103 44091',
    requirement: 'Hall booking schedule & food menu quotation builder',
    budgetRange: '₹60,000 - ₹80,000',
    estimatedValue: 75000,
    stage: 'Contacted',
    createdAt: '3 days ago',
    notes: 'Requested a demonstration on banquet room availability.'
  },
  {
    id: 'lead-4',
    leadCode: 'LEAD-504',
    companyName: 'Chotanagpur Stone Quarries',
    contactPerson: 'Sandeep Mahto',
    phone: '+91 91024 33019',
    requirement: 'Weighbridge slip digitizer & agent credit accounts',
    budgetRange: '₹1,50,000+',
    estimatedValue: 185000,
    stage: 'New',
    createdAt: 'Today, 09:15 AM',
    notes: 'Inquiry received through custom website form.'
  },
  {
    id: 'lead-5',
    leadCode: 'LEAD-505',
    companyName: 'Royal Sweets & Bakery',
    contactPerson: 'Manoj Gupta',
    phone: '+91 99341 55210',
    requirement: 'POS billing & daily inventory counter',
    budgetRange: '₹50,000 - ₹70,000',
    estimatedValue: 60000,
    stage: 'Won',
    createdAt: '1 week ago',
    notes: 'Contract signed and initial advance received.'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'New Booking from Priya Sharma',
    time: '10 mins ago',
    detail: 'Haircut & Styling scheduled for Today at 10:00 AM',
    read: false,
    category: 'salon'
  },
  {
    id: 'notif-2',
    title: 'Payment Received (₹1,800)',
    time: '35 mins ago',
    detail: 'Riya Singh settled Keratin Hair Spa via PhonePe UPI',
    read: false,
    category: 'salon'
  },
  {
    id: 'notif-3',
    title: 'Kitchen Order Ready (#TK-109)',
    time: '45 mins ago',
    detail: 'Table 7 order ready for table service',
    read: false,
    category: 'restaurant'
  },
  {
    id: 'notif-4',
    title: 'Hotel Check-In Completed',
    time: '1 hr ago',
    detail: 'Vikram Malhotra checked into Deluxe Room 204',
    read: true,
    category: 'hotel'
  }
];

export const INITIAL_ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    time: '10:00 AM',
    title: 'Appointment Confirmed',
    detail: 'Priya Sharma appointment assigned to Pooja',
    status: 'Confirmed'
  },
  {
    id: 'act-2',
    time: '09:45 AM',
    title: 'Payment Received',
    detail: '₹1,800 collected via UPI from Riya Singh',
    status: 'Completed'
  },
  {
    id: 'act-3',
    time: '09:15 AM',
    title: 'New Inquiry Logged',
    detail: 'Chotanagpur Quarries requested custom weighbridge tool',
    status: 'New'
  },
  {
    id: 'act-4',
    time: '08:45 AM',
    title: 'Patient Consulted',
    detail: 'Dr. Arvind Sharma completed consultation for Ramesh Prasad',
    status: 'Completed'
  }
];
