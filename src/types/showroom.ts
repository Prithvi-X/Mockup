export type BusinessCategory =
  | 'salon'
  | 'hotel'
  | 'restaurant'
  | 'gym'
  | 'clinic'
  | 'crm'
  | 'custom';

export type DemoViewMode = 'dashboard' | 'customer' | 'features' | 'website' | 'pricing';

export type AccentColor =
  | 'indigo'
  | 'emerald'
  | 'violet'
  | 'rose'
  | 'amber'
  | 'cyan'
  | 'sky'
  | 'slate';

// Industry-specific custom catalog items
export interface SalonServiceCustom {
  id: string;
  name: string;
  price: number;
  duration: string;
  desc: string;
}

export interface SalonStaffCustom {
  id: string;
  name: string;
  role: string;
}

export interface HotelRoomCustom {
  id: string;
  name: string;
  price: number;
  capacity: string;
  amenities: string[];
}

export interface RestaurantMenuItemCustom {
  id: string;
  name: string;
  category: string;
  price: number;
  desc: string;
  isVeg: boolean;
}

export interface GymPlanCustom {
  id: string;
  name: string;
  price: number;
  duration: string;
  benefits: string[];
}

export interface ClinicDoctorCustom {
  id: string;
  name: string;
  degree: string;
  specialty: string;
  fee: number;
}

export interface CustomizationState {
  businessName: string;
  tagline: string;
  accentColor: AccentColor;
  phone: string;
  whatsapp: string;
  address: string;
  website?: string;
  logoUrl?: string; // Local Base64 Data URL
  // Industry catalogs
  salonServices?: SalonServiceCustom[];
  salonStaffList?: SalonStaffCustom[];
  hotelRoomsList?: HotelRoomCustom[];
  restaurantMenuList?: RestaurantMenuItemCustom[];
  gymPlansList?: GymPlanCustom[];
  clinicDoctorsList?: ClinicDoctorCustom[];
  crmStagesList?: string[];
}

export interface StatMetric {
  label: string;
  value: string;
  subtext?: string;
  change?: string;
  isPositive?: boolean;
}

export interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  badge?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
  benefit: string;
}

export interface CategoryCardData {
  id: BusinessCategory;
  label: string;
  name: string;
  tagline: string;
  description: string;
  previewFeatures: string[];
  icon: string;
  themeColor: AccentColor;
  badge?: string;
}

export interface BusinessData {
  id: BusinessCategory;
  name: string;
  label: string;
  tagline: string;
  category: string;
  description: string;
  defaultCustomization: CustomizationState;
  stats: StatMetric[];
  sidebarItems: SidebarItem[];
  featuresList: FeatureItem[];
  overviewData: {
    primaryTableTitle: string;
    primaryTableColumns: string[];
    primaryTableRows: Record<string, string | number | boolean>[];
    secondaryTableTitle: string;
    secondaryTableColumns: string[];
    secondaryTableRows: Record<string, string | number | boolean>[];
    activityFeed: Array<{ title: string; time: string; detail: string; status?: string }>;
  };
  customerPreview: {
    heroTitle: string;
    heroSubtitle: string;
    actionLabel: string;
    sections: any;
  };
}

// ----------------- PHASE 2 INTERACTIVE WORKFLOW TYPES -----------------

export interface SalonBooking {
  id: string;
  token: string;
  customerName: string;
  phone: string;
  email?: string;
  serviceName: string;
  staffName: string;
  date: string;
  time: string;
  price: number;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid';
  paymentMethod?: string;
  notes?: string;
  createdAt: string;
}

export interface SalonCustomer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalVisits: number;
  lastVisit: string;
  upcomingAppointment?: string;
  servicesUsed: string[];
  notes: string[];
}

export interface SalonStaff {
  id: string;
  name: string;
  role: string;
  availableSlots: string[];
  bookedSlots: string[];
  activeAppointments: number;
}

export interface HotelReservation {
  id: string;
  bookingRef: string;
  guestName: string;
  phone: string;
  email?: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: string;
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Checked In' | 'Checked Out' | 'Cancelled';
  paymentStatus: 'Pending' | 'Paid';
  paymentMethod?: string;
}

export interface RestaurantOrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface RestaurantOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  type: 'Dine In' | 'Takeaway' | 'Delivery';
  tableNumber?: string;
  items: RestaurantOrderItem[];
  totalAmount: number;
  status: 'New' | 'Preparing' | 'Ready' | 'Completed';
  orderTime: string;
}

export interface RestaurantTable {
  id: string;
  name: string;
  capacity: number;
  status: 'Available' | 'Reserved' | 'Occupied';
  reservedFor?: string;
}

export interface GymMember {
  id: string;
  memberCode: string;
  name: string;
  phone: string;
  email?: string;
  planName: string;
  planPrice: number;
  startDate: string;
  expiryDate: string;
  paymentStatus: 'Paid' | 'Pending';
  status: 'Active' | 'Expiring Soon' | 'Expired';
  lastAttendance?: string;
  totalCheckins: number;
}

export interface ClinicAppointment {
  id: string;
  tokenNumber: string;
  patientName: string;
  phone: string;
  age: string;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  reason: string;
  status: 'Waiting' | 'In Consultation' | 'Completed' | 'Cancelled';
  consultationFee: number;
  notes: string[];
}

export interface CrmLead {
  id: string;
  leadCode: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  requirement: string;
  budgetRange: string;
  estimatedValue: number;
  stage: 'New' | 'Contacted' | 'Proposal Sent' | 'Won' | 'Lost';
  createdAt: string;
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  detail: string;
  read: boolean;
  category: BusinessCategory;
}

export interface ActivityItem {
  id: string;
  time: string;
  title: string;
  detail: string;
  status?: string;
}
