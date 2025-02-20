<template>
<form class="w-full">
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative w-full">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
        </div>
        <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">جستجو</button>
    </div>
</form>

<div className="overflow-x-auto w-full">

    <div class="p-6">
        <!-- بخش جستجو و دکمه افزودن کاربر -->
        <div class="flex md:flex-row justify-between mb-4 gap-2">
            <input type="text" v-model="searchQuery" placeholder="جستجو براساس نام یا شماره عضویت..." class="input input-bordered w-full md:max-w-xs" />
            <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="openAddModal">
                افزودن کاربر
            </button>
        </div>

        <!-- جدول کاربران -->
        <div class="overflow-x-auto">
            <table class="table w-full text-right rtl">
                <!-- head -->
                <thead>
                    <tr>
                        <th class="text-right">عملیات</th>
                        <th class="text-right">تاریخ ثبت‌نام</th>
                        <th class="text-right">آدرس</th>
                        <th class="text-right">شماره تماس اضطراری</th>
                        <th class="text-right">وضعیت عضویت</th>
                        <th class="text-right">شماره موبایل</th>
                        <th class="text-right">شماره عضویت</th>
                        <th class="text-right">نام خانوادگی</th>
                        <!-- <th class="text-right">عکس پروفایل</th> -->
                        <th class="text-right">نام</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in filteredUsers" :key="user.id">
                        <td>
                            <button class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="confirmDeleteUser(user)">
                                حذف
                            </button>
                            <button class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="openEditModal(user)">
                                ویرایش
                            </button>
                            <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" @click="viewUser(user)">
                                نمایش
                            </button>

                        </td>
                        <td class="font-semibold">{{ user.registrationDate }}</td>
                        <td class="font-bold">{{ user.address }}</td>
                        <td class="font-bold">{{ user.emergencyPhone }}</td>
                        <td>
                            <span class="font-semibold" :class="{
                  'bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300': user.status === 'فعال',
                  'bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300': user.status !== 'فعال'
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
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- مدال افزودن/ویرایش کاربر -->
        <div v-if="showModal" class="modal modal-open">
            <div class="modal-box">
                <h3 class="font-bold text-lg mb-4">
                    {{ isEditMode ? "ویرایش کاربر" : "افزودن کاربر جدید" }}
                </h3>
                <form @submit.prevent="submitForm">
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
                    <!-- <div class="form-control mt-2">
            <label class="label">
              <span class="label-text">عکس پروفایل (URL)</span>
            </label>
            <input
              type="text"
              v-model="newUser.profilePic"
              class="input input-bordered"
              placeholder="https://..."
            />
          </div> -->
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
                        <input type="date" v-model="newUser.registrationDate" class="input input-bordered" required />
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
        </div>
        <div>
            <!-- مدال تأیید حذف -->
            <div v-if="showDeleteModal" class="modal modal-open">
                <div class="modal-box">
                    <h3 class="font-bold text-lg mb-4">حذف کاربر</h3>
                    <p>آیا از حذف این کاربر مطمئن هستید؟</p>
                    <div class="modal-action mt-4">
                        <button type="button" class="btn" @click="closeDeleteModal">انصراف</button>
                        <button type="button" class="btn btn-error" @click="deleteUserConfirmed">حذف</button>
                    </div>
                </div>
            </div>
            <!-- مدال نمایش اطلاعات کاربر -->

            <dialog v-if="showDetailsModal" className="modal modal-open">
                <div className="modal-box w-11/12 max-w-7xl">
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
                            <div className="divider"></div>
                            <div class="mt-2 flex gap-4 text-center">
                                <div class="stat">
                                    <div class="stat-title">مبلغ بدهی</div>
                                    <div class="stat-value text-red-500" style="
    direction: rtl;">0</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">آخرین شهریه پرداخت شده</div>
                                    <div class="stat-value text-blue-500" style="
    direction: rtl;">300,000 تومان</div>
                                </div>
                                <div class="stat">
                                    <div class="stat-title">پایان اعتبار</div>
                                    <div class="stat-value text-green-500">{{ selectedUser.registrationDate }}</div>
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
export default {
    data() {
        return {
            users: [],
            showDeleteModal: false,
            userToDelete: null,
            selectedUser: null,
            showDetailsModal: false, // متغیر جدید برای نمایش مدال
            newUser: {
                firstName: '',
                lastName: '',
                memberId: '',
                phone: '',
                status: 'فعال',
                emergencyPhone: '',
                address: '',
                registrationDate: new Date().toISOString().split('T')[0]
            },
            showModal: false,
            isEditMode: false,
            searchQuery: '',
            selectedUser: null
        };
    },
    computed: {
        filteredUsers() {
            return (this.users || []).filter(user =>
                (user.firstName ?.includes(this.searchQuery) ||
                    user.lastName ?.includes(this.searchQuery))
            );
        }

    },
    methods: {
        // متد برای باز کردن مدال نمایش مشخصات کاربر
        viewUser(user) {
            this.selectedUser = user;
            this.showDetailsModal = true;
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
        openAddModal() {
            this.newUser = {
                firstName: '',
                lastName: '',
                memberId: '',
                phone: '',
                status: 'فعال',
                emergencyPhone: '',
                address: '',
                registrationDate: new Date().toISOString().split('T')[0]
            };
            this.isEditMode = false;
            this.showModal = true;
        },
        openEditModal(user) {
            this.selectedUser = {
                ...user
            };
            this.newUser = {
                ...user
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
            } else {
                await this.addUser();
            }
            await this.fetchUsers();
            this.closeModal();
        },
        async addUser() {
            try {
                console.log("New User Data:", this.newUser); // بررسی مقدار قبل از ارسال
                const addedUser = await window.api.addUser({
                    ...this.newUser
                }); // ارسال نسخه‌ای از شیء
                if (addedUser) {
                    this.users.push(addedUser);
                }
            } catch (error) {
                console.error('Error adding user:', error);
            }
        },
        async updateUser() {
            try {
                await window.api.updateUser({
                    ...this.newUser
                });
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
        console.log("users:", this.users);
    }
};
</script>
