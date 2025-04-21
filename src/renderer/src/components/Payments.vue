<template>
    <div class="overflow-x-auto w-full">
      <h2 class="text-2xl font-bold text-center mb-6">مدیریت پرداخت‌ها</h2>
  

  
      <!-- لیست پرداخت‌های قبلی -->
      <div class="bg-base-100 shadow-lg rounded-xl p-4 mb-6 border border-blue-100">
              <!-- فیلتر و جستجو -->
      <div class="flex flex-wrap gap-4 mb-6">
        <div class="relative w-full">
        <div class="absolute left-3 top-3 text-blue-500">
          <!-- search svg -->
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> -->
                    <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 2.75C6.66751 2.75 2.75 6.66751 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75ZM1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0605 20.8111 16.4017 19.2589 18.1982L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L18.1982 19.2589C16.4017 20.8111 14.0605 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5Z" fill="rgb(59, 130, 246)"/>
                    </svg>
                  </div>
        <input
          v-model="searchQueryPayment"
          type="text"
          placeholder="جستجو براساس نام یا نام خانوادگی..." 
          class="input input-bordered w-full input input-bordered w-full pl-12 bg-white border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 custom-rtl"
        />

                </div>
        <!-- <input
          v-model="searchQueryPayment"
          type="text"
          placeholder="جستجو براساس نام یا نام خانوادگی..." 
          class="input input-bordered w-full input input-bordered w-full pl-12 bg-white border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 custom-rtl"
        /> -->
        
      </div>

        <!-- <div class="mb-6">
            <button  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="openModal">
                افزودن پرداختی
            </button>
        </div> -->
        <!-- <h3 class="text-lg font-semibold mb-3">پرداخت‌های گذشته</h3> -->
        <div class="h-full flex justify-between items-center mb-6">
            <div className="tooltip font-semibold" data-tip="چاپ لیست پرداخت‌ها">
            <!-- <button type="button" class="btn-widetext-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500" @click="downloadExcelPayments">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
            </svg>

            <span class="sr-only">Print</span>
            </button> -->
            <button type="button" class="text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" @click="downloadExcelPayments">
                چاپ 
            <svg class="w-6 h-6 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
            </svg>
            </button>
            </div>
        </div>
        <div class="overflow-x-auto border border-gray-200 rounded-lg">
          <table class="table w-full text-right rtl">
            <thead>
              <tr class="bg-blue-200">
                
                  <th>وضعیت</th>
                  <th>روش پرداخت</th>
                  <th>مبلغ (تومان)</th>
                  <th>تاریخ</th>
                  <th>نام و نام خانوادگی</th>
                <th>ردیف</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(payment, index) in paginatedMembers"
                :key="payment.id"
                class="hover"
              >
              
                <td>

                  <div class="flex items-center justify-end">

                    <span 
                    :class="{
                      'mr-2 font-semibold text-emerald-500': payment.status === 'پرداخت شده',
                      'mr-2 font-semibold text-red-500': payment.status !== 'پرداخت شده',
                      }"

                    >
                    {{ payment.status }}
                    </span>
                    <span 
                    :class="{
                      'badge-dot w-3 h-3 border border-white rounded-full text-xs font-semibold text-white bg-emerald-500': payment.status === 'پرداخت شده',
                      'badge-dot w-3 h-3 border border-white rounded-full text-xs font-semibold text-white bg-red-500': payment.status !== 'پرداخت شده'}
                      ">
                    </span>
                    </div>

                  <!-- <span class="font-semibold" :class="{
                    'text-xs font-medium me-2 px-2.5 py-0.5 rounded-full shadow-sm': true,
                    'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100': payment.status === 'پرداخت شده',
                    'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100': payment.status !== 'پرداخت شده'
                  }">{{ payment.status }}</span> -->

                  <!-- <span class="font-semibold bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 shadow-sm shadow-blue-500/50">{{ payment.status }}</span> -->
                </td>
                <td>
                  <span
                    class="badge font-semibold"
                    :class="payment.paymentMethod === 'کارت' ? 'inline-flex items-center rounded-lg bg-blue-100 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset shadow-sm' : 'inline-flex items-center rounded-lg bg-pink-100 px-3 py-2 text-xs font-medium text-pink-700 ring-1 ring-pink-700/10 ring-inset shadow-sm'"
                  >
                    {{ payment.paymentMethod === 'کارت' ? 'کارت' : 'نقدی' }}
                  </span>
                </td>
                <td class="font-bold">{{ payment.amount.toLocaleString() }}</td>
                <td class="font-bold">{{ payment.paymentDate }}</td>
                <td class="font-bold">{{ payment.firstName }} {{ payment.lastName }}</td>
                <td class="font-bold">{{ index + 1 }}</td>
              </tr>
              <tr v-if="filterPayments.length === 0">
                      <td colspan="12" class="text-center font-semibold">
                        
                        <div class="flex justify-center items-center w-full py-8">
                          <span class="inline-flex items-center gap-2 bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1.5 rounded-full dark:bg-gray-700 dark:text-gray-300 font-semibold">
                            <!-- آیکون عدم وجود داده -->
                          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.55004 9.60004C7.21867 9.35152 7.15152 8.88142 7.40004 8.55004C7.64857 8.21867 8.11867 8.15152 8.45004 8.40004L10.45 9.90004C10.6389 10.0417 10.75 10.264 10.75 10.5C10.75 10.7361 10.6389 10.9584 10.45 11.1L8.45004 12.6C8.11867 12.8486 7.64857 12.7814 7.40004 12.45C7.15152 12.1187 7.21867 11.6486 7.55004 11.4L8.75004 10.5L7.55004 9.60004Z" class="fill-gray-800 dark:fill-gray-200"/>
                            <path d="M16.6 8.55004C16.8486 8.88142 16.7814 9.35152 16.45 9.60004L15.25 10.5L16.45 11.4C16.7814 11.6486 16.8486 12.1187 16.6 12.45C16.3515 12.7814 15.8814 12.8486 15.55 12.6L13.55 11.1C13.3612 10.9584 13.25 10.7361 13.25 10.5C13.25 10.264 13.3612 10.0417 13.55 9.90004L15.55 8.40004C15.8814 8.15152 16.3515 8.21867 16.6 8.55004Z" class="fill-gray-800 dark:fill-gray-200"/>
                            <path d="M15.5304 16.5304C15.2375 16.8233 14.7626 16.8233 14.4697 16.5304L13.9996 16.0603C13.4388 16.5896 12.5607 16.5895 12 16.0599C11.4394 16.5895 10.5613 16.5896 10.0005 16.0603L9.53037 16.5304C9.23748 16.8233 8.76261 16.8233 8.46971 16.5304C8.17682 16.2375 8.17682 15.7626 8.46971 15.4697L8.96971 14.9697C9.52875 14.4107 10.429 14.4009 11 14.9403C11.5609 14.4105 12.4392 14.4105 13 14.9403C13.5711 14.4009 14.4713 14.4107 15.0304 14.9697L15.5304 15.4697C15.8233 15.7626 15.8233 16.2375 15.5304 16.5304Z" class="fill-gray-300"/>
                            <path opacity="0.5" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" class="fill-gray-300"/>
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
            class="btn border border-gray-300 mr-1"
            :class="{ 'btn-active': currentPage === page }"
            >
            {{ page }}
            </button>
        </div>
        </div>
      </div>
  
      <!-- افزوردن پرداخت -->
      <div v-if="isModalOpen" class="modal modal-open ">
            <div class="modal-box w-11/12 max-w-4xl">
                <h3 class="font-bold text-lg mb-4">
                    {{ isEditMode ? "ویرایش کاربر" : "افزودن کاربر جدید" }}
                </h3>
                <div class="gap-4 flex flex-col flex-auto">
                <form @submit.prevent="submitForm">
                    <div class="grid md:grid-cols-2 gap-4">
                    <div class="mb-2">
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">نام خانوادگی</label>
                        <input type="text" id="small-input" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                    </div>
                    <div>
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">نام </label>
                        <input type="text" id="small-input" class="block w-full p-4 text-gray-900 rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="mb-2">
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">مبلغ</label>
                        <input type="text" id="small-input" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                    </div>
                    <div>
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">تاریخ </label>
                        <input ref="dateInput"  class="input bg-gray-100 w-full rounded-xl custom-rtl" />
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="mb-2">
                        <form>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">وضعیت</label>
                        <select id="countries" class="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                            <option selected>پرداخت شده</option>
                            <option value="US">پرداخت نشده</option>
                        </select>
                        </form>

                    </div>
                    <div>
                        <form>
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">روش پرداخت</label>
                        <select id="countries" class="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                            <option selected>کارت</option>
                            <option value="US">نقدی</option>
                        </select>
                        </form>
                    </div>
                </div>
                    <div class="modal-action mt-4">
                        <button type="button" class="btn" @click="closeModal">
                            بستن
                        </button>
                        <button type="submit" class="btn btn-primary">
                            {{ isEditMode ? "ویرایش" : "افزودن" }}
                        </button>
                    </div>
                </form>
            </div>
                <!-- <form @submit.prevent="submitPayment">
          <div class="form-group">
            <label for="amount">Amount</label>
            <input type="number" class="input input-bordered" id="amount" v-model="newPayment.amount" required />
          </div>

          <div class="form-group">
            <label for="paymentDate">Payment Date</label>
            <input type="date" class="input input-bordered" id="paymentDate" v-model="newPayment.paymentDate" required />
          </div>

          <div class="form-group">
            <label for="paymentMethod">Payment Method</label>
            <input type="text" class="input input-bordered" id="paymentMethod" v-model="newPayment.paymentMethod" required />
          </div>

          <div class="modal-actions">
            <button type="button" @click="closeModal" class="btn btn-secondary">Cancel</button>
            <button type="submit" class="btn btn-primary">Submit</button>
          </div>
        </form> -->
                <!-- <form @submit.prevent="submitForm">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">نام </span>
                        </label>
                        <input type="text" v-model="newUser.firstName" class="input input-bordered" required />
                    </div>
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">نام خانوادگی</span>
                        </label>
                        <input type="text" v-model="newUser.lastName" class="input input-bordered" required />
                    </div>
                    <div class="form-control mt-2">
                        <label class="label">
                            <span class="label-text">شماره عضویت</span>
                        </label>
                        <input type="text" v-model="newUser.memberId" class="input input-bordered" required />
                    </div>
                    <div class="form-control mt-2">
                        <label class="label">
                            <span class="label-text">شماره موبایل</span>
                        </label>
                        <input type="text" v-model="newUser.phone" class="input input-bordered" required />
                    </div>
                    <div class="form-control mt-2">
                        <label class="label">
                            <span class="label-text">وضعیت عضویت</span>
                        </label>
                        <select v-model="newUser.status" class="select select-bordered">
                            <option value="فعال">فعال</option>
                            <option value="منقضی‌شده">منقضی‌شده</option>
                        </select>
                    </div>
                    <div class="form-control mt-2">
                        <label class="label">
                            <span class="label-text"> شماره موبایل اضطراری</span>
                        </label>
                        <input type="text" v-model="newUser.emergencyPhone" class="input input-bordered" required />
                    </div>
                    <div class="form-control mt-2">
                        <label class="label">
                            <span class="label-text"> آدرس</span>
                        </label>
                        <input type="text" v-model="newUser.address" class="input input-bordered" required />
                    </div>
                    <div class="form-control mt-2">
                        <label class="label">
                            <span class="label-text">تاریخ ثبت‌نام</span>
                        </label>
                        <input ref="dateInput" v-model="newUser.registrationDate" data-jdp class="input input-bordered w-full" />
                    </div>
                    <div class="modal-action mt-4">
                        <button type="button" class="btn" @click="closeModal">
                            بستن
                        </button>
                        <button type="submit" class="btn btn-primary">
                            {{ isEditMode ? "ویرایش" : "افزودن" }}
                        </button>
                    </div>
                </form> -->
            </div>
        </div>

      <!-- فرم ثبت پرداخت جدید -->
      <!-- <div class="bg-base-100 shadow-lg rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-3">ثبت پرداخت جدید</h3>
        <form @submit.prevent="submitPayment" class="space-y-4">
          <div class="form-control">
            <label class="label">نام و نام خانوادگی</label>
            <input
              v-model="newPayment.fullName"
              type="text"
              placeholder="مثلاً علی احمدی"
              class="input input-bordered"
              required
            />
          </div>
  
          <div class="form-control">
            <label class="label">مبلغ پرداختی (تومان)</label>
            <input
              v-model="newPayment.amount"
              type="number"
              placeholder="مثلاً 500000"
              class="input input-bordered"
              required
            />
          </div>
  
          <div class="form-control">
            <label class="label">روش پرداخت</label>
            <select v-model="newPayment.method" class="select select-bordered">
              <option value="cash">نقدی</option>
              <option value="card">کارت</option>
            </select>
          </div>
  
          <button type="submit" class="btn btn-primary w-full">پرداخت</button>
        </form>
      </div> -->
    </div>
  </template>
  
  <script>
  import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.js";
  import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";
  import * as XLSX from 'xlsx';
