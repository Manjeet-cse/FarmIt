import { useState, useMemo, useEffect } from 'react';
import BottomTabs from '../../components/layout/BottomTabs';
import AppTopBar from '../../components/common/AppTopBar';

const MOCK_CROPS = [
  { id: 1, name: 'Wheat', variety: 'Grade A • Bulk', category: 'Rabi', price: '2,250', unit: '/Qtl', trend: 'up', change: '₹15 (0.6%)', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNtiXvY2hvHrB0H116DC92rppfahtv5qVNnE_u-zc5QtN_gbGe2EvO2DAhiih1NcnBh5Up8xUiF4UVIq-vklIHFlCenlNZt4Ogp-MJRh2zE-qcuiemWIdvmy0tXGKiBdfn6J9QzfnQ1cIif4pEwHfTZU_wrQxmcYRGYLr8_Vr1ooCSWZp2e_98tejJtInu5kphHo2OYaqeIsi3hnC2SyJ7RaHD-jihCz16Ynga_y9nvdxovSn5LRWE2V9Ff_XKVBu2OUlUusbB9C0' },
  { id: 2, name: 'Mustard', variety: 'Black • Premium', category: 'Rabi', price: '5,100', unit: '/Qtl', trend: 'up', change: '₹45 (0.8%)', image: '/mustard_seeds.png' },
  { id: 3, name: 'Basmati Rice', variety: '1121 • Raw', category: 'Kharif', price: '4,800', unit: '/Qtl', trend: 'up', change: '₹120 (2.5%)', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb0H1FE8WvbVKIB2WxvgqEVB-wjB3tD7-HuvChOW1mNJ0XfQ3LQZG7BIOFGHt4JR3gDVLqIhouA_CfFIm4k9q54IAFDNy7iNOeoiSJnbIlN56S61Y5KSe_2cyD6zL9l9ADAnQcCDJncvSzaSLS0m3_yN5_dhLoD1UqIGVoz51uLzLUMeZh9Obxj2ED20TfzvFTqiRp4Jhp7xRXMF5ZnF2sdQwHRaoapPsU8s2JUh0OLkc4qIguRqir_QY5iP2ekC4w_syRhUUJuUY' },
  { id: 4, name: 'Onion', variety: 'Red • Medium', category: 'Vegetables', price: '1,850', unit: '/Qtl', trend: 'neutral', change: 'Unchanged', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADx6bIn7RGoT9arkof-wQCObVz0uUut2s5VAG72qZGM5U1jfSC54CsyGobEzWa-KegvRdu1H-CKaQz6fdrDtbKQuopPfVokF0ovvld23ibYQ9L_vJWvcUT5o4sF4P5nd17t1WC8GKdWsRsEew7hFO-7KXAXSDc6MDFAhfHfQJ24H5jmisWNN7qUvTe4lg-N4rqKOaKfTSUrzJsVIvEcMf7_gWyxKgjHBmb1Y8S80LF-4C_110Eeoc7s_RDqKRIebQxtPhHd8aoPCE' },
  { id: 5, name: 'Tomato', variety: 'Hybrid • Grade A', category: 'Vegetables', price: '2,100', unit: '/Qtl', trend: 'up', change: '₹200 (10.5%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Tomato_je.jpg/330px-Tomato_je.jpg' },
  { id: 6, name: 'Potato', variety: 'Kufri Jyoti', category: 'Vegetables', price: '1,200', unit: '/Qtl', trend: 'down', change: '₹50 (4.0%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Patates.jpg/330px-Patates.jpg' },
  { id: 7, name: 'Maize', variety: 'Yellow • Feed Grade', category: 'Kharif', price: '2,050', unit: '/Qtl', trend: 'up', change: '₹25 (1.2%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg/330px-Zea_mays_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-283.jpg' },
  { id: 8, name: 'Cotton', variety: 'BT • Long Staple', category: 'Kharif', price: '7,200', unit: '/Qtl', trend: 'up', change: '₹150 (2.1%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/CottonPlant.JPG/330px-CottonPlant.JPG' },
  { id: 9, name: 'Soyabean', variety: 'Yellow • Grade A', category: 'Kharif', price: '4,500', unit: '/Qtl', trend: 'down', change: '₹80 (1.7%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Soybean.USDA.jpg/330px-Soybean.USDA.jpg' },
  { id: 10, name: 'Sugarcane', variety: 'Co 0238', category: 'Kharif', price: '380', unit: '/Qtl', trend: 'neutral', change: 'Unchanged', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Saccharum_officinarum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-125.jpg/330px-Saccharum_officinarum_-_K%C3%B6hler%E2%80%93s_Medizinal-Pflanzen-125.jpg' },
  { id: 11, name: 'Apple', variety: 'Royal Delicious', category: 'Fruits', price: '6,500', unit: '/Qtl', trend: 'up', change: '₹300 (4.8%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Pink_lady_and_cross_section.jpg/330px-Pink_lady_and_cross_section.jpg' },
  { id: 12, name: 'Banana', variety: 'Robusta', category: 'Fruits', price: '1,500', unit: '/Qtl', trend: 'down', change: '₹20 (1.3%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Bananavarieties.jpg/330px-Bananavarieties.jpg' },
  { id: 13, name: 'Mango', variety: 'Alphonso', category: 'Fruits', price: '8,000', unit: '/Qtl', trend: 'up', change: '₹500 (6.6%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mangos_-_single_and_halved.jpg/330px-Mangos_-_single_and_halved.jpg' },
  { id: 14, name: 'Garlic', variety: 'White • Big', category: 'Vegetables', price: '12,000', unit: '/Qtl', trend: 'up', change: '₹800 (7.1%)', image: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Allium_sativum_Woodwill_1793.jpg' },
  { id: 15, name: 'Ginger', variety: 'Fresh • Grade A', category: 'Vegetables', price: '8,500', unit: '/Qtl', trend: 'down', change: '₹150 (1.7%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Koeh-146-no_text.jpg/330px-Koeh-146-no_text.jpg' },
  { id: 16, name: 'Green Chilli', variety: 'G4', category: 'Vegetables', price: '3,200', unit: '/Qtl', trend: 'up', change: '₹120 (3.8%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Madame_Jeanette_and_other_chillies.jpg/330px-Madame_Jeanette_and_other_chillies.jpg' },
  { id: 17, name: 'Cabbage', variety: 'Green • Round', category: 'Vegetables', price: '800', unit: '/Qtl', trend: 'down', change: '₹40 (4.7%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Cabbage_and_cross_section_on_white.jpg/330px-Cabbage_and_cross_section_on_white.jpg' },
  { id: 18, name: 'Cauliflower', variety: 'White • Snowball', category: 'Vegetables', price: '1,400', unit: '/Qtl', trend: 'up', change: '₹60 (4.4%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Chou-fleur_02.jpg/330px-Chou-fleur_02.jpg' },
  { id: 19, name: 'Gram (Chana)', variety: 'Desi', category: 'Rabi', price: '5,800', unit: '/Qtl', trend: 'up', change: '₹110 (1.9%)', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Chickpea_BNC.jpg/330px-Chickpea_BNC.jpg' },
  { id: 20, name: 'Tur (Arhar)', variety: 'Red • Split', category: 'Kharif', price: '9,500', unit: '/Qtl', trend: 'neutral', change: 'Unchanged', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Cajanus_cajan_Blanco1.167-cropped.jpg/330px-Cajanus_cajan_Blanco1.167-cropped.jpg' }
];

const FILTER_CATEGORIES = ['All Crops', 'Rabi', 'Kharif', 'Vegetables', 'Fruits'];

const getCropImage = (image, name) => {
  if (image) return image;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=dff3dc&color=2E7D32&bold=true`;
};

const generateTrendData = (crop) => {
  const basePrice = parseInt(crop.price.replace(/,/g, ''));
  const trend = crop.trend;
  const data = [];
  const today = new Date();
  
  const randomOffsets = [-180, 120, -90, 160, -60, 80, 0];
  
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dayStr = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dateStr = d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    
    let priceMod = 0;
    if (trend === 'up') {
      priceMod = -i * 150 + randomOffsets[6 - i];
    } else if (trend === 'down') {
      priceMod = i * 150 + randomOffsets[6 - i];
    } else {
      priceMod = randomOffsets[6 - i] * 1.5;
    }
    
    if (i === 0) priceMod = 0;
    
    const medPrice = Math.round(basePrice + priceMod);
    const premiumPrice = Math.round(medPrice + 500);
    const lowPrice = Math.round(medPrice - 400);
    
    data.push({
      day: dayStr,
      date: dateStr,
      medium: medPrice,
      premium: premiumPrice,
      low: lowPrice
    });
  }
  return data;
};

export default function MandiScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Crops');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedPointIndex, setSelectedPointIndex] = useState(6); // Default to today
  const [activeGrade, setActiveGrade] = useState('medium');

  useEffect(() => {
    if (selectedCrop) {
      setSelectedPointIndex(6);
      setActiveGrade('medium');
    }
  }, [selectedCrop]);

  const filteredCrops = useMemo(() => {
    return MOCK_CROPS.filter(crop => {
      const matchesSearch = crop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            crop.variety.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = activeFilter === 'All Crops' || crop.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const { trendData, todayData, yesterdayData, minPrice, maxPrice, range } = useMemo(() => {
    if (!selectedCrop) return {};
    const tData = generateTrendData(selectedCrop);
    const rawMin = Math.min(...tData.map(d => d[activeGrade]));
    const rawMax = Math.max(...tData.map(d => d[activeGrade]));
    // 5-10% padding for clear visualization
    const padding = (rawMax - rawMin) * 0.1 || rawMax * 0.05;
    const minP = Math.max(0, rawMin - padding);
    const maxP = rawMax + padding;
    return {
      trendData: tData,
      todayData: tData[6],
      yesterdayData: tData[5],
      minPrice: minP,
      maxPrice: maxP,
      range: maxP - minP || 1
    };
  }, [selectedCrop, activeGrade]);

  const getPathY = (val) => {
    if (!range) return 50;
    // Map value to 5-95% to ensure dots don't clip bounds
    return 100 - ((val - minPrice) / range) * 90 - 5;
  };

  let points = [];
  let pathD = '';
  let gradientPathD = '';

  const createSmoothPath = (pointsArray) => {
    if (!pointsArray || pointsArray.length === 0) return '';
    let d = `M ${pointsArray[0].x} ${pointsArray[0].y}`;
    for (let i = 0; i < pointsArray.length - 1; i++) {
      const p0 = pointsArray[i];
      const p1 = pointsArray[i+1];
      const cp1x = p0.x + (p1.x - p0.x) / 2;
      const cp1y = p0.y;
      const cp2x = p1.x - (p1.x - p0.x) / 2;
      const cp2y = p1.y;
      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  if (trendData && trendData.length > 0) {
    points = trendData.map((d, i) => ({ x: (i/6)*100, y: getPathY(d[activeGrade]) }));
    pathD = createSmoothPath(points);
    gradientPathD = `${pathD} L 100 100 L 0 100 Z`;
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface">
      {!selectedCrop && (
        <AppTopBar 
          title="Mandi Updates" 
          showBack={true} 
          showNotification={true} 
        />
      )}

      {/* ── Scrollable Content Area ─────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {selectedCrop ? (
          <main className="w-full min-h-full flex flex-col bg-[#F8F9FA]">
            
            {/* Custom Top Bar */}
            <header className="px-4 py-4 flex justify-between items-start bg-primary text-white sticky top-0 z-50 shadow-md">
              <div className="flex gap-4">
                <button onClick={() => setSelectedCrop(null)} className="mt-1 flex items-center justify-center bg-transparent border-none p-0 cursor-pointer text-white transition-opacity hover:opacity-80">
                  <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <div className="flex flex-col">
                  <h1 className="font-bold text-xl text-white m-0">Mandi Prices</h1>
                  <div className="flex items-center text-white/80 mt-0.5 text-sm cursor-pointer capitalize transition-colors hover:text-white">
                    {activeGrade} Grade <span className="material-symbols-outlined text-[16px] ml-0.5">keyboard_arrow_down</span>
                  </div>
                </div>
              </div>
              <button className="flex items-center justify-center bg-transparent border-none p-1 cursor-pointer text-white transition-opacity hover:opacity-80">
                <span className="material-symbols-outlined text-[24px]">notifications</span>
              </button>
            </header>

            <div className="px-4 pb-24 flex flex-col gap-5 pt-3">
              {/* 7-DAY PRICE GRAPH CARD */}
              <section className="bg-white rounded-2xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-[#E5E5E5]">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-[17px] text-[#1A1A1A] flex items-center gap-1.5 m-0">
                    7-Day Trend <span className="material-symbols-outlined text-[14px] text-[#888888]">info</span>
                  </h3>
                  <div className="flex gap-1 text-[11px] font-bold">
                    <button className="px-2.5 py-1 rounded bg-[#E8F5E9] text-[#1B5E20] border-none">7D</button>
                    <button className="px-2 py-1 rounded bg-transparent text-[#666666] border-none">1M</button>
                    <button className="px-2 py-1 rounded bg-transparent text-[#666666] border-none">3M</button>
                    <button className="px-2 py-1 rounded bg-transparent text-[#666666] border-none">1Y</button>
                    <button className="px-2 py-1 rounded bg-transparent text-[#666666] border-none">ALL</button>
                  </div>
                </div>
                
                <div className="flex items-center gap-1.5 mb-5 text-[12px] text-[#666666] capitalize">
                  <span className="w-2 h-2 rounded-full bg-[#1B5E20]"></span> {activeGrade} Grade Price
                </div>

                <div className="relative h-44 w-full pb-6 pr-12">
                  {/* Chart Area */}
                  <div className="relative w-full h-full">
                    {/* Interactive Tooltip Overlay */}
                    {selectedPointIndex !== null && trendData && trendData[selectedPointIndex] && (
                      <div 
                        className="absolute z-20 flex flex-col items-center pointer-events-none transition-all duration-300"
                        style={{ 
                          left: `${(selectedPointIndex/6)*100}%`, 
                          top: `${getPathY(trendData[selectedPointIndex][activeGrade])}%`,
                          transform: 'translate(-50%, -100%)',
                          marginTop: '-8px'
                        }}
                      >
                        <div className="bg-[#113813] text-white px-3 py-1.5 rounded-lg shadow-lg flex flex-col min-w-[90px] items-center">
                          <span className="text-[10px] text-white/90 mb-0.5">{trendData[selectedPointIndex].day === 'Today' ? `Today, ${trendData[selectedPointIndex].date}` : `${trendData[selectedPointIndex].day}, ${trendData[selectedPointIndex].date}`}</span>
                          <span className="text-[16px] font-bold text-[#4CAF50]">₹{trendData[selectedPointIndex][activeGrade].toLocaleString('en-IN')}</span>
                          <span className="text-[9px] text-white/70 mt-0.5 capitalize">{activeGrade} Grade</span>
                        </div>
                        <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-transparent border-t-[#113813]"></div>
                      </div>
                    )}

                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4CAF50" stopOpacity="0.1"/>
                          <stop offset="100%" stopColor="#4CAF50" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Gradient Fill */}
                      {gradientPathD && (
                        <path 
                          d={gradientPathD}
                          fill="url(#chartGradient)"
                          className="transition-all duration-300"
                        />
                      )}

                      {/* Smooth Curve */}
                      {pathD && (
                        <path d={pathD} fill="none" stroke="#1B5E20" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" className="transition-all duration-300" />
                      )}
                      
                      {/* Vertical Guide Line */}
                      {selectedPointIndex !== null && (
                        <line 
                          x1={(selectedPointIndex/6)*100} 
                          y1={getPathY(trendData[selectedPointIndex][activeGrade])} 
                          x2={(selectedPointIndex/6)*100} 
                          y2="100" 
                          stroke="#BDBDBD" 
                          strokeWidth="1"
                          strokeDasharray="4 4"
                          className="transition-all duration-300 pointer-events-none"
                        />
                      )}

                      {/* End Point (Today) Tag */}
                      {points && points.length > 0 && selectedPointIndex !== 6 && (
                        <g className="pointer-events-none transition-all duration-300">
                          <circle cx={points[6].x} cy={points[6].y} r="3" fill="white" stroke="#1B5E20" strokeWidth="2" />
                        </g>
                      )}

                      {/* Selected Point Highlight */}
                      {points.map((p, i) => {
                        const isSelected = i === selectedPointIndex;
                        if (!isSelected) return null;
                        return (
                          <g key={`pt-${i}`} className="pointer-events-none transition-all duration-300">
                            <circle cx={p.x} cy={p.y} r="6" fill="#1B5E20" opacity="0.2" />
                            <circle cx={p.x} cy={p.y} r="3" fill="white" stroke="#1B5E20" strokeWidth="2" />
                          </g>
                        );
                      })}

                      {/* Invisible Interactive Hit Areas */}
                      {points.map((p, i) => (
                        <rect 
                          key={`hit-${i}`}
                          x={Math.max(0, p.x - 8)} 
                          y="0" 
                          width="16" 
                          height="100" 
                          fill="transparent" 
                          className="cursor-pointer"
                          onClick={() => setSelectedPointIndex(i)}
                        />
                      ))}
                    </svg>

                    {/* Today Value Tag on line end */}
                    {points && points.length > 0 && (
                      <div 
                        className="absolute right-[-48px] bg-[#1B5E20] text-white text-[10px] font-bold px-1.5 py-0.5 rounded pointer-events-none"
                        style={{ 
                          top: `${points[6].y}%`,
                          transform: 'translateY(-50%)'
                        }}
                      >
                        ₹{todayData[activeGrade].toLocaleString('en-IN')}
                      </div>
                    )}
                  </div>

                  {/* Y-Axis Labels (Right Aligned) */}
                  <div className="absolute right-0 top-0 bottom-6 w-10 flex flex-col justify-between text-[10px] text-[#666666] font-medium items-end pointer-events-none">
                    <span>₹{maxPrice.toLocaleString('en-IN')}</span>
                    <span>₹{Math.round(minPrice + (range*2)/3).toLocaleString('en-IN')}</span>
                    <span>₹{Math.round(minPrice + range/3).toLocaleString('en-IN')}</span>
                    <span>₹{minPrice.toLocaleString('en-IN')}</span>
                  </div>
                  
                  {/* X-Axis Labels */}
                  <div className="absolute left-0 right-12 bottom-0 h-6 flex justify-between items-end text-[10px] text-[#666666] font-medium pointer-events-none">
                    {trendData.map((d, i) => (
                      <span key={i} className={`text-center ${i === 6 ? 'text-[#1B5E20] font-bold' : ''}`}>
                        {i === 6 ? 'Today' : `${d.date}`}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Grade Toggle Option */}
                <div className="flex bg-[#F5F5F5] rounded-xl p-1 mt-6 mb-2">
                  <button 
                    className={`flex-1 py-2 rounded-lg text-[13px] font-bold border-none cursor-pointer transition-all ${activeGrade === 'low' ? 'bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] text-[#1A1A1A]' : 'bg-transparent text-[#666666]'}`}
                    onClick={() => setActiveGrade('low')}
                  >
                    Low
                  </button>
                  <button 
                    className={`flex-1 py-2 rounded-lg text-[13px] font-bold border-none cursor-pointer transition-all ${activeGrade === 'medium' ? 'bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] text-[#1B5E20]' : 'bg-transparent text-[#666666]'}`}
                    onClick={() => setActiveGrade('medium')}
                  >
                    Medium
                  </button>
                  <button 
                    className={`flex-1 py-2 rounded-lg text-[13px] font-bold border-none cursor-pointer transition-all ${activeGrade === 'premium' ? 'bg-white shadow-[0_2px_4px_rgba(0,0,0,0.05)] text-[#1B5E20]' : 'bg-transparent text-[#666666]'}`}
                    onClick={() => setActiveGrade('premium')}
                  >
                    Premium
                  </button>
                </div>

                {/* Inline Stats Box */}
                <div className="mt-2 bg-[#F6FAF6] rounded-xl p-3 flex divide-x divide-[#E5E5E5]/60">
                  <div className="flex-1 px-2 flex flex-col items-center text-center">
                    <span className="text-[11px] text-[#666666] mb-0.5">Today's Price</span>
                    <span className="text-[18px] font-bold text-[#1B5E20]">₹{todayData[activeGrade].toLocaleString('en-IN')}</span>
                    <span className="text-[9px] text-[#666666] mt-0.5 flex flex-col items-center">
                      vs Yesterday
                      <span className={`flex items-center mt-0.5 ${todayData[activeGrade] >= yesterdayData[activeGrade] ? 'text-[#4CAF50]' : 'text-red-500'}`}>
                        <span className="material-symbols-outlined text-[10px]">arrow_outward</span> 
                        ₹{Math.abs(todayData[activeGrade] - yesterdayData[activeGrade])} ({(((todayData[activeGrade] - yesterdayData[activeGrade]) / yesterdayData[activeGrade]) * 100).toFixed(2)}%)
                      </span>
                    </span>
                  </div>
                  <div className="flex-1 px-2 flex flex-col items-center text-center justify-center">
                    <span className="text-[11px] text-[#666666] mb-0.5">7-Day High</span>
                    <span className="text-[18px] font-bold text-[#1A1A1A]">₹{maxPrice.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-[#666666] mt-1">on {trendData.reduce((prev, curr) => (prev[activeGrade] > curr[activeGrade]) ? prev : curr).date}</span>
                  </div>
                  <div className="flex-1 px-2 flex flex-col items-center text-center justify-center">
                    <span className="text-[11px] text-[#666666] mb-0.5">7-Day Low</span>
                    <span className="text-[18px] font-bold text-[#1A1A1A]">₹{minPrice.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-[#666666] mt-1">on {trendData.reduce((prev, curr) => (prev[activeGrade] < curr[activeGrade]) ? prev : curr).date}</span>
                  </div>
                </div>
              </section>

              {/* 7-DAY HISTORY TABLE */}
              <section className="bg-white rounded-2xl overflow-hidden border border-[#E5E5E5] shadow-[0_2px_8px_rgba(0,0,0,0.02)] mb-6">
                <div className="p-5 pb-4">
                  <h3 className="font-headline font-bold text-[18px] text-[#1A1A1A] m-0">
                    7-Day History
                  </h3>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[400px]">
                    <thead>
                      <tr className="bg-[#E8F5E9] text-[11px] font-bold border-b border-[#E5E5E5] text-[#333333] tracking-wider uppercase">
                        <th className="py-3 px-5 whitespace-nowrap">Day</th>
                        <th className="py-3 px-4 whitespace-nowrap">Date</th>
                        <th className="py-3 px-4 whitespace-nowrap text-[#2E7D32]">Premium</th>
                        <th className="py-3 px-4 whitespace-nowrap">Medium</th>
                        <th className="py-3 px-5 whitespace-nowrap">Low</th>
                      </tr>
                    </thead>
                    <tbody className="text-[14px]">
                      {trendData.slice().reverse().map((d, i) => (
                        <tr key={i} className="border-b border-[#F0F0F0] last:border-0 hover:bg-[#F9FFF9] transition-colors">
                          <td className="py-3.5 px-5 whitespace-nowrap">
                            <span className={`font-bold ${i === 0 ? 'text-[#2E7D32]' : 'text-[#1A1A1A]'}`}>
                              {i === 0 ? 'Today' : d.day}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap text-[#1A1A1A]">
                            {d.date}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#2E7D32]">
                            ₹{d.premium.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-[#1A1A1A]">
                            ₹{d.medium.toLocaleString('en-IN')}
                          </td>
                          <td className="py-3.5 px-5 text-[#666666]">
                            ₹{d.low.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Current Quality Rates Section */}
              <div className="bg-white rounded-2xl p-5 border border-[#E5E5E5] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <h3 className="font-headline font-bold text-[17px] text-onSurface mb-4 mt-0">Current Quality Rates</h3>
                
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center p-3.5 border border-[#E5E5E5] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#2E7D32]"></div>
                      <span className="font-headline font-bold text-[15px] text-[#1A1A1A]">Premium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-[16px] text-[#2E7D32]">₹2,750</span>
                      <span className="material-symbols-outlined text-[18px] text-[#2E7D32]">trending_up</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3.5 border border-[#E5E5E5] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#2E7D32]"></div>
                      <span className="font-headline font-bold text-[15px] text-[#1A1A1A]">Medium</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-[16px] text-[#1A1A1A]">₹2,250</span>
                      <span className="material-symbols-outlined text-[18px] text-[#666666]">arrow_right_alt</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3.5 border border-[#E5E5E5] rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#9E9E9E]"></div>
                      <span className="font-headline font-bold text-[15px] text-[#1A1A1A]">Low</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-headline font-bold text-[16px] text-[#1A1A1A]">₹1,850</span>
                      <span className="material-symbols-outlined text-[18px] text-[#D32F2F]">trending_down</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nearby Mandis Section */}
              <div className="bg-white rounded-2xl p-5 border border-[#E5E5E5] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                <h3 className="font-headline font-bold text-[17px] text-onSurface mb-4 mt-0">Nearby Mandis</h3>
                
                <div className="flex flex-col gap-3">
                  {/* Kumbhraj Highlighted */}
                  <div className="flex justify-between items-center p-4 rounded-xl bg-[#E8F5E9] relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#2E7D32]"></div>
                    <div className="flex flex-col ml-1">
                      <span className="font-headline font-bold text-[15px] text-[#1A1A1A]">Kumbhraj Mandi</span>
                      <span className="font-body font-bold text-[10px] text-[#2E7D32] uppercase tracking-wider mt-1.5">BEST PRICE</span>
                    </div>
                    <span className="font-headline font-bold text-[18px] text-[#2E7D32]">₹2,750</span>
                  </div>

                  {/* Chhabra */}
                  <div className="flex justify-between items-center p-4 rounded-xl border border-[#E5E5E5]">
                    <span className="font-headline font-bold text-[15px] text-[#1A1A1A]">Chhabra Mandi</span>
                    <span className="font-headline font-bold text-[17px] text-[#1A1A1A]">₹2,050</span>
                  </div>

                  {/* Ashoknagar */}
                  <div className="flex justify-between items-center p-4 rounded-xl border border-[#E5E5E5]">
                    <span className="font-headline font-bold text-[15px] text-[#1A1A1A]">Ashoknagar Mandi</span>
                    <span className="font-headline font-bold text-[17px] text-[#1A1A1A]">₹2,150</span>
                  </div>
                </div>
              </div>

              {/* MARKET INSIGHT CARD */}
              <section className="bg-[#F1F8F2] rounded-2xl p-4 flex items-center gap-4 relative">
                <div className="w-10 h-10 rounded-full bg-[#E2F0E5] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[#1B5E20]">lightbulb</span>
                </div>
                <div className="flex flex-col pr-6">
                  <h4 className="font-bold text-[14px] text-[#1B5E20] m-0 mb-0.5">Market Insight</h4>
                  <p className="text-[13px] text-[#333333] m-0">
                    Medium grade price is up <span className="font-bold text-[#1B5E20]">5.43%</span> this week
                  </p>
                </div>
                <span className="material-symbols-outlined text-[#1B5E20] absolute right-4 top-1/2 -translate-y-1/2">arrow_outward</span>
              </section>

              {/* ACTION BUTTON */}
              <button className="w-full h-14 mt-2 bg-[#0F3D1B] text-white rounded-full font-semibold text-[15px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform border-none">
                <span className="material-symbols-outlined text-[20px]">bar_chart</span>
                View Price Comparison
                <span className="material-symbols-outlined text-[18px] ml-1">arrow_forward</span>
              </button>

            </div>
          </main>
        ) : (
          <main className="w-full px-4 pb-32 pt-4 min-h-full">
            
            {/* Location & Status Sub-bar */}
            <div className="flex justify-between items-center py-2 mb-4">
              <div className="flex items-center gap-2 color-primary text-primary cursor-pointer">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  location_on
                </span>
                <span className="font-headline font-bold text-lg">Guna Mandi</span>
                <span className="material-symbols-outlined text-[20px]">
                  expand_more
                </span>
              </div>
              <div className="flex items-center gap-1 text-onSurface-variant text-[13px] font-body">
                <span className="material-symbols-outlined text-[16px]">
                  update
                </span>
                <span>Updated 10 mins ago</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative bg-surface-containerHigh rounded-2xl h-[52px] flex items-center px-4 mb-4 transition-shadow duration-200 focus-within:shadow-[0_0_0_2px_#2E7D32]">
              <span className="material-symbols-outlined text-outline mr-3">search</span>
              <input 
                className="flex-1 bg-transparent border-none outline-none font-body text-base text-onSurface placeholder:text-onSurface-variant" 
                placeholder="Search crops, prices..." 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-surface text-tertiary w-9 h-9 rounded-full flex items-center justify-center border-none cursor-pointer shadow-[0_4px_12px_rgba(15,31,17,0.06)] ml-2 hover:bg-surface-containerLow transition-colors">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  mic
                </span>
              </button>
            </div>

            {/* Filter Chips (Scrollable) */}
            <div className="flex overflow-x-auto gap-3 pb-2 mb-4 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FILTER_CATEGORIES.map(category => (
                <button 
                  key={category}
                  className={`flex-none snap-start whitespace-nowrap py-2 px-5 rounded-full font-label text-sm font-semibold cursor-pointer border transition-all ${
                    activeFilter === category 
                      ? 'bg-primary text-white border-transparent' 
                      : 'bg-surface-container text-onSurface-variant border-[#bfcaba]/30 hover:bg-surface-containerHigh'
                  }`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Crop Prices List Section */}
            <div className="flex flex-col gap-4 mb-6">
              
              {filteredCrops.length === 0 ? (
                <div className="text-center py-10 px-5 text-onSurface-variant font-body text-[15px]">
                  <p className="m-0">No crops found matching your criteria.</p>
                </div>
              ) : (
                filteredCrops.map(crop => (
                  <article 
                    key={crop.id} 
                    onClick={() => setSelectedCrop(crop)}
                    className="bg-white border border-[#bfcaba]/20 rounded-2xl p-4 flex justify-between items-center cursor-pointer transition-all shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:bg-surface-containerLow hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-surface-containerHighest overflow-hidden flex items-center justify-center relative shrink-0">
                        <img 
                          src={getCropImage(crop.image, crop.name)} 
                          alt={crop.name} 
                          className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply" 
                        />
                      </div>
                      <div>
                        <h3 className="font-headline font-bold text-base text-onSurface mb-0.5 mt-0">{crop.name}</h3>
                        <p className="font-body text-[13px] text-onSurface-variant m-0">{crop.variety}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-headline font-bold text-lg text-onSurface">
                        ₹{crop.price}<span className="text-xs font-normal text-onSurface-variant">{crop.unit}</span>
                      </div>
                      <div className={`flex items-center justify-end font-body font-medium text-[13px] mt-1 ${
                        crop.trend === 'up' ? 'text-primary' : crop.trend === 'down' ? 'text-error' : 'text-onSurface-variant'
                      }`}>
                        {crop.trend !== 'neutral' && (
                          <span className="material-symbols-outlined text-[14px] mr-0.5">
                            {crop.trend === 'up' ? 'arrow_upward' : 'arrow_downward'}
                          </span>
                        )}
                        {crop.trend === 'neutral' && (
                          <span className="material-symbols-outlined text-[14px] mr-0.5">remove</span>
                        )}
                        {' '}{crop.change}
                      </div>
                    </div>
                  </article>
                ))
              )}

            </div>

            {/* Voice Query Card (Bottom Anchor) */}
            <div className="bg-gradient-to-br from-surface-containerLow to-surface-containerHighest rounded-2xl p-6 flex flex-col items-center text-center shadow-[0_8px_32px_rgba(15,31,17,0.04)] relative overflow-hidden mb-6">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary opacity-5 rounded-full blur-[24px] pointer-events-none" />
              <h3 className="font-headline font-bold text-xl text-onSurface mb-2 mt-0">Check Prices by Voice</h3>
              <p className="font-body text-sm text-onSurface-variant max-w-[260px] mx-auto mb-6 leading-[1.4] m-0">Ask about specific crop rates, historical trends, or alternative mandi prices.</p>
              <button className="bg-tertiary text-white h-12 px-8 rounded-full font-label font-semibold uppercase tracking-wider flex items-center gap-2 border-none cursor-pointer shadow-[0_8px_24px_rgba(249,168,37,0.25)] hover:bg-tertiary-container transition-all">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>mic</span>
                Ask Mandi Assistant
              </button>
            </div>

          </main>
        )}
      </div>


      {/* ── Bottom Nav ──────────────────────── */}
      <div className="shrink-0 z-50 w-full bg-white/92 backdrop-blur-md">
        <BottomTabs />
      </div>
    </div>
  );
}