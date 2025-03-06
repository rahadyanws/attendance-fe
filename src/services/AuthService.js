// src/services/AuthService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/auth'; // Ganti dengan URL backend Anda

class AuthService {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      
      return response.data; // Asumsikan respons berisi { token: '...' }
    } catch (error) {
      throw error.response?.data || error;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  decodeJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Gagal mendekode token JWT:', error);
      return null;
    }
  }
}

export default new AuthService();