export default {
  data() {
    return {
      payments: [],
      isModalOpen: false,
      newPayment: {
        amount: '',
        paymentDate: '',
        paymentMethod: '',
      },
      searchQueryPayment: '',
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    filterPayments() {
      return this.payments.filter(payment =>
        (payment.firstName?.includes(this.searchQueryPayment) ||
         payment.lastName?.includes(this.searchQueryPayment))
      );
    },
    totalPages() {
                return Math.ceil(this.filterPayments.length / this.pageSize);
    },
    paginatedMembers() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.filterPayments.slice(start, end);
    },
  },
  methods: {
    downloadExcelPayments() {

      // ایجاد هدر فارسی
      const headers = [[
        "ردیف",
        "نام",
        "نام خانوادگی",
        "تاریخ",
        "مبلغ (تومان)",
        "روش پرداخت",
        "وضعیت",
      ]];
      // reverse headers to show the latest date first
      headers[0].reverse();
      // فیلتر کردن فقط داده‌های غیر دکمه‌ای

      const filteredPayments = this.payments.map( payment => {
      const { status, paymentMethod, amount, paymentDate, lastName, firstName, paymentId } = payment; // فقط داده‌های غیر دکمه‌ای را نگه می‌داریم
      return { status, paymentMethod, amount, paymentDate, lastName, firstName, paymentId };
      });

      const ws = XLSX.utils.json_to_sheet(filteredPayments); // تبدیل جدول به sheet
      // اضافه کردن هدر به شیت
      XLSX.utils.sheet_add_aoa(ws, headers, { origin: "A1" });

      // تنظیم عرض ستون‌ها متناسب با محتوا و هدر
      const colWidths = [];

      // ابتدا طول هدر را بررسی می‌کنیم
      headers[0].forEach((header, idx) => {
      colWidths[idx] = Math.max(colWidths[idx] || 0, header.length);
      });

      // سپس طول داده‌ها را بررسی می‌کنیم
      for (let i = 0; i < filteredPayments.length; i++) {
      Object.values(filteredPayments[i]).forEach((value, idx) => {
      const length = value ? value.toString().length : 0;
      colWidths[idx] = Math.max(colWidths[idx] || 0, length);
      });
      }

      // اعمال عرض به ستون‌ها
      ws['!cols'] = colWidths.map(width => ({ wch: width }));
      const wb = XLSX.utils.book_new(); // ایجاد کتابچه (workbook)
      XLSX.utils.book_append_sheet(wb, ws, 'Payments'); // افزودن sheet به workbook
      XLSX.writeFile(wb, 'payment_list.xlsx'); // دانلود فایل Excel
      },
          openModal() {
            this.isModalOpen = true;
          },
          closeModal() {
            this.isModalOpen = false;
    },
    async fetchPayments() {
        try {
            this.payments = await window.api.getPayments();
            
        } catch (error) {
            console.error('Error fetching payments:', error);
        }
    },
    async submitPayment() {
      try {
        // ارسال داده‌ها به پروسه اصلی برای اضافه کردن پرداخت
        await window.api.addPayment(this.newPayment);
        
        // بستن مدال و بازنشانی فرم
        this.closeModal();
        this.newPayment = { amount: '', paymentDate: '', paymentMethod: '' };
        
        // می‌توانید لیست پرداخت‌ها را به‌روز کنید
        this.$emit('payment-added');
      } catch (error) {
        console.error('Failed to add payment:', error);
      }
    },
  },
  async mounted(){
    await this.fetchPayments();
    console.log("----------- ", this.payments)
    jalaliDatepicker.startWatch();
  }
};
  </script>
  