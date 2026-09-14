import { PackageCard } from '../types/salesMode';

export const PACKAGES_CONFIG: PackageCard[] = [
  {
    id: 'website',
    title: 'Starter Website',
    tag: 'Web Presence',
    description: 'Fast, mobile-optimized branded storefront for local businesses looking to establish credibility.',
    startingPrice: 18000,
    features: [
      'Custom Branded Design & Color Palette',
      'Services / Catalog Showcase with ₹ Pricing',
      'Google Maps Location & WhatsApp Direct Chat',
      'Mobile-First Responsive Layout',
      '1 Year Hosting & Domain Configuration'
    ]
  },
  {
    id: 'booking',
    title: 'Website + Booking',
    tag: 'Most Popular',
    description: 'Complete digital front door enabling customers to book appointments, reserve rooms, or place food orders.',
    startingPrice: 32000,
    isPopular: true,
    features: [
      'Everything in Starter Website',
      'Self-Service 60-Second Booking / Ordering Flow',
      'Automated WhatsApp Confirmation Slips',
      'Slot & Staff / Table Availability Management',
      'Zero Commission on Direct Transactions'
    ]
  },
  {
    id: 'management',
    title: 'Business Management',
    tag: 'Full Control',
    description: 'Real-time owner operational dashboard replacing spreadsheets and physical registers.',
    startingPrice: 55000,
    features: [
      'Everything in Website + Booking',
      'Owner Real-Time Operations Dashboard',
      'Live Queue / Token System / Kitchen Display',
      'Customer Profiles & Visit History',
      'Staff Shifts & Commission Calculations',
      'Daily Revenue & Cash vs UPI Balance Reports'
    ]
  },
  {
    id: 'custom',
    title: 'Custom Enterprise Suite',
    tag: 'Bespoke Architecture',
    description: 'Tailored software architecture designed around the exact operational blueprint of your company.',
    startingPrice: 85000,
    features: [
      'Everything in Business Management',
      'Custom Multi-Branch & Franchise Sync',
      'Biometric / Hardware POS / Printer Integration',
      'Custom Role-Based Access (Admin / Cashier / Staff)',
      'Dedicated SLA & On-Premise Training'
    ]
  }
];
