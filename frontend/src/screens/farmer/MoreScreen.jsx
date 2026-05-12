import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';

const GRID_ITEMS = [
  { icon: 'description',   label: 'Subsidy Guide',   iconClass: 'bg-primary-container text-white',   route: '/farmer/subsidy'     },
  { icon: 'school',        label: 'Learning Hub',    iconClass: 'bg-secondary-container text-onSecondary-container',  route: '/farmer/learning'    },
  { icon: 'shopping_bag',  label: 'Marketplace',     iconClass: 'bg-[#ffb957] text-[#2a1800]',   route: '/farmer/marketplace' },
  { icon: 'cloud',         label: 'Weather Detail',  iconClass: 'bg-surface-variant text-onSurface-variant',    route: '/farmer/weather'     },
  { icon: 'person',        label: 'Profile',         iconClass: 'bg-surface-variant text-onSurface-variant',    route: '/farmer/profile'     },
  { icon: 'settings',      label: 'Settings',        iconClass: 'bg-surface-variant text-onSurface-variant',    route: '/farmer/profile'     },
];

export default function More() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t, i18n } = useTranslation();
  const [showLangSheet, setShowLangSheet] = useState(false);
  const [currentLang, setCurrentLang] = useState(i18n.language || 'en');

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

  const handleLogout = () => {
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full w-full relative bg-surface overflow-hidden">

      {/* ── Blurred background ───────────────── */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#c8e6c9] via-[#a5d6a7] to-[#81c784] z-0" aria-hidden="true" />

      {/* ── Bottom Sheet ─────────────────────── */}
      <div className="absolute bottom-0 left-0 right-0 top-[52px] bg-white rounded-t-[32px] flex flex-col z-10 shadow-[0_-8px_32px_rgba(15,31,17,0.12)] pb-[88px] overflow-hidden">

        {/* Drag Handle */}
        <div className="flex justify-center pt-3.5 pb-2.5 shrink-0 bg-white/90 backdrop-blur-md">
          <div className="w-12 h-[5px] bg-[#bfcaba] rounded-full opacity-60" />
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-5 pt-1 pb-6 flex flex-col gap-7 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

          {/* ── Profile Snippet ─────────────── */}
          <div
            className="flex items-center gap-3.5 py-3.5 px-4 bg-surface-containerLow rounded-[18px] cursor-pointer transition-colors duration-200 hover:bg-surface-container"
            role="button"
            onClick={() => navigate('/farmer/profile')}
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEb0sZMqDMto5a4tOacryaoNpPVY9MFLppg4BPXQvlaHB2Us8kPTKPfAbdFIhSNX7Rb_A7sCtfIIbpPa1UGC2S36bJhZEiGYgPh4CpwHnDY8PiicAlajxrkZNDMtLO5PIc9kMRn8ByNuiw21_ac33FkkRINFOK-nC1nYCIxl-tcsVWNEybcpX4YVHGp1qxguwhVAfgeEsbP8bz-u9fEzdLnGZ2Z0Len8dJTaHNWZQQrHMuNIpi_WOizy_y4dE7qttRWhgHGdFEEqk"
              alt="Farmer profile"
              className="w-[54px] h-[54px] rounded-full object-cover border-[2.5px] border-primary-fixed shrink-0"
            />
            <div className="flex-1">
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-onSurface m-0">Ramesh Kumar</h2>
              <p className="font-['Be_Vietnam_Pro',sans-serif] text-[13px] text-onSurface-variant mt-0.5 m-0">Premium Member</p>
            </div>
            <button className="w-9 h-9 rounded-full bg-white border-none flex items-center justify-center text-primary cursor-pointer shadow-[0_4px_12px_rgba(15,31,17,0.08)] transition-colors duration-200 hover:bg-surface-containerLow" aria-label="View profile">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* ── Explore Grid ────────────────── */}
          <section className="flex flex-col gap-3.5">
            <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[11px] tracking-[0.1em] uppercase text-onSurface-variant px-0.5 m-0">{t('more.exploreNeoKrishi')}</h3>
            <div className="grid grid-cols-2 gap-3">
              {GRID_ITEMS.map(({ icon, label, iconClass, route }) => (
                <button
                  key={label}
                  className="bg-surface-containerLow border-none rounded-[18px] pt-[18px] px-4 pb-4 flex flex-col items-start gap-3 cursor-pointer transition-all duration-200 hover:bg-surface-containerHigh hover:-translate-y-px active:scale-[0.97] text-left"
                  onClick={() => navigate(route)}
                >
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${iconClass}`}>
                    <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      {icon}
                    </span>
                  </div>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-semibold text-[13px] text-onSurface leading-[1.3]">{label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* ── Account & Support ───────────── */}
          <section className="flex flex-col gap-3.5">
            <h3 className="font-['Be_Vietnam_Pro',sans-serif] font-semibold text-[11px] tracking-[0.1em] uppercase text-onSurface-variant px-0.5 m-0">{t('more.accountSupport')}</h3>
            <div className="flex flex-col gap-0.5">
              <button className="w-full flex items-center gap-3.5 py-3.5 px-3 rounded-2xl border-none bg-transparent cursor-pointer text-left transition-colors duration-200 hover:bg-surface-containerLow" onClick={() => setShowLangSheet(true)}>
                <span className="material-symbols-outlined text-[22px] text-outline shrink-0">language</span>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-medium text-[14px] text-onSurface flex-1">{t('common.language')}</span>
                <span className="font-['Be_Vietnam_Pro',sans-serif] text-[13px] text-onSurface-variant">{currentLangNative}</span>
                <span className="material-symbols-outlined text-[18px] text-[#bfcaba]">chevron_right</span>
              </button>
              <button className="w-full flex items-center gap-3.5 py-3.5 px-3 rounded-2xl border-none bg-transparent cursor-pointer text-left transition-colors duration-200 hover:bg-surface-containerLow">
                <span className="material-symbols-outlined text-[22px] text-outline shrink-0">help</span>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-medium text-[14px] text-onSurface flex-1">{t('more.helpSupport')}</span>
                <span className="material-symbols-outlined text-[18px] text-[#bfcaba]">chevron_right</span>
              </button>
              <button className="w-full flex items-center gap-3.5 py-3.5 px-3 rounded-2xl border-none bg-transparent cursor-pointer text-left transition-colors duration-200 hover:bg-[#fff1f0]" onClick={handleLogout}>
                <span className="material-symbols-outlined text-[22px] text-error shrink-0">logout</span>
                <span className="font-['Be_Vietnam_Pro',sans-serif] font-medium text-[14px] text-error flex-1">{t('common.logout')}</span>
              </button>
            </div>
          </section>

          {/* ── Social Section ──────────────── */}
          <section className="flex flex-col items-center gap-3.5 pb-2">
            <p className="font-['Be_Vietnam_Pro',sans-serif] text-[12px] text-onSurface-variant m-0">{t('more.connectFarmIt')}</p>
            <div className="flex gap-3.5">
              <button className="w-10 h-10 rounded-full border-none bg-surface-container text-primary flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-primary-container hover:text-white active:scale-[0.92]" aria-label="Share">
                <span className="material-symbols-outlined text-[20px]">share</span>
              </button>
              <button className="w-10 h-10 rounded-full border-none bg-surface-container text-primary flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-primary-container hover:text-white active:scale-[0.92]" aria-label="Like">
                <span className="material-symbols-outlined text-[20px]">thumb_up</span>
              </button>
              <button className="w-10 h-10 rounded-full border-none bg-surface-container text-primary flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-primary-container hover:text-white active:scale-[0.92]" aria-label="Watch">
                <span className="material-symbols-outlined text-[20px]">play_arrow</span>
              </button>
            </div>
          </section>

        </div>{/* end sheet body */}
      </div>{/* end sheet */}

      {/* ── Language Selection Sheet ────────── */}
      {showLangSheet && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }} onClick={() => setShowLangSheet(false)}>
          <div style={{
            backgroundColor: '#ebffe7',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '24px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--font-headline)', color: '#0d631b', fontSize: '18px' }}>{t('common.selectLanguage')}</h3>
              <button onClick={() => setShowLangSheet(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#40493d' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => {
                    setCurrentLang(l.code);
                    i18n.changeLanguage(l.code);
                    localStorage.setItem('appLanguage', l.code);
                    setShowLangSheet(false);
                  }}
                  style={{
                    padding: '16px',
                    borderRadius: '16px',
                    border: currentLang === l.code ? '2px solid #0d631b' : '1px solid #bfcaba',
                    backgroundColor: currentLang === l.code ? '#e5f9e2' : '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-headline)', fontWeight: 'bold', color: '#0f1f11', fontSize: '16px' }}>{l.native}</span>
                  <span style={{ fontFamily: 'var(--font-body)', color: '#40493d', fontSize: '12px' }}>{l.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Bottom Nav — Mobile only ── */}
          </div>
  );
}