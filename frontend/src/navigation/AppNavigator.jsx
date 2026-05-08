import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthNavigator from './AuthNavigator';
import FarmerTabs from './FarmerTabs';
import ExpertTabs from './ExpertTabs';
import VendorTabs from './VendorTabs';

export default function AppNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AuthNavigator />} />
        <Route path="/farmer/*" element={<FarmerTabs />} />
        <Route path="/expert/*" element={<ExpertTabs />} />
        <Route path="/vendor/*" element={<VendorTabs />} />
      </Routes>
    </BrowserRouter>
  );
}
