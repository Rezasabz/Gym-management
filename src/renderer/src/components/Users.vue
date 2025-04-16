<template>

<div className="overflow-x-auto w-full">
    <h1 class="text-2xl font-bold text-center mb-6">لیست اعضا</h1>

  <input type="text" v-model="searchQuery" placeholder="جستجو براساس نام یا نام خانوادگی..." class="input input-bordered w-full md:max text-right p-3 rtl custom-rtl font-semibold" />
    <div class="bg-base-100 shadow-lg rounded-lg mt-6 mb-6 p-6">
        <!-- بخش جستجو و دکمه افزودن کاربر -->
        <div class="h-full flex justify-between items-center mb-6">
            <div className="tooltip font-semibold" data-tip="چاپ لیست اعضا">
            <button type="button" class="text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800" @click="downloadExcel">
                چاپ
            <svg class="w-6 h-6 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
            </svg>
            </button>
            </div>
            <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="openAddModal">
                افزودن عضو جدید
                <svg class="w-6 h-6 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                </svg>

            </button>
        </div>

        <!-- جدول کاربران -->
        <div class="overflow-x-auto border border-gray-200 rounded-lg">
            <table class="table w-full text-right rtl" ref="userTable">
                <!-- head -->
                <thead>
                    <tr class="bg-base-200">
                        <th class="text-right">عملیات</th>
                        <th class="text-right">تاریخ ثبت‌نام</th>
                        <!-- <th class="text-right">آدرس</th>
                        <th class="text-right">شماره تماس اضطراری</th> -->
                        <th class="text-right">وضعیت عضویت</th>
                        <th class="text-right">شماره موبایل</th>
                        <th class="text-right">شماره عضویت</th>
                        <th class="text-right">نام خانوادگی</th>
                        <!-- <th class="text-right">عکس پروفایل</th> -->
                        <th class="text-right">نام</th>
                        <th>ردیف</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, index) in filteredUsers" :key="user.id">
                        <td>
                            <button v-if="shouldShowRenewButton(user)" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-md shadow-purple-200/50 dark:shadow-md dark:shadow-purple-200/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="openRenewalModal(user)">
                                تمدید
                            </button>
                            <button class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-300/50 dark:shadow-lg dark:shadow-red-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="confirmDeleteUser(user)">
                                حذف
                            </button>
                            <button class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-300/50 dark:shadow-lg dark:shadow-green-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="openEditModal(user)">
                                ویرایش
                            </button>
                            <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-300/50 dark:shadow-lg dark:shadow-blue-300/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="viewUser(user)">
                                جزئیات
                            </button>

                        </td>
                        <td class="font-semibold">{{ user.registrationDate }}</td>
                        <!-- <td class="font-bold">{{ user.address }}</td>
                        <td class="font-bold">{{ user.emergencyPhone }}</td> -->
                        <td>
                            <span class="font-semibold"
                                :class="{
                                    'text-xs font-medium me-2 px-2.5 py-0.5 rounded-full shadow-sm': true,
                                    'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100': user.status === 'فعال',
                                    'bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100': user.status !== 'فعال'
                                }">
                            {{ user.status }}
                            </span>

                        </td>
                        <td class="font-bold">{{ user.phone }}</td>
                        <td class="font-bold">{{ user.memberId }}</td>
                        <td class="font-semibold">{{ user.lastName }}</td>
                        <!-- <td>
              <img
                :src="user.profilePic"
                alt="Profile"
                class="w-10 h-10 rounded-full"
              />
            </td> -->
                        <td class="font-semibold">{{ user.firstName }}</td>
                        <td class="font-semibold">{{ index + 1 }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- مدال افزودن/ویرایش کاربر -->
        <div v-if="showModal" class="modal modal-open">
            

            <div class="modal-box w-11/12 max-w-4xl">
                <h3 class="font-bold text-lg mb-4">
                    {{ isEditMode ? "ویرایش کاربر" : "افزودن کاربر جدید" }}
                </h3>
                <div class="gap-4 flex flex-col flex-auto">
                <form @submit.prevent="submitForm">
                    <div class="grid md:grid-cols-2 gap-4">
                        <div class="form-control">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span class="label-text">نام خانوادگی</span>
                        </label>
                        <input type="text" v-model="newUser.lastName" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" required />
                    </div>
                    <div class="form-control">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span class="label-text">نام </span>
                        </label>
                        <input type="text" v-model="newUser.firstName" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" required />
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-4">
                    <div class="form-control mt-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span class="label-text">شماره عضویت</span>
                        </label>
                        <input type="text" v-model="newUser.memberId" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" required />
                    </div>
                    <div class="form-control mt-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span class="label-text">شماره موبایل</span>
                        </label>
                        <input type="text" v-model="newUser.phone" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" required />
                    </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="form-control mt-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span class="label-text">وضعیت عضویت</span>
                        </label>
                        <select v-model="newUser.status" class="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                            <option value="فعال">فعال</option>
                            <option value="منقضی‌شده">منقضی‌شده</option>
                        </select>
                    </div>
                    <div class="form-control mt-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span class="label-text"> شماره موبایل اضطراری</span>
                        </label>
                        <input type="text" v-model="newUser.emergencyPhone" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" required />
                    </div>
                </div>
                <div class="grid md:grid-cols-3 gap-4">
                    <div class="mt-4">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">روش پرداخت</label>
                        <select id="countries" v-model="newUser.paymentMethod" class="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                            <option value="کارت">کارت</option>
                            <option value="نقدی">نقدی</option>
                        </select>
                    </div>
                    <div class="mt-4">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">مدت زمان دوره</label>
                        <select id="countries" v-model.number="newUser.renewal_duration" class="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                            <option :value="1" selected>1 ماهه</option>
                            <option :value="2">2 ماهه</option>
                        </select>
                    </div>
                    <div class="form-control mt-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span class="label-text">تاریخ ثبت‌نام</span>
                        </label>
                        <input ref="dateInput" v-model="newUser.registrationDate" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl custom-date-input" />

                        <date-picker
                        v-model="newUser.registrationDate"
                        format="YYYY-MM-DD"
                        display-format="jYYYY/jMM/jDD"
                        custom-input=".custom-date-input"
                        />
                        <!-- <input ref="dateInput" v-model="newUser.registrationDate" data-jdp class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" /> -->
                        <!-- <input type="date" v-model="newUser.registrationDate" class="input input-bordered" required /> -->
                        <!-- <div id="my-datepicker-wrapper"></div> -->
                              <!-- تقویم فارسی -->

                    </div>
                    </div>
                    <div class="grid md:grid-cols-2 gap-4">
                    <div class="mb-2 mt-4">
                        <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">مبلغ</label>
                        <input type="text" v-model="newUser.paymentAmount" id="small-input" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                    </div>
                    <div class="mb-2 mt-4">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">وضعیت</label>
                        <select id="countries" v-model="newUser.paymentStatus" class="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                            <option value="پرداخت شده" selected>پرداخت شده</option>
                            <option value="پرداخت نشده">پرداخت نشده</option>
                        </select>
                    </div>
                    </div>
                    <div class="form-control mt-2">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span class="label-text"> آدرس</span>
                        </label>
                        <input type="text" v-model="newUser.address" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" required />
                    </div>

                    <div class="flex justify-center items-center modal-action mt-5">
                        <button type="button" class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-300/50 dark:shadow-lg dark:shadow-red-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="closeModal">
                            لغو
                        </button>
                        <button type="submit" class="btn-wide text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-300/50 dark:shadow-lg dark:shadow-blue-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            {{ isEditMode ? "ویرایش" : "افزودن" }}
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </div>
        <div>
            <!-- مدال تأیید حذف -->
            <div v-if="showDeleteModal" class="modal modal-open">
                <div class="modal-box">
                    <div class="flex justify-end">
                        <h3 class="font-bold text-lg mb-4 mr-3">حذف کاربر</h3>
                        <svg width="25" height="25" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--twemoji" preserveAspectRatio="xMidYMid meet"><path fill="#FFCC4D" d="M2.653 35C.811 35-.001 33.662.847 32.027L16.456 1.972c.849-1.635 2.238-1.635 3.087 0l15.609 30.056c.85 1.634.037 2.972-1.805 2.972H2.653z"></path><path fill="#231F20" d="M15.583 28.953a2.421 2.421 0 0 1 2.419-2.418a2.421 2.421 0 0 1 2.418 2.418a2.422 2.422 0 0 1-2.418 2.419a2.422 2.422 0 0 1-2.419-2.419zm.186-18.293c0-1.302.961-2.108 2.232-2.108c1.241 0 2.233.837 2.233 2.108v11.938c0 1.271-.992 2.108-2.233 2.108c-1.271 0-2.232-.807-2.232-2.108V10.66z"></path></svg>
                    </div>

                    <p>آیا از حذف این کاربر مطمئن هستید؟</p>
                    <div class="flex justify-center items-center modal-action mt-4">
                        <button type="button" class="btn-wide text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-300/50 dark:shadow-lg dark:shadow-blue-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="closeDeleteModal">انصراف</button>
                        <button type="button" class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-300/50 dark:shadow-lg dark:shadow-red-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="deleteUserConfirmed">حذف</button>
                    </div>
                </div>
            </div>
            <!-- مدال نمایش اطلاعات کاربر -->



            <dialog v-if="showDetailsModal" className="modal modal-open" dir="rtl">
    <div className="modal-box w-11/12 max-w-7xl text-right">
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
              <span class="text-3xl font-bold">{{ selectedUser.firstName.charAt(0) }}</span>
            </div>
          </div>
          <h2 class="text-xl font-bold text-center md:text-right">{{ selectedUser.firstName }} {{ selectedUser.lastName }}</h2>
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
        <span class="font-medium text-gray-800">{{ selectedUser.memberId }}</span>
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
          'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100': selectedUser.status === 'فعال',
          'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100': selectedUser.status !== 'فعال'
        }">
          {{ selectedUser.status }}
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
          <span class="font-medium text-gray-800">{{ selectedUser.phone }}</span>
          <a :href="'tel:' + selectedUser.phone" class="text-gray-400 hover:text-purple-600">
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
          <span class="font-medium text-gray-800">{{ selectedUser.emergencyPhone }}</span>
          <a :href="'tel:' + selectedUser.emergencyPhone" class="text-gray-400 hover:text-red-600">
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
        <span class="font-medium text-gray-800">{{ selectedUser.address }}</span>
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
        <span class="font-medium text-gray-800">{{ selectedUser.registrationDate }}</span>
      </div>
    </div>
  </div>
