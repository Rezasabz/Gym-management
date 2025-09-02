<template>
  <div className="overflow-x-auto w-full ">
    <h1 class="text-2xl font-semibold text-center mb-6">لیست اعضا</h1>

    <div class="bg-base-100 shadow-lg rounded-lg mb-6 p-4 border border-blue-100">
      <!-- <input type="text" v-model="searchQuery" placeholder="جستجو براساس نام یا نام خانوادگی..." class="input input-bordered w-full input input-bordered w-full pl-12 bg-white border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 custom-rtl mb-6" /> -->

      <div class="relative w-full mb-6">
        <div class="absolute left-3 top-3 text-blue-500">
          <!-- search svg -->
          <!-- <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> -->
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.5 2.75C6.66751 2.75 2.75 6.66751 2.75 11.5C2.75 16.3325 6.66751 20.25 11.5 20.25C16.3325 20.25 20.25 16.3325 20.25 11.5C20.25 6.66751 16.3325 2.75 11.5 2.75ZM1.25 11.5C1.25 5.83908 5.83908 1.25 11.5 1.25C17.1609 1.25 21.75 5.83908 21.75 11.5C21.75 14.0605 20.8111 16.4017 19.2589 18.1982L22.5303 21.4697C22.8232 21.7626 22.8232 22.2374 22.5303 22.5303C22.2374 22.8232 21.7626 22.8232 21.4697 22.5303L18.1982 19.2589C16.4017 20.8111 14.0605 21.75 11.5 21.75C5.83908 21.75 1.25 17.1609 1.25 11.5Z"
              fill="rgb(59, 130, 246)"
            />
          </svg>
        </div>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="جستجو براساس نام یا نام خانوادگی..."
          class="input input-bordered w-full input input-bordered w-full pl-12 bg-white border-blue-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 custom-rtl"
        />
      </div>

      <!-- بخش جستجو و دکمه افزودن کاربر -->
      <div class="h-full flex justify-between items-center mb-6">
        <div className="tooltip text-sm" data-tip="چاپ لیست اعضا">
          <button
            type="button"
            class="text-white bg-gradient-to-r from-teal-500 via-teal-600 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800"
            @click="downloadExcel"
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
        <button
          class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          @click="openAddModal"
        >
          افزودن عضو جدید
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
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>
      </div>

      <!-- جدول کاربران -->
      <div class="overflow-x-auto border border-gray-200 rounded-lg">
        <table class="table table-zebra w-full text-right rtl" ref="userTable">
          <!-- head -->
          <thead>
            <tr class="bg-blue-200">
              <th class="text-right">عملیات</th>
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
              <td>
                <div className="tooltip font-semibold" data-tip="تمدید">
                  <!-- دکمه تمدید (فقط آیکون) -->
                  <button
                    v-if="shouldShowRenewButton(user)"
                    class="p-2 text-purple-600 hover:text-purple-800"
                    @click="openRenewalModal(user)"
                    title="تمدید"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                </div>

                <!-- دکمه حذف (فقط آیکون) -->
                <div className="tooltip font-semibold" data-tip="حذف">
                  <button
                    class="p-2 text-red-600 hover:text-red-800"
                    @click="confirmDeleteUser(user)"
                    title="حذف"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
                <!-- دکمه ویرایش (فقط آیکون) -->
                <div className="tooltip font-semibold" data-tip="ویرایش">
                  <button
                    class="p-2 text-green-600 hover:text-green-800"
                    @click="openEditModal(user)"
                  >
                    <svg
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M11.9426 1.25L13.5 1.25C13.9142 1.25 14.25 1.58579 14.25 2C14.25 2.41421 13.9142 2.75 13.5 2.75H12C9.62178 2.75 7.91356 2.75159 6.61358 2.92637C5.33517 3.09825 4.56445 3.42514 3.9948 3.9948C3.42514 4.56445 3.09825 5.33517 2.92637 6.61358C2.75159 7.91356 2.75 9.62178 2.75 12C2.75 14.3782 2.75159 16.0864 2.92637 17.3864C3.09825 18.6648 3.42514 19.4355 3.9948 20.0052C4.56445 20.5749 5.33517 20.9018 6.61358 21.0736C7.91356 21.2484 9.62178 21.25 12 21.25C14.3782 21.25 16.0864 21.2484 17.3864 21.0736C18.6648 20.9018 19.4355 20.5749 20.0052 20.0052C20.5749 19.4355 20.9018 18.6648 21.0736 17.3864C21.2484 16.0864 21.25 14.3782 21.25 12V10.5C21.25 10.0858 21.5858 9.75 22 9.75C22.4142 9.75 22.75 10.0858 22.75 10.5V12.0574C22.75 14.3658 22.75 16.1748 22.5603 17.5863C22.366 19.031 21.9607 20.1711 21.0659 21.0659C20.1711 21.9607 19.031 22.366 17.5863 22.5603C16.1748 22.75 14.3658 22.75 12.0574 22.75H11.9426C9.63423 22.75 7.82519 22.75 6.41371 22.5603C4.96897 22.366 3.82895 21.9607 2.93414 21.0659C2.03933 20.1711 1.63399 19.031 1.43975 17.5863C1.24998 16.1748 1.24999 14.3658 1.25 12.0574V11.9426C1.24999 9.63423 1.24998 7.82519 1.43975 6.41371C1.63399 4.96897 2.03933 3.82895 2.93414 2.93414C3.82895 2.03933 4.96897 1.63399 6.41371 1.43975C7.82519 1.24998 9.63423 1.24999 11.9426 1.25ZM16.7705 2.27592C18.1384 0.908029 20.3562 0.908029 21.7241 2.27592C23.092 3.6438 23.092 5.86158 21.7241 7.22947L15.076 13.8776C14.7047 14.2489 14.4721 14.4815 14.2126 14.684C13.9069 14.9224 13.5761 15.1268 13.2261 15.2936C12.929 15.4352 12.6169 15.5392 12.1188 15.7052L9.21426 16.6734C8.67801 16.8521 8.0868 16.7126 7.68711 16.3129C7.28742 15.9132 7.14785 15.322 7.3266 14.7857L8.29477 11.8812C8.46079 11.3831 8.56479 11.071 8.7064 10.7739C8.87319 10.4239 9.07761 10.0931 9.31605 9.78742C9.51849 9.52787 9.7511 9.29529 10.1224 8.924L16.7705 2.27592ZM20.6634 3.33658C19.8813 2.55448 18.6133 2.55448 17.8312 3.33658L17.4546 3.7132C17.4773 3.80906 17.509 3.92327 17.5532 4.05066C17.6965 4.46372 17.9677 5.00771 18.48 5.51999C18.9923 6.03227 19.5363 6.30346 19.9493 6.44677C20.0767 6.49097 20.1909 6.52273 20.2868 6.54543L20.6634 6.16881C21.4455 5.38671 21.4455 4.11867 20.6634 3.33658ZM19.1051 7.72709C18.5892 7.50519 17.9882 7.14946 17.4193 6.58065C16.8505 6.01185 16.4948 5.41082 16.2729 4.89486L11.2175 9.95026C10.801 10.3668 10.6376 10.532 10.4988 10.7099C10.3274 10.9297 10.1804 11.1676 10.0605 11.4192C9.96337 11.623 9.88868 11.8429 9.7024 12.4017L9.27051 13.6974L10.3026 14.7295L11.5983 14.2976C12.1571 14.1113 12.377 14.0366 12.5808 13.9395C12.8324 13.8196 13.0703 13.6726 13.2901 13.5012C13.468 13.3624 13.6332 13.199 14.0497 12.7825L19.1051 7.72709Z"
                        fill="#1C274C"
                      />
                    </svg>
                    <!-- <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg> -->
                  </button>
                </div>
                <!-- دکمه جزئیات (فقط آیکون) -->
                <div className="tooltip font-semibold" data-tip="اطلاعات کاربر">
                  <button class="p-2 text-blue-600 hover:text-blue-800" @click="viewUser(user)">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
                <!-- <button v-if="shouldShowRenewButton(user)" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-md shadow-purple-200/50 dark:shadow-md dark:shadow-purple-200/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="openRenewalModal(user)">
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
                            </button> -->
              </td>
              <td class="font-semibold">{{ user.registrationDate }}</td>
              <!-- <td class="font-bold">{{ user.address }}</td>
                        <td class="font-bold">{{ user.emergencyPhone }}</td> -->
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
            <tr v-if="paginatedMembers.length === 0">
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
            class="btn border border-gray-300 mr-1"
            :class="{ 'btn-active': currentPage === page }"
          >
            {{ page }}
          </button>
        </div>
      </div>

      <!-- مدال افزودن/ویرایش کاربر -->
      <div v-if="showModal" class="modal modal-open">
        <div class="modal-box w-11/12 max-w-4xl">
          <div
            class="bg-gradient-to-l from-blue-100 to-white rounded-md p-1 flex items-center space-x-4 w-full max-w justify-end"
          >
            <div class="flex items-center justify-end gap-2 rtl">
              <h3 class="font-bold text-md">
                {{ isEditMode ? 'ویرایش عضو' : 'افزودن عضو جدید' }}
              </h3>
              <!-- آیکون ویرایش یا افزودن -->
              <svg
                class="h-9 w-9 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="6" r="4" stroke="#1C274C" stroke-width="1.5" />
                <path
                  opacity="0.5"
                  d="M15 13.3271C14.0736 13.1162 13.0609 13 12 13C7.58172 13 4 15.0147 4 17.5C4 19.9853 4 22 12 22C17.6874 22 19.3315 20.9817 19.8068 19.5"
                  stroke="#1C274C"
                  stroke-width="1.5"
                />
                <circle cx="18" cy="16" r="4" stroke="#1C274C" stroke-width="1.5" />
                <path
                  d="M18 14.6667V17.3333"
                  stroke="#1C274C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.6665 16L19.3332 16"
                  stroke="#1C274C"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="divider"></div>
          <div class="gap-4 flex flex-col flex-auto">
            <form @submit.prevent="submitForm">
              <div class="grid md:grid-cols-2 gap-4">
                <div class="form-control">
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span class="label-text">نام خانوادگی</span>
                  </label>
                  <input
                    type="text"
                    tabindex="2"
                    v-model="newUser.lastName"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    placeholder="نام خانوادگی"
                  />
                </div>
                <div class="form-control">
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span class="label-text">نام </span>
                  </label>
                  <input
                    type="text"
                    tabindex="1"
                    v-model="newUser.firstName"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    placeholder="نام"
                  />
                </div>
              </div>

              <div class="grid md:grid-cols-2 gap-4">
                <div class="form-control mt-2">
                  <label class="block mb-2 text-sm font-medium text-gray-900">
                    <span class="label-text">شماره عضویت</span>
                  </label>
                  <input
                    type="text"
                    tabindex="4"
                    v-model="newUser.memberId"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    placeholder="شماره عضویت"
                  />
                </div>
                <div class="form-control mt-2">
                  <label class="block mb-2 text-sm font-medium text-gray-900">
                    <span class="label-text">شماره موبایل</span>
                  </label>
                  <input
                    type="text"
                    tabindex="3"
                    v-model="newUser.phone"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    placeholder="شماره موبایل"
                  />
                </div>
              </div>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="form-control mt-2">
                  <label class="block mb-2 text-sm font-medium text-gray-900">
                    <span class="label-text">تاریخ ثبت‌نام</span>
                  </label>
                  <input
                    ref="dateInput"
                    tabindex="8"
                    v-model="newUser.registrationDate"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 custom-date-input"
                  />

                  <date-picker
                    v-model="newUser.registrationDate"
                    format="jYYYY/jMM/jDD"
                    display-format="jYYYY/jMM/jDD"
                    custom-input=".custom-date-input"
                  />
                  <!-- <input ref="dateInput" v-model="newUser.registrationDate" data-jdp class="block w-full p-4 text-gray-900  rounded-xl bg-gray-100 text-xs focus:ring-blue-500 focus:border-blue-500  dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl" /> -->
                  <!-- <input type="date" v-model="newUser.registrationDate" class="input input-bordered" required /> -->
                  <!-- <div id="my-datepicker-wrapper"></div> -->
                  <!-- تقویم فارسی -->
                </div>
                <div class="form-control mt-2">
                  <label class="block mb-2 text-sm font-medium text-gray-900">
                    <span class="label-text">وضعیت عضویت</span>
                  </label>
                  <select
                    v-model="newUser.status"
                    tabindex="7"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option class="font-semibold" value="فعال">فعال</option>
                    <option class="font-semibold" value="منقضی‌شده">منقضی‌شده</option>
                  </select>
                </div>
                <div class="form-control mt-2">
                  <label class="block mb-2 text-sm font-medium text-gray-900">
                    <span class="label-text"> شماره موبایل اضطراری</span>
                  </label>
                  <input
                    type="text"
                    tabindex="6"
                    v-model="newUser.emergencyPhone"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    placeholder="شماره موبایل اضطراری"
                  />
                </div>
              </div>
              <div class="grid md:grid-cols-3 gap-4">
                <div class="form-control mt-2">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900"
                    >روش پرداخت</label
                  >
                  <select
                    id="countries"
                    tabindex="10"
                    v-model="newUser.paymentMethod"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option class="font-semibold" value="کارت">کارت</option>
                    <option class="font-semibold" value="نقدی">نقدی</option>
                  </select>
                </div>
                <div class="form-control mt-2">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900"
                    >مدت زمان دوره</label
                  >
                  <select
                    id="countries"
                    tabindex="9"
                    v-model.number="newUser.renewal_duration"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option class="font-semibold" :value="1" selected>1 ماهه</option>
                    <option class="font-semibold" :value="2">2 ماهه</option>
                  </select>
                </div>
                <div class="form-control mt-2">
                  <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900"
                    >مبلغ</label
                  >
                  <input
                    type="text"
                    tabindex="8"
                    v-model="newUser.paymentAmount"
                    id="small-input"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="مبلغ"
                  />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-4">
                <div class="form-control mt-2">
                  <label class="block mb-2 text-sm font-medium text-gray-900">
                    <span class="label-text"> آدرس</span>
                  </label>
                  <input
                    type="text"
                    tabindex="12"
                    v-model="newUser.address"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    required
                    placeholder="آدرس"
                  />
                </div>
                <div class="form-control mt-2">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900"
                    >وضعیت</label
                  >
                  <select
                    id="countries"
                    tabindex="11"
                    v-model="newUser.paymentStatus"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-10 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option class="font-semibold" value="پرداخت شده" selected>پرداخت شده</option>
                    <option class="font-semibold" value="پرداخت نشده">پرداخت نشده</option>
                  </select>
                </div>
              </div>

              <div class="flex justify-center items-center modal-action mt-5">
                <button
                  type="button"
                  class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-300/50 dark:shadow-lg dark:shadow-red-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  @click="closeModal"
                >
                  لغو
                </button>
                <button
                  type="submit"
                  class="btn-wide text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-300/50 dark:shadow-lg dark:shadow-blue-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  {{ isEditMode ? 'ویرایش' : 'افزودن' }}
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
              <svg
                width="25"
                height="25"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                aria-hidden="true"
                role="img"
                class="iconify iconify--twemoji"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  fill="#FFCC4D"
                  d="M2.653 35C.811 35-.001 33.662.847 32.027L16.456 1.972c.849-1.635 2.238-1.635 3.087 0l15.609 30.056c.85 1.634.037 2.972-1.805 2.972H2.653z"
                ></path>
                <path
                  fill="#231F20"
                  d="M15.583 28.953a2.421 2.421 0 0 1 2.419-2.418a2.421 2.421 0 0 1 2.418 2.418a2.422 2.422 0 0 1-2.418 2.419a2.422 2.422 0 0 1-2.419-2.419zm.186-18.293c0-1.302.961-2.108 2.232-2.108c1.241 0 2.233.837 2.233 2.108v11.938c0 1.271-.992 2.108-2.233 2.108c-1.271 0-2.232-.807-2.232-2.108V10.66z"
                ></path>
              </svg>
            </div>

            <p>آیا از حذف این کاربر مطمئن هستید؟</p>
            <div class="flex justify-center items-center modal-action mt-2">
              <button
                type="button"
                class="btn-wide text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-300/50 dark:shadow-lg dark:shadow-blue-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                @click="closeDeleteModal"
              >
                انصراف
              </button>
              <button
                type="button"
                class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-300/50 dark:shadow-lg dark:shadow-red-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                @click="deleteUserConfirmed"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
        <!-- مدال نمایش اطلاعات کاربر -->

        <UserDetailsModal
          v-if="showDetailsModal"
          :show="showDetailsModal"
          :user="selectedUser"
          :progress="progress"
          :expirationDateMiladi="expirationDateMiladi"
          :totalPaid="calculateTotalPaid(selectedUser.id)"
          :remainingSessions="calculateRemainingSessions(selectedUser.id)"
          :debtAmount="calculateDebtAmount(selectedUser.id)"
          @close="closeDetailsModal"
        />
        <!-- تمدید کاربر -->
        <dialog v-if="showRenewalModal" className="modal modal-open">
          <div class="modal-box w-11/12 max-w-3xl">
            <h3 class="font-bold text-lg">تمدید</h3>
            <h4>{{ userToRenewal.firstName }} {{ userToRenewal.lastName }}</h4>
            <div className="divider"></div>
            <form @submit.prevent="submitFormRenewal">
              <div class="grid md:grid-cols-3 gap-4">
                <div class="form-control mb-8">
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span class="label-text">مبلغ</span>
                  </label>
                  <input
                    type="text"
                    v-model="renewal_payment"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-11 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    disabled
                    readonly
                  />
                </div>

                <div class="form-control">
                  <label class="block mb-2 text-sm font-medium text-gray-900">
                    <span class="label-text">تاریخ تمدید</span>
                  </label>
                  <input
                    v-model="obj_renewals.renewal_date"
                    class="block w-full p-4 text-gray-900 rounded-xl bg-gray-100 text-xs font-semibold"
                    disabled
                    readonly
                  />
                </div>

                <!-- </div> -->
                <!-- <div class="grid md:grid-cols-1 gap-4"> -->
                <!-- <div class="mt-4 mb-4">
                        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">روش پرداخت</label>
                        <select id="countries" v-model="obj_renewals.paymentMethod" class="bg-gray-100 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 custom-rtl">
                            <option value="کارت">کارت</option>
                            <option value="نقدی">نقدی</option>
                        </select>
                    </div> -->

                <div class="form-control">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900"
                    >مدت زمان دوره</label
                  >
                  <select
                    id="countries"
                    v-model="obj_renewals.duration"
                    dir="rtl"
                    class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm h-11 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="1">1 ماهه</option>
                    <option value="2">2 ماهه</option>
                  </select>
                </div>
              </div>
              <div class="flex justify-center items-center modal-action mt-4">
                <button
                  type="button"
                  class="btn-wide text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-300/50 dark:shadow-lg dark:shadow-red-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  @click="closeRenewalModal"
                >
                  بستن
                </button>
                <button
                  type="submit"
                  class="btn-wide text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-300/50 dark:shadow-lg dark:shadow-blue-300/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  ثبت
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </div>
  </div>
