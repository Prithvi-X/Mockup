import { BusinessCategory, BusinessData, CategoryCardData } from '../types/showroom';

export const BUSINESS_CATEGORIES: CategoryCardData[] = [
  {
    id: 'salon',
    name: 'Ranchi Hair Studio',
    label: 'Salon & Beauty',
    tagline: 'Salon Management System',
    description: 'Appointments, services, staff schedules and customer management.',
    previewFeatures: [
      'Appointment booking',
      'Service catalog',
      'Staff management',
      'Customer records'
    ],
    icon: 'Sparkles',
    themeColor: 'rose',
    badge: 'High Demand'
  },
  {
    id: 'hotel',
    name: 'Ranchi Grand Hotel',
    label: 'Hotel & Hospitality',
    tagline: 'Hotel Reservation & Front Desk',
    description: 'Rooms, reservations, guest information and booking management.',
    previewFeatures: [
      'Room availability',
      'Reservations',
      'Guest management',
      'Booking dashboard'
    ],
    icon: 'Building2',
    themeColor: 'indigo',
    badge: 'Popular'
  },
  {
    id: 'restaurant',
    name: 'The Ranchi Kitchen',
    label: 'Restaurant & Café',
    tagline: 'Table & Digital Ordering System',
    description: 'Digital menus, orders, tables and customer interactions.',
    previewFeatures: [
      'Digital menu',
      'Table reservations',
      'Online ordering',
      'Order dashboard'
    ],
    icon: 'UtensilsCrossed',
    themeColor: 'amber',
    badge: 'Fast ROI'
  },
  {
    id: 'gym',
    name: 'Ranchi Fitness Club',
    label: 'Gym & Fitness',
    tagline: 'Member & Renewal Manager',
    description: 'Members, memberships, attendance and renewals.',
    previewFeatures: [
      'Member management',
      'Membership plans',
      'Attendance tracking',
      'Renewal alerts'
    ],
    icon: 'Dumbbell',
    themeColor: 'emerald',
    badge: 'Recurring'
  },
  {
    id: 'clinic',
    name: 'CarePlus Clinic',
    label: 'Clinic & Healthcare',
    tagline: 'Patient & Doctor Appointments',
    description: 'Appointments, patients, schedules and follow-ups.',
    previewFeatures: [
      'Appointment booking',
      'Patient records',
      'Doctor schedules',
      'Follow-up reminders'
    ],
    icon: 'Stethoscope',
    themeColor: 'cyan',
    badge: 'Essential'
  },
  {
    id: 'crm',
    name: 'ATMAN Business CRM',
    label: 'Business & CRM',
    tagline: 'Lead Pipeline & Client Portal',
    description: 'Leads, customers, follow-ups and business operations.',
    previewFeatures: [
      'Lead management',
      'Customer records',
      'Follow-ups',
      'Operations dashboard'
    ],
    icon: 'Briefcase',
    themeColor: 'violet',
    badge: 'Flexible'
  }
];

