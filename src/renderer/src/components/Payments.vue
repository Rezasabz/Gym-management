<template>
    <div class="overflow-x-auto w-full">
      <!-- <h2 class="text-2xl font-bold text-center mb-6">مدیریت پرداخت‌ها</h2> -->
  
      <!-- فیلتر و جستجو -->
      <div class="flex flex-wrap gap-4 mb-6">
        <input
          v-model="searchQuery"
          type="text"
        placeholder="جستجو براساس نام یا نام خانوادگی..." 
        class="input input-bordered w-full md:max text-right rtl custom-rtl"
        />
      </div>
  
      <!-- لیست پرداخت‌های قبلی -->
      <div class="bg-base-100 shadow-lg rounded-xl p-4 mb-6">
        <!-- <div class="mb-6">
            <button  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="openModal">
                افزودن پرداختی
            </button>
        </div> -->
        <!-- <h3 class="text-lg font-semibold mb-3">پرداخت‌های گذشته</h3> -->
        <div class="h-full flex justify-between items-center mb-6">
            <div className="tooltip" data-tip="چاپ لیست پرداخت‌ها">
            <button type="button" class="btn-widetext-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500" @click="downloadExcelPayments">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
            </svg>

            <span class="sr-only">Print</span>
            </button>
            </div>
        </div>
        <div class="overflow-x-auto">
          <table class="table w-full text-right rtl">
            <thead>
              <tr class="bg-base-200">
                
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
                v-for="(payment, index) in payments"
                :key="payment.id"
                class="hover"
              >
                <td>
                  <span class="font-semibold" :class="{
                    'text-xs font-medium me-2 px-2.5 py-0.5 rounded-full shadow-sm': true,
                    'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100': payment.status === 'پرداخت شده',
                    'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100': payment.status !== 'پرداخت شده'
                  }">{{ payment.status }}</span>

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
            </tbody>
          </table>
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
    };
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
  