import { Routes, Route } from 'react-router-dom';
import BottomTabs from '../components/layout/BottomTabs';

// Dummy implementation for Expert Screens
const ExpertScreen = ({ title }) => (
  <div className="h-screen bg-muted flex items-center justify-center">
    <h2>Expert Mode: {title}</h2>
    <BottomTabs role="expert" />
  </div>
);

export default function ExpertTabs() {
  return (
    <Routes>
      <Route path="dashboard" element={<ExpertScreen title="Dashboard" />} />
      <Route path="requests" element={<ExpertScreen title="Requests" />} />
      <Route path="calls" element={<ExpertScreen title="Calls" />} />
      <Route path="earnings" element={<ExpertScreen title="Earnings" />} />
      <Route path="profile" element={<ExpertScreen title="Profile" />} />
    </Routes>
  );
}
