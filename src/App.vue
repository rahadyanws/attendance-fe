<template>
  <router-view />
</template>

<script>
import AuthService from './services/AuthService';

export default {
  created() {
    this.$router.beforeEach((to, from, next) => {
      const protectedRoutes = ['/dashboard']; // Rute yang dilindungi
      const isProtectedRoute = protectedRoutes.includes(to.path);
      const isLoggedIn = AuthService.getToken();

      if (isProtectedRoute && !isLoggedIn) {
        next('/login'); // Redirect ke login jika tidak login
      } else {
        next();
      }
    });
  },
};
</script>