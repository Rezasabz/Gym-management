<template>
    <Modal :show="show" @close="closeDetailsModal">
    <!-- <div className="modal-box w-11/12 max-w-7xl text-right"> -->
      <!-- دکمه بستن -->
       
      <button className="btn btn-square btn-sm border border-gray-300 shadow-lg" @click="closeDetailsModal">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <br />

      <!-- بخش اصلی کاربر -->
      <div class="card w-full bg-base-100 shadow-xl p-5 mt-2 flex flex-col md:flex-row items-center md:items-start gap-6 border border-gray-100">
        <!-- آواتار و نام کاربر -->
        <div class="flex flex-col items-center md:items-start gap-4">
          <div class="avatar">
            <div class="w-24 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <svg height="95" width="95" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                    viewBox="0 0 512 512" xml:space="preserve">
                <g transform="translate(-1)">
                    <path style="fill:#546A79;" d="M513,256C513,114.617,398.383,0,257,0S1,114.617,1,256s114.617,256,256,256S513,397.383,513,256"/>
                    <path style="fill:#38454F;" d="M257,476.69c-121.688,0-220.69-99.001-220.69-220.69S135.312,35.31,257,35.31
                        S477.69,134.312,477.69,256S378.688,476.69,257,476.69"/>
                    <path style="fill:#546A79;" d="M312.717,299.234c9.304-11.961,14.901-26.942,14.901-43.238c0-16.287-5.597-31.267-14.901-43.229
                        l74.108-74.116c3.452-3.443,3.452-9.031,0-12.482c-3.443-3.443-9.031-3.443-12.482,0l-74.108,74.116
                        c-11.961-9.304-26.942-14.91-43.237-14.91c-16.287,0-31.267,5.605-43.229,14.91l-74.116-74.116c-3.443-3.443-9.031-3.443-12.482,0
                        c-3.443,3.452-3.443,9.039,0,12.482l74.116,74.116c-9.304,11.961-14.91,26.942-14.91,43.229c0,16.296,5.605,31.276,14.91,43.238
                        l-74.116,74.108c-3.443,3.452-3.443,9.039,0,12.482c1.73,1.73,3.981,2.586,6.241,2.586s4.52-0.856,6.241-2.586l74.116-74.108
                        c11.961,9.304,26.942,14.901,43.229,14.901c16.296,0,31.276-5.597,43.237-14.901l74.108,74.108c1.73,1.73,3.981,2.586,6.241,2.586
                        c2.26,0,4.52-0.856,6.241-2.586c3.452-3.443,3.452-9.031,0-12.482L312.717,299.234z"/>
                    <path style="fill:#38454F;" d="M257,220.69c-19.474,0-35.31,15.837-35.31,35.31s15.837,35.31,35.31,35.31s35.31-15.837,35.31-35.31
                        S276.474,220.69,257,220.69"/>
                </g>
                </svg>
              <span class="text-3xl font-bold">{{ user.firstName.charAt(0) }}</span>
            </div>
          </div>
          <h2 class="text-xl font-bold text-center md:text-right">{{ user.firstName }} {{ user.lastName }}</h2>
        </div>

        <!-- اطلاعات اصلی -->
        <div class="flex-1 w-full">
          <!-- نوار پیشرفت -->
          <div class="w-full bg-gray-200 rounded-full mb-6">
            <div
              class="text-xs font-medium text-center p-0.5 leading-none rounded-full"
              :class="progress >= 100 ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'"
              :style="{ width: progress + '%' }">
              {{ progress.toFixed(0) }}%
            </div>
          </div>

          <!-- آمارها -->
        <!-- آمار کاربر با کارت‌های بهبود یافته -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
            <!-- مجموع پرداختی‌ها -->
            <div class="bg-gradient-to-br from-green-50 to-white p-5 rounded-xl shadow-sm border border-green-100 hover:shadow-md transition-all duration-300 flex items-center gap-4 group">
            <div class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <div class="text-gray-600 text-sm font-semibold">مجموع پرداختی‌ها</div>
                <div class="text-green-600 font-bold text-xl mt-1">۲,۰۰۰,۰۰۰ تومان</div>
            </div>
            </div>

            <!-- پایان اعتبار -->
            <div class="bg-gradient-to-br from-blue-50 to-white p-5 rounded-xl shadow-sm border border-blue-100 hover:shadow-md transition-all duration-300 flex items-center gap-4 group">
            <div class="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <div>
                <div class="text-gray-600 text-sm font-semibold">پایان اعتبار</div>
                <div class="text-blue-600 font-bold text-xl mt-1">{{ expirationDateMiladi }}</div>
            </div>
            </div>

            <!-- جلسات باقی مانده -->
            <div class="bg-gradient-to-br from-purple-50 to-white p-5 rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-all duration-300 flex items-center gap-4 group">
            <div class="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <div class="text-gray-600 text-sm font-semibold">جلسات باقی مانده</div>
                <div class="text-purple-600 font-bold text-xl mt-1">۱۱</div>
            </div>
            </div>

            <!-- مبلغ بدهی -->
            <div class="bg-gradient-to-br from-red-50 to-white p-5 rounded-xl shadow-sm border border-red-100 hover:shadow-md transition-all duration-300 flex items-center gap-4 group">
            <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <div>
                <div class="text-gray-600 text-sm font-semibold">مبلغ بدهی</div>
                <div class="text-red-600 font-bold text-xl mt-1">۰</div>
            </div>
            </div>
        </div>
        </div>
      </div>

