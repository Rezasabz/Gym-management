<script setup>
// import Versions from './components/Versions.vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <img alt="logo" class="logo" src="./assets/electron.svg" />
  <router-view />
</template>
