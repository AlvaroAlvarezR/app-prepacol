<script setup lang="ts">
  import NAVBAR_ITEMS from '@/constants/navbar-items';

</script>
<template>
  <v-navigation-drawer
    permanent
    app
  >
    <v-list nav>
      <v-list-item v-for="(item, index) in NAVBAR_ITEMS" :prepend-icon="item.icon"  router
        :key="index" :title="item.text" :to="item.src" exact  link  color="indigo-darken-1">
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
</style>
