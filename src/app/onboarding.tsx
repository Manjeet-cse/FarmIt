// src/app/onboarding.tsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { supabase } from '../../supabase';

const TOTAL_STEPS = 5;
const CROP_OPTIONS = ['Wheat', 'Rice', 'Mustard', 'Sugarcane', 'Cotton', 'Vegetables'];
const LANG_OPTIONS = [
  { label: 'Hindi (हिंदी)', value: 'Hindi' },
  { label: 'Punjabi (ਪੰਜਾਬੀ)', value: 'Punjabi' },
  { label: 'Marathi (मराठी)', value: 'Marathi' },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form Field States
  const [name, setName] = useState('');
  const [stateName, setStateName] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [acres, setAcres] = useState('');
  const [preferredLang, setPreferredLang] = useState('');

  // Helper to toggle multi-select crops selection array
  const toggleCrop = (crop: string) => {
    if (selectedCrops.includes(crop)) {
      setSelectedCrops(selectedCrops.filter((c) => c !== crop));
    } else {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  // 🚀 The Core Submission Logic connected to your Supabase schema
  const submitOnboardingData = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user session found');

      // 1. Update the 'farmers' registry table row
      const { error: farmerError } = await supabase.from('farmers').upsert({
        id: user.id,
        phone: user.phone || '', 
        name: name.trim(),
        state: stateName.trim(),
        district: district.trim(),
        preferred_lang: preferredLang,
      });
      
      if (farmerError) throw farmerError;

      // 2. Map select elements directly to your 'crops' table format
      const cropRows = selectedCrops.map((crop) => ({
        farmer_id: user.id,
        crop_type: crop,
        area_acres: parseFloat(acres) || 0,
        status: 'active'
      }));

      // 3. Batch insert row array entries simultaneously
      const { error: cropError } = await supabase.from('crops').insert(cropRows);
      if (cropError) throw cropError;

      // 4. Success -> Let RootLayout handle routing to dashboard
      router.replace('/(main)');

    } catch (error: any) {
      Alert.alert('Database Error', error.message || 'Something went wrong while saving your details.');
    } finally {
      setLoading(false);
    }
  };

  // Handles basic field checks before changing index steps
  const handleNext = () => {
    if (currentStep === 1 && !name.trim()) return Alert.alert('Required', 'Please enter your name');
    if (currentStep === 2 && (!stateName.trim() || !district.trim())) return Alert.alert('Required', 'Please enter your location details');
    if (currentStep === 3 && selectedCrops.length === 0) return Alert.alert('Required', 'Please pick at least one crop');
    if (currentStep === 4 && !acres.trim()) return Alert.alert('Required', 'Please specify your acreage scale');
    if (currentStep === 5 && !preferredLang) return Alert.alert('Required', 'Please pick your language style');

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      submitOnboardingData(); // Trigger final submission callback at last step
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Structural Progress Tracking Bar */}
      <View style={styles.progressTracker}>
        <View style={[styles.progressIndicator, { width: `${(currentStep / TOTAL_STEPS) * 100}%` }]} />
        <Text style={styles.progressText}>Step {currentStep} of {TOTAL_STEPS}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollForm}>
        {/* Step 1: Identity Parameter */}
        {currentStep === 1 && (
          <View>
            <Text style={styles.titleHeading}>1. Aapka naam kya hai?</Text>
            <Text style={styles.subLabel}>Please enter your full name</Text>
            <TextInput style={styles.textInputBlock} placeholder="Enter your full name..." value={name} onChangeText={setName} />
          </View>
        )}

        {/* Step 2: Regional Area Geolocation Parameters */}
        {currentStep === 2 && (
          <View>
            <Text style={styles.titleHeading}>2. Aap kahan ke rehne wale hain?</Text>
            <Text style={styles.subLabel}>Enter your regional state and district boundaries</Text>
            <TextInput style={styles.textInputBlock} placeholder="State (e.g. Haryana)" value={stateName} onChangeText={setStateName} />
            <TextInput style={styles.textInputBlock} placeholder="District" value={district} onChangeText={setDistrict} />
          </View>
        )}

        {/* Step 3: Relational Crops Selector Array */}
        {currentStep === 3 && (
          <View>
            <Text style={styles.titleHeading}>3. Aap kaunsi fasal ugaate hain?</Text>
            <Text style={styles.subLabel}>Select all the items you are currently harvesting</Text>
            <View style={styles.badgeWrapGrid}>
              {CROP_OPTIONS.map((crop) => {
                const checked = selectedCrops.includes(crop);
                return (
                  <TouchableOpacity key={crop} style={[styles.badgeItem, checked && styles.badgeItemChecked]} onPress={() => toggleCrop(crop)}>
                    <Text style={[styles.badgeItemText, checked && styles.badgeItemTextChecked]}>
                      {checked ? '✓ ' : ''}{crop}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Step 4: Scale Tracker Factor */}
        {currentStep === 4 && (
          <View>
            <Text style={styles.titleHeading}>4. Aapki zameen kitni hai?</Text>
            <Text style={styles.subLabel}>Specify your farm ground coverage area scale metric</Text>
            <TextInput style={styles.textInputBlock} placeholder="Total area size in acres..." keyboardType="numeric" value={acres} onChangeText={setAcres} />
          </View>
        )}

        {/* Step 5: Localization Preferred String Flag */}
        {currentStep === 5 && (
          <View>
            <Text style={styles.titleHeading}>5. Kaunsi bhasha prefer karte hain?</Text>
            <Text style={styles.subLabel}>Choose your dashboard dashboard configuration interface language</Text>
            {LANG_OPTIONS.map((lang) => {
              const matched = preferredLang === lang.value;
              return (
                <TouchableOpacity key={lang.value} style={[styles.rowSelectorCard, matched && styles.rowSelectorCardMatched]} onPress={() => setPreferredLang(lang.value)}>
                  <Text style={[styles.rowText, matched && styles.rowTextMatched]}>{lang.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* Control Navigation Flow Button Footer Bar */}
      <View style={styles.footerBarRow}>
        {currentStep > 1 ? (
          <TouchableOpacity style={styles.backLink} onPress={handleBack} disabled={loading}>
            <Text style={styles.backLinkText}>Back</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 80 }} />
        )}

        <TouchableOpacity style={styles.actionTriggerButton} onPress={handleNext} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.actionTriggerButtonText}>{currentStep === TOTAL_STEPS ? 'Finish 🎉' : 'Next'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc', paddingHorizontal: 20 },
  progressTracker: { marginTop: 15, marginBottom: 20 },
  progressIndicator: { height: 5, backgroundColor: '#047857', borderRadius: 2.5 },
  progressText: { fontSize: 12, color: '#64748b', marginTop: 6, fontWeight: '500' },
  scrollForm: { flexGrow: 1, justifyContent: 'center', paddingVertical: 20 },
  titleHeading: { fontSize: 22, fontWeight: 'bold', color: '#1e293b', marginBottom: 4 },
  subLabel: { fontSize: 14, color: '#64748b', marginBottom: 20 },
  textInputBlock: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, padding: 14, fontSize: 16, color: '#334155', marginBottom: 14 },
  badgeWrapGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badgeItem: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 10 },
  badgeItemChecked: { backgroundColor: '#d1fae5', borderColor: '#047857' },
  badgeItemText: { fontSize: 14, color: '#475569', fontWeight: '500' },
  badgeItemTextChecked: { color: '#065f46', fontWeight: 'bold' },
  rowSelectorCard: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 10, padding: 16, marginBottom: 10 },
  rowSelectorCardMatched: { backgroundColor: '#d1fae5', borderColor: '#047857' },
  rowText: { fontSize: 15, color: '#334155', fontWeight: '500' },
  rowTextMatched: { color: '#065f46', fontWeight: 'bold' },
  footerBarRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingTop: 10 },
  backLink: { padding: 14, width: 80, alignItems: 'center' },
  backLinkText: { fontSize: 15, color: '#64748b', fontWeight: '600' },
  actionTriggerButton: { backgroundColor: '#047857', paddingVertical: 14, paddingHorizontal: 28, borderRadius: 10, minWidth: 110, alignItems: 'center', justifyContent: 'center' },
  actionTriggerButtonText: { fontSize: 15, color: '#fff', fontWeight: 'bold' },
});