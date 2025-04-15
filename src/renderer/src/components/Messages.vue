<!-- <template>
    <div class="bg-base-100 shadow-lg rounded-xl p-4 mb-6">
        <h3>Messages</h3>
    </div>
    
</template> -->
<template>
    <div class="p-6 max-w-8xl mx-auto">
      <h1 class="text-2xl font-bold text-center mb-6">ارسال پیامک به اعضا</h1>
      
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <!-- فرم ارسال پیامک -->
          <div class="form-control">
            <label class="label">
              <span class="label-text text-right font-semibold">متن پیامک</span>
            </label>
            <textarea 
              v-model="message" 
              class="textarea textarea-bordered h-24 text-right font-semibold" 
              placeholder="...متن پیام خود را وارد کنید"
              :maxlength="maxLength"
            ></textarea>
            <div class="text-sm text-gray-500 mt-1 text-right font-semibold">
              {{ message.length }}/{{ maxLength }} کاراکتر
            </div>
          </div>
  
        <!-- انتخاب اعضا -->
        <div class="form-control mt-4 text-right font-semibold rtl">
          <label class="label justify-end">
            <span class="label-text text-right">ارسال به</span>
          </label>

          <div class="flex flex-wrap gap-4 justify-end">
            <label class="cursor-pointer label flex-row-reverse gap-2">
              <input 
                type="radio" 
                name="send-to" 
                class="radio radio-primary" 
                v-model="sendTo" 
                value="all"
              >
              <span class="label-text font-semibold">همه اعضا</span> 
            </label>
            <label class="cursor-pointer label flex-row-reverse gap-2">
              <input 
                type="radio" 
                name="send-to" 
                class="radio radio-primary" 
                v-model="sendTo" 
                value="active"
              >
              <span class="label-text font-semibold">اعضای فعال</span>
            </label>
            <label class="cursor-pointer label flex-row-reverse gap-2">
              <input 
                type="radio" 
                name="send-to" 
                class="radio radio-primary" 
                v-model="sendTo" 
                value="custom"
              >
              <span class="label-text font-semibold">انتخاب دستی</span>
            </label>
          </div>

          <!-- لیست انتخاب اعضا (در حالت انتخاب دستی) -->
          <div v-if="sendTo === 'custom'" class="mt-4">
            <div class="overflow-x-auto shadow-md rounded-lg">
              <table class="table w-full text-right rtl">
                <thead>
                  <tr class="bg-base-200">
                    <th class="text-right">انتخاب</th>
                    <th class="text-right">وضعیت</th>
                    <th class="text-right">شماره تلفن</th>
                    <th class="text-right">نام</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.id">
                    <td class="text-right">
                      <input 
                        type="checkbox" 
                        class="checkbox checkbox-primary" 
                        v-model="selectedUsers"
                        :value="user.id"
                      >
                    </td>
                    <td class="text-right">
                      <span class="font-semibold"
                      :class="{
                        'text-xs font-medium me-2 px-2.5 py-0.5 rounded-full shadow-sm': true,
                        'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100': user.status === 'فعال',
                        'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100': user.status !== 'فعال'
                      }">
                        {{ user.status }}
                      </span>
                    </td>
                    <td class="text-right font-semibold">{{ user.phone }}</td>
                    <td class="text-right font-semibold">{{ user.firstName }} {{ user.lastName }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- زمان ارسال -->
        <div class="form-control mt-4 text-right rtl">
          <label class="label justify-end">
            <span class="label-text font-semibold">زمان ارسال</span>
          </label>

          <div class="flex flex-wrap gap-4 justify-end">
            <label class="cursor-pointer label flex-row-reverse gap-2">
              <input 
                type="radio" 
                name="send-time" 
                class="radio radio-primary" 
                v-model="sendTime" 
                value="now"
              >
              <span class="label-text font-semibold">همین حالا</span> 
            </label>
            <label class="cursor-pointer label flex-row-reverse gap-2">
              <input 
                type="radio" 
                name="send-time" 
                class="radio radio-primary" 
                v-model="sendTime" 
                value="scheduled"
              >
              <span class="label-text font-semibold">زمانبندی شده</span>
            </label>
          </div>

          <!-- انتخاب تاریخ و زمان (در حالت زمانبندی شده) -->
          <div v-if="sendTime === 'scheduled'" class="mt-4 flex flex-col sm:flex-row gap-4 text-right rtl">
            <div class="form-control w-full">
              <label class="label justify-end">
                <span class="label-text font-semibold">تاریخ</span>
              </label>
              <input 
                ref="dateInput" 
                data-jdp 
                data-jdp-only-date 
                class="block w-full p-4 text-gray-900 rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl my-theme-wrapper"
              />
            </div>
            <div class="form-control w-full">
              <label class="label justify-end">
                <span class="label-text font-semibold">ساعت</span>
              </label>
              <input 
                class="block w-full p-4 text-gray-900 rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl"
                id="timeInput" 
                data-jdp 
                data-jdp-only-time 
                v-model="scheduledTime"
              >
            </div>
          </div>
        </div>

  
          <!-- دکمه ارسال -->
          <div class="mt-6">
            <button 
                @click="sendSms" 
                class="btn btn-primary w-full"
                :disabled="isSending || !message"
                >
                <span v-if="isSending">
                    <span class="loading loading-spinner"></span>

                </span>
                <span v-else>
                    ارسال پیامک
                </span>
            </button>
          </div>
  
          <!-- پیام نتیجه -->
          <div v-if="resultMessage" class="alert mt-4" :class="resultClass">
            <div>
              <span>{{ resultMessage }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2'
  
  
  export default {
    data() {
      return {
        maxLength: 160,
        message: '',
        sendTo: 'all', // all, active, custom
        sendTime: 'now', // now, scheduled
        scheduledDate: '',
        scheduledTime: '',
        selectedUsers: [],
        users: [],
        isSending: false,
        resultMessage: '',
        resultClass: ''
      }
    },
    computed: {
      selectedCount() {
        if (this.sendTo === 'all') return this.users.length
        if (this.sendTo === 'active') return this.users.filter(u => u.active).length
        return this.selectedUsers.length
      }
    },
    async created() {
      try {
        await this.getLatestUsers()
      } catch (error) {
        console.error('Error during component creation:', error)
      }
    },
    methods: {
      async getLatestUsers() {
        try {
          this.users = await window.api.getUsers()
        } catch (error) {
          console.error('Error fetching users:', error)
          this.showSwal('خطا', 'خطا در دریافت لیست کاربران', 'error')
        }
      },
      async sendSms() {
        if (!this.message) {
          await this.showSwal('خطا', 'لطفا متن پیام را وارد کنید', 'error')
          return
        }
  
        if (this.sendTo === 'custom' && this.selectedUsers.length === 0) {
          await this.showSwal('خطا', 'لطفا حداقل یک کاربر انتخاب کنید', 'error')
          return
        }
  
        if (this.sendTime === 'scheduled' && (!this.scheduledDate || !this.scheduledTime)) {
          await this.showSwal('خطا', 'لطفا تاریخ و زمان ارسال را مشخص کنید', 'error')
          return
        }
  
        this.isSending = true
  
        try {
          let phoneNumbers = []
          if (this.sendTo === 'all') {
            phoneNumbers = this.users.map(u => u.phone)
          } else if (this.sendTo === 'active') {
            phoneNumbers = this.users.filter(u => u.active).map(u => u.phone)
          } else {
            phoneNumbers = this.users
              .filter(u => this.selectedUsers.includes(u.id))
              .map(u => u.phone)
          }
  
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1500))
  
          await this.showSwal('موفقیت', `پیامک با موفقیت برای ${this.selectedCount} کاربر ارسال شد`, 'success')
          this.message = ''
          this.selectedUsers = []
        } catch (error) {
          console.error('Error sending SMS:', error)
          await this.showSwal('خطا', 'خطا در ارسال پیامک. لطفا دوباره تلاش کنید', 'error')
        } finally {
          this.isSending = false
        }
      },
      showSwal(title, text, icon) {
        return Swal.fire({
          title: title,
          text: text,
          icon: icon,
          confirmButtonText: 'متوجه شدم',
          confirmButtonColor: '#3085d6',
          timer: icon === 'success' ? 3000 : undefined
        })
      }
    },
    async mounted() {
      jalaliDatepicker.startWatch({
      time: true,           // فعال باشه برای input دوم
      hasSecond: false,     // می‌تونی true بزاری اگه ثانیه هم بخوای
      autoHide: true,
      autoShow: true,
      hideAfterChange: true,
      container: "#my-datepicker-wrapper"
    });
    },
  }
  </script>
  