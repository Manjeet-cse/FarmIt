import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Scan, 
  PhoneCall, 
  ShoppingBag, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Award,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const LANDING_SCREENS = [
  {
    id: 'ai-diagnosis',
    badge: 'Smart AI Vision',
    title: 'Instant AI Crop Disease Diagnosis',
    subtitle: 'Scan any diseased leaf with your smartphone camera to identify crop infections in 3 seconds with 98.4% diagnostic accuracy.',
    accentColor: '#1b6d24',
    features: [
      'Rapid 3-second disease detection',
      'Supports 50+ major field and horticulture crops',
      'Unbiased organic remedies and chemical spray dosages'
    ],
    renderPreview: () => (
      <div className="w-full max-w-[340px] bg-white rounded-3xl p-5 shadow-[0_12px_32px_rgba(15,31,17,0.08)] border border-[#daeed6] relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-[#f0f7ef]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#e5f9e2] text-[#1b6d24] flex items-center justify-center">
              <Scan size={16} />
            </div>
            <div>
              <span className="text-[12px] font-bold text-[#0f1f11] block">Live Crop Scanner</span>
              <span className="text-[10px] text-[#707a6c]">AI Pathology Analysis</span>
            </div>
          </div>
          <span className="bg-[#e5f9e2] text-[#1b6d24] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
            Active
          </span>
        </div>

        {/* Scanner Image Area */}
        <div className="relative mt-3.5 aspect-[4/3] rounded-2xl overflow-hidden bg-[#1a2d1d] flex items-center justify-center">
          <img 
            src="/images/crops/wheat_mildew.webp" 
            alt="Leaf Scanner"
            className="w-full h-full object-cover opacity-90"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80';
            }}
          />
          {/* Scanning Beam */}
          <div className="absolute inset-0 border-2 border-[#1b6d24]/60 rounded-2xl pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#52d763] to-transparent shadow-[0_0_12px_#52d763] animate-pulse"></div>
            <div className="absolute top-[25%] left-[28%] w-[46%] h-[48%] border-2 border-dashed border-[#52d763] rounded-xl flex items-start justify-end p-1.5">
              <span className="bg-[#1b6d24] text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                98% Match
              </span>
            </div>
          </div>
        </div>

        {/* Diagnostic Result */}
        <div className="mt-3.5 bg-[#f4fbf3] border border-[#daeed6] rounded-2xl p-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-[#707a6c] uppercase">Diagnosis</span>
            <span className="text-[11px] font-bold text-[#1b6d24] bg-white px-2 py-0.2 rounded border border-[#daeed6]">
              Wheat Crop
            </span>
          </div>
          <strong className="text-[14px] text-[#0f1f11] block">Powdery Mildew Infection</strong>
          <span className="text-[12px] text-[#40493d] mt-1 block">
            Recommended: <strong>Neem Oil 1500ppm + Sulphur WP</strong>
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'agri-experts',
    badge: '1-on-1 Agronomist Consult',
    title: 'Consult Verified Agriculture Experts',
    subtitle: 'Connect with certified agronomists and plant pathologists over direct phone or video calls for personalized farm solutions.',
    accentColor: '#1b6d24',
    features: [
      'First 5 minutes completely FREE for every farmer',
      'ICAR and State University certified agricultural scientists',
      'Instant audio, video, or WhatsApp chat consultations'
    ],
    renderPreview: () => (
      <div className="w-full max-w-[340px] flex flex-col gap-3">
        {/* Top Doctor Card */}
        <div className="bg-white rounded-3xl p-5 shadow-[0_12px_32px_rgba(15,31,17,0.08)] border border-[#daeed6]">
          <div className="flex items-center gap-3.5 mb-3.5">
            <img 
              src="/images/experts/expert_satish.webp" 
              alt="Dr. Satish Sharma"
              className="w-14 h-14 rounded-2xl object-cover border border-[#daeed6] shadow-sm"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
              }}
            />
            <div>
              <h4 className="font-headline font-bold text-[15px] text-[#0f1f11] m-0">Dr. Satish Sharma</h4>
              <p className="text-[12px] text-[#707a6c] m-0">Senior Agronomist (ICAR Certified)</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                  4.9 ★
                </span>
                <span className="text-[11px] text-[#40493d] font-semibold">14+ Years Exp.</span>
              </div>
            </div>
          </div>

          <div className="bg-[#e5f9e2] rounded-xl p-2.5 flex items-center justify-between mb-3 text-[12px]">
            <span className="font-bold text-[#1b6d24]">Special Offer:</span>
            <span className="font-extrabold text-[#155a1d] bg-white px-2 py-0.5 rounded shadow-xs">
              First 5 Mins FREE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 py-2 rounded-xl bg-[#1b6d24] text-white font-bold text-[12px] flex items-center justify-center gap-1.5">
              <PhoneCall size={14} />
              <span>Call Doctor</span>
            </div>
            <div className="px-3 py-2 rounded-xl bg-[#f4fbf3] text-[#1b6d24] font-bold text-[12px] border border-[#daeed6]">
              Available Now
            </div>
          </div>
        </div>

        {/* Mini Trust Pill */}
        <div className="bg-[#e5f9e2]/80 border border-[#b8e4b3] rounded-2xl p-3 flex items-center gap-2.5 text-[#155a1d]">
          <Award size={18} className="shrink-0 text-[#1b6d24]" />
          <span className="text-[12px] font-medium leading-snug">
            Over 25,000+ farmer queries resolved with a 98% satisfaction rate.
          </span>
        </div>
      </div>
    )
  },
  {
    id: 'mandi-marketplace',
    badge: 'Live Mandi & Market',
    title: 'Daily Mandi Rates & Farm Supplies',
    subtitle: 'Stay updated with live APMC mandi prices to avoid middleman exploitation, and order genuine farm inputs delivered to your doorstep.',
    accentColor: '#1b6d24',
    features: [
      'Real-time price tickers across 500+ APMC mandis daily',
      'Wholesale certified seeds, organic fertilizers, and sprays',
      'Direct doorstep farm delivery with cash on delivery'
    ],
    renderPreview: () => (
      <div className="w-full max-w-[340px] bg-white rounded-3xl p-5 shadow-[0_12px_32px_rgba(15,31,17,0.08)] border border-[#daeed6]">
        <div className="flex items-center justify-between pb-3 border-b border-[#f0f7ef] mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#e5f9e2] text-[#1b6d24] flex items-center justify-center">
              <TrendingUp size={16} />
            </div>
            <span className="text-[13px] font-bold text-[#0f1f11]">Today's APMC Mandi Rates</span>
          </div>
          <span className="text-[10px] text-[#707a6c] bg-[#f4fbf3] px-2 py-0.5 rounded-full border border-[#daeed6]">
            Live
          </span>
        </div>

        {/* Ticker List */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#f7fbf6] border border-[#f0f7ef]">
            <div>
              <span className="text-[13px] font-bold text-[#0f1f11] block">Wheat (गेहूं)</span>
              <span className="text-[11px] text-[#707a6c]">Guna APMC Mandi</span>
            </div>
            <div className="text-right">
              <span className="text-[13px] font-extrabold text-[#0f1f11] block font-mono">₹2,450 / Qtl</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">▲ +₹35</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#f7fbf6] border border-[#f0f7ef]">
            <div>
              <span className="text-[13px] font-bold text-[#0f1f11] block">Soybean (सोयाबीन)</span>
              <span className="text-[11px] text-[#707a6c]">Indore Mandi</span>
            </div>
            <div className="text-right">
              <span className="text-[13px] font-extrabold text-[#0f1f11] block font-mono">₹4,820 / Qtl</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">▲ +₹80</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-[#f7fbf6] border border-[#f0f7ef]">
            <div>
              <span className="text-[13px] font-bold text-[#0f1f11] block">Mustard (सरसों)</span>
              <span className="text-[11px] text-[#707a6c]">Kota APMC</span>
            </div>
            <div className="text-right">
              <span className="text-[13px] font-extrabold text-[#0f1f11] block font-mono">₹5,600 / Qtl</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">▲ +₹20</span>
            </div>
          </div>
        </div>

        {/* Direct Supply Banner */}
        <div className="bg-[#f4fbf3] border border-[#daeed6] rounded-xl p-2.5 flex items-center justify-between text-[12px]">
          <span className="text-[#40493d]">Certified Seeds & Fertilizers</span>
          <span className="font-bold text-[#1b6d24]">Wholesale Price</span>
        </div>
      </div>
    )
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const screen = LANDING_SCREENS[currentStep];
  const isLast = currentStep === LANDING_SCREENS.length - 1;

  const handleNext = () => {
    if (!isLast) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/login');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-[100dvh] bg-[#f8faf7] text-[#0f1f11] font-body flex flex-col justify-between overflow-x-hidden selection:bg-[#cbffc2] selection:text-[#0f1f11]">
      
      {/* ── TOP HEADER WITH LOGO & SKIP ──────────────────────────────── */}
      <header className="w-full px-5 sm:px-8 py-4 flex items-center justify-between border-b border-[#daeed6] bg-white/80 backdrop-blur-md sticky top-0 z-40">
        
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#eaf6e8] border border-[#cbffc2] p-1.5 flex items-center justify-center shadow-xs">
            <img src="/images/logo-icon.png" alt="FarmIt" className="w-full h-full object-contain" />
          </div>
          <div>
            <span className="font-headline font-extrabold text-[18px] text-[#1b6d24] tracking-tight block leading-tight">
              FarmIt
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#707a6c] block">
              Smart Krishi
            </span>
          </div>
        </div>

        {/* Skip to Login Button */}
        <button
          onClick={handleSkip}
          className="text-[13px] font-bold text-[#707a6c] hover:text-[#1b6d24] py-1.5 px-3.5 rounded-full bg-[#f4fbf3] hover:bg-[#e5f9e2] border border-[#daeed6] transition-colors cursor-pointer"
        >
          Skip to Login
        </button>
      </header>

      {/* ── MAIN SLIDE CONTENT (ONE BY ONE) ───────────────────────────── */}
      <main className="flex-1 max-w-[1080px] w-full mx-auto px-4 sm:px-8 py-6 sm:py-10 flex flex-col justify-center">
        
        <div 
          key={screen.id}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center animate-fade-in"
        >
          
          {/* Left Column: Visual Showcase Preview */}
          <div className="lg:col-span-6 flex justify-center order-2 lg:order-1">
            {screen.renderPreview()}
          </div>

          {/* Right Column: Screen Details */}
          <div className="lg:col-span-6 flex flex-col items-start text-left order-1 lg:order-2">
            
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e5f9e2] border border-[#b8e4b3] text-[#1b6d24] text-[11px] font-bold uppercase tracking-wider mb-3.5">
              <Sparkles size={13} />
              <span>{screen.badge}</span>
            </div>

            {/* Screen Title */}
            <h1 className="font-headline font-extrabold text-[26px] sm:text-[34px] leading-tight text-[#0f1f11] tracking-tight m-0 mb-3">
              {screen.title}
            </h1>

            {/* Subtitle */}
            <p className="font-body text-[14px] sm:text-[16px] text-[#40493d] m-0 mb-6 leading-relaxed max-w-[500px]">
              {screen.subtitle}
            </p>

            {/* Bullet Points */}
            <div className="space-y-2.5 mb-8 w-full">
              {screen.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[13px] sm:text-[14px] text-[#2c3d2e]">
                  <CheckCircle2 size={17} className="text-[#1b6d24] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Screen Counter */}
            <div className="text-[12px] font-bold text-[#707a6c] tracking-wider uppercase mb-2">
              Step {currentStep + 1} of {LANDING_SCREENS.length}
            </div>

          </div>

        </div>

      </main>

      {/* ── BOTTOM CONTROLS & STEP INDICATORS ────────────────────────── */}
      <footer className="w-full border-t border-[#daeed6] bg-white px-5 sm:px-8 py-4 sticky bottom-0 z-40">
        <div className="max-w-[1080px] mx-auto flex items-center justify-between">
          
          {/* Back Button */}
          {currentStep > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 text-[14px] font-bold text-[#40493d] hover:text-[#0f1f11] py-2 px-3 rounded-xl hover:bg-[#f4fbf3] transition-colors border-none bg-transparent cursor-pointer"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div className="w-16" />
          )}

          {/* Progress Indicators (Dots) */}
          <div className="flex items-center gap-2">
            {LANDING_SCREENS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 border-none cursor-pointer p-0 ${
                  idx === currentStep 
                    ? 'w-8 bg-[#1b6d24]' 
                    : 'w-2.5 bg-[#daeed6] hover:bg-[#b8e4b3]'
                }`}
                aria-label={`Go to screen ${idx + 1}`}
              />
            ))}
          </div>

          {/* Next / Get Started Button */}
          <button
            onClick={handleNext}
            className="flex items-center gap-2 bg-[#1b6d24] hover:bg-[#155a1d] text-white text-[14px] font-bold py-2.5 px-6 rounded-xl shadow-sm transition-all duration-150 active:scale-[0.98] border-none cursor-pointer"
          >
            <span>{isLast ? 'Get Started & Sign In' : 'Next'}</span>
            <ArrowRight size={16} />
          </button>

        </div>
      </footer>

    </div>
  );
}
