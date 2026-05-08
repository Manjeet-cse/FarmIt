import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: 'dashboard', path: '/farmer/home' },
  { label: 'Weather', icon: 'partly_cloudy_day', path: '/farmer/weather' },
  { label: 'Crop Health', icon: 'medical_services', path: '/farmer/diagnosis' },
  { label: 'Mandi Prices', icon: 'storefront', path: '/farmer/mandi' },
  { label: 'Marketplace', icon: 'shopping_cart', path: '/farmer/marketplace' },
  { label: 'Learning Hub', icon: 'school', path: '/farmer/learning' },
  { label: 'Experts', icon: 'psychology', path: '/farmer/experts' },
  { label: 'AI Assistant', icon: 'smart_toy', path: '/farmer/ai-assistant' },
];

const SECONDARY_ITEMS = [
  { label: 'Govt Schemes', icon: 'account_balance', path: '/farmer/subsidy' },
  { label: 'My Orders', icon: 'shopping_bag', path: '/farmer/orders' },
  { label: 'Profile', icon: 'person', path: '/farmer/profile' },
  { label: 'Settings', icon: 'settings', path: '/farmer/settings' },
  { label: 'Help', icon: 'help', path: '/farmer/help-support' },
];

export default function DesktopSidebar({ collapsed = false, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

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
        shrink-0 overflow-hidden
      `}
    >
      {/* Brand Header */}
      <div className={`flex items-center gap-3 px-5 h-16 shrink-0 border-b border-white/10 ${collapsed ? 'justify-center px-0' : ''}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4CAF50] to-[#2E7D32] flex items-center justify-center shrink-0 shadow-lg shadow-green-900/30">
          <span className="material-symbols-outlined text-white text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
        </div>
        {!collapsed && (
          <div className="flex flex-col overflow-hidden">
            <span className="font-headline font-bold text-[15px] text-white leading-tight whitespace-nowrap">FarmIt</span>
            <span className="text-[10px] text-white/50 font-medium tracking-wider uppercase">NeoKrishiTech</span>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={`
          hidden lg:flex items-center justify-center
          w-7 h-7 rounded-full bg-white/10 hover:bg-white/20
          text-white/70 hover:text-white
          transition-all duration-200
          absolute top-4 -right-3.5 z-50
          border border-white/10 shadow-md
          cursor-pointer
        `}
      >
        <span className="material-symbols-outlined text-[16px]">
          {collapsed ? 'chevron_right' : 'chevron_left'}
        </span>
      </button>

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
              src="/images/manjeet_profile.jpg"
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
    </aside>
  );
}
