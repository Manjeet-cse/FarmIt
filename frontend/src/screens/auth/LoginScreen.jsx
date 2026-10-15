import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Loader2, Sparkles, User, ArrowRight, ShieldCheck, Phone, Lock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const DEMO_ACCOUNTS = [
  { phone: '9876543210', name: 'Manjeet Lodha', role: 'Farmer (Demo)' },
  { phone: '9823456789', name: 'Ramesh Patel', role: 'Farmer (Demo)' },
  { phone: '9123456780', name: 'Suresh Kumar', role: 'Farmer (Demo)' },
];

export default function LoginScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { bypassLogin, googleLogin } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('1234');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(digits);
    if (error) setError('');
  };

  const handleQuickSelect = (phone) => {
    setPhoneNumber(phone);
    if (error) setError('');
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number (कोई भी 10 अंक दर्ज करें)');
      return;
    }

    setIsSubmitting(true);
    // Instant pure frontend login: any 10 digits
    setTimeout(() => {
      bypassLogin(phoneNumber);
      setIsSubmitting(false);
      navigate('/farmer/home', { replace: true });
    }, 300);
  };

  const handleGuestLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      bypassLogin('9876543210', 'Manjeet Lodha');
      setIsSubmitting(false);
      navigate('/farmer/home', { replace: true });
    }, 250);
  };

  const handleGoogleSuccess = async () => {
    setIsSubmitting(true);
    setTimeout(() => {
      bypassLogin('9876543210', 'Manjeet Lodha');
      setIsSubmitting(false);
      navigate('/farmer/home', { replace: true });
    }, 250);
  };

  return (
    <div className="bg-surface min-h-[100dvh] flex flex-col justify-between relative overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      
      {/* Header Background */}
      <div className="w-full bg-gradient-to-b from-[#d4e8d1] to-[#e5f9e2] rounded-b-[36px] relative flex flex-col items-center justify-center pt-8 pb-10 px-6 shrink-0 shadow-[0_4px_20px_rgba(46,125,50,0.08)]">
        <div className="z-10 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-white/90 rounded-2xl shadow-md p-2.5 flex items-center justify-center border border-[#cbffc2]/50 mb-3 backdrop-blur-sm">
            <img src="/images/logo-icon.png" alt="FarmIt Logo" className="w-full h-full object-contain" />
          </div>
          <span className="bg-[#1b6d24] text-white py-1 px-3.5 rounded-full font-label text-[11px] font-bold uppercase tracking-[0.08em] shadow-sm flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#cbffc2]" />
            {t('login.kisanLogin', 'Kisan Login')}
          </span>
          <h2 className="text-[#0f1f11] font-headline font-extrabold text-[22px] mt-2 mb-0.5 tracking-tight">FarmIt Krishi Portal</h2>
          <p className="text-[#40493d] text-[13px] font-body m-0">Voice of the Farmer • Power of AI</p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="flex-1 max-w-[480px] w-full mx-auto bg-white rounded-t-[32px] sm:rounded-[32px] z-20 pt-6 px-6 sm:px-8 pb-8 -mt-6 sm:my-6 flex flex-col shadow-[0_-4px_30px_rgba(15,31,17,0.08)] sm:shadow-[0_12px_40px_rgba(15,31,17,0.08)] sm:border sm:border-[#daeed6]">
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-headline font-bold text-[22px] text-[#0f1f11] m-0">
              {t('login.welcomeBack', 'Welcome Back!')}
            </h1>
            <p className="font-body text-[13px] text-[#707a6c] mt-0.5 m-0">
              Enter any 10-digit mobile number to login
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1b6d24] bg-[#e5f9e2] px-2.5 py-1 rounded-full">
            <Sparkles size={13} />
            Frontend Demo
          </span>
        </div>

        {/* Demo Mode Banner */}
        <div className="bg-[#e5f9e2]/80 border border-[#b8e4b3] text-[#155a1d] px-3.5 py-2.5 rounded-2xl mb-4 text-[12px] font-body flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-[#1b6d24] shrink-0">check_circle</span>
          <span className="leading-snug">
            <strong>Dummy Mode Active:</strong> Kisi bhi 10-digit number se bina backend ke turant login karein!
          </span>
        </div>

        {/* Quick Demo Pickers */}
        <div className="mb-4">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#707a6c] mb-1.5 font-label">
            Quick Fill Demo Numbers:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.phone}
                type="button"
                onClick={() => handleQuickSelect(acc.phone)}
                className={`text-[12px] px-2.5 py-1.5 rounded-xl border transition-all duration-150 cursor-pointer font-body flex items-center gap-1.5 ${
                  phoneNumber === acc.phone
                    ? 'bg-[#1b6d24] text-white border-[#1b6d24] shadow-sm font-semibold'
                    : 'bg-[#f4fbf3] text-[#2c3d2e] border-[#daeed6] hover:bg-[#e5f9e2]'
                }`}
              >
                <Phone size={11} className={phoneNumber === acc.phone ? 'text-[#cbffc2]' : 'text-[#1b6d24]'} />
                <span>{acc.phone}</span>
                <span className="text-[10px] opacity-75">({acc.name.split(' ')[0]})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="flex flex-col flex-1" noValidate>
          
          {/* Mobile Number Field */}
          <div className="mb-3.5">
            <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">
              {t('login.mobileNumber', 'Mobile Number (मोबाइल नंबर)')}
            </label>
            <div className="relative flex items-center h-[50px]">
              <div className="absolute left-3.5 z-10 text-[#0f1f11] font-semibold flex items-center gap-1 font-body bg-[#daeed6] px-2 py-1 rounded-lg">
                <span className="text-[14px]">🇮🇳 +91</span>
              </div>
              <input 
                className={`w-full h-full bg-[#f4fbf3] border border-[#daeed6] rounded-[16px] px-4 pl-[88px] pr-10 font-body text-[15px] font-semibold text-[#0f1f11] transition-all duration-200 focus:outline-none focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 focus:bg-white placeholder:text-[#8fa389] placeholder:font-normal ${
                  error ? 'border-red-400 bg-red-50/50' : ''
                }`} 
                placeholder="Enter 10-digit number" 
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phoneNumber}
                onChange={(e) => handlePhoneChange(e.target.value)}
              />
              {phoneNumber.length === 10 && (
                <div className="absolute right-3.5 text-[#1b6d24] flex items-center gap-1">
                  <CheckCircle2 size={18} className="fill-[#1b6d24] text-white" />
                </div>
              )}
            </div>
            {error && (
              <p className="text-red-600 text-[12px] mt-1.5 font-body flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">error</span>
                {error}
              </p>
            )}
            <p className="text-[11px] text-[#707a6c] mt-1 m-0">
              * Enter any 10 digits (e.g. 9876543210 or any phone number)
            </p>
          </div>

          {/* Optional PIN Field */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1.5">
              <label className="font-label text-[12px] text-[#40493d] font-bold">
                Security PIN / Password
              </label>
              <span className="text-[11px] text-[#8fa389] bg-[#f4fbf3] px-2 py-0.5 rounded-full border border-[#daeed6]">
                Dummy: 1234
              </span>
            </div>
            <div className="relative flex items-center h-[50px]">
              <div className="absolute left-3.5 z-10 text-[#707a6c]">
                <Lock size={16} />
              </div>
              <input 
                className="w-full h-full bg-[#f4fbf3] border border-[#daeed6] rounded-[16px] px-4 pl-10 font-body text-[15px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 focus:bg-white placeholder:text-[#8fa389]" 
                placeholder="Enter 4-digit PIN (default 1234)" 
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
              />
            </div>
          </div>

          {/* Login Submit Button */}
          <button 
            className="w-full h-[50px] rounded-[16px] bg-[#1b6d24] text-white font-body text-[15px] font-bold tracking-wide border-none cursor-pointer mt-1 shadow-[0_6px_16px_rgba(27,109,36,0.25)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 hover:bg-[#155a1d] disabled:opacity-60 disabled:cursor-not-allowed" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging in to Dashboard...
              </>
            ) : (
              <>
                <span>{t('login.logIn', 'Login to Dashboard')}</span>
                <ArrowRight size={17} />
              </>
            )}
          </button>

          {/* Fast 1-Click Guest Button */}
          <button
            type="button"
            onClick={handleGuestLogin}
            disabled={isSubmitting}
            className="w-full h-[44px] rounded-[16px] bg-[#f4fbf3] text-[#1b6d24] border border-[#daeed6] font-body text-[13px] font-semibold tracking-wide cursor-pointer mt-2.5 transition-all duration-200 hover:bg-[#e5f9e2] active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <User size={15} />
            <span>1-Click Instant Demo Login</span>
          </button>

          {/* Divider */}
          <div className="flex items-center text-center my-4 text-[#707a6c] font-body text-[12px] before:content-[''] before:flex-1 before:border-b before:border-[#daeed6] before:mr-3 after:content-[''] after:flex-1 after:border-b after:border-[#daeed6] after:ml-3">
            {t('login.orLoginWith', 'or continue with')}
          </div>

          {/* Google Sign-in */}
          <div className="w-full flex justify-center [&>div]:w-full">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleSuccess}
              theme="outline"
              size="large"
              shape="pill"
              text="continue_with"
              width="100%"
            />
          </div>

          {/* Footer Link to Signup */}
          <div className="mt-6 pt-2 flex justify-center items-center gap-1.5 text-center">
            <span className="text-[#707a6c] font-body text-[13px]">
              {t('login.newUser', 'New Kisan?')}
            </span>
            <Link 
              to="/signup" 
              className="text-[#1b6d24] font-label font-bold text-[13px] no-underline hover:underline flex items-center gap-1"
            >
              <span>{t('login.signUp', 'Create New Account (साइन अप करें)')}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </form>
      </div>

      <div className="h-4 w-full shrink-0" />
    </div>
  );
}
