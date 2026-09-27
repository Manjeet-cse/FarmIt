import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ExpertChatScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const expert = location.state?.expert || { name: 'Expert', image: 'https://ui-avatars.com/api/?name=Expert' };

  const [messages, setMessages] = useState([
    { id: 1, text: `Hello! I'm ${expert.name}. How can I help you with your crops today?`, sender: 'expert', timestamp: new Date().toISOString() }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    
    // Add user message
    const newMsg = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Simulate expert reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: "Thanks for sharing. Could you upload a photo or give more details?",
        sender: 'expert',
        timestamp: new Date().toISOString()
      }]);
    }, 1500);
  };

  const formatTime = (isoString) => {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-surface-light relative z-50">
      {/* Custom Top Bar for Chat */}
      <div className="shrink-0 flex items-center h-16 px-2 bg-primary-container relative shadow-sm border-b border-[#bfcaba]/20">
        <button className="w-10 h-10 flex items-center justify-center text-onPrimaryContainer rounded-full bg-transparent border-none cursor-pointer" onClick={() => navigate(-1)}>
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div className="flex items-center gap-3 ml-2 flex-1">
          <img src={expert.image} alt={expert.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
          <div className="flex flex-col">
            <h2 className="font-headline font-bold text-[16px] text-onPrimaryContainer m-0 leading-tight">{expert.name}</h2>
            <span className="text-[11px] text-onPrimaryContainer/80 font-medium tracking-wide flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006e1c] block"></span>
              Online
            </span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 bg-surface-light flex flex-col gap-4">
        <div className="text-center mb-2 mt-2">
          <span className="bg-[#e5f9e2] text-[#006e1c] text-[10px] font-bold tracking-wide py-1.5 px-3 rounded-full border border-[#006e1c]/20 uppercase shadow-sm">
            Start of Consultation
          </span>
        </div>

        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div key={msg.id} className={`flex max-w-[85%] ${isUser ? 'self-end' : 'self-start'}`}>
              <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                <div 
                  className={`px-4 py-2.5 rounded-2xl shadow-sm ${
                    isUser 
                      ? 'bg-primary text-white rounded-tr-sm' 
                      : 'bg-white text-onSurface border border-[#bfcaba]/20 rounded-tl-sm'
                  }`}
                >
                  <p className="font-body text-[14px] leading-relaxed m-0">{msg.text}</p>
                </div>
                <span className={`text-[10px] text-onSurface-variant mt-1.5 ${isUser ? 'mr-1' : 'ml-1'}`}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="shrink-0 bg-white border-t border-[#bfcaba]/30 p-3 pb-8 shadow-[0_-4px_16px_rgba(0,0,0,0.02)] relative z-10">
        <div className="flex items-center gap-2 max-w-[1280px] mx-auto">
          <button className="w-11 h-11 rounded-full flex items-center justify-center text-onSurface-variant bg-surface-container hover:bg-surface-containerHigh transition-colors border-none cursor-pointer shrink-0">
            <span className="material-symbols-outlined text-[22px]">add_photo_alternate</span>
          </button>
          
          <div className="flex-1 bg-surface-containerLow border border-[#bfcaba]/40 rounded-full h-12 flex items-center px-4 relative focus-within:border-primary focus-within:bg-white transition-all shadow-inner">
            <input 
              type="text" 
              placeholder="Type a message..."
              className="w-full bg-transparent border-none outline-none font-body text-[15px] text-onSurface"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
          </div>

          <button 
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all border-none shrink-0 shadow-sm ${inputText.trim() ? 'bg-primary text-white cursor-pointer hover:bg-[#1B5E20] hover:shadow-md' : 'bg-surface-containerHigh text-onSurface-variant/50 cursor-default'}`}
            onClick={handleSend}
            disabled={!inputText.trim()}
          >
            <span className="material-symbols-outlined text-[22px]" style={inputText.trim() ? { fontVariationSettings: "'FILL' 1" } : {}}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
