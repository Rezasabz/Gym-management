<template>
    <div class="p-6 max-w-8xl mx-auto">
      <h1 class="text-2xl font-bold mb-6">گزارش‌گیری اعضای باشگاه</h1>
      
      <div class="card bg-base-100 shadow-lg mb-6">
        <div class="card-body">
          <h2 class="card-title">فیلترهای گزارش</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <!-- فیلتر تاریخ شروع -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">از تاریخ</span>
              </label>
              <date-picker
                v-model="filters.startDate"
                type="date"
                display-format="jYYYY-jMM-jDD"
                placeholder="از تاریخ"
                input-class="input input-bordered w-full"
              />
            </div>
            
            <!-- فیلتر تاریخ پایان -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">تا تاریخ</span>
              </label>
              <date-picker
                v-model="filters.endDate"
                type="date"
                display-format="jYYYY-jMM-jDD"
                placeholder="تا تاریخ"
                input-class="input input-bordered w-full"
              />
            </div>
            
            <!-- فیلتر نوع عضویت -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">نوع عضویت</span>
              </label>
              <select v-model="filters.membershipType" class="select select-bordered">
                <option value="">همه</option>
                <option value="regular">عادی</option>
                <option value="vip">ویژه</option>
                <option value="student">دانشجویی</option>
              </select>
            </div>
            
            <!-- فیلتر وضعیت -->
            <div class="form-control">
              <label class="label">
                <span class="label-text">وضعیت</span>
              </label>
              <select v-model="filters.status" class="select select-bordered">
                <option value="">همه</option>
                <option value="active">فعال</option>
                <option value="expired">منقضی</option>
                <option value="suspended">معلق</option>
              </select>
            </div>
          </div>
          
          <div class="mt-4 flex justify-end gap-2">
            <button @click="resetFilters" class="btn btn-ghost">
              بازنشانی فیلترها
            </button>
            <button @click="applyFilters" class="btn btn-primary">
              اعمال فیلترها
            </button>
          </div>
        </div>
      </div>
      
      <!-- آمار کلی -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div class="stats bg-primary text-primary-content">
          <div class="stat">
            <div class="stat-title">کل اعضا</div>
            <div class="stat-value">{{ stats.totalMembers }}</div>
            <div class="stat-desc">تاکنون</div>
          </div>
        </div>
        
        <div class="stats bg-success text-success-content">
          <div class="stat">
            <div class="stat-title">اعضای فعال</div>
            <div class="stat-value">{{ stats.activeMembers }}</div>
            <div class="stat-desc">در حال حاضر</div>
          </div>
        </div>
        
        <div class="stats bg-warning text-warning-content">
          <div class="stat">
            <div class="stat-title">اعضای جدید</div>
            <div class="stat-value">{{ stats.newMembers }}</div>
            <div class="stat-desc">این ماه</div>
          </div>
        </div>
        
        <div class="stats bg-error text-error-content">
          <div class="stat">
            <div class="stat-title">اعضای منقضی</div>
            <div class="stat-value">{{ stats.expiredMembers }}</div>
            <div class="stat-desc">نیاز به تمدید</div>
          </div>
        </div>
      </div>
      
      <!-- جدول گزارش -->
      <div class="card bg-base-100 shadow-lg">
        <div class="card-body">
          <div class="flex justify-between items-center mb-4">
            <h2 class="card-title">لیست اعضا</h2>
            <div class="flex gap-2">
              <button @click="exportToExcel" class="btn btn-sm btn-success">
                خروجی Excel
              </button>
              <button @click="exportToPDF" class="btn btn-sm btn-accent">
                خروجی PDF
              </button>
            </div>
          </div>
          
          <div class="overflow-x-auto">
            <table class="table table-zebra">
              <thead>
                <tr>
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
            <div class="join">
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
  