import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

/* ─── Constants ──────────────────────────────────────────────── */
const CROP_OPTIONS = [
  { value: 'Wheat',    label: 'Wheat',    emoji: '🌾' },
  { value: 'Mustard',  label: 'Mustard',  emoji: '🌼' },
  { value: 'Chickpea', label: 'Chickpea', emoji: '🫘' },
  { value: 'Rice',     label: 'Rice',     emoji: '🌾' },
  { value: 'Soybean',  label: 'Soybean',  emoji: '🌱' },
  { value: 'Other',    label: 'Other',    emoji: '🌿' },
];

const DAYS_OPTIONS = [
  { value: '15',  label: '15 days' },
  { value: '30',  label: '30 days' },
  { value: '45',  label: '45 days' },
  { value: '60',  label: '60 days' },
  { value: '90+', label: '90+ days' },
];

const AFFECTED_PARTS = [
  { value: 'Leaf',        label: 'Leaf',        emoji: '🍃' },
  { value: 'Stem',        label: 'Stem',        emoji: '🪴' },
  { value: 'Root',        label: 'Root',        emoji: '🌿' },
  { value: 'Flower',      label: 'Flower',      emoji: '🌸' },
  { value: 'Fruit',       label: 'Fruit',       emoji: '🍅' },
  { value: 'Whole plant', label: 'Whole plant', emoji: '🌾' },
  { value: 'Not sure',    label: 'Not sure',    emoji: '❓' },
];

const NOTICE_PERIODS = [
  { value: 'Today',                label: 'Today' },
  { value: '2–3 days ago',         label: '2–3 days ago' },
  { value: '4–7 days ago',         label: '4–7 days ago' },
  { value: 'More than a week ago', label: 'More than a week ago' },
];

const TOTAL_STEPS = 5;

/* ─── OptionCard ─────────────────────────────────────────────── */
function OptionCard({ label, emoji, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`
        w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border-2
        font-body text-[13px] font-semibold cursor-pointer
        transition-all duration-150 ease-in-out active:scale-[0.97] text-left
        ${selected
          ? 'bg-[#e5f9e2] border-[#2E7D32] text-[#006e1c] shadow-sm'
          : 'bg-white border-[#bfcaba]/40 text-onSurface hover:bg-[#e5f9e2]/40 hover:border-[#bfcaba]/70'
        }
      `}
    >
      <span
        className={`
          flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center
          transition-all duration-150
          ${selected ? 'bg-[#2E7D32] border-[#2E7D32]' : 'bg-transparent border-[#bfcaba]'}
        `}
      >
        {selected && (
          <span
            className="material-symbols-outlined text-white"
            style={{ fontSize: '13px', fontVariationSettings: "'FILL' 1" }}
          >
            check
          </span>
        )}
      </span>
      {emoji && <span className="text-[16px] leading-none">{emoji}</span>}
      <span className="truncate">{label}</span>
    </button>
  );
}

