import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Camera, Map, Droplets, LayoutTemplate, Languages } from 'lucide-react';

export default function SignupStep3() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {};
  
  const [irrigation, setIrrigation] = useState([]);
  const [farmingStyle, setFarmingStyle] = useState('');

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const irrigationOptions = ['Canal', 'Tube Well', 'Rainfed', 'Drip', 'Sprinkler'];
  const farmingStyles = ['Organic', 'Conventional', 'Mixed', 'Hydroponic'];

  const toggleIrrigation = (source) => {
    let newSources = [...irrigation];
    if (newSources.includes(source)) {
      newSources = newSources.filter(s => s !== source);
    } else {
      newSources.push(source);
    }
    setIrrigation(newSources);
    if (touched.irrigation) {
      setErrors(prev => ({ ...prev, irrigation: newSources.length === 0 ? 'Select at least one irrigation source' : '' }));
    }
  };

  const validateField = (field, value) => {
    let error = '';
    switch (field) {
      case 'irrigation':
        if (irrigation.length === 0) error = 'Select at least one irrigation source';
        break;
      case 'farmingStyle':
        if (!value) error = 'Select your farming style';
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (field, value) => {
    setTouched({ ...touched, [field]: true });
    setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
  };

  const handleChange = (field, value) => {
    switch (field) {
      case 'farmingStyle': setFarmingStyle(value); break;
    }
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const isValid = 
    irrigation.length > 0 &&
    farmingStyle;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/farmer/home');
      }, 2000);
    } else {
      setTouched({ irrigation: true, farmingStyle: true });
      setErrors({
        irrigation: validateField('irrigation', null),
        farmingStyle: validateField('farmingStyle', farmingStyle),
      });
    }
  };

  if (showSuccess) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#f2fdf0' }}>
        <CheckCircle2 size={80} color="var(--success)" style={{ marginBottom: '1rem' }} />
        <h1 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.75rem', color: '#0f1f11', marginBottom: '0.5rem' }}>Account Created!</h1>
        <p style={{ fontFamily: 'var(--font-body)', color: '#40493d', textAlign: 'center' }}>Welcome to NeoKrishiTech.<br/>Redirecting to your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-[100dvh] relative flex flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      
      <div className="relative h-48 bg-gradient-to-b from-primary to-primary-container rounded-b-[40px] p-6 flex flex-col justify-between overflow-hidden shadow-[0_8px_32px_rgba(15,31,17,0.12)] z-10 shrink-0">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')]"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <button className="w-10 h-10 rounded-full bg-[rgba(235,255,231,0.2)] backdrop-blur-md flex items-center justify-center text-onPrimary transition-colors duration-200 border-none cursor-pointer hover:bg-[rgba(235,255,231,0.3)]" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div className="bg-[rgba(235,255,231,0.2)] backdrop-blur-md py-1.5 px-3 rounded-full border border-[rgba(235,255,231,0.3)] flex items-center gap-1.5 text-onPrimary">
            <CheckCircle2 size={14} />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.1em]">Profile Setup</span>
          </div>
        </div>

        <div className="relative z-10 mt-auto mb-2">
          <h1 className="font-headline text-[30px] leading-9 font-extrabold text-onPrimary tracking-[-0.025em] m-0">Almost Done!</h1>
          <p className="font-body text-sm text-[#cbffc2] mt-1 m-0">Finish setting up your farmer profile.</p>
        </div>
      </div>

      <div className="flex-1 p-6 pt-6 pb-4 relative z-0">
        <div className="bg-white rounded-3xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-[#d4e8d1]">
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col items-center w-1/3 z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary text-onPrimary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">✓</div>
              <span className="font-label text-[10px] font-semibold text-primary mt-1 uppercase tracking-[0.05em]">Step 1</span>
            </div>
            <div className="h-[2px] bg-[#d4e8d1] flex-1 -mt-5 -mx-4"><div className="h-full bg-[rgba(13,99,27,0.2)]" style={{ width: '100%' }}></div></div>
            
            <div className="flex flex-col items-center w-1/3 z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary text-onPrimary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">✓</div>
              <span className="font-label text-[10px] font-semibold text-primary mt-1 uppercase tracking-[0.05em]">Step 2</span>
            </div>
            <div className="h-[2px] bg-[#d4e8d1] flex-1 -mt-5 -mx-4"><div className="h-full bg-[rgba(13,99,27,0.2)]" style={{ width: '100%' }}></div></div>
            
            <div className="flex flex-col items-center w-1/3 z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary text-onPrimary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">3</div>
              <span className="font-label text-[10px] font-semibold text-primary mt-1 uppercase tracking-[0.05em]">Step 3</span>
            </div>
          </div>

          {/* Avatar Upload */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '88px',
              height: '88px',
              borderRadius: '9999px',
              border: '2px dashed var(--primary)',
              background: '#e5f9e2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              position: 'relative',
            }}>
              <Camera size={28} color="var(--primary)" />
              <div style={{
                position: 'absolute',
                bottom: '0',
                right: '0',
                width: '24px',
                height: '24px',
                borderRadius: '9999px',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>+</span>
              </div>
            </div>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            
            {/* Field 2: Irrigation Source */}
            <div className="flex flex-col gap-1.5" style={{ marginBottom: errors.irrigation ? '0.5rem' : '0' }}>
              <label className="font-label text-sm font-semibold text-[#40493d] ml-1 flex justify-between items-center">
                Irrigation Source
                <span className="text-xs font-normal text-[#707a6c]">Select at least 1</span>
              </label>
              <div className="flex gap-3 pb-2 -mx-6 px-6 flex-wrap">
                {irrigationOptions.map(source => {
                  const isActive = irrigation.includes(source);
                  return (
                    <button 
                      key={source}
                      type="button" 
                      className={`shrink-0 h-10 px-4 rounded-full font-label text-sm font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer mb-2 ${isActive ? 'bg-primary-container text-[#cbffc2] border-primary-container' : 'bg-white text-[#0f1f11] border border-[#bfcaba] hover:bg-[#e5f9e2]'} ${errors.irrigation ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                      onClick={() => {
                        toggleIrrigation(source);
                      }}
                    >
                      <Droplets size={14} style={{ marginRight: '4px' }} /> {source}
                    </button>
                  );
                })}
              </div>
              {errors.irrigation && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.875rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)' }}>{errors.irrigation}</p>}
            </div>

            {/* Field 3: Farming Style */}
            <div className="flex flex-col gap-1.5" style={{ marginBottom: errors.farmingStyle ? '0.5rem' : '0' }}>
              <label className="font-label text-sm font-semibold text-[#40493d] ml-1 flex justify-between items-center">Farming Style</label>
              <div className="relative flex gap-2">
                <div className="absolute top-0 bottom-0 left-0 pl-4 flex items-center pointer-events-none text-[#707a6c]"><LayoutTemplate size={20} /></div>
                <select 
                  className={`w-full h-[52px] bg-white border border-[#bfcaba] rounded-2xl px-4 pl-12 font-body text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:border-transparent placeholder-[#40493d] appearance-none ${errors.farmingStyle ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  value={farmingStyle}
                  onChange={(e) => handleChange('farmingStyle', e.target.value)}
                  onBlur={(e) => handleBlur('farmingStyle', e.target.value)}
                >
                  <option value="" disabled>Select your farming style</option>
                  {farmingStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
              {errors.farmingStyle && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.875rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)' }}>{errors.farmingStyle}</p>}
            </div>


          </form>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2 z-20 shrink-0 w-full">
        <button 
          className="w-full h-[56px] rounded-full bg-gradient-to-b from-primary to-primary-container text-onPrimary font-label text-base font-bold uppercase tracking-[0.05em] flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(13,99,27,0.25)] border-none cursor-pointer transition-all duration-200 active:scale-[0.95]" 
          onClick={handleSubmit}
          disabled={!isValid && Object.keys(touched).length > 0}
          style={{ opacity: (!isValid && Object.keys(touched).length > 0) ? 0.6 : 1 }}
        >
          Complete Setup <CheckCircle2 size={18} />
        </button>
      </div>

    </div>
  );
}
