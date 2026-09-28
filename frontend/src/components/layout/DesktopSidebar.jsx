import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function DesktopSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
  const leaveTimerRef = useRef(null);

  const NAV_ITEMS = [
    { label: t('nav.dashboard'), icon: 'dashboard', path: '/farmer/home' },
    { label: t('nav.weather'), icon: 'partly_cloudy_day', path: '/farmer/weather' },
    { label: t('nav.cropHealth'), icon: 'medical_services', path: '/farmer/diagnosis' },
    { label: t('nav.mandiPrices'), icon: 'storefront', path: '/farmer/mandi' },
    { label: t('nav.marketplace'), icon: 'shopping_cart', path: '/farmer/marketplace' },
    { label: t('nav.learningHub'), icon: 'school', path: '/farmer/learning' },
    { label: t('nav.experts'), icon: 'psychology', path: '/farmer/experts' },
    { label: t('nav.aiAssistant'), icon: 'smart_toy', path: '/farmer/ai-assistant' },
  ];

  const SECONDARY_ITEMS = [
    { label: t('nav.govtSchemes'), icon: 'account_balance', path: '/farmer/subsidy' },
    { label: t('nav.myOrders'), icon: 'shopping_bag', path: '/farmer/orders' },
    { label: t('nav.profile'), icon: 'person', path: '/farmer/profile' },
    { label: t('nav.settings'), icon: 'settings', path: '/farmer/settings' },
    { label: t('nav.help'), icon: 'help', path: '/farmer/help-support' },
  ];

  const isActive = (path) => {
    if (path === '/farmer/home') {
      return location.pathname === '/farmer/home';
    }
    return location.pathname.startsWith(path);
  };

  const handleMouseEnter = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        hidden md:flex flex-col h-screen sticky top-0
        bg-[#0A1F0D] text-white
        transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] z-40
        ${isHovered ? 'w-[260px] border-r border-white/10' : 'w-[72px] border-r border-white/5'}
        shrink-0 overflow-hidden select-none
      `}
    >
        {/* Brand Header */}
        <div className="flex items-center h-20 shrink-0 border-b border-white/10 px-3 relative overflow-hidden">
          {/* Collapsed Icon Mark */}
          <div
            className={`
              absolute left-0 right-0 flex items-center justify-center
              transition-all duration-200
              ${isHovered ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}
            `}
          >
            <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 overflow-hidden flex items-center justify-center shrink-0 shadow-sm p-1.5">
              <img src="/images/logo-icon.png" alt="FarmIt" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Expanded Full Logo */}
          <div
            className={`
              w-full h-full flex items-center px-2
              transition-all duration-200
              ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
            `}
          >
            <img src="/images/logo-white.png" alt="FarmIt Logo" className="h-11 max-w-[210px] object-contain" />
          </div>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2.5 flex flex-col gap-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                title={!isHovered ? item.label : undefined}
                className={`
                  flex items-center w-full rounded-xl border-none cursor-pointer
                  transition-all duration-200 group relative
                  ${isHovered ? 'px-3.5 py-2.5 gap-3.5 justify-start' : 'px-0 py-3 justify-center'}
                  ${active
                    ? 'bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]'
                    : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#4CAF50] rounded-r-full shadow-[0_0_8px_rgba(76,175,80,0.5)]" />
                )}
                <span
                  className={`material-symbols-outlined text-[22px] shrink-0 transition-colors ${active ? 'text-[#88d982]' : ''}`}
                  style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                <span
                  className={`
                    text-[13px] font-semibold whitespace-nowrap overflow-hidden transition-all duration-200
                    ${active ? 'text-white' : ''}
                    ${isHovered ? 'opacity-100 max-w-[170px]' : 'opacity-0 max-w-0 pointer-events-none'}
                  `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* Divider */}
          <div className="h-px bg-white/10 my-3 mx-2" />

          {/* Secondary Navigation */}
          {SECONDARY_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                title={!isHovered ? item.label : undefined}
                className={`
                  flex items-center w-full rounded-xl border-none cursor-pointer
                  transition-all duration-200
                  ${isHovered ? 'px-3.5 py-2 gap-3.5 justify-start' : 'px-0 py-2.5 justify-center'}
                  ${active
                    ? 'bg-white/15 text-white'
                    : 'bg-transparent text-white/50 hover:text-white/80 hover:bg-white/5'
                  }
                `}
              >
                <span className="material-symbols-outlined text-[20px] shrink-0" style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                  {item.icon}
                </span>
                <span
                  className={`
                    text-[13px] font-medium whitespace-nowrap overflow-hidden transition-all duration-200
                    ${isHovered ? 'opacity-100 max-w-[170px]' : 'opacity-0 max-w-0 pointer-events-none'}
                  `}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* User Profile Card (bottom) */}
        <div className={`shrink-0 border-t border-white/10 ${isHovered ? 'p-3.5' : 'p-3 flex justify-center'}`}>
          <div
            className={`flex items-center cursor-pointer rounded-xl hover:bg-white/5 transition-colors ${isHovered ? 'p-2 gap-3 justify-start' : 'p-0 justify-center'}`}
            onClick={() => navigate('/farmer/profile')}
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
              <img
                src="/images/manjeet_profile.webp"
                alt="Profile"
                className="w-full h-full object-cover object-[center_20%] scale-150"
              />
            </div>
            <div
              className={`
                flex flex-col overflow-hidden transition-all duration-200
                ${isHovered ? 'opacity-100 max-w-[165px]' : 'opacity-0 max-w-0 pointer-events-none'}
              `}
            >
              <span className="text-[13px] font-semibold text-white truncate">Manjeet Lodha</span>
              <span className="text-[11px] text-white/40 truncate">Farmer • Guna, MP</span>
            </div>
          </div>
        </div>
      </aside>
  );
}
