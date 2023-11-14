import { RouteRecordRaw } from 'vue-router';

// Static views
import Dashboard from '@/modules/dashboard/views/Dashboard.vue';
import Online from '@/modules/dashboard/views/Online.vue';
import Group from '@/modules/dashboard/views/Group.vue';
import Person from '@/modules/dashboard/views/Person.vue';
import Alarm from '@/modules/dashboard/views/Alarm.vue';


const dashboardRoutes: Array<RouteRecordRaw> = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
    },
    {
      path: '/online',
      name: 'Online',
      component: Online,
    },
    {
      path: '/group',
      name: 'Grupo',
      component: Group,
    },
    {
      path: '/person',
      name: 'Persona',
      component: Person,
    },
    {
      path: '/alarm',
      name: 'Alarmas',
      component: Alarm,
    },
  ];
  
  export default dashboardRoutes;
  