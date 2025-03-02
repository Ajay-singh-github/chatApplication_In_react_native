import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { createRoom } from '../services/api';

export default function CreateRoomScreen({ navigation }) {
  const [roomName, setRoomName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      Alert.alert('Error', 'Please enter a valid room name.');
      return;
    }

    setLoading(true);

    try {
      const data = await createRoom(roomName); // ✅ Corrected API call

      if (data) {
        Alert.alert('Success', 'Room created successfully!');
        navigation.navigate('Chat', { room: data.name, roomId: data.id });
      } else {
        Alert.alert('Error', 'Failed to create room.');
      }
    } catch (error) {
      console.log("Error:", error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Create a Room</Text>

      <TextInput
        placeholder="Enter room name"
        value={roomName}
        onChangeText={setRoomName}
        style={styles.input}
      />

      <TouchableOpacity
        style={[styles.createButton, (!roomName || loading) && styles.createButtonDisabled]}
        onPress={handleCreateRoom}
        disabled={!roomName || loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.createButtonText}>Create</Text>}
      </TouchableOpacity>
    </View>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: width - 40,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    fontSize: 16,
  },
  createButton: {
    width: width - 40,
    paddingVertical: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  createButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
