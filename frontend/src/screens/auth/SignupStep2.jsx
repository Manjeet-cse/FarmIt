import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, ArrowRight } from 'lucide-react';

export default function SignupStep2() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || { mobile: '9876543210' };
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(45);
  const [error, setError] = useState('');
  
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    const id = setInterval(() => setTimer(t => t > 0 ? t - 1 : 0), 1000);
    return () => clearInterval(id);
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

  const handleSubmit = () => {
    if (isOtpComplete) {
      navigate('/signup/step3', { state: { formData, otp: otp.join('') } });
    } else {
      setError('Enter valid 6-digit OTP');
    }
  };

  return (
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
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-primary text-onPrimary shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">2</div>
              <span className="font-label text-[10px] font-semibold text-primary mt-1 uppercase tracking-[0.05em]">Step 2</span>
            </div>
            <div className="h-[2px] bg-[#d4e8d1] flex-1 -mt-5 -mx-4"></div>
            
            <div className="flex flex-col items-center w-1/3 z-10">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm bg-[#d4e8d1] text-[#40493d]">3</div>
              <span className="font-label text-[10px] font-medium text-[#40493d] mt-1 uppercase tracking-[0.05em]">Step 3</span>
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
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
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
                  width: '45px',
                  height: '56px',
                  backgroundColor: '#daeed6',
                  border: digit ? '2px solid var(--primary)' : (error ? '2px solid var(--error, #e53e3e)' : '1px solid #bfcaba'),
                  borderRadius: '0.75rem',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  textAlign: 'center',
                  color: '#0f1f11',
                  fontFamily: 'var(--font-headline)',
                  outline: 'none',
                  transition: 'all 0.2s',
                }}
              />
            ))}
          </div>

          {error && <p style={{ textAlign: 'center', color: 'var(--error, #e53e3e)', fontSize: '0.875rem', marginBottom: '1rem', fontFamily: 'var(--font-body)' }}>{error}</p>}

          <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#707a6c', fontFamily: 'var(--font-body)', marginBottom: '2rem' }}>
            Didn't receive code? {timer > 0 ? `00:${String(timer).padStart(2, '0')}` : ''}
            {timer === 0 && <button style={{ color: 'var(--primary)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer', marginLeft: '0.5rem' }} onClick={() => setTimer(45)}>Resend</button>}
          </p>

        </div>
      </div>

      <div className="sticky bottom-0 left-0 w-full px-6 pb-5 pt-6 bg-gradient-to-t from-surface from-70% to-transparent z-20 shrink-0">
        <button 
          className="w-full h-[56px] rounded-full bg-gradient-to-b from-primary to-primary-container text-onPrimary font-label text-base font-bold uppercase tracking-[0.05em] flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(13,99,27,0.25)] border-none cursor-pointer transition-all duration-200 active:scale-[0.95]" 
          onClick={handleSubmit}
          disabled={!isOtpComplete}
          style={{ opacity: !isOtpComplete ? 0.6 : 1 }}
        >
          Verify & Continue <ArrowRight size={18} />
        </button>
      </div>

    </div>
  );
}
