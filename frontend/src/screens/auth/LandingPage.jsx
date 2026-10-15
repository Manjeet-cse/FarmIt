import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Scan, 
  PhoneCall, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Zap,
  ShoppingBag
} from 'lucide-react';

const SLIDES = [
  {
    id: 'ai-diagnosis',
    tag: 'AI Crop Doctor',
    title: 'Instant AI Crop Diagnosis',
    subtitle: 'Snap a photo to detect leaf diseases and get safe remedies in 3 seconds.',
    pills: ['3-Sec Scan', '50+ Crops', 'Organic Remedies'],
    renderVisual: () => (
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_12px_30px_rgba(27,109,36,0.12)] border-2 border-[#b8e4b3] bg-[#1a2d1d]">
        <img 
          src="/images/crops/wheat_mildew.webp" 
          alt="AI Leaf Scan"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80';
          }}
        />
        {/* Animated Laser Scan Bar */}
        <div className="absolute inset-0 border-2 border-[#52d763]/70 rounded-3xl pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#52d763] shadow-[0_0_12px_#52d763] animate-pulse"></div>
          {/* Detected Tag */}
          <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 shadow-lg border border-[#cbffc2] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#707a6c] uppercase block">Detected Disease</span>
              <span className="text-[12px] font-extrabold text-[#0f1f11] block leading-tight">Powdery Mildew</span>
            </div>
            <span className="bg-[#1b6d24] text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              98% Match
            </span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'agri-experts',
    tag: '1-on-1 Consultation',
    title: 'Verified Agri Experts',
    subtitle: 'Direct audio and video calls with certified agronomists and plant doctors.',
    pills: ['5 Mins Free', 'Audio & Video', 'ICAR Certified'],
    renderVisual: () => (
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] bg-white rounded-3xl p-4 shadow-[0_12px_30px_rgba(27,109,36,0.12)] border border-[#daeed6] text-left">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            <img 
              src="/images/experts/expert_satish.webp" 
              alt="Dr. Satish Sharma"
              className="w-14 h-14 rounded-2xl object-cover border border-[#b8e4b3] shadow-sm"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
              }}
            />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#1b6d24] text-white rounded-full flex items-center justify-center text-[10px]">
              ✓
            </span>
          </div>
          <div>
            <h4 className="font-headline font-bold text-[14px] text-[#0f1f11] m-0">Dr. Satish Sharma</h4>
            <span className="text-[11px] text-[#707a6c] block">ICAR Senior Agronomist</span>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded mt-0.5 inline-block">
              4.9 ★ (1,400+ Calls)
            </span>
          </div>
        </div>

        {/* Free Offer Badge */}
        <div className="bg-[#e5f9e2] rounded-xl p-2.5 flex items-center justify-between text-[11px] mb-2.5">
          <span className="font-bold text-[#1b6d24]">Introductory Offer:</span>
          <span className="font-extrabold text-white bg-[#1b6d24] px-2 py-0.5 rounded-full shadow-xs">
            First 5 Mins FREE
          </span>
        </div>

        {/* Call Button Preview */}
        <div className="w-full py-2 rounded-xl bg-[#1b6d24] text-white font-bold text-[12px] flex items-center justify-center gap-1.5 shadow-sm">
          <PhoneCall size={13} />
          <span>Call Agronomist</span>
        </div>
      </div>
    )
  },
  {
    id: 'mandi-marketplace',
    tag: 'Live Prices & Inputs',
    title: 'Live Mandi & Farm Supplies',
    subtitle: 'Daily APMC market rates and certified seeds & fertilizers delivered to your farm.',
    pills: ['500+ Mandis', 'Wholesale Price', 'Doorstep Delivery'],
    renderVisual: () => (
      <div className="relative w-full max-w-[280px] sm:max-w-[320px] bg-white rounded-3xl p-4 shadow-[0_12px_30px_rgba(27,109,36,0.12)] border border-[#daeed6] text-left">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#f0f7ef]">
          <span className="text-[11px] font-bold text-[#1b6d24] uppercase tracking-wide flex items-center gap-1">
            <TrendingUp size={13} /> Live APMC Mandi
          </span>
          <span className="text-[10px] text-[#707a6c] bg-[#f4fbf3] px-2 py-0.5 rounded-full">Today</span>
        </div>

        {/* 2 Clean Mandi Items */}
        <div className="space-y-1.5 mb-2.5">
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#f7fbf6] text-[12px]">
            <span className="font-bold text-[#0f1f11]">Wheat (गेहूं)</span>
            <div className="text-right">
              <span className="font-extrabold text-[#0f1f11]">₹2,450 / Qtl</span>
              <span className="text-[10px] font-bold text-emerald-700 block">▲ +₹35</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-2 rounded-xl bg-[#f7fbf6] text-[12px]">
            <span className="font-bold text-[#0f1f11]">Soybean (सोयाबीन)</span>
            <div className="text-right">
              <span className="font-extrabold text-[#0f1f11]">₹4,820 / Qtl</span>
              <span className="text-[10px] font-bold text-emerald-700 block">▲ +₹80</span>
            </div>
          </div>
        </div>

        {/* Input Supply Tag */}
        <div className="bg-[#e5f9e2] rounded-xl p-2 flex items-center justify-between text-[11px] text-[#155a1d]">
          <span className="flex items-center gap-1 font-semibold">
            <ShoppingBag size={12} className="text-[#1b6d24]" /> Certified Seeds & Sprays
          </span>
          <span className="font-extrabold text-[#1b6d24]">Wholesale</span>
        </div>
      </div>
    )
  }
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const slide = SLIDES[currentStep];
  const isLast = currentStep === SLIDES.length - 1;

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
    <div className="h-[100dvh] w-full bg-[#f8faf7] text-[#0f1f11] font-body flex flex-col justify-between overflow-hidden select-none">
      
      {/* ── TOP NAVBAR (Fixed Height 56px, Zero Scroll) ──────────────── */}
      <header className="h-14 shrink-0 px-5 sm:px-8 flex items-center justify-between border-b border-[#e2ede0] bg-white">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#eaf6e8] border border-[#cbffc2] p-1 flex items-center justify-center">
            <img src="/images/logo-icon.png" alt="FarmIt" className="w-full h-full object-contain" />
          </div>
          <span className="font-headline font-extrabold text-[16px] text-[#1b6d24] tracking-tight">
            FarmIt
          </span>
        </div>

        {/* Skip to Login Button */}
        <button
          onClick={handleSkip}
          className="text-[12px] font-bold text-[#707a6c] hover:text-[#1b6d24] py-1 px-3 rounded-full bg-[#f4fbf3] hover:bg-[#eaf6e8] border border-[#daeed6] transition-colors cursor-pointer"
        >
          Skip
        </button>
      </header>

      {/* ── CENTER CONTENT (No Scroll, Image-Driven) ─────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-[420px] w-full mx-auto text-center my-auto">
        
        <div key={slide.id} className="w-full flex flex-col items-center animate-fade-in">
          
          {/* Main Visual Showcase (Compact & High Impact) */}
          <div className="mb-5 flex justify-center w-full">
            {slide.renderVisual()}
          </div>

          {/* Micro Tag */}
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e5f9e2] border border-[#b8e4b3] text-[#1b6d24] text-[10px] font-extrabold uppercase tracking-wider mb-2">
            <Sparkles size={11} />
            <span>{slide.tag}</span>
          </div>

          {/* Concise Title */}
          <h1 className="font-headline font-extrabold text-[20px] sm:text-[23px] text-[#0f1f11] tracking-tight m-0 mb-1.5 leading-snug">
            {slide.title}
          </h1>

          {/* Low-Text Subtitle */}
          <p className="font-body text-[13px] text-[#40493d] m-0 mb-4 leading-normal max-w-[320px]">
            {slide.subtitle}
          </p>

          {/* 3 Visual Micro-Pills */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {slide.pills.map((pill, i) => (
              <span 
                key={i}
                className="text-[11px] font-semibold text-[#1b6d24] bg-white border border-[#daeed6] px-2.5 py-0.5 rounded-full shadow-2xs"
              >
                ✓ {pill}
              </span>
            ))}
          </div>

        </div>

      </main>

      {/* ── BOTTOM CONTROLS (Fixed Height 64px, Zero Scroll) ─────────── */}
      <footer className="h-16 shrink-0 border-t border-[#e2ede0] bg-white px-5 sm:px-8 flex items-center justify-between">
        
        {/* Back Button */}
        {currentStep > 0 ? (
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-[13px] font-bold text-[#707a6c] hover:text-[#0f1f11] py-1.5 px-2.5 rounded-xl border-none bg-transparent cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>
        ) : (
          <div className="w-14" />
        )}

        {/* 3 Step Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentStep(idx)}
              className={`h-2 rounded-full transition-all duration-300 border-none cursor-pointer p-0 ${
                idx === currentStep 
                  ? 'w-6 bg-[#1b6d24]' 
                  : 'w-2 bg-[#daeed6] hover:bg-[#b8e4b3]'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next / Sign In Button */}
        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 bg-[#1b6d24] hover:bg-[#155a1d] text-white text-[13px] font-bold py-2 px-5 rounded-xl shadow-xs transition-all duration-150 active:scale-[0.98] border-none cursor-pointer"
        >
          <span>{isLast ? 'Sign In' : 'Next'}</span>
          <ArrowRight size={15} />
        </button>

      </footer>

    </div>
  );
}
