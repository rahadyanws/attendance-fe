<template>
  <NavbarComponent />
  <div class="container attendance-container">
    <h1 class="attendance-title">Record Attendance</h1>
    <div class="row attendance-row">
      <div class="col-md-6 attendance-video-col">
        <video ref="video" width="400" height="300" autoPlay class="attendance-video"></video>
        <button class="attendance-button" @click="captureImage">Capture</button>
      </div>
      <div class="col-md-6 attendance-image-col">
        <img v-if="imageUrl" :src="imageUrl" alt="Captured Image" class="attendance-image">
        <p v-if="imageUrl" class="attendance-image-label">Captured Image (Base64)</p>
        <textarea v-if="imageUrl" class="attendance-textarea" rows="3" readonly v-model="imageUrl"></textarea>
      </div>
    </div>
    <div v-if="captureSuccess" class="attendance-success-alert">Attendance recorded successfully!</div>
    <div v-if="captureError" class="attendance-error-alert">{{ captureError }}</div>
  </div>
  <FooterComponent />
</template>

<script>
import Compressor from 'compressorjs';
import AttendanceService from '../services/AttendanceService';
import NavbarComponent from './NavbarComponent.vue';
import FooterComponent from './FooterComponent.vue';

export default {
  name: 'AddAttendancePage',
  data() {
    return {
      video: null,
      imageUrl: null,
      captureSuccess: false,
      captureError: null,
      attendanceService: null,
    };
  },
  components: {
    NavbarComponent,
    FooterComponent,
  },
  mounted() {
    this.attendanceService = new AttendanceService();
    this.startCamera();
  },
  methods: {
    async startCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.$refs.video.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
        this.captureError = 'Camera access denied or not available.';
      }
    },
    captureImage() {
      const canvas = document.createElement('canvas');
      canvas.width = this.$refs.video.videoWidth;
      canvas.height = this.$refs.video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(this.$refs.video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        new Compressor(blob, {
          quality: 0.6, // Adjust quality as needed (0 to 1)
          maxWidth: 800, // Adjust max width as needed
          maxHeight: 800, // Adjust max height as needed
          success: (compressedBlob) => {
            const reader = new FileReader();
            reader.onload = (e) => {
              this.imageUrl = e.target.result; // compressed base64
              this.saveAttendance();
            };
            reader.readAsDataURL(compressedBlob);
          },
          error(err) {
            console.error('Compression error:', err.message);
            this.imageUrl = canvas.toDataURL('image/png'); // fallback to uncompressed image
            this.saveAttendance();
          },
        });
      }, 'image/jpeg');
    },
    async saveAttendance() {
      try {
        const location = await this.getLocation();
        const ip = await this.getIp();
        await this.attendanceService.saveAttendance(this.imageUrl, location.longitude, location.latitude, ip);
        // await this.attendanceService.saveAttendance("base64 is to large payload", location.longitude, location.latitude, ip);
        this.captureSuccess = true;
        this.captureError = null;
      } catch (error) {
        console.error('Error saving attendance:', error);
        this.captureError = error.message || 'Failed to save attendance.';
        this.captureSuccess = false;
      }
    },
    getLocation() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
              });
            },
            (error) => {
              reject(new Error('Geolocation failed.' + error));
            }
          );
        } else {
          reject(new Error('Geolocation is not supported.'));
        }
      });
    },
    async getIp() {
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
      } catch (error) {
        console.error('Error fetching IP:', error);
        return 'Unknown IP';
      }
    },
  },
};
</script>

<style scoped>
.attendance-container {
  padding: 20px;
  font-family: sans-serif;
  /* Minimal font */
}

.attendance-title {
  font-size: 24px;
  font-weight: 300;
  /* Lighter font weight */
  margin-bottom: 20px;
  text-align: center;
}

.attendance-row {
  margin-bottom: 20px;
}

.attendance-video-col,
.attendance-image-col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.attendance-video {
  border: 1px solid #ddd;
  /* Subtle border */
  border-radius: 4px;
  /* Rounded corners */
  margin-bottom: 10px;
}

.attendance-button {
  background-color: #007bff;
  /* Primary color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.attendance-button:hover {
  background-color: #0056b3;
  /* Darker primary on hover */
}

.attendance-image {
  border: 1px solid #ddd;
  border-radius: 4px;
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
}

.attendance-image-label {
  font-size: 14px;
  margin-bottom: 5px;
  text-align: center;
}

.attendance-textarea {
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
  font-size: 12px;
  padding: 8px;
  width: 100%;
}

.attendance-success-alert,
.attendance-error-alert {
  padding: 10px;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  margin-top: 10px;
}

.attendance-success-alert {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.attendance-error-alert {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>