/* ─── ProgressIndicator ──────────────────────────────────────── */
function ProgressIndicator({ step, total }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] font-bold text-[#006e1c] uppercase tracking-[0.6px]">
          Question {step} of {total}
        </span>
        <span className="text-[11px] font-semibold text-onSurface-variant">{pct}%</span>
      </div>
      <div className="h-1.5 bg-[#bfcaba]/30 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

/* ─── CropContextWizard ──────────────────────────────────────── */
export default function CropContextWizard({ contextForm, onFieldChange, onDiagnose, analyzing }) {
  const { t } = useTranslation();

  // 1-5 for main steps; 5.5 for treatment-details follow-up; 6 = done (but we use `completed`)
  const [currentStep, setCurrentStep] = useState(1);
  const [animating, setAnimating]     = useState(false);
  const [direction, setDirection]     = useState('forward');

  // Q2 manual entry state
  const [showManualDays, setShowManualDays] = useState(false);
  const [manualDaysValue, setManualDaysValue] = useState('');
  const [manualDaysError, setManualDaysError] = useState('');

  const [completed, setCompleted] = useState(false);

  /* ── Helpers ── */
  const displayStep = currentStep === 5.5 ? 5 : Math.min(currentStep, TOTAL_STEPS);

  const transition = (toStep, dir) => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir || 'forward');
    setTimeout(() => {
      setCurrentStep(toStep);
      setAnimating(false);
    }, 180);
  };

  const goNext = (nextStep) => transition(nextStep, 'forward');

  const goBack = () => {
    if (currentStep === 1) return;
    if (currentStep === 5.5) { transition(5, 'back'); return; }
    transition(currentStep - 1, 'back');
  };

  const selectAndAdvance = (field, value, nextStep) => {
    onFieldChange(field, value);
    setTimeout(() => goNext(nextStep), 220);
  };

  /* ── Q2 manual ── */
  const handleManualDaysSubmit = () => {
    const num = Number(manualDaysValue);
    if (!manualDaysValue || isNaN(num) || num <= 0) {
      setManualDaysError('Please enter a positive number.');
      return;
    }
    setManualDaysError('');
    onFieldChange('daysSinceSowing', String(num));
    setTimeout(() => goNext(3), 220);
  };

  /* ── Finish wizard ── */
  const finishWizard = () => {
    setCompleted(true);
    sessionStorage.setItem('crop_diagnosis_context', JSON.stringify({
      crop: contextForm.crop,
      daysSinceSowing: Number(contextForm.daysSinceSowing) || 0,
      affectedPart: contextForm.affectedPart,
      issueNoticed: contextForm.issueNoticed,
      previousTreatment: contextForm.previousTreatment,
      treatmentDetails: contextForm.treatmentDetails,
    }));
  };

  const editAnswers = () => {
    setCompleted(false);
    setCurrentStep(1);
  };

  /* ── Animation classes ── */
  const animClass = animating
    ? direction === 'forward'
      ? 'opacity-0 translate-x-3'
      : 'opacity-0 -translate-x-3'
    : 'opacity-100 translate-x-0';

  /* ── Summary ── */
  const summaryItems = [
    { label: contextForm.crop || '—' },
    { label: contextForm.daysSinceSowing ? `${contextForm.daysSinceSowing} days since sowing` : '—' },
    { label: contextForm.affectedPart ? `${contextForm.affectedPart} affected` : '—' },
    { label: contextForm.issueNoticed ? `Issue noticed ${contextForm.issueNoticed.toLowerCase()}` : '—' },
    {
      label:
        contextForm.previousTreatment === 'yes'
          ? `Treatment: ${contextForm.treatmentDetails || 'Applied'}`
          : 'No previous treatment',
    },
  ];

  /* ─────────────────────────── RENDER ─────────────────────────── */
  return (
    <div className="bg-[#f8fbf7] rounded-[22px] p-4 sm:p-5 border border-[#bfcaba]/35 flex flex-col shadow-sm min-h-[360px]">

      {/* Panel Header */}
      <div className="border-b border-[#bfcaba]/25 pb-3 mb-4 shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="font-headline text-[16px] md:text-[17px] font-extrabold text-onSurface m-0 flex items-center gap-1.5">
            <span>🌱</span>
            <span>{t('diagnosis.tellUsAboutCrop', 'Tell us about your crop')}</span>
          </h3>
          {completed && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-[#006e1c] bg-[#e5f9e2] px-2.5 py-0.5 rounded-full">
              <span
                className="material-symbols-outlined text-[13px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span>Ready</span>
            </span>
          )}
        </div>
        <p className="text-[12px] text-onSurface-variant leading-[1.4] mt-1 mb-0">
          {t('diagnosis.cropContextSubtitle', 'Better context can help provide a more relevant diagnosis.')}
        </p>
      </div>

      {/* ── SUMMARY STATE ── */}
      {completed ? (
        <div className="flex flex-col flex-1 gap-2">
          <div className="flex flex-col gap-1.5 flex-1">
            {summaryItems.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 py-1.5 px-3 bg-white rounded-xl border border-[#bfcaba]/30"
              >
                <span className="w-5 h-5 rounded-full bg-[#2E7D32] flex items-center justify-center shrink-0">
                  <span
                    className="material-symbols-outlined text-white"
                    style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                </span>
                <span className="text-[13px] font-semibold text-onSurface">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-3 pt-3 border-t border-[#bfcaba]/25">
            <button
              type="button"
              onClick={editAnswers}
              className="w-full h-[38px] rounded-xl border-2 border-[#bfcaba]/40 bg-white text-onSurface font-body text-[13px] font-semibold flex items-center justify-center gap-1.5 cursor-pointer hover:bg-surface-containerLow transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Edit Answers
            </button>
            <button
              type="button"
              id="diagnose-with-ai-btn-wizard"
              onClick={onDiagnose}
              disabled={analyzing}
              className="w-full h-[44px] rounded-xl border-none bg-gradient-to-r from-[#4CAF50] to-[#2E7D32] text-white font-headline text-[13px] font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-[0_4px_14px_rgba(13,99,27,0.25)] transition-all duration-150 active:scale-[0.98] hover:shadow-[0_6px_18px_rgba(13,99,27,0.32)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span
                className={`material-symbols-outlined text-[18px] ${analyzing ? 'animate-spin' : ''}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {analyzing ? 'sync' : 'auto_awesome'}
              </span>
              {analyzing ? 'Analyzing…' : '✨ Diagnose with AI'}
            </button>
          </div>
        </div>
      ) : (
        /* ── WIZARD STEPS ── */
        <div className="flex flex-col flex-1">
          <ProgressIndicator step={displayStep} total={TOTAL_STEPS} />

          {/* Animated question area */}
          <div
            className={`flex-1 flex flex-col transition-all duration-[180ms] ease-out ${animClass}`}
          >
            {/* Q1 */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-2">
                <p className="font-headline text-[15px] font-bold text-onSurface mb-2 m-0">
                  Which crop are you growing?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {CROP_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      emoji={opt.emoji}
                      selected={contextForm.crop === opt.value}
                      onClick={() => selectAndAdvance('crop', opt.value, 2)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Q2 */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-2">
                <p className="font-headline text-[15px] font-bold text-onSurface mb-2 m-0">
                  How many days since sowing?
                </p>
                {!showManualDays ? (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      {DAYS_OPTIONS.map((opt) => (
                        <OptionCard
                          key={opt.value}
                          label={opt.label}
                          selected={contextForm.daysSinceSowing === opt.value}
                          onClick={() => {
                            setShowManualDays(false);
                            selectAndAdvance('daysSinceSowing', opt.value, 3);
                          }}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowManualDays(true)}
                      className="mt-1 text-[12px] font-semibold text-primary bg-transparent border-none cursor-pointer p-0 text-left hover:underline self-start"
                    >
                      ✏️ Enter manually
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-onSurface">Enter exact days:</label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="number"
                        min="1"
                        autoFocus
                        value={manualDaysValue}
                        onChange={(e) => { setManualDaysValue(e.target.value); setManualDaysError(''); }}
                        onKeyDown={(e) => {
                          if (e.key === '-' || e.key === 'e' || e.key === '+') e.preventDefault();
                          if (e.key === 'Enter') handleManualDaysSubmit();
                        }}
                        placeholder="e.g. 52"
                        className="flex-1 h-10 px-3 rounded-xl border border-[#bfcaba]/50 bg-white font-body text-[13px] text-onSurface focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="button"
                        onClick={handleManualDaysSubmit}
                        className="h-10 px-4 rounded-xl bg-[#2E7D32] text-white font-bold text-[13px] border-none cursor-pointer hover:bg-[#1b5e20] transition-colors"
                      >
                        OK
                      </button>
                    </div>
                    {manualDaysError && <p className="text-[11px] text-error m-0">{manualDaysError}</p>}
                    <button
                      type="button"
                      onClick={() => { setShowManualDays(false); setManualDaysError(''); }}
                      className="text-[12px] font-semibold text-onSurface-variant bg-transparent border-none cursor-pointer p-0 text-left hover:underline self-start"
                    >
                      ← Choose from options
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Q3 */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-2">
                <p className="font-headline text-[15px] font-bold text-onSurface mb-2 m-0">
                  Which part of the crop is affected?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {AFFECTED_PARTS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      emoji={opt.emoji}
                      selected={contextForm.affectedPart === opt.value}
                      onClick={() => selectAndAdvance('affectedPart', opt.value, 4)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Q4 */}
            {currentStep === 4 && (
              <div className="flex flex-col gap-2">
                <p className="font-headline text-[15px] font-bold text-onSurface mb-2 m-0">
                  When did you first notice the issue?
                </p>
                <div className="flex flex-col gap-2">
                  {NOTICE_PERIODS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      selected={contextForm.issueNoticed === opt.value}
                      onClick={() => selectAndAdvance('issueNoticed', opt.value, 5)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Q5 */}
            {currentStep === 5 && (
              <div className="flex flex-col gap-2">
                <p className="font-headline text-[15px] font-bold text-onSurface mb-2 m-0">
                  Have you already applied any treatment?
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <OptionCard
                    label="Yes"
                    emoji="💊"
                    selected={contextForm.previousTreatment === 'yes'}
                    onClick={() => {
                      onFieldChange('previousTreatment', 'yes');
                      setTimeout(() => goNext(5.5), 220);
                    }}
                  />
                  <OptionCard
                    label="No"
                    emoji="🚫"
                    selected={contextForm.previousTreatment === 'no'}
                    onClick={() => {
                      onFieldChange('previousTreatment', 'no');
                      onFieldChange('treatmentDetails', '');
                      setTimeout(() => finishWizard(), 220);
                    }}
                  />
                </div>
              </div>
            )}

            {/* Q5.5 — treatment details */}
            {currentStep === 5.5 && (
              <div className="flex flex-col gap-3">
                <p className="font-headline text-[15px] font-bold text-onSurface mb-1 m-0">
                  What treatment did you apply?
                </p>
                <input
                  type="text"
                  autoFocus
                  value={contextForm.treatmentDetails}
                  onChange={(e) => onFieldChange('treatmentDetails', e.target.value)}
                  placeholder="e.g., Neem oil, Mancozeb, bio-fungicide…"
                  className="w-full h-10 px-3 rounded-xl border border-[#bfcaba]/50 bg-white font-body text-[13px] text-onSurface focus:outline-none focus:ring-2 focus:ring-primary"
                  onKeyDown={(e) => { if (e.key === 'Enter') finishWizard(); }}
                />
                <button
                  type="button"
                  onClick={finishWizard}
                  className="w-full h-[40px] rounded-xl bg-[#2E7D32] text-white font-headline text-[13px] font-bold border-none cursor-pointer flex items-center justify-center gap-1.5 hover:bg-[#1b5e20] transition-colors active:scale-[0.98] shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  Done
                </button>
                <p className="text-[11px] text-onSurface-variant m-0 text-center">
                  You can also leave blank and press Done.
                </p>
              </div>
            )}
          </div>

          {/* Back button — hidden on step 1 */}
          {currentStep > 1 && (
            <div className="mt-4 pt-3 border-t border-[#bfcaba]/20">
              <button
                type="button"
                onClick={goBack}
                className="flex items-center gap-1 text-[12px] font-semibold text-onSurface-variant bg-transparent border-none cursor-pointer p-0 hover:text-onSurface transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                Back
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
