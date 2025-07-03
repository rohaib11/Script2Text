import axios from 'axios';
import io from 'socket.io-client';

const API_URL = 'http://localhost:5000';
const socket = io(API_URL, {
  withCredentials: true,
  transports: ['websocket']
});

// OCR API Functions
export const uploadImage = async (file, language) => {
  const formData = new FormData();
  formData.append('image', file);
  
  const response = await axios.post(`${API_URL}/upload?lang=${language}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  
  return response.data.text;
};

export const checkApiStatus = async () => {
  try {
    await axios.get(`${API_URL}/health`);
    return true;
  } catch (error) {
    return false;
  }
};

// Real-time Collaboration Functions
export const initSocket = (callback) => {
  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server');
  });

  socket.on('text-update', (data) => {
    callback(data);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
};

export const sendTextUpdate = (text, roomId = 'default') => {
  socket.emit('text-update', { 
    text,
    roomId,
    timestamp: new Date().toISOString() 
  });
};

export const joinRoom = (roomId) => {
  socket.emit('join-room', { roomId });
};

export const leaveRoom = (roomId) => {
  socket.emit('leave-room', { roomId });
};

// History Functions
export const saveToCloud = async (content) => {
  try {
    const response = await axios.post(`${API_URL}/save`, {
      content,
      timestamp: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    console.error('Error saving to cloud:', error);
    throw error;
  }
};

export const loadFromCloud = async (documentId) => {
  try {
    const response = await axios.get(`${API_URL}/load/${documentId}`);
    return response.data;
  } catch (error) {
    console.error('Error loading from cloud:', error);
    throw error;
  }
};