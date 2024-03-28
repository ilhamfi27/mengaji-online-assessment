import axios from 'axios';
import { useState } from 'react';

export const request = axios.create({
  baseURL: '/api',
});
export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const client = request;
  client.interceptors.request.use((config) => {
    setLoading(true);
    return config;
  });
  client.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('something went wrong');
      }
      return Promise.reject(error);
    }
  );
  return { client, loading, errorMessage };
};
