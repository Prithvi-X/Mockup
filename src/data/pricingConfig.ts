import { PricingConfig } from '../types/pricing';

export const PRICING_CONFIG: PricingConfig = {
  tiers: {
    tier_a: {
      id: 'tier_a',
      name: 'Custom Business Website',
      tagline: 'Customer-facing digital storefront & booking workflow',
      regularPrice: 4499,
      offerPrice: 3499,
      floorPrice: 2500, // PRESENTER-ONLY SAFETY GUARD — NEVER EXPOSED TO PROSPECT
      defaultAdvancePercent: 50,
      description: 'A mobile-optimized branded storefront that allows local customers to browse services and self-book without third-party fees.',
      features: [
        'Branded custom website & color styling',
        'Mobile-responsive layout',
        'Services / catalog showcase with ₹ pricing',
        'Direct WhatsApp contact & call CTA',
        'Customer booking / inquiry form',
        'Service & date/time selection',
        'Automated WhatsApp booking slip trigger',
        'Setup, local hosting & configuration'
      ],
      inclusionsByCategory: {
        salon: [
          'Branded Salon & Spa storefront',
          'Hair, beauty & treatment catalog with ₹ pricing',
          'Stylist selection & available time slots',
          '60-second online customer booking form',
          'Automated WhatsApp appointment slip',
          'Google Maps directions & salon address'
        ],
        hotel: [
          'Boutique hotel & resort showcase',
          'Room categories, photos & tariff cards',
          'Direct booking inquiry without OTA commissions',
          'Guest contact & check-in dates selection',
          'Front-desk concierge WhatsApp chat',
          'Directions & property amenities showcase'
        ],
        restaurant: [
          'Digital restaurant menu showcase',
          'Categorized food items with photos & ₹ prices',
          'Veg / Non-veg badges & food descriptions',
          'Dine-in / takeaway order inquiry form',
          'Table reservation request form',
          'Direct WhatsApp table & order confirmation'
        ],
        gym: [
          'Modern fitness club digital storefront',
          'Membership tiers & monthly/annual pricing',
          'Facility photo gallery (weights, steam, turf)',
          'Free 1-day guest pass inquiry form',
          'Direct WhatsApp membership counselor chat',
          'Gym timing & location map integration'
        ],
        clinic: [
          'Doctor clinic & OPD storefront',
          'Specialist doctor profiles & consultation fees',
          'Clinic timings & appointment booking form',
          'Specialty selection (dental, general, etc.)',
          'Instant WhatsApp appointment acknowledgment',
          'Emergency contact & clinic address directions'
        ],
        crm: [
          'Corporate agency / services landing page',
          'Solutions showcase & case studies',
          'Lead capture & custom quote inquiry form',
          'Project scope checklist',
          'Instant sales team WhatsApp notification',
          'Office contact details & credentials'
        ],
        custom: [
          'Bespoke branded digital storefront',
          'Tailored customer intake flow',
          'Service / product catalog with custom attributes',
          'WhatsApp instant inquiry dispatch',
          'Mobile-first responsive architecture',
          'Custom domain configuration'
        ]
      }
    },

    tier_b: {
      id: 'tier_b',
      name: 'Custom Business System',
      tagline: 'Website + Real-time Owner Operations Dashboard',
      badge: 'MOST POPULAR',
      isPopular: true,
      regularPrice: 9999,
      offerPrice: 7499,
      floorPrice: 5500, // PRESENTER-ONLY SAFETY GUARD — NEVER EXPOSED TO PROSPECT
      defaultAdvancePercent: 50,
      description: 'The complete business solution: branded customer frontend connected live to your private owner management dashboard.',
      features: [
        'Everything in Custom Business Website',
        'Private owner management dashboard',
        'Live booking & order queue management',
        'Customer database & visit history',
        'Status management (Confirmed / Active / Done)',
        'Simple daily business revenue overview',
        'Cash vs UPI payment balance tracking',
        'Activity feed & real-time notifications'
      ],
      inclusionsByCategory: {
        salon: [
          'Everything in Salon Website',
          'Owner live queue dashboard (today\'s schedule)',
          'Customer database with visit history & loyalty',
          'Stylist shift assignment & availability control',
          'Appointment status updater (Pending/Confirmed/Done)',
          'Daily collection tracking (Cash vs UPI)'
        ],
        hotel: [
          'Everything in Hotel Website',
          'Front-desk room occupancy & reservation dashboard',
          'Guest check-in & check-out status management',
          'Room availability & tariff calendar',
          'Guest record book with stay history',
          'Daily revenue & advance payment tracking'
        ],
        restaurant: [
          'Everything in Restaurant Menu',
          'Live kitchen display & order queue (KOT)',
          'Table management & status (Available/Occupied)',
          'Order status workflow (New -> Preparing -> Ready)',
          'Bill generation with cash & UPI split',
          'Daily sales overview & item popularity reports'
        ],
        gym: [
          'Everything in Gym Storefront',
          'Member management dashboard & roster',
          'Attendance log (biometric/QR check-in simulated)',
          'Membership expiry & renewal alert tracking',
          'Active vs expiring member segmentation',
          'Fee payment recording & receipts'
        ],
        clinic: [
          'Everything in Clinic Storefront',
          'Digital token queue system (#A-101, #A-102)',
          'Doctor consultation dashboard & patient history',
          'Waiting room queue display status',
          'Patient consultation notes & prescription record',
          'Daily patient count & consultation fee reports'
        ],
        crm: [
          'Everything in Services Storefront',
          'Kanban deal pipeline (New -> Contacted -> Won)',
          'Lead tracking with budget & requirement details',
          'Customer interaction history & follow-up notes',
          'Team sales activity & conversion metrics',
          'Deal closure tracking & proposal archive'
        ],
        custom: [
          'Everything in Custom Storefront',
          'Tailored multi-stage business dashboard',
          'Role-specific views (Owner / Cashier / Staff)',
          'Custom status workflow & dispatch states',
          'Comprehensive audit log & transaction history',
          'Custom exportable operational reports'
        ]
      }
    },

    tier_c: {
      id: 'tier_c',
      name: 'Custom Business Software',
      tagline: 'Bespoke architecture built around your exact workflow',
      regularPrice: 0,
      offerPrice: 0,
      floorPrice: 0, // Quote-based
      defaultAdvancePercent: 40,
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
    },

    restaurant_special: {
      id: 'restaurant_special',
      name: 'Digital Menu + QR Ordering',
      tagline: 'Self-service contactless QR menu & kitchen orders',
      regularPrice: 2999,
      offerPrice: 2499,
      floorPrice: 2000, // PRESENTER-ONLY SAFETY GUARD
      defaultAdvancePercent: 50,
      description: 'Dedicated restaurant package: customers scan QR on table, browse digital menu with photos, and place orders directly.',
      features: [
        'Mobile-friendly QR digital menu',
        'Printable tabletop QR code graphic',
        'Menu categories & dish photography',
        'Live ₹ pricing with veg / non-veg tags',
        'Table order cart & self-checkout flow',
        'Dine-in table number or takeaway options',
        'Owner kitchen order management screen',
        'Optional +₹3,000–₹5,000 upgrade for advanced billing'
      ],
      inclusionsByCategory: {
        restaurant: [
          'Custom branded QR code for table stands',
          'Visual digital menu accessible on any phone',
          'Instant cart & ordering without app download',
          'Live kitchen ticket display (KOT)',
          'Order status updates (New -> Preparing -> Ready)',
          'Table-wise bill summary with UPI QR'
        ],
        salon: [],
        hotel: [],
        gym: [],
        clinic: [],
        crm: [],
        custom: []
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
      agency: 'High upfront project cost (₹45k+)',
      ourSolution: 'Affordable entry project (₹3,499 offer)'
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
