<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import Table from '@/ui/Table.vue';
  
  import useAlarmStore from '@/stores/alarm';

  const { fetchAlarms } = useAlarmStore();
  const { getAlarms } = storeToRefs( useAlarmStore());

  const headers = [
    {
      align: 'start',
      key: 'Name',
      sortable: false,
      title: 'Nombre',
    },
    { key: 'LastName', title: 'Apellidos' },
    { key: 'Group', title: 'Grupo' },
    { key: 'Date', title: 'Fecha' },
    { key: 'IsIdentification', title: 'Identificado' },

  ]

  const fetchListAlarms = async () => {
    await fetchAlarms();
  };

  onMounted(async () => {
    await fetchListAlarms()
  });
</script>

<template>
  <v-container >

    <h2>Alarmas</h2>
    <Table :data="getAlarms" :headers="headers"/>
  </v-container>
</template>