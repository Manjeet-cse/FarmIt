import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, EyeOff, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid 10-digit mobile number';
    }
    if (!otpMode) {
      if (pin.length < 4) {
        newErrors.pin = 'Enter a valid PIN or password';
      }
    } else if (otpSent) {
      if (!/^\d{6}$/.test(otp)) {
        newErrors.otp = 'Enter valid 6-digit OTP';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      if (otpMode && !otpSent) {
        // Simulate sending OTP
        setOtpSent(true);
      } else {
        // Success login
        navigate('/farmer/home');
      }
    }
  };

  return (
    <div className="bg-surface h-dvh relative flex flex-col overflow-hidden">
      
      {/* Header Background */}
      <div className="w-full min-h-[160px] bg-gradient-to-b from-[#d4e8d1] to-[#e5f9e2] rounded-b-[40px] relative flex flex-col items-center justify-center py-4 px-6 z-10 shrink-0">
        <div className="absolute -bottom-5 left-0 w-full h-[60%] opacity-15 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhO1kO_LDHOwL7iJBjc6EoZCMRMWHujzweWOeRcOJotV3wyQu1tbxDNQtevmlc23sEXm_rmxacAz_X_nFQXhptuRvCdAik0LgriJShHLSC3_-4mU4JxMXepsVWE7xfxWL6YB_gZi2mIPtnXEN7h5E4J6EmUx_iVfpcxA0SHLsp51rps4QxKP3pdxNrwRAaC_Fv5hpNI0dIHZRdX0WCbMoYsNH6Wvsx6uYjQ1uTsjOTjOMsQ7w3N3dTJoWom7fZaLnNrXozm5fWmig')] bg-cover bg-bottom z-0 mix-blend-multiply" data-alt="silhouette of wheat stalks against a light green background, subtle agricultural texture"></div>
        <div className="font-headline font-extrabold text-[26px] text-[#0f1f11] z-10 mt-1 flex items-center gap-2">
          <Leaf size={28} color="var(--primary)" fill="var(--primary)" />
          NeoKrishiTech
        </div>
        <div className="bg-primary text-onPrimary py-1 px-4 rounded-full font-label text-[11px] font-semibold uppercase tracking-[0.05em] mt-2 z-10">Kisan Login</div>
      </div>

      {/* Form Card */}
      <div className="flex-1 bg-white rounded-t-[32px] z-20 pt-5 px-6 pb-6 -mt-6 flex flex-col shadow-[0_-4px_24px_rgba(15,31,17,0.06)] overflow-y-auto">
        <h1 className="font-headline font-bold text-[20px] text-[#0f1f11] mb-4 m-0">Welcome Back!</h1>
        <form onSubmit={handleLogin} className="flex flex-col flex-1" noValidate>
          
          {/* Mobile Number Field */}
          <div className="mb-3 flex-shrink-0">
            <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">Mobile Number</label>
            <div className="relative flex items-center h-[48px]">
              <div className="absolute left-4 z-10 text-[#0f1f11] font-semibold flex items-center gap-1 font-body">
                <span className="text-[14px]">+91</span>
                <ChevronDown size={16} className="text-[#40493d] mt-0.5" />
              </div>
              <input 
                className={`w-full h-full bg-[#daeed6] border-none rounded-[16px] px-4 pl-[72px] font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] placeholder:text-[#707a6c] placeholder:font-medium ${errors.phoneNumber ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                placeholder="Enter your 10-digit number" 
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10));
                  if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: null });
                }}
              />
              {phoneNumber.length === 10 && !errors.phoneNumber && (
                <CheckCircle2 size={18} color="var(--success)" className="absolute right-4 text-[#40493d] cursor-pointer" />
              )}
            </div>
            {errors.phoneNumber && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.8rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)', marginBottom: 0 }}>{errors.phoneNumber}</p>}
          </div>

          {!otpMode ? (
            /* Password/PIN Field */
            <div className="mb-3 flex-shrink-0">
              <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">Password / PIN</label>
              <div className="relative flex items-center h-[48px]">
                <input 
                  className={`w-full h-full bg-[#daeed6] border-none rounded-[16px] px-4 font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] placeholder:text-[#707a6c] placeholder:font-medium ${errors.pin ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="Enter PIN" 
                  type="password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (errors.pin) setErrors({ ...errors, pin: null });
                  }}
                />
                <EyeOff size={18} className="absolute right-4 text-[#40493d] cursor-pointer" />
              </div>
              {errors.pin && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.8rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)', marginBottom: 0 }}>{errors.pin}</p>}
              <a className="text-[11px] text-[#0d631b] font-label font-bold text-right block mt-1.5 no-underline tracking-wide" href="#" onClick={(e) => { e.preventDefault(); alert('Redirecting to reset PIN flow...'); }}>Forgot PIN?</a>
            </div>
          ) : otpSent && (
            /* OTP Field */
            <div className="mb-3 flex-shrink-0">
              <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">Enter OTP</label>
              <div className="relative flex items-center h-[48px]">
                <input 
                  className={`w-full h-full bg-[#daeed6] border-none rounded-[16px] px-4 font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] placeholder:text-[#707a6c] placeholder:font-medium ${errors.otp ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="6-digit OTP" 
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value.replace(/\D/g, ''));
                    if (errors.otp) setErrors({ ...errors, otp: null });
                  }}
                />
              </div>
              {errors.otp && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.8rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)', marginBottom: 0 }}>{errors.otp}</p>}
            </div>
          )}

          {/* Login Button */}
          <button className="w-full h-[48px] flex-shrink-0 rounded-[16px] bg-[#1b6d24] text-white font-body text-[14px] font-bold tracking-wide border-none cursor-pointer mt-1 shadow-[0_4px_12px_-2px_rgba(27,109,36,0.3)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center hover:bg-[#155a1d]" type="submit">
            {otpMode && !otpSent ? 'Send OTP' : 'LOG IN'}
          </button>

          {/* Divider */}
          <div className="flex items-center text-center my-3 flex-shrink-0 text-[#707a6c] font-body text-[11px] before:content-[''] before:flex-1 before:border-b before:border-[rgba(191,202,186,0.3)] before:mr-3 after:content-[''] after:flex-1 after:border-b after:border-[rgba(191,202,186,0.3)] after:ml-3">or log in with</div>

          {/* Alternative Login Buttons */}
          <div className="flex flex-col gap-2.5 flex-shrink-0">
            <button className="w-full h-[48px] rounded-[16px] bg-white text-[#0d631b] font-body text-[13px] font-bold border border-[#daeed6] cursor-pointer flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-[#f0f9f0] shadow-sm" type="button" onClick={() => {
              setOtpMode(!otpMode);
              setOtpSent(false);
              setErrors({});
            }}>
              <MessageSquare size={16} strokeWidth={2.5} />
              {otpMode ? 'Use Password / PIN' : 'OTP Login'}
            </button>
            <button className="w-full h-[48px] rounded-[16px] bg-white text-[#0d631b] font-body text-[13px] font-bold border border-[#daeed6] cursor-pointer flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-[#f0f9f0] shadow-sm" type="button">
              <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="mt-6 pb-2 flex-shrink-0 flex justify-center items-center">
            <span className="text-[#707a6c] font-body text-[13px] mr-1.5">New User?</span>
            <a className="text-[#0d631b] font-label font-bold no-underline text-[13px] hover:underline" href="#" onClick={(e) => { e.preventDefault(); navigate('/signup/step1'); }}>
              Sign Up
            </a>
          </div>
        </form>
      </div>

    </div>
  );
}
