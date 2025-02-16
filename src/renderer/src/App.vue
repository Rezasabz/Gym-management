<script setup>
// import Versions from './components/Versions.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
import Sidebar from './components/Sidebar.vue'
</script>

<template>
    <div class="app-container">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="p-4 sm:mr-64 text-right">
      <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <router-view />
    </div>
    </div>
  </div>
  <!-- <Sidebar /> -->
  <!-- <img alt="logo" class="logo" src="./assets/electron.svg" /> -->
  <!-- <router-view /> -->
</template>