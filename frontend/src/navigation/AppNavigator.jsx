import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthNavigator from './AuthNavigator';
import FarmerTabs from './FarmerTabs';
import ExpertTabs from './ExpertTabs';
import VendorTabs from './VendorTabs';
import ProtectedRoute from '../components/common/ProtectedRoute';

export default function AppNavigator() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AuthNavigator />} />
        <Route path="/farmer/*" element={
          <ProtectedRoute>
            <FarmerTabs />
          </ProtectedRoute>
        } />
        <Route path="/expert/*" element={
          <ProtectedRoute>
            <ExpertTabs />
          </ProtectedRoute>
        } />
        <Route path="/vendor/*" element={
          <ProtectedRoute>
            <VendorTabs />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
