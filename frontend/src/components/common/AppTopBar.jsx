import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../store/CartContext';

const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'AI Diagnosis Alert', desc: 'Your Wheat crop might be at risk of Aphids due to recent humidity.', time: '10 min ago', icon: 'pest_control', path: '/farmer/diagnosis' },
  { id: 2, title: 'Irrigation Reminder', desc: 'Scheduled irrigation for Mustard field is due today at 5 PM.', time: '1 hour ago', icon: 'water_drop', path: '/farmer/home' },
  { id: 3, title: 'New Disease Identified', desc: 'Leaf blight detected in nearby farms. Check prevention tips.', time: '2 hours ago', icon: 'coronavirus', path: '/farmer/diagnosis' },
  { id: 4, title: 'Harvesting Soon', desc: 'Wheat crop is ready for harvest in 18 days. Prepare equipment.', time: '3 hours ago', icon: 'agriculture', path: '/farmer/home' },
  { id: 5, title: 'Expert Reply Received', desc: 'Dr. Sharma has answered your query regarding soil nutrients.', time: '5 hours ago', icon: 'support_agent', path: '/farmer/experts' },
  { id: 6, title: 'Upcoming Webinar', desc: 'Join the live session on modern farming techniques tomorrow.', time: '1 day ago', icon: 'video_camera_front', path: '/farmer/experts' },
  { id: 7, title: 'Mandi Price Update', desc: 'Tomato prices have surged by 10% in the local mandi.', time: '1 day ago', icon: 'trending_up', path: '/farmer/mandi' },
  { id: 8, title: 'New Crop Added', desc: 'You can now track Soyabean prices in your selected mandis.', time: '2 days ago', icon: 'add_circle', path: '/farmer/mandi' },
  { id: 9, title: 'Order Dispatched', desc: 'Your order for Neem Oil (1L) has been dispatched.', time: '2 days ago', icon: 'local_shipping', path: '/farmer/marketplace' },
  { id: 10, title: 'Discount on Seeds', desc: 'Get 20% off on hybrid Maize seeds. Offer ends soon!', time: '3 days ago', icon: 'percent', path: '/farmer/marketplace' },
  { id: 11, title: 'PM-Kisan Installment', desc: 'The 12th installment of PM-Kisan will be credited next week.', time: '3 days ago', icon: 'account_balance', path: '/farmer/subsidy' },
  { id: 12, title: 'New Scheme Available', desc: 'Apply for the new Solar Pump Subsidy scheme now.', time: '4 days ago', icon: 'solar_power', path: '/farmer/subsidy' },
  { id: 13, title: 'Heavy Rain Warning', desc: 'Expect heavy rainfall in Guna, Madhya Pradesh tomorrow afternoon.', time: '4 days ago', icon: 'thunderstorm', path: '/farmer/weather' },
  { id: 14, title: 'Favorable Weather', desc: 'Tomorrow is sunny and perfect for applying fertilizers.', time: '5 days ago', icon: 'wb_sunny', path: '/farmer/weather' },
  { id: 15, title: 'New Article Published', desc: 'Read our latest guide on organic pest management.', time: '1 week ago', icon: 'menu_book', path: '/farmer/learning' },
  { id: 16, title: 'Video Tutorial', desc: 'Watch how to setup drip irrigation step-by-step.', time: '1 week ago', icon: 'play_circle', path: '/farmer/learning' }
];

