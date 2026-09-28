import React, { useState, useEffect, useRef } from 'react';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';

/* ─────────────────────────────────────────────────────────────
   STATIC DATA  (reuses same images / content from original)
───────────────────────────────────────────────────────────── */
const CONTENT = [
  {
    id: 'wheat-rust',
    title: 'Identifying Early Rust Signs',
    topic: 'Wheat',
    type: 'VIDEO',
    duration: '5:20',
    level: 'Beginner',
    saved: false,
    watched: 70,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCksfkNe_WsydKmV7V5mvfVYvGZB7I6PdK_iyuY7R5gqoYJaOvR-7q7M-idZKcq36m5daAaa2T95K2nhRzgD9T-hPxPIu8po-T_Q9LhnGnbAhaSRvgfU0sXHhMPQtSLSaH3z-wJ90yti-f4XQg_-96jkQnGZF-Inpcm4W8NrAeA9nXC6dxSZOl4hXUXYJ3uFuqxhbrnMQWMp_1uoTiWCKKkH6Pje74v6_U5_6i1mUZodmshgjPPOGRjuE8mMfWRtbsW2QUFEU92scY',
  },
  {
    id: 'drip-irrigation',
    title: 'Optimizing Drip Irrigation',
    topic: 'Irrigation',
    type: 'VIDEO',
    duration: '8:45',
    level: 'Beginner',
    saved: true,
    watched: 0,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJravlRk2kpHMj3irPukGehMcmWsh0zke8fTOQpmZTaub71BpuDoipaQEGT_PNiW9TardR-NcePivWXS_4oVIf9JUTTJyfWukric_jdPU3L45tqadlxqkO8K9wDAqe1FkWELYafFrXTesuw2zhj7NqVEgR50YdOAynRr4mbKWxPE8Hge8IU1ajvsIUmsK-walwoxhCA5CqxW8ZDvPfpoh3q_LxI9ehwcwETJuXMCeQ4oMkFKLL8XibOZ6NwVallzZ8sDdW__m7lAQ',
  },
  {
    id: 'soil-testing',
    title: 'Basics of Soil Testing',
    topic: 'Soil',
    type: 'VIDEO',
    duration: '3:15',
    level: 'Beginner',
    saved: false,
    watched: 0,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqha6P6UAUKzZaUOkaVlH4V_ddBVYss6WcjdnhO8kS5KcqvMjP9qezCPZsnU4eVduU6QJ_wMXsri9LN5qPkfpH-eL6M8nbTsqX6EtUNhllkQ-2cUVVCbZ0OAIVF5bfHKz69MGiHs7QmKofpbpkRwInKEM6zoy4ehkRgXlzAq4FI-4fthbC4SUp9kKXdWA8WdRnlydR_kLk7JYEGZrfY97an5XEZWhfrYztl5krJqXLMZ06pBBdZ7F-latUeln4zf03UyrfhIjc_PA',
  },
  {
    id: 'tractor',
    title: 'Efficient Tractor Operation',
    topic: 'Machinery',
    type: 'VIDEO',
    duration: '12:40',
    level: 'Advanced',
    saved: false,
    watched: 0,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDazqdLjoFYggXYhBGKqOmtp5i6vgZMmlImD1zehYKiLo4XoIophOilwUwSsaWLj9D19wNGCcYFMVsI4y59tyX8t6i6-p5uGHIdRnbiRIqI5n9P-s1dtTmlg6PLJC-eaqQk1PnHvTzwUVWkLfbtuLIpDhZsa2KiR1jJjKwUC1of3YOZdEWCqHJtmXMnyArefoMvHLFdP9YzaMEDUZhaXSth_EGgjiNhvc-4wtgJJ12aQNxo0Rk9YcEthUUa12EwFwa6bA_hzY21n2o',
  },
  {
    id: 'maize',
    title: 'Maize: Nitrogen Management',
    topic: 'Crop Care',
    type: 'VIDEO',
    duration: '4:55',
    level: 'Intermediate',
    saved: false,
    watched: 20,
    img: '/images/learning/maize_nitrogen.jpg',
  },
  {
    id: 'drone',
    title: 'Intro to Field Mapping',
    topic: 'Machinery',
    type: 'VIDEO',
    duration: '6:20',
    level: 'Beginner',
    saved: false,
    watched: 0,
    img: '/images/learning/drone_mapping.jpg',
  },
  {
    id: 'wheat-blast',
    title: 'Wheat Blast Prevention',
    topic: 'Pest & Disease',
    type: 'VIDEO',
    duration: '6:45',
    level: 'Beginner',
    saved: true,
    watched: 0,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLFrdqJB196qX7eMWH-bQec1hW2UIRgAq62KlyuR6depMYOy8mQZfkKZeY62_WH_a2IM0rCHKgILNVazTy2x2PZr7KHZIjATuNV85jnOKJdFK1PSrshV9jaU-StSQppBRj6Uz9ZJrNeAu4MMH0vE1zL58M7atPBsmPvBynQue0XVxzGg4eE4kJebKtChhsQh5RLLVRcUjti0eatkHNJsE4KjYFpOvrAmoPLzRuVM0kQ1EqnAM0nG5UyJFEP9cPZz65Xe2YSMG-SGM',
  },
  {
    id: 'mustard-pest',
    title: 'Mustard Aphid Management',
    topic: 'Pest & Disease',
    type: 'TIP',
    duration: '2:10',
    level: 'Beginner',
    saved: false,
    watched: 0,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvmeNlF0YJccL7f48_TlWAeIEXwl8m0rGhtWerduvZ1OILwLEt8vMWet4qz-y_eorxFo0uv_ejKBNA8iEwj__WuQQVyFr71FqyCeZH1fZiewdeZWPdLl92z7DDekWvXct0te7XO4jcJjiXavQmy5yp8ZIePqjGqt6fbbDSE9ikoV1Z0547nohwVSoOH7I1Od8wIVEEAQtwB4d-Jw00kqXNXly4YV5ipxy9ysf0MelFLvQdYE5DTH3J5ZYn67f6ESBDUHK5nCOTg6k',
  },
];

