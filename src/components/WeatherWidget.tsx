// src/components/WeatherWidget.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
  const BACKEND_URL = `http://192.168.0.103:5001/api/weather?lat=${LAT}&lon=${LON}`;

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
      <View style={[styles.cardCenter, styles.weatherCard]}>
        <ActivityIndicator size="small" color="#047857" />
      </View>
    );
  }

  if (!weather) return null;

  return (
    <View style={styles.weatherCard}>
      <View style={styles.topSection}>
        <View style={styles.leftCol}>
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color="#475569" />
            <Text style={styles.location}>{weather.location}</Text>
          </View>
          <View style={styles.tempRow}>
            <Text style={styles.temperature}>{weather.temp}°C</Text>
            <Ionicons name="sunny" size={24} color="#f59e0b" style={styles.weatherIcon} />
            <Text style={styles.conditionText}>• {weather.condition}</Text>
          </View>
        </View>
        <View style={styles.rightCol}>
          <Text style={styles.statText}>Humidity: {weather.humidity}%</Text>
          <Text style={styles.statText}>Wind: {weather.wind_speed} km/h</Text>
        </View>
      </View>

      {/* Placeholder for missing backend features */}
      <View style={styles.comingSoonSection}>
        <Text style={styles.impactTitle}>Weather Impact on Your Crops</Text>
        <View style={styles.comingSoonBox}>
           <Ionicons name="time-outline" size={20} color="#64748b" />
           <Text style={styles.comingSoonText}>Crop weather impact & 3-day forecast coming soon!</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardCenter: { height: 140, justifyContent: 'center', alignItems: 'center' },
  weatherCard: { 
    backgroundColor: '#fff', 
    padding: 16, 
    borderRadius: 16, 
    marginHorizontal: 16, 
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  leftCol: {
    flex: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  location: {
    fontSize: 13,
    color: '#334155',
    fontWeight: '600',
    marginLeft: 4,
  },
  tempRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  temperature: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0f172a',
  },
  weatherIcon: {
    marginLeft: 8,
    marginRight: 4,
  },
  conditionText: {
    fontSize: 14,
    color: '#0f172a',
    fontWeight: '600',
  },
  rightCol: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 2,
  },
  statText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '500',
    marginBottom: 6,
  },
  comingSoonSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  impactTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
  comingSoonBox: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  comingSoonText: {
    fontSize: 13,
    color: '#64748b',
    flex: 1,
  }
});