import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AuthNavigator from './AuthNavigator';
import FarmerTabs from './FarmerTabs';
import ExpertTabs from './ExpertTabs';
import VendorTabs from './VendorTabs';
import FloatingAIButton from '../components/ai/FloatingAIButton';
import { Wifi, Battery, Signal } from 'lucide-react';

// Route-aware status bar — white on AI screen, green elsewhere
function StatusBar() {
  const location = useLocation();
  const isAIScreen = location.pathname.includes('ai-assistant');

  return (
    <div style={{
      height: '44px',
      background: isAIScreen ? '#ffffff' : '#2E7D32',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '8px 16px 0',
      position: 'sticky',
      top: 0,
      zIndex: 55,
      flexShrink: 0,
      transition: 'background 0.2s',
    }}>
      <span style={{ color: isAIScreen ? '#0f1f11' : 'white', fontWeight: 'bold', fontSize: '14px' }}>9:41</span>
      <div style={{ display: 'flex', gap: '6px', color: isAIScreen ? '#0f1f11' : 'white', alignItems: 'center' }}>
        <Signal size={14} />
        <Wifi size={14} />
        <Battery size={16} />
      </div>
    </div>
  );
}

export default function AppNavigator() {
  return (
    <div className="phone-container">
      <div className="phone-frame">
        <div className="phone-notch"></div>

        <BrowserRouter>
          <StatusBar />

          <div className="phone-screen">
            <Routes>
              <Route path="/*" element={<AuthNavigator />} />
              <Route path="/farmer/*" element={<FarmerTabs />} />
              <Route path="/expert/*" element={<ExpertTabs />} />
              <Route path="/vendor/*" element={<VendorTabs />} />
            </Routes>
            <FloatingAIButton />
          </div>
        </BrowserRouter>

        <div className="phone-home-indicator"></div>
      </div>
    </div>
  );
}
