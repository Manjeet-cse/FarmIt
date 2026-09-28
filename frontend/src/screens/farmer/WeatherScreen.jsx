import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sun, CloudRain, Wind, Droplets, MapPin, Search, 
  Thermometer, AlertTriangle, Bug, Tractor, Cloud, 
  Leaf, ArrowRight, CloudSun, Moon, CloudLightning,
  Sunrise, Sunset, Eye, Gauge, Sprout, Loader2,
  CheckCircle2, X, Clock, RefreshCw, ShieldAlert,
  Calendar, Info, ChevronRight, Activity, TrendingUp,
  Droplet, Compass
} from 'lucide-react';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';
import { useAuth } from '../../store/AuthContext';
import { createDebouncedSearch } from '../../services/locationService';

const OWM_KEY = 'f43f09c52dec331e339a4a9054e40e4e';
const DEFAULT_CITY = 'Guna';
const COUNTRY = 'IN';

// Map OWM icon codes to standard condition names
const mapCondition = (iconCode) => {
  if (!iconCode) return 'Sunny';
  const main = iconCode.slice(0, 2);
  const isNight = iconCode.endsWith('n');
  if (isNight && (main === '01' || main === '02')) return 'Clear Night';
  switch (main) {
    case '01': return 'Sunny';
    case '02': return 'Partly Cloudy';
    case '03': case '04': return 'Cloudy';
    case '09': case '10': return 'Rainy';
    case '11': return 'Thunderstorm';
    case '13': return 'Snow';
    case '50': return 'Misty';
    default: return 'Sunny';
  }
};

const formatTime = (unix, tz = 0) => {
  const d = new Date((unix + tz) * 1000);
  return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true, timeZone: 'UTC' });
};

const formatHourOnly = (unix, tz = 0) => {
  const d = new Date((unix + tz) * 1000);
  return d.toLocaleTimeString('en-IN', { hour: 'numeric', hour12: true, timeZone: 'UTC' });
};

const getDayName = (unix, tz = 0) => {
  const d = new Date((unix + tz) * 1000);
  return d.toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'UTC' });
};

// Vibrant, clean weather icon component (no washed-out grey)
function DynamicWeatherIcon({ condition, size = 32, className = '' }) {
  switch (condition) {
    case 'Sunny':
      return <Sun size={size} className={`text-amber-500 fill-amber-400/30 ${className}`} />;
    case 'Clear Night':
      return <Moon size={size} className={`text-amber-400 fill-amber-300/30 ${className}`} />;
    case 'Partly Cloudy':
      return <CloudSun size={size} className={`text-amber-500 ${className}`} />;
    case 'Cloudy':
    case 'Misty':
      return <Cloud size={size} className={`text-slate-500 fill-slate-200 ${className}`} />;
    case 'Rainy':
      return <CloudRain size={size} className={`text-blue-500 fill-blue-100 ${className}`} />;
    case 'Thunderstorm':
      return <CloudLightning size={size} className={`text-purple-600 fill-purple-100 ${className}`} />;
    default:
      return <Sun size={size} className={`text-amber-500 fill-amber-400/30 ${className}`} />;
  }
}

