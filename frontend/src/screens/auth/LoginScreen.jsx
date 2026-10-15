import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../store/AuthContext';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';

export default function LoginScreen() {
  const navigate = useNavigate();
  const { bypassLogin } = useAuth();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Auto-fill OTP when a 10-digit phone number is entered
  useEffect(() => {
    if (phone.length === 10 && !otp) {
      setIsAutoFilling(true);
      const timer = setTimeout(() => {
        setOtp('1234');
        setIsAutoFilling(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [phone, otp]);

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(val);
    if (error) setError('');
    if (val.length < 10) setOtp('');
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setError('');

    if (phone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!otp) {
      setError('Please enter the 4-digit OTP.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      bypassLogin(phone);
      setIsLoading(false);
      navigate('/farmer/home', { replace: true });
    }, 250);
  };

  const handleDemoLogin = () => {
    setPhone('9876543210');
    setOtp('1234');
    setIsLoading(true);
    setTimeout(() => {
      bypassLogin('9876543210', 'Manjeet Lodha');
      setIsLoading(false);
      navigate('/farmer/home', { replace: true });
    }, 250);
  };

  return (
    <div className="min-h-[100dvh] bg-[#f8faf7] flex flex-col justify-center items-center px-4 py-8">
      
      {/* Clean Minimalist Card */}
      <div className="w-full max-w-[380px] bg-white rounded-3xl p-7 sm:p-8 shadow-[0_4px_24px_rgba(15,31,17,0.06)] border border-[#e2ede0]">
        
        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <Link to="/landing" className="mb-3 block no-underline">
            <div className="w-12 h-12 rounded-2xl bg-[#eaf6e8] border border-[#d2ebd0] p-2 flex items-center justify-center hover:scale-105 transition-transform">
              <img src="/images/logo-icon.png" alt="FarmIt" className="w-full h-full object-contain" />
            </div>
          </Link>
          <h1 className="font-headline font-bold text-[22px] text-[#0f1f11] m-0">
            Sign in to FarmIt
          </h1>
          <p className="font-body text-[13px] text-[#707a6c] mt-1 m-0">
            Enter your mobile number to continue
          </p>
        </div>

        {/* Minimalist Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4" noValidate>
          
          {/* Mobile Number Field */}
          <div>
            <label className="block text-[12px] font-semibold text-[#40493d] mb-1.5 font-label">
              Mobile Number
            </label>
            <div className="relative flex items-center h-[48px]">
              <span className="absolute left-3.5 text-[14px] font-semibold text-[#0f1f11] font-mono border-r border-[#daeed6] pr-2.5">
                +91
              </span>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Enter 10 digits"
                className="w-full h-full bg-[#fbfdfa] border border-[#daeed6] rounded-xl pl-16 pr-9 text-[14px] text-[#0f1f11] font-mono tracking-wide focus:outline-none focus:border-[#1b6d24] focus:ring-1 focus:ring-[#1b6d24] transition-all"
                autoFocus
              />
              {phone.length === 10 && (
                <CheckCircle2 size={16} className="absolute right-3.5 text-[#1b6d24]" />
              )}
            </div>
          </div>

          {/* OTP Code Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-[12px] font-semibold text-[#40493d] font-label">
                OTP Code
              </label>
              {isAutoFilling && (
                <span className="text-[11px] text-[#1b6d24] font-medium animate-pulse">
                  Auto-filling...
                </span>
              )}
            </div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
              placeholder="4-digit OTP (e.g. 1234)"
              className="w-full h-[48px] bg-[#fbfdfa] border border-[#daeed6] rounded-xl px-3.5 text-[14px] text-[#0f1f11] font-mono tracking-widest focus:outline-none focus:border-[#1b6d24] focus:ring-1 focus:ring-[#1b6d24] transition-all"
            />
          </div>

          {error && (
            <p className="text-[12px] text-red-600 m-0 font-body">
              {error}
            </p>
          )}

          {/* Primary Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-[48px] bg-[#1b6d24] hover:bg-[#155a1d] text-white font-headline text-[14px] font-bold rounded-xl border-none cursor-pointer mt-1 shadow-sm transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          {/* Single Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full h-[44px] bg-[#f4fbf3] hover:bg-[#eaf6e8] text-[#1b6d24] font-label text-[13px] font-semibold rounded-xl border border-[#d2ebd0] cursor-pointer transition-all duration-150 flex items-center justify-center"
          >
            1-Click Demo Login
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="mt-6 text-center text-[13px] text-[#707a6c]">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-[#1b6d24] font-bold no-underline hover:underline">
            Sign Up
          </Link>
        </div>

      </div>

      {/* Back to Home Link */}
      <div className="mt-4">
        <Link to="/landing" className="text-[12px] text-[#707a6c] hover:text-[#1b6d24] no-underline transition-colors">
          ← Back to FarmIt Home
        </Link>
      </div>

    </div>
  );
}
