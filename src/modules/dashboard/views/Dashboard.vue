<script setup lang="ts">
  import { onMounted, ref, toRaw, computed } from 'vue';
  import { storeToRefs } from 'pinia';

  import Table from '@/ui/Table.vue';
  
  import useAlarmStore from '@/stores/alarm';
  import useSubjectStore from '@/stores/subject';
  import useGroupStore from '@/stores/group';

  const { fetchAlarms } = useAlarmStore();
  const { fetchGroups } = useGroupStore();
  const { getIdentificationAlarms, getIdentified, getMissing } = storeToRefs( useAlarmStore());
  const { groups } = storeToRefs( useGroupStore());

  const { fetchListUsers } = useSubjectStore();
  const date = ref();
  const groupSelected = ref();

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
    { key: 'Date', title: 'Fecha' },
  ]

  const fetchListAlarms = async () => {
    // const dates = JSON.parse(JSON.stringify(toRaw(date)))
    await fetchListUsers(groupSelected.value)
    await fetchAlarms(date.value, groupSelected.value);
  };

  onMounted(async () => {
    await fetchListUsers();
    await fetchGroups();
    // await fetchListAlarms()
  });
</script>
<template>
  <v-container fluid>
    <h2>Dashboard</h2>
    <v-row>
      <v-col cols="5">
        <VueDatePicker v-model="date" range :multi-calendars="{ solo: true }" locale="es-CO" />
      </v-col>
      <v-col cols="5">
        <v-autocomplete
          v-model="groupSelected"
          clearable
          density="compact"
          :items="groups"
          color="white"
          item-title="key"
          item-value="key"
          label="Grupos"
        ></v-autocomplete>     
      </v-col>
      <v-col cols="2">
        <v-btn  @click="fetchListAlarms" color="indigo-darken-1">
          Actualizar
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-card
          class="mx-auto"
          variant="elevated"
        >
          <v-card-item>
            <v-container>
              <v-row>
                Mostrar Grupo
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-alert
                    color="success"
                    icon="$success"
                    :title="'Contador Identificados: ' +  getIdentified.length"
                  ></v-alert>
                  <v-list lines="one">
                    <v-list-item
                      v-for="subject in getIdentified"
                      :key="subject.UserCode"
                      :title="subject.Name + ' ' + subject.LastName"
                      :subtitle="subject.UserCode"
                    ></v-list-item>
                  </v-list>
                </v-col>
                <v-col cols="6">
                  <v-alert
                    color="warning"
                    icon="$warning"
                    :title="'Contador No Identificados: ' +  getMissing.length"
                  ></v-alert>
                  <v-list lines="one">
                  <v-list-item
                      v-for="subject in getMissing"
                      :key="subject.UserCode"
                      :title="subject.Name + ' ' + subject.LastName"
                      :subtitle="subject.UserCode"
                    ></v-list-item>
                  </v-list>
                </v-col>
              </v-row>
            </v-container>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <Table :data="getIdentificationAlarms" :headers="headers"/>
      </v-col>
    </v-row>
  </v-container>
</template>