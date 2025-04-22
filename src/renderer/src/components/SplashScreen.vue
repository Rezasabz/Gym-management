<template>
  <div
    class="splash-screen fixed inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-900 to-rose-800 z-50 transition-opacity duration-500"
    :style="{ opacity: show ? 1 : 0, pointerEvents: show ? 'auto' : 'none' }"
  >
    <div class="text-center">
      <!-- لوگو با تم ورزشی -->
      <div class="mb-6 animate-pulse">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-24 w-24 mx-auto text-amber-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </div>

      <!-- عنوان با تم باشگاه -->
      <h1 class="text-4xl font-bold text-amber-400 mb-2 animate-fade-in">باشگاه بدنسازی سهرابی</h1>

      <!-- زیرعنوان -->
      <p class="text-xl text-white opacity-90 mb-8 animate-fade-in delay-100 font-semibold">
        سیستم مدیریت اعضا
      </p>

      <!-- نوار پیشرفت با رنگ طلایی -->
      <div class="w-48 h-2 bg-white bg-opacity-20 rounded-full mx-auto overflow-hidden">
        <div
          class="h-full bg-amber-400 rounded-full transition-all duration-1000 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>

      <!-- متن کپی رایت -->
      <p class="text-white text-opacity-70 mt-8 text-sm font-semibold">
        © 2025 باشگاه بدنسازی سهرابی
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      show: true,
      progress: 0,
      interval: null
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.progress += 1
      if (this.progress >= 100) {
        clearInterval(this.interval)
        this.show = false
      }
    }, this.duration / 100)
  },
  beforeUnmount() {
    if (this.interval) {
      clearInterval(this.interval)
    }
  }
}
</script>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.delay-100 {
  animation-delay: 0.3s;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}
</style>
