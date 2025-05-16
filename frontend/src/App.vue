<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-app-bar app flat height="64" style="background-color: #00897B;">
      <v-toolbar-title class="dashboard-title">E-commerce Admin Dashboard</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" :to="'/'" class="nav-btn" exact>Dashboard</v-btn>
      <v-btn variant="text" :to="'/inventory'" class="nav-btn">Inventory</v-btn>
      <v-btn variant="text" :to="'/add-product'" class="nav-btn">Add Product</v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.dashboard-title {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  font-family: 'Poppins', sans-serif;
}

.nav-btn {
  color: #f0f0f0;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: none;
  transition: all 0.3s ease;
  margin-left: 10px;
}

.nav-btn:hover {
  color: #FFD54F;
  background-color: transparent;
}
</style>
