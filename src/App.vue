<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import NavBar from '@/ui/Navbar.vue';

</script>

<template>
  <v-app>
    <v-app-bar title="Prepacol"></v-app-bar>
    <NavBar/>
    <v-main style="height: 250px">
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
</style>
