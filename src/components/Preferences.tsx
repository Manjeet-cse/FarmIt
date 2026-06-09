// src/components/Preferences.tsx
import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';

interface PreferenceProps {
  language: string;
}

export default function Preferences({ language }: PreferenceProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>App Preferences ⚙️</Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Dashboard Language:</Text>
        <Text style={styles.value}>{language || 'English'}</Text>
      </View>

      <View style={[styles.infoRow, { marginTop: 4, marginBottom: 0 }]}>
        <Text style={styles.label}>Weather & Mandi Alerts:</Text>
        <Switch value={true} trackColor={{ false: '#cbd5e1', true: '#a7f3d0' }} thumbColor={'#047857'} disabled />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  label: { color: '#64748b', fontSize: 14 },
  value: { color: '#334155', fontSize: 14, fontWeight: '600' },
});