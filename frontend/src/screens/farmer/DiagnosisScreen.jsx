import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import AppTopBar from '../../components/common/AppTopBar';
import wheatMildewImg from '../../assets/images/wheat_mildew.webp';
import { useIsMobile } from '../../hooks/useMediaQuery';
import cropService from '../../services/cropService';
import CropContextWizard from '../../components/diagnosis/CropContextWizard';

/* ─── Component ───────────────────────────────────────────────────── */
export default function DiagnosisScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const resultCardRef = useRef(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const isMobile = useIsMobile();

  // Diagnosis execution states
  const [analyzing, setAnalyzing] = useState(false);
  const [showResult, setShowResult] = useState(true);

  // Image Upload states
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Crop Context Questionnaire states
  const [contextForm, setContextForm] = useState({
    crop: 'Wheat', // Pre-selected from farmer's "My Crops"
    daysSinceSowing: '45',
    affectedPart: 'Leaf',
    issueNoticed: '2–3 days ago',
    previousTreatment: 'no', // 'yes' | 'no'
    treatmentDetails: '',
  });

  const [farmerCropsList, setFarmerCropsList] = useState([]);

  // Fetch farmer's existing crops safely to prioritize in dropdown
  useEffect(() => {
    let isMounted = true;
    async function loadCrops() {
      try {
        const res = await cropService.getCrops();
        if (isMounted && res?.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          const names = res.data.data.map(c => c.cropName || c.name).filter(Boolean);
          setFarmerCropsList(names);
        }
      } catch (err) {
        // Fallback silently without breaking the UI
      }
    }
    loadCrops();
    return () => { isMounted = false; };
  }, []);

  const STAT_CHIPS = [
    { icon: 'savings', iconClass: 'text-primary', label: t('diagnosis.avgImpact'), value: t('diagnosis.yieldSaved') },
    { icon: 'trending_down', iconClass: 'text-[#774c00]', label: t('diagnosis.chemicalUse'), value: t('diagnosis.costCut') },
    { icon: 'bolt', iconClass: 'text-[#774c00]', label: t('diagnosis.processing'), value: t('diagnosis.instantResults') },
  ];

  const RECENT_RESULT = {
    crop: contextForm.crop ? t(`home.${contextForm.crop.toLowerCase()}`, contextForm.crop) : t('home.wheat'),
    latin: contextForm.crop === 'Wheat' ? 'Triticum' : contextForm.crop === 'Mustard' ? 'Brassica' : contextForm.crop === 'Chickpea' ? 'Cicer arietinum' : 'Plantae',
    disease: 'Powdery Mildew',
    severity: t('home.needsAttention'),
    solutions: [
      { key: 'organic', icon: 'eco', title: t('diagnosis.organicSolution'), desc: t('diagnosis.organicDesc'), linkText: t('diagnosis.viewSteps') },
      { key: 'chemical', icon: 'science', title: t('diagnosis.chemicalControl'), desc: t('diagnosis.chemicalDesc'), linkText: t('diagnosis.viewDosages') },
    ],
  };

  useEffect(() => {
    const saved = sessionStorage.getItem('diagnosis_scroll');
    if (saved && scrollRef.current) {
      scrollRef.current.scrollTop = parseInt(saved, 10);
      sessionStorage.removeItem('diagnosis_scroll');
    }
  }, []);

  const navigateToTreatment = (sol) => {
    if (scrollRef.current) {
      sessionStorage.setItem('diagnosis_scroll', scrollRef.current.scrollTop);
    }
    navigate(`/farmer/marketplace?treatment=${sol.key}&disease=powdery_mildew&from=diagnosis`);
  };

  // Image processing
  const processImageFile = (file) => {
    setUploadError('');
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/jpg', 'image/webp'].includes(file.type)) {
      setUploadError('Please upload a valid JPG or PNG image.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('Image size exceeds 10MB limit. Please choose a smaller image.');
      return;
    }

    setImageFile(file);
    const previewUrl = URL.createObjectURL(file);
    setSelectedImage(previewUrl);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRemoveImage = (e) => {
    e?.stopPropagation();
    setSelectedImage(null);
    setImageFile(null);
    setUploadError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  // Questionnaire form handling
  const handleInputChange = (field, value) => {
    setContextForm((prev) => ({ ...prev, [field]: value }));
  };




  const handleDiagnose = () => {
    // If no image is selected yet, use sample crop leaf for a smooth experience
    if (!selectedImage) {
      setSelectedImage(wheatMildewImg);
    }

    setAnalyzing(true);
    setShowResult(false);

    // Save context to session storage
    const collectedContext = {
      crop: contextForm.crop,
      daysSinceSowing: Number(contextForm.daysSinceSowing) || 45,
      affectedPart: contextForm.affectedPart || 'Leaf',
      issueNoticed: contextForm.issueNoticed || '2–3 days ago',
      previousTreatment: contextForm.previousTreatment,
      treatmentDetails: contextForm.treatmentDetails,
    };
    sessionStorage.setItem('crop_diagnosis_context', JSON.stringify(collectedContext));

    setTimeout(() => {
      setAnalyzing(false);
      setShowResult(true);
      setTimeout(() => {
        resultCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }, 2200);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface-light">

      {isMobile && (
        <div className="flex items-center justify-between pl-1 pr-2 h-14 bg-primary w-full shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-1">
            <button
              className="w-10 h-10 rounded-full bg-transparent border-none flex items-center justify-center text-white cursor-pointer transition-all duration-150 ease-in-out hover:bg-white/10 active:scale-95"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-headline text-[18px] font-bold text-white tracking-[-0.2px] m-0">
              {t('diagnosis.title')}
            </h1>
          </div>
        </div>
      )}

      {/* ── Scrollable Body ─────────────────── */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="w-full max-w-[1180px] xl:max-w-[1300px] 2xl:max-w-[1420px] mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-7 pb-[100px] md:pb-12 flex flex-col gap-6">

          {/* Stat Chips */}
          <div className="flex gap-3 overflow-x-auto scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-0.5 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-4" role="list" aria-label="Impact statistics">
            {STAT_CHIPS.map((chip) => (
              <div key={chip.label} className="flex items-center gap-3 bg-surface-containerLow py-3 px-4 rounded-xl shrink-0 md:shrink border border-[#bfcaba]/30 shadow-sm" role="listitem">
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

          {/* ── MAIN DIAGNOSIS WORKSPACE CARD ── */}
          <section className="bg-surface-containerLowest rounded-[28px] p-5 sm:p-7 md:p-8 shadow-[0_8px_24px_-4px_rgba(15,31,17,0.06)] relative overflow-hidden border border-[#bfcaba]/20">
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-[#0d631b]/5 rounded-full pointer-events-none" aria-hidden="true" />
            <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#2E7D32]/5 rounded-full pointer-events-none" aria-hidden="true" />

            <div className="text-center mb-6 md:mb-8">
              <h2 className="font-headline text-[22px] md:text-[26px] font-extrabold text-onSurface mb-1.5 tracking-[-0.4px]">
                {t('diagnosis.identifyCropIssues')}
              </h2>
              <p className="text-[13px] md:text-[14px] text-onSurface-variant leading-[1.5] max-w-[520px] mx-auto m-0">
                {t('diagnosis.identifyDesc')}
              </p>
            </div>

            {/* Hidden file inputs for Gallery & Camera */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleFileInputChange}
              className="hidden"
              aria-label="Upload crop image file"
            />
            <input
              type="file"
              ref={cameraInputRef}
              accept="image/*"
              capture="environment"
              onChange={handleFileInputChange}
              className="hidden"
              aria-label="Take crop photo with camera"
            />

            {/* ── TWO-COLUMN WORKSPACE ON DESKTOP ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-7">

              {/* ── LEFT SIDE: Image Upload / Crop Scan (58% of workspace: 7 cols) ── */}
              <div className="lg:col-span-7 flex flex-col">
                
                {/* Drop Zone Box */}
                <div
                  className={`rounded-[22px] p-4 sm:p-5 flex flex-col items-center justify-center relative transition-all duration-200 cursor-pointer overflow-hidden h-[220px] md:h-[240px] ${
                    selectedImage
                      ? 'bg-black/5 border border-[#0d631b]/30'
                      : isDragging
                      ? 'bg-[#e5f9e2] ring-2 ring-primary border border-transparent shadow-inner'
                      : 'bg-[#e5f9e2]/45 hover:bg-surface-containerLow/70 border-2 border-dashed border-[#0d631b]/30'
                  }`}
                  role="button"
                  tabIndex={0}
                  aria-label={t('diagnosis.tapToScan')}
                  onClick={() => fileInputRef.current?.click()}
                  onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <style>{`
                    @keyframes scanAnim {
                      0%   { top: 0; }
                      50%  { top: 100%; }
                      100% { top: 0; }
                    }
                  `}</style>

                  {/* Scanning Animation Overlay */}
                  {analyzing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/50 rounded-[22px] z-20 backdrop-blur-[2px]">
                      <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00e676] shadow-[0_0_12px_#00e676] animate-[scanAnim_2s_linear_infinite]" />
                      <div className="flex items-center gap-2 bg-black/75 text-white py-2 px-4 rounded-full text-[13px] font-semibold tracking-wide shadow-lg">
                        <span className="material-symbols-outlined text-[18px] text-[#00e676] animate-spin">progress_activity</span>
                        <span>{t('diagnosis.analyzing')}</span>
                      </div>
                    </div>
                  )}

                  {/* Image Preview State */}
                  {selectedImage ? (
                    <div className="w-full h-full flex flex-col items-center justify-center relative">
                      <div className="w-full h-full rounded-[18px] overflow-hidden bg-black/5 flex items-center justify-center">
                        <img
                          src={selectedImage}
                          alt="Crop scan preview"
                          className="w-full h-full object-contain rounded-[18px]"
                        />
                      </div>

                      {/* Top floating badge & controls */}
                      <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-auto">
                        <div className="flex items-center gap-1.5 bg-[#006e1c] text-white px-3 py-1 rounded-full text-[12px] font-bold shadow-md">
                          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          <span>{t('diagnosis.imageReady', '✓ Image ready')}</span>
                          {imageFile?.name && (
                            <span className="text-white/80 font-normal hidden sm:inline max-w-[140px] truncate">
                              • {imageFile.name}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                            className="bg-white/95 hover:bg-white text-onSurface text-[11px] font-bold px-2.5 py-1 rounded-lg border border-black/10 shadow-sm flex items-center gap-1 cursor-pointer transition-transform active:scale-95"
                          >
                            <span className="material-symbols-outlined text-[14px]">cached</span>
                            <span>{t('diagnosis.changeImage', 'Change')}</span>
                          </button>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="bg-white/95 hover:bg-red-50 text-error p-1 rounded-lg border border-black/10 shadow-sm flex items-center justify-center cursor-pointer transition-transform active:scale-95"
                            aria-label="Remove image"
                          >
                            <span className="material-symbols-outlined text-[16px]">close</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Empty Upload State */
                    <div className="flex flex-col items-center text-center py-2">
                      <div className="w-[60px] h-[60px] rounded-full bg-surface-containerHighest flex items-center justify-center mb-2.5 transition-transform duration-200 ease-in-out group-hover:scale-105 shadow-sm">
                        <span className="material-symbols-outlined text-[30px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                          add_a_photo
                        </span>
                      </div>
                      <p className="font-headline text-[15px] md:text-[16px] font-bold text-primary mb-1 m-0">
                        {t('diagnosis.dragDrop', 'Upload crop image or drag & drop here')}
                      </p>
                      <p className="text-[12px] text-onSurface-variant m-0 max-w-[260px]">
                        {t('diagnosis.fileTypes', 'JPG, PNG • Max 10MB')}
                      </p>
                      <p className="text-[11px] text-primary font-semibold mt-2 m-0 bg-primary/10 px-3 py-0.5 rounded-full">
                        {t('diagnosis.tapToScan')}
                      </p>
                    </div>
                  )}
                </div>

                {/* Upload Error Banner */}
                {uploadError && (
                  <p className="text-[12px] text-error font-medium mt-2 mb-0 px-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[15px]">error</span>
                    {uploadError}
                  </p>
                )}

                {/* Camera / Gallery Action Buttons */}
                <div className="grid grid-cols-2 gap-3.5 mt-3.5">
                  <button
                    type="button"
                    className="h-[46px] rounded-2xl border-2 border-[#0d631b]/20 bg-surface-containerLowest text-primary font-body text-[13px] md:text-[14px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 hover:bg-[#0d631b]/5 hover:border-primary/40 active:scale-[0.98] shadow-sm"
                    onClick={() => cameraInputRef.current?.click()}
                    aria-label={t('diagnosis.camera')}
                  >
                    <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                    {t('diagnosis.camera')}
                  </button>
                  <button
                    type="button"
                    className="h-[46px] rounded-2xl border-2 border-[#0d631b]/20 bg-surface-containerLowest text-primary font-body text-[13px] md:text-[14px] font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-150 hover:bg-[#0d631b]/5 hover:border-primary/40 active:scale-[0.98] shadow-sm"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label={t('diagnosis.gallery')}
                  >
                    <span className="material-symbols-outlined text-[20px]">image</span>
                    {t('diagnosis.gallery')}
                  </button>
                </div>

                {/* Helpful Capture Guidance Card */}
                <div className="mt-3.5 bg-surface-containerLow/50 rounded-2xl p-3 border border-[#bfcaba]/25 flex items-center justify-between text-onSurface-variant">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">light_mode</span>
                    <span className="text-[11px] font-medium">Natural light</span>
                  </div>
                  <div className="h-3 w-[1px] bg-[#bfcaba]/40" />
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">center_focus_strong</span>
                    <span className="text-[11px] font-medium">Focus on spot</span>
                  </div>
                  <div className="h-3 w-[1px] bg-[#bfcaba]/40" />
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-primary">filter_vintage</span>
                    <span className="text-[11px] font-medium">Affected part</span>
                  </div>
                </div>
              </div>

              {/* ── RIGHT SIDE: Crop Context Wizard (42% of workspace: 5 cols) ── */}
              <div className="lg:col-span-5 flex flex-col">
                <CropContextWizard
                  contextForm={contextForm}
                  onFieldChange={handleInputChange}
                  onDiagnose={handleDiagnose}
                  analyzing={analyzing}
                />
              </div>
            </div>

            {/* ── DIAGNOSE WITH AI CTA (Below the two-column workspace) ── */}
            <div className="pt-2 border-t border-[#bfcaba]/25 flex flex-col items-center">
              <button
                type="button"
                id="diagnose-with-ai-btn"
                className="w-full max-w-[460px] h-[52px] md:h-[54px] rounded-full border-none bg-gradient-to-b from-primary-light to-primary-container text-white font-headline text-[13px] md:text-[14px] font-extrabold tracking-[0.8px] uppercase flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_8px_20px_rgba(13,99,27,0.22)] transition-all duration-150 active:scale-[0.98] hover:shadow-[0_10px_24px_rgba(13,99,27,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={handleDiagnose}
                disabled={analyzing}
              >
                <span className={`material-symbols-outlined text-[20px] ${analyzing ? 'animate-spin' : ''}`} style={{ fontVariationSettings: "'FILL' 1" }}>
                  {analyzing ? 'sync' : 'auto_awesome'}
                </span>
                {analyzing ? t('diagnosis.analyzing') : t('diagnosis.diagnoseWithAi')}
              </button>
            </div>
          </section>

          {/* ── Recent Analysis Result Card ──── */}
          {showResult && !analyzing && (
            <section ref={resultCardRef} className="bg-surface-containerLowest rounded-[28px] p-6 shadow-[0_8px_24px_-4px_rgba(15,31,17,0.06)] animate-[slideUp_0.3s_ease-out] border border-[#bfcaba]/20">
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="flex items-center gap-2 font-headline text-[19px] font-extrabold text-onSurface m-0">
                  <span className="material-symbols-outlined text-[22px] text-primary">analytics</span>
                  {t('diagnosis.recentAnalysis')}
                </h3>
                <span className="text-[11px] font-bold font-body py-1 px-3.5 rounded-full bg-[#986200] text-white">{RECENT_RESULT.severity}</span>
              </div>

              {/* Detected crop */}
              <div className="flex gap-5 items-start mb-6">
                <div className="w-[88px] h-[88px] rounded-xl overflow-hidden shrink-0 bg-surface-containerHigh border-4 border-surface shadow-sm">
                  <img src={selectedImage || wheatMildewImg} alt="Crop leaf diagnosis scan" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-body text-[10px] font-bold text-onSurface-variant uppercase tracking-[0.8px] mb-1 m-0">{t('diagnosis.detectedCrop')}</p>
                  <p className="font-headline text-[22px] font-extrabold text-primary leading-[1.1] mb-2.5 m-0">
                    {RECENT_RESULT.crop}{' '}
                    <span className="text-[16px] font-medium text-onSurface">/ {RECENT_RESULT.latin}</span>
                  </p>
                  <div className="inline-flex items-center gap-1.5 bg-[#ba1a1a]/10 border border-[#ba1a1a]/20 py-1.5 px-3 rounded-lg">
                    <span className="material-symbols-outlined text-[14px] text-[#ba1a1a]" style={{ fontVariationSettings: "'FILL' 1" }}>coronavirus</span>
                    <span className="text-[13px] font-bold text-[#ba1a1a]">{RECENT_RESULT.disease}</span>
                  </div>
                </div>
              </div>

              {/* Solutions bento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {RECENT_RESULT.solutions.map((sol) => (
                  <div key={sol.key} className="bg-surface-containerLow rounded-xl p-4 flex flex-col border border-[#bfcaba]/30">
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${sol.key === 'organic' ? 'bg-[#006e1c]/10 text-[#006e1c]' : 'bg-[#774c00]/10 text-[#774c00]'}`}>
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>{sol.icon}</span>
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
                  <h4 className="font-headline text-[15px] font-bold text-onSurface mb-0.5 mt-0">{t('diagnosis.needExpertAdvice')}</h4>
                  <p className="text-[12px] text-onSurface-variant m-0">{t('diagnosis.connectAgronomist')}</p>
                </div>
                <button
                  onClick={() => navigate('/farmer/experts')}
                  className="bg-surface-containerLowest text-primary border-none py-2.5 px-4 rounded-xl font-body text-[13px] font-bold cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-shadow duration-150 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] whitespace-nowrap shrink-0"
                >
                  {t('diagnosis.talkToExpert')}
                </button>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}