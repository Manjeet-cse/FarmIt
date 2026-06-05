import { Stack } from 'expo-router';

export default function MainLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#047857', // 🌾 Deep green theme matching your app logo
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* 🏠 The main dashboard screen */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'FarmIt Dashboard',
          headerShown: false // Hiding it here since we built a custom header inside your screen
        }} 
      />
      
      {/* 🌾 The Mandi Prices screen */}
      <Stack.Screen 
        name="mandi" 
        options={{ 
          title: 'Live Mandi Prices',
          headerBackTitle: 'Back' 
        }} 
      />
    </Stack>
  );
}