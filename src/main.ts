import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// import './style.css'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import router from './router';
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


const vuetify = createVuetify({
  components: {
    ...components,
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
    VueDatePicker
  },
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

createApp(App)
  .use(router)
  .use(createPinia())
  .use(vuetify)
  .mount('#app')