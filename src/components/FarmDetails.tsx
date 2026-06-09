// src/components/FarmDetails.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface FarmProps {
  district: string;
  state: string;
  totalAcres: number;
  crops: string[];
}

export default function FarmDetails({ district, state, totalAcres, crops }: FarmProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Farm Details 🚜</Text>
      
      <View style={styles.infoRow}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{district ? `${district}, ${state}` : 'Not specified'}</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>Total Land Area:</Text>
        <Text style={styles.value}>{totalAcres} Acres</Text>
      </View>

      <Text style={styles.subLabel}>Current Crops:</Text>
      <View style={styles.cropBadgeContainer}>
        {crops.length > 0 ? (
          crops.map((crop, idx) => (
            <View key={idx} style={styles.cropBadge}>
              <Text style={styles.cropText}>🌱 {crop}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.emptyText}>No active crops registered</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: '#64748b', fontSize: 14 },
  value: { color: '#334155', fontSize: 14, fontWeight: '600' },
  subLabel: { color: '#64748b', fontSize: 14, marginTop: 6, marginBottom: 8 },
  cropBadgeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  cropBadge: { backgroundColor: '#d1fae5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  cropText: { color: '#065f46', fontSize: 13, fontWeight: '600' },
  emptyText: { color: '#94a3b8', fontSize: 13, fontStyle: 'italic' },
});