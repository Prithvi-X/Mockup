import React from 'react';
import { useDemo } from '../../../context/DemoContext';
import { SalonWebsiteView } from './SalonWebsiteView';
import { HotelWebsiteView } from './HotelWebsiteView';
import { RestaurantWebsiteView } from './RestaurantWebsiteView';
import { GymWebsiteView } from './GymWebsiteView';
import { ClinicWebsiteView } from './ClinicWebsiteView';
import { CrmWebsiteView } from './CrmWebsiteView';

export const WebsiteViewDispatcher: React.FC = () => {
  const { category } = useDemo();

  switch (category) {
    case 'salon':
      return <SalonWebsiteView />;
    case 'hotel':
      return <HotelWebsiteView />;
    case 'restaurant':
      return <RestaurantWebsiteView />;
    case 'gym':
      return <GymWebsiteView />;
    case 'clinic':
      return <ClinicWebsiteView />;
    case 'crm':
    case 'custom':
    default:
      return <CrmWebsiteView />;
  }
};