<!-- اطلاعات کاربری -->
<div class="card w-full bg-base-100 shadow-xl p-5 mt-3 border border-gray-100">
  <div class="flex items-center gap-3 mb-4">
    <div class="avatar placeholder">
      <div class="bg-indigo-100 text-indigo-800 rounded-full w-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </div>
    <h3 class="font-bold text-lg font-semibold text-gray-800">پروفایل</h3>
  </div>
  
  <div class="divider my-1"></div>
  
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- شماره عضویت -->
    <div class="flex items-center gap-3">
      <div class="bg-blue-100 text-blue-800 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <div>
        <span class="text-gray-500 text-sm block font-semibold">شماره عضویت</span>
        <span class="font-medium text-gray-800">{{ user.memberId }}</span>
      </div>
    </div>
    
    <!-- وضعیت عضویت -->
    <div class="flex items-center gap-3">
      <div class="bg-green-100 text-green-800 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <span class="text-gray-500 text-sm block font-semibold">وضعیت عضویت</span>
        <span class="badge" :class="{
          'text-xs font-medium px-2.5 py-0.5 rounded-full': true,
          'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100': user.status === 'فعال',
          'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100': user.status !== 'فعال'
        }">
          {{ user.status }}
        </span>
      </div>
    </div>
    
    <!-- شماره موبایل -->
    <div class="flex items-center gap-3">
      <div class="bg-purple-100 text-purple-800 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      </div>
      <div>
        <span class="text-gray-500 text-sm block font-semibold">شماره موبایل</span>
        <div class="flex items-center gap-1">
          <span class="font-medium text-gray-800">{{ user.phone }}</span>
          <a :href="'tel:' + user.phone" class="text-gray-400 hover:text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <!-- تماس اضطراری -->
    <div class="flex items-center gap-3">
      <div class="bg-red-100 text-red-800 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div>
        <span class="text-gray-500 text-sm block font-semibold">تماس اضطراری</span>
        <div class="flex items-center gap-1">
          <span class="font-medium text-gray-800">{{ user.emergencyPhone }}</span>
          <a :href="'tel:' + user.emergencyPhone" class="text-gray-400 hover:text-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
    
    <!-- آدرس -->
    <div class="flex items-start gap-3">
      <div class="bg-yellow-100 text-yellow-800 p-2 rounded-full mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <div>
        <span class="text-gray-500 text-sm block font-semibold">آدرس</span>
        <span class="font-medium text-gray-800">{{ user.address }}</span>
      </div>
    </div>
    
    <!-- تاریخ ثبت‌نام -->
    <div class="flex items-center gap-3">
      <div class="bg-cyan-100 text-cyan-800 p-2 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
      <div>
        <span class="text-gray-500 text-sm block font-semibold">تاریخ ثبت‌نام</span>
        <span class="font-medium text-gray-800">{{ user.registrationDate }}</span>
      </div>
    </div>
  </div>
</div>
    <!-- </div> -->
    </Modal>
  </template>
  
  <script>
import Modal from './Modal.vue'

export default {
  components: { Modal },
  props: {
    show: Boolean,
    user: Object,
    progress: Number,
    expirationDateMiladi: String
  },
  emits: ['close'],
  methods: {
    closeDetailsModal() {
      this.$emit('close')
    }
  }
}
  </script>