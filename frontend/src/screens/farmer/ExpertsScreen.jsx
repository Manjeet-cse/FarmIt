import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';

const EXPERTS = [
  {
    id: 1,
    name: 'Dr. Ravi Kumar',
    qualification: 'Ph.D. Agronomy, IARI',
    experience: '15+ Yrs Exp',
    topics: ['Wheat', 'Soil Health'],
    rating: 4.9,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHWu6Zw3ZqncW0QjyX34zdGEzK-NUM0tSN4CcpNInHNuUtYhtsDZ8r3p2gPhFUxMzlDi--SPF4szLW698HWuXFK00Zp633ccJR-yEXWJgUFBZqmUm-yKOriSxFwDF4nUiQY2fOzKJHF1EEgWPGKGATT9tCc-VVuKSNqzSWLLHteRyRtEtDHRTA9M0Dnw-4n-BoUGQqLgTpnvVkHuEIpAu4rhxjgaehoCE9hU9now6bokGVBeR9ugNAmR_yFirmIsElipX9go2wWfw'
  },
  {
    id: 2,
    name: 'Dr. Sunita Devi',
    qualification: 'M.Sc. Plant Pathology',
    experience: '8 Yrs Exp',
    topics: ['Pest Control', 'Vegetables'],
    rating: 4.8,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG-D4PAeRz4Hn2ivr-hctLs1_0wUmUyW4gZaoa7Q8kHbdhktWKkFAH8bl--J9cb1lhkgZwyuVC4Imxm3rTrFtwWLwSXgLhva_gqq4b9QCNnyqTw-z6WZID5TmynD6JmbUVrlXi6vBG_X5qaVuYkR8RXd04smmKqdSpco_ZjPcDbkuplqiNA0lzwN3dzCpB2Q7bpkJi_P2BL1i4bsg_lV3oKpcMRHe71HhFPOjJfNn_8GWOSL4QsXZBokY72MblljAzLEioLsT6apQ'
  },
  {
    id: 3,
    name: 'Ramesh Agarwal',
    qualification: 'Senior Agronomist',
    experience: '20+ Yrs Exp',
    topics: ['Irrigation', 'Sugarcane'],
    rating: 4.6,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD2dU_BA_VBh4yEt5f8TmnEG9NuxMHrBKw-rdi59UW7YwMpeihr_f63xQGv4u24qudKA5jTppFvf3t3zOJz5JDoSJKy7ovTkhHglKsGVrqJwOw-eDlYWAiaixWV0GMjOhP3fRKkl9McEnQeS6Yb7Nf5CrB7xGkGLwuH-rjpUwSf9MP9mPToAUhxVTnZPnKAcngWkfYbKxftVC8mJz-dk08yfmeiLNJW7-ccVfazvPLD6YB6SwSQ9aKsDxmIZk0if8CwrQCDw5BYcRs'
  },
  {
    id: 4,
    name: 'Priyanshu Sharma',
    qualification: 'B.Sc. Agriculture',
    experience: '5 Yrs Exp',
    topics: ['Organic Farming', 'Wheat'],
    rating: 4.5,
    image: '/experts/expert_priyanshu.png'
  },
  {
    id: 5,
    name: 'Piyush Tharwani',
    qualification: 'M.Sc. Horticulture',
    experience: '10 Yrs Exp',
    topics: ['Pest Control', 'Vegetables'],
    rating: 4.7,
    image: '/experts/expert_piyush.png'
  },
  {
    id: 6,
    name: 'Karunesh Mehra',
    qualification: 'Ph.D. Soil Science',
    experience: '12 Yrs Exp',
    topics: ['Soil Health', 'Irrigation'],
    rating: 4.8,
    image: '/experts/expert_karunesh.png'
  },
  {
    id: 7,
    name: 'Madhav Gupta',
    qualification: 'M.Sc. Agronomy',
    experience: '7 Yrs Exp',
    topics: ['Wheat', 'Sugarcane'],
    rating: 4.6,
    image: '/experts/expert_madhav.png'
  },
  {
    id: 8,
    name: 'Vishal Lodha',
    qualification: 'B.Sc. Agriculture',
    experience: '4 Yrs Exp',
    topics: ['Organic Farming', 'Soil Health'],
    rating: 4.4,
    image: '/experts/expert_vishal.png'
  },
  {
    id: 9,
    name: 'Golu Lodha',
    qualification: 'Agri Business Manager',
    experience: '6 Yrs Exp',
    topics: ['Irrigation', 'Pest Control'],
    rating: 4.5,
    image: '/experts/expert_golu.png'
  },
  {
    id: 10,
    name: 'Narendra Lodha',
    qualification: 'Senior Agronomist',
    experience: '18 Yrs Exp',
    topics: ['Sugarcane', 'Soil Health'],
    rating: 4.9,
    image: '/experts/expert_narendra.png'
  },
  {
    id: 11,
    name: 'Satish Lodha',
    qualification: 'M.Sc. Plant Pathology',
    experience: '9 Yrs Exp',
    topics: ['Pest Control', 'Organic Farming'],
    rating: 4.7,
    image: '/experts/expert_satish.png'
  }
];

