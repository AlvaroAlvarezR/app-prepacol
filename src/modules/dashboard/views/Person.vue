<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { storeToRefs } from 'pinia';

  import Table from '@/ui/Table.vue';
  
  import useSubjectStore from '@/stores/subject';
  const { fetchListUsers } = useSubjectStore();
  const { subjects } = storeToRefs(useSubjectStore());

  const headers = [
    {
      align: 'start',
      key: 'Name',
      sortable: false,
      title: 'Nombre',
    },
    { key: 'LastName', title: 'Apellidos' },
    { key: 'UserCode', title: 'Código' },
    { key: 'Group', title: 'Grupo' },
  ]

  const fetchSubjects = async () => {
    await fetchListUsers();
  };

  onMounted(async () => {
    await fetchListUsers()
  });
</script>

<template>
  <v-container >

    <h2>Personas</h2>
    <Table :data="subjects" :headers="headers"/>
  </v-container>
</template>