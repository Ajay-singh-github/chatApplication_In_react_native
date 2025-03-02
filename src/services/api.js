import axios from "axios";

const API_BASE_URL = "https://chat-api-k4vi.onrender.com"; 

export const setUsername = async (username) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/username`, { username });
    return response.data;
  } catch (error) {
    console.error("Error setting username:", error);
    return null;
  }
};

export const getRooms = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/rooms`);
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
};

export const createRoom = async (roomName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/rooms`, { name: roomName });
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error.response?.data || error.message);
    throw new Error(error.response?.data?.detail || 'Something went wrong. Please try again.');
  }
};

export const getMessages = async (roomId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/rooms/${roomId}/messages`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

export const getRoomDetails = async (roomId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/chat/rooms/${roomId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching room:', error.response?.data || error.message);
    throw new Error('Failed to fetch room details.');
  }
};

// ✅ Send Message to Room
export const sendMessageToRoom = async (roomId, user, text) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/chat/rooms/${roomId}/messages`, {
      user,
      text,
    });
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error.response?.data || error.message);
    throw new Error('Failed to send message.');
  }
};

export const getStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching stats:", error);
      return null;
    }
  };