const TOPICS = [
  { emoji: '🌱', label: 'Crop Care',      color: 'bg-[#e5f9e2] text-[#006e1c]' },
  { emoji: '🐛', label: 'Pest & Disease', color: 'bg-[#fff3e0] text-[#774c00]' },
  { emoji: '💧', label: 'Irrigation',     color: 'bg-[#e3f2fd] text-[#004a77]' },
  { emoji: '🌾', label: 'Soil & Fertilizer', color: 'bg-[#fce4ec] text-[#880e4f]' },
  { emoji: '🌦', label: 'Weather',        color: 'bg-[#e8eaf6] text-[#283593]' },
  { emoji: '💰', label: 'Market & Yield', color: 'bg-[#e0f2f1] text-[#004d40]' },
  { emoji: '📦', label: 'Post-Harvest',   color: 'bg-[#f3e5f5] text-[#4a148c]' },
  { emoji: '♻️', label: 'Crop Residue',   color: 'bg-[#e8f5e9] text-[#1b5e20]' },
  { emoji: '🚜', label: 'Machinery',      color: 'bg-[#fbe9e7] text-[#bf360c]' },
  { emoji: '🏦', label: 'Govt Schemes',   color: 'bg-[#e3f2fd] text-[#0d47a1]' },
];

/* ─── Shared sub-components ────────────────────────────────── */

