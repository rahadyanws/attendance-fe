import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import DashboardPage from '../components/DashboardPage.vue'; // Buat komponen Dashboard
import EditProfilePage from '@/components/EditProfilePage.vue';
import AddAttendancePage from '@/components/AddAttendancePage.vue';

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/dashboard', component: DashboardPage, meta: { requiresAuth: true } },
  { path: '/', redirect: '/login' },
  { path: '/editprofile', component: EditProfilePage, meta: { requiresAuth: true } },
  { path: '/addattendance', component: AddAttendancePage, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = localStorage.getItem('token'); // Check if token exists

  if (requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to login if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

export default router;