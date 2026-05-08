import React, { useState } from 'react';
import { 
  Sun, CloudRain, Wind, Droplets, MapPin, Search, 
  Thermometer, AlertTriangle, Bug, Tractor, Cloud, 
  Leaf, ArrowRight, CloudSun, Umbrella, Moon, CloudLightning,
  Sunrise, Sunset, Eye, Gauge, Sprout
} from 'lucide-react';
import AppTopBar from '../../components/common/AppTopBar';

export default function Weather() {
  const [showDetails, setShowDetails] = useState(false);
  const [weatherCondition, setWeatherCondition] = useState('Sunny');

  const cycleWeather = () => {
    const conditions = ['Sunny', 'Rainy', 'Cloudy', 'Night'];
    const nextIdx = (conditions.indexOf(weatherCondition) + 1) % conditions.length;
    setWeatherCondition(conditions[nextIdx]);
  };

  const getBackgroundClass = () => {
    switch (weatherCondition) {
      case 'Sunny': return 'from-[#FEF9E6] to-[#E8F5E9]';
      case 'Rainy': return 'from-[#E2E8F0] to-[#CFDFE8]';
      case 'Cloudy': return 'from-[#F1F5F9] to-[#E2E8F0]';
      case 'Night': return 'from-[#0F172A] to-[#1E293B]';
      default: return 'from-[#FEF9E6] to-[#E8F5E9]';
    }
  };

  const isDark = weatherCondition === 'Night';
  const textColor = isDark ? 'text-white' : 'text-onSurface';
  const textVariantColor = isDark ? 'text-white/70' : 'text-onSurface-variant';
  
  const glassCard = isDark 
    ? 'bg-black/20 border border-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]' 
    : 'bg-white/50 border border-white/60 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)]';

  const subtleGlass = isDark
    ? 'bg-white/5 border border-white/5 backdrop-blur-md'
    : 'bg-white/40 border border-white/50 backdrop-blur-md';

  const WeatherIcon = ({ condition, className, size = 24 }) => {
    switch(condition) {
      case 'Sunny': return <Sun size={size} className={`text-[#F59E0B] fill-current drop-shadow-md ${className}`} />;
      case 'Rainy': return <CloudRain size={size} className={`text-[#3B82F6] fill-current drop-shadow-md ${className}`} />;
      case 'Cloudy': return <Cloud size={size} className={`text-[#64748B] fill-current drop-shadow-md ${className}`} />;
      case 'Night': return <Moon size={size} className={`text-[#FBBF24] fill-current drop-shadow-md ${className}`} />;
      default: return <Sun size={size} className={`text-[#F59E0B] fill-current drop-shadow-md ${className}`} />;
    }
  };

  return (
    <div className={`flex flex-col h-full overflow-hidden bg-gradient-to-br transition-colors duration-700 ease-in-out ${getBackgroundClass()} ${textColor}`}>
      
      <div className="shrink-0 flex items-center justify-between px-4 h-16 bg-primary text-white shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button 
            className="bg-transparent border-none p-0 flex items-center justify-center cursor-pointer text-white transition-transform active:scale-90"
            onClick={() => showDetails ? setShowDetails(false) : window.history.back()}
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="font-headline text-[18px] font-bold text-white m-0 tracking-wide">
            {showDetails ? "Weather Details" : "Weather"}
          </h1>
        </div>
        <button 
            className="bg-transparent border-none p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/10 text-white transition-colors" 
            onClick={cycleWeather} 
            title="Toggle Weather Theme"
        >
          <WeatherIcon condition={weatherCondition} size={22} className="text-white drop-shadow-none fill-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        {!showDetails ? (
          // --- FORECAST PAGE ---
          <div className="p-5 pb-28 flex flex-col gap-6">
            
            {/* ALERT CARD */}
            <section className={`rounded-[28px] p-5 flex flex-col gap-3 relative overflow-hidden shadow-[0_8px_24px_rgba(220,38,38,0.15)] bg-gradient-to-br ${isDark ? 'from-[#450a0a]/80 to-[#220505]/80 border-red-900/50' : 'from-[#FEF2F2] to-[#FEE2E2] border-white/60'} backdrop-blur-xl border`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              
              <div className="flex justify-between items-start z-10">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase bg-red-500/20 text-red-600 w-max shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 animate-pulse"></span>
                      High Risk
                    </span>
                    <span className={`text-[12px] font-bold ${isDark ? 'text-red-200' : 'text-red-800'}`}>• Wheat</span>
                  </div>
                  <span className={`text-[11px] font-bold ${isDark ? 'text-red-300' : 'text-red-700/80'}`}>7 AM – 2 PM</span>
                </div>
                <div className="p-2 rounded-full bg-red-500/10 backdrop-blur-md">
                  <AlertTriangle size={22} className="text-red-600 fill-red-600/20" />
                </div>
              </div>
              
              <div className={`z-10 mt-1 font-body text-[13px] font-medium leading-relaxed ${isDark ? 'text-red-100' : 'text-red-900/90'}`}>
                <p className="mb-1">Fungal disease conditions detected.</p>
                <ul className="pl-4 m-0 flex flex-col gap-1 list-disc">
                  <li>Spray Carbendazim before 8 AM.</li>
                  <li>Avoid irrigation today.</li>
                </ul>
              </div>
            </section>

            {/* QUICK ACTIONS */}
            <section className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
              <button className={`shrink-0 ${subtleGlass} rounded-[20px] px-5 py-3 flex items-center gap-2.5 shadow-sm text-primary font-headline text-[13px] font-bold cursor-pointer hover:bg-primary/5 active:scale-95 transition-all`}>
                <Tractor size={18} className="text-primary opacity-80" /> Spray
              </button>
              <button className={`shrink-0 ${subtleGlass} rounded-[20px] px-5 py-3 flex items-center gap-2.5 shadow-sm text-[#0284C7] font-headline text-[13px] font-bold cursor-pointer hover:bg-[#0284C7]/5 active:scale-95 transition-all`}>
                <Droplets size={18} className="text-[#0284C7] opacity-80" /> Irrigation
              </button>
              <button className={`shrink-0 ${subtleGlass} rounded-[20px] px-5 py-3 flex items-center gap-2.5 shadow-sm text-[#EA580C] font-headline text-[13px] font-bold cursor-pointer hover:bg-[#EA580C]/5 active:scale-95 transition-all`}>
                <Bug size={18} className="text-[#EA580C] opacity-80" /> Pest Alert
              </button>
            </section>

            {/* MAIN WEATHER CARD */}
            <section 
              className={`${glassCard} rounded-[32px] p-6 cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform relative overflow-hidden group`} 
              onClick={() => setShowDetails(true)}
            >
              <div className="absolute top-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors pointer-events-none"></div>
              
              <div className="flex justify-between items-center mb-6 z-10 relative">
                <div className="flex items-center gap-1.5">
                  <MapPin size={16} className={isDark ? 'text-white/80' : 'text-onSurface-variant'} />
                  <span className={`font-headline font-semibold text-[13px] ${isDark ? 'text-white/90' : 'text-onSurface-variant'}`}>Guna, Madhya Pradesh</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-8 z-10 relative px-2">
                <div className="flex flex-col">
                  <span className="font-headline font-black text-[64px] leading-none tracking-tighter drop-shadow-sm">28°</span>
                  <span className={`font-headline font-bold text-[16px] mt-2 tracking-wide ${textVariantColor}`}>{weatherCondition}</span>
                </div>
                <WeatherIcon condition={weatherCondition} size={84} className="scale-110 drop-shadow-xl" />
              </div>

              <div className="grid grid-cols-3 gap-y-4 gap-x-2 z-10 relative mt-2">
                <div className="flex flex-col items-center">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>Feels Like</span>
                  <span className="font-headline font-bold text-[16px]">30°</span>
                </div>
                <div className="flex flex-col items-center border-l border-r border-black/5 dark:border-white/10">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>Humidity</span>
                  <span className="font-headline font-bold text-[16px]">65%</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>Wind</span>
                  <span className="font-headline font-bold text-[16px]">12 km/h</span>
                </div>
                
                <div className="flex flex-col items-center pt-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>UV Index</span>
                  <span className="font-headline font-bold text-[14px] text-orange-500">High (7)</span>
                </div>
                <div className="flex flex-col items-center border-l border-r border-black/5 dark:border-white/10 pt-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>Sunrise</span>
                  <span className="font-headline font-bold text-[14px]">5:42 AM</span>
                </div>
                <div className="flex flex-col items-center pt-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>Sunset</span>
                  <span className="font-headline font-bold text-[14px]">6:58 PM</span>
                </div>
              </div>
            </section>

            {/* HOURLY FORECAST */}
            <section>
              <h3 className="font-headline font-bold text-[18px] mb-4 px-1 tracking-tight">Hourly Forecast</h3>
              <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-5 px-5">
                {[
                  { time: 'NOW', temp: '28°', icon: weatherCondition, active: true, prob: '0%' },
                  { time: '10 AM', temp: '29°', icon: 'Sunny', active: false, prob: '0%' },
                  { time: '11 AM', temp: '30°', icon: 'Cloudy', active: false, prob: '5%' },
                  { time: '12 PM', temp: '30°', icon: 'Cloudy', active: false, prob: '10%' },
                  { time: '1 PM', temp: '29°', icon: 'Rainy', active: false, prob: '40%' }
                ].map((item, idx) => (
                  <div key={idx} className={`flex flex-col items-center min-w-[72px] rounded-full py-5 px-2 shrink-0 transition-all ${
                    item.active 
                      ? 'bg-gradient-to-b from-[#2E7D32] to-[#1B5E20] text-white shadow-[0_8px_16px_rgba(46,125,50,0.4)] border border-green-500/30' 
                      : `${subtleGlass}`
                  }`}>
                    <span className={`text-[12px] font-bold mb-3 ${item.active ? 'text-green-100' : textVariantColor}`}>{item.time}</span>
                    <WeatherIcon condition={item.icon} size={24} className={`mb-3 ${item.active ? '!text-white drop-shadow-md' : ''}`} />
                    <span className="text-[16px] font-bold mb-1">{item.temp}</span>
                    <span className={`text-[10px] font-bold ${item.active ? 'text-green-200' : 'text-blue-500'}`}>{item.prob}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3-DAY FORECAST */}
            <section>
              <h3 className="font-headline font-bold text-[18px] mb-4 px-1 tracking-tight">3-Day Forecast</h3>
              <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2 -mx-5 px-5">
                {[
                  { day: 'Today', condition: 'Sunny', icon: 'Sunny', prob: '5%', tempH: '28°', tempL: '18°', accent: 'bg-amber-500/10 text-amber-600' },
                  { day: 'Tomorrow', condition: 'Cloudy', icon: 'Cloudy', prob: '20%', tempH: '26°', tempL: '17°', accent: 'bg-slate-500/10 text-slate-600' },
                  { day: 'Wednesday', condition: 'Rainy', icon: 'Rainy', prob: '85%', tempH: '24°', tempL: '16°', accent: 'bg-blue-500/10 text-blue-600' }
                ].map((item, idx) => (
                  <div key={idx} className={`min-w-[120px] rounded-[24px] p-4 flex flex-col shrink-0 ${glassCard}`}>
                    <span className="font-headline font-bold text-[14px] mb-3">{item.day}</span>
                    <div className="flex items-center justify-between mb-3">
                      <WeatherIcon condition={item.icon} size={28} />
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.accent}`}>{item.prob}</span>
                    </div>
                    <span className={`font-body text-[13px] font-bold mb-3 ${textVariantColor}`}>{item.condition}</span>
                    <div className="flex gap-3 font-headline font-bold text-[14px]">
                      <span className="text-onSurface dark:text-white">H: {item.tempH}</span>
                      <span className={textVariantColor}>L: {item.tempL}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* IMPACT INSIGHTS */}
            <section>
              <h3 className="font-headline font-bold text-[18px] mb-4 px-1 tracking-tight">Impact Insights</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className={`${subtleGlass} rounded-[20px] p-4 flex flex-col gap-2 relative overflow-hidden`}>
                  <div className="absolute -bottom-4 -right-4 opacity-10">
                    <CloudRain size={64} />
                  </div>
                  <div className={`p-2 w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                    <CloudRain size={16} className={isDark ? 'text-blue-300' : 'text-blue-600'} />
                  </div>
                  <span className="font-headline font-bold text-[13px] leading-tight">Rain expected tomorrow</span>
                  <span className={`text-[11px] font-medium ${textVariantColor}`}>Delay fertilizer app.</span>
                </div>
                <div className={`${subtleGlass} rounded-[20px] p-4 flex flex-col gap-2 relative overflow-hidden`}>
                  <div className="absolute -bottom-4 -right-4 opacity-10">
                    <Wind size={64} />
                  </div>
                  <div className={`p-2 w-8 h-8 rounded-full flex items-center justify-center ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'}`}>
                    <Wind size={16} className={isDark ? 'text-amber-300' : 'text-amber-600'} />
                  </div>
                  <span className="font-headline font-bold text-[13px] leading-tight">Strong winds after 4 PM</span>
                  <span className={`text-[11px] font-medium ${textVariantColor}`}>Avoid pesticide spray</span>
                </div>
              </div>
            </section>
            
            {/* CTA BUTTON */}
            <button 
              className="bg-gradient-to-r from-primary to-[#205e23] text-white py-3.5 px-5 rounded-[20px] flex items-center justify-between mt-2 shadow-[0_8px_16px_rgba(46,125,50,0.25)] hover:shadow-[0_12px_20px_rgba(46,125,50,0.3)] active:scale-[0.98] transition-all cursor-pointer border-none"
              onClick={() => setShowDetails(true)}
            >
              <span className="font-headline font-bold text-[14px] tracking-wide">View Full 7-Day Forecast</span>
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <ArrowRight size={16} />
              </div>
            </button>

          </div>
        ) : (
          // --- DETAILS PAGE ---
          <div className="p-5 pb-28 flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
            
            {/* HERO CARD */}
            <section className={`${glassCard} rounded-[32px] p-8 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]`}>
              <div className={`absolute inset-0 bg-gradient-to-b opacity-40 ${
                weatherCondition === 'Sunny' ? 'from-amber-200/50 to-transparent' : 
                weatherCondition === 'Rainy' ? 'from-blue-300/50 to-transparent' : 
                weatherCondition === 'Cloudy' ? 'from-slate-300/50 to-transparent' : 
                'from-indigo-900/50 to-transparent'
              }`}></div>
              <div className="z-10 flex flex-col items-center text-center">
                <WeatherIcon condition={weatherCondition} size={96} className="mb-4 drop-shadow-2xl animate-[float_4s_ease-in-out_infinite]" />
                <h2 className="font-headline font-black text-[80px] leading-none tracking-tighter drop-shadow-md mb-2">28°</h2>
                <p className="font-headline font-bold text-[20px] tracking-wide mb-1">{weatherCondition}</p>
                <p className={`font-body text-[14px] font-medium ${textVariantColor}`}>Feels like 30°</p>
              </div>
            </section>

            {/* DETAILED METRICS GRID */}
            <section className="grid grid-cols-2 gap-3">
              {[
                { label: 'Humidity', value: '65%', icon: Droplets, color: 'text-blue-500' },
                { label: 'Wind', value: '12 km/h', icon: Wind, color: 'text-teal-500' },
                { label: 'UV Index', value: '7 (High)', icon: Sun, color: 'text-orange-500' },
                { label: 'Pressure', value: '1012 hPa', icon: Gauge, color: 'text-indigo-500' },
                { label: 'Visibility', value: '10 km', icon: Eye, color: 'text-slate-500' },
                { label: 'Dew Point', value: '18°', icon: Droplets, color: 'text-cyan-500' }
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className={`${subtleGlass} rounded-[20px] p-4 flex items-center gap-3`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-white/40 dark:bg-black/20 ${item.color}`}>
                      <Icon size={18} />
                    </div>
                    <div className="flex flex-col">
                      <span className={`text-[11px] font-bold uppercase tracking-wider mb-0.5 ${textVariantColor}`}>{item.label}</span>
                      <span className="font-headline font-bold text-[15px]">{item.value}</span>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* FARMING INSIGHTS */}
            <section className={`${glassCard} rounded-[28px] p-5 border-l-4 border-primary`}>
              <h3 className="font-headline font-bold text-[16px] mb-4 flex items-center gap-2">
                <Sprout size={20} className="text-primary" />
                Farming Intelligence
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#006e1c] mt-1.5 shrink-0"></div>
                  <div>
                    <span className="block font-bold text-[13px] mb-0.5">Best spraying window</span>
                    <span className={`text-[12px] ${textVariantColor}`}>Before 8 AM or after 5 PM due to high UV.</span>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                  <div>
                    <span className="block font-bold text-[13px] mb-0.5">Irrigation recommendation</span>
                    <span className={`text-[12px] ${textVariantColor}`}>Good conditions Thursday evening.</span>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                  <div>
                    <span className="block font-bold text-[13px] mb-0.5">Disease risk</span>
                    <span className={`text-[12px] ${textVariantColor}`}>High fungal disease probability due to humidity.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 7-DAY FORECAST LIST */}
            <section>
              <h3 className="font-headline font-bold text-[18px] mb-4 px-1">7-Day Forecast</h3>
              <div className={`${glassCard} rounded-[28px] p-5 flex flex-col gap-1`}>
                {[
                  { day: 'Mon', icon: 'Sunny', prob: '0%', tempH: '30°', tempL: '19°', accent: 'text-amber-500' },
                  { day: 'Tue', icon: 'Cloudy', prob: '20%', tempH: '27°', tempL: '17°', accent: 'text-slate-500' },
                  { day: 'Wed', icon: 'Rainy', prob: '85%', tempH: '24°', tempL: '16°', accent: 'text-blue-500' },
                  { day: 'Thu', icon: 'Rainy', prob: '60%', tempH: '25°', tempL: '16°', accent: 'text-blue-500' },
                  { day: 'Fri', icon: 'Sunny', prob: '10%', tempH: '28°', tempL: '18°', accent: 'text-amber-500' },
                  { day: 'Sat', icon: 'Cloudy', prob: '15%', tempH: '29°', tempL: '19°', accent: 'text-slate-500' },
                  { day: 'Sun', icon: 'Sunny', prob: '5%', tempH: '31°', tempL: '20°', accent: 'text-amber-500' }
                ].map((item, idx) => (
                  <div key={idx} className={`flex items-center justify-between py-3 ${idx !== 6 ? 'border-b border-black/5 dark:border-white/5' : ''}`}>
                    <span className="w-10 font-headline font-bold text-[14px]">{item.day}</span>
                    <div className="flex items-center gap-3 w-28">
                      <WeatherIcon condition={item.icon} size={20} className={item.accent} />
                      <span className={`text-[12px] font-bold ${parseInt(item.prob) > 50 ? 'text-blue-500' : textVariantColor}`}>{parseInt(item.prob) > 0 ? item.prob : ''}</span>
                    </div>
                    <div className="flex items-center justify-end flex-1 gap-4 font-headline text-[15px]">
                      <span className="font-bold w-6 text-right">{item.tempH}</span>
                      <span className={`font-semibold w-6 text-right ${textVariantColor}`}>{item.tempL}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}