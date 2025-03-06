// AttendanceService.js
import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:3000/api/attendance';

export default class AttendanceService {
  async saveAttendance(imageUrl, longitude, latitude, ip) {
    console.log('saveAttendance')
    const token = AuthService.getToken();
    const decodedToken = AuthService.decodeJwt(token);
    const userId = decodedToken.userId;
    try {
      await axios.post(`${API_URL}`, {
        userId: userId,
        longitude: longitude,
        latitude: latitude,
        ip: ip,
        photo: imageUrl,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      throw error.response?.data || error;
    }

  }
}