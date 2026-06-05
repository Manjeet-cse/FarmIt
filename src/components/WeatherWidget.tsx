// src/components/WeatherWidget.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';

interface WeatherData {
  location: string;
  temp: number;
  feels_like: number;
  humidity: number;
  condition: string;
  description: string;
  wind_speed: number;
}

export default function WeatherWidget() {
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  // Default testing coordinates for North India region
  const LAT = '28.6139';
  const LON = '77.2090';
  // Use your local IP if testing on a real mobile device
  const BACKEND_URL = `http://192.168.0.101:5001/api/weather?lat=${LAT}&lon=${LON}`;

  useEffect(() => {
    fetch(BACKEND_URL)
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setWeather(json);
      })
      .catch((err) => console.error('Weather fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.cardCenter}>
        <ActivityIndicator size="small" color="#0284c7" />
      </View>
    );
  }

  if (!weather) return null;

  return (
    <View style={styles.weatherCard}>
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.greeting}>Welcome Back! 👋</Text>
          <Text style={styles.location}>📍 {weather.location}</Text>
        </View>
        <Text style={styles.temperature}>{weather.temp}°C</Text>
      </View>

      <View style={styles.badgeContainer}>
        <Text style={styles.conditionBadge}>🌤️ {weather.condition}</Text>
        <Text style={styles.descText}>{weather.description}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>HUMIDITY</Text>
          <Text style={styles.statValue}>{weather.humidity}%</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>WIND</Text>
          <Text style={styles.statValue}>{weather.wind_speed} m/s</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>FEELS LIKE</Text>
          <Text style={styles.statValue}>{weather.feels_like}°C</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardCenter: { height: 140, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 16, margin: 16 },
  weatherCard: { backgroundColor: '#0284c7', padding: 20, borderRadius: 16, margin: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  greeting: { fontSize: 14, color: '#e0f2fe', fontWeight: '500' },
  location: { fontSize: 16, color: '#fff', fontWeight: 'bold', marginTop: 2 },
  temperature: { fontSize: 32, fontWeight: 'bold', color: '#fff' },
  badgeContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 8 },
  conditionBadge: { backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, fontSize: 12, fontWeight: '600', overflow: 'hidden' },
  descText: { color: '#e0f2fe', fontSize: 13, textTransform: 'capitalize' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.15)' },
  statBox: { alignItems: 'center', flex: 1 },
  statLabel: { fontSize: 10, color: '#bae6fd', fontWeight: '600', marginBottom: 2 },
  statValue: { fontSize: 14, fontWeight: 'bold', color: '#fff' },
});