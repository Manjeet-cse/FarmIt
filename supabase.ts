import 'react-native-url-polyfill/auto';
import * as SecureStore from 'expo-secure-store';
import { createClient } from '@supabase/supabase-js';

// Custom adapter to make Expo SecureStore compatible with Supabase's expected storage shape
const ExpoSecureStoreAdapter = {
  getItem: async (key: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(key);
  },
  setItem: async (key: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(key, value);
  },
  removeItem: async (key: string): Promise<void> => {
    await SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = 'https://ymddrwsdfbadmzucjgfs.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZGRyd3NkZmJhZG16dWNqZ2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNzA0NTQsImV4cCI6MjA5NTk0NjQ1NH0.SRpcyGp8p-v_aqJWEkSLMN5S1lch6buz3gpMA2ykuWI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});