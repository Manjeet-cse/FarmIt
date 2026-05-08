import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LANGUAGES = [
  { code: 'hi', native: 'हिंदी', label: 'Hindi' },
  { code: 'en', native: 'English', label: 'English' },
  { code: 'pa', native: 'ਪੰਜਾਬੀ', label: 'Punjabi' },
  { code: 'mr', native: 'मराठी', label: 'Marathi' },
  { code: 'gu', native: 'ગુજરાતી', label: 'Gujarati' },
  { code: 'ta', native: 'தமிழ்', label: 'Tamil' },
  { code: 'te', native: 'తెలుగు', label: 'Telugu' },
  { code: 'bn', native: 'বাংলা', label: 'Bengali' },
];

export default function LanguageSelectScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('en');

  const handleContinue = () => {
    localStorage.setItem('appLanguage', selected);
    navigate('/onboarding');
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#ebffe7] font-['Be_Vietnam_Pro',sans-serif] overflow-y-auto overflow-x-hidden relative [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

      {/* ── Header ────────────────────────────── */}
      <header className="flex items-center gap-3 px-6 pt-5 pb-3 shrink-0">
        <span
          className="material-symbols-outlined text-[28px] text-[#0d631b]"
          aria-hidden="true"
        >language</span>
        <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[24px] text-[#0d631b] m-0">Select Language</h1>
      </header>

      {/* ── Subtitle ──────────────────────────── */}
      <p className="text-center text-[15px] leading-[1.6] text-[#40493d] m-0 px-12 pb-7 max-w-[320px] self-center">
        Choose your preferred language to customize your agricultural experience.
      </p>

      {/* ── Language Grid ─────────────────────── */}
      <div className="grid grid-cols-3 gap-3 px-6 flex-1 content-start">
        {LANGUAGES.map((lang) => {
          const isActive = selected === lang.code;
          return (
            <button
              key={lang.code}
              className={`relative w-full aspect-square rounded-[20px] flex flex-col items-center justify-center gap-1 p-2 cursor-pointer transition-transform duration-150 transition-colors duration-200 border-2 active:scale-[0.95] ${
                isActive 
                  ? 'bg-gradient-to-b from-[#0d631b] to-[#2e7d32] border-[#0d631b] shadow-[0_6px_16px_-4px_rgba(13,99,27,0.3)]' 
                  : 'bg-white border-[rgba(191,202,186,0.35)] hover:bg-[#e5f9e2]'
              }`}
              onClick={() => setSelected(lang.code)}
            >
              {/* Check badge */}
              {isActive && (
                <span
                  className="material-symbols-outlined absolute top-1.5 right-1.5 text-[18px] text-white z-20"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >check_circle</span>
              )}
              <span className={`font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[16px] z-10 ${isActive ? 'text-white' : 'text-[#0f1f11]'}`}>{lang.native}</span>
              <span className={`font-['Be_Vietnam_Pro',sans-serif] text-[10px] z-10 ${isActive ? 'text-white/85' : 'text-[#40493d]'}`}>{lang.label}</span>
            </button>
          );
        })}
      </div>

      {/* ── Bottom CTA ────────────────────────── */}
      <div className="sticky bottom-0 left-0 w-full px-6 pt-10 pb-8 bg-gradient-to-t from-[#ebffe7] from-60% to-transparent z-20 flex justify-center shrink-0">
        <button className="w-full h-14 rounded-full bg-gradient-to-b from-[#0d631b] to-[#2e7d32] text-white font-['Be_Vietnam_Pro',sans-serif] text-[14px] font-semibold uppercase tracking-[0.08em] flex items-center justify-center gap-2 border-none cursor-pointer shadow-[0_12px_24px_rgba(15,31,17,0.15)] transition-transform duration-150 active:scale-[0.95]" onClick={handleContinue}>
          CONTINUE
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
            arrow_forward
          </span>
        </button>
      </div>
    </div>
  );
}
