import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/AuthContext';
import cropService from '../../services/cropService';

export default function ProfileScreen() {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { logout } = useAuth();
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(false);
  const [showLangSheet, setShowLangSheet] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

  // Hardcoded Data
  const user = {
    name: 'Manjeet Lodha',
    location: 'Guna, Madhya Pradesh',
    profileImage: '/images/manjeet_profile.webp',
    totalLandArea: 12,
    irrigationType: 'Drip & Sprinkler',
    soilType: 'Black Cotton Soil'
  };

  const crops = [
    {
      _id: '1',
      cropName: 'Wheat (Sujata)',
      acreage: 5,
      cropStage: 'Vegetative Stage',
      healthStatus: 'Healthy',
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?fit=crop&w=200&h=200'
    },
    {
      _id: '2',
      cropName: 'Mustard (Pusa)',
      acreage: 3,
      cropStage: 'Flowering',
      healthStatus: 'Needs Attention',
      image: 'https://images.unsplash.com/photo-1590682680695-43b964a3ae17?fit=crop&w=200&h=200'
    }
  ];
  const loadingCrops = false;

  const languages = [
    { code: 'hi', native: 'हिंदी', label: 'Hindi' },
    { code: 'en', native: 'English', label: 'English' },
    { code: 'pa', native: 'ਪੰਜਾਬੀ', label: 'Punjabi' },
    { code: 'mr', native: 'मराठी', label: 'Marathi' },
    { code: 'gu', native: 'ગુજરાતી', label: 'Gujarati' },
    { code: 'ta', native: 'தமிழ்', label: 'Tamil' },
    { code: 'te', native: 'తెలుగు', label: 'Telugu' },
    { code: 'bn', native: 'বাংলা', label: 'Bengali' },
  ];

  const currentLangNative = languages.find(l => l.code === currentLang)?.native || 'English';

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface-light relative">
      {isMobile && <AppTopBar title={t('profile.title')} showProfile={false} />}

      <div className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <main className="pt-4 pb-32 md:pb-8 flex flex-col gap-8 bg-surface-light max-w-3xl md:mx-auto">

          {/* Header: Profile Info */}
          <section className="flex flex-col items-center text-center px-6 relative mt-4">
            <div className="absolute -top-2 right-2">
              <button 
                onClick={() => navigate('/farmer/edit-profile')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors border-none cursor-pointer font-label font-semibold text-sm shadow-sm"
              >
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>edit</span>
                Edit Profile
              </button>
            </div>
            <div className="mb-4 w-28 h-28 rounded-full overflow-hidden shadow-sm mx-auto relative bg-surface-containerHigh flex items-center justify-center">
              {user?.profileImage ? (
                <img
                  alt="Profile"
                  className="w-full h-full object-cover object-[center_20%] scale-150"
                  src={user.profileImage}
                />
              ) : (
                <span className="material-symbols-outlined text-6xl text-primary opacity-50">person</span>
              )}
            </div>
            <h2 className="font-headline font-bold text-3xl text-onSurface mb-2 mt-0">{user?.name || 'Farmer'}</h2>

            <div className="flex items-center justify-center gap-1.5 text-onSurface-variant font-body text-base">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
              <span>{user?.location || 'Set your location'}</span>
            </div>
          </section>

          {/* Farm Summary Section */}
          <section className="flex gap-4 px-6">
            <div className="flex-1 bg-surface-containerLow rounded-2xl p-4 flex flex-col items-center justify-center">
              <p className="font-body text-xs text-onSurface-variant mb-1 uppercase tracking-wide m-0">{t('profile.totalCrops')}</p>
              <p className="font-headline font-bold text-2xl text-onSurface m-0">{crops.length}</p>
            </div>
            <div className="flex-1 bg-surface-containerLow rounded-2xl p-4 flex flex-col items-center justify-center">
              <p className="font-body text-xs text-onSurface-variant mb-1 uppercase tracking-wide m-0">{t('profile.active')}</p>
              <p className="font-headline font-bold text-2xl text-onSurface m-0">{crops.filter(c => c.healthStatus === 'Healthy').length}</p>
            </div>
            <div className="flex-1 bg-surface-containerLow rounded-2xl p-4 flex flex-col items-center justify-center border border-outline-variant/30">
              <p className="font-body text-xs text-onSurface-variant mb-1 uppercase tracking-wide m-0">{t('profile.recent')}</p>
              <p className="font-headline font-bold text-lg text-onSurface truncate w-full text-center m-0">{crops[0]?.cropName || '—'}</p>
            </div>
          </section>

          {/* My Crops */}
          <section className="flex flex-col px-6">
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-headline font-bold text-2xl text-onSurface m-0">{t('profile.myCrops')}</h3>
            </div>
            {loadingCrops ? (
              <div className="py-5 text-center text-onSurface-variant font-body">Loading crops...</div>
            ) : crops.length === 0 ? (
              <div className="py-8 text-center flex flex-col items-center gap-3 border-t border-outline-variant/20">
                <span className="material-symbols-outlined text-4xl text-outline">grass</span>
                <p className="font-body text-onSurface-variant m-0">No crops added yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {crops.map((crop) => (
                  <div key={crop._id} className="p-4 rounded-2xl bg-surface-containerLow/60 border border-outline-variant/20 flex gap-4 items-center relative group hover:shadow-sm transition-all">
                    <div className="w-20 h-20 rounded-xl bg-surface-container flex items-center justify-center shrink-0 overflow-hidden">
                      {crop.image ? (
                        <img src={crop.image} alt={crop.cropName} className="w-full h-full object-cover" />
                      ) : (
                        <span className="material-symbols-outlined text-4xl text-primary opacity-50">eco</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-0.5">
                        <h4 className="font-headline font-bold text-base text-onSurface leading-tight m-0 truncate">{crop.cropName}</h4>
                      </div>
                      <p className="font-body text-xs text-onSurface-variant mb-1.5 m-0">{crop.acreage} Acres</p>
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-onSurface-variant text-[15px]" style={{ fontVariationSettings: "'FILL' 0" }}>timeline</span>
                          <span className="font-body text-xs text-onSurface-variant truncate">{crop.cropStage}</span>
                        </div>
                        <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md w-fit ${crop.healthStatus === 'Healthy' ? 'bg-surface-containerHigh' : 'bg-error-container'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${crop.healthStatus === 'Healthy' ? 'bg-primary' : 'bg-error'}`}></span>
                          <span className={`font-body text-[11px] font-semibold ${crop.healthStatus === 'Healthy' ? 'text-onSurface' : 'text-onErrorContainer'}`}>{crop.healthStatus}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Farm Details Section */}
          <section className="flex flex-col px-6">
            <h3 className="font-headline font-bold text-xl text-onSurface mb-4 m-0">{t('profile.farmDetails')}</h3>
            <div className="flex flex-col divide-y divide-outline-variant/20 border-y border-outline-variant/20">
              <div className="flex justify-between items-center py-4">
                <span className="font-body text-base text-onSurface-variant">{t('profile.totalLand')}</span>
                <span className="font-headline font-semibold text-lg text-onSurface">{user?.totalLandArea || 0} Acres</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="font-body text-base text-onSurface-variant">{t('profile.irrigation')}</span>
                <span className="font-headline font-semibold text-lg text-onSurface text-right max-w-[200px] truncate">{user?.irrigationType || 'Not Set'}</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="font-body text-base text-onSurface-variant">{t('profile.soilType')}</span>
                <span className="font-headline font-semibold text-lg text-onSurface">{user?.soilType || 'Not Set'}</span>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="flex flex-col gap-2 px-6 mb-4">
            <h3 className="font-headline font-bold text-xl text-onSurface mb-2 m-0">{t('profile.preferences')}</h3>
            <div className="py-4 flex justify-between items-center border-b border-outline-variant/20">
              <span className="font-body text-lg text-onSurface">{t('profile.priceAlerts')}</span>
              {/* Toggle Switch */}
              <button
                onClick={() => setPriceAlerts(!priceAlerts)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none border-none cursor-pointer ${priceAlerts ? 'bg-primary' : 'bg-surface-containerHighest border border-outline-variant/30'}`}
              >
                <span className={`${priceAlerts ? 'translate-x-7 bg-white' : 'translate-x-1 bg-outline'} inline-block h-6 w-6 transform rounded-full shadow transition-transform`}></span>
              </button>
            </div>
            <div className="py-4 flex justify-between items-center border-b border-outline-variant/20">
              <span className="font-body text-lg text-onSurface">{t('profile.weatherAlerts')}</span>
              {/* Toggle Switch */}
              <button
                onClick={() => setWeatherAlerts(!weatherAlerts)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none border-none cursor-pointer ${weatherAlerts ? 'bg-primary' : 'bg-surface-containerHighest border border-outline-variant/30'}`}
              >
                <span className={`${weatherAlerts ? 'translate-x-7 bg-white' : 'translate-x-1 bg-outline'} inline-block h-6 w-6 transform rounded-full shadow transition-transform`}></span>
              </button>
            </div>
            <div
              className="py-4 flex justify-between items-center cursor-pointer active:opacity-70 transition-opacity"
              onClick={() => setShowLangSheet(true)}
            >
              <span className="font-body text-lg text-onSurface">{t('common.language')}</span>
              <div className="flex items-center gap-2">
                <span className="font-body text-base font-semibold text-onSurface-variant">{currentLangNative}</span>
                <span className="material-symbols-outlined text-onSurface-variant text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>expand_more</span>
              </div>
            </div>
          </section>

          {/* Logout Button */}
          <button
            onClick={() => { logout(); navigate('/login', { replace: true }); }}
            className="w-full mt-4 mb-6 h-14 rounded-2xl bg-[#ba1a1a]/10 text-[#ba1a1a] font-headline font-bold text-base flex items-center justify-center gap-2.5 border-2 border-[#ba1a1a]/20 cursor-pointer transition-all duration-200 hover:bg-[#ba1a1a]/15 active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[22px]">logout</span>
            Logout
          </button>

        </main>
      </div>

      
      {/* Language Selection Bottom Sheet */}
      {showLangSheet && (
        <>
          <div
            className="absolute inset-0 bg-black/40 z-[60] transition-opacity"
            onClick={() => setShowLangSheet(false)}
          />
          <div className="absolute bottom-0 left-0 w-full bg-surface-containerLowest rounded-t-3xl z-[60] flex flex-col pb-6 max-h-[80vh] overflow-hidden">
            <div className="w-12 h-1.5 bg-outline-variant/50 rounded-full mx-auto my-3 shrink-0"></div>
            <div className="flex items-center justify-between px-6 pb-4 border-b border-outline-variant/20">
              <h2 className="font-headline font-bold text-xl text-onSurface m-0">{t('common.selectLanguage')}</h2>
              <button
                className="bg-transparent border-none p-2 rounded-full hover:bg-surface-container transition-colors cursor-pointer flex items-center justify-center text-onSurface-variant"
                onClick={() => setShowLangSheet(false)}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="overflow-y-auto px-6 py-4 flex flex-col gap-2">
              {languages.map((lang) => {
                const isSelected = currentLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 transition-colors cursor-pointer ${isSelected
                        ? 'border-primary bg-primary/5'
                        : 'border-outline-variant/30 bg-transparent hover:bg-surface-containerLowest'
                      }`}
                    onClick={() => {
                      setCurrentLang(lang.code);
                      i18n.changeLanguage(lang.code);
                      localStorage.setItem('appLanguage', lang.code);
                      setTimeout(() => setShowLangSheet(false), 200);
                    }}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <span className={`font-headline font-semibold text-base m-0 ${isSelected ? 'text-primary' : 'text-onSurface'}`}>
                        {lang.native}
                      </span>
                      <span className="font-body text-sm text-onSurface-variant m-0">
                        {lang.label}
                      </span>
                    </div>
                    {isSelected && (
                      <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
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