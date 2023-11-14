<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import Table from '@/ui/Table.vue';
  
  import useGroupStore from '@/stores/group';
  const { fetchGroups } = useGroupStore();
  const { groups } = storeToRefs(useGroupStore());

  const headers = [
    {
      align: 'start',
      key: 'key',
      sortable: false,
      title: 'Nombre',
    },
    { key: 'value', title: 'Código' },
  ]

  const fetchGroup = async () => {
    await fetchGroups();
  };

  onMounted(async () => {
    await fetchGroups()
  });
</script>

<template>
  <v-container >

    <h2>Grupos</h2>
    <Table :data="groups" :headers="headers"/>
  </v-container>
</template>