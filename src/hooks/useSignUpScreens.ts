import { useState, useEffect } from 'react';
import { SignUpScreen } from '../types/index';

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
    baseURL: API_URL,
});

export const useSignUpScreens = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveScreen = async (screen: Partial<SignUpScreen>) => {
    try {
      setIsLoading(true);
      
      await api.post('/signupscreen', screen);

    } catch (err) {
      console.error('Save error:', err);
      setError(err instanceof Error ? err.message : 'Failed to save screen');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loadScreen = async () => {
    try {
      const response = await api.get('/signupscreen');
      const existingData = response.data;

      return existingData;

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load screen');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
  }, []);

  return {
    isLoading,
    error,
    saveScreen,
    loadScreen,
  };
};