/** Compact pill for content type */
function TypeBadge({ type }) {
  const MAP = {
    VIDEO:   { icon: 'play_circle',  label: 'Video',   cls: 'bg-primary/10 text-primary' },
    ARTICLE: { icon: 'article',      label: 'Article',  cls: 'bg-[#e3f2fd] text-[#004a77]' },
    TIP:     { icon: 'lightbulb',    label: 'Tip',      cls: 'bg-[#fff3e0] text-[#774c00]' },
    GUIDE:   { icon: 'menu_book',    label: 'Guide',    cls: 'bg-[#f3e5f5] text-[#4a148c]' },
  };
  const m = MAP[type] || MAP.VIDEO;
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wide ${m.cls}`}>
      <span className="material-symbols-outlined text-[11px]" style={{ fontVariationSettings: "'FILL' 1" }}>{m.icon}</span>
      {m.label}
    </span>
  );
}

/** Bookmark toggle button */
function BookmarkBtn({ saved, onToggle }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
      className="w-8 h-8 rounded-full border-none cursor-pointer flex items-center justify-center transition-colors bg-surface-containerLow hover:bg-primary/10"
      aria-label={saved ? 'Remove from saved' : 'Save for later'}
    >
      <span
        className={`material-symbols-outlined text-[18px] ${saved ? 'text-primary' : 'text-onSurface-variant'}`}
        style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}
      >
        bookmark
      </span>
    </button>
  );
}

/** Horizontal content card (Recommended style) */
function ContentCardH({ item, onSelect, onToggleSave }) {
  return (
    <div
      onClick={() => onSelect(item.id)}
      className="snap-start min-w-[230px] md:min-w-0 bg-surface-containerLowest rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,31,17,0.04)] flex flex-col group cursor-pointer border border-[#bfcaba]/15 hover:shadow-[0_6px_24px_rgba(15,31,17,0.08)] transition-shadow"
    >
      <div className="h-[110px] bg-surface-variant relative overflow-hidden shrink-0">
        <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
        {/* play overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </div>
        </div>
        {/* duration */}
        <div className="absolute bottom-2 right-2 bg-onSurface/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-white font-label text-[10px] font-bold">{item.duration}</div>
        {/* type badge */}
        <div className="absolute top-2 left-2"><TypeBadge type={item.type} /></div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <span className="font-label text-[10px] uppercase tracking-widest text-[#006e1c] font-bold mb-1 block">{item.topic}</span>
          <h3 className="font-headline font-bold text-onSurface text-[13px] leading-tight mb-0 m-0 line-clamp-2">{item.title}</h3>
        </div>
        <div className="flex items-center justify-between mt-2.5">
          <span className="font-label text-[10px] text-onSurface-variant bg-surface-containerLow px-2 py-0.5 rounded-md">{item.level}</span>
          <BookmarkBtn saved={item.saved} onToggle={() => onToggleSave(item.id)} />
        </div>
      </div>
    </div>
  );
}

/** Vertical thumbnail card (Quick Learning style) */
function ContentCardV({ item, onSelect, onToggleSave }) {
  return (
    <div onClick={() => onSelect(item.id)} className="flex flex-col gap-2 group cursor-pointer">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-variant">
        <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
          <div className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-onSurface/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-white font-label text-[10px] font-bold">{item.duration}</div>
        <div className="absolute top-2 left-2"><TypeBadge type={item.type} /></div>
      </div>
      <div className="flex items-start justify-between gap-1">
        <div className="flex-1 min-w-0">
          <span className="font-label text-[10px] uppercase tracking-wider text-[#006e1c] font-bold block mb-0.5">{item.topic}</span>
          <h4 className="font-headline font-semibold text-onSurface text-[13px] leading-tight line-clamp-2 mb-0.5 group-hover:text-primary transition-colors m-0">{item.title}</h4>
          <span className="font-label text-[11px] text-onSurface-variant">{item.level}</span>
        </div>
        <BookmarkBtn saved={item.saved} onToggle={() => onToggleSave(item.id)} />
      </div>
    </div>
  );
}

/** Continue watching card — shows video progress only, NOT course progress */
function ContinueWatchingCard({ item, onSelect }) {
  return (
    <div
      onClick={() => onSelect(item.id)}
      className="snap-start min-w-[280px] md:min-w-0 bg-surface-containerLowest rounded-2xl overflow-hidden border border-[#bfcaba]/15 shadow-[0_4px_20px_rgba(15,31,17,0.04)] flex flex-col group cursor-pointer hover:shadow-[0_8px_28px_rgba(15,31,17,0.08)] transition-all"
    >
      <div className="h-[145px] sm:h-[160px] relative overflow-hidden shrink-0 bg-surface-container">
        <img alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={item.img} />
        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white shadow-sm group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </div>
        </div>
        {/* video progress bar — not course progress */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black/35">
          <div className="h-full bg-[#4CAF50] transition-all" style={{ width: `${item.watched}%` }} />
        </div>
      </div>
      <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span className="font-label text-[11px] uppercase tracking-wider text-[#006e1c] font-bold block mb-0.5">{item.topic}</span>
          <h4 className="font-headline font-bold text-[14px] text-onSurface leading-snug m-0 line-clamp-1">{item.title}</h4>
          <p className="text-[12px] text-onSurface-variant mt-0.5 m-0 font-medium">{item.watched}% watched</p>
        </div>
        <button
          onClick={e => { e.stopPropagation(); }}
          className="shrink-0 h-9 px-4 rounded-full bg-gradient-to-b from-primary to-primary-container text-white font-label text-[12px] font-semibold shadow-sm border-none cursor-pointer active:scale-95 hover:opacity-95 transition-opacity"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   DASHBOARD VIEW
───────────────────────────────────────────────────────────── */
const DashboardView = ({ onVideoSelect, searchQuery, setSearchQuery, content, onToggleSave }) => {
  const continueItems = content.filter(c => c.watched > 0 && c.watched < 100);
  const recommended   = content.filter(c => c.watched === 0).slice(0, 4);
  const quickLearning = content.slice(0, 8);

  return (
    <div className="px-4 py-4 flex flex-col gap-7 w-full max-w-full overflow-hidden">

      {/* ── SEARCH ── */}
      <div className="relative flex items-center">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-onSurface-variant">search</span>
          </div>
          <input
            className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-surface-containerHigh border-none text-onSurface focus:ring-2 focus:ring-primary font-body placeholder-onSurface-variant/70 shadow-sm transition-shadow duration-200 focus:shadow-md outline-none"
            placeholder="Search lessons, crops, pests..."
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button
            className="absolute inset-y-0 right-0 pr-4 flex items-center bg-transparent border-none cursor-pointer text-primary hover:text-[#006e1c] transition-colors"
            onClick={() => {
              if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
                const rec = new SR();
                rec.lang = 'hi-IN';
                rec.onresult = e => setSearchQuery(e.results[0][0].transcript);
                rec.start();
              }
            }}
          >
            <span className="material-symbols-outlined text-[20px]">mic</span>
          </button>
        </div>
      </div>

      {/* ── TODAY'S ADVICE ── */}
      <section>
        <h2 className="font-headline text-[1.15rem] font-bold text-onSurface mb-3 mt-0">Today's Advice</h2>
        <div className="bg-surface-containerLowest rounded-2xl p-5 shadow-[0_4px_20px_rgba(15,31,17,0.04)] relative overflow-hidden border border-[#bfcaba]/20">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-[#ffddb5] to-transparent opacity-20 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-11 h-11 rounded-full bg-[#ffddb5]/40 flex items-center justify-center shrink-0 text-tertiary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <div className="flex-1">
              <h3 className="font-headline font-bold text-onSurface text-[16px] leading-tight mb-1.5 mt-0">
                High humidity today — watch for fungal diseases
              </h3>
              <p className="font-body text-onSurface-variant text-[13px] mb-3.5 leading-relaxed mt-0">
                Your current weather conditions may increase fungal risk on wheat and mustard. Early application of protective fungicides recommended.
              </p>
              <button
                onClick={() => onVideoSelect('wheat-blast')}
                className="h-9 px-4 border-none cursor-pointer rounded-full bg-gradient-to-b from-primary to-primary-container text-white font-label text-[12px] font-semibold uppercase tracking-wide shadow-[0_4px_12px_rgba(13,99,27,0.2)] hover:shadow-[0_6px_16px_rgba(13,99,27,0.3)] transition-all flex items-center gap-1.5 w-fit"
              >
                <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTINUE WATCHING  (video progress, not course completion) ── */}
      {continueItems.length > 0 && (
        <section>
          <h2 className="font-headline text-[1.15rem] font-bold text-onSurface mb-3 mt-0">Continue Watching</h2>
          <div className="flex gap-3.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-x-visible md:pb-0">
            {continueItems.map(item => (
              <ContinueWatchingCard key={item.id} item={item} onSelect={onVideoSelect} />
            ))}
          </div>
        </section>
      )}

      {/* ── RECOMMENDED FOR YOU ── */}
      <section>
        <div className="flex justify-between items-end mb-3">
          <div>
            <h2 className="font-headline text-[1.15rem] font-bold text-onSurface m-0">Recommended for You</h2>
            <p className="text-[12px] text-onSurface-variant m-0 mt-0.5">Because you're growing Wheat &amp; Mustard</p>
          </div>
          <button className="font-label text-primary font-semibold text-[13px] bg-transparent border-none p-0 cursor-pointer shrink-0">View All</button>
        </div>
        <div className="flex gap-3.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-3 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-x-visible md:pb-0 lg:grid-cols-4">
          {recommended.map(item => (
            <ContentCardH key={item.id} item={item} onSelect={onVideoSelect} onToggleSave={onToggleSave} />
          ))}
        </div>
      </section>

      {/* ── EXPLORE TOPICS ── */}
      <section>
        <h2 className="font-headline text-[1.15rem] font-bold text-onSurface mb-3 mt-0">Explore Topics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {TOPICS.map(t => (
            <button
              key={t.label}
              className="bg-surface-containerLowest border border-[#bfcaba]/15 p-3.5 rounded-2xl shadow-[0_2px_10px_rgba(15,31,17,0.02)] flex items-center gap-2.5 active:scale-95 transition-transform cursor-pointer hover:shadow-[0_4px_16px_rgba(15,31,17,0.06)] text-left"
            >
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-[18px] shrink-0 ${t.color}`}>{t.emoji}</span>
              <span className="font-headline font-semibold text-onSurface text-[13px] leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── QUICK LEARNING ── */}
      <section className="pb-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-headline text-[1.15rem] font-bold text-onSurface m-0">Quick Learning</h2>
          <span className="text-[12px] text-onSurface-variant">Pick anything you want</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
          {quickLearning.map(item => (
            <ContentCardV key={item.id} item={item} onSelect={onVideoSelect} onToggleSave={onToggleSave} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button className="h-11 px-6 rounded-full border border-outline-variant/30 text-primary font-label text-[13px] font-semibold hover:bg-primary/5 transition-colors flex items-center gap-2 bg-transparent cursor-pointer">
            Load More
            <span className="material-symbols-outlined text-sm">expand_more</span>
          </button>
        </div>
      </section>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   VIDEO VIEW  (unchanged structure, minor copy tweaks)
───────────────────────────────────────────────────────────── */
const VideoView = ({ video, content, onToggleSave, onVideoSelect }) => {
  const item = content.find(c => c.id === video) || content[0];
  const related = content.filter(c => c.id !== item?.id && c.topic === item?.topic).slice(0, 4);

  return (
    <div className="flex flex-col w-full pb-8">
      {/* VIDEO PLAYER */}
      <section className="w-full relative bg-black aspect-video overflow-hidden group rounded-b-xl shadow-md">
        <img alt={item?.title} className="w-full h-full object-cover" src={item?.img} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f11]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center justify-center absolute inset-0">
            <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer">
              <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
            </button>
          </div>
          <div className="relative z-10 w-full">
            <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden mb-3">
              <div className="h-full bg-[#88d982] w-1/3 rounded-full relative">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-md" />
              </div>
            </div>
            <div className="flex items-center justify-between text-white text-xs font-label font-medium tracking-wide">
              <span>02:14 / {item?.duration}</span>
              <div className="flex items-center gap-3">
                <button className="bg-transparent border-none text-white cursor-pointer"><span className="material-symbols-outlined text-[16px]">closed_caption</span></button>
                <button className="bg-transparent border-none text-white cursor-pointer"><span className="material-symbols-outlined text-[16px]">settings</span></button>
                <button className="bg-transparent border-none text-white cursor-pointer"><span className="material-symbols-outlined text-[16px]">fullscreen</span></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4 mt-5 flex flex-col gap-5 w-full">
        {/* VIDEO INFO */}
        <section className="flex flex-col gap-1.5">
          <div className="flex items-start justify-between gap-3">
            <h1 className="font-headline text-xl font-bold text-onSurface leading-tight m-0">{item?.title}</h1>
            <TypeBadge type={item?.type || 'VIDEO'} />
          </div>
          <div className="flex items-center gap-3 text-onSurface-variant text-xs font-medium font-body mt-1">
            <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> {item?.duration}</span>
            <span className="w-1 h-1 bg-outline-variant rounded-full" />
            <span>{item?.level}</span>
            <span className="w-1 h-1 bg-outline-variant rounded-full" />
            <span className="font-bold text-[#006e1c]">{item?.topic}</span>
          </div>
        </section>

        {/* ACTIONS */}
        <section className="flex gap-3">
          <button
            onClick={async () => {
              const shareData = {
                title: item?.title ? `${item.title} — FarmIt` : 'FarmIt Learning',
                text: `Learn about "${item?.title || 'Farming'}" on FarmIt — Smart Agriculture Platform.`,
                url: window.location.href,
              };
              if (navigator.share) {
                try {
                  await navigator.share(shareData);
                } catch (err) {
                  if (err.name !== 'AbortError') console.error('Share error:', err);
                }
              } else if (navigator.clipboard) {
                try {
                  await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
                  alert('Video link copied to clipboard!');
                } catch (err) {
                  console.error('Clipboard error:', err);
                }
              }
            }}
            className="flex-1 h-11 bg-primary text-white border-none rounded-xl font-label text-[13px] font-semibold shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share
          </button>
          <button
            onClick={() => onToggleSave(item?.id)}
            className="flex-1 h-11 border border-primary text-primary bg-transparent rounded-xl font-label text-[13px] font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: item?.saved ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
            {item?.saved ? 'Saved' : 'Save'}
          </button>
        </section>

        {/* KEY POINTS */}
        <section className="bg-surface-containerLowest p-4 rounded-xl shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10">
          <h2 className="font-headline text-[15px] font-bold text-onSurface mb-3 flex items-center gap-2 m-0">
            <span className="material-symbols-outlined text-[#006e1c] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
            Key Points
          </h2>
          <ul className="flex flex-col gap-3 font-body text-onSurface-variant text-[13px] p-0 m-0 list-none">
            {['Identify bleached spikelets on green heads.', 'Apply fungicides early during heading stage.', 'Avoid excessive nitrogen application.'].map(p => (
              <li key={p} className="flex items-start gap-2.5">
                <span className="material-symbols-outlined text-primary shrink-0 mt-[2px] text-[16px]">check_circle</span>
                <span className="leading-tight font-medium">{p}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* OPTIONAL QUIZ */}
        <section className="bg-[#e5f9e2] p-4 rounded-xl border border-[#bfcaba]/20 flex items-center justify-between gap-3">
          <div>
            <p className="font-headline text-[14px] font-bold text-[#006e1c] m-0">Want to test your knowledge?</p>
            <p className="text-[12px] text-onSurface-variant m-0 mt-0.5">Completely optional — just for fun.</p>
          </div>
          <button className="shrink-0 h-9 px-4 rounded-full border border-primary/30 text-primary bg-white font-label text-[12px] font-semibold cursor-pointer hover:bg-primary/5 transition-colors">
            Take Quiz
          </button>
        </section>

        {/* ASK A QUESTION */}
        <section className="bg-surface-containerLow p-4 rounded-xl border border-[#bfcaba]/10">
          <h3 className="font-headline text-[14px] font-bold text-onSurface mb-2.5 m-0">Ask a Question</h3>
          <div className="relative flex items-center bg-surface-containerHighest rounded-full pr-1 shadow-inner border border-transparent focus-within:border-primary/30 transition-colors">
            <input className="w-full bg-transparent border-none py-3 pl-4 pr-12 text-[13px] font-body text-onSurface placeholder:text-onSurface-variant outline-none" placeholder="Have a question about this topic?" type="text" />
            <button className="absolute right-1 w-[34px] h-[34px] bg-primary text-white border-none rounded-full flex items-center justify-center hover:bg-primary-container transition-colors cursor-pointer shrink-0 shadow-sm active:scale-95">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
            </button>
          </div>
        </section>

        {/* RELATED CONTENT */}
        {related.length > 0 && (
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-[16px] font-bold text-onSurface m-0">More on {item?.topic}</h3>
              <button className="text-primary text-[12px] font-label font-bold bg-transparent border-none cursor-pointer uppercase tracking-wider">View All</button>
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {related.slice(0, 4).map(r => (
                <ContentCardV key={r.id} item={r} onSelect={onVideoSelect} onToggleSave={onToggleSave} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   ACTIVITY VIEW  (renamed from "Progress" — no academic feel)
───────────────────────────────────────────────────────────── */
const ActivityView = ({ onResume, content, onToggleSave, onVideoSelect }) => {
  const saved        = content.filter(c => c.saved);
  const recentlyWatched = content.filter(c => c.watched > 0);
  const continueItems   = content.filter(c => c.watched > 0 && c.watched < 100);

  return (
    <div className="px-4 py-4 flex flex-col gap-5 w-full pb-8">
      {/* HEADER */}
      <section className="flex flex-col gap-1 pt-2">
        <h2 className="text-[22px] font-headline font-bold text-primary tracking-tight m-0">Your Activity</h2>
        <p className="text-onSurface-variant font-body text-[14px] m-0">Everything you've watched and saved</p>
      </section>

      {/* STATS — simple, non-academic */}
      <section className="grid grid-cols-3 gap-3">
        <div className="bg-surface-containerLowest rounded-xl p-3 flex flex-col gap-1.5 border border-[#bfcaba]/15 shadow-[0_2px_12px_rgba(15,31,17,0.02)] items-center text-center">
          <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
          <p className="text-[20px] font-headline font-bold text-onSurface m-0">{recentlyWatched.length}</p>
          <p className="text-[10px] text-onSurface-variant font-medium m-0 uppercase tracking-wide">Watched</p>
        </div>
        <div className="bg-surface-containerLowest rounded-xl p-3 flex flex-col gap-1.5 border border-[#bfcaba]/15 shadow-[0_2px_12px_rgba(15,31,17,0.02)] items-center text-center">
          <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
          <p className="text-[20px] font-headline font-bold text-onSurface m-0">{saved.length}</p>
          <p className="text-[10px] text-onSurface-variant font-medium m-0 uppercase tracking-wide">Saved</p>
        </div>
        <div className="bg-surface-containerLowest rounded-xl p-3 flex flex-col gap-1.5 border border-[#bfcaba]/15 shadow-[0_2px_12px_rgba(15,31,17,0.02)] items-center text-center">
          <span className="material-symbols-outlined text-primary text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
          <p className="text-[18px] font-headline font-bold text-onSurface m-0">24h</p>
          <p className="text-[10px] text-onSurface-variant font-medium m-0 uppercase tracking-wide">Total</p>
        </div>
      </section>

      {/* WEEKLY ACTIVITY GRAPH */}
      <section className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="font-headline font-bold text-[17px] text-onSurface m-0">This Week</h3>
          <span className="text-[11px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">+12%</span>
        </div>
        <div className="bg-surface-containerLowest rounded-xl p-4 shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10 flex">
          <div className="flex flex-col justify-between items-end text-[10px] text-onSurface-variant font-medium pr-3 h-[120px] shrink-0 border-r border-[#bfcaba]/20 pb-[20px]">
            <span>60m</span><span>30m</span><span>0m</span>
          </div>
          <div className="flex-1 flex justify-between items-end h-[120px] pl-2 relative">
            <div className="absolute left-2 right-0 top-0 border-t border-dashed border-[#bfcaba]/20" />
            <div className="absolute left-2 right-0 top-[50px] border-t border-dashed border-[#bfcaba]/20" />
            <div className="absolute left-2 right-0 bottom-[20px] border-t border-[#bfcaba]/20" />
            {[{ day: 'Mon', val: '20m', h: 'h-[33%]' }, { day: 'Tue', val: '30m', h: 'h-[50%]' }, { day: 'Wed', val: '45m', h: 'h-[75%]' }, { day: 'Thu', val: '60m', h: 'h-full', isToday: true }, { day: 'Fri', val: '40m', h: 'h-[66%]' }, { day: 'Sat', val: '15m', h: 'h-[25%]' }, { day: 'Sun', val: '20m', h: 'h-[33%]' }].map(d => (
              <div key={d.day} className="flex flex-col items-center w-full h-full relative z-10 group cursor-pointer">
                <div className="flex flex-col justify-end items-center h-[calc(100%-20px)] w-full">
                  <span className="text-[9px] font-bold text-onSurface-variant mb-1">{d.val}</span>
                  <div className={`w-3.5 rounded-t-[3px] transition-all group-hover:w-4 ${d.isToday ? 'bg-primary shadow-sm' : 'bg-primary/20 hover:bg-primary/40'} ${d.h}`} />
                </div>
                <span className={`h-[20px] flex items-end text-[10px] font-semibold tracking-wide ${d.isToday ? 'text-primary' : 'text-onSurface-variant'}`}>{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTINUE WATCHING */}
      {continueItems.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="font-headline font-bold text-[17px] text-onSurface m-0">Continue Watching</h3>
          {continueItems.map(item => (
            <ContinueWatchingCard key={item.id} item={item} onSelect={onVideoSelect} />
          ))}
        </section>
      )}

      {/* RECENTLY WATCHED */}
      {recentlyWatched.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="font-headline font-bold text-[17px] text-onSurface m-0">Recently Watched</h3>
          <div className="flex flex-col gap-2">
            {recentlyWatched.map(item => (
              <button
                key={item.id}
                onClick={() => onVideoSelect(item.id)}
                className="w-full flex items-center gap-3 p-3 bg-surface-containerLowest rounded-xl border border-[#bfcaba]/15 cursor-pointer hover:bg-surface-containerLow transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-headline font-semibold text-[13px] text-onSurface m-0 line-clamp-1">{item.title}</p>
                  <p className="text-[11px] text-onSurface-variant m-0 mt-0.5">{item.topic} · {item.duration}</p>
                </div>
                <span className="material-symbols-outlined text-onSurface-variant text-[18px] shrink-0">play_circle</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* SAVED */}
      <section className="flex flex-col gap-3">
        <h3 className="font-headline font-bold text-[17px] text-onSurface m-0">
          <span className="material-symbols-outlined text-[18px] mr-1.5 align-middle text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
          My Saved
        </h3>
        {saved.length === 0 ? (
          <div className="bg-surface-containerLowest rounded-xl p-5 border border-[#bfcaba]/15 text-center">
            <p className="text-onSurface-variant text-[14px] m-0">Nothing saved yet. Tap 🔖 on any content to save it here.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {saved.map(item => (
              <button
                key={item.id}
                onClick={() => onVideoSelect(item.id)}
                className="w-full flex items-center gap-3 p-3 bg-surface-containerLowest rounded-xl border border-[#bfcaba]/15 cursor-pointer hover:bg-surface-containerLow transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-headline font-semibold text-[13px] text-onSurface m-0 line-clamp-1">{item.title}</p>
                  <p className="text-[11px] text-onSurface-variant m-0 mt-0.5">{item.topic} · {item.level}</p>
                </div>
                <BookmarkBtn saved={true} onToggle={() => {}} />
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
   COMMUNITY VIEW  (preserved, no changes to its structure)
───────────────────────────────────────────────────────────── */
const CommunityView = () => (
  <div className="px-4 py-4 flex flex-col gap-5 w-full pb-8">
    <div className="flex justify-between items-center pt-2 px-1">
      <h2 className="font-headline text-[22px] font-bold text-onSurface tracking-tight m-0">Community</h2>
      <div className="flex items-center gap-1.5 bg-surface-containerHigh px-2.5 py-1.5 rounded-full shadow-sm border border-[#bfcaba]/20 cursor-pointer">
        <span className="material-symbols-outlined text-primary text-[16px]">language</span>
        <span className="font-label text-[12px] font-bold text-primary">Hindi</span>
      </div>
    </div>

    {/* ASK */}
    <section className="bg-surface-containerLowest p-3 rounded-2xl shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-container text-[#cbffc2] flex items-center justify-center font-headline font-bold shrink-0">RK</div>
        <div className="flex-1 bg-surface-containerHigh rounded-full px-4 py-2.5 cursor-pointer hover:bg-surface-containerHighest transition-colors">
          <span className="text-onSurface-variant text-[14px] font-body">Ask your farming question...</span>
        </div>
      </div>
      <div className="flex justify-between items-center pl-12 pr-2">
        <div className="flex gap-2">
          <button className="text-onSurface-variant hover:text-primary transition-colors p-1.5 bg-surface-containerLow rounded-full border-none cursor-pointer flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">add_a_photo</span></button>
          <button className="text-onSurface-variant hover:text-primary transition-colors p-1.5 bg-surface-containerLow rounded-full border-none cursor-pointer flex items-center justify-center"><span className="material-symbols-outlined text-[18px]">mic</span></button>
        </div>
        <button className="bg-primary text-white border-none font-label uppercase font-bold text-[12px] tracking-wide px-5 py-1.5 rounded-full hover:bg-[#006e1c] transition-colors cursor-pointer shadow-sm">Post</button>
      </div>
    </section>

    {/* FILTERS */}
    <section className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 pb-1">
      {['All', 'Crops', 'Pest & Disease', 'Soil', 'Irrigation', 'Market', 'Weather', 'Govt Schemes'].map((filter, i) => (
        <button key={filter} className={`shrink-0 px-4 py-1.5 rounded-full border-none font-label text-[12px] font-semibold cursor-pointer transition-colors shadow-sm ${i === 0 ? 'bg-[#0f1f11] text-surface' : 'bg-surface-containerLow text-onSurface-variant hover:bg-surface-containerHigh border border-[#bfcaba]/10'}`}>
          {filter}
        </button>
      ))}
    </section>

    {/* TRENDING TIPS */}
    <section className="flex flex-col gap-3 mt-1">
      <div className="flex items-center gap-2 px-1">
        <span className="material-symbols-outlined text-[#ffb957] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
        <h3 className="font-headline text-[15px] font-bold text-onSurface m-0">Trending Tips</h3>
      </div>
      <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 snap-x snap-mandatory pb-2">
        {[
          { text: 'Protect wheat from late blight using minimal chemical spray', views: '1.2k', by: 'Agronomist Priya' },
          { text: 'Current mandi rates for early sown mustard crops', views: '856', by: 'Market Expert' },
          { text: 'Best time to apply urea before rain', views: '650', by: 'Soil Scientist' },
        ].map((tip, i) => (
          <div key={i} className="min-w-[200px] max-w-[200px] snap-start shrink-0 bg-surface-containerLow rounded-xl p-3 shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10 flex flex-col gap-2">
            <p className="font-headline font-bold text-[13px] text-onSurface line-clamp-2 leading-tight m-0">{tip.text}</p>
            <p className="text-[10px] text-onSurface-variant font-medium m-0">{tip.views} views · {tip.by}</p>
          </div>
        ))}
      </div>
    </section>

    {/* DISCUSSIONS */}
    <section className="flex flex-col gap-3 mt-2">
      <h3 className="font-headline text-[17px] font-bold text-onSurface px-1 m-0">Discussions</h3>
      {[
        { initials: 'SS', bg: 'bg-[#91f78e] text-[#00731e]', name: 'Sandeep S.', loc: 'Karnal', time: '2 hrs ago', question: 'Yellowing leaves in early paddy stage?', body: "I noticed my paddy crop leaves turning slightly yellow at the edges. I haven't applied fertilizer yet. Should I wait for rain?", tags: ['PADDY', 'SOIL'], answer: 'This looks like zinc deficiency, common in our area\'s soil. Apply zinc sulphate at 10kg/acre mixed with dry soil or sand.', likes: 24, comments: 8 },
        { initials: 'MK', bg: 'bg-[#986200] text-[#ffeede]', name: 'Manoj K.', loc: 'Kurukshetra', time: '5 hrs ago', question: 'Best time to apply urea for upcoming rain?', body: 'The weather app shows heavy rain expected tomorrow. I was planning to apply my first round of urea today.', tags: ['WHEAT', 'FERTILIZER'], answer: 'Do not apply urea before heavy rain, it will wash away. Wait until the rain passes and the field is semi-dry.', likes: 45, comments: 12 },
      ].map((d, i) => (
        <div key={i} className="bg-surface-containerLowest p-4 rounded-xl shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10 flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <div className={`w-10 h-10 rounded-full ${d.bg} flex items-center justify-center font-headline font-bold text-[14px] shrink-0`}>{d.initials}</div>
            <div>
              <h4 className="font-headline font-bold text-[15px] text-onSurface leading-tight m-0">{d.question}</h4>
              <p className="text-onSurface-variant text-[11px] mt-0.5 m-0 font-medium">{d.name} · {d.loc} · {d.time}</p>
            </div>
          </div>
          <p className="font-body text-[13px] text-onSurface-variant line-clamp-2 m-0 leading-relaxed">{d.body}</p>
          <div className="flex gap-2">
            {d.tags.map(t => <span key={t} className="bg-surface-containerHigh text-onSurface-variant text-[10px] px-2 py-0.5 rounded-sm font-semibold tracking-wide">{t}</span>)}
          </div>
          <div className="bg-surface-containerLow p-3 rounded-lg border border-[#bfcaba]/10 flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#006e1c] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <span className="font-label text-[10px] font-bold text-[#006e1c] uppercase tracking-wider">Top Answer</span>
            </div>
            <p className="font-body text-[12px] text-onSurface line-clamp-2 m-0 leading-relaxed">{d.answer}</p>
          </div>
          <div className="flex justify-between items-center border-t border-[#bfcaba]/20 pt-3">
            <div className="flex gap-4">
              <button className="flex items-center gap-1.5 text-onSurface-variant hover:text-primary transition-colors text-[12px] font-medium bg-transparent border-none cursor-pointer p-0">
                <span className="material-symbols-outlined text-[16px]">thumb_up</span> {d.likes}
              </button>
              <button className="flex items-center gap-1.5 text-onSurface-variant hover:text-primary transition-colors text-[12px] font-medium bg-transparent border-none cursor-pointer p-0">
                <span className="material-symbols-outlined text-[16px]">chat_bubble</span> {d.comments}
              </button>
            </div>
            <button className="text-primary font-label text-[12px] font-bold bg-transparent border-none cursor-pointer p-0 hover:underline">
              View Discussion →
            </button>
          </div>
        </div>
      ))}
    </section>
  </div>
);

/* ─────────────────────────────────────────────────────────────
   MAIN SCREEN
───────────────────────────────────────────────────────────── */
export default function LearningScreen() {
  const isMobile = useIsMobile();
  const [currentView, setCurrentView]   = useState('dashboard');
  const [previousView, setPreviousView] = useState('dashboard');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [searchQuery, setSearchQuery]   = useState('');
  const [content, setContent]           = useState(CONTENT);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [currentView, selectedVideo]);

  const handleVideoSelect = (video) => {
    setPreviousView(currentView);
    setSelectedVideo(video);
    setCurrentView('video');
  };

  const handleToggleSave = (id) => {
    setContent(prev => prev.map(c => c.id === id ? { ...c, saved: !c.saved } : c));
  };

  const TABS = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'activity',  label: 'Activity'  },
    { id: 'community', label: 'Community' },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface-light">
      {isMobile && (
        <AppTopBar
          title="Learning Hub"
          showBack={true}
          onBack={currentView === 'video' ? () => setCurrentView(previousView) : undefined}
          showNotification={true}
        />
      )}

      <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden relative z-0 pb-[80px]">
        {/* TAB BAR — hidden during video view */}
        {currentView !== 'video' && (
          <div className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-4 py-2 flex gap-2 overflow-x-auto border-b border-[#bfcaba]/20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`px-5 py-2 rounded-full border-none cursor-pointer text-[13px] font-label font-bold whitespace-nowrap transition-colors shadow-sm ${currentView === tab.id ? 'bg-primary text-white' : 'bg-surface-containerHigh text-onSurface-variant hover:bg-surface-containerHighest'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}

        {currentView === 'dashboard' && (
          <DashboardView
            onVideoSelect={handleVideoSelect}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            content={content}
            onToggleSave={handleToggleSave}
          />
        )}
        {currentView === 'video' && (
          <VideoView
            video={selectedVideo}
            content={content}
            onToggleSave={handleToggleSave}
            onVideoSelect={handleVideoSelect}
          />
        )}
        {currentView === 'activity' && (
          <ActivityView
            onResume={() => { setPreviousView('activity'); setCurrentView('video'); }}
            content={content}
            onToggleSave={handleToggleSave}
            onVideoSelect={handleVideoSelect}
          />
        )}
        {currentView === 'community' && <CommunityView />}
      </div>
    </div>
  );
}