// src/services/UserService.js
import axios from 'axios';
import AuthService from './AuthService'; // Untuk mendapatkan token

const API_URL = 'http://localhost:3000/api/users'; // Ganti dengan URL backend Anda

class UserService {
    async getProfile() {
        const token = AuthService.getToken();
        const decodedToken = AuthService.decodeJwt(token);
        try {
            const response = await axios.get(`${API_URL}/${decodedToken.userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log(JSON.stringify(response.data.data))
            return response.data.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    }

    async updateProfile(profile, newPassword) {
        const token = AuthService.getToken();
        const decodedToken = AuthService.decodeJwt(token);
        try {
            await axios.patch(`${API_URL}/${decodedToken.userId}`, {
                ...profile,
                password: newPassword, // Hanya kirim password jika ada perubahan
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            throw error.response?.data || error;
        }
    }
}

export default new UserService();