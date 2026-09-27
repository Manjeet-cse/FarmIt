import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/AuthContext';
import DashboardGridCard from '../../components/common/DashboardGridCard';



const OWM_KEY = 'f43f09c52dec331e339a4a9054e40e4e';
const CITY = 'Guna';
const COUNTRY = 'IN';

const mapCondition = (iconCode) => {
  if (!iconCode) return 'sunny';
  const main = iconCode.slice(0, 2);
  const isNight = iconCode.endsWith('n');
  if (isNight && (main === '01' || main === '02')) return 'clear';
  switch (main) {
    case '01': return 'sunny';
    case '02': case '03': case '04': return 'cloudy';
    case '09': case '10': case '11': return 'rainy';
    default: return 'sunny';
  }
};

const getMaterialIcon = (cond) => {
  switch (cond) {
    case 'sunny': return 'wb_sunny';
    case 'cloudy': return 'partly_cloudy_day';
    case 'rainy': return 'rainy';
    case 'clear': return 'clear_night';
    default: return 'wb_sunny';
  }
};

export default function Home() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  const { user } = useAuth();
  
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  // Restore scroll position when returning from sub-screens
  useEffect(() => {
    const saved = sessionStorage.getItem('home_scroll');
    if (saved && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(saved, 10);
      sessionStorage.removeItem('home_scroll');
    }
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      let targetCity = localStorage.getItem('farmit_weather_city');
      if (!targetCity) {
        if (user?.location) {
          const parts = user.location.split(',').map(s => s.trim());
          targetCity = parts.find(p => p && !/^\d+$/.test(p)) || CITY;
        } else {
          targetCity = CITY;
        }
      }
      try {
        const [curRes, foreRes] = await Promise.all([
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${targetCity},${COUNTRY}&appid=${OWM_KEY}&units=metric`),
          fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${targetCity},${COUNTRY}&appid=${OWM_KEY}&units=metric`)
        ]);
        const curData = await curRes.json();
        const foreData = await foreRes.json();
        if (curData.cod === 200) setWeather(curData);
        if (foreData.cod === '200') setForecast(foreData);
      } catch (err) {
        console.error('Weather fetch error:', err);
      }
    };
    fetchWeather();
  }, [user]);

  // Derived weather values
  const currentTemp = weather ? Math.round(weather.main.temp) : 28;
  const currentCityName = weather ? weather.name : CITY;
  const currentHumidity = weather ? weather.main.humidity : 45;
  const currentWindSpeed = weather ? Math.round(weather.wind.speed * 3.6) : 12;
  const currentCondition = weather ? mapCondition(weather.weather[0]?.icon) : 'sunny';
  const currentIcon = getMaterialIcon(currentCondition);


  // Derive next 3 days from forecast
  const nextDays = (() => {
    if (!forecast) return [
      { day: t('home.tomorrow'), temp: 26, icon: 'partly_cloudy_day', color: '#006e1c' },
      { day: 'Wed', temp: 22, icon: 'cloudy_snowing', color: 'var(--primary)' },
      { day: 'Thu', temp: 29, icon: 'wb_sunny', color: '#ffb957' }
    ];
    
    const days = {};
    forecast.list.forEach(item => {
      const d = new Date((item.dt + forecast.city.timezone) * 1000);
      const dayName = d.toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'UTC' });
      if (!days[dayName]) days[dayName] = { temps: [], icons: [] };
      days[dayName].temps.push(item.main.temp);
      days[dayName].icons.push(item.weather[0]?.icon);
    });

    const result = [];
    let count = 0;
    const todayStr = new Date().toLocaleDateString('en-IN', { weekday: 'short' });
    
    for (const [day, data] of Object.entries(days)) {
      if (day !== todayStr && count < 3) {
        const cond = mapCondition(data.icons[Math.floor(data.icons.length / 2)]);
        const icon = getMaterialIcon(cond);
        const color = cond === 'rainy' ? '#3B82F6' : cond === 'cloudy' ? '#64748B' : '#F59E0B';
        result.push({
          day: count === 0 ? t('home.tomorrow') : day,
          temp: Math.round(Math.max(...data.temps)),
          icon,
          color
        });
        count++;
      }
    }
    return result.length > 0 ? result : [
      { day: t('home.tomorrow'), temp: 26, icon: 'partly_cloudy_day', color: '#006e1c' },
      { day: 'Wed', temp: 22, icon: 'cloudy_snowing', color: 'var(--primary)' },
      { day: 'Thu', temp: 29, icon: 'wb_sunny', color: '#ffb957' }
    ];
  })();

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
          title="NeokrishiTech" 
          showBack={false} 
          showNotification={true} 
        />
      )}

      {/* Main Content Area */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="page-content flex flex-col gap-8">
          
          {/* Desktop Welcome Banner — uses live weather data */}
          {!isMobile && (
            <section className="bg-gradient-to-r from-[#0A1F0D] to-[#1B5E20] rounded-2xl px-7 py-5 lg:px-8 lg:py-6 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#4CAF50]/10 rounded-full blur-3xl -mr-20 -mt-20" />
              <div className="relative z-10 flex items-center justify-between gap-6">
                <div>
                  <h1 className="font-headline font-bold text-xl lg:text-2xl text-white mb-1">{t('home.goodEvening')}</h1>
                  <p className="text-white/65 text-sm">{t('home.farmOverview')}</p>
                </div>
                <div className="hidden xl:flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 shrink-0">
                  <span className="material-symbols-outlined text-[#88d982] text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>{currentIcon}</span>
                  <div>
                    <p className="text-white font-bold text-lg m-0">{currentTemp}°C</p>
                    <p className="text-white/60 text-xs m-0 capitalize">{t(`weather.${currentCondition}`, currentCondition)} • {currentCityName}, MP</p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Dashboard Grid — 2 columns on desktop */}
          <div className="dashboard-grid">

            {/* SECTION 1: Your Crops */}
            <section className="full-span">
              <h2 className="font-headline font-bold text-lg mb-4 text-onSurface mt-0">{t('home.yourCrops')}</h2>
              <div className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-4 px-4 pb-2 snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-4 md:mx-0 md:px-0 md:pb-0 md:snap-none">
                {/* Wheat Card */}
                <div className="min-w-[260px] w-[70vw] max-w-[300px] md:min-w-0 md:w-full md:max-w-none shrink-0 md:shrink bg-surface-containerLowest rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col card-hover snap-start">
                  <div className="h-32 bg-[#e5e5e5]">
                    <img 
                      className="w-full h-full object-cover"
                      alt="Wheat field" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrnaOut2o3NiA8wuftZUesZmlTSSIGvCnzuiXGtIXxm8niujcsKrNac6pWYe7ml22n1uxVg7TjvWA4lBmXVFbreYXQy2GZjku-GXmQH7cBOgaSse4x_j1EMcF1kL6UvGW1mKHMrMfceUZMPAXh8XRQM6C3K1S7KEH4sZHCi1fx6klAz_ebFqG565PWV03RQj14gtZKZQkJYSBqph0YY4OMY-SXETlmtATPXvEQCQ9DCVq8RMurGP8552dl3DnaMJoA8I1MEPvlFjU"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-onSurface text-base m-0">{t('home.wheat')}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase bg-primary/10 text-[#006e1c]">{t('home.healthy')}</span>
                    </div>
                    <div className="bg-[#e5f9e2] p-2 rounded-lg border-l-2 border-[#006e1c]">
                      <p className="text-[10px] text-[#006e1c] font-medium leading-tight m-0">
                        <span className="material-symbols-outlined text-[12px] align-middle mr-1">check_circle</span> 
                        {t('home.wheatAdvice')}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-onSurface-variant">{t('home.growth')}: 65%</span>
                        <span className="text-onSurface-variant font-medium text-primary">{t('home.stage')}: {t('home.grainFilling')}</span>
                      </div>
                      <div className="w-full bg-surface-container h-1.5 rounded-full">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col gap-3">
                      <div className="px-3 py-1 text-[10px] font-semibold rounded-lg inline-block self-start bg-[#ffb957]/20 text-[#643f00]">
                        {t('home.nextHarvest')}
                      </div>
                      <button className="w-full p-2 border border-primary text-primary text-xs font-bold rounded-xl bg-transparent transition-transform cursor-pointer active:scale-95 hover:bg-primary hover:text-white">{t('home.viewSchedule')}</button>
                    </div>
                  </div>
                </div>

                {/* Mustard Card */}
                <div className="min-w-[260px] w-[70vw] max-w-[300px] md:min-w-0 md:w-full md:max-w-none shrink-0 md:shrink bg-surface-containerLowest rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col border-l-4 border-error/50 card-hover snap-start">
                  <div className="h-32 bg-[#e5e5e5]">
                    <img 
                      className="w-full h-full object-cover"
                      alt="Mustard field" 
                      src="/mustard_field.webp"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-onSurface text-base m-0">{t('home.mustard')}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase bg-tertiary/10 text-tertiary">{t('home.needsAttention')}</span>
                    </div>
                    <div className="bg-[#ffdad6]/50 p-2 rounded-lg border-l-2 border-error">
                      <p className="text-[10px] text-[#93000a] font-medium leading-tight m-0">
                        <span className="material-symbols-outlined text-[12px] align-middle mr-1">warning</span> 
                        {t('home.mustardAdvice')}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-onSurface-variant">{t('home.growth')}: 40%</span>
                      </div>
                      <div className="w-full bg-surface-container h-1.5 rounded-full">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col gap-3">
                      <div className="px-3 py-1 text-[10px] font-semibold rounded-lg inline-block self-start bg-surface-containerHigh text-onSurface-variant">
                        {t('home.nextIrrigation')}
                      </div>
                      <button className="w-full p-2 border border-error text-error text-xs font-bold rounded-xl bg-transparent transition-transform cursor-pointer active:scale-95 hover:bg-error hover:text-white">{t('home.takeAction')}</button>
                    </div>
                  </div>
                </div>

                {/* Chickpea Card */}
                <div className="min-w-[260px] w-[70vw] max-w-[300px] md:min-w-0 md:w-full md:max-w-none shrink-0 md:shrink bg-surface-containerLowest rounded-2xl overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col card-hover snap-start">
                  <div className="h-32 bg-[#e5e5e5]">
                    <img 
                      className="w-full h-full object-cover"
                      alt="Chickpea field" 
                      src="/chickpea_field.webp"
                    />
                  </div>
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-onSurface text-base m-0">{t('home.chickpea', 'Chickpea')}</h3>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full uppercase bg-primary/10 text-[#006e1c]">{t('home.healthy')}</span>
                    </div>
                    <div className="bg-[#e5f9e2] p-2 rounded-lg border-l-2 border-[#006e1c]">
                      <p className="text-[10px] text-[#006e1c] font-medium leading-tight m-0">
                        <span className="material-symbols-outlined text-[12px] align-middle mr-1">check_circle</span> 
                        {t('home.chickpeaAdvice', 'Crop is healthy. Maintain current irrigation and monitor for pests.')}
                      </p>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] mb-1">
                        <span className="text-onSurface-variant">{t('home.growth')}: 55%</span>
                        <span className="text-onSurface-variant font-medium text-primary">{t('home.stage')}: {t('home.vegetativeGrowth', 'Vegetative Growth')}</span>
                      </div>
                      <div className="w-full bg-surface-container h-1.5 rounded-full">
                        <div className="bg-primary h-1.5 rounded-full" style={{ width: '55%' }}></div>
                      </div>
                    </div>
                    <div className="mt-auto flex flex-col gap-3">
                      <div className="px-3 py-1 text-[10px] font-semibold rounded-lg inline-block self-start bg-surface-containerHigh text-onSurface-variant">
                        {t('home.nextIrrigation3Days', 'Next: Irrigation in 3 days')}
                      </div>
                      <button className="w-full p-2 border border-primary text-primary text-xs font-bold rounded-xl bg-transparent transition-transform cursor-pointer active:scale-95 hover:bg-primary hover:text-white">{t('home.viewSchedule')}</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 2: Weather Dashboard */}
            <DashboardGridCard
              title={t('nav.weather', 'Weather')}
              headerRight={
                <div className="flex items-center gap-1 text-onSurface-variant text-xs font-semibold">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  <span>{currentCityName}, Madhya Pradesh</span>
                </div>
              }
              onClick={() => navigateTo('/farmer/weather')}
            >
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-[28px] md:text-[32px] font-bold text-onSurface leading-none">{currentTemp}°C</span>
                    <span className="material-symbols-outlined text-[28px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>{currentIcon}</span>
                    <span className="text-xs font-medium text-onSurface-variant capitalize">• {t(`weather.${currentCondition}`, currentCondition)}</span>
                  </div>
                  <div className="text-right flex flex-col gap-0.5">
                    <p className="text-[10px] font-medium text-onSurface-variant m-0">{t('home.humidity')}: {currentHumidity}%</p>
                    <p className="text-[10px] font-medium text-onSurface-variant m-0">{t('home.wind')}: {currentWindSpeed} km/h</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#d4e8d1]/30">
                  <p className="text-[11px] font-bold text-onSurface mb-1.5 mt-0">{t('home.weatherImpact')}</p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#006e1c]/10 text-[#006e1c]">{t('home.wheatSafe')}</span>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-tertiary/10 text-tertiary">{t('home.mustardRisk')}</span>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-[#ba1a1a]/10 text-error">{t('home.sprayBefore')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {nextDays.map((item, i) => (
                    <div key={i} className="bg-surface-containerLow rounded-xl p-2 text-center">
                      <p className="text-[10px] font-medium mb-1 mt-0">{item.day}</p>
                      <span className="material-symbols-outlined text-[18px]" style={{ color: item.color }}>{item.icon}</span>
                      <p className="text-xs font-bold mt-1 mb-0">{item.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </DashboardGridCard>

            {/* SECTION 3: Government Schemes */}
            <DashboardGridCard
              title={t('home.govtSchemes')}
              headerRight={
                <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_balance
                </span>
              }
              onClick={() => navigateTo('/farmer/subsidy')}
              footer={
                <div className="text-center text-primary font-semibold text-xs font-headline flex items-center justify-center gap-1 group">
                  <span>View More</span>
                  <span className="material-symbols-outlined text-[15px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </div>
              }
            >
              <div className="flex flex-col gap-2.5">
                <div className="flex justify-between items-center gap-3 bg-surface-containerLow/50 border border-[#bfcaba]/20 p-2.5 rounded-xl transition-colors hover:bg-surface-containerLow">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 text-primary shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xs mb-0.5 mt-0 text-onSurface truncate">PM-KISAN Samman Nidhi</h3>
                    <p className="font-bold text-xs text-[#006e1c] m-0">₹6,000/year</p>
                  </div>
                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-md bg-[#ba1a1a]/10 text-error shrink-0">Deadline: 31 Mar</span>
                </div>

                <div className="flex justify-between items-center gap-3 bg-surface-containerLow/50 border border-[#bfcaba]/20 p-2.5 rounded-xl transition-colors hover:bg-surface-containerLow">
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 text-tertiary shadow-xs">
                    <span className="material-symbols-outlined text-[20px]">shield_with_heart</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-xs mb-0.5 mt-0 text-onSurface truncate">PM Fasal Bima Yojana</h3>
                    <p className="font-bold text-xs text-tertiary-container m-0">Coverage: ₹2,00,000</p>
                  </div>
                  <span className="material-symbols-outlined text-[#ffb957] text-[18px] shrink-0">verified</span>
                </div>
              </div>
            </DashboardGridCard>

            {/* SECTION 4: Mandi Updates */}
            <DashboardGridCard
              title={t('home.mandiUpdates')}
              headerRight={
                <span className="text-[10px] text-onSurface-variant font-medium bg-surface-containerLow px-2 py-0.5 rounded-md border border-[#bfcaba]/20">
                  {t('home.gunaMarket')}
                </span>
              }
              onClick={() => navigateTo('/farmer/mandi')}
              footer={
                <div className="text-center text-primary font-semibold text-xs font-headline flex items-center justify-center gap-1 group">
                  <span>View More</span>
                  <span className="material-symbols-outlined text-[15px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </div>
              }
            >
              <div className="flex flex-col">
                <div className="flex justify-between items-center py-2 border-b border-[#d4e8d1]/30">
                  <span className="text-xs font-medium text-onSurface">🌾 Wheat</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#006e1c]">
                    <span>↑ 0.6%</span>
                    <span className="material-symbols-outlined text-[13px]">trending_up</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-[#d4e8d1]/30">
                  <span className="text-xs font-medium text-onSurface">🟡 Mustard Black</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-error">
                    <span>↓ 0.8%</span>
                    <span className="material-symbols-outlined text-[13px]">trending_down</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-xs font-medium text-onSurface">🍚 Basmati Rice</span>
                  <div className="flex items-center gap-1 text-xs font-bold text-[#006e1c]">
                    <span>↑ 2.5%</span>
                    <span className="material-symbols-outlined text-[13px]">trending_up</span>
                  </div>
                </div>
              </div>
            </DashboardGridCard>

            {/* SECTION 5: AI Tip for Today */}
            <DashboardGridCard
              title={t('home.aiTipTitle')}
              headerRight={
                <div className="w-7 h-7 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>smart_toy</span>
                </div>
              }
              onClick={() => navigateTo('/farmer/ai-assistant')}
              footer={
                <div className="text-center text-tertiary font-semibold text-xs font-headline flex items-center justify-center gap-1 group">
                  <span>{t('home.askAiMore')}</span>
                  <span className="material-symbols-outlined text-[15px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                </div>
              }
            >
              <div className="bg-[#fff9ed] border border-[#ffe082]/60 rounded-xl p-3 border-l-4 border-l-tertiary flex-1 flex flex-col justify-center">
                <p className="text-onSurface-variant text-xs leading-[1.6] m-0">
                  {t('home.aiTipContent')}
                </p>
              </div>
            </DashboardGridCard>
          </div>
        </div>
      </main>
    </div>
  );
}
