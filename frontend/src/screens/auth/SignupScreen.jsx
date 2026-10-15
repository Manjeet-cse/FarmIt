import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Loader2, Sparkles, User, Phone, MapPin, Sprout, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/AuthContext';

const POPULAR_STATES = [
  'Madhya Pradesh',
  'Punjab',
  'Haryana',
  'Uttar Pradesh',
  'Maharashtra',
  'Rajasthan',
  'Gujarat',
  'Bihar'
];

const CROP_OPTIONS = [
  'Wheat (गेहूं)',
  'Soybean (सोयाबीन)',
  'Gram / Chana (चना)',
  'Cotton (कपास)',
  'Mustard (सरसों)',
  'Paddy / Rice (धान)'
];

export default function SignupScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { signup } = useAuth();

  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [state, setState] = useState('Madhya Pradesh');
  const [primaryCrop, setPrimaryCrop] = useState('Wheat (गेहूं)');
  const [pin, setPin] = useState('1234');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePhoneChange = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    setMobile(digits);
    if (error) setError('');
  };

  const handleAutoFill = () => {
    setFullName('Ramesh Patel');
    setMobile('9876543210');
    setState('Madhya Pradesh');
    setPrimaryCrop('Wheat (गेहूं)');
    setPin('1234');
    setError('');
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!fullName.trim() || fullName.trim().length < 2) {
      setError('Please enter your full name (कम से कम 2 अक्षर)');
      return;
    }

    if (!mobile || mobile.length !== 10) {
      setError('Please enter a valid 10-digit mobile number (10 अंकों का नंबर)');
      return;
    }

    setIsSubmitting(true);

    const dummyUserData = {
      fullName: fullName.trim(),
      name: fullName.trim(),
      mobile: mobile,
      phone: mobile,
      role: 'farmer',
      location: `${state}, India`,
      primaryCrop: primaryCrop,
    };

    // Frontend-only instant signup (no backend required)
    setTimeout(() => {
      signup(dummyUserData);
      setIsSubmitting(false);
      setShowSuccess(true);
      setTimeout(() => {
        navigate('/farmer/home', { replace: true });
      }, 1500);
    }, 400);
  };

  return (
    <div className="bg-surface min-h-[100dvh] flex flex-col justify-between relative overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      
      {/* Top Header Section */}
      <div className="relative bg-gradient-to-b from-[#1b6d24] to-[#2e7d32] rounded-b-[36px] pt-7 pb-10 px-6 flex flex-col justify-between overflow-hidden shadow-[0_8px_32px_rgba(15,31,17,0.14)] z-10 shrink-0">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')]"></div>
        
        <div className="flex justify-between items-center relative z-10 mb-4">
          <button 
            type="button"
            onClick={() => navigate('/login')}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors duration-200 border-none cursor-pointer hover:bg-white/30"
          >
            <ArrowLeft size={20} />
          </button>
          
          <div className="bg-white/20 backdrop-blur-md py-1.5 px-3 rounded-full border border-white/20 flex items-center gap-1.5 text-white">
            <ShieldCheck size={14} className="text-[#cbffc2]" />
            <span className="font-label text-xs font-semibold uppercase tracking-[0.1em]">Kisan Registration</span>
          </div>
        </div>

        <div className="relative z-10 text-white">
          <h1 className="font-headline text-[24px] font-extrabold tracking-tight m-0">Create Farm Profile</h1>
          <p className="font-body text-[13px] text-[#cbffc2] mt-1 m-0">Join thousands of smart farmers using FarmIt</p>
        </div>
      </div>

      {/* Main Card Content */}
      <div className="flex-1 max-w-[480px] w-full mx-auto bg-white rounded-t-[32px] sm:rounded-[32px] z-20 pt-6 px-6 sm:px-8 pb-8 -mt-6 sm:my-6 flex flex-col shadow-[0_-4px_30px_rgba(15,31,17,0.08)] sm:shadow-[0_12px_40px_rgba(15,31,17,0.08)] sm:border sm:border-[#daeed6]">
        
        {/* Banner with 1-click Auto Fill button */}
        <div className="flex items-center justify-between bg-[#e5f9e2]/80 border border-[#b8e4b3] px-3.5 py-2.5 rounded-2xl mb-4 text-[12px] font-body text-[#155a1d]">
          <div className="flex items-center gap-1.5">
            <Sparkles size={16} className="text-[#1b6d24] shrink-0" />
            <span className="font-medium">Quick Frontend Test?</span>
          </div>
          <button
            type="button"
            onClick={handleAutoFill}
            className="bg-[#1b6d24] text-white text-[11px] font-bold px-3 py-1 rounded-xl border-none cursor-pointer hover:bg-[#155a1d] transition-all"
          >
            Auto-fill Sample
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5" noValidate>
          
          {/* Full Name */}
          <div>
            <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">
              Full Name (किसान का पूरा नाम) <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center h-[48px]">
              <div className="absolute left-3.5 z-10 text-[#707a6c]">
                <User size={16} />
              </div>
              <input 
                className="w-full h-full bg-[#f4fbf3] border border-[#daeed6] rounded-[16px] px-4 pl-10 font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 focus:bg-white placeholder:text-[#8fa389]" 
                placeholder="e.g. Ramesh Patel" 
                type="text" 
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (error) setError('');
                }}
              />
              {fullName.trim().length >= 2 && (
                <CheckCircle2 size={18} className="absolute right-3.5 text-[#1b6d24] fill-[#1b6d24] text-white" />
              )}
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">
              Mobile Number (मोबाइल नंबर) <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center h-[48px]">
              <div className="absolute left-3.5 z-10 text-[#0f1f11] font-semibold flex items-center gap-1 font-body bg-[#daeed6] px-2 py-1 rounded-lg">
                <span className="text-[13px]">🇮🇳 +91</span>
              </div>
              <input 
                className="w-full h-full bg-[#f4fbf3] border border-[#daeed6] rounded-[16px] px-4 pl-[88px] font-body text-[14px] font-semibold text-[#0f1f11] transition-all duration-200 focus:outline-none focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 focus:bg-white placeholder:text-[#8fa389] placeholder:font-normal" 
                placeholder="Enter any 10-digit number" 
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={mobile}
                onChange={(e) => handlePhoneChange(e.target.value)}
              />
              {mobile.length === 10 && (
                <CheckCircle2 size={18} className="absolute right-3.5 text-[#1b6d24] fill-[#1b6d24] text-white" />
              )}
            </div>
          </div>

          {/* State / Region Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">
                State (राज्य)
              </label>
              <div className="relative flex items-center h-[48px]">
                <div className="absolute left-3.5 z-10 text-[#707a6c]">
                  <MapPin size={16} />
                </div>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full h-full bg-[#f4fbf3] border border-[#daeed6] rounded-[16px] px-4 pl-10 pr-8 font-body text-[13px] text-[#0f1f11] appearance-none focus:outline-none focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 focus:bg-white cursor-pointer"
                >
                  {POPULAR_STATES.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 text-[#707a6c] pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Primary Crop */}
            <div>
              <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">
                Primary Crop (मुख्य फसल)
              </label>
              <div className="relative flex items-center h-[48px]">
                <div className="absolute left-3.5 z-10 text-[#707a6c]">
                  <Sprout size={16} />
                </div>
                <select
                  value={primaryCrop}
                  onChange={(e) => setPrimaryCrop(e.target.value)}
                  className="w-full h-full bg-[#f4fbf3] border border-[#daeed6] rounded-[16px] px-4 pl-10 pr-8 font-body text-[13px] text-[#0f1f11] appearance-none focus:outline-none focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 focus:bg-white cursor-pointer"
                >
                  {CROP_OPTIONS.map((crop) => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 text-[#707a6c] pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Security PIN */}
          <div>
            <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">
              Set Security PIN (सुरक्षा पिन)
            </label>
            <div className="relative flex items-center h-[48px]">
              <div className="absolute left-3.5 z-10 text-[#707a6c]">
                <Lock size={16} />
              </div>
              <input 
                className="w-full h-full bg-[#f4fbf3] border border-[#daeed6] rounded-[16px] px-4 pl-10 font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 focus:bg-white" 
                placeholder="4-digit PIN" 
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3.5 py-2.5 rounded-xl text-[13px] font-body flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full h-[50px] rounded-[16px] bg-[#1b6d24] text-white font-body text-[15px] font-bold tracking-wide border-none cursor-pointer mt-2 shadow-[0_6px_16px_rgba(27,109,36,0.25)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 hover:bg-[#155a1d] disabled:opacity-60 disabled:cursor-not-allowed" 
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Creating Profile...
              </>
            ) : (
              <>
                <span>Create Account & Start (शुरू करें)</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>

          {/* Link back to Login */}
          <div className="mt-3 flex justify-center items-center gap-1.5 text-center">
            <span className="text-[#707a6c] font-body text-[13px]">
              Already registered? (पहले से खाता है?)
            </span>
            <Link 
              to="/login" 
              className="text-[#1b6d24] font-label font-bold text-[13px] no-underline hover:underline"
            >
              Log In
            </Link>
          </div>
        </form>
      </div>

      {/* Success Modal Animation */}
      {showSuccess && (
        <div className="fixed inset-0 bg-[#0f1f11]/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-3xl p-7 w-full max-w-[340px] flex flex-col items-center text-center shadow-2xl animate-scale-in border border-[#daeed6]">
            <div className="w-18 h-18 bg-[#e5f9e2] rounded-full flex items-center justify-center mb-4 p-4">
              <CheckCircle2 size={44} className="text-[#1b6d24] fill-[#1b6d24]" color="#ffffff" />
            </div>
            <h2 className="font-headline text-[22px] font-bold text-[#0f1f11] mb-1">Account Created!</h2>
            <p className="font-body text-[#40493d] text-[13px] leading-relaxed mb-4">
              Welcome to FarmIt, <strong className="text-[#1b6d24]">{fullName || 'Farmer'}</strong>!<br/>
              Redirecting you to the Kisan Dashboard...
            </p>
            <div className="w-full bg-[#daeed6] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#1b6d24] h-full rounded-full w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      <div className="h-4 w-full shrink-0" />
    </div>
  );
}
