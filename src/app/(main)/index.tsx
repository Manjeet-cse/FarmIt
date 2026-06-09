// src/app/(main)/index.tsx
import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherWidget from '../../components/WeatherWidget'; // 🌤️ Import Weather Widget
import { supabase } from '../../../supabase';
import { router } from 'expo-router';

export default function FarmersDashboard() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Header Block */}
        <View style={styles.headerBlock}>
          <Text style={styles.logoText}>FarmIt 🌾</Text>
          <Text style={styles.subText}>Empowering our builders of the soil</Text>
        </View>

        {/* 1. Integrated Weather Sub-Component */}
        <WeatherWidget />

        {/* 2. Placeholder for upcoming features */}
        <View style={styles.placeholderCard}>
          <Text style={styles.cardTitle}>Upcoming Tools ⚙️</Text>
          <Text style={styles.cardBody}>
            Soon you can manage crop cycles, check live Mandi trends, and schedule field irrigation right from this dashboard block.
          </Text>
        </View>

        <TouchableOpacity onPress={() => router.push('/(main)/profile')} style={styles.logoutButton}>
          <Text>Profile</Text>
        </TouchableOpacity>

        {/* 🛑 Temporary Logout Button for Testing */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={async () => {
            await supabase.auth.signOut();
          }}
        >
          <Text style={styles.logoutText}>LOG OUT</Text>
        </TouchableOpacity>

        {/* 🗑️ Temporary Delete Account Button for Testing Onboarding */}
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => {
            Alert.alert(
              "Delete Account",
              "Are you sure you want to delete your FarmIt profile? This will let you test the onboarding flow again.",
              [
                { text: "Cancel", style: "cancel" },
                { 
                  text: "Delete", 
                  style: "destructive",
                  onPress: async () => {
                    const { data: { user } } = await supabase.auth.getUser();
                    if (user) {
                      await supabase.from('farmers').delete().eq('id', user.id);
                      await supabase.from('crops').delete().eq('farmer_id', user.id);
                      await supabase.auth.signOut();
                    }
                  }
                }
              ]
            );
          }}
        >
          <Text style={styles.deleteText}>DELETE ACCOUNT</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f8fafc' },
  container: { paddingBottom: 30 },
  headerBlock: { paddingHorizontal: 20, paddingTop: 15, marginBottom: 5 },
  logoText: { fontSize: 26, fontWeight: 'bold', color: '#047857' },
  subText: { fontSize: 13, color: '#64748b', marginTop: 2 },
  placeholderCard: { backgroundColor: '#fff', padding: 20, borderRadius: 16, margin: 16, borderWidth: 1, borderColor: '#e2e8f0' },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 8 },
  cardBody: { fontSize: 14, color: '#64748b', lineHeight: 20 },
  logoutButton: { backgroundColor: '#ef4444', marginHorizontal: 16, marginTop: 10, padding: 16, borderRadius: 12, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  deleteButton: { backgroundColor: '#fff', borderWidth: 2, borderColor: '#ef4444', marginHorizontal: 16, marginTop: 10, padding: 16, borderRadius: 12, alignItems: 'center' },
  deleteText: { color: '#ef4444', fontWeight: 'bold', fontSize: 16 },
});