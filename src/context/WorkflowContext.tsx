import React, { createContext, useContext, useState, useEffect } from 'react';
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
  ActivityItem,
  BusinessCategory
} from '../types/showroom';
import {
  INITIAL_SALON_BOOKINGS,
  INITIAL_SALON_CUSTOMERS,
  INITIAL_SALON_STAFF,
  INITIAL_HOTEL_RESERVATIONS,
  INITIAL_RESTAURANT_ORDERS,
  INITIAL_RESTAURANT_TABLES,
  INITIAL_GYM_MEMBERS,
  INITIAL_CLINIC_APPOINTMENTS,
  INITIAL_CRM_LEADS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITIES
} from '../data/initialInteractiveData';
import { QUICK_DEMO_SCENARIOS } from '../data/quickDemoScenarios';
import { SalesRequirementInquiry, DemoSpeedMode } from '../types/salesMode';
import { BUSINESS_DATA_MAP } from '../data/mockBusinesses';
import { useDemo } from './DemoContext';

interface WhatsAppModalState {
  isOpen: boolean;
  title: string;
  recipientName: string;
  phone: string;
  message: string;
}

interface PaymentModalState {
  isOpen: boolean;
  title: string;
  amount: number;
  customerName: string;
  onConfirm: (method: string) => void;
}

interface WorkflowContextType {
  // Salon
  salonBookings: SalonBooking[];
  salonCustomers: SalonCustomer[];
  salonStaff: SalonStaff[];
  selectedCustomer: SalonCustomer | null;
  setSelectedCustomer: (c: SalonCustomer | null) => void;
  addSalonBooking: (booking: Omit<SalonBooking, 'id' | 'createdAt'>) => string;
  confirmSalonBooking: (id: string) => void;
  cancelSalonBooking: (id: string) => void;
  addSalonCustomerNote: (customerId: string, note: string) => void;
  recordSalonPayment: (bookingId: string, method: string) => void;

  // Hotel
  hotelReservations: HotelReservation[];
  addHotelReservation: (res: Omit<HotelReservation, 'id'>) => string;
  confirmHotelReservation: (id: string) => void;
  checkInHotelReservation: (id: string) => void;

  // Restaurant
  restaurantOrders: RestaurantOrder[];
  restaurantTables: RestaurantTable[];
  addRestaurantOrder: (order: Omit<RestaurantOrder, 'id' | 'orderTime'>) => string;
  advanceRestaurantOrderStatus: (orderId: string) => void;
  toggleTableStatus: (tableId: string, status: 'Available' | 'Reserved' | 'Occupied', reservedFor?: string) => void;

  // Gym
  gymMembers: GymMember[];
  addGymMember: (member: Omit<GymMember, 'id' | 'totalCheckins'>) => string;
  markGymAttendance: (memberCode: string) => void;
  renewGymMembership: (memberId: string, months?: number) => void;

  // Clinic
  clinicAppointments: ClinicAppointment[];
  clinicCurrentToken: string;
  selectedPatient: ClinicAppointment | null;
  setSelectedPatient: (appt: ClinicAppointment | null) => void;
  addClinicAppointment: (appt: Omit<ClinicAppointment, 'id'>) => string;
  callNextClinicPatient: () => void;
  addClinicPatientNote: (apptId: string, note: string) => void;

  // CRM
  crmLeads: CrmLead[];
  addCrmLead: (lead: Omit<CrmLead, 'id' | 'createdAt'>) => string;
  advanceCrmLeadStage: (leadId: string, newStage: CrmLead['stage']) => void;

  // Notifications & Activity
  notifications: NotificationItem[];
  activityFeed: ActivityItem[];
  markAllNotificationsRead: () => void;
  addActivity: (title: string, detail: string, status?: string) => void;

  // Simulated modals
  whatsAppModal: WhatsAppModalState;
  openWhatsAppModal: (recipientName: string, phone: string, message: string, title?: string) => void;
  closeWhatsAppModal: () => void;

  paymentModal: PaymentModalState;
  openPaymentModal: (title: string, amount: number, customerName: string, onConfirm: (method: string) => void) => void;
  closePaymentModal: () => void;

