import React, { useState, useEffect, useRef } from 'react';
import AppTopBar from '../../components/common/AppTopBar';
import BottomTabs from '../../components/layout/BottomTabs';
import FloatingAIButton from '../../components/ai/FloatingAIButton';
import { useIsMobile } from '../../hooks/useMediaQuery';

const DashboardView = ({ onVideoSelect, searchQuery, setSearchQuery }) => (
    <div className="px-4 py-4 flex flex-col gap-6 w-full max-w-full overflow-hidden">
        <div className="relative flex items-center gap-2">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-onSurface-variant">search</span>
                </div>
                <input 
                    className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-surface-containerHigh border-none text-onSurface focus:ring-2 focus:ring-primary font-body placeholder-onSurface-variant/70 shadow-sm transition-shadow duration-200 focus:shadow-md outline-none" 
                    placeholder="Search lessons, crops, pests..." 
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                    className="absolute inset-y-0 right-0 pr-4 flex items-center bg-transparent border-none cursor-pointer text-primary hover:text-[#006e1c] transition-colors"
                    onClick={() => {
                        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                            const recognition = new SpeechRecognition();
                            recognition.lang = 'hi-IN';
                            recognition.continuous = false;
                            recognition.interimResults = false;
                            recognition.onresult = (event) => {
                                const transcript = event.results[0][0].transcript;
                                setSearchQuery(transcript);
                            };
                            recognition.start();
                        } else {
                            alert('Voice search is not supported in this browser.');
                        }
                    }}
                >
                    <span className="material-symbols-outlined text-[20px]">mic</span>
                </button>
            </div>
        </div>
        
        <section>
            <h2 className="font-headline text-[1.25rem] font-bold text-onSurface mb-4 mt-0">Today's Advice</h2>
            <div className="bg-surface-containerLowest rounded-2xl p-5 shadow-[0_8px_32px_rgba(15,31,17,0.04)] relative overflow-hidden group border border-[#bfcaba]/20">
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br from-[#ffddb5] to-transparent opacity-20 rounded-full blur-2xl"></div>
                <div className="flex items-start gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-[#ffddb5]/30 flex items-center justify-center flex-shrink-0 text-tertiary">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-headline font-bold text-onSurface text-lg leading-tight mb-2 mt-0">High humidity today — watch for fungal prevention</h3>
                        <p className="font-body text-onSurface-variant text-sm mb-4 leading-relaxed mt-0">Early application of protective fungicides recommended before evening dew sets in.</p>
                        <button onClick={() => onVideoSelect('wheat-blast')} className="h-10 px-5 border-none cursor-pointer rounded-full bg-gradient-to-b from-primary to-primary-container text-white font-label text-sm font-medium uppercase tracking-wider shadow-[0_4px_12px_rgba(13,99,27,0.2)] hover:shadow-[0_6px_16px_rgba(13,99,27,0.3)] transition-all flex items-center gap-2 w-fit">
                            Watch Now
                            <span className="material-symbols-outlined text-sm">play_arrow</span>
                        </button>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <div className="flex justify-between items-end mb-3">
                <h2 className="font-headline text-[1.25rem] font-bold text-onSurface m-0">Recommended</h2>
                <button className="font-label text-primary font-medium text-sm bg-transparent border-none p-0 cursor-pointer">View All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-4 snap-x snap-mandatory">
                <div onClick={() => onVideoSelect('wheat-rust')} className="snap-start min-w-[240px] bg-surface-containerLowest rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,31,17,0.03)] flex flex-col group cursor-pointer border border-[#bfcaba]/10">
                    <div className="h-32 bg-surface-variant relative overflow-hidden">
                        <img alt="Wheat" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCksfkNe_WsydKmV7V5mvfVYvGZB7I6PdK_iyuY7R5gqoYJaOvR-7q7M-idZKcq36m5daAaa2T95K2nhRzgD9T-hPxPIu8po-T_Q9LhnGnbAhaSRvgfU0sXHhMPQtSLSaH3z-wJ90yti-f4XQg_-96jkQnGZF-Inpcm4W8NrAeA9nXC6dxSZOl4hXUXYJ3uFuqxhbrnMQWMp_1uoTiWCKKkH6Pje74v6_U5_6i1mUZodmshgjPPOGRjuE8mMfWRtbsW2QUFEU92scY" />
                        <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary text-[14px]">timer</span>
                            <span className="font-label text-xs font-semibold text-primary">05:20</span>
                        </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                            <span className="font-label text-[10px] uppercase tracking-widest text-[#006e1c] font-bold mb-1 block">Wheat</span>
                            <h3 className="font-headline font-bold text-onSurface text-base leading-tight mb-2 m-0">Identifying Early Rust Signs</h3>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <span className="font-label text-xs text-onSurface-variant bg-surface-containerLow px-2 py-1 rounded-md">Beginner</span>
                            <button className="w-8 h-8 border-none cursor-pointer rounded-full bg-surface-containerLow text-primary flex items-center justify-center hover:bg-primary/10 transition-colors">
                                <span className="material-symbols-outlined text-sm">bookmark_add</span>
                            </button>
                        </div>
                    </div>
                </div>
                
                <div onClick={() => onVideoSelect('drip-irrigation')} className="snap-start min-w-[240px] bg-surface-containerLowest rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,31,17,0.03)] flex flex-col group cursor-pointer border border-[#bfcaba]/10">
                    <div className="h-32 bg-surface-variant relative overflow-hidden">
                        <img alt="Drip" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJravlRk2kpHMj3irPukGehMcmWsh0zke8fTOQpmZTaub71BpuDoipaQEGT_PNiW9TardR-NcePivWXS_4oVIf9JUTTJyfWukric_jdPU3L45tqadlxqkO8K9wDAqe1FkWELYafFrXTesuw2zhj7NqVEgR50YdOAynRr4mbKWxPE8Hge8IU1ajvsIUmsK-walwoxhCA5CqxW8ZDvPfpoh3q_LxI9ehwcwETJuXMCeQ4oMkFKLL8XibOZ6NwVallzZ8sDdW__m7lAQ" />
                        <div className="absolute top-3 left-3 bg-surface/90 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                            <span className="material-symbols-outlined text-primary text-[14px]">timer</span>
                            <span className="font-label text-xs font-semibold text-primary">08:45</span>
                        </div>
                    </div>
                    <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                            <span className="font-label text-[10px] uppercase tracking-widest text-[#006e1c] font-bold mb-1 block">General</span>
                            <h3 className="font-headline font-bold text-onSurface text-base leading-tight mb-2 m-0">Optimizing Drip Irrigation</h3>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                            <span className="font-label text-xs text-onSurface-variant bg-surface-containerLow px-2 py-1 rounded-md">Intermediate</span>
                            <button className="w-8 h-8 rounded-full bg-surface-containerLow text-primary flex items-center justify-center hover:bg-primary/10 transition-colors border-none cursor-pointer">
                                <span className="material-symbols-outlined text-sm">bookmark_add</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section>
            <h2 className="font-headline text-[1.25rem] font-bold text-onSurface mb-4 m-0">Explore Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-surface-containerLowest border border-[#bfcaba]/10 p-4 rounded-2xl shadow-[0_2px_12px_rgba(15,31,17,0.02)] flex items-center gap-3 active:scale-95 transition-transform cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-xl">psychiatry</span>
                    </div>
                    <span className="font-headline font-semibold text-onSurface text-sm">Crop Care</span>
                </div>
                <div className="bg-surface-containerLowest border border-[#bfcaba]/10 p-4 rounded-2xl shadow-[0_2px_12px_rgba(15,31,17,0.02)] flex items-center gap-3 active:scale-95 transition-transform cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-xl">bug_report</span>
                    </div>
                    <span className="font-headline font-semibold text-onSurface text-sm leading-tight">Pest &amp; Disease</span>
                </div>
                <div className="bg-surface-containerLowest border border-[#bfcaba]/10 p-4 rounded-2xl shadow-[0_2px_12px_rgba(15,31,17,0.02)] flex items-center gap-3 active:scale-95 transition-transform cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-[#006e1c]/10 flex items-center justify-center text-[#006e1c]">
                        <span className="material-symbols-outlined text-xl">water_drop</span>
                    </div>
                    <span className="font-headline font-semibold text-onSurface text-sm">Irrigation</span>
                </div>
                <div className="bg-surface-containerLowest border border-[#bfcaba]/10 p-4 rounded-2xl shadow-[0_2px_12px_rgba(15,31,17,0.02)] flex items-center gap-3 active:scale-95 transition-transform cursor-pointer">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-xl">monetization_on</span>
                    </div>
                    <span className="font-headline font-semibold text-onSurface text-sm">Market &amp; Yield</span>
                </div>
            </div>
        </section>

        <section>
            <h2 className="font-headline text-[1.25rem] font-bold text-onSurface mb-3 m-0">Quick Learning</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3.5">
                <div onClick={() => onVideoSelect('soil-testing')} className="flex flex-col gap-2 group cursor-pointer">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-variant">
                        <img alt="Soil" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqha6P6UAUKzZaUOkaVlH4V_ddBVYss6WcjdnhO8kS5KcqvMjP9qezCPZsnU4eVduU6QJ_wMXsri9LN5qPkfpH-eL6M8nbTsqX6EtUNhllkQ-2cUVVCbZ0OAIVF5bfHKz69MGiHs7QmKofpbpkRwInKEM6zoy4ehkRgXlzAq4FI-4fthbC4SUp9kKXdWA8WdRnlydR_kLk7JYEGZrfY97an5XEZWhfrYztl5krJqXLMZ06pBBdZ7F-latUeln4zf03UyrfhIjc_PA" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-onSurface/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-white font-label text-[10px] font-bold">03:15</div>
                    </div>
                    <div>
                        <h4 className="font-headline font-semibold text-onSurface text-sm leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors m-0">Basics of Soil Testing</h4>
                        <span className="font-label text-xs text-onSurface-variant">Beginner</span>
                    </div>
                </div>
                <div onClick={() => onVideoSelect('tractor')} className="flex flex-col gap-2 group cursor-pointer">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-variant">
                        <img alt="Tractor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDazqdLjoFYggXYhBGKqOmtp5i6vgZMmlImD1zehYKiLo4XoIophOilwUwSsaWLj9D19wNGCcYFMVsI4y59tyX8t6i6-p5uGHIdRnbiRIqI5n9P-s1dtTmlg6PLJC-eaqQk1PnHvTzwUVWkLfbtuLIpDhZsa2KiR1jJjKwUC1of3YOZdEWCqHJtmXMnyArefoMvHLFdP9YzaMEDUZhaXSth_EGgjiNhvc-4wtgJJ12aQNxo0Rk9YcEthUUa12EwFwa6bA_hzY21n2o" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-onSurface/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-white font-label text-[10px] font-bold">12:40</div>
                    </div>
                    <div>
                        <h4 className="font-headline font-semibold text-onSurface text-sm leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors m-0">Efficient Tractor Operation</h4>
                        <span className="font-label text-xs text-onSurface-variant">Advanced</span>
                    </div>
                </div>
                <div onClick={() => onVideoSelect('maize')} className="flex flex-col gap-2 group cursor-pointer">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-variant">
                        <img alt="Corn" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACRgvTOqexLu7jFWpsVHKNZQWRMnEoAYl-u5cIe4tA_Iaz1R9LXBVW5SMDkOI0ldCsxca5h2VIWMiR_6FisIcBvZkSXwq33bnCxEUEv-aUlOtrn5Xa7Vo2tdLUqUXrFfeq_bDsBC9XgZ4_4PcfRZ6moqF_etgWselgCVHMQi6E5-jKPiMHpypPzFBnDX7fCxVyqD2Rs8ETXVFSPSGGQJ5g-4A9bGYwrGgUWgSz5uLMIDq7n5RbPlfIJ1XQM8QoJQSvFRVA-nm0_5g" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-onSurface/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-white font-label text-[10px] font-bold">04:55</div>
                    </div>
                    <div>
                        <h4 className="font-headline font-semibold text-onSurface text-sm leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors m-0">Maize: Nitrogen Management</h4>
                        <span className="font-label text-xs text-onSurface-variant">Intermediate</span>
                    </div>
                </div>
                <div onClick={() => onVideoSelect('drone')} className="flex flex-col gap-2 group cursor-pointer">
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-variant">
                        <img alt="Drone" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4oI9fjyLVubtfOSNYSOlq4lURhlrB7RwrPpwRoqolrqoBPtmZEZqOhKWTWFjeEZeHD0imYy85bpAO7wTAdTYVxQOcLrcYQlQ9jAPV5YtSTUXwOnSNXoaLoUoOfJmgnt7Po_wXaJP8VWHCUeIbDivAB8e3UHfGNX9vDQkpxyIBGnNSHHR_dg2tWw-KiT-8DpjTi7ZN8lnWlmIXnOm_n49xi_Qk8SjgoIaz8CN9dfeACRhC-Ucuw--shvj-s7PAF_WEl5Erit1Xowo" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                            </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-onSurface/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-white font-label text-[10px] font-bold">06:20</div>
                    </div>
                    <div>
                        <h4 className="font-headline font-semibold text-onSurface text-sm leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors m-0">Intro to Field Mapping</h4>
                        <span className="font-label text-xs text-onSurface-variant">Beginner</span>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-center">
                <button className="h-12 px-6 rounded-full border border-outline-variant/30 text-primary font-label text-sm font-semibold hover:bg-primary/5 transition-colors flex items-center gap-2 bg-transparent cursor-pointer">
                    Load More Videos
                    <span className="material-symbols-outlined text-sm">expand_more</span>
                </button>
            </div>
        </section>
    </div>
);

const VideoView = () => (
    <div className="flex flex-col w-full pb-8">
        {/* 1. VIDEO PLAYER (TOP) */}
        <section className="w-full relative bg-black aspect-video overflow-hidden group rounded-b-xl shadow-md">
            <img alt="Wheat field" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLFrdqJB196qX7eMWH-bQec1hW2UIRgAq62KlyuR6depMYOy8mQZfkKZeY62_WH_a2IM0rCHKgILNVazTy2x2PZr7KHZIjATuNV85jnOKJdFK1PSrshV9jaU-StSQppBRj6Uz9ZJrNeAu4MMH0vE1zL58M7atPBsmPvBynQue0XVxzGg4eE4kJebKtChhsQh5RLLVRcUjti0eatkHNJsE4KjYFpOvrAmoPLzRuVM0kQ1EqnAM0nG5UyJFEP9cPZz65Xe2YSMG-SGM" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f11]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <div className="flex items-center justify-center absolute inset-0">
                    <button className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:scale-105 transition-transform cursor-pointer">
                        <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </button>
                </div>
                <div className="relative z-10 w-full">
                    <div className="h-1 w-full bg-white/30 rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-[#88d982] w-1/3 rounded-full relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-md"></div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between text-white text-xs font-label font-medium tracking-wide">
                        <span>02:14 / 06:45</span>
                        <div className="flex items-center gap-3">
                            <button className="bg-transparent border-none text-white cursor-pointer"><span className="material-symbols-outlined text-[16px]">closed_caption</span></button>
                            <button className="bg-transparent border-none text-white cursor-pointer"><span className="material-symbols-outlined text-[16px]">settings</span></button>
                            <button className="bg-transparent border-none text-white cursor-pointer"><span className="material-symbols-outlined text-[16px]">fullscreen</span></button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div className="px-4 mt-5 flex flex-col gap-6 w-full">
            {/* 2. VIDEO INFO */}
            <section className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-3">
                    <h1 className="font-headline text-xl font-bold text-onSurface leading-tight m-0">Wheat Blast Prevention</h1>
                    <span className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold shrink-0 mt-1 bg-secondary/10 px-2 py-0.5 rounded-sm">Disease</span>
                </div>
                <div className="flex items-center gap-3 text-onSurface-variant text-xs font-medium font-body mt-1">
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">schedule</span> 06:45</span>
                    <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                    <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">school</span> Beginner</span>
                </div>
            </section>

            {/* 3. PRIMARY ACTION BUTTONS */}
            <section className="flex gap-3">
                <button className="flex-1 h-12 bg-primary text-onPrimary border-none rounded-xl font-label text-[13px] font-semibold shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer active:scale-95">
                    <span className="material-symbols-outlined text-[18px]">share</span>
                    Share Video
                </button>
                <button className="flex-1 h-12 border border-primary text-primary bg-transparent rounded-xl font-label text-[13px] font-semibold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 cursor-pointer active:scale-95">
                    <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
                    Save for Later
                </button>
            </section>

            {/* 4. KEY LEARNING POINTS */}
            <section className="bg-surface-containerLowest p-4 rounded-xl shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10">
                <h2 className="font-headline text-base font-bold text-onSurface mb-3 flex items-center gap-2 m-0">
                    <span className="material-symbols-outlined text-[#006e1c] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                    Key Learning Points
                </h2>
                <ul className="flex flex-col gap-3 font-body text-onSurface-variant text-[13px] p-0 m-0 list-none">
                    <li className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-primary shrink-0 mt-[2px] text-[16px]">check_circle</span>
                        <span className="leading-tight font-medium">Identify bleached spikelets on green heads.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-primary shrink-0 mt-[2px] text-[16px]">check_circle</span>
                        <span className="leading-tight font-medium">Apply fungicides early during heading stage.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-primary shrink-0 mt-[2px] text-[16px]">check_circle</span>
                        <span className="leading-tight font-medium">Avoid excessive nitrogen application.</span>
                    </li>
                </ul>
            </section>

            {/* 5. ASK A DOUBT SECTION */}
            <section className="bg-surface-containerLow p-4 rounded-xl border border-[#bfcaba]/10 shadow-[0_2px_12px_rgba(15,31,17,0.02)]">
                <h3 className="font-headline text-[15px] font-bold text-onSurface mb-2.5 m-0">Ask a Doubt</h3>
                <div className="relative flex items-center bg-surface-containerHighest rounded-full pr-1 shadow-inner border border-transparent focus-within:border-primary/30 transition-colors">
                    <input className="w-full bg-transparent border-none py-3 pl-4 pr-12 text-[13px] font-body text-onSurface placeholder:text-onSurface-variant outline-none" placeholder="Have a question about this video?" type="text" />
                    <button className="absolute right-1 w-[34px] h-[34px] bg-primary text-white border-none rounded-full flex items-center justify-center hover:bg-primary-container transition-colors cursor-pointer shrink-0 shadow-sm active:scale-95">
                        <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>send</span>
                    </button>
                </div>
            </section>

            {/* 6. RELATED VIDEOS (BOTTOM) */}
            <section className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                    <h3 className="font-headline text-[17px] font-bold text-onSurface m-0">Related Videos</h3>
                    <button className="text-primary text-xs font-label font-bold bg-transparent border-none cursor-pointer uppercase tracking-wider">View All</button>
                </div>
                <div className="grid grid-cols-2 gap-3.5">
                    <div className="flex flex-col gap-2 group cursor-pointer">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-variant">
                            <img alt="Farmer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvmeNlF0YJccL7f48_TlWAeIEXwl8m0rGhtWerduvZ1OILwLEt8vMWet4qz-y_eorxFo0uv_ejKBNA8iEwj__WuQQVyFr71FqyCeZH1fZiewdeZWPdLl92z7DDekWvXct0te7XO4jcJjiXavQmy5yp8ZIePqjGqt6fbbDSE9ikoV1Z0547nohwVSoOH7I1Od8wIVEEAQtwB4d-Jw00kqXNXly4YV5ipxy9ysf0MelFLvQdYE5DTH3J5ZYn67f6ESBDUHK5nCOTg6k" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-onSurface/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-white font-label text-[10px] font-bold">04:12</div>
                        </div>
                        <div>
                            <h4 className="font-headline font-semibold text-onSurface text-[13px] leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors m-0">Optimizing Nitrogen Use in Wheat</h4>
                            <span className="font-label text-[11px] text-onSurface-variant">Nutrient Mgt</span>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 group cursor-pointer">
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-surface-variant">
                            <img alt="Irrigation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQlcMGPWKQ9mcULiVfUuJSZWdKhClrYYZn4b_4-nW_0VEswPZTlyVByA5ao3Mg9ykkEpkjTZsugTo_x6LvTAFuVCJLprJgMNlFyKl9mcuETp7qpjPJe-RzW-X5gyuxGM6eJ3hatzhei3ll8jbB9X3CX24pFgZncDLkKK_LjntgJt6IIuJ-2-j6HhM2G9nM3R7kZ3QRxgaWT6YfVqL93kZOJSAh1BO6bYQUYtt26rQnX-3gdyr_hc041FZsY3zQYIlVd3fjM8SMfQQ" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                                </div>
                            </div>
                            <div className="absolute bottom-2 right-2 bg-onSurface/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-white font-label text-[10px] font-bold">08:30</div>
                        </div>
                        <div>
                            <h4 className="font-headline font-semibold text-onSurface text-[13px] leading-tight line-clamp-2 mb-1 group-hover:text-primary transition-colors m-0">Precision Irrigation Timings</h4>
                            <span className="font-label text-[11px] text-onSurface-variant">Water Mgt</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
);

const ProgressView = ({ onResume }) => (
    <div className="px-4 py-4 flex flex-col gap-5 w-full pb-8">
        {/* 1. HEADER SECTION */}
        <section className="flex flex-col gap-1 pt-2">
            <h2 className="text-[22px] font-headline font-bold text-primary tracking-tight m-0">Your Progress</h2>
            <p className="text-onSurface-variant font-body text-[14px] m-0">Keep growing your knowledge, Ramesh.</p>
        </section>

        {/* 2 & 3. CARDS SECTION */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* TOTAL LEARNING CARD */}
            <div className="col-span-2 bg-surface-containerHigh rounded-xl px-4 py-3 relative overflow-hidden group border border-[#bfcaba]/20 shadow-[0_2px_12px_rgba(15,31,17,0.02)]">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-10 -mt-10 blur-xl"></div>
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex flex-col">
                        <p className="text-onSurface-variant text-[12px] font-medium mb-1 m-0">Total Learning Time</p>
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                            <p className="text-[24px] font-headline font-bold m-0 leading-none">24h 15m</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* STATS CARDS */}
            <div className="bg-surface-containerLow rounded-xl p-3 flex flex-col justify-between border border-[#bfcaba]/10 shadow-[0_2px_12px_rgba(15,31,17,0.02)] gap-2">
                <div className="flex items-center gap-1.5 text-[#006e1c]">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Videos</span>
                </div>
                <p className="text-[20px] font-headline font-bold text-onSurface m-0">42</p>
            </div>
            <div className="bg-surface-containerLow rounded-xl p-3 flex flex-col justify-between border border-[#bfcaba]/10 shadow-[0_2px_12px_rgba(15,31,17,0.02)] gap-2">
                <div className="flex items-center gap-1.5 text-tertiary">
                    <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider">Badges</span>
                </div>
                <p className="text-[20px] font-headline font-bold text-onSurface m-0">6</p>
            </div>
        </section>

        {/* 4. WEEKLY ACTIVITY GRAPH */}
        <section className="flex flex-col gap-3">
            <div className="flex justify-between items-center px-1">
                <h3 className="font-headline font-bold text-[17px] text-onSurface m-0">Weekly Activity</h3>
                <span className="text-[11px] text-primary font-bold bg-primary/10 px-2 py-0.5 rounded-full">+12%</span>
            </div>
            <div className="bg-surface-containerLowest rounded-xl p-4 shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10 flex">
                {/* Y-axis */}
                <div className="flex flex-col justify-between items-end text-[10px] text-onSurface-variant font-medium pr-3 h-[140px] shrink-0 border-r border-[#bfcaba]/20 pb-[20px]">
                    <span>60m</span>
                    <span>30m</span>
                    <span>0m</span>
                </div>
                {/* Graph Area */}
                <div className="flex-1 flex justify-between items-end h-[140px] pl-2 relative">
                    {/* Horizontal grid lines */}
                    <div className="absolute left-2 right-0 top-0 border-t border-dashed border-[#bfcaba]/20"></div>
                    <div className="absolute left-2 right-0 top-[60px] border-t border-dashed border-[#bfcaba]/20"></div>
                    <div className="absolute left-2 right-0 bottom-[20px] border-t border-[#bfcaba]/20"></div>
                    
                    {/* Bars */}
                    {[
                        { day: 'Mon', val: '20m', h: 'h-[33%]' },
                        { day: 'Tue', val: '30m', h: 'h-[50%]' },
                        { day: 'Wed', val: '45m', h: 'h-[75%]' },
                        { day: 'Thu', val: '60m', h: 'h-full', isToday: true },
                        { day: 'Fri', val: '40m', h: 'h-[66%]' },
                        { day: 'Sat', val: '15m', h: 'h-[25%]' },
                        { day: 'Sun', val: '20m', h: 'h-[33%]' }
                    ].map(d => (
                        <div key={d.day} className="flex flex-col items-center w-full h-full relative z-10 group cursor-pointer">
                            <div className="flex flex-col justify-end items-center h-[calc(100%-20px)] w-full">
                                <span className="text-[9px] font-bold text-onSurface-variant mb-1">{d.val}</span>
                                <div className={`w-3.5 rounded-t-[3px] transition-all group-hover:w-4 ${d.isToday ? 'bg-primary shadow-sm' : 'bg-primary/20 hover:bg-primary/40'} ${d.h}`}></div>
                            </div>
                            <span className={`h-[20px] flex items-end text-[10px] font-semibold tracking-wide ${d.isToday ? 'text-primary' : 'text-onSurface-variant'}`}>{d.day}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* 5. RECENT BADGES */}
        <section className="flex flex-col gap-3">
            <h3 className="font-headline font-bold text-[17px] text-onSurface px-1 m-0">Recent Badges</h3>
            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 snap-x snap-mandatory">
                <div className="min-w-[100px] bg-surface-containerLow rounded-xl p-3 flex flex-col items-center text-center gap-2 snap-start border border-[#bfcaba]/10 shadow-[0_2px_12px_rgba(15,31,17,0.02)] shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#ffddb5] flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                    </div>
                    <p className="font-headline text-[12px] font-bold text-onSurface leading-tight m-0">Wheat<br/>Expert</p>
                </div>
                <div className="min-w-[100px] bg-surface-containerLow rounded-xl p-3 flex flex-col items-center text-center gap-2 snap-start border border-[#bfcaba]/10 shadow-[0_2px_12px_rgba(15,31,17,0.02)] shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#91f78e] flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[#006e1c] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
                    </div>
                    <p className="font-headline text-[12px] font-bold text-onSurface leading-tight m-0">Spray<br/>Master</p>
                </div>
                <div className="min-w-[100px] bg-surface-containerLow rounded-xl p-3 flex flex-col items-center text-center gap-2 snap-start border border-[#bfcaba]/10 shadow-[0_2px_12px_rgba(15,31,17,0.02)] shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>pest_control</span>
                    </div>
                    <p className="font-headline text-[12px] font-bold text-onSurface leading-tight m-0">Pest<br/>Control</p>
                </div>
                <div className="min-w-[100px] bg-surface-containerLow rounded-xl p-3 flex flex-col items-center text-center gap-2 snap-start border border-[#bfcaba]/10 shadow-[0_2px_12px_rgba(15,31,17,0.02)] shrink-0">
                    <div className="w-12 h-12 rounded-full bg-[#c2e7ff] flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-[#004a77] text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
                    </div>
                    <p className="font-headline text-[12px] font-bold text-onSurface leading-tight m-0">Soil<br/>Analyst</p>
                </div>
            </div>
        </section>

        {/* 6. CONTINUE WATCHING */}
        <section className="flex flex-col gap-3">
            <h3 className="font-headline font-bold text-[17px] text-onSurface px-1 m-0">Continue Watching</h3>
            <div className="bg-surface-containerLowest rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(15,31,17,0.02)] flex flex-col border border-[#bfcaba]/10">
                <div className="h-28 w-full bg-surface-containerHigh relative">
                    <img alt="Farmer examining crops" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjCFhfyz5whTgRxHcWQCwoAhyHdoPxvzJCV0m65hqicwRN8OkRrQep5HfN4cFQNVmovWMiDVRBxXzmX0GIG6mowPuKCKvVR_XLK-o_C9M0avXVE6f6r00XPz4kDog5jv-aTQVMKutRO33ygEu4bswUfV6UGwquX8wkhdmuTcfpAZzjxvWYLT7MZvwkM8mHx5zQkbGmCxvghrFeZq57tRnPLJuNQWrl8rK8PMMpjvpsfiXBmPlnO3c68eRjyQY904H4y-HsijtPzdQ" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <button className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors border-none cursor-pointer" onClick={onResume}>
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        </button>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
                        <div className="h-full bg-[#006e1c] w-[65%]"></div>
                    </div>
                </div>
                <div className="p-3.5 flex justify-between items-center gap-3 bg-surface-containerLowest">
                    <div className="flex-1">
                        <p className="text-[10px] text-[#006e1c] font-bold uppercase tracking-widest mb-0.5 m-0">Module 4</p>
                        <h4 className="font-headline font-bold text-[14px] text-onSurface leading-tight m-0">Advanced Irrigation Techniques</h4>
                        <p className="text-[11px] text-onSurface-variant mt-1 m-0">12m remaining</p>
                    </div>
                    <button onClick={onResume} className="shrink-0 h-9 px-4 rounded-full bg-gradient-to-b from-primary to-primary-container text-white font-label text-[12px] font-semibold shadow-sm border-none cursor-pointer active:scale-95">
                        Resume
                    </button>
                </div>
            </div>

            <div className="bg-surface-containerLowest rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(15,31,17,0.02)] flex flex-col border border-[#bfcaba]/10">
                <div className="h-28 w-full bg-surface-containerHigh relative">
                    <img alt="Tractor in field" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbU3MJVMGxmkmFm9qEMrqHglBQMfHca3rlqXP4WAYqqCFIleaYCHptFUIbJ7wYOaw5UKFfpAc2aNSk6WL567lxuSwZu-3npNdzMqR-KwkXCcganI4ieZ1IpMLssW7gTIVzX_1F4YZTm3q2l_86zZm_LT8uAr9nj1KZAjXyqDKaEu8b0-ciSdMv98jx0NweTDgXNlz1FD9-BsKiY15Z989j50hYixTTrgZDfMMOzR2APO7rW6LfkKavY7SWSFMSdPZBQ8CYiQTgEb8" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <button className="w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors border-none cursor-pointer" onClick={onResume}>
                            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                        </button>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
                        <div className="h-full bg-[#006e1c] w-[20%]"></div>
                    </div>
                </div>
                <div className="p-3.5 flex justify-between items-center gap-3 bg-surface-containerLowest">
                    <div className="flex-1">
                        <p className="text-[10px] text-[#006e1c] font-bold uppercase tracking-widest mb-0.5 m-0">Module 2</p>
                        <h4 className="font-headline font-bold text-[14px] text-onSurface leading-tight m-0">Soil Health Basics</h4>
                        <p className="text-[11px] text-onSurface-variant mt-1 m-0">45m remaining</p>
                    </div>
                    <button onClick={onResume} className="shrink-0 h-9 px-4 rounded-full border border-outline-variant/30 text-primary bg-transparent font-label text-[12px] font-semibold hover:bg-primary/5 transition-colors cursor-pointer active:scale-95">
                        Resume
                    </button>
                </div>
            </div>
        </section>
    </div>
);

const CommunityView = () => (
    <div className="px-4 py-4 flex flex-col gap-5 w-full pb-8">
        {/* HEADER & LANGUAGE */}
        <div className="flex justify-between items-center pt-2 px-1">
            <h2 className="font-headline text-[22px] font-bold text-onSurface tracking-tight m-0">Community</h2>
            <div className="flex items-center gap-1.5 bg-surface-containerHigh px-2.5 py-1.5 rounded-full shadow-sm border border-[#bfcaba]/20 cursor-pointer">
                <span className="material-symbols-outlined text-primary text-[16px]">language</span>
                <span className="font-label text-[12px] font-bold text-primary">Hindi</span>
            </div>
        </div>

        {/* 1. ASK QUESTION */}
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

        {/* 2. CATEGORY FILTERS */}
        <section className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 pb-1">
            {['All', 'Crops', 'Pest & Disease', 'Soil', 'Irrigation', 'Market'].map((filter, i) => (
                <button key={filter} className={`shrink-0 px-4 py-1.5 rounded-full border-none font-label text-[12px] font-semibold cursor-pointer transition-colors shadow-sm ${i === 0 ? 'bg-[#0f1f11] text-surface' : 'bg-surface-containerLow text-onSurface-variant hover:bg-surface-containerHigh border border-[#bfcaba]/10'}`}>
                    {filter}
                </button>
            ))}
        </section>

        {/* 3. TRENDING TIPS (Small horizontal scroll) */}
        <section className="flex flex-col gap-3 mt-1">
            <div className="flex items-center gap-2 px-1">
                <span className="material-symbols-outlined text-[#ffb957] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                <h3 className="font-headline text-[15px] font-bold text-onSurface m-0">Trending Tips</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1 snap-x snap-mandatory pb-2">
                <div className="min-w-[200px] max-w-[200px] snap-start shrink-0 bg-surface-containerLow rounded-xl p-3 shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10 flex flex-col gap-2">
                    <p className="font-headline font-bold text-[13px] text-onSurface line-clamp-2 leading-tight m-0">Protect wheat from late blight using minimal chemical spray</p>
                    <p className="text-[10px] text-onSurface-variant font-medium m-0">1.2k views • Agronomist Priya</p>
                </div>
                <div className="min-w-[200px] max-w-[200px] snap-start shrink-0 bg-surface-containerLow rounded-xl p-3 shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10 flex flex-col gap-2">
                    <p className="font-headline font-bold text-[13px] text-onSurface line-clamp-2 leading-tight m-0">Current mandi rates for early sown mustard crops</p>
                    <p className="text-[10px] text-onSurface-variant font-medium m-0">856 views • Market Expert</p>
                </div>
            </div>
        </section>

        {/* 4. DISCUSSIONS FEED */}
        <section className="flex flex-col gap-3 mt-2">
            <h3 className="font-headline text-[17px] font-bold text-onSurface px-1 m-0">Discussions</h3>
            
            {/* Discussion Card 1 */}
            <div className="bg-surface-containerLowest p-4 rounded-xl shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10 flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#91f78e] text-[#00731e] flex items-center justify-center font-headline font-bold text-[14px] shrink-0">SS</div>
                    <div className="flex flex-col">
                        <h4 className="font-headline font-bold text-[15px] text-onSurface leading-tight m-0">Yellowing leaves in early paddy stage?</h4>
                        <p className="text-onSurface-variant text-[11px] mt-0.5 m-0 font-medium">Sandeep S. • Karnal • 2 hrs ago</p>
                    </div>
                </div>
                
                <p className="font-body text-[13px] text-onSurface-variant line-clamp-2 m-0 leading-relaxed">
                    I noticed my paddy crop leaves turning slightly yellow at the edges. I haven't applied fertilizer yet. Should I wait for rain?
                </p>

                <div className="flex gap-2">
                    <span className="bg-surface-containerHigh text-onSurface-variant text-[10px] px-2 py-0.5 rounded-sm font-semibold tracking-wide">PADDY</span>
                    <span className="bg-surface-containerHigh text-onSurface-variant text-[10px] px-2 py-0.5 rounded-sm font-semibold tracking-wide">SOIL</span>
                </div>

                <div className="bg-surface-containerLow p-3 rounded-lg border border-[#bfcaba]/10 mt-1 flex flex-col gap-2 relative">
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#006e1c] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        <span className="font-label text-[10px] font-bold text-[#006e1c] uppercase tracking-wider">Top Answer</span>
                    </div>
                    <p className="font-body text-[12px] text-onSurface line-clamp-2 m-0 leading-relaxed">This looks like zinc deficiency, common in our area's soil. Apply zinc sulphate at 10kg/acre mixed with dry soil or sand.</p>
                </div>

                <div className="flex justify-between items-center mt-1 border-t border-[#bfcaba]/20 pt-3">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-1.5 text-onSurface-variant hover:text-primary transition-colors text-[12px] font-medium bg-transparent border-none cursor-pointer p-0">
                            <span className="material-symbols-outlined text-[16px]">thumb_up</span> 24
                        </button>
                        <button className="flex items-center gap-1.5 text-onSurface-variant hover:text-primary transition-colors text-[12px] font-medium bg-transparent border-none cursor-pointer p-0">
                            <span className="material-symbols-outlined text-[16px]">chat_bubble</span> 8
                        </button>
                    </div>
                    <button className="text-primary font-label text-[12px] font-bold bg-transparent border-none cursor-pointer p-0 hover:underline">
                        View Discussion →
                    </button>
                </div>
            </div>

            {/* Discussion Card 2 */}
            <div className="bg-surface-containerLowest p-4 rounded-xl shadow-[0_2px_12px_rgba(15,31,17,0.02)] border border-[#bfcaba]/10 flex flex-col gap-3">
                <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#986200] text-[#ffeede] flex items-center justify-center font-headline font-bold text-[14px] shrink-0">MK</div>
                    <div className="flex flex-col">
                        <h4 className="font-headline font-bold text-[15px] text-onSurface leading-tight m-0">Best time to apply urea for upcoming rain?</h4>
                        <p className="text-onSurface-variant text-[11px] mt-0.5 m-0 font-medium">Manoj K. • Kurukshetra • 5 hrs ago</p>
                    </div>
                </div>
                
                <p className="font-body text-[13px] text-onSurface-variant line-clamp-2 m-0 leading-relaxed">
                    The weather app shows heavy rain expected tomorrow. I was planning to apply my first round of urea today.
                </p>

                <div className="flex gap-2">
                    <span className="bg-surface-containerHigh text-onSurface-variant text-[10px] px-2 py-0.5 rounded-sm font-semibold tracking-wide">WHEAT</span>
                    <span className="bg-surface-containerHigh text-onSurface-variant text-[10px] px-2 py-0.5 rounded-sm font-semibold tracking-wide">FERTILIZER</span>
                </div>

                <div className="bg-surface-containerLow p-3 rounded-lg border border-[#bfcaba]/10 mt-1 flex flex-col gap-2 relative">
                    <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[#006e1c] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                        <span className="font-label text-[10px] font-bold text-[#006e1c] uppercase tracking-wider">Top Answer</span>
                    </div>
                    <p className="font-body text-[12px] text-onSurface line-clamp-2 m-0 leading-relaxed">Do not apply urea before heavy rain, it will wash away. Wait until the rain passes and the field is semi-dry.</p>
                </div>

                <div className="flex justify-between items-center mt-1 border-t border-[#bfcaba]/20 pt-3">
                    <div className="flex gap-4">
                        <button className="flex items-center gap-1.5 text-onSurface-variant hover:text-primary transition-colors text-[12px] font-medium bg-transparent border-none cursor-pointer p-0">
                            <span className="material-symbols-outlined text-[16px]">thumb_up</span> 45
                        </button>
                        <button className="flex items-center gap-1.5 text-onSurface-variant hover:text-primary transition-colors text-[12px] font-medium bg-transparent border-none cursor-pointer p-0">
                            <span className="material-symbols-outlined text-[16px]">chat_bubble</span> 12
                        </button>
                    </div>
                    <button className="text-primary font-label text-[12px] font-bold bg-transparent border-none cursor-pointer p-0 hover:underline">
                        View Discussion →
                    </button>
                </div>
            </div>
        </section>
    </div>
);

export default function LearningScreen() {
    const isMobile = useIsMobile();
    const [currentView, setCurrentView] = useState('dashboard');
    const [previousView, setPreviousView] = useState('dashboard');
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = 0;
        }
    }, [currentView, selectedVideo]);

    const handleVideoSelect = (video) => {
        setPreviousView(currentView);
        setSelectedVideo(video);
        setCurrentView('video');
    };

    return (
        <div className="flex flex-col h-full overflow-hidden bg-surface">
            {isMobile && (
                <AppTopBar 
                    title="Learning Hub" 
                    showBack={true} 
                    onBack={currentView === 'video' ? () => setCurrentView(previousView) : undefined} 
                    showNotification={true} 
                />
            )}

            <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden relative z-0 pb-[80px]">
                {currentView !== 'video' && (
                    <div className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md px-4 py-2 flex gap-2 overflow-x-auto hide-scrollbar border-b border-[#bfcaba]/20 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                        {[
                            { id: 'dashboard', label: 'Dashboard' },
                            { id: 'progress', label: 'Progress' },
                            { id: 'community', label: 'Community' }
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setCurrentView(tab.id)}
                                className={`px-5 py-2 rounded-full border-none cursor-pointer text-sm font-label font-bold whitespace-nowrap transition-colors shadow-sm ${currentView === tab.id ? 'bg-primary text-white' : 'bg-surface-containerHigh text-onSurface-variant hover:bg-surface-containerHighest'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                )}
                
                {currentView === 'dashboard' && <DashboardView onVideoSelect={handleVideoSelect} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
                {currentView === 'video' && <VideoView video={selectedVideo} />}
                {currentView === 'progress' && <ProgressView onResume={() => { setPreviousView('progress'); setCurrentView('video'); }} />}
                {currentView === 'community' && <CommunityView />}
            </div>

            <FloatingAIButton />
            {isMobile && (
                <div className="shrink-0 z-50 w-full bg-white/92 backdrop-blur-md">
                    <BottomTabs />
                </div>
            )}
        </div>
    );
}