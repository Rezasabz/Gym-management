<template>

<div className="overflow-x-auto w-full">
  <input type="text" v-model="searchQuery" placeholder="جستجو براساس نام یا نام خانوادگی..." class="input input-bordered w-full md:max text-right rtl custom-rtl" />
    <div class="bg-base-100 shadow-lg rounded-lg mt-6 mb-6 p-6">
        <!-- بخش جستجو و دکمه افزودن کاربر -->
        <div class="mb-6">
            <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" @click="openAddModal">
                افزودن کاربر
            </button>
        </div>

        <!-- جدول کاربران -->
        <div class="overflow-x-auto">
            <table class="table w-full text-right rtl">
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
                            <button class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="confirmDeleteUser(user)">
                                حذف
                            </button>
                            <button class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="openEditModal(user)">
                                ویرایش
                            </button>
                            <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="viewUser(user)">
                                جزئیات
                            </button>

                        </td>
                        <td class="font-semibold">{{ user.registrationDate }}</td>
                        <!-- <td class="font-bold">{{ user.address }}</td>
                        <td class="font-bold">{{ user.emergencyPhone }}</td> -->
                        <td>
                            <span class="font-semibold" :class="{
                  'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 shadow-sm shadow-blue-500/50': user.status === 'فعال',
                  'bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 shadow-sm shadow-blue-500/50': user.status !== 'فعال'
                }">
                                {{ user.status }}</span>
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
                        <td>{{ index + 1 }}</td>
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
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="mt-4">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">روش پرداخت</label>
                        <select id="countries" v-model="newUser.paymentMethod" class="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                            <option value="کارت" selected>کارت</option>
                            <option value="نقدی">نقدی</option>
                        </select>
                    </div>
                    <div class="form-control mt-4">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span class="label-text">تاریخ ثبت‌نام</span>
                        </label>
                        <input ref="dateInput" v-model="newUser.registrationDate" data-jdp class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" />
                        <!-- <input type="date" v-model="newUser.registrationDate" class="input input-bordered" required /> -->
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

                    <div class="modal-action mt-4">
                        <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="closeModal">
                            لغو
                        </button>
                        <button type="submit" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
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
                    <h3 class="font-bold text-lg mb-4">حذف کاربر</h3>
                    <p>آیا از حذف این کاربر مطمئن هستید؟</p>
                    <div class="modal-action mt-4">
                        <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="closeDeleteModal">انصراف</button>
                        <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="deleteUserConfirmed">حذف</button>
                    </div>
                </div>
            </div>
            <!-- مدال نمایش اطلاعات کاربر -->

            <dialog v-if="showDetailsModal" className="modal modal-open">
                <div className="modal-box w-11/12 max-w-7xl">
                  <button className="btn btn-square btn-sm" @click="closeDetailsModal">
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
                    <!-- <h3 class="font-bold text-lg mb-6">مشخصات کامل کاربر</h3> -->
                    <div class="card w-full bg-base-100 shadow-xl p-5 flex flex-col md:flex-row items-center md:items-start">
                        <div class="flex-1 ml-5">

                            <!-- <p class="text-sm text-gray-500">توسعه دهنده - منطقه زندگی</p> -->
                            <div class="flex items-center gap-2">
                                <h2 class=" grow text-lg font-bold">{{ selectedUser.firstName }} {{ selectedUser.lastName }}</h2>
                                <svg class="w-[45px] h-[45px]" fill="#2205ff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="800px" height="800px" viewBox="0 0 195.989 195.989" xml:space="preserve" stroke="#2205ff">

                                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                                    <g id="SVGRepo_iconCarrier">
                                        <g>
                                            <path d="M195.935,84.745c-2.07-15.789-20.983-37.722-20.983-37.722c-4.933-12.69-17.677-8.47-17.677-8.47l-8.507,2.295 c-8.421,2.533-8.025,13.555-4.372,15.789c1.602,0.978,6.297,1.233,7.685,0c0.414-0.374,0.098-2.165,0.098-2.165 c8.933,0.487,9.584-4.688,9.584-4.688l3.039-0.606c3.044-1.665,3.72,5.395,3.72,5.395c-2.07,20.009,6.595,27.334,6.595,27.334 c-1.254,3.973-5.62,3.206-5.62,3.206c-13.853-7.197-24.131,6.403-24.131,6.403c-7.831-6.671-23.991,5.148-23.991,5.148 c-9.055,1.79-9.591-9.106-9.591-9.106s-0.42-6.941-0.713-7.578c-0.426-1.084,1.925-0.536,1.925-0.536 c7.965-14.495,0-12.559,0-12.559c1.93-25.008-19.991-19.759-19.991-19.759C76.143,51.748,82.32,68.544,82.32,68.544 c-3.702-0.904-1.927,4.616-1.927,4.616c0.956,8.473,3.985,6.552,3.985,6.552c0.393,2.968,2.058,7.054,2.058,7.054l0.256,6.808 c-1.903,11.298-13.829,1.927-13.829,1.927c-6.996-9.864-24.536-4.348-24.536-4.348c-9.061-13.479-23.333-5.785-23.333-5.785 c1.516-3.349-0.256-20.009-0.256-20.009c1.772-2.058,5.331-13.712,5.331-13.712c1.522,2.058,8.388,2.42,8.388,2.42 c0.524,3.093,2.731,4.351,2.731,4.351c4.665,1.934,2.731-13.335,2.731-13.335c1.221-4.847-6.573-6.013-6.573-6.013 c-13.594-3.739-16.742,4.847-16.742,4.847l-3.547,7.712c-5.063,5.52-14.565,24.368-14.565,24.368 C-2.977,90.999,2.26,93.705,2.26,93.705l9.864,7.667c16.736,16.203,26.85,13.877,26.85,13.877 c13.46-0.256,12.352,8.458,12.352,8.458c0.536,13.342,9.852,27.182,9.852,27.182c0.685,2.326,1.172,4.786,1.656,7.222h63.811 c1.182-2.636,2.412-5.097,3.508-6.625c5.225-7.38,12.361-16.952,14.991-23.297c5.151-12.477,7.594-12.185,7.594-12.185 c18.383,0,28.527-13.329,28.527-13.329c3.014-3.86,7.593-8.616,10.948-10.522C196.726,89.571,195.935,84.745,195.935,84.745z" />
                                        </g>
                                    </g>

                                </svg>

                            </div>
                            <!-- <div className="divider"></div> -->
                            
                        <!-- <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                            <div class="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" :style="{ width: progress + '%' }"> {{ progress.toFixed(0) }}%</div>
                        </div> -->
                        <div class="w-full bg-gray-200 rounded-full dark:bg-gray-700">
                            <div
                                class="text-xs font-medium text-center p-0.5 leading-none rounded-full"
                                :class="progress >= 100 ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'"
                                :style="{ width: progress + '%' }">
                                {{ progress.toFixed(0) }}%
                            </div>
                        </div>



                            <div class="mt-2 flex gap-4 text-center">
                                <div class="stat">
                                    <div class="stat-title">مبلغ بدهی</div>
                                    <div class="stat-value text-red-500" style="
    direction: rtl;">0</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">جلسات باقی مانده</div>
                                    <div class="stat-value text-blue-500" style="
    direction: rtl;">{{ remainingDays }}</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">پایان اعتبار</div>
                                    <div class="stat-value text-green-500">{{ expirationDateMiladi }}</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">مجموع تمام شهریه‌های پرداخت شده</div>
                                    <div class="stat-value text-green-500" style="direction: rtl;">
                                        2,000,000 تومان
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="mt-4 flex gap-2">
      <button class="btn btn-primary">من را استخدام کن</button>
      <button class="btn btn-outline">دنبال کردن</button>
    </div> -->
                            <!-- <div class="mt-2 text-sm text-gray-500">تکمیل پروفایل ۵۰%</div> -->
                            <!-- <progress class="progress progress-success w-full" value="50" max="100"></progress> -->
                        </div>
                    </div>
                    <br />

                    <div class="card w-full bg-base-100 shadow-xl p-5 flex flex-col md:flex-row items-center md:items-start">
                        <div class="flex-1 ml-5">
                            <h3 class="font-bold text-lg mb-6">پروفایل</h3>
                            <div className="divider"></div>
                            <!-- <p class="text-sm text-gray-500">توسعه دهنده - منطقه زندگی</p> -->
                            <div class="mb-1">
                                <div class="mb-4">
                                    {{ selectedUser.memberId }} <strong>:شماره عضویت</strong>
                                </div>
                                <div class="mb-4">
                                    <strong>شماره موبایل:</strong> {{ selectedUser.phone }}
                                </div>
                                <div class="mb-4">
                                    <strong>آدرس:</strong> {{ selectedUser.address }}
                                </div>
                                <div class="mb-4">
                                    <strong>شماره تماس اضطراری:</strong> {{ selectedUser.emergencyPhone }}
                                </div>
                                <div class="mb-4">
                                    <strong>وضعیت عضویت:</strong>
                                    <span :class="{
                  'bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300': selectedUser.status === 'فعال',
                  'bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300': selectedUser.status !== 'فعال'
                }">
                                        {{ selectedUser.status }}</span>
                                </div>
                                <div class="mb-4">
                                    <strong>تاریخ ثبت‌نام:</strong> {{ selectedUser.registrationDate }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- <div className="card card-side bg-base-100 shadow-xl">

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
            </div> -->
                    <div class="modal-action mt-4">
                        <button class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="closeDetailsModal">بستن</button>
                    </div>
                </div>
                <!-- <div className="modal-box w-11/12 max-w-5xl">
            <div className="modal-action">
              <form method="dialog">
                <div className="card lg:card-side bg-base-100 shadow-xl">
                  <div className="card-body">

                    <div class="d-flex flex-wrap flex-sm-nowrap">
                      <div class="me-7 mb-4">
                        <figure className="p-6">
                      <img :src="selectedUser.profilePic" alt="Profile" className="w-20 h-20 rounded-full" />
                    </figure>
                      </div>
                      <div class="flex-grow-1">
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

                      </div>
                    </div>

                    </div>
                </div>
              </form>

            </div>
            <div class="modal-action mt-4">
                    <button class="btn" @click="closeDetailsModal">بستن</button>
                  </div>
          </div> -->

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
import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.js";
import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";
import moment from 'jalali-moment';
export default {
    data() {
        return {
            users: [],
            payments: [],
            showDeleteModal: false,
            userToDelete: null,
            selectedUser: null,
            showDetailsModal: false, // متغیر جدید برای نمایش مدال
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
                paymentAmount: '', // مبلغ پرداختی
                paymentMethod: '', // روش پرداخت
                paymentStatus: 'موفق' // وضعیت پرداخت
            },
            progress: 0, // مقدار اولیه پراگرس بار
            expirationDateMiladi: null,
            remainingDays: 0,
            showModal: false,
            isEditMode: false,
            searchQuery: '',
            selectedUser: null
        };
    },
        computed: {
            filteredUsers() {
                return this.users.filter(user => 
                    (user.firstName?.includes(this.searchQuery) || user.lastName?.includes(this.searchQuery))
                );
            }
        },
    methods: {
        async calculateProgress() {

            const shamsiDate = this.selectedUser.registrationDate; // تاریخ شمسی به‌صورت متن
            // const miladiDate = moment.from(shamsiDate, "fa", "jYYYY/jMM/jDD").locale("en").format("YYYY/MM/DD");
            const registrationDateMiladi = moment(moment.from(shamsiDate, "fa", "jYYYY/jMM/jDD").locale("en").format("YYYY-MM-DD"));
            // ۲. محاسبه تاریخ انقضا (با اضافه کردن 1 ماه)
            // const expirationDateMiladi = moment(registrationDateMiladi).add(1, "month");
            const expirationDateMiladi = moment(registrationDateMiladi).add(30, "days");


            // ۳. محاسبه اختلاف روزها
            const totalDays = expirationDateMiladi.diff(registrationDateMiladi, "days"); // کل روزهای دوره
            const passedDays = moment().diff(registrationDateMiladi, "days"); // روزهای سپری‌شده

            // ۴. محاسبه درصد مصرف‌شده
            const usedPercentage = (passedDays / totalDays) * 100;

            // جلوگیری از مقدار بیش از 100% (مثلاً اگر تاریخ انقضا گذشته باشد)
            const progress = Math.min(usedPercentage, 100);

            // ۵. محاسبه تعداد روزهای باقی‌مانده
            const remainingDays = Math.max(0, totalDays - passedDays);

                    // تغییر وضعیت کاربر بر اساس تاریخ انقضا
            if (moment().isAfter(expirationDateMiladi)) {
                this.selectedUser.status = 'منقضی‌شده';
            }

            // به روزرسانی وضعیت در دیتابیس
            try {
                await window.api.getUserStatus(this.selectedUser.id);
            } catch (error) {
                console.error('Error updating user status in database:', error);
            }

            console.log("تاریخ ثبت‌نام:", registrationDateMiladi.format("YYYY-MM-DD"));
            console.log("تاریخ انقضا:", expirationDateMiladi.format("YYYY-MM-DD"));
            console.log("کل روزهای اعتبار:", totalDays);
            console.log("روزهای سپری‌شده:", passedDays);
            console.log("درصد مصرف‌شده:", progress.toFixed() + "%");
            this.progress = progress;
            this.expirationDateMiladi = expirationDateMiladi.format("jYYYY/jMM/jDD");
            this.remainingDays = remainingDays;

        },
        // متد برای باز کردن مدال نمایش مشخصات کاربر
        viewUser(user) {
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
                paymentAmount: '',
                paymentMethod: '',
                paymentStatus: 'موفق'
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
                    registrationDate: this.newUser.registrationDate
                }); // ارسال نسخه‌ای از شیء

                console.log("New Payment:", this.newUser);
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
                    registrationDate: this.newUser.registrationDate
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
        }
    },
    async mounted() {
        await this.fetchUsers();
        await this.fetchPayments();  // دریافت پرداخت‌ها
        this.calculateProgress(); // محاسبه درصد زمان در زمان بارگذاری کامپوننت
        console.log("users:", this.users);
         // بررسی داده‌های پرداخت‌ها
    console.log("payments:", this.payments);
        jalaliDatepicker.startWatch();
    },
    watch: {
    // اگر تاریخ ثبت‌نام تغییر کند، دوباره پراگرس بار را به‌روز می‌کنیم
    'newUser.registrationDate': function () {
      this.calculateProgress();
    },
  },
};
</script>
