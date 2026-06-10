import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ComingSoon() {
  const { feature } = useLocalSearchParams();
  const featureName = feature ? decodeURIComponent(feature as string) : 'This feature';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#0f172a" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <Ionicons name="construct-outline" size={80} color="#047857" style={styles.icon} />
        <Text style={styles.title}>Coming Soon!</Text>
        <Text style={styles.description}>
          We are working hard to bring <Text style={styles.highlight}>{featureName}</Text> to you. 
          Stay tuned for future updates!
        </Text>
        
        <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/(main)')}>
          <Text style={styles.homeButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 16, paddingLeft: 8 },
  backButton: { padding: 8, alignSelf: 'flex-start' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, paddingBottom: 60 },
  icon: { marginBottom: 24 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#0f172a', marginBottom: 12 },
  description: { fontSize: 16, color: '#64748b', textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  highlight: { fontWeight: 'bold', color: '#047857' },
  homeButton: { backgroundColor: '#047857', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 12 },
  homeButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});
