<!-- src/App.vue -->
<script setup>
import SplashScreen from './components/SplashScreen.vue'
import Sidebar from './components/Sidebar.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// اسپلش
const showSplash = ref(true)
onMounted(() => {
  setTimeout(() => { showSplash.value = false }, 1500)
})

// روت فعلی
const route = useRoute()
</script>

<template>
  <div class="app-container">
    <SplashScreen v-if="showSplash" />

    <template v-else>
      <!-- خارج از صفحه لاگین -->
      <Sidebar v-if="route.name !== 'Login'" />

      <div
        v-if="route.name !== 'Login'"
        class="bg-stone-50 p-4 sm:mr-64 text-right min-h-screen bg-gradient-to-b from-gray-50 to-purple-50"
      >
        <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <router-view />
        </div>
      </div>

      <!-- دقیقا صفحه لاگین -->
      <div v-else class="min-h-screen">
        <router-view />
      </div>
    </template>
  </div>
</template>
