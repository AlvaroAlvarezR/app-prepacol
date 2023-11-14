import INavbarItem from '@/interfaces/navbar-item';

const NAVBAR_ITEMS: INavbarItem[] = [
    {
      text: 'En vivo',
      src: '/online',
      icon: 'mdi-view-stream',
    },
    {
      text: 'Dashboard',
      src: '/dashboard',
      icon: 'mdi-monitor-dashboard',
    },
    {
      text: 'Grupos',
      src: '/group',
      icon: 'mdi-account-group',
    },
    {
      text: 'Personas',
      src: '/person',
      icon: 'mdi-domain',
    },
    {
      text: 'Alarmas',
      src: '/alarm',
      icon: 'mdi-alarm',
    },
  ];
  
  export default NAVBAR_ITEMS;
  