import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ExpertBookingScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const expert = location.state?.expert || {
    name: 'Dr. Ravi Kumar',
    qualification: 'Senior Agronomist',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCmFClHCmMJqot7gjtKzqo3Jd1URAoy8LeZsvbEAkbawqqBVrzgNL9wAHbNuC0sws96AkQcerN-KP16dYGFliSR4GC0V7Oah9BKaL0sPTPhyjToK6Q3V3nylg-DWxMozTjAU1g1hW-PH2vnoB7gAIkQ4KPssSVCcD4QMZ3tCBf2ppakK_g8hx2qMRCaua6SnlgS2lyIsIZrmv2I9zUXd7eD8n31XV5bMk7z0AR9THbsq0D6PVJXQf2Awamc9oqCO6OZS0_kRHjZQcY'
  };
  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState(location.state?.consultationType || 'audio');
  const [selectedDate, setSelectedDate] = useState('13');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');

  const dates = [
    { day: 'Mon', date: '12', disabled: true },
    { day: 'Tue', date: '13', disabled: false },
    { day: 'Wed', date: '14', disabled: false },
    { day: 'Thu', date: '15', disabled: false },
    { day: 'Fri', date: '16', disabled: false },
  ];

  const times = [
    { time: '10:00 AM', disabled: false },
    { time: '10:30 AM', disabled: false },
    { time: '11:00 AM', disabled: false },
    { time: '11:30 AM', disabled: true },
    { time: '02:00 PM', disabled: false },
    { time: '02:30 PM', disabled: false },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bottom-[84px] z-[60] bg-[rgba(15,31,17,0.4)] backdrop-blur-sm flex flex-col justify-end">
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
      
      <div 
        className="w-full max-w-[600px] mx-auto rounded-t-[24px] sm:rounded-[24px] sm:mb-6 bg-surface-containerLowest relative shadow-[0_-8px_24px_rgba(0,0,0,0.1)] overflow-hidden animate-[slideUp_0.3s_cubic-bezier(0.16,1,0.3,1)]"
        style={{ display: 'grid', gridTemplateRows: 'auto 1fr auto', maxHeight: '90%' }}
      >
        {/* Modal Header */}
        <div className="flex flex-col">
          <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-12 h-1.5 bg-[#bfcaba]/50 rounded-full" />
          </div>
          <div className="p-4 sm:px-6 py-4 border-b border-[#dff3dc]/50 flex items-center gap-4">
            <button className="w-11 h-11 shrink-0 flex items-center justify-center rounded-full bg-[#E8F5E9] text-[#1A1A1A] border-none cursor-pointer transition-colors duration-200 hover:bg-[#D5E8D4]" aria-label={t('common.back')} onClick={() => step === 3 ? navigate('/farmer/experts') : step === 2 ? setStep(1) : navigate(-1)}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <div className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-full overflow-hidden bg-surface-containerHigh border-2 border-surface shrink-0">
                <img src={expert.image} alt={expert.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="font-headline font-bold text-[1.125rem] text-onSurface m-0">{expert.name}</h2>
                <p className="font-body text-[0.875rem] text-onSurface-variant flex items-center gap-1 mt-0.5 m-0">
                  <span className="material-symbols-outlined text-[16px]">psychiatry</span>
                  {expert.qualification}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {step === 1 ? (
              <div className="flex flex-col pt-2">
                <h3 className="font-headline font-bold text-xl text-onSurface mb-6 mt-0">{t('booking.selectConsultationType')}</h3>
                <div className="flex flex-col gap-4">
                  <label className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${consultationType === 'audio' ? 'border-primary bg-primary/5' : 'border-[#bfcaba]/30 bg-surface'}`}>
                    <input type="radio" name="consultationType" value="audio" checked={consultationType === 'audio'} onChange={() => setConsultationType('audio')} className="w-5 h-5 accent-primary" />
                    <div className="flex items-center gap-2">
                      <span className="text-[20px]">📞</span>
                      <span className="font-headline font-bold text-base text-onSurface">{t('booking.audioCall')}</span>
                    </div>
                  </label>
                  <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 transition-all cursor-pointer ${consultationType === 'video' ? 'border-primary bg-primary/5' : 'border-[#bfcaba]/30 bg-surface'}`}>
                    <input type="radio" name="consultationType" value="video" checked={consultationType === 'video'} onChange={() => setConsultationType('video')} className="mt-1 w-5 h-5 accent-primary" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[20px]">🎥</span>
                        <span className="font-headline font-bold text-base text-onSurface">{t('booking.videoCall')}</span>
                      </div>
                      <p className="font-body text-[12px] text-error opacity-90 font-medium m-0 mt-1">{t('booking.stableInternet')}</p>
                    </div>
                  </label>
                </div>
                <p className="text-center font-body text-[13px] text-onSurface-variant mt-6">{t('booking.sameFee')}</p>
              </div>
            ) : step === 2 ? (
              <div className="flex flex-col">
                <div className="mb-8">
                  <h3 className="font-headline font-semibold text-base text-onSurface mb-4 flex items-center gap-2 m-0">
                    <span className="material-symbols-outlined text-[20px] text-primary">calendar_month</span>
                    {t('booking.selectDate')}
                  </h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    {dates.map((d) => (
                      <div key={d.date} onClick={() => !d.disabled && setSelectedDate(d.date)}
                        className={`flex-none snap-start w-[72px] h-[88px] rounded-2xl flex flex-col items-center justify-center transition-all duration-200 border ${
                          d.disabled ? 'cursor-not-allowed border-[#bfcaba]/20 bg-[#e5f9e2]/50 opacity-50 text-onSurface-variant' 
                            : selectedDate === d.date ? 'cursor-pointer border-transparent bg-primary text-onPrimary shadow-[0_4px_16px_rgba(13,99,27,0.2)]'
                            : 'cursor-pointer border-transparent bg-surface-containerLow hover:bg-surface-containerHigh text-onSurface'
                        }`}>
                        <span className={`font-body text-xs uppercase tracking-[0.05em] mb-1 ${selectedDate === d.date ? 'opacity-90' : 'text-onSurface-variant'}`}>{d.day}</span>
                        <span className="font-headline text-[1.25rem] font-bold">{d.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-base text-onSurface mb-4 flex items-center gap-2 m-0">
                    <span className="material-symbols-outlined text-[20px] text-primary">schedule</span>
                    {t('booking.availableTime')}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {times.map((ti) => (
                      <button key={ti.time} onClick={() => !ti.disabled && setSelectedTime(ti.time)} disabled={ti.disabled}
                        className={`h-12 rounded-2xl font-body font-medium text-[0.875rem] flex items-center justify-center transition-all duration-200 border ${
                          ti.disabled ? 'cursor-not-allowed bg-[#e5f9e2]/50 text-[rgba(64,73,61,0.5)] line-through border-[#bfcaba]/20'
                            : selectedTime === ti.time ? 'cursor-pointer border-transparent bg-primary-container text-onPrimary-container shadow-[0_4px_16px_rgba(46,125,50,0.15)]'
                            : 'cursor-pointer border-transparent bg-surface-containerLow text-onSurface hover:bg-surface-containerHigh'
                        }`}>
                        {ti.time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-surface rounded-2xl p-5 mt-8">
                  <h4 className="font-headline font-semibold text-[0.875rem] text-onSurface mb-3 m-0">{t('booking.bookingSummary')}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-[0.875rem] text-onSurface-variant">{t('booking.consultationType')}</span>
                    <span className="font-body text-[0.875rem] font-medium text-onSurface capitalize">{consultationType === 'audio' ? t('booking.audioCall') : t('booking.videoCall')}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-[0.875rem] text-onSurface-variant">{t('booking.selectedSlot')}</span>
                    <span className="font-body text-[0.875rem] font-medium text-onSurface">{dates.find(d => d.date === selectedDate)?.day} {selectedDate}, {selectedTime}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-[0.875rem] text-onSurface-variant">{t('booking.consultationFee')}</span>
                    <span className="font-body text-[0.875rem] font-medium text-onSurface">₹300</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-body text-[0.875rem] text-onSurface-variant">{t('booking.platformFee')}</span>
                    <span className="font-body text-[0.875rem] font-medium text-onSurface">₹30</span>
                  </div>
                  <div className="flex justify-between items-center mb-0 mt-3 pt-3 border-t border-surface-containerHighest">
                    <span className="font-headline font-bold text-base text-onSurface">{t('booking.totalPayable')}</span>
                    <span className="font-headline font-bold text-[1.125rem] text-primary">₹330</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[40px] text-primary">check_circle</span>
                </div>
                <h3 className="font-headline font-bold text-[1.5rem] text-onSurface mb-2 mt-0">{t('booking.bookingConfirmed')}</h3>
                <p className="font-body text-center text-onSurface-variant mb-6 text-[0.875rem]">
                  {t('booking.bookingConfirmedDesc', { name: expert.name, date: `${dates.find(d => d.date === selectedDate)?.day} ${selectedDate}`, time: selectedTime })}
                </p>
                <div className="bg-surface-containerLow rounded-2xl p-4 w-full text-center">
                  <p className="font-body text-sm font-medium text-onSurface mb-1 mt-0">{t('booking.meetingLink')}</p>
                  <p className="font-body text-[12px] text-primary flex items-center justify-center gap-1 mt-0 mb-0">
                    <span className="material-symbols-outlined text-[14px]">link</span>
                    {t('booking.meetingLinkDesc')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Action Area */}
          <div className="p-4 px-6 pb-6 bg-surface-containerLowest border-t border-[#dff3dc]/30 w-full sm:rounded-b-[24px]">
            {step === 1 ? (
              <button onClick={() => setStep(2)}
                className="w-full h-14 rounded-full bg-gradient-to-b from-primary to-primary-container text-onPrimary font-headline font-bold text-base uppercase tracking-[0.05em] flex items-center justify-center gap-2 border-none cursor-pointer shadow-[0_4px_12px_rgba(13,99,27,0.2)] transition-all duration-200 hover:opacity-90 active:scale-[0.98]">
                {t('common.next')}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            ) : step === 2 ? (
              <button onClick={() => setStep(3)}
                className="w-full h-14 rounded-full bg-gradient-to-b from-primary to-primary-container text-onPrimary font-headline font-bold text-base uppercase tracking-[0.05em] flex items-center justify-center gap-2 border-none cursor-pointer shadow-[0_4px_12px_rgba(13,99,27,0.2)] transition-all duration-200 hover:opacity-90 active:scale-[0.98]">
                {t('booking.confirmBooking')}
                <span className="material-symbols-outlined">check_circle</span>
              </button>
            ) : (
              <button onClick={() => navigate('/farmer/experts')}
                className="w-full h-14 rounded-full bg-surface-containerLow text-onSurface font-headline font-bold text-base uppercase tracking-[0.05em] flex items-center justify-center gap-2 border-none cursor-pointer shadow-sm transition-all duration-200 hover:bg-surface-containerHigh active:scale-[0.98]">
                {t('booking.backToExperts')}
              </button>
            )}
          </div>
        </div>
    </div>
  );
}