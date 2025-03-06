<template>
  <NavbarComponent />
  <div class="container mt-5">
    <h1>Attendance List</h1>
    <div class="row mb-3">
      <div class="col-md-3">
        <label for="fromDate">From Date:</label>
        <input type="datetime-local" id="fromDate" class="form-control" v-model="filters.fromDate">
      </div>
      <div class="col-md-3">
        <label for="toDate">End Date:</label>
        <input type="datetime-local" id="toDate" class="form-control" v-model="filters.toDate">
      </div>
      <div class="col-md-3">
        <label for="timezone">Timezone:</label>
        <input id="timezone" class="form-control" v-model="filters.timezone">
      </div>
      <div class="col-md-3">
        <button class="btn btn-primary mt-4" @click="fetchAttendance">Filter</button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>IP</th>
            <th>Date Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="attendance in attendanceList" :key="attendance.id">
            <td>{{ attendance.name }}</td>
            <td>{{ attendance.longitude }}</td>
            <td>{{ attendance.latitude }}</td>
            <td>{{ attendance.ip }}</td>
            <td>{{ formatDateTime(attendance.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>
  </div>
  <FooterComponent />
</template>

<script>
import AttendanceService from '../services/AttendanceService';
import NavbarComponent from './NavbarComponent.vue';
import FooterComponent from './FooterComponent.vue';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      attendanceList: [],
      filters: {
        fromDate: null,
        toDate: null,
        timezone: null,
      },
      error: null,
      attendanceService: null,
    };
  },
  mounted() {
    this.attendanceService = new AttendanceService();
    this.getAttendances();
  },
  methods: {
    async fetchAttendance() {
      try {
        const response = await this.attendanceService.filterAttendances(
          this.filters.fromDate,
          this.filters.toDate,
          this.filters.timezone
        );
        this.attendanceList = response;
        this.error = null;
      } catch (err) {
        this.error = err.message || 'Failed to fetch attendance.';
      }
    },
    async getAttendances() {
      try {
        const response = await this.attendanceService.getAttendances();
        this.attendanceList = response;
        this.error = null;
      } catch (err) {
        this.error = err.message || 'Failed to get attendance.';
      }
    },
    formatDateTime(dateTime) {
      if (!dateTime) return '';
      const date = new Date(dateTime);
      return date.toLocaleString();
    },
  },
};
</script>