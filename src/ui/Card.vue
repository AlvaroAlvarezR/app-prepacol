<template>
  <v-card
    class="mx-4"
    outlined
  >
    <v-img
      class="align-end text-white"
      :src="getDataCard.src"
      cover
      :height="350"
    >
      <v-card-title>{{ getDataCard.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      Grupo: {{ getDataCard.subtitle }}
    </v-card-subtitle>

    <v-card-text>
      <div>Fecha: {{ getDataCard.description }}</div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import * as IGetAlarmExtendedResult from '@/interfaces/alarm';
import { storeToRefs } from 'pinia';

import useAlarmStore from '@/stores/alarm';
const { getDataCard } = storeToRefs( useAlarmStore());

const props = defineProps({
  data: {
    type: IGetAlarmExtendedResult,
  },
});
</script>