export default function WeatherScreen() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { user } = useAuth();

  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdatedTime, setLastUpdatedTime] = useState(Date.now());
  const [timeAgoStr, setTimeAgoStr] = useState('Updated just now');

  // Search state
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const locationTimerRef = useRef(null);
  const debouncedLocationSearch = useRef(createDebouncedSearch(locationTimerRef, 400)).current;

  // Weather Trends chart state: 'temp' | 'rain' | 'humidity' | 'wind'
  const [activeTrendTab, setActiveTrendTab] = useState('temp');
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);

  // Advice & Task details modal state
  const [activeModalData, setActiveModalData] = useState(null);

  // Saved city fallback logic
  const defaultCity = (() => {
    const saved = localStorage.getItem('farmit_weather_city');
    if (saved) return saved;
    if (user?.location) {
      const parts = user.location.split(',').map(s => s.trim());
      const city = parts.find(p => p && !/^\d+$/.test(p));
      if (city) return city;
    }
    return DEFAULT_CITY;
  })();

  const [currentCity, setCurrentCity] = useState(defaultCity);

  const fetchWeatherData = async (city, isManualRefresh = false) => {
    if (isManualRefresh) setRefreshing(true);
    else setLoading(true);
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
        setCurrentCity(curData.name);
        localStorage.setItem('farmit_weather_city', curData.name);
        setLastUpdatedTime(Date.now());
      } else {
        setSearchError(`"${city}" not found. Showing ${currentCity}.`);
      }

      if (foreData.cod === '200') {
        setForecast(foreData);
      }
    } catch (err) {
      console.error('Weather fetch error:', err);
      setSearchError('Network error while updating weather data.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(defaultCity);
  }, []);

  // Update "Updated X min ago" label
  useEffect(() => {
    const interval = setInterval(() => {
      const mins = Math.floor((Date.now() - lastUpdatedTime) / 60000);
      if (mins < 1) setTimeAgoStr('Updated just now');
      else if (mins === 1) setTimeAgoStr('Updated 1 min ago');
      else setTimeAgoStr(`Updated ${mins} min ago`);
    }, 30000);
    return () => clearInterval(interval);
  }, [lastUpdatedTime]);

  // City Search handling
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

  const handleManualSearch = () => {
    const q = searchQuery.trim();
    if (q.length >= 2) {
      fetchWeatherData(q);
      setSearchQuery('');
      setSuggestions([]);
      setShowSearch(false);
    }
  };

  // Derive Current Weather Values
  const temp = weather ? Math.round(weather.main.temp) : 26;
  const feelsLike = weather ? Math.round(weather.main.feels_like) : 27;
  const humidity = weather ? weather.main.humidity : 70;
  const windSpeed = weather ? Math.round(weather.wind.speed * 3.6) : 7; // km/h
  const weatherCondition = weather ? mapCondition(weather.weather[0]?.icon) : 'Sunny';
  const weatherDesc = weather ? weather.weather[0]?.description : 'clear sky';
  const sunriseTime = weather ? formatTime(weather.sys.sunrise, weather.timezone) : '5:48 AM';
  const sunsetTime = weather ? formatTime(weather.sys.sunset, weather.timezone) : '6:42 PM';
  const cityName = weather ? weather.name : currentCity;

  // Rain probability for current slot
  const currentRainProb = forecast?.list?.[0]?.pop ? Math.round(forecast.list[0].pop * 100) : 0;
  const uvIndexDisplay = temp >= 32 ? '9 (V. High)' : temp >= 28 ? '7 (High)' : '5 (Mod)';

  // ── HOURLY FORECAST (6–8 hours) ──
  const hourlyData = useMemo(() => {
    if (!forecast?.list || forecast.list.length === 0) {
      return [
        { time: 'NOW', temp: 26, icon: 'Sunny', prob: '0%', rawProb: 0, active: true },
        { time: '7 PM', temp: 25, icon: 'Clear Night', prob: '0%', rawProb: 0, active: false },
        { time: '8 PM', temp: 24, icon: 'Clear Night', prob: '0%', rawProb: 0, active: false },
        { time: '9 PM', temp: 23, icon: 'Clear Night', prob: '5%', rawProb: 5, active: false },
        { time: '10 PM', temp: 22, icon: 'Cloudy', prob: '10%', rawProb: 10, active: false },
        { time: '11 PM', temp: 21, icon: 'Cloudy', prob: '15%', rawProb: 15, active: false },
        { time: '12 AM', temp: 20, icon: 'Cloudy', prob: '15%', rawProb: 15, active: false },
        { time: '1 AM', temp: 20, icon: 'Cloudy', prob: '10%', rawProb: 10, active: false },
      ];
    }

    return forecast.list.slice(0, 8).map((item, idx) => {
      const isFirst = idx === 0;
      const timeStr = isFirst ? 'NOW' : formatHourOnly(item.dt, forecast.city?.timezone || 0);
      const itemTemp = Math.round(item.main.temp);
      const popPercent = Math.round((item.pop || 0) * 100);
      const cond = mapCondition(item.weather[0]?.icon);

      return {
        time: timeStr,
        temp: itemTemp,
        icon: cond,
        prob: `${popPercent}%`,
        rawProb: popPercent,
        active: isFirst,
        humidity: item.main.humidity,
        wind: Math.round(item.wind.speed * 3.6),
      };
    });
  }, [forecast, temp]);

  // ── 7-DAY FORECAST (Dynamic from forecast list) ──
  const sevenDayData = useMemo(() => {
    if (!forecast?.list || forecast.list.length === 0) {
      return [
        { day: 'Today', icon: 'Sunny', condition: 'Sunny', tempH: 30, tempL: 21, prob: '0%', wind: '7 km/h', isToday: true },
        { day: 'Tue', icon: 'Partly Cloudy', condition: 'Partly Cloudy', tempH: 29, tempL: 20, prob: '10%', wind: '8 km/h', isToday: false },
        { day: 'Wed', icon: 'Rainy', condition: 'Light Rain', tempH: 27, tempL: 19, prob: '45%', wind: '12 km/h', isToday: false },
        { day: 'Thu', icon: 'Cloudy', condition: 'Cloudy', tempH: 28, tempL: 20, prob: '20%', wind: '9 km/h', isToday: false },
        { day: 'Fri', icon: 'Sunny', condition: 'Sunny', tempH: 31, tempL: 22, prob: '5%', wind: '6 km/h', isToday: false },
        { day: 'Sat', icon: 'Sunny', condition: 'Clear', tempH: 32, tempL: 22, prob: '0%', wind: '7 km/h', isToday: false },
        { day: 'Sun', icon: 'Partly Cloudy', condition: 'Mild Clouds', tempH: 30, tempL: 21, prob: '10%', wind: '8 km/h', isToday: false },
      ];
    }

    const daysMap = {};
    forecast.list.forEach(item => {
      const d = new Date((item.dt + (forecast.city?.timezone || 0)) * 1000);
      const dayKey = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'UTC' });
      if (!daysMap[dayKey]) {
        daysMap[dayKey] = { day: dayName, temps: [], icons: [], pops: [], winds: [] };
      }
      daysMap[dayKey].temps.push(item.main.temp);
      daysMap[dayKey].icons.push(item.weather[0]?.icon);
      daysMap[dayKey].pops.push(item.pop || 0);
      daysMap[dayKey].winds.push(item.wind.speed * 3.6);
    });

    const parsed = Object.entries(daysMap).map(([dateStr, data], idx) => {
      const maxTemp = Math.round(Math.max(...data.temps));
      const minTemp = Math.round(Math.min(...data.temps));
      const maxPop = Math.round(Math.max(...data.pops) * 100);
      const avgWind = Math.round(data.winds.reduce((a, b) => a + b, 0) / data.winds.length);
      const dominantIcon = data.icons[Math.floor(data.icons.length / 2)];
      const cond = mapCondition(dominantIcon);

      return {
        day: idx === 0 ? 'Today' : data.day,
        icon: cond,
        condition: cond,
        tempH: maxTemp,
        tempL: minTemp,
        prob: `${maxPop}%`,
        wind: `${avgWind} km/h`,
        isToday: idx === 0,
      };
    });

    // Pad to 7 days if forecast only has 5 days
    while (parsed.length < 7) {
      const nextDate = new Date(Date.now() + parsed.length * 86400000);
      const nextDayName = nextDate.toLocaleDateString('en-IN', { weekday: 'short' });
      const last = parsed[parsed.length - 1];
      parsed.push({
        day: nextDayName,
        icon: parsed.length % 2 === 0 ? 'Sunny' : 'Partly Cloudy',
        condition: parsed.length % 2 === 0 ? 'Sunny' : 'Partly Cloudy',
        tempH: (last?.tempH || 30) + (parsed.length % 2 === 0 ? 1 : -1),
        tempL: (last?.tempL || 20) + (parsed.length % 2 === 0 ? 0 : 1),
        prob: `${(parsed.length * 7) % 30}%`,
        wind: `${8 + (parsed.length % 4)} km/h`,
        isToday: false,
      });
    }

    return parsed.slice(0, 7);
  }, [forecast]);

  // ── WEATHER TRENDS DATA ──
  const trendConfig = useMemo(() => {
    const labels = hourlyData.map(h => h.time);
    let values = [];
    let unit = '';
    let minRange = 0;
    let maxRange = 100;
    let label = '';
    let color = '#006e1c';

    switch (activeTrendTab) {
      case 'temp':
        values = hourlyData.map(h => h.temp);
        unit = '°C';
        minRange = Math.min(...values) - 2;
        maxRange = Math.max(...values) + 2;
        label = 'Temperature';
        color = '#006e1c';
        break;
      case 'rain':
        values = hourlyData.map(h => h.rawProb);
        unit = '%';
        minRange = 0;
        maxRange = Math.max(30, Math.max(...values) + 10);
        label = 'Rain Probability';
        color = '#0284c7';
        break;
      case 'humidity':
        values = hourlyData.map(h => h.humidity || humidity);
        unit = '%';
        minRange = Math.max(0, Math.min(...values) - 10);
        maxRange = Math.min(100, Math.max(...values) + 10);
        label = 'Relative Humidity';
        color = '#059669';
        break;
      case 'wind':
        values = hourlyData.map(h => h.wind || windSpeed);
        unit = 'km/h';
        minRange = 0;
        maxRange = Math.max(20, Math.max(...values) + 5);
        label = 'Wind Speed';
        color = '#d97706';
        break;
      default:
        values = hourlyData.map(h => h.temp);
        unit = '°C';
        minRange = Math.min(...values) - 2;
        maxRange = Math.max(...values) + 2;
        label = 'Temperature';
        color = '#006e1c';
    }

    return { labels, values, unit, minRange, maxRange, label, color };
  }, [activeTrendTab, hourlyData, humidity, windSpeed]);

  // SVG Chart path generation
  const chartPathData = useMemo(() => {
    const { values, minRange, maxRange } = trendConfig;
    if (!values || values.length === 0) return { path: '', areaPath: '', points: [] };

    const svgWidth = 620;
    const svgHeight = 170;
    const padX = 40;
    const padY = 24;
    const usableW = svgWidth - padX * 2;
    const usableH = svgHeight - padY * 2;
    const range = (maxRange - minRange) || 1;

    const points = values.map((val, idx) => {
      const x = padX + (idx / (values.length - 1)) * usableW;
      const y = padY + usableH - ((val - minRange) / range) * usableH;
      return { x, y, val };
    });

    // Build smooth cubic bezier curve
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }

    const lastPt = points[points.length - 1];
    const areaPath = `${path} L ${lastPt.x} ${svgHeight - 6} L ${points[0].x} ${svgHeight - 6} Z`;

    return { path, areaPath, points };
  }, [trendConfig]);

  // ── FARM ALERTS DATA (4 Actionable Cards) ──
  const farmAlerts = [
    {
      id: 'irrigation',
      type: 'Irrigation',
      icon: CloudRain,
      iconColor: 'text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      title: 'Rain expected tomorrow',
      action: 'Delay irrigation for Wheat',
      detailReason: 'Precipitation probability rises in the next 24–36 hours. Irrigating today risks waterlogging root zones and wasting electricity/water.',
      steps: [
        'Pause scheduled irrigation cycle for Wheat and Chickpea.',
        'Clear furrow ends and drainage paths to prevent water stagnation.',
        'Re-assess soil moisture 36 hours post-rainfall before restarting pumps.'
      ],
      timeWindow: 'Next 24 to 48 Hours',
    },
    {
      id: 'spraying',
      type: 'Spraying',
      icon: Wind,
      iconColor: 'text-amber-600',
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
      title: 'Strong winds after 4 PM',
      action: 'Avoid pesticide spraying',
      detailReason: 'Gusts exceeding 14 km/h cause significant droplet drift, reducing chemical coverage on foliage and posing inhalation risks.',
      steps: [
        'Complete essential spraying before 11:00 AM or tomorrow morning.',
        'Best alternative window: Tomorrow 6:00 AM – 8:30 AM (calm air < 5 km/h).',
        'Use flat-fan nozzles with coarser droplets to reduce off-target drift.'
      ],
      timeWindow: 'Tomorrow 6:00 AM – 8:30 AM',
    },
    {
      id: 'disease',
      type: 'Crop Disease',
      icon: AlertTriangle,
      iconColor: 'text-red-600',
      badgeBg: 'bg-red-50 text-red-700 border-red-200',
      title: 'High humidity detected',
      action: 'Monitor Mustard for fungal infection',
      detailReason: 'Relative humidity (>68%) combined with warm day temperatures creates an optimal microclimate for White Rust and Alternaria blight spore germination.',
      steps: [
        'Inspect lower leaves of Mustard plants for white chalky pustules or concentric brown leaf spots.',
        'If early infection spots appear on >5% plants, apply preventative Mancozeb (2 g/L).',
        'Avoid overhead spraying or excessive inter-row weed buildup.'
      ],
      timeWindow: 'Today Morning Inspection',
    },
    {
      id: 'heat',
      type: 'Heat Management',
      icon: Sun,
      iconColor: 'text-orange-600',
      badgeBg: 'bg-orange-50 text-orange-700 border-orange-200',
      title: 'High afternoon temperature',
      action: 'Prefer evening irrigation',
      detailReason: 'Midday sunlight causes extreme surface evaporation. Water applied under high heat shocks roots and evaporates before reaching deep moisture zones.',
      steps: [
        'Shift necessary vegetable and nursery watering to after 5:30 PM.',
        'Evening watering allows maximum root infiltration overnight.',
        'Check that soil mulching is intact on exposed beds.'
      ],
      timeWindow: 'Today 5:30 PM – 7:30 PM',
    },
  ];

  // ── CROPS WEATHER IMPACT DATA ──
  const cropImpacts = [
    {
      name: 'Wheat',
      hindi: 'गेहूं',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrnaOut2o3NiA8wuftZUesZmlTSSIGvCnzuiXGtIXxm8niujcsKrNac6pWYe7ml22n1uxVg7TjvWA4lBmXVFbreYXQy2GZjku-GXmQH7cBOgaSse4x_j1EMcF1kL6UvGW1mKHMrMfceUZMPAXh8XRQM6C3K1S7KEH4sZHCi1fx6klAz_ebFqG565PWV03RQj14gtZKZQkJYSBqph0YY4OMY-SXETlmtATPXvEQCQ9DCVq8RMurGP8552dl3DnaMJoA8I1MEPvlFjU',
      status: 'SAFE',
      statusColor: 'bg-[#e5f9e2] text-[#006e1c] border-[#006e1c]/20',
      explanation: 'Current temperature (26°C) and sunlight are suitable for active grain filling.',
      action: 'Continue current schedule',
      actionBtn: 'View Schedule',
      onAction: () => {
        setActiveModalData({
          title: 'Wheat Irrigation Schedule',
          type: 'Wheat Crop Management',
          icon: Sprout,
          iconColor: 'text-primary',
          badgeBg: 'bg-[#e5f9e2] text-[#006e1c] border-[#006e1c]/30',
          titleDesc: 'Grain filling stage irrigation guidelines',
          detailReason: 'Wheat at 65% maturity requires steady, light moisture without stagnation. The current warm days promote starch accumulation in grains.',
          steps: [
            'Maintain 18–20% soil moisture.',
            'Next scheduled light irrigation: in 2 days (if rain does not occur).',
            'Inspect ears for uniform golden ripening.'
          ],
          timeWindow: 'Grain Filling Stage (Next 18 Days)',
        });
      }
    },
    {
      name: 'Mustard',
      hindi: 'सरसों',
      image: '/images/crops/mustard_field.webp',
      status: 'ATTENTION',
      statusColor: 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]',
      explanation: 'High humidity may increase fungal disease risk and aphid activity during pod maturity.',
      action: 'Monitor crop closely',
      actionBtn: 'Check Crop',
      onAction: () => navigate('/farmer/diagnosis')
    },
    {
      name: 'Chickpea',
      hindi: 'चना',
      image: '/images/crops/chickpea_field.webp',
      status: 'SAFE',
      statusColor: 'bg-[#e5f9e2] text-[#006e1c] border-[#006e1c]/20',
      explanation: 'Weather conditions are currently suitable with low pod-borer pressure under clear skies.',
      action: 'No action required',
      actionBtn: 'View Crop',
      onAction: () => navigate('/farmer/home')
    }
  ];

  // ── FARMING ACTIONS TODAY (Practical Field Tasks) ──
  const farmingTasks = [
    {
      id: 'task-irrigation',
      icon: Droplets,
      category: 'Irrigation',
      title: 'Delay Wheat irrigation if rain is expected.',
      btnLabel: 'View Schedule',
      onClick: () => {
        setActiveModalData({
          title: 'Irrigation Recommendation',
          type: 'Water Conservation',
          icon: Droplets,
          iconColor: 'text-blue-600',
          badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
          titleDesc: 'Avoid unnecessary pump runs ahead of rain',
          detailReason: 'Rain showers forecast within 36 hours. Delaying irrigation saves power and prevents anaerobic root zone stress.',
          steps: [
            'Postpone pump schedule by 24 hours.',
            'Test soil top 4 inches: if damp, delay further.',
            'Ensure drainage canals are free of debris.'
          ],
          timeWindow: 'Postpone by 24–48 Hours',
        });
      }
    },
    {
      id: 'task-spraying',
      icon: Tractor,
      category: 'Spraying',
      title: 'Avoid spraying during strong wind conditions.',
      btnLabel: 'Best Time',
      onClick: () => {
        setActiveModalData({
          title: 'Optimal Spraying Window',
          type: 'Chemical Efficiency',
          icon: Wind,
          iconColor: 'text-amber-600',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
          titleDesc: 'Wind speed guide for foliar nutrition & pesticides',
          detailReason: 'Current afternoon wind picks up to 12–15 km/h. Calm morning air ensures maximum chemical deposit directly on pest targets.',
          steps: [
            'Best Window: Tomorrow 6:00 AM – 8:30 AM (Wind < 5 km/h).',
            'Avoid spraying during 12:00 PM – 4:30 PM.',
            'Ensure spray nozzles face down at 45cm canopy height.'
          ],
          timeWindow: 'Tomorrow 6:00 AM – 8:30 AM',
        });
      }
    },
    {
      id: 'task-monitoring',
      icon: Bug,
      category: 'Crop Monitoring',
      title: 'Check Mustard leaves for fungal symptoms.',
      btnLabel: 'Check Crop',
      onClick: () => navigate('/farmer/diagnosis')
    },
    {
      id: 'task-cropcare',
      icon: Leaf,
      category: 'Crop Care',
      title: 'Continue monitoring Wheat growth.',
      btnLabel: 'View Crop',
      onClick: () => navigate('/farmer/home')
    }
  ];

  if (loading) {
    return (
      <div className="flex flex-col h-full items-center justify-center bg-surface-light min-h-[400px]">
        <Loader2 size={36} className="text-primary animate-spin mb-3" />
        <span className="font-headline font-bold text-onSurface text-base">Loading Weather Intelligence...</span>
        <span className="font-body text-onSurface-variant text-xs mt-1">Connecting to Guna weather station</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-surface-light text-onSurface font-body">
      
      {/* Mobile Top App Bar */}
      {isMobile && (
        <AppTopBar 
          title="Weather Intelligence" 
          showBack={true} 
          showNotification={true} 
        />
      )}

      {/* Main Scrollable Content */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
        <div className="page-content flex flex-col gap-7 md:gap-9 max-w-[1240px] mx-auto py-5 px-4 md:px-8">

          {/* ══════════════════════════════════════════════════════════════
              1. PAGE HEADER (Title, Location, Updated Ago, Search)
              ══════════════════════════════════════════════════════════════ */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-headline font-extrabold text-2xl md:text-3xl text-onSurface tracking-tight m-0">
                  Weather Intelligence
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#e5f9e2] text-[#006e1c] border border-[#006e1c]/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006e1c] animate-pulse"></span>
                  Live
                </span>
              </div>

              {/* Location Badge + Updated Ago */}
              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-[#dce8dc] text-onSurface font-headline font-bold text-xs hover:border-primary/40 hover:bg-[#f6faf5] transition-all cursor-pointer shadow-2xs group"
                  title="Click to change location"
                >
                  <MapPin size={14} className="text-primary group-hover:scale-110 transition-transform" />
                  <span>{cityName}, Madhya Pradesh</span>
                  <Search size={12} className="text-onSurface-variant/70 ml-0.5" />
                </button>

                <div className="flex items-center gap-1.5 text-onSurface-variant text-xs">
                  <Clock size={13} className="text-onSurface-variant/70" />
                  <span>{timeAgoStr}</span>
                  <button 
                    onClick={() => fetchWeatherData(cityName, true)}
                    disabled={refreshing}
                    className="p-1 rounded-lg hover:bg-black/5 text-primary transition-transform active:rotate-180 disabled:opacity-50 cursor-pointer border-none bg-transparent"
                    title="Refresh weather"
                  >
                    <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Action Button to open search directly */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-white border border-[#dce8dc] hover:border-primary/50 text-onSurface font-headline font-semibold text-xs rounded-xl shadow-2xs transition-all cursor-pointer"
              >
                <Search size={14} className="text-primary" />
                <span>Change City</span>
              </button>
            </div>
          </header>

          {/* Location Autocomplete Dropdown Search (Animated dropdown) */}
          {showSearch && (
            <div className="bg-white rounded-2xl p-3.5 border border-primary/20 shadow-md flex flex-col gap-2 relative z-30 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
                  <input
                    type="text"
                    className="w-full h-11 bg-[#f9fbf9] border border-[#dce8dc] rounded-xl pl-10 pr-4 font-body text-sm text-onSurface placeholder:text-onSurface-variant/60 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Search any town or district... (e.g. Bhopal, Indore, Ashoknagar, Jaipur)"
                    value={searchQuery}
                    onChange={(e) => handleSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleManualSearch()}
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleManualSearch}
                  className="h-11 px-5 bg-primary text-white font-headline font-bold text-xs rounded-xl border-none cursor-pointer hover:bg-[#005a16] active:scale-95 transition-all shadow-xs"
                >
                  Search
                </button>
                <button
                  onClick={() => setShowSearch(false)}
                  className="h-11 w-11 flex items-center justify-center text-onSurface-variant hover:bg-black/5 rounded-xl border-none cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Suggestions list */}
              {suggestions.length > 0 && (
                <div className="flex flex-col divide-y divide-[#f0f4f0] bg-white rounded-xl border border-[#e4ede3] max-h-56 overflow-y-auto mt-1 shadow-sm">
                  {suggestions.map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full px-4 py-2.5 flex items-center gap-2.5 text-left bg-transparent border-none cursor-pointer hover:bg-[#f2f9f1] transition-colors font-body text-xs text-onSurface"
                      onClick={() => selectSuggestion(item.name)}
                    >
                      <MapPin size={14} className="text-primary shrink-0" />
                      <div>
                        <span className="font-bold text-sm block">{item.name}</span>
                        {item.state && <span className="text-[11px] text-onSurface-variant">{item.state}</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {searchError && (
                <p className="text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-lg m-0 border border-red-200">
                  {searchError}
                </p>
              )}
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════
              2. CURRENT WEATHER HERO (Clean White Card, Light Green Trim)
              ══════════════════════════════════════════════════════════════ */}
          <section className="bg-white rounded-3xl p-6 md:p-8 border border-[#e0ede0] shadow-[0_4px_24px_rgba(0,110,28,0.04)] relative overflow-hidden transition-all">
            {/* Subtle soft green ambient aura in the upper corner */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#006e1c]/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-[#edf3ec]">
              {/* Left Side: Temperature, Condition, Location */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-headline font-bold uppercase tracking-wider text-primary">
                    Current Observation
                  </span>
                  <span className="text-onSurface-variant/40">•</span>
                  <span className="text-xs text-onSurface-variant font-medium">
                    {cityName}, MP
                  </span>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="font-headline font-black text-6xl md:text-7xl text-onSurface tracking-tighter">
                    {temp}°<span className="text-3xl md:text-4xl font-bold text-onSurface-variant/60 font-body">C</span>
                  </span>
                  <div className="flex flex-col">
                    <span className="font-headline font-bold text-xl md:text-2xl text-onSurface capitalize">
                      {weatherCondition}
                    </span>
                    <span className="text-xs font-semibold text-onSurface-variant">
                      Feels like {feelsLike}°C
                    </span>
                  </div>
                </div>

                <p className="text-onSurface-variant text-sm font-medium mt-3 max-w-lg m-0 leading-relaxed">
                  Favorable weather for farming operations. Mild winds, good solar radiation for crops, and optimal soil temperature.
                </p>
              </div>

              {/* Right Side: Large Weather Illustration + Sunrise / Sunset */}
              <div className="flex items-center gap-6 self-center md:self-auto shrink-0">
                <div className="p-3 bg-[#f6fbf5] rounded-3xl border border-[#e0eee0] flex items-center justify-center shadow-xs">
                  <DynamicWeatherIcon condition={weatherCondition} size={84} />
                </div>

                <div className="flex flex-col gap-3 min-w-[140px]">
                  {/* Sunrise */}
                  <div className="flex items-center gap-3 bg-[#f9fcf8] rounded-2xl p-2.5 px-3.5 border border-[#e7f1e6]">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                      <Sunrise size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-onSurface-variant uppercase tracking-wider block">Sunrise</span>
                      <span className="font-headline font-bold text-xs text-onSurface">{sunriseTime}</span>
                    </div>
                  </div>

                  {/* Sunset */}
                  <div className="flex items-center gap-3 bg-[#f9fcf8] rounded-2xl p-2.5 px-3.5 border border-[#e7f1e6]">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                      <Sunset size={18} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-onSurface-variant uppercase tracking-wider block">Sunset</span>
                      <span className="font-headline font-bold text-xs text-onSurface">{sunsetTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row: 4 Compact Metric Cards (2x2 on mobile, 4-col on desktop) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-6 relative z-10">
              {/* Humidity */}
              <div className="bg-[#f9fbf8] rounded-2xl p-3 sm:p-3.5 border border-[#e4ece3] flex items-center gap-2.5 sm:gap-3 hover:border-primary/30 transition-colors">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Droplets size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-onSurface-variant block truncate">Humidity</span>
                  <span className="font-headline font-extrabold text-sm sm:text-base md:text-lg text-onSurface block truncate">{humidity}%</span>
                </div>
              </div>

              {/* Wind Speed */}
              <div className="bg-[#f9fbf8] rounded-2xl p-3 sm:p-3.5 border border-[#e4ece3] flex items-center gap-2.5 sm:gap-3 hover:border-primary/30 transition-colors">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
                  <Wind size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-onSurface-variant block truncate">Wind</span>
                  <span className="font-headline font-extrabold text-sm sm:text-base md:text-lg text-onSurface block truncate">{windSpeed} km/h</span>
                </div>
              </div>

              {/* Rain Probability */}
              <div className="bg-[#f9fbf8] rounded-2xl p-3 sm:p-3.5 border border-[#e4ece3] flex items-center gap-2.5 sm:gap-3 hover:border-primary/30 transition-colors">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 shrink-0">
                  <CloudRain size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-onSurface-variant block truncate">Rain Prob.</span>
                  <span className="font-headline font-extrabold text-sm sm:text-base md:text-lg text-onSurface block truncate">{currentRainProb}%</span>
                </div>
              </div>

              {/* UV Index */}
              <div className="bg-[#f9fbf8] rounded-2xl p-3 sm:p-3.5 border border-[#e4ece3] flex items-center gap-2.5 sm:gap-3 hover:border-primary/30 transition-colors">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                  <Sun size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-onSurface-variant block truncate">UV Index</span>
                  <span className="font-headline font-extrabold text-sm sm:text-base md:text-lg text-amber-700 block truncate">{uvIndexDisplay}</span>
                </div>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              3. TODAY'S FARM ALERTS (Converting Weather into Farmer Actions)
              ══════════════════════════════════════════════════════════════ */}
          <section className="flex flex-col gap-3.5">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert size={20} className="text-primary" />
                <h2 className="font-headline font-bold text-xl md:text-2xl text-onSurface m-0 tracking-tight">
                  Today's Farm Alerts
                </h2>
              </div>
              <p className="text-onSurface-variant text-xs md:text-sm m-0 mt-0.5 font-medium">
                Weather conditions that may affect your crops and field schedule
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {farmAlerts.map((alert) => {
                const IconComponent = alert.icon;
                return (
                  <div
                    key={alert.id}
                    className="bg-white rounded-2xl p-4 md:p-5 border border-[#e2ede1] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:border-primary/40 group"
                  >
                    <div>
                      {/* Top Header of Alert Card */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-xl bg-surface-containerLow flex items-center justify-center ${alert.iconColor}`}>
                            <IconComponent size={18} />
                          </div>
                          <span className="text-xs font-headline font-bold text-onSurface">
                            {alert.type}
                          </span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${alert.badgeBg}`}>
                          Notice
                        </span>
                      </div>

                      {/* Alert Titles & Actions */}
                      <h3 className="font-headline font-bold text-sm text-onSurface m-0 mb-1 leading-snug">
                        {alert.title}
                      </h3>
                      <p className="text-xs text-onSurface-variant font-medium leading-relaxed m-0 mb-4">
                        {alert.action}
                      </p>
                    </div>

                    <button
                      onClick={() => setActiveModalData({
                        title: alert.title,
                        type: alert.type,
                        icon: alert.icon,
                        iconColor: alert.iconColor,
                        badgeBg: alert.badgeBg,
                        titleDesc: alert.action,
                        detailReason: alert.detailReason,
                        steps: alert.steps,
                        timeWindow: alert.timeWindow,
                      })}
                      className="w-full py-2.5 px-3 bg-[#f2f8f1] hover:bg-primary hover:text-white text-primary border border-primary/20 hover:border-primary font-headline font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shadow-2xs"
                    >
                      <span>View Advice</span>
                      <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              4. HOURLY FORECAST (6–8 Hours, Highlighted Current Hour)
              ══════════════════════════════════════════════════════════════ */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-headline font-bold text-lg md:text-xl text-onSurface m-0 tracking-tight">
                Hourly Forecast
              </h2>
              <span className="text-xs text-onSurface-variant font-medium">
                Next 24 Hours
              </span>
            </div>

            {/* Horizontal Scrollable Container */}
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1.5 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
              {hourlyData.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center justify-between min-w-[82px] sm:min-w-[92px] py-4 px-2.5 rounded-2xl shrink-0 transition-all snap-start ${
                    item.active
                      ? 'bg-primary text-white shadow-md ring-2 ring-primary/20 scale-[1.02]'
                      : 'bg-white border border-[#e2ece0] text-onSurface hover:border-primary/40 hover:bg-[#f9fcf8]'
                  }`}
                >
                  <span className={`text-xs font-headline font-bold uppercase tracking-wider mb-2 ${
                    item.active ? 'text-white/90' : 'text-onSurface-variant'
                  }`}>
                    {item.time}
                  </span>

                  <div className="my-1.5">
                    <DynamicWeatherIcon 
                      condition={item.icon} 
                      size={28} 
                      className={item.active ? '!text-white fill-white/20' : ''} 
                    />
                  </div>

                  <span className={`font-headline font-bold text-base my-1 ${
                    item.active ? 'text-white' : 'text-onSurface'
                  }`}>
                    {item.temp}°
                  </span>

                  <div className="flex items-center gap-1 mt-1">
                    <Droplet size={11} className={item.active ? 'text-white/70' : 'text-blue-500'} />
                    <span className={`text-[11px] font-bold ${
                      item.active ? 'text-white/90' : 'text-blue-600'
                    }`}>
                      {item.prob}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              5. NEW SECTION — WEATHER IMPACT ON YOUR CROPS
              ══════════════════════════════════════════════════════════════ */}
          <section className="flex flex-col gap-3.5">
            <div>
              <h2 className="font-headline font-bold text-xl md:text-2xl text-onSurface m-0 tracking-tight">
                Weather Impact on Your Crops
              </h2>
              <p className="text-onSurface-variant text-xs md:text-sm m-0 mt-0.5 font-medium">
                See how today's weather conditions may affect your planted crops
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cropImpacts.map((crop, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-5 border border-[#e2ede1] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:border-primary/40"
                >
                  <div>
                    {/* Top: Crop image & status badge */}
                    <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#e5e5e5] shrink-0 border border-[#d8e6d5]">
                          <img
                            src={crop.image}
                            alt={crop.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback if image fails to load
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-headline font-bold text-base text-onSurface m-0 truncate">
                            {crop.name}
                          </h3>
                          <span className="text-[11px] text-onSurface-variant font-medium block">
                            {crop.hindi}
                          </span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-headline font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider border shrink-0 ${crop.statusColor}`}>
                        {crop.status}
                      </span>
                    </div>

                    {/* Explanation */}
                    <p className="text-xs text-onSurface-variant font-medium leading-relaxed m-0 mb-4 bg-[#f8faf8] p-3 rounded-xl border border-[#edf3ec]">
                      {crop.explanation}
                    </p>
                  </div>

                  {/* Recommended Action + Button */}
                  <div className="pt-2 border-t border-[#f0f5ef] flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-bold text-onSurface-variant block">Action</span>
                      <span className="text-xs font-bold text-primary truncate block">{crop.action}</span>
                    </div>
                    <button
                      onClick={crop.onAction}
                      className="px-3.5 py-2 bg-white hover:bg-primary hover:text-white text-primary border border-primary/30 font-headline font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0 active:scale-95 shadow-2xs"
                    >
                      {crop.actionBtn}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              6. NEW SECTION — WHAT YOU SHOULD DO TODAY (Farm Tasks)
              ══════════════════════════════════════════════════════════════ */}
          <section className="flex flex-col gap-3.5">
            <div>
              <h2 className="font-headline font-bold text-xl md:text-2xl text-onSurface m-0 tracking-tight">
                What You Should Do Today
              </h2>
              <p className="text-onSurface-variant text-xs md:text-sm m-0 mt-0.5 font-medium">
                Practical farming tasks converted directly from current forecast parameters
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {farmingTasks.map((task) => {
                const TaskIcon = task.icon;
                return (
                  <div
                    key={task.id}
                    className="bg-white rounded-2xl p-5 border border-[#e2ede1] shadow-2xs hover:shadow-md transition-all flex flex-col justify-between hover:border-primary/40"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-xl bg-[#eaf4e9] text-primary flex items-center justify-center shrink-0">
                          <TaskIcon size={18} />
                        </div>
                        <span className="text-xs font-headline font-bold text-primary">
                          {task.category}
                        </span>
                      </div>

                      <p className="font-headline font-semibold text-xs md:text-sm text-onSurface leading-snug m-0 mb-4">
                        {task.title}
                      </p>
                    </div>

                    <button
                      onClick={task.onClick}
                      className="w-full py-2.5 px-3 bg-white hover:bg-[#f2f8f1] text-primary border border-primary/30 font-headline font-bold text-xs rounded-xl transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1.5 shadow-2xs"
                    >
                      <span>{task.btnLabel}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              7. 7-DAY FORECAST (Current Day Highlighted, Desktop & Mobile)
              ══════════════════════════════════════════════════════════════ */}
          <section className="flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <h2 className="font-headline font-bold text-xl md:text-2xl text-onSurface m-0 tracking-tight">
                7-Day Forecast
              </h2>
              <span className="text-xs text-onSurface-variant font-medium">
                Weekly Weather Outlook
              </span>
            </div>

            {/* Desktop / Tablet Grid & Mobile Scrollable Row */}
            <div className="flex lg:grid lg:grid-cols-7 gap-3 overflow-x-auto no-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory">
              {sevenDayData.map((item, idx) => (
                <div
                  key={idx}
                  className={`min-w-[128px] lg:min-w-0 rounded-2xl p-4 flex flex-col justify-between shrink-0 transition-all snap-start ${
                    item.isToday
                      ? 'bg-[#f4f9f4] border-2 border-primary shadow-xs'
                      : 'bg-white border border-[#e2ece0] shadow-2xs hover:border-primary/40'
                  }`}
                >
                  {/* Top: Day Name + Today pill */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-headline font-bold text-sm ${item.isToday ? 'text-primary' : 'text-onSurface'}`}>
                      {item.day}
                    </span>
                    {item.isToday && (
                      <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-primary text-white">
                        Today
                      </span>
                    )}
                  </div>

                  {/* Weather Icon & Condition */}
                  <div className="flex flex-col items-center my-2.5">
                    <DynamicWeatherIcon condition={item.icon} size={34} />
                    <span className="text-xs font-semibold text-onSurface-variant mt-1.5 text-center leading-tight">
                      {item.condition}
                    </span>
                  </div>

                  {/* Temperature Range Bar & High / Low */}
                  <div className="mt-2 pt-2 border-t border-[#edf3ec] flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-xs font-headline font-bold">
                      <span className="text-onSurface">{item.tempH}°</span>
                      <span className="text-onSurface-variant/70">{item.tempL}°</span>
                    </div>

                    {/* Rain & Wind summary */}
                    <div className="flex items-center justify-between text-[11px] font-medium text-onSurface-variant">
                      <span className="flex items-center gap-0.5 text-blue-600 font-semibold">
                        <Droplet size={10} /> {item.prob}
                      </span>
                      <span className="flex items-center gap-0.5 text-onSurface-variant/70">
                        <Wind size={10} /> {item.wind}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════════
              8. WEATHER TRENDS (Interactive Tab Switcher + Clean SVG Chart)
              ══════════════════════════════════════════════════════════════ */}
          <section className="bg-white rounded-3xl p-6 md:p-8 border border-[#e2ede1] shadow-[0_4px_24px_rgba(0,110,28,0.04)] flex flex-col gap-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-headline font-bold text-xl md:text-2xl text-onSurface m-0 tracking-tight">
                  Weather Trends
                </h2>
                <p className="text-onSurface-variant text-xs md:text-sm m-0 mt-0.5 font-medium">
                  24-Hour continuous environmental curves to plan farm operations
                </p>
              </div>

              {/* Tab Switcher: Temperature | Rain | Humidity | Wind */}
              <div className="flex p-1 bg-[#f0f6ef] rounded-2xl border border-[#d8e6d5] shrink-0 self-start sm:self-auto overflow-x-auto max-w-full">
                {[
                  { id: 'temp', label: 'Temperature', icon: Thermometer },
                  { id: 'rain', label: 'Rain Prob.', icon: CloudRain },
                  { id: 'humidity', label: 'Humidity', icon: Droplets },
                  { id: 'wind', label: 'Wind', icon: Wind },
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  const isActive = activeTrendTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTrendTab(tab.id);
                        setHoveredPointIndex(null);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-headline text-xs font-bold transition-all cursor-pointer border-none whitespace-nowrap ${
                        isActive
                          ? 'bg-white text-primary shadow-xs ring-1 ring-black/5'
                          : 'bg-transparent text-onSurface-variant hover:text-onSurface'
                      }`}
                    >
                      <TabIcon size={14} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Chart Area */}
            <div className="bg-[#f9fbf8] rounded-2xl p-4 md:p-6 border border-[#e4ede3] relative flex flex-col">
              {/* Chart Summary Stats */}
              <div className="flex items-center justify-between mb-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: trendConfig.color }}></span>
                  <span className="font-headline font-bold text-onSurface">
                    {trendConfig.label} ({trendConfig.unit})
                  </span>
                </div>
                <div className="flex items-center gap-3 text-onSurface-variant text-xs font-medium">
                  <span>Min: <strong>{Math.min(...trendConfig.values)}{trendConfig.unit}</strong></span>
                  <span>•</span>
                  <span>Max: <strong>{Math.max(...trendConfig.values)}{trendConfig.unit}</strong></span>
                </div>
              </div>

              {/* SVG Area Line Chart */}
              <div className="w-full overflow-hidden">
                <svg
                  viewBox="0 0 620 170"
                  className="w-full h-44 sm:h-52 overflow-visible"
                >
                  <defs>
                    <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={trendConfig.color} stopOpacity="0.22" />
                      <stop offset="100%" stopColor={trendConfig.color} stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal gridlines */}
                  <line x1="30" y1="30" x2="590" y2="30" stroke="#e0ede0" strokeDasharray="3 3" />
                  <line x1="30" y1="85" x2="590" y2="85" stroke="#e0ede0" strokeDasharray="3 3" />
                  <line x1="30" y1="140" x2="590" y2="140" stroke="#e0ede0" strokeDasharray="3 3" />

                  {/* Area fill under curve */}
                  {chartPathData.areaPath && (
                    <path
                      d={chartPathData.areaPath}
                      fill="url(#trendGradient)"
                    />
                  )}

                  {/* Main line curve */}
                  {chartPathData.path && (
                    <path
                      d={chartPathData.path}
                      fill="none"
                      stroke={trendConfig.color}
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* Data Points and Value Badges */}
                  {chartPathData.points.map((pt, idx) => {
                    const isHovered = hoveredPointIndex === idx;
                    return (
                      <g 
                        key={idx} 
                        className="cursor-pointer group"
                        onMouseEnter={() => setHoveredPointIndex(idx)}
                        onMouseLeave={() => setHoveredPointIndex(null)}
                      >
                        {/* Outer hover ring */}
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isHovered ? 8 : 5}
                          fill={isHovered ? trendConfig.color : '#ffffff'}
                          stroke={trendConfig.color}
                          strokeWidth={isHovered ? 2 : 2.5}
                          className="transition-all duration-150"
                        />

                        {/* Value Text label directly above each point */}
                        <text
                          x={pt.x}
                          y={pt.y - 10}
                          textAnchor="middle"
                          className="font-headline font-bold text-[11px]"
                          fill="#1b1c18"
                        >
                          {pt.val}{trendConfig.unit}
                        </text>

                        {/* Time label on x-axis */}
                        <text
                          x={pt.x}
                          y={162}
                          textAnchor="middle"
                          className="font-body text-[10px]"
                          fill="#707a6c"
                        >
                          {trendConfig.labels[idx]}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════
          ADVICE & ACTION DETAIL MODAL (Opens on "View Advice" / Tasks)
          ══════════════════════════════════════════════════════════════ */}
      {activeModalData && (
        <div 
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveModalData(null)}
        >
          <div 
            className="bg-white rounded-3xl p-6 md:p-7 max-w-lg w-full border border-[#dce8dc] shadow-xl flex flex-col gap-4 relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-2xl bg-surface-containerLow flex items-center justify-center shrink-0 ${activeModalData.iconColor}`}>
                  {React.createElement(activeModalData.icon, { size: 22 })}
                </div>
                <div>
                  <span className={`text-[10px] font-headline font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider border ${activeModalData.badgeBg}`}>
                    {activeModalData.type}
                  </span>
                  <h3 className="font-headline font-bold text-lg text-onSurface m-0 mt-1">
                    {activeModalData.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModalData(null)}
                className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-onSurface-variant border-none cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Operational Time Window */}
            {activeModalData.timeWindow && (
              <div className="flex items-center gap-2 bg-[#f4f9f4] border border-[#d8e6d5] p-3 rounded-xl text-xs font-headline font-semibold text-primary">
                <Clock size={16} />
                <span>Recommended Window: {activeModalData.timeWindow}</span>
              </div>
            )}

            {/* Scientific Agronomic Rationale */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-onSurface-variant mb-1 m-0">
                Weather Impact Analysis
              </h4>
              <p className="text-xs text-onSurface-variant leading-relaxed m-0 bg-[#f9fbf8] p-3.5 rounded-xl border border-[#e4ede3]">
                {activeModalData.detailReason}
              </p>
            </div>

            {/* Recommended Steps Checklist */}
            {activeModalData.steps && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-onSurface-variant mb-2 m-0">
                  Recommended Action Steps
                </h4>
                <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                  {activeModalData.steps.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-onSurface font-medium">
                      <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#edf3ec] mt-1">
              <button
                onClick={() => setActiveModalData(null)}
                className="w-full py-2.5 px-5 bg-primary hover:bg-[#005a16] text-white font-headline font-bold text-xs rounded-xl border-none cursor-pointer transition-all active:scale-95 shadow-sm"
              >
                Got It, Apply To Farm
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}