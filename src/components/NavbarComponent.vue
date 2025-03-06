<template>
  <nav class="attendance-navbar">
    <div class="attendance-navbar-container">
      <a class="attendance-navbar-brand" href="#">Attendance App</a>
        <ul class="attendance-navbar-nav">
          <li class="attendance-nav-item">
            <router-link to="/editprofile" class="attendance-nav-link">Edit Profile</router-link>
          </li>
          <li class="attendance-nav-item">
            <router-link to="/addattendance" class="attendance-nav-link">Add Attendance</router-link>
          </li>
          <li class="attendance-nav-item">
            <button class="attendance-nav-button" @click="handleLogout">Logout</button>
          </li>
        </ul>
    </div>
  </nav>
</template>

<script>
import AuthService from '../services/AuthService';

export default {
  name: 'NavbarComponent',
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    handleLogout() {
      console.log('handleLogout')
      AuthService.logout();
      // Redirect to login page or perform other actions after logout
      this.$router.push('/login'); // Example: redirect to login
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
  },

};
</script>

<style scoped>
.attendance-navbar {
  background-color: #f8f9fa;
  /* Light background */
  padding: 10px 0;
  border-bottom: 1px solid #dee2e6;
  /* Subtle border */
}

.attendance-navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.attendance-navbar-brand {
  font-size: 1.2rem;
  font-weight: 300;
  text-decoration: none;
  color: #343a40;
  /* Dark text */
}

.attendance-navbar-toggler {
  background: transparent;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.attendance-navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  content: "";
  background: no-repeat center center;
  background-size: 100% 100%;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(0, 0, 0, 0.5)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.attendance-navbar-collapse {
  display: none;
  width: 100%;
}

.attendance-navbar-collapse.show {
  display: block;
}

.attendance-navbar-nav {
  list-style: none;
  padding: 0;
  margin: 10px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.attendance-nav-item {
  margin: 5px 0;
}

.attendance-nav-link,
.attendance-nav-button {
  text-decoration: none;
  color: #343a40;
  padding: 8px 15px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.attendance-nav-link:hover,
.attendance-nav-button:hover {
  background-color: #e9ecef;
  /* Light hover background */
}

@media (min-width: 992px) {
  .attendance-navbar-collapse {
    display: flex;
    width: auto;
  }

  .attendance-navbar-nav {
    flex-direction: row;
    margin: 0;
  }

  .attendance-nav-item {
    margin: 0 10px;
  }

  .attendance-navbar-toggler {
    display: none;
  }
}
</style>