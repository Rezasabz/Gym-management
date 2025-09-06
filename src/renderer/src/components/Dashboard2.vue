<template>
    <div class="min-h-screen bg-gray-100">
      <!-- نوار کناری -->
      <div class="drawer lg:drawer-open">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        
        <div class="drawer-content flex flex-col">
          <!-- نوار بالایی -->
          <!-- <header class="navbar bg-base-100 shadow-sm">
            <div class="flex-none lg:hidden">
              <label for="my-drawer" class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </label>
            </div>
            <div class="flex-1 px-2 mx-2 font-bold text-lg">مدیریت باشگاه بدنسازی</div>
            <div class="flex-none gap-2">
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                  <div class="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                    <span class="text-xl">اد</span>
                  </div>
                </div>
                <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li><a>پروفایل</a></li>
                  <li><a>تنظیمات</a></li>
                  <li><a @click="logout">خروج</a></li>
                </ul>
              </div>
            </div>
          </header> -->
  
          <!-- محتوای اصلی -->
          <main class="flex-1 p-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <!-- کارت آمار اعضا -->
              <div class="stats bg-primary text-primary-content shadow">
                <div class="stat">
                  <div class="stat-title text-primary-content">کل اعضا</div>
                  <div class="stat-value">1,248</div>
                  <div class="stat-desc">20 عضو جدید این ماه</div>
                </div>
              </div>
              
              <!-- کارت اعضای فعال -->
              <div class="stats bg-success text-success-content shadow">
                <div class="stat">
                  <div class="stat-title text-success-content">اعضای فعال</div>
                  <div class="stat-value">876</div>
                  <div class="stat-desc">70% از کل اعضا</div>
                </div>
              </div>
              
              <!-- کارت درآمد ماهانه -->
              <div class="stats bg-warning text-warning-content shadow">
                <div class="stat">
                  <div class="stat-title text-warning-content">درآمد ماهانه</div>
                  <div class="stat-value">125,450,000</div>
                  <div class="stat-desc">تومان</div>
                </div>
              </div>
              
              <!-- کارت ظرفیت باقیمانده -->
              <!-- <div class="stats bg-info text-info-content shadow">
                <div class="stat">
                  <div class="stat-title text-info-content">ظرفیت باقیمانده</div>
                  <div class="stat-value">42%</div>
                  <div class="stat-desc">تا سقف ظرفیت</div>
                </div>
              </div> -->
            </div>
  
            <!-- نمودارها و جداول -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <!-- نمودار حضور ماهانه -->
              <div class="lg:col-span-2 card bg-base-100 shadow">
                <div class="card-body">
                  <h2 class="card-title">حضور ماهانه اعضا</h2>
                  <div class="h-64" ref="attendanceChart"></div>
                </div>
              </div>
              
              <!-- لیست اعضای جدید -->
              <div class="card bg-base-100 shadow">
                <div class="card-body">
                  <h2 class="card-title">اعضای جدید</h2>
                  <div class="overflow-x-auto">
                    <table class="table table-sm">
                      <thead>
                        <tr>
                          <th>نام</th>
                          <th>تاریخ ثبت‌نام</th>
                          <th>نوع</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="member in newMembers" :key="member.id">
                          <td>{{ member.name }}</td>
                          <td>{{ member.joinDate }}</td>
                          <td><span :class="`badge ${member.type === 'VIP' ? 'badge-primary' : 'badge-info'}`">{{ member.type }}</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="card-actions justify-end mt-2">
                    <button class="btn btn-sm btn-ghost">مشاهده همه</button>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- جدول آخرین پرداخت‌ها -->
            <div class="card bg-base-100 shadow">
              <div class="card-body">
                <h2 class="card-title">آخرین پرداخت‌ها</h2>
                <div class="overflow-x-auto">
                  <table class="table">
                    <thead>
                      <tr>
                        <th>شماره</th>
                        <th>عضو</th>
                        <th>مبلغ</th>
                        <th>تاریخ</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="payment in recentPayments" :key="payment.id">
                        <td>{{ payment.id }}</td>
                        <td>{{ payment.member }}</td>
                        <td>{{ payment.amount.toLocaleString() }} تومان</td>
                        <td>{{ payment.date }}</td>
                        <td>
                          <span :class="`badge ${payment.status === 'موفق' ? 'badge-success' : 'badge-error'}`">
                            {{ payment.status }}
                          </span>
                        </td>
                        <td>
                          <button class="btn btn-xs btn-info">جزئیات</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="card-actions justify-end mt-4">
                  <button class="btn btn-primary">مشاهده همه پرداخت‌ها</button>
                </div>
              </div>
            </div>
          </main>
        </div>
        
        <!-- نوار کناری -->

      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import ApexCharts from 'apexcharts'
  
  export default {
    setup() {
      // داده‌های نمونه
      const newMembers = ref([
        { id: 1, name: 'علی محمدی', joinDate: '1402/05/15', type: 'VIP' },
        { id: 2, name: 'فاطمه احمدی', joinDate: '1402/05/14', type: 'عادی' },
        { id: 3, name: 'رضا کریمی', joinDate: '1402/05/12', type: 'VIP' },
        { id: 4, name: 'زهرا حسینی', joinDate: '1402/05/10', type: 'عادی' },
        { id: 5, name: 'محمد رضایی', joinDate: '1402/05/08', type: 'عادی' }
      ])
  
      const recentPayments = ref([
        { id: 1001, member: 'علی محمدی', amount: 1500000, date: '1402/05/15', status: 'موفق' },
        { id: 1002, member: 'فاطمه احمدی', amount: 1200000, date: '1402/05/14', status: 'موفق' },
        { id: 1003, member: 'رضا کریمی', amount: 1800000, date: '1402/05/13', status: 'ناموفق' },
        { id: 1004, member: 'زهرا حسینی', amount: 1000000, date: '1402/05/12', status: 'موفق' },
        { id: 1005, member: 'محمد رضایی', amount: 900000, date: '1402/05/11', status: 'موفق' }
      ])
  
      const logout = () => {
        console.log('User logged out')
        // در اینجا می‌توانید کاربر را به صفحه لاگین هدایت کنید
      }
  
      // تنظیم نمودار
      onMounted(() => {
        const options = {
          series: [{
            name: 'حضور',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 75, 60, 45]
          }],
          chart: {
            height: 350,
            type: 'line',
            toolbar: {
              show: false
            },
            fontFamily: 'IRANSans'
          },
          colors: ['#4f46e5'],
          stroke: {
            width: 3,
            curve: 'smooth'
          },
          xaxis: {
            categories: ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'],
            labels: {
              style: {
                fontFamily: 'IRANSans'
              }
            }
          },
          yaxis: {
            labels: {
              style: {
                fontFamily: 'IRANSans'
              }
            }
          },
          tooltip: {
            style: {
              fontFamily: 'IRANSans'
            }
          }
        }
  
        const chart = new ApexCharts(document.querySelector(".h-64"), options)
        chart.render()
      })
  
      return {
        newMembers,
        recentPayments,
        logout
      }
    }
  }
  </script>
  
  <style>
  /* فونت فارسی */
  @import url('https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/fonts.css');
  
  body {
    font-family: 'Vazirmatn', sans-serif;
  }
  
  /* استایل‌های سفارشی */
  .drawer-side .menu li a.active {
    @apply bg-primary text-primary-content;
  }
  
  .drawer-side .menu li a.router-link-exact-active {
    @apply bg-primary text-primary-content;
  }
  </style>