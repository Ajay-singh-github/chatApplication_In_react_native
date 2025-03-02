import { 
    View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Dimensions, ActivityIndicator 
  } from 'react-native';
  import { useState, useEffect } from 'react';
  import { getRoomDetails, getMessages, sendMessageToRoom } from '../services/api';
  
  export default function ChatScreen({ route }) {
    const { roomId, username } = route.params;  
    const [roomName, setRoomName] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
  
    // ✅ Fetch Room Details & Messages
    useEffect(() => {
      const fetchRoomDetails = async () => {
        try {
          const roomData = await getRoomDetails(roomId);
          setRoomName(roomData.name);
        } catch (error) {
          console.error('Error fetching room details:', error);
        }
      };
  
      const fetchMessages = async () => {
        try {
          const messagesData = await getMessages(roomId);
          setMessages(messagesData);
        } catch (error) {
          console.error('Error fetching messages:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchRoomDetails();
      fetchMessages();
  
      // ✅ Auto refresh messages every 5 seconds
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }, [roomId]);
  
    // ✅ Send Message
    const sendMessage = async () => {
      if (!message.trim()) return;
  
      try {
        const newMessage = await sendMessageToRoom(roomId, username, message);
        setMessages([...messages, newMessage]);  
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    };
  
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text>Loading Chat Room...</Text>
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <Text style={styles.roomTitle}>{roomName} Chat</Text>
  
        <FlatList
          data={messages}
          renderItem={({ item }) => (
            <View style={[styles.messageContainer, item.user === username ? styles.sentMessage : styles.receivedMessage]}>
              <Text style={styles.messageText}>
                <Text style={styles.messageUser}>{item.username}: </Text>{item.content}
              </Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.messagesContainer}
          inverted 
        />
  
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type a message"
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  
  const { width } = Dimensions.get('window');
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 15,
      backgroundColor: '#f2f2f2',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    roomTitle: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 20,
      textAlign: 'center',
    },
    messagesContainer: {
      paddingBottom: 20,
    },
    messageContainer: {
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
      maxWidth: '80%',
    },
    sentMessage: {
      backgroundColor: '#4CAF50',
      alignSelf: 'flex-end',
    },
    receivedMessage: {
      backgroundColor: '#ddd',
      alignSelf: 'flex-start',
    },
    messageText: {
      fontSize: 16,
      color: '#fff',
    },
    messageUser: {
      fontWeight: 'bold',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#ddd',
      paddingTop: 10,
    },
    input: {
      width: width - 100,
      padding: 10,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#ddd',
      backgroundColor: '#fff',
      fontSize: 16,
    },
    sendButton: {
      backgroundColor: '#4CAF50',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 30,
      marginLeft: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sendButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
  