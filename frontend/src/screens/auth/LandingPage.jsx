import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const SLIDES = [
  {
    id: 'ai-diagnosis',
    tag: 'AI Crop Diagnosis',
    title: 'Instant AI Crop Diagnosis',
    subtitle: 'Snap a photo to detect leaf diseases and get treatments in 3 seconds.',
    image: '/images/landing/ai_diagnosis.jpg',
    imageAlt: 'AI Crop Diagnosis Technology',
    pills: ['3-Sec Scan', '50+ Crops', 'Safe Treatment']
  },
  {
    id: 'agri-experts',
    tag: 'Expert Agronomists',
    title: 'Verified Agri Experts',
    subtitle: 'Direct 1-on-1 audio & video calls with certified crop doctors.',
    image: '/images/landing/agri_expert.jpg',
    imageAlt: 'Verified Agriculture Expert Consultation',
    pills: ['5 Mins Free', 'Live Call', 'ICAR Certified']
  },
  {
    id: 'mandi-marketplace',
    tag: 'Marketplace & Mandi',
    title: 'Live Mandi Rates & Inputs',
    subtitle: 'Daily APMC market prices and certified farm inputs delivered to your door.',
    image: '/images/landing/mandi_market.jpg',
    imageAlt: 'Live APMC Mandi Market and Farm Supplies',
    pills: ['500+ Mandis', 'Fair Prices', 'Direct Delivery']
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

      {/* ── CENTER CONTENT (No Scroll, Professional Visuals) ─────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 max-w-[420px] w-full mx-auto text-center my-auto">
        
        <div key={slide.id} className="w-full flex flex-col items-center animate-fade-in">
          
          {/* Professional High-Res Photo Container */}
          <div className="mb-4 flex justify-center w-full">
            <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_12px_28px_rgba(27,109,36,0.12)] border border-[#daeed6] bg-[#eef5ed]">
              <img 
                src={slide.image} 
                alt={slide.imageAlt}
                className="w-full h-full object-cover"
              />
              {/* Subtle inner border for premium polish */}
              <div className="absolute inset-0 rounded-3xl border border-white/20 pointer-events-none" />
            </div>
          </div>

          {/* Micro Tag */}
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e5f9e2] border border-[#b8e4b3] text-[#1b6d24] text-[10px] font-extrabold uppercase tracking-wider mb-2">
            <Sparkles size={11} />
            <span>{slide.tag}</span>
          </div>

          {/* Concise Title */}
          <h1 className="font-headline font-extrabold text-[20px] sm:text-[22px] text-[#0f1f11] tracking-tight m-0 mb-1.5 leading-snug">
            {slide.title}
          </h1>

          {/* Low-Text Subtitle */}
          <p className="font-body text-[13px] text-[#40493d] m-0 mb-3.5 leading-normal max-w-[310px]">
            {slide.subtitle}
          </p>

          {/* 3 Visual Micro-Pills */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {slide.pills.map((pill, i) => (
              <span 
                key={i}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1b6d24] bg-white border border-[#daeed6] px-2.5 py-0.5 rounded-full shadow-2xs"
              >
                <CheckCircle2 size={12} className="text-[#1b6d24]" />
                {pill}
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
