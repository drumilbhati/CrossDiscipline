import axios from 'axios';
import { API_URL } from './constants.js';

console.log('API URL:', API_URL);

export const login = async (username, password) => {
    try {
        console.log('Attempting to login...');
        const response = await axios.post(`${API_URL}/api/login`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export const register = async (username, password) => {
    try{
        console.log('Attempting to register...');
        const response = await axios.post(`${API_URL}/api/register`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
}

export const adminLogin = async (username, password) => {
    try{
        console.log('Attempting to login');
        const response = await axios.post(`${API_URL}/api/admin-login`, {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}