import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { setUsername as setUsernameAPI } from "../services/api.js";  // API function ko rename kar diya

const { width } = Dimensions.get('window');
const inputWidth = width - 40;

export default function LoginScreen({ navigation }) {
  const [username, setUser] = useState('');  // setUsername ko setUser bana diya
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleLogin = async () => {
    if (!username) return;  // Prevent empty username submission

    setLoading(true);  // Start loading
    try {
      const response = await setUsernameAPI(username); // API call
      if (response) {
        navigation.replace("RoomsList", { username });
      }
    } catch (error) {
      console.error("Error setting username:", error);
    } finally {
      setLoading(false); // Stop loading after the API call finishes
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Enter Your Name</Text>
      <TextInput
        placeholder="Enter name"
        value={username}
        onChangeText={setUser}  // setUsername ko replace kar diya
        style={[styles.input, { width: inputWidth }]}
      />
      <TouchableOpacity
        style={[styles.button, { width: inputWidth }, !username && styles.buttonDisabled]}
        onPress={handleLogin} // ✅ Corrected
        disabled={!username || loading} // Disable button during loading
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Join Chat</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#ddd',
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    paddingVertical: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
