import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function DesktopSidebar({ collapsed = false, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  return (
    <aside
      className={`
        hidden md:flex flex-col h-screen sticky top-0
        bg-[#0A1F0D] text-white
        transition-all duration-300 ease-in-out z-50
        ${collapsed ? 'w-[72px]' : 'w-[260px]'}
        shrink-0 relative overflow-visible group/sidebar
      `}
    >
      {/* Invisible hover bridge along right border so approaching the edge also reveals the toggle */}
      <div className="hidden md:block absolute -right-3 top-0 bottom-0 w-6 z-40 pointer-events-auto" />

      {/* Internal Content Container - clips labels/logos neatly when collapsed */}
      <div className="flex flex-col h-full w-full overflow-hidden select-none">
        {/* Brand Header */}
        <div className={`flex items-center gap-3 px-5 h-20 shrink-0 border-b border-white/10 ${collapsed ? 'justify-center px-0' : 'py-3'}`}>
          {collapsed ? (
            <button
              onClick={onToggle}
              title="Expand sidebar"
              className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 overflow-hidden flex items-center justify-center shrink-0 shadow-sm p-1.5 hover:bg-white/20 transition-all cursor-pointer group/logo"
            >
              <img src="/images/logo-icon.png" alt="Logo" className="w-full h-full object-contain group-hover/logo:scale-105 transition-transform" />
            </button>
          ) : (
            <div className="w-full h-full flex items-center px-1 overflow-hidden">
              <img src="/images/logo-white.png" alt="NeoKrishiTech Logo" className="h-11 max-w-full object-contain" />
            </div>
          )}
        </div>

      {/* Primary Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : undefined}
              className={`
                flex items-center gap-3 w-full
                ${collapsed ? 'justify-center px-0 py-3' : 'px-4 py-2.5'}
                rounded-xl border-none cursor-pointer
                transition-all duration-200 group relative
                ${active
                  ? 'bg-white/15 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]'
                  : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5'
                }
              `}
            >
              {active && (
                <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#4CAF50] rounded-r-full shadow-[0_0_8px_rgba(76,175,80,0.5)]`} />
              )}
              <span
                className={`material-symbols-outlined text-[22px] shrink-0 transition-colors ${active ? 'text-[#88d982]' : ''}`}
                style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
              >
                {item.icon}
              </span>
              {!collapsed && (
                <span className={`text-[13px] font-semibold whitespace-nowrap ${active ? 'text-white' : ''}`}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}

        {/* Divider */}
        <div className={`h-px bg-white/10 my-3 ${collapsed ? 'mx-2' : 'mx-2'}`} />

        {/* Secondary Navigation */}
        {SECONDARY_ITEMS.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : undefined}
              className={`
                flex items-center gap-3 w-full
                ${collapsed ? 'justify-center px-0 py-2.5' : 'px-4 py-2'}
                rounded-xl border-none cursor-pointer
                transition-all duration-200
                ${active
                  ? 'bg-white/15 text-white'
                  : 'bg-transparent text-white/50 hover:text-white/80 hover:bg-white/5'
                }
              `}
            >
              <span className="material-symbols-outlined text-[20px] shrink-0" style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
                {item.icon}
              </span>
              {!collapsed && (
                <span className="text-[13px] font-medium whitespace-nowrap">{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Card (bottom) */}
      <div className={`shrink-0 border-t border-white/10 ${collapsed ? 'p-3 flex justify-center' : 'p-4'}`}>
        <div
          className={`flex items-center gap-3 cursor-pointer rounded-xl hover:bg-white/5 transition-colors ${collapsed ? 'p-0' : 'p-2'}`}
          onClick={() => navigate('/farmer/profile')}
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/20 shrink-0">
            <img
              src="/images/manjeet_profile.webp"
              alt="Profile"
              className="w-full h-full object-cover object-[center_20%] scale-150"
            />
          </div>
          {!collapsed && (
            <div className="flex flex-col overflow-hidden">
              <span className="text-[13px] font-semibold text-white truncate">Manjeet Lodha</span>
              <span className="text-[11px] text-white/40 truncate">Farmer • Guna, MP</span>
            </div>
          )}
        </div>
      </div>
      </div>

      {/* Toggle Arrow Button - Positioned exactly on the right border line, unclipped */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        title={collapsed ? "Expand sidebar (Click)" : "Collapse sidebar (Click)"}
        className={`
          hidden md:flex items-center justify-center
          w-7 h-7 rounded-full
          bg-[#0C2411] hover:bg-[#164720]
          text-[#88d982] hover:text-white
          border-[1.5px] border-[#2e7d32] hover:border-[#4caf50]
          shadow-[0_4px_12px_rgba(0,0,0,0.5),0_0_8px_rgba(46,125,50,0.35)]
          hover:shadow-[0_0_16px_rgba(76,175,80,0.7),0_4px_14px_rgba(0,0,0,0.4)]
          hover:scale-115 active:scale-95
          cursor-pointer
          absolute top-[26px] -right-3.5 z-50
          transition-all duration-200 ease-out
          opacity-0 translate-x-1 pointer-events-none
          group-hover/sidebar:opacity-100 group-hover/sidebar:translate-x-0 group-hover/sidebar:pointer-events-auto
          hover:!opacity-100 hover:!pointer-events-auto
        `}
      >
        <span className="material-symbols-outlined text-[17px] font-bold select-none leading-none">
          {collapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>
    </aside>
  );
}
