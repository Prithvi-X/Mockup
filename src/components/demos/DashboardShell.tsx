import React from 'react';
import { useDemo } from '../../context/DemoContext';
import { SalonDashboardView } from './dashboard/SalonDashboardView';
import { HotelDashboardView } from './dashboard/HotelDashboardView';
import { RestaurantDashboardView } from './dashboard/RestaurantDashboardView';
import { GymDashboardView } from './dashboard/GymDashboardView';
import { ClinicDashboardView } from './dashboard/ClinicDashboardView';
import { CrmDashboardView } from './dashboard/CrmDashboardView';

export const DashboardShell: React.FC = () => {
  const { category } = useDemo();

  switch (category) {
    case 'salon':
      return <SalonDashboardView />;
    case 'hotel':
      return <HotelDashboardView />;
    case 'restaurant':
      return <RestaurantDashboardView />;
    case 'gym':
      return <GymDashboardView />;
    case 'clinic':
      return <ClinicDashboardView />;
    case 'crm':
    case 'custom':
    default:
      return <CrmDashboardView />;
  }
};
