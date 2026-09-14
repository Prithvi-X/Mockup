import React, { useState, useEffect, useRef } from 'react';
import { useDemo } from '../../context/DemoContext';
import { Modal } from './Modal';
import {
  AccentColor,
  BusinessCategory,
  SalonServiceCustom,
  SalonStaffCustom,
  HotelRoomCustom,
  RestaurantMenuItemCustom,
  GymPlanCustom,
  ClinicDoctorCustom
} from '../../types/showroom';
import { BUSINESS_DATA_MAP } from '../../data/mockBusinesses';
import {
  Sparkles,
  Upload,
  Trash2,
  Plus,
  Edit2,
  Check,
  RotateCcw,
  Palette,
  Package,
  Layers,
  Image as ImageIcon
} from 'lucide-react';

export const CustomizationModal: React.FC = () => {
  const {
    isCustomizeOpen,
    setIsCustomizeOpen,
    customization,
    updateCustomization,
    resetDemo,
    category
  } = useDemo();

  const [activeTab, setActiveTab] = useState<'branding' | 'catalog' | 'presets'>('branding');

  // Branding state
  const [name, setName] = useState(customization.businessName);
  const [tagline, setTagline] = useState(customization.tagline);
  const [accentColor, setAccentColor] = useState<AccentColor>(customization.accentColor);
  const [phone, setPhone] = useState(customization.phone);
  const [whatsapp, setWhatsapp] = useState(customization.whatsapp);
  const [address, setAddress] = useState(customization.address);
  const [website, setWebsite] = useState(customization.website || '');
  const [logoUrl, setLogoUrl] = useState<string | undefined>(customization.logoUrl);

  // Industry catalog states
  const [salonServices, setSalonServices] = useState<SalonServiceCustom[]>([]);
  const [salonStaff, setSalonStaff] = useState<SalonStaffCustom[]>([]);
  const [hotelRooms, setHotelRooms] = useState<HotelRoomCustom[]>([]);
  const [restaurantMenu, setRestaurantMenu] = useState<RestaurantMenuItemCustom[]>([]);
  const [gymPlans, setGymPlans] = useState<GymPlanCustom[]>([]);
  const [clinicDoctors, setClinicDoctors] = useState<ClinicDoctorCustom[]>([]);
  const [crmStages, setCrmStages] = useState<string[]>([]);

  // Editing / adding sub-state for catalog
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync state when opening or category change
  useEffect(() => {
    setName(customization.businessName);
    setTagline(customization.tagline);
    setAccentColor(customization.accentColor);
    setPhone(customization.phone);
    setWhatsapp(customization.whatsapp);
    setAddress(customization.address);
    setWebsite(customization.website || '');
    setLogoUrl(customization.logoUrl);

    setSalonServices(customization.salonServices || BUSINESS_DATA_MAP.salon.defaultCustomization.salonServices || []);
    setSalonStaff(customization.salonStaffList || BUSINESS_DATA_MAP.salon.defaultCustomization.salonStaffList || []);
    setHotelRooms(customization.hotelRoomsList || BUSINESS_DATA_MAP.hotel.defaultCustomization.hotelRoomsList || []);
    setRestaurantMenu(customization.restaurantMenuList || BUSINESS_DATA_MAP.restaurant.defaultCustomization.restaurantMenuList || []);
    setGymPlans(customization.gymPlansList || BUSINESS_DATA_MAP.gym.defaultCustomization.gymPlansList || []);
    setClinicDoctors(customization.clinicDoctorsList || BUSINESS_DATA_MAP.clinic.defaultCustomization.clinicDoctorsList || []);
    setCrmStages(customization.crmStagesList || BUSINESS_DATA_MAP.crm.defaultCustomization.crmStagesList || []);
    setEditingItemIndex(null);
  }, [customization, isCustomizeOpen, category]);

  const colorOptions: { id: AccentColor; label: string; bgClass: string; ringClass: string }[] = [
    { id: 'indigo', label: 'Indigo', bgClass: 'bg-indigo-500', ringClass: 'ring-indigo-500' },
    { id: 'rose', label: 'Rose', bgClass: 'bg-rose-500', ringClass: 'ring-rose-500' },
    { id: 'emerald', label: 'Emerald', bgClass: 'bg-emerald-500', ringClass: 'ring-emerald-500' },
    { id: 'amber', label: 'Amber', bgClass: 'bg-amber-500', ringClass: 'ring-amber-500' },
    { id: 'cyan', label: 'Cyan', bgClass: 'bg-cyan-500', ringClass: 'ring-cyan-500' },
    { id: 'violet', label: 'Violet', bgClass: 'bg-violet-500', ringClass: 'ring-violet-500' },
    { id: 'sky', label: 'Sky', bgClass: 'bg-sky-500', ringClass: 'ring-sky-500' },
    { id: 'slate', label: 'Slate', bgClass: 'bg-slate-400', ringClass: 'ring-slate-400' },
  ];

  // Handle local logo file picker
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max ~1.5MB for snappy Base64 localStorage)
    if (file.size > 2 * 1024 * 1024) {
      alert('Please upload an image under 2MB for optimal browser speed.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setLogoUrl(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    setLogoUrl(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateCustomization({
      businessName: name.trim() || customization.businessName,
      tagline: tagline.trim() || customization.tagline,
      accentColor,
      phone: phone.trim() || customization.phone,
      whatsapp: whatsapp.trim() || customization.whatsapp,
      address: address.trim() || customization.address,
      website: website.trim() || undefined,
      logoUrl: logoUrl,
      // Pass category catalog state
      ...(category === 'salon' ? { salonServices, salonStaffList: salonStaff } : {}),
      ...(category === 'hotel' ? { hotelRoomsList: hotelRooms } : {}),
      ...(category === 'restaurant' ? { restaurantMenuList: restaurantMenu } : {}),
      ...(category === 'gym' ? { gymPlansList: gymPlans } : {}),
      ...(category === 'clinic' ? { clinicDoctorsList: clinicDoctors } : {}),
      ...(category === 'crm' ? { crmStagesList: crmStages } : {})
    });
  };

  return (
    <Modal
      isOpen={isCustomizeOpen}
      onClose={() => setIsCustomizeOpen(false)}
      title={`Customize Demo: ${name || customization.businessName}`}
      subtitle={`Configure branding, logo, and live catalog pricing for ${category.toUpperCase()}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex border-b border-neutral-800 gap-2 pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('branding')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-t-lg text-xs font-medium border-b-2 transition ${
              activeTab === 'branding'
                ? 'border-indigo-500 text-white bg-neutral-900/60'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-indigo-400" />
            Branding & Logo
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-t-lg text-xs font-medium border-b-2 transition ${
              activeTab === 'catalog'
                ? 'border-indigo-500 text-white bg-neutral-900/60'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Package className="w-3.5 h-3.5 text-emerald-400" />
            Pricing & Catalog Items
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('presets')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-t-lg text-xs font-medium border-b-2 transition ${
              activeTab === 'presets'
                ? 'border-indigo-500 text-white bg-neutral-900/60'
                : 'border-transparent text-neutral-400 hover:text-neutral-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Presets & Quick Fill
          </button>
        </div>

        {/* TAB 1: BRANDING & LOGO */}
        {activeTab === 'branding' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {/* Logo upload card */}
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl border border-neutral-800 bg-neutral-900 flex items-center justify-center overflow-hidden shrink-0">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="w-full h-full object-contain p-1" />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-neutral-500">
                      <ImageIcon className="w-6 h-6 stroke-[1.5]" />
                      <span className="text-[9px] mt-0.5">No Logo</span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-white">Business Logo</h4>
                  <p className="text-[11px] text-neutral-400">
                    Upload client's PNG/JPEG. Stored locally in memory & browser.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-200 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 rounded-lg transition"
                >
                  <Upload className="w-3.5 h-3.5" />
                  {logoUrl ? 'Change' : 'Upload'}
                </button>
                {logoUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveLogo}
                    className="p-1.5 text-neutral-400 hover:text-rose-400 rounded-lg hover:bg-neutral-900 transition"
                    title="Remove custom logo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Name & Tagline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                  Business Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ranchi Hair Port"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="e.g. Premium Hair, Skin & Bridal Studio"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
                />
              </div>
            </div>

            {/* Accent Color */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                Brand Accent Color
              </label>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setAccentColor(opt.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                      accentColor === opt.id
                        ? 'border-white/50 bg-neutral-800 text-white ring-1 ' + opt.ringClass
                        : 'border-neutral-800 bg-neutral-950 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${opt.bgClass}`} />
                    {opt.label}
                    {accentColor === opt.id && <Check className="w-3 h-3 ml-0.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 94311 00000"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="+91 94311 00000"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                  Physical Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Circular Road, Lalpur, Ranchi"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1">
                  Custom Domain Preview
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="www.clientbusiness.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 transition"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INDUSTRY CATALOG & PRICING */}
        {activeTab === 'catalog' && (
          <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
            {/* SALON SERVICES & STAFF */}
            {category === 'salon' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Salon Services & Pricing ({salonServices.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newSvc: SalonServiceCustom = {
                        id: `svc-${Date.now()}`,
                        name: 'New Service',
                        price: 500,
                        duration: '30 mins',
                        desc: 'Custom treatment'
                      };
                      setSalonServices([...salonServices, newSvc]);
                    }}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Service
                  </button>
                </div>

                <div className="space-y-2">
                  {salonServices.map((svc, idx) => (
                    <div key={svc.id} className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 grid grid-cols-12 gap-2 items-center text-xs">
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={svc.name}
                          onChange={(e) => {
                            const updated = [...salonServices];
                            updated[idx].name = e.target.value;
                            setSalonServices(updated);
                          }}
                          placeholder="Service Name"
                          className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                        />
                      </div>
                      <div className="col-span-3 flex items-center gap-1">
                        <span className="text-neutral-400">₹</span>
                        <input
                          type="number"
                          value={svc.price}
                          onChange={(e) => {
                            const updated = [...salonServices];
                            updated[idx].price = Number(e.target.value) || 0;
                            setSalonServices(updated);
                          }}
                          className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          value={svc.duration}
                          onChange={(e) => {
                            const updated = [...salonServices];
                            updated[idx].duration = e.target.value;
                            setSalonServices(updated);
                          }}
                          placeholder="e.g. 45 mins"
                          className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                        />
                      </div>
                      <div className="col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => setSalonServices(salonServices.filter((_, i) => i !== idx))}
                          className="text-neutral-500 hover:text-rose-400 p-1"
                          title="Delete Service"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Staff Stylists */}
                <div className="pt-2 border-t border-neutral-800/80">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                      Stylists & Staff Members ({salonStaff.length})
                    </h5>
                    <button
                      type="button"
                      onClick={() => {
                        setSalonStaff([...salonStaff, { id: `stf-${Date.now()}`, name: 'Stylist Name', role: 'Hair Specialist' }]);
                      }}
                      className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                    >
                      <Plus className="w-3 h-3" />
                      Add Stylist
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {salonStaff.map((staff, idx) => (
                      <div key={staff.id} className="p-2 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-2">
                        <div className="flex-1 space-y-1">
                          <input
                            type="text"
                            value={staff.name}
                            onChange={(e) => {
                              const updated = [...salonStaff];
                              updated[idx].name = e.target.value;
                              setSalonStaff(updated);
                            }}
                            className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-0.5 text-white text-xs"
                            placeholder="Stylist Name"
                          />
                          <input
                            type="text"
                            value={staff.role}
                            onChange={(e) => {
                              const updated = [...salonStaff];
                              updated[idx].role = e.target.value;
                              setSalonStaff(updated);
                            }}
                            className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-0.5 text-neutral-400 text-[11px]"
                            placeholder="Specialty Role"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => setSalonStaff(salonStaff.filter((_, i) => i !== idx))}
                          className="text-neutral-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* HOTEL ROOMS */}
            {category === 'hotel' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Hotel Rooms & Tariff ({hotelRooms.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newRoom: HotelRoomCustom = {
                        id: `rm-${Date.now()}`,
                        name: 'Luxury Suite',
                        price: 2999,
                        capacity: '2 Adults',
                        amenities: ['King Bed', 'Free WiFi', 'AC']
                      };
                      setHotelRooms([...hotelRooms, newRoom]);
                    }}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Room Type
                  </button>
                </div>
                <div className="space-y-2">
                  {hotelRooms.map((rm, idx) => (
                    <div key={rm.id} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6">
                          <input
                            type="text"
                            value={rm.name}
                            onChange={(e) => {
                              const updated = [...hotelRooms];
                              updated[idx].name = e.target.value;
                              setHotelRooms(updated);
                            }}
                            placeholder="Room Title"
                            className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                          />
                        </div>
                        <div className="col-span-3 flex items-center gap-1">
                          <span className="text-neutral-400">₹</span>
                          <input
                            type="number"
                            value={rm.price}
                            onChange={(e) => {
                              const updated = [...hotelRooms];
                              updated[idx].price = Number(e.target.value) || 0;
                              setHotelRooms(updated);
                            }}
                            className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={rm.capacity}
                            onChange={(e) => {
                              const updated = [...hotelRooms];
                              updated[idx].capacity = e.target.value;
                              setHotelRooms(updated);
                            }}
                            placeholder="Capacity"
                            className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                          />
                        </div>
                        <div className="col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => setHotelRooms(hotelRooms.filter((_, i) => i !== idx))}
                            className="text-neutral-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={rm.amenities.join(', ')}
                          onChange={(e) => {
                            const updated = [...hotelRooms];
                            updated[idx].amenities = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setHotelRooms(updated);
                          }}
                          placeholder="Amenities separated by comma (e.g. WiFi, King Bed, Bathtub)"
                          className="w-full bg-neutral-900/60 border border-neutral-800 rounded px-2 py-1 text-neutral-300 text-[11px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* RESTAURANT MENU */}
            {category === 'restaurant' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Restaurant Menu Items ({restaurantMenu.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newItem: RestaurantMenuItemCustom = {
                        id: `menu-${Date.now()}`,
                        name: 'Chef Special Dish',
                        category: 'Main Course',
                        price: 320,
                        desc: 'Freshly prepared signature delicacy',
                        isVeg: true
                      };
                      setRestaurantMenu([...restaurantMenu, newItem]);
                    }}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Dish
                  </button>
                </div>
                <div className="space-y-2">
                  {restaurantMenu.map((item, idx) => (
                    <div key={item.id} className="p-2.5 rounded-lg bg-neutral-950 border border-neutral-800 grid grid-cols-12 gap-2 items-center text-xs">
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => {
                            const updated = [...restaurantMenu];
                            updated[idx].name = e.target.value;
                            setRestaurantMenu(updated);
                          }}
                          placeholder="Item Name"
                          className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                        />
                      </div>
                      <div className="col-span-3">
                        <select
                          value={item.category}
                          onChange={(e) => {
                            const updated = [...restaurantMenu];
                            updated[idx].category = e.target.value;
                            setRestaurantMenu(updated);
                          }}
                          className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-1.5 py-1 text-neutral-300 text-xs"
                        >
                          <option value="Starters">Starters</option>
                          <option value="Main Course">Main Course</option>
                          <option value="Breads & Rice">Breads & Rice</option>
                          <option value="Desserts">Desserts</option>
                          <option value="Beverages">Beverages</option>
                        </select>
                      </div>
                      <div className="col-span-2 flex items-center gap-1">
                        <span className="text-neutral-400">₹</span>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => {
                            const updated = [...restaurantMenu];
                            updated[idx].price = Number(e.target.value) || 0;
                            setRestaurantMenu(updated);
                          }}
                          className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-1 py-1 text-white text-xs"
                        />
                      </div>
                      <div className="col-span-2">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...restaurantMenu];
                            updated[idx].isVeg = !updated[idx].isVeg;
                            setRestaurantMenu(updated);
                          }}
                          className={`px-2 py-1 rounded text-[10px] font-medium border w-full ${
                            item.isVeg ? 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' : 'border-rose-500/40 text-rose-400 bg-rose-500/10'
                          }`}
                        >
                          {item.isVeg ? 'Veg' : 'Non-Veg'}
                        </button>
                      </div>
                      <div className="col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => setRestaurantMenu(restaurantMenu.filter((_, i) => i !== idx))}
                          className="text-neutral-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GYM PLANS */}
            {category === 'gym' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Gym Membership Plans ({gymPlans.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newPlan: GymPlanCustom = {
                        id: `p-${Date.now()}`,
                        name: 'Semi-Annual Pro',
                        price: 4999,
                        duration: '6 Months',
                        benefits: ['Unlimited Gym', 'Locker access', 'Personal Diet']
                      };
                      setGymPlans([...gymPlans, newPlan]);
                    }}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Plan
                  </button>
                </div>
                <div className="space-y-2">
                  {gymPlans.map((plan, idx) => (
                    <div key={plan.id} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 space-y-2 text-xs">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6">
                          <input
                            type="text"
                            value={plan.name}
                            onChange={(e) => {
                              const updated = [...gymPlans];
                              updated[idx].name = e.target.value;
                              setGymPlans(updated);
                            }}
                            placeholder="Plan Name"
                            className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                          />
                        </div>
                        <div className="col-span-3 flex items-center gap-1">
                          <span className="text-neutral-400">₹</span>
                          <input
                            type="number"
                            value={plan.price}
                            onChange={(e) => {
                              const updated = [...gymPlans];
                              updated[idx].price = Number(e.target.value) || 0;
                              setGymPlans(updated);
                            }}
                            className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                          />
                        </div>
                        <div className="col-span-2">
                          <input
                            type="text"
                            value={plan.duration}
                            onChange={(e) => {
                              const updated = [...gymPlans];
                              updated[idx].duration = e.target.value;
                              setGymPlans(updated);
                            }}
                            placeholder="Duration"
                            className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                          />
                        </div>
                        <div className="col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => setGymPlans(gymPlans.filter((_, i) => i !== idx))}
                            className="text-neutral-500 hover:text-rose-400 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={plan.benefits.join(', ')}
                          onChange={(e) => {
                            const updated = [...gymPlans];
                            updated[idx].benefits = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                            setGymPlans(updated);
                          }}
                          placeholder="Benefits separated by comma (e.g. Free Trainer, Steam Bath, Locker)"
                          className="w-full bg-neutral-900/60 border border-neutral-800 rounded px-2 py-1 text-neutral-300 text-[11px]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLINIC DOCTORS */}
            {category === 'clinic' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Clinic Doctors & Fees ({clinicDoctors.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      const newDoc: ClinicDoctorCustom = {
                        id: `doc-${Date.now()}`,
                        name: 'Dr. New Doctor',
                        degree: 'MBBS, MD',
                        specialty: 'Specialist',
                        fee: 500
                      };
                      setClinicDoctors([...clinicDoctors, newDoc]);
                    }}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Doctor
                  </button>
                </div>
                <div className="space-y-2">
                  {clinicDoctors.map((doc, idx) => (
                    <div key={doc.id} className="p-3 rounded-lg bg-neutral-950 border border-neutral-800 grid grid-cols-12 gap-2 items-center text-xs">
                      <div className="col-span-4">
                        <input
                          type="text"
                          value={doc.name}
                          onChange={(e) => {
                            const updated = [...clinicDoctors];
                            updated[idx].name = e.target.value;
                            setClinicDoctors(updated);
                          }}
                          placeholder="Doctor Name"
                          className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-white text-xs"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          value={doc.specialty}
                          onChange={(e) => {
                            const updated = [...clinicDoctors];
                            updated[idx].specialty = e.target.value;
                            setClinicDoctors(updated);
                          }}
                          placeholder="Specialty"
                          className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-neutral-300 text-xs"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          value={doc.degree}
                          onChange={(e) => {
                            const updated = [...clinicDoctors];
                            updated[idx].degree = e.target.value;
                            setClinicDoctors(updated);
                          }}
                          placeholder="Degrees"
                          className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-2 py-1 text-neutral-400 text-[11px]"
                        />
                      </div>
                      <div className="col-span-2 flex items-center gap-1">
                        <span className="text-neutral-400">₹</span>
                        <input
                          type="number"
                          value={doc.fee}
                          onChange={(e) => {
                            const updated = [...clinicDoctors];
                            updated[idx].fee = Number(e.target.value) || 0;
                            setClinicDoctors(updated);
                          }}
                          placeholder="Fee"
                          className="w-full bg-neutral-900 border border-neutral-700/60 rounded px-1 py-1 text-white text-xs"
                        />
                      </div>
                      <div className="col-span-1 text-right">
                        <button
                          type="button"
                          onClick={() => setClinicDoctors(clinicDoctors.filter((_, i) => i !== idx))}
                          className="text-neutral-500 hover:text-rose-400 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CRM STAGES */}
            {category === 'crm' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">
                    Deal Pipeline Stages ({crmStages.length})
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCrmStages([...crmStages, 'New Stage'])}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Stage
                  </button>
                </div>
                <div className="space-y-2">
                  {crmStages.map((stage, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-between gap-2 text-xs">
                      <span className="text-neutral-500 w-6 text-center font-mono">0{idx + 1}</span>
                      <input
                        type="text"
                        value={stage}
                        onChange={(e) => {
                          const updated = [...crmStages];
                          updated[idx] = e.target.value;
                          setCrmStages(updated);
                        }}
                        className="flex-1 bg-neutral-900 border border-neutral-700/60 rounded px-2.5 py-1 text-white text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setCrmStages(crmStages.filter((_, i) => i !== idx))}
                        className="text-neutral-500 hover:text-rose-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CUSTOM BLUEPRINT */}
            {category === 'custom' && (
              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-neutral-300 text-xs space-y-2">
                <h4 className="font-semibold text-white">Custom Architecture Workflows</h4>
                <p className="text-neutral-400 leading-relaxed">
                  For bespoke enterprises (such as workshops, coaching academies, jewelry showrooms, and logistics), ATMAN architects design the database models and modules according to your exact operational diagram.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PRESETS & QUICK FILL */}
        {activeTab === 'presets' && (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <p className="text-xs text-neutral-400">
              Click any business profile below to instantly populate realistic branding and test this category on the spot:
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {/* Sample 1 */}
              <div
                onClick={() => {
                  if (category === 'salon') {
                    setName('Ranchi Hair Port');
                    setTagline('Premium Hair & Grooming Lounge');
                    setAccentColor('rose');
                    setAddress('Near Dangratoli Chowk, Circular Road, Ranchi');
                    setPhone('+91 94311 22910');
                    setWhatsapp('+91 94311 22910');
                  } else if (category === 'hotel') {
                    setName('Capitol Hill Luxury Hotel');
                    setTagline('Centrally Located Boutique Stays & Fine Dining');
                    setAccentColor('indigo');
                    setAddress('Mahatma Gandhi Main Road, Ranchi');
                  } else if (category === 'restaurant') {
                    setName('Kaveri Pure Veg & Sweets');
                    setTagline('Authentic Indian Flavors & Multi-Cuisine');
                    setAccentColor('amber');
                    setAddress('Church Complex, Main Road, Ranchi');
                  } else if (category === 'gym') {
                    setName('Cult Iron Fitness Hub');
                    setTagline('Heavy Weights, CrossFit & Functional Training');
                    setAccentColor('emerald');
                    setAddress('Harmu Housing Colony, Sahajanand Chowk, Ranchi');
                  } else if (category === 'clinic') {
                    setName('Dr. Roy Dental Studio & Implant Center');
                    setTagline('Painless Laser Dentistry & Smile Makeovers');
                    setAccentColor('cyan');
                    setAddress('Bariatu Road, Opposite RIMS Gate, Ranchi');
                  } else {
                    setName('Chotanagpur Fleet Logistics');
                    setTagline('Interstate Transport & Cold-Chain Operations');
                    setAccentColor('violet');
                    setAddress('Namkum Bypass Road, Ranchi');
                  }
                }}
                className="p-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    {category === 'salon' ? 'Ranchi Hair Port' : category === 'hotel' ? 'Capitol Hill Luxury Hotel' : category === 'restaurant' ? 'Kaveri Pure Veg' : category === 'gym' ? 'Cult Iron Fitness Hub' : category === 'clinic' ? 'Dr. Roy Dental Studio' : 'Chotanagpur Fleet'}
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Local commercial favorite with custom branding and accent palette.
                  </p>
                </div>
                <button type="button" className="px-3 py-1 rounded bg-neutral-800 text-neutral-200 text-xs font-medium">
                  Load Preset
                </button>
              </div>

              {/* Sample 2 */}
              <div
                onClick={() => {
                  if (category === 'salon') {
                    setName('Aura Luxury Unisex Salon');
                    setTagline('Signature Styling & Skin Treatments');
                    setAccentColor('amber');
                    setAddress('Shop 14, Nucleus Mall, Circular Road, Ranchi');
                  } else if (category === 'hotel') {
                    setName('The Green Valley Resort');
                    setTagline('Nature Suites & Destination Weddings');
                    setAccentColor('emerald');
                    setAddress('Ring Road, Near Getalsud Dam, Ranchi');
                  } else if (category === 'restaurant') {
                    setName('The Urban Grill & Cafe');
                    setTagline('Artisanal Pizzas, Burgers & Mocktails');
                    setAccentColor('rose');
                    setAddress('Kanke Road, Near CMPDI Gate, Ranchi');
                  } else if (category === 'gym') {
                    setName('Oxygen Health & Fitness Club');
                    setTagline('Cardio, Steam, Zumba & Body Recomposition');
                    setAccentColor('cyan');
                    setAddress('Ratu Road, Near Galaxia Mall, Ranchi');
                  } else if (category === 'clinic') {
                    setName('CareWell Multi-Specialty PolyClinic');
                    setTagline('Cardiology, Pediatrics & Diagnostic Center');
                    setAccentColor('sky');
                    setAddress('Hinoo Main Road, Near Birsa Chowk, Ranchi');
                  } else {
                    setName('Apex Industrial Supply Co.');
                    setTagline('Mining Equipment, Spares & Wholesale Distribution');
                    setAccentColor('slate');
                    setAddress('Tupudana Industrial Area, Ranchi');
                  }
                }}
                className="p-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 hover:border-neutral-700 cursor-pointer transition flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-semibold text-white">
                    {category === 'salon' ? 'Aura Luxury Unisex Salon' : category === 'hotel' ? 'The Green Valley Resort' : category === 'restaurant' ? 'The Urban Grill & Cafe' : category === 'gym' ? 'Oxygen Health Club' : category === 'clinic' ? 'CareWell PolyClinic' : 'Apex Industrial Supply'}
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    High-end retail & lifestyle setting with modern aesthetic.
                  </p>
                </div>
                <button type="button" className="px-3 py-1 rounded bg-neutral-800 text-neutral-200 text-xs font-medium">
                  Load Preset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset this business back to standard showroom template?')) {
                resetDemo();
                setIsCustomizeOpen(false);
              }
            }}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset to Standard
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCustomizeOpen(false)}
              className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white bg-transparent hover:bg-neutral-800 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => handleSubmit()}
              className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition"
            >
              Save & Apply Customization
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
