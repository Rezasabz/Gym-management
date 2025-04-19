<template>
  <dialog class="modal" :class="{ 'modal-open': show }" dir="rtl">
    <div class="modal-box w-11/12 max-w-7xl text-right">
      <h3 class="font-bold text-lg mb-4">{{ title }}</h3>
      <slot></slot>
      <div class="modal-action mt-4">
      <button 
        class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-300/50 dark:shadow-lg dark:shadow-red-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" 
        @click="$emit('close')"
      >
        بستن
      </button>
    </div>
    </div>

  </dialog>
</template>

<script>
export default {
  props: {
    show: Boolean,
    title: String,
  },
  emits: ['close']
};
</script>