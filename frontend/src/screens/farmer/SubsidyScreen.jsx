import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';

const SCHEMES = [
  {
    id: 1,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'payments', text: '₹6,000 / Year' },
    title: 'PM-KISAN Samman Nidhi',
    desc: 'Direct income support for all landholding farmers\' families to supplement their financial needs.',
    footer: { type: 'applicants', value: '1M+' },
    category: 'Financial Support',
  },
  {
    id: 2,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'security', text: 'Full Coverage' },
    title: 'PM Fasal Bima Yojana',
    desc: 'Comprehensive crop insurance against non-preventable natural risks from pre-sowing to post-harvest.',
    footer: { type: 'deadline', value: 'Ends in 5 days' },
    category: 'Crop Insurance',
  },
  {
    id: 3,
    ministry: 'Dept. of Agriculture',
    badge: { icon: 'science', text: 'Free Test' },
    title: 'Soil Health Card Scheme',
    desc: 'Get a comprehensive assessment of your soil health to optimize fertilizer usage and boost yields.',
    footer: { type: 'eligible' },
    category: 'Fertilizer',
  },
  {
    id: 4,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'account_balance', text: 'Debt Financing' },
    title: 'Agriculture Infrastructure Fund (AIF)',
    desc: 'Provides medium to long-term debt financing for investment in post-harvest management infrastructure and community farming assets.',
    footer: { type: 'eligible' },
    category: 'Infrastructure',
  },
  {
    id: 5,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'savings', text: '₹3,000 / Month' },
    title: 'PM Kisan Maan-Dhan Yojana (PM-KMY)',
    desc: 'A voluntary, contributory pension scheme for small and marginal farmers, offering ₹3,000 monthly after age 60.',
    footer: { type: 'applicants', value: '500K+' },
    category: 'Financial Support',
  },
  {
    id: 6,
    ministry: 'Ministry of Jal Shakti',
    badge: { icon: 'water_drop', text: 'Irrigation Subsidy' },
    title: 'PM Krishi Sinchai Yojana (PMKSY)',
    desc: 'Aims to improve water use efficiency with the "More Crop Per Drop" focus, providing subsidies for drip and sprinkler irrigation.',
    footer: { type: 'eligible' },
    category: 'Infrastructure',
  },
  {
    id: 7,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'storefront', text: 'Unified Market' },
    title: 'e-NAM',
    desc: 'A pan-India electronic trading portal linking existing APMC mandis to create a unified national market for agricultural commodities.',
    footer: { type: 'applicants', value: '2M+' },
    category: 'Market Access',
  },
  {
    id: 8,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'eco', text: 'Organic Farming' },
    title: 'Paramparagat Krishi Vikas Yojana (PKVY)',
    desc: 'Promotes organic farming through cluster-based, participatory guarantee system certification.',
    footer: { type: 'eligible' },
    category: 'Farming Practice',
  },
  {
    id: 9,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'agriculture', text: 'Machinery Subsidy' },
    title: 'Sub-Mission on Agriculture Mechanization (SMAM)',
    desc: 'Promotes farm machinery and equipment, particularly for small farmers, to increase productivity.',
    footer: { type: 'eligible' },
    category: 'Equipment',
  },
  {
    id: 10,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'flight_takeoff', text: 'Drone Services' },
    title: 'Namo Drone Didi',
    desc: 'A specialized initiative to equip women self-help groups with drones for agricultural services like nutrient application.',
    footer: { type: 'applicants', value: '10K+' },
    category: 'Equipment',
  },
  {
    id: 11,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'oil_barrel', text: 'Self Reliance' },
    title: 'Mission on Edible Oils-Oil Palm (NMEO-OP)',
    desc: 'Focuses on increasing edible oil production and making India self-reliant in palm oil.',
    footer: { type: 'eligible' },
    category: 'Farming Practice',
  },
  {
    id: 12,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'groups', text: 'FPO Promotion' },
    title: 'Formation & Promotion of 10,000 FPOs',
    desc: 'Supports the creation of Farmer Producer Organizations to strengthen bargaining power and improve income.',
    footer: { type: 'applicants', value: '10,000+' },
    category: 'Market Access',
  },
  {
    id: 13,
    ministry: 'Ministry of Finance',
    badge: { icon: 'credit_card', text: 'Low-Interest Credit' },
    title: 'Kisan Credit Card (KCC)',
    desc: 'Provides timely, low-interest credit to farmers for cultivating crops and managing post-harvest expenses.',
    footer: { type: 'applicants', value: '5M+' },
    category: 'Financial Support',
  },
  {
    id: 14,
    ministry: 'Ministry of Finance',
    badge: { icon: 'percent', text: '7% Interest Rate' },
    title: 'Modified Interest Subvention Scheme (MISS)',
    desc: 'Provides interest relief on short-term crop loans, often lowering the rate to 7% (or less with prompt repayment).',
    footer: { type: 'eligible' },
    category: 'Financial Support',
  },
  {
    id: 15,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'hive', text: 'Beekeeping' },
    title: 'National Beekeeping and Honey Mission (NBHM)',
    desc: 'Promotes scientific beekeeping for pollination and honey production.',
    footer: { type: 'eligible' },
    category: 'Farming Practice',
  },
  {
    id: 16,
    ministry: 'Ministry of Agriculture',
    badge: { icon: 'trending_up', text: 'Agri-Tech Funding' },
    title: 'AgriSURE Fund',
    desc: 'A fund designed to support agri-tech startups and rural enterprises.',
    footer: { type: 'eligible' },
    category: 'Infrastructure',
  }
];