export default function AppTopBar({
  title = '',
  showBack = true,
  showNotification = false,
  showCart = false,
  showProfile = true,
  onBack,
}) {
  const navigate = useNavigate();
  const { cartCount } = useCart() || { cartCount: 0 };
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleBack = () => {
    if (onBack) onBack();
    else navigate(-1);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleNotifications = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleNotificationClick = (path) => {
    toggleNotifications();
    navigate(path);
  };

  return (
    <>
      <header className="shrink-0 flex items-center justify-between h-14 px-2 bg-primary-container relative z-40">
        <div className="flex items-center gap-1 min-w-[48px]">
          {showBack ? (
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors duration-200"
              onClick={handleBack}
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
          ) : (
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors duration-200"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          )}
        </div>

        <h1 className="flex-1 text-left font-headline font-bold text-lg text-white whitespace-nowrap overflow-hidden text-ellipsis px-1 m-0">
          {title}
        </h1>

        <div className="flex items-center justify-end gap-1 min-w-[48px]">
          {showNotification && (
            <button 
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors duration-200" 
              aria-label="Notifications"
              onClick={toggleNotifications}
            >
              <span className="material-symbols-outlined text-2xl">notifications</span>
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-primary-container"></span>
            </button>
          )}
          {showCart && (
            <button 
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/15 transition-colors duration-200" 
              aria-label="Cart"
              onClick={() => navigate('/farmer/cart')}
            >
              <span className="material-symbols-outlined text-2xl">shopping_cart</span>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold h-4 min-w-[16px] rounded-full flex items-center justify-center px-1 border border-primary-container">
                  {cartCount}
                </span>
              )}
            </button>
          )}
          {showProfile && (
            <button
              className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden hover:opacity-80 transition-opacity duration-200 border-2 border-white/20"
              aria-label="Profile"
              onClick={() => navigate('/farmer/profile')}
            >
              <img 
                src="/images/manjeet_profile.webp" 
                alt="Profile" 
                className="w-full h-full object-cover object-[center_20%] scale-150"
              />
            </button>
          )}
          {!showNotification && !showProfile && !showCart && (
            <div className="w-10 h-10" />
          )}
        </div>
      </header>

      {isMenuOpen && (
        <div className="absolute inset-0 bg-black/50 z-[1000] flex animate-[fadeIn_0.2s_ease-out]" onClick={toggleMenu}>
          <div className="w-4/5 max-w-[320px] h-full bg-white flex flex-col shadow-[2px_0_12px_rgba(0,0,0,0.1)] animate-[slideIn_0.3s_cubic-bezier(0.16,1,0.3,1)]" onClick={(e) => e.stopPropagation()}>
            <div className="pt-8 pb-6 px-5 bg-surface-light border-b border-black/5 flex justify-between items-start">
              <div className="flex flex-col gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 shadow-sm">
                  <img 
                    src="/images/manjeet_profile.webp" 
                    alt="Profile" 
                    className="w-full h-full object-cover object-[center_20%] scale-150"
                  />
                </div>
                <div>
                  <h2 className="font-headline font-bold text-lg text-[#1a1a1a] m-0">Manjeet Lodha</h2>
                </div>
              </div>
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#555] hover:bg-black/5 transition-colors" onClick={toggleMenu}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-4">
              <nav className="flex flex-col">
                <button className="flex items-center gap-4 py-4 px-6 w-full text-left text-[15px] font-medium text-[#333] hover:bg-[#f9f9f9] transition-colors" onClick={() => { navigate('/farmer/profile'); toggleMenu(); }}>
                  <span className="material-symbols-outlined text-[22px] text-[#666]">person</span>
                  My Profile
                </button>
                <button className="flex items-center gap-4 py-4 px-6 w-full text-left text-[15px] font-medium text-[#333] hover:bg-[#f9f9f9] transition-colors" onClick={() => { navigate('/farmer/orders'); toggleMenu(); }}>
                  <span className="material-symbols-outlined text-[22px] text-[#666]">shopping_bag</span>
                  My Orders
                </button>
                <button className="flex items-center gap-4 py-4 px-6 w-full text-left text-[15px] font-medium text-[#333] hover:bg-[#f9f9f9] transition-colors" onClick={() => { navigate('/farmer/subsidy'); toggleMenu(); }}>
                  <span className="material-symbols-outlined text-[22px] text-[#666]">description</span>
                  Govt. Schemes
                </button>
                <button className="flex items-center gap-4 py-4 px-6 w-full text-left text-[15px] font-medium text-[#333] hover:bg-[#f9f9f9] transition-colors" onClick={() => { navigate('/farmer/weather'); toggleMenu(); }}>
                  <span className="material-symbols-outlined text-[22px] text-[#666]">partly_cloudy_day</span>
                  Weather Alerts
                </button>
                <button className="flex items-center gap-4 py-4 px-6 w-full text-left text-[15px] font-medium text-[#333] hover:bg-[#f9f9f9] transition-colors" onClick={() => { navigate('/farmer/mandi'); toggleMenu(); }}>
                  <span className="material-symbols-outlined text-[22px] text-[#666]">storefront</span>
                  Mandi Updates
                </button>
                <div className="h-px bg-[#eee] my-3 mx-6"></div>
                <button className="flex items-center gap-4 py-4 px-6 w-full text-left text-[15px] font-medium text-[#333] hover:bg-[#f9f9f9] transition-colors" onClick={() => { navigate('/farmer/settings'); toggleMenu(); }}>
                  <span className="material-symbols-outlined text-[22px] text-[#666]">settings</span>
                  Settings
                </button>
                <button className="flex items-center gap-4 py-4 px-6 w-full text-left text-[15px] font-medium text-[#333] hover:bg-[#f9f9f9] transition-colors" onClick={() => { navigate('/farmer/help-support'); toggleMenu(); }}>
                  <span className="material-symbols-outlined text-[22px] text-[#666]">help</span>
                  Help & Support
                </button>
                <button className="flex items-center gap-4 py-4 px-6 w-full text-left text-[15px] font-medium text-red-600 hover:bg-[#f9f9f9] transition-colors" onClick={() => { navigate('/login'); toggleMenu(); }}>
                  <span className="material-symbols-outlined text-[22px] text-red-600">logout</span>
                  Logout
                </button>
              </nav>
            </div>
            <div className="p-5 text-center border-t border-[#f0f0f0]">
              <p className="m-0 text-[12px] text-[#999]">FarmIt v1.0.0</p>
            </div>
          </div>
        </div>
      )}

      {isNotificationOpen && (
        <div className="absolute inset-0 bg-black/50 z-[1000] flex animate-[fadeIn_0.2s_ease-out]" onClick={toggleNotifications}>
          <div className="w-[85%] max-w-[360px] h-full bg-white flex flex-col shadow-[-2px_0_12px_rgba(0,0,0,0.1)] animate-[slideInRight_0.3s_cubic-bezier(0.16,1,0.3,1)] ml-auto" onClick={(e) => e.stopPropagation()}>
            <div className="pt-5 pb-4 px-5 bg-surface-light border-b border-black/5 flex justify-between items-center">
              <h2 className="font-headline font-bold text-lg text-[#1a1a1a] m-0">Notifications</h2>
              <button className="w-9 h-9 rounded-full flex items-center justify-center text-[#555] hover:bg-black/5 transition-colors" onClick={toggleNotifications}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto py-2">
              {MOCK_NOTIFICATIONS.map((notif) => (
                <div 
                  key={notif.id} 
                  className="flex gap-4 py-4 px-5 border-b border-[#f5f5f5] cursor-pointer hover:bg-[#fcfcfc] transition-colors"
                  onClick={() => handleNotificationClick(notif.path)}
                >
                  <div className="w-10 h-10 rounded-full bg-[#e2f0dd] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary-container text-xl">{notif.icon}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-semibold text-[14px] text-[#1a1a1a] m-0">{notif.title}</h4>
                    <p className="text-[13px] text-[#666] m-0 leading-[1.4]">{notif.desc}</p>
                    <span className="text-[11px] text-[#999] font-medium mt-0.5">{notif.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
