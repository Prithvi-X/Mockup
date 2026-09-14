import { BusinessCategory } from '../types/showroom';

export interface SolutionCard {
  id: string;
  title: string;
  description: string;
  targetCategory: BusinessCategory;
  icon: string;
  highlights: string[];
  viewDemoActionLabel: string;
}

export const SOLUTIONS_DATA: SolutionCard[] = [
  {
    id: 'booking',
    title: 'Booking Systems',
    description: 'Appointments, reservations, availability, and seamless customer self-booking.',
    targetCategory: 'salon',
    icon: 'CalendarClock',
    highlights: ['Interactive slot calendars', 'Automated reminders', 'No double-booking'],
    viewDemoActionLabel: 'View Salon & Booking Demo'
  },
  {
    id: 'websites',
    title: 'Business Websites',
    description: 'Modern, high-speed websites designed specifically around your services and brand.',
    targetCategory: 'hotel',
    icon: 'Globe',
    highlights: ['Fast mobile loading', 'Zero commission bookings', 'High-conversion design'],
    viewDemoActionLabel: 'View Hotel & Web Demo'
  },
  {
    id: 'management',
    title: 'Management Software',
    description: 'Customers, staff shifts, operations, billing, and clear visual dashboards.',
    targetCategory: 'gym',
    icon: 'LayoutDashboard',
    highlights: ['Real-time attendance', 'Automated renewals', 'Staff accountability'],
    viewDemoActionLabel: 'View Gym & Management Demo'
  },
  {
    id: 'crm',
    title: 'CRM & Lead Management',
    description: 'Capture, organize, and follow up with leads without losing deals in notebook pages.',
    targetCategory: 'crm',
    icon: 'Briefcase',
    highlights: ['Visual sales pipeline', 'Follow-up alerts', 'Quotation generator'],
    viewDemoActionLabel: 'View Business CRM Demo'
  },
  {
    id: 'ordering',
    title: 'Ordering Systems',
    description: 'Digital QR menus, instant order tracking, table management, and bill generation.',
    targetCategory: 'restaurant',
    icon: 'UtensilsCrossed',
    highlights: ['Instant QR menu', 'Live kitchen tickets', 'Speedy table turnover'],
    viewDemoActionLabel: 'View Restaurant Demo'
  },
  {
    id: 'custom',
    title: 'Custom Software',
    description: 'A dedicated system engineered specifically around your unique business operations.',
    targetCategory: 'custom',
    icon: 'Sparkles',
    highlights: ['Zero bloated buttons', 'Molds to your workflow', 'Complete data ownership'],
    viewDemoActionLabel: 'Explore Custom Blueprint'
  }
];
