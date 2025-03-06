<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <div v-if="error" class="alert alert-danger">{{ error }}</div>
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" id="username" class="form-control" v-model="username" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" id="password" class="form-control" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import AuthService from '../services/AuthService';
  
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: null,
      };
    },
    methods: {
      async login() {
        try {
          const response = await AuthService.login(this.username, this.password);
          // Simpan token JWT di localStorage atau cookie
          localStorage.setItem('token', response.accessToken);
          // Redirect ke halaman yang dilindungi
          this.$router.push('/dashboard');
        } catch (err) {
          this.error = err.message || 'Login gagal.';
        }
      },
    },
  };
  </script>