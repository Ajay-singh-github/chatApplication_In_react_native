import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { getStats } from '../services/api';

export default function StatsScreen() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text style={styles.loadingText}>Loading Stats...</Text>
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load stats</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stats.active_rooms}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <>
            <Text style={styles.title}>Chat App Stats</Text>
            <View style={styles.statContainer}>
              <Text style={styles.statText}>Total Rooms: {stats.total_rooms}</Text>
              <Text style={styles.statText}>Total Users: {stats.total_users}</Text>
            </View>
            <Text style={styles.subTitle}>Active Rooms:</Text>
          </>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.roomItem}>
            <Text style={styles.roomName}>{item.name}</Text>
            <Text style={styles.roomDetails}>Created: {new Date(item.created_at).toLocaleString()}</Text>
            <Text style={styles.roomDetails}>Expires: {new Date(item.expires_at).toLocaleString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
  },
  loadingText: {
    fontSize: 18,
    marginTop: 15,
    color: '#ffffff',
    fontWeight: '600',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  errorText: {
    fontSize: 20,
    color: '#FF3B30',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  statContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
    marginBottom: 30,
  },
  statText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  roomItem: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 15,
    elevation: 5,
  },
  roomName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  roomDetails: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
});