  // Live Demo & Reset
  isLiveDemoMode: boolean;
  setIsLiveDemoMode: (active: boolean) => void;
  resetAllWorkflowData: () => void;
  triggerQuickDemo: (cat: BusinessCategory) => void;

  // Phase 4 Quick & Guided Demo Flow
  quickDemoStep: number;
  isQuickDemoRunning: boolean;
  isQuickDemoAutoPlay: boolean;
  wowMoment: { title: string; description: string } | null;
  dismissWowMoment: () => void;
  startQuickDemo: (cat?: BusinessCategory, mode?: DemoSpeedMode) => void;
  nextQuickDemoStep: () => void;
  prevQuickDemoStep: () => void;
  startOverQuickDemo: () => void;
  exitQuickDemo: () => void;
  toggleQuickDemoAutoPlay: () => void;
  savedInquiries: SalesRequirementInquiry[];
  saveRequirementInquiry: (inquiry: SalesRequirementInquiry) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export const WorkflowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    showToast,
    setViewMode,
    category,
    switchCategory,
    setActiveSidebarTab,
    setIsDemoHandoffOpen,
    setDemoSpeedMode
  } = useDemo();

  // Salon State
  const [salonBookings, setSalonBookings] = useState<SalonBooking[]>(INITIAL_SALON_BOOKINGS);
  const [salonCustomers, setSalonCustomers] = useState<SalonCustomer[]>(INITIAL_SALON_CUSTOMERS);
  const [salonStaff, setSalonStaff] = useState<SalonStaff[]>(INITIAL_SALON_STAFF);
  const [selectedCustomer, setSelectedCustomer] = useState<SalonCustomer | null>(null);

  // Hotel State
  const [hotelReservations, setHotelReservations] = useState<HotelReservation[]>(INITIAL_HOTEL_RESERVATIONS);

  // Restaurant State
  const [restaurantOrders, setRestaurantOrders] = useState<RestaurantOrder[]>(INITIAL_RESTAURANT_ORDERS);
  const [restaurantTables, setRestaurantTables] = useState<RestaurantTable[]>(INITIAL_RESTAURANT_TABLES);

  // Gym State
  const [gymMembers, setGymMembers] = useState<GymMember[]>(INITIAL_GYM_MEMBERS);

  // Clinic State
  const [clinicAppointments, setClinicAppointments] = useState<ClinicAppointment[]>(INITIAL_CLINIC_APPOINTMENTS);
  const [clinicCurrentToken, setClinicCurrentToken] = useState<string>('A-017');
  const [selectedPatient, setSelectedPatient] = useState<ClinicAppointment | null>(null);

  // CRM State
  const [crmLeads, setCrmLeads] = useState<CrmLead[]>(INITIAL_CRM_LEADS);

  // Global activity & notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activityFeed, setActivityFeed] = useState<ActivityItem[]>(INITIAL_ACTIVITIES);
  const [isLiveDemoMode, setIsLiveDemoMode] = useState<boolean>(true);

  // WhatsApp Simulation Modal
  const [whatsAppModal, setWhatsAppModal] = useState<WhatsAppModalState>({
    isOpen: false,
    title: 'WhatsApp Message Preview',
    recipientName: '',
    phone: '',
    message: ''
  });

  // Payment Simulation Modal
  const [paymentModal, setPaymentModal] = useState<PaymentModalState>({
    isOpen: false,
    title: 'Record Payment',
    amount: 0,
    customerName: '',
    onConfirm: () => {}
  });

  const addActivity = (title: string, detail: string, status?: string) => {
    const newItem: ActivityItem = {
      id: 'act-' + Date.now(),
      time: 'Just now',
      title,
      detail,
      status
    };
    setActivityFeed(prev => [newItem, ...prev.slice(0, 15)]);
  };

  const addNotification = (title: string, detail: string, category: BusinessCategory) => {
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      title,
      detail,
      time: 'Just now',
      read: false,
      category
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // ---------------- SALON ACTIONS ----------------
  const addSalonBooking = (bookingData: Omit<SalonBooking, 'id' | 'createdAt'>): string => {
    const newId = 'apt-' + (salonBookings.length + 100);
    const newBooking: SalonBooking = {
      ...bookingData,
      id: newId,
      createdAt: 'Just now'
    };

    setSalonBookings(prev => [newBooking, ...prev]);

    // Update or add customer record
    setSalonCustomers(prev => {
      const existing = prev.find(c => c.name.toLowerCase() === bookingData.customerName.toLowerCase());
      if (existing) {
        return prev.map(c =>
          c.id === existing.id
            ? {
                ...c,
                totalVisits: c.totalVisits + 1,
                lastVisit: 'Today',
                upcomingAppointment: `Today, ${bookingData.time} (${bookingData.serviceName})`,
                servicesUsed: [bookingData.serviceName, ...c.servicesUsed]
              }
            : c
        );
      } else {
        const newCust: SalonCustomer = {
          id: 'cust-' + (prev.length + 10),
          name: bookingData.customerName,
          phone: bookingData.phone,
          email: bookingData.email,
          totalVisits: 1,
          lastVisit: 'Today',
          upcomingAppointment: `Today, ${bookingData.time} (${bookingData.serviceName})`,
          servicesUsed: [bookingData.serviceName],
          notes: ['New client booking via online demo']
        };
        return [newCust, ...prev];
      }
    });

    // Update staff active count
    setSalonStaff(prev =>
      prev.map(s =>
        s.name.toLowerCase() === bookingData.staffName.toLowerCase()
          ? {
              ...s,
              activeAppointments: s.activeAppointments + 1,
              bookedSlots: [...s.bookedSlots, `${bookingData.time} (${bookingData.customerName.split(' ')[0]})`]
            }
          : s
      )
    );

    addActivity('New Appointment Booked', `${bookingData.customerName} booked ${bookingData.serviceName}`, 'Pending');
    addNotification(`New Booking: ${bookingData.customerName}`, `${bookingData.serviceName} at ${bookingData.time}`, 'salon');
    showToast(`Appointment ${bookingData.token} created for ${bookingData.customerName}`);
    return newId;
  };

  const confirmSalonBooking = (id: string) => {
    setSalonBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'Confirmed' } : b))
    );
    const booking = salonBookings.find(b => b.id === id);
    if (booking) {
      addActivity('Appointment Confirmed', `${booking.customerName} confirmed for ${booking.time}`, 'Confirmed');
      showToast(`Appointment for ${booking.customerName} confirmed.`);
    }
  };

  const cancelSalonBooking = (id: string) => {
    setSalonBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'Cancelled' } : b))
    );
    showToast('Appointment cancelled.');
  };

  const addSalonCustomerNote = (customerId: string, noteText: string) => {
    if (!noteText.trim()) return;
    setSalonCustomers(prev =>
      prev.map(c =>
        c.id === customerId
          ? { ...c, notes: [noteText.trim(), ...c.notes] }
          : c
      )
    );
    if (selectedCustomer && selectedCustomer.id === customerId) {
      setSelectedCustomer(prev =>
        prev ? { ...prev, notes: [noteText.trim(), ...prev.notes] } : null
      );
    }
    showToast('Customer note saved.');
  };

  const recordSalonPayment = (bookingId: string, method: string) => {
    setSalonBookings(prev =>
      prev.map(b =>
        b.id === bookingId
          ? { ...b, paymentStatus: 'Paid', paymentMethod: method }
          : b
      )
    );
    showToast(`Payment recorded via ${method}.`);
  };

  // ---------------- HOTEL ACTIONS ----------------
  const addHotelReservation = (resData: Omit<HotelReservation, 'id'>): string => {
    const newId = 'res-' + (hotelReservations.length + 100);
    const newRes: HotelReservation = {
      ...resData,
      id: newId
    };
    setHotelReservations(prev => [newRes, ...prev]);
    addActivity('New Hotel Reservation', `${resData.guestName} booked ${resData.roomName}`, 'Pending');
    addNotification(`Hotel Booking: ${resData.guestName}`, `${resData.roomName} (${resData.nights} nights)`, 'hotel');
    showToast(`Reservation ${resData.bookingRef} booked successfully!`);
    return newId;
  };

  const confirmHotelReservation = (id: string) => {
    setHotelReservations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'Confirmed' } : r))
    );
    showToast('Reservation confirmed.');
  };

  const checkInHotelReservation = (id: string) => {
    setHotelReservations(prev =>
      prev.map(r => (r.id === id ? { ...r, status: 'Checked In' } : r))
    );
    showToast('Guest checked in successfully.');
  };

  // ---------------- RESTAURANT ACTIONS ----------------
  const addRestaurantOrder = (orderData: Omit<RestaurantOrder, 'id' | 'orderTime'>): string => {
    const newId = 'ord-' + (restaurantOrders.length + 100);
    const newOrder: RestaurantOrder = {
      ...orderData,
      id: newId,
      orderTime: 'Just now'
    };
    setRestaurantOrders(prev => [newOrder, ...prev]);
    addActivity('New Restaurant Order', `${orderData.orderNumber} placed by ${orderData.customerName}`, 'New');
    addNotification(`Order ${orderData.orderNumber}`, `₹${orderData.totalAmount} (${orderData.items.length} items)`, 'restaurant');
    showToast(`Order ${orderData.orderNumber} sent to Kitchen Display!`);
    return newId;
  };

  const advanceRestaurantOrderStatus = (orderId: string) => {
    setRestaurantOrders(prev =>
      prev.map(order => {
        if (order.id !== orderId) return order;
        let nextStatus: RestaurantOrder['status'] = 'Preparing';
        if (order.status === 'New') nextStatus = 'Preparing';
        else if (order.status === 'Preparing') nextStatus = 'Ready';
        else if (order.status === 'Ready') nextStatus = 'Completed';
        showToast(`Order ${order.orderNumber} updated to ${nextStatus}.`);
        addActivity('Kitchen Status Updated', `Order ${order.orderNumber} is now ${nextStatus}`, nextStatus);
        return { ...order, status: nextStatus };
      })
    );
  };

  const toggleTableStatus = (tableId: string, status: 'Available' | 'Reserved' | 'Occupied', reservedFor?: string) => {
    setRestaurantTables(prev =>
      prev.map(t =>
        t.id === tableId ? { ...t, status, reservedFor: status === 'Available' ? undefined : reservedFor || 'Walk-in Guest' } : t
      )
    );
    showToast(`Table status updated to ${status}.`);
  };

  // ---------------- GYM ACTIONS ----------------
  const addGymMember = (memberData: Omit<GymMember, 'id' | 'totalCheckins'>): string => {
    const newId = 'mem-' + (gymMembers.length + 100);
    const newMember: GymMember = {
      ...memberData,
      id: newId,
      totalCheckins: 1,
      lastAttendance: 'Today, Just now'
    };
    setGymMembers(prev => [newMember, ...prev]);
    addActivity('New Member Enrolled', `${memberData.name} joined on ${memberData.planName}`, 'Active');
    addNotification(`New Gym Member: ${memberData.name}`, `${memberData.planName} plan`, 'gym');
    showToast(`Member ${memberData.name} enrolled with ID ${memberData.memberCode}`);
    return newId;
  };

  const markGymAttendance = (memberId: string) => {
    setGymMembers(prev =>
      prev.map(m => {
        if (m.id !== memberId) return m;
        const updated = {
          ...m,
          lastAttendance: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          totalCheckins: m.totalCheckins + 1
        };
        addActivity('Member Check-In', `${m.name} scanned attendance`, 'Active');
        showToast(`Attendance marked for ${m.name}.`);
        return updated;
      })
    );
  };

  const renewGymMembership = (memberId: string, months = 3) => {
    setGymMembers(prev =>
      prev.map(m => {
        if (m.id !== memberId) return m;
        const updated: GymMember = {
          ...m,
          status: 'Active',
          paymentStatus: 'Paid',
          expiryDate: '15 Dec 2026'
        };
        addActivity('Membership Renewed', `${m.name} renewed for ${months} months`, 'Completed');
        showToast(`Membership renewed for ${m.name}!`);
        return updated;
      })
    );
  };

  // ---------------- CLINIC ACTIONS ----------------
  const addClinicAppointment = (apptData: Omit<ClinicAppointment, 'id'>): string => {
    const newId = 'cln-' + (clinicAppointments.length + 100);
    const newAppt: ClinicAppointment = {
      ...apptData,
      id: newId
    };
    setClinicAppointments(prev => [...prev, newAppt]);
    addActivity('Patient Token Booked', `Token ${apptData.tokenNumber} for ${apptData.patientName}`, 'Waiting');
    addNotification(`Clinic Token ${apptData.tokenNumber}`, `${apptData.patientName} (${apptData.doctorName})`, 'clinic');
    showToast(`Token ${apptData.tokenNumber} generated for ${apptData.patientName}!`);
    return newId;
  };

  const callNextClinicPatient = () => {
    // Find next waiting patient
    const waitingList = clinicAppointments.filter(a => a.status === 'Waiting');
    if (waitingList.length === 0) {
      showToast('All queued patients have been called!');
      return;
    }
    const nextPatient = waitingList[0];
    setClinicCurrentToken(nextPatient.tokenNumber);

    setClinicAppointments(prev =>
      prev.map(a => {
        if (a.status === 'In Consultation') {
          return { ...a, status: 'Completed' };
        }
        if (a.id === nextPatient.id) {
          return { ...a, status: 'In Consultation' };
        }
        return a;
      })
    );

    addActivity('Token Called to Chamber', `Token ${nextPatient.tokenNumber} (${nextPatient.patientName}) called in`, 'In Consultation');
    showToast(`Calling Token ${nextPatient.tokenNumber}: ${nextPatient.patientName}`);
  };

  const addClinicPatientNote = (apptId: string, noteText: string) => {
    if (!noteText.trim()) return;
    setClinicAppointments(prev =>
      prev.map(a =>
        a.id === apptId ? { ...a, notes: [...a.notes, noteText.trim()] } : a
      )
    );
    if (selectedPatient && selectedPatient.id === apptId) {
      setSelectedPatient(prev =>
        prev ? { ...prev, notes: [...prev.notes, noteText.trim()] } : null
      );
    }
    showToast('Doctor consultation note saved.');
  };

  // ---------------- CRM ACTIONS ----------------
  const addCrmLead = (leadData: Omit<CrmLead, 'id' | 'createdAt'>): string => {
    const newId = 'lead-' + (crmLeads.length + 100);
    const newLead: CrmLead = {
      ...leadData,
      id: newId,
      createdAt: 'Just now'
    };
    setCrmLeads(prev => [newLead, ...prev]);
    addActivity('New Business Inquiry', `${leadData.companyName} (${leadData.requirement})`, 'New');
    addNotification(`New CRM Lead: ${leadData.companyName}`, `Value est. ₹${leadData.estimatedValue}`, 'crm');
    showToast(`Inquiry from ${leadData.companyName} logged to Pipeline!`);
    return newId;
  };

  const advanceCrmLeadStage = (leadId: string, newStage: CrmLead['stage']) => {
    setCrmLeads(prev =>
      prev.map(l => (l.id === leadId ? { ...l, stage: newStage } : l))
    );
    const lead = crmLeads.find(l => l.id === leadId);
    if (lead) {
      addActivity('Lead Stage Advanced', `${lead.companyName} moved to ${newStage}`, newStage);
      showToast(`${lead.companyName} marked as ${newStage}`);
    }
  };

  // ---------------- GLOBAL MODALS ----------------
  const openWhatsAppModal = (recipientName: string, phone: string, message: string, title = 'WhatsApp Message Preview') => {
    setWhatsAppModal({
      isOpen: true,
      title,
      recipientName,
      phone,
      message
    });
  };

  const closeWhatsAppModal = () => {
    setWhatsAppModal(prev => ({ ...prev, isOpen: false }));
  };

  const openPaymentModal = (title: string, amount: number, customerName: string, onConfirm: (method: string) => void) => {
    setPaymentModal({
      isOpen: true,
      title,
      amount,
      customerName,
      onConfirm
    });
  };

  const closePaymentModal = () => {
    setPaymentModal(prev => ({ ...prev, isOpen: false }));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  // ---------------- RESET ENGINE ----------------
  const resetAllWorkflowData = () => {
    setSalonBookings(INITIAL_SALON_BOOKINGS);
    setSalonCustomers(INITIAL_SALON_CUSTOMERS);
    setSalonStaff(INITIAL_SALON_STAFF);
    setSelectedCustomer(null);
    setHotelReservations(INITIAL_HOTEL_RESERVATIONS);
    setRestaurantOrders(INITIAL_RESTAURANT_ORDERS);
    setRestaurantTables(INITIAL_RESTAURANT_TABLES);
    setGymMembers(INITIAL_GYM_MEMBERS);
    setClinicAppointments(INITIAL_CLINIC_APPOINTMENTS);
    setClinicCurrentToken('A-017');
    setSelectedPatient(null);
    setCrmLeads(INITIAL_CRM_LEADS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setActivityFeed(INITIAL_ACTIVITIES);
    showToast('All demo workflow records reset to pristine template.');
  };

  // ---------------- PHASE 4: QUICK & GUIDED DEMO ENGINE ----------------
  const [quickDemoStep, setQuickDemoStep] = useState<number>(1);
  const [isQuickDemoRunning, setIsQuickDemoRunning] = useState<boolean>(false);
  const [isQuickDemoAutoPlay, setIsQuickDemoAutoPlay] = useState<boolean>(false);
  const [wowMoment, setWowMoment] = useState<{ title: string; description: string } | null>(null);
  const [savedInquiries, setSavedInquiries] = useState<SalesRequirementInquiry[]>(() => {
    try {
      const saved = localStorage.getItem('atman_sales_inquiries');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [];
  });

  const saveRequirementInquiry = (inquiry: SalesRequirementInquiry) => {
    setSavedInquiries(prev => {
      const next = [inquiry, ...prev];
      try {
        localStorage.setItem('atman_sales_inquiries', JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
    addActivity('New custom build requirement logged', `${inquiry.businessName} (${inquiry.category.toUpperCase()}) - ${inquiry.budgetTier}`);
    showToast('Requirement saved to local simulation ledger.');
  };

  const dismissWowMoment = () => {
    setWowMoment(null);
  };

  // Predemo assurance helper (ensures predictable demo entities exist before starting)
  const ensurePredemoState = (cat: BusinessCategory) => {
    if (cat === 'salon') {
      if (!salonStaff.some(s => s.name === 'Pooja Verma')) {
        setSalonStaff(INITIAL_SALON_STAFF);
      }
    } else if (cat === 'hotel') {
      if (hotelReservations.length === 0) {
        setHotelReservations(INITIAL_HOTEL_RESERVATIONS);
      }
    } else if (cat === 'restaurant') {
      if (restaurantOrders.length === 0) {
        setRestaurantOrders(INITIAL_RESTAURANT_ORDERS);
      }
    } else if (cat === 'gym') {
      if (gymMembers.length === 0) {
        setGymMembers(INITIAL_GYM_MEMBERS);
      }
    } else if (cat === 'clinic') {
      if (clinicAppointments.length === 0) {
        setClinicAppointments(INITIAL_CLINIC_APPOINTMENTS);
      }
    }
  };

  const startQuickDemo = (targetCat?: BusinessCategory, mode: DemoSpeedMode = 'quick') => {
    const activeCat = targetCat || category;
    if (targetCat && targetCat !== category) {
      switchCategory(targetCat);
    }
    ensurePredemoState(activeCat);
    setDemoSpeedMode(mode);
    setQuickDemoStep(1);
    setIsQuickDemoRunning(true);
    setIsQuickDemoAutoPlay(mode === 'quick');
    setWowMoment(null);
    setViewMode('website');
    showToast(`Quick Demo started for ${BUSINESS_DATA_MAP[activeCat].name} (Step 1: Website)`);
  };

  const triggerQuickDemo = (cat: BusinessCategory) => {
    startQuickDemo(cat, 'quick');
  };

  const nextQuickDemoStep = () => {
    const currentScenario = QUICK_DEMO_SCENARIOS[category] || QUICK_DEMO_SCENARIOS.salon;
    const currentStepIndex = quickDemoStep;
    const total = currentScenario.steps.length;

    if (currentStepIndex >= total) {
      setIsQuickDemoRunning(false);
      setIsQuickDemoAutoPlay(false);
      setIsDemoHandoffOpen(true);
      showToast('Demo complete: Reviewing packages & custom blueprint.');
      return;
    }

    const nextStepNum = currentStepIndex + 1;
    const stepDef = currentScenario.steps.find(s => s.stepIndex === nextStepNum) || currentScenario.steps[currentStepIndex];

    setQuickDemoStep(nextStepNum);
    setViewMode(stepDef.viewMode);
    if (stepDef.sidebarTab) {
      setActiveSidebarTab(stepDef.sidebarTab);
    }

    // Step 2 -> 3 transition: perform the business transaction & trigger WOW moment!
    if (currentStepIndex === 2 && nextStepNum === 3) {
      if (category === 'salon') {
        const found = salonBookings.find(b => b.token === 'A-104');
        if (!found) {
          addSalonBooking({
            token: 'A-104',
            customerName: 'Priya Sharma',
            phone: '+91 94311 88210',
            email: 'priya.sharma@example.com',
            serviceName: 'Keratin Hair Spa & Treatment',
            staffName: 'Pooja Verma',
            date: 'Today',
            time: '04:30 PM',
            price: 1200,
            status: 'Confirmed',
            paymentStatus: 'Paid',
            notes: 'Prefers natural organic serum'
          });
        }
      } else if (category === 'hotel') {
        const found = hotelReservations.find(r => r.bookingRef === 'H-2048');
        if (!found) {
          addHotelReservation({
            bookingRef: 'H-2048',
            guestName: 'Vikram Malhotra',
            phone: '+91 98351 00124',
            email: 'vikram.malhotra@example.com',
            roomName: 'Executive Business Suite',
            checkIn: 'Today',
            checkOut: 'In 2 days',
            nights: 2,
            guests: '2 Adults',
            totalAmount: 6998,
            status: 'Confirmed',
            paymentStatus: 'Paid',
            paymentMethod: 'UPI'
          });
        }
      } else if (category === 'restaurant') {
        const found = restaurantOrders.find(o => o.tableNumber === 'Table 4');
        if (!found) {
          addRestaurantOrder({
            orderNumber: 'TK-1042',
            customerName: 'Priya Sharma',
            phone: '+91 94311 88210',
            tableNumber: 'Table 4',
            type: 'Dine In',
            items: [
              { name: 'Chicken Biryani (Dum Handi)', quantity: 1, price: 340 },
              { name: 'Butter Garlic Naan', quantity: 1, price: 65 }
            ],
            totalAmount: 405,
            status: 'New'
          });
        }
      } else if (category === 'gym') {
        const found = gymMembers.find(m => m.memberCode === 'RFC-105');
        if (!found) {
          addGymMember({
            memberCode: 'RFC-105',
            name: 'Rahul Verma',
            phone: '+91 94311 88210',
            email: 'rahul.verma@example.com',
            planName: 'Quarterly Transformation',
            planPrice: 2499,
            startDate: 'Today',
            expiryDate: '15 Dec 2026',
            paymentStatus: 'Paid',
            status: 'Active'
          });
          markGymAttendance('RFC-105');
        }
      } else if (category === 'clinic') {
        const found = clinicAppointments.find(a => a.tokenNumber === 'A-021');
        if (!found) {
          addClinicAppointment({
            tokenNumber: 'A-021',
            patientName: 'Anjali Kumar',
            phone: '+91 94311 88210',
            age: '28y',
            doctorName: 'Dr. Arvind Sharma',
            specialty: 'General Physician & Diabetologist',
            date: 'Today',
            time: '11:00 AM',
            reason: 'Seasonal cold & fever checkup',
            status: 'In Consultation',
            consultationFee: 500,
            notes: ['Prescribed Paracetamol 650mg TDS']
          });
        }
      } else if (category === 'crm') {
        const found = crmLeads.find(l => l.companyName === 'Rahul Enterprises');
        if (!found) {
          addCrmLead({
            leadCode: 'LEAD-105',
            companyName: 'Rahul Enterprises',
            contactPerson: 'Rahul Agrawal',
            phone: '+91 98350 11920',
            requirement: 'Website + Custom Booking System',
            budgetRange: '₹85,000+',
            estimatedValue: 85000,
            stage: 'Won',
            notes: 'Approved quote for complete suite'
          });
        }
      }

      if (stepDef.wowMoment) {
        setWowMoment(stepDef.wowMoment);
      }
    }

    // Step 3 -> 4
    if (currentStepIndex === 3 && nextStepNum === 4) {
      if (category === 'restaurant') {
        const order = restaurantOrders.find(o => o.tableNumber === 'Table 4');
        if (order) advanceRestaurantOrderStatus(order.id);
      } else if (category === 'clinic') {
        callNextClinicPatient();
      }
    }

    showToast(`Step ${nextStepNum} of ${total}: ${stepDef.title}`);
  };

  const prevQuickDemoStep = () => {
    if (quickDemoStep <= 1) return;
    const prevNum = quickDemoStep - 1;
    const currentScenario = QUICK_DEMO_SCENARIOS[category] || QUICK_DEMO_SCENARIOS.salon;
    const stepDef = currentScenario.steps.find(s => s.stepIndex === prevNum) || currentScenario.steps[0];
    setQuickDemoStep(prevNum);
    setViewMode(stepDef.viewMode);
    if (stepDef.sidebarTab) setActiveSidebarTab(stepDef.sidebarTab);
    setWowMoment(null);
  };

  const startOverQuickDemo = () => {
    setQuickDemoStep(1);
    setViewMode('website');
    setWowMoment(null);
    showToast('Demo restarted from Step 1.');
  };

  const exitQuickDemo = () => {
    setIsQuickDemoRunning(false);
    setIsQuickDemoAutoPlay(false);
    setWowMoment(null);
    setDemoSpeedMode('explore');
    showToast('Exited Quick Demo mode.');
  };

  const toggleQuickDemoAutoPlay = () => {
    setIsQuickDemoAutoPlay(prev => !prev);
  };

  // Auto-play timer for Quick Demo mode (advances every 7 seconds)
  useEffect(() => {
    if (!isQuickDemoRunning || !isQuickDemoAutoPlay) return;

    const timer = setTimeout(() => {
      nextQuickDemoStep();
    }, 7000);

    return () => clearTimeout(timer);
  }, [isQuickDemoRunning, isQuickDemoAutoPlay, quickDemoStep]);

  return (
    <WorkflowContext.Provider
      value={{
        salonBookings,
        salonCustomers,
        salonStaff,
        selectedCustomer,
        setSelectedCustomer,
        addSalonBooking,
        confirmSalonBooking,
        cancelSalonBooking,
        addSalonCustomerNote,
        recordSalonPayment,

        hotelReservations,
        addHotelReservation,
        confirmHotelReservation,
        checkInHotelReservation,

        restaurantOrders,
        restaurantTables,
        addRestaurantOrder,
        advanceRestaurantOrderStatus,
        toggleTableStatus,

        gymMembers,
        addGymMember,
        markGymAttendance,
        renewGymMembership,

        clinicAppointments,
        clinicCurrentToken,
        selectedPatient,
        setSelectedPatient,
        addClinicAppointment,
        callNextClinicPatient,
        addClinicPatientNote,

        crmLeads,
        addCrmLead,
        advanceCrmLeadStage,

        notifications,
        activityFeed,
        markAllNotificationsRead,
        addActivity,

        whatsAppModal,
        openWhatsAppModal,
        closeWhatsAppModal,

        paymentModal,
        openPaymentModal,
        closePaymentModal,

        isLiveDemoMode,
        setIsLiveDemoMode,
        resetAllWorkflowData,
        triggerQuickDemo,

        // Phase 4 additions
        quickDemoStep,
        isQuickDemoRunning,
        isQuickDemoAutoPlay,
        wowMoment,
        dismissWowMoment,
        startQuickDemo,
        nextQuickDemoStep,
        prevQuickDemoStep,
        startOverQuickDemo,
        exitQuickDemo,
        toggleQuickDemoAutoPlay,
        savedInquiries,
        saveRequirementInquiry
      }}
    >
      {children}
    </WorkflowContext.Provider>
  );
};

export const useWorkflow = () => {
  const context = useContext(WorkflowContext);
  if (!context) {
    throw new Error('useWorkflow must be used within a WorkflowProvider');
  }
  return context;
};
