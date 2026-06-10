// src/app/(main)/index.tsx
import React from 'react';
import { StyleSheet, Text, ScrollView, View, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeatherWidget from '../../components/WeatherWidget';
import { supabase } from '../../../supabase';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function FarmersDashboard() {
  return (
    <SafeAreaView style={styles.topSafeArea} edges={['top']}>
      <View style={styles.safeContainer}>
        {/* Custom Header */}
        <View style={styles.headerBlock}>
          <TouchableOpacity>
            <Ionicons name="menu" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.logoText}>FarmIt</Text>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="notifications-outline" size={24} color="#fff" />
              <View style={styles.badge} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.profileCircle}>
              <View style={styles.profileInner} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          {/* Your Crops Section - Coming Soon Placeholder */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Your Crops</Text>
            <View style={styles.comingSoonCard}>
              <Ionicons name="leaf-outline" size={32} color="#047857" style={{ marginBottom: 8 }} />
              <Text style={styles.comingSoonTitle}>Crop Management Coming Soon!</Text>
              <Text style={styles.comingSoonDesc}>Track health, get irrigation schedules, and receive personalized alerts for your crops.</Text>
            </View>
          </View>

          <View style={{ height: 24 }} />

          {/* Integrated Weather Sub-Component */}
          <WeatherWidget />

          {/* Quick Actions */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsGrid}>
              
              <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(main)/coming-soon?feature=AI%20Diagnosis')}>
                <View style={[styles.iconCircle, { backgroundColor: '#dcfce7' }]}>
                  <MaterialIcons name="medical-services" size={24} color="#16a34a" />
                </View>
                <Text style={styles.actionText}>AI Diagnosis</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(main)/coming-soon?feature=Marketplace')}>
                <View style={[styles.iconCircle, { backgroundColor: '#fef3c7' }]}>
                  <Ionicons name="cart" size={24} color="#d97706" />
                </View>
                <Text style={styles.actionText}>Marketplace</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(main)/coming-soon?feature=Ask%20an%20Expert')}>
                <View style={[styles.iconCircle, { backgroundColor: '#e0e7ff' }]}>
                  <MaterialCommunityIcons name="head-cog-outline" size={26} color="#4f46e5" />
                </View>
                <Text style={styles.actionText}>Ask an Expert</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(main)/coming-soon?feature=Govt%20Schemes')}>
                <View style={[styles.iconCircle, { backgroundColor: '#fae8ff' }]}>
                  <MaterialIcons name="account-balance" size={24} color="#9333ea" />
                </View>
                <Text style={styles.actionText}>Govt Schemes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(main)/coming-soon?feature=Mandi%20Prices')}>
                <View style={[styles.iconCircle, { backgroundColor: '#fef08a' }]}>
                  <MaterialCommunityIcons name="storefront" size={24} color="#ca8a04" />
                </View>
                <Text style={styles.actionText}>Mandi Prices</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(main)/coming-soon?feature=Learning')}>
                <View style={[styles.iconCircle, { backgroundColor: '#dbeafe' }]}>
                  <Ionicons name="school" size={24} color="#2563eb" />
                </View>
                <Text style={styles.actionText}>Learning</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(main)/coming-soon?feature=Weather%20Alert')}>
                <View style={[styles.iconCircle, { backgroundColor: '#d1fae5' }]}>
                  <MaterialCommunityIcons name="weather-sunny" size={24} color="#059669" />
                </View>
                <Text style={styles.actionText}>Weather Alert</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionItem} onPress={() => router.push('/(main)/coming-soon?feature=AI%20Chat')}>
                <View style={[styles.iconCircle, { backgroundColor: '#ffedd5' }]}>
                  <MaterialCommunityIcons name="robot-outline" size={24} color="#ea580c" />
                </View>
                <Text style={styles.actionText}>AI Chat</Text>
              </TouchableOpacity>

            </View>
          </View>

          {/* Test Controls (Moved to bottom, kept for utility) */}
          <View style={styles.testControls}>
            <TouchableOpacity onPress={() => router.push('/(main)/profile')} style={styles.testBtn}>
              <Text style={styles.testBtnText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={async () => await supabase.auth.signOut()} style={[styles.testBtn, { backgroundColor: '#ef4444' }]}>
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
          
          <View style={{ height: 100 }} /> {/* Padding for bottom nav & FAB */}
        </ScrollView>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab}>
          <MaterialCommunityIcons name="robot-outline" size={28} color="#fff" />
          <View style={styles.fabLabel}>
            <Text style={styles.fabLabelText}>Talk to AI</Text>
          </View>
        </TouchableOpacity>

        {/* Bottom Navigation Bar */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="home" size={24} color="#047857" />
            <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <FontAwesome name="stethoscope" size={22} color="#64748b" />
            <Text style={styles.navText}>Diagnosis</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="people-outline" size={24} color="#64748b" />
            <Text style={styles.navText}>Experts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="book-outline" size={24} color="#64748b" />
            <Text style={styles.navText}>Learning</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="cart-outline" size={24} color="#64748b" />
            <Text style={styles.navText}>Marketplace</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topSafeArea: { flex: 1, backgroundColor: '#388E3C' },
  safeContainer: { flex: 1, backgroundColor: '#f8fafc' },
  headerBlock: { 
    backgroundColor: '#388E3C', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  logoText: { fontSize: 20, fontWeight: 'bold', color: '#fff', flex: 1, marginLeft: 16 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 16 },
  iconButton: { position: 'relative' },
  badge: { position: 'absolute', top: 2, right: 4, width: 8, height: 8, borderRadius: 4, backgroundColor: '#ef4444', borderWidth: 1, borderColor: '#388E3C' },
  profileCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#16a34a', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#fff' },
  profileInner: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#86efac' },
  scrollContainer: { paddingBottom: 30 },
  sectionContainer: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#0f172a', marginBottom: 16 },
  comingSoonCard: { 
    backgroundColor: '#ecfdf5', 
    padding: 20, 
    borderRadius: 16, 
    borderWidth: 1, 
    borderColor: '#a7f3d0',
    alignItems: 'center'
  },
  comingSoonTitle: { fontSize: 16, fontWeight: 'bold', color: '#065f46', marginBottom: 6 },
  comingSoonDesc: { fontSize: 13, color: '#047857', textAlign: 'center', lineHeight: 18 },
  quickActionsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 },
  actionItem: { width: '22%', alignItems: 'center', marginBottom: 12 },
  iconCircle: { width: 56, height: 56, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  actionText: { fontSize: 11, fontWeight: '600', color: '#0f172a', textAlign: 'center' },
  testControls: { flexDirection: 'row', justifyContent: 'center', gap: 12, marginTop: 40, opacity: 0.5 },
  testBtn: { backgroundColor: '#e2e8f0', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 8 },
  testBtnText: { color: '#475569', fontWeight: 'bold' },
  fab: { 
    position: 'absolute', 
    right: 20, 
    bottom: 90, 
    backgroundColor: '#f59e0b', 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    justifyContent: 'center', 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6
  },
  fabLabel: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#334155',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  fabLabelText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingBottom: 5, 
  },
  navItem: { alignItems: 'center', justifyContent: 'center' },
  navText: { fontSize: 10, color: '#64748b', marginTop: 4, fontWeight: '500' },
  navTextActive: { color: '#047857', fontWeight: '700' },
});