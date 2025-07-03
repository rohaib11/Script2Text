import { useState } from 'react';
import { uploadImage } from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const processImage = async (file, language) => {
    setLoading(true);
    setError(null);
    try {
      const result = await uploadImage(file, language);
      return result;
    } catch (err) {
      setError(err.message || 'Failed to process image');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, processImage };
};