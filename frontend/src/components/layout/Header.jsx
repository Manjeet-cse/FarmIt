import { Menu, ArrowLeft, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

export default function TopBar({ title, showBack, showHamburger, showBell, showProfile, onHamburgerClick }) {
  const navigate = useNavigate();

  return (
    <div className="top-bar">
      <div className="top-bar-left">
        {showBack && (
          <button className="icon-button" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} color="#FFFFFF" />
          </button>
        )}
        {showHamburger && !showBack && (
          <button className="icon-button" onClick={onHamburgerClick}>
            <Menu size={24} color="#FFFFFF" />
          </button>
        )}
      </div>
      
      <div className="top-bar-center">
        <h2>{title}</h2>
      </div>

      <div className="top-bar-right">
        {showBell && (
          <button className="icon-button relative">
            <Bell size={24} color="#FFFFFF" />
            <span className="bell-badge"></span>
          </button>
        )}
        {showProfile && (
          <button className="icon-button" onClick={() => navigate('/profile')}>
            <div className="profile-circle">
              <User size={16} color="#2E7D32" />
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
