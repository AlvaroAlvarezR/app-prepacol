import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotFound from '@/views/404.vue';
import dashboardRoutes from '@/modules/dashboard/routes';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/dashboard',
  },
  ...dashboardRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;