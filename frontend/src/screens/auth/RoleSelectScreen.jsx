import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function RoleSelectScreen() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedRole, setSelectedRole] = useState('farmer');

  const ROLES = [
    {
      id: 'farmer',
      icon: 'agriculture',
      label: t('roleSelect.farmer'),
      desc: t('roleSelect.farmerDesc'),
    },
    {
      id: 'expert',
      icon: 'science',
      label: t('roleSelect.expert'),
      desc: t('roleSelect.expertDesc'),
    },
    {
      id: 'vendor',
      icon: 'storefront',
      label: t('roleSelect.vendor'),
      desc: t('roleSelect.vendorDesc'),
    },
  ];

  const handleContinue = () => {
    localStorage.setItem('selectedRole', selectedRole);
    navigate('/login');
  };

  return (
    <div className="bg-white h-[100dvh] flex flex-col overflow-y-auto overflow-x-hidden font-['Be_Vietnam_Pro',sans-serif] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex flex-col flex-1 py-6 px-6 pb-8 min-h-full">

        {/* ── Brand Header ──────────────────── */}
        <div className="flex flex-col items-center mb-7 mt-2">
          <div className="w-16 h-16 rounded-full bg-[#e5f9e2] flex items-center justify-center mb-3">
            <span
              className="material-symbols-outlined text-[#0d631b]"
              style={{ fontSize: '36px', fontVariationSettings: "'FILL' 1" }}
            >eco</span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans',sans-serif] font-extrabold text-[24px] text-[#0d631b] tracking-[-0.025em] m-0">FarmIt</h1>
          <p className="font-['Be_Vietnam_Pro',sans-serif] text-[14px] text-[#40493d] mt-1 m-0">{t('roleSelect.tagline')}</p>
        </div>

        {/* ── Question ──────────────────────── */}
        <div className="text-center mb-6">
          <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[22px] text-[#0f1f11] m-0 mb-1.5">{t('roleSelect.title')}</h2>
          <p className="font-['Be_Vietnam_Pro',sans-serif] text-[13px] text-[#40493d] m-0">{t('roleSelect.subtitle')}</p>
        </div>

        {/* ── Role Tiles ────────────────────── */}
        <div className="flex flex-col gap-3 mb-auto">
          {ROLES.map((role) => {
            const isActive = selectedRole === role.id;
            return (
              <button
                key={role.id}
                className={`w-full text-left rounded-2xl p-4 flex items-center justify-between transition-all duration-200 border-2 cursor-pointer ${isActive ? 'bg-[#e5f9e2] border-[#0d631b]' : 'border-transparent bg-[#f5faf4] hover:bg-[#edf7ec]'}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <div className="flex items-center gap-3.5">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${isActive ? 'bg-[#2e7d32] text-white' : 'bg-[#d4e8d1] text-[#40493d]'}`}>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}
                    >{role.icon}</span>
                  </div>
                  <div>
                    <h3 className={`font-['Plus_Jakarta_Sans',sans-serif] text-[16px] text-[#0f1f11] m-0 ${isActive ? 'font-bold' : 'font-semibold'}`}>{role.label}</h3>
                    <p className="font-['Be_Vietnam_Pro',sans-serif] text-[12px] text-[#40493d] m-0 mt-0.5">{role.desc}</p>
                  </div>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 shrink-0 ${isActive ? 'bg-[#0d631b] border-[#0d631b] text-white' : 'border-[#bfcaba]'}`}>
                  {isActive && (
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: '16px', fontWeight: 'bold' }}
                    >check</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* ── Actions ───────────────────────── */}
        <div className="mt-7 flex flex-col items-center gap-3.5 pb-2">
          <button className="w-full h-14 rounded-full bg-gradient-to-b from-[#0d631b] to-[#2e7d32] text-white font-['Be_Vietnam_Pro',sans-serif] text-[15px] font-semibold uppercase tracking-[0.08em] flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(13,99,27,0.4)] border-none cursor-pointer transition-transform duration-200 active:scale-[0.97]" onClick={handleContinue}>
            {t('common.continue')}
          </button>
        </div>

      </div>
    </div>
  );
}
