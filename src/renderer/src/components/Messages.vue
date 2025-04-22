<template>
  <div class="">
    <div class="overflow-x-auto w-full sha">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-center mb-6">ارسال پیامک به اعضا</h1>
        <p class="text-blue-600 mt-2">پیام خود را برای اعضا ارسال کنید</p>
      </div>

      <div class="card bg-base-100 shadow-lg mb-6 rtl text-right border border-blue-100">
        <div class="card-body p-6 md:p-8 space-y-6 rtl">
          <!-- متن پیامک -->
          <div class="form-control">
            <label class="label justify-end pb-1">
              <span class="label-text text-md font-semibold">متن پیامک</span>
            </label>
            <textarea
              v-model="message"
              class="textarea textarea-bordered h-32 text-right text-md focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all"
              placeholder="...متن پیام خود را وارد کنید"
              :maxlength="maxLength"
            ></textarea>
            <div class="text-sm text-blue-500 mt-1 text-right">
              {{ message.length }}/{{ maxLength }} کاراکتر
            </div>
          </div>

          <!-- انتخاب اعضا -->
          <div class="form-control">
            <label class="label justify-end pb-1">
              <span class="label-text text-md font-semibold">ارسال به</span>
            </label>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
              <label
                class="card bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all cursor-pointer border border-blue-100 rounded-xl"
              >
                <div class="card-body p-4 flex items-center justify-end gap-3">
                  <input
                    type="radio"
                    name="send-to"
                    class="radio radio-primary ring-2 ring-offset-2 ring-blue-200"
                    v-model="sendTo"
                    value="all"
                  />
                  <span class="text-sm font-semibold text-blue-800">همه اعضا</span>
                  <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
              </label>

              <label
                class="card bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all cursor-pointer border border-blue-100 rounded-xl"
              >
                <div class="card-body p-4 flex items-center justify-end gap-3">
                  <input
                    type="radio"
                    name="send-to"
                    class="radio radio-primary ring-2 ring-offset-2 ring-blue-200"
                    v-model="sendTo"
                    value="active"
                  />
                  <span class="text-sm font-semibold text-blue-800">اعضای فعال</span>
                  <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </label>

              <label
                class="card bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all cursor-pointer border border-blue-100 rounded-xl"
              >
                <div class="card-body p-4 flex items-center justify-end gap-3">
                  <input
                    type="radio"
                    name="send-to"
                    class="radio radio-primary ring-2 ring-offset-2 ring-blue-200"
                    v-model="sendTo"
                    value="custom"
                  />
                  <span class="text-sm font-semibold text-blue-800">انتخاب دستی</span>
                  <div class="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                      />
                    </svg>
                  </div>
                </div>
              </label>
            </div>

            <!-- لیست انتخاب اعضا (در حالت انتخاب دستی) -->

            <div v-if="sendTo === 'active' || sendTo === 'custom'" class="mt-4">
              <div class="overflow-x-auto shadow-md rounded-xl border border-blue-100">
                <table class="table table-zebra w-full text-right">
                  <thead>
                    <tr class="bg-blue-100 text-blue-800">
                      <th>انتخاب</th>
                      <th>وضعیت</th>
                      <th>شماره تلفن</th>
                      <th>نام</th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- نمایش اعضاء بر اساس sendTo -->
                    <tr
                      v-for="user in filteredUsers"
                      :key="user.id"
                      class="hover:bg-blue-50 transition-colors"
                    >
                      <td>
                        <!-- چک‌باکس برای انتخاب دستی -->
                        <input
                          v-if="sendTo === 'custom'"
                          type="checkbox"
                          class="checkbox checkbox-primary border-blue-300"
                          v-model="selectedUsers"
                          :value="user.id"
                        />
                      </td>
                      <td>
                        <div class="flex items-center justify-end">
                          <span
                            :class="{
                              'mr-2 font-semibold text-emerald-500': user.status === 'فعال',
                              'mr-2 font-semibold text-red-500': user.status !== 'فعال'
                            }"
                          >
                            {{ user.status }}
                          </span>
                          <span
                            :class="{
                              'badge-dot w-3 h-3 border border-white rounded-full text-xs font-semibold text-white bg-emerald-500':
                                user.status === 'فعال',
                              'badge-dot w-3 h-3 border border-white rounded-full text-xs font-semibold text-white bg-red-500':
                                user.status !== 'فعال'
                            }"
                          >
                          </span>
                        </div>
                        <!-- <span class="font-semibold"
                        :class="{
                          'text-xs font-medium me-2 px-2.5 py-0.5 rounded-full shadow-sm': true,
                          'bg-green-100 text-green-800': user.status === 'فعال',
                          'bg-red-100 text-red-800': user.status !== 'فعال'
                        }">
                        {{ user.status }}
                      </span> -->
                      </td>
                      <td class="font-semibold text-gray-600">{{ user.phone }}</td>
                      <td class="font-semibold text-gray-600">
                        {{ user.firstName }} {{ user.lastName }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- زمان ارسال -->
          <div class="form-control">
            <label class="label justify-end pb-1">
              <span class="label-text text-md font-semibold">زمان ارسال</span>
            </label>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label
                class="card bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all cursor-pointer border border-blue-100 rounded-xl"
              >
                <div class="card-body p-4 flex items-center justify-end gap-3">
                  <input
                    type="radio"
                    name="send-time"
                    class="radio radio-primary ring-2 ring-offset-2 ring-blue-200"
                    v-model="sendTime"
                    value="now"
                  />
                  <span class="text-sm font-semibold text-blue-800">همین حالا</span>
                  <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-purple-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </label>

              <label
                class="card bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all cursor-pointer border border-blue-100 rounded-xl"
              >
                <div class="card-body p-4 flex items-center justify-end gap-3">
                  <input
                    type="radio"
                    name="send-time"
                    class="radio radio-primary ring-2 ring-offset-2 ring-blue-200"
                    v-model="sendTime"
                    value="scheduled"
                  />
                  <span class="text-sm font-semibold text-blue-800">زمانبندی شده</span>
                  <div class="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5 text-pink-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
              </label>
            </div>

            <!-- انتخاب تاریخ و زمان (در حالت زمانبندی شده) -->
            <div v-if="sendTime === 'scheduled'" class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- <div class="form-control mt-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900">
                            <span class="label-text">تاریخ ثبت‌نام</span>
                        </label>
                        <input ref="dateInput" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl custom-date-input-1 font-semibold" />

                        <date-picker
                        
                        format="YYYY-MM-DD"
                        display-format="jYYYY/jMM/jDD"
                        custom-input=".custom-date-input-1"
                        />
                    </div> -->
              <div class="form-control">
                <label class="label justify-end pb-1">
                  <span class="label-text font-semibold">تاریخ</span>
                </label>
                <div class="relative">
                  <input
                    ref="dateInput"
                    class="input input-bordered w-full pl-12 bg-white border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 custom-date-input-1"
                  />
                  <div class="absolute left-3 top-3 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <date-picker
                  v-model="scheduledDate"
                  format="YYYY-MM-DD"
                  display-format="jYYYY/jMM/jDD"
                  custom-input=".custom-date-input-1"
                />
              </div>
              <div class="form-control">
                <label class="label justify-end pb-1">
                  <span class="label-text font-semibold">ساعت</span>
                </label>
                <div class="relative">
                  <input
                    class="input input-bordered w-full pl-12 bg-white border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 custom-date-input-2"
                    id="timeInput"
                  />
                  <div class="absolute left-3 top-3 text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
                <date-picker
                  v-model="scheduledTime"
                  type="time"
                  custom-input=".custom-date-input-2"
                />
              </div>
            </div>
          </div>

          <!-- دکمه ارسال -->
          <div class="mt-8">
            <button
              @click="sendSms"
              class="btn w-full gap-2 text-md h-14 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none text-white shadow-lg transition-all transform hover:scale-[1.01]"
              :disabled="isSending || !message"
            >
              <span v-if="isSending" class="loading loading-spinner"></span>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              ارسال پیامک
            </button>
          </div>

          <!-- پیام نتیجه -->
          <div v-if="resultMessage" class="alert mt-4 rounded-xl" :class="resultClass">
            <div class="flex items-center gap-2">
              <svg
                v-if="resultClass.includes('alert-success')"
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="font-medium">{{ resultMessage }}</span>
            </div>
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
      resultClass: '',
      signature: '\n\n « باشگاه بدنسازی سهرابی »' // متن امضا
    }
  },
  computed: {
    // محاسبه اعضاء بر اساس انتخاب کاربر
    filteredUsers() {
      if (this.sendTo === 'all') {
        return this.users
      } else if (this.sendTo === 'active') {
        // فقط اعضاء فعال
        return this.users.filter((user) => user.status === 'فعال')
      } else if (this.sendTo === 'custom') {
        // اعضاء انتخاب شده توسط کاربر
        return this.users
      }
      return []
    },
    selectedCount() {
      if (this.sendTo === 'all') return this.users.length
      if (this.sendTo === 'active')
        return this.users.filter((user) => user.status === 'فعال').length
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
    // addSignature() {
    //   // چک کردن خالی بودن متن پیام
    //   if (this.message.trim() !== '') {
    //     this.message += this.signature;
    //   }

    // },
    async getLatestUsers() {
      try {
        this.users = await window.api.getUsers()
      } catch (error) {
        console.error('Error fetching users:', error)
        this.showSwal('خطا', 'خطا در دریافت لیست کاربران', 'error')
      }
    },
    async sendSms() {
      // اعتبارسنجی اولیه
      if (!this.message) {
        await this.showSwal('خطا', 'لطفا متن پیام را وارد کنید', 'error')
        return
      }

      // اعتبارسنجی انتخاب کاربران
      if (this.sendTo === 'custom' && this.selectedUsers.length === 0) {
        await this.showSwal('خطا', 'لطفا حداقل یک کاربر انتخاب کنید', 'error')
        return
      }

      // اعتبارسنجی زمانبندی
      if (this.sendTime === 'scheduled' && (!this.$refs.dateInput.value || !this.scheduledTime)) {
        await this.showSwal('خطا', 'لطفا تاریخ و زمان ارسال را مشخص کنید', 'error')
        return
      }

      this.isSending = true

      try {
        // جمع آوری شماره تلفن‌ها بر اساس انتخاب کاربر
        let phoneNumbers = []
        if (this.sendTo === 'all') {
          phoneNumbers = this.users.map((u) => u.phone)
        } else if (this.sendTo === 'active') {
          phoneNumbers = this.users.filter((u) => u.status === 'فعال').map((u) => u.phone)
        } else {
          phoneNumbers = this.users
            .filter((u) => this.selectedUsers.includes(u.id))
            .map((u) => u.phone)
        }

        // چک کردن خالی بودن متن پیام
        if (this.message.trim() !== '') {
          this.message += this.signature
        }

        // در اینجا باید فراخوانی API واقعی انجام شود
        // برای نمونه از یک تاخیر استفاده می‌کنیم
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // نمایش پیام موفقیت
        await this.showSwal(
          'موفقیت',
          `پیامک با موفقیت برای ${this.selectedCount} کاربر ارسال شد`,
          'success'
        )

        console.log('date => ', this.scheduledDate + ' ' + this.scheduledTime)
        console.log('message => ', this.message)

        // ریست فرم
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
      time: true,
      hasSecond: false,
      autoHide: true,
      autoShow: true,
      hideAfterChange: true
    })
  }
}
</script>
