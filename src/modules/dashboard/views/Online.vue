<script setup lang="ts">
  import { onUnmounted, ref, watch  } from 'vue';
  import { storeToRefs } from 'pinia';
  import Card from '@/ui/Card.vue';

  import useAlarmStore from '@/stores/alarm';

  const { fetchLastAlarm } = useAlarmStore();
  const { lastAlarm, getDataCard } = storeToRefs( useAlarmStore());

  const loading = ref(false)
  const activate = ref(false)
  const message = ref('Esperando Inicio')
  const classAlert = ref({ color: 'info', icon: '$info'})

  let interval = 0;

  async function load() {
    loading.value = true
    await fetchLastAlarm();
    loading.value = false
  }

  const stopInterval  = () => {
    clearInterval(interval);
  }

  const startInterval  = () => {
    interval = setInterval(() => {
      load()
    }, 2000);
  }

  watch(activate, (newActivate: boolean) => {
    if (newActivate) {
      startInterval()
    } else {
      stopInterval()
    }
  })

  watch(getDataCard, (newGetDataCard) => {
    if (newGetDataCard.IsIdentification) {
      message.value = 'Identificado'
      classAlert.value = { color: 'success', icon: '$success' }
    } else {
      message.value = 'No Identificado'
      classAlert.value = { color: 'warning', icon: '$warning' }
    }
  })

  onUnmounted(() => {
    clearInterval(interval);
  });

</script>

<template>
  <v-container >
    <h2>Online</h2>
    <v-row  no-gutters>
      <v-col cols="12">
        <v-switch
          color="primary"
          v-model="activate"
          label="Iniciar"
        ></v-switch>
      </v-col>
    </v-row>
    <v-row no-gutters >
      <v-col cols="8" offset="2" align-self="center">
        <v-alert
          :color="classAlert.color"
          :icon="classAlert.icon"
          :title="message"
          class="mb-2 mx-4"
        ></v-alert>
        <Card/>
      </v-col>
    </v-row>
  </v-container>
</template>