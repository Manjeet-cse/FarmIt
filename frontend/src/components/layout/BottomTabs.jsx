import { Home, Stethoscope, Users, BookOpen, ShoppingCart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BottomTabs.css';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { name: 'Home', path: '/farmer/home', icon: Home },
    { name: 'Diagnosis', path: '/farmer/diagnosis', icon: Stethoscope },
    { name: 'Experts', path: '/farmer/experts', icon: Users },
    { name: 'Learning', path: '/farmer/learning', icon: BookOpen },
    { name: 'Marketplace', path: '/farmer/marketplace', icon: ShoppingCart },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path || 
                         location.pathname.startsWith(tab.path + '/');
        
        return (
          <button 
            key={tab.name}
            className={`nav-tab ${isActive ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            {isActive && <div className="active-indicator"></div>}
            <Icon size={22} />
            <span>{tab.name}</span>
          </button>
        );
      })}
    </div>
  );
}
