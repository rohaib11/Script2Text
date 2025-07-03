import React, { createContext, useState, useEffect } from 'react';
import { saveToHistory, getHistory } from '../services/storage';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('eng');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const loadHistory = async () => {
      const savedHistory = await getHistory();
      setHistory(savedHistory);
    };
    loadHistory();
  }, []);

  const addToHistory = async (item) => {
    const updatedHistory = await saveToHistory(item);
    setHistory(updatedHistory);
  };

  return (
    <AppContext.Provider
      value={{
        isProcessing,
        setIsProcessing,
        result,
        setResult,
        history,
        addToHistory,
        selectedLanguage,
        setSelectedLanguage,
        previewImage,
        setPreviewImage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};