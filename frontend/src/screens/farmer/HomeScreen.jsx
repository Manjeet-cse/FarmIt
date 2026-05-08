import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabs from '../../components/layout/BottomTabs';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';

export default function Home() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const isMobile = useIsMobile();

  // Restore scroll position when returning from sub-screens
  useEffect(() => {
    const saved = sessionStorage.getItem('home_scroll');
    if (saved && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(saved, 10);
      sessionStorage.removeItem('home_scroll');
    }
  }, []);

  const navigateTo = (path) => {
    if (scrollRef.current) {
      sessionStorage.setItem('home_scroll', scrollRef.current.scrollTop);
    }
    navigate(path);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface-light font-body text-onSurface">
      {/* Top App Bar — Mobile only */}
      {isMobile && (
        <AppTopBar 
          title="NeoKrishiTech" 
          showBack={false} 
          showNotification={true} 
        />
      )}

      {/* Main Content Area */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="page-content flex flex-col gap-8">
          
          {/* Desktop Welcome Banner */}
          {!isMobile && (
            <section className="bg-gradient-to-r from-[#0A1F0D] to-[#1B5E20] rounded-2xl p-6 lg:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4CAF50]/10 rounded-full blur-3xl -mr-20 -mt-20" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h1 className="font-headline font-bold text-2xl lg:text-3xl text-white mb-2">Good Evening, Manjeet 👋</h1>
                  <p className="text-white/70 text-sm lg:text-base">Your crops are looking great today. Here's your farm overview.</p>
                </div>
                <div className="hidden xl:flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10">
                  <span className="material-symbols-outlined text-[#88d982] text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>wb_sunny</span>
                  <div>
                    <p className="text-white font-bold text-lg m-0">28°C</p>
                    <p className="text-white/60 text-xs m-0">Sunny • Guna, MP</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Dashboard Grid — 2 columns on desktop */}
          <div className="dashboard-grid">

            {/* SECTION 1: Your Crops */}
            <section className="full-span">
              <h2 className="font-headline font-bold text-lg md:text-xl mb-4 text-onSurface mt-0">Your Crops</h2>
              <div className="flex md:grid md:grid-cols-2 xl:grid-cols-3 gap-4 overflow-x-auto md:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
                {/* Wheat Card */}
                <div className="min-w-[260px] md:min-w-0 bg-surface-containerLowest rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col card-hover">
                  <div className="h-32 md:h-40 bg-[#e5e5e5]">
                    <img 
                      className="w-full h-full object-cover"
                      alt="Wheat field" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrnaOut2o3NiA8wuftZUesZmlTSSIGvCnzuiXGtIXxm8niujcsKrNac6pWYe7ml22n1uxVg7TjvWA4lBmXVFbreYXQy2GZjku-GXmQH7cBOgaSse4x_j1EMcF1kL6UvGW1mKHMrMfceUZMPAXh8XRQM6C3K1S7KEH4sZHCi1fx6klAz_ebFqG565PWV03RQj14gtZKZQkJYSBqph0YY4OMY-SXETlmtATPXvEQCQ9DCVq8RMurGP8552dl3DnaMJoA8I1MEPvlFjU"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-onSurface text-base m-0">Wheat</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase bg-primary/10 text-[#006e1c]">HEALTHY</span>
                    </div>
                    <div className="bg-[#e5f9e2] p-2 rounded-lg border-l-2 border-[#006e1c]">
                      <p className="text-[10px] text-[#006e1c] font-medium leading-tight m-0">
                        <span className="material-symbols-outlined text-[12px] align-middle mr-1">check_circle</span> 
                        Crop is healthy. Continue current irrigation schedule.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-onSurface-variant">Growth: 65%</span>
                        <span className="text-onSurface-variant font-medium text-primary">Stage: Grain Filling</span>
                      </div>
                      <div className="w-full bg-surface-container h-1.5 rounded-full">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col gap-3">
                      <div className="px-3 py-1 text-[10px] font-semibold rounded-lg inline-block self-start bg-[#ffb957]/20 text-[#643f00]">
                        Next: Harvesting in 18 days
                      </div>
                      <button className="w-full p-2 border border-primary text-primary text-xs font-bold rounded-xl bg-transparent transition-transform cursor-pointer active:scale-95 hover:bg-primary hover:text-white">View Schedule</button>
                    </div>
                  </div>
                </div>

                {/* Mustard Card */}
                <div className="min-w-[260px] md:min-w-0 bg-surface-containerLowest rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col border-l-4 border-error/50 card-hover">
                  <div className="h-32 md:h-40 bg-[#e5e5e5]">
                    <img 
                      className="w-full h-full object-cover"
                      alt="Mustard field" 
                      src="/mustard_field.png"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-onSurface text-base m-0">Mustard</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase bg-tertiary/10 text-tertiary">Needs Attention</span>
                    </div>
                    <div className="bg-[#ffdad6]/50 p-2 rounded-lg border-l-2 border-error">
                      <p className="text-[10px] text-[#93000a] font-medium leading-tight m-0">
                        <span className="material-symbols-outlined text-[12px] align-middle mr-1">warning</span> 
                        Aphid attack risk detected. Spray Neem oil today.
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-onSurface-variant">Growth: 40%</span>
                      </div>
                      <div className="w-full bg-surface-container h-1.5 rounded-full">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col gap-3">
                      <div className="px-3 py-1 text-[10px] font-semibold rounded-lg inline-block self-start bg-surface-containerHigh text-onSurface-variant">
                        Next: Irrigation in 2 days
                      </div>
                      <button className="w-full p-2 border border-error text-error text-xs font-bold rounded-xl bg-transparent transition-transform cursor-pointer active:scale-95 hover:bg-error hover:text-white">Take Action</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: Weather Dashboard */}
            <section className="bg-surface-containerLowest rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col gap-4 cursor-pointer transition-all active:scale-[0.98] card-hover" onClick={() => navigateTo('/farmer/weather')}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-1 text-onSurface-variant">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    <span className="text-xs font-semibold">Guna, Madhya Pradesh</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[30px] font-bold">28°C</span>
                    <span className="material-symbols-outlined text-[30px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>wb_sunny</span>
                    <span className="text-sm font-medium text-onSurface-variant">• Sunny</span>
                  </div>
                </div>
                <div className="text-right flex flex-col gap-1">
                  <p className="text-[10px] font-medium text-onSurface-variant m-0">Humidity: 45%</p>
                  <p className="text-[10px] font-medium text-onSurface-variant m-0">Wind: 12 km/h</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#d4e8d1]/30">
                <p className="text-[11px] font-bold text-onSurface mb-2 mt-0">Weather Impact on Your Crops</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-[#006e1c]/10 text-[#006e1c]">Wheat (Safe)</span>
                  <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-tertiary/10 text-tertiary">Mustard (Risk)</span>
                  <span className="px-3 py-1 text-[10px] font-bold rounded-full bg-[#ba1a1a]/10 text-error">Spray before 8 AM</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="bg-surface-containerLow rounded-xl p-2 text-center">
                  <p className="text-[10px] font-medium mb-1 mt-0">Tomorrow</p>
                  <span className="material-symbols-outlined text-[18px] text-[#006e1c]">partly_cloudy_day</span>
                  <p className="text-xs font-bold mt-1 mb-0">26°</p>
                </div>
                <div className="bg-surface-containerLow rounded-xl p-2 text-center">
                  <p className="text-[10px] font-medium mb-1 mt-0">Wed</p>
                  <span className="material-symbols-outlined text-[18px] text-primary">cloudy_snowing</span>
                  <p className="text-xs font-bold mt-1 mb-0">22°</p>
                </div>
                <div className="bg-surface-containerLow rounded-xl p-2 text-center">
                  <p className="text-[10px] font-medium mb-1 mt-0">Thu</p>
                  <span className="material-symbols-outlined text-[18px] text-[#ffb957]">wb_sunny</span>
                  <p className="text-xs font-bold mt-1 mb-0">29°</p>
                </div>
              </div>
            </section>

            {/* SECTION 3: Quick Actions Grid */}
            <section>
              <h2 className="font-headline font-bold text-lg md:text-xl mb-4 text-onSurface mt-0">Quick Actions</h2>
              <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4">
                <div className="group flex flex-col items-center gap-2 cursor-pointer transition-transform" onClick={() => navigateTo('/farmer/diagnosis')}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-active:scale-90 group-hover:scale-105 bg-[#006e1c]/10 text-[#006e1c]">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>medical_services</span>
                  </div>
                  <span className="text-[10px] font-bold text-center leading-tight">AI Diagnosis</span>
                </div>
                <div className="group flex flex-col items-center gap-2 cursor-pointer transition-transform" onClick={() => navigateTo('/farmer/marketplace')}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-active:scale-90 group-hover:scale-105 bg-tertiary/10 text-tertiary">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
                  </div>
                  <span className="text-[10px] font-bold text-center leading-tight">Marketplace</span>
                </div>
                <div className="group flex flex-col items-center gap-2 cursor-pointer transition-transform" onClick={() => navigateTo('/farmer/experts')}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-active:scale-90 group-hover:scale-105 bg-[#DBEAFE] text-[#1D4ED8]">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>psychology</span>
                  </div>
                  <span className="text-[10px] font-bold text-center leading-tight">Ask an Expert</span>
                </div>
                <div className="group flex flex-col items-center gap-2 cursor-pointer transition-transform" onClick={() => navigateTo('/farmer/subsidy')}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-active:scale-90 group-hover:scale-105 bg-[#F3E8FF] text-[#7E22CE]">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                  </div>
                  <span className="text-[10px] font-bold text-center leading-tight">Govt Schemes</span>
                </div>
                {/* Desktop-only extra actions */}
                <div className="hidden lg:flex group flex-col items-center gap-2 cursor-pointer transition-transform" onClick={() => navigateTo('/farmer/mandi')}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-active:scale-90 group-hover:scale-105 bg-[#FEF3C7] text-[#D97706]">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>storefront</span>
                  </div>
                  <span className="text-[10px] font-bold text-center leading-tight">Mandi Prices</span>
                </div>
                <div className="hidden lg:flex group flex-col items-center gap-2 cursor-pointer transition-transform" onClick={() => navigateTo('/farmer/learning')}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-active:scale-90 group-hover:scale-105 bg-[#E0F2FE] text-[#0284C7]">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
                  </div>
                  <span className="text-[10px] font-bold text-center leading-tight">Learning</span>
                </div>
                <div className="hidden lg:flex group flex-col items-center gap-2 cursor-pointer transition-transform" onClick={() => navigateTo('/farmer/weather')}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-active:scale-90 group-hover:scale-105 bg-[#ECFDF5] text-[#059669]">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>partly_cloudy_day</span>
                  </div>
                  <span className="text-[10px] font-bold text-center leading-tight">Weather</span>
                </div>
                <div className="hidden lg:flex group flex-col items-center gap-2 cursor-pointer transition-transform" onClick={() => navigateTo('/farmer/ai-assistant')}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-active:scale-90 group-hover:scale-105 bg-[#FFF7ED] text-[#EA580C]">
                    <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                  </div>
                  <span className="text-[10px] font-bold text-center leading-tight">AI Assistant</span>
                </div>
              </div>
            </section>

            {/* SECTION 4: Government Schemes */}
            <section>
              <h2 className="font-headline font-bold text-lg md:text-xl mb-4 text-onSurface mt-0">Govt Schemes</h2>
              <div 
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#bfcaba]/30 cursor-pointer card-hover" 
                onClick={() => navigateTo('/farmer/subsidy')}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center gap-4 bg-white border border-[#bfcaba]/30 p-3 rounded-2xl">
                    <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center shrink-0 text-primary">
                      <span className="material-symbols-outlined">account_balance_wallet</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xs mb-0.5 mt-0">PM-KISAN Samman Nidhi</h3>
                      <p className="font-bold text-sm text-[#006e1c] m-0">₹6,000/year</p>
                    </div>
                    <span className="px-2 py-1 text-[9px] font-bold rounded-md bg-[#ba1a1a]/10 text-error">Deadline: 31 Mar</span>
                  </div>
                  <div className="flex justify-between items-center gap-4 bg-white border border-[#bfcaba]/30 p-3 rounded-2xl">
                    <div className="w-12 h-12 bg-surface-container rounded-full flex items-center justify-center shrink-0 text-tertiary">
                      <span className="material-symbols-outlined">shield_with_heart</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xs mb-0.5 mt-0">PM Fasal Bima Yojana</h3>
                      <p className="font-bold text-sm text-tertiary-container m-0">Coverage: ₹2,00,000</p>
                    </div>
                    <span className="material-symbols-outlined text-[#ffb957]">verified</span>
                  </div>
                </div>
                <div className="text-center mt-3 text-primary font-semibold text-sm font-headline">
                  View More <span className="material-symbols-outlined text-[16px] align-middle">arrow_forward</span>
                </div>
              </div>
            </section>

            {/* SECTION 5: AI Farming Tip */}
            <section className="bg-surface-containerLowest rounded-2xl border-l-[6px] border-tertiary p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] cursor-pointer card-hover" onClick={() => navigateTo('/farmer/ai-assistant')}>
              <div className="flex items-center gap-2 mb-3">
                <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                <h2 className="text-tertiary font-bold text-sm m-0">AI Tip for Today</h2>
              </div>
              <p className="text-onSurface-variant text-xs leading-[1.625] mb-4 m-0">
                Apply DAP fertilizer to Wheat within the next 48 hours for optimal tiller development. The current soil moisture at 18% is ideal for absorption.
              </p>
              <button className="group flex items-center gap-2 text-tertiary text-xs font-bold bg-transparent border-none cursor-pointer p-0" onClick={(e) => { e.stopPropagation(); navigateTo('/farmer/ai-assistant'); }}>
                Ask AI for more tips
                <span className="material-symbols-outlined text-[14px] transition-transform group-hover:translate-x-1">arrow_forward</span>
              </button>
            </section>

            {/* SECTION 6: Mandi Updates Teaser */}
            <section className="bg-surface-containerLowest rounded-2xl p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] cursor-pointer card-hover" onClick={() => navigateTo('/farmer/mandi')}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-headline font-bold text-sm md:text-base text-onSurface m-0">Mandi Updates</h2>
                <span className="text-[10px] text-onSurface-variant font-medium">Guna Market</span>
              </div>
              <div className="flex flex-col">
                <div className="flex justify-between items-center py-3 border-t border-[#d4e8d1]/30 first:border-t-0">
                  <span className="text-xs font-medium">🌾 Wheat Lok-1</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#006e1c]">
                    <span>↑ 0.6%</span>
                    <span className="material-symbols-outlined text-[12px]">trending_up</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-t border-[#d4e8d1]/30 first:border-t-0">
                  <span className="text-xs font-medium">🟡 Mustard Black</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-error">
                    <span>↓ 0.8%</span>
                    <span className="material-symbols-outlined text-[12px]">trending_down</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-3 border-t border-[#d4e8d1]/30 first:border-t-0">
                  <span className="text-xs font-medium">🍚 Basmati Rice</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#006e1c]">
                    <span>↑ 2.5%</span>
                    <span className="material-symbols-outlined text-[12px]">trending_up</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4 text-primary font-semibold text-sm font-headline">
                View More <span className="material-symbols-outlined text-[16px] align-middle">arrow_forward</span>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
