import { Home, Stethoscope, Users, BookOpen, ShoppingCart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './BottomTabs.css';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  const tabs = [
    { name: t('nav.home'), path: '/farmer/home', icon: Home },
    { name: t('nav.diagnosis'), path: '/farmer/diagnosis', icon: Stethoscope },
    { name: t('nav.experts'), path: '/farmer/experts', icon: Users },
    { name: t('nav.learning'), path: '/farmer/learning', icon: BookOpen },
    { name: t('nav.marketplace'), path: '/farmer/marketplace', icon: ShoppingCart },
  ];

  return (
    <div className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path || 
                         location.pathname.startsWith(tab.path + '/');
        
        return (
          <button 
            key={tab.path}
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
