import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { getRooms as getRoomsAPI } from '../services/api';

export default function RoomsListScreen({ navigation, route }) {
  const { username } = route.params;
  const [rooms, setRooms] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Function to fetch rooms from API
  const getRooms = async () => {
    try {
      const response = await getRoomsAPI();
      setRooms(response);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch rooms on component mount
  useEffect(() => {
    getRooms();
  }, []);

  // Set header button for stats
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('stats screen')} style={styles.statsButton}>
          <Text style={styles.statsButtonText}>Stats</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {username}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <FlatList
          data={rooms}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.roomCard}
              onPress={() => navigation.navigate('Chat', { username, roomId: item.id })}
            >
              <Text style={styles.roomCardText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.flatListContent}
        />
      )}

      <TouchableOpacity
        style={styles.createRoomButton}
        onPress={() => navigation.navigate('CreateRoom')}
      >
        <Text style={styles.createRoomButtonText}>Create New Room</Text>
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  flatListContent: {
    marginBottom: 20,
  },
  roomCard: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: (width / 2) - 30,
    alignItems: 'center',
  },
  roomCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  createRoomButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    borderRadius: 10,
    width: width - 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  createRoomButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsButton: {
    marginRight: 15,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
  },
  statsButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
