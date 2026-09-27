import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sun, CloudRain, Wind, Droplets, MapPin, Search, 
  Thermometer, AlertTriangle, Bug, Tractor, Cloud, 
  Leaf, ArrowRight, CloudSun, Umbrella, Moon, CloudLightning,
  Sunrise, Sunset, Eye, Gauge, Sprout, Loader2
} from 'lucide-react';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useAuth } from '../../store/AuthContext';
import { createDebouncedSearch } from '../../services/locationService';

const OWM_KEY = 'f43f09c52dec331e339a4a9054e40e4e';
const CITY = 'Guna';
const COUNTRY = 'IN';

// Map OWM icon codes to our condition names
const mapCondition = (iconCode) => {
  if (!iconCode) return 'Sunny';
  const main = iconCode.slice(0, 2);
  const isNight = iconCode.endsWith('n');
  if (isNight && (main === '01' || main === '02')) return 'Night';
  switch (main) {
    case '01': return 'Sunny';
    case '02': case '03': case '04': return 'Cloudy';
    case '09': case '10': return 'Rainy';
    case '11': return 'Rainy';
    case '13': return 'Cloudy';
    case '50': return 'Cloudy';
    default: return 'Sunny';
  }
};

const formatTime = (unix, tz = 0) => {
  const d = new Date((unix + tz) * 1000);
  return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' });
};

const getDayName = (unix, tz = 0) => {
  const d = new Date((unix + tz) * 1000);
  return d.toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'UTC' });
};

