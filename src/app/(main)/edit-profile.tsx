import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function EditProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Edit Profile</Text>
        <Text style={styles.subtitle}>Profile editing form coming soon...</Text>

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backBtnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#f8fafc' },
  container: { flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1e293b', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#64748b', marginBottom: 24 },
  backBtn: { backgroundColor: '#047857', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  backBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
