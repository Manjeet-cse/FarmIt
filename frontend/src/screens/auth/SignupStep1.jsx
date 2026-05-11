import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf, User, Smartphone, Mail, ArrowRight, CheckCircle2, Lock, EyeOff, Eye } from 'lucide-react';

export default function SignupStep1() {
  const navigate = useNavigate();
  
  // Form State
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

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
        if (value && value.trim() !== '' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Enter a valid email address';
        }
        break;
      case 'password':
        if (!value || value.length < 6) error = 'Password must be at least 6 characters';
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
      case 'password': setPassword(value); break;
      default: break;
    }
    if (touched[field]) {
      let validationValue = value;
      if (field === 'mobile') validationValue = value.replace(/\D/g, '').slice(0, 10);
      const error = validateField(field, validationValue);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const isValid = 
    fullName.trim().length >= 3 &&
    /^\d{10}$/.test(mobile) &&
    (email.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) &&
    password.length >= 6;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const formData = { fullName, mobile, email, password };
      navigate('/signup/step2', { state: { formData } });
    } else {
      setTouched({ fullName: true, mobile: true, email: true, password: true });
      setErrors({
        fullName: validateField('fullName', fullName),
        mobile: validateField('mobile', mobile),
        email: validateField('email', email),
        password: validateField('password', password),
      });
    }
  };

  return (
    <>
      <div className="bg-surface h-[100dvh] relative flex flex-col overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      
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
      <div className="flex-1 bg-white rounded-t-[32px] z-20 pt-5 px-6 pb-6 -mt-6 flex flex-col shadow-[0_-4px_24px_rgba(15,31,17,0.06)] overflow-y-auto">
          
          {/* Progress Bar - Sleek 2 Steps */}
          <div className="flex items-center justify-center mb-8 px-8">
            <div className="flex items-center w-full max-w-[200px] justify-between relative">
              {/* Connecting Line */}
              <div className="absolute top-1/2 left-0 w-full h-[2px] -translate-y-1/2 bg-[#d4e8d1] z-0">
                <div className="h-full bg-primary transition-all duration-500 w-[50%]"></div>
              </div>
              
              {/* Step 1 */}
              <div className="flex flex-col items-center z-10 relative">
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[12px] bg-primary text-white shadow-[0_2px_8px_rgba(13,99,27,0.3)] ring-4 ring-white">1</div>
                <span className="font-label text-[10px] font-bold text-primary mt-2 uppercase tracking-wider absolute top-8 whitespace-nowrap">Details</span>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col items-center z-10 relative">
                <div className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-[12px] bg-white text-[#8fa389] border border-[#d4e8d1] ring-4 ring-white transition-colors duration-300">2</div>
                <span className="font-label text-[10px] font-medium text-[#8fa389] mt-2 uppercase tracking-wider absolute top-8 whitespace-nowrap">OTP</span>
              </div>
            </div>
          </div>

          <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
            
            {/* Field 1: Full Name */}
            <div className="mb-3 flex-shrink-0">
              <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">Full Name</label>
              <div className="relative flex items-center h-[48px]">
                <input 
                  className={`w-full h-full bg-[#daeed6] border-none rounded-[16px] px-4 font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] placeholder:text-[#707a6c] placeholder:font-medium ${errors.fullName ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="Enter your full name" 
                  type="text" 
                  value={fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  onBlur={(e) => handleBlur('fullName', e.target.value)}
                />
                {!errors.fullName && touched.fullName && fullName.trim().length >= 3 && (
                  <CheckCircle2 size={18} color="var(--success)" className="absolute right-4 text-[#40493d] cursor-pointer" />
                )}
              </div>
              {errors.fullName && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.8rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)', marginBottom: 0 }}>{errors.fullName}</p>}
            </div>

            {/* Field 2: Mobile Number */}
            <div className="mb-3 flex-shrink-0">
              <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">Mobile Number</label>
              <div className="relative flex items-center h-[48px]">
                <div className="absolute left-4 z-10 text-[#0f1f11] font-semibold flex items-center gap-1 font-body">
                  <span className="text-[14px]">+91</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#40493d] mt-0.5"><path d="m6 9 6 6 6-6"/></svg>
                </div>
                <input 
                  className={`w-full h-full bg-[#daeed6] border-none rounded-[16px] px-4 pl-[72px] font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] placeholder:text-[#707a6c] placeholder:font-medium ${errors.mobile ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="Enter 10-digit number" 
                  type="tel" 
                  value={mobile}
                  onChange={(e) => handleChange('mobile', e.target.value)}
                  onBlur={(e) => handleBlur('mobile', e.target.value)}
                />
                {!errors.mobile && touched.mobile && mobile.length === 10 && (
                  <CheckCircle2 size={18} color="var(--success)" className="absolute right-4 text-[#40493d] cursor-pointer" />
                )}
              </div>
              {errors.mobile && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.8rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)', marginBottom: 0 }}>{errors.mobile}</p>}
            </div>

            {/* Field 3: Email (Optional) */}
            <div className="mb-3 flex-shrink-0">
              <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold flex justify-between items-center">
                Email Address <span className="text-[10px] font-medium text-[#8fa389] normal-case bg-[#e5f9e2] px-2 py-0.5 rounded-full">Optional</span>
              </label>
              <div className="relative flex items-center h-[48px]">
                <input 
                  className={`w-full h-full bg-[#daeed6] border-none rounded-[16px] px-4 font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] placeholder:text-[#707a6c] placeholder:font-medium ${errors.email ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="name@example.com" 
                  type="email" 
                  value={email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={(e) => handleBlur('email', e.target.value)}
                />
                {!errors.email && touched.email && email.includes('@') && (
                  <CheckCircle2 size={18} color="var(--success)" className="absolute right-4 text-[#40493d] cursor-pointer" />
                )}
              </div>
              {errors.email && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.8rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)', marginBottom: 0 }}>{errors.email}</p>}
            </div>

            {/* Field 4: Password */}
            <div className="mb-3 flex-shrink-0">
              <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">Secure Password</label>
              <div className="relative flex items-center h-[48px]">
                <input 
                  className={`w-full h-full bg-[#daeed6] border-none rounded-[16px] px-4 pr-11 font-body text-[14px] text-[#0f1f11] transition-all duration-200 focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] focus:bg-[#d4e8d1] placeholder:text-[#707a6c] placeholder:font-medium ${errors.password ? 'border-2 border-[var(--error,#e53e3e)]' : ''}`} 
                  placeholder="Min 6 characters" 
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  onBlur={(e) => handleBlur('password', e.target.value)}
                />
                <button type="button" className="absolute right-4 bg-transparent border-none p-0 cursor-pointer text-[#40493d]" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && <p style={{ color: 'var(--error, #e53e3e)', fontSize: '0.8rem', marginTop: '0.25rem', fontFamily: 'var(--font-body)', marginBottom: 0 }}>{errors.password}</p>}
            </div>

            {/* Submit Button */}
            <button 
              className="w-full h-[48px] flex-shrink-0 rounded-[16px] bg-[#1b6d24] text-white font-body text-[14px] font-bold tracking-wide border-none cursor-pointer mt-4 shadow-[0_4px_12px_-2px_rgba(27,109,36,0.3)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 hover:bg-[#155a1d] disabled:opacity-60 disabled:cursor-not-allowed" 
              onClick={handleSubmit}
              disabled={!isValid && Object.keys(touched).length > 0}
            >
              Send OTP
            </button>
          </form>
        </div>
    </div>
    </>
  );
}
