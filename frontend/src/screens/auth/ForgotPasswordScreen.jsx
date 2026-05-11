import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Smartphone, Lock, EyeOff, Eye, CheckCircle2, Loader2 } from 'lucide-react';
import authService from '../../services/authService';

export default function ForgotPasswordScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=phone, 2=new password, 3=success
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSendOtp = () => {
    if (!/^\d{10}$/.test(phone)) {
      setError('Enter valid 10-digit number');
      return;
    }
    setError('');
    setStep(2);
  };

  const handleResetPassword = async () => {
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      const response = await authService.resetPassword(phone, newPassword);
      if (response.success) {
        setStep(3);
        setTimeout(() => navigate('/login', { replace: true }), 2500);
      } else {
        setError(response.message || 'Failed to reset password');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (step === 3) {
    return (
      <div className="flex flex-col items-center justify-center h-[100dvh] bg-[#f2fdf0] px-6">
        <CheckCircle2 size={80} color="var(--success)" className="mb-4" />
        <h1 className="font-headline text-[1.75rem] font-bold text-[#0f1f11] mb-2 m-0">Password Reset!</h1>
        <p className="font-body text-[#40493d] text-center m-0">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="bg-surface h-[100dvh] flex flex-col overflow-hidden">

      {/* Header */}
      <div className="w-full min-h-[160px] bg-gradient-to-b from-[#d4e8d1] to-[#e5f9e2] rounded-b-[40px] relative flex flex-col justify-end py-6 px-6 z-10 shrink-0">
        <button
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center border-none cursor-pointer text-[#0f1f11]"
          onClick={() => step === 1 ? navigate('/login') : setStep(1)}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="font-headline text-[26px] font-extrabold text-[#0f1f11] m-0">
          {step === 1 ? 'Forgot Password?' : 'Set New Password'}
        </h1>
        <p className="font-body text-[13px] text-[#40493d] mt-1 m-0">
          {step === 1 ? 'Enter your registered mobile number' : 'Create a new password for your account'}
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 bg-white rounded-t-[32px] z-20 pt-6 px-6 pb-6 -mt-6 flex flex-col shadow-[0_-4px_24px_rgba(15,31,17,0.06)]">

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl mb-4 text-[13px] font-body flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            {error}
          </div>
        )}

        {step === 1 ? (
          <>
            <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">Mobile Number</label>
            <div className="relative flex items-center h-[52px] mb-4">
              <div className="absolute left-4 z-10 text-[#707a6c]"><Smartphone size={20} /></div>
              <input
                className="w-full h-full bg-[#daeed6] border-none rounded-2xl px-4 pl-12 font-body text-[14px] text-[#0f1f11] focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] placeholder:text-[#707a6c]"
                placeholder="Enter 10-digit number"
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '').slice(0, 10)); setError(''); }}
              />
            </div>
            <button
              className="w-full h-[52px] rounded-2xl bg-[#1b6d24] text-white font-body text-[14px] font-bold border-none cursor-pointer shadow-[0_4px_12px_-2px_rgba(27,109,36,0.3)] transition-all duration-200 active:scale-[0.98]"
              onClick={handleSendOtp}
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">New Password</label>
            <div className="relative flex items-center h-[52px] mb-4">
              <div className="absolute left-4 z-10 text-[#707a6c]"><Lock size={20} /></div>
              <input
                className="w-full h-full bg-[#daeed6] border-none rounded-2xl px-4 pl-12 pr-12 font-body text-[14px] text-[#0f1f11] focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] placeholder:text-[#707a6c]"
                placeholder="Min 6 characters"
                type={showPass ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => { setNewPassword(e.target.value); setError(''); }}
              />
              <button type="button" className="absolute right-3 bg-transparent border-none p-1 cursor-pointer text-[#707a6c]" onClick={() => setShowPass(!showPass)}>
                {showPass ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <label className="font-label text-[12px] text-[#40493d] mb-1.5 block font-bold">Confirm Password</label>
            <div className="relative flex items-center h-[52px] mb-4">
              <div className="absolute left-4 z-10 text-[#707a6c]"><Lock size={20} /></div>
              <input
                className="w-full h-full bg-[#daeed6] border-none rounded-2xl px-4 pl-12 font-body text-[14px] text-[#0f1f11] focus:outline-none focus:shadow-[0_0_0_2px_var(--primary)] placeholder:text-[#707a6c]"
                placeholder="Re-enter password"
                type="password"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
              />
            </div>

            <button
              className="w-full h-[52px] rounded-2xl bg-[#1b6d24] text-white font-body text-[14px] font-bold border-none cursor-pointer shadow-[0_4px_12px_-2px_rgba(27,109,36,0.3)] transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              onClick={handleResetPassword}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Resetting...
                </>
              ) : (
                'Reset Password'
              )}
            </button>
          </>
        )}

        <div className="mt-6 flex justify-center">
          <a className="text-[#0d631b] font-label font-bold no-underline text-[13px]" href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
            ← Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}
