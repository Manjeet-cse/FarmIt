import React, { useState } from 'react';
import AppTopBar from '../../components/common/AppTopBar';
import BottomTabs from '../../components/layout/BottomTabs';

export default function ProfileScreen() {
  const [priceAlerts, setPriceAlerts] = useState(true);
  const [weatherAlerts, setWeatherAlerts] = useState(false);
  const [showLangSheet, setShowLangSheet] = useState(false);
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('appLanguage') || 'en');

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
    <div className="flex flex-col h-full overflow-hidden bg-surface-containerLowest relative">
      <AppTopBar title="Farmer Profile" showProfile={false} />

      <div className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <main className="pt-4 pb-32 flex flex-col gap-8 bg-surface-containerLowest">

          {/* Header: Profile Info */}
          <section className="flex flex-col items-center text-center px-6 relative mt-4">
            <div className="absolute top-0 right-6">
              <button className="text-onSurface-variant hover:text-primary transition-colors p-2 flex items-center justify-center bg-transparent border-none cursor-pointer">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>edit</span>
              </button>
            </div>
            <div className="mb-4 w-28 h-28 rounded-full overflow-hidden shadow-sm mx-auto relative">
              <img
                alt="Profile"
                className="w-full h-full object-cover object-[center_20%] scale-150"
                src="/images/manjeet_profile.jpg"
              />
            </div>
            <h2 className="font-headline font-bold text-3xl text-onSurface mb-2 mt-0">Manjeet Lodha</h2>

            <div className="flex items-center justify-center gap-1.5 text-onSurface-variant font-body text-base">
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>location_on</span>
              <span>Guna, Madhya Pradesh</span>
            </div>
          </section>

          {/* Farm Summary Section */}
          <section className="flex gap-4 px-6">
            <div className="flex-1 bg-surface-containerLow rounded-2xl p-4 flex flex-col items-center justify-center">
              <p className="font-body text-xs text-onSurface-variant mb-1 uppercase tracking-wide m-0">Total Crops</p>
              <p className="font-headline font-bold text-2xl text-onSurface m-0">4</p>
            </div>
            <div className="flex-1 bg-surface-containerLow rounded-2xl p-4 flex flex-col items-center justify-center">
              <p className="font-body text-xs text-onSurface-variant mb-1 uppercase tracking-wide m-0">Active</p>
              <p className="font-headline font-bold text-2xl text-onSurface m-0">2</p>
            </div>
            <div className="flex-1 bg-surface-containerLow rounded-2xl p-4 flex flex-col items-center justify-center border border-outline-variant/30">
              <p className="font-body text-xs text-onSurface-variant mb-1 uppercase tracking-wide m-0">Recent</p>
              <p className="font-headline font-bold text-lg text-onSurface truncate w-full text-center m-0">Mustard</p>
            </div>
          </section>

          {/* My Crops */}
          <section className="flex flex-col px-6">
            <div className="flex justify-between items-end mb-4">
              <h3 className="font-headline font-bold text-2xl text-onSurface m-0">My Crops</h3>
              <button className="flex items-center gap-1 text-primary hover:text-primary-container font-label font-semibold text-sm transition-colors bg-transparent border-none cursor-pointer p-0">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>add</span>
                Add Crop
              </button>
            </div>
            <div className="flex flex-col border-t border-outline-variant/20">
              {/* Crop Item 1 */}
              <div className="py-5 flex gap-4 border-b border-outline-variant/20 relative group">
                <img
                  alt="Wheat Field"
                  className="w-24 h-24 rounded-xl object-cover bg-surface-container"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC15dhUgteuLPkntzyfAKpKCUrj-ZHud86VPm6NCV8d3dHdAaCFTEzSgxrKJuC3QuQVYdRRAn1CR9j5etaWrzbPfkqJAr2VqvWt8vXyhhAXoXGhuezNGjfmnrzBjqR7LC0mWFdK4GK5kjjykDolrY8PjAqsnvjgU9g_v4tI2_aZsIg9mxhNsTNRyyxQ3rAj9cEr6fA4lWASc-X-LYhy4O1Wnz2OAPPW2O8vcu5APhbxnm18UT10vEKoOlba2qOolMDdG7DeorHaEEw"
                />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-headline font-bold text-lg text-onSurface leading-tight m-0">Wheat</h4>
                    <button className="text-onSurface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0"><span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>edit</span></button>
                  </div>
                  <p className="font-body text-sm text-onSurface-variant mb-2 m-0">2.5 Acres</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-onSurface-variant text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>timeline</span>
                      <span className="font-body text-sm text-onSurface-variant">Growing stage</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-containerHigh w-fit">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      <span className="font-body text-xs font-semibold text-onSurface">Normal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crop Item 2 */}
              <div className="py-5 flex gap-4 border-b border-outline-variant/20 relative group">
                <img
                  alt="Mustard Field"
                  className="w-24 h-24 rounded-xl object-cover bg-surface-container"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuClIqHkGaZvSuMFWc5XnDHLyxTmM4NNewu0wh7PjDv-WWy0qsPhMSok9NkFtOSv6UwRW3SIW6aM_SFNAepwSrE9vRHjH4NxX7_VfCRRdeo7ivE9eUvTIpjxIN2BNeKnz-n6a6vh4_i0qHlCMlgJAzx7APm0uiNMwGAyJfLouZpp82P7ovSU68qTfrR8ntDnInl3miVwpvYFyD_NlK0CXJsBbiivxE91LmWmY-hZ02-wia7DrmfhYtBIX2-Y0YJ6RvP4VqosbbbfnoA"
                />
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-headline font-bold text-lg text-onSurface leading-tight m-0">Mustard</h4>
                    <button className="text-onSurface-variant hover:text-primary transition-colors bg-transparent border-none cursor-pointer p-0"><span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>edit</span></button>
                  </div>
                  <p className="font-body text-sm text-onSurface-variant mb-2 m-0">1.0 Acre</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-onSurface-variant text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>nest_eco_leaf</span>
                      <span className="font-body text-sm text-onSurface-variant">Sowing stage</span>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-error-container w-fit">
                      <span className="w-2 h-2 rounded-full bg-error"></span>
                      <span className="font-body text-xs font-semibold text-onErrorContainer">Needs Attention</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Farm Details Section */}
          <section className="flex flex-col px-6">
            <h3 className="font-headline font-bold text-xl text-onSurface mb-4 m-0">Farm Details</h3>
            <div className="flex flex-col divide-y divide-outline-variant/20 border-y border-outline-variant/20">
              <div className="flex justify-between items-center py-4">
                <span className="font-body text-base text-onSurface-variant">Total Land</span>
                <span className="font-headline font-semibold text-lg text-onSurface">3.5 Acres</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="font-body text-base text-onSurface-variant">Irrigation</span>
                <span className="font-headline font-semibold text-lg text-onSurface text-right max-w-[200px] truncate">Canal & Borewell</span>
              </div>
              <div className="flex justify-between items-center py-4">
                <span className="font-body text-base text-onSurface-variant">Soil Type</span>
                <span className="font-headline font-semibold text-lg text-onSurface">Alluvial Loam</span>
              </div>
            </div>
          </section>

          {/* Preferences */}
          <section className="flex flex-col gap-2 px-6 mb-4">
            <h3 className="font-headline font-bold text-xl text-onSurface mb-2 m-0">Preferences</h3>
            <div className="py-4 flex justify-between items-center border-b border-outline-variant/20">
              <span className="font-body text-lg text-onSurface">Price Alerts</span>
              {/* Toggle Switch */}
              <button
                onClick={() => setPriceAlerts(!priceAlerts)}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none border-none cursor-pointer ${priceAlerts ? 'bg-primary' : 'bg-surface-containerHighest border border-outline-variant/30'}`}
              >
                <span className={`${priceAlerts ? 'translate-x-7 bg-white' : 'translate-x-1 bg-outline'} inline-block h-6 w-6 transform rounded-full shadow transition-transform`}></span>
              </button>
            </div>
            <div className="py-4 flex justify-between items-center border-b border-outline-variant/20">
              <span className="font-body text-lg text-onSurface">Weather Alerts</span>
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
              <span className="font-body text-lg text-onSurface">Language</span>
              <div className="flex items-center gap-2">
                <span className="font-body text-base font-semibold text-onSurface-variant">{currentLangNative}</span>
                <span className="material-symbols-outlined text-onSurface-variant text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>expand_more</span>
              </div>
            </div>
          </section>

        </main>
      </div>

      <div className="absolute bottom-0 left-0 w-full z-40">
        <BottomTabs />
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
              <h2 className="font-headline font-bold text-xl text-onSurface m-0">Select Language</h2>
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