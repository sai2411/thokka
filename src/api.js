// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/users'; // Replace with your backend API URL

const api = axios.create({
  baseURL: BASE_URL,
});

export const signupUser = async (userData) => {
  try {
    const response = await api.post('http://localhost:8080/api/users/signup', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('http://localhost:8080/api/users/login', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