const FILTERS = [
  { id: 'All Topics', icon: 'grass' },
  { id: 'Soil Health', icon: 'compost' },
  { id: 'Pest Control', icon: 'bug_report' },
  { id: 'Irrigation', icon: 'water_drop' },
  { id: 'Organic Farming', icon: 'eco' },
];

const ExpertCard = ({ expert }) => {
  const navigate = useNavigate();

  return (
    <article className="rounded-[16px] p-4 flex flex-col gap-3 bg-surface-containerLowest shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/20 hover:shadow-md transition-all">
      
      {/* Top Section */}
      <div className="flex gap-4 items-center">
        <div className="shrink-0 relative w-[72px] h-[72px]">
          <img
            src={expert.image}
            className="w-full h-full object-cover rounded-full shadow-sm"
            alt={expert.name}
          />
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 bg-[#ffb300] text-[#4d3600] text-[10px] font-bold py-0.5 px-1.5 rounded-full flex items-center gap-0.5 shadow-sm whitespace-nowrap border-2 border-surface-containerLowest">
            <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            {expert.rating}
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <h3 className="font-headline font-bold text-[16px] leading-tight text-onSurface m-0">{expert.name}</h3>
          <p className="font-body text-onSurface-variant font-medium text-[12px] mt-0.5 m-0">{expert.qualification}</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex flex-col gap-2">
        <div className="mt-1">
          <span className="inline-block bg-[#e5f9e2] text-[#006e1c] text-[10px] font-bold tracking-wide py-0.5 px-2 rounded-md border border-[#006e1c]/20 uppercase">First 5 min free</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className="bg-surface-containerHigh text-onSurface text-[11px] py-1 px-2.5 rounded-md font-medium border border-[#bfcaba]/20">{expert.experience}</span>
          {expert.topics.slice(0, 2).map(topic => (
            <span key={topic} className="bg-surface-containerHigh text-onSurface text-[11px] py-1 px-2.5 rounded-md font-medium border border-[#bfcaba]/20">{topic}</span>
          ))}
        </div>
        <div className="flex items-center gap-1 text-[#006e1c] mt-0.5">
           <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
           <span className="text-[10px] font-bold tracking-wide">Verified Agronomist</span>
        </div>
      </div>
      
      {/* Divider */}
      <hr className="border-t border-[#bfcaba]/20 m-0 w-full mt-1 mb-1" />

      {/* Bottom Section - ACTIONS */}
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-2.5">
          <button 
            onClick={() => navigate('/farmer/expert-chat', { state: { expert } })}
            className="flex-[3] bg-primary text-white font-label text-[13px] font-bold tracking-wide h-10 rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98] transition-all border-none cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>chat</span>
            Chat Now
          </button>
          <button 
            onClick={() => navigate('/farmer/expert-booking', { state: { expert } })}
            className="flex-[2] bg-surface-containerLow text-primary font-label text-[13px] font-bold tracking-wide h-10 rounded-xl border border-[#bfcaba]/30 flex items-center justify-center gap-1.5 hover:bg-surface-containerHigh active:scale-[0.98] transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_month</span>
            Book
          </button>
        </div>
        <p className="text-center text-[10px] text-onSurface-variant m-0 font-medium tracking-wide">Chat instantly or schedule a call</p>
      </div>
    </article>
  );
};

export default function ExpertsScreen() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState('All Topics');

  const filteredExperts = activeFilter === 'All Topics' 
    ? EXPERTS 
    : EXPERTS.filter(expert => expert.topics.includes(activeFilter));

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface-light">
      {isMobile && <AppTopBar title="Ask an Expert" showNotification={true} />}

      {/* ── Scrollable Content Area ─────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden relative z-0">
        <main className="px-4 max-w-[1280px] mx-auto flex flex-col gap-8 pt-6 pb-[140px]">
          
          {/* LIMITED OFFER Banner (Smaller version) */}
          <section className="bg-gradient-to-br from-[#ffd54f] to-tertiary p-4 rounded-xl shadow-[0_4px_12px_-4px_rgba(255,185,87,0.4)] relative overflow-hidden flex flex-row items-center justify-between gap-3">
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/20 rounded-full blur-[20px] pointer-events-none" />
            <div className="relative z-10 flex items-center gap-3">
              <div className="bg-white/30 p-2 rounded-full shrink-0 flex items-center justify-center backdrop-blur-[4px]">
                <span className="material-symbols-outlined text-tertiary-container text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  timer
                </span>
              </div>
              <div>
                <h2 className="font-headline font-bold text-[#3e2700] text-sm tracking-tight m-0">LIMITED OFFER</h2>
                <p className="font-body text-[#5e4100] text-xs font-medium mt-0.5 m-0 leading-tight">First 5 mins FREE.</p>
              </div>
            </div>
            <button className="relative z-10 shrink-0 bg-tertiary text-white font-label font-bold uppercase tracking-wider text-[10px] py-2 px-4 rounded-full hover:bg-[#d48806] transition-colors shadow-sm">
              Claim
            </button>
          </section>

          {/* Filter Chips (Horizontal Scrollable) */}
          <section>
            <div className="flex overflow-x-auto pb-4 gap-3 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {FILTERS.map(filter => (
                <button 
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`snap-start shrink-0 py-2.5 px-5 rounded-full font-label text-sm font-medium flex items-center gap-2 active:scale-95 transition-all ${activeFilter === filter.id ? 'bg-primary text-white shadow-sm' : 'bg-surface-containerLow text-onSurface border border-[#bfcaba]/20 hover:bg-surface-container'}`}
                >
                  <span className="material-symbols-outlined text-[18px]">{filter.icon}</span>
                  {filter.id}
                </button>
              ))}
            </div>
          </section>

          {/* Expert Cards List */}
          <section className="flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <h2 className="font-headline font-bold text-2xl text-onSurface mb-2 mt-0">Available Experts</h2>
            
            {filteredExperts.length > 0 ? filteredExperts.map(expert => (
              <ExpertCard key={expert.id} expert={expert} />
            )) : (
              <p className="text-onSurface-variant text-center py-8">No experts found for this topic.</p>
            )}

          </section>

          {/* Previous Consultations */}
          <section className="mt-4">
            <h2 className="font-headline font-bold text-2xl text-onSurface mb-2 mt-0">Previous Consultations</h2>
            <div className="flex overflow-x-auto pb-6 gap-4 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-mandatory scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              
              {/* Consult Card 1 */}
              <div className="snap-start shrink-0 w-[280px] bg-white/40 backdrop-blur-md rounded-2xl p-4 shadow-[0_4px_24px_-8px_rgba(15,31,17,0.08)] border border-white/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-surface-containerHigh text-onSurface-variant text-[10px] uppercase tracking-wider font-bold py-1 px-2 rounded-md">Oct 12, 2023</span>
                    <span className="material-symbols-outlined text-outline text-[18px]">history</span>
                  </div>
                  <h4 className="font-headline font-bold text-onSurface text-base truncate m-0">Tomato Blight Issue</h4>
                  <p className="font-body text-sm text-onSurface-variant mt-1 line-clamp-2 m-0">Consulted regarding early blight symptoms on tomato leaves. Recommended copper fungicide.</p>
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-[#bfcaba]/20 pt-3">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuClKC9lQvo7zkZXwqs9Hd8lHdfWhP86BBR13zJF7OmOIbKv7fZCx39ODjOZARZfg-DD-pNQvlOPtEfIMkxbUssAF5BQlsiPR9zXL9cTGFq1mM5h2qgJuqTbsx0IW4Rtfk5oAHqb3xu2D8_snp1HBcgjYfoKPzBojW4eo8GEqLmpCT6c7pd42SnWY-Q79lPo72e9vgUNg3OFc5pRVD4arQPBH9nDg2n-9aT5eeByUfMmjPuzA4-odo0cY2zVW9SHKQCPLqxYnR2TNs4"
                    className="w-8 h-8 rounded-full object-cover"
                    alt="Dr. Ravi Kumar Mini"
                  />
                  <span className="font-body text-sm font-medium text-onSurface">Dr. Ravi Kumar</span>
                </div>
              </div>

              {/* Consult Card 2 */}
              <div className="snap-start shrink-0 w-[280px] bg-white/40 backdrop-blur-md rounded-2xl p-4 shadow-[0_4px_24px_-8px_rgba(15,31,17,0.08)] border border-white/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-surface-containerHigh text-onSurface-variant text-[10px] uppercase tracking-wider font-bold py-1 px-2 rounded-md">Sep 05, 2023</span>
                    <span className="material-symbols-outlined text-outline text-[18px]">history</span>
                  </div>
                  <h4 className="font-headline font-bold text-onSurface text-base truncate m-0">Soil Testing Report</h4>
                  <p className="font-body text-sm text-onSurface-variant mt-1 line-clamp-2 m-0">Discussed low nitrogen levels in field B. Advised urea application schedule.</p>
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-[#bfcaba]/20 pt-3">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUhRpkHvp7tE-EMqsTJjLfM-VZnrT_SxvPRp9lHHxzq32xIR_F26Z08eJY5ToW6yheUuAJMwFNsrdv3lkRlXSvp_Bm12JK-grRj1oxNMHE8SQ9w7MDevzL2PCuHP6NGPdR_pUSXYI0XjmGU-PY2Zai9ZNPvkobYg1RTRoXxFhA_7pok35NlWk8uZlhBH637J5X580VWZPhL60vJkG42oGLUgFsHDeZASrkR0o7LprFr8mXoFalkBgaxzR9xelXpiaxvVgawhU-sJg"
                    className="w-8 h-8 rounded-full object-cover"
                    alt="Dr. Sunita Devi Mini"
                  />
                  <span className="font-body text-sm font-medium text-onSurface">Dr. Sunita Devi</span>
                </div>
              </div>

              <div className="snap-start shrink-0 w-4" />
            </div>
          </section>

        </main>
      </div>

      <button 
        className="absolute bottom-32 right-4 z-40 bg-[#fff5d0] text-[#774c00] p-4 rounded-full border-none cursor-pointer shadow-[0_8px_24px_rgba(255,185,87,0.3)] hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
        onClick={() => navigate('/farmer/ai-assistant')}
      >
        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          smart_toy
        </span>
      </button>

      {/* ── Bottom Nav — Mobile only ── */}
          </div>
  );
}