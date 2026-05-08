import { Routes, Route } from 'react-router-dom';
import BottomTabs from '../components/layout/BottomTabs';

// Dummy implementation for Vendor Screens
const VendorScreen = ({ title }) => (
  <div className="h-screen bg-muted flex items-center justify-center">
    <h2>Vendor Mode: {title}</h2>
    <BottomTabs role="vendor" />
  </div>
);

export default function VendorTabs() {
  return (
    <Routes>
      <Route path="dashboard" element={<VendorScreen title="Dashboard" />} />
      <Route path="orders" element={<VendorScreen title="Orders" />} />
      <Route path="products" element={<VendorScreen title="Products" />} />
      <Route path="earnings" element={<VendorScreen title="Earnings" />} />
      <Route path="profile" element={<VendorScreen title="Profile" />} />
    </Routes>
  );
}
