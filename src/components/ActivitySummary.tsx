// src/components/ActivitySummary.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ActivityProps {
  scansCount: number;
  listingsCount: number;
}

export default function ActivitySummary({ scansCount, listingsCount }: ActivityProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Activity Summary 📊</Text>
      
      <View style={styles.gridRow}>
        <View style={styles.gridBox}>
          <Text style={styles.metricNumber}>{scansCount}</Text>
          <Text style={styles.metricLabel}>Disease Scans</Text>
        </View>
        
        <View style={styles.gridBox}>
          <Text style={styles.metricNumber}>{listingsCount}</Text>
          <Text style={styles.metricLabel}>Active Listings</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  gridRow: { flexDirection: 'row', gap: 12 },
  gridBox: { flex: 1, backgroundColor: '#f8fafc', padding: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#f1f5f9' },
  metricNumber: { fontSize: 22, fontWeight: 'bold', color: '#047857' },
  metricLabel: { fontSize: 12, color: '#64748b', marginTop: 2, fontWeight: '500' },
});