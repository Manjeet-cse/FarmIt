import { Bot } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FloatingAIButton.css';

export default function FloatingAIButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on the AI assistant screen itself, and specific screens like Profile/More
  const isHidden = [
    '/', '/onboarding', '/role-select', '/login',
    '/signup/step1', '/signup/step2', '/signup/step3'
  ].includes(location.pathname) 
  || location.pathname.includes('ai-assistant')
  || location.pathname.includes('profile')
  || location.pathname.includes('more')
  || location.pathname.includes('cart')
  || location.pathname.includes('checkout')
  || location.pathname.includes('order-success');

  if (isHidden) return null;

  // Navigate to the correct role-based AI assistant path
  const role = localStorage.getItem('role') || 'farmer';

  return (
    <div className="floating-ai-wrapper" onClick={() => navigate(`/${role}/ai-assistant`)}>
      <button className="floating-ai-button">
        <Bot size={24} color="#FFFFFF" />
      </button>
      <span className="floating-ai-label">Talk to AI</span>
    </div>
  );
}