export const BUSINESS_DATA_MAP: Record<BusinessCategory, BusinessData> = {
  salon: {
    id: 'salon',
    name: 'Ranchi Hair Studio',
    label: 'Salon & Beauty',
    tagline: 'Appointments, staff schedules & customer loyalty',
    category: 'Salon Management System',
    description: 'Custom booking and management software built for modern salons and beauty studios.',
    defaultCustomization: {
      businessName: 'Ranchi Hair Studio',
      tagline: 'Premium Hair, Skin & Spa Grooming',
      accentColor: 'rose',
      phone: '+91 98351 22440',
      whatsapp: '+91 98351 22440',
      address: 'Main Road, Near Plaza Chowk, Ranchi, Jharkhand',
      website: 'www.ranchihair.local',
      salonServices: [
        { id: 'srv-1', name: 'Haircut & Styling', price: 300, duration: '30 mins', desc: 'Precision cut tailored to your face structure' },
        { id: 'srv-2', name: 'Keratin Hair Spa', price: 800, duration: '45 mins', desc: 'Deep nourishment, steam therapy, and frizz reduction' },
        { id: 'srv-3', name: 'Organic Glow Facial', price: 600, duration: '45 mins', desc: 'Herbal fruit extraction with gentle hydration' },
        { id: 'srv-4', name: 'Beard Grooming & Trim', price: 250, duration: '20 mins', desc: 'Hot towel prep with organic beard oil finish' },
        { id: 'srv-5', name: 'Complete Bridal / Groom Package', price: 1499, duration: '90 mins', desc: 'Full glow facial, hair spa, styling, and manicure' }
      ],
      salonStaffList: [
        { id: 'staff-1', name: 'Pooja', role: 'Senior Hair Stylist' },
        { id: 'staff-2', name: 'Rahul', role: 'Creative Stylist & Treatments' },
        { id: 'staff-3', name: 'Neha', role: 'Skin & Beauty Specialist' }
      ]
    },
    stats: [
      { label: "Today's Appointments", value: '18', change: '+4 from yesterday', isPositive: true },
      { label: 'Confirmed', value: '14', subtext: 'Scheduled on time' },
      { label: 'Pending', value: '3', subtext: 'Awaiting client reply' },
      { label: 'Completed', value: '11', subtext: 'Services rendered' },
      { label: "Today's Revenue", value: '₹8,450', change: '+18% vs avg weekday', isPositive: true }
    ],
    sidebarItems: [
      { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
      { id: 'appointments', label: 'Appointments', icon: 'CalendarDays', badge: '18' },
      { id: 'customers', label: 'Customers', icon: 'Users' },
      { id: 'services', label: 'Services', icon: 'Sparkles' },
      { id: 'staff', label: 'Staff', icon: 'UserCheck' },
      { id: 'reports', label: 'Reports', icon: 'BarChart3' },
      { id: 'settings', label: 'Settings', icon: 'Settings' }
    ],
    featuresList: [
      {
        title: 'Appointment Management',
        description: 'Manage bookings from one simple calendar. Prevent double bookings and minimize no-shows.',
        icon: 'Calendar',
        benefit: 'Save 2+ hours daily on phone calls'
      },
      {
        title: 'Customer Management',
        description: 'Keep customer details, visit history, preferred stylists, and service notes organized in one place.',
        icon: 'Users',
        benefit: 'Boost repeat visits by 35%'
      },
      {
        title: 'Staff Management',
        description: 'Track staff schedules, service commissions, and daily availability effortlessly.',
        icon: 'UserCheck',
        benefit: 'Zero scheduling mix-ups'
      },
      {
        title: 'Automated WhatsApp Reminders',
        description: 'Automatically notify clients 2 hours before their appointments with direct directions.',
        icon: 'MessageSquare',
        benefit: 'Drop no-shows down to near zero'
      },
      {
        title: 'Business Dashboard',
        description: 'See the numbers that actually matter: daily collections, top services, and busy hours at a glance.',
        icon: 'TrendingUp',
        benefit: 'Clear daily financial visibility'
      }
    ],
    overviewData: {
      primaryTableTitle: "Today's Appointments",
      primaryTableColumns: ['Time', 'Customer', 'Service', 'Stylist', 'Amount', 'Status'],
      primaryTableRows: [
        { Time: '10:00 AM', Customer: 'Priya Sharma', Service: 'Haircut & Styling', Stylist: 'Pooja', Amount: '₹450', Status: 'Confirmed' },
        { Time: '10:30 AM', Customer: 'Riya Singh', Service: 'Keratin Hair Spa', Stylist: 'Rahul', Amount: '₹1,800', Status: 'Confirmed' },
        { Time: '11:00 AM', Customer: 'Anjali Kumar', Service: 'Organic Glow Facial', Stylist: 'Pooja', Amount: '₹1,200', Status: 'Pending' },
        { Time: '11:45 AM', Customer: 'Rajesh Verma', Service: 'Beard Grooming & Haircut', Stylist: 'Neha', Amount: '₹550', Status: 'Confirmed' },
        { Time: '12:30 PM', Customer: 'Sneha Sen', Service: 'Pre-Bridal Consultation', Stylist: 'Rahul', Amount: '₹2,500', Status: 'Confirmed' },
        { Time: '02:00 PM', Customer: 'Kavita Roy', Service: 'Deluxe Manicure & Pedicure', Stylist: 'Neha', Amount: '₹950', Status: 'Completed' },
        { Time: '03:15 PM', Customer: 'Amit Mukherjee', Service: 'Scalp Detox & Wash', Stylist: 'Rahul', Amount: '₹750', Status: 'Confirmed' }
      ],
      secondaryTableTitle: 'Recent Customers',
      secondaryTableColumns: ['Customer', 'Phone', 'Favorite Service', 'Last Visit', 'Total Visits'],
      secondaryTableRows: [
        { Customer: 'Priya Sharma', Phone: '+91 94311 88210', 'Favorite Service': 'Haircut & Styling', 'Last Visit': 'Today', 'Total Visits': '8 visits' },
        { Customer: 'Riya Singh', Phone: '+91 98350 44122', 'Favorite Service': 'Keratin Hair Spa', 'Last Visit': 'Today', 'Total Visits': '4 visits' },
        { Customer: 'Swati Mishra', Phone: '+91 82104 99182', 'Favorite Service': 'Glow Facial', 'Last Visit': 'Yesterday', 'Total Visits': '12 visits' },
        { Customer: 'Deepak Choudhury', Phone: '+91 99341 62710', 'Favorite Service': 'Hair & Beard Spa', 'Last Visit': '3 days ago', 'Total Visits': '6 visits' }
      ],
      activityFeed: [
        { title: 'New online booking from website', time: '12 mins ago', detail: 'Priya Sharma booked Haircut for 10:00 AM', status: 'Confirmed' },
        { title: 'Payment received via UPI', time: '40 mins ago', detail: '₹950 received from Kavita Roy', status: 'Completed' },
        { title: 'WhatsApp reminder sent', time: '1 hr ago', detail: 'Automated notification delivered to Riya Singh' }
      ]
    },
    customerPreview: {
      heroTitle: 'Book Your Salon Appointment',
      heroSubtitle: 'Choose your desired services and book a slot in under 60 seconds.',
      actionLabel: 'Confirm Appointment',
      sections: {
        services: [
          { name: 'Haircut & Blowdry', price: '₹350', time: '30 mins', desc: 'Precision cut tailored to your face structure' },
          { name: 'Keratin Hair Spa & Treatment', price: '₹1,200', time: '60 mins', desc: 'Deep nourishment and frizz elimination' },
          { name: 'Instant Glow Herbal Facial', price: '₹850', time: '45 mins', desc: 'Natural fruit extracts with gentle exfoliation' },
          { name: 'Signature Beard Trim & Styling', price: '₹250', time: '20 mins', desc: 'Hot towel prep with organic beard oil finish' }
        ],
        timeSlots: ['10:00 AM', '11:00 AM', '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM']
      }
    }
  },

  hotel: {
    id: 'hotel',
    name: 'Ranchi Grand Hotel',
    label: 'Hotel & Hospitality',
    tagline: 'Rooms, direct bookings & guest concierge',
    category: 'Hotel Reservation & Front Desk',
    description: 'Custom reservation software that helps independent hotels take direct bookings without heavy OTA commissions.',
    defaultCustomization: {
      businessName: 'Ranchi Grand Hotel',
      tagline: 'Luxury Stays & Business Banquets',
      accentColor: 'indigo',
      phone: '+91 97714 55100',
      whatsapp: '+91 97714 55100',
      address: 'Circular Road, Lalpur, Ranchi, Jharkhand',
      website: 'www.ranchigrand.local',
      hotelRoomsList: [
        { id: 'rm-1', name: 'Deluxe King Room', price: 2499, capacity: '2 Adults', amenities: ['King Bed', 'Free WiFi', 'City View', 'Tea Maker'] },
        { id: 'rm-2', name: 'Executive Business Suite', price: 3499, capacity: '2 Adults, 1 Kid', amenities: ['Work Desk', 'Free Breakfast', 'Airport Pickup', 'Smart TV'] },
        { id: 'rm-3', name: 'Royal Grand Suite', price: 5499, capacity: '3 Adults', amenities: ['Master Bedroom', 'Bathtub', 'Living Area', 'Balcony Access'] }
      ]
    },
    stats: [
      { label: 'Room Occupancy', value: '82%', change: '+12% this weekend', isPositive: true },
      { label: 'Available Rooms', value: '6 / 34', subtext: '28 occupied currently' },
      { label: 'Check-ins Today', value: '14', subtext: '9 already arrived' },
      { label: 'Check-outs Today', value: '11', subtext: 'All cleared on schedule' },
      { label: "Today's Room Revenue", value: '₹48,200', change: '+24% direct bookings', isPositive: true }
    ],
    sidebarItems: [
      { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
      { id: 'reservations', label: 'Reservations', icon: 'CalendarDays', badge: '14' },
      { id: 'rooms', label: 'Rooms & Rates', icon: 'BedDouble' },
      { id: 'guests', label: 'Guests', icon: 'Users' },
      { id: 'payments', label: 'Payments & Invoices', icon: 'CreditCard' },
      { id: 'reports', label: 'Revenue Reports', icon: 'BarChart3' },
      { id: 'settings', label: 'Settings', icon: 'Settings' }
    ],
    featuresList: [
      {
        title: 'Direct Booking Engine',
        description: 'Take guest bookings straight on your own branded website with zero 18-25% commission to OTAs.',
        icon: 'Globe',
        benefit: 'Keep 100% of room revenue'
      },
      {
        title: 'Front Desk & Room Status',
        description: 'See vacant, occupied, cleaning, and maintenance rooms at a glance with instant color status.',
        icon: 'Building2',
        benefit: 'Check-in guests in under 45 seconds'
      },
      {
        title: 'Guest Profiles & ID Storage',
        description: 'Store Aadhaar/Passport copies, guest preferences, corporate billing notes, and past stays securely.',
        icon: 'ShieldCheck',
        benefit: 'Instant police verification logs'
      },
      {
        title: 'Automated WhatsApp Check-in Slips',
        description: 'Send WiFi passwords, room numbers, and restaurant menus directly to arriving guests on WhatsApp.',
        icon: 'Smartphone',
        benefit: 'Delight guests before arrival'
      },
      {
        title: 'Multi-Room Invoicing',
        description: 'Generate GST-compliant invoices with food orders and laundry automatically added to the room bill.',
        icon: 'Receipt',
        benefit: 'Zero billing errors at checkout'
      }
    ],
    overviewData: {
      primaryTableTitle: "Today's Guest Check-Ins & Stays",
      primaryTableColumns: ['Room #', 'Guest Name', 'Room Type', 'Stay Duration', 'Payment', 'Status'],
      primaryTableRows: [
        { 'Room #': 'Room 204', 'Guest Name': 'Vikram Malhotra', 'Room Type': 'Deluxe King', 'Stay Duration': '2 Nights', Payment: 'Paid ₹5,000', Status: 'Checked In' },
        { 'Room #': 'Room 308', 'Guest Name': 'Sunita Sen', 'Room Type': 'Executive Suite', 'Stay Duration': '3 Nights', Payment: 'Paid ₹12,500', Status: 'Confirmed' },
        { 'Room #': 'Room 102', 'Guest Name': 'Dr. Alok Gupta', 'Room Type': 'Deluxe Single', 'Stay Duration': '1 Night', Payment: 'Paid ₹2,500', Status: 'Checked In' },
        { 'Room #': 'Room 215', 'Guest Name': 'Meera Deshmukh', 'Room Type': 'Superior Twin', 'Stay Duration': '2 Nights', Payment: 'Pay at Desk', Status: 'Pending' },
        { 'Room #': 'Room 401', 'Guest Name': 'TCS Corporate Team', 'Room Type': 'Presidential Suite', 'Stay Duration': '4 Nights', Payment: 'Corporate Bill', Status: 'Checked In' },
        { 'Room #': 'Room 207', 'Guest Name': 'Rajeshwar Singh', 'Room Type': 'Deluxe King', 'Stay Duration': '1 Night', Payment: 'Paid ₹2,800', Status: 'Checked Out' }
      ],
      secondaryTableTitle: 'Room Category Availability',
      secondaryTableColumns: ['Category', 'Total', 'Occupied', 'Available', 'Base Tariff'],
      secondaryTableRows: [
        { Category: 'Deluxe King Room', Total: '16', Occupied: '14', Available: '2', 'Base Tariff': '₹2,499 / night' },
        { Category: 'Executive Twin Room', Total: '10', Occupied: '9', Available: '1', 'Base Tariff': '₹3,499 / night' },
        { Category: 'Grand Suite', Total: '6', Occupied: '4', Available: '2', 'Base Tariff': '₹5,999 / night' },
        { Category: 'Presidential Suite', Total: '2', Occupied: '1', Available: '1', 'Base Tariff': '₹9,999 / night' }
      ],
      activityFeed: [
        { title: 'Direct booking confirmed', time: '18 mins ago', detail: 'Sunita Sen booked Executive Suite for 3 nights', status: 'Confirmed' },
        { title: 'Room 102 checked in', time: '45 mins ago', detail: 'Keycard assigned and Aadhaar scanned', status: 'Checked In' },
        { title: 'Housekeeping alert', time: '1 hr ago', detail: 'Room 207 marked cleaned and ready for inspection' }
      ]
    },
    customerPreview: {
      heroTitle: 'Book Your Stay in Ranchi',
      heroSubtitle: 'Best rate guarantee. Instant confirmation with zero hidden platform charges.',
      actionLabel: 'Reserve Your Room',
      sections: {
        rooms: [
          { name: 'Deluxe King Room', price: '₹2,499', period: '/ night', desc: 'Spacious 320 sq.ft room with king bed, high-speed WiFi, and city view.', badge: 'Most Popular' },
          { name: 'Executive Business Suite', price: '₹3,899', period: '/ night', desc: 'Separate workstation, complimentary buffet breakfast, and airport pickup.', badge: 'Business Choice' },
          { name: 'Royal Grand Suite', price: '₹6,499', period: '/ night', desc: '580 sq.ft luxury master suite with living room, bathtub, and lounge access.', badge: 'Luxury' }
        ]
      }
    }
  },

  restaurant: {
    id: 'restaurant',
    name: 'The Ranchi Kitchen',
    label: 'Restaurant & Café',
    tagline: 'Digital menus, live kitchen tickets & table billing',
    category: 'Restaurant & Kitchen Operating System',
    description: 'Custom restaurant system that connects table QR menus, kitchen display screens, and instant cashier billing.',
    defaultCustomization: {
      businessName: 'The Ranchi Kitchen',
      tagline: 'Authentic Flavors & Handcrafted Dining',
      accentColor: 'amber',
      phone: '+91 94313 77200',
      whatsapp: '+91 94313 77200',
      address: 'Kanke Road, Opposite Rock Garden, Ranchi, Jharkhand',
      website: 'www.ranchikitchen.local',
      restaurantMenuList: [
        { id: 'm-1', name: 'Mutton Handi Biryani', category: 'Main Course', price: 380, desc: 'Slow-cooked fragrant rice in earthen clay pot', isVeg: false },
        { id: 'm-2', name: 'Chicken Butter Masala', category: 'Main Course', price: 360, desc: 'Tender chicken in rich tomato cashew gravy', isVeg: false },
        { id: 'm-3', name: 'Paneer Angara Tikka', category: 'Starters', price: 280, desc: 'Charcoal roasted cottage cheese with mint dip', isVeg: true },
        { id: 'm-4', name: 'Butter Garlic Naan', category: 'Breads', price: 80, desc: 'Tandoor baked flatbread brushed with butter', isVeg: true },
        { id: 'm-5', name: 'Desi Masala Cold Brew', category: 'Beverages', price: 140, desc: 'Chilled coffee infused with signature spices', isVeg: true }
      ]
    },
    stats: [
      { label: 'Active Tables', value: '12 / 16', change: '75% dining capacity', isPositive: true },
      { label: "Today's Orders", value: '38', subtext: 'Dining & Takeaway' },
      { label: 'Avg Order Value', value: '₹517', change: '+14% via QR specials', isPositive: true },
      { label: 'Live in Kitchen', value: '5 orders', subtext: 'Avg preparation 14m' },
      { label: "Today's Gross Sales", value: '₹19,650', change: '+22% vs yesterday', isPositive: true }
    ],
    sidebarItems: [
      { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
      { id: 'orders', label: 'Live Orders', icon: 'UtensilsCrossed', badge: '5' },
      { id: 'tables', label: 'Table Layout', icon: 'Grid' },
      { id: 'menu', label: 'Menu & Prices', icon: 'BookOpen' },
      { id: 'customers', label: 'Customers', icon: 'Users' },
      { id: 'reports', label: 'Daily Sales Report', icon: 'BarChart3' },
      { id: 'settings', label: 'Settings', icon: 'Settings' }
    ],
    featuresList: [
      {
        title: 'QR Table Ordering',
        description: 'Guests scan the table QR code to browse vivid pictures, read descriptions, and order instantly.',
        icon: 'QrCode',
        benefit: 'Faster table turnover by 20 mins'
      },
      {
        title: 'Live Kitchen Display (KOT)',
        description: 'Incoming orders flash straight on the kitchen display screen categorized by station (Tandoor, Curry, Bar).',
        icon: 'Flame',
        benefit: 'Eliminate handwritten order slips'
      },
      {
        title: 'One-Click Menu & Price Updates',
        description: 'Mark items sold out instantly during rush hour or update prices without reprinting physical menus.',
        icon: 'Edit3',
        benefit: 'Save ₹15,000+ yearly on printing'
      },
      {
        title: 'Instant Table Bill & UPI Split',
        description: 'Generate itemized bills with pre-calculated taxes and dynamic table QR for effortless payment.',
        icon: 'Receipt',
        benefit: 'Zero cashier calculations'
      },
      {
        title: 'Customer Re-Engagement',
        description: 'Capture phone numbers on bill generation and send automated birthday / weekend dinner offers.',
        icon: 'Send',
        benefit: 'Turn one-off diners into regulars'
      }
    ],
    overviewData: {
      primaryTableTitle: 'Live Kitchen Orders & Active Bills',
      primaryTableColumns: ['Order #', 'Table / Type', 'Items Ordered', 'Order Time', 'Bill Amount', 'Status'],
      primaryTableRows: [
        { 'Order #': '#TK-108', 'Table / Type': 'Table 4 (4 Guests)', 'Items Ordered': 'Chicken Butter Masala, 3 Garlic Naan, Lassi', 'Order Time': '8 mins ago', 'Bill Amount': '₹680', Status: 'Preparing' },
        { 'Order #': '#TK-109', 'Table / Type': 'Table 7 (2 Guests)', 'Items Ordered': 'Paneer Tikka, Dal Makhani, 2 Rumali Roti', 'Order Time': '14 mins ago', 'Bill Amount': '₹540', Status: 'Served' },
        { 'Order #': '#TK-110', 'Table / Type': 'Table 12 (6 Guests)', 'Items Ordered': 'Tandoori Mixed Platter, 4 Biryanis, Mojitos', 'Order Time': '3 mins ago', 'Bill Amount': '₹1,420', Status: 'New Order' },
        { 'Order #': '#TK-111', 'Table / Type': 'Takeaway Counter', 'Items Ordered': 'Handi Mutton Biryani (Double Pack)', 'Order Time': '18 mins ago', 'Bill Amount': '₹750', Status: 'Ready' },
        { 'Order #': '#TK-107', 'Table / Type': 'Table 2 (2 Guests)', 'Items Ordered': 'Kadhai Chicken, Jeera Rice, Cold Coffee', 'Order Time': '35 mins ago', 'Bill Amount': '₹590', Status: 'Completed' }
      ],
      secondaryTableTitle: "Today's Top Selling Dishes",
      secondaryTableColumns: ['Dish Name', 'Category', 'Quantity Sold', 'Revenue', 'Status'],
      secondaryTableRows: [
        { 'Dish Name': 'Special Mutton Handi Biryani', Category: 'Rice & Mains', 'Quantity Sold': '28 plates', Revenue: '₹10,640', Status: 'In Stock' },
        { 'Dish Name': 'Smoky Paneer Tikka', Category: 'Starters', 'Quantity Sold': '19 plates', Revenue: '₹5,320', Status: 'In Stock' },
        { 'Dish Name': 'Butter Garlic Naan', Category: 'Breads', 'Quantity Sold': '64 pcs', Revenue: '₹3,840', Status: 'In Stock' },
        { 'Dish Name': 'Desi Masala Cold Brew', Category: 'Beverages', 'Quantity Sold': '22 glasses', Revenue: '₹2,640', Status: 'In Stock' }
      ],
      activityFeed: [
        { title: 'New order on Table 12', time: '3 mins ago', detail: 'Tandoori Mixed Platter + 4 Biryanis received', status: 'New Order' },
        { title: 'Kitchen status updated', time: '10 mins ago', detail: 'Order #TK-111 marked ready for pickup', status: 'Ready' },
        { title: 'Table 2 bill settled', time: '22 mins ago', detail: '₹590 paid via PhonePe QR' }
      ]
    },
    customerPreview: {
      heroTitle: 'Welcome to The Ranchi Kitchen',
      heroSubtitle: 'Browse our fresh menu, customize your dishes, and place your order directly.',
      actionLabel: 'Review Order & Place',
      sections: {
        categories: ['Chef Specials', 'Tandoor & Starters', 'Curries & Mains', 'Biryani & Rice', 'Beverages'],
        items: [
          { name: 'Mutton Handi Biryani', price: '₹380', category: 'Biryani & Rice', desc: 'Slow-cooked fragrant basmati rice with tender local mutton in earthen clay pot.', tag: 'Bestseller' },
          { name: 'Paneer Angara Tikka', price: '₹280', category: 'Tandoor & Starters', desc: 'Charcoal grilled cottage cheese marinated in roasted spices and hung curd.', tag: 'Popular' },
          { name: 'Murgh Makhani (Butter Chicken)', price: '₹340', category: 'Curries & Mains', desc: 'Tandoori shredded chicken simmered in rich creamy tomato and cashew gravy.', tag: 'Chef Choice' },
          { name: 'Fresh Mint Mojito', price: '₹120', category: 'Beverages', desc: 'Refreshing muddled fresh mint, lime juice, and sparkling soda.', tag: 'Cooler' }
        ]
      }
    }
  },

  gym: {
    id: 'gym',
    name: 'Ranchi Fitness Club',
    label: 'Gym & Fitness',
    tagline: 'Memberships, biometric attendance & auto-renewals',
    category: 'Fitness Center Management Software',
    description: 'Custom gym software built to manage memberships, track daily attendance, and recover pending renewals automatically.',
    defaultCustomization: {
      businessName: 'Ranchi Fitness Club',
      tagline: 'Strength • Cardio • CrossFit Training',
      accentColor: 'emerald',
      phone: '+91 91024 88300',
      whatsapp: '+91 91024 88300',
      address: 'Harmu Housing Colony, Near Sahajanand Chowk, Ranchi',
      website: 'www.ranchifitness.local',
      gymPlansList: [
        { id: 'p-1', name: 'Monthly Flexible', price: 999, duration: '1 Month', benefits: ['Full floor access', 'Locker & showers', 'Cardio & weights'] },
        { id: 'p-2', name: 'Quarterly Transformation', price: 2499, duration: '3 Months', benefits: ['Save 17%', 'Body fat analysis', 'Diet chart & guidance'] },
        { id: 'p-3', name: 'Annual VIP Athlete', price: 7999, duration: '12 Months', benefits: ['Best value (₹666/mo)', 'CrossFit area access', '2 guest passes/month', 'Sauna'] }
      ]
    },
    stats: [
      { label: 'Active Members', value: '342', change: '+22 new this month', isPositive: true },
      { label: 'Check-ins Today', value: '89', subtext: 'Morning peak: 54' },
      { label: 'Expiring This Week', value: '16', subtext: 'Follow-ups queued' },
      { label: 'Pending Renewals', value: '₹32,000', subtext: '8 members overdue' },
      { label: 'Monthly Revenue', value: '₹1,42,000', change: '+15% vs last month', isPositive: true }
    ],
    sidebarItems: [
      { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
      { id: 'members', label: 'Active Members', icon: 'Users', badge: '342' },
      { id: 'memberships', label: 'Membership Plans', icon: 'CreditCard' },
      { id: 'attendance', label: 'Attendance Log', icon: 'Fingerprint' },
      { id: 'payments', label: 'Renewals & Fees', icon: 'Receipt' },
      { id: 'reports', label: 'Growth Reports', icon: 'BarChart3' },
      { id: 'settings', label: 'Settings', icon: 'Settings' }
    ],
    featuresList: [
      {
        title: 'Automated Renewal Alerts',
        description: 'Send friendly WhatsApp reminders 7 days and 2 days before membership expiry with instant UPI payment link.',
        icon: 'BellRing',
        benefit: 'Recover 40% more renewals on time'
      },
      {
        title: 'Member Attendance Tracking',
        description: 'Supports biometric, RFID card, or instant mobile QR scan with live daily attendance logs.',
        icon: 'Fingerprint',
        benefit: 'Stop unauthorized gym entry'
      },
      {
        title: 'Trainer & Class Management',
        description: 'Assign personal training clients to coaches and track session progress and trainer payouts.',
        icon: 'Activity',
        benefit: 'Transparent trainer commissions'
      },
      {
        title: 'Custom Membership Packages',
        description: 'Easily bundle monthly, quarterly, annual, and student plans with admission fee waivers.',
        icon: 'Award',
        benefit: 'Sell high-ticket annual plans'
      },
      {
        title: 'Financial Cashflow Report',
        description: 'Instant overview of collected cash, UPI payments, due balances, and upcoming monthly forecast.',
        icon: 'TrendingUp',
        benefit: 'Complete clarity on gym revenue'
      }
    ],
    overviewData: {
      primaryTableTitle: "Today's Member Check-ins & Activity",
      primaryTableColumns: ['Time', 'Member Name', 'Plan Type', 'Trainer', 'Status', 'Expiry Date'],
      primaryTableRows: [
        { Time: '06:15 AM', 'Member Name': 'Amit Verma', 'Plan Type': 'Annual Gold', Trainer: 'Self Guided', Status: 'Active', 'Expiry Date': '18 Nov 2026' },
        { Time: '06:45 AM', 'Member Name': 'Neha Roy', 'Plan Type': '6-Month CrossFit', Trainer: 'Coach Vikram', Status: 'Active', 'Expiry Date': '04 Dec 2026' },
        { Time: '07:10 AM', 'Member Name': 'Rahul Singh', 'Plan Type': '3-Month Strength', Trainer: 'Coach Vikram', Status: 'Active', 'Expiry Date': '22 Oct 2026' },
        { Time: '07:30 AM', 'Member Name': 'Pooja Jha', 'Plan Type': 'Personal Training', Trainer: 'Coach Rohit', Status: 'Session Active', 'Expiry Date': '15 Dec 2026' },
        { Time: '08:00 AM', 'Member Name': 'Devendra Murmu', 'Plan Type': 'Monthly Cardio', Trainer: 'Self Guided', Status: 'Renewed Today', 'Expiry Date': '14 Oct 2026' },
        { Time: '08:30 AM', 'Member Name': 'Manish Gupta', 'Plan Type': 'Annual Gold', Trainer: 'Coach Rohit', Status: 'Active', 'Expiry Date': '30 Jan 2027' }
      ],
      secondaryTableTitle: 'Expiring Memberships Needing Action',
      secondaryTableColumns: ['Member Name', 'Phone', 'Current Plan', 'Due Date', 'Status'],
      secondaryTableRows: [
        { 'Member Name': 'Sonali Das', Phone: '+91 94311 02819', 'Current Plan': '3-Month CrossFit', 'Due Date': 'Tomorrow', Status: 'Reminder Sent' },
        { 'Member Name': 'Vikas Agarwal', Phone: '+91 82103 44920', 'Current Plan': 'Monthly Strength', 'Due Date': 'Overdue (2 days)', Status: 'Pending Payment' },
        { 'Member Name': 'Deepak Soren', Phone: '+91 98351 77109', 'Current Plan': 'Annual Gold', 'Due Date': 'In 4 days', Status: 'Follow-up Call' },
        { 'Member Name': 'Kavita Kumari', Phone: '+91 91029 88123', 'Current Plan': '6-Month Fitness', 'Due Date': 'In 6 days', Status: 'Auto-Notified' }
      ],
      activityFeed: [
        { title: 'Membership renewed', time: '15 mins ago', detail: 'Devendra Murmu paid ₹999 via Google Pay', status: 'Completed' },
        { title: 'Morning check-in milestone', time: '1 hr ago', detail: '54 members logged in between 6:00 AM - 8:30 AM' },
        { title: 'Expiry WhatsApp reminder queued', time: '2 hrs ago', detail: 'Automated notification sent to Sonali Das' }
      ]
    },
    customerPreview: {
      heroTitle: 'Start Your Fitness Journey',
      heroSubtitle: 'Certified trainers, world-class equipment, and flexible membership plans.',
      actionLabel: 'Select Membership Plan',
      sections: {
        plans: [
          { name: 'Monthly Flexible', price: '₹999', period: '/ month', desc: 'Full floor gym access, locker facility, and general trainer orientation.', badge: 'No Commitment' },
          { name: 'Quarterly Transformation', price: '₹2,499', period: '/ 3 months', desc: 'Save 17%. Includes free body composition analysis and diet chart.', badge: 'Popular' },
          { name: 'Annual VIP Athlete', price: '₹7,999', period: '/ year', desc: 'Best value (₹666/mo). Free CrossFit, unlimited sauna, and 2 guest passes/month.', badge: 'Best Value' }
        ]
      }
    }
  },

  clinic: {
    id: 'clinic',
    name: 'CarePlus Clinic',
    label: 'Clinic & Healthcare',
    tagline: 'Patient records, doctor tokens & digital prescriptions',
    category: 'Outpatient & Clinic Management System',
    description: 'Custom healthcare management software designed for doctors and specialty clinics to organize patient appointments and history.',
    defaultCustomization: {
      businessName: 'CarePlus Clinic',
      tagline: 'Multi-Specialty Healthcare & Diagnostics',
      accentColor: 'cyan',
      phone: '+91 98355 66010',
      whatsapp: '+91 98355 66010',
      address: 'Bariatu Road, Opposite RIMS Gate, Ranchi, Jharkhand',
      website: 'www.careplusclinic.local',
      clinicDoctorsList: [
        { id: 'doc-1', name: 'Dr. Arvind Sharma', degree: 'MD (Internal Medicine)', specialty: 'General Physician & Diabetologist', fee: 500 },
        { id: 'doc-2', name: 'Dr. Sneha Rao', degree: 'MDS (Conservative Dentistry)', specialty: 'Dental Surgeon & Implantologist', fee: 400 },
        { id: 'doc-3', name: 'Dr. P.K. Mishra', degree: 'MS (Orthopedics)', specialty: 'Joint Care & Sports Injury', fee: 600 }
      ]
    },
    stats: [
      { label: "Today's Patient Queue", value: '24', change: '8 new patients', isPositive: true },
      { label: 'Consulted', value: '15', subtext: 'Prescriptions issued' },
      { label: 'In Waiting Area', value: '5', subtext: 'Current Token: #16' },
      { label: 'Follow-ups Due', value: '4', subtext: 'Post-treatment review' },
      { label: "Today's Consultation Fees", value: '₹12,000', change: 'Avg ₹500 / patient', isPositive: true }
    ],
    sidebarItems: [
      { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
      { id: 'appointments', label: 'Appointments & Tokens', icon: 'ClipboardList', badge: '24' },
      { id: 'patients', label: 'Patient Records', icon: 'Users' },
      { id: 'doctors', label: 'Doctor Schedules', icon: 'Stethoscope' },
      { id: 'prescriptions', label: 'E-Prescriptions', icon: 'FileText' },
      { id: 'reports', label: 'Clinic Analytics', icon: 'BarChart3' },
      { id: 'settings', label: 'Settings', icon: 'Settings' }
    ],
    featuresList: [
      {
        title: 'Smart Token & Queue Display',
        description: 'Live token board on the waiting room TV so patients know their turn without crowding the reception counter.',
        icon: 'Tv',
        benefit: 'Calm, dignified waiting room'
      },
      {
        title: 'Digital Patient Medical History',
        description: 'Pull up previous prescriptions, test reports, and known allergies in 2 seconds with patient phone number.',
        icon: 'FolderHeart',
        benefit: 'Zero lost physical files'
      },
      {
        title: 'Quick E-Prescription Generator',
        description: 'Doctors can type or tap common medicines with pre-set dosage instructions and print or WhatsApp the Rx.',
        icon: 'FileCheck',
        benefit: 'Prescribe accurately in 45 seconds'
      },
      {
        title: 'Follow-up WhatsApp Reminders',
        description: 'Automated reminders sent to chronic care and dental patients when their 15-day or 30-day review is due.',
        icon: 'CalendarCheck',
        benefit: 'Never lose track of patient care'
      },
      {
        title: 'Daily Clinic Collection Summary',
        description: 'Automatically balances cash and online fees received by reception staff at the end of each doctor shift.',
        icon: 'IndianRupee',
        benefit: '100% daily fee accountability'
      }
    ],
    overviewData: {
      primaryTableTitle: "Today's Consultation Queue & Appointments",
      primaryTableColumns: ['Token #', 'Time', 'Patient Name', 'Doctor', 'Visit Type', 'Status'],
      primaryTableRows: [
        { 'Token #': 'Token #01', Time: '09:30 AM', 'Patient Name': 'Ramesh Prasad (58y)', Doctor: 'Dr. Arvind Sharma (MD)', 'Visit Type': 'Hypertension Review', Status: 'Completed' },
        { 'Token #': 'Token #02', Time: '10:00 AM', 'Patient Name': 'Vandana Devi (42y)', Doctor: 'Dr. Sneha Rao (MDS)', 'Visit Type': 'Root Canal Session 2', Status: 'Completed' },
        { 'Token #': 'Token #03', Time: '10:30 AM', 'Patient Name': 'Ayush Kumar (12y)', Doctor: 'Dr. Arvind Sharma (MD)', 'Visit Type': 'Viral Fever & Cough', Status: 'In Consultation' },
        { 'Token #': 'Token #04', Time: '11:00 AM', 'Patient Name': 'Manisha Kumari (29y)', Doctor: 'Dr. Sneha Rao (MDS)', 'Visit Type': 'Dental Scaling & Polishing', Status: 'Waiting' },
        { 'Token #': 'Token #05', Time: '11:30 AM', 'Patient Name': 'Suresh Mandal (64y)', Doctor: 'Dr. Arvind Sharma (MD)', 'Visit Type': 'Diabetes Follow-up', Status: 'Waiting' },
        { 'Token #': 'Token #06', Time: '12:00 PM', 'Patient Name': 'Sunita Soren (34y)', Doctor: 'Dr. Arvind Sharma (MD)', 'Visit Type': 'General Checkup', Status: 'Waiting' }
      ],
      secondaryTableTitle: 'Doctor Schedules & Shift Availability',
      secondaryTableColumns: ['Doctor Name', 'Specialty', 'Morning Shift', 'Evening Shift', 'Queue Status'],
      secondaryTableRows: [
        { 'Doctor Name': 'Dr. Arvind Sharma, MD', Specialty: 'General Medicine', 'Morning Shift': '09:00 AM - 01:00 PM', 'Evening Shift': '05:00 PM - 08:30 PM', 'Queue Status': '12 / 16 Seen' },
        { 'Doctor Name': 'Dr. Sneha Rao, MDS', Specialty: 'Cosmetic & Dental Surgery', 'Morning Shift': '10:00 AM - 02:00 PM', 'Evening Shift': 'On Call / Appointments', 'Queue Status': '3 / 8 Seen' },
        { 'Doctor Name': 'Dr. P.K. Mishra, MS', Specialty: 'Orthopedics & Joint Care', 'Morning Shift': 'Mon / Wed / Fri Only', 'Evening Shift': '06:00 PM - 08:00 PM', 'Queue Status': 'Upcoming Evening' }
      ],
      activityFeed: [
        { title: 'Patient called to chamber', time: '5 mins ago', detail: 'Token #03 (Ayush Kumar) entered Chamber 1', status: 'In Consultation' },
        { title: 'Digital Rx generated', time: '20 mins ago', detail: 'Prescription sent to Vandana Devi via WhatsApp' },
        { title: 'New token booked online', time: '35 mins ago', detail: 'Sunita Soren confirmed 12:00 PM slot' }
      ]
    },
    customerPreview: {
      heroTitle: 'Book Your Doctor Consultation',
      heroSubtitle: 'Choose your specialty, select your doctor, and secure your consultation token.',
      actionLabel: 'Confirm Consultation Slot',
      sections: {
        doctors: [
          { name: 'Dr. Arvind Sharma', degree: 'MD (Internal Medicine), Ex-RIMS', specialty: 'General Physician & Diabetologist', fee: '₹500', timings: '09:00 AM - 01:00 PM' },
          { name: 'Dr. Sneha Rao', degree: 'MDS (Conservative Dentistry)', specialty: 'Dental Surgeon & Implantologist', fee: '₹400', timings: '10:00 AM - 02:00 PM' }
        ],
        slots: ['09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM', '12:30 PM', '05:30 PM', '06:15 PM']
      }
    }
  },

  crm: {
    id: 'crm',
    name: 'ATMAN Business CRM',
    label: 'Business & CRM',
    tagline: 'Lead tracking, client follow-ups & business pipelines',
    category: 'Sales Pipeline & Operations Dashboard',
    description: 'Custom client management software designed for agencies, distributors, service companies, and B2B businesses.',
    defaultCustomization: {
      businessName: 'ATMAN Business CRM',
      tagline: 'Operations, Leads & Client Relations',
      accentColor: 'violet',
      phone: '+91 94311 00880',
      whatsapp: '+91 94311 00880',
      address: 'Harmu Bypass Commercial Complex, Ranchi, Jharkhand',
      website: 'www.atmanbiz.local',
      crmStagesList: ['New Inquiry', 'Requirements Call', 'Proposal Sent', 'Closed Won']
    },
    stats: [
      { label: 'Active Pipeline Value', value: '₹4,20,000', change: '+₹85,000 this week', isPositive: true },
      { label: 'New Inquiries', value: '46', subtext: 'This month' },
      { label: 'Qualified Leads', value: '18', subtext: 'In active discussion' },
      { label: 'Proposal Sent', value: '7', subtext: 'Awaiting client approval' },
      { label: 'Conversion Rate', value: '39%', change: '+6% vs industry average', isPositive: true }
    ],
    sidebarItems: [
      { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
      { id: 'leads', label: 'Lead Pipeline', icon: 'KanbanSquare', badge: '18' },
      { id: 'customers', label: 'Client Accounts', icon: 'Building' },
      { id: 'followups', label: 'Tasks & Follow-ups', icon: 'CheckSquare' },
      { id: 'proposals', label: 'Quotations & Invoices', icon: 'FileSpreadsheet' },
      { id: 'reports', label: 'Revenue Forecast', icon: 'TrendingUp' },
      { id: 'settings', label: 'Settings', icon: 'Settings' }
    ],
    featuresList: [
      {
        title: 'Centralized Lead Inbox',
        description: 'Capture inquiries from your website, WhatsApp, IndiaMART, and direct calls into one organized dashboard.',
        icon: 'Inbox',
        benefit: 'Never let an inquiry slip through the cracks'
      },
      {
        title: 'Visual Deal Pipeline',
        description: 'See every opportunity clearly staged from New Lead → Discussion → Proposal Sent → Closed Won.',
        icon: 'Layers',
        benefit: 'Clear forecast of expected revenue'
      },
      {
        title: 'Scheduled Follow-up Reminders',
        description: 'Set dates and times to call clients back. Receive instant reminders so you never forget to close a deal.',
        icon: 'Clock',
        benefit: '3x higher deal closing speed'
      },
      {
        title: 'Quick Quotation Generator',
        description: 'Generate clean, branded PDF quotations and proposals in 3 minutes directly from the client deal card.',
        icon: 'FileText',
        benefit: 'Look professional in front of clients'
      },
      {
        title: 'Client Activity Timeline',
        description: 'Keep notes from past phone calls, meetings, WhatsApp chats, and payments tied to the client profile.',
        icon: 'History',
        benefit: 'Any team member can handle client queries'
      }
    ],
    overviewData: {
      primaryTableTitle: 'Active Opportunities & Deal Stages',
      primaryTableColumns: ['Client / Company', 'Contact Person', 'Deal Size', 'Stage', 'Next Follow-up', 'Priority'],
      primaryTableRows: [
        { 'Client / Company': 'Jharkhand Fleet Logistics', 'Contact Person': 'Rajesh Singh', 'Deal Size': '₹1,20,000', Stage: 'Proposal Sent', 'Next Follow-up': 'Today, 4:00 PM', Priority: 'High' },
        { 'Client / Company': 'Singh Dental Studio', 'Contact Person': 'Dr. Manisha Singh', 'Deal Size': '₹45,000', Stage: 'Demo Scheduled', 'Next Follow-up': 'Tomorrow, 11:30 AM', Priority: 'Normal' },
        { 'Client / Company': 'Blue Pearl Events & Catering', 'Contact Person': 'Anand Topno', 'Deal Size': '₹75,000', Stage: 'Negotiation', 'Next Follow-up': 'Today, 2:00 PM', Priority: 'High' },
        { 'Client / Company': 'Chotanagpur Stone Quarries', 'Contact Person': 'Sandeep Mahto', 'Deal Size': '₹1,85,000', Stage: 'Requirements Call', 'Next Follow-up': 'Wed, 3:00 PM', Priority: 'Urgent' },
        { 'Client / Company': 'Royal Sweets & Bakery', 'Contact Person': 'Manoj Gupta', 'Deal Size': '₹60,000', Stage: 'Closed Won', 'Next Follow-up': 'Onboarding Kickoff', Priority: 'Completed' }
      ],
      secondaryTableTitle: 'Team Follow-Up Schedule Today',
      secondaryTableColumns: ['Time', 'Lead / Client', 'Task Type', 'Assigned To', 'Status'],
      secondaryTableRows: [
        { Time: '02:00 PM', 'Lead / Client': 'Blue Pearl Events', 'Task Type': 'Pricing Discussion Call', 'Assigned To': 'Pritam (Sales)', Status: 'Upcoming' },
        { Time: '04:00 PM', 'Lead / Client': 'Jharkhand Fleet Logistics', 'Task Type': 'Send Revised Quotation', 'Assigned To': 'Kunal (Tech Lead)', Status: 'In Progress' },
        { Time: '05:30 PM', 'Lead / Client': 'Apex Hardware Supply', 'Task Type': 'Introductory Consultation', 'Assigned To': 'Pritam (Sales)', Status: 'Pending' }
      ],
      activityFeed: [
        { title: 'Deal closed won!', time: '25 mins ago', detail: 'Royal Sweets signed custom billing software package (₹60,000)', status: 'Won' },
        { title: 'Quotation viewed by client', time: '1 hr ago', detail: 'Rajesh Singh opened proposal PDF for Jharkhand Fleet' },
        { title: 'New web inquiry received', time: '3 hrs ago', detail: 'Apex Hardware submitted custom inquiry form' }
      ]
    },
    customerPreview: {
      heroTitle: 'Request a Custom Business Proposal',
      heroSubtitle: 'Tell us about your business process and get a tailored software blueprint & quote.',
      actionLabel: 'Submit Inquiry',
      sections: {
        budgetRanges: ['₹30,000 - ₹60,000 (Starter System)', '₹60,000 - ₹1,50,000 (Multi-User Custom)', '₹1,50,000+ (Full Enterprise Solution)'],
        systemTypes: ['Booking & Customer Portal', 'Inventory & Billing Software', 'Lead & Sales Pipeline CRM', 'Custom Mobile Web App']
      }
    }
  },

  custom: {
    id: 'custom',
    name: 'Custom Workflow Architecture',
    label: 'Custom Software',
    tagline: 'Built specifically around the way your business works',
    category: 'Bespoke Software Engineering',
    description: 'We build custom software systems for businesses that do not fit into generic, rigid off-the-shelf software packages.',
    defaultCustomization: {
      businessName: 'Custom Solution Studio',
      tagline: 'Software Engineered For Your Exact Business Rules',
      accentColor: 'indigo',
      phone: '+91 94311 00880',
      whatsapp: '+91 94311 00880',
      address: 'Ranchi, Jharkhand & Remote Worldwide'
    },
    stats: [
      { label: 'Custom Systems Built', value: '40+', change: '100% bespoke fit', isPositive: true },
      { label: 'Typical Deployment', value: '2-3 Weeks', subtext: 'Rapid agile delivery' },
      { label: 'Ownership', value: '100% Yours', subtext: 'Zero recurring license lock-in' },
      { label: 'Client Satisfaction', value: '99.4%', change: 'Zero bloated features', isPositive: true },
      { label: 'Workflows Automated', value: '250+', subtext: 'Time saved daily' }
    ],
    sidebarItems: [
      { id: 'overview', label: 'Workflow Overview', icon: 'LayoutDashboard' },
      { id: 'process', label: 'How We Build', icon: 'Workflow' },
      { id: 'architecture', label: 'System Blueprint', icon: 'Layers' },
      { id: 'comparison', label: 'Custom vs Generic SaaS', icon: 'Scale' },
      { id: 'estimate', label: 'Consultation', icon: 'MessageSquare' }
    ],
    featuresList: [
      {
        title: 'Zero Unnecessary Complexity',
        description: 'Unlike bloated software with 200 buttons you will never use, every single screen is built specifically for your staff.',
        icon: 'CheckCircle2',
        benefit: 'Staff learns it in 15 minutes'
      },
      {
        title: 'You Own Your Business Data',
        description: 'Your customer records, sales numbers, and operational files stay under your control with zero risk of sudden price hikes.',
        icon: 'Shield',
        benefit: 'Independent from third-party price jumps'
      },
      {
        title: 'Built Around Your Real Workflows',
        description: 'You do not have to adapt your business to fit someone else’s software. The software molds to how you already run your business.',
        icon: 'Sliders',
        benefit: 'Seamless staff adoption'
      },
      {
        title: 'Direct WhatsApp & Mobile Friendly',
        description: 'Works seamlessly on the phones you and your employees already carry in your pockets every day.',
        icon: 'Smartphone',
        benefit: 'Check your business from anywhere'
      }
    ],
    overviewData: {
      primaryTableTitle: 'Bespoke Systems We Engineer',
      primaryTableColumns: ['Industry / Business', 'Unique Workflow Challenge', 'Custom Solution Built', 'Key Outcome'],
      primaryTableRows: [
        { 'Industry / Business': 'Local Manufacturing Workshop', 'Unique Workflow Challenge': 'Raw material tracking & job card status', 'Custom Solution Built': 'Tablet barcode scanner & job sheet app', 'Key Outcome': 'Waste cut by 28%' },
        { 'Industry / Business': 'Auto Service & Garage', 'Unique Workflow Challenge': 'Job estimation, spare parts & customer WhatsApp approvals', 'Custom Solution Built': 'Photo inspection & digital approval portal', 'Key Outcome': 'Faster turnaround by 35%' },
        { 'Industry / Business': 'Wholesale Grain Distributor', 'Unique Workflow Challenge': 'Bari market rate fluctuations & agent credit limits', 'Custom Solution Built': 'Daily live rate sheet & ledger mobile app', 'Key Outcome': 'Eliminated overdue disputes' },
        { 'Industry / Business': 'Specialty Coaching Institute', 'Unique Workflow Challenge': 'Test rankings, fee instalments & parent SMS alerts', 'Custom Solution Built': 'Student test score portal & fee tracker', 'Key Outcome': '100% timely fee collection' }
      ],
      secondaryTableTitle: 'How We Design Your Custom System',
      secondaryTableColumns: ['Phase', 'Duration', 'What We Do Together', 'Outcome'],
      secondaryTableRows: [
        { Phase: '1. Workflow Walkthrough', Duration: 'Day 1 - 3', 'What We Do Together': 'We observe your current daily routine, paper registers, and staff steps.', Outcome: 'Workflow Blueprint' },
        { Phase: '2. Interactive Prototype', Duration: 'Day 4 - 8', 'What We Do Together': 'We design the exact screens and button layouts for your review.', Outcome: 'Clickable Demo' },
        { Phase: '3. Build & Test', Duration: 'Day 9 - 18', 'What We Do Together': 'We engineer your system with your real business data and branding.', Outcome: 'Working Software' },
        { Phase: '4. Staff Training & Launch', Duration: 'Day 19 - 21', 'What We Do Together': 'We train your team and guide the initial live week of operations.', Outcome: 'Smooth Daily Routine' }
      ],
      activityFeed: [
        { title: 'Workflow Blueprint mapped', time: 'Yesterday', detail: 'Garage repair workflow mapped into 4 simple touchpoints' },
        { title: 'Custom prototype reviewed', time: '3 days ago', detail: 'Distributor ledger screens reviewed and approved' }
      ]
    },
    customerPreview: {
      heroTitle: 'Tell Us How Your Business Runs',
      heroSubtitle: 'Share your current daily steps or pain points. We will map a custom software workflow for you.',
      actionLabel: 'Request Workflow Review',
      sections: {
        steps: [
          '1. Describe what you do today (registers, Excel sheets, phone calls)',
          '2. Tell us which step takes too much time or causes mistakes',
          '3. We demonstrate a simple custom screen built to solve that exact step'
        ]
      }
    }
  }
};
