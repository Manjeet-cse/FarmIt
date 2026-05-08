import React from 'react';
import AppTopBar from '../../components/common/AppTopBar';
import BottomTabs from '../../components/layout/BottomTabs';

export default function SettingsScreen() {
  return (
    <div className="flex flex-col h-full bg-surface-containerLowest">
      <AppTopBar title="Settings" />
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-6xl text-outline-variant mb-4">settings</span>
        <h2 className="font-headline font-bold text-xl text-onSurface mb-2 m-0">Settings</h2>
        <p className="text-onSurface-variant text-center font-body m-0">App configuration and preferences.</p>
      </div>
      <BottomTabs />
    </div>
  );
}
