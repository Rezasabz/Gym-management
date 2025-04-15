<template>
    <div class="p-6 max-w-8xl mx-auto">
      <h1 class="text-2xl font-bold text-center mb-6">گزارش‌گیری اعضای باشگاه</h1>
      
      <div class="card bg-base-100 shadow-lg mb-6 rtl text-right">
        <div class="card-body">
            <h2 class="card-title justify-end">فیلتر پیشرفته</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- فیلتر تاریخ شروع -->
            <div class="form-control">
                <label class="label justify-end">
                <span class="label-text font-semibold">از تاریخ</span>
                </label>
                <date-picker
                v-model="filters.startDate"
                type="date"
                display-format="jYYYY-jMM-jDD"
                placeholder="از تاریخ"
                input-class="input input-bordered w-full text-right"
                />
            </div>
            
            <!-- فیلتر تاریخ پایان -->
            <div class="form-control">
                <label class="label justify-end">
                <span class="label-text font-semibold">تا تاریخ</span>
                </label>
                <date-picker
                v-model="filters.endDate"
                type="date"
                display-format="jYYYY-jMM-jDD"
                placeholder="تا تاریخ"
                input-class="input input-bordered w-full text-right"
                />
            </div>
            
            <!-- فیلتر نوع عضویت -->
            <div class="form-control">
                <label class="label justify-end">
                <span class="label-text font-semibold">نوع عضویت</span>
                </label>
                <select v-model="filters.membershipType" class="select select-bordered text-right font-semibold">
                <option class="font-semibold" value="">همه</option>
                <option class="font-semibold" value="regular">عادی</option>
                <option class="font-semibold" value="vip">ویژه</option>
                </select>
            </div>
            
            <!-- فیلتر وضعیت -->
            <div class="form-control">
                <label class="label justify-end">
                <span class="label-text font-semibold">وضعیت</span>
                </label>
                <select v-model="filters.status" class="select select-bordered text-right font-semibold">
                <option class="font-semibold" value="">همه</option>
                <option class="font-semibold" value="active">فعال</option>
                <option class="font-semibold" value="expired">منقضی‌شده</option>
                </select>
            </div>
            </div>
            
            <div class="mt-4 flex justify-end gap-2 flex-row-reverse">
            <button @click="resetFilters" class="text-white bg-pink-800 hover:bg-pink-800 focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-pink-700 dark:hover:bg-pink-800 focus:ring-1 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">
                بازنشانی فیلترها
            </button>
            <button @click="applyFilters" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-1 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
    <div class="card bg-base-100 shadow-lg rtl text-right">
    <div class="card-body">
        <div class="flex justify-between items-center mb-4 flex-row-reverse">
        <h2 class="card-title justify-end">لیست اعضا</h2>
        <div class="flex gap-2 flex-row-reverse">
            <div class="h-full flex justify-between items-center mb-6">
            <div className="tooltip font-semibold" data-tip="چاپ لیست پرداخت‌ها">

            <button type="button" class="text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" @click="exportToExcel">
                چاپ
            <svg class="w-6 h-6 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
            </svg>
            </button>
            </div>
        </div>
        </div>
        </div>
        
        <div class="overflow-x-auto border border-gray-200 rounded-lg">
        <table class="table table-zebra text-right">
            <thead>
            <tr class="bg-base-200">
                <th>ردیف</th>
                <th>نام و نام خانوادگی</th>
                <th>شماره تماس</th>
                <th>نوع عضویت</th>
                <th>تاریخ ثبت‌نام</th>
                <th>تاریخ انقضا</th>
                <th>وضعیت</th>
                <th>عملیات</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(member, index) in paginatedMembers" :key="member.id">
                <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                <td>{{ member.fullName }}</td>
                <td>{{ member.phone }}</td>
                <td>
                <span :class="membershipBadgeClass(member.membershipType)">
                    {{ membershipTypeText(member.membershipType) }}
                </span>
                </td>
                <td>{{ formatDate(member.registrationDate) }}</td>
                <td>{{ formatDate(member.expiryDate) }}</td>
                <td>
                <span :class="statusBadgeClass(member.status)">
                    {{ statusText(member.status) }}
                </span>
                </td>
                <td>
                <button @click="viewDetails(member)" class="btn btn-xs btn-info">
                    جزئیات
                </button>
                </td>
            </tr>
            </tbody>
        </table>
        </div>
        
        <!-- صفحه‌بندی -->
        <div class="flex justify-center mt-4">
        <div class="join flex-row-reverse">
            <button 
            v-for="page in totalPages" 
            :key="page"
            @click="currentPage = page"
            class="join-item btn"
            :class="{ 'btn-active': currentPage === page }"
            >
            {{ page }}
            </button>
        </div>
        </div>
    </div>
    </div>

      
      <!-- مدال نمایش جزئیات -->
      <dialog id="memberModal" class="modal">
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
      </dialog>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        filters: {
          startDate: null,
          endDate: null,
          membershipType: '',
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
        selectedMember: null // عضو انتخابی برای نمایش جزئیات
      };
    },
    computed: {
      totalPages() {
        return Math.ceil(this.members.length / this.pageSize);
      },
      paginatedMembers() {
        const start = (this.currentPage - 1) * this.pageSize;
        const end = start + this.pageSize;
        return this.members.slice(start, end);
      }
    },
    methods: {
      applyFilters() {
        // اعمال فیلترها و بروزرسانی آمار
      },
      resetFilters() {
        this.filters = {
          startDate: null,
          endDate: null,
          membershipType: '',
          status: ''
        };
        this.applyFilters();
      },
      exportToExcel() {
        // خروجی به فرمت Excel
      },
      exportToPDF() {
        // خروجی به فرمت PDF
      },
      formatDate(date) {
        // فرمت‌بندی تاریخ
      },
      viewDetails(member) {
        this.selectedMember = member;
        const modal = document.getElementById('memberModal');
        modal.showModal();
      },
      membershipBadgeClass(type) {
        // تعیین کلاس برای نوع عضویت
      },
      membershipTypeText(type) {
        // متن نوع عضویت
      },
      statusBadgeClass(status) {
        // کلاس وضعیت
      },
      statusText(status) {
        // متن وضعیت
      },
      paymentTypeText(type) {
        // نوع پرداخت
      }
    }
  };
  </script>
  
  <style scoped>
  /* استایل‌های اضافی */
  </style>
  