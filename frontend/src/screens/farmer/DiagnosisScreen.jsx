import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import wheatMildewImg from '../../assets/images/wheat_mildew.webp';
import { useIsMobile } from '../../hooks/useMediaQuery';

/* ─── Static Data ─────────────────────────────────────────────────── */
const STAT_CHIPS = [
  { icon: 'savings', iconClass: 'text-primary', label: 'Avg. Impact', value: '35% Yield Saved' },
  { icon: 'trending_down', iconClass: 'text-[#774c00]', label: 'Chemical Use', value: '40% Cost Cut' },
  { icon: 'bolt', iconClass: 'text-[#774c00]', label: 'Processing', value: 'Instant Results' },
];

const RECENT_RESULT = {
  crop: 'Wheat',
  latin: 'Triticum',
  disease: 'Powdery Mildew',
  severity: 'Medium Severity',
  solutions: [
    {
      key: 'organic',
      icon: 'eco',
      title: 'Organic Solution',
      desc: 'Apply neem oil extract (0.5%) or spray baking soda solution mixed with mild soap during early morning.',
      linkText: 'View steps',
    },
    {
      key: 'chemical',
      icon: 'science',
      title: 'Chemical Control',
      desc: 'Apply sulfur-based fungicides or Propiconazole 25% EC at recommended dosage if infection spreads.',
      linkText: 'View dosages',
    },
  ],
};

