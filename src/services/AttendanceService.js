// AttendanceService.js
import axios from 'axios';
import AuthService from './AuthService';

const API_URL = 'http://localhost:3000/api/attendance';
const token = AuthService.getToken();

export default class AttendanceService {
  async filterAttendances (fromDate, toDate, timezone) {
    try {
      const response = await axios.get(`${API_URL}/filter`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          fromDate: fromDate,
          toDate: toDate,
          timezone: timezone,
        },      
      });
      console.log('response.data' + JSON.stringify(response.data))
      return response.data.data;
    } catch (error) {
      console.error('Error fetching atte ndance:', error);
      throw error;
    }
  }

  async getAttendances() {
    try {
      const response = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching attendance:', error);
      throw error;
    }
  }

  async saveAttendance(imageUrl, longitude, latitude, ip) {
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