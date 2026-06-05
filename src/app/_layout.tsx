// src/app/_layout.tsx
import { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { supabase } from "../../supabase"; // Make sure this path correctly points to your supabase.ts file
import { View, ActivityIndicator } from "react-native";
import { Session } from "@supabase/supabase-js";

export default function RootLayout() {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);
  
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    // 1. Check initial storage session status on boot
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setInitializing(false);
    });

    // 2. Listen for auth state changes dynamically (Login, Logout, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (initializing) return;

    // Check if the user is currently viewing any screen inside the (main) folder group
    const inMainGroup = segments[0] === "(main)";

    if (!session && inMainGroup) {
      // 🛑 If session is lost or empty, kick them to login
      router.replace("/(auth)/login");
    } else if (session && !inMainGroup) {
      // 🚀 If user logs in successfully, immediately push them to the dashboard group
      router.replace("/(main)");
    }
  }, [session, initializing, segments]);

  // Loading spinner while checking storage state
  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f8fafc" }}>
        <ActivityIndicator size="large" color="#047857" />
      </View>
    );
  }

  // Your existing Stack layout config remains completely untouched below:
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="mandi" />
    </Stack>
  );
}