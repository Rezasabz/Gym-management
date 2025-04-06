<template>

<div className="overflow-x-auto w-full">
  <input type="text" v-model="searchQuery" placeholder="جستجو براساس نام یا نام خانوادگی..." class="input input-bordered w-full md:max text-right rtl custom-rtl" />
    <div class="bg-base-100 shadow-lg rounded-lg mt-6 mb-6 p-6">
        <!-- بخش جستجو و دکمه افزودن کاربر -->
        <div class="h-full flex justify-between items-center mb-6">
            <div className="tooltip" data-tip="چاپ لیست اعضا">
            <button type="button" class="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500" @click="downloadExcel">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z"/>
            </svg>

            <span class="sr-only">Icon description</span>
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
        <div class="overflow-x-auto">
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
                            <button v-if="shouldShowRenewButton(user)" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="openRenewalModal(user)">
                                تمدید
                            </button>
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

                    <div class="flex justify-center items-center modal-action mt-5">
                        <button type="button" class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="closeModal">
                            لغو
                        </button>
                        <button type="submit" class="btn-wide text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
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
                        <button type="button" class="btn-wide text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="closeDeleteModal">انصراف</button>
                        <button type="button" class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="deleteUserConfirmed">حذف</button>
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
                        <button class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="closeDetailsModal">بستن</button>
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
import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.js";
import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";
import moment from 'jalali-moment';
import * as XLSX from 'xlsx';

export default {
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
        jalaliDatepicker.startWatch();
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
