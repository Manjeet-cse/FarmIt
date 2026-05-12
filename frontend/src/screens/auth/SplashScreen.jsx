import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../store/AuthContext';

export default function SplashScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isAuthenticated, user, loading } = useAuth();

  useEffect(() => {
    if (loading) return; // Wait until auth state is loaded

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/farmer/home');
      } else {
        navigate('/language');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated, loading]);

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh] w-full bg-[#2e7d32] text-white relative overflow-hidden">
      <style>{`
        @keyframes splash-load {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
      <div className="flex-1 flex flex-col items-center justify-center z-10 w-full px-6">
        <div className="mb-8 w-40 h-40 rounded-full shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] border-4 border-white backdrop-blur-md relative overflow-hidden bg-white flex items-center justify-center">
          <img src="/images/logo.png" alt="NeoKrishiTech Logo" className="w-full h-full object-cover" />
        </div>
        <div className="text-center relative z-10">
          <p className="text-sm italic text-[#88d982] font-medium tracking-[0.025em] drop-shadow-[0_1px_2px_rgba(0,0,0,0.1)] mt-2">{t('splash.tagline')}</p>
        </div>
      </div>
      
      <div className="absolute bottom-16 w-full px-12 z-10">
        <div className="h-1 bg-white/20 rounded-full overflow-hidden w-full max-w-md mx-auto">
          <div className="h-full bg-white rounded-full w-0 animate-[splash-load_2s_ease-in-out_forwards]"></div>
        </div>
        <p className="text-center text-xs mt-3 text-white/60 font-medium tracking-[0.1em] uppercase">{t('splash.initializing')}</p>
      </div>

      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#0d631b] rounded-full blur-[120px] opacity-60"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#91f78e] rounded-full blur-[120px] opacity-20"></div>
    </div>
  );
}
