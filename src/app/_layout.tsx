// src/app/_layout.tsx
import { Session } from '@supabase/supabase-js';
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { supabase } from '../../supabase';

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);

  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // 1. Fetch initial session status on boot
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitializing(false);
    });

    // 2. Listen for real-time auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (initializing) return;

    const checkUserStatusAndRoute = async () => {
      const inMainGroup = segments[0] === '(main)';
      const inAuthGroup = segments[0] === '(auth)';
      const isOnboarding = segments[0] === 'onboarding';

      // CASE A: User is completely unauthenticated (Logged Out)
      if (!session) {
        if (!inAuthGroup) {
          router.replace('/(auth)/login');
        }
        return;
      }

      // CASE B: User is authenticated. Let's ask the backend if they have an active profile row
      try {
        const { data: farmerRow, error } = await supabase
          .from('farmers')
          .select('id')
          .eq('id', session.user.id)
          .maybeSingle(); // Prevents throwing an annoying error if zero rows are found

        if (error) throw error;

        if (!farmerRow) {
          // 🆕 TARGET LOGIC: Row is null! This is a brand-new registration.
          // Force them to stay on or go to onboarding, block dashboard access.
          if (!isOnboarding) {
            router.replace('/onboarding');
          }
        } else {
          // 🔄 TARGET LOGIC: Row exists! This is an existing returning user.
          // Bypass onboarding entirely and take them home.
          if (!inMainGroup) {
            router.replace('/(main)');
          }
        }
      } catch (err) {
        console.error('Backend user verification failure:', err);
      }
    };

    checkUserStatusAndRoute();
  }, [session, initializing, segments]);

  // Global loading block while database reads execute
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
        <ActivityIndicator size="large" color="#047857" />
      </View>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="(main)" />
    </Stack>
  );
}