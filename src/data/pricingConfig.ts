import { PricingConfig } from '../types/pricing';

export const PRICING_CONFIG: PricingConfig = {
  tiers: {
    website: {
      id: 'website',
      name: 'Business Website',
      tagline: 'Customer-facing branded digital storefront & catalog',
      regularPrice: 20000,
      offerPrice: 7500,
      floorPrice: 5000, // PRESENTER-ONLY SAFETY GUARD — NEVER EXPOSED TO PROSPECT
      defaultAdvancePercent: 50,
      description: 'A mobile-optimized branded storefront that allows local customers to browse services, location and contact your business directly.',
      features: [
        'Branded custom website & color styling',
        'Mobile-responsive layout',
        'Services / catalog showcase with ₹ pricing',
        'Direct WhatsApp contact & call CTA',
        'Google Maps directions & location showcase',
        'Customer inquiry form & contact capture',
        'Setup, local hosting & configuration assistance'
      ],
      inclusionsByCategory: {
        salon: [
          'Branded Salon & Spa storefront',
          'Hair, beauty & treatment catalog with ₹ pricing',
          'Stylist profiles & salon working hours',
          'Direct WhatsApp appointment inquiry',
          'Google Maps directions & salon address'
        ],
        hotel: [
          'Boutique hotel & resort showcase',
          'Room categories, photos & tariff cards',
          'Direct booking inquiry without OTA commissions',
          'Front-desk concierge WhatsApp chat',
          'Directions & property amenities showcase'
        ],
        restaurant: [
          'Digital restaurant menu showcase',
          'Categorized food items with photos & ₹ prices',
          'Veg / Non-veg badges & food descriptions',
          'Table reservation & order inquiry via WhatsApp',
          'Google Maps location & opening hours'
        ],
        gym: [
          'Modern fitness club digital storefront',
          'Membership tiers & monthly/annual pricing',
          'Facility photo gallery (weights, steam, turf)',
          'Free 1-day guest pass inquiry form',
          'Direct WhatsApp membership counselor chat'
        ],
        clinic: [
          'Doctor clinic & OPD storefront',
          'Specialist doctor profiles & consultation fees',
          'Clinic timings & medical specialties list',
          'Instant WhatsApp appointment inquiry',
          'Emergency contact & clinic address directions'
        ],
        crm: [
          'Corporate agency / services landing page',
          'Solutions showcase & case studies',
          'Lead capture & custom quote inquiry form',
          'Instant sales team WhatsApp notification',
          'Office contact details & credentials'
        ],
        custom: [
          'Bespoke branded digital storefront',
          'Service / product catalog with custom attributes',
          'WhatsApp instant inquiry dispatch',
          'Mobile-first responsive architecture',
          'Custom domain configuration'
        ]
      }
    },

    booking: {
      id: 'booking',
      name: 'Website + Booking System',
      tagline: 'Self-service online booking/ordering + WhatsApp confirmation',
      badge: 'PRIMARY LAUNCH OFFER',
      isPopular: true,
      regularPrice: 30000,
      offerPrice: 10000,
      floorPrice: 8000, // PRESENTER-ONLY SAFETY GUARD — NEVER EXPOSED TO PROSPECT
      defaultAdvancePercent: 50,
      description: 'The primary growth engine: customer-facing website with 60-second self-service booking/ordering, automated WhatsApp confirmations, and zero commissions.',
      features: [
        'Everything in Business Website',
        'Self-service 60-second online booking / ordering flow',
        'Automated WhatsApp confirmation slips to customer & owner',
        'Slot, table, and staff availability management',
        'Customer contact & service details capture',
        'Zero commissions on direct customer bookings',
        'ReviewBro.in FREE for 2 months included'
      ],
      inclusionsByCategory: {
        salon: [
          'Everything in Salon Website',
          '60-second online customer booking form',
          'Stylist selection & available time slots',
          'Automated WhatsApp appointment slip to client & owner',
          'Slot clash prevention & zero booking commissions'
        ],
        hotel: [
          'Everything in Hotel Website',
          'Direct online room booking workflow',
          'Guest contact & check-in/out dates selection',
          'Automated WhatsApp reservation confirmation',
          'Zero commissions on direct guest bookings'
        ],
        restaurant: [
          'Everything in Restaurant Menu',
          'Contactless QR digital menu & table ordering flow',
          'Dine-in table number / takeaway cart flow',
          'Direct WhatsApp order confirmation slip',
          'Zero food aggregator commission'
        ],
        gym: [
          'Everything in Gym Storefront',
          '60-second online membership registration flow',
          'Plan & duration selection with instant slip',
          'Free trial pass instant WhatsApp delivery',
          'Direct joining with zero intermediary fees'
        ],
        clinic: [
          'Everything in Clinic Storefront',
          '60-second online patient appointment booking',
          'Doctor slot & specialty selection',
          'Instant WhatsApp appointment confirmation with token',
          'Patient reminder slips'
        ],
        crm: [
          'Everything in Services Storefront',
          'Interactive project requirement intake flow',
          'Scope module selection & budget tier intake',
          'Instant sales team WhatsApp lead dispatch',
          'Automated lead confirmation acknowledgment'
        ],
        custom: [
          'Everything in Custom Storefront',
          'Interactive customer self-service intake/booking flow',
          'Custom input fields & requirement checklist',
          'Automated WhatsApp inquiry confirmation',
          'Instant owner notification'
        ]
      }
    },

    dashboard: {
      id: 'dashboard',
      name: 'Website + Business Dashboard',
      tagline: 'Customer frontend + Real-time owner operations dashboard',
      badge: 'FULL OPERATIONS SUITE',
      regularPrice: 45000,
      offerPrice: 15000,
      floorPrice: 12000, // PRESENTER-ONLY SAFETY GUARD — NEVER EXPOSED TO PROSPECT
      defaultAdvancePercent: 50,
      description: 'The complete business operations system: branded customer frontend connected live to your private owner management dashboard with live queues, customer history, and cash vs UPI balance tracking.',
      features: [
        'Everything in Website + Booking System',
        'Private owner management dashboard',
        'Live queue & order status management',
        'Customer database & visit history',
        'Status management (Pending / Active / Done)',
        'Daily business revenue overview',
        'Cash vs UPI payment balance tracking',
        'Real-time activity feed & notifications'
      ],
      inclusionsByCategory: {
        salon: [
          'Everything in Salon Booking System',
          'Owner live queue dashboard (today\'s schedule)',
          'Customer database with visit history & loyalty',
          'Stylist shift assignment & availability control',
          'Appointment status updater (Pending/Confirmed/Done)',
          'Daily collection tracking (Cash vs UPI)'
        ],
        hotel: [
          'Everything in Hotel Booking System',
          'Front-desk room occupancy & reservation dashboard',
          'Guest check-in & check-out status management',
          'Room availability & tariff calendar',
          'Guest record book with stay history',
          'Daily revenue & advance payment tracking'
        ],
        restaurant: [
          'Everything in Restaurant Ordering System',
          'Live kitchen display & order queue (KOT)',
          'Table management & status (Available/Occupied)',
          'Order status workflow (New -> Preparing -> Ready)',
          'Bill generation with cash & UPI split',
          'Daily sales overview & item popularity reports'
        ],
        gym: [
          'Everything in Gym Joining System',
          'Member management dashboard & roster',
          'Attendance log (biometric/QR check-in simulated)',
          'Membership expiry & renewal alert tracking',
          'Active vs expiring member segmentation',
          'Fee payment recording & receipts'
        ],
        clinic: [
          'Everything in Clinic Booking System',
          'Digital token queue system (#A-101, #A-102)',
          'Doctor consultation dashboard & patient history',
          'Waiting room queue display status',
          'Patient consultation notes & prescription record',
          'Daily patient count & consultation fee reports'
        ],
        crm: [
          'Everything in Inquiry Flow',
          'Kanban deal pipeline (New -> Contacted -> Won)',
          'Lead tracking with budget & requirement details',
          'Customer interaction history & follow-up notes',
          'Team sales activity & conversion metrics',
          'Deal closure tracking & proposal archive'
        ],
        custom: [
          'Everything in Custom Inquiry Flow',
          'Tailored multi-stage business dashboard',
          'Role-specific views (Owner / Cashier / Staff)',
          'Custom status workflow & dispatch states',
          'Comprehensive audit log & transaction history',
          'Custom exportable operational reports'
        ]
      }
    },

    custom: {
      id: 'custom',
      name: 'Custom Business Software',
      tagline: 'Bespoke architecture built around your exact workflow',
      regularPrice: 60000,
      regularPriceDisplay: '₹60,000–₹1,00,000+',
      offerPrice: 20000,
      offerPriceDisplay: 'Starting ₹20,000 / Custom Quote',
      floorPrice: 20000, // PRESENTER-ONLY SAFETY GUARD
      defaultAdvancePercent: 40,
      isQuote: true,
      description: 'When your business has unique operational needs, multi-branch operations, or complex custom hardware requirements.',
      features: [
        'Architecture tailored to your exact workflow',
        'Custom multi-role dashboards (Admin/Staff/Cashier)',
        'Multi-branch or franchise synchronization',
        'Hardware printer, barcode, or biometric support',
        'Custom data fields, export tools & reports',
        'Dedicated training & direct developer SLA',
        'Future expansion capability with zero license lock-in',
        'Zero recurring percentage commissions'
      ],
      inclusionsByCategory: {
        salon: [
          'Multi-branch salon chain synchronization',
          'Custom stylist commission & payroll formula',
          'Inventory & chemical product stock deduction',
          'Dedicated thermal receipt printer integration',
          'SMS gateway & branded WhatsApp API setup'
        ],
        hotel: [
          'Multi-property management central system',
          'Channel manager & OTA sync architecture',
          'Restaurant POS & room service billing linkage',
          'Housekeeping & room maintenance tracker',
          'Custom invoice generation with GST breakdown'
        ],
        restaurant: [
          'Multi-kitchen display systems (KDS)',
          'Direct thermal KOT printer integration',
          'Raw ingredient inventory & recipe costing',
          'Captain handheld ordering device sync',
          'Franchise & centralized menu management'
        ],
        gym: [
          'Turnstile & biometric gate hardware integration',
          'Diet plan & workout assignment portal for trainers',
          'Locker management & equipment maintenance log',
          'Automated renewal WhatsApp reminder gateway',
          'Multi-gym branch membership access sync'
        ],
        clinic: [
          'Multi-doctor polyclinic OPD schedule engine',
          'Pharmacy dispensary inventory & billing linkage',
          'Pathology test lab reporting & print slips',
          'Digital TV token display for waiting lobby',
          'EMR (Electronic Medical Records) database'
        ],
        crm: [
          'Multi-tier sales hierarchy & territory management',
          'Automated quotation PDF generation with e-sign',
          'Inbound lead auto-assignment round robin',
          'Telecaller VoIP / call logging integration',
          'Custom ERP / accounting software data sync'
        ],
        custom: [
          'Bespoke enterprise software architecture',
          'Custom relational database & offline caching',
          'On-premise or private cloud deployment',
          'Legacy software data migration assistance',
          'Dedicated engineering support & SLA'
        ]
      }
    }
  },

  bonus: {
    title: 'Included Launch Bonus',
    durationText: '2 Months Free',
    exactHeadline: 'ReviewBro.in included free for 2 months',
    description: 'Review management and Google review-growth tool provided as an introductory bonus to help build local customer trust.',
    configurableValue: undefined // Truthful: no fake inflated monetary claim unless specified
  },

  competitors: [
    {
      name: 'SalonBoost / Local SaaS Tools',
      category: 'salon',
      typicalPricing: '₹799 – ₹1,499 / month',
      billingModel: 'Monthly SaaS',
      note: 'Recurring monthly cost + per-transaction fee in some packages.'
    },
    {
      name: 'Dingg / Salon Suites',
      category: 'salon',
      typicalPricing: '₹1,500 – ₹8,000 / month',
      billingModel: 'Monthly SaaS',
      note: 'Multi-tier subscription based on staff count and features.'
    },
    {
      name: 'Kasratbook / ManageYourGym',
      category: 'gym',
      typicalPricing: '₹1,499 / month or ₹7,000 – ₹30,000 one-time',
      billingModel: 'Monthly SaaS',
      note: 'Software license requiring recurring annual renewal fees.'
    },
    {
      name: 'Restaurant POS Aggregators (Petpooja, UrbanPiper)',
      category: 'restaurant',
      typicalPricing: '₹10,000 – ₹25,000 / year + hardware',
      billingModel: 'Monthly SaaS',
      note: 'Annual recurring software license fees.'
    },
    {
      name: 'Practo / HealthPlix',
      category: 'clinic',
      typicalPricing: '₹999 – ₹2,500 / month per doctor',
      billingModel: 'Monthly SaaS',
      note: 'Ongoing monthly fee per practicing practitioner.'
    },
    {
      name: 'Traditional Software Development Agencies',
      category: 'general',
      typicalPricing: '₹45,000 – ₹1,50,000+ project fee',
      billingModel: 'One-Time Project',
      note: 'Requires lengthy scoping, 4–8 week development timeline.'
    }
  ],

  structuralComparison: [
    {
      feature: 'System Setup',
      saas: 'Standardized rigid template',
      agency: 'Custom built from scratch',
      ourSolution: 'Customized around your business workflow'
    },
    {
      feature: 'Business Workflow',
      saas: 'Limited to pre-built features',
      agency: 'Fully custom scoping',
      ourSolution: 'Tailored to your specific local operation'
    },
    {
      feature: 'Branding & Identity',
      saas: 'Generic branding / tool logo',
      agency: 'Custom branded',
      ourSolution: '100% your brand, logo & color palette'
    },
    {
      feature: 'Ongoing Monthly Subscription',
      saas: 'Required every single month',
      agency: 'Depends on maintenance contract',
      ourSolution: 'One-time project fee (zero commission)'
    },
    {
      feature: 'Business-Specific Changes',
      saas: 'Generally not supported',
      agency: 'Yes, with hourly change requests',
      ourSolution: 'Yes, adapted directly in live meeting'
    },
    {
      feature: 'Local Market Customization',
      saas: 'Limited global format',
      agency: 'Yes',
      ourSolution: 'Tailored for Indian local business reality'
    },
    {
      feature: 'Starting Cost',
      saas: 'Recurring monthly expense',
      agency: 'High upfront project cost (₹60k+)',
      ourSolution: 'Accessible entry project (₹7,500 – ₹10,000 launch offer)'
    },
    {
      feature: 'Direct Owner Demo',
      saas: 'Generic slide / recording',
      agency: 'Text proposal & quote sheet',
      ourSolution: 'Live customized interactive showroom demo'
    }
  ],

  disclaimers: {
    indicativePricing: 'Pricing shown for typical alternatives is indicative and based on public market references. Actual third-party pricing may change.',
    paymentStructureOnly: 'Comparison illustrates the difference between monthly recurring payments versus one-time project ownership. Feature sets and scopes may differ.',
    structuralComparisonFootnote: 'Comparison is based on typical product and project delivery models, not a claim about every specific provider in the market.',
    honestUrgency: 'Introductory launch pricing offered to early local businesses to establish local portfolio benchmarks.'
  }
};
