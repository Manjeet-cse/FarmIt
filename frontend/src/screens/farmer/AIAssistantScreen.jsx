import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AIAssistantScreen() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [activeMode, setActiveMode] = useState('voice');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Namaste! I am your Digital Agronomist. How can I assist you with your farm today?'
    },
    {
      id: 2,
      sender: 'user',
      text: 'What is the current price of wheat in the local Mandi?'
    },
    {
      id: 3,
      sender: 'ai',
      isChart: true,
      text: 'The current average price for Wheat (Lokwan) at your nearest Mandi is',
      highlight: '₹2,450 / quintal'
    }
  ]);
  const chatRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip initial load — only auto-scroll when the user sends a new message
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'ai',
        text: `I understand you are asking about "${userMsg.text}". For mustard, the current best practice is to spray Neem oil 10000 ppm.`
      }]);
    }, 1000);
  };

  const chartBars = [55, 60, 68, 65, 75, 82, 95];

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <style>{`
        @keyframes nkFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Header ─────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between p-4 bg-white sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#2e7d32] flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-[#cbffc2]" style={{ fontVariationSettings: "'FILL' 1" }}>robot_2</span>
          </div>
          <div>
            <h1 className="font-headline font-bold text-[18px] leading-tight text-[#0f1f11] m-0">FarmIt AI</h1>
            <p className="flex items-center gap-1 text-[12px] font-medium text-[#0d631b] m-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006e1c] block"></span>
              Online
            </p>
          </div>
        </div>
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center text-[#40493d] bg-transparent border-none cursor-pointer transition-colors duration-200 hover:bg-[#e5f9e2]"
          aria-label="Close"
          onClick={() => navigate(-1)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-[rgba(191,202,186,0.3)] to-transparent"></div>
      </header>

      {/* ── Chat Canvas ─────────────────────────── */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-8 flex flex-col gap-6 scroll-smooth touch-pan-y [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" ref={chatRef}>
        {messages.map((msg, idx) => (
          msg.sender === 'ai' ? (
            /* AI Bubble */
            <div
              key={msg.id}
              className="flex items-start gap-3 w-11/12 max-w-[42rem] opacity-0 translate-y-2.5 animate-[nkFadeUp_0.35s_ease_forwards]"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div className="w-8 h-8 rounded-full bg-[#2e7d32] flex items-center justify-center shrink-0 mt-1 shadow-sm">
                <span className="material-symbols-outlined text-[14px] text-[#cbffc2]" style={{ fontVariationSettings: "'FILL' 1" }}>robot_2</span>
              </div>
              <div className={`bg-[#e5f9e2] p-4 rounded-[16px_16px_16px_4px] text-[14px] text-[#0f1f11] shadow-[0_2px_12px_rgba(15,31,17,0.03)] leading-[1.65] flex flex-col gap-4${msg.isChart ? ' w-full' : ''}`}>
                <p className="m-0 text-[#0f1f11]">
                  {msg.isChart ? (
                    <>{msg.text} <strong className="text-[#0d631b] font-bold text-[15px]">{msg.highlight}</strong>.</>
                  ) : msg.text}
                </p>

                {msg.isChart && (
                  <div className="bg-[rgba(212,232,209,0.5)] rounded-xl p-3">
                    <p className="flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-[#40493d] m-0 mb-3">
                      <span className="material-symbols-outlined text-[14px]">trending_up</span>
                      7-Day Trend
                    </p>
                    <div className="h-24 flex items-end justify-between gap-2 px-1">
                      {chartBars.map((h, i) => (
                        i === chartBars.length - 1 ? (
                          <div key={i} className="flex-1 rounded-[4px_4px_0_0] relative transition-colors duration-200 bg-[#0d631b] flex justify-center" style={{ height: `${h}%` }}>
                            <span className="absolute -top-6 bg-[#ebffe7] text-[#0d631b] font-bold text-[10px] py-0.5 px-1.5 rounded shadow-[0_1px_4px_rgba(0,0,0,0.08)] whitespace-nowrap">₹2450</span>
                          </div>
                        ) : (
                          <div key={i} className="flex-1 rounded-[4px_4px_0_0] relative transition-colors duration-200 bg-[#a3f69c] hover:bg-[#0d631b]" style={{ height: `${h}%` }}></div>
                        )
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[9px] text-[rgba(64,73,61,0.8)] px-1 font-medium">
                      <span>Mon</span>
                      <span>Today</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* User Bubble */
            <div
              key={msg.id}
              className="flex items-start justify-end w-11/12 max-w-[42rem] self-end opacity-0 translate-y-2.5 animate-[nkFadeUp_0.35s_ease_forwards]"
              style={{ animationDelay: `${idx * 120}ms` }}
            >
              <div className="bg-[#2e7d32] text-[#cbffc2] p-4 rounded-[16px_16px_4px_16px] text-[14px] shadow-[0_2px_12px_rgba(15,31,17,0.06)] leading-[1.65]">
                {msg.text}
              </div>
            </div>
          )
        ))}

      </main>

      {/* ── Bottom Input Area ───────────────────── */}
      <div className="shrink-0 bg-white px-4 pt-2 pb-0 shadow-[0_-8px_32px_rgba(15,31,17,0.04)] z-20 relative">
        <div className="absolute top-0 left-0 w-full h-4 -translate-y-full bg-gradient-to-t from-white to-transparent pointer-events-none"></div>

        {/* Mode Pills */}
        <div className="flex justify-center gap-2 mb-3">
          {['text', 'voice', 'image'].map(mode => (
            <button
              key={mode}
              className={`flex items-center gap-1 py-1.5 px-4 rounded-full border-none cursor-pointer font-headline text-[12px] font-semibold transition-colors duration-200 ${
                activeMode === mode 
                  ? 'bg-[#0d631b] text-white shadow-[0_2px_8px_rgba(13,99,27,0.25)]' 
                  : 'bg-[#daeed6] text-[#0f1f11] hover:bg-[#d4e8d1]'
              }`}
              onClick={() => setActiveMode(mode)}
            >
              {mode === 'voice' && activeMode === 'voice' && (
                <span className="material-symbols-outlined text-[14px]">mic</span>
              )}
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        {/* Input Row */}
        <div className="flex items-end gap-3 pb-1">
          <div className="flex-1 flex items-center bg-[#daeed6] rounded-[28px] p-1 min-h-[56px] shadow-[0_2px_12px_rgba(15,31,17,0.04)]">
            <button className="w-10 h-10 rounded-full border-none bg-transparent flex items-center justify-center text-[#40493d] cursor-pointer shrink-0 transition-all duration-200 hover:text-[#0d631b] hover:bg-[#d4e8d1] ml-1">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <input
              type="text"
              className="flex-1 bg-transparent border-none outline-none font-body text-[14px] text-[#0f1f11] py-3 px-2 placeholder:text-[rgba(64,73,61,0.5)]"
              placeholder="Message FarmIt..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSend()}
            />
            <button className="w-10 h-10 rounded-full border-none bg-transparent flex items-center justify-center text-[#40493d] cursor-pointer shrink-0 transition-all duration-200 hover:text-[#0d631b] hover:bg-[#d4e8d1] mr-1">
              <span className="material-symbols-outlined">photo_camera</span>
            </button>
          </div>

          <button
            className="w-14 h-14 shrink-0 rounded-full border-none bg-[#ffb957] text-[#643f00] flex items-center justify-center shadow-[0_4px_16px_rgba(255,185,87,0.35)] cursor-pointer transition-transform duration-150 active:scale-95"
            onClick={input.trim() ? handleSend : undefined}
            aria-label={input.trim() ? 'Send' : 'Voice input'}
          >
            <span
              className="material-symbols-outlined text-[28px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {input.trim() ? 'send' : 'mic'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
