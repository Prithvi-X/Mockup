import { PackageCard } from '../types/salesMode';

export const PACKAGES_CONFIG: PackageCard[] = [
  {
    id: 'website',
    title: 'Business Website',
    tag: 'Web Presence',
    description: 'Fast, mobile-optimized branded storefront for local businesses looking to establish digital credibility.',
    startingPrice: 20000,
    offerPrice: 7500,
    features: [
      'Custom Branded Design & Color Palette',
      'Services / Catalog Showcase with ₹ Pricing',
      'Google Maps Location & WhatsApp Direct Chat',
      'Mobile-First Responsive Layout',
      '1 Year Hosting & Domain Setup Assistance'
    ]
  },
  {
    id: 'booking',
    title: 'Website + Booking System',
    tag: 'Primary Launch Offer',
    description: 'Complete digital front door enabling customers to book appointments, reserve rooms, or place food orders directly.',
    startingPrice: 30000,
    offerPrice: 10000,
    isPopular: true,
    features: [
      'Everything in Business Website',
      'Self-Service 60-Second Booking / Ordering Flow',
      'Automated WhatsApp Confirmation Slips',
      'Slot & Staff / Table Availability Management',
      'Zero Commission on Direct Transactions',
      'ReviewBro.in FREE for 2 Months Included'
    ]
  },
  {
    id: 'dashboard',
    title: 'Website + Business Dashboard',
    tag: 'Full Control',
    description: 'Real-time owner operational dashboard replacing spreadsheets and physical registers.',
    startingPrice: 45000,
    offerPrice: 15000,
    features: [
      'Everything in Website + Booking System',
      'Owner Real-Time Operations Dashboard',
      'Live Queue / Token System / Kitchen Display',
      'Customer Profiles & Visit History',
      'Staff Shifts & Commission Calculations',
      'Daily Revenue & Cash vs UPI Balance Reports'
    ]
  },
  {
    id: 'custom',
    title: 'Custom Business Software',
    tag: 'Bespoke Architecture',
    description: 'Tailored software architecture designed around the exact operational blueprint of your company.',
    startingPrice: 60000,
    offerPrice: 20000,
    features: [
      'Everything in Business Dashboard',
      'Custom Multi-Branch & Franchise Sync',
      'Biometric / Hardware POS / Printer Integration',
      'Custom Role-Based Access (Admin / Cashier / Staff)',
      'Dedicated SLA & On-Premise Training'
    ]
  }
];
