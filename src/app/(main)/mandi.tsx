import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface MandiRecord {
  state: string;
  district: string;
  market: string;
  commodity: string;
  variety: string;
  min_price: string;
  max_price: string;
  modal_price: string;
}

export default function MandiScreen() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [mandiData, setMandiData] = useState<MandiRecord[]>([]);

  // Your computer's LAN IP (from the Expo Metro URL: exp://192.168.0.104:8081)
  // Must be on the same WiFi network as the phone
  const BACKEND_URL = 'http://192.168.0.103:5001/api/mandi';

  const fetchMandiPrices = async () => {
    try {
      const response = await fetch(BACKEND_URL);
      const json = await response.json();
      if (json.success) {
        setMandiData(json.data);
      }
    } catch (error) {
      console.error('Error connecting to local server:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMandiPrices();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMandiPrices();
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#059669" />
        <Text style={styles.loadingText}>Fetching Latest Mandi Prices...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>🌾 Live Mandi Dashboard</Text>
      
      <FlatList
        data={mandiData}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#059669']} />}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.commodity}>{item.commodity}</Text>
              <Text style={styles.variety}>{item.variety}</Text>
            </View>
            
            <Text style={styles.location}>📍 {item.market}, {item.district}</Text>
            
            <View style={styles.priceContainer}>
              <View style={styles.priceBlock}>
                <Text style={styles.priceLabel}>Min Price</Text>
                <Text style={styles.priceValue}>₹{item.min_price}</Text>
              </View>
              <View style={styles.priceBlock}>
                <Text style={styles.priceLabel}>Max Price</Text>
                <Text style={styles.priceValue}>₹{item.max_price}</Text>
              </View>
              <View style={[styles.priceBlock, styles.modalBackground]}>
                <Text style={[styles.priceLabel, styles.modalLabel]}>Avg Price</Text>
                <Text style={styles.modalValue}>₹{item.modal_price}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6', paddingHorizontal: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f3f4f6' },
  loadingText: { marginTop: 10, fontSize: 16, color: '#4b5563', fontWeight: '500' },
  header: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginVertical: 16, textAlign: 'center' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.2, shadowRadius: 1.41 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  commodity: { fontSize: 18, fontWeight: 'bold', color: '#065f46' },
  variety: { fontSize: 12, backgroundColor: '#d1fae5', color: '#065f46', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 12, fontWeight: '600' },
  location: { fontSize: 14, color: '#6b7280', marginBottom: 12 },
  priceContainer: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#f3f4f6', paddingTop: 10 },
  priceBlock: { alignItems: 'center', flex: 1 },
  priceLabel: { fontSize: 11, color: '#9ca3af', textTransform: 'uppercase', fontWeight: '600', marginBottom: 2 },
  priceValue: { fontSize: 14, fontWeight: '600', color: '#374151' },
  modalBackground: { backgroundColor: '#f0fdf4', borderRadius: 6, paddingVertical: 2 },
  modalLabel: { color: '#16a34a' },
  modalValue: { fontSize: 15, fontWeight: 'bold', color: '#15803d' }
});