</div>
      <!-- دکمه بستن -->
      <!-- <div class="modal-action mt-6">
        <button 
          class="btn btn-error text-white w-full sm:w-auto"
          @click="closeDetailsModal">
          بستن
        </button>
      </div> -->
      <div class="modal-action mt-4">
                        <button class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-300/50 dark:shadow-lg dark:shadow-red-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="closeDetailsModal">بستن</button>
                    </div>
    </div>
  </dialog>

            <!-- تمدید کاربر -->
             <dialog v-if="showRenewalModal" className="modal modal-open">
                <div class="modal-box w-11/12 max-w-3xl">
                    <h3 class="font-bold text-lg">تمدید</h3>
                    <h4>{{ userToRenewal.firstName }} {{ userToRenewal.lastName }}</h4>
                    <div className="divider"></div>
                    <form @submit.prevent="submitFormRenewal">
                        <div class="grid md:grid-cols-2 gap-4">
                            <div class="form-control">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                <span class="label-text">مبلغ</span>
                            </label>
                            <input type="text" v-model="renewal_payment" class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" disabled readonly />
                        </div>
                        <div class="form-control mb-4">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                <span class="label-text">تاریخ</span>
                            </label>
                            <input ref="dateInput" v-model="userToRenewal.registrationDate" aria-label="disabled input 2" data-jdp class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" disabled readonly />
                        </div>
                        </div>
                        <div class="grid md:grid-cols-1 gap-4">
                    <!-- <div class="mt-4 mb-4">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">روش پرداخت</label>
                        <select id="countries" v-model="obj_renewals.paymentMethod" class="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                            <option value="کارت">کارت</option>
                            <option value="نقدی">نقدی</option>
                        </select>
                    </div> -->
                    <div class="flex justify-center items-center mt-4 mb-4">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">مدت زمان دوره</label>
                        <select id="countries" v-model="obj_renewals.duration" class="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                            <option value="1">1 ماهه</option>
                            <option value="2">2 ماهه</option>
                        </select>
                    </div>
                        </div>
                        <button type="button" class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="closeRenewalModal">بستن</button>
                        <button type="submit" class="btn-wide text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                            ثبت
                        </button>
                    </form>
                </div>
             </dialog>
            <!-- <div v-if="showDetailsModal" class="modal modal-open">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">مشخصات کامل کاربر</h3>
        <div class="mb-2">
          <strong>نام:</strong> {{ selectedUser.firstName }} {{ selectedUser.lastName }}
        </div>
        <div class="mb-2">
          <strong>شماره عضویت:</strong> {{ selectedUser.memberId }}
        </div>
        <div class="mb-2">
          <strong>شماره موبایل:</strong> {{ selectedUser.phone }}
        </div>
        <div class="mb-2">
          <strong>آدرس:</strong> {{ selectedUser.address }}
        </div>
        <div class="mb-2">
          <strong>شماره تماس اضطراری:</strong> {{ selectedUser.emergencyPhone }}
        </div>
        <div class="mb-2">
          <strong>وضعیت عضویت:</strong> {{ selectedUser.status }}
        </div>
        <div class="mb-2">
          <strong>تاریخ ثبت‌نام:</strong> {{ selectedUser.registrationDate }}
        </div>
        <div class="modal-action mt-4">
          <button class="btn" @click="closeDetailsModal">بستن</button>
        </div>
      </div>
    </div> -->
        </div>
    </div>
