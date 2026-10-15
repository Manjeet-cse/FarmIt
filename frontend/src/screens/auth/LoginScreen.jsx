import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, Loader2, Sparkles, User, ArrowRight, ShieldCheck, Phone, ArrowLeft, RefreshCw, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

const DEMO_ACCOUNTS = [
  { phone: '9876543210', name: 'Manjeet Lodha' },
  { phone: '9823456789', name: 'Ramesh Patel' },
  { phone: '9123456780', name: 'Suresh Kumar' },
];

export default function LoginScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { bypassLogin } = useAuth();

  // State: 'phone' or 'otp'
  const [step, setStep] = useState('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [autoFilled, setAutoFilled] = useState(false);
  const [showSmsBanner, setShowSmsBanner] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const otpRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  // Resend countdown timer
  useEffect(() => {
    let interval;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Simulated auto-fill OTP when entering OTP step
  useEffect(() => {
    if (step === 'otp') {
      setShowSmsBanner(true);
      const digits = ['1', '2', '3', '4'];
      const timers = [];

      // Sequentially fill digits to simulate auto-read SMS
      digits.forEach((digit, i) => {
        const timer = setTimeout(() => {
          setOtp((prev) => {
            const next = [...prev];
            next[i] = digit;
            return next;
          });
          if (i === digits.length - 1) {
            setAutoFilled(true);
          }
        }, 500 + i * 220);
        timers.push(timer);
      });

      return () => timers.forEach(clearTimeout);
    } else {
      setOtp(['', '', '', '']);
      setAutoFilled(false);
      setShowSmsBanner(false);
    }
  }, [step]);

  const handlePhoneChange = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(digits);
    if (error) setError('');
  };

  const handleQuickSelect = (phone) => {
    setPhoneNumber(phone);
    if (error) setError('');
  };

  // Step 1: Send OTP
  const handleSendOtp = (e) => {
    if (e) e.preventDefault();
    setError('');

    if (!phoneNumber || phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number (कोई भी 10 अंक दर्ज करें)');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setResendTimer(30);
    }, 350);
  };

  // Step 2: Verify OTP & Login
  const handleVerifyOtp = (e) => {
    if (e) e.preventDefault();
    setError('');

    const currentOtp = otp.join('');
    if (currentOtp.length !== 4) {
      setError('Please enter complete 4-digit OTP (1234)');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      bypassLogin(phoneNumber);
      setIsSubmitting(false);
      navigate('/farmer/home', { replace: true });
    }, 350);
  };

  const handleOtpInput = (index, value) => {
    const clean = value.replace(/\D/g, '').slice(0, 1);
    const updated = [...otp];
    updated[index] = clean;
    setOtp(updated);
    if (error) setError('');

    if (clean && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleResendOtp = () => {
    setOtp(['', '', '', '']);
    setAutoFilled(false);
    setResendTimer(30);
    setShowSmsBanner(true);

    const digits = ['1', '2', '3', '4'];
    digits.forEach((digit, i) => {
      setTimeout(() => {
        setOtp((prev) => {
          const next = [...prev];
          next[i] = digit;
          return next;
        });
        if (i === 3) setAutoFilled(true);
      }, 500 + i * 200);
    });
  };

  const handleGuestLogin = () => {
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
      <div className="w-full bg-gradient-to-b from-[#d4e8d1] to-[#e5f9e2] rounded-b-[36px] relative flex flex-col items-center justify-center pt-6 pb-9 px-6 shrink-0 shadow-[0_4px_20px_rgba(46,125,50,0.08)]">
        
        {/* Top Bar with Landing Page Link */}
        <div className="w-full max-w-[480px] flex justify-between items-center mb-2 z-10">
          <Link
            to="/landing"
            className="flex items-center gap-1.5 text-[#1b6d24] text-[13px] font-semibold no-underline hover:text-[#155a1d] transition-colors py-1 px-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#cbffc2]"
          >
            <ArrowLeft size={15} />
            <span>FarmIt Home</span>
          </Link>
          <span className="bg-[#1b6d24] text-white py-1 px-3 rounded-full font-label text-[11px] font-bold uppercase tracking-[0.08em] shadow-sm flex items-center gap-1">
            <ShieldCheck size={13} className="text-[#cbffc2]" />
            {t('login.kisanLogin', 'Kisan Login')}
          </span>
        </div>

        <div className="z-10 flex flex-col items-center text-center mt-1">
          <div className="w-16 h-16 bg-white/95 rounded-2xl shadow-md p-2 flex items-center justify-center border border-[#cbffc2]/60 mb-2 backdrop-blur-sm">
            <img src="/images/logo-icon.png" alt="FarmIt Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="text-[#0f1f11] font-headline font-extrabold text-[22px] m-0 tracking-tight">FarmIt Krishi Portal</h2>
          <p className="text-[#40493d] text-[13px] font-body mt-0.5 m-0">Voice of the Farmer • Power of AI</p>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="flex-1 max-w-[480px] w-full mx-auto bg-white rounded-t-[32px] sm:rounded-[32px] z-20 pt-6 px-6 sm:px-8 pb-8 -mt-6 sm:my-6 flex flex-col shadow-[0_-4px_30px_rgba(15,31,17,0.08)] sm:shadow-[0_12px_40px_rgba(15,31,17,0.08)] sm:border sm:border-[#daeed6]">
        
        {/* STEP 1: ENTER PHONE NUMBER */}
        {step === 'phone' && (
          <div className="flex flex-col flex-1">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-headline font-bold text-[22px] text-[#0f1f11] m-0">
                  {t('login.welcomeBack', 'Welcome Back!')}
                </h1>
                <p className="font-body text-[13px] text-[#707a6c] mt-0.5 m-0">
                  Login with Mobile OTP (बिना पासवर्ड के आसान लॉगिन)
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#1b6d24] bg-[#e5f9e2] px-2.5 py-1 rounded-full shrink-0">
                <Sparkles size={13} />
                Auto-OTP
              </span>
            </div>

            {/* Quick Demo Pickers */}
            <div className="mb-4">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#707a6c] mb-1.5 font-label">
                Quick Select Demo Number:
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

            <form onSubmit={handleSendOtp} className="flex flex-col flex-1" noValidate>
              
              {/* Mobile Number Field */}
              <div className="mb-4">
                <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">
                  {t('login.mobileNumber', 'Mobile Number (मोबाइल नंबर)')}
                </label>
                <div className="relative flex items-center h-[52px]">
                  <div className="absolute left-3.5 z-10 text-[#0f1f11] font-semibold flex items-center gap-1 font-body bg-[#daeed6] px-2 py-1 rounded-lg">
                    <span className="text-[14px]">🇮🇳 +91</span>
                  </div>
                  <input 
                    className={`w-full h-full bg-[#f4fbf3] border border-[#daeed6] rounded-[16px] px-4 pl-[88px] pr-10 font-body text-[16px] font-semibold text-[#0f1f11] transition-all duration-200 focus:outline-none focus:border-[#1b6d24] focus:ring-2 focus:ring-[#1b6d24]/20 focus:bg-white placeholder:text-[#8fa389] placeholder:font-normal ${
                      error ? 'border-red-400 bg-red-50/50' : ''
                    }`} 
                    placeholder="Enter any 10-digit number" 
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phoneNumber}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    autoFocus
                  />
                  {phoneNumber.length === 10 && (
                    <div className="absolute right-3.5 text-[#1b6d24] flex items-center gap-1">
                      <CheckCircle2 size={19} className="fill-[#1b6d24] text-white" />
                    </div>
                  )}
                </div>
                {error && (
                  <p className="text-red-600 text-[12px] mt-1.5 font-body flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">error</span>
                    {error}
                  </p>
                )}
                <p className="text-[11px] text-[#707a6c] mt-1.5 m-0">
                  ⚡ Koi bhi 10 digits number enter karein — OTP automatic fill hoga!
                </p>
              </div>

              {/* Get OTP Button */}
              <button 
                className="w-full h-[50px] rounded-[16px] bg-[#1b6d24] text-white font-body text-[15px] font-bold tracking-wide border-none cursor-pointer mt-2 shadow-[0_6px_16px_rgba(27,109,36,0.25)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 hover:bg-[#155a1d] disabled:opacity-60 disabled:cursor-not-allowed" 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  <>
                    <span>Get OTP (ओटीपी भेजें)</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Fast 1-Click Guest Button */}
              <button
                type="button"
                onClick={handleGuestLogin}
                disabled={isSubmitting}
                className="w-full h-[44px] rounded-[16px] bg-[#f4fbf3] text-[#1b6d24] border border-[#daeed6] font-body text-[13px] font-semibold tracking-wide cursor-pointer mt-3 transition-all duration-200 hover:bg-[#e5f9e2] active:scale-[0.98] flex items-center justify-center gap-2"
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
                  onSuccess={handleGuestLogin}
                  onError={handleGuestLogin}
                  theme="outline"
                  size="large"
                  shape="pill"
                  text="continue_with"
                  width="100%"
                />
              </div>

              {/* Footer Link to Signup */}
              <div className="mt-6 pt-1 flex justify-center items-center gap-1.5 text-center">
                <span className="text-[#707a6c] font-body text-[13px]">
                  {t('login.newUser', 'New Kisan?')}
                </span>
                <Link 
                  to="/signup" 
                  className="text-[#1b6d24] font-label font-bold text-[13px] no-underline hover:underline flex items-center gap-1"
                >
                  <span>{t('login.signUp', 'Create New Account (नया खाता बनाएं)')}</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </form>
          </div>
        )}

        {/* STEP 2: VERIFY OTP (AUTO-FILLED) */}
        {step === 'otp' && (
          <div className="flex flex-col flex-1 animate-fade-in">
            
            {/* Back to change phone */}
            <div className="flex items-center justify-between mb-3">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-[12px] text-[#1b6d24] font-semibold flex items-center gap-1 bg-transparent border-none cursor-pointer p-0 hover:underline"
              >
                <ArrowLeft size={14} />
                <span>Change Mobile</span>
              </button>
              <span className="text-[12px] text-[#40493d] font-bold">
                +91 {phoneNumber}
              </span>
            </div>

            <h1 className="font-headline font-bold text-[22px] text-[#0f1f11] m-0 mb-1">
              Verify OTP (ओटीपी सत्यापन)
            </h1>
            <p className="font-body text-[13px] text-[#707a6c] m-0 mb-4">
              Enter the 4-digit code sent to +91 {phoneNumber}
            </p>

            {/* Simulated SMS Notification Banner */}
            {showSmsBanner && (
              <div className="bg-[#e5f9e2] border border-[#a2df99] rounded-2xl p-3 mb-4 shadow-sm animate-bounce-short">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1b6d24] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <MessageSquare size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#155a1d] uppercase tracking-wider">SMS • FarmIt Krishi</span>
                      <span className="text-[10px] text-[#707a6c]">Just now</span>
                    </div>
                    <p className="text-[12px] font-medium text-[#0f1f11] m-0 mt-0.5 leading-snug">
                      Your FarmIt login OTP is <strong className="text-[#1b6d24] text-[14px] font-mono tracking-wider">1234</strong>. Auto-filling below...
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="flex flex-col flex-1" noValidate>
              
              {/* 4 OTP Digits Input Boxes */}
              <div className="flex justify-center gap-3 my-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={otpRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpInput(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className={`w-14 h-15 rounded-2xl text-center text-[22px] font-headline font-extrabold text-[#0f1f11] border-2 transition-all duration-200 outline-none ${
                      digit 
                        ? 'border-[#1b6d24] bg-[#daeed6] shadow-sm scale-105' 
                        : 'border-[#daeed6] bg-[#f4fbf3] focus:border-[#1b6d24] focus:bg-white'
                    }`}
                  />
                ))}
              </div>

              {/* Auto-fill Indicator Badge */}
              <div className="flex items-center justify-center gap-1.5 my-2">
                {autoFilled ? (
                  <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#1b6d24] bg-[#e5f9e2] px-3 py-1 rounded-full border border-[#b8e4b3]">
                    <CheckCircle2 size={15} className="fill-[#1b6d24] text-white" />
                    OTP Auto-Detected & Verified (1234)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[12px] text-[#707a6c]">
                    <Loader2 size={13} className="animate-spin text-[#1b6d24]" />
                    Auto-reading SMS verification code...
                  </span>
                )}
              </div>

              {error && (
                <p className="text-red-600 text-[12px] text-center my-1 font-body flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">error</span>
                  {error}
                </p>
              )}

              {/* Login Button */}
              <button 
                className={`w-full h-[50px] rounded-[16px] text-white font-body text-[15px] font-bold tracking-wide border-none cursor-pointer mt-4 shadow-[0_6px_16px_rgba(27,109,36,0.25)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 ${
                  autoFilled ? 'bg-[#1b6d24] hover:bg-[#155a1d] animate-pulse-gentle' : 'bg-[#1b6d24]'
                }`} 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Verifying & Logging In...
                  </>
                ) : (
                  <>
                    <span>Verify & Login to Dashboard</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Resend OTP */}
              <div className="flex items-center justify-center mt-5 text-[12px] text-[#707a6c]">
                {resendTimer > 0 ? (
                  <span>Resend code in <strong className="text-[#0f1f11] font-mono">{resendTimer}s</strong></span>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    className="flex items-center gap-1 text-[#1b6d24] font-bold bg-transparent border-none cursor-pointer hover:underline"
                  >
                    <RefreshCw size={13} />
                    <span>Resend OTP Now</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        )}

      </div>

      <div className="h-4 w-full shrink-0" />
    </div>
  );
}
