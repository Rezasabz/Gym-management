<template>
  <div class="overflow-x-auto w-full">
    <h1 class="text-2xl font-bold text-center mb-6">گزارش‌گیری اعضای باشگاه</h1>

    <div class="card bg-base-100 shadow-lg mb-6 rtl text-right border border-blue-100">
      <div class="card-body">
        <h3 class="card-title justify-end">فیلتر پیشرفته</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- فیلتر تا تاریخ -->
          <div class="form-control">
            <label class="label justify-end">
              <span class="label-text font-semibold">تا تاریخ</span>
            </label>

            <input
              id="end-date"
              type="text"
              class="block w-full p-4 text-gray-900 rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl font-semibold"
              placeholder="تا تاریخ را انتخاب کنید"
            />

            <date-picker
              v-model="filters.endDate"
              format="YYYY-MM-DD"
              display-format="jYYYY/jMM/jDD"
              custom-input="#end-date"
            />
          </div>

          <!-- فیلتر از تاریخ -->
          <div class="form-control">
            <label class="label justify-end">
              <span class="label-text font-semibold">از تاریخ</span>
            </label>

            <input
              id="start-date"
              type="text"
              class="block w-full p-4 text-gray-900 rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl font-semibold"
              placeholder="از تاریخ را انتخاب کنید"
            />

            <date-picker
              v-model="filters.startDate"
              format="YYYY-MM-DD"
              display-format="jYYYY/jMM/jDD"
              custom-input="#start-date"
            />
          </div>

          <!-- فیلتر نوع عضویت -->
          <!-- <div class="form-control relative">
  <label class="label justify-end">
    <span class="label-text font-semibold">نوع عضویت</span>
  </label>
  <div class="relative">
    <select
      v-model="filters.membershipType"
      class="appearance-none block w-full p-4 text-gray-900 rounded-xl bg-gray-100 text-xs font-semibold pr-10 text-right custom-rtl focus:ring-blue-500 focus:border-blue-500"
    >
      <option class="font-semibold" value="">همه</option>
      <option class="font-semibold" value="regular">عادی</option>
      <option class="font-semibold" value="vip">ویژه</option>
    </select>

    <div class="pointer-events-none absolute inset-y-0 left-3 flex items-center px-2 text-gray-600">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div> -->

          <!-- فیلتر وضعیت -->
          <div class="form-control relative">
            <label class="label justify-end">
              <span class="label-text font-semibold">وضعیت</span>
            </label>
            <div class="relative">
              <select
                v-model="filters.status"
                class="appearance-none block w-full p-4 text-gray-900 rounded-xl bg-gray-100 text-xs font-semibold pr-10 text-right custom-rtl focus:ring-blue-500 focus:border-blue-500"
              >
                <option class="font-semibold" value="">همه</option>
                <option class="font-semibold" value="فعال">فعال</option>
                <option class="font-semibold" value="منقضی‌شده">منقضی‌شده</option>
              </select>
              <!-- فلش -->
              <div
                class="pointer-events-none absolute inset-y-0 left-3 flex items-center px-2 text-gray-600"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-4 flex justify-end gap-2 flex-row-reverse">
          <button
            @click="resetFilters"
            class="text-white bg-pink-800 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-pink-700 dark:hover:bg-pink-800 focus:ring-1 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            بازنشانی فیلترها
          </button>
          <button
            @click="applyFilters"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            اعمال فیلترها
          </button>
        </div>
      </div>
    </div>

    <!-- آمار کلی -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="stats bg-primary text-primary-content">
          <div class="stat">
            <div class="stat-title font-semibold">کل اعضا</div>
            <div class="stat-value">{{ stats.totalMembers }}</div>
            <div class="stat-desc font-semibold">تاکنون</div>
          </div>
        </div>
        
        <div class="stats bg-success text-success-content">
          <div class="stat">
            <div class="stat-title font-semibold">اعضای فعال</div>
            <div class="stat-value font-semibold">{{ stats.activeMembers }}</div>
            <div class="stat-desc font-semibold">در حال حاضر</div>
          </div>
        </div>
        
        <div class="stats bg-warning text-warning-content">
          <div class="stat">
            <div class="stat-title font-semibold">اعضای جدید</div>
            <div class="stat-value font-semibold">{{ stats.newMembers }}</div>
            <div class="stat-desc font-semibold">این ماه</div>
          </div>
        </div>
        
        <div class="stats bg-error text-error-content">
          <div class="stat">
            <div class="stat-title font-semibold">اعضای منقضی</div>
            <div class="stat-value font-semibold">{{ stats.expiredMembers }}</div>
            <div class="stat-desc font-semibold">نیاز به تمدید</div>
          </div>
        </div>
      </div> -->

    <!-- جدول گزارش -->
    <div class="card bg-base-100 shadow-lg mb-6 rtl text-right border border-blue-100">
      <div class="card-body">
        <div class="flex justify-between items-center mb-4 flex-row-reverse">
          <h2 class="card-title justify-end">لیست اعضا</h2>
          <div class="flex gap-2 flex-row-reverse">
            <div class="h-full flex justify-between items-center mb-6">
              <div className="tooltip font-semibold" data-tip="چاپ لیست پرداخت‌ها">
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
                  @click="exportToExcel"
                >
                  چاپ
                  <svg
                    class="w-6 h-6 ml-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="overflow-x-auto border border-gray-200 rounded-lg">
          <table class="table table-zebra text-right">
            <thead>
              <tr class="bg-blue-200">
                <th
                  class="text-right px-4 py-3 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800 cursor-pointer select-none"
                  @click="sortBy('registrationDate')"
                >
                  <div class="flex items-center justify-end">
                    <span>تاریخ ثبت‌نام</span>
                    <span
                      v-if="sortColumn === 'registrationDate'"
                      class="mr-1 text-sm"
                      :class="{
                        'text-gray-700': sortDirection === 'asc',
                        'text-gray-500': sortDirection === 'desc'
                      }"
                    >
                      {{ sortDirection === 'asc' ? '↑' : '↓' }}
                    </span>
                    <span v-else class="mr-1 text-gray-400 text-sm opacity-70">↕</span>
                  </div>
                </th>
                <th
                  class="text-right px-4 py-3 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800 cursor-pointer select-none"
                  @click="sortBy('status')"
                >
                  وضعیت عضویت
                  <span v-if="sortColumn === 'status'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                  <span v-else class="mr-1 text-gray-400 text-sm opacity-70">↕</span>
                </th>
                <th
                  class="text-right px-4 py-3 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800 cursor-pointer select-none"
                  @click="sortBy('phone')"
                >
                  شماره موبایل
                  <span v-if="sortColumn === 'phone'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                  <span v-else class="mr-1 text-gray-400 text-sm opacity-70">↕</span>
                </th>
                <th
                  class="text-right px-4 py-3 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800 cursor-pointer select-none"
                  @click="sortBy('memberId')"
                >
                  شماره عضویت
                  <span v-if="sortColumn === 'memberId'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                  <span v-else class="mr-1 text-gray-400 text-sm opacity-70">↕</span>
                </th>
                <th
                  class="text-right px-4 py-3 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800 cursor-pointer select-none"
                  @click="sortBy('lastName')"
                >
                  نام خانوادگی
                  <span v-if="sortColumn === 'lastName'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                  <span v-else class="mr-1 text-gray-400 text-sm opacity-70">↕</span>
                </th>
                <th
                  class="text-right px-4 py-3 transition-colors duration-200 hover:bg-gray-200 hover:text-gray-800 cursor-pointer select-none"
                  @click="sortBy('firstName')"
                >
                  نام
                  <span v-if="sortColumn === 'firstName'" class="ml-1">
                    {{ sortDirection === 'asc' ? '↑' : '↓' }}
                  </span>
                  <span v-else class="mr-3 text-gray-400 text-sm opacity-70">↕</span>
                </th>
                <th>ردیف</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in paginatedMembers" :key="user.id">
                <td class="font-semibold">{{ user.registrationDate }}</td>
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
                                    'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100': user.status === 'فعال',
                                    'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100': user.status !== 'فعال'
                                }">
                            {{ user.status }}
                            </span> -->
                </td>
                <td class="font-bold">{{ user.phone }}</td>
                <td class="font-bold">{{ user.memberId }}</td>
                <td class="font-semibold">{{ user.lastName }}</td>
                <td class="font-semibold">{{ user.firstName }}</td>
                <td class="font-semibold">{{ index + 1 }}</td>
              </tr>
              <tr v-if="filteredMembers.length === 0">
                <td colspan="12" class="text-center font-semibold">
                  <div class="flex justify-center items-center w-full py-8">
                    <span
                      class="inline-flex items-center gap-2 bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full dark:bg-gray-700 dark:text-gray-300 font-semibold"
                    >
                      <!-- آیکون عدم وجود داده -->
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.55004 9.60004C7.21867 9.35152 7.15152 8.88142 7.40004 8.55004C7.64857 8.21867 8.11867 8.15152 8.45004 8.40004L10.45 9.90004C10.6389 10.0417 10.75 10.264 10.75 10.5C10.75 10.7361 10.6389 10.9584 10.45 11.1L8.45004 12.6C8.11867 12.8486 7.64857 12.7814 7.40004 12.45C7.15152 12.1187 7.21867 11.6486 7.55004 11.4L8.75004 10.5L7.55004 9.60004Z"
                          class="fill-gray-800 dark:fill-gray-200"
                        />
                        <path
                          d="M16.6 8.55004C16.8486 8.88142 16.7814 9.35152 16.45 9.60004L15.25 10.5L16.45 11.4C16.7814 11.6486 16.8486 12.1187 16.6 12.45C16.3515 12.7814 15.8814 12.8486 15.55 12.6L13.55 11.1C13.3612 10.9584 13.25 10.7361 13.25 10.5C13.25 10.264 13.3612 10.0417 13.55 9.90004L15.55 8.40004C15.8814 8.15152 16.3515 8.21867 16.6 8.55004Z"
                          class="fill-gray-800 dark:fill-gray-200"
                        />
                        <path
                          d="M15.5304 16.5304C15.2375 16.8233 14.7626 16.8233 14.4697 16.5304L13.9996 16.0603C13.4388 16.5896 12.5607 16.5895 12 16.0599C11.4394 16.5895 10.5613 16.5896 10.0005 16.0603L9.53037 16.5304C9.23748 16.8233 8.76261 16.8233 8.46971 16.5304C8.17682 16.2375 8.17682 15.7626 8.46971 15.4697L8.96971 14.9697C9.52875 14.4107 10.429 14.4009 11 14.9403C11.5609 14.4105 12.4392 14.4105 13 14.9403C13.5711 14.4009 14.4713 14.4107 15.0304 14.9697L15.5304 15.4697C15.8233 15.7626 15.8233 16.2375 15.5304 16.5304Z"
                          class="fill-gray-300"
                        />
                        <path
                          opacity="0.5"
                          d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                          class="fill-gray-300"
                        />
                      </svg>
                      موردی یافت نشد
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- صفحه‌بندی -->
        <div class="flex justify-center mt-4">
          <div class="flex-row">
            <button
              v-for="page in totalPages"
              :key="page"
              @click="currentPage = page"
              class="btn border border-gray-200 mr-1"
              :class="{ 'btn-active': currentPage === page }"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- مدال نمایش جزئیات -->
    <!-- <dialog id="memberModal" class="modal">
        <div class="modal-box">
          <h3 class="font-bold text-lg">جزئیات عضو</h3>
          <div class="py-4" v-if="selectedMember">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p><strong>نام کامل:</strong> {{ selectedMember.fullName }}</p>
                <p><strong>شماره تماس:</strong> {{ selectedMember.phone }}</p>
                <p><strong>کد ملی:</strong> {{ selectedMember.nationalId || '--' }}</p>
              </div>
              <div>
                <p><strong>نوع عضویت:</strong> {{ membershipTypeText(selectedMember.membershipType) }}</p>
                <p><strong>تاریخ ثبت‌نام:</strong> {{ formatDate(selectedMember.registrationDate) }}</p>
                <p><strong>تاریخ انقضا:</strong> {{ formatDate(selectedMember.expiryDate) }}</p>
              </div>
            </div>
            <div class="mt-4">
              <h4 class="font-semibold">تاریخچه پرداخت‌ها:</h4>
              <div class="overflow-x-auto">
                <table class="table table-xs mt-2">
                  <thead>
                    <tr>
                      <th>تاریخ</th>
                      <th>مبلغ</th>
                      <th>نوع</th>
                      <th>وضعیت</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="payment in selectedMember.payments" :key="payment.id">
                      <td>{{ formatDate(payment.date) }}</td>
                      <td>{{ payment.amount.toLocaleString() }} تومان</td>
                      <td>{{ paymentTypeText(payment.type) }}</td>
                      <td>
                        <span :class="payment.status === 'paid' ? 'badge badge-success' : 'badge badge-error'">
                          {{ payment.status === 'paid' ? 'پرداخت شده' : 'لغو شده' }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="modal-action">
            <form method="dialog">
              <button class="btn">بستن</button>
            </form>
          </div>
        </div>
      </dialog> -->
  </div>
</template>

<script>
import * as XLSX from 'xlsx' // برای خروجی Excel
// import jsPDF from 'jspdf'; // برای خروجی PDF
// import autoTable from 'jspdf-autotable'; // جدول در PDF
import moment from 'jalali-moment'

export default {
  data() {
    return {
      filters: {
        startDate: null,
        endDate: null,
        status: ''
      },
      stats: {
        totalMembers: 0,
        activeMembers: 0,
        newMembers: 0,
        expiredMembers: 0
      },
      currentPage: 1,
      pageSize: 10,
      members: [], // داده‌های اعضای باشگاه
      filteredMembers: [],
      selectedMember: null,
      sortColumn: '',
      sortDirection: 'asc'
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredMembers.length / this.pageSize)
    },
    paginatedMembers() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredMembers.slice(start, end)
    }
  },
  mounted() {
    this.fetchMembers()
  },
  methods: {
    // sortBy(column) {
    //   if (this.sortColumn === column) {
    //     // اگر ستون فعلی بود، جهت را تغییر بده
    //     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    //   } else {
    //     // اگر ستون جدید بود، جهت پیش‌فرض را تنظیم کن
    //     this.sortColumn = column
    //     this.sortDirection = 'asc'
    //   }
    // },


    async fetchMembers() {
      try {
        const data = await window.api.getUsers() // یا api خودت
        this.members = data
        this.applyFilters()
      } catch (err) {
        console.error('خطا در گرفتن داده‌ها:', err)
      }
    },
    applyFilters() {
      const { startDate, endDate, status } = this.filters

      // شروع با همه اعضا
      let result = [...this.members]

      // اگر فقط وضعیت انتخاب شده (بدون تاریخ)
      if (!startDate && !endDate && status) {
        result = result.filter((member) => member.status === status)
      }

      // اگر فقط تاریخ وارد شده (و وضعیت روی "همه" یا خالیه)
      if (startDate && endDate && (!status || status === 'همه')) {
        const startShamsi = moment.from(startDate, 'en').locale('fa').format('YYYY/MM/DD')
        const endShamsi = moment.from(endDate, 'en').locale('fa').format('YYYY/MM/DD')

        result = result.filter((member) => {
          const regDate = member.registrationDate
          return regDate >= startShamsi && regDate <= endShamsi
        })
      }

      // اگر هم وضعیت مشخص شده و هم تاریخ‌ها
      if (startDate && endDate && status && status !== 'همه') {
        const startShamsi = moment.from(startDate, 'en').locale('fa').format('YYYY/MM/DD')
        const endShamsi = moment.from(endDate, 'en').locale('fa').format('YYYY/MM/DD')

        result = result.filter((member) => {
          const regDate = member.registrationDate
          return member.status === status && regDate >= startShamsi && regDate <= endShamsi
        })
      }

      // در نهایت خروجی رو اختصاص بده
      this.filteredMembers = result
      console.log('اعضای فیلترشده:', this.filteredMembers)

      // در نهایت می‌تونی آمار یا صفحه‌بندی رو هم ریست کنی:
      this.calculateStats()
      this.currentPage = 1
    },
    calculateStats() {
      const now = new Date()
      this.stats.totalMembers = this.filteredMembers.length
      this.stats.activeMembers = this.filteredMembers.filter((m) => m.status === 'active').length
      this.stats.expiredMembers = this.filteredMembers.filter((m) => m.status === 'expired').length
      this.stats.newMembers = this.filteredMembers.filter((m) => {
        const date = new Date(m.createdAt)
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
      }).length
    },
    exportToPDF() {
      const doc = new jsPDF()
      const tableData = this.filteredMembers.map((m) => [
        m.name,
        m.phone,
        this.formatDate(m.createdAt),
        this.membershipTypeText(m.membershipType),
        this.statusText(m.status),
        this.paymentTypeText(m.paymentType)
      ])
      autoTable(doc, {
        head: [['نام', 'موبایل', 'تاریخ عضویت', 'نوع عضویت', 'وضعیت', 'نوع پرداخت']],
        body: tableData
      })
      doc.save('members.pdf')
    },
    viewDetails(member) {
      this.selectedMember = member
      const modal = document.getElementById('memberModal')
      modal.showModal()
    },
    resetFilters() {
      this.filters = {
        startDate: null,
        endDate: null,
        status: ''
      }
      this.applyFilters()
    },
    exportToExcel() {
      // ایجاد هدر فارسی
      const headers = [
        ['ردیف', 'نام', 'نام خانوادگی', 'شماره عضویت', 'شماره موبایل', 'وضعیت', 'تاریخ ثبت‌نام']
      ]
      // reverse headers to show the latest date first
      headers[0].reverse()
      // فیلتر کردن فقط داده‌های غیر دکمه‌ای
      const filteredUsers = this.filteredMembers.map((user) => {
        const { registrationDate, status, phone, memberId, lastName, firstName, id } = user // فقط داده‌های غیر دکمه‌ای را نگه می‌داریم
        return { registrationDate, status, phone, memberId, lastName, firstName, id }
      })

      const ws = XLSX.utils.json_to_sheet(filteredUsers) // تبدیل جدول به sheet
      // اضافه کردن هدر به شیت
      XLSX.utils.sheet_add_aoa(ws, headers, { origin: 'A1' })

      // تنظیم رنگ پس‌زمینه هدر
      // تنظیم رنگ پس‌زمینه هدر
      const range = XLSX.utils.decode_range(ws['!ref'])
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cell = ws[XLSX.utils.encode_cell({ r: 0, c: col })]
        if (cell) {
          cell.s = cell.s || {} // اگر استایل وجود ندارد، یک شی جدید ایجاد می‌کنیم
          cell.s.fill = {
            fgColor: { rgb: '4CAF50' } // رنگ پس‌زمینه سبز برای هدر
          }
          cell.s.font = {
            bold: true, // برای بولد کردن متن
            color: { rgb: 'FFFFFF' } // رنگ متن سفید
          }
        }
      }

      // تنظیم عرض ستون‌ها متناسب با محتوا و هدر
      const colWidths = []

      // ابتدا طول هدر را بررسی می‌کنیم
      headers[0].forEach((header, idx) => {
        colWidths[idx] = Math.max(colWidths[idx] || 0, header.length)
      })

      // سپس طول داده‌ها را بررسی می‌کنیم
      for (let i = 0; i < filteredUsers.length; i++) {
        Object.values(filteredUsers[i]).forEach((value, idx) => {
          const length = value ? value.toString().length : 0
          colWidths[idx] = Math.max(colWidths[idx] || 0, length)
        })
      }

      // اعمال عرض به ستون‌ها
      ws['!cols'] = colWidths.map((width) => ({ wch: width }))
      const wb = XLSX.utils.book_new() // ایجاد کتابچه (workbook)
      XLSX.utils.book_append_sheet(wb, ws, 'Users') // افزودن sheet به workbook
      XLSX.writeFile(wb, 'user_list.xlsx') // دانلود فایل Excel
    },
    sortData() {
      if (!this.sortColumn) return

      this.members = [...this.members].sort((a, b) => {
        let valueA = a[this.sortColumn]
        let valueB = b[this.sortColumn]

        // برای ستون تاریخ شمسی
        if (this.sortColumn === 'registrationDate') {
          try {
            valueA = moment(valueA, 'jYYYY/jMM/jDD').isValid()
              ? moment(valueA, 'jYYYY/jMM/jDD').unix()
              : 0
            valueB = moment(valueB, 'jYYYY/jMM/jDD').isValid()
              ? moment(valueB, 'jYYYY/jMM/jDD').unix()
              : 0
          } catch (e) {
            console.error('Error parsing date:', e)
            valueA = valueB = 0
          }
        }

        // برای ستون‌های عددی مثل memberId
        if (this.sortColumn === 'memberId') {
          valueA = Number(valueA) || 0
          valueB = Number(valueB) || 0
        }

        // برای مقایسه رشته‌های فارسی
        if (typeof valueA === 'string' && this.sortColumn !== 'registrationDate') {
          return this.sortDirection === 'asc'
            ? valueA.localeCompare(valueB, 'fa', { sensitivity: 'base' })
            : valueB.localeCompare(valueA, 'fa', { sensitivity: 'base' })
        }

        const comparison = valueA > valueB ? 1 : valueA < valueB ? -1 : 0
        return this.sortDirection === 'asc' ? comparison : -comparison
      })
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortColumn = column
        this.sortDirection = 'asc'
      }
      this.sortData()
    },
  }
}
</script>

<style scoped>
/* استایل‌های اضافی */
</style>