</template>

<script>
// import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.js";
// import "@majidh1/jalalidatepicker/dist/jalalidatepicker.min.css";
import moment from 'jalali-moment'
import * as XLSX from 'xlsx'
import DatePicker from 'vue3-persian-datetime-picker'
import UserDetailsModal from './modals/UserDetailsModal.vue'
import Swal from 'sweetalert2'

export default {
  components: {
    UserDetailsModal,
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
      sortColumn: '',
      sortDirection: 'asc',
      sortUsers_arr: [], // کاربران فیلتر شده
      currentPage: 1,
      pageSize: 10,
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
    }
  },
  computed: {
    filteredUsers() {
      return this.users.filter(
        (user) =>
          user.firstName?.includes(this.searchQuery) || user.lastName?.includes(this.searchQuery)
      )
    },

    // لیست نهایی کاربران بعد از فیلتر و مرتب‌سازی
    sortedUsers() {
      if (!this.sortColumn) return this.filteredUsers

      return [...this.filteredUsers].sort((a, b) => {
        const modifier = this.sortDirection === 'asc' ? 1 : -1

        // حالت خاص برای مرتب‌سازی تاریخ
        if (this.sortColumn === 'registrationDate') {
          const dateA = new Date(a.registrationDate).getTime()
          const dateB = new Date(b.registrationDate).getTime()
          return (dateA - dateB) * modifier
        }

        // حالت عمومی برای بقیه فیلدها
        const valueA = a[this.sortColumn] || ''
        const valueB = b[this.sortColumn] || ''

        return valueA.toString().localeCompare(valueB.toString()) * modifier
      })
    },
    totalPages() {
      return Math.ceil(this.filteredUsers.length / this.pageSize)
    },
    paginatedMembers() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.filteredUsers.slice(start, end)
    }
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
    sortData() {
      if (!this.sortColumn) return

      this.users.sort((a, b) => {
        let valueA = a[this.sortColumn]
        let valueB = b[this.sortColumn]

        // برای ستون تاریخ شمسی
        if (this.sortColumn === 'registrationDate') {
          // تبدیل تاریخ شمسی به میلادی برای مقایسه
          valueA = moment(valueA, 'jYYYY/jMM/jDD').unix()
          valueB = moment(valueB, 'jYYYY/jMM/jDD').unix()
        }

        // برای مقایسه رشته‌های فارسی
        if (typeof valueA === 'string' && this.sortColumn !== 'registrationDate') {
          return this.sortDirection === 'asc'
            ? valueA.localeCompare(valueB, 'fa')
            : valueB.localeCompare(valueA, 'fa')
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
    downloadExcel() {
      // ایجاد هدر فارسی
      const headers = [
        ['ردیف', 'نام', 'نام خانوادگی', 'شماره عضویت', 'شماره موبایل', 'وضعیت', 'تاریخ ثبت‌نام']
      ]
      // reverse headers to show the latest date first
      headers[0].reverse()
      // فیلتر کردن فقط داده‌های غیر دکمه‌ای
      const filteredUsers = this.users.map((user) => {
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
    shouldShowRenewButton(user) {
      if (user.status === 'منقضی‌شده') {
        return true // اگر کاربر منقضی شده باشد، دکمه نمایش داده شود
      }

      // پیدا کردن آخرین تاریخ انقضا از جدول تمدیدها
      const lastRenewal = this.renewals.find((renewal) => renewal.user_id === user.id)

      if (lastRenewal) {
        const expirationDate = moment
          .from(lastRenewal.new_expiration_date, 'fa', 'jYYYY/jMM/jDD')
          .locale('en')
        const currentDate = moment()

        return currentDate.isAfter(expirationDate) // اگر تاریخ امروز بعد از تاریخ انقضا باشد، دکمه نمایش داده شود
      }

      return false // در غیر این صورت دکمه نمایش داده نشود
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
      console.log('renewals => ', this.renewals)

      if (!this.selectedUser) {
        console.error('No selected user available')
        return
      }

      let expirationDateMiladi, registrationDateMiladi

      // پیدا کردن آخرین تمدید کاربر (اگر تمدید شده باشد)
      const lastRenewal = this.renewals
        .filter((renewal) => renewal.user_id === this.selectedUser.id)
        .sort(
          (a, b) =>
            moment.from(b.new_expiration_date, 'fa').valueOf() -
            moment.from(a.new_expiration_date, 'fa').valueOf()
        )[0]

      if (lastRenewal) {
        // اگر تمدید دارد، از آخرین تمدید استفاده کنیم
        expirationDateMiladi = moment.from(lastRenewal.new_expiration_date, 'fa').locale('en')
        registrationDateMiladi = moment.from(lastRenewal.renewal_date, 'fa').locale('en')
      } else {
        // اگر تمدید ندارد، تاریخ ثبت‌نام را در نظر بگیریم
        if (!this.selectedUser.registrationDate) {
          console.error('No registration date found for user')
          return
        }

        registrationDateMiladi = moment.from(this.selectedUser.registrationDate, 'fa').locale('en')
        expirationDateMiladi = moment(registrationDateMiladi).add(30, 'days') // اعتبار اولیه ۳۰ روزه
      }

      const totalDays = expirationDateMiladi.diff(registrationDateMiladi, 'days')
      const passedDays = moment().diff(registrationDateMiladi, 'days')
      const usedPercentage = (passedDays / totalDays) * 100

      // محدود کردن مقدار درصد بین 0 تا 100
      this.progress = Math.min(Math.max(usedPercentage, 0), 100)
      this.remainingDays = Math.max(0, totalDays - passedDays)

      // اگر تاریخ انقضا گذشته باشد، وضعیت کاربر را تغییر بده
      if (moment().isAfter(expirationDateMiladi)) {
        this.selectedUser.status = 'منقضی‌شده'
      }

      this.expirationDateMiladi = expirationDateMiladi.format('jYYYY/jMM/jDD')
      console.log(
        `Progress: ${this.progress}%, Remaining Days: ${this.remainingDays} expirationDateMiladi: ${this.expirationDateMiladi} `
      )
      // return expirationDateMiladi
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
        console.error('Selected user or registration date is invalid')
        return
      }
      this.selectedUser = user
      this.showDetailsModal = true
      this.calculateProgress()
    },

    calculateTotalPaid(userId) {
      const userPayments = this.payments.filter(
        (p) =>
          (p.userId === userId || p.user_id === userId) &&
          ['پرداخت شده', 'موفق', 'paid'].includes(p.status?.trim())
      )

      return userPayments.reduce((sum, p) => {
        const cleanedAmount = (p.amount || '')
          .toString()
          .replace(/[٬،,]/g, '')
          .replace(/[۰-۹]/g, (d) => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d))
        return sum + Number(cleanedAmount)
      }, 0)
    },
    calculateDebtAmount(userId) {
      const unpaid = this.payments.filter((p) => p.userId === userId && p.status === 'پرداخت نشده')
      return unpaid.reduce((sum, p) => sum + Number(p.amount), 0)
    },
    calculateRemainingSessions(userId) {
      const user = this.users.find((u) => u.id === userId)
      if (!user || !user.registrationDate || !user.expirationDate) return 0

      const today = moment().locale('fa')
      const expiration = moment.from(user.expirationDate, 'fa')

      if (today.isSameOrAfter(expiration)) return 0

      const remainingDays = expiration.diff(today, 'days')
      return remainingDays
    },
    closeDetailsModal() {
      this.showDetailsModal = false
      this.selectedUser = null
    },
    async fetchUsers() {
      try {
        this.users = await window.api.getUsers()
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },
    confirmDeleteUser(user) {
      this.userToDelete = user
      this.showDeleteModal = true
    },
    closeDeleteModal() {
      this.showDeleteModal = false
      this.userToDelete = null
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
    },
    async deleteUserConfirmed() {
      try {
        await window.api.deleteUser(this.userToDelete.id) // ارسال فقط userId
        this.users = this.users.filter((user) => user.id !== this.userToDelete.id)
        this.closeDeleteModal()

        await this.showSwal('موفقیت', 'کاربر با موفقیت حذف شد', 'success')
      } catch (error) {
        console.error('Error deleting user:', error)
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
        const response = await window.api.getPayments()
        this.payments = response || [] // در صورتی که پاسخ خالی باشد، آرایه خالی اختصاص داده می‌شود
      } catch (error) {
        console.error('Error fetching payments:', error)
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
      }
      this.isEditMode = false
      this.showModal = true
    },
    openEditModal(user) {
      // console.log("---------------------");
      // this.fetchPayments();
      // console.log("---------------------");
      this.selectedUser = {
        ...user
      }

      // محاسبه تاریخ انقضا بر اساس مقادیر موجود
      this.calculateExpirationDate()
      console.log('this.selectedUser => ', this.selectedUser)

      // پیدا کردن پرداخت مربوط به این کاربر
      const payment = this.payments.find((payment) => payment.userId === user.id)
      console.log('openEditModal ==> ', payment)

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
      }
      this.isEditMode = true
      this.showModal = true
    },
    closeModal() {
      this.showModal = false
    },
    async submitForm() {
      this.calculateExpirationDate() // ← بسیار مهم
      if (this.isEditMode) {
        await this.updateUser()
        console.log('*********** @@')
      } else {
        console.log('*********** %%')
        await this.addUser()
      }
      console.log('*********** 1')
      await this.fetchUsers()
      await this.fetchPayments() // 🔥 این خط حیاتی‌ـه
      console.log('*********** 2')
      this.closeModal()
    },
    // ✅ نسخه اصلاح‌شده برای ذخیره تاریخ ثبت‌نام و تاریخ انقضا به صورت شمسی در دیتابیس:

    calculateExpirationDate() {
      if (!this.newUser.registrationDate || !this.newUser.renewal_duration) {
        this.newUser.expirationDate = ''
        return
      }

      const durationMonths = parseInt(this.newUser.renewal_duration, 10)
      if (isNaN(durationMonths) || durationMonths <= 0) {
        console.error('مدت دوره معتبر نیست')
        return
      }

      // تبدیل تاریخ ثبت‌نام از شمسی به میلادی برای محاسبه
      const registrationMiladi = moment
        .from(this.newUser.registrationDate, 'fa', 'jYYYY/jMM/jDD')
        .locale('en')

      const expirationMiladi = registrationMiladi.clone().add(durationMonths, 'months')

      // تبدیل هر دو به شمسی و ذخیره در دیتا
      this.newUser.registrationDate = registrationMiladi
        .clone()
        .locale('fa')
        .format('jYYYY/jMM/jDD')

      this.newUser.expirationDate = expirationMiladi.clone().locale('fa').format('jYYYY/jMM/jDD')

      console.log('📅 ثبت‌نام شمسی:', this.newUser.registrationDate)
      console.log('📆 انقضا شمسی:', this.newUser.expirationDate)
    },
    calculateExpirationDate_Renewal() {
      const durationMonths = parseInt(this.obj_renewals.duration, 10)
      if (isNaN(durationMonths) || durationMonths <= 0) {
        console.error('مدت دوره معتبر نیست')
        return
      }

      const now = moment().locale('en')
      const expirationMiladi = now.clone().add(durationMonths, 'months')

      this.obj_renewals.renewal_date = now.clone().locale('fa').format('jYYYY/jMM/jDD')
      this.obj_renewals.new_expiration_date = expirationMiladi
        .clone()
        .locale('fa')
        .format('jYYYY/jMM/jDD')

      console.log('📅 تمدید:', this.obj_renewals.renewal_date)
      console.log('📆 انقضا جدید:', this.obj_renewals.new_expiration_date)
    },
    async addUser() {
      try {
        console.log('New User Data:', this.newUser) // بررسی مقدار قبل از ارسال
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
        }) // ارسال نسخه‌ای از شیء

        console.log('New Payment:', this.newUser)
        console.log('addedUser ', addedUser)
        if (addedUser && addedUser.id) {
          const resPayment = await window.api.addPayment({
            userId: addedUser.id,
            firstName: this.newUser.firstName,
            lastName: this.newUser.lastName,
            amount: this.newUser.paymentAmount,
            paymentDate: this.newUser.registrationDate,
            paymentMethod: this.newUser.paymentMethod,
            status: this.newUser.paymentStatus
          })

          this.users.push(addedUser)

          this.payments.push(resPayment)
          console.log('resPayment ', resPayment)
        }

        // if (addedUser) {
        //     this.users.push(addedUser);
        // }
      } catch (error) {
        console.error('Error adding user:', error)
      }
    },
    async updateUser() {
      try {
        console.log('########## ', this.users)
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
        })

        console.log('payments Arr ==> ', this.payments)
        console.log('this.selectedUser ==> ', this.selectedUser)
        console.log('this.users ==> ', this.users)
        // پیدا کردن پرداخت مربوط به این کاربر
        const payment = this.payments.find((payment) => payment.userId === this.selectedUser.id)
        console.log('payment => ', payment)
        console.log('this.newUser => ', this.newUser)

        if (payment) {
          console.log('step 1 payment ==> ')
          await window.api.editPayments({
            paymentId: payment.paymentId, // آیدی پرداختی که قرار است ویرایش شود
            userId: payment.userId,
            firstName: this.newUser.firstName,
            lastName: this.newUser.lastName,
            amount: this.newUser.paymentAmount,
            paymentDate: this.newUser.registrationDate,
            paymentMethod: this.newUser.paymentMethod,
            status: this.newUser.paymentStatus
          })
        }
      } catch (error) {
        console.error('Error updating user:', error)
      }
    },
    async deleteUser(userId) {
      try {
        await window.api.deleteUser(userId) // ارسال فقط userId
        this.users = this.users.filter((user) => user.id !== userId)
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    },
    openRenewalModal(user) {
      this.fetchPayments()
      let amount
      this.userToRenewal = user
      this.renewal_user_id = user.id
      this.showRenewalModal = true
      this.calculateExpirationDate_Renewal()
      this.renewal_payment = this.payments[0].amount
      console.log('newUser  ==> ', this.payments[0].amount)
    },
    closeRenewalModal() {
      this.userToRenewal = null
      this.showRenewalModal = false
    },
    async submitFormRenewal() {
      console.log('this.userToRenewal.id ==> ', this.renewal_user_id) // باید "1" را چاپ کند

      console.log('🔁 ارسال به جدول renewals:', {
        user_id: this.renewal_user_id,
        renewal_date: this.obj_renewals.renewal_date,
        duration: this.obj_renewals.duration,
        new_expiration_date: this.obj_renewals.new_expiration_date
      })

      await this.addRenewals()
      await this.fetchUsers() // برای بروزرسانی جدول کاربران در UI
      await this.closeRenewalModal()
    },
    async addRenewals() {
      console.log('🚀 ارسال تمدید:', this.obj_renewals)

      const response = await window.api.addRenewals({
        user_id: this.renewal_user_id,
        renewal_date: this.obj_renewals.renewal_date,
        duration: this.obj_renewals.duration,
        new_expiration_date: this.obj_renewals.new_expiration_date
      })

      if (response.success) {
        // 🔁 به‌روزرسانی users.expirationDate
        await window.api.updateUserExpiration({
          id: this.renewal_user_id,
          expirationDate: this.obj_renewals.new_expiration_date
        })

        // ⏬ اضافه شده‌ها
        await this.fetchUsers()
        this.renewals = await window.api.fetchRenewals()
        await this.checkAndUpdateUserStatus(this.renewal_user_id)
      }
    },
    async checkAndUpdateUserStatus(userId) {
      const response = await window.api.checkUserStatus(userId)
      if (response.success) {
        this.updateUserStatus(userId, response.status) // وضعیت جدید را به‌روزرسانی کن
      }
    },

    async updateUserStatus(userId, newStatus) {
      const user = this.users.find((u) => u.id === userId)
      if (user) user.status = newStatus
      console.log(`Updating status for user ${userId} to ${newStatus}`)
      await window.api.updateUserStatus({
        userId,
        status: newStatus
      })
    }
  },
  async mounted() {
    for (const user of this.users) {
      await this.checkAndUpdateUserStatus(user.id)
    }
    await this.fetchUsers()
    await this.fetchPayments() // دریافت پرداخت‌ها
    this.calculateProgress() // محاسبه درصد زمان در زمان بارگذاری کامپوننت
    console.log('users:', this.users)
    // console.log(this.hasExpiredUsers())
    // بررسی داده‌های پرداخت‌ها
    console.log('payments:', this.payments)
    jalaliDatepicker.startWatch({
      //   time: true,           // فعال باشه برای input دوم
      //   hasSecond: false,     // می‌تونی true بزاری اگه ثانیه هم بخوای
      //   autoHide: true,
      //   autoShow: true,
      //   hideAfterChange: true,
      //   container: "#my-datepicker-wrapper"
    })
    for (const user of this.users) {
      await this.checkAndUpdateUserStatus(user.id)
    }

    this.renewals = await window.api.fetchRenewals()
  },
  watch: {
    // اگر تاریخ ثبت‌نام تغییر کند، دوباره پراگرس بار را به‌روز می‌کنیم
    'newUser.registrationDate': function () {
      this.calculateProgress()
    },
    'newUser.renewal_duration': function () {
      this.calculateExpirationDate()
    }
  }
}
</script>
