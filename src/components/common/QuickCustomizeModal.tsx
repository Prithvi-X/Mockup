import React, { useState, useEffect } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Modal } from './Modal';
import { AccentColor, BusinessCategory } from '../../types/showroom';
import { Zap, Check, SlidersHorizontal, Sparkles } from 'lucide-react';

interface QuickPreset {
  name: string;
  tagline: string;
  accentColor: AccentColor;
  phone: string;
  whatsapp: string;
  address: string;
}

const PRESETS_BY_CATEGORY: Record<BusinessCategory, QuickPreset[]> = {
  salon: [
    {
      name: 'Ranchi Hair Port',
      tagline: 'Premium Hair & Grooming Lounge',
      accentColor: 'rose',
      phone: '+91 94311 22910',
      whatsapp: '+91 94311 22910',
      address: 'Near Dangratoli Chowk, Circular Road, Ranchi'
    },
    {
      name: 'Aura Luxury Unisex Salon',
      tagline: 'Signature Styling & Skin Treatments',
      accentColor: 'amber',
      phone: '+91 98350 11420',
      whatsapp: '+91 98350 11420',
      address: 'Shop 14, Nucleus Mall, Circular Road, Ranchi'
    },
    {
      name: 'The Royal Barbershop',
      tagline: 'Classic Cuts & Hot Towel Shaves',
      accentColor: 'slate',
      phone: '+91 82103 44810',
      whatsapp: '+91 82103 44810',
      address: 'Main Road, Opp. GEL Church Complex, Ranchi'
    }
  ],
  hotel: [
    {
      name: 'Capitol Hill Luxury Hotel',
      tagline: 'Centrally Located Boutique Stays & Fine Dining',
      accentColor: 'indigo',
      phone: '+91 97714 55100',
      whatsapp: '+91 97714 55100',
      address: 'Mahatma Gandhi Main Road, Ranchi'
    },
    {
      name: 'The Green Valley Resort',
      tagline: 'Nature Suites & Destination Weddings',
      accentColor: 'emerald',
      phone: '+91 94311 77200',
      whatsapp: '+91 94311 77200',
      address: 'Ring Road, Near Getalsud Dam, Ranchi'
    },
    {
      name: 'Skyline Business Inn',
      tagline: 'Corporate Rooms & Conference Center',
      accentColor: 'sky',
      phone: '+91 98352 99010',
      whatsapp: '+91 98352 99010',
      address: 'Station Road, Near Overbridge, Ranchi'
    }
  ],
  restaurant: [
    {
      name: 'Kaveri Pure Veg & Sweets',
      tagline: 'Authentic Indian Flavors & Multi-Cuisine',
      accentColor: 'amber',
      phone: '+91 98350 33410',
      whatsapp: '+91 98350 33410',
      address: 'Church Complex, Main Road, Ranchi'
    },
    {
      name: 'The Urban Grill & Cafe',
      tagline: 'Artisanal Pizzas, Burgers & Mocktails',
      accentColor: 'rose',
      phone: '+91 91024 44520',
      whatsapp: '+91 91024 44520',
      address: 'Kanke Road, Near CMPDI Gate, Ranchi'
    },
    {
      name: 'Moti Mahal Delux',
      tagline: 'Legendary Mughlai & Tandoor Cuisine',
      accentColor: 'indigo',
      phone: '+91 99341 88100',
      whatsapp: '+91 99341 88100',
      address: 'Circular Road, Lalpur, Ranchi'
    }
  ],
  gym: [
    {
      name: 'Cult Iron Fitness Hub',
      tagline: 'Heavy Weights, CrossFit & Functional Training',
      accentColor: 'emerald',
      phone: '+91 91024 88300',
      whatsapp: '+91 91024 88300',
      address: 'Harmu Housing Colony, Sahajanand Chowk, Ranchi'
    },
    {
      name: 'Oxygen Health & Fitness Club',
      tagline: 'Cardio, Steam, Zumba & Body Recomposition',
      accentColor: 'cyan',
      phone: '+91 94311 00412',
      whatsapp: '+91 94311 00412',
      address: 'Ratu Road, Near Galaxia Mall, Ranchi'
    },
    {
      name: 'Titan Powerhouse Gym',
      tagline: 'Old-School Bodybuilding & Strength Conditioning',
      accentColor: 'slate',
      phone: '+91 98351 77610',
      whatsapp: '+91 98351 77610',
      address: 'Bariatu Road, Opposite Medicanta, Ranchi'
    }
  ],
  clinic: [
    {
      name: 'Dr. Roy Dental Studio & Implant Center',
      tagline: 'Painless Laser Dentistry & Smile Makeovers',
      accentColor: 'cyan',
      phone: '+91 98355 66010',
      whatsapp: '+91 98355 66010',
      address: 'Bariatu Road, Opposite RIMS Gate, Ranchi'
    },
    {
      name: 'CareWell Multi-Specialty PolyClinic',
      tagline: 'Cardiology, Pediatrics & Diagnostic Center',
      accentColor: 'sky',
      phone: '+91 94311 88020',
      whatsapp: '+91 94311 88020',
      address: 'Hinoo Main Road, Near Birsa Chowk, Ranchi'
    },
    {
      name: 'Healing Touch Physiotherapy & Rehab',
      tagline: 'Spine, Joint & Sports Injury Recovery',
      accentColor: 'emerald',
      phone: '+91 99341 22990',
      whatsapp: '+91 99341 22990',
      address: 'Kadru Diversion Road, Ranchi'
    }
  ],
  crm: [
    {
      name: 'Apex Industrial Supply Co.',
      tagline: 'Mining Equipment, Spares & Wholesale Distribution',
      accentColor: 'violet',
      phone: '+91 94311 00880',
      whatsapp: '+91 94311 00880',
      address: 'Tupudana Industrial Area, Ranchi'
    },
    {
      name: 'Chotanagpur Fleet Logistics',
      tagline: 'Interstate Transport & Cold-Chain Fleet Operations',
      accentColor: 'indigo',
      phone: '+91 98350 44900',
      whatsapp: '+91 98350 44900',
      address: 'Namkum Bypass Road, Ranchi'
    },
    {
      name: 'Zenith Real Estate & Builders',
      tagline: 'Commercial Complexes & Luxury Residential Projects',
      accentColor: 'amber',
      phone: '+91 91029 33110',
      whatsapp: '+91 91029 33110',
      address: 'Morabadi Ground Road, Ranchi'
    }
  ],
  custom: [
    {
      name: 'Ranchi Auto Care Workshop',
      tagline: 'Multi-brand Car Servicing & Insurance Claims',
      accentColor: 'amber',
      phone: '+91 94311 55210',
      whatsapp: '+91 94311 55210',
      address: 'Kokar Industrial Area, Ranchi'
    },
    {
      name: 'SmartEdu Coaching Academy',
      tagline: 'IIT-JEE & NEET Hybrid Test Prep',
      accentColor: 'indigo',
      phone: '+91 98350 88200',
      whatsapp: '+91 98350 88200',
      address: 'Lalpur Chowk, Ranchi'
    },
    {
      name: 'Jharkhand Artisans Collective',
      tagline: 'Direct Handicrafts & Tribal Textile Exports',
      accentColor: 'emerald',
      phone: '+91 91024 11880',
      whatsapp: '+91 91024 11880',
      address: 'Doranda Main Road, Ranchi'
    }
  ]
};

