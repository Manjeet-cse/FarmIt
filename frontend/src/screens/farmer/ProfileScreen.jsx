import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/AuthContext';
import { 
  Sprout, 
  MapPin, 
  Edit3, 
  Wheat, 
  Droplet, 
  Layers, 
  Tractor, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  Clock, 
  ChevronRight, 
  HelpCircle, 
  Settings, 
  LogOut, 
  Languages, 
  Store, 
  Bell, 
  Sparkles, 
  CloudRain, 
  CheckCircle2, 
  X,
  Stethoscope
} from 'lucide-react';

export default function ProfileScreen() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { user: authUser, logout } = useAuth();

  // Load farmer preferences from localStorage
  const [preferences, setPreferences] = useState(() => {
    try {
      const stored = localStorage.getItem('farmit_preferences');
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse preferences', e);
    }
    return {
      priceAlerts: true,
      weatherAlerts: true,
      cropHealthAlerts: true,
      diseaseAlerts: true,
      irrigationReminders: true,
      govtSchemeAlerts: true,
      preferredMandi: 'Guna Mandi (APMC)',
    };
  });

  const [showLangSheet, setShowLangSheet] = useState(false);
  const [showMandiModal, setShowMandiModal] = useState(false);
  const [selectedCropModal, setSelectedCropModal] = useState(null);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');
  const [logoutConfirm, setLogoutConfirm] = useState(false);

  // Sync preferences to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('farmit_preferences', JSON.stringify(preferences));
    } catch (e) {
      console.warn('Failed to save preferences', e);
    }
  }, [preferences]);

  const togglePref = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Farmer profile data
  const farmer = {
    name: authUser?.name || 'Manjeet Lodha',
    village: 'Village Bamori',
    district: 'Guna',
    state: 'Madhya Pradesh',
    farmerId: 'FM-473105',
    profileImage: authUser?.profileImage || '/images/manjeet_profile.webp',
    phone: authUser?.phone || '+91 98765 43210',
    totalLand: '12 Acres',
    cultivatedLand: '10 Acres',
    irrigation: 'Drip & Sprinkler',
    soilType: 'Black Cotton Soil',
    waterSource: 'Borewell',
    farmingType: 'Conventional / Mixed',
  };

  // 6 Farm Overview Cards Data
  const farmOverviewItems = [
    {
      id: 'land',
      icon: '🌾',
      label: 'Total Land',
      value: farmer.totalLand,
      sub: 'Owned & Registered',
    },
    {
      id: 'cultivated',
      icon: '🌱',
      label: 'Cultivated Land',
      value: farmer.cultivatedLand,
      sub: 'Active this Season',
    },
    {
      id: 'irrigation',
      icon: '💧',
      label: 'Irrigation',
      value: farmer.irrigation,
      sub: 'Micro-Irrigation Setup',
    },
    {
      id: 'soil',
      icon: '🌍',
      label: 'Soil Type',
      value: farmer.soilType,
      sub: 'Rich in Nutrients',
    },
    {
      id: 'water',
      icon: '💦',
      label: 'Water Source',
      value: farmer.waterSource,
      sub: 'Groundwater & Canal',
    },
    {
      id: 'farming',
      icon: '🚜',
      label: 'Farming Type',
      value: farmer.farmingType,
      sub: 'Crop & Dairy Farming',
    },
  ];

  // My Crops Data
  const crops = [
    {
      id: 'wheat',
      name: 'Wheat',
      hindiName: 'गेहूं',
      variety: 'Sujata (HI-8627)',
      acreage: '5 Acres',
      growthStage: 'Vegetative Stage',
      healthStatus: 'Healthy',
      statusCode: 'healthy',
      sowingDate: '15 Nov 2026',
      harvestDate: '20 Mar 2027',
      image: '/images/crops/wheat.png',
      soilSuitability: 'Optimal',
      nextAction: 'Apply DAP fertilizer in next 48h',
    },
    {
      id: 'mustard',
      name: 'Mustard',
      hindiName: 'सरसों',
      variety: 'Pusa Bold',
      acreage: '3 Acres',
      growthStage: 'Flowering',
      healthStatus: 'Needs Attention',
      statusCode: 'attention',
      sowingDate: '20 Oct 2026',
      harvestDate: '15 Feb 2027',
      image: '/images/crops/mustard_field.webp',
      soilSuitability: 'Moderate',
      nextAction: 'Spray Neem Oil 10000 ppm for Aphids',
    },
    {
      id: 'chickpea',
      name: 'Chickpea',
      hindiName: 'चना',
      variety: 'Desi Chana (JG-11)',
      acreage: '2 Acres',
      growthStage: 'Pod Formation',
      healthStatus: 'Healthy',
      statusCode: 'healthy',
      sowingDate: '05 Nov 2026',
      harvestDate: '10 Mar 2027',
      image: '/images/crops/chickpea_field.webp',
      soilSuitability: 'Optimal',
      nextAction: 'Maintain current moisture levels',
    },
  ];

  // Farm Intelligence Metrics
  const intelligenceMetrics = [
    {
      id: 'crops',
      icon: '🌱',
      label: 'Active Crops',
      value: '3',
      sub: 'Wheat, Mustard, Chana',
      highlightColor: 'text-[#006e1c]',
    },
    {
      id: 'irrigation',
      icon: '💧',
      label: 'Irrigation',
      value: 'Optimal',
      sub: 'Next scheduled in 2 days',
      highlightColor: 'text-blue-700',
    },
    {
      id: 'weather',
      icon: '🌦️',
      label: 'Weather Risk',
      value: 'Low',
      sub: 'Clear skies, favorable wind',
      highlightColor: 'text-amber-700',
    },
    {
      id: 'health',
      icon: '🦠',
      label: 'Crop Health',
      value: '2 Healthy',
      sub: '1 Needs Attention',
      highlightColor: 'text-[#006e1c]',
    },
  ];

  const languages = [
    { code: 'en', native: 'English', label: 'English' },
    { code: 'hi', native: 'हिंदी', label: 'Hindi' },
    { code: 'pa', native: 'ਪੰਜਾਬੀ', label: 'Punjabi' },
    { code: 'mr', native: 'मराठी', label: 'Marathi' },
    { code: 'gu', native: 'ગુજરાતી', label: 'Gujarati' },
  ];

  const mandis = [
    'Guna Mandi (APMC)',
    'Indore Krishi Mandi',
    'Bhopal Karond Mandi',
    'Vidisha Mandi',
    'Ujjain APMC Mandi',
  ];

  const currentLangNative = languages.find(l => l.code === currentLang)?.native || 'English';

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface-light text-onSurface font-body">
      {/* Mobile Top App Bar */}
      {isMobile && <AppTopBar title="Profile" showProfile={false} showNotification={true} />}

      {/* Main Scrollable Canvas */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        <main className="w-full max-w-[1020px] mx-auto py-5 md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col gap-7 pb-28 md:pb-12">

          {/* ══════════════════════════════════════════════════════════════
              1. PROFILE HEADER
              ══════════════════════════════════════════════════════════════ */}
          <section className="bg-white rounded-3xl p-5 md:p-7 border border-[#dce8dc] shadow-2xs relative overflow-hidden transition-all">
            {/* Subtle background nature glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#e5f9e2]/50 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10" />
            
            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start md:items-center justify-between gap-5 text-center sm:text-left">
              {/* Avatar + Info */}
              <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
                {/* Circular Profile Photo */}
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shrink-0 ring-4 ring-[#e5f9e2] border-2 border-[#006e1c]/25 shadow-sm bg-[#e9f2e7] flex items-center justify-center">
                  {farmer.profileImage ? (
                    <img
                      src={farmer.profileImage}
                      alt={farmer.name}
                      className="w-full h-full object-cover object-[center_20%] scale-135"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=200&h=200';
                      }}
                    />
                  ) : (
                    <span className="material-symbols-outlined text-5xl text-[#006e1c] opacity-60">person</span>
                  )}
                  {/* Verified Farmer Badge */}
                  <div className="absolute bottom-0 right-0 bg-[#006e1c] text-white p-1 rounded-full shadow-xs border-2 border-white flex items-center justify-center" title="Verified Kisan">
                    <CheckCircle2 size={14} />
                  </div>
                </div>

                {/* Farmer Details */}
                <div className="flex flex-col items-center sm:items-start">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-onSurface tracking-tight m-0">
                      {farmer.name}
                    </h1>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-headline font-bold bg-[#e5f9e2] text-[#006e1c] border border-[#006e1c]/20">
                      Verified Farmer
                    </span>
                  </div>

                  {/* Location: Village, District, State */}
                  <div className="flex items-center gap-1.5 text-onSurface-variant text-xs md:text-sm font-medium mt-1.5">
                    <MapPin size={15} className="text-[#006e1c] shrink-0" />
                    <span>{farmer.village}, {farmer.district}, {farmer.state}</span>
                  </div>

                  {/* Farmer ID */}
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold px-3 py-1 rounded-lg bg-[#f0f6ef] text-[#2c532e] border border-[#d6e5d4]">
                      Farmer ID: {farmer.farmerId}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit Profile Button */}
              <div className="shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => navigate('/farmer/edit-profile')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#006e1c] hover:bg-[#005a16] text-white font-headline font-bold text-xs md:text-sm border-none cursor-pointer shadow-xs active:scale-95 transition-all"
                >
                  <Edit3 size={15} />
                  <span>Edit Profile</span>
                </button>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              2. FARM OVERVIEW
              ══════════════════════════════════════════════════════════════ */}
          <section className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-bold text-lg md:text-xl text-onSurface m-0">
                  Farm Overview
                </h2>
                <p className="text-xs text-onSurface-variant m-0 mt-0.5">
                  Land holding, irrigation setup, and soil properties
                </p>
              </div>
            </div>

            {/* Desktop: 3 cards/row | Mobile: 2-column grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {farmOverviewItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl p-4 border border-[#e0ece0] shadow-2xs hover:border-[#006e1c]/40 hover:shadow-xs transition-all flex flex-col justify-between min-h-[92px]"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl" role="img" aria-label={item.label}>
                      {item.icon}
                    </span>
                    <span className="text-[11px] font-semibold text-onSurface-variant uppercase tracking-wider">
                      {item.label}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline font-extrabold text-base md:text-lg text-onSurface m-0 truncate">
                      {item.value}
                    </h3>
                    <p className="text-[11px] text-onSurface-variant/80 m-0 mt-0.5 truncate font-medium">
                      {item.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              3. MY CROPS
              ══════════════════════════════════════════════════════════════ */}
          <section className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline font-bold text-lg md:text-xl text-onSurface m-0">
                    My Crops
                  </h2>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#e5f9e2] text-[#006e1c] border border-[#006e1c]/20">
                    {crops.length} Active
                  </span>
                </div>
                <p className="text-xs text-onSurface-variant m-0 mt-0.5">
                  Current standing crops and maturity tracking
                </p>
              </div>
            </div>

            {/* Crop Cards: Desktop 3 columns / Mobile stacked */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {crops.map((crop) => (
                <div
                  key={crop.id}
                  className="bg-white rounded-2xl md:rounded-3xl border border-[#e0ece0] shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                >
                  {/* Top row: Image & main info */}
                  <div className="p-4 md:p-5 flex gap-3.5 items-start">
                    {/* Thumbnail */}
                    <div className="w-16 h-16 rounded-xl bg-[#f0f6ef] border border-[#dce8dc] overflow-hidden shrink-0 flex items-center justify-center shadow-2xs">
                      <img
                        src={crop.image}
                        alt={crop.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/crops/wheat.png';
                        }}
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-headline font-extrabold text-base text-onSurface m-0 truncate">
                          {crop.name}
                        </h3>
                        <span className="font-headline font-black text-xs text-[#006e1c] shrink-0 bg-[#eef7ee] px-2 py-0.5 rounded-md">
                          {crop.acreage}
                        </span>
                      </div>
                      <p className="text-xs text-onSurface-variant font-medium m-0 mt-0.5 truncate">
                        Variety: <strong className="text-onSurface font-semibold">{crop.variety}</strong>
                      </p>

                      {/* Stage & Health Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#f4f7f4] text-onSurface border border-[#e2ece1]">
                          {crop.growthStage}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 border ${
                            crop.statusCode === 'healthy'
                              ? 'bg-[#e5f9e2] text-[#006e1c] border-[#006e1c]/20'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              crop.statusCode === 'healthy' ? 'bg-[#006e1c]' : 'bg-amber-600'
                            }`}
                          />
                          {crop.healthStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Sowing & Harvest Timeline info */}
                  <div className="px-4 md:px-5 py-3 bg-[#fbfdfb] border-t border-b border-[#edf3ec] text-[11px] text-onSurface-variant flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} className="text-[#006e1c]" />
                        <span>Sown:</span>
                      </span>
                      <strong className="text-onSurface font-semibold">{crop.sowingDate}</strong>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-[#006e1c]" />
                        <span>Expected Harvest:</span>
                      </span>
                      <strong className="text-onSurface font-semibold">{crop.harvestDate}</strong>
                    </div>
                  </div>

                  {/* Card Footer: View Crop action */}
                  <div className="p-3 md:p-3.5 bg-white">
                    <button
                      onClick={() => setSelectedCropModal(crop)}
                      className="w-full py-2 px-3 rounded-xl bg-[#f2f8f1] hover:bg-[#e4f3e2] text-[#006e1c] font-headline font-bold text-xs border border-[#006e1c]/20 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>View Crop</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              4. FARM INTELLIGENCE
              ══════════════════════════════════════════════════════════════ */}
          <section className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline font-bold text-lg md:text-xl text-onSurface m-0 flex items-center gap-2">
                  <span>Farm Intelligence</span>
                  <span className="text-[10px] uppercase font-headline font-black px-2 py-0.5 rounded-full bg-[#f2f8f1] text-[#006e1c] border border-[#006e1c]/15">
                    Live
                  </span>
                </h2>
                <p className="text-xs text-onSurface-variant m-0 mt-0.5">
                  Compact status of crops, hydration, and weather risk
                </p>
              </div>
            </div>

            {/* Desktop: 4 cards / Mobile: 2x2 grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {intelligenceMetrics.map((metric) => (
                <div
                  key={metric.id}
                  className="bg-white rounded-2xl p-4 border border-[#e2ede1] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">{metric.icon}</span>
                    <span className="text-[11px] font-semibold text-onSurface-variant uppercase tracking-wider">
                      {metric.label}
                    </span>
                  </div>
                  <div>
                    <h3 className={`font-headline font-black text-lg md:text-xl m-0 ${metric.highlightColor}`}>
                      {metric.value}
                    </h3>
                    <p className="text-[11px] text-onSurface-variant m-0 mt-0.5 truncate font-medium">
                      {metric.sub}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              5. PREFERENCES & ALERTS
              ══════════════════════════════════════════════════════════════ */}
          <section className="flex flex-col gap-3.5">
            <div>
              <h2 className="font-headline font-bold text-lg md:text-xl text-onSurface m-0">
                Preferences & Alerts
              </h2>
              <p className="text-xs text-onSurface-variant m-0 mt-0.5">
                Configure notifications, agricultural alerts, and regional settings
              </p>
            </div>

            <div className="bg-white rounded-3xl p-2 sm:p-4 border border-[#dce8dc] shadow-2xs divide-y divide-[#edf3ec]">
              {/* Price Alerts */}
              <div className="py-3 px-3 sm:px-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0f6ef] text-[#006e1c] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">trending_up</span>
                  </div>
                  <div>
                    <span className="font-headline font-semibold text-sm text-onSurface block">Price Alerts</span>
                    <span className="text-[11px] text-onSurface-variant hidden sm:block">Notify when mandi crop rates fluctuate significantly</span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.priceAlerts}
                  onClick={() => togglePref('priceAlerts')}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer border-none p-0 focus:outline-none ${
                    preferences.priceAlerts ? 'bg-[#006e1c]' : 'bg-[#d8e2d7]'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                      preferences.priceAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Weather Alerts */}
              <div className="py-3 px-3 sm:px-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0f6ef] text-[#006e1c] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">thunderstorm</span>
                  </div>
                  <div>
                    <span className="font-headline font-semibold text-sm text-onSurface block">Weather Alerts</span>
                    <span className="text-[11px] text-onSurface-variant hidden sm:block">Heavy rain, frost, and high humidity warnings</span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.weatherAlerts}
                  onClick={() => togglePref('weatherAlerts')}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer border-none p-0 focus:outline-none ${
                    preferences.weatherAlerts ? 'bg-[#006e1c]' : 'bg-[#d8e2d7]'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                      preferences.weatherAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Crop Health Alerts */}
              <div className="py-3 px-3 sm:px-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0f6ef] text-[#006e1c] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">medical_services</span>
                  </div>
                  <div>
                    <span className="font-headline font-semibold text-sm text-onSurface block">Crop Health Alerts</span>
                    <span className="text-[11px] text-onSurface-variant hidden sm:block">AI-identified pest & nutrient deficiency notifications</span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.cropHealthAlerts}
                  onClick={() => togglePref('cropHealthAlerts')}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer border-none p-0 focus:outline-none ${
                    preferences.cropHealthAlerts ? 'bg-[#006e1c]' : 'bg-[#d8e2d7]'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                      preferences.cropHealthAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Disease Alerts */}
              <div className="py-3 px-3 sm:px-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0f6ef] text-[#006e1c] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">pest_control</span>
                  </div>
                  <div>
                    <span className="font-headline font-semibold text-sm text-onSurface block">Disease Alerts</span>
                    <span className="text-[11px] text-onSurface-variant hidden sm:block">Seasonal disease outbreaks reported in Guna district</span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.diseaseAlerts}
                  onClick={() => togglePref('diseaseAlerts')}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer border-none p-0 focus:outline-none ${
                    preferences.diseaseAlerts ? 'bg-[#006e1c]' : 'bg-[#d8e2d7]'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                      preferences.diseaseAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Irrigation Reminders */}
              <div className="py-3 px-3 sm:px-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0f6ef] text-[#006e1c] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">water_drop</span>
                  </div>
                  <div>
                    <span className="font-headline font-semibold text-sm text-onSurface block">Irrigation Reminders</span>
                    <span className="text-[11px] text-onSurface-variant hidden sm:block">Soil moisture depletion and scheduled watering intervals</span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.irrigationReminders}
                  onClick={() => togglePref('irrigationReminders')}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer border-none p-0 focus:outline-none ${
                    preferences.irrigationReminders ? 'bg-[#006e1c]' : 'bg-[#d8e2d7]'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                      preferences.irrigationReminders ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Government Scheme Alerts */}
              <div className="py-3 px-3 sm:px-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0f6ef] text-[#006e1c] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px]">account_balance</span>
                  </div>
                  <div>
                    <span className="font-headline font-semibold text-sm text-onSurface block">Government Scheme Alerts</span>
                    <span className="text-[11px] text-onSurface-variant hidden sm:block">PM-KISAN, fertilizer subsidy, and crop insurance alerts</span>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.govtSchemeAlerts}
                  onClick={() => togglePref('govtSchemeAlerts')}
                  className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors cursor-pointer border-none p-0 focus:outline-none ${
                    preferences.govtSchemeAlerts ? 'bg-[#006e1c]' : 'bg-[#d8e2d7]'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform ${
                      preferences.govtSchemeAlerts ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Language Selection Row */}
              <div
                onClick={() => setShowLangSheet(true)}
                className="py-3.5 px-3 sm:px-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#f9fbf8] transition-colors rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0f6ef] text-[#006e1c] flex items-center justify-center shrink-0">
                    <Languages size={17} />
                  </div>
                  <div>
                    <span className="font-headline font-semibold text-sm text-onSurface block">Language</span>
                    <span className="text-[11px] text-onSurface-variant hidden sm:block">Select preferred app language</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#006e1c] font-headline font-bold text-xs sm:text-sm">
                  <span>{currentLangNative}</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </div>
              </div>

              {/* Preferred Mandi Row */}
              <div
                onClick={() => setShowMandiModal(true)}
                className="py-3.5 px-3 sm:px-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#f9fbf8] transition-colors rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#f0f6ef] text-[#006e1c] flex items-center justify-center shrink-0">
                    <Store size={17} />
                  </div>
                  <div>
                    <span className="font-headline font-semibold text-sm text-onSurface block">Preferred Mandi</span>
                    <span className="text-[11px] text-onSurface-variant hidden sm:block">Default market for crop selling price alerts</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#006e1c] font-headline font-bold text-xs sm:text-sm">
                  <span>{preferences.preferredMandi}</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              6. ACCOUNT & SUPPORT
              ══════════════════════════════════════════════════════════════ */}
          <section className="flex flex-col gap-3.5">
            <div>
              <h2 className="font-headline font-bold text-lg md:text-xl text-onSurface m-0">
                Account & Support
              </h2>
              <p className="text-xs text-onSurface-variant m-0 mt-0.5">
                Helpline assistance, app configuration, and session controls
              </p>
            </div>

            <div className="bg-white rounded-3xl p-2 sm:p-3 border border-[#dce8dc] shadow-2xs flex flex-col gap-1">
              {/* Help & Support */}
              <button
                onClick={() => navigate('/farmer/help-support')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-[#f7faf6] transition-colors border-none bg-transparent cursor-pointer text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#f0f6ef] text-[#006e1c] flex items-center justify-center shrink-0">
                    <HelpCircle size={18} />
                  </div>
                  <div>
                    <span className="font-headline font-bold text-sm text-onSurface block">Help & Support</span>
                    <span className="text-[11px] text-onSurface-variant">Kisan call center, FAQs & chat with agronomist</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-onSurface-variant/60" />
              </button>

              {/* Settings */}
              <button
                onClick={() => navigate('/farmer/settings')}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-[#f7faf6] transition-colors border-none bg-transparent cursor-pointer text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#f0f6ef] text-[#006e1c] flex items-center justify-center shrink-0">
                    <Settings size={18} />
                  </div>
                  <div>
                    <span className="font-headline font-bold text-sm text-onSurface block">Settings</span>
                    <span className="text-[11px] text-onSurface-variant">App permissions, cache, privacy & security</span>
                  </div>
                </div>
                <ChevronRight size={18} className="text-onSurface-variant/60" />
              </button>

              {/* Logout Option */}
              <div className="pt-1 border-t border-[#edf3ec] mt-1">
                <button
                  onClick={() => setLogoutConfirm(true)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-red-50/50 hover:bg-red-50 text-[#ba1a1a] transition-colors border border-red-100 cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-red-100 text-[#ba1a1a] flex items-center justify-center shrink-0">
                      <LogOut size={18} />
                    </div>
                    <div>
                      <span className="font-headline font-bold text-sm text-[#ba1a1a] block">Logout</span>
                      <span className="text-[11px] text-red-600/70">Sign out of {farmer.name} on this device</span>
                    </div>
                  </div>
                  <span className="text-xs font-headline font-bold text-[#ba1a1a] bg-white px-2.5 py-1 rounded-lg border border-red-200">
                    Sign Out
                  </span>
                </button>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          CROP DETAIL MODAL (WHEN "VIEW CROP" IS CLICKED)
          ══════════════════════════════════════════════════════════════ */}
      {selectedCropModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedCropModal(null)}
        >
          <div
            className="bg-white rounded-3xl p-6 md:p-7 max-w-md w-full border border-[#dce8dc] shadow-xl flex flex-col gap-4 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-[#edf3ec] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-[#f0f6ef] border border-[#dce8dc] overflow-hidden shrink-0 flex items-center justify-center">
                  <img
                    src={selectedCropModal.image}
                    alt={selectedCropModal.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-headline font-bold text-lg text-onSurface m-0">
                      {selectedCropModal.name}
                    </h3>
                    <span className="text-xs text-onSurface-variant font-medium">({selectedCropModal.hindiName})</span>
                  </div>
                  <p className="text-xs text-[#006e1c] font-bold m-0 mt-0.5">
                    {selectedCropModal.variety} • {selectedCropModal.acreage}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCropModal(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-onSurface-variant border-none cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Crop Metadata Breakdown */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="bg-[#f9fbf8] p-3 rounded-xl border border-[#edf3ec]">
                <span className="text-[10px] uppercase font-bold text-onSurface-variant block">Growth Stage</span>
                <span className="font-headline font-bold text-onSurface text-xs mt-0.5 block">{selectedCropModal.growthStage}</span>
              </div>
              <div className="bg-[#f9fbf8] p-3 rounded-xl border border-[#edf3ec]">
                <span className="text-[10px] uppercase font-bold text-onSurface-variant block">Health Status</span>
                <span className={`font-headline font-bold text-xs mt-0.5 block ${
                  selectedCropModal.statusCode === 'healthy' ? 'text-[#006e1c]' : 'text-amber-700'
                }`}>
                  ● {selectedCropModal.healthStatus}
                </span>
              </div>
              <div className="bg-[#f9fbf8] p-3 rounded-xl border border-[#edf3ec]">
                <span className="text-[10px] uppercase font-bold text-onSurface-variant block">Sowing Date</span>
                <span className="font-headline font-semibold text-onSurface text-xs mt-0.5 block">{selectedCropModal.sowingDate}</span>
              </div>
              <div className="bg-[#f9fbf8] p-3 rounded-xl border border-[#edf3ec]">
                <span className="text-[10px] uppercase font-bold text-onSurface-variant block">Expected Harvest</span>
                <span className="font-headline font-semibold text-onSurface text-xs mt-0.5 block">{selectedCropModal.harvestDate}</span>
              </div>
            </div>

            {/* Agronomic Recommendation Note */}
            <div className="p-3.5 rounded-2xl bg-[#f2f8f1] border border-[#006e1c]/20 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#006e1c] block mb-1">Recommended Action</span>
              <p className="text-onSurface font-medium m-0 leading-relaxed">
                {selectedCropModal.nextAction}
              </p>
            </div>

            {/* Quick Navigation Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedCropModal(null);
                  navigate('/farmer/diagnosis');
                }}
                className="flex-1 py-2.5 px-3 bg-[#006e1c] hover:bg-[#005a16] text-white font-headline font-bold text-xs rounded-xl border-none cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Stethoscope size={14} />
                <span>Check in AI Diagnosis</span>
              </button>
              <button
                onClick={() => {
                  setSelectedCropModal(null);
                  navigate('/farmer/mandi');
                }}
                className="py-2.5 px-3 bg-[#f0f6ef] hover:bg-[#e4ede3] text-[#006e1c] font-headline font-bold text-xs rounded-xl border border-[#006e1c]/25 cursor-pointer flex items-center justify-center gap-1"
              >
                <Store size={14} />
                <span>Mandi Rates</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          MANDI SELECTION MODAL
          ══════════════════════════════════════════════════════════════ */}
      {showMandiModal && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setShowMandiModal(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full border border-[#dce8dc] shadow-xl flex flex-col gap-3 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#edf3ec]">
              <h3 className="font-headline font-bold text-base text-onSurface m-0">Select Preferred Mandi</h3>
              <button
                onClick={() => setShowMandiModal(false)}
                className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center border-none cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>
            <div className="flex flex-col gap-1.5 py-1">
              {mandis.map((m) => {
                const isSelected = preferences.preferredMandi === m;
                return (
                  <button
                    key={m}
                    onClick={() => {
                      setPreferences(prev => ({ ...prev, preferredMandi: m }));
                      setShowMandiModal(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border text-xs font-headline font-bold text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#006e1c] bg-[#e5f9e2]/60 text-[#006e1c]'
                        : 'border-[#edf3ec] bg-white text-onSurface hover:bg-[#f7faf6]'
                    }`}
                  >
                    <span>{m}</span>
                    {isSelected && <CheckCircle2 size={16} className="text-[#006e1c]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          LOGOUT CONFIRMATION MODAL
          ══════════════════════════════════════════════════════════════ */}
      {logoutConfirm && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setLogoutConfirm(false)}
        >
          <div
            className="bg-white rounded-3xl p-6 max-w-sm w-full border border-red-200 shadow-xl flex flex-col gap-3 relative animate-in zoom-in-95 duration-200 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-100 text-[#ba1a1a] mx-auto flex items-center justify-center">
              <LogOut size={22} />
            </div>
            <h3 className="font-headline font-bold text-lg text-onSurface m-0">Confirm Logout?</h3>
            <p className="text-xs text-onSurface-variant m-0 leading-relaxed">
              Are you sure you want to sign out of <strong>{farmer.name}</strong>? You can log back in anytime using your mobile number.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setLogoutConfirm(false)}
                className="flex-1 py-2.5 rounded-xl bg-[#f0f4f0] text-onSurface font-headline font-bold text-xs border-none cursor-pointer hover:bg-[#e4ece4]"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl bg-[#ba1a1a] text-white font-headline font-bold text-xs border-none cursor-pointer hover:bg-red-700 shadow-xs"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════
          LANGUAGE SELECTION BOTTOM SHEET
          ══════════════════════════════════════════════════════════════ */}
      {showLangSheet && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[60] transition-opacity animate-in fade-in duration-200"
            onClick={() => setShowLangSheet(false)}
          />
          <div className="fixed bottom-0 left-0 w-full bg-white rounded-t-3xl z-[60] flex flex-col pb-6 max-h-[80vh] overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-200 max-w-lg mx-auto sm:left-1/2 sm:-translate-x-1/2">
            <div className="w-12 h-1.5 bg-[#dce8dc] rounded-full mx-auto my-3 shrink-0" />
            <div className="flex items-center justify-between px-6 pb-3 border-b border-[#edf3ec]">
              <h2 className="font-headline font-bold text-lg text-onSurface m-0">
                {t('common.selectLanguage', 'Select Language')}
              </h2>
              <button
                className="bg-transparent border-none p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer flex items-center justify-center text-onSurface-variant"
                onClick={() => setShowLangSheet(false)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-4 flex flex-col gap-2 no-scrollbar">
              {languages.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#006e1c] bg-[#e5f9e2]/50'
                        : 'border-[#edf3ec] bg-white hover:bg-[#f9fbf8]'
                    }`}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      i18n.changeLanguage(lang.code);
                      localStorage.setItem('appLanguage', lang.code);
                      setTimeout(() => setShowLangSheet(false), 200);
                    }}
                  >
                    <div className="flex flex-col items-start gap-0.5">
                      <span className={`font-headline font-bold text-sm m-0 ${isSelected ? 'text-[#006e1c]' : 'text-onSurface'}`}>
                        {lang.native}
                      </span>
                      <span className="font-body text-xs text-onSurface-variant m-0">
                        {lang.label}
                      </span>
                    </div>
                    {isSelected && (
                      <CheckCircle2 size={18} className="text-[#006e1c]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

    </div>
  );
}