/* ─── Component ───────────────────────────────────────────────────── */
export default function DiagnosisScreen() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const isMobile = useIsMobile();
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(true); // default: show result section as in reference

  // Restore scroll position when returning from Treatments
  useEffect(() => {
    const saved = sessionStorage.getItem('diagnosis_scroll');
    if (saved && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(saved, 10);
      sessionStorage.removeItem('diagnosis_scroll');
    }
  }, []);

  const navigateToTreatment = (sol) => {
    // Save scroll position before navigating away
    if (scrollRef.current) {
      sessionStorage.setItem('diagnosis_scroll', scrollRef.current.scrollTop);
    }
    navigate(`/farmer/marketplace?treatment=${sol.key}&disease=powdery_mildew&from=diagnosis`);
  };

  const handleDiagnose = () => {
    setAnalyzing(true);
    setShowResult(false);
    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
    }, 2200);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface">

      {isMobile && (
        <div className="flex items-center justify-between pl-1 pr-2 h-14 bg-primary w-full shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-1">
            <button className="w-10 h-10 rounded-full bg-transparent border-none flex items-center justify-center text-white cursor-pointer transition-all duration-150 ease-in-out hover:bg-white/10 active:scale-95" onClick={() => navigate(-1)}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-headline text-[18px] font-bold text-white tracking-[-0.2px] m-0">AI Diagnosis</h1>
          </div>
        </div>
      )}

      {/* ── Scrollable Body ─────────────────── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="page-content flex flex-col gap-5">

          {/* Stat Chips */}
          <div className="flex gap-3 overflow-x-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5 -mx-4 px-4" role="list" aria-label="Impact statistics">
            {STAT_CHIPS.map((chip) => (
              <div key={chip.label} className="flex items-center gap-3 bg-surface-containerLow py-3 px-4 rounded-xl shrink-0 border border-[#bfcaba]/30" role="listitem">
                <div className="w-10 h-10 rounded-full bg-surface-containerHigh flex items-center justify-center shrink-0">
                  <span className={`material-symbols-outlined text-[22px] ${chip.iconClass}`}>{chip.icon}</span>
                </div>
                <div>
                  <p className="font-body text-[10px] font-semibold text-onSurface-variant uppercase tracking-[0.6px] mb-0.5">{chip.label}</p>
                  <p className="font-headline text-[14px] font-extrabold text-onSurface m-0">{chip.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Upload / Scan Card */}
          <section className="bg-surface-containerLowest rounded-[28px] p-6 shadow-[0_8px_24px_-4px_rgba(15,31,17,0.06)] relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#0d631b]/5 rounded-full pointer-events-none" aria-hidden="true" />

            <div className="text-center mb-5">
              <h2 className="font-headline text-[22px] font-extrabold text-onSurface mb-1.5 tracking-[-0.4px]">Identify Crop Issues</h2>
              <p className="text-[13px] text-onSurface-variant leading-[1.5] max-w-[280px] mx-auto m-0">Take a clear photo of the affected leaf or fruit. Our AI will analyze it instantly.</p>
            </div>

            {/* Drop Zone */}
            <div
              className="rounded-[22px] py-8 px-4 flex flex-col items-center justify-center bg-[#e5f9e2]/50 cursor-pointer transition-colors duration-200 hover:bg-surface-containerLow mb-5 group"
              style={{ position: 'relative', backgroundImage: 'url("data:image/svg+xml,%3csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3e%3crect width=\'100%25\' height=\'100%25\' fill=\'none\' rx=\'22\' ry=\'22\' stroke=\'%230d631b33\' stroke-width=\'4\' stroke-dasharray=\'12%2c 12\' stroke-dashoffset=\'0\' stroke-linecap=\'square\'/%3e%3c/svg%3e")' }}
              role="button"
              tabIndex={0}
              aria-label="Tap to scan crop"
              onClick={handleDiagnose}
              onKeyDown={(e) => e.key === 'Enter' && handleDiagnose()}
            >
              <style>{`
                @keyframes scanAnim {
                  0%   { top: 0; }
                  50%  { top: 100%; }
                  100% { top: 0; }
                }
              `}</style>
              {analyzing && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 rounded-[22px] z-10">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00e676] shadow-[0_0_10px_#00e676] animate-[scanAnim_2s_linear_infinite]" />
                  <p className="bg-black/60 text-white py-1.5 px-4 rounded-full text-[13px] font-semibold m-0">Analyzing leaf patterns…</p>
                </div>
              )}
              <div className="w-[72px] h-[72px] rounded-full bg-surface-containerHighest flex items-center justify-center mb-3.5 transition-transform duration-250 ease-in-out group-hover:scale-[1.06]">
                <span
                  className="material-symbols-outlined text-[36px] text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  add_a_photo
                </span>
              </div>
              <p className="font-headline text-[17px] font-bold text-primary mb-1 m-0">Tap to scan crop</p>
              <p className="text-[12px] text-onSurface-variant m-0">JPG, PNG • Max 10MB</p>
            </div>

            {/* Camera / Gallery */}
            <div className="grid grid-cols-2 gap-3.5 mb-5">
              <button className="h-[52px] rounded-2xl border-2 border-[#0d631b]/20 bg-transparent text-primary font-body text-[14px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150 hover:bg-[#0d631b]/5" aria-label="Use camera">
                <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                Camera
              </button>
              <button className="h-[52px] rounded-2xl border-2 border-[#0d631b]/20 bg-transparent text-primary font-body text-[14px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors duration-150 hover:bg-[#0d631b]/5" aria-label="Choose from gallery">
                <span className="material-symbols-outlined text-[20px]">image</span>
                Gallery
              </button>
            </div>

            {/* Diagnose CTA */}
            <button
              className="w-full h-[52px] rounded-full border-none bg-gradient-to-b from-primary-light to-primary-container text-white font-headline text-[13px] font-extrabold tracking-[0.8px] uppercase flex items-center justify-center gap-2 cursor-pointer shadow-[0_8px_20px_rgba(13,99,27,0.22)] transition-all duration-150 active:scale-[0.97] active:shadow-[0_4px_12px_rgba(13,99,27,0.15)]"
              onClick={handleDiagnose}
              disabled={analyzing}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              Diagnose with AI
            </button>
          </section>

          {/* ── Recent Analysis Result Card ──── */}
          {showResult && !analyzing && (
            <section className="bg-surface-containerLowest rounded-[28px] p-6 shadow-[0_8px_24px_-4px_rgba(15,31,17,0.06)] animate-[slideUp_0.3s_ease-out]">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="flex items-center gap-2 font-headline text-[19px] font-extrabold text-onSurface m-0">
                  <span className="material-symbols-outlined text-[22px] text-primary">analytics</span>
                  Recent Analysis
                </h3>
                <span className="text-[11px] font-bold font-body py-1 px-3.5 rounded-full bg-[#986200] text-white">{RECENT_RESULT.severity}</span>
              </div>

              {/* Detected crop */}
              <div className="flex gap-5 items-start mb-6">
                <div className="w-[88px] h-[88px] rounded-xl overflow-hidden shrink-0 bg-surface-containerHigh border-4 border-surface">
                  <img src={wheatMildewImg} alt="Wheat leaf with powdery mildew infection" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-body text-[10px] font-bold text-onSurface-variant uppercase tracking-[0.8px] mb-1 m-0">Detected Crop</p>
                  <p className="font-headline text-[22px] font-extrabold text-primary leading-[1.1] mb-2.5 m-0">
                    {RECENT_RESULT.crop}{' '}
                    <span className="text-[16px] font-medium text-onSurface">/ {RECENT_RESULT.latin}</span>
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-[#ba1a1a]/10 border border-[#ba1a1a]/20 py-1.5 px-3 rounded-lg">
                    <span
                      className="material-symbols-outlined text-[14px] text-[#ba1a1a]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      coronavirus
                    </span>
                    <span className="text-[13px] font-bold text-[#ba1a1a]">{RECENT_RESULT.disease}</span>
                  </div>
                </div>
              </div>

              {/* Solutions bento */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {RECENT_RESULT.solutions.map((sol) => (
                  <div key={sol.key} className="bg-surface-containerLow rounded-xl p-4 flex flex-col border border-[#bfcaba]/30">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${sol.key === 'organic' ? 'bg-[#006e1c]/10 text-[#006e1c]' : 'bg-[#774c00]/10 text-[#774c00]'}`}>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {sol.icon}
                        </span>
                      </div>
                      <h4 className="font-headline text-[13px] font-bold text-onSurface m-0">{sol.title}</h4>
                    </div>
                    <p className="text-[12px] text-onSurface-variant leading-[1.5] flex-1 mb-2.5 m-0">{sol.desc}</p>
                    <button
                      className={`flex items-center gap-1 text-[12px] font-semibold bg-transparent border-none cursor-pointer p-0 no-underline ${sol.key === 'organic' ? 'text-[#006e1c]' : 'text-[#774c00]'}`}
                      onClick={() => navigateToTreatment(sol)}
                    >
                      {sol.linkText}
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                ))}
              </div>

              {/* Expert CTA */}
              <div className="bg-surface-containerHighest rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-headline text-[15px] font-bold text-onSurface mb-0.5 mt-0">Need expert advice?</h4>
                  <p className="text-[12px] text-onSurface-variant m-0">Connect with an agronomist instantly.</p>
                </div>
                <button
                  onClick={() => navigate('/farmer/experts')}
                  className="bg-surface-containerLowest text-primary border-none py-2.5 px-4 rounded-xl font-body text-[13px] font-bold cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-150 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] whitespace-nowrap shrink-0"
                >
                  Talk to Expert
                </button>
              </div>
            </section>
          )}

        </div>
      </div>

      {/* ── Bottom Nav — Mobile only ── */}
    </div>
  );
}