</div>
</template>

<script>
// import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.js";
// import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";
import moment from 'jalali-moment';
import * as XLSX from 'xlsx';
import DatePicker from 'vue3-persian-datetime-picker'

export default {
    components: {
    DatePicker
  },
    data() {
        return {
            users: [],
            payments: [],
            showDeleteModal: false,
            userToDelete: null,
            selectedUser: null,
            showDetailsModal: false, // متغیر جدید برای نمایش مدال
            showRenewalModal: false,
            userToRenewal: null,
            showRenewalBtn: false,
            newUser: {
                id: '',
                firstName: '',
                lastName: '',
                memberId: '',
                phone: '',
                status: 'فعال',
                emergencyPhone: '',
                address: '',
                registrationDate: '',
                renewal_duration: '1', // مدت زمان دوره
                expirationDate: '',
                paymentAmount: '', // مبلغ پرداختی
                paymentMethod: 'کارت', // روش پرداخت
                paymentStatus: 'پرداخت شده' // وضعیت پرداخت
            },
            obj_renewals: {
                userId: '',
                renewal_date: '',
                duration: '1',
                new_expiration_date: ''

            },
            progress: 0, // مقدار اولیه پراگرس بار
            expirationDateMiladi: null,
            remainingDays: 0,
            showModal: false,
            isEditMode: false,
            searchQuery: '',
            selectedUser: null,
            renewal_payment: '',
            renewal_user_id: '',
            renewals: []
        };
    },
        computed: {
            filteredUsers() {
                return this.users.filter(user => 
                    (user.firstName?.includes(this.searchQuery) || user.lastName?.includes(this.searchQuery))
                );
            },


    
        },
    methods: {
        downloadExcel() {

                 // ایجاد هدر فارسی
        const headers = [["ردیف", "نام", "نام خانوادگی", "شماره عضویت", "شماره موبایل", "وضعیت", "تاریخ ثبت‌نام"]];
        // reverse headers to show the latest date first
        headers[0].reverse();
                  // فیلتر کردن فقط داده‌های غیر دکمه‌ای
        const filteredUsers = this.users.map(user => {
            const { registrationDate, status, phone, memberId, lastName, firstName, id} = user; // فقط داده‌های غیر دکمه‌ای را نگه می‌داریم
            return { registrationDate, status, phone, memberId, lastName, firstName, id };
        });

            const ws = XLSX.utils.json_to_sheet(filteredUsers); // تبدیل جدول به sheet
                  // اضافه کردن هدر به شیت
            XLSX.utils.sheet_add_aoa(ws, headers, { origin: "A1" });


                  // تنظیم رنگ پس‌زمینه هدر
            // تنظیم رنگ پس‌زمینه هدر
            const range = XLSX.utils.decode_range(ws['!ref']);
            for (let col = range.s.c; col <= range.e.c; col++) {
                const cell = ws[XLSX.utils.encode_cell({r: 0, c: col})];
                if (cell) {
                cell.s = cell.s || {}; // اگر استایل وجود ندارد، یک شی جدید ایجاد می‌کنیم
                cell.s.fill = {
                    fgColor: { rgb: "4CAF50" } // رنگ پس‌زمینه سبز برای هدر
                };
                cell.s.font = {
                    bold: true, // برای بولد کردن متن
                    color: { rgb: "FFFFFF" } // رنگ متن سفید
                };
                }
            }

                  // تنظیم عرض ستون‌ها متناسب با محتوا و هدر
            const colWidths = [];
            
            // ابتدا طول هدر را بررسی می‌کنیم
            headers[0].forEach((header, idx) => {
                colWidths[idx] = Math.max(colWidths[idx] || 0, header.length);
            });

            // سپس طول داده‌ها را بررسی می‌کنیم
            for (let i = 0; i < filteredUsers.length; i++) {
                Object.values(filteredUsers[i]).forEach((value, idx) => {
                const length = value ? value.toString().length : 0;
                colWidths[idx] = Math.max(colWidths[idx] || 0, length);
                });
            }

            // اعمال عرض به ستون‌ها
            ws['!cols'] = colWidths.map(width => ({ wch: width }));
            const wb = XLSX.utils.book_new(); // ایجاد کتابچه (workbook)
            XLSX.utils.book_append_sheet(wb, ws, 'Users'); // افزودن sheet به workbook
            XLSX.writeFile(wb, 'user_list.xlsx'); // دانلود فایل Excel
        },
        shouldShowRenewButton(user) {
            if (user.status === "منقضی‌شده") {
                return true; // اگر کاربر منقضی شده باشد، دکمه نمایش داده شود
            }

            // پیدا کردن آخرین تاریخ انقضا از جدول تمدیدها
            const lastRenewal = this.renewals.find(renewal => renewal.user_id === user.id);

            if (lastRenewal) {
                const expirationDate = moment.from(lastRenewal.new_expiration_date, "fa", "jYYYY/jMM/jDD").locale("en");
                const currentDate = moment();

                return currentDate.isAfter(expirationDate); // اگر تاریخ امروز بعد از تاریخ انقضا باشد، دکمه نمایش داده شود
            }

            return false; // در غیر این صورت دکمه نمایش داده نشود
        },
        // hasExpiredUsers() {
        //        return this.users.some(user => user.status === "منقضی‌شده");
        // },
        // activeUsers() {
        // return this.users.filter(user => user.status === "فعال");
        // },
        // async calculateProgress() {

        //     const shamsiDate = this.selectedUser.registrationDate; // تاریخ شمسی به‌صورت متن
        //     // const miladiDate = moment.from(shamsiDate, "fa", "jYYYY/jMM/jDD").locale("en").format("YYYY/MM/DD");
        //     const registrationDateMiladi = moment(moment.from(shamsiDate, "fa", "jYYYY/jMM/jDD").locale("en").format("YYYY-MM-DD"));
        //     // ۲. محاسبه تاریخ انقضا (با اضافه کردن 1 ماه)
        //     // const expirationDateMiladi = moment(registrationDateMiladi).add(1, "month");
        //     const expirationDateMiladi = moment(registrationDateMiladi).add(30, "days");


        //     // ۳. محاسبه اختلاف روزها
        //     const totalDays = expirationDateMiladi.diff(registrationDateMiladi, "days"); // کل روزهای دوره
        //     const passedDays = moment().diff(registrationDateMiladi, "days"); // روزهای سپری‌شده

        //     // ۴. محاسبه درصد مصرف‌شده
        //     const usedPercentage = (passedDays / totalDays) * 100;

        //     // جلوگیری از مقدار بیش از 100% (مثلاً اگر تاریخ انقضا گذشته باشد)
        //     const progress = Math.min(usedPercentage, 100);

        //     // ۵. محاسبه تعداد روزهای باقی‌مانده
        //     const remainingDays = Math.max(0, totalDays - passedDays);

        //             // تغییر وضعیت کاربر بر اساس تاریخ انقضا
        //     if (moment().isAfter(expirationDateMiladi)) {
        //         this.selectedUser.status = 'منقضی‌شده';
        //     }

        //     // به روزرسانی وضعیت در دیتابیس
        //     try {
        //         await window.api.getUserStatus(this.selectedUser.id);
        //     } catch (error) {
        //         console.error('Error updating user status in database:', error);
        //     }

        //     console.log("تاریخ ثبت‌نام:", registrationDateMiladi.format("YYYY-MM-DD"));
        //     console.log("تاریخ انقضا:", expirationDateMiladi.format("YYYY-MM-DD"));
        //     console.log("کل روزهای اعتبار:", totalDays);
        //     console.log("روزهای سپری‌شده:", passedDays);
        //     console.log("درصد مصرف‌شده:", progress.toFixed() + "%");
        //     this.progress = progress;
        //     this.expirationDateMiladi = expirationDateMiladi.format("jYYYY/jMM/jDD");
        //     this.remainingDays = remainingDays;

        // },
        // متد برای باز کردن مدال نمایش مشخصات کاربر
        async calculateProgress() {
    console.log("renewals => ", this.renewals);

    if (!this.selectedUser) {
        console.error('No selected user available');
        return;
    }

    let expirationDateMiladi, registrationDateMiladi;

    // پیدا کردن آخرین تمدید کاربر (اگر تمدید شده باشد)
    const lastRenewal = this.renewals
        .filter(renewal => renewal.user_id === this.selectedUser.id)
        .sort((a, b) => moment.from(b.new_expiration_date, "fa").valueOf() - moment.from(a.new_expiration_date, "fa").valueOf())[0];

    if (lastRenewal) {
        // اگر تمدید دارد، از آخرین تمدید استفاده کنیم
        expirationDateMiladi = moment.from(lastRenewal.new_expiration_date, "fa").locale("en");
        registrationDateMiladi = moment.from(lastRenewal.renewal_date, "fa").locale("en");
    } else {
        // اگر تمدید ندارد، تاریخ ثبت‌نام را در نظر بگیریم
        if (!this.selectedUser.registrationDate) {
            console.error('No registration date found for user');
            return;
        }

        registrationDateMiladi = moment.from(this.selectedUser.registrationDate, "fa").locale("en");
        expirationDateMiladi = moment(registrationDateMiladi).add(30, "days"); // اعتبار اولیه ۳۰ روزه
    }

    const totalDays = expirationDateMiladi.diff(registrationDateMiladi, "days");
    const passedDays = moment().diff(registrationDateMiladi, "days");
    const usedPercentage = (passedDays / totalDays) * 100;

    // محدود کردن مقدار درصد بین 0 تا 100
    this.progress = Math.min(Math.max(usedPercentage, 0), 100);
    this.remainingDays = Math.max(0, totalDays - passedDays);

    // اگر تاریخ انقضا گذشته باشد، وضعیت کاربر را تغییر بده
    if (moment().isAfter(expirationDateMiladi)) {
        this.selectedUser.status = 'منقضی‌شده';
    }

    console.log(`Progress: ${this.progress}%, Remaining Days: ${this.remainingDays}`);
},


//         async calculateProgress() {
//             console.log("renewals => ", this.renewals)
//     if (!this.selectedUser || !this.selectedUser.registrationDate) {
//         console.error('No selected user or registration date available');
//         return; // جلوگیری از ادامه پردازش در صورت نداشتن کاربر یا تاریخ ثبت‌نام
//     }

//     const shamsiDate = this.selectedUser.registrationDate; // تاریخ شمسی به‌صورت متن
//     const registrationDateMiladi = moment(moment.from(shamsiDate, "fa", "jYYYY/jMM/jDD").locale("en").format("YYYY-MM-DD"));
//     const expirationDateMiladi = moment(registrationDateMiladi).add(30, "days");
//     const totalDays = expirationDateMiladi.diff(registrationDateMiladi, "days");
//     const passedDays = moment().diff(registrationDateMiladi, "days");
//     const usedPercentage = (passedDays / totalDays) * 100;

//     const progress = Math.min(usedPercentage, 100);
//     const remainingDays = Math.max(0, totalDays - passedDays);

//     if (moment().isAfter(expirationDateMiladi)) {
//         this.selectedUser.status = 'منقضی‌شده';
//     }

//     try {
//         await window.api.getUserStatus(this.selectedUser.id);
//     } catch (error) {
//         console.error('Error updating user status in database:', error);
//     }

//     this.progress = progress;
//     this.expirationDateMiladi = expirationDateMiladi.format("jYYYY/jMM/jDD");
//     this.remainingDays = remainingDays;
// },

        
        viewUser(user) {
            if (!user || !user.registrationDate) {
        console.error('Selected user or registration date is invalid');
        return;
            }
            this.selectedUser = user;
            this.showDetailsModal = true;
            this.calculateProgress()
        },
        closeDetailsModal() {
            this.showDetailsModal = false;
            this.selectedUser = null;
        },
        async fetchUsers() {
            try {
                this.users = await window.api.getUsers();
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },
        confirmDeleteUser(user) {
            this.userToDelete = user;
            this.showDeleteModal = true;
        },
        closeDeleteModal() {
            this.showDeleteModal = false;
            this.userToDelete = null;
        },
        async deleteUserConfirmed() {
            try {
                await window.api.deleteUser(this.userToDelete.id); // ارسال فقط userId
                this.users = this.users.filter(user => user.id !== this.userToDelete.id);
                this.closeDeleteModal();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
            // if (!this.userToDelete) return;
            // try {
            //   await window.api.deleteUser({ id: this.userToDelete.id });
            //   this.users = this.users.filter(user => user.id !== this.userToDelete.id);
            //   this.closeDeleteModal();
            // } catch (error) {
            //   console.error('Error deleting user:', error);
            // }
        },
        async fetchPayments() {
            try {
                const response = await window.api.getPayments();
                this.payments = response || [];  // در صورتی که پاسخ خالی باشد، آرایه خالی اختصاص داده می‌شود
            } catch (error) {
                console.error("Error fetching payments:", error);
            }
        },
        openAddModal() {
            this.newUser = {
                firstName: '',
                lastName: '',
                memberId: '',
                phone: '',
                status: 'فعال',
                emergencyPhone: '',
                address: '',
                registrationDate: '',
                renewal_duration: '1',
                expirationDate: '',
                paymentAmount: '',
                paymentMethod: 'کارت',
                paymentStatus: 'پرداخت شده'
            };
            this.isEditMode = false;
            this.showModal = true;
        },
        openEditModal(user) {
            // console.log("---------------------");
            // this.fetchPayments();
            // console.log("---------------------");
            this.selectedUser = {
                ...user
            };

                // محاسبه تاریخ انقضا بر اساس مقادیر موجود
    this.calculateExpirationDate();
            console.log("this.selectedUser => ", this.selectedUser);
            
                // پیدا کردن پرداخت مربوط به این کاربر
            const payment = this.payments.find(payment => payment.userId === user.id);
            console.log("openEditModal ==> ", payment);

            this.newUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                memberId: user.memberId,
                phone: user.phone,
                status: user.status,
                emergencyPhone: user.emergencyPhone,
                address: user.address,
                registrationDate: user.registrationDate,
                renewal_duration: user.renewal_duration,
                expirationDate: user.expirationDate,
                paymentAmount: payment ? payment.amount : '', // اگر پرداختی برای کاربر موجود باشد
                paymentMethod: payment ? payment.paymentMethod : '', // اگر روش پرداخت موجود باشد
                paymentStatus: payment ? payment.status : 'موفق' // اگر وضعیت پرداخت موجود باشد
            };
            this.isEditMode = true;
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async submitForm() {
            if (this.isEditMode) {
                await this.updateUser();
                console.log("*********** @@")
            } else {
                console.log("*********** %%")
                await this.addUser();
            }
            console.log("*********** 1")
            await this.fetchUsers();
            console.log("*********** 2")
            this.closeModal();
        },
            calculateExpirationDate() {
            if (!this.newUser.registrationDate || !this.newUser.renewal_duration) {
                this.newUser.expirationDate = ''; // در صورت عدم مقداردهی، فیلد خالی بماند
                return;
            }

            const shamsiDate = this.newUser.registrationDate;
            const durationDays = parseInt(this.newUser.renewal_duration, 10); // تبدیل مدت به عدد صحیح

            if (isNaN(durationDays) || durationDays <= 0) {
                console.error('مدت دوره معتبر نیست');
                return;
            }

            // تبدیل تاریخ ثبت‌نام از شمسی به میلادی
            const registrationDateMiladi = moment(moment.from(shamsiDate, "fa", "jYYYY/jMM/jDD").locale("en").format("YYYY-MM-DD"));
            
            // افزودن مدت دوره (روزها) به تاریخ ثبت‌نام
            const expirationDateMiladi = moment(registrationDateMiladi).add(durationDays, "months");
            
            // تبدیل دوباره به شمسی و ذخیره در متغیر expirationDate
            this.newUser.expirationDate = expirationDateMiladi.format("jYYYY/jMM/jDD");

            console.log("تاریخ انقضا:", this.newUser.expirationDate);
        },
        calculateExpirationDate_Renewal() {
    // اگر مدت دوره مشخص نشده، مقداردهی نکن
    // if (!this.newUser.duration) {
    //     this.obj_renewals = ''; 
    //     return;
    // }

    // دریافت تاریخ امروز به‌شکل میلادی
    const currentDateMiladi = moment(); 
    
    const durationMonths = parseInt(this.obj_renewals.duration, 10); // تبدیل مدت به عدد صحیح

    if (isNaN(durationMonths) || durationMonths <= 0) {
        console.error('مدت دوره معتبر نیست');
        return;
    }

    // افزودن مدت دوره (ماه‌ها) به تاریخ امروز
    const expirationDateMiladi = moment(currentDateMiladi).add(durationMonths, "months");

    const currentDate = moment(currentDateMiladi).format("jYYYY/jMM/jDD")

    this.obj_renewals.renewal_date = currentDate
    // تبدیل دوباره به شمسی و ذخیره در متغیر expirationDate
    this.obj_renewals.new_expiration_date = expirationDateMiladi.format("jYYYY/jMM/jDD");

    console.log("تاریخ جدید انقضا:", this.obj_renewals.new_expiration_date);
    console.log("تاریخ جاری:", currentDate);
}
,
        async addUser() {
            try {
                console.log("New User Data:", this.newUser); // بررسی مقدار قبل از ارسال
                const addedUser = await window.api.addUser({
                    firstName: this.newUser.firstName,
                    lastName: this.newUser.lastName,
                    memberId: this.newUser.memberId,
                    phone: this.newUser.phone,
                    status: this.newUser.status,
                    emergencyPhone: this.newUser.emergencyPhone,
                    address: this.newUser.address,
                    registrationDate: this.newUser.registrationDate,
                    renewal_duration: this.newUser.renewal_duration,
                    expirationDate: this.newUser.expirationDate
                }); // ارسال نسخه‌ای از شیء

                console.log("New Payment:", this.newUser);
                console.log("addedUser ", addedUser)
                if (addedUser && addedUser.id) {
                    const resPayment = await window.api.addPayment({
                        userId: addedUser.id,
                        firstName: this.newUser.firstName,
                        lastName: this.newUser.lastName,
                        amount: this.newUser.paymentAmount,
                        paymentDate: this.newUser.registrationDate,
                        paymentMethod: this.newUser.paymentMethod,
                        status: this.newUser.paymentStatus
                    });

                    this.users.push(addedUser);
                    
                    this.payments.push(resPayment);
                    console.log("resPayment ", resPayment)
                }

                // if (addedUser) {
                //     this.users.push(addedUser);
                // }
            } catch (error) {
                console.error('Error adding user:', error);
            }


        },
        async updateUser() {
            try {
                console.log("########## ", this.users);
                await window.api.updateUser({
                    id: this.selectedUser.id,
                    firstName: this.newUser.firstName,
                    lastName: this.newUser.lastName,
                    memberId: this.newUser.memberId,
                    phone: this.newUser.phone,
                    status: this.newUser.status,
                    emergencyPhone: this.newUser.emergencyPhone,
                    address: this.newUser.address,
                    registrationDate: this.newUser.registrationDate,
                    renewal_duration: this.newUser.renewal_duration,
                    expirationDate: this.newUser.expirationDate
                });
                
                console.log("payments Arr ==> ", this.payments);
                console.log("this.selectedUser ==> ", this.selectedUser);
                console.log("this.users ==> ", this.users);
                                // پیدا کردن پرداخت مربوط به این کاربر
                const payment = this.payments.find(payment => payment.userId === this.selectedUser.id); 
                console.log("payment => ", payment)
                console.log("this.newUser => ", this.newUser)

                if (payment) {
                    console.log("step 1 payment ==> ");
                    await window.api.editPayments({
                        paymentId: payment.paymentId, // آیدی پرداختی که قرار است ویرایش شود
                        userId: payment.userId,
                        firstName: this.newUser.firstName,
                        lastName: this.newUser.lastName,
                        amount: this.newUser.paymentAmount,
                        paymentDate: this.newUser.registrationDate,
                        paymentMethod: this.newUser.paymentMethod,
                        status: this.newUser.paymentStatus
                    });
                }
            } catch (error) {
                console.error('Error updating user:', error);
            }
        },
        async deleteUser(userId) {
            try {
                await window.api.deleteUser(userId); // ارسال فقط userId
                this.users = this.users.filter(user => user.id !== userId);
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        },
        openRenewalModal(user){
            this.fetchPayments();
            let amount
            this.userToRenewal = user;
            this.renewal_user_id = user.id;
            this.showRenewalModal = true
            this.calculateExpirationDate_Renewal();
            this.renewal_payment = this.payments[0].amount
            console.log("newUser  ==> ", this.payments[0].amount)
        },
        closeRenewalModal(){
            this.userToRenewal = null;
            this.showRenewalModal = false
        },
        async submitFormRenewal(){
            console.log("this.userToRenewal.id ==> ", this.renewal_user_id);  // باید "1" را چاپ کند

            await this.addRenewals()
            await this.closeRenewalModal()
        },
        async addRenewals(){
            console.log("🚀 ارسال داده‌ها به API:", this.obj_renewals);
            console.log("this.userToRenewal => ", this.userToRenewal)
            const response = await window.api.addRenewals({
                user_id: this.renewal_user_id,
                renewal_date: this.obj_renewals.renewal_date,
                duration: this.obj_renewals.duration,
                new_expiration_date: this.obj_renewals.new_expiration_date
            })

                // اگر عملیات موفقیت‌آمیز بود، وضعیت کاربر را به‌روزرسانی کن
            if (response.success) {
                this.checkAndUpdateUserStatus(this.userToRenewal.id);
            }
        },

        async checkAndUpdateUserStatus(userId) {
            const response = await window.api.checkUserStatus(userId);
            if (response.success) {
                this.updateUserStatus(userId, response.status); // وضعیت جدید را به‌روزرسانی کن
            }
        },


        async updateUserStatus(userId, newStatus) {
            console.log(`Updating status for user ${userId} to ${newStatus}`);
            await window.api.updateUserStatus({
                userId: userId,
                status: newStatus
            });
        }
    },
    async mounted() {
        await this.fetchUsers();
        await this.fetchPayments();  // دریافت پرداخت‌ها
        this.calculateProgress(); // محاسبه درصد زمان در زمان بارگذاری کامپوننت
        console.log("users:", this.users);
        // console.log(this.hasExpiredUsers())
         // بررسی داده‌های پرداخت‌ها
    console.log("payments:", this.payments);
    jalaliDatepicker.startWatch({
    //   time: true,           // فعال باشه برای input دوم
    //   hasSecond: false,     // می‌تونی true بزاری اگه ثانیه هم بخوای
    //   autoHide: true,
    //   autoShow: true,
    //   hideAfterChange: true,
    //   container: "#my-datepicker-wrapper"
    });
        for (const user of this.users) {
        await this.checkAndUpdateUserStatus(user.id);
    }

    this.renewals = await window.api.fetchRenewals()
        
    },
    watch: {

            

    // اگر تاریخ ثبت‌نام تغییر کند، دوباره پراگرس بار را به‌روز می‌کنیم
    'newUser.registrationDate': function () {
      this.calculateProgress();
    },
    'newUser.renewal_duration': function () {
        this.calculateExpirationDate();
    },

  },
};

</script>