export const QuickCustomizeModal: React.FC = () => {
  const {
    isQuickCustomizeOpen,
    setIsQuickCustomizeOpen,
    setIsCustomizeOpen,
    customization,
    updateCustomization,
    category
  } = useDemo();

  const [name, setName] = useState(customization.businessName);
  const [accentColor, setAccentColor] = useState<AccentColor>(customization.accentColor);
  const [phone, setPhone] = useState(customization.phone);
  const [whatsapp, setWhatsapp] = useState(customization.whatsapp);
  const [address, setAddress] = useState(customization.address);

  useEffect(() => {
    setName(customization.businessName);
    setAccentColor(customization.accentColor);
    setPhone(customization.phone);
    setWhatsapp(customization.whatsapp);
    setAddress(customization.address);
  }, [customization, isQuickCustomizeOpen]);

  const colorOptions: { id: AccentColor; label: string; bgClass: string }[] = [
    { id: 'indigo', label: 'Indigo', bgClass: 'bg-indigo-500' },
    { id: 'rose', label: 'Rose', bgClass: 'bg-rose-500' },
    { id: 'emerald', label: 'Emerald', bgClass: 'bg-emerald-500' },
    { id: 'amber', label: 'Amber', bgClass: 'bg-amber-500' },
    { id: 'cyan', label: 'Cyan', bgClass: 'bg-cyan-500' },
    { id: 'violet', label: 'Violet', bgClass: 'bg-violet-500' },
    { id: 'sky', label: 'Sky', bgClass: 'bg-sky-500' },
    { id: 'slate', label: 'Slate', bgClass: 'bg-slate-400' }
  ];

  const applyPreset = (preset: QuickPreset) => {
    setName(preset.name);
    setAccentColor(preset.accentColor);
    setPhone(preset.phone);
    setWhatsapp(preset.whatsapp);
    setAddress(preset.address);
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomization({
      businessName: name.trim() || customization.businessName,
      accentColor,
      phone: phone.trim() || customization.phone,
      whatsapp: (whatsapp.trim() || phone.trim()) || customization.whatsapp,
      address: address.trim() || customization.address
    });
    setIsQuickCustomizeOpen(false);
  };

  const handleOpenFull = () => {
    setIsQuickCustomizeOpen(false);
    setIsCustomizeOpen(true);
  };

  const presets = PRESETS_BY_CATEGORY[category] || [];

  return (
    <Modal
      isOpen={isQuickCustomizeOpen}
      onClose={() => setIsQuickCustomizeOpen(false)}
      title="Quick 30-Second Rebrander"
      subtitle={`Instantly adapt this demo for your prospect (${category.toUpperCase()})`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleApply} className="space-y-4">
        {/* Fast presets pill list */}
        {presets.length > 0 && (
          <div className="space-y-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
              <Zap className="w-3 h-3 text-amber-500" />
              1-Click Sample Business Presets
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  onClick={() => applyPreset(preset)}
                  className={`text-xs px-2.5 py-1 rounded-md border font-medium transition ${
                    name === preset.name
                      ? 'bg-gray-900 text-white border-gray-900 shadow-xs'
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Business Name */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
            Prospect Business Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Ranchi Hair Port"
            className="w-full bg-white border border-gray-200 rounded-lg px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
            required
            autoFocus
          />
        </div>

        {/* Accent Color */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1.5">
            Brand Accent Color
          </label>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
            {colorOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setAccentColor(opt.id)}
                className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border text-[11px] font-medium transition ${
                  accentColor === opt.id
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-950 ring-1 ring-indigo-500 shadow-xs'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className={`w-3.5 h-3.5 rounded-full ${opt.bgClass}`} />
                <span className="text-[10px]">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Phone & WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 94311 00000"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
              WhatsApp Number
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+91 94311 00000"
              className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
            />
          </div>
        </div>

        {/* Physical Address */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700 mb-1">
            Local City / Area
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="e.g. Circular Road, Lalpur, Ranchi"
            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 transition"
          />
        </div>

        {/* Action bar */}
        <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
          <button
            type="button"
            onClick={handleOpenFull}
            className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 transition font-medium"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
            Full Customizer & Catalogs...
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsQuickCustomizeOpen(false)}
              className="px-3 py-1.5 text-xs font-medium text-gray-700 hover:text-gray-900 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition shadow-2xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition"
            >
              <Check className="w-3.5 h-3.5" />
              Apply to Demo
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
