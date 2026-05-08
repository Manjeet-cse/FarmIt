import { BookOpen, IndianRupee, Store, CloudRain, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './HamburgerDrawer.css';

export default function HamburgerDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose}></div>
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-profile">
            <div className="drawer-avatar">M</div>
            <div>
              <h3>Manjeet Singh</h3>
              <p>+91 98765 43210</p>
            </div>
          </div>
        </div>
        
        <div className="drawer-menu">
          <button className="menu-item" onClick={() => handleNav('/learning')}>
            <BookOpen size={20} className="menu-icon" />
            <span>Learning Hub</span>
          </button>
          <button className="menu-item" onClick={() => handleNav('/subsidy')}>
            <IndianRupee size={20} className="menu-icon" />
            <span>Subsidy Guide</span>
          </button>
          <button className="menu-item" onClick={() => handleNav('/marketplace')}>
            <Store size={20} className="menu-icon" />
            <span>Marketplace</span>
          </button>
          <button className="menu-item" onClick={() => handleNav('/weather')}>
            <CloudRain size={20} className="menu-icon" />
            <span>Weather Forecast</span>
          </button>
          
          <div className="divider"></div>
          
          <button className="menu-item">
            <Settings size={20} className="menu-icon" />
            <span>Settings</span>
          </button>
          <button className="menu-item text-error" onClick={() => handleNav('/login')}>
            <LogOut size={20} className="menu-icon" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
