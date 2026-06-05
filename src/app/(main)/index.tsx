// src/app/(main)/index.tsx
import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherWidget from '../../components/WeatherWidget'; // 🌤️ Import Weather Widget
import { supabase } from '../../../supabase';

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

        {/* 🛑 Temporary Logout Button for Testing */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={async () => {
            await supabase.auth.signOut();
          }}
        >
          <Text style={styles.logoutText}>LOG OUT</Text>
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
});