import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../store/AuthContext';

export default function SignupStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = useAuth();
  const formData = location.state?.formData || { mobile: '9876543210' };
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    const id = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);

  // Auto-fill OTP after a short delay (simulating SMS auto-read)
  useEffect(() => {
    const dummyOtp = ['1', '2', '3', '4', '5', '6'];
    const timeouts = dummyOtp.map((digit, i) =>
      setTimeout(() => {
        setOtp(prev => {
          const updated = [...prev];
          updated[i] = digit;
          return updated;
        });
      }, 1500 + i * 200)
    );
    return () => timeouts.forEach(clearTimeout);
  }, []);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;
    
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(''); // Clear error on change

    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  const handleSubmit = async () => {
    if (!isOtpComplete) {
      setError('Enter valid 6-digit OTP');
      return;
    }
    
    setError('');
    setIsSubmitting(true);

    const signupData = {
      name: formData.fullName || formData.name || 'Farmer',
      email: formData.email || `${formData.mobile || Date.now()}@farmit.app`,
      phone: formData.mobile || formData.phone || '',
      role: 'farmer',
      location: '', // No longer collecting location in signup
      preferredLanguage: 'en'
    };

    try {
      const result = await signup(signupData);
      if (result.success) {
        setShowSuccess(true);
        setTimeout(() => navigate('/farmer/home', { replace: true }), 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-surface h-[100dvh] relative flex flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        
        <div className="relative h-48 bg-gradient-to-b from-primary to-primary-container rounded-b-[40px] p-6 flex flex-col justify-between overflow-hidden shadow-[0_8px_32px_rgba(15,31,17,0.12)] z-10 shrink-0">
          <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4=')]"></div>
          
          <div className="flex justify-between items-start relative z-10">
            <button className="w-10 h-10 rounded-full bg-[rgba(235,255,231,0.2)] backdrop-blur-md flex items-center justify-center text-onPrimary transition-colors duration-200 border-none cursor-pointer hover:bg-[rgba(235,255,231,0.3)]" onClick={() => navigate(-1)}>
              <ArrowLeft size={20} />
            </button>
            <div className="bg-[rgba(235,255,231,0.2)] backdrop-blur-md py-1.5 px-3 rounded-full border border-[rgba(235,255,231,0.3)] flex items-center gap-1.5 text-onPrimary">
              <ShieldCheck size={14} />
              <span className="font-label text-xs font-semibold uppercase tracking-[0.1em]">Verify Mobile</span>
            </div>
          </div>

          <div className="relative z-10 mt-auto mb-2">
            <h1 className="font-headline text-[30px] leading-9 font-extrabold text-onPrimary tracking-[-0.025em] m-0">Verify OTP</h1>
            <p className="font-body text-sm text-[#cbffc2] mt-1 m-0">Securing your farm account.</p>
          </div>
        </div>

        <div className="flex-1 bg-white rounded-t-[32px] z-20 pt-5 px-6 pb-6 -mt-6 flex flex-col shadow-[0_-4px_24px_rgba(15,31,17,0.06)] overflow-y-auto">
            
            {/* Progress Bar - Sleek 2 Steps */}
            <div className="flex items-center justify-center mb-8 px-8">
              <div className="flex items-center w-full max-w-[200px] justify-between relative">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-primary z-0"></div>
                
                {/* Step 1 */}
                <div className="flex flex-col items-center z-10 relative">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[12px] bg-primary text-white shadow-[0_2px_8px_rgba(13,99,27,0.3)] ring-4 ring-white"><CheckCircle2 size={16} /></div>
                  <span className="font-label text-[10px] font-bold text-primary mt-2 uppercase tracking-wider absolute top-8 whitespace-nowrap">Details</span>
                </div>
                
                {/* Step 2 */}
                <div className="flex flex-col items-center z-10 relative">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[12px] bg-primary text-white shadow-[0_2px_8px_rgba(13,99,27,0.3)] ring-4 ring-white transition-colors duration-300">2</div>
                  <span className="font-label text-[10px] font-bold text-primary mt-2 uppercase tracking-wider absolute top-8 whitespace-nowrap">OTP</span>
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-headline)', fontSize: '1.375rem', fontWeight: 700, color: '#0f1f11', marginBottom: '0.5rem' }}>OTP Verification</h2>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#40493d' }}>
                Enter the 6-digit code sent to<br/>
                <span style={{ color: 'var(--primary)', fontWeight: 600 }}>+91 {formData.mobile}</span>
              </p>
            </div>

            {/* OTP Input Boxes */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={inputRefs[i]}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  style={{
                    width: '50px',
                    height: '56px',
                    backgroundColor: digit ? '#d4e8d1' : '#daeed6',
                    border: 'none',
                    borderRadius: '14px',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    textAlign: 'center',
                    color: '#0f1f11',
                    fontFamily: 'var(--font-headline)',
                    outline: 'none',
                    transition: 'all 0.3s',
                    boxShadow: error ? '0 0 0 2px #ef4444' : (digit ? '0 0 0 2px var(--primary)' : 'none'),
                  }}
                  className="focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] flex-shrink-0"
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-[13px] font-body flex items-start gap-2 mb-4">
                <span className="material-symbols-outlined text-[18px] mt-0.5 shrink-0">error</span>
                <div>
                  <span>{error.includes('Email already') ? 'Phone number already registered' : error}</span>
                  {(error.includes('already registered') || error.includes('already')) && (
                    <span className="block mt-1.5 text-[12px]">
                      Already have an account? <button className="text-[#0d631b] font-bold bg-transparent border-none p-0 cursor-pointer" onClick={() => navigate('/login')}>Login here</button>
                    </span>
                  )}
                </div>
              </div>
            )}

            <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#707a6c', fontFamily: 'var(--font-body)', marginBottom: '1rem' }}>
              Didn't receive code? {timer > 0 ? `00:${String(timer).padStart(2, '0')}` : ''}
              {timer === 0 && <button style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', marginLeft: '0.5rem' }} onClick={() => setTimer(45)}>Resend</button>}
            </p>

            {/* Submit Button */}
            <button 
              className="w-full h-[48px] flex-shrink-0 rounded-[16px] bg-[#1b6d24] text-white font-body text-[14px] font-bold tracking-wide border-none cursor-pointer mt-auto shadow-[0_4px_12px_-2px_rgba(27,109,36,0.3)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 hover:bg-[#155a1d] disabled:opacity-60 disabled:cursor-not-allowed" 
              onClick={handleSubmit}
              disabled={!isOtpComplete || isSubmitting}
            >
              {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Verifying...</> : <>Verify & Create Account</>}
            </button>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 bg-[rgba(15,31,17,0.4)] backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 w-full max-w-[340px] flex flex-col items-center text-center shadow-2xl animate-scale-in">
            <div className="w-20 h-20 bg-[#e5f9e2] rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 size={40} color="var(--primary)" />
            </div>
            <h2 className="font-headline text-2xl font-bold text-[#0f1f11] mb-2">Account Created!</h2>
            <p className="font-body text-[#40493d] text-sm leading-relaxed">
              Welcome to FarmIt, {formData.fullName?.split(' ')[0] || 'Farmer'}!<br/>
              Redirecting you to dashboard...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
