import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Scan, 
  PhoneCall, 
  ShoppingBag, 
  TrendingUp, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Leaf, 
  Users, 
  Clock, 
  Award,
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LandingPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [activeTab, setActiveTab] = useState('ai'); // 'ai', 'expert', 'mandi'

  const mandiRates = [
    { crop: 'Wheat (गेहूं)', mandi: 'Guna APMC', price: '₹2,450 / Qtl', trend: '+₹35', up: true },
    { crop: 'Soybean (सोयाबीन)', mandi: 'Indore Mandi', price: '₹4,820 / Qtl', trend: '+₹80', up: true },
    { crop: 'Chana (चना)', mandi: 'Bhopal Mandi', price: '₹5,850 / Qtl', trend: '+₹45', up: true },
    { crop: 'Mustard (सरसों)', mandi: 'Kota APMC', price: '₹5,600 / Qtl', trend: '-₹20', up: false },
    { crop: 'Cotton (कपास)', mandi: 'Khandwa Mandi', price: '₹7,100 / Qtl', trend: '+₹110', up: true },
  ];

  const expertList = [
    {
      name: 'Dr. Satish Sharma',
      role: 'Senior Agronomist (ICAR Certified)',
      exp: '14+ Yrs Exp.',
      rating: '4.9 ★',
      img: '/images/experts/expert_satish.webp',
      badge: 'Crop Nutrition Specialist'
    },
    {
      name: 'Dr. Karunesh Patel',
      role: 'Plant Pathologist',
      exp: '10+ Yrs Exp.',
      rating: '4.8 ★',
      img: '/images/experts/expert_karunesh.webp',
      badge: 'Fungal & Pest Control'
    },
    {
      name: 'Dr. Priyanshu Verma',
      role: 'Soil Health & Organic Advisor',
      exp: '8+ Yrs Exp.',
      rating: '4.9 ★',
      img: '/images/experts/expert_priyanshu.webp',
      badge: 'Zero-Budget Farming'
    }
  ];

  return (
    <div className="bg-[#f7fbf6] min-h-[100dvh] text-[#0f1f11] font-body flex flex-col overflow-x-hidden selection:bg-[#cbffc2] selection:text-[#0f1f11]">
      
      {/* ── STICKY TOP NAVBAR ────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-[#daeed6] px-4 sm:px-8 py-3.5 transition-all">
        <div className="max-w-[1180px] mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/landing" className="flex items-center gap-2.5 no-underline">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm border border-[#cbffc2] p-1 flex items-center justify-center">
              <img src="/images/logo-icon.png" alt="FarmIt Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-headline font-extrabold text-[20px] text-[#1b6d24] tracking-tight block leading-tight">
                FarmIt
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#707a6c] block">
                Smart Krishi
              </span>
            </div>
          </Link>

          {/* Quick Nav Anchors (Desktop/Tablet) */}
          <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium text-[#40493d]">
            <a href="#ai-diagnosis" className="no-underline text-inherit hover:text-[#1b6d24] transition-colors flex items-center gap-1">
              <Scan size={15} className="text-[#1b6d24]" />
              AI Diagnosis
            </a>
            <a href="#agri-experts" className="no-underline text-inherit hover:text-[#1b6d24] transition-colors flex items-center gap-1">
              <PhoneCall size={15} className="text-[#1b6d24]" />
              Krishi Experts
            </a>
            <a href="#marketplace" className="no-underline text-inherit hover:text-[#1b6d24] transition-colors flex items-center gap-1">
              <ShoppingBag size={15} className="text-[#1b6d24]" />
              Mandi & Market
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              to="/signup"
              className="hidden sm:inline-flex text-[13px] font-bold text-[#1b6d24] px-3.5 py-2 rounded-full border border-[#b8e4b3] bg-[#e5f9e2]/60 hover:bg-[#e5f9e2] transition-colors no-underline"
            >
              Sign Up
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 bg-[#1b6d24] hover:bg-[#155a1d] text-white text-[13px] sm:text-[14px] font-bold px-4 sm:px-5 py-2 rounded-full shadow-[0_4px_14px_rgba(27,109,36,0.3)] transition-all active:scale-[0.97] no-underline"
            >
              <span>Kisan Login</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </header>

      {/* ── HERO SECTION ─────────────────────────────────────────────── */}
      <section className="relative pt-10 sm:pt-16 pb-14 px-4 sm:px-8 overflow-hidden bg-gradient-to-b from-[#eaf6e8] via-[#f4fbf3] to-[#f7fbf6]">
        {/* Subtle Decorative Background Blobs */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#c4ecc0] rounded-full blur-[100px] opacity-60 pointer-events-none"></div>
        <div className="absolute top-48 -left-32 w-80 h-80 bg-[#aee2aa] rounded-full blur-[120px] opacity-40 pointer-events-none"></div>

        <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#b8e4b3] shadow-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-[#1b6d24] animate-ping"></span>
              <span className="text-[12px] font-bold text-[#1b6d24] uppercase tracking-wider font-label flex items-center gap-1">
                🌾 भारत का नंबर #1 AI Krishi Platform
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-headline font-extrabold text-[32px] sm:text-[44px] lg:text-[50px] leading-[1.15] text-[#0f1f11] tracking-tight m-0">
              खेती बने आसान,<br />
              <span className="text-[#1b6d24] bg-clip-text">तकनीक से बढ़े किसान!</span>
            </h1>

            {/* Subheading */}
            <p className="font-body text-[15px] sm:text-[17px] text-[#40493d] mt-4 mb-7 leading-relaxed max-w-[580px]">
              फसल के पत्तों की फोटो खींचकर <strong>3 सेकंड में बीमारी पहचानें</strong>, सीधे कृषि वैज्ञानिकों से 1-on-1 परामर्श लें, और लाइव <strong>मंडी भाव</strong> जानें — सब कुछ एक ही मंच पर।
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={() => navigate('/login')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#1b6d24] hover:bg-[#155a1d] text-white font-headline text-[15px] font-bold shadow-[0_8px_24px_rgba(27,109,36,0.35)] flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-[0.98] border-none cursor-pointer"
              >
                <span>मोबाइल से लॉगिन करें (Free)</span>
                <ArrowRight size={18} />
              </button>

              <a
                href="#ai-diagnosis"
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-[#eaf6e8] text-[#1b6d24] border border-[#b8e4b3] font-headline text-[15px] font-bold flex items-center justify-center gap-2 transition-all duration-200 no-underline shadow-sm"
              >
                <Scan size={17} />
                <span>AI टूल्स देखें</span>
              </a>
            </div>

            {/* Micro Highlights */}
            <div className="mt-8 pt-6 border-t border-[#daeed6] w-full flex flex-wrap gap-y-3 gap-x-6 text-[13px] text-[#40493d] font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#1b6d24]" /> 100% Free Kisan Login
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#1b6d24]" /> 98.4% AI Accuracy
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={16} className="text-[#1b6d24]" /> 500+ Live Mandis
              </span>
            </div>
          </div>

          {/* Right Column: Interactive AI Scanner Showcase Card */}
          <div className="lg:col-span-5 w-full">
            <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-[0_16px_40px_rgba(15,31,17,0.08)] border border-[#daeed6] relative overflow-hidden">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#f0f7ef]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#e5f9e2] text-[#1b6d24] flex items-center justify-center">
                    <Scan size={17} />
                  </div>
                  <div>
                    <h2 className="text-[13px] font-bold text-[#0f1f11] m-0">Live AI Leaf Diagnosis</h2>
                    <span className="text-[11px] text-[#707a6c]">Instant Scan Simulation</span>
                  </div>
                </div>
                <span className="bg-[#e5f9e2] text-[#1b6d24] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider">
                  Live Demo
                </span>
              </div>

              {/* Scanner Screen Simulation */}
              <div className="relative mt-4 aspect-[4/3] rounded-2xl overflow-hidden bg-[#1a2d1d] flex items-center justify-center group">
                <img 
                  src="/images/crops/wheat_mildew.webp" 
                  alt="Crop Leaf Scan" 
                  className="w-full h-full object-cover opacity-85"
                  onError={(e) => {
                    // Fallback if image path differs
                    e.target.src = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80';
                  }}
                />

                {/* Laser Scanning Animation Overlay */}
                <div className="absolute inset-0 border-2 border-[#1b6d24]/60 rounded-2xl pointer-events-none">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#52d763] to-transparent shadow-[0_0_12px_#52d763] animate-pulse"></div>
                  
                  {/* Bounding Box on Infected Part */}
                  <div className="absolute top-[28%] left-[30%] w-[42%] h-[46%] border-2 border-dashed border-[#52d763] rounded-xl flex items-start justify-end p-1.5">
                    <span className="bg-[#1b6d24] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                      98% Match
                    </span>
                  </div>
                </div>
              </div>

              {/* Result Drawer */}
              <div className="mt-4 bg-[#f4fbf3] border border-[#daeed6] rounded-2xl p-3.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-[20px]">warning</span>
                    <div>
                      <span className="text-[11px] text-[#707a6c] block uppercase font-bold">Detected Condition</span>
                      <strong className="text-[14px] text-[#0f1f11]">Powdery Mildew (चूर्णिल आसिता)</strong>
                    </div>
                  </div>
                  <span className="text-[12px] font-bold text-[#1b6d24] bg-white px-2 py-0.5 rounded-md border border-[#daeed6]">
                    Wheat Crop
                  </span>
                </div>

                <div className="mt-2.5 pt-2.5 border-t border-[#daeed6] flex items-center justify-between text-[12px]">
                  <span className="text-[#40493d]">Recommended: <strong>Neem Oil 1500ppm + Sulphur WP</strong></span>
                  <button 
                    onClick={() => navigate('/login')} 
                    className="text-[#1b6d24] font-bold bg-transparent border-none p-0 cursor-pointer flex items-center gap-0.5 hover:underline"
                  >
                    Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Quick Try Button */}
              <button
                onClick={() => navigate('/login')}
                className="w-full mt-3 py-2.5 rounded-xl bg-[#1b6d24] text-white font-bold text-[13px] border-none cursor-pointer hover:bg-[#155a1d] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <span>Try Instant AI Scan on Your Crop</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ── LIVE MANDI TICKER ─────────────────────────────────────────── */}
      <div className="bg-[#153419] text-white py-3 px-4 overflow-hidden border-y border-[#2a5030]">
        <div className="max-w-[1180px] mx-auto flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-[#1b6d24] px-2.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider shrink-0 text-[#cbffc2]">
            <TrendingUp size={13} />
            Live Mandi Rates
          </div>
          <div className="flex items-center gap-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden whitespace-nowrap text-[13px]">
            {mandiRates.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-[#cbffc2] font-semibold">{item.crop}:</span>
                <span className="font-bold text-white">{item.price}</span>
                <span className="text-[11px] text-[#93dc8c]">({item.mandi})</span>
                <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded ${item.up ? 'bg-emerald-900/80 text-emerald-300' : 'bg-red-900/80 text-red-300'}`}>
                  {item.trend}
                </span>
                {idx < mandiRates.length - 1 && <span className="text-white/20 ml-2">•</span>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SECTION 1: AI CROP DISEASE DIAGNOSIS ──────────────────────── */}
      <section id="ai-diagnosis" className="py-16 px-4 sm:px-8 max-w-[1180px] mx-auto w-full">
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <span className="text-[#1b6d24] font-label font-bold text-[12px] uppercase tracking-wider bg-[#e5f9e2] px-3 py-1 rounded-full border border-[#b8e4b3]">
            Smart Vision Technology
          </span>
          <h2 className="font-headline font-extrabold text-[28px] sm:text-[36px] text-[#0f1f11] mt-3 mb-2 tracking-tight">
            AI Crop Disease Diagnosis
          </h2>
          <p className="font-body text-[15px] text-[#40493d] m-0">
            बस अपनी फसल के रोगग्रस्त पत्ते की फोटो खींचें और 3 सेकंड के अंदर सटीक रोग पहचान, कारण और उचित दवा का डोज जानें।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-6 border border-[#daeed6] shadow-[0_4px_20px_rgba(15,31,17,0.04)] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#e5f9e2] text-[#1b6d24] flex items-center justify-center font-headline font-bold text-[20px] mb-4">
              1
            </div>
            <h3 className="font-headline font-bold text-[18px] text-[#0f1f11] mb-2 m-0">Click or Upload Leaf Photo</h3>
            <p className="font-body text-[14px] text-[#40493d] m-0 leading-relaxed">
              Open FarmIt camera on your phone and take a clear photo of the infected crop leaf directly in your field.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-6 border border-[#daeed6] shadow-[0_4px_20px_rgba(15,31,17,0.04)] hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="w-12 h-12 rounded-2xl bg-[#1b6d24] text-white flex items-center justify-center font-headline font-bold text-[20px] mb-4">
              2
            </div>
            <h3 className="font-headline font-bold text-[18px] text-[#0f1f11] mb-2 m-0">AI Scans in 3 Seconds</h3>
            <p className="font-body text-[14px] text-[#40493d] m-0 leading-relaxed">
              Trained on over 1.5 Lakh agricultural pathology images to detect rust, blight, mildew, pest attacks, and deficiency.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-6 border border-[#daeed6] shadow-[0_4px_20px_rgba(15,31,17,0.04)] hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-2xl bg-[#e5f9e2] text-[#1b6d24] flex items-center justify-center font-headline font-bold text-[20px] mb-4">
              3
            </div>
            <h3 className="font-headline font-bold text-[18px] text-[#0f1f11] mb-2 m-0">Get Unbiased Organic Treatment</h3>
            <p className="font-body text-[14px] text-[#40493d] m-0 leading-relaxed">
              Get exact spray dosage, chemical names, and organic home-made remedies in Hindi or your preferred regional language.
            </p>
          </div>

        </div>

        {/* Feature Banner */}
        <div className="mt-8 bg-gradient-to-r from-[#1b6d24] to-[#2e7d32] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_12px_28px_rgba(27,109,36,0.2)]">
          <div>
            <h4 className="font-headline font-bold text-[20px] m-0 mb-1">Works on 50+ Major Indian Crops</h4>
            <p className="text-[14px] text-[#cbffc2] m-0">Wheat, Soybean, Paddy, Cotton, Mustard, Gram, Tomato, Onion, Chili & more.</p>
          </div>
          <button 
            onClick={() => navigate('/login')}
            className="whitespace-nowrap px-6 py-3 rounded-xl bg-white text-[#1b6d24] font-headline font-bold text-[14px] hover:bg-[#eaf6e8] transition-colors border-none cursor-pointer shadow"
          >
            Start Free AI Diagnosis
          </button>
        </div>
      </section>

      {/* ── SECTION 2: VERIFIED AGRI EXPERTS ─────────────────────────── */}
      <section id="agri-experts" className="py-16 px-4 sm:px-8 bg-white border-y border-[#daeed6]">
        <div className="max-w-[1180px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-[#1b6d24] font-label font-bold text-[12px] uppercase tracking-wider bg-[#e5f9e2] px-3 py-1 rounded-full border border-[#b8e4b3]">
                1-on-1 Krishi Doctor
              </span>
              <h2 className="font-headline font-extrabold text-[28px] sm:text-[36px] text-[#0f1f11] mt-3 mb-2 tracking-tight">
                Talk to Verified Agri Experts
              </h2>
              <p className="font-body text-[15px] text-[#40493d] m-0 max-w-[560px]">
                Have complex crop issues? Book 1-on-1 phone or video consultations with verified agronomists and soil experts.
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#1b6d24] bg-[#e5f9e2] px-3 py-1.5 rounded-full">
                <Award size={15} /> First 5 Mins 100% Free
              </span>
            </div>
          </div>

          {/* Expert Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertList.map((exp, idx) => (
              <div 
                key={idx}
                className="bg-[#f7fbf6] rounded-3xl p-5 border border-[#daeed6] hover:border-[#1b6d24] transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <img 
                      src={exp.img} 
                      alt={exp.name} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-sm"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
                      }}
                    />
                    <div>
                      <h4 className="font-headline font-bold text-[16px] text-[#0f1f11] m-0">{exp.name}</h4>
                      <p className="text-[12px] text-[#707a6c] m-0 font-medium">{exp.role}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                          {exp.rating}
                        </span>
                        <span className="text-[11px] text-[#40493d] font-semibold">{exp.exp}</span>
                      </div>
                    </div>
                  </div>

                  <span className="inline-block bg-[#e5f9e2] text-[#1b6d24] text-[11px] font-bold px-2.5 py-1 rounded-lg mb-4">
                    {exp.badge}
                  </span>
                </div>

                <button
                  onClick={() => navigate('/login')}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-[#1b6d24] text-[#1b6d24] hover:text-white border border-[#b8e4b3] font-bold text-[13px] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <PhoneCall size={14} />
                  <span>Call Doctor (5 Min Free)</span>
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── SECTION 3: MANDI & MARKETPLACE ───────────────────────────── */}
      <section id="marketplace" className="py-16 px-4 sm:px-8 max-w-[1180px] mx-auto w-full">
        
        <div className="text-center max-w-[640px] mx-auto mb-12">
          <span className="text-[#1b6d24] font-label font-bold text-[12px] uppercase tracking-wider bg-[#e5f9e2] px-3 py-1 rounded-full border border-[#b8e4b3]">
            Mandi Rates & Supplies
          </span>
          <h2 className="font-headline font-extrabold text-[28px] sm:text-[36px] text-[#0f1f11] mt-3 mb-2 tracking-tight">
            Live Mandi Prices & Direct Farm Input
          </h2>
          <p className="font-body text-[15px] text-[#40493d] m-0">
            दलालों को कम भाव में फसल बेचना बंद करें। हर दिन अपने जिले के नजदीकी मंडी भाव देखें और असली खाद-बीज सीधे घर मंगाएं।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Mandi Table */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-[#daeed6] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline font-bold text-[17px] text-[#0f1f11] m-0 flex items-center gap-2">
                <TrendingUp size={18} className="text-[#1b6d24]" />
                Today's APMC Mandi Rates
              </h3>
              <span className="text-[11px] text-[#707a6c] bg-[#f4fbf3] px-2.5 py-1 rounded-full border border-[#daeed6]">
                Updated Today, 10:00 AM
              </span>
            </div>

            <div className="divide-y divide-[#f0f7ef]">
              {mandiRates.map((row, i) => (
                <div key={i} className="py-3 flex items-center justify-between hover:bg-[#f7fbf6] px-2 rounded-xl transition-colors">
                  <div>
                    <strong className="text-[14px] text-[#0f1f11] block">{row.crop}</strong>
                    <span className="text-[12px] text-[#707a6c]">{row.mandi}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[15px] font-extrabold text-[#0f1f11] block font-mono">{row.price}</span>
                    <span className={`text-[11px] font-bold ${row.up ? 'text-emerald-700' : 'text-red-600'}`}>
                      {row.trend} vs yesterday
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full mt-4 py-2.5 rounded-xl bg-[#f4fbf3] text-[#1b6d24] font-bold text-[13px] border border-[#daeed6] hover:bg-[#e5f9e2] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>View All 500+ Mandi Rates</span>
              <ChevronRight size={15} />
            </button>
          </div>

          {/* Marketplace Features */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            
            <div className="bg-white rounded-3xl p-6 border border-[#daeed6] shadow-sm">
              <div className="w-10 h-10 rounded-2xl bg-[#e5f9e2] text-[#1b6d24] flex items-center justify-center mb-3">
                <ShoppingBag size={20} />
              </div>
              <h4 className="font-headline font-bold text-[17px] text-[#0f1f11] m-0 mb-1">
                Direct Farm Inputs & Seeds
              </h4>
              <p className="text-[13px] text-[#40493d] m-0 leading-relaxed mb-3">
                Order 100% certified seeds, bio-fertilizers, and crop protection sprays directly at wholesale prices.
              </p>
              <span className="text-[12px] font-bold text-[#1b6d24] flex items-center gap-1">
                <CheckCircle2 size={14} /> Doorstep Delivery & Cash on Delivery Available
              </span>
            </div>

            <div className="bg-[#e5f9e2]/80 border border-[#b8e4b3] rounded-3xl p-5 text-[#155a1d]">
              <span className="text-[11px] font-bold uppercase tracking-wider block font-label mb-1">
                Kisan Guarantee
              </span>
              <p className="text-[13px] m-0 leading-snug">
                FarmIt par beche jaane wale sabhi products brand-certified hote hain aur inpar government standard lab test pass hota hai.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── STATS & SOCIAL PROOF ─────────────────────────────────────── */}
      <section className="py-12 px-4 sm:px-8 bg-[#f0f8ee] border-t border-[#daeed6]">
        <div className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <h3 className="font-headline font-extrabold text-[32px] sm:text-[40px] text-[#1b6d24] m-0">50K+</h3>
            <p className="font-body text-[13px] font-semibold text-[#40493d] m-0 mt-1">Registered Kisans</p>
          </div>
          <div>
            <h3 className="font-headline font-extrabold text-[32px] sm:text-[40px] text-[#1b6d24] m-0">1.2L+</h3>
            <p className="font-body text-[13px] font-semibold text-[#40493d] m-0 mt-1">Crops Diagnosed</p>
          </div>
          <div>
            <h3 className="font-headline font-extrabold text-[32px] sm:text-[40px] text-[#1b6d24] m-0">₹4,200</h3>
            <p className="font-body text-[13px] font-semibold text-[#40493d] m-0 mt-1">Avg. Yield Increase/Acre</p>
          </div>
          <div>
            <h3 className="font-headline font-extrabold text-[32px] sm:text-[40px] text-[#1b6d24] m-0">98.4%</h3>
            <p className="font-body text-[13px] font-semibold text-[#40493d] m-0 mt-1">Diagnostic Accuracy</p>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA BANNER ────────────────────────────────────────── */}
      <section className="py-16 px-4 sm:px-8 max-w-[1180px] mx-auto w-full">
        <div className="relative rounded-[32px] overflow-hidden bg-gradient-to-br from-[#1b6d24] via-[#245e2a] to-[#0f3414] text-white p-8 sm:p-14 text-center shadow-[0_16px_40px_rgba(27,109,36,0.25)]">
          
          <div className="relative z-10 max-w-[620px] mx-auto">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-bold text-[#cbffc2] bg-white/15 px-3 py-1 rounded-full backdrop-blur-sm mb-4">
              <Sparkles size={14} /> Start in 10 Seconds
            </span>
            <h2 className="font-headline font-extrabold text-[28px] sm:text-[38px] leading-tight m-0 mb-3">
              आज ही अपनी खेती को बनाएं स्मार्ट और मुनाफ़ाबख्श!
            </h2>
            <p className="font-body text-[15px] sm:text-[16px] text-[#cbffc2] mb-8 leading-relaxed">
              Login karein bina kisi password ke — bas apna mobile number dalein aur FarmIt Kisan Parivar ka hissa banein.
            </p>

            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-[#e5f9e2] text-[#1b6d24] font-headline font-bold text-[16px] shadow-lg flex items-center justify-center gap-2 mx-auto transition-all duration-200 active:scale-[0.98] border-none cursor-pointer"
            >
              <span>Kisan Login / शुरू करें</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────── */}
      <footer className="bg-white border-t border-[#daeed6] py-10 px-4 sm:px-8 text-center text-[#707a6c] text-[13px]">
        <div className="max-w-[1180px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/images/logo-icon.png" alt="FarmIt" className="w-6 h-6 object-contain" />
            <span className="font-headline font-bold text-[15px] text-[#0f1f11]">FarmIt Krishi Portal</span>
          </div>

          <div className="flex items-center gap-6 text-[13px]">
            <Link to="/login" className="text-inherit hover:text-[#1b6d24] no-underline">Login</Link>
            <Link to="/signup" className="text-inherit hover:text-[#1b6d24] no-underline">Sign Up</Link>
            <a href="#ai-diagnosis" className="text-inherit hover:text-[#1b6d24] no-underline">AI Diagnosis</a>
            <a href="#agri-experts" className="text-inherit hover:text-[#1b6d24] no-underline">Experts</a>
            <a href="#marketplace" className="text-inherit hover:text-[#1b6d24] no-underline">Mandi Rates</a>
          </div>

          <p className="m-0 text-[12px]">
            © {new Date().getFullYear()} FarmIt. Made with ❤️ for Indian Farmers.
          </p>
        </div>
      </footer>

    </div>
  );
}
