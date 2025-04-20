<script setup>
import SplashScreen from './components/SplashScreen.vue';
import Sidebar from './components/Sidebar.vue';

// مدیریت IPC برای Electron
const ipcHandle = () => {
  if (window.electron && window.electron.ipcRenderer) {
    window.electron.ipcRenderer.send('ping');
  } else {
    console.error('Electron IPC Renderer is not available.');
  }
};

// مدیریت حالت نمایش اسپلش اسکرین
import { ref, onMounted } from 'vue';
const showSplash = ref(true);

onMounted(() => {
  setTimeout(() => {
    showSplash.value = false;
  }, 3000); // مدت زمان نمایش اسپلش اسکرین
});
</script>

<template>
    <div class="app-container">
      <SplashScreen v-if="showSplash" />
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main Content -->
    <div class="bg-stone-50 p-4 sm:mr-64 text-right">
      <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <router-view />
    </div>
    </div>
  </div>
  <!-- <Sidebar /> -->
  <!-- <img alt="logo" class="logo" src="./assets/electron.svg" /> -->
  <!-- <router-view /> -->
</template>