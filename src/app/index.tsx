import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function IndexScreen() {
  // The global routing logic in _layout.tsx will immediately redirect the user 
  // from this index screen to either /(auth), /(main), or /onboarding based on their session.
  // We just return a loading spinner to prevent the "Unmatched Route" error.
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
      <ActivityIndicator size="large" color="#047857" />
    </View>
  );
}