const FILTERS = ['All Schemes', 'Financial Support', 'Crop Insurance', 'Fertilizer', 'Infrastructure', 'Market Access', 'Farming Practice', 'Equipment'];

export default function SubsidyScreen() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = useState('All Schemes');
  const [activeView, setActiveView] = useState({ type: 'list', scheme: null }); // 'list', 'detail', 'apply'

  const visibleSchemes = SCHEMES.filter(
    (s) => activeFilter === 'All Schemes' || s.category === activeFilter
  );

  if (activeView.type === 'detail' && activeView.scheme) {
    return (
      <SchemeDetailView
        scheme={activeView.scheme}
        onBack={() => setActiveView({ type: 'list', scheme: null })}
        onApply={() => setActiveView({ type: 'apply', scheme: activeView.scheme })}
      />
    );
  }

  if (activeView.type === 'apply' && activeView.scheme) {
    return (
      <HowToApplyView
        scheme={activeView.scheme}
        onBack={() => setActiveView({ type: 'list', scheme: null })}
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface">

      {isMobile && <AppTopBar title="Govt. Scheme Guide" showBack={true} />}

      {/* ── Scrollable Body ─────────────────── */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden bg-[#F6FAF6]">
        <div className="page-content flex flex-col gap-5">

          {/* Alert Banner */}
          <div className="bg-[#ffb84d]/15 rounded-[20px] p-4 flex gap-[14px] items-start border border-[#ffd58f]/30 shadow-sm" role="alert">
            <div className="w-10 h-10 rounded-full bg-[#ffd58f] flex items-center justify-center shrink-0">
              <span
                className="material-symbols-outlined text-[20px] text-[#5a3000]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                campaign
              </span>
            </div>
            <div>
              <h3 className="font-headline text-[15px] font-bold text-[#5a3000] m-0 mb-1">New Kharif Schemes Added</h3>
              <p className="text-[13px] text-[#5a3000]/80 leading-relaxed m-0">
                3 new subsidies are available for drought-resistant seeds in your district.
                Application closes in 14 days.
              </p>
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex gap-2.5 overflow-x-auto py-1 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter schemes">
            {FILTERS.map((label) => (
              <button
                key={label}
                className={`px-5 py-2.5 rounded-full border-none font-body text-[13px] font-semibold whitespace-nowrap cursor-pointer transition-all shrink-0 active:scale-95 shadow-sm ${activeFilter === label
                    ? 'bg-[#1B5E20] text-white shadow-[0_4px_14px_rgba(27,94,32,0.22)]'
                    : 'bg-white text-[#666666] border border-[#E5E5E5]'
                  }`}
                onClick={() => setActiveFilter(label)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Scheme Cards */}
          <div className="flex flex-col gap-4">
            {visibleSchemes.map((scheme) => (
              <SchemeCard
                key={scheme.id}
                scheme={scheme}
                onView={() => setActiveView({ type: 'detail', scheme })}
                onApply={() => setActiveView({ type: 'apply', scheme })}
              />
            ))}
          </div>

        </div>
      </div>

      {/* ── Bottom Nav — Mobile only ── */}
          </div>
  );
}

/* ─── Scheme Card Sub-component ──────────────────────────────────────── */
function SchemeCard({ scheme, onView, onApply }) {
  return (
    <article className="bg-white rounded-2xl border border-[#E5E5E5] shadow-[0_2px_8px_rgba(0,0,0,0.03)] overflow-hidden">
      <div className="p-5 flex flex-col h-full">

        {/* Header row: ministry + badge */}
        <div className="flex justify-between items-start mb-[14px]">
          <span className="font-body text-[10px] font-bold text-[#666666] uppercase tracking-[0.8px]">{scheme.ministry}</span>
          <div className="flex items-center gap-[5px] bg-[#E8F5E9] px-3 py-1.5 rounded-full border border-[#D5E8D4]">
            <span
              className="material-symbols-outlined text-[14px] text-[#2E7D32]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {scheme.badge.icon}
            </span>
            <span className="font-headline text-[11px] font-extrabold text-[#2E7D32]">{scheme.badge.text}</span>
          </div>
        </div>

        {/* Title + Desc */}
        <h2 className="font-headline text-[18px] font-bold text-[#1A1A1A] leading-tight mb-2 mt-0">{scheme.title}</h2>
        <p className="font-body text-[13px] text-[#666666] leading-relaxed mb-5 line-clamp-2 mt-0">{scheme.desc}</p>

        {/* Footer actions */}
        <div className="flex items-center justify-between mt-auto mb-4">
          <SchemeFooterLeft footer={scheme.footer} />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-1">
          <button
            onClick={onApply}
            className="flex-1 h-[44px] rounded-full border-2 border-[#E5E5E5] bg-white text-[#4A4A4A] font-headline text-[13px] font-bold uppercase tracking-wide cursor-pointer transition-all active:scale-95"
          >
            How to Apply
          </button>
          <button
            onClick={onView}
            className="flex-1 h-[44px] rounded-full border-none bg-[#1B5E20] text-white font-headline text-[13px] font-bold uppercase tracking-wide cursor-pointer shadow-[0_4px_12px_rgba(27,94,32,0.2)] transition-all active:scale-95"
          >
            View Scheme
          </button>
        </div>
      </div>
    </article>
  );
}

/* ─── Scheme Detail View ──────────────────────────────────────── */
function SchemeDetailView({ scheme, onBack, onApply }) {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    { q: "Who is eligible for this scheme?", a: "Small and marginal farmers with cultivable land are eligible." },
    { q: "How long does approval take?", a: "Approval usually takes 15-30 working days after document verification." },
    { q: "Can I apply without Aadhaar?", a: "No, Aadhaar linking is mandatory for direct benefit transfer." }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F6FAF6]">
      {/* Top Bar */}
      <header className="px-4 py-4 flex items-center gap-4 bg-primary text-white sticky top-0 z-50 shadow-md">
        <button onClick={onBack} className="flex items-center justify-center bg-transparent border-none p-1 cursor-pointer text-white transition-opacity hover:opacity-80">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <h1 className="font-bold text-[18px] text-white m-0 line-clamp-1">{scheme.title}</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {/* Overview Section */}
        <section className="bg-white rounded-2xl p-5 border border-[#E5E5E5] shadow-sm">
          <h2 className="font-bold text-[17px] text-[#1A1A1A] mb-3 mt-0">Scheme Overview</h2>
          <p className="text-[14px] text-[#4A4A4A] leading-relaxed mb-5 m-0">{scheme.desc}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#F8FDF9] p-3 rounded-xl border border-[#E5E5E5]">
              <span className="block text-[11px] text-[#666666] font-medium mb-1">Financial Support</span>
              <span className="block font-bold text-[#1B5E20] text-[15px]">{scheme.badge.text}</span>
            </div>
            <div className="bg-[#F8FDF9] p-3 rounded-xl border border-[#E5E5E5]">
              <span className="block text-[11px] text-[#666666] font-medium mb-1">Coverage Type</span>
              <span className="block font-bold text-[#1B5E20] text-[15px]">{scheme.category}</span>
            </div>
          </div>
        </section>

        {/* Key Highlights */}
        <section className="bg-white rounded-2xl p-5 border border-[#E5E5E5] shadow-sm">
          <h2 className="font-bold text-[17px] text-[#1A1A1A] mb-4 mt-0">Key Highlights</h2>
          <ul className="flex flex-col gap-3 m-0 p-0 list-none">
            <li className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-[#4CAF50] text-[20px] mt-0.5">verified</span>
              <span className="text-[14px] text-[#333333] font-medium leading-snug">Direct DBT transfer to bank account</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-[#4CAF50] text-[20px] mt-0.5">verified</span>
              <span className="text-[14px] text-[#333333] font-medium leading-snug">Small & marginal farmers eligible</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="material-symbols-outlined text-[#4CAF50] text-[20px] mt-0.5">verified</span>
              <span className="text-[14px] text-[#333333] font-medium leading-snug">100% centrally sponsored scheme</span>
            </li>
          </ul>
        </section>

        {/* Required Documents */}
        <section className="bg-white rounded-2xl p-5 border border-[#E5E5E5] shadow-sm">
          <h2 className="font-bold text-[17px] text-[#1A1A1A] mb-4 mt-0">Required Documents</h2>
          <div className="flex flex-col gap-2.5">
            {[
              "Aadhaar Card linked with Mobile Number",
              "Active Bank Account (DBT enabled)",
              "Land Ownership Records (Khatauni)",
              "Farmer Registration ID"
            ].map((doc, idx) => (
              <div key={idx} className="flex gap-3 items-center bg-[#F9F9F9] px-4 py-3 rounded-xl border border-[#F0F0F0]">
                <span className="material-symbols-outlined text-[#1B5E20] text-[18px]">check_circle</span>
                <span className="text-[13px] font-semibold text-[#1A1A1A]">{doc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Video Tutorial */}
        <section className="bg-white rounded-2xl p-5 border border-[#E5E5E5] shadow-sm">
          <h2 className="font-bold text-[17px] text-[#1A1A1A] mb-4 mt-0">Watch Video Guide</h2>
          <div className="relative w-full h-[180px] rounded-xl overflow-hidden bg-black mb-3 group cursor-pointer">
            <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=600&auto=format&fit=crop" alt="Video Thumbnail" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-lg">
                <span className="material-symbols-outlined text-white text-[32px] ml-1">play_arrow</span>
              </div>
            </div>
            <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded">
              4:35
            </div>
            <div className="absolute top-3 left-3 bg-[#E8F5E9]/90 backdrop-blur-sm text-[#1B5E20] text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-[#C8E6C9]">
              Hindi + English
            </div>
          </div>
          <p className="text-[13px] text-[#666666] text-center font-medium m-0">Step-by-step registration process explained</p>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-2xl p-5 border border-[#E5E5E5] shadow-sm">
          <h2 className="font-bold text-[17px] text-[#1A1A1A] mb-4 mt-0">Frequently Asked Questions</h2>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#E5E5E5] rounded-xl overflow-hidden bg-white">
                <button
                  className="w-full text-left p-4 bg-transparent border-none flex justify-between items-center cursor-pointer transition-colors hover:bg-[#F9F9F9]"
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                >
                  <span className="font-bold text-[14px] text-[#1A1A1A] pr-4">{faq.q}</span>
                  <span className="material-symbols-outlined text-[#666666] shrink-0 bg-[#F5F5F5] rounded-full p-1 text-[16px]">
                    {expandedFaq === idx ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
                {expandedFaq === idx && (
                  <div className="px-4 pb-4 pt-1 bg-transparent text-[13px] text-[#666666] leading-relaxed border-t border-[#F0F0F0] mt-1">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Sticky Bottom Actions */}
      <div className="shrink-0 p-4 bg-white border-t border-[#E5E5E5] shadow-[0_-4px_16px_rgba(0,0,0,0.03)] flex gap-4 z-50">
        <button
          onClick={onApply}
          className="flex-1 h-[48px] rounded-full border border-[#1B5E20] bg-white text-[#1B5E20] font-headline text-[13px] font-bold uppercase tracking-wide cursor-pointer transition-all active:scale-95"
        >
          How to Apply
        </button>
        <button
          className="flex-[1.5] h-[48px] rounded-full border-none bg-[#1B5E20] text-white font-headline text-[13px] font-bold uppercase tracking-wide cursor-pointer shadow-[0_4px_14px_rgba(27,94,32,0.2)] transition-all active:scale-95 flex items-center justify-center gap-1.5"
        >
          Official Website <span className="material-symbols-outlined text-[16px]">open_in_new</span>
        </button>
      </div>
    </div>
  );
}

/* ─── How To Apply View ──────────────────────────────────────── */
function HowToApplyView({ scheme, onBack }) {
  const steps = [
    { title: "Visit official portal", desc: "Open the government website on your browser.", icon: "language" },
    { title: "Login/Register using Aadhaar", desc: "Enter your Aadhaar number and OTP to verify your identity.", icon: "fingerprint" },
    { title: "Upload land & bank details", desc: "Provide your Khatauni records and bank account for DBT.", icon: "upload_file" },
    { title: "Submit application", desc: "Review all details and submit the application form.", icon: "send" },
    { title: "Track approval status", desc: "Use your application ID to check the status online.", icon: "query_stats" }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#F6FAF6]">
      {/* Top Bar */}
      <header className="px-4 py-4 flex items-center gap-4 bg-primary text-white sticky top-0 z-50 shadow-md">
        <button onClick={onBack} className="flex items-center justify-center bg-transparent border-none p-1 cursor-pointer text-white transition-opacity hover:opacity-80">
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="flex flex-col">
          <h1 className="font-bold text-[18px] text-white m-0">How to Apply</h1>
          <span className="text-[12px] text-white/80 line-clamp-1 mt-0.5">{scheme.title}</span>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

        {/* Timeline Card */}
        <div className="bg-white rounded-2xl p-6 border border-[#E5E5E5] shadow-sm mb-6">
          <h2 className="font-bold text-[18px] text-[#1A1A1A] mb-8 mt-0 text-center">Application Process</h2>

          <div className="relative pl-2">
            {/* Vertical Line */}
            <div className="absolute left-[25px] top-4 bottom-12 w-[2px] bg-[#E8F5E9] z-0"></div>

            <div className="flex flex-col gap-6 relative z-10">
              {steps.map((step, idx) => (
                <div key={idx} className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-full bg-white border-2 border-[#1B5E20] shadow-[0_2px_8px_rgba(27,94,32,0.15)] flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#1B5E20] text-[22px]">{step.icon}</span>
                  </div>
                  <div className="pt-0.5 pb-2">
                    <span className="block text-[10px] font-extrabold text-[#1B5E20] uppercase tracking-widest mb-1.5 bg-[#E8F5E9] inline-block px-2 py-0.5 rounded">STEP {idx + 1}</span>
                    <h3 className="font-bold text-[16px] text-[#1A1A1A] m-0 mb-1.5">{step.title}</h3>
                    <p className="text-[13px] text-[#666666] m-0 leading-relaxed pr-2">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Sticky Action */}
      <div className="shrink-0 p-4 bg-white border-t border-[#E5E5E5] shadow-[0_-4px_16px_rgba(0,0,0,0.03)] z-50">
        <button className="w-full h-[50px] rounded-full border-none bg-[#1B5E20] text-white font-headline text-[14px] font-bold uppercase tracking-wide cursor-pointer shadow-[0_4px_14px_rgba(27,94,32,0.2)] transition-all active:scale-95 flex items-center justify-center gap-2">
          Open Official Website <span className="material-symbols-outlined text-[18px]">open_in_new</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Footer left cell ───────────────────────────────────────────────── */
function SchemeFooterLeft({ footer }) {
  if (footer.type === 'applicants') {
    return (
      <span className="flex items-center gap-1.5 text-[12px] text-[#666666] font-medium bg-[#F5F5F5] px-2.5 py-1 rounded-md">
        <span className="material-symbols-outlined text-[16px] text-[#1A1A1A]">group</span>
        {footer.value} Applied
      </span>
    );
  }
  if (footer.type === 'deadline') {
    return (
      <span className="flex items-center gap-1.5 text-[12px] text-[#D32F2F] font-bold bg-[#FFEBEE] px-2.5 py-1 rounded-md">
        <span className="material-symbols-outlined text-[16px]">schedule</span>
        {footer.value}
      </span>
    );
  }
  if (footer.type === 'eligible') {
    return (
      <span className="flex items-center gap-1.5 text-[12px] text-[#1B5E20] font-bold bg-[#E8F5E9] px-2.5 py-1 rounded-md">
        <span className="material-symbols-outlined text-[16px]">check_circle</span>
        High Eligibility
      </span>
    );
  }
  return null;
}