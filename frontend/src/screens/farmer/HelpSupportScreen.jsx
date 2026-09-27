import React from 'react';
import AppTopBar from '../../components/common/AppTopBar';
import { useIsMobile } from '../../hooks/useMediaQuery';

export default function HelpSupportScreen() {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col h-full bg-surface-light">
      {isMobile && <AppTopBar title="Help & Support" />}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">help</span>
        <h2 className="font-headline font-bold text-xl text-onSurface mb-2 m-0">Help & Support</h2>
        <p className="text-onSurface-variant text-center font-body m-0">Contact us for any assistance.</p>
      </div>
          </div>
  );
}
