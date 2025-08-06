import axios from 'axios';

// This is the address of your backend API Gateway
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sends a prompt to the backend for enhancement and analysis.
 * @param prompt The user's input prompt string.
 * @returns The processed data from the API.
 */
export const enhancePrompt = async (prompt: string) => {
  const response = await apiClient.post('/api/v1/enhance', { prompt });
  return response.data;
};