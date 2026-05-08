import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf, User, Smartphone, Mail, MapPin, LocateFixed, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignupStep1() {
  const navigate = useNavigate();
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [pincode, setPincode] = useState('');
  const [village, setVillage] = useState('');
  const [activeCrops, setActiveCrops] = useState([]);
  const [landSize, setLandSize] = useState('');
  const [landUnit, setLandUnit] = useState('Bigha');

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (field, value) => {
    let error = '';
    switch (field) {
      case 'fullName':
        if (!value || value.trim().length < 3) error = 'Enter your full name (min 3 chars)';
        break;
      case 'mobile':
        if (!/^\d{10}$/.test(value)) error = 'Enter a valid 10-digit mobile number';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Enter a valid email address';
        break;
      case 'pincode':
        if (!/^\d{6}$/.test(value)) error = 'Enter a valid 6-digit pincode';
        break;
      case 'village':
        if (!value || value.trim().length === 0) error = 'Enter your village name';
        break;
      case 'landSize':
        if (!value) error = 'Enter land size';
        break;
      case 'activeCrops':
        if (activeCrops.length === 0) error = 'Select at least one crop';
        break;
      default:
        break;
    }
    return error;
  };

  const handleBlur = (field, value) => {
    setTouched({ ...touched, [field]: true });
    const error = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleChange = (field, value) => {
    switch (field) {
      case 'fullName': setFullName(value); break;
      case 'mobile': setMobile(value.replace(/\D/g, '').slice(0, 10)); break;
      case 'email': setEmail(value); break;
      case 'pincode': setPincode(value.replace(/\D/g, '').slice(0, 6)); break;
      case 'village': setVillage(value); break;
      case 'landSize': setLandSize(value); break;
      case 'landUnit': setLandUnit(value); break;
    }
    if (touched[field]) {
      let validationValue = value;
      if (field === 'mobile') validationValue = value.replace(/\D/g, '').slice(0, 10);
      if (field === 'pincode') validationValue = value.replace(/\D/g, '').slice(0, 6);
      const error = validateField(field, validationValue);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const toggleCrop = (cropKey) => {
    let newCrops = [...activeCrops];
    if (newCrops.includes(cropKey)) {
      newCrops = newCrops.filter(c => c !== cropKey);
    } else {
      newCrops.push(cropKey);
    }
    setActiveCrops(newCrops);
    if (touched.activeCrops) {
      setErrors(prev => ({ ...prev, activeCrops: newCrops.length === 0 ? 'Select at least one crop' : '' }));
    }
  };

  // Re-validate landSize if either changes
  const handleLandSizeBlur = () => {
    setTouched({ ...touched, landSize: true });
    setErrors(prev => ({ ...prev, landSize: validateField('landSize') }));
  };

  const isValid = 
    fullName.trim().length >= 3 &&
    /^\d{10}$/.test(mobile) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    /^\d{6}$/.test(pincode) &&
    village.trim().length > 0 &&
    activeCrops.length > 0 &&
    landSize;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const formData = { fullName, mobile, email, pincode, village, activeCrops, landSize, landUnit };
      navigate('/signup/step2', { state: { formData } });
    } else {
      // Force all touched
      setTouched({ fullName: true, mobile: true, email: true, pincode: true, village: true, landSize: true, activeCrops: true });
      setErrors({
        fullName: validateField('fullName', fullName),
        mobile: validateField('mobile', mobile),
        email: validateField('email', email),
        pincode: validateField('pincode', pincode),
        village: validateField('village', village),
        landSize: validateField('landSize', landSize),
        activeCrops: validateField('activeCrops'),
      });
    }
  };

  return (
    <div className="bg-surface h-full relative flex flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      
      {/* Top Header Section */}
      <div className="relative h-48 bg-gradient-to-b from-primary to-primary-container rounded-b-[40px] p-6 flex flex-col justify-between overflow-hidden shadow-[0_8px_32px_rgba(15,31,17,0.12)] z-10 shrink-0">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')]"></div>
        
        <div className="flex justify-between items-start relative z-10">
          <button className="w-10 h-10 rounded-full bg-[rgba(235,255,231,0.2)] backdrop-blur-md flex items-center justify-center text-onPrimary transition-colors duration-200 border-none cursor-pointer hover:bg-[rgba(235,255,231,0.3)]" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </button>
          <div className="bg-[rgba(235,255,231,0.2)] backdrop-blur-md py-1.5 px-3 rounded-full border border-[rgba(235,255,231,0.3)] flex items-center gap-1.5 text-onPrimary">
            <Leaf size={14} />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.1em]">Kisan Registration</span>
          </div>
        </div>

        <div className="relative z-10 mt-auto mb-2">
          <h1 className="font-headline text-[30px] leading-9 font-extrabold text-onPrimary tracking-[-0.025em] m-0">Welcome!</h1>
          <p className="font-body text-sm text-[#cbffc2] mt-1 m-0">Let's set up your digital farm profile.</p>
        </div>
      </div>

      {/* Main Form Content */}
      <div className="flex-1 p-6 pt-6 pb-4 relative z-0">
        <div className="bg-white rounded-3xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)] border border-[#d4e8d1]">
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col items-center w-1/3 z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary text-onPrimary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">1</div>
              <span className="font-label text-[10px] font-semibold text-primary mt-1 uppercase tracking-[0.05em]">Step 1</span>
            </div>
            <div className="h-[2px] bg-[#d4e8d1] flex-1 -mt-5 -mx-4"><div className="h-full bg-[rgba(13,99,27,0.2)]" style={{ width: '50%' }}></div></div>
            
            <div className="flex flex-col items-center w-1/3 z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#d4e8d1] text-[#40493d]">2</div>
              <span className="font-label text-[10px] font-medium text-[#40493d] mt-1 uppercase tracking-[0.05em]">Step 2</span>
            </div>
            <div className="h-[2px] bg-[#d4e8d1] flex-1 -mt-5 -mx-4"></div>
            
            <div className="flex flex-col items-center w-1/3 z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#d4e8d1] text-[#40493d]">3</div>
              <span className="font-label text-[10px] font-medium text-[#40493d] mt-1 uppercase tracking-[0.05em]">Step 3</span>
            </div>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            
            {/* Field 1: Full Name */}
            <div className="flex flex-col gap-1.5" style={{ marginBottom: errors.fullName ? '0.5rem' : '0' }}>
              <label className="font-label text-sm font-semibold text-[#40493d] ml-1 flex justify-between items-center">Full Name</label>
              <div className="relative flex gap-2">
                <div className="absolute top-0 bottom-0 left-0 pl-4 flex items-center pointer-events-none text-[#707a6c]"><User size={20} /></div>
                <input 
                  className={`w-full h-[52px] bg-white border border-[#bfcaba] rounded-2xl px-4 pl-12 font-body text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:border-transparent placeholder-[#40493d] ${errors.fullName ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="Enter your full name" 
                  type="text" 
                  value={fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={(e) => handleBlur('fullName', e.target.value)}
                />
                {!errors.fullName && touched.fullName && fullName.trim().length >= 3 && (
                  <CheckCircle2 size={20} color="var(--success)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                )}
              </div>
              {errors.fullName && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.875rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)' }}>{errors.fullName}</p>}
            </div>

            {/* Field 2: Mobile Number */}
            <div className="flex flex-col gap-1.5" style={{ marginBottom: errors.mobile ? '0.5rem' : '0' }}>
              <label className="font-label text-sm font-semibold text-[#40493d] ml-1 flex justify-between items-center">Mobile Number</label>
              <div className="relative flex gap-2">
                <div className="h-[52px] w-20 bg-white rounded-2xl flex items-center justify-center font-body text-[#0f1f11] border border-[#bfcaba] shadow-[0_1px_2px_rgba(0,0,0,0.05)]">+91</div>
                <div style={{ position: 'relative', flex: 1 }}>
                  <div className="absolute top-0 bottom-0 left-0 pl-4 flex items-center pointer-events-none text-[#707a6c]"><Smartphone size={20} /></div>
                  <input 
                    className={`w-full h-[52px] bg-white border border-[#bfcaba] rounded-2xl px-4 pl-12 font-body text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:border-transparent placeholder-[#40493d] ${errors.mobile ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                    placeholder="10-digit mobile number" 
                    type="tel" 
                    value={mobile}
                    onChange={(e) => handleChange('mobile', e.target.value)}
                    onBlur={(e) => handleBlur('mobile', e.target.value)}
                  />
                  {!errors.mobile && touched.mobile && mobile.length === 10 && (
                    <CheckCircle2 size={20} color="var(--success)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  )}
                </div>
              </div>
              {errors.mobile && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.875rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)' }}>{errors.mobile}</p>}
            </div>

            {/* Field 3: Email */}
            <div className="flex flex-col gap-1.5" style={{ marginBottom: errors.email ? '0.5rem' : '0' }}>
              <label className="font-label text-sm font-semibold text-[#40493d] ml-1 flex justify-between items-center">Email</label>
              <div className="relative flex gap-2">
                <div className="absolute top-0 bottom-0 left-0 pl-4 flex items-center pointer-events-none text-[#707a6c]"><Mail size={20} /></div>
                <input 
                  className={`w-full h-[52px] bg-white border border-[#bfcaba] rounded-2xl px-4 pl-12 font-body text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:border-transparent placeholder-[#40493d] ${errors.email ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="name@email.com" 
                  type="email" 
                  value={email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                />
                {!errors.email && touched.email && email.includes('@') && (
                  <CheckCircle2 size={20} color="var(--success)" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                )}
              </div>
              {errors.email && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.875rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)' }}>{errors.email}</p>}
            </div>

            {/* Field 4: Pincode */}
            <div className="flex flex-col gap-1.5" style={{ marginBottom: errors.pincode ? '0.5rem' : '0' }}>
              <label className="font-label text-sm font-semibold text-[#40493d] ml-1 flex justify-between items-center">Pincode</label>
              <div style={{ position: 'relative' }}>
                <div className="absolute top-0 bottom-0 left-0 pl-4 flex items-center pointer-events-none text-[#707a6c]"><LocateFixed size={20} /></div>
                <input 
                  className={`w-full h-[52px] bg-white border border-[#bfcaba] rounded-2xl px-4 pl-12 font-body text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:border-transparent placeholder-[#40493d] ${errors.pincode ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="Enter 6-digit pincode" 
                  type="number" 
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => handleChange('pincode', e.target.value)}
                  onBlur={(e) => handleBlur('pincode', e.target.value)}
                />
              </div>
              {errors.pincode && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.875rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)' }}>{errors.pincode}</p>}
            </div>

            {/* Field 5: Village */}
            <div className="flex flex-col gap-1.5" style={{ marginBottom: errors.village ? '0.5rem' : '0' }}>
              <label className="font-label text-sm font-semibold text-[#40493d] ml-1 flex justify-between items-center">Your Village</label>
              <div style={{ position: 'relative' }}>
                <div className="absolute top-0 bottom-0 left-0 pl-4 flex items-center pointer-events-none text-[#707a6c]"><MapPin size={20} /></div>
                <input 
                  className={`w-full h-[52px] bg-white border border-[#bfcaba] rounded-2xl px-4 pl-12 pr-12 font-body text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:border-transparent placeholder-[#40493d] ${errors.village ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="Search village" 
                  type="text" 
                  value={village}
                  onChange={(e) => handleChange('village', e.target.value)}
                  onBlur={(e) => handleBlur('village', e.target.value)}
                />
                <button type="button" className="absolute top-0 bottom-0 right-0 pr-4 flex items-center text-primary cursor-pointer bg-transparent border-none">
                  <LocateFixed size={20} />
                </button>
              </div>
              {errors.village && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.875rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)' }}>{errors.village}</p>}
            </div>

            {/* Field 5: Primary Crop */}
            <div className="flex flex-col gap-1.5" style={{ marginBottom: errors.activeCrops ? '0.5rem' : '0' }}>
              <label className="font-label text-sm font-semibold text-[#40493d] ml-1 flex justify-between items-center">
                Your Crops
                <span className="text-xs font-normal text-[#707a6c]">Select multiple</span>
              </label>
              <div className="flex overflow-x-auto gap-3 pb-2 -mx-6 px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {[
                  { key: 'wheat', emoji: '🌾', label: 'Wheat' },
                  { key: 'rice', emoji: '🚜', label: 'Rice' },
                  { key: 'cotton', emoji: '🌱', label: 'Cotton' },
                  { key: 'sugarcane', emoji: '🎋', label: 'Sugarcane' },
                ].map(crop => {
                  const isActive = activeCrops.includes(crop.key);
                  return (
                    <button 
                      key={crop.key}
                      type="button" 
                      className={`shrink-0 h-10 px-4 rounded-full font-label text-sm font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer ${isActive ? 'bg-primary-container text-[#cbffc2] border-primary-container' : 'bg-white text-[#0f1f11] border border-[#bfcaba] hover:bg-[#e5f9e2]'} ${errors.activeCrops ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                      onClick={() => toggleCrop(crop.key)}
                    >
                      {crop.emoji} {crop.label}
                    </button>
                  );
                })}
              </div>
              {errors.activeCrops && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.875rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)' }}>{errors.activeCrops}</p>}
            </div>

            {/* Field 6: Land Size */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label text-sm font-semibold text-[#40493d] ml-1 flex justify-between items-center">Total Land Size</label>
              <div className="relative flex items-center">
                <input 
                  className={`w-full h-[52px] bg-white border border-[#bfcaba] rounded-2xl px-4 pr-[140px] font-body text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:border-transparent placeholder-[#40493d] text-lg font-medium ${errors.landSize ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="0" 
                  type="number"
                  min="0"
                  value={landSize}
                  onChange={(e) => {
                    handleChange('landSize', e.target.value);
                  }}
                  onBlur={(e) => handleBlur('landSize', e.target.value)}
                />
                
                <div className="absolute right-1.5 top-1.5 bottom-1.5 flex bg-[#f0f9f0] rounded-xl border border-[#d4e8d1] p-1 overflow-hidden w-[120px] shadow-sm">
                  <button
                    type="button"
                    className={`flex-1 rounded-lg text-[11px] font-label font-bold transition-all duration-200 border-none cursor-pointer ${landUnit === 'Bigha' ? 'bg-primary text-onPrimary shadow-md' : 'text-[#707a6c] bg-transparent hover:bg-[rgba(13,99,27,0.05)]'}`}
                    onClick={() => setLandUnit('Bigha')}
                  >
                    Bigha
                  </button>
                  <button
                    type="button"
                    className={`flex-1 rounded-lg text-[11px] font-label font-bold transition-all duration-200 border-none cursor-pointer ${landUnit === 'Acres' ? 'bg-primary text-onPrimary shadow-md' : 'text-[#707a6c] bg-transparent hover:bg-[rgba(13,99,27,0.05)]'}`}
                    onClick={() => setLandUnit('Acres')}
                  >
                    Acres
                  </button>
                </div>
              </div>
              {errors.landSize && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.875rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)' }}>{errors.landSize}</p>}
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
          Continue <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
