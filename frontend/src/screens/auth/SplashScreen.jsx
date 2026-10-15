import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Hold logo screen for exactly 3 seconds, then always transition to the landing page
    const timer = setTimeout(() => {
      navigate('/landing', { replace: true });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-between h-[100dvh] w-full bg-gradient-to-b from-[#1b6d24] via-[#245e2a] to-[#15461c] text-white relative overflow-hidden select-none">
      
      <style>{`
        @keyframes splash-progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      {/* Decorative Glow Elements */}
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#88d982] rounded-full blur-[130px] opacity-25 pointer-events-none"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#2e7d32] rounded-full blur-[130px] opacity-35 pointer-events-none"></div>

      {/* Top Spacer */}
      <div className="h-12 w-full" />

      {/* Centered Logo & Branding */}
      <div className="flex flex-col items-center justify-center text-center px-6 z-10">
        
        {/* Logo Container */}
        <div className="mb-6 w-36 h-36 rounded-3xl shadow-[0_16px_36px_rgba(0,0,0,0.22)] border-2 border-white/20 backdrop-blur-md relative overflow-hidden bg-white flex items-center justify-center p-4 animate-[logo-pulse_2.4s_ease-in-out_infinite]">
          <img 
            src="/images/logo-icon.png" 
            alt="FarmIt Logo" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Brand Name */}
        <h1 className="font-headline font-extrabold text-[32px] sm:text-[38px] text-white tracking-tight m-0 leading-tight">
          FarmIt
        </h1>

        <span className="inline-block bg-white/15 border border-white/20 text-[#cbffc2] text-[11px] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full mt-2.5">
          Smart Krishi Platform
        </span>

        {/* Tagline */}
        <p className="font-body text-[14px] sm:text-[15px] text-[#cbffc2] font-medium tracking-wide mt-3 m-0 max-w-[280px]">
          Voice of the Farmer • Power of AI
        </p>
      </div>

      {/* Bottom 3-Second Loading Bar */}
      <div className="w-full max-w-xs px-8 pb-12 z-10 flex flex-col items-center">
        <div className="h-1.5 bg-white/20 rounded-full overflow-hidden w-full">
          <div className="h-full bg-[#cbffc2] rounded-full animate-[splash-progress_3s_linear_forwards]" />
        </div>
        <span className="text-[11px] text-white/70 font-semibold tracking-wider uppercase mt-3">
          Loading FarmIt...
        </span>
      </div>

    </div>
  );
}
