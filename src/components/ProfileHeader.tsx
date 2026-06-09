// src/components/ProfileHeader.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  name: string;
  phone: string;
}

export default function ProfileHeader({ name, phone }: HeaderProps) {
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '👤';

  return (
    <View style={styles.container}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.farmerName}>{name || 'Farmer Partner'}</Text>
      <Text style={styles.farmerPhone}>{phone || 'No phone linked'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingVertical: 20, backgroundColor: '#fff', borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  avatarCircle: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#047857', justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  farmerName: { fontSize: 20, fontWeight: 'bold', color: '#1e293b' },
  farmerPhone: { fontSize: 14, color: '#64748b', marginTop: 2 },
});