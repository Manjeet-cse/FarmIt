// src/app/(main)/profile.tsx
import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, ActivityIndicator, SafeAreaView, RefreshControl } from 'react-native';
import { useRouter } from 'expo-router';
import { supabase } from '../../../supabase';

// 📂 Import your newly created modular components
import ProfileHeader from '../../components/ProfileHeader';
import FarmDetails from '../../components/FarmDetails';
import Preferences from '../../components/Preferences';
import ActivitySummary from '../../components/ActivitySummary';

interface ProfileData {
  name: string;
  phone: string;
  state: string;
  district: string;
  preferred_lang: string;
  total_acres: number;
  crops_list: string[];
  scans_count: number;
  listings_count: number;
}

export default function ProfileScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  // 🔄 Fetch all profile information from your Supabase schema tables
  const fetchFarmerProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User context session not found');

      // 1. Query the primary identity metrics from 'farmers'
      const { data: farmerRow, error: farmerErr } = await supabase
        .from('farmers')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (farmerErr) throw farmerErr;

      // 2. Query all linked records inside the 'crops' table
      const { data: cropRows, error: cropErr } = await supabase
        .from('crops')
        .select('crop_type, area_acres')
        .eq('farmer_id', user.id);
      
      if (cropErr) throw cropErr;

      // 3. Query row aggregation counts from activity metric tables
      const { count: scansCount, error: scansErr } = await supabase
        .from('disease_scans')
        .select('*', { count: 'exact', head: true })
        .eq('farmer_id', user.id);

      const { count: listingsCount, error: listingsErr } = await supabase
        .from('listings')
        .select('*', { count: 'exact', head: true })
        .eq('farmer_id', user.id);

      // Map unique crops array and aggregate acreage scales safely
      const uniqueCrops = cropRows ? Array.from(new Set(cropRows.map(c => c.crop_type))) : [];
      const calculatedAcres = cropRows ? cropRows.reduce((acc, current) => acc + (Number(current.area_acres) || 0), 0) : 0;

      // 4. Update frontend state object layout
      setProfile({
        name: farmerRow.name || 'Farming Partner',
        phone: farmerRow.phone || user.phone || 'No Phone Linked',
        state: farmerRow.state || '',
        district: farmerRow.district || '',
        preferred_lang: farmerRow.preferred_lang || 'English',
        total_acres: calculatedAcres,
        crops_list: uniqueCrops,
        scans_count: scansCount || 0,
        listings_count: listingsCount || 0
      });

    } catch (error) {
      console.error('Profile aggregation pipeline dropped:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFarmerProfile();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFarmerProfile();
  };

  // 🚪 Simple handle to close local secure storage tokens
  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Your root _layout.tsx will instantly hear this state drop and route them to /(auth)/login
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#047857" />
        <Text style={styles.loadingText}>Loading Profile data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView 
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#047857']} />}
      >
        
        {/* Top Operational Title Bar */}
        <View style={styles.actionBar}>
          <Text style={styles.barTitle}>My Profile 👤</Text>
          <TouchableOpacity 
            style={styles.editBtn} 
            onPress={() => router.push('/edit-profile')} // Navigates to Point 3 of your checklist roadmap
          >
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {profile && (
          <>
            {/* Component 1: Name, Phone & Initials */}
            <ProfileHeader name={profile.name} phone={profile.phone} />

            {/* Component 2: Regional Boundaries, Crops Array, Acres */}
            <FarmDetails 
              district={profile.district} 
              state={profile.state} 
              totalAcres={profile.total_acres} 
              crops={profile.crops_list} 
            />

            {/* Component 3: Localization String & Alerts Toggles */}
            <Preferences language={profile.preferred_lang} />

            {/* Component 4: Disease Scans & Active Marketplace Items Listings */}
            <ActivitySummary scansCount={profile.scans_count} listingsCount={profile.listings_count} />
          </>
        )}

        {/* Safe Sign-Out Button Block */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log Out Connection 🚪</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f8fafc' },
  container: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' },
  loadingText: { marginTop: 10, color: '#64748b', fontSize: 14, fontWeight: '500' },
  actionBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingHorizontal: 4 },
  barTitle: { fontSize: 22, fontWeight: 'bold', color: '#1e293b' },
  editBtn: { backgroundColor: '#d1fae5', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  editBtnText: { color: '#047857', fontWeight: 'bold', fontSize: 14 },
  logoutButton: { borderColor: '#ef4444', borderWidth: 1.5, padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 10, backgroundColor: '#fef2f2' },
  logoutButtonText: { color: '#ef4444', fontSize: 15, fontWeight: 'bold' },
});