export default function Weather() {
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const debounceRef = useRef(null);
  const locationTimerRef = useRef(null);
  const debouncedLocationSearch = useRef(createDebouncedSearch(locationTimerRef, 400)).current;

  // Get saved city from localStorage, fallback to user profile location
  const defaultCity = (() => {
    const saved = localStorage.getItem('farmit_weather_city');
    if (saved) return saved;
    if (user?.location) {
      const parts = user.location.split(',').map(s => s.trim());
      const city = parts.find(p => p && !/^\d+$/.test(p));
      if (city) return city;
    }
    return CITY;
  })();

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setSearchError('');
    setSuggestions([]);
    try {
      const [curRes, foreRes] = await Promise.all([
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${COUNTRY}&appid=${OWM_KEY}&units=metric`),
        fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${COUNTRY}&appid=${OWM_KEY}&units=metric`)
      ]);
      const curData = await curRes.json();
      const foreData = await foreRes.json();
      if (curData.cod === 200) {
        setWeather(curData);
        localStorage.setItem('farmit_weather_city', curData.name);
      } else {
        setSearchError(`"${city}" not found. Try another city.`);
      }
      if (foreData.cod === '200') setForecast(foreData);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setSearchError('Failed to fetch weather.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch city suggestions via Nominatim API
  const handleSearchInput = (value) => {
    setSearchQuery(value);
    setSearchError('');
    if (value.trim().length < 2) {
      setSuggestions([]);
      return;
    }
    debouncedLocationSearch(value, (results) => {
      setSuggestions(results);
    });
  };

  const selectSuggestion = (city) => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSearch(false);
    fetchWeatherData(city);
  };

  useEffect(() => {
    fetchWeatherData(defaultCity);
  }, []);

  const handleSearch = () => {
    const q = searchQuery.trim();
    if (q.length >= 2) {
      fetchWeatherData(q);
      setSearchQuery('');
      setSuggestions([]);
      setShowSearch(false);
    }
  };

  // Derive values from API data
  const temp = weather ? Math.round(weather.main.temp) : 28;
  const feelsLike = weather ? Math.round(weather.main.feels_like) : 30;
  const humidity = weather ? weather.main.humidity : 65;
  const windSpeed = weather ? Math.round(weather.wind.speed * 3.6) : 12; // m/s → km/h
  const pressure = weather ? weather.main.pressure : 1012;
  const visibility = weather ? Math.round((weather.visibility || 10000) / 1000) : 10;
  const sunriseTime = weather ? formatTime(weather.sys.sunrise, weather.timezone) : '5:42 AM';
  const sunsetTime = weather ? formatTime(weather.sys.sunset, weather.timezone) : '6:58 PM';
  const weatherCondition = weather ? mapCondition(weather.weather[0]?.icon) : 'Sunny';
  const weatherDesc = weather ? weather.weather[0]?.description : 'clear sky';
  const cityName = weather ? weather.name : defaultCity;

  // Hourly from forecast (next 5 slots)
  const hourlyData = forecast ? forecast.list.slice(0, 5).map((item, i) => ({
    time: i === 0 ? 'NOW' : formatTime(item.dt, forecast.city.timezone),
    temp: `${Math.round(item.main.temp)}°`,
    icon: mapCondition(item.weather[0]?.icon),
    active: i === 0,
    prob: `${Math.round((item.pop || 0) * 100)}%`
  })) : [
    { time: 'NOW', temp: `${temp}°`, icon: weatherCondition, active: true, prob: '0%' },
    { time: '10 AM', temp: '29°', icon: 'Sunny', active: false, prob: '0%' },
    { time: '11 AM', temp: '30°', icon: 'Cloudy', active: false, prob: '5%' },
    { time: '12 PM', temp: '30°', icon: 'Cloudy', active: false, prob: '10%' },
    { time: '1 PM', temp: '29°', icon: 'Rainy', active: false, prob: '40%' }
  ];

  // Daily forecast — group by day from forecast list
  const dailyData = (() => {
    if (!forecast) return [];
    const days = {};
    forecast.list.forEach(item => {
      const day = getDayName(item.dt, forecast.city.timezone);
      if (!days[day]) days[day] = { temps: [], icons: [], pops: [] };
      days[day].temps.push(item.main.temp);
      days[day].icons.push(item.weather[0]?.icon);
      days[day].pops.push(item.pop || 0);
    });
    return Object.entries(days).slice(0, 5).map(([day, data]) => {
      const mainIcon = data.icons[Math.floor(data.icons.length / 2)];
      const cond = mapCondition(mainIcon);
      return {
        day,
        condition: cond,
        icon: cond,
        prob: `${Math.round(Math.max(...data.pops) * 100)}%`,
        tempH: `${Math.round(Math.max(...data.temps))}°`,
        tempL: `${Math.round(Math.min(...data.temps))}°`,
        accent: cond === 'Rainy' ? 'text-blue-500' : cond === 'Cloudy' ? 'text-slate-500' : 'text-amber-500'
      };
    });
  })();

  const cycleWeather = () => {};

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

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-surface-light">
        <Loader2 size={40} className="text-primary animate-spin mb-3" />
        <span className="font-body text-onSurface-variant text-sm">Fetching weather data...</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-full overflow-hidden bg-surface-light ${textColor}`}>
      
      {/* Mobile Top Bar */}
      {isMobile && (
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
        </div>
      )}

      {/* Search Bar — Hidden by default, toggled via location click */}
      {showSearch && (
        <div className="shrink-0 px-4 py-2.5 bg-gradient-to-b from-primary/80 to-primary/50 backdrop-blur-md z-10 flex flex-col gap-1.5 relative">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707a6c]" />
            <input
              className="w-full h-10 bg-white/90 border border-white/60 rounded-xl px-4 pl-9 font-body text-[13px] text-[#0f1f11] placeholder:text-[#707a6c] focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] shadow-sm"
              placeholder="Search any city... (e.g. Mumbai, Delhi)"
              value={searchQuery}
              onChange={(e) => handleSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button
            className="h-10 px-4 bg-white text-primary font-label text-[12px] font-bold rounded-xl border-none cursor-pointer hover:bg-green-50 transition-colors shadow-sm"
            onClick={handleSearch}
          >
            Go
          </button>
        </div>
        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <div className="absolute left-4 right-4 top-[52px] bg-white rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.15)] border border-[#e0e0e0] z-50 overflow-hidden">
            {suggestions.map((item, idx) => (
              <button
                key={idx}
                className="w-full px-4 py-3 flex items-center gap-2.5 text-left bg-transparent border-none cursor-pointer hover:bg-[#f0f9f0] transition-colors font-body text-[13px] text-[#0f1f11] border-b border-b-[#f0f0f0] last:border-b-0"
                onClick={() => selectSuggestion(item.name)}
              >
                <MapPin size={14} className="text-primary shrink-0" />
                <div className="flex flex-col">
                  <span className="font-bold">{item.name}</span>
                  {item.state && <span className="text-[11px] text-[#707a6c]">{item.state}</span>}
                </div>
              </button>
            ))}
          </div>
        )}
        {searchError && (
          <span className="text-red-600 text-[12px] font-body bg-red-50 px-3 py-1 rounded-lg">{searchError}</span>
        )}
      </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        {!showDetails ? (
          // --- FORECAST PAGE ---
          <div className="page-content flex flex-col gap-6">
            
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
                <div 
                  className="flex items-center gap-1.5 cursor-pointer bg-white/10 dark:bg-black/20 px-3 py-1.5 rounded-full hover:bg-white/20 active:scale-95 transition-all"
                  onClick={(e) => { e.stopPropagation(); setShowSearch(!showSearch); }}
                >
                  <MapPin size={16} className={isDark ? 'text-white/90' : 'text-onSurface-variant'} />
                  <span className={`font-headline font-semibold text-[13px] ${isDark ? 'text-white/90' : 'text-onSurface-variant'}`}>{cityName}, Madhya Pradesh</span>
                  <Search size={14} className={isDark ? 'text-white/70 ml-1' : 'text-onSurface-variant/70 ml-1'} />
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-8 z-10 relative px-2">
                <div className="flex flex-col">
                  <span className="font-headline font-black text-[64px] leading-none tracking-tighter drop-shadow-sm">{temp}°</span>
                  <span className={`font-headline font-bold text-[16px] mt-2 tracking-wide capitalize ${textVariantColor}`}>{weatherDesc}</span>
                </div>
                <WeatherIcon condition={weatherCondition} size={84} className="scale-110 drop-shadow-xl" />
              </div>

              <div className="grid grid-cols-3 gap-y-4 gap-x-2 z-10 relative mt-2">
                <div className="flex flex-col items-center">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>Feels Like</span>
                  <span className="font-headline font-bold text-[16px]">{feelsLike}°</span>
                </div>
                <div className="flex flex-col items-center border-l border-r border-black/5 dark:border-white/10">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>Humidity</span>
                  <span className="font-headline font-bold text-[16px]">{humidity}%</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>Wind</span>
                  <span className="font-headline font-bold text-[16px]">{windSpeed} km/h</span>
                </div>
                
                <div className="flex flex-col items-center pt-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>UV Index</span>
                  <span className="font-headline font-bold text-[14px] text-orange-500">High (7)</span>
                </div>
                <div className="flex flex-col items-center border-l border-r border-black/5 dark:border-white/10 pt-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>Sunrise</span>
                  <span className="font-headline font-bold text-[14px]">{sunriseTime}</span>
                </div>
                <div className="flex flex-col items-center pt-2">
                  <span className={`text-[11px] font-semibold uppercase tracking-wider mb-1 ${textVariantColor}`}>Sunset</span>
                  <span className="font-headline font-bold text-[14px]">{sunsetTime}</span>
                </div>
              </div>
            </section>

            {/* HOURLY FORECAST */}
            <section>
              <h3 className="font-headline font-bold text-[18px] mb-4 px-1 tracking-tight">Hourly Forecast</h3>
              <div className="flex overflow-x-auto no-scrollbar gap-3 pb-2 -mx-5 px-5">
                {hourlyData.map((item, idx) => (
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
                {(dailyData.length > 0 ? dailyData.slice(0, 3) : [
                  { day: 'Today', condition: weatherCondition, icon: weatherCondition, prob: '5%', tempH: `${temp}°`, tempL: `${temp - 10}°`, accent: 'text-amber-500' },
                ]).map((item, idx) => (
                  <div key={idx} className={`min-w-[120px] rounded-[24px] p-4 flex flex-col shrink-0 ${glassCard}`}>
                    <span className="font-headline font-bold text-[14px] mb-3">{idx === 0 ? 'Today' : item.day}</span>
                    <div className="flex items-center justify-between mb-3">
                      <WeatherIcon condition={item.icon} size={28} />
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-current/10 ${item.accent}`}>{item.prob}</span>
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
          <div className="page-content flex flex-col gap-6 animate-[fadeIn_0.3s_ease-out]">
            
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
                <h2 className="font-headline font-black text-[80px] leading-none tracking-tighter drop-shadow-md mb-2">{temp}°</h2>
                <p className="font-headline font-bold text-[20px] tracking-wide mb-1">{weatherCondition}</p>
                <p className={`font-body text-[14px] font-medium ${textVariantColor}`}>Feels like {feelsLike}°</p>
              </div>
            </section>

            {/* DETAILED METRICS GRID */}
            <section className="grid grid-cols-2 gap-3">
              {[
                { label: 'Humidity', value: `${humidity}%`, icon: Droplets, color: 'text-blue-500' },
                { label: 'Wind', value: `${windSpeed} km/h`, icon: Wind, color: 'text-teal-500' },
                { label: 'Sunrise', value: sunriseTime, icon: Sunrise, color: 'text-orange-500' },
                { label: 'Pressure', value: `${pressure} hPa`, icon: Gauge, color: 'text-indigo-500' },
                { label: 'Visibility', value: `${visibility} km`, icon: Eye, color: 'text-slate-500' },
                { label: 'Sunset', value: sunsetTime, icon: Sunset, color: 'text-cyan-500' }
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
                {(dailyData.length > 0 ? dailyData : [
                  { day: 'Mon', icon: weatherCondition, prob: '0%', tempH: `${temp}°`, tempL: `${temp-10}°`, accent: 'text-amber-500' },
                ]).map((item, idx) => (
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


    </div>
  );
}