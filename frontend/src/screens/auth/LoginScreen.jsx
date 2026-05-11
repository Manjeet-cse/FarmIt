import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, EyeOff, Eye, MessageSquare, ChevronDown, CheckCircle2, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/AuthContext';
import { GoogleLogin } from '@react-oauth/google';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, googleLogin, loading: authLoading } = useAuth();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleSuccess = async (credentialResponse) => {
    setApiError('');
    setIsSubmitting(true);
    try {
      const result = await googleLogin(credentialResponse.credential);
      if (result.success) {
        navigate('/farmer/home', { replace: true });
      } else {
        setApiError(result.message);
      }
    } catch (err) {
      setApiError('Google login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = t('login.validMobile');
    }
    if (!otpMode) {
      if (pin.length < 4) {
        newErrors.pin = t('login.validPin');
      }
    } else if (otpSent) {
      if (!/^\d{6}$/.test(otp)) {
        newErrors.otp = t('login.validOtp');
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validate()) return;

    if (otpMode && !otpSent) {
      setOtpSent(true);
      return;
    }

    // Real backend login
    setIsSubmitting(true);
    try {
      const result = await login(phoneNumber, pin);
      if (result.success) {
        // Navigate based on role
        const role = result.data.role;
        if (role === 'farmer') {
          navigate('/farmer/home', { replace: true });
        } else if (role === 'expert') {
          navigate('/farmer/home', { replace: true }); // TODO: expert dashboard
        } else {
          navigate('/farmer/home', { replace: true });
        }
      } else {
        setApiError(result.message);
      }
    } catch (err) {
      setApiError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-surface h-[100dvh] relative flex flex-col overflow-hidden">
      
      {/* Header Background */}
      <div className="w-full min-h-[220px] bg-gradient-to-b from-[#d4e8d1] to-[#e5f9e2] rounded-b-[40px] relative flex flex-col items-center justify-center py-4 px-6 z-10 shrink-0">
        <div className="absolute -bottom-5 left-0 w-full h-[60%] opacity-15 bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuAhO1kO_LDHOwL7iJBjc6EoZCMRMWHujzweWOeRcOJotV3wyQu1tbxDNQtevmlc23sEXm_rmxacAz_X_nFQXhptuRvCdAik0LgriJShHLSC3_-4mU4JxMXepsVWE7xfxWL6YB_gZi2mIPtnXEN7h5E4J6EmUx_iVfpcxA0SHLsp51rps4QxKP3pdxNrwRAaC_Fv5hpNI0dIHZRdX0WCbMoYsNH6Wvsx6uYjQ1uTsjOTjOMsQ7w3N3dTJoWom7fZaLnNrXozm5fWmig')] bg-cover bg-bottom z-0 mix-blend-multiply" data-alt="silhouette of wheat stalks against a light green background, subtle agricultural texture"></div>
        <div className="font-headline font-extrabold text-[26px] text-[#0f1f11] z-10 mt-1 flex items-center gap-2">
          <Leaf size={28} color="var(--primary)" fill="var(--primary)" />
          NeokrishiTech
        </div>
        <div className="bg-primary text-onPrimary py-1 px-4 rounded-full font-label text-[11px] font-semibold uppercase tracking-[0.05em] mt-2 z-10">{t('login.kisanLogin')}</div>
      </div>

      {/* Form Card */}
      <div className="flex-1 bg-white rounded-t-[32px] z-20 pt-5 px-6 pb-6 -mt-6 flex flex-col shadow-[0_-4px_24px_rgba(15,31,17,0.06)] overflow-y-auto">
        <h1 className="font-headline font-bold text-[20px] text-[#0f1f11] mb-4 m-0">{t('login.welcomeBack')}</h1>

        {/* API Error Banner */}
        {apiError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-4 text-[13px] font-body flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">error</span>
            <div>
              <span>{apiError}</span>
              {apiError.includes('Invalid') && (
                <span className="block mt-1 text-[12px]">
                  New user? <a href="#" className="text-[#0d631b] font-bold no-underline" onClick={(e) => { e.preventDefault(); navigate('/signup/step1'); }}>Sign Up here</a>
                </span>
              )}
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col flex-1" noValidate>
          
          {/* Mobile Number Field */}
          <div className="mb-3 flex-shrink-0">
            <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">{t('login.mobileNumber')}</label>
            <div className="relative flex items-center h-[48px]">
              <div className="absolute left-4 z-10 text-[#0f1f11] font-semibold flex items-center gap-1 font-body">
                <span className="text-[14px]">+91</span>
                <ChevronDown size={16} className="text-[#40493d] mt-0.5" />
              </div>
              <input 
                className={`w-full h-full bg-[#daeed6] border-none rounded-[16px] px-4 pl-[72px] font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] placeholder:text-[#707a6c] placeholder:font-medium ${errors.phoneNumber ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                placeholder={t('login.enterMobile')} 
                type="tel"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value.replace(/\D/g, '').slice(0, 10));
                  if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: null });
                  setApiError('');
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
              <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">{t('login.passwordPin')}</label>
              <div className="relative flex items-center h-[48px]">
                <input 
                  className={`w-full h-full bg-[#daeed6] border-none rounded-[16px] px-4 font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] placeholder:text-[#707a6c] placeholder:font-medium ${errors.pin ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder={t('login.enterPin')} 
                  type={showPassword ? 'text' : 'password'}
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (errors.pin) setErrors({ ...errors, pin: null });
                    setApiError('');
                  }}
                />
                <button type="button" className="absolute right-4 bg-transparent border-none p-0 cursor-pointer text-[#40493d]" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.pin && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.8rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)', marginBottom: 0 }}>{errors.pin}</p>}
              <a className="text-[11px] text-[#0d631b] font-label font-bold text-right block mt-1.5 no-underline tracking-wide" href="#" onClick={(e) => { e.preventDefault(); navigate('/forgot-password'); }}>{t('login.forgotPin')}</a>
            </div>
          ) : otpSent && (
            /* OTP Field */
            <div className="mb-3 flex-shrink-0">
              <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">{t('login.enterOtp')}</label>
              <div className="relative flex items-center h-[48px]">
                <input 
                  className={`w-full h-full bg-[#daeed6] border-none rounded-[16px] px-4 font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] placeholder:text-[#707a6c] placeholder:font-medium ${errors.otp ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder={t('login.otpPlaceholder')} 
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
          <button 
            className="w-full h-[48px] flex-shrink-0 rounded-[16px] bg-[#1b6d24] text-white font-body text-[14px] font-bold tracking-wide border-none cursor-pointer mt-1 shadow-[0_4px_12px_-2px_rgba(27,109,36,0.3)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 hover:bg-[#155a1d] disabled:opacity-60 disabled:cursor-not-allowed" 
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging in...
              </>
            ) : (
              otpMode && !otpSent ? t('login.sendOtp') : t('login.logIn')
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center text-center my-3 flex-shrink-0 text-[#707a6c] font-body text-[11px] before:content-[''] before:flex-1 before:border-b before:border-[rgba(191,202,186,0.3)] before:mr-3 after:content-[''] after:flex-1 after:border-b after:border-[rgba(191,202,186,0.3)] after:ml-3">{t('login.orLoginWith')}</div>

          {/* Alternative Login Buttons */}
          <div className="flex flex-col gap-2.5 flex-shrink-0">
            <button className="w-full h-[48px] rounded-[16px] bg-white text-[#0d631b] font-body text-[13px] font-bold border border-[#daeed6] cursor-pointer flex items-center justify-center gap-2 transition-colors duration-200 hover:bg-[#f0f9f0] shadow-sm" type="button" onClick={() => {
              setOtpMode(!otpMode);
              setOtpSent(false);
              setErrors({});
              setApiError('');
            }}>
              <MessageSquare size={16} strokeWidth={2.5} />
              {otpMode ? t('login.usePassword') : t('login.otpLogin')}
            </button>
            <div className="w-full flex justify-center [&>div]:w-full">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setApiError('Google Sign-In failed. Try again.')}
                theme="outline"
                size="large"
                shape="pill"
                text="continue_with"
                width="100%"
              />
            </div>
          </div>

          <div className="mt-6 pb-2 flex-shrink-0 flex justify-center items-center">
            <span className="text-[#707a6c] font-body text-[13px] mr-1.5">{t('login.newUser')}</span>
            <a className="text-[#0d631b] font-label font-bold no-underline text-[13px] hover:underline" href="#" onClick={(e) => { e.preventDefault(); navigate('/signup/step1'); }}>
              {t('login.signUp')}
            </a>
          </div>
        </form>
      </div>

    </div>
  );
}
