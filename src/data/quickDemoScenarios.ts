import { BusinessCategory } from '../types/showroom';
import { QuickDemoScenario } from '../types/salesMode';

export const QUICK_DEMO_SCENARIOS: Record<BusinessCategory, QuickDemoScenario> = {
  salon: {
    category: 'salon',
    industryLabel: 'Salon & Spa',
    durationEstimate: '45s',
    defaultValues: {
      customerName: 'Priya Sharma',
      serviceName: 'Keratin Hair Spa & Treatment',
      staffName: 'Pooja Verma',
      timeSlot: '04:30 PM',
      price: 1200
    },
    steps: [
      {
        stepIndex: 1,
        totalSteps: 4,
        title: 'Customer Branded Website',
        subtitle: 'Prospect sees their official salon website with luxury branding & services.',
        viewMode: 'website',
        targetDescription: 'Show official website branding & click "Book Online"'
      },
      {
        stepIndex: 2,
        totalSteps: 4,
        title: '60-Second Online Booking',
        subtitle: 'Customer chooses Hair Spa, picks stylist Pooja, and confirms 4:30 PM.',
        viewMode: 'customer',
        targetDescription: 'Confirm booking for Priya Sharma'
      },
      {
        stepIndex: 3,
        totalSteps: 4,
        title: 'Instant Owner Dashboard Sync',
        subtitle: 'Appointment immediately appears in the live queue with zero delays.',
        viewMode: 'dashboard',
        sidebarTab: 'overview',
        targetDescription: 'Inspect new appointment in the live dashboard queue',
        wowMoment: {
          title: '⚡ Live Booking Synchronized!',
          description: 'Priya Sharma (Hair Spa with Pooja) instantly logged in today\'s schedule.'
        }
      },
      {
        stepIndex: 4,
        totalSteps: 4,
        title: 'Customer Relationship Profile',
        subtitle: 'Complete history of visits, favorite services, and lifetime value.',
        viewMode: 'dashboard',
        sidebarTab: 'customers',
        targetDescription: 'Show Priya Sharma\'s loyalty & visit history'
      }
    ]
  },

  hotel: {
    category: 'hotel',
    industryLabel: 'Hotel & Hospitality',
    durationEstimate: '50s',
    defaultValues: {
      guestName: 'Vikram Malhotra',
      roomName: 'Executive Business Suite',
      nights: 2,
      price: 3499
    },
    steps: [
      {
        stepIndex: 1,
        totalSteps: 4,
        title: 'Direct Hotel Website',
        subtitle: 'Direct booking engine saving 15-20% on MakeMyTrip / Agoda commissions.',
        viewMode: 'website',
        targetDescription: 'Show direct booking guarantee on the hotel storefront'
      },
      {
        stepIndex: 2,
        totalSteps: 4,
        title: 'Executive Suite Reservation',
        subtitle: 'Guest reserves 2 nights with instant rate calculation.',
        viewMode: 'customer',
        targetDescription: 'Complete reservation for Vikram Malhotra'
      },
      {
        stepIndex: 3,
        totalSteps: 4,
        title: 'Front Desk Occupancy Live Update',
        subtitle: 'Room reservation automatically registers and recalculates availability.',
        viewMode: 'dashboard',
        sidebarTab: 'overview',
        targetDescription: 'Notice room occupancy update and new guest record',
        wowMoment: {
          title: '🏨 Direct Booking Received!',
          description: 'Occupancy updated. Vikram Malhotra (Executive Suite, 2 Nights) confirmed.'
        }
      },
      {
        stepIndex: 4,
        totalSteps: 4,
        title: 'Guest Check-in & Invoicing',
        subtitle: 'Front desk one-tap check-in and automated GST invoice slip.',
        viewMode: 'dashboard',
        sidebarTab: 'reservations',
        targetDescription: 'Review front desk reservation roster'
      }
    ]
  },

  restaurant: {
    category: 'restaurant',
    industryLabel: 'Restaurant & Dining',
    durationEstimate: '50s',
    defaultValues: {
      customerName: 'Priya Sharma',
      items: ['Chicken Biryani (Dum Handi)', 'Butter Garlic Naan'],
      table: 'Table 4',
      total: 405
    },
    steps: [
      {
        stepIndex: 1,
        totalSteps: 4,
        title: 'Digital Food Menu & Ordering',
        subtitle: 'Guests browse live dishes, prices, and veg/non-veg indicators on phone.',
        viewMode: 'website',
        targetDescription: 'Browse mouth-watering digital food menu'
      },
      {
        stepIndex: 2,
        totalSteps: 4,
        title: 'Table Order Placement',
        subtitle: 'Order Chicken Biryani & Garlic Naan for Dine-in Table 4.',
        viewMode: 'customer',
        targetDescription: 'Submit order ticket to the kitchen'
      },
      {
        stepIndex: 3,
        totalSteps: 4,
        title: 'Kitchen Order Ticket (KOT) Live Alert',
        subtitle: 'Cooks immediately receive the order on the kitchen display.',
        viewMode: 'dashboard',
        sidebarTab: 'orders',
        targetDescription: 'Witness incoming KOT ticket on kitchen board',
        wowMoment: {
          title: '🔥 Live Kitchen Ticket (KOT) Dispatched!',
          description: 'Table 4 order (Biryani + Naan) sent directly to kitchen chef screen.'
        }
      },
      {
        stepIndex: 4,
        totalSteps: 4,
        title: 'Kitchen Status Progression',
        subtitle: 'Advance ticket from Preparing → Ready → Completed in one click.',
        viewMode: 'dashboard',
        sidebarTab: 'tables',
        targetDescription: 'View real-time table floor status grid'
      }
    ]
  },

  gym: {
    category: 'gym',
    industryLabel: 'Gym & Fitness',
    durationEstimate: '45s',
    defaultValues: {
      memberName: 'Rahul Verma',
      planName: 'Quarterly Transformation',
      duration: '3 Months',
      price: 2499
    },
    steps: [
      {
        stepIndex: 1,
        totalSteps: 4,
        title: 'Fitness Club Storefront',
        subtitle: 'Prospect showcases world-class facilities and transparent membership tiers.',
        viewMode: 'website',
        targetDescription: 'Showcase membership packages and free pass claim'
      },
      {
        stepIndex: 2,
        totalSteps: 4,
        title: 'Instant Membership Enrollment',
        subtitle: 'Rahul Verma joins with Quarterly Transformation plan.',
        viewMode: 'customer',
        targetDescription: 'Register member and generate QR access code'
      },
      {
        stepIndex: 3,
        totalSteps: 4,
        title: 'Biometric Attendance & Member Card',
        subtitle: 'Member code logged into live check-in feed immediately.',
        viewMode: 'dashboard',
        sidebarTab: 'attendance',
        targetDescription: 'Notice member check-in counter increment',
        wowMoment: {
          title: '💪 Member Biometric Activated!',
          description: 'Rahul Verma joined Quarterly Transformation. Daily check-in logged.'
        }
      },
      {
        stepIndex: 4,
        totalSteps: 4,
        title: 'Automated Renewal Tracking',
        subtitle: 'Queue WhatsApp reminders before expiry to retain 40% more members.',
        viewMode: 'dashboard',
        sidebarTab: 'members',
        targetDescription: 'View active member roster and expiry schedule'
      }
    ]
  },

  clinic: {
    category: 'clinic',
    industryLabel: 'Clinic & Healthcare',
    durationEstimate: '45s',
    defaultValues: {
      patientName: 'Anjali Kumar',
      doctorName: 'Dr. Arvind Sharma',
      timeSlot: '11:00 AM',
      fee: 500
    },
    steps: [
      {
        stepIndex: 1,
        totalSteps: 4,
        title: 'Clinic Consultation Portal',
        subtitle: 'Patients check specialist availability and current OPD timings.',
        viewMode: 'website',
        targetDescription: 'Review doctor credentials and consultation fees'
      },
      {
        stepIndex: 2,
        totalSteps: 4,
        title: 'Digital Token Generation',
        subtitle: 'Anjali Kumar books consultation with Dr. Arvind Sharma.',
        viewMode: 'customer',
        targetDescription: 'Confirm booking and generate digital token slip'
      },
      {
        stepIndex: 3,
        totalSteps: 4,
        title: 'OPD Queue Board & Chamber Call',
        subtitle: 'Token enters waiting room queue. Doctor calls next patient.',
        viewMode: 'dashboard',
        sidebarTab: 'appointments',
        targetDescription: 'Watch live token queue update and trigger chamber call',
        wowMoment: {
          title: '🩺 Patient Token #A-021 Enqueued!',
          description: 'Dr. Arvind Sharma chamber queue synchronized. Zero waiting room chaos.'
        }
      },
      {
        stepIndex: 4,
        totalSteps: 4,
        title: 'Digital Prescriptions & Follow-ups',
        subtitle: 'Type clinical diagnosis and deliver WhatsApp Rx in 30 seconds.',
        viewMode: 'dashboard',
        sidebarTab: 'patients',
        targetDescription: 'Review digital patient records and history'
      }
    ]
  },

  crm: {
    category: 'crm',
    industryLabel: 'Business & CRM',
    durationEstimate: '45s',
    defaultValues: {
      companyName: 'Rahul Enterprises',
      contactName: 'Rahul Agrawal',
      dealSize: '₹85,000',
      serviceType: 'Website + Custom Booking System'
    },
    steps: [
      {
        stepIndex: 1,
        totalSteps: 4,
        title: 'B2B Services Web Presence',
        subtitle: 'Showcase solutions, corporate credentials, and quote intake form.',
        viewMode: 'website',
        targetDescription: 'Inspect B2B solutions and request proposal CTA'
      },
      {
        stepIndex: 2,
        totalSteps: 4,
        title: 'Web Inquiry Capture',
        subtitle: 'Rahul Enterprises submits custom requirements for ₹85,000 project.',
        viewMode: 'customer',
        targetDescription: 'Submit custom business proposal inquiry'
      },
      {
        stepIndex: 3,
        totalSteps: 4,
        title: 'Visual Kanban Deal Pipeline',
        subtitle: 'Opportunity lands in "New Inquiry" and moves to "Proposal Sent".',
        viewMode: 'dashboard',
        sidebarTab: 'leads',
        targetDescription: 'Advance deal card across pipeline stages',
        wowMoment: {
          title: '💼 Deal Moved to "Closed Won"!',
          description: 'Rahul Enterprises (₹85,000) converted. Pipeline value updated in real-time.'
        }
      },
      {
        stepIndex: 4,
        totalSteps: 4,
        title: 'Revenue Forecast & Invoicing',
        subtitle: 'Executive revenue tracking and automatic contract quotation.',
        viewMode: 'dashboard',
        sidebarTab: 'reports',
        targetDescription: 'Examine executive revenue dashboard'
      }
    ]
  },

  custom: {
    category: 'custom',
    industryLabel: 'Custom Architecture',
    durationEstimate: '40s',
    defaultValues: {
      businessName: 'Custom Enterprise System'
    },
    steps: [
      {
        stepIndex: 1,
        totalSteps: 3,
        title: 'Operational Workflow Diagnosis',
        subtitle: 'Analyze current manual bottlenecks in billing, stock, and staff.',
        viewMode: 'dashboard',
        targetDescription: 'Examine bespoke software architectural diagram'
      },
      {
        stepIndex: 2,
        totalSteps: 3,
        title: 'Interactive System Blueprint',
        subtitle: 'Custom database entities, roles, and real-time syncing triggers.',
        viewMode: 'features',
        targetDescription: 'Walk through the custom system blueprint'
      },
      {
        stepIndex: 3,
        totalSteps: 3,
        title: '14-Day Rapid Deployment Plan',
        subtitle: 'Milestones from interactive prototype to on-premise staff training.',
        viewMode: 'dashboard',
        sidebarTab: 'overview',
        targetDescription: 'Review deployment timeline and package quote',
        wowMoment: {
          title: '⚙️ Custom Blueprint Architected!',
          description: 'Complete operational architecture mapped to business requirements.'
        }
      }
    ]
  }
};
