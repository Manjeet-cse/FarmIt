import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SLIDES = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrVWHlOGgNghAgeKpof0T1LQiZ8NFgioejZ11UoesaOlY9maU3htvTZZmmiqUdTU-QjR7uuztQ_mrVaNvD5PropgPd6jg1eO5_h3eUXZdqCa9pP_GiQ9cloxd6WfIkdy6gtzQVAdyVcol7wpM6c4RetLMVtvx790_UnEbW4l5HcuvVBwBHgiExpLiCtR7ZBHFwlehjApCEFPfKcWz1yshc3pVxyomhMere0gj7eh2UOlZDTuBzkCYWqdzvf7DJ9xOFzQ9PeXpcSoA',
    imageAlt: 'Farmer inspecting crops with smartphone',
    imageShape: 'circle',
    title: 'Detect Crop Disease Instantly',
    subtitle: 'Take a photo of your crop and get instant AI-powered diagnosis with unbiased treatment advice.',
    isLast: false,
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhSBoPMPBvn4EBtI6e5tlp30YZT9EhUZU_geJtWhcEUjwuqyoXvN0DNlH1L-tUpSPfu3yxfnEGZTFML60I1HSHsvGN_oO6tE1R5phhm8PklqSe6VcGxLOGzXV8rtp1XgQLfKRE1oyuKck1DxywogTzTyBUi0EnThAY46TZ6Hinl6QVUeylXZuLsOe_wxOryLvyDtqCVYiQ9Zo8beHIfwGaXPf2WrQgTAWQuLoZlxp0xwA0dCDNoNxiB_Y9k8gf_0pAOLVWDtbCzlA',
    imageAlt: 'Mandi market illustration',
    imageShape: 'rounded',
    title: 'Live Mandi Prices, Always.',
    subtitle: 'Check real-time crop prices and stop distress selling to middlemen. Negotiate with confidence.',
    isLast: false,
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDE0e44QfbaH0sNX0RffwJirfyuY6rfuyFDVSpwrvYtCEfj4M50Qm1_bS4-24gjp372fc-OjzPkrWtt790qb6B32N6td5mcbnZxvHL5SGtZd0X6LHbmu6NNU7bxXfbqmLVpvXW54KyJZnW7TOV5tZtZNxRnYiJDdaX78Gk1iEdaX9-MG4cwDGUksVTiyKWkl6CwBr16iZImT5R8EEpar3engBPhu2FBuscUb3wO6N71cRCkB2jA1dMWrc7sQKDykuSYPda7Z3q1myw',
    imageAlt: 'Farmer video call with agronomist',
    imageShape: 'rounded',
    title: 'Talk to Verified Agri Experts',
    subtitle: 'Book 1-on-1 consultations with verified agronomists. First 5 minutes completely free.',
    isLast: true,
  },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const slide = SLIDES[step];

  const handleNext = () => {
    if (step < SLIDES.length - 1) {
      setStep(step + 1);
    } else {
      navigate('/role-select');
    }
  };

  const handleSkip = () => navigate('/role-select');

  return (
    <div className="flex flex-col min-h-[100dvh] bg-white font-['Be_Vietnam_Pro',sans-serif] overflow-y-auto overflow-x-hidden">
      <style>{`
        @keyframes onb-fadeIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
      {/* ── Skip Button ──────────────────────── */}
      {!slide.isLast && (
        <div className="flex justify-end pt-3 px-6 min-h-[44px] shrink-0">
          <button className="text-[#40493d] font-['Be_Vietnam_Pro',sans-serif] text-[14px] font-medium tracking-[0.04em] bg-transparent border-none cursor-pointer py-2 px-1 transition-colors duration-200 hover:text-[#0d631b]" onClick={handleSkip}>Skip</button>
        </div>
      )}
      {slide.isLast && <div className="flex justify-end pt-3 px-6 min-h-[44px] shrink-0" />}

      {/* ── Illustration ─────────────────────── */}
      <div className="flex-1 flex items-center justify-center relative px-8 min-h-0 animate-[onb-fadeIn_0.4s_ease-out]" key={step}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#e5f9e2_0%,transparent_70%)] opacity-60 pointer-events-none" />
        <div className={`relative z-10 w-full max-w-[280px] aspect-square overflow-hidden ${slide.imageShape === 'circle' ? 'rounded-full border-[8px] border-white shadow-[0_24px_48px_-12px_rgba(15,31,17,0.12)]' : 'rounded-[24px] shadow-[0_20px_40px_-10px_rgba(15,31,17,0.15)]'}`}>
          <img
            alt={slide.imageAlt}
            className="w-full h-full object-cover block"
            src={slide.image}
          />
        </div>
      </div>

      {/* ── Text Content ─────────────────────── */}
      <div className="text-center pt-7 px-6 shrink-0 animate-[onb-fadeIn_0.4s_ease-out]" key={`text-${step}`}>
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[26px] leading-[1.25] text-[#0f1f11] m-0 mb-3.5">{slide.title}</h1>
        <p className="font-['Be_Vietnam_Pro',sans-serif] text-[15px] leading-[1.6] text-[#40493d] m-0 max-w-[300px] mx-auto">{slide.subtitle}</p>
      </div>

      {/* ── Dots ─────────────────────────────── */}
      <div className="flex justify-center gap-2 pt-6 shrink-0">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`h-[10px] rounded-full transition-all duration-300 ${i === step ? 'w-[32px] bg-[#0d631b]' : 'w-[10px] bg-[rgba(191,202,186,0.5)]'}`}
          />
        ))}
      </div>

      {/* ── Action Area ──────────────────────── */}
      <div className="pt-7 px-8 flex flex-col gap-5 shrink-0">
        {slide.isLast ? (
          <button className="w-full h-14 rounded-full bg-gradient-to-b from-[#0d631b] to-[#2e7d32] text-white font-['Be_Vietnam_Pro',sans-serif] text-[15px] font-semibold uppercase tracking-[0.08em] shadow-[0_8px_24px_-8px_rgba(13,99,27,0.4)] flex items-center justify-center gap-2 border-none cursor-pointer transition-transform duration-200 active:scale-[0.96]" onClick={handleNext}>
            GET STARTED
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
        ) : (
          <button className="w-full h-14 rounded-full border-[1.5px] border-[rgba(191,202,186,0.5)] bg-transparent text-[#0d631b] font-['Be_Vietnam_Pro',sans-serif] text-[14px] font-semibold uppercase tracking-[0.1em] flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:bg-[rgba(13,99,27,0.04)] active:scale-[0.97]" onClick={handleNext}>
            NEXT
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </button>
        )}
      </div>

      <div className="h-5 w-full shrink-0" />
    </div>
  );
}
