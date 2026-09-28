import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../store/CartContext';

const ROUTE_TITLES = {
  '/farmer/home': 'Dashboard',
  '/farmer/weather': 'Weather Intelligence',
  '/farmer/diagnosis': 'Crop Health',
  '/farmer/mandi': 'Mandi Prices',
  '/farmer/marketplace': 'Marketplace',
  '/farmer/learning': 'Learning Hub',
  '/farmer/experts': 'Expert Connect',
  '/farmer/expert-booking': 'Book Expert',
  '/farmer/expert-chat': 'Expert Chat',
  '/farmer/ai-assistant': 'AI Assistant',
  '/farmer/subsidy': 'Govt Schemes',
  '/farmer/profile': 'Profile',
  '/farmer/orders': 'My Orders',
  '/farmer/cart': 'Cart',
  '/farmer/checkout': 'Checkout',
  '/farmer/settings': 'Settings',
  '/farmer/help-support': 'Help & Support',
  '/farmer/more': 'More',
  '/farmer/order-success': 'Order Placed',
};

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Crop Health Alert', desc: 'Wheat crop might be at risk of Aphids.', time: '10 min ago', icon: 'pest_control', path: '/farmer/diagnosis' },
  { id: 2, title: 'Irrigation Reminder', desc: 'Scheduled irrigation for Mustard field is due today.', time: '1 hour ago', icon: 'water_drop', path: '/farmer/home' },
  { id: 3, title: 'Mandi Price Update', desc: 'Tomato prices surged by 10% in local mandi.', time: '2 hours ago', icon: 'trending_up', path: '/farmer/mandi' },
  { id: 4, title: 'Expert Reply', desc: 'Dr. Sharma answered your soil query.', time: '3 hours ago', icon: 'support_agent', path: '/farmer/experts' },
  { id: 5, title: 'Heavy Rain Warning', desc: 'Heavy rainfall expected tomorrow afternoon.', time: '5 hours ago', icon: 'thunderstorm', path: '/farmer/weather' },
];

export default function TopNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart() || { cartCount: 0 };
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const pageTitle = ROUTE_TITLES[location.pathname] || 'FarmIt';

  return (
    <header className="hidden md:flex items-center h-16 px-6 bg-white/80 backdrop-blur-xl border-b border-[#d4e8d1]/40 sticky top-0 z-40 gap-4 shrink-0">
      {/* Page Title */}
      <h1 className="font-headline font-bold text-xl text-onSurface m-0 whitespace-nowrap shrink-0">
        {pageTitle}
      </h1>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Search Bar */}
      <div className="hidden lg:flex items-center gap-2 bg-surface-containerHigh/80 rounded-xl px-4 py-2 w-[320px] max-w-[400px] transition-all duration-200 focus-within:ring-2 focus-within:ring-primary/30 focus-within:bg-white focus-within:shadow-sm">
        <span className="material-symbols-outlined text-onSurface-variant text-[20px]">search</span>
        <input
          className="flex-1 bg-transparent border-none outline-none font-body text-sm text-onSurface placeholder:text-onSurface-variant/60"
          placeholder="Search crops, weather, prices..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container text-[10px] font-mono text-onSurface-variant font-bold border border-outline-variant/30">
          ⌘K
        </kbd>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        {/* Location */}
        <button className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-containerLow hover:bg-surface-container transition-colors border-none cursor-pointer text-onSurface-variant">
          <span className="material-symbols-outlined text-[18px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
          <span className="text-[13px] font-semibold text-onSurface whitespace-nowrap">Guna, MP</span>
        </button>

        {/* Cart */}
        <button
          className="relative w-10 h-10 rounded-xl flex items-center justify-center text-onSurface-variant hover:bg-surface-containerHigh hover:text-primary transition-colors border-none cursor-pointer bg-transparent"
          onClick={() => navigate('/farmer/cart')}
        >
          <span className="material-symbols-outlined text-[22px]">shopping_cart</span>
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-500 text-white text-[9px] font-bold h-4 min-w-[16px] rounded-full flex items-center justify-center px-1">
              {cartCount}
            </span>
          )}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            className="relative w-10 h-10 rounded-xl flex items-center justify-center text-onSurface-variant hover:bg-surface-containerHigh hover:text-primary transition-colors border-none cursor-pointer bg-transparent"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
              <div className="absolute right-0 top-12 w-[360px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-[#d4e8d1]/30 z-50 overflow-hidden animate-[fadeSlideDown_0.2s_ease-out]">
                <div className="px-5 py-4 border-b border-[#f0f0f0] flex justify-between items-center">
                  <h3 className="font-headline font-bold text-base text-onSurface m-0">Notifications</h3>
                  <button className="text-primary text-xs font-bold bg-transparent border-none cursor-pointer">Mark all read</button>
                </div>
                <div className="max-h-[400px] overflow-y-auto [scrollbar-width:thin]">
                  {MOCK_NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className="flex gap-3 px-5 py-3.5 hover:bg-surface-containerLow cursor-pointer transition-colors border-b border-[#f8f8f8] last:border-0"
                      onClick={() => { setShowNotifications(false); navigate(n.path); }}
                    >
                      <div className="w-9 h-9 rounded-full bg-[#e2f0dd] flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-primary text-[18px]">{n.icon}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <h4 className="font-semibold text-[13px] text-onSurface m-0 truncate">{n.title}</h4>
                        <p className="text-[12px] text-onSurface-variant m-0 line-clamp-1">{n.desc}</p>
                        <span className="text-[11px] text-outline mt-0.5">{n.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Avatar */}
        <button
          className="w-9 h-9 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-colors cursor-pointer shrink-0 ml-1"
          onClick={() => navigate('/farmer/profile')}
        >
          <img
            src="/images/manjeet_profile.webp"
            alt="Profile"
            className="w-full h-full object-cover object-[center_20%] scale-150"
          />
        </button>
      </div>
    </header